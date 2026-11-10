import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import './NotFound.css'

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

export default function NotFound() {
  useEffect(() => { document.title = 'Page not found | Muhammed Rifad KP' }, [])
  return (
    <div className="page notfound wrap">
      <div className="nf-copy" data-stagger="90">
        <h1 className="t-display" data-reveal>Lost the trail.</h1>
        <p className="t-statement" data-reveal>This page isn’t here. The fox is still looking, but the work is one click away.</p>
        <div className="nf-actions" data-reveal>
          <Link className="btn btn-primary" to="/">Go home</Link>
          <Link className="btn btn-quiet" to="/projects">See the work</Link>
        </div>
      </div>
      <div className="nf-stage" aria-hidden="true">
        <Canvas dpr={[1, 1.75]} camera={{ fov: 35, position: [0, 1.4, 7] }}>
          <hemisphereLight args={['#ffffff', '#cdd9e4', 1.6]} />
          <directionalLight position={[3, 5, 4]} intensity={2} />
          <Suspense fallback={null}>
            <Fox />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
