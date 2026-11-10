"""
Bakes the desk model (assets-src/desktop_pc) into one small GLB.

- applies every node transform to its vertices and merges meshes that share a
  material (685 draw calls -> one per material)
- keeps the monitor screen as its own mesh, named MY_SCREEN
- drops the two unused UV sets, the 4K desk-top texture and the screen texture
- re-encodes the textures that are left as WebP, 1024px at most

Usage:  python scripts/models/merge-desk.py <out.glb>
Then:   node scripts/models/draco-glb.cjs <out.glb> public/models/desk.glb
"""
import io
import json
import re
import struct
import sys

import numpy as np
from PIL import Image

SRC = 'assets-src/desktop_pc'
OUT = sys.argv[1]
MAX_TEX = 1024
DESK_TOP = 'Material'          # the slab everything stands on
DESK_COLOR = [0.86, 0.88, 0.87, 1.0]

j = json.load(open(f'{SRC}/scene.gltf', encoding='utf-8'))
blob = open(f'{SRC}/scene.bin', 'rb').read()
acc, bvs = j['accessors'], j['bufferViews']
CT = {5120: 'i1', 5121: 'u1', 5122: '<i2', 5123: '<u2', 5125: '<u4', 5126: '<f4'}
NC = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}


def read(ai):
    a = acc[ai]
    bv = bvs[a['bufferView']]
    dt = np.dtype(CT[a['componentType']])
    n = NC[a['type']]
    off = bv.get('byteOffset', 0) + a.get('byteOffset', 0)
    stride = bv.get('byteStride') or dt.itemsize * n
    assert stride == dt.itemsize * n, 'interleaved views are not handled'
    return np.frombuffer(blob, dt, a['count'] * n, off).reshape(a['count'], n)


# ---- world matrix of every node -------------------------------------------
world = {}


def walk(i, parent):
    n = j['nodes'][i]
    m = np.array(n['matrix'], dtype=np.float64).reshape(4, 4).T if 'matrix' in n else np.eye(4)
    w = parent @ m
    world[i] = w
    for c in n.get('children', []):
        walk(c, w)


for root in j['scenes'][j.get('scene', 0)]['nodes']:
    walk(root, np.eye(4))

# ---- merge by material ------------------------------------------------------
groups = {}
for ni, n in enumerate(j['nodes']):
    if 'mesh' not in n:
        continue
    is_screen = re.match(r'^MY.?SCREEN', n.get('name', ''), re.I) is not None
    M = world[ni]
    M3 = M[:3, :3]
    NM = np.linalg.inv(M3).T
    flip = np.linalg.det(M3) < 0
    for p in j['meshes'][n['mesh']]['primitives']:
        assert p.get('mode', 4) == 4
        pos = read(p['attributes']['POSITION']).astype(np.float64) @ M3.T + M[:3, 3]
        nrm = read(p['attributes']['NORMAL']).astype(np.float64) @ NM.T
        nrm /= np.maximum(np.linalg.norm(nrm, axis=1, keepdims=True), 1e-12)
        uv = read(p['attributes']['TEXCOORD_0']).astype(np.float32)
        idx = read(p['indices']).reshape(-1, 3).astype(np.uint32)
        if flip:
            idx = idx[:, ::-1]
        key = 'screen' if is_screen else p['material']
        g = groups.setdefault(key, {'pos': [], 'nrm': [], 'uv': [], 'idx': [], 'n': 0, 'mat': p['material']})
        g['pos'].append(pos.astype(np.float32))
        g['nrm'].append(nrm.astype(np.float32))
        g['uv'].append(uv)
        g['idx'].append(idx + g['n'])
        g['n'] += len(pos)

# ---- materials, textures, images -------------------------------------------
out = {
    'asset': {'version': '2.0', 'generator': 'merge-desk.py'},
    'extensionsUsed': ['EXT_texture_webp'],
    'extensionsRequired': ['EXT_texture_webp'],
    'scene': 0, 'scenes': [{'nodes': []}], 'nodes': [], 'meshes': [],
    'materials': [], 'textures': [], 'images': [], 'samplers': j.get('samplers', []),
    'accessors': [], 'bufferViews': [], 'buffers': [{}],
}
binary = bytearray()


def view(data, target=None):
    while len(binary) % 4:
        binary.append(0)
    bv = {'buffer': 0, 'byteOffset': len(binary), 'byteLength': len(data)}
    if target:
        bv['target'] = target
    binary.extend(data)
    out['bufferViews'].append(bv)
    return len(out['bufferViews']) - 1


img_map, tex_map = {}, {}


def image(i):
    if i in img_map:
        return img_map[i]
    im = Image.open(f"{SRC}/{j['images'][i]['uri']}")
    im.load()
    has_alpha = im.mode in ('RGBA', 'LA', 'P') and im.convert('RGBA').getchannel('A').getextrema()[0] < 255
    im = im.convert('RGBA' if has_alpha else 'RGB')
    if max(im.size) > MAX_TEX:
        im.thumbnail((MAX_TEX, MAX_TEX), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, 'WEBP', quality=82, method=6)
    out['images'].append({'bufferView': view(buf.getvalue()), 'mimeType': 'image/webp'})
    img_map[i] = len(out['images']) - 1
    return img_map[i]


def texture(ref):
    t = j['textures'][ref['index']]
    key = (t['source'], t.get('sampler'))
    if key not in tex_map:
        nt = {'extensions': {'EXT_texture_webp': {'source': image(t['source'])}}}
        if 'sampler' in t:
            nt['sampler'] = t['sampler']
        out['textures'].append(nt)
        tex_map[key] = len(out['textures']) - 1
    return {'index': tex_map[key]}


def material(mi, screen):
    m = json.loads(json.dumps(j['materials'][mi]))
    pbr = m.setdefault('pbrMetallicRoughness', {})
    if screen:                       # the page paints the screen itself
        return {'name': 'screen', 'pbrMetallicRoughness': {'baseColorFactor': [0, 0, 0, 1], 'roughnessFactor': 1}}
    if m.get('name') == DESK_TOP:    # a pale desk instead of the 4K dark-wood photograph
        return {'name': 'desk', 'pbrMetallicRoughness': {'baseColorFactor': DESK_COLOR, 'metallicFactor': 0, 'roughnessFactor': 0.62}}
    for k in ('baseColorTexture', 'metallicRoughnessTexture'):
        if k in pbr:
            pbr[k] = texture(pbr[k])
    for k in ('normalTexture', 'emissiveTexture', 'occlusionTexture'):
        if k in m:
            idx = texture(m[k])
            m[k] = {**{kk: vv for kk, vv in m[k].items() if kk not in ('index', 'texCoord')}, **idx}
    return m


def accessor(arr, ctype, atype, target, minmax=False):
    a = {'bufferView': view(arr.tobytes(), target), 'componentType': ctype, 'count': len(arr), 'type': atype}
    if minmax:
        a['min'] = arr.min(axis=0).tolist()
        a['max'] = arr.max(axis=0).tolist()
    out['accessors'].append(a)
    return len(out['accessors']) - 1


verts = tris = 0
for key, g in sorted(groups.items(), key=lambda kv: str(kv[0])):
    pos, nrm, uv = np.concatenate(g['pos']), np.concatenate(g['nrm']), np.concatenate(g['uv'])
    idx = np.concatenate(g['idx']).reshape(-1)
    screen = key == 'screen'
    out['materials'].append(material(g['mat'], screen))
    small = len(pos) < 65536
    prim = {
        'attributes': {
            'POSITION': accessor(pos, 5126, 'VEC3', 34962, True),
            'NORMAL': accessor(nrm, 5126, 'VEC3', 34962),
            'TEXCOORD_0': accessor(uv, 5126, 'VEC2', 34962),
        },
        'indices': accessor(idx.astype('<u2' if small else '<u4'), 5123 if small else 5125, 'SCALAR', 34963),
        'material': len(out['materials']) - 1,
    }
    name = 'MY_SCREEN' if screen else re.sub(r'[^A-Za-z0-9_]', '_', out['materials'][-1].get('name', f'm{key}'))
    out['meshes'].append({'name': name, 'primitives': [prim]})
    out['nodes'].append({'name': name, 'mesh': len(out['meshes']) - 1})
    out['scenes'][0]['nodes'].append(len(out['nodes']) - 1)
    verts += len(pos)
    tris += len(idx) // 3

while len(binary) % 4:
    binary.append(0)
out['buffers'][0]['byteLength'] = len(binary)
js = json.dumps(out, separators=(',', ':')).encode()
js += b' ' * (-len(js) % 4)
with open(OUT, 'wb') as f:
    f.write(b'glTF' + struct.pack('<II', 2, 12 + 8 + len(js) + 8 + len(binary)))
    f.write(struct.pack('<II', len(js), 0x4E4F534A) + js)
    f.write(struct.pack('<II', len(binary), 0x004E4942) + bytes(binary))
tex_bytes = sum(out['bufferViews'][i['bufferView']]['byteLength'] for i in out['images'])
print(f'{OUT}: {len(out["meshes"])} meshes, {verts} verts, {tris} tris, {len(out["images"])} textures ({tex_bytes // 1024} KB), {(20 + len(js) + 8 + len(binary)) // 1024} KB')
