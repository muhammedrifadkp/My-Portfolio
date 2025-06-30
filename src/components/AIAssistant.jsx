import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
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
        team_size: 'Solo project',
        key_features: [
          'AI-powered business solutions',
          'WhatsApp CRM integration',
          'BPO services platform',
          'Digital marketing tools',
          'Multi-industry support',
          'Modern responsive design',
          'Customer testimonials system',
          'Newsletter subscription'
        ],
        technical_challenges: [
          'Integrating AI-powered features',
          'Building scalable CRM system',
          'Creating multi-service platform',
          'Implementing modern UI/UX design',
          'Ensuring cross-platform compatibility'
        ],
        live_url: 'https://www.zuditt.com/',
        github_url: 'https://github.com/muhammedrifadkp/zuditt-next',
        achievements: ['350+ happy customers', '120+ projects completed', '4.9/5 review rating', 'Multi-industry presence']
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
      },

      'FreshMarket E-commerce': {
        description: 'Modern e-commerce platform with product categories, shopping cart, user accounts, admin panel, and WhatsApp checkout integration',
        detailed_description: 'FreshMarket is a comprehensive e-commerce platform built with Next.js and Node.js, featuring product categories for vegetables, fruits, and meat, shopping cart functionality, user account management, admin panel for product management, and innovative WhatsApp checkout integration.',
        tech_stack: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'WhatsApp API', 'JWT'],
        type: 'Full Stack',
        complexity: 'High',
        duration: '3 months',
        team_size: 'Solo project',
        key_features: [
          'Product categories (Vegetables, Fruits, Meat)',
          'Shopping cart with quantity selection',
          'User account management',
          'Admin panel for product management',
          'WhatsApp checkout integration',
          'Order history and tracking',
          'Responsive design',
          'Payment integration'
        ],
        technical_challenges: [
          'Implementing WhatsApp API integration',
          'Building scalable e-commerce architecture',
          'Creating admin panel with full CRUD operations',
          'Designing responsive product catalog',
          'Implementing secure payment processing'
        ],
        live_url: 'https://my-ecommerce-black.vercel.app/',
        github_url: 'https://github.com/muhammedrifadkp/my-ecommerce',
        achievements: ['Full-featured e-commerce platform', 'WhatsApp integration innovation', 'Comprehensive admin management system']
      },

      'TSEEP Academy': {
        description: 'MERN stack educational platform with user authentication, course management, dashboard, and responsive UI for Texol World Machine Test',
        detailed_description: 'TSEEP Academy is a comprehensive educational platform developed as part of the Texol World Machine Test. Built with the MERN stack, it features user authentication, course management, personalized dashboard, and fully responsive design.',
        tech_stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS', 'bcrypt'],
        type: 'Full Stack',
        complexity: 'Medium',
        duration: '2 months',
        team_size: 'Solo project',
        key_features: [
          'User registration and authentication',
          'Course catalog with search functionality',
          'Personalized dashboard',
          'Course management system',
          'Progress tracking',
          'Responsive design for all devices',
          'Rating and review system',
          'Student completion statistics'
        ],
        technical_challenges: [
          'Implementing secure authentication system',
          'Building course management interface',
          'Creating responsive dashboard',
          'Designing course catalog with search',
          'Implementing progress tracking system'
        ],
        live_url: 'https://tseepacademy.vercel.app',
        github_url: 'https://github.com/muhammedrifadkp/MERN-project',
        achievements: ['Successfully completed Texol World Machine Test', 'Full MERN stack implementation', 'Comprehensive educational platform']
      },

      'Rainforest Platformer Game': {
        description: 'Interactive platformer game built with HTML5 and JavaScript, featuring rainforest theme with engaging gameplay mechanics',
        detailed_description: 'Rainforest Platformer is an engaging browser-based game that combines HTML5 canvas technology with JavaScript to create an immersive gaming experience. The game features a rainforest theme with challenging platformer mechanics.',
        tech_stack: ['HTML5', 'JavaScript', 'CSS3', 'Canvas API', 'Game Development'],
        type: 'Frontend Game',
        complexity: 'Medium',
        duration: '1 month',
        team_size: 'Solo project',
        key_features: [
          'HTML5 Canvas-based gameplay',
          'Rainforest-themed graphics',
          'Platformer game mechanics',
          'Responsive game controls',
          'Score tracking system',
          'Multiple game levels',
          'Sound effects integration'
        ],
        technical_challenges: [
          'Implementing smooth game physics',
          'Creating responsive game controls',
          'Optimizing canvas performance',
          'Designing engaging level progression',
          'Implementing collision detection'
        ],
        live_url: 'https://rain-forest.vercel.app',
        github_url: 'https://github.com/muhammedrifadkp/rain-forest-game',
        achievements: ['Engaging browser-based game', 'Smooth gameplay mechanics', 'Creative rainforest theme']
      }
    },

    experience: {
      current_role: {
        title: 'Full Stack Developer & 3D Web Specialist',
        type: 'Freelance',
        duration: '2023 - Present',
        responsibilities: [
          'Developing cutting-edge web applications with modern frameworks',
          'Creating immersive 3D web experiences using Three.js',
          'Building responsive and accessible user interfaces',
          'Implementing secure backend systems and APIs',
          'Optimizing application performance and user experience'
        ],
        achievements: [
          'Successfully delivered 10+ projects with 100% client satisfaction',
          'Specialized in 3D web development and interactive experiences',
          'Built scalable applications handling 1000+ concurrent users',
          'Achieved 95+ average Lighthouse performance scores'
        ]
      },
      previous_experience: [
        {
          title: 'Frontend Developer',
          type: 'Various Projects',
          duration: '2022 - 2023',
          focus: 'Building responsive web applications and user interfaces',
          key_projects: ['TravelX', 'Multiple client websites', 'UI/UX implementations']
        }
      ],
      education: {
        degree: 'Self-taught Developer',
        focus: 'Modern Web Development',
        continuous_learning: [
          'Advanced React patterns and hooks',
          '3D graphics programming with Three.js',
          'Backend development with Node.js',
          'Database design and optimization',
          'DevOps and deployment strategies'
        ]
      }
    },

    approach: {
      development_philosophy: 'User-centric design meets technical excellence',
      problem_solving: [
        'Analyze requirements thoroughly',
        'Research best practices and modern solutions',
        'Design scalable and maintainable architecture',
        'Implement with performance and accessibility in mind',
        'Test extensively across devices and browsers',
        'Optimize for speed and user experience'
      ],
      code_quality: [
        'Clean, readable, and well-documented code',
        'Following industry best practices and standards',
        'Implementing proper error handling and validation',
        'Writing reusable and modular components',
        'Ensuring responsive and accessible design'
      ],
      learning_approach: 'Continuous learning through hands-on projects and staying updated with latest technologies'
    },

    contact: {
      email: 'muhammedrifadkp@gmail.com',
      portfolio: 'https://muhammedrifad.vercel.app/',
      github: 'https://github.com/muhammedrifadkp',
      linkedin: 'https://linkedin.com/in/muhammedrifadkp',
      availability: 'Open to new opportunities and collaborations'
    }
  };

  // Advanced AI Response System
  const aiPersonality = {
    tone: 'professional yet friendly',
    expertise: 'deep technical knowledge',
    communication_style: 'clear, detailed, and helpful',
    capabilities: [
      'Technical deep-dives',
      'Project analysis',
      'Career guidance',
      'Code explanations',
      'Best practices',
      'Industry insights'
    ]
  };

  // Context-aware conversation management
  const updateConversationContext = useCallback((userInput, botResponse, topic) => {
    setConversationContext(prev => [
      ...prev.slice(-10), // Keep last 10 exchanges for context
      {
        user: userInput,
        bot: botResponse,
        topic: topic,
        timestamp: new Date()
      }
    ]);
    setCurrentTopic(topic);
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

    if (isAboutRifad) {
      // Handle location/geography questions about Rifad
      const locationKeywords = ['india', 'location', 'where', 'country', 'place', 'based', 'from'];
      const isLocationQuery = locationKeywords.some(keyword => lowerInput.includes(keyword));

      if (isLocationQuery) {
        return { intent: 'location', confidence: 0.9, entities: {}, originalInput: input };
      }

      // Handle simple questions about Rifad
      if (lowerInput.length < 15 && (lowerInput.includes('?') || ['what', 'who', 'how', 'why', 'when'].some(w => lowerInput.startsWith(w)))) {
        return { intent: 'simple_question', confidence: 0.8, entities: {}, originalInput: input };
      }

      // Rifad-specific intent classification
      const rifadIntents = {
        skills: ['skill', 'technology', 'tech', 'programming', 'language', 'framework', 'tool', 'expertise', 'proficiency', 'know', 'learn'],
        projects: ['project', 'work', 'portfolio', 'build', 'create', 'develop', 'application', 'website', 'app', 'built', 'made'],
        experience: ['experience', 'background', 'career', 'job', 'work', 'professional', 'history', 'worked'],
        technical: ['how', 'why', 'explain', 'implement', 'architecture', 'design', 'pattern', 'best practice'],
        personal: ['about', 'who', 'person', 'individual', 'background', 'story', 'tell me'],
        contact: ['contact', 'reach', 'email', 'hire', 'collaborate', 'work together', 'get in touch'],
        comparison: ['vs', 'versus', 'compare', 'difference', 'better', 'prefer', 'which'],
        advice: ['advice', 'recommend', 'suggest', 'should', 'opinion', 'think', 'help'],
        code_request: ['code', 'html', 'css', 'javascript', 'example', 'snippet', 'write', 'create', 'make', 'build', 'show me', 'generate']
      };

      let detectedIntent = 'personal';
      let confidence = 0;

      for (const [intent, keywords] of Object.entries(rifadIntents)) {
        const matches = keywords.filter(keyword => lowerInput.includes(keyword)).length;
        const currentConfidence = matches / keywords.length;

        if (currentConfidence > confidence) {
          confidence = currentConfidence;
          detectedIntent = intent;
        }
      }

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Advanced Response Generation with Context Awareness
  const generateAdvancedResponse = async (userInput) => {
    const analysis = analyzeIntent(userInput);
    const { intent, entities, confidence } = analysis;

    // Context-aware responses based on conversation history
    const getContextualResponse = () => {
      const recentTopics = conversationContext.slice(-3).map(c => c.topic);
      const isFollowUp = recentTopics.includes(intent);

      return { isFollowUp, recentTopics };
    };

    const { isFollowUp } = getContextualResponse();

    // Generate response based on intent and context
    switch (intent) {
      case 'greeting':
        return generateGreetingResponse();

      case 'location':
        return generateLocationResponse(userInput);

      case 'simple_question':
        return generateSimpleQuestionResponse(userInput);

      case 'general_ai':
        return await generateAIResponse(userInput);

      case 'general_tech':
        return generateGeneralTechResponse(userInput, entities);

      case 'skills':
        return generateSkillsResponse(entities, isFollowUp);

      case 'projects':
        return generateProjectsResponse(entities, isFollowUp);

      case 'experience':
        return generateExperienceResponse(isFollowUp);

      case 'technical':
        return generateTechnicalResponse(userInput, entities);

      case 'personal':
        return generatePersonalResponse();

      case 'contact':
        return generateContactResponse();

      case 'comparison':
        return generateComparisonResponse(userInput, entities);

      case 'advice':
        return generateAdviceResponse(userInput);

      case 'code_request':
        return await generateAIResponse(userInput);

      default:
        return generateContextualDefault(userInput, analysis);
    }
  };

  // New response generators for conversational interactions
  const generateGreetingResponse = () => {
    const greetings = [
      "Hello! 👋 Great to meet you! I'm Rifad AI, your personal guide to Muhammed Rifad KP's professional world.",
      "Hi there! 🌟 Welcome! I'm here to help you discover everything about Rifad's skills, projects, and expertise.",
      "Hey! 😊 Nice to see you! I'm Rifad's AI assistant, ready to answer any questions about his development journey.",
      "Greetings! 🚀 I'm excited to help you explore Rifad's portfolio and technical expertise."
    ];

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    return `${randomGreeting}\n\n## 🎯 **What I can help you with:**\n\n### **💻 Technical Expertise**\n• **Skills & Technologies** - React, JavaScript, Three.js, Node.js, and more\n• **Project Deep-Dives** - Architecture, challenges, and solutions\n• **Code Quality** - Best practices and development approaches\n\n### **🚀 Professional Insights**\n• **Career Journey** - Experience and achievements\n• **Development Philosophy** - Problem-solving approach\n• **Industry Perspective** - Modern web development trends\n\n### **📞 Getting Connected**\n• **Contact Information** - How to reach Rifad\n• **Collaboration Opportunities** - Project discussions\n• **Professional Networking** - LinkedIn and GitHub profiles\n\n*What would you like to explore first? Feel free to ask me anything!*`;
  };

  const generateLocationResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('india')) {
      return `## 🇮🇳 **Yes, Rifad is from India!**\n\n**${knowledgeBase.personal.name}** is based in **${knowledgeBase.personal.location}**, bringing the innovative spirit and technical excellence that India's tech industry is known for.\n\n### **🌟 Indian Tech Excellence**\n• **Global Perspective** - Working with international standards and practices\n• **Innovation Hub** - Part of India's thriving tech ecosystem\n• **Cultural Diversity** - Bringing unique perspectives to problem-solving\n• **Time Zone Advantage** - Flexible working hours for global collaboration\n\n### **🚀 Professional Presence**\n• **Remote Work Ready** - Experienced in distributed team collaboration\n• **English Proficiency** - Excellent communication skills\n• **Global Standards** - Following international best practices\n• **Cultural Adaptability** - Working effectively with diverse teams\n\n### **💼 Availability**\n${knowledgeBase.contact.availability}\n\n*Interested in learning more about his technical skills or discussing potential collaboration?*`;
    }

    return `## 📍 **Location & Availability**\n\n**${knowledgeBase.personal.name}** is based in **${knowledgeBase.personal.location}**, working as a ${knowledgeBase.personal.title}.\n\n### **🌍 Global Collaboration**\n• **Remote Work Experience** - Comfortable with distributed teams\n• **Flexible Hours** - Adaptable to different time zones\n• **International Standards** - Following global best practices\n• **Cultural Awareness** - Experience working with diverse teams\n\n### **📞 Professional Contact**\n📧 **Email:** [${knowledgeBase.contact.email}](mailto:${knowledgeBase.contact.email})\n🌐 **Portfolio:** [${knowledgeBase.contact.portfolio}](${knowledgeBase.contact.portfolio})\n\n*Want to know more about his technical expertise or discuss a project?*`;
  };

  const generateSimpleQuestionResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Handle common simple questions
    if (lowerInput.includes('what') && lowerInput.includes('do')) {
      return `## 💻 **What Rifad Does**\n\n**${knowledgeBase.personal.name}** is a **${knowledgeBase.personal.title}** who specializes in:\n\n### **🎯 Core Expertise**\n• **Full-Stack Development** - End-to-end web application development\n• **3D Web Experiences** - Interactive Three.js applications\n• **Modern React Development** - Advanced patterns and performance optimization\n• **UI/UX Innovation** - Creating engaging user experiences\n\n### **🚀 What Makes Him Special**\n"${knowledgeBase.personal.philosophy}"\n\n### **💼 Current Focus**\n${knowledgeBase.personal.specialization}\n\n*Want to dive deeper into any specific area of his expertise?*`;
    }

    if (lowerInput.includes('who')) {
      return generatePersonalResponse();
    }

    if (lowerInput.includes('how')) {
      return `## 🛠️ **How Rifad Works**\n\n### **🎯 Development Approach**\n${knowledgeBase.approach.problem_solving.map((step, index) => `${index + 1}. **${step}**`).join('\n')}\n\n### **💡 Philosophy**\n"${knowledgeBase.approach.development_philosophy}"\n\n### **🔧 Code Quality Standards**\n${knowledgeBase.approach.code_quality.map(practice => `• ${practice}`).join('\n')}\n\n*Interested in seeing this approach applied to real projects?*`;
    }

    // Default for other simple questions
    return `## 🤔 **Great Question!**\n\nI'd love to help you with that! Here are some areas I can provide detailed information about:\n\n### **🎯 Quick Topics**\n• **"What are his skills?"** - Technical expertise breakdown\n• **"Show me his projects"** - Portfolio deep-dive\n• **"How experienced is he?"** - Career journey and achievements\n• **"Can I contact him?"** - Professional contact information\n\n### **💡 Or try asking:**\n• "Tell me about React expertise"\n• "What's his best project?"\n• "How does he solve problems?"\n• "What makes him unique?"\n\n*Feel free to be more specific - I'm here to help!*`;
  };

  // Universal AI Response Generator with Gemini API
  const generateAIResponse = async (userInput) => {
    console.log('🤖 Attempting Gemini API call for:', userInput);

    // First try Gemini API if available
    try {
      const geminiResponse = await callGeminiAPI(userInput);
      if (geminiResponse) {
        console.log('✅ Gemini API response received');
        return geminiResponse;
      }
    } catch (error) {
      console.error('❌ Gemini API failed:', error.message);
      console.log('🔄 Falling back to built-in knowledge...');
    }

    // Fallback to comprehensive built-in knowledge
    console.log('📚 Using built-in knowledge base');
    return generateComprehensiveResponse(userInput);
  };

  // Advanced Gemini 2.0 Flash API Integration
  const callGeminiAPI = async (userInput) => {
    // Use environment variables for API key (secure)
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY ||
                           import.meta.env.REACT_APP_GEMINI_API_KEY ||
                           null;

    console.log('Environment check:', {
      vite: import.meta.env.VITE_GEMINI_API_KEY ? 'Found' : 'Missing',
      react: import.meta.env.REACT_APP_GEMINI_API_KEY ? 'Found' : 'Missing',
      final: GEMINI_API_KEY ? 'Using API Key' : 'No API Key',
      keyPreview: GEMINI_API_KEY ? GEMINI_API_KEY.substring(0, 10) + '...' : 'None'
    });

    if (!GEMINI_API_KEY) {
      console.error('Gemini API key not found');
      throw new Error('Gemini API key not configured');
    }

    try {
      console.log('🚀 Making API call to Gemini 2.0 Flash...');

      // Use the latest Gemini 2.0 Flash model for faster, more accurate responses
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Rifad AI, an advanced AI assistant representing Muhammed Rifad KP, a Full Stack Developer & 3D Web Specialist from India. You have access to comprehensive knowledge about both Rifad's expertise and general technical topics.

CONTEXT ABOUT RIFAD:
- Full Stack Developer with 2+ years experience
- Expert in React (95%), JavaScript (90%), Three.js (85%), Node.js (80%)
- Built projects: EcomNova (e-commerce), TravelX (travel website), 3D Portfolio
- Specializes in 3D web experiences, modern UI/UX, and performance optimization
- Uses technologies: React, Three.js, Node.js, Express, MongoDB, Tailwind CSS, Vercel
- GitHub: github.com/muhammedrifadkp
- Portfolio: muhammedrifad.vercel.app
- Email: muhammedrifadkp@gmail.com

USER QUESTION: "${userInput}"

INSTRUCTIONS:
1. If about Rifad: Provide detailed, specific information about his skills, projects, or experience
2. If general technical: Give comprehensive explanation, then connect to Rifad's relevant expertise
3. If code request: Provide complete, working code examples with explanations
4. Be professional, informative, and engaging
5. Use proper markdown formatting with headers, lists, and emphasis
6. For code: Use proper code blocks with language syntax highlighting
7. Include practical examples and real-world applications
8. End with a relevant follow-up question to encourage further conversation
9. Keep responses detailed but concise (aim for 200-500 words)

SPECIAL FOR CODE REQUESTS:
- Provide complete, working code examples
- Include HTML, CSS, and JavaScript as requested
- Add comments explaining key parts
- Show responsive design principles
- Include modern best practices
- Make code production-ready

Respond as Rifad's intelligent AI assistant with deep technical knowledge and professional insight.`
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
            candidateCount: 1,
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

      if (response.ok) {
        console.log('✅ API response received, parsing...');
        const data = await response.json();
        console.log('📄 Response data:', data);

        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (aiResponse) {
          console.log('✅ AI response extracted successfully');

          // Clean and format the response
          const formattedResponse = aiResponse
            .replace(/\*\*(.*?)\*\*/g, '**$1**')
            .replace(/\*(.*?)\*/g, '*$1*')
            .trim();

          return `## 🧠 **Advanced AI Response**\n\n${formattedResponse}\n\n---\n\n*Powered by Gemini 2.0 Flash • Optimized for Rifad's Portfolio*`;
        } else {
          console.error('❌ No AI response text found in data');
        }
      } else {
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);

        // Handle specific API errors
        if (response.status === 429) {
          throw new Error('API rate limit exceeded. Please try again in a moment.');
        } else if (response.status === 403) {
          throw new Error('API key invalid or quota exceeded.');
        } else {
          throw new Error(`Gemini API error: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }

    return null;
  };

  // Comprehensive built-in knowledge for when AI API is unavailable
  const generateComprehensiveResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // GitHub
    if (lowerInput.includes('github')) {
      return `## 🐙 **GitHub** - Code Hosting Platform\n\nGitHub is a web-based platform that uses Git for version control and provides hosting for software development projects.\n\n### **🎯 Key Features**\n• **Repository hosting** - Store and manage code projects\n• **Version control** - Track changes and collaborate\n• **Issue tracking** - Bug reports and feature requests\n• **Pull requests** - Code review and collaboration\n• **Actions** - CI/CD automation workflows\n• **Pages** - Static website hosting\n• **Packages** - Package registry and distribution\n• **Codespaces** - Cloud development environments\n\n### **💼 Use Cases**\n• **Open source projects** - Share code with the community\n• **Team collaboration** - Work together on projects\n• **Portfolio showcase** - Display your coding skills\n• **Project management** - Track issues and milestones\n• **Continuous deployment** - Automate testing and deployment\n\n### **🔗 Rifad's GitHub**\nRifad actively uses GitHub for all his projects. You can explore his repositories at [github.com/muhammedrifadkp](https://github.com/muhammedrifadkp) to see his coding style, project structure, and contribution history.\n\n*Want to see specific projects or learn about his development workflow?*`;
    }

    // Git
    if (lowerInput.includes('git') && !lowerInput.includes('github')) {
      return `## 📚 **Git** - Distributed Version Control System\n\nGit is a free and open-source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.\n\n### **🎯 Core Concepts**\n• **Repository (Repo)** - Project folder with complete history\n• **Commit** - Snapshot of changes with descriptive message\n• **Branch** - Independent line of development\n• **Merge** - Combining changes from different branches\n• **Remote** - Version of repository hosted on server\n• **Clone** - Copy repository to local machine\n• **Push/Pull** - Upload/download changes to/from remote\n\n### **💻 Essential Commands**\n• \`git init\` - Initialize new repository\n• \`git add\` - Stage changes for commit\n• \`git commit\` - Save changes with message\n• \`git push\` - Upload changes to remote\n• \`git pull\` - Download latest changes\n• \`git branch\` - Create or list branches\n• \`git merge\` - Combine branches\n\n### **✅ Benefits**\n• **Distributed** - Every clone is a full backup\n• **Fast** - Optimized for performance\n• **Flexible** - Supports various workflows\n• **Reliable** - Data integrity through checksums\n• **Industry standard** - Used by millions of developers\n\n### **🔗 Rifad's Git Expertise**\nRifad uses Git extensively with 85% proficiency. He follows best practices for commit messages, branching strategies (feature branches, GitFlow), and maintains clean project histories across all his repositories.\n\n*Want to see examples of his Git workflow or learn about advanced Git techniques?*`;
    }

    // Docker
    if (lowerInput.includes('docker')) {
      return `## 🐳 **Docker** - Containerization Platform\n\nDocker is a platform that uses containerization to package applications and their dependencies into lightweight, portable containers.\n\n### **🎯 Key Concepts**\n• **Container** - Lightweight, standalone executable package\n• **Image** - Template for creating containers\n• **Dockerfile** - Instructions to build images\n• **Registry** - Repository for storing images (Docker Hub)\n• **Volume** - Persistent data storage\n• **Network** - Communication between containers\n\n### **💼 Benefits**\n• **Consistency** - Same environment everywhere\n• **Portability** - Run anywhere Docker is installed\n• **Efficiency** - Lightweight compared to VMs\n• **Scalability** - Easy to scale applications\n• **Isolation** - Applications don't interfere\n\n### **🚀 Common Use Cases**\n• **Development environments** - Consistent dev setups\n• **Microservices** - Deploy independent services\n• **CI/CD pipelines** - Automated testing and deployment\n• **Cloud deployment** - Platform-agnostic deployment\n• **Legacy app modernization** - Containerize old applications\n\n### **🔗 Modern Development**\nDocker has revolutionized how developers build, ship, and run applications. It's essential for modern DevOps practices and cloud-native development.\n\n*Interested in learning about containerization strategies or deployment workflows?*`;
    }

    // Kubernetes
    if (lowerInput.includes('kubernetes') || lowerInput.includes('k8s')) {
      return `## ⚓ **Kubernetes (K8s)** - Container Orchestration\n\nKubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications.\n\n### **🎯 Core Components**\n• **Cluster** - Set of machines running Kubernetes\n• **Node** - Worker machine in cluster\n• **Pod** - Smallest deployable unit\n• **Service** - Network access to pods\n• **Deployment** - Manages pod replicas\n• **ConfigMap/Secret** - Configuration management\n\n### **💪 Key Features**\n• **Auto-scaling** - Scale based on demand\n• **Self-healing** - Replace failed containers\n• **Load balancing** - Distribute traffic\n• **Rolling updates** - Zero-downtime deployments\n• **Service discovery** - Automatic networking\n• **Storage orchestration** - Manage persistent volumes\n\n### **🌟 Benefits**\n• **High availability** - Fault-tolerant applications\n• **Scalability** - Handle varying loads\n• **Portability** - Run on any cloud or on-premises\n• **Efficiency** - Optimal resource utilization\n• **Automation** - Reduce manual operations\n\n### **🚀 Enterprise Adoption**\nKubernetes has become the de facto standard for container orchestration, used by companies like Google, Netflix, Spotify, and thousands of others for production workloads.\n\n*Want to learn about container orchestration patterns or cloud-native architecture?*`;
    }

    // AWS
    if (lowerInput.includes('aws') || lowerInput.includes('amazon web services')) {
      return `## ☁️ **AWS (Amazon Web Services)** - Cloud Computing Platform\n\nAWS is Amazon's comprehensive cloud computing platform offering over 200 services including computing, storage, databases, networking, and more.\n\n### **🎯 Core Services**\n• **EC2** - Virtual servers in the cloud\n• **S3** - Object storage service\n• **RDS** - Managed relational databases\n• **Lambda** - Serverless computing\n• **CloudFront** - Content delivery network\n• **VPC** - Virtual private cloud networking\n• **IAM** - Identity and access management\n\n### **💼 Service Categories**\n• **Compute** - EC2, Lambda, ECS, EKS\n• **Storage** - S3, EBS, EFS, Glacier\n• **Database** - RDS, DynamoDB, ElastiCache\n• **Networking** - VPC, CloudFront, Route 53\n• **Security** - IAM, WAF, Shield, KMS\n• **Analytics** - Redshift, EMR, Kinesis\n\n### **✅ Advantages**\n• **Global reach** - Data centers worldwide\n• **Scalability** - Scale from startup to enterprise\n• **Reliability** - 99.99% uptime SLA\n• **Security** - Enterprise-grade security\n• **Cost-effective** - Pay only for what you use\n• **Innovation** - Constantly adding new services\n\n### **🚀 Market Leadership**\nAWS is the world's leading cloud platform, powering companies like Netflix, Airbnb, NASA, and millions of startups and enterprises globally.\n\n*Interested in cloud architecture patterns or specific AWS services?*`;
    }

    // Default comprehensive response for any other technical question
    return generateTechnicalFallback(userInput);
  };

  const generateTechnicalFallback = (userInput) => {
    return `## 🤖 **Technical Knowledge Assistant**\n\nI understand you're asking about **"${userInput}"** - let me provide you with comprehensive information!\n\n### **🔍 What I can help with:**\n• **Programming Languages** - JavaScript, Python, Java, C++, etc.\n• **Web Technologies** - HTML, CSS, React, Vue, Angular, Node.js\n• **Databases** - SQL, MongoDB, PostgreSQL, Redis\n• **Cloud Platforms** - AWS, Azure, Google Cloud, Vercel, Netlify\n• **DevOps Tools** - Docker, Kubernetes, Git, CI/CD\n• **Mobile Development** - React Native, Flutter, iOS, Android\n• **AI/ML** - Machine Learning, Deep Learning, NLP\n• **Cybersecurity** - Security best practices, encryption, authentication\n\n### **💡 How to get better answers:**\n• **Be specific** - "What is React hooks?" vs "What is React?"\n• **Ask about use cases** - "When should I use Docker?"\n• **Request examples** - "Show me a JavaScript example"\n• **Compare technologies** - "React vs Vue differences"\n\n### **🔗 Rifad's Expertise Connection**\n${getRelevantRifadConnection(userInput)}\n\n*Try asking a more specific question, or let me know what aspect interests you most!*`;
  };

  const getRelevantRifadConnection = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('react') || lowerInput.includes('javascript') || lowerInput.includes('frontend')) {
      return "Rifad is an expert in React (95% proficiency) and JavaScript (90% proficiency) with 2+ years of experience building modern web applications.";
    }

    if (lowerInput.includes('node') || lowerInput.includes('backend') || lowerInput.includes('api')) {
      return "Rifad has strong backend experience with Node.js (80% proficiency) and has built multiple RESTful APIs and server-side applications.";
    }

    if (lowerInput.includes('three') || lowerInput.includes('3d') || lowerInput.includes('graphics')) {
      return "Rifad specializes in 3D web development with Three.js (85% proficiency) and has created immersive 3D experiences including his interactive portfolio.";
    }

    if (lowerInput.includes('git') || lowerInput.includes('github') || lowerInput.includes('version')) {
      return "Rifad uses Git extensively for version control and maintains all his projects on GitHub with clean commit histories and professional documentation.";
    }

    return "Rifad stays current with modern web development technologies and follows industry best practices in his development workflow.";
  };

  // General Technical Knowledge Base
  const generalTechKnowledge = {
    'vercel': {
      name: 'Vercel',
      type: 'Deployment Platform',
      description: 'A cloud platform for static sites and serverless functions that enables developers to host websites and web services that deploy instantly.',
      keyFeatures: [
        'Zero-configuration deployments',
        'Automatic HTTPS and CDN',
        'Git integration with automatic deployments',
        'Serverless functions support',
        'Edge network for global performance',
        'Preview deployments for every push'
      ],
      useCases: [
        'React, Vue, Angular applications',
        'Static sites and JAMstack',
        'Serverless API endpoints',
        'E-commerce platforms',
        'Portfolio websites'
      ],
      advantages: [
        'Extremely fast deployment',
        'Excellent developer experience',
        'Automatic scaling',
        'Built-in performance optimization',
        'Free tier available'
      ],
      rifadConnection: 'Rifad uses Vercel to deploy his React applications, including his portfolio. It\'s his preferred platform for frontend deployments due to its seamless Git integration and excellent performance.'
    },
    'react': {
      name: 'React',
      type: 'JavaScript Library',
      description: 'A JavaScript library for building user interfaces, particularly web applications, developed by Facebook.',
      keyFeatures: [
        'Component-based architecture',
        'Virtual DOM for performance',
        'Unidirectional data flow',
        'JSX syntax',
        'Hooks for state management',
        'Large ecosystem'
      ],
      useCases: [
        'Single Page Applications (SPAs)',
        'Progressive Web Apps',
        'Mobile apps (React Native)',
        'Desktop apps (Electron)',
        'Complex user interfaces'
      ],
      advantages: [
        'Reusable components',
        'Strong community support',
        'Excellent developer tools',
        'High performance',
        'Backed by Meta (Facebook)'
      ],
      rifadConnection: 'React is Rifad\'s primary frontend framework with 95% proficiency. He has built 8+ projects with React and specializes in advanced patterns, hooks, and performance optimization.'
    },
    'javascript': {
      name: 'JavaScript',
      type: 'Programming Language',
      description: 'A high-level, interpreted programming language that\'s essential for web development.',
      keyFeatures: [
        'Dynamic typing',
        'First-class functions',
        'Prototype-based OOP',
        'Event-driven programming',
        'Asynchronous programming',
        'Cross-platform compatibility'
      ],
      useCases: [
        'Frontend web development',
        'Backend development (Node.js)',
        'Mobile app development',
        'Desktop applications',
        'Game development'
      ],
      advantages: [
        'Easy to learn and use',
        'Huge ecosystem and community',
        'Versatile and flexible',
        'Constantly evolving',
        'No compilation needed'
      ],
      rifadConnection: 'JavaScript is Rifad\'s core language with 90% proficiency and 2+ years of experience. He has built 12+ projects using modern JavaScript (ES6+) patterns.'
    }
  };

  const generateGeneralTechResponse = (userInput, entities) => {
    const term = entities.term;
    const techInfo = generalTechKnowledge[term];

    if (techInfo) {
      return `## 🚀 **${techInfo.name}** - ${techInfo.type}\n\n${techInfo.description}\n\n### **🎯 Key Features**\n${techInfo.keyFeatures.map(feature => `• ${feature}`).join('\n')}\n\n### **💼 Common Use Cases**\n${techInfo.useCases.map(useCase => `• ${useCase}`).join('\n')}\n\n### **✅ Advantages**\n${techInfo.advantages.map(advantage => `• ${advantage}`).join('\n')}\n\n### **🔗 Rifad's Experience**\n${techInfo.rifadConnection}\n\n*Want to know more about how Rifad uses ${techInfo.name} in his projects?*`;
    }

    // Generic tech response for unknown terms
    return `## 🤔 **Great Technical Question!**\n\nI can see you're asking about **${term}** - that's definitely relevant to modern web development!\n\n### **💡 What I can tell you:**\n• This is a technology/tool used in web development\n• It's part of the modern development ecosystem\n• Rifad likely has experience with similar technologies\n\n### **🎯 For detailed information about ${term}:**\n• **"How does Rifad use ${term}?"** - His specific experience\n• **"Show me projects with ${term}"** - Real implementations\n• **"What's Rifad's opinion on ${term}?"** - Professional insights\n\n### **🚀 Related Technologies Rifad Uses:**\n• **React** - Frontend framework (95% proficiency)\n• **JavaScript** - Core language (90% proficiency)\n• **Node.js** - Backend runtime (80% proficiency)\n• **Three.js** - 3D graphics (85% proficiency)\n\n*Want to know more about any of these technologies?*`;
  };

  // Specialized response generators
  const generateSkillsResponse = (entities, isFollowUp) => {
    if (entities.technologies.length > 0) {
      // Specific technology inquiry
      const tech = entities.technologies[0];
      const skillData = knowledgeBase.skills.frontend.proficiency[tech] ||
                       knowledgeBase.skills.backend.proficiency[tech];

      if (skillData) {
        return `## ${tech} Expertise\n\n**Proficiency Level:** ${skillData.level}%\n**Experience:** ${skillData.experience}\n**Projects Built:** ${skillData.projects}\n\n${getTechDetails(tech)}\n\n*Would you like to know about any specific aspect of ${tech} or see related projects?*`;
      }
    }

    if (isFollowUp) {
      return `Let me dive deeper into Rifad's technical expertise:\n\n### 🎯 **Core Strengths**\n${knowledgeBase.skills.frontend.expert.map(skill => `• **${skill}** - Expert level`).join('\n')}\n\n### 🚀 **Specialized Skills**\n${knowledgeBase.skills.frontend.advanced.map(skill => `• **${skill}** - Advanced proficiency`).join('\n')}\n\n### 📈 **Skill Development**\nRifad follows a continuous learning approach, constantly updating his skills with the latest industry trends and best practices.\n\n*Ask me about any specific technology for detailed insights!*`;
    }

    return `## 🌟 **Rifad's Technical Arsenal**\n\n### **Frontend Excellence**\n${Object.entries(knowledgeBase.skills.frontend.proficiency).map(([tech, data]) =>
      `**${tech}** - ${data.level}% proficiency (${data.experience})`
    ).join('\n')}\n\n### **Backend Capabilities**\n${Object.entries(knowledgeBase.skills.backend.proficiency).map(([tech, data]) =>
      `**${tech}** - ${data.level}% proficiency (${data.experience})`
    ).join('\n')}\n\n### **Development Philosophy**\n"${knowledgeBase.approach.development_philosophy}"\n\n*Want to explore any specific technology or see how these skills are applied in real projects?*`;
  };

  const generateProjectsResponse = (entities, isFollowUp) => {
    if (entities.projects.length > 0) {
      // Specific project inquiry
      const projectName = entities.projects[0];
      const project = knowledgeBase.projects[projectName];

      if (project) {
        return `## 🚀 **${projectName}** - Deep Dive\n\n${project.detailed_description}\n\n### **Technical Specifications**\n**Complexity:** ${project.complexity}\n**Duration:** ${project.duration}\n**Tech Stack:** ${project.tech_stack.join(', ')}\n\n### **Key Features**\n${project.key_features.map(feature => `• ${feature}`).join('\n')}\n\n### **Technical Challenges Solved**\n${project.technical_challenges.map(challenge => `• ${challenge}`).join('\n')}\n\n### **Achievements**\n${project.achievements.map(achievement => `✅ ${achievement}`).join('\n')}\n\n**🔗 [Live Demo](${project.live_url})** | **💻 [Source Code](${project.github_url})**\n\n*Want to know more about the technical implementation or see other projects?*`;
      }
    }

    if (isFollowUp) {
      return `Here's a detailed breakdown of Rifad's project portfolio:\n\n${Object.entries(knowledgeBase.projects).map(([name, project]) =>
        `### **${name}**\n**Type:** ${project.type} | **Complexity:** ${project.complexity}\n${project.description}\n**Key Tech:** ${project.tech_stack.slice(0, 3).join(', ')}\n`
      ).join('\n')}\n\n*Each project demonstrates different aspects of modern web development. Which one interests you most?*`;
    }

    return `## 💼 **Project Portfolio Overview**\n\nRifad has built ${Object.keys(knowledgeBase.projects).length} major projects showcasing different aspects of modern web development:\n\n${Object.entries(knowledgeBase.projects).map(([name, project]) =>
      `### 🎯 **${name}**\n${project.description}\n**Complexity:** ${project.complexity} | **Type:** ${project.type}\n**Live:** [View Project](${project.live_url})\n`
    ).join('\n')}\n\n### **Project Highlights**\n• **Full-stack expertise** demonstrated across multiple projects\n• **3D web development** specialization with Three.js\n• **Performance optimization** achieving 95+ Lighthouse scores\n• **Modern architecture** using latest frameworks and best practices\n\n*Click on any project link above or ask me for detailed technical analysis!*`;
  };

  const generateTechnicalResponse = (userInput, entities) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('architecture') || lowerInput.includes('design pattern')) {
      return `## 🏗️ **Rifad's Architecture Approach**\n\n### **Frontend Architecture**\n• **Component-based design** with React for reusability\n• **State management** using Context API and custom hooks\n• **Performance optimization** with code splitting and lazy loading\n• **Responsive design** with mobile-first approach\n\n### **Backend Architecture**\n• **RESTful API design** following industry standards\n• **Modular structure** for maintainability and scalability\n• **Security-first approach** with JWT authentication\n• **Database optimization** for efficient data retrieval\n\n### **Development Patterns**\n${knowledgeBase.approach.code_quality.map(practice => `• ${practice}`).join('\n')}\n\n*Want to dive deeper into any specific architectural aspect?*`;
    }

    if (lowerInput.includes('performance') || lowerInput.includes('optimization')) {
      return `## ⚡ **Performance Optimization Expertise**\n\n### **Frontend Optimization**\n• **Bundle optimization** with Vite and code splitting\n• **Image optimization** and lazy loading strategies\n• **CSS optimization** with Tailwind CSS purging\n• **JavaScript optimization** with modern ES6+ features\n\n### **3D Performance**\n• **Three.js optimization** for smooth 60fps animations\n• **Geometry optimization** and efficient rendering\n• **Memory management** for complex 3D scenes\n• **Progressive loading** for 3D assets\n\n### **Results Achieved**\n✅ **95+ Lighthouse scores** across all projects\n✅ **Sub-3 second load times** on average\n✅ **Smooth 60fps animations** in 3D environments\n✅ **Mobile optimization** for all screen sizes\n\n*Need specific performance optimization strategies for your project?*`;
    }

    return `## 🔧 **Technical Deep Dive**\n\nI can provide detailed technical insights about:\n\n### **Development Practices**\n• Code architecture and design patterns\n• Performance optimization strategies\n• Security implementation approaches\n• Testing and quality assurance\n\n### **Technology Implementation**\n• React advanced patterns and hooks\n• Three.js 3D programming techniques\n• Backend API design and development\n• Database design and optimization\n\n*What specific technical aspect would you like to explore?*`;
  };

  const getTechDetails = (tech) => {
    const techDetails = {
      'React': 'Rifad excels in modern React development, utilizing hooks, context, and advanced patterns for building scalable applications.',
      'JavaScript': 'Deep expertise in ES6+ features, async programming, and modern JavaScript patterns for both frontend and backend development.',
      'Three.js': 'Specialized in 3D web development, creating immersive experiences with optimized performance and smooth animations.',
      'Node.js': 'Backend development expertise with Express.js, building RESTful APIs and handling complex server-side logic.'
    };

    return techDetails[tech] || `Rifad has extensive experience with ${tech}, applying it effectively in multiple production projects.`;
  };

  const generateExperienceResponse = (isFollowUp) => {
    if (isFollowUp) {
      return `## 📈 **Career Progression & Achievements**\n\n### **Current Role (2023 - Present)**\n**${knowledgeBase.experience.current_role.title}**\n\n**Key Responsibilities:**\n${knowledgeBase.experience.current_role.responsibilities.map(resp => `• ${resp}`).join('\n')}\n\n**Notable Achievements:**\n${knowledgeBase.experience.current_role.achievements.map(achievement => `🏆 ${achievement}`).join('\n')}\n\n### **Professional Growth**\n${knowledgeBase.experience.education.continuous_learning.map(skill => `📚 ${skill}`).join('\n')}\n\n*Interested in specific projects or technical achievements?*`;
    }

    return `## 💼 **Professional Experience**\n\n**${knowledgeBase.personal.name}** brings ${knowledgeBase.personal.experience} of hands-on experience in modern web development.\n\n### **Current Focus**\n${knowledgeBase.personal.specialization}\n\n### **Professional Philosophy**\n"${knowledgeBase.personal.philosophy}"\n\n### **Core Strengths**\n${knowledgeBase.personal.strengths.map(strength => `💪 ${strength}`).join('\n')}\n\n### **Learning Approach**\n${knowledgeBase.approach.learning_approach}\n\n*Want to know more about specific projects or technical expertise?*`;
  };

  const generatePersonalResponse = () => {
    return `## 👨‍💻 **Meet ${knowledgeBase.personal.name}**\n\n**${knowledgeBase.personal.title}** based in ${knowledgeBase.personal.location}\n\n### **Professional Identity**\n${knowledgeBase.personal.specialization}\n\n### **What Drives Him**\n"${knowledgeBase.personal.philosophy}"\n\n### **Core Values**\n${knowledgeBase.personal.strengths.map(value => `🎯 ${value}`).join('\n')}\n\n### **Development Approach**\n${knowledgeBase.approach.problem_solving.map(step => `${knowledgeBase.approach.problem_solving.indexOf(step) + 1}. ${step}`).join('\n')}\n\n### **Beyond Code**\nRifad is passionate about pushing the boundaries of web development, particularly in 3D web experiences and user interface innovation.\n\n*What aspect of his background interests you most?*`;
  };

  const generateContactResponse = () => {
    return `## 📞 **Get In Touch with Rifad**\n\n### **Professional Contact**\n📧 **Email:** [${knowledgeBase.contact.email}](mailto:${knowledgeBase.contact.email})\n🌐 **Portfolio:** [${knowledgeBase.contact.portfolio}](${knowledgeBase.contact.portfolio})\n💻 **GitHub:** [${knowledgeBase.contact.github}](${knowledgeBase.contact.github})\n💼 **LinkedIn:** [${knowledgeBase.contact.linkedin}](${knowledgeBase.contact.linkedin})\n\n### **Availability**\n${knowledgeBase.contact.availability}\n\n### **Best For**\n• **Full-stack web development** projects\n• **3D web experiences** and interactive applications\n• **React/Node.js** development\n• **Technical consulting** and code reviews\n• **Freelance collaborations**\n\n### **Response Time**\nRifad typically responds to professional inquiries within 24 hours.\n\n*Ready to start a conversation about your next project?*`;
  };

  const generateComparisonResponse = (userInput, entities) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('react') && lowerInput.includes('vue')) {
      return `## ⚖️ **React vs Vue: Rifad's Perspective**\n\n### **Why Rifad Chooses React**\n• **Ecosystem maturity** - Extensive library ecosystem\n• **Community support** - Large, active developer community\n• **Flexibility** - Unopinionated approach allows custom solutions\n• **Performance** - Virtual DOM and optimization capabilities\n• **Career opportunities** - High demand in the job market\n\n### **Vue Appreciation**\n• **Learning curve** - Easier for beginners\n• **Template syntax** - More familiar to HTML developers\n• **Built-in features** - Less configuration required\n\n### **Rifad's Expertise**\nWith ${knowledgeBase.skills.frontend.proficiency.React.level}% proficiency in React and ${knowledgeBase.skills.frontend.proficiency.React.projects} projects completed, Rifad has deep expertise in React ecosystem.\n\n*Want to know about React best practices or see React projects in action?*`;
    }

    return `## 🔍 **Technology Comparisons**\n\nI can provide detailed comparisons based on Rifad's experience with:\n\n### **Frontend Frameworks**\n• React vs Vue vs Angular\n• Traditional CSS vs Tailwind CSS\n• Vanilla JS vs Framework approaches\n\n### **Backend Technologies**\n• Node.js vs Python for web development\n• REST vs GraphQL APIs\n• SQL vs NoSQL databases\n\n*What specific technologies would you like me to compare?*`;
  };

  const generateAdviceResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('learn') || lowerInput.includes('start')) {
      return `## 🎓 **Learning Path Recommendations**\n\n### **For Beginners**\n1. **HTML/CSS fundamentals** - Build solid foundation\n2. **JavaScript basics** - Learn ES6+ features\n3. **React fundamentals** - Component-based thinking\n4. **Project building** - Apply knowledge practically\n\n### **For Intermediate Developers**\n1. **Advanced React patterns** - Hooks, Context, Performance\n2. **Backend development** - Node.js and APIs\n3. **Database integration** - MongoDB or SQL\n4. **Deployment strategies** - Vercel, Netlify, AWS\n\n### **Rifad's Learning Philosophy**\n"${knowledgeBase.approach.learning_approach}"\n\n### **Recommended Resources**\n• **Hands-on projects** - Build real applications\n• **Open source contribution** - Learn from others' code\n• **Community engagement** - Join developer communities\n• **Continuous practice** - Code daily, even if just 30 minutes\n\n*Need specific guidance for your learning journey?*`;
    }

    return `## 💡 **Professional Advice from Rifad**\n\n### **Development Best Practices**\n${knowledgeBase.approach.code_quality.map(practice => `• ${practice}`).join('\n')}\n\n### **Problem-Solving Approach**\n${knowledgeBase.approach.problem_solving.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\n### **Career Development Tips**\n• **Build a strong portfolio** - Showcase your best work\n• **Stay updated** - Follow industry trends and best practices\n• **Network actively** - Engage with the developer community\n• **Focus on fundamentals** - Master core concepts before moving to frameworks\n\n*What specific advice are you looking for?*`;
  };

  const generateContextualDefault = (userInput, analysis) => {
    // Try to provide a more helpful response based on partial matches
    const lowerInput = userInput.toLowerCase();

    // Check for partial technology mentions
    const techMentions = ['react', 'javascript', 'node', 'three', 'css', 'html', 'mongodb'];
    const mentionedTech = techMentions.find(tech => lowerInput.includes(tech));

    if (mentionedTech) {
      return `## 💡 **I see you're interested in ${mentionedTech.toUpperCase()}!**\n\nRifad has excellent expertise in ${mentionedTech}. Let me help you with that:\n\n### **🎯 Try asking:**\n• "What's Rifad's ${mentionedTech} experience?"\n• "Show me ${mentionedTech} projects"\n• "How skilled is he with ${mentionedTech}?"\n• "Tell me about ${mentionedTech} best practices"\n\n### **💻 Quick Info**\n${getTechDetails(mentionedTech)}\n\n*Want to dive deeper? Just ask me specifically about ${mentionedTech}!*`;
    }

    const suggestions = [
      "What are Rifad's strongest skills?",
      "Show me his most impressive project",
      "How does he approach problem-solving?",
      "Tell me about his experience",
      "How can I contact him?"
    ];

    return `## 🤔 **I'm here to help!**\n\nI want to make sure I give you the most relevant information. Here's what I can tell you about:\n\n### **🎯 Popular Questions**\n${suggestions.map(suggestion => `• **"${suggestion}"**`).join('\n')}\n\n### **💻 Technical Deep-Dives**\n• **Skills & Technologies** - React, JavaScript, Three.js, Node.js\n• **Project Breakdowns** - Architecture, challenges, solutions\n• **Best Practices** - Code quality and development approaches\n\n### **🚀 Professional Insights**\n• **Career Journey** - Experience and achievements\n• **Development Philosophy** - Problem-solving approach\n• **Contact Information** - How to get in touch\n\n*Try rephrasing your question or pick one of the suggestions above!*`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    const currentInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate advanced AI processing time (more realistic)
    const processingTime = 1500 + Math.random() * 2000; // 1.5-3.5 seconds

    setTimeout(async () => {
      try {
        const analysis = analyzeIntent(currentInput);
        const response = await generateAdvancedResponse(currentInput);

        // Generate contextual suggestions based on the response
        const suggestions = generateContextualSuggestions(analysis.intent, analysis.entities);

        const botResponse = {
          type: 'bot',
          content: response,
          timestamp: new Date(),
          suggestions: suggestions,
          metadata: {
            intent: analysis.intent,
            confidence: analysis.confidence,
            processingTime: processingTime
          }
        };

        setMessages(prev => [...prev, botResponse]);
        updateConversationContext(currentInput, response, analysis.intent);
        setIsTyping(false);
      } catch (error) {
        console.error('Error generating response:', error);

        const errorResponse = {
          type: 'bot',
          content: "I apologize, but I'm experiencing some technical difficulties. However, I can still help you with questions about Rifad's expertise, projects, and web development topics. Please try asking your question again!",
          timestamp: new Date(),
          suggestions: [
            "What are Rifad's technical skills?",
            "Tell me about his projects",
            "How can I contact him?",
            "What technologies does he use?"
          ]
        };

        setMessages(prev => [...prev, errorResponse]);
        setIsTyping(false);
      }
    }, processingTime);
  };

  // Generate contextual follow-up suggestions
  const generateContextualSuggestions = (intent, entities) => {
    const suggestionMap = {
      greeting: [
        "What are his strongest technical skills?",
        "Show me his best project",
        "Tell me about his experience",
        "How can I contact him?"
      ],
      location: [
        "What's his technical expertise?",
        "Tell me about his projects",
        "How does he work with global teams?",
        "What's his availability for projects?"
      ],
      simple_question: [
        "What technologies does he use?",
        "Show me his portfolio projects",
        "Tell me about his experience",
        "What's his development approach?"
      ],
      general_ai: [
        "How does this relate to web development?",
        "What are the best practices?",
        "Can you give me an example?",
        "How does Rifad use this?"
      ],
      general_tech: [
        "How does Rifad use this technology?",
        "Show me projects using this",
        "What's his experience with this?",
        "Tell me about related technologies"
      ],
      skills: [
        "Show me React project examples",
        "How does he optimize performance?",
        "What about Three.js expertise?",
        "Compare his frontend vs backend skills"
      ],
      projects: [
        "What was the biggest technical challenge?",
        "How long did this project take?",
        "What would he do differently now?",
        "Show me the technical architecture"
      ],
      experience: [
        "What's his biggest achievement?",
        "How does he stay updated with tech?",
        "What's his ideal project type?",
        "Tell me about his learning journey"
      ],
      technical: [
        "Show me code examples",
        "What are his coding standards?",
        "How does he handle complex problems?",
        "What tools does he prefer?"
      ],
      personal: [
        "What motivates him as a developer?",
        "How does he approach new challenges?",
        "What's his development philosophy?",
        "What are his career goals?"
      ]
    };

    return suggestionMap[intent] || [
      "Tell me about his strongest skills",
      "Show me his best project",
      "How can I contact him?",
      "What makes him unique?"
    ];
  };



  const handleQuickQuestion = (question) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Advanced message rendering with markdown support
  const renderMessageContent = (content) => {
    // Simple markdown-like rendering
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/• (.*?)$/gm, '<li>$1</li>')
      .replace(/(\d+)\. (.*?)$/gm, '<ol><li>$2</li></ol>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  };

  // Typing indicator with realistic animation
  const TypingIndicator = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-start"
    >
      <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl max-w-[80%]">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-blue-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            />
          </div>
          <span className="text-sm text-gray-500">Rifad AI is thinking...</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Advanced Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <div className="relative z-10">
            {isOpen ? '✕' : '🤖'}
          </div>
        </motion.button>

        {/* Enhanced Notification Badge */}
        {!isOpen && (
          <motion.div
            className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.7)", "0 0 0 10px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0)"]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            AI
          </motion.div>
        )}

        {/* Status Indicator */}
        <motion.div
          className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
        />
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 p-4 text-white relative overflow-hidden">
              {/* Animated background pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform skew-x-12" />
              </motion.div>

              <div className="flex items-center space-x-3 relative z-10">
                <motion.div
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  🤖
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Rifad AI Assistant</h3>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <p className="text-sm opacity-90">Online & Ready to Help</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs opacity-75">Powered by</div>
                  <div className="text-sm font-semibold">Advanced AI</div>
                </div>
              </div>
            </div>

            {/* Enhanced Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-800">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    {/* Message bubble */}
                    <div
                      className={`p-4 rounded-2xl shadow-sm ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-4'
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 mr-4'
                      }`}
                    >
                      {message.type === 'bot' ? (
                        <div
                          className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert"
                          dangerouslySetInnerHTML={{ __html: renderMessageContent(message.content) }}
                        />
                      ) : (
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      )}

                      {/* Timestamp */}
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {message.metadata && (
                          <span className="ml-2">
                            • {message.metadata.intent} ({Math.round(message.metadata.confidence * 100)}% confidence)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Suggestions for bot messages */}
                    {message.type === 'bot' && message.suggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-3 mr-4"
                      >
                        <div className="text-xs text-gray-500 mb-2">💡 Suggested follow-ups:</div>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.slice(0, 3).map((suggestion, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => handleQuickQuestion(suggestion)}
                              className="px-3 py-1 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs transition-colors border border-blue-200 dark:border-blue-700"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {suggestion}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white order-1'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white order-2'
                  }`}>
                    {message.type === 'user' ? '👤' : '🤖'}
                  </div>
                </motion.div>
              ))}

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>



            {/* Enhanced Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Ask me anything about Rifad or web development technologies..."
                    className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                    disabled={isTyping}
                  />
                  {/* Character count */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                    {inputValue.length}/500
                  </div>
                </div>
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    inputValue.trim() && !isTyping
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isTyping ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      <span>AI</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Send</span>
                      <span>🚀</span>
                    </div>
                  )}
                </motion.button>
              </div>

              {/* Input hints */}
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                💡 Ask about Rifad's expertise, projects, or any web development technology
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
