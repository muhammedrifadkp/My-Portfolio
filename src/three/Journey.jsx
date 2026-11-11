import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js'
import * as THREE from 'three'

const damp = THREE.MathUtils.damp

/* scale any model so its largest side is `size` and centre it */
function useFitted(scene, size) {
  return useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const s = box.getSize(new THREE.Vector3())
    const c = box.getCenter(new THREE.Vector3())
    const k = size / Math.max(s.x, s.y, s.z)
    return { k, offset: [-c.x * k, -c.y * k, -c.z * k] }
  }, [scene, size])
}

function Sky() {
  const { scene } = useGLTF('/models/sky.glb', '/draco/')
  useMemo(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.material = o.material.clone()
        o.material.side = THREE.DoubleSide
        o.material.depthWrite = false
        o.material.toneMapped = false
        o.frustumCulled = false
        o.renderOrder = -1
      }
    })
  }, [scene])
  const fit = useFitted(scene, 120)
  const ref = useRef()
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.006 })
  return (
    <group ref={ref}>
      <group scale={fit.k} position={fit.offset}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

function Plane({ state, compact }) {
  const { scene, animations } = useGLTF('/models/plane.glb', '/draco/')
  const fit = useFitted(scene, compact ? 3.0 : 3.4)
  const ref = useRef()
  const inner = useRef()
  const { actions } = useAnimations(animations, inner)
  useEffect(() => {
    const a = Object.values(actions)[0]
    a?.reset().play()
  }, [actions])

  /* the route: low over the island on the left, out and up to the right */
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(compact ? -4.5 : -6.5, -0.4, -1),
        new THREE.Vector3(-2.2, -0.1, 1),
        new THREE.Vector3(0, 0.3, 1.2),
        new THREE.Vector3(3.2, 1.4, 0),
        new THREE.Vector3(compact ? 7.5 : 10, 3.2, -4),
      ]),
    [compact]
  )
  const p = useRef(0)
  useFrame((_, dt) => {
    p.current = damp(p.current, state.current.progress, 4, dt)
    const t = THREE.MathUtils.clamp(p.current, 0, 1) * 0.96 + 0.02
    const pos = curve.getPointAt(t)
    const ahead = curve.getPointAt(Math.min(t + 0.01, 1))
    if (!ref.current) return
    ref.current.position.copy(pos)
    ref.current.position.y += Math.sin(performance.now() / 700) * 0.06
    ref.current.lookAt(ahead)
    ref.current.rotateZ(-0.25 + Math.sin(performance.now() / 1100) * 0.06)
  })
  return (
    <group ref={ref}>
      {/* the model's nose points along -z in its file: turn it to face the route */}
      <group ref={inner} rotation={[0, Math.PI, 0]} scale={fit.k} position={fit.offset}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

function Bird({ position, phase = 0, scale = 1.1, speed = 1 }) {
  const { scene, animations } = useGLTF('/models/bird.glb', '/draco/')
  const copy = useMemo(() => cloneSkinned(scene), [scene])
  const fit = useFitted(scene, scale)
  const ref = useRef()
  const inner = useRef()
  const { actions } = useAnimations(animations, inner)
  useEffect(() => {
    const a = Object.values(actions)[0]
    if (a) { a.reset().play(); a.time = phase; a.timeScale = speed }
  }, [actions, phase, speed])
  useFrame(() => {
    if (!ref.current) return
    const t = performance.now() / 1000 * 0.35 * speed + phase
    ref.current.position.set(position[0] + Math.sin(t) * 1.6, position[1] + Math.sin(t * 2) * 0.25, position[2] + Math.cos(t) * 0.8)
    ref.current.rotation.y = Math.atan2(Math.cos(t) * 1.6, -Math.sin(t) * 0.8) + Math.PI / 2
  })
  return (
    <group ref={ref}>
      <group ref={inner} scale={fit.k} position={fit.offset}>
        <primitive object={copy} />
      </group>
    </group>
  )
}

function Island({ state, compact }) {
  const { scene } = useGLTF('/models/island.glb', '/draco/')
  const fit = useFitted(scene, compact ? 4.4 : 5.2)
  const ref = useRef()
  useFrame(() => {
    if (!ref.current) return
    const baseY = compact ? -1.4 : -3.4
    ref.current.position.y = baseY + Math.sin(performance.now() / 1800) * 0.08 + state.current.progress * 0.6
    ref.current.rotation.y = -0.6 + state.current.progress * 0.5
  })
  return (
    <group ref={ref} position={[compact ? 1.0 : 3.4, compact ? -1.4 : -3.1, -1]}>
      <group scale={fit.k} position={fit.offset}>
        <primitive object={scene} />
      </group>
      <Fox />
    </group>
  )
}

function Fox() {
  const { scene, animations } = useGLTF('/models/fox.glb', '/draco/')
  const fit = useFitted(scene, 0.7)
  const inner = useRef()
  const { actions } = useAnimations(animations, inner)
  useEffect(() => {
    const act = actions.idle || Object.values(actions)[0]
    act?.reset().play()
  }, [actions])
  return (
    <group position={[0.4, 0.95, 0.6]} rotation={[0, 0.9, 0]}>
      <group ref={inner} scale={fit.k} position={[fit.offset[0], 0, fit.offset[2]]}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

function Rig({ state, compact }) {
  const { camera, size } = useThree()
  useFrame((s, dt) => {
    const narrow = size.width / size.height < 1
    const p = state.current.progress
    const touchX = state.current.touchX || 0
    const touchY = state.current.touchY || 0
    
    // Smoothly decay touch tilt
    if (!state.current.touching && (state.current.touchX || state.current.touchY)) {
      state.current.touchX = damp(state.current.touchX, 0, 3, dt)
      state.current.touchY = damp(state.current.touchY, 0, 3, dt)
    }

    camera.position.x = damp(camera.position.x, (narrow ? 0.3 : 0) + p * (narrow ? 1.0 : 1.2) + s.pointer.x * (compact ? 0.3 : 0.6) + touchX, 3, dt)
    camera.position.y = damp(camera.position.y, (narrow ? 0.25 : 0) + p * 0.8 + s.pointer.y * (compact ? 0.2 : 0.35) + touchY, 3, dt)
    camera.position.z = narrow ? 12.5 : 11
    camera.lookAt(p * (narrow ? 1.2 : 1.6), p * 0.6 + (narrow ? 0.15 : 0), 0)
  })
  return null
}

function Scene({ state, compact }) {
  return (
    <>
      <Rig state={state} compact={compact} />
      <Sky />
      <Island state={state} compact={compact} />
      <Plane state={state} compact={compact} />
      <Bird position={[3.2, 2.2, -3]} phase={0} />
      <Bird position={[5.4, 3.1, -6]} phase={1.7} scale={0.8} speed={0.85} />
    </>
  )
}

/* The sky, the island and everything that flies: loaded only when the section is near. */
export default function FlightScene({ state, active, compact }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, compact ? 1.25 : 1.6]}
      camera={{ fov: compact ? 44 : 40, position: [0, 0, 11], near: 0.1, far: 300 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <hemisphereLight args={['#ffffff', '#b8cde0', 1.4]} />
      <directionalLight position={[5, 8, 6]} intensity={2.2} />
      <Suspense fallback={null}>
        <Scene state={state} compact={compact} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/plane.glb', '/draco/')
useGLTF.preload('/models/bird.glb', '/draco/')
useGLTF.preload('/models/island.glb', '/draco/')
useGLTF.preload('/models/fox.glb', '/draco/')
useGLTF.preload('/models/sky.glb', '/draco/')
