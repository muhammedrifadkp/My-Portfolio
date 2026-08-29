// Degree 2nd Year Digital Skills Syllabus Data Structure
// Framework: LEARN -> DEMONSTRATE -> PRACTICE -> CREATE -> COMPLETE

export const DEGREE_2_MODULES = [
  {
    id: 'deg2-mod-1',
    number: 1,
    title: 'Full-Stack Web Development & Modern Web Apps',
    purpose: 'Master CSS Grid/Flexbox layouts, JavaScript ES6+ modern features, DOM state management, API data fetching, and React basics.',
    icon: 'fas fa-laptop-code',
    color: '#3B82F6',
    realProject: {
      title: 'Dynamic Web Application with Live API Integration',
      description: 'Students build a multi-page interactive web app fetching live data from a REST API (Weather/Crypto/Movies) with dynamic UI updates.'
    },
    classes: [
      {
        id: 'deg2-cls-1',
        classNum: 1,
        topic: 'Advanced CSS Layouts (CSS Grid vs Flexbox)',
        simpleConcept: 'Designing 2D grid structures (`grid-template-columns`, `gap`, `grid-area`) vs 1D Flexbox layouts.',
        objective: 'Build complex dashboard layouts using CSS Grid and Flexbox combination.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain 1D vs 2D layout math, `auto-fit`, `minmax()`, and grid placement shorthand.',
          demonstrate: 'Build a responsive analytics dashboard layout with sidebar, header, stat cards, and chart area.',
          practice: 'Construct a 4-card responsive grid layout using `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`.',
          realWorldExample: 'Layout architecture of platforms like YouTube, Trello, and Notion.',
          practicalTask: 'Create an e-commerce product gallery page layout using CSS Grid.',
          expectedOutput: 'Clean responsive grid layout without horizontal scrollbars.'
        }
      },
      {
        id: 'deg2-cls-2',
        classNum: 2,
        topic: 'Modern JavaScript (ES6+, Arrow Functions, Destructuring)',
        simpleConcept: 'Writing clean JS with `const`/`let`, arrow functions, template literals, array methods (`map`, `filter`, `reduce`).',
        objective: 'Utilize ES6+ syntax to transform and manipulate data structures efficiently.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain immutability, arrow function scoping, object destructuring, and array `.map()` vs `.filter()`.',
          demonstrate: 'Transform an array of product objects to render formatted HTML cards dynamically.',
          practice: 'Filter a list of student records based on score threshold using `.filter()` and render using `.map()`.',
          realWorldExample: 'Filtering search results on Amazon and dynamic feed rendering on Twitter.',
          practicalTask: 'Write a JS script that filters an array of items and renders matching cards on screen.',
          expectedOutput: 'Working dynamic list filter script.'
        }
      },
      {
        id: 'deg2-cls-3',
        classNum: 3,
        topic: 'Asynchronous JS, Fetch API & JSON Handling',
        simpleConcept: 'Understanding Promises, `async/await`, making HTTP requests (`fetch`), and handling JSON data.',
        objective: 'Fetch live remote data from REST APIs and render dynamic content on web pages.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain HTTP GET requests, JSON data format, loading states, and error handling with try/catch.',
          demonstrate: 'Fetch current weather data from OpenWeather API and update DOM elements live.',
          practice: 'Fetch random quotes or dog images from a public API and display on button click.',
          realWorldExample: 'Live stock tickers, crypto price trackers, and news feed widgets.',
          practicalTask: 'Build a web widget that fetches and displays live data from a public REST API.',
          expectedOutput: 'Functional API widget rendering real-time external data.'
        }
      },
      {
        id: 'deg2-cls-4',
        classNum: 4,
        topic: 'React Fundamentals (JSX, Components & Props)',
        simpleConcept: 'Introduction to React library, component architecture, JSX syntax, and passing data via Props.',
        objective: 'Understand React single-page app concepts and build reusable functional UI components.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Compare vanilla DOM manipulation vs React Virtual DOM component state rendering.',
          demonstrate: 'Create a Vite React app, build `<Header />`, `<Card />`, and `<Footer />` components.',
          practice: 'Create a reusable `<ProductCard />` component receiving `title`, `price`, and `image` props.',
          realWorldExample: 'Component-driven frontends built at Meta, Netflix, and Airbnb.',
          practicalTask: 'Build a 3-component React layout with props passed dynamically.',
          expectedOutput: 'Working React application running on Vite dev server.'
        }
      },
      {
        id: 'deg2-cls-5',
        classNum: 5,
        topic: 'React State Management & Hooks (`useState`, `useEffect`)',
        simpleConcept: 'Managing component state with `useState` hook and side-effects/data fetching with `useEffect`.',
        objective: 'Manage reactive UI state and run side-effects inside React components.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain reactivity, state immutability, dependency arrays in `useEffect`, and re-rendering cycles.',
          demonstrate: 'Build an interactive To-Do app or shopping cart counter with state persistence.',
          practice: 'Create a search filter input component in React that updates a filtered list in real-time.',
          realWorldExample: 'Interactive form inputs, shopping cart updates, and live search bars.',
          practicalTask: 'Build an interactive React To-Do List app with add, toggle, and delete features.',
          expectedOutput: 'Fully functional React state-managed application.'
        }
      }
    ]
  },
  {
    id: 'deg2-mod-2',
    number: 2,
    title: 'AI-Powered Application Building & Smart Tools',
    purpose: 'Learn how to integrate AI APIs (OpenAI/Anthropic), build AI-powered web tools, and utilize prompt-driven code generators.',
    icon: 'fas fa-microchip',
    color: '#8B5CF6',
    realProject: {
      title: 'AI Assistant Web Utility App',
      description: 'Build a functional web interface connected to an AI API that generates text responses, translates languages, or summarizes code.'
    },
    classes: [
      {
        id: 'deg2-cls-6',
        classNum: 6,
        topic: 'AI APIs Overview & API Key Security',
        simpleConcept: 'Understanding REST endpoints for OpenAI / Anthropic Claude APIs, request payloads, and securing `.env` keys.',
        objective: 'Make secure API requests to LLM endpoints and parse model responses.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain API authentication headers, token usage costs, system messages, and environment variables.',
          demonstrate: 'Send a prompt request to OpenAI/Claude API endpoint using JS `fetch` and log response.',
          practice: 'Create a simple frontend form that sends a user question to an AI endpoint and displays the answer.',
          realWorldExample: 'Customer service chatbots, automated email copilot tools, and AI writing assistants.',
          practicalTask: 'Build a minimal AI Chat interface sending user queries to an API and showing replies.',
          expectedOutput: 'Working AI chatbot web interface.'
        }
      },
      {
        id: 'deg2-cls-7',
        classNum: 7,
        topic: 'AI-Assisted Coding with v0, Bolt & Cursor',
        simpleConcept: 'Using AI code generators (v0.dev, Cursor IDE, Claude) to build production UI components from natural language prompts.',
        objective: 'Speed up web development by 5x using prompt-driven UI generation and AI code reviews.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Demonstrate prompt engineering for code generation, reviewing generated code, and debugging AI output.',
          demonstrate: 'Prompt v0/Cursor to generate a complex pricing table component, refine styling, and integrate into app.',
          practice: 'Generate a landing page hero section using AI prompts, customize colors, and embed in project.',
          realWorldExample: 'Rapid prototyping of startup MVP apps in hours instead of weeks.',
          practicalTask: 'Prompt AI to build a full responsive landing page section, review, and integrate locally.',
          expectedOutput: 'High-quality React UI component built via AI code assistance.'
        }
      },
      {
        id: 'deg2-cls-8',
        classNum: 8,
        topic: 'Building an AI Content Generator Web App',
        simpleConcept: 'Combining a React form with AI API calls to generate social media posts, blog outlines, or email templates.',
        objective: 'Build a specialized AI utility web application with input parameters and formatted output display.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain user input parameters (tone, length, topic), prompt templating, and copy-to-clipboard functionality.',
          demonstrate: 'Build a Social Media Post Generator app: user enters topic -> AI outputs 3 caption variations + hashtags.',
          practice: 'Create an Email Drafting Assistant where users select tone (formal/friendly) and topic to generate drafts.',
          realWorldExample: 'SaaS tools like Jasper AI, Copy.ai, and marketing copy generators.',
          practicalTask: 'Deploy an AI Copy Generator web app with copy-to-clipboard button and loading spinner.',
          expectedOutput: 'Polished AI content generation web app.'
        }
      },
      {
        id: 'deg2-cls-9',
        classNum: 9,
        topic: 'Multimodal AI (Vision & Audio API Integration)',
        simpleConcept: 'Using AI image analysis APIs (analyzing uploaded photos) and text-to-speech voice generation in web apps.',
        objective: 'Build web applications that accept image inputs or output audio speech using multimodal AI.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain base64 image encoding, GPT-4 Vision / Claude Vision API capabilities, and audio streaming.',
          demonstrate: 'Upload a image file -> AI describes contents and suggests alt-text or caption.',
          practice: 'Build an image descriptor tool where users upload an image and receive an automated AI description.',
          realWorldExample: 'Accessibility alt-text generators, automated receipt scanners, and visual search.',
          practicalTask: 'Create an Image Analyzer web widget that processes uploaded photos using AI vision.',
          expectedOutput: 'Working multimodal AI web application.'
        }
      },
      {
        id: 'deg2-cls-10',
        classNum: 10,
        topic: 'Deploying AI Web Applications to Vercel / Netlify',
        simpleConcept: 'Hosting React apps online, setting up environment variables, custom domains, and continuous deployment via Git.',
        objective: 'Deploy a production React AI application to cloud hosting platforms like Vercel or Netlify.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain GitHub repo connection, build settings (`npm run build`), environment variable configuration, and HTTPS.',
          demonstrate: 'Push project code to GitHub, connect repo to Vercel, set `VITE_AI_API_KEY`, and deploy live URL.',
          practice: 'Publish your React web application online and share the live public web link.',
          realWorldExample: 'Production release pipeline for modern web applications.',
          practicalTask: 'Deploy your web project to Vercel and submit a working live URL.',
          expectedOutput: 'Live HTTPS web URL displaying the deployed React app.'
        }
      }
    ]
  },
  {
    id: 'deg2-mod-3',
    number: 3,
    title: 'Advanced Vector Design & Brand Identity',
    purpose: 'Master Adobe Illustrator vector path drawing, logo design theory, color psychology, and brand guidelines creation.',
    icon: 'fas fa-vector-square',
    color: '#00F0FF',
    realProject: {
      title: 'Complete Corporate Brand Identity Guide',
      description: 'Design a primary logo mark, secondary typography system, color palette swatch deck, and brand mockup guidelines.'
    },
    classes: [
      {
        id: 'deg2-cls-11',
        classNum: 11,
        topic: 'Illustrator Masterclass: Pen Tool & Anchor Points',
        simpleConcept: 'Mastering vector Bezier curves, anchor point handles, Pathfinder tool, and precision vector drawing.',
        objective: 'Draw complex custom vector shapes and icons with smooth Bezier curves.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain corner vs smooth anchor points, handle direction, Pathfinder union/minus front, and Shape Builder.',
          demonstrate: 'Trace a complex mascot silhouette using Pen Tool and refine anchor point curvature.',
          practice: 'Complete a vector Pen Tool precision tracing challenge with 10 custom icon paths.',
          realWorldExample: 'Vector icon design for app interfaces, brand logos, and custom typography.',
          practicalTask: 'Trace and vector-render a custom complex brand icon using Illustrator Pen Tool.',
          expectedOutput: 'Clean vector path illustration saved as AI/SVG.'
        }
      },
      {
        id: 'deg2-cls-12',
        classNum: 12,
        topic: 'Logo Design Principles & Brand Typography Systems',
        simpleConcept: 'Understanding logo styles (Wordmark, Emblem, Combination Mark), optical alignment, and font pairing.',
        objective: 'Construct a memorable corporate logo mark applying design grid principles.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain golden ratio grids, negative space utilization, kerning, tracking, and logo scalability test.',
          demonstrate: 'Design a tech startup logo using geometric grid lines and custom kerning on brand name.',
          practice: 'Sketch 3 logo concepts on paper and digitize the best concept into an Illustrator grid.',
          realWorldExample: 'Corporate branding rebrands like Mastercard, FedEx, and Airbnb.',
          practicalTask: 'Create a professional combination logo mark (icon + typography) on a design grid.',
          expectedOutput: 'Scalable vector logo mark in dark and light background variations.'
        }
      },
      {
        id: 'deg2-cls-13',
        classNum: 13,
        topic: 'Color Psychology, Palette Gradients & Swatch Systems',
        simpleConcept: 'Color theory (RGB vs CMYK), brand emotional psychology, creating 60-30-10 color rules, and gradient meshes.',
        objective: 'Develop a harmonious brand color palette system and apply modern gradient meshes.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain warm vs cool color psychology, accessible contrast ratios (WCAG AAA), and gradient stops.',
          demonstrate: 'Create a 5-color brand swatch palette with hex codes, Pantone equivalents, and custom gradient mesh.',
          practice: 'Build a brand color palette card for a healthcare vs tech vs luxury coffee brand.',
          realWorldExample: 'Spotify green, Cadbury purple, and Coca-Cola red brand color recognition.',
          practicalTask: 'Design a 5-swatch brand color palette sheet with hex codes and gradient specs.',
          expectedOutput: 'Professional brand color palette specification sheet.'
        }
      },
      {
        id: 'deg2-cls-14',
        classNum: 14,
        topic: 'Photoshop Brand Product Mockups & Smart Objects',
        simpleConcept: 'Applying vector designs onto 3D photorealistic mockups (t-shirts, business cards, signage) using Smart Objects.',
        objective: 'Place 2D designs into realistic 3D product mockups using Photoshop Smart Objects and perspective transforms.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Smart Objects non-destructive editing, displacement maps, and lighting blend modes.',
          demonstrate: 'Double-click Smart Object layer in mockup PSD, paste vector logo, save, and view realistic product preview.',
          practice: 'Place your logo design onto a 3D business card mockup, storefront sign, and tote bag mockup.',
          realWorldExample: 'Client design pitch presentations and portfolio showcases.',
          practicalTask: 'Render 3 realistic product mockups showcasing your brand logo in real-world contexts.',
          expectedOutput: 'High-resolution photorealistic product mockup images.'
        }
      },
      {
        id: 'deg2-cls-15',
        classNum: 15,
        topic: 'Assembling a PDF Brand Identity Style Guide',
        simpleConcept: 'Compiling brand assets into a multi-page PDF brand manual covering logo usage, typography, colors, and incorrect usage.',
        objective: 'Export a professional multi-page Brand Guidelines PDF document.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain brand guide structure: Mission -> Logo clear space -> Palette -> Typography -> Mockups.',
          demonstrate: 'Assemble a 6-page Brand Guidelines document in Illustrator/InDesign and export interactive PDF.',
          practice: 'Compile your logo, swatches, typography, and mockups into a 4-page mini brand book.',
          realWorldExample: 'Enterprise brand manuals provided to design agencies and media partners.',
          practicalTask: 'Create a 4-page Brand Identity Guidelines PDF book.',
          expectedOutput: 'Complete multi-page Brand Identity PDF document.'
        }
      }
    ]
  },
  {
    id: 'deg2-mod-4',
    number: 4,
    title: 'Professional Video Editing & Motion Graphics',
    purpose: 'Master Premiere Pro sequence workflows, After Effects motion graphics intro, keyframe masking, speed ramping, and sound design.',
    icon: 'fas fa-film',
    color: '#10B981',
    realProject: {
      title: 'Commercial Brand Promo Video with Motion Graphics',
      description: 'Produce a 45-second promo video featuring dynamic speed ramps, animated lower thirds, motion title card, and layered sound effects.'
    },
    classes: [
      {
        id: 'deg2-cls-16',
        classNum: 16,
        topic: 'Premiere Pro Multi-Track Editing & Proxy Workflows',
        simpleConcept: 'Organizing complex multi-track timelines, proxy video creation for smooth editing, and keyboard shortcut mastery.',
        objective: 'Manage multi-camera video timelines and streamline editing speed using custom proxy media.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain proxy video rendering (editing in 720p, exporting in 4K), track targeting, and 3-point editing.',
          demonstrate: 'Create proxies for 4K footage, cut between 2 camera angles seamlessly, and organize timeline audio tracks.',
          practice: 'Edit a 2-camera interview scene, toggling between A-roll speaker and B-roll action footage.',
          realWorldExample: 'High-end documentary editing and commercial television production.',
          practicalTask: 'Assemble a multi-track A-roll/B-roll video sequence with smooth footage switches.',
          expectedOutput: 'Clean multi-layer video timeline sequence.'
        }
      },
      {
        id: 'deg2-cls-17',
        classNum: 17,
        topic: 'Speed Ramping, Time Remapping & Optical Flow',
        simpleConcept: 'Creating dramatic slow-motion and fast-forward transitions by manipulating clip time curves.',
        objective: 'Apply smooth speed ramps with Optical Flow frame interpolation.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain 60fps/120fps high frame rate footage, velocity graphs, speed ramp handles, and Optical Flow.',
          demonstrate: 'Create a speed ramp: fast clip -> sudden smooth slow motion -> fast exit transition.',
          practice: 'Apply speed ramping to a 10-second sports or dance video clip.',
          realWorldExample: 'Action sports edits, car commercials, and cinematic travel reels.',
          practicalTask: 'Edit a 15-second cinematic speed ramp sequence with smooth speed transitions.',
          expectedOutput: 'High-energy video edit featuring smooth speed ramping.'
        }
      },
      {
        id: 'deg2-cls-18',
        classNum: 18,
        topic: 'After Effects Intro: Text Animators & Shape Layers',
        simpleConcept: 'Introduction to Adobe After Effects interface, composition settings, shape animators, and trim paths.',
        objective: 'Build motion graphic title cards and animated logo reveals in After Effects.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Explain Compositions vs Sequences, Easy Ease (F9), Graph Editor velocity curves, and Trim Paths.',
          demonstrate: 'Create a logo reveal animation using shape layer trim paths and animated text opacity.',
          practice: 'Animate a 5-second lower third title card with smooth slide-in and line draw effects.',
          realWorldExample: 'Broadcast television graphics, YouTube channel intros, and app promo animations.',
          practicalTask: 'Build an animated lower-third title card in After Effects and export alpha transparent video.',
          expectedOutput: 'Rendered motion graphic title card with transparent alpha channel.'
        }
      },
      {
        id: 'deg2-cls-19',
        classNum: 19,
        topic: 'Professional Sound Design, SFX & Audio Mastering',
        simpleConcept: 'Layering Foley sound effects (whooshes, risers, hits), room tone, compression, and loudness normalization (LUFS).',
        objective: 'Build immersive audio soundscapes and master final video audio loudness levels.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain sound effect layering (impact + WHOOSH + swoosh), EQ frequencies, compressor threshold, and -14 LUFS standard.',
          demonstrate: 'Add swoosh audio to video transitions, impact bass drop to title reveal, and normalize final audio mix.',
          practice: 'Build a multi-track sound effect layer for a 15-second silent action video sequence.',
          realWorldExample: 'Hollywood movie trailer sound design and commercial soundscapes.',
          practicalTask: 'Complete a full sound design layer with whooshes, impacts, background music, and voiceover.',
          expectedOutput: 'Rich multi-layered audio track perfectly timed to video visuals.'
        }
      },
      {
        id: 'deg2-cls-20',
        classNum: 20,
        topic: 'Final Commercial Video Render & YouTube/Reels Export',
        simpleConcept: 'Exporting settings for web streaming: H.264 / HEVC codecs, bitrate targets (VBR 2-pass), and thumbnail design.',
        objective: 'Export optimal video files for various social platforms and design high-CTR video thumbnails.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain codecs (H.264, ProRes), bitrates (target vs max bitrate), resolution matching, and thumbnail click-through rates.',
          demonstrate: 'Export 1080p MP4 master file; design a high-contrast YouTube thumbnail graphic in Photoshop.',
          practice: 'Export your promo video with high quality render settings and create a YouTube thumbnail card.',
          realWorldExample: 'Digital marketing agency content delivery standards.',
          practicalTask: 'Export final promo video MP4 and produce matching high-CTR thumbnail graphic.',
          expectedOutput: 'Exported HD video file and matching eye-catching thumbnail.'
        }
      }
    ]
  },
  {
    id: 'deg2-mod-5',
    number: 5,
    title: 'Digital Marketing & Social Media Growth',
    purpose: 'Learn digital marketing strategy, Meta Ads Manager basics, Search Engine Optimization (SEO), content funnel creation, and analytics.',
    icon: 'fas fa-bullhorn',
    color: '#F59E0B',
    realProject: {
      title: '30-Day Digital Growth & Ad Campaign Strategy',
      description: 'Students outline a target buyer persona, design 3 ad creative variations, set up a sample Meta Ad campaign, and build an analytics tracking report.'
    },
    classes: [
      {
        id: 'deg2-cls-21',
        classNum: 21,
        topic: 'Digital Marketing Funnel & Buyer Persona Mapping',
        simpleConcept: 'Understanding TOFU (Awareness), MOFU (Consideration), BOFU (Conversion) marketing funnel stages.',
        objective: 'Define target customer demographics, pain points, and map content for every sales funnel stage.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Customer Acquisition Cost (CAC), Lifetime Value (LTV), buyer personas, and customer journey maps.',
          demonstrate: 'Build a detailed Customer Persona sheet for an online clothing store vs online tech course.',
          practice: 'Map out 3 content ideas for Awareness, 3 for Consideration, and 2 for Conversion for a brand.',
          realWorldExample: 'E-commerce sales funnels and SaaS product onboarding marketing.',
          practicalTask: 'Create a complete Buyer Persona document and 3-stage marketing funnel strategy.',
          expectedOutput: 'Detailed customer persona profile and content funnel roadmap.'
        }
      },
      {
        id: 'deg2-cls-22',
        classNum: 22,
        topic: 'Search Engine Optimization (SEO) & Keyword Research',
        simpleConcept: 'On-page SEO (meta tags, headings, page speed), off-page SEO (backlinks), and keyword research tools.',
        objective: 'Conduct keyword research and optimize web page meta titles, descriptions, and content for search engines.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain search volume, keyword difficulty, intent (informational vs transactional), and Google Search Console.',
          demonstrate: 'Use Google Keyword Planner / Ubersuggest to find 5 high-volume low-competition keywords.',
          practice: 'Write SEO-optimized meta title, meta description, and heading structure for a blog article.',
          realWorldExample: 'Ranking on page 1 of Google search for high-intent business terms.',
          practicalTask: 'Perform keyword research for a business niche and write an optimized landing page meta tag set.',
          expectedOutput: 'Keyword research spreadsheet and optimized SEO copy document.'
        }
      },
      {
        id: 'deg2-cls-23',
        classNum: 23,
        topic: 'Meta Ads Manager Setup & Ad Targeting',
        simpleConcept: 'Navigating Meta Business Suite, Campaign -> Ad Set -> Ad structure, custom audiences, and interest targeting.',
        objective: 'Set up Meta Ad campaigns with precise audience targeting and budget allocation.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Explain Campaign objectives (Traffic, Leads, Sales), Pixel tracking, lookalike audiences, and A/B testing.',
          demonstrate: 'Walk through Meta Ads Manager UI, create a lead generation campaign, and define demographic filters.',
          practice: 'Configure an ad set targeting 18-25 year olds interested in web design in Kerala region.',
          realWorldExample: 'Targeted Instagram and Facebook ad campaigns driving e-commerce sales.',
          practicalTask: 'Draft a complete Meta Ad Campaign structure including audience parameters and daily budget.',
          expectedOutput: 'Structured ad campaign spec sheet ready for live launch.'
        }
      },
      {
        id: 'deg2-cls-24',
        classNum: 24,
        topic: 'Ad Creative Design & Copywriting (AIDA Framework)',
        simpleConcept: 'Writing persuasive ad copy using AIDA (Attention, Interest, Desire, Action) and designing high-converting ad visuals.',
        objective: 'Draft high-converting ad copy and design 3 creative ad variation assets (Static, Carousel, Short Video).',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain scroll-stopping hooks, clear Call To Action (CTA), visual contrast, and headline formulas.',
          demonstrate: 'Write 2 ad copy variations using AIDA framework and pair with custom promo images.',
          practice: 'Write 3 distinct ad copy hooks for a product launch and design matching 1080x1080 ad graphics.',
          realWorldExample: 'Direct response advertising campaigns generating leads and instant online sales.',
          practicalTask: 'Design 2 visual ad creatives and write accompanying AIDA ad copy for a product.',
          expectedOutput: 'Complete ad creative package with visual graphics and copy.'
        }
      },
      {
        id: 'deg2-cls-25',
        classNum: 25,
        topic: 'Marketing Analytics, Meta Pixel & ROI Tracking',
        simpleConcept: 'Tracking website conversions using Meta Pixel / Google Analytics 4, ROI calculation, and campaign optimization.',
        objective: 'Analyze campaign performance metrics (CTR, CPC, CPA, ROAS) and optimize ad spend.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Return On Ad Spend (ROAS), Click-Through Rate (CTR), Cost Per Click (CPC), and Meta Pixel event triggers.',
          demonstrate: 'Analyze a sample ad dashboard report: identify losing ads (low CTR) vs winning ads (high ROAS).',
          practice: 'Calculate ROAS, CTR, and profit for 3 sample ad campaigns and recommend budget reallocations.',
          realWorldExample: 'Digital marketing reporting provided to business stakeholders and clients.',
          practicalTask: 'Build a marketing performance summary dashboard report analyzing campaign metrics.',
          expectedOutput: 'Marketing analytics report with data-driven optimization recommendations.'
        }
      }
    ]
  }
];

export const DEGREE_2_SPECIALIZATION_OPTIONS = [
  {
    id: 'track-fullstack',
    title: 'Full-Stack Web & AI App Development',
    icon: 'fas fa-laptop-code',
    description: 'Focus on React UI development, REST API integrations, AI LLM endpoints, and Vercel cloud deployment.',
    keySkills: ['React & Component Architecture', 'Async JS & Fetch REST APIs', 'AI API Integration (OpenAI/Claude)', 'Vercel Cloud Deployment'],
    portfolioDeliverable: 'A live interactive React web app integrated with AI APIs hosted online.'
  },
  {
    id: 'track-brand',
    title: 'Vector Brand Architecture & Design',
    icon: 'fas fa-vector-square',
    description: 'Focus on Adobe Illustrator vector paths, corporate logo design grids, product mockups, and brand style guides.',
    keySkills: ['Illustrator Pen Tool Precision', 'Grid Logo Construction', '3D Photoshop Mockups', 'PDF Brand Guide Compilation'],
    portfolioDeliverable: 'A complete multi-page Corporate Brand Style Guide PDF and 3D mockup showcase.'
  },
  {
    id: 'track-media-marketing',
    title: 'Commercial Video Production & Digital Marketing',
    icon: 'fas fa-bullhorn',
    description: 'Focus on Premiere Pro multi-track editing, After Effects title animations, Meta ad targeting, and marketing analytics.',
    keySkills: ['Premiere Pro & After Effects', 'Speed Ramping & Motion Titles', 'Meta Ads Manager Campaign Setup', 'Analytics & ROAS Optimization'],
    portfolioDeliverable: 'A 45-second commercial promo video and complete Meta ad campaign strategy deck.'
  }
];

export const calculateDegree2Metrics = (savedProgress) => {
  let totalClasses = 0;
  let completedClasses = 0;
  let inProgressClasses = 0;

  const moduleMetrics = DEGREE_2_MODULES.map((mod) => {
    const modClasses = mod.classes.length;
    let modCompleted = 0;
    let modInProgress = 0;

    mod.classes.forEach((cls) => {
      totalClasses++;
      const status = savedProgress[cls.id]?.status || 'NOT STARTED';
      if (status === 'COMPLETED') {
        completedClasses++;
        modCompleted++;
      } else if (status === 'IN PROGRESS') {
        inProgressClasses++;
        modInProgress++;
      }
    });

    const percent = modClasses > 0 ? Math.round((modCompleted / modClasses) * 100) : 0;
    return {
      moduleId: mod.id,
      total: modClasses,
      completed: modCompleted,
      inProgress: modInProgress,
      percentage: percent
    };
  });

  const overallPercentage = totalClasses > 0 ? Math.round((completedClasses / totalClasses) * 100) : 0;

  return {
    totalClasses,
    completedClasses,
    inProgressClasses,
    overallPercentage,
    moduleMetrics
  };
};
