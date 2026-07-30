import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AI.css';

const RIFAD_KNOWLEDGE = {
  name: "Muhammed Rifad KP",
  title: "Full Stack Developer & 3D Web Specialist",
  location: "Calicut, Kerala, India",
  experience: "2+ years of professional web development & 3D WebGL engineering",
  skills: {
    frontend: ["React.js", "Three.js", "React Three Fiber", "JavaScript (ES6+)", "Tailwind CSS", "GSAP", "HTML5/CSS3"],
    backend: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Firebase", "JWT Auth"],
    tools: ["Vite", "Git & GitHub", "Vercel", "Docker", "Postman", "Figma"]
  },
  projects: [
    { name: "3D Cyber Portfolio", desc: "Interactive Three.js & React portfolio featuring 3D flight models, tech matrix constellation, and AI assistant." },
    { name: "Zuditt AI Platform", desc: "AI-driven business platform empowering content creation and workflow automation." },
    { name: "CDC Attendance System", desc: "Full-stack institutional attendance tracking system built with Node.js and MongoDB." }
  ],
  socials: {
    github: "https://github.com/muhammedrifadkp",
    instagram: "https://www.instagram.com/mohd_rifad_/",
    email: "muhammedrifadkp3@gmail.com",
    phone: "+91 7356852496"
  }
};

const AI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm **Rifad AI** 🤖 — powered by **Google Gemini AI** and configured with full knowledge about Muhammed Rifad KP.\n\nYou can ask me:\n• 💻 **Any Coding Question** (e.g. *\"Create an HTML form\"*, *\"Explain React hooks\"*)\n• 💼 **About Rifad** (e.g. *\"What are Rifad's skills?\"*, *\"Show his projects\"*)\n• 🌐 **General Knowledge** (e.g. *\"Who is Mohallal?\"*, *\"Explain Quantum Computing\"*)\n\nWhat would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.log('Copy failed:', err);
    }
  };

  const renderMessageContent = (content) => {
    // Regex matching ```[language]\n [code] ``` or unclosed ``` code blocks
    const codeBlockRegex = /```([a-zA-Z0-9_+#-]*)\n?([\s\S]*?)(?:```|$)/g;
    const elements = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // 1. Text preceding the code block
      if (match.index > lastIndex) {
        const textBefore = content.substring(lastIndex, match.index);
        if (textBefore.trim()) {
          elements.push(
            <div key={`text-${lastIndex}`} className="ai-text-content">
              <p dangerouslySetInnerHTML={{ __html: formatMarkdownText(textBefore) }} />
            </div>
          );
        }
      }

      // 2. The Code block (Rendered directly in React JSX so HTML tags are 100% visible!)
      const language = match[1].trim() || 'code';
      const codeText = match[2].trim();
      const codeKey = `code-${match.index}`;

      if (codeText) {
        elements.push(
          <div key={codeKey} className="ai-code-block my-4">
            <div className="ai-code-header">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">⚡ {language}</span>
              <button
                onClick={() => copyToClipboard(codeText)}
                className="ai-copy-btn"
              >
                📋 Copy Code
              </button>
            </div>
            <pre className="ai-code-pre">
              <code className="text-cyan-300 font-mono text-xs leading-relaxed whitespace-pre-wrap word-break-break-word">{codeText}</code>
            </pre>
          </div>
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // 3. Remaining text after last code block
    if (lastIndex < content.length) {
      const textAfter = content.substring(lastIndex);
      if (textAfter.trim()) {
        elements.push(
          <div key={`text-${lastIndex}`} className="ai-text-content">
            <p dangerouslySetInnerHTML={{ __html: formatMarkdownText(textAfter) }} />
          </div>
        );
      }
    }

    return elements.length > 0 ? elements : [
      <div key="text-full" className="ai-text-content">
        <p dangerouslySetInnerHTML={{ __html: formatMarkdownText(content) }} />
      </div>
    ];
  };

  const formatMarkdownText = (text) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="ai-inline-code">$1</code>')
      .replace(/### (.*?)$/gm, '<h3 class="text-lg font-bold text-cyan-300 mt-4 mb-2">$1</h3>')
      .replace(/## (.*?)$/gm, '<h2 class="text-xl font-bold text-cyan-400 mt-5 mb-3">$1</h2>')
      .replace(/^\* (.*?)$/gm, '<li class="ml-4 mb-1 list-disc">$1</li>')
      .replace(/^\d+\. (.*?)$/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-3">')
      .replace(/\n/g, '<br>');
  };

  // Check if query is about Rifad
  const isRifadQuery = (text) => {
    const q = text.toLowerCase();
    return (
      q.includes('rifad') ||
      q.includes('muhammed') ||
      q.includes('creator') ||
      q.includes('who built') ||
      q.includes('who created') ||
      q.includes('his skill') ||
      q.includes('his project') ||
      q.includes('his contact') ||
      q.includes('his email') ||
      q.includes('his phone') ||
      q.includes('his instagram') ||
      q.includes('his github') ||
      q.includes('his experience') ||
      q.includes('zuditt') ||
      q.includes('cdc attendance')
    );
  };

  // Generate answer for Rifad specific queries
  const getRifadAnswer = (userQuery) => {
    const q = userQuery.toLowerCase();

    if (q.includes('skill') || q.includes('stack') || q.includes('technology')) {
      return `### ⚡ **Muhammed Rifad KP's Technical Stack**\n\n- **Frontend & 3D WebGL**: React.js, Three.js, React Three Fiber, JavaScript (ES6+), GSAP, Tailwind CSS, HTML5/CSS3\n- **Backend & Database**: Node.js, Express.js, MongoDB, REST APIs, Firebase, JWT Authentication\n- **Tools & Architecture**: Vite, Git & GitHub, Vercel Deployment, Postman, Figma\n\nRifad specializes in building high-performance 3D web applications with seamless micro-animations!`;
    }

    if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
      return `### 🚀 **Muhammed Rifad KP's Featured Projects**\n\n1. **3D Cyber Portfolio** - Built with React, Three.js, R3F, and GSAP featuring custom 3D flight models, tech matrix constellation, and Rifad AI.\n2. **Zuditt AI Platform** - AI-driven business intelligence and content automation tool.\n3. **CDC Attendance System** - Full-stack institutional attendance tracking portal with real-time database management.\n\nCheck out all projects on [GitHub](https://github.com/muhammedrifadkp)!`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire')) {
      return `### 📬 **Contact Muhammed Rifad KP**\n\n- 📧 **Email**: [muhammedrifadkp3@gmail.com](mailto:muhammedrifadkp3@gmail.com)\n- 📱 **Phone**: +91 7356852496\n- 📸 **Instagram**: [@mohd_rifad_](https://www.instagram.com/mohd_rifad_/)\n- 💻 **GitHub**: [github.com/muhammedrifadkp](https://github.com/muhammedrifadkp)\n- 📍 **Location**: Calicut, Kerala, India\n\nFeel free to send a message directly from the [Contact Page](/contact)!`;
    }

    return `### 👤 **About Muhammed Rifad KP**\n\nMuhammed Rifad KP is a **Full Stack Developer & 3D Web Specialist** based in Calicut, Kerala, India with **2+ years of experience**.\n\n- **Specialization**: Building modern web applications, 3D WebGL experiences with Three.js & R3F, and AI integrations.\n- **Top Projects**: 3D Cyber Portfolio, Zuditt AI, CDC Attendance System.\n- **Email**: muhammedrifadkp3@gmail.com\n- **Instagram**: [@mohd_rifad_](https://www.instagram.com/mohd_rifad_/)\n\nHow can I help you regarding Rifad's work?`;
  };

  // Smart local code fallback if API limits are hit
  const getSmartLocalFallback = (userInput) => {
    const q = userInput.toLowerCase();

    if (q.includes('html') || q.includes('code') || q.includes('button') || q.includes('form')) {
      return `Here is a modern, responsive HTML & CSS template:\n\n\`\`\`html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Modern UI Component</title>\n  <style>\n    body {\n      background: #070711;\n      color: #fff;\n      font-family: 'Segoe UI', sans-serif;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      min-height: 100vh;\n      margin: 0;\n    }\n    .cyber-btn {\n      padding: 14px 28px;\n      font-size: 16px;\n      font-weight: 600;\n      color: #fff;\n      background: linear-gradient(135deg, #00f0ff, #7000ff);\n      border: none;\n      border-radius: 12px;\n      cursor: pointer;\n      box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);\n      transition: transform 0.2s ease;\n    }\n    .cyber-btn:hover {\n      transform: translateY(-2px);\n    }\n  </style>\n</head>\n<body>\n  <button class="cyber-btn">Execute Action</button>\n</body>\n</html>\n\`\`\``;
    }

    return `### 💡 **Answer to "${userInput}"**\n\n${userInput} is a great topic! Here are the core concepts:\n\n1. **Overview**: It relates to modern software architecture and web development practices.\n2. **Best Practice**: Ensure robust modular design, clean separation of concerns, and optimal performance.\n3. **Application**: Widely used across web applications, full-stack architectures, and modern digital platforms.`;
  };

  const fetchGeminiResponse = async (userPrompt) => {
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const candidateModels = [
      'gemini-flash-latest',
      'gemini-2.0-flash',
      'gemini-2.0-flash-lite',
      'gemini-pro-latest'
    ];

    for (const model of candidateModels) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
          })
        });

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) return text;
        }
      } catch (err) {
        console.warn(`Model ${model} attempt notice:`, err);
      }
    }

    return null;
  };

  const handleSend = async (textToSend = inputValue) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: trimmed,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    let botResponse = "";

    // 1. If question is about Rifad -> return curated Rifad Knowledge
    if (isRifadQuery(trimmed)) {
      botResponse = getRifadAnswer(trimmed);
    } else {
      // 2. If general question -> call Gemini API
      const geminiResult = await fetchGeminiResponse(trimmed);
      if (geminiResult) {
        botResponse = geminiResult;
      } else {
        // 3. Fallback to smart generator if API quota limit hit
        botResponse = getSmartLocalFallback(trimmed);
      }
    }

    const botMsg = {
      id: Date.now() + 1,
      type: 'bot',
      content: botResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'bot',
        content: "Chat cleared! What would you like to explore next?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="ai-page-container">
      {/* Background Ambient Elements */}
      <div className="ai-ambient-glow glow-cyan" />
      <div className="ai-ambient-glow glow-magenta" />

      <div className="ai-chat-wrapper">
        {/* Header */}
        <header className="ai-chat-header">
          <div className="flex items-center gap-3">
            <div className="ai-avatar-badge">🤖</div>
            <div>
              <h1 className="ai-header-title">Rifad AI</h1>
              <p className="ai-header-subtitle">
                <span className="ai-status-dot" /> Live Gemini Engine • Rifad's Knowledge Base
              </p>
            </div>
          </div>
          <button onClick={clearChat} className="ai-clear-btn" title="Clear Chat History">
            🗑️ Clear Chat
          </button>
        </header>

        {/* Quick Suggestion Chips */}
        <div className="ai-chips-bar">
          <button onClick={() => handleSend("Create a modern HTML & CSS code")} className="ai-chip">
            🚀 Create HTML Code
          </button>
          <button onClick={() => handleSend("Who is Muhammed Rifad KP?")} className="ai-chip">
            💼 Who is Rifad?
          </button>
          <button onClick={() => handleSend("What are Rifad's skills and projects?")} className="ai-chip">
            ⚡ Rifad's Stack & Projects
          </button>
          <button onClick={() => handleSend("How can I contact Muhammed Rifad?")} className="ai-chip">
            📬 Contact Details
          </button>
        </div>

        {/* Messages Stream */}
        <div className="ai-messages-container">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`ai-message-row ${msg.type === 'user' ? 'msg-user' : 'msg-bot'}`}
              >
                {msg.type === 'bot' && <div className="msg-avatar">🤖</div>}
                <div className="msg-bubble">
                  {renderMessageContent(msg.content)}
                  <span className="msg-timestamp">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ai-message-row msg-bot">
              <div className="msg-avatar">🤖</div>
              <div className="msg-bubble ai-typing-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="ai-input-wrapper">
          <textarea
            ref={inputRef}
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything (e.g. 'Create an HTML code' or 'Tell me about Rifad')..."
            className="ai-textarea"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            className="ai-send-btn"
          >
            <span>Send</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AI;
