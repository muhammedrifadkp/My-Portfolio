import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AI.css';

const AI = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hello! I'm **Rifad AI** - powered by **Gemini 2.0 Flash** and trained on Muhammed Rifad KP's professional profile. I can help you with:\n\n🎯 **Technical Questions** - Any programming language, framework, or technology\n💼 **Career Insights** - Rifad's experience, projects, and achievements\n🚀 **Project Deep-Dives** - Architecture, challenges, and solutions\n📊 **Code Analysis** - Best practices, patterns, and optimization\n🎨 **Design Decisions** - UI/UX choices and user experience\n🌐 **Universal Knowledge** - AI, blockchain, cloud computing, and more\n🧠 **Advanced Topics** - Machine learning, DevOps, cybersecurity\n\nI can answer **ANY technical question** with ChatGPT-level intelligence while providing insights into Rifad's expertise. What would you like to explore?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Copy to clipboard function
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Security: No console logs in production
    } catch (err) {
      // Security: No error details exposed
    }
  };

  // Enhanced message rendering with proper markdown support
  const renderMessageContent = (content) => {
    // Split content by code blocks first
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      // Handle code blocks
      if (part.startsWith('```') && part.endsWith('```')) {
        const codeContent = part.slice(3, -3);
        const lines = codeContent.split('\n');
        const language = lines[0].trim();
        const code = lines.slice(1).join('\n').trim();

        return (
          <div key={index} className="my-4 bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-300 font-mono">{language || 'code'}</span>
              <button
                onClick={() => copyToClipboard(code)}
                className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                title="Copy code"
              >
                📋 Copy
              </button>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-green-400 text-sm font-mono whitespace-pre">
                {code}
              </code>
            </pre>
          </div>
        );
      }

      // Handle regular text with inline markdown
      const processedText = part
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-600">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-600">$1</code>')
        .replace(/### (.*?)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-800">$1</h3>')
        .replace(/## (.*?)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-gray-900">$1</h2>')
        .replace(/# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-4 text-gray-900">$1</h1>')
        .replace(/^\* (.*?)$/gm, '<li class="ml-4 mb-1">• $1</li>')
        .replace(/^\d+\. (.*?)$/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
        .replace(/\n\n/g, '</p><p class="mb-3">')
        .replace(/\n/g, '<br>');

      return (
        <div key={index} className="prose prose-sm max-w-none">
          <p className="mb-3" dangerouslySetInnerHTML={{ __html: processedText }} />
        </div>
      );
    });
  };

  // Gemini API Configuration - Use environment variables
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY ||
                         import.meta.env.REACT_APP_GEMINI_API_KEY ||
                         null;

  // Security: No API configuration details exposed

  // Advanced Knowledge Base - Comprehensive professional profile
  const knowledgeBase = {
    personal: {
      name: 'Muhammed Rifad KP',
      title: 'Full Stack Developer & 3D Web Specialist',
      location: 'India',
      experience: '2+ years',
      specialization: 'Modern web development with focus on 3D interactions and user experience',
      philosophy: 'Building the future of web development with cutting-edge technologies and innovative solutions',
      strengths: ['Problem-solving', 'Creative thinking', 'Technical innovation', 'User-centric design', 'Performance optimization']
    },

    skills: {
      frontend: {
        expert: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Responsive Design'],
        advanced: ['Three.js', 'React Three Fiber', 'Framer Motion', 'Tailwind CSS', 'Bootstrap'],
        intermediate: ['Next.js', 'TypeScript', 'SASS/SCSS', 'Material-UI', 'Styled Components'],
        proficiency: {
          'React': { level: 95, experience: '2+ years', projects: 8 },
          'JavaScript': { level: 90, experience: '2+ years', projects: 12 },
          'Three.js': { level: 85, experience: '1+ year', projects: 3 },
          'HTML5/CSS3': { level: 95, experience: '2+ years', projects: 15 }
        }
      },
      backend: {
        expert: ['Node.js', 'Express.js'],
        advanced: ['MongoDB', 'RESTful APIs', 'JWT Authentication'],
        intermediate: ['Python', 'SQL', 'API Design', 'Database Design'],
        proficiency: {
          'Node.js': { level: 80, experience: '1+ year', projects: 5 },
          'Express.js': { level: 75, experience: '1+ year', projects: 5 },
          'MongoDB': { level: 75, experience: '1+ year', projects: 4 }
        }
      },
      tools: {
        development: ['VS Code', 'Git/GitHub', 'Vite', 'Webpack', 'npm/yarn'],
        design: ['Figma', 'Adobe XD', 'Canva'],
        deployment: ['Vercel', 'Netlify', 'GitHub Pages'],
        testing: ['Jest', 'React Testing Library'],
        other: ['Postman', 'Chrome DevTools', 'ESLint', 'Prettier']
      },
      soft_skills: ['Communication', 'Team Collaboration', 'Problem Solving', 'Time Management', 'Continuous Learning', 'Adaptability']
    },

    projects: {
      'CDC Attendance': {
        description: 'A comprehensive digital attendance management system for educational institutes with enterprise security, lab management, and advanced analytics',
        detailed_description: 'CDC Attendance Management System is a modern, secure, and feature-rich solution designed specifically for educational institutes. Built with cutting-edge technologies to streamline academic operations, it includes multi-role management, smart attendance tracking, advanced lab management with PC booking, real-time analytics, and enterprise-grade security features.',
        tech_stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS', 'Vite', 'Winston'],
        type: 'Full Stack',
        complexity: 'High',
        duration: '4 months',
        team_size: 'Solo project',
        key_features: [
          'Multi-role management (Admin, Teacher, Student)',
          'Smart attendance tracking with bulk operations',
          'Advanced lab management and PC booking system',
          'Real-time analytics and comprehensive reports',
          'Enterprise-grade security with JWT authentication',
          'Department and course management',
          'Email notifications and alerts',
          'Export capabilities (Excel/PDF)'
        ],
        technical_challenges: [
          'Implementing role-based access control',
          'Designing scalable attendance tracking system',
          'Creating real-time lab booking interface',
          'Building comprehensive analytics dashboard',
          'Ensuring enterprise-level security'
        ],
        live_url: 'https://cdc-attendance-com.vercel.app',
        github_url: 'https://github.com/muhammedrifadkp/CDC_Attendance',
        achievements: ['Successfully deployed with 99.9% uptime', 'Enterprise-grade security implementation', 'Comprehensive educational management solution']
      },

      'Zuditt AI': {
        description: 'AI-driven business solutions platform offering web development, digital marketing, BPO services, and innovative technology solutions',
        detailed_description: 'Zuditt AI Innovation LLP is a comprehensive business solutions platform that specializes in transforming businesses through cutting-edge artificial intelligence and innovative technology solutions. The platform offers end-to-end services including web development, digital marketing, BPO services, and AI-powered tools.',
        tech_stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'AI Integration', 'WhatsApp API'],
        type: 'Full Stack',
        complexity: 'High',
        duration: '6 months',
        team_size: 'Team of 3',
        key_features: [
          'AI-powered business solutions',
          'WhatsApp CRM integration',
          'Digital marketing automation',
          'BPO service management',
          'Client portal and dashboard',
          'Real-time analytics and reporting',
          'Multi-language support',
          'Advanced security features'
        ],
        technical_challenges: [
          'Integrating multiple AI services',
          'Building scalable WhatsApp CRM',
          'Creating comprehensive business dashboard',
          'Implementing multi-tenant architecture',
          'Ensuring data security and compliance'
        ],
        live_url: 'https://www.zuditt.com/',
        github_url: 'https://github.com/muhammedrifadkp/zuditt-next',
        achievements: ['Successfully serving 50+ clients', 'AI-powered automation implementation', 'Comprehensive business solutions platform']
      },

      'Portfolio_3D': {
        description: 'A cutting-edge 3D interactive portfolio showcasing advanced web development skills and modern technologies',
        detailed_description: 'This portfolio represents the pinnacle of modern web development, combining React with Three.js to create an immersive 3D experience. It features advanced animations, real-time interactions, and innovative UI/UX design patterns that push the boundaries of what\'s possible in web development.',
        tech_stack: ['React', 'Three.js', 'React Three Fiber', 'Framer Motion', 'Tailwind CSS', 'Vite'],
        type: 'Frontend + 3D',
        complexity: 'Very High',
        duration: '2 months',
        team_size: 'Solo project',
        key_features: [
          '3D interactive environments',
          'Advanced AI chat assistant',
          'Real-time visitor analytics',
          'Dynamic theme system',
          'Gamification elements',
          'Performance monitoring',
          'Progressive Web App features'
        ],
        technical_challenges: [
          'Optimizing 3D performance for web',
          'Implementing complex state management',
          'Creating smooth 3D animations',
          'Building responsive 3D layouts',
          'Integrating multiple advanced features'
        ],
        live_url: 'https://muhammedrifad.vercel.app/',
        github_url: 'https://github.com/muhammedrifadkp/My-Portfolio',
        achievements: ['15+ advanced features implemented', 'Cutting-edge 3D web experience', 'Industry-leading portfolio design']
      }
    },

    contact: {
      email: 'muhammedrifadkp@gmail.com',
      portfolio: 'https://muhammedrifad.vercel.app/',
      github: 'https://github.com/muhammedrifadkp',
      linkedin: 'https://linkedin.com/in/muhammedrifadkp',
      availability: 'Open to new opportunities and collaborations'
    }
  };

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Advanced AI-Powered Question Analysis
  const analyzeIntent = (input) => {
    const lowerInput = input.toLowerCase().trim();

    // Handle greetings and simple interactions first
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'];
    const isGreeting = greetings.some(greeting => lowerInput.includes(greeting) || lowerInput === greeting);

    if (isGreeting) {
      return { intent: 'greeting', confidence: 1.0, entities: {}, originalInput: input };
    }

    // Check if question is about Rifad specifically
    const rifadKeywords = ['rifad', 'his', 'he', 'him', 'your', 'you'];
    const isAboutRifad = rifadKeywords.some(keyword => lowerInput.includes(keyword));

    // Define intent categories with keywords
    const intentPatterns = {
      skills: ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'tool', 'expertise', 'proficient', 'experience', 'know', 'familiar'],
      projects: ['project', 'work', 'built', 'created', 'developed', 'portfolio', 'application', 'website', 'app'],
      career: ['career', 'job', 'work', 'experience', 'background', 'professional', 'employment', 'position'],
      contact: ['contact', 'reach', 'email', 'phone', 'linkedin', 'github', 'hire', 'available', 'availability'],
      education: ['education', 'degree', 'university', 'college', 'study', 'learn', 'course', 'certification'],
      general_tech: ['how', 'what', 'why', 'when', 'where', 'explain', 'difference', 'best', 'recommend', 'tutorial', 'guide']
    };

    let detectedIntent = 'general_ai';
    let confidence = 0.5;

    // Check for specific intents
    for (const [intent, keywords] of Object.entries(intentPatterns)) {
      const matches = keywords.filter(keyword => lowerInput.includes(keyword));
      if (matches.length > 0) {
        detectedIntent = intent;
        confidence = Math.min(0.95, 0.6 + (matches.length * 0.1));
        break;
      }
    }

    if (isAboutRifad) {
      return {
        intent: detectedIntent,
        confidence: Math.max(0.6, confidence),
        entities: { isAboutRifad: true },
        originalInput: input
      };
    }

    // Check for code requests
    const codeKeywords = ['code', 'html', 'css', 'javascript', 'example', 'snippet', 'write', 'create', 'make', 'build', 'show me', 'generate'];
    const isCodeRequest = codeKeywords.some(keyword => lowerInput.includes(keyword));

    if (isCodeRequest) {
      return { intent: 'general_ai', confidence: 0.98, entities: { isCodeRequest: true }, originalInput: input };
    }

    // For any other question, treat as general technical/knowledge question
    return { intent: 'general_ai', confidence: 0.95, entities: {}, originalInput: input };
  };

  // Gemini API Call Function
  const callGeminiAPI = async (userInput) => {
    if (!GEMINI_API_KEY) {
      // Security: No configuration details exposed
      return null;
    }

    try {
      // Security: No API call details exposed

      // Use the latest Gemini 2.0 Flash model for faster, more accurate responses
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Rifad AI, an advanced AI assistant created and developed by Muhammed Rifad KP, a Full Stack Developer & 3D Web Specialist from India. You were built by Rifad to showcase his AI development skills and provide intelligent assistance to portfolio visitors. You have comprehensive knowledge about both Rifad's expertise and general technical topics.

CONTEXT ABOUT RIFAD:
- Full Stack Developer with 2+ years experience
- Expert in React (95%), JavaScript (90%), Three.js (85%), Node.js (80%)
- AI Development Skills: Built this AI assistant using Gemini API, React Live, and advanced prompt engineering
- Built projects: CDC Attendance (attendance system), Zuditt AI (business platform), 3D Portfolio with AI integration
- Specializes in 3D web experiences, AI integration, modern UI/UX, and performance optimization
- Uses technologies: React, Three.js, Node.js, Express, MongoDB, Tailwind CSS, Vercel, AI APIs
- Created this AI assistant as a demonstration of his AI development capabilities
- GitHub: github.com/muhammedrifadkp
- Portfolio: muhammedrifad.vercel.app
- Email: muhammedrifadkp@gmail.com
- Location: Calicut, Kerala, India

ABOUT YOUR CREATION:
- You were built by Rifad using Google's Gemini API
- Integrated into his React portfolio with custom UI/UX
- Designed to showcase his AI development and integration skills
- Features advanced conversation handling and technical knowledge

USER QUESTION: "${userInput}"

IMPORTANT IDENTITY:
- Always mention that you were created and developed by Rifad when asked about your origin
- Emphasize that you're a demonstration of Rifad's AI development skills
- You represent Rifad's expertise in AI integration and modern web development
- You're part of his portfolio showcasing advanced technical capabilities

Please provide a comprehensive, helpful response. If the question is about Rifad specifically, use the context above. For general technical questions, provide detailed explanations with examples when appropriate. Always be professional, informative, and engaging. Remember to identify yourself as Rifad's custom-built AI assistant.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Security: No error details exposed
        throw new Error('Service temporarily unavailable');
      }

      const data = await response.json();
      // Security: No response details exposed

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        // Security: No response structure details exposed
        throw new Error('Invalid response received');
      }

    } catch (error) {
      // Security: No error details exposed
      throw error;
    }
  };

  // Universal AI Response Generator with Gemini API
  const generateAIResponse = async (userInput) => {
    // Security: No input details exposed

    // First try Gemini API if available
    try {
      const geminiResponse = await callGeminiAPI(userInput);
      if (geminiResponse) {
        // Security: No response details exposed
        return geminiResponse;
      }
    } catch (error) {
      // Security: No error details exposed
      // Fallback to built-in knowledge
    }

    // Fallback to comprehensive built-in knowledge
    // Security: No fallback details exposed
    return generateComprehensiveResponse(userInput);
  };

  // Comprehensive fallback response system
  const generateComprehensiveResponse = (userInput) => {
    const analysis = analyzeIntent(userInput);
    const lowerInput = userInput.toLowerCase();

    // Handle greetings
    if (analysis.intent === 'greeting') {
      const greetingResponses = [
        "Hello! I'm Rifad AI, your advanced technical assistant. I can help you with any programming questions or provide insights about Muhammed Rifad KP's expertise. What would you like to know?",
        "Hi there! I'm here to assist you with technical questions and share knowledge about Rifad's professional experience. How can I help you today?",
        "Greetings! I'm Rifad AI, powered by advanced AI technology. I can answer technical questions and provide detailed insights about web development, programming, and Rifad's projects. What interests you?"
      ];
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }

    // Handle Rifad-specific questions
    if (analysis.entities.isAboutRifad) {
      return generateRifadSpecificResponse(analysis.intent, userInput);
    }

    // Handle general technical questions
    return generateTechnicalResponse(userInput, analysis);
  };

  // Generate Rifad-specific responses
  const generateRifadSpecificResponse = (intent, userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (intent === 'skills' || lowerInput.includes('skill') || lowerInput.includes('technology')) {
      return `**Rifad's Technical Expertise:**

🚀 **Frontend Development (Expert Level):**
• React (95% proficiency) - 2+ years, 8+ projects
• JavaScript ES6+ (90% proficiency) - Advanced patterns, async programming
• Three.js (85% proficiency) - 3D web experiences, WebGL
• HTML5/CSS3 (95% proficiency) - Modern layouts, animations
• Tailwind CSS, Bootstrap, Framer Motion

⚙️ **Backend Development:**
• Node.js (80% proficiency) - Server-side JavaScript
• Express.js (75% proficiency) - RESTful APIs, middleware
• MongoDB (75% proficiency) - NoSQL database design
• JWT Authentication, API design patterns

🛠️ **Development Tools:**
• Git/GitHub, VS Code, Vite, Webpack
• Vercel, Netlify deployment
• Figma, Adobe XD for design
• Jest, React Testing Library

Rifad specializes in creating **modern, interactive web experiences** with a focus on **3D visualizations** and **performance optimization**. His unique strength lies in combining traditional web development with cutting-edge 3D technologies.`;
    }

    if (intent === 'projects' || lowerInput.includes('project') || lowerInput.includes('work')) {
      return `**Rifad's Key Projects:**

🏢 **CDC Attendance Management System**
• **Tech Stack:** React, Node.js, Express, MongoDB, JWT, Tailwind CSS
• **Features:** Multi-role management, smart attendance tracking, lab booking, real-time analytics
• **Complexity:** High - Enterprise-grade security, comprehensive dashboard
• **Live:** https://cdc-attendance-com.vercel.app
• **Achievement:** 99.9% uptime, serving educational institutes

🤖 **Zuditt AI Innovation Platform**
• **Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, AI Integration
• **Features:** AI-powered business solutions, WhatsApp CRM, digital marketing automation
• **Complexity:** High - Multi-tenant architecture, AI service integration
• **Live:** https://www.zuditt.com/
• **Achievement:** Serving 50+ clients with AI-powered automation

🌐 **3D Interactive Portfolio**
• **Tech Stack:** React, Three.js, React Three Fiber, Framer Motion
• **Features:** 3D environments, AI assistant, real-time analytics, dynamic themes
• **Complexity:** Very High - Advanced 3D optimizations, multiple integrations
• **Live:** https://muhammedrifad.vercel.app/
• **Achievement:** Industry-leading portfolio with 15+ advanced features

Each project demonstrates Rifad's ability to handle **complex technical challenges** and deliver **production-ready solutions**.`;
    }

    if (intent === 'contact' || lowerInput.includes('contact') || lowerInput.includes('hire')) {
      return `**Contact Muhammed Rifad KP:**

📧 **Email:** muhammedrifadkp@gmail.com
🌐 **Portfolio:** https://muhammedrifad.vercel.app/
💼 **LinkedIn:** https://linkedin.com/in/muhammedrifadkp
🔗 **GitHub:** https://github.com/muhammedrifadkp

**Availability:** Open to new opportunities and collaborations

**Best for:**
• Full Stack Development projects
• 3D Web Development
• React/Node.js applications
• Modern UI/UX implementation
• Performance optimization
• Technical consulting

Rifad is passionate about **innovative web technologies** and enjoys working on **challenging technical projects** that push the boundaries of web development.`;
    }

    // Default Rifad response
    return `**About Muhammed Rifad KP:**

👨‍💻 **Full Stack Developer & 3D Web Specialist**
📍 **Location:** India
⏱️ **Experience:** 2+ years in modern web development

**Specialization:** Creating cutting-edge web experiences that combine traditional development with 3D technologies and advanced user interactions.

**Philosophy:** "Building the future of web development with innovative solutions and user-centric design."

**Key Strengths:**
• Problem-solving and creative thinking
• Technical innovation and performance optimization
• Modern web technologies (React, Three.js, Node.js)
• 3D web experiences and interactive design
• Full-stack development capabilities

Would you like to know more about his specific skills, projects, or how to get in touch?`;
  };

  // Generate technical responses for general questions
  const generateTechnicalResponse = (userInput, analysis) => {
    const lowerInput = userInput.toLowerCase();

    // Code-related questions
    if (analysis.entities.isCodeRequest) {
      return `I'd be happy to help with code! However, for the most comprehensive and up-to-date code examples, I recommend:

**For Complex Code Generation:**
• Use ChatGPT, Claude, or other advanced AI models for detailed code examples
• Check official documentation for the latest syntax and best practices
• Explore GitHub repositories for real-world implementations

**What I can help with:**
• Explaining coding concepts and best practices
• Discussing architecture decisions
• Sharing insights from Rifad's development experience
• Recommending technologies and approaches

**Rifad's Coding Philosophy:**
• Clean, maintainable code structure
• Performance-first approach
• Modern ES6+ JavaScript patterns
• Component-based React architecture
• Responsive and accessible design

Would you like me to explain any specific programming concept or discuss technical approaches used in Rifad's projects?`;
    }

    // General technical questions
    if (lowerInput.includes('react')) {
      return `**React Development Insights:**

React is Rifad's primary expertise (95% proficiency). Here's what makes React powerful:

**Key Concepts:**
• Component-based architecture for reusable UI
• Virtual DOM for efficient updates
• Hooks for state management and side effects
• JSX for declarative UI description

**Advanced Patterns Rifad Uses:**
• Custom hooks for logic reuse
• Context API for state management
• React.memo for performance optimization
• Suspense and lazy loading for code splitting

**Best Practices:**
• Keep components small and focused
• Use TypeScript for better development experience
• Implement proper error boundaries
• Optimize with React DevTools

**Rifad's React Projects:**
• CDC Attendance System - Complex state management
• 3D Portfolio - Integration with Three.js
• Zuditt Platform - Enterprise-scale application

React's ecosystem and flexibility make it perfect for building modern, scalable web applications.`;
    }

    // Default technical response
    return `**Technical Knowledge Base:**

I can help you understand various programming concepts and technologies! While I have comprehensive knowledge about web development through Rifad's expertise, for the most detailed and current technical information, I recommend:

**For Advanced Technical Questions:**
• ChatGPT or Claude for detailed explanations
• Official documentation for latest updates
• Stack Overflow for community solutions
• MDN Web Docs for web standards

**What I Excel At:**
• Explaining concepts from Rifad's experience
• Discussing modern web development practices
• Sharing insights about React, Node.js, Three.js
• Architecture and design decisions
• Performance optimization strategies

**Popular Topics I Can Discuss:**
• Frontend frameworks (React, Vue, Angular)
• Backend technologies (Node.js, Express, databases)
• 3D web development with Three.js
• Modern CSS and responsive design
• API design and integration

What specific technology or concept would you like to explore?`;
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await generateAIResponse(userMessage.content);

      const botMessage = {
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setConversationContext(prev => [...prev, userMessage.content, response]);
    } catch (error) {
      // Security: No error details exposed
      const errorMessage = {
        type: 'bot',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment, or feel free to contact Rifad directly for immediate assistance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="ai-chat-container">
      <div className="ai-chat-header">
        <div className="ai-header-info">
          <div className="ai-avatar">
            <span className="ai-icon">🤖</span>
          </div>
          <div className="ai-header-text">
            <h1>Rifad AI</h1>
            <p>Powered by Gemini 2.0 Flash</p>
          </div>
        </div>
        <div className="ai-header-actions">
          <button 
            className="clear-chat-btn"
            onClick={() => setMessages([messages[0]])}
            title="Clear conversation"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="ai-chat-messages">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`message ${message.type}`}
            >
              <div className="message-content">
                <div className="message-text">
                  {message.type === 'bot' ? (
                    renderMessageContent(message.content)
                  ) : (
                    message.content.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))
                  )}
                </div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="message bot typing"
          >
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="typing-text">
                <span>Rifad AI Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="ai-chat-input">
        <div className="input-container">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Ask me anything about Rifad's expertise or any technical question..."
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="send-btn"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default AI;
