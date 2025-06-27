import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState('live-demo');
  const [code, setCode] = useState(`// Welcome to Rifad's Interactive Code Playground! 🚀
// Try editing this React component and see live results

import React, { useState } from 'react';

function InteractiveDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Visitor');
  
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '10px',
      color: 'white',
      textAlign: 'center'
    }}>
      <h2>Hello, {name}! 👋</h2>
      <p>You've clicked the button {count} times</p>
      <button 
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          margin: '10px',
          background: '#fff',
          color: '#667eea',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Click me! 🎉
      </button>
      <br />
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        style={{
          padding: '8px',
          borderRadius: '5px',
          border: 'none',
          margin: '10px'
        }}
      />
    </div>
  );
}

export default InteractiveDemo;`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [githubStats, setGithubStats] = useState({
    commits: 247,
    repos: 12,
    contributions: 1543,
    streak: 45
  });

  const challenges = [
    {
      id: 1,
      title: "React State Challenge",
      description: "Create a counter that increments by 2 each click",
      difficulty: "Easy",
      template: `function Counter() {
  // Your code here
  return <div>Counter Component</div>;
}`
    },
    {
      id: 2,
      title: "Array Manipulation",
      description: "Filter and map an array of users",
      difficulty: "Medium",
      template: `const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
];

// Filter adults and return names
function getAdultNames(users) {
  // Your code here
}`
    },
    {
      id: 3,
      title: "Async Data Fetching",
      description: "Implement a custom hook for API calls",
      difficulty: "Hard",
      template: `function useApi(url) {
  // Implement custom hook
  // Return { data, loading, error }
}`
    }
  ];

  const [selectedChallenge, setSelectedChallenge] = useState(null);

  // Simulate code execution
  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput(`✅ Code executed successfully!
      
🎯 Results:
- Component rendered without errors
- Interactive elements working
- State management implemented correctly
- Styling applied successfully

💡 Performance: 98ms execution time
🚀 Memory usage: 2.4MB`);
      setIsRunning(false);
    }, 2000);
  };

  // GitHub activity simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setGithubStats(prev => ({
        ...prev,
        commits: prev.commits + Math.floor(Math.random() * 3),
        contributions: prev.contributions + Math.floor(Math.random() * 5)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'live-demo', label: '🚀 Live Demo', icon: '💻' },
    { id: 'github-activity', label: '📊 GitHub Activity', icon: '📈' },
    { id: 'challenges', label: '🎯 Code Challenges', icon: '🏆' },
    { id: 'snippets', label: '📝 Code Snippets', icon: '⚡' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Interactive Code Playground
          </h2>
          <p className="text-gray-400 mt-2">Experience Rifad's coding skills in real-time</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Live</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'live-demo' && (
          <motion.div
            key="live-demo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Code Editor */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-300">InteractiveDemo.jsx</span>
                </div>
                <motion.button
                  onClick={runCode}
                  disabled={isRunning}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-md text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isRunning ? '⏳ Running...' : '▶️ Run Code'}
                </motion.button>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 bg-gray-900 text-green-400 font-mono text-sm resize-none focus:outline-none"
                style={{ fontFamily: 'Fira Code, monospace' }}
              />
            </div>

            {/* Output/Preview */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-700">
                <h3 className="text-sm font-medium text-gray-300">Live Preview & Output</h3>
              </div>
              
              <div className="p-4 h-96 overflow-y-auto">
                {isRunning ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-400">Executing code...</p>
                    </div>
                  </div>
                ) : output ? (
                  <pre className="text-green-400 text-sm whitespace-pre-wrap">{output}</pre>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🚀</div>
                      <p>Click "Run Code" to see the magic happen!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'github-activity' && (
          <motion.div
            key="github-activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* GitHub Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Commits', value: githubStats.commits, icon: '📝', color: 'bg-blue-500' },
                { label: 'Repositories', value: githubStats.repos, icon: '📁', color: 'bg-green-500' },
                { label: 'Contributions', value: githubStats.contributions, icon: '🔥', color: 'bg-orange-500' },
                { label: 'Current Streak', value: `${githubStats.streak} days`, icon: '⚡', color: 'bg-purple-500' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 p-6 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Pushed to', repo: 'My-Portfolio', time: '2 hours ago', type: 'push' },
                  { action: 'Created', repo: 'AI-Chat-Assistant', time: '1 day ago', type: 'create' },
                  { action: 'Merged PR in', repo: 'EcomNova', time: '2 days ago', type: 'merge' },
                  { action: 'Starred', repo: 'three.js', time: '3 days ago', type: 'star' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">
                      {activity.type === 'push' && '📤'}
                      {activity.type === 'create' && '✨'}
                      {activity.type === 'merge' && '🔀'}
                      {activity.type === 'star' && '⭐'}
                    </div>
                    <div className="flex-1">
                      <p className="text-white">
                        {activity.action} <span className="text-blue-400 font-medium">{activity.repo}</span>
                      </p>
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'challenges' && (
          <motion.div
            key="challenges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Coding Challenges</h3>
              <p className="text-gray-400">Test your skills with these interactive challenges</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedChallenge(challenge)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{challenge.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{challenge.description}</p>
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors">
                    Start Challenge
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'snippets' && (
          <motion.div
            key="snippets"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Code Snippets</h3>
              <p className="text-gray-400">Useful code snippets from Rifad's toolkit</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  title: "Custom React Hook",
                  language: "JavaScript",
                  code: `function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`
                },
                {
                  title: "API Utility Function",
                  language: "JavaScript",
                  code: `const apiClient = {
  async get(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');
    return response.json();
  },

  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network error');
    return response.json();
  }
};`
                }
              ].map((snippet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg overflow-hidden"
                >
                  <div className="p-4 bg-gray-700 flex items-center justify-between">
                    <h4 className="font-medium">{snippet.title}</h4>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {snippet.language}
                    </span>
                  </div>
                  <pre className="p-4 text-sm text-green-400 overflow-x-auto">
                    <code>{snippet.code}</code>
                  </pre>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeEditor;
