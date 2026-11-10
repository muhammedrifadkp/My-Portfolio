/**
 * Draco-compresses the triangle meshes of a GLB with the encoder that ships
 * inside three.js (no extra packages).
 *
 *   node scripts/models/draco-glb.cjs in.glb out.glb [positionBits=14]
 *
 * Skinned meshes are fine (joints and weights travel as generic attributes).
 * Primitives with morph targets, sparse accessors, no indices or a mode other
 * than triangles are left as they are.
 */
const fs = require('fs')
const path = require('path')

const [, , IN, OUT, POS_BITS = '14'] = process.argv
if (!IN || !OUT) {
  console.error('usage: node draco-glb.cjs in.glb out.glb [positionBits]')
  process.exit(1)
}

const encoderPath = path.join(__dirname, '../../node_modules/three/examples/jsm/libs/draco/draco_encoder.js')
const DracoEncoderModule = new Function('require', 'module', 'exports', fs.readFileSync(encoderPath, 'utf8') + '\nreturn DracoEncoderModule;')(require, { exports: {} }, {})

/* The asm.js build is ready as soon as it is called. It is also "thenable",
   so it must never be passed through a Promise (that loops forever). */
const loadEncoder = () => {
  const mod = DracoEncoderModule()
  if (!mod.Encoder) throw new Error('Draco encoder did not initialise')
  return mod
}

const TYPED = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array }
const COMPONENTS = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 }

function readGlb(file) {
  const b = fs.readFileSync(file)
  if (b.toString('ascii', 0, 4) !== 'glTF') throw new Error('not a GLB file')
  let off = 12
  let json = null
  let bin = Buffer.alloc(0)
  while (off < b.length) {
    const len = b.readUInt32LE(off)
    const type = b.readUInt32LE(off + 4)
    const data = b.subarray(off + 8, off + 8 + len)
    if (type === 0x4e4f534a) json = JSON.parse(data.toString('utf8'))
    else if (type === 0x004e4942) bin = data
    off += 8 + len
  }
  return { json, bin }
}

;(async () => {
  const draco = loadEncoder()
  const { json, bin } = readGlb(IN)
  const accessors = json.accessors || []
  const views = json.bufferViews || []

  /* copies an accessor's data out as a tight typed array */
  const read = (ai) => {
    const a = accessors[ai]
    const bv = views[a.bufferView]
    const T = TYPED[a.componentType]
    const n = COMPONENTS[a.type]
    const stride = bv.byteStride || T.BYTES_PER_ELEMENT * n
    const base = (bv.byteOffset || 0) + (a.byteOffset || 0)
    const out = new T(a.count * n)
    const dv = new DataView(bin.buffer, bin.byteOffset, bin.byteLength)
    const get = { 5120: 'getInt8', 5121: 'getUint8', 5122: 'getInt16', 5123: 'getUint16', 5125: 'getUint32', 5126: 'getFloat32' }[a.componentType]
    for (let i = 0; i < a.count; i++) {
      for (let c = 0; c < n; c++) out[i * n + c] = dv[get](base + i * stride + c * T.BYTES_PER_ELEMENT, true)
    }
    return out
  }

  const newViews = [] // { data: Uint8Array } appended after the kept ones
  let before = 0
  let after = 0
  let count = 0

  for (const mesh of json.meshes || []) {
    for (const prim of mesh.primitives) {
      const mode = prim.mode === undefined ? 4 : prim.mode
      const attrs = Object.entries(prim.attributes)
      const blocked =
        mode !== 4 || prim.indices === undefined || prim.targets ||
        attrs.some(([, ai]) => accessors[ai].sparse || accessors[ai].bufferView === undefined) ||
        (prim.extensions && prim.extensions.KHR_draco_mesh_compression)
      if (blocked) continue

      const encoder = new draco.Encoder()
      const builder = new draco.MeshBuilder()
      const dmesh = new draco.Mesh()
      const idx = Uint32Array.from(read(prim.indices))
      builder.AddFacesToMesh(dmesh, idx.length / 3, idx)

      const ids = {}
      const defs = {}
      let ok = true
      for (const [sem, ai] of attrs) {
        const a = accessors[ai]
        const data = read(ai)
        const n = COMPONENTS[a.type]
        const kind = sem === 'POSITION' ? draco.POSITION : sem === 'NORMAL' ? draco.NORMAL : sem.startsWith('TEXCOORD') ? draco.TEX_COORD : sem.startsWith('COLOR') ? draco.COLOR : draco.GENERIC
        const add = { 5126: 'AddFloatAttribute', 5121: 'AddUInt8Attribute', 5123: 'AddUInt16Attribute', 5120: 'AddInt8Attribute', 5122: 'AddInt16Attribute', 5125: 'AddUInt32Attribute' }[a.componentType]
        const id = builder[add] ? builder[add](dmesh, kind, a.count, n, data) : -1
        if (id < 0) { ok = false; break }
        ids[sem] = id
        defs[sem] = a
        before += data.byteLength
      }
      before += idx.byteLength
      if (!ok) { draco.destroy(encoder); draco.destroy(builder); draco.destroy(dmesh); continue }

      encoder.SetAttributeQuantization(draco.POSITION, Number(POS_BITS))
      encoder.SetAttributeQuantization(draco.NORMAL, 10)
      encoder.SetAttributeQuantization(draco.TEX_COORD, 12)
      encoder.SetAttributeQuantization(draco.COLOR, 8)
      encoder.SetSpeedOptions(0, 5)
      encoder.SetEncodingMethod(draco.MESH_EDGEBREAKER_ENCODING)
      encoder.SetTrackEncodedProperties(true)
      const buf = new draco.DracoInt8Array()
      const len = encoder.EncodeMeshToDracoBuffer(dmesh, buf)
      if (len <= 0) throw new Error('Draco encoding failed for mesh ' + (mesh.name || ''))
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) bytes[i] = buf.GetValue(i)
      const points = encoder.GetNumberOfEncodedPoints()
      const faces = encoder.GetNumberOfEncodedFaces()
      draco.destroy(buf); draco.destroy(encoder); draco.destroy(builder); draco.destroy(dmesh)

      /* fresh accessors without data: the Draco buffer carries it now */
      const fresh = (def, n) => {
        const a = { componentType: def.componentType, count: n, type: def.type }
        if (def.normalized) a.normalized = true
        if (def.min) a.min = def.min
        if (def.max) a.max = def.max
        accessors.push(a)
        return accessors.length - 1
      }
      const attributes = {}
      for (const sem of Object.keys(ids)) attributes[sem] = fresh(defs[sem], points)
      prim.attributes = attributes
      prim.indices = fresh({ componentType: points < 65536 ? 5123 : 5125, type: 'SCALAR' }, faces * 3)
      newViews.push({ data: bytes, prim, ids })
      after += len
      count++
    }
  }

  /* ---- drop accessors and views nothing points at any more, then repack ---- */
  const usedAcc = new Set()
  for (const mesh of json.meshes || []) {
    for (const p of mesh.primitives) {
      Object.values(p.attributes).forEach((i) => usedAcc.add(i))
      if (p.indices !== undefined) usedAcc.add(p.indices)
      for (const t of p.targets || []) Object.values(t).forEach((i) => usedAcc.add(i))
    }
  }
  for (const s of json.skins || []) if (s.inverseBindMatrices !== undefined) usedAcc.add(s.inverseBindMatrices)
  for (const an of json.animations || []) for (const s of an.samplers) { usedAcc.add(s.input); usedAcc.add(s.output) }

  const accMap = new Map()
  const keptAcc = []
  accessors.forEach((a, i) => { if (usedAcc.has(i)) { accMap.set(i, keptAcc.length); keptAcc.push(a) } })
  const re = (i) => accMap.get(i)
  for (const mesh of json.meshes || []) {
    for (const p of mesh.primitives) {
      for (const k of Object.keys(p.attributes)) p.attributes[k] = re(p.attributes[k])
      if (p.indices !== undefined) p.indices = re(p.indices)
      for (const t of p.targets || []) for (const k of Object.keys(t)) t[k] = re(t[k])
    }
  }
  for (const s of json.skins || []) if (s.inverseBindMatrices !== undefined) s.inverseBindMatrices = re(s.inverseBindMatrices)
  for (const an of json.animations || []) for (const s of an.samplers) { s.input = re(s.input); s.output = re(s.output) }
  json.accessors = keptAcc

  const usedViews = new Set()
  keptAcc.forEach((a) => {
    if (a.bufferView !== undefined) usedViews.add(a.bufferView)
    if (a.sparse) { usedViews.add(a.sparse.indices.bufferView); usedViews.add(a.sparse.values.bufferView) }
  })
  for (const im of json.images || []) if (im.bufferView !== undefined) usedViews.add(im.bufferView)

  const chunks = []
  let size = 0
  const push = (data) => {
    const pad = (4 - (size % 4)) % 4
    if (pad) { chunks.push(Buffer.alloc(pad)); size += pad }
    const at = size
    chunks.push(Buffer.from(data.buffer, data.byteOffset, data.byteLength))
    size += data.byteLength
    return at
  }
  const viewMap = new Map()
  const keptViews = []
  views.forEach((bv, i) => {
    if (!usedViews.has(i)) return
    const data = bin.subarray(bv.byteOffset || 0, (bv.byteOffset || 0) + bv.byteLength)
    const nv = { ...bv, buffer: 0, byteOffset: push(data) }
    viewMap.set(i, keptViews.length)
    keptViews.push(nv)
  })
  keptAcc.forEach((a) => {
    if (a.bufferView !== undefined) a.bufferView = viewMap.get(a.bufferView)
    if (a.sparse) { a.sparse.indices.bufferView = viewMap.get(a.sparse.indices.bufferView); a.sparse.values.bufferView = viewMap.get(a.sparse.values.bufferView) }
  })
  for (const im of json.images || []) if (im.bufferView !== undefined) im.bufferView = viewMap.get(im.bufferView)
  for (const v of newViews) {
    keptViews.push({ buffer: 0, byteOffset: push(v.data), byteLength: v.data.byteLength })
    v.prim.extensions = { ...(v.prim.extensions || {}), KHR_draco_mesh_compression: { bufferView: keptViews.length - 1, attributes: v.ids } }
  }
  json.bufferViews = keptViews
  const tail = (4 - (size % 4)) % 4
  if (tail) { chunks.push(Buffer.alloc(tail)); size += tail }
  json.buffers = [{ byteLength: size }]
  if (count) {
    json.extensionsUsed = [...new Set([...(json.extensionsUsed || []), 'KHR_draco_mesh_compression'])]
    json.extensionsRequired = [...new Set([...(json.extensionsRequired || []), 'KHR_draco_mesh_compression'])]
  }

  let js = Buffer.from(JSON.stringify(json), 'utf8')
  if (js.length % 4) js = Buffer.concat([js, Buffer.alloc(4 - (js.length % 4), 0x20)])
  const head = Buffer.alloc(12)
  head.write('glTF', 0, 'ascii'); head.writeUInt32LE(2, 4); head.writeUInt32LE(12 + 8 + js.length + 8 + size, 8)
  const jh = Buffer.alloc(8); jh.writeUInt32LE(js.length, 0); jh.writeUInt32LE(0x4e4f534a, 4)
  const bh = Buffer.alloc(8); bh.writeUInt32LE(size, 0); bh.writeUInt32LE(0x004e4942, 4)
  fs.writeFileSync(OUT, Buffer.concat([head, jh, js, bh, ...chunks]))
  const kb = (n) => Math.round(n / 1024) + ' KB'
  console.log(`${path.basename(OUT)}: ${count} meshes compressed, geometry ${kb(before)} -> ${kb(after)}, file ${kb(fs.statSync(IN).size)} -> ${kb(fs.statSync(OUT).size)}`)
})().catch((e) => { console.error(e); process.exit(1) })
