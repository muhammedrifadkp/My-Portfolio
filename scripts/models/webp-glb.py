"""
Re-encodes the textures inside a GLB as WebP and trims what a scene does not use.

  python scripts/models/webp-glb.py in.glb out.glb [--max 1024] [--quality 80]
         [--strip-textures] [--drop TANGENT,TEXCOORD_1]

Run scripts/models/draco-glb.cjs on the result: it compresses the geometry and
removes the vertex data that --drop left unreferenced.
"""
import argparse
import io
import json
import struct

from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument('src')
ap.add_argument('dst')
ap.add_argument('--max', type=int, default=1024)
ap.add_argument('--quality', type=int, default=80)
ap.add_argument('--strip-textures', action='store_true')
ap.add_argument('--drop', default='')
a = ap.parse_args()

b = open(a.src, 'rb').read()
assert b[:4] == b'glTF'
off, chunks = 12, []
while off < len(b):
    ln, typ = struct.unpack_from('<II', b, off)
    chunks.append(b[off + 8: off + 8 + ln])
    off += 8 + ln
js = json.loads(chunks[0])
binc = chunks[1] if len(chunks) > 1 else b''
views = js.get('bufferViews', [])

for sem in filter(None, a.drop.split(',')):
    for m in js.get('meshes', []):
        for p in m['primitives']:
            p['attributes'].pop(sem, None)

image_views = {im['bufferView']: i for i, im in enumerate(js.get('images', [])) if 'bufferView' in im}
new_image = {}
if a.strip_textures:
    for m in js.get('materials', []):
        pbr = m.get('pbrMetallicRoughness', {})
        for k in ('baseColorTexture', 'metallicRoughnessTexture'):
            pbr.pop(k, None)
        for k in ('normalTexture', 'emissiveTexture', 'occlusionTexture'):
            m.pop(k, None)
        m.pop('extensions', None)
    for k in ('images', 'textures', 'samplers'):
        js.pop(k, None)
    for k in ('extensionsUsed', 'extensionsRequired'):
        if k in js:
            js[k] = [e for e in js[k] if e not in ('KHR_materials_pbrSpecularGlossiness', 'EXT_texture_webp')]
            if not js[k]:
                js.pop(k)
else:
    for vi, ii in image_views.items():
        bv = views[vi]
        raw = binc[bv.get('byteOffset', 0): bv.get('byteOffset', 0) + bv['byteLength']]
        im = Image.open(io.BytesIO(raw))
        im.load()
        alpha = im.mode in ('RGBA', 'LA', 'P') and im.convert('RGBA').getchannel('A').getextrema()[0] < 255
        im = im.convert('RGBA' if alpha else 'RGB')
        if max(im.size) > a.max:
            im.thumbnail((a.max, a.max), Image.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, 'WEBP', quality=a.quality, method=6)
        new_image[vi] = buf.getvalue()
        js['images'][ii]['mimeType'] = 'image/webp'
    for t in js.get('textures', []):
        if 'source' in t:
            t.setdefault('extensions', {})['EXT_texture_webp'] = {'source': t.pop('source')}
    if js.get('images'):
        for k in ('extensionsUsed', 'extensionsRequired'):
            js[k] = sorted(set(js.get(k, []) + ['EXT_texture_webp']))

out, keep, remap = bytearray(), [], {}
for vi, bv in enumerate(views):
    if a.strip_textures and vi in image_views:
        continue
    data = new_image.get(vi) or binc[bv.get('byteOffset', 0): bv.get('byteOffset', 0) + bv['byteLength']]
    while len(out) % 4:
        out.append(0)
    nbv = dict(bv, byteOffset=len(out), byteLength=len(data))
    remap[vi] = len(keep)
    keep.append(nbv)
    out += data
while len(out) % 4:
    out.append(0)
for acc in js.get('accessors', []):
    if 'bufferView' in acc:
        acc['bufferView'] = remap[acc['bufferView']]
    if 'sparse' in acc:
        for k in ('indices', 'values'):
            acc['sparse'][k]['bufferView'] = remap[acc['sparse'][k]['bufferView']]
for im in js.get('images', []):
    if 'bufferView' in im:
        im['bufferView'] = remap[im['bufferView']]
js['bufferViews'] = keep
js['buffers'] = [{'byteLength': len(out)}]
jb = json.dumps(js, separators=(',', ':')).encode()
jb += b' ' * (-len(jb) % 4)
with open(a.dst, 'wb') as f:
    f.write(b'glTF' + struct.pack('<II', 2, 12 + 8 + len(jb) + 8 + len(out)))
    f.write(struct.pack('<II', len(jb), 0x4E4F534A) + jb)
    f.write(struct.pack('<II', len(out), 0x004E4942) + bytes(out))
print(f'{a.dst}: {len(b) // 1024} KB -> {(20 + len(jb) + 8 + len(out)) // 1024} KB')
