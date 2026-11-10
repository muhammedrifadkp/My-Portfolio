import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, MeshTransmissionMaterial, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

const shots = ['pixelconversions', 'zhmrealestatellc', 'agstarautomobiles', 'adfirms', 'rasdent', 'ztoiq'].map((n) => `/work/${n}-800.webp`)
const FIELD = '#c3e8de'

/* Six sites drifting behind the mark, so there is something for the glass to bend. */
function Wall() {
  const textures = useTexture(shots)
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.position.set(Math.cos(t * 0.17) * 0.9, Math.sin(t * 0.23) * 0.5, -1.9)
  })
  return (
    <group ref={ref} rotation={[0.05, -0.2, 0.03]}>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[((i % 4) - 1.5) * 2.56, (1 - Math.floor(i / 4)) * 1.66, 0]}>
          <planeGeometry args={[2.4, 1.5]} />
          <meshBasicMaterial map={textures[(i + Math.floor(i / 4) * 2) % textures.length]} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

/* The RIFAD mark, cast in sea glass. Drag to turn it. */
function Mark({ drag }) {
  const { scene } = useGLTF('/models/logo.glb', '/draco/')
  const { mesh, k, offset } = useMemo(() => {
    let found = null
    scene.updateMatrixWorld(true)
    scene.traverse((o) => { if (o.isMesh && !found) found = o })
    const b = new THREE.Box3().setFromObject(scene)
    const s = b.getSize(new THREE.Vector3())
    const c = b.getCenter(new THREE.Vector3())
    const scale = 3.5 / Math.max(s.x, s.y, s.z)
    return { mesh: found, k: scale, offset: [-c.x * scale, -c.y * scale, -c.z * scale] }
  }, [scene])
  const ref = useRef()
  const field = useMemo(() => new THREE.Color(FIELD), [])
  useFrame(({ clock }, dt) => {
    const d = drag.current
    d.yaw = THREE.MathUtils.damp(d.yaw, d.dragging ? d.target : 0, d.dragging ? 10 : 2, dt)
    const t = clock.elapsedTime
    ref.current.rotation.y = Math.sin(t * 0.5) * 0.42 + d.yaw
    ref.current.rotation.x = Math.sin(t * 0.37) * 0.1
    ref.current.position.y = Math.sin(t * 0.9) * 0.06
  })
  return (
    <group ref={ref}>
      <group scale={k} position={offset}>
        <mesh geometry={mesh.geometry} matrix={mesh.matrixWorld} matrixAutoUpdate={false}>
          <MeshTransmissionMaterial
            background={field}
            samples={6}
            resolution={512}
            transmission={1}
            thickness={1.1}
            roughness={0.03}
            ior={1.36}
            chromaticAberration={0.04}
            anisotropicBlur={0.1}
            distortion={0.05}
            distortionScale={0.3}
            temporalDistortion={0.04}
            clearcoat={1}
            clearcoatRoughness={0.05}
            color="#e6fff7"
            attenuationColor="#18b592"
            attenuationDistance={0.75}
          />
        </mesh>
      </group>
    </group>
  )
}

export default function GlassLogo({ active = true }) {
  const drag = useRef({ yaw: 0, target: 0, dragging: false, x: 0 })
  const down = (e) => { drag.current.dragging = true; drag.current.x = e.clientX; drag.current.target = drag.current.yaw }
  const move = (e) => {
    const d = drag.current
    if (!d.dragging) return
    d.target += ((e.clientX - d.x) / 220)
    d.x = e.clientX
  }
  const up = () => { drag.current.dragging = false }
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ fov: 30, position: [0, 0, 7.4] }}
      gl={{ antialias: true, alpha: true }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerLeave={up}
      onPointerCancel={up}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 5]} intensity={1.6} />
      <Environment resolution={128}>
        <Lightformer intensity={2.6} position={[0, 4, -4]} scale={[10, 4, 1]} />
        <Lightformer intensity={1.8} position={[-5, 0, 3]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer intensity={1.4} color="#d6f0e8" position={[5, 0, 3]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer intensity={1} position={[0, -4, 2]} rotation-x={Math.PI / 2} scale={[8, 8, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <Wall />
        <Mark drag={drag} />
      </Suspense>
    </Canvas>
  )
}
