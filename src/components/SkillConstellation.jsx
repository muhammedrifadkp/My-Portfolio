import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, OrbitControls, Html, MeshDistortMaterial, Line, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import * as THREE from 'three';
import './SkillConstellation.css';

// Tech matrix dataset for Muhammed Rifad KP
const techMatrix = [
  {
    id: 'frontend',
    category: 'Frontend & 3D WebGL',
    color: '#00F0FF',
    position: [-4.2, 0.8, 0],
    shape: 'cube',
    skills: [
      { name: 'React.js 18', level: 95, icon: 'fab fa-react', desc: 'SPA & SSR architecture with dynamic hooks, state management, and virtual DOM diffing.' },
      { name: 'JavaScript ES6+', level: 95, icon: 'fab fa-js', desc: 'Asynchronous event loops, dynamic imports, Web APIs, and functional code patterns.' },
      { name: 'Three.js & WebGL', level: 88, icon: 'fas fa-cube', desc: '3D canvas rendering, shaders, GLTF models, lighting setups, and camera controller math.' },
      { name: 'Next.js App Router', level: 92, icon: 'fas fa-globe', desc: 'Full-stack SSR, static site generation, server actions, and edge API routes.' },
      { name: 'Tailwind CSS', level: 90, icon: 'fas fa-wind', desc: 'Responsive dark design systems, glassmorphism utilities, and custom theme tokens.' },
      { name: 'GSAP Animations', level: 90, icon: 'fas fa-magic', desc: 'ScrollTrigger timelines, 3D transform matrices, SVG morphing, and micro-interactions.' }
    ]
  },
  {
    id: 'backend',
    category: 'Backend & MERN Stack',
    color: '#9D00FF',
    position: [4.2, 0.8, 0],
    shape: 'torus',
    skills: [
      { name: 'Node.js', level: 90, icon: 'fab fa-node-js', desc: 'Non-blocking I/O event loops, stream processing, microservices, and server architecture.' },
      { name: 'Express.js', level: 88, icon: 'fas fa-server', desc: 'RESTful API controllers, authentication middleware, error boundaries, and route modules.' },
      { name: 'MongoDB Database', level: 85, icon: 'fas fa-database', desc: 'Document indexing, Mongoose schemas, aggregation pipelines, and cloud Atlas databases.' },
      { name: 'REST & WebSockets', level: 92, icon: 'fas fa-network-wired', desc: 'Real-time two-way web sockets, HTTP standards, JSON web tokens, and Webhook dispatchers.' },
      { name: 'JWT & Security', level: 88, icon: 'fas fa-shield-alt', desc: 'Bcrypt hashing, token refresh strategies, CORS policies, and rate-limiting security.' }
    ]
  },
  {
    id: 'devops',
    category: 'DevOps & Architecture',
    color: '#FF007A',
    position: [0, -2.5, 0],
    shape: 'cylinder',
    skills: [
      { name: 'Git & GitHub', level: 92, icon: 'fab fa-github', desc: 'Version control branching, pull request code reviews, and Git action automated pipelines.' },
      { name: 'Vercel Edge Hosting', level: 95, icon: 'fas fa-cloud', desc: 'Automated CI/CD deployments, edge functions, custom DNS domains, and CDN caching.' },
      { name: 'Vite 7 Bundler', level: 90, icon: 'fas fa-bolt', desc: 'Lightning-fast HMR server, Rollup module bundling, and optimized code splitting.' },
      { name: 'Postman & Testing', level: 88, icon: 'fas fa-vial', desc: 'Automated API endpoint testing, request suites, environment staging, and load validation.' }
    ]
  }
];

// Central Holographic Energy Core
const HolographicCore = () => {
  const innerRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.4;
      innerRef.current.rotation.x = t * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.6;
      ringRef.current.rotation.x = Math.sin(t) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic Pulsing Core Sphere */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh ref={innerRef}>
          <sphereGeometry args={[1.0, 32, 32]} />
          <MeshDistortMaterial
            color="#00F0FF"
            emissive="#9D00FF"
            emissiveIntensity={0.9}
            roughness={0.1}
            distort={0.35}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Rotating Laser Halo Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.8, 0.03, 16, 80]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} wireframe />
      </mesh>

      {/* Outer Hologram Wireframe Grid */}
      <mesh>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial color="#9D00FF" transparent opacity={0.08} wireframe />
      </mesh>
    </group>
  );
};

// 3D Holographic Skill Crystal Module
const SkillCrystal = ({ sector, skill, position, onSelect, isHovered, setIsHovered }) => {
  const crystalRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 0.6 + position[0];
      crystalRef.current.rotation.x = Math.sin(t + position[1]) * 0.25;
      crystalRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.08;
    }
  });

  return (
    <group position={position}>
      {/* 3D Solid Mesh with distinct geometry */}
      <mesh
        ref={crystalRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(skill.name);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setIsHovered(null);
          document.body.style.cursor = 'default';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(skill, sector.category);
        }}
        scale={isHovered === skill.name ? 1.35 : 1.0}
      >
        {sector.shape === 'cube' && <boxGeometry args={[0.5, 0.5, 0.5]} />}
        {sector.shape === 'torus' && <torusGeometry args={[0.3, 0.12, 16, 32]} />}
        {sector.shape === 'cylinder' && <cylinderGeometry args={[0.25, 0.35, 0.55, 16]} />}

        <meshStandardMaterial
          color={skill.color}
          emissive={sector.color}
          emissiveIntensity={isHovered === skill.name ? 0.9 : 0.35}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Wireframe Halo */}
      <mesh scale={isHovered === skill.name ? 1.4 : 1.15}>
        {sector.shape === 'cube' && <boxGeometry args={[0.5, 0.5, 0.5]} />}
        {sector.shape === 'torus' && <torusGeometry args={[0.3, 0.12, 16, 32]} />}
        {sector.shape === 'cylinder' && <cylinderGeometry args={[0.25, 0.35, 0.55, 16]} />}

        <meshBasicMaterial
          color={sector.color}
          transparent
          opacity={isHovered === skill.name ? 0.6 : 0.2}
          wireframe
        />
      </mesh>

      {/* Holographic HTML Tag */}
      <Html distanceFactor={13} position={[0, 0.7, 0]} center>
        <div 
          className={`holo-skill-chip ${isHovered === skill.name ? 'active' : ''}`}
          onClick={() => onSelect(skill, sector.category)}
        >
          <div className="chip-indicator" style={{ background: sector.color, boxShadow: `0 0 10px ${sector.color}` }}></div>
          <i className={skill.icon}></i>
          <span className="chip-title">{skill.name}</span>
          <span className="chip-percent" style={{ color: sector.color }}>{skill.level}%</span>
        </div>
      </Html>
    </group>
  );
};

// Laser Energy Beams connecting Core to Sectors
const LaserBeams = () => {
  const lines = useMemo(() => {
    const beams = [];
    techMatrix.forEach((sector) => {
      // Beam from Core (0,0,0) to Sector Center
      beams.push({ points: [[0, 0, 0], sector.position], color: sector.color, width: 2 });

      // Beams from Sector Center to individual skill crystals
      sector.skills.forEach((skill, idx) => {
        const angle = (idx / sector.skills.length) * Math.PI * 2;
        const radius = 1.8;
        const crystalPos = [
          sector.position[0] + Math.cos(angle) * radius,
          sector.position[1] + Math.sin(angle * 2) * 0.4,
          sector.position[2] + Math.sin(angle) * radius
        ];
        beams.push({ points: [sector.position, crystalPos], color: sector.color, width: 1 });
      });
    });
    return beams;
  }, []);

  return (
    <>
      {lines.map((beam, idx) => (
        <Line
          key={idx}
          points={beam.points}
          color={beam.color}
          opacity={0.3}
          transparent
          lineWidth={beam.width}
        />
      ))}
    </>
  );
};

// Main 3D Matrix Scene
const CyberMatrixScene = ({ selectedSectorId, onSelectSkill }) => {
  const { camera } = useThree();
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Smooth Camera GSAP focus when a sector is selected
  useEffect(() => {
    if (!selectedSectorId) {
      gsap.to(camera.position, { x: 0, y: 0, z: 13.5, duration: 1.4, ease: 'power3.inOut' });
      return;
    }
    const targetSector = techMatrix.find(s => s.id === selectedSectorId);
    if (targetSector) {
      gsap.to(camera.position, {
        x: targetSector.position[0] * 0.8,
        y: targetSector.position[1] * 0.8 + 0.4,
        z: targetSector.position[2] + 7.5,
        duration: 1.4,
        ease: 'power3.inOut'
      });
    }
  }, [selectedSectorId, camera]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 15, 10]} intensity={1.5} color="#00F0FF" />
      <pointLight position={[-10, -15, -10]} intensity={1.5} color="#9D00FF" />

      <Stars radius={80} depth={40} count={3000} factor={4} saturation={0} fade speed={1.5} />

      {/* Central Energy Core */}
      <HolographicCore />

      {/* Sector Nodes & Crystals */}
      {techMatrix.map((sector) => {
        if (selectedSectorId && selectedSectorId !== sector.id) return null;

        return (
          <group key={sector.id}>
            {/* Floating Sector Header Badge */}
            <Html position={sector.position} center distanceFactor={14}>
              <div className="sector-header-badge" style={{ borderColor: sector.color, boxShadow: `0 0 18px ${sector.color}40` }}>
                <span className="badge-glow-dot" style={{ background: sector.color }}></span>
                <span className="badge-text">{sector.category}</span>
              </div>
            </Html>

            {/* Individual Skill Crystals */}
            {sector.skills.map((skill, idx) => {
              const angle = (idx / sector.skills.length) * Math.PI * 2;
              const radius = 1.8;
              const position = [
                sector.position[0] + Math.cos(angle) * radius,
                sector.position[1] + Math.sin(angle * 2) * 0.4,
                sector.position[2] + Math.sin(angle) * radius
              ];

              return (
                <SkillCrystal
                  key={skill.name}
                  sector={sector}
                  skill={skill}
                  position={position}
                  onSelect={onSelectSkill}
                  isHovered={hoveredSkill}
                  setIsHovered={setHoveredSkill}
                />
              );
            })}
          </group>
        );
      })}

      <LaserBeams />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        maxDistance={16}
        minDistance={9}
        maxPolarAngle={Math.PI / 2 + 0.3}
        minPolarAngle={Math.PI / 2 - 0.3}
        autoRotate={!selectedSectorId}
        autoRotateSpeed={0.9}
      />
    </>
  );
};

// Main Export Component
const SkillConstellation = () => {
  const [selectedSectorId, setSelectedSectorId] = useState(null);
  const [activeModalSkill, setActiveModalSkill] = useState(null);

  const handleSelectSkill = (skill, categoryTitle) => {
    setActiveModalSkill({ ...skill, categoryTitle });
  };

  return (
    <div className="cyber-matrix-wrapper">
      {/* Top HUD Filter Bar */}
      <div className="hud-nav-bar">
        <button
          className={`hud-btn ${!selectedSectorId ? 'active' : ''}`}
          onClick={() => setSelectedSectorId(null)}
        >
          <i className="fas fa-layer-group" style={{ color: '#00F0FF' }}></i> All Sectors Matrix
        </button>

        {techMatrix.map((sector) => (
          <button
            key={sector.id}
            className={`hud-btn ${selectedSectorId === sector.id ? 'active' : ''}`}
            onClick={() => setSelectedSectorId(sector.id)}
            style={{
              borderColor: selectedSectorId === sector.id ? sector.color : undefined,
              boxShadow: selectedSectorId === sector.id ? `0 0 15px ${sector.color}40` : undefined
            }}
          >
            <span className="hud-dot" style={{ background: sector.color }}></span>
            <span>{sector.category}</span>
          </button>
        ))}
      </div>

      {/* Guide Pill */}
      <div className="hud-guide-pill">
        <span className="pulse-cyan-dot"></span> 3D WebGL Matrix | Drag to Rotate | Click Crystals to Inspect
      </div>

      {/* 3D WebGL Canvas */}
      <Canvas camera={{ position: [0, 0, 13.5], fov: 46 }}>
        <CyberMatrixScene
          selectedSectorId={selectedSectorId}
          onSelectSkill={handleSelectSkill}
        />
      </Canvas>

      {/* Cyber Glass Inspection Modal */}
      <AnimatePresence>
        {activeModalSkill && (
          <motion.div
            className="cyber-modal-card"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ duration: 0.3 }}
          >
            <button className="cyber-modal-close" onClick={() => setActiveModalSkill(null)}>
              <i className="fas fa-times"></i>
            </button>

            <div className="cyber-modal-header">
              <div className="skill-icon-frame">
                <i className={activeModalSkill.icon}></i>
              </div>
              <div>
                <span className="cyber-sector-lbl">{activeModalSkill.categoryTitle}</span>
                <h3 className="cyber-skill-title">{activeModalSkill.name}</h3>
              </div>
            </div>

            <p className="cyber-skill-body">{activeModalSkill.desc}</p>

            <div className="cyber-benchmark-box">
              <div className="benchmark-text">
                <span>Engineering Proficiency</span>
                <span className="benchmark-value">{activeModalSkill.level}%</span>
              </div>
              <div className="benchmark-track">
                <motion.div
                  className="benchmark-fill"
                  initial={{ width: '0%' }}
                  animate={{ width: `${activeModalSkill.level}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>

            <div className="cyber-modal-footer">
              <div className="footer-metric">
                <span className="metric-lbl">Skill Tier</span>
                <span className="metric-val">{activeModalSkill.level >= 90 ? 'Production Lead' : 'Senior Specialist'}</span>
              </div>
              <div className="footer-metric">
                <span className="metric-lbl">Status</span>
                <span className="metric-val active">⚡ Active in Production</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillConstellation;
