import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Sphere, Line, OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Skill data with categories and proficiency
const skillsData = {
  frontend: {
    skills: [
      { name: 'React', level: 95, color: '#61DAFB' },
      { name: 'JavaScript', level: 90, color: '#F7DF1E' },
      { name: 'Three.js', level: 85, color: '#000000' },
      { name: 'HTML5', level: 95, color: '#E34F26' },
      { name: 'CSS3', level: 90, color: '#1572B6' },
      { name: 'Tailwind', level: 88, color: '#38B2AC' }
    ],
    position: [0, 0, 0],
    color: '#4A90E2'
  },
  backend: {
    skills: [
      { name: 'Node.js', level: 85, color: '#339933' },
      { name: 'Express', level: 80, color: '#000000' },
      { name: 'MongoDB', level: 75, color: '#47A248' },
      { name: 'JWT', level: 85, color: '#000000' },
      { name: 'REST API', level: 88, color: '#FF6B6B' }
    ],
    position: [8, 0, 0],
    color: '#7ED321'
  },
  tools: {
    skills: [
      { name: 'Git', level: 90, color: '#F05032' },
      { name: 'GitHub', level: 88, color: '#181717' },
      { name: 'Vite', level: 85, color: '#646CFF' },
      { name: 'Vercel', level: 80, color: '#000000' },
      { name: 'VS Code', level: 95, color: '#007ACC' }
    ],
    position: [-8, 0, 0],
    color: '#F5A623'
  }
};

// Individual skill orb component
const SkillOrb = ({ skill, position, categoryColor, onClick }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  const orbSize = (skill.level / 100) * 0.8 + 0.2;

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[orbSize, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        scale={hovered ? 1.2 : 1}
      >
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Skill name label */}
      <Html distanceFactor={10} position={[0, orbSize + 0.5, 0]}>
        <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
          {skill.name} - {skill.level}%
        </div>
      </Html>
      
      {/* Particle effects around orb */}
      <ParticleRing radius={orbSize + 0.3} count={skill.level / 10} color={skill.color} />
    </group>
  );
};

// Particle ring around skill orbs
const ParticleRing = ({ radius, count, color }) => {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      temp.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.1,
          Math.sin(angle) * radius
        )
      );
    }
    return temp;
  }, [radius, count]);

  return (
    <group>
      {points.map((point, index) => (
        <Sphere key={index} position={point} args={[0.02]}>
          <meshBasicMaterial color={color} />
        </Sphere>
      ))}
    </group>
  );
};

// Connection lines between related skills
const SkillConnections = () => {
  const connections = [
    // Frontend connections
    [[0, 0, 0], [1.5, 0.5, 0]], // React to JavaScript
    [[1.5, 0.5, 0], [0, 1, 0]], // JavaScript to Three.js
    [[0, -1, 0], [1, -0.5, 0]], // HTML to CSS
    
    // Backend connections
    [[8, 0, 0], [9.5, 0.5, 0]], // Node.js to Express
    [[9.5, 0.5, 0], [8, 1, 0]], // Express to MongoDB
    
    // Cross-category connections
    [[1.5, 0.5, 0], [8, 0, 0]], // JavaScript to Node.js
    [[-6, 0, 0], [0, 0, 0]], // Git to React
  ];

  return (
    <>
      {connections.map((connection, index) => (
        <Line
          key={index}
          points={connection}
          color="#ffffff"
          opacity={0.3}
          transparent
          lineWidth={1}
        />
      ))}
    </>
  );
};

// Main 3D scene component
const SkillScene = ({ selectedCategory, onSkillClick }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
      
      {/* Render skill orbs for each category */}
      {Object.entries(skillsData).map(([categoryName, categoryData]) => {
        if (selectedCategory && selectedCategory !== categoryName) return null;
        
        return categoryData.skills.map((skill, index) => {
          const angle = (index / categoryData.skills.length) * Math.PI * 2;
          const radius = 3;
          const position = [
            categoryData.position[0] + Math.cos(angle) * radius,
            categoryData.position[1] + Math.sin(angle) * 0.5,
            categoryData.position[2] + Math.sin(angle) * radius
          ];
          
          return (
            <SkillOrb
              key={`${categoryName}-${skill.name}`}
              skill={skill}
              position={position}
              categoryColor={categoryData.color}
              onClick={() => onSkillClick(skill, categoryName)}
            />
          );
        });
      })}
      
      {/* Category center labels */}
      {Object.entries(skillsData).map(([categoryName, categoryData]) => {
        if (selectedCategory && selectedCategory !== categoryName) return null;
        
        return (
          <Text
            key={categoryName}
            position={categoryData.position}
            fontSize={0.8}
            color={categoryData.color}
            anchorX="center"
            anchorY="middle"
          >
            {categoryName.toUpperCase()}
          </Text>
        );
      })}
      
      <SkillConnections />
      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
    </>
  );
};

// Main component
const SkillConstellation = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkillClick = (skill, category) => {
    setSelectedSkill({ ...skill, category });
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative">
      {/* Category Filter Buttons */}
      <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-2">
        <motion.button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full transition-all ${
            !selectedCategory 
              ? 'bg-white text-gray-900' 
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Skills
        </motion.button>
        
        {Object.entries(skillsData).map(([categoryName, categoryData]) => (
          <motion.button
            key={categoryName}
            onClick={() => setSelectedCategory(categoryName)}
            className={`px-4 py-2 rounded-full transition-all ${
              selectedCategory === categoryName
                ? 'bg-white text-gray-900'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            style={{
              backgroundColor: selectedCategory === categoryName ? categoryData.color : undefined
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute top-6 right-6 z-10 bg-black/50 text-white p-4 rounded-lg max-w-xs">
        <h3 className="font-semibold mb-2">🌟 Interactive Skills</h3>
        <ul className="text-sm space-y-1">
          <li>• Click and drag to rotate</li>
          <li>• Scroll to zoom in/out</li>
          <li>• Hover over orbs for details</li>
          <li>• Click orbs for more info</li>
        </ul>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
        <SkillScene 
          selectedCategory={selectedCategory} 
          onSkillClick={handleSkillClick}
        />
      </Canvas>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-6 left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-sm z-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {selectedSkill.name}
            </h3>
            <button
              onClick={() => setSelectedSkill(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Proficiency</span>
                <span>{selectedSkill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: selectedSkill.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedSkill.level}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Category:</strong> {selectedSkill.category}
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Experience level: {selectedSkill.level >= 90 ? 'Expert' : selectedSkill.level >= 75 ? 'Advanced' : 'Intermediate'}
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-6 right-6 bg-black/50 text-white p-4 rounded-lg z-10">
        <h4 className="font-semibold mb-2">Legend</h4>
        <div className="space-y-1 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Frontend</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Backend</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Tools</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillConstellation;
