import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Fox() {
  const { scene, animations } = useGLTF('/models/fox.glb', '/draco/')
  const fit = useMemo(() => {
    const b = new THREE.Box3().setFromObject(scene)
    const s = b.getSize(new THREE.Vector3())
    const c = b.getCenter(new THREE.Vector3())
    const k = 2.2 / Math.max(s.x, s.y, s.z)
    return { k, offset: [-c.x * k, -b.min.y * k, -c.z * k] }
  }, [scene])
  const inner = useRef()
  const outer = useRef()
  const { actions } = useAnimations(animations, inner)
  useEffect(() => { (actions.walk || Object.values(actions)[0])?.reset().play() }, [actions])

  /* walks a slow circle, sniffing for the page */
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.45
    if (!outer.current) return
    outer.current.position.set(Math.sin(t) * 1.1, -1, Math.cos(t) * 0.7 - 0.6)
    outer.current.rotation.y = Math.atan2(Math.cos(t) * 1.1, -Math.sin(t) * 0.7)
  })
  return (
    <group ref={outer}>
      <group ref={inner} scale={fit.k} position={fit.offset}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

export default function FoxScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 35, position: [0, 1.4, 7] }}>
      <hemisphereLight args={['#ffffff', '#cfe0d9', 1.6]} />
      <directionalLight position={[3, 5, 4]} intensity={2} />
      <Suspense fallback={null}>
        <Fox />
      </Suspense>
    </Canvas>
  )
}
