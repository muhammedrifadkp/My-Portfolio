import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState('live-demo');
  const [showPreview, setShowPreview] = useState(true);
  const [codeMode, setCodeMode] = useState('react'); // 'react' or 'html'
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

  // React Live scope - available variables and functions in the code editor
  const scope = {
    useState: React.useState,
    useEffect: React.useEffect,
    useRef: React.useRef,
    motion,
    AnimatePresence
  };

  // Example code snippets
  const codeExamples = [
    {
      name: 'Interactive Counter',
      code: `// Welcome to Rifad's Interactive Code Playground! 🚀
// Try editing this React component and see live results

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
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
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

render(<InteractiveDemo />);`
    },
    {
      name: 'Todo List',
      code: `function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ color: '#333', textAlign: 'center' }}>Todo List 📝</h2>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{
            flex: 1,
            padding: '10px',
            border: '2px solid #ddd',
            borderRadius: '5px',
            marginRight: '10px'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              padding: '10px',
              margin: '5px 0',
              background: todo.completed ? '#f0f0f0' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '5px',
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : '#333'
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

render(<TodoApp />);`
    },
    {
      name: 'Animated Card',
      code: `function AnimatedCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [likes, setLikes] = useState(42);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '300px',
        padding: '20px',
        margin: '20px auto',
        background: isHovered
          ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4)'
          : 'linear-gradient(45deg, #667eea, #764ba2)',
        borderRadius: '15px',
        color: 'white',
        textAlign: 'center',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0,0,0,0.3)'
          : '0 10px 20px rgba(0,0,0,0.2)'
      }}
    >
      <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
        {isHovered ? '🚀 Hover Effect!' : '✨ Hover Me!'}
      </h3>
      <p style={{ margin: '10px 0', opacity: 0.9 }}>
        This card responds to your mouse interactions
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLikes(likes + 1);
        }}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: '2px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'all 0.2s ease'
        }}
      >
        ❤️ {likes} Likes
      </button>
    </div>
  );
}

render(<AnimatedCard />);`
    }
  ];

  // HTML/CSS/JS Examples
  const htmlExamples = [
    {
      name: 'Basic HTML Page',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Basic HTML Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            margin-top: 50px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        header {
            background-color: #f0f0f0;
            padding: 20px;
            text-align: center;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        main {
            padding: 20px;
        }

        footer {
            background-color: #f0f0f0;
            padding: 10px;
            text-align: center;
            border-radius: 10px;
            margin-top: 20px;
        }

        img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .highlight {
            background: #ffeb3b;
            padding: 2px 4px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🌟 Welcome to My Page</h1>
            <p>This is a <span class="highlight">beautiful HTML example</span> that actually works!</p>
        </header>

        <main>
            <h2>About This Demo</h2>
            <p>This HTML page demonstrates how you can create beautiful, functional web pages using just HTML, CSS, and JavaScript. Unlike the previous error, this code will render perfectly!</p>

            <h3>Features Include:</h3>
            <ul>
                <li>✨ Responsive design</li>
                <li>🎨 Beautiful gradients and styling</li>
                <li>📱 Mobile-friendly layout</li>
                <li>🚀 Interactive elements</li>
            </ul>

            <button onclick="changeColor()" style="
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                border: none;
                color: white;
                padding: 15px 30px;
                font-size: 16px;
                border-radius: 25px;
                cursor: pointer;
                margin: 20px 0;
            ">
                🎨 Click to Change Colors!
            </button>
        </main>

        <footer>
            <p>&copy; 2024 My Website. Made with ❤️ and HTML!</p>
        </footer>
    </div>

    <script>
        function changeColor() {
            const colors = [
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)',
                'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.background = randomColor;
        }
    </script>
</body>
</html>`
    },
    {
      name: 'Interactive Button',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Button Demo</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
            text-align: center;
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .btn {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border: none;
            padding: 15px 30px;
            font-size: 18px;
            color: white;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 10px;
        }
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .counter {
            font-size: 24px;
            margin: 20px 0;
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Interactive Demo</h1>
        <div class="counter">Clicks: <span id="count">0</span></div>
        <button class="btn" onclick="incrementCounter()">Click Me!</button>
        <button class="btn" onclick="resetCounter()">Reset</button>
    </div>

    <script>
        let count = 0;

        function incrementCounter() {
            count++;
            document.getElementById('count').textContent = count;

            // Add some fun effects
            if (count % 10 === 0) {
                document.body.style.background =
                    'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)';
                setTimeout(() => {
                    document.body.style.background =
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                }, 500);
            }
        }

        function resetCounter() {
            count = 0;
            document.getElementById('count').textContent = count;
        }
    </script>
</body>
</html>`
    },
    {
      name: 'CSS Animation',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Animation Demo</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #1a1a2e;
            font-family: Arial, sans-serif;
            overflow-x: hidden;
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 80vh;
            flex-direction: column;
        }

        .animated-box {
            width: 100px;
            height: 100px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border-radius: 20px;
            animation: float 3s ease-in-out infinite;
            margin: 20px;
            position: relative;
        }

        .animated-box::before {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            border-radius: 25px;
            z-index: -1;
            animation: rotate 4s linear infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .title {
            color: white;
            font-size: 2em;
            text-align: center;
            margin-bottom: 30px;
            animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
            from { text-shadow: 0 0 20px #4ecdc4; }
            to { text-shadow: 0 0 30px #ff6b6b, 0 0 40px #ff6b6b; }
        }

        .pulse-btn {
            background: transparent;
            border: 2px solid #4ecdc4;
            color: #4ecdc4;
            padding: 15px 30px;
            font-size: 16px;
            border-radius: 30px;
            cursor: pointer;
            animation: pulse 2s infinite;
            margin-top: 30px;
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(78, 205, 196, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(78, 205, 196, 0); }
            100% { box-shadow: 0 0 0 0 rgba(78, 205, 196, 0); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">✨ CSS Animations</h1>
        <div class="animated-box"></div>
        <button class="pulse-btn" onclick="changeColors()">Change Colors</button>
    </div>

    <script>
        function changeColors() {
            const box = document.querySelector('.animated-box');
            const colors = [
                'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                'linear-gradient(45deg, #a8edea, #fed6e3)',
                'linear-gradient(45deg, #ffecd2, #fcb69f)',
                'linear-gradient(45deg, #667eea, #764ba2)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            box.style.background = randomColor;
        }
    </script>
</body>
</html>`
    },
    {
      name: 'Simple Portfolio',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
        }

        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem 0;
            text-align: center;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            animation: fadeInUp 1s ease;
        }

        .hero p {
            font-size: 1.2rem;
            animation: fadeInUp 1s ease 0.3s both;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .skills {
            padding: 4rem 0;
            background: #f8f9fa;
        }

        .skills h2 {
            text-align: center;
            margin-bottom: 3rem;
            font-size: 2.5rem;
        }

        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .skill-card {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s ease;
        }

        .skill-card:hover {
            transform: translateY(-5px);
        }

        .skill-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }

        footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 2rem 0;
        }

        .btn {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            margin-top: 1rem;
            transition: background 0.3s ease;
        }

        .btn:hover {
            background: #764ba2;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="hero">
                <h1>John Developer</h1>
                <p>Full Stack Web Developer</p>
                <a href="#contact" class="btn">Get In Touch</a>
            </div>
        </div>
    </header>

    <section class="skills">
        <div class="container">
            <h2>My Skills</h2>
            <div class="skills-grid">
                <div class="skill-card">
                    <div class="skill-icon">🌐</div>
                    <h3>Frontend</h3>
                    <p>HTML, CSS, JavaScript, React</p>
                </div>
                <div class="skill-card">
                    <div class="skill-icon">⚙️</div>
                    <h3>Backend</h3>
                    <p>Node.js, Python, Databases</p>
                </div>
                <div class="skill-card">
                    <div class="skill-icon">📱</div>
                    <h3>Mobile</h3>
                    <p>React Native, Flutter</p>
                </div>
            </div>
        </div>
    </section>

    <footer id="contact">
        <div class="container">
            <p>&copy; 2024 John Developer. All rights reserved.</p>
            <p>📧 john@example.com | 📱 +1 (555) 123-4567</p>
        </div>
    </footer>

    <script>
        // Add some interactivity
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('click', function() {
                this.style.background = '#667eea';
                this.style.color = 'white';
                setTimeout(() => {
                    this.style.background = 'white';
                    this.style.color = '#333';
                }, 1000);
            });
        });
    </script>
</body>
</html>`
    }
  ];

  const [code, setCode] = useState(codeExamples[0].code);

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
          {/* Mode Switcher */}
          <div className="flex bg-gray-700 rounded-md overflow-hidden">
            <button
              onClick={() => {
                setCodeMode('react');
                setCode(codeExamples[0].code);
              }}
              className={`px-3 py-1 text-sm transition-colors ${
                codeMode === 'react'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              ⚛️ React
            </button>
            <button
              onClick={() => {
                setCodeMode('html');
                setCode(htmlExamples[0].code);
              }}
              className={`px-3 py-1 text-sm transition-colors ${
                codeMode === 'html'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              🌐 HTML/CSS/JS
            </button>
          </div>

          {/* Example Selector */}
          <select
            onChange={(e) => {
              const examples = codeMode === 'react' ? codeExamples : htmlExamples;
              setCode(examples[e.target.value].code);
            }}
            className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
          >
            {codeMode === 'react' ? (
              <>
                <option value="0">Interactive Counter</option>
                <option value="1">Todo List</option>
                <option value="2">Animated Card</option>
              </>
            ) : (
              <>
                <option value="0">Basic HTML Page</option>
                <option value="1">Interactive Button</option>
                <option value="2">CSS Animation</option>
                <option value="3">Simple Portfolio</option>
              </>
            )}
          </select>

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
            {codeMode === 'react' ? (
              <LiveProvider code={code} scope={scope}>
                {/* React Code Editor */}
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-300">⚛️ InteractiveDemo.jsx</span>
                    </div>
                    <motion.button
                      onClick={() => setShowPreview(!showPreview)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showPreview ? '👁️ Hide Preview' : '👁️ Show Preview'}
                    </motion.button>
                  </div>

                  <div className="relative">
                    <LiveEditor
                      onChange={setCode}
                      className="font-mono text-sm"
                      style={{
                        fontFamily: 'Fira Code, monospace',
                        fontSize: '14px',
                        backgroundColor: '#1a1a1a',
                        color: '#4ade80',
                        minHeight: '384px',
                        padding: '16px',
                        outline: 'none',
                        border: 'none',
                        resize: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* React Live Preview */}
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-700">
                    <h3 className="text-sm font-medium text-gray-300">Live Preview & Output</h3>
                    <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Live</span>
                    </div>
                  </div>

                  <div className="p-4 h-96 overflow-y-auto bg-white">
                    {showPreview ? (
                      <div className="h-full">
                        <LiveError
                          className="text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-lg border border-red-200 font-mono whitespace-pre-wrap"
                          style={{ display: 'block' }}
                        />
                        <div className="h-full">
                          <LivePreview className="w-full h-full" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <div className="text-center">
                          <div className="text-4xl mb-4">👁️</div>
                          <p>Click "Show Preview" to see your code in action!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </LiveProvider>
            ) : (
              <>
                {/* HTML Code Editor */}
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm text-gray-300">🌐 index.html</span>
                    </div>
                    <motion.button
                      onClick={() => setShowPreview(!showPreview)}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md text-sm font-medium transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {showPreview ? '👁️ Hide Preview' : '👁️ Show Preview'}
                    </motion.button>
                  </div>

                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-96 p-4 bg-gray-900 text-green-400 font-mono text-sm resize-none focus:outline-none"
                    style={{ fontFamily: 'Fira Code, monospace' }}
                  />
                </div>

                {/* HTML Live Preview */}
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-700">
                    <h3 className="text-sm font-medium text-gray-300">Live Preview & Output</h3>
                    <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Live</span>
                    </div>
                  </div>

                  <div className="h-96 overflow-hidden">
                    {showPreview ? (
                      <iframe
                        srcDoc={code}
                        className="w-full h-full border-0"
                        title="HTML Preview"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500 bg-white">
                        <div className="text-center">
                          <div className="text-4xl mb-4">👁️</div>
                          <p>Click "Show Preview" to see your HTML in action!</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
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
