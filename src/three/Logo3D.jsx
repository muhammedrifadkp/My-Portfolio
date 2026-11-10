import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Logo() {
  const { scene } = useGLTF('/models/logo.glb', '/draco/')
  const fit = useMemo(() => {
    const finish = new THREE.MeshPhysicalMaterial({ color: '#12a386', metalness: 0.35, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.08 })
    scene.traverse((o) => { if (o.isMesh) o.material = finish })
    const b = new THREE.Box3().setFromObject(scene)
    const s = b.getSize(new THREE.Vector3())
    const c = b.getCenter(new THREE.Vector3())
    const k = 3.2 / Math.max(s.x, s.y, s.z)
    return { k, offset: [-c.x * k, -c.y * k, -c.z * k] }
  }, [scene])
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.9) * 0.06
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.6) * 0.06
  })
  return (
    <group ref={ref}>
      <group scale={fit.k} position={fit.offset}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

/* The RIFAD mark: turns by itself, and the visitor can spin it. */
export default function Logo3D({ className, active = true }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ fov: 32, position: [0, 0, 6.4] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 4, 5]} intensity={1.8} />
        <Environment resolution={128}>
          <Lightformer intensity={2.4} position={[0, 4, -4]} scale={[10, 4, 1]} />
          <Lightformer intensity={1.6} position={[-5, 0, 3]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
          <Lightformer intensity={1.2} color="#d6f0e8" position={[5, 0, 3]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        </Environment>
        <Suspense fallback={null}>
          <Logo />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.6} minPolarAngle={Math.PI / 3} maxPolarAngle={(2 * Math.PI) / 3} />
      </Canvas>
    </div>
  )
}
