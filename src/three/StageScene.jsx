import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const URL = '/models/desk.glb'
const DRACO = '/draco/'

/* Crossfades between two screen images. */
const screenShader = {
  uniforms: { tA: { value: null }, tB: { value: null }, mixAmt: { value: 0 }, glow: { value: 1 } },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tA; uniform sampler2D tB; uniform float mixAmt; uniform float glow;
    varying vec2 vUv;
    void main() {
      vec4 a = texture2D(tA, vUv);
      vec4 b = texture2D(tB, vUv);
      vec3 c = mix(a.rgb, b.rgb, smoothstep(0.0, 1.0, mixAmt)) * glow;
      gl_FragColor = vec4(c, 1.0);
      #include <colorspace_fragment>
    }`,
}

const STILL = typeof document !== 'undefined' && document.documentElement.classList.contains('shot')
const ease = (t) => 1 - Math.pow(1 - t, 3)
const damp = THREE.MathUtils.damp

/**
 * The desk. `state` is a ref { progress, step, drag, dragging, yaw } written by the page:
 * progress 0 = whole desk, 1 = monitor close-up; step = which site is on the screen.
 */
function Workstation({ images, state, compact, onReady }) {
  const { scene } = useGLTF(URL, DRACO)
  const textures = useTexture(images)
  const group = useRef()
  const spin = useRef()
  const { camera, size } = useThree()

  textures.forEach((t) => {
    t.flipY = true
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = compact ? 4 : 8
  })

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(screenShader.uniforms),
        vertexShader: screenShader.vertexShader,
        fragmentShader: screenShader.fragmentShader,
        toneMapped: false,
      }),
    []
  )

  /* frame the model once: centre, scale, find the monitor and which way it faces */
  const info = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const sizeV = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const k = 4 / Math.max(sizeV.x, sizeV.y, sizeV.z)
    let screenMesh = null
    const glow = []
    scene.traverse((o) => {
      if (!o.isMesh) return
      if (o.material && o.material.emissiveMap) glow.push(o.material)
      if (o.material && 'envMapIntensity' in o.material) o.material.envMapIntensity = 1.1
      if (/^MY.?SCREEN/i.test(o.name) && !screenMesh) screenMesh = o
    })
    let yaw = 0
    if (screenMesh) {
      scene.updateMatrixWorld(true)
      const n = new THREE.Vector3()
      const na = screenMesh.geometry.attributes.normal
      for (let i = 0; i < na.count; i++) n.add(new THREE.Vector3().fromBufferAttribute(na, i))
      n.transformDirection(screenMesh.matrixWorld)
      yaw = -Math.atan2(n.x, n.z)
      screenMesh.material = material
    }
    return { center, k, screenMesh, yaw, glow }
  }, [scene, material])

  const screenPose = useRef(null)
  useEffect(() => {
    if (!info.screenMesh || !group.current) return
    spin.current.rotation.y = 0
    group.current.rotation.y = info.yaw
    group.current.updateMatrixWorld(true)
    const b = new THREE.Box3().setFromObject(info.screenMesh)
    const s = b.getSize(new THREE.Vector3())
    screenPose.current = { center: b.getCenter(new THREE.Vector3()), width: Math.max(s.x, s.z), height: s.y }
    if (onReady) onReady()
  }, [info, onReady])

  const cur = useRef({ idx: 0, next: 0, t: 1 })
  const look = useRef(new THREE.Vector3())

  useFrame((s, dt) => {
    const st = state.current
    const p = ease(Math.min(Math.max(st.progress, 0), 1))

    /* screen image: crossfade when the step changes */
    const want = Math.min(st.step, textures.length - 1)
    const c = cur.current
    if (want !== c.next && c.t >= 1) { c.next = want; c.t = 0 }
    if (c.t < 1) c.t = Math.min(1, c.t + dt * 2.5)
    if (c.t >= 1) c.idx = c.next
    material.uniforms.tA.value = textures[c.idx]
    material.uniforms.tB.value = c.t >= 1 ? textures[c.idx] : textures[c.next]
    material.uniforms.mixAmt.value = c.t >= 1 ? 0 : c.t
    material.uniforms.glow.value = 0.92 + p * 0.08

    /* the visitor's drag turns the desk; it smoothly settles when let go */
    st.yaw = damp(st.yaw || 0, st.drag || 0, st.dragging ? 14 : 3.5, dt)
    if (!st.dragging && st.drag) {
      st.drag = damp(st.drag, 0, 2, dt)
    }
    if (spin.current) spin.current.rotation.y = -0.42 * (1 - p) + st.yaw + (STILL ? 0 : Math.sin(performance.now() / 2600) * 0.03 * (1 - p))

    /* camera: whole desk -> monitor close-up */
    const sp = screenPose.current
    if (!sp) return
    const aspect = size.width / size.height
    // Framed so desk aligns 1:1 with mobile poster still at rest
    const wide = new THREE.Vector3(0, compact ? -0.25 : -0.3, 0)
    const deskDist = compact ? (aspect < 0.7 ? 15.5 : 12.5) : aspect < 1.2 ? 11 : 9.4
    const posA = new THREE.Vector3(0, deskDist * (compact ? 0.28 : 0.3), deskDist)
    if (!STILL) {
      /* the camera leans a little toward the pointer, and the RGB lights breathe */
      posA.x += s.pointer.x * (compact ? 0.2 : 0.55) * (1 - p)
      posA.y += s.pointer.y * (compact ? 0.15 : 0.3) * (1 - p)
      info.glow.forEach((m, i) => { m.emissiveIntensity = 1 + Math.sin(s.clock.elapsedTime * 1.4 + i * 0.9) * 0.3 })
    }
    const fitW = sp.width / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect)
    const closeDist = fitW * (compact ? 1.05 : 2.7)
    const shift = compact ? 0 : sp.width * 0.42
    // On mobile, frame monitor in upper half so it remains 100% visible above docked card
    const tgtB = sp.center.clone().add(new THREE.Vector3(shift, compact ? -sp.height * 0.66 : 0, 0))
    const posB = new THREE.Vector3(tgtB.x, tgtB.y + (compact ? 0.04 : 0.02), sp.center.z + closeDist)
    const pos = posA.lerp(posB, p)
    const tgt = wide.lerp(tgtB, p)
    camera.position.set(damp(camera.position.x, pos.x, 6, dt), damp(camera.position.y, pos.y, 6, dt), damp(camera.position.z, pos.z, 6, dt))
    look.current.set(damp(look.current.x, tgt.x, 6, dt), damp(look.current.y, tgt.y, 6, dt), damp(look.current.z, tgt.z, 6, dt))
    camera.lookAt(look.current)
  })

  return (
    <group ref={group}>
      <group ref={spin}>
        <group scale={info.k} position={[-info.center.x * info.k, -info.center.y * info.k, -info.center.z * info.k]}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  )
}

/* The whole 3D stage: loaded only in the browser, after the page's text is up. */
export default function StageScene({ state, images, compact, active, onReady }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={STILL ? 2 : [1, compact ? 1.25 : 1.75]}
      camera={{ fov: 30, position: [0, 2.8, 9.4], near: 0.05, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 6, 5]} intensity={1.6} />
      <Environment resolution={compact ? 128 : 256}>
        <Lightformer intensity={2.2} position={[0, 6, -6]} scale={[14, 6, 1]} />
        <Lightformer intensity={1.4} position={[-7, 2, 2]} rotation-y={Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer intensity={1} position={[7, 2, 2]} rotation-y={-Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer intensity={0.6} color="#d6f0e8" position={[0, -4, 4]} rotation-x={Math.PI / 2} scale={[14, 14, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <Workstation images={images} state={state} compact={compact} onReady={onReady} />
        <ContactShadows position={[0, -1.02, 0]} opacity={0.3} scale={10} blur={2.6} far={3} resolution={compact ? 256 : 512} color="#0c1512" />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload(URL, DRACO)
