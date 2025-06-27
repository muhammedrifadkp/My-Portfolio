import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// 3D Device Models
const LaptopModel = ({ project, onClick }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef} onClick={onClick}>
      {/* Laptop Base */}
      <Box args={[4, 0.2, 3]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#2C3E50" />
      </Box>
      
      {/* Laptop Screen */}
      <Box args={[4, 2.5, 0.1]} position={[0, 0.5, -1.4]} rotation={[-0.1, 0, 0]}>
        <meshStandardMaterial color="#1A1A1A" />
      </Box>
      
      {/* Screen Content */}
      <Plane args={[3.6, 2.2]} position={[0, 0.5, -1.35]} rotation={[-0.1, 0, 0]}>
        <meshBasicMaterial color={project.primaryColor} />
      </Plane>
      
      {/* Project Title */}
      <Text
        position={[0, 0.5, -1.3]}
        rotation={[-0.1, 0, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.name}
      </Text>
    </group>
  );
};

const PhoneModel = ({ project, onClick }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={meshRef} onClick={onClick} scale={[0.8, 0.8, 0.8]}>
      {/* Phone Body */}
      <Box args={[1.5, 3, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2C3E50" />
      </Box>
      
      {/* Phone Screen */}
      <Plane args={[1.3, 2.6]} position={[0, 0, 0.16]}>
        <meshBasicMaterial color={project.primaryColor} />
      </Plane>
      
      {/* App Icon */}
      <Text
        position={[0, 0, 0.17]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.icon}
      </Text>
    </group>
  );
};

// Project data with enhanced information
const projectsData = [
  {
    id: 1,
    name: 'CDC Attendance',
    type: 'Full Stack Management System',
    description: 'Comprehensive digital attendance management system for educational institutes with enterprise security, lab management, and advanced analytics.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
    primaryColor: '#4A90E2',
    secondaryColor: '#7ED321',
    icon: '🎓',
    liveUrl: 'https://cdc-attendance-com.vercel.app',
    githubUrl: 'https://github.com/muhammedrifadkp/CDC_Attendance',
    features: [
      'Multi-Role Management (Admin/Teacher/Student)',
      'Smart Attendance Tracking System',
      'Advanced Lab Management & PC Booking',
      'Real-time Analytics & Reports',
      'Enterprise Security & Authentication',
      'Department & Course Management'
    ],
    metrics: {
      users: '500+',
      attendance: '10K+',
      accuracy: '99.8%',
      rating: 4.9
    },
    screenshots: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ]
  },
  {
    id: 2,
    name: 'Zuditt AI',
    type: 'AI Business Solutions Platform',
    description: 'AI-driven business solutions platform offering web development, digital marketing, BPO services, and innovative technology solutions.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI Integration'],
    primaryColor: '#E74C3C',
    secondaryColor: '#F39C12',
    icon: '🤖',
    liveUrl: 'https://www.zuditt.com/',
    githubUrl: 'https://github.com/muhammedrifadkp/zuditt-next',
    features: [
      'AI-Powered Business Solutions',
      'WhatsApp CRM Integration',
      'BPO Services Platform',
      'Digital Marketing Tools',
      'Multi-Industry Support',
      'Modern Responsive Design'
    ],
    metrics: {
      clients: '350+',
      projects: '120+',
      rating: '4.9/5',
      industries: '12+'
    },
    screenshots: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ]
  },
  {
    id: 3,
    name: '3D Portfolio',
    type: 'Interactive Portfolio',
    description: '3D interactive portfolio with modern animations, responsive design, and immersive user experience.',
    technologies: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    primaryColor: '#9B59B6',
    secondaryColor: '#1ABC9C',
    icon: '🌐',
    liveUrl: 'https://muhammedrifad.vercel.app/',
    githubUrl: 'https://github.com/muhammedrifadkp/3D-Rifad-Portfolio',
    features: [
      '3D Interactive Elements',
      'Smooth Page Transitions',
      'Responsive Design',
      'Contact Form Integration',
      'Project Showcase',
      'Skills Visualization'
    ],
    metrics: {
      visitors: '2.1K+',
      interactions: '8.5K+',
      avgTime: '3.2min',
      rating: 4.9
    },
    screenshots: [
      '/api/placeholder/400/300',
      '/api/placeholder/400/300',
      '/api/placeholder/400/300'
    ]
  }
];

// Interactive Demo Component
const InteractiveDemo = ({ project }) => {
  const [currentView, setCurrentView] = useState('desktop');
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Live Preview */}
      <div className="space-y-4">
        <div className="flex space-x-2 mb-4">
          {['desktop', 'mobile'].map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`px-4 py-2 rounded-lg transition-all ${
                currentView === view
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {view === 'desktop' ? '💻 Desktop' : '📱 Mobile'}
            </button>
          ))}
        </div>

        <div className={`bg-gray-100 rounded-lg overflow-hidden ${
          currentView === 'desktop' ? 'aspect-video' : 'aspect-[9/16] max-w-sm mx-auto'
        }`}>
          <iframe
            src={project.liveUrl}
            className="w-full h-full border-0"
            title={`${project.name} Preview`}
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(project.metrics).map(([key, value]) => (
            <div key={key} className="text-center p-3 bg-white rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{value}</div>
              <div className="text-sm text-gray-600 capitalize">{key}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features List */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Key Features</h4>
          <div className="space-y-2">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  activeFeature === index
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🚀 Live Demo
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-gray-900 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            💻 Source Code
          </motion.a>
        </div>
      </div>
    </div>
  );
};

// Main Component
const InteractiveProjectShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('3d'); // '3d', 'grid', 'detailed'

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Project Showcase
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Explore Rifad's projects in an immersive 3D environment
          </p>
          
          {/* View Mode Toggle */}
          <div className="flex justify-center space-x-2">
            {[
              { id: '3d', label: '🎮 3D View', icon: '🎮' },
              { id: 'grid', label: '📱 Grid View', icon: '📱' },
              { id: 'detailed', label: '📋 Detailed View', icon: '📋' }
            ].map((mode) => (
              <motion.button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  viewMode === mode.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mode.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 3D View */}
        {viewMode === '3d' && (
          <div className="h-96 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl overflow-hidden">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              {projectsData.map((project, index) => (
                <group key={project.id} position={[(index - 1) * 6, 0, 0]}>
                  {index % 2 === 0 ? (
                    <LaptopModel 
                      project={project} 
                      onClick={() => setSelectedProject(project)}
                    />
                  ) : (
                    <PhoneModel 
                      project={project} 
                      onClick={() => setSelectedProject(project)}
                    />
                  )}
                </group>
              ))}
              
              <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
            </Canvas>
            
            {/* 3D Instructions */}
            <div className="absolute top-4 left-4 bg-black/50 text-white p-3 rounded-lg">
              <p className="text-sm">🖱️ Click and drag to rotate • 🔍 Scroll to zoom • 👆 Click projects to explore</p>
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                whileHover={{ y: -5, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                onClick={() => setSelectedProject(project)}
              >
                <div 
                  className="h-48 flex items-center justify-center text-6xl"
                  style={{ backgroundColor: project.primaryColor + '20' }}
                >
                  {project.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.type}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {project.technologies.slice(0, 2).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          +{project.technologies.length - 2}
                        </span>
                      )}
                    </div>
                    <div className="text-yellow-500">
                      ⭐ {project.metrics.rating}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Detailed View */}
        {viewMode === 'detailed' && (
          <div className="space-y-12">
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: project.id * 0.2 }}
              >
                <div className="p-8">
                  <InteractiveDemo project={project} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedProject.name}</h2>
                    <p className="text-gray-600">{selectedProject.type}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <InteractiveDemo project={selectedProject} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveProjectShowcase;
