import React, { Suspense, useRef, useFrame } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

// Create a loader component using Three.js compatible elements
const Loader = () => {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

// The 3D model component
const Computer = ({ scale = 0.5, position = [0, -1.5, -1.5], rotation = [0.1, 0.6, -0.1] }) => {
  // Path to the 3D model
  const computer = useGLTF('/desktop_pc/scene.gltf');
  const computerRef = useRef();

  useFrame(({ clock }) => {
    if (computerRef.current) {
      const time = clock.getElapsedTime();
      // Adjust the swing amplitude and speed as needed
      const swingAmplitude = 0.2; // Adjust this value for larger or smaller swings
      const swingSpeed = 1.0; // Adjust this value for faster or slower swings
      const swing = Math.sin(time * swingSpeed) * swingAmplitude;
      computerRef.current.rotation.y = swing;
    }
  });

  return (
    <group>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[0, 50, 10]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1.5} position={[10, 10, 10]} />
      <primitive
        ref={computerRef}
        object={computer.scene}
        scale={scale}
        position={position}
        rotation={rotation}
        receiveShadow
        castShadow
      />
    </group>
  );
};

// The canvas wrapper component
const ComputerCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      style={{ background: 'transparent' }}
    >
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={1.5} />

      <Suspense fallback={<Loader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computer />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;