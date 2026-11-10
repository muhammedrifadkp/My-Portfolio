import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const URL = '/models/saucer.glb'

function Ship({ busy }) {
  const { scene, animations } = useGLTF(URL, '/draco/')
  const fit = useMemo(() => {
    const b = new THREE.Box3().setFromObject(scene)
    const s = b.getSize(new THREE.Vector3())
    const c = b.getCenter(new THREE.Vector3())
    const k = 4.4 / Math.max(s.x, s.y, s.z)
    /* the file uses spec-gloss materials three.js no longer reads: give it brushed aluminium */
    const hull = new THREE.MeshStandardMaterial({ color: '#dfe3e8', metalness: 0.9, roughness: 0.26 })
    const beam = new THREE.MeshStandardMaterial({ color: '#0066cc', emissive: '#2997ff', emissiveIntensity: 1.4, transparent: true, opacity: 0.55, roughness: 0.4 })
    scene.traverse((o) => {
      if (o.isMesh) o.material = /ring/i.test(o.name) ? beam : hull
    })
    return { k, offset: [-c.x * k, -c.y * k, -c.z * k] }
  }, [scene])
  const inner = useRef()
  const outer = useRef()
  const { actions } = useAnimations(animations, inner)

  useEffect(() => {
    actions.hover?.reset().fadeIn(0.4).play()
  }, [actions])

  /* while the answer is coming, the beam rings run */
  useEffect(() => {
    const rings = actions.abduction_rings
    if (!rings) return
    if (busy) rings.reset().fadeIn(0.3).play()
    else rings.fadeOut(0.6)
  }, [busy, actions])

  useFrame(({ clock, pointer }) => {
    if (!outer.current) return
    const t = clock.elapsedTime
    outer.current.rotation.y = THREE.MathUtils.damp(outer.current.rotation.y, pointer.x * 0.5, 3, 0.016)
    outer.current.rotation.x = THREE.MathUtils.damp(outer.current.rotation.x, -pointer.y * 0.2 + 0.18, 3, 0.016)
    outer.current.position.y = Math.sin(t * 1.2) * 0.08
  })

  return (
    <group ref={outer}>
      <group ref={inner} scale={fit.k} position={fit.offset}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

export default function Saucer({ busy, className }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas dpr={[1, 1.75]} camera={{ fov: 32, position: [0, 0.6, 7] }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={2} />
        <Environment resolution={128}>
          <Lightformer intensity={2.2} position={[0, 5, -4]} scale={[10, 4, 1]} />
          <Lightformer intensity={1.4} position={[-5, 1, 3]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
          <Lightformer intensity={1} color="#dcebf7" position={[5, 1, 3]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        </Environment>
        <Suspense fallback={null}>
          <Ship busy={busy} />
        </Suspense>
      </Canvas>
    </div>
  )
}
