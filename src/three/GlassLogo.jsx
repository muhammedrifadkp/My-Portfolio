import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, MeshTransmissionMaterial, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { triggerHaptic } from '../utils/haptics'

const BG_MOSAIC = '/bg-works-design.webp'
const FIELD = '#c3e8de'

/* Rich client projects mosaic drifting behind the mark, bending through the sea glass. */
function Wall({ compact }) {
  const texture = useTexture(BG_MOSAIC)
  texture.colorSpace = THREE.SRGBColorSpace
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.position.set(Math.sin(t * 0.12) * (compact ? 0.6 : 1.1), Math.cos(t * 0.16) * 0.25, -1.9)
  })
  return (
    <group ref={ref} rotation={[0.04, -0.16, 0.02]}>
      <mesh>
        <planeGeometry args={[compact ? 13.5 : 15.0, compact ? 5.4 : 6.0]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* The RIFAD mark, cast in sea glass. Drag to turn it. */
function Mark({ drag, compact }) {
  const { scene } = useGLTF('/models/logo.glb', '/draco/')
  const { mesh, k, offset } = useMemo(() => {
    let found = null
    scene.updateMatrixWorld(true)
    scene.traverse((o) => { if (o.isMesh && !found) found = o })
    const b = new THREE.Box3().setFromObject(scene)
    const s = b.getSize(new THREE.Vector3())
    const c = b.getCenter(new THREE.Vector3())
    const scale = 4.3 / Math.max(s.x, s.y, s.z)
    return { mesh: found, k: scale, offset: [-c.x * scale, -c.y * scale, -c.z * scale] }
  }, [scene])
  const ref = useRef()
  const field = useMemo(() => new THREE.Color(FIELD), [])

  useFrame(({ clock }, dt) => {
    const d = drag.current
    // Smooth inertial spin physics
    if (!d.dragging) {
      d.target += d.vel * 0.95
      d.vel *= 0.92
      d.target = THREE.MathUtils.damp(d.target, 0, 1.5, dt)
    }
    d.yaw = THREE.MathUtils.damp(d.yaw, d.target, d.dragging ? 14 : 4, dt)
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
            samples={compact ? 3 : 6}
            resolution={compact ? 256 : 512}
            transmission={1}
            thickness={1.1}
            roughness={0.03}
            ior={1.36}
            chromaticAberration={compact ? 0.02 : 0.04}
            anisotropicBlur={compact ? 0.05 : 0.1}
            distortion={0.05}
            distortionScale={0.3}
            temporalDistortion={compact ? 0 : 0.04}
            clearcoat={1}
            clearcoatRoughness={0.05}
            color="#eefff9"
            attenuationColor="#2cc4a0"
            attenuationDistance={1.5}
          />
        </mesh>
      </group>
    </group>
  )
}

export default function GlassLogo({ active = true }) {
  const compact = typeof window !== 'undefined' && window.innerWidth <= 820
  const drag = useRef({ yaw: 0, target: 0, dragging: false, x: 0, vel: 0, lastT: 0 })

  const down = (e) => {
    triggerHaptic('light')
    drag.current.dragging = true
    drag.current.x = e.clientX
    drag.current.lastT = performance.now()
    drag.current.vel = 0
  }

  const move = (e) => {
    const d = drag.current
    if (!d.dragging) return
    const now = performance.now()
    const dt = Math.max(1, now - d.lastT)
    const dx = e.clientX - d.x
    d.vel = (dx / dt) * 0.08
    d.target += (dx / (compact ? 140 : 220))
    d.x = e.clientX
    d.lastT = now
  }

  const up = () => {
    drag.current.dragging = false
  }

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, compact ? 1.25 : 1.5]}
      camera={{ fov: compact ? 34 : 30, position: [0, 0, 7.4] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerLeave={up}
      onPointerCancel={up}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 5]} intensity={1.6} />
      <Environment resolution={compact ? 64 : 128}>
        <Lightformer intensity={2.6} position={[0, 4, -4]} scale={[10, 4, 1]} />
        <Lightformer intensity={1.8} position={[-5, 0, 3]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer intensity={1.4} color="#d6f0e8" position={[5, 0, 3]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer intensity={1} position={[0, -4, 2]} rotation-x={Math.PI / 2} scale={[8, 8, 1]} />
      </Environment>
      <Suspense fallback={null}>
        <Wall compact={compact} />
        <Mark drag={drag} compact={compact} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/logo.glb', '/draco/')
useTexture.preload(BG_MOSAIC)
