import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { triggerHaptic } from '../utils/haptics'

const URL = '/models/saucer.glb'

function Ship({ busy, touchDrag }) {
  const { scene, animations } = useGLTF(URL, '/draco/')
  const fit = useMemo(() => {
    const b = new THREE.Box3().setFromObject(scene)
    const s = b.getSize(new THREE.Vector3())
    const c = b.getCenter(new THREE.Vector3())
    const k = 5.4 / Math.max(s.x, s.y, s.z)
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

  useFrame(({ clock, pointer }, dt) => {
    if (!outer.current) return
    const t = clock.elapsedTime
    const td = touchDrag.current
    if (!td.active) {
      td.rotX = THREE.MathUtils.damp(td.rotX, 0, 3, dt)
      td.rotY = THREE.MathUtils.damp(td.rotY, 0, 3, dt)
    }
    const targetY = (pointer.x * 0.5) + td.rotY
    const targetX = (-pointer.y * 0.2 + 0.18) + td.rotX
    outer.current.rotation.y = THREE.MathUtils.damp(outer.current.rotation.y, targetY, 3, dt)
    outer.current.rotation.x = THREE.MathUtils.damp(outer.current.rotation.x, targetX, 3, dt)
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
  const compact = typeof window !== 'undefined' && window.innerWidth <= 820
  const touchDrag = useRef({ active: false, startX: 0, startY: 0, rotX: 0, rotY: 0 })

  const onDown = (e) => {
    triggerHaptic('light')
    touchDrag.current.active = true
    touchDrag.current.startX = e.clientX
    touchDrag.current.startY = e.clientY
  }
  const onMove = (e) => {
    const td = touchDrag.current
    if (!td.active) return
    const dx = e.clientX - td.startX
    const dy = e.clientY - td.startY
    td.rotY += dx * 0.008
    td.rotX -= dy * 0.006
    td.startX = e.clientX
    td.startY = e.clientY
  }
  const onUp = () => {
    touchDrag.current.active = false
  }

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ touchAction: 'pan-y', cursor: 'grab' }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <Canvas
        dpr={[1, compact ? 1.25 : 1.75]}
        camera={{ fov: 32, position: [0, 0.6, 7] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 5, 4]} intensity={2} />
        <Environment resolution={compact ? 64 : 128}>
          <Lightformer intensity={2.2} position={[0, 5, -4]} scale={[10, 4, 1]} />
          <Lightformer intensity={1.4} position={[-5, 1, 3]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
          <Lightformer intensity={1} color="#dcebf7" position={[5, 1, 3]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        </Environment>
        <Suspense fallback={null}>
          <Ship busy={busy} touchDrag={touchDrag} />
        </Suspense>
      </Canvas>
    </div>
  )
}
