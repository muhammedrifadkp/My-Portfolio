import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SkillConstellation from '../components/SkillConstellation';
import CodeEditor from '../components/CodeEditor';
import InteractiveProjectShowcase from '../components/InteractiveProjectShowcase';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState('skills');

  const features = [
    {
      id: 'skills',
      title: '🌟 3D Skills Universe',
      description: 'Interactive 3D visualization of technical skills',
      component: <SkillConstellation />
    },
    {
      id: 'code',
      title: '💻 Live Code Playground',
      description: 'Real-time code editor with GitHub integration',
      component: <CodeEditor />
    },
    {
      id: 'projects',
      title: '🚀 Interactive Project Showcase',
      description: '3D project demos with live previews',
      component: <InteractiveProjectShowcase />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Advanced <span className="text-blue-400">Features</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience cutting-edge portfolio features including AI assistance, 
            3D visualizations, real-time interactions, and gamification elements.
          </p>
        </motion.div>

        {/* Feature Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {features.map((feature) => (
            <motion.button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeFeature === feature.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {feature.title}
            </motion.button>
          ))}
        </div>

        {/* Feature Description */}
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-lg text-gray-300">
            {features.find(f => f.id === activeFeature)?.description}
          </p>
        </motion.div>
      </div>

      {/* Feature Content */}
      <motion.div
        key={activeFeature}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {features.find(f => f.id === activeFeature)?.component}
      </motion.div>

      {/* Features List */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            All Advanced Features
          </h2>
          <p className="text-gray-300">
            This portfolio includes cutting-edge features that showcase modern web development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: '🤖',
              title: 'AI Chat Assistant',
              description: 'Intelligent chatbot that answers questions about skills, projects, and experience',
              status: 'Active'
            },
            {
              icon: '🌟',
              title: '3D Skill Visualization',
              description: 'Interactive 3D constellation showing technical skills and proficiency levels',
              status: 'Active'
            },
            {
              icon: '💻',
              title: 'Live Code Editor',
              description: 'Real-time code execution with GitHub integration and coding challenges',
              status: 'Active'
            },
            {
              icon: '🎨',
              title: 'Dynamic Themes',
              description: 'Time-based, weather-based, and seasonal themes with smooth transitions',
              status: 'Active'
            },
            {
              icon: '🚀',
              title: 'Interactive Projects',
              description: '3D project showcase with live previews and interactive demos',
              status: 'Active'
            },
            {
              icon: '👥',
              title: 'Visitor Analytics',
              description: 'Real-time visitor tracking, heatmaps, and geographic visitor map',
              status: 'Active'
            },
            {
              icon: '🎮',
              title: 'Gamification',
              description: 'Achievement system, mini-games, and hidden easter eggs',
              status: 'Active'
            },
            {
              icon: '🎯',
              title: 'Cursor Interactions',
              description: 'Animated cursor trails and click visualizations',
              status: 'Active'
            },
            {
              icon: '📊',
              title: 'Performance Monitor',
              description: 'Real-time performance metrics and optimization insights',
              status: 'Coming Soon'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 mb-4">{feature.description}</p>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  feature.status === 'Active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {feature.status}
                </span>
                {feature.status === 'Active' && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            🎮 How to Explore Features
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3">Interactive Elements</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• 🤖 <strong>AI Assistant:</strong> Click the bot icon (bottom right)</li>
                <li>• 🎨 <strong>Themes:</strong> Click the palette icon (top right)</li>
                <li>• 👥 <strong>Visitor Stats:</strong> Click the people icon (bottom left)</li>
                <li>• 🏆 <strong>Achievements:</strong> Click the trophy icon (bottom right)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-3">Hidden Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• 🎮 <strong>Snake Game:</strong> Try the Konami code (↑↑↓↓←→←→BA)</li>
                <li>• 🥚 <strong>Easter Eggs:</strong> Double-click various elements</li>
                <li>• 🔥 <strong>Heatmap:</strong> Toggle click visualization</li>
                <li>• 🌍 <strong>Visitor Map:</strong> See global visitor locations</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <p className="text-blue-200 text-center">
              💡 <strong>Pro Tip:</strong> This portfolio demonstrates advanced React patterns, 
              3D graphics with Three.js, real-time interactions, and modern web technologies. 
              Perfect for showcasing cutting-edge development skills!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
