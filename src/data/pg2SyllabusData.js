// PG 2nd Year (Postgraduate Final Year) Digital Mastery & Career Launch Syllabus Data
// Engineered directly from PG 2nd Year student survey responses: Custom AI Tool Building (e.g. Islamic Studies AI Tools), Cinema-Style AI Video Production, Full-Stack Web Apps (React/JS/Python), Digital Marketing & Meta Ads, and Global Freelancing (Upwork/Fiverr) & Career Launch.

export const PG_2_MODULES = [
  {
    id: 'pg2-mod-1',
    number: 1,
    title: 'Advanced AI Tool Building & Custom Knowledge Agents',
    purpose: 'Learn to build custom AI-powered web tools, domain research assistants (e.g. Islamic Studies AI Tools), prompt frameworks, and knowledge base chatbots using APIs.',
    color: '#7C3AED',
    icon: 'fas fa-robot',
    realProject: {
      title: 'Custom AI Research Assistant & Domain Knowledge Tool',
      description: 'Build and deploy a functional custom AI web application capable of retrieving domain knowledge, answering complex queries, and assisting academic research.'
    },
    classes: [
      {
        id: 'pg2-c1',
        classNum: 1,
        topic: 'AI API Fundamentals & Prompt Framework Architecture',
        simpleConcept: 'Connecting web applications directly to OpenAI and Claude APIs to generate custom AI responses programmatically.',
        objective: 'Understand API keys, HTTP request headers, system prompts, temperature parameters, and JSON response formats.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain API endpoints, authentication, token usage cost management, and structuring system prompts for domain-specific AI.',
          demonstrate: 'Make a live API call to OpenAI/Claude API in JS/Python to generate structured answers based on custom context.',
          practicalTask: 'Write an API script that sends user questions to an AI model and formats the answer into structured bullet points.',
          expectedOutput: 'Working code script making successful API requests to an LLM.'
        }
      },
      {
        id: 'pg2-c2',
        classNum: 2,
        topic: 'Building Domain-Specific AI Tools (e.g. Islamic Studies & Academic AI)',
        simpleConcept: 'Creating specialized AI prompts and knowledge databases for specific fields like Islamic Studies or Literature.',
        objective: 'Engineer domain-specific AI assistants with strict guardrails, accurate sources, and specialized terminology.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Discuss domain prompt engineering, citation verification, avoiding hallucinations in specialized fields, and multi-language support.',
          demonstrate: 'Build a prototype AI tool that searches and translates specialized academic or historical texts accurately.',
          practicalTask: 'Design a specialized prompt framework for a custom domain assistant (e.g. Islamic Studies QA or Academic Helper).',
          expectedOutput: 'Functional AI prompt system tailored to a specialized subject area.'
        }
      },
      {
        id: 'pg2-c3',
        classNum: 3,
        topic: 'RAG (Retrieval-Augmented Generation) & PDF Document Q&A',
        simpleConcept: 'Allowing AI to read, search, and answer questions directly from custom uploaded PDFs and documents.',
        objective: 'Understand document chunking, embeddings, vector search concepts, and PDF text extraction for AI.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain RAG architecture: Document parsing -> Embeddings -> Vector Search -> LLM Synthesis.',
          demonstrate: 'Upload a 50-page reference document to a RAG pipeline and query precise facts with page citations.',
          practicalTask: 'Build a document Q&A interface where users upload a document and receive source-backed AI answers.',
          expectedOutput: 'Document search tool providing accurate answers with page references.'
        }
      },
      {
        id: 'pg2-c4',
        classNum: 4,
        topic: 'AI Workflows & Automation Agents (n8n & Zapier AI Integration)',
        simpleConcept: 'Automating multi-step workflows by connecting AI models with email, databases, and web services.',
        objective: 'Build automated AI workflows that trigger based on events (e.g. automated email summarization or lead scoring).',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain workflow triggers, webhook payloads, data transformations, and connecting AI nodes in n8n/Zapier.',
          demonstrate: 'Build an automated agent that receives a web form submission, summarizes it with AI, and sends an alert.',
          practicalTask: 'Create a 3-step automated workflow connecting a web form, AI analysis, and automated notification.',
          expectedOutput: 'Active automated workflow handling incoming data autonomously.'
        }
      },
      {
        id: 'pg2-c5',
        classNum: 5,
        topic: 'Deploying Custom AI Web Applications to Live Servers',
        simpleConcept: 'Packaging your AI tool into a clean user interface and deploying it live on the web for public use.',
        objective: 'Integrate front-end form inputs with back-end AI API endpoints and deploy live on Vercel/Render.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Cover API key security (environment variables .env), rate limiting, loading spinners, and cloud deployment.',
          demonstrate: 'Deploy a complete AI Web App to Vercel with secure serverless API functions.',
          practicalTask: 'Deploy your custom AI tool live on Vercel and test public access on mobile and desktop.',
          expectedOutput: 'A live, publicly accessible URL for your custom AI web application.'
        }
      }
    ]
  },
  {
    id: 'pg2-mod-2',
    number: 2,
    title: 'Full-Stack Web Engineering (React, Modern JS & APIs)',
    purpose: 'Master enterprise full-stack web application development using modern JavaScript ES6+, React component architecture, REST APIs, and state management.',
    color: '#0284C7',
    icon: 'fas fa-code-branch',
    realProject: {
      title: 'Interactive Full-Stack Web Application with Dynamic Data',
      description: 'Build and launch a modern React application connected to external REST APIs with state management, routing, and responsive CSS.'
    },
    classes: [
      {
        id: 'pg2-c6',
        classNum: 6,
        topic: 'Modern JavaScript ES6+ Architecture (Arrow Functions, Destructuring, Async/Await)',
        simpleConcept: 'Writing clean, modern JavaScript logic used by professional software engineering teams.',
        objective: 'Master ES6 modules, array methods (.map, .filter, .reduce), destructuring, and async/await promises.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain synchronous vs asynchronous execution, promises, fetch API, and clean code structure.',
          demonstrate: 'Fetch live weather or news data from a public REST API using async/await and display it on screen.',
          practicalTask: 'Write JS code to fetch data from an open API, filter results, and render cards dynamically.',
          expectedOutput: 'A dynamic web page fetching and displaying API data without page refresh.'
        }
      },
      {
        id: 'pg2-c7',
        classNum: 7,
        topic: 'React Fundamentals, Components & JSX Structure',
        simpleConcept: 'Building websites using reusable UI components in React.',
        objective: 'Understand React virtual DOM, JSX syntax, component hierarchy, and prop passing.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Teach why modern web apps use React, component reusability, props vs state, and JSX rules.',
          demonstrate: 'Create a React project using Vite and build modular Navbar, Card, and Footer components.',
          practicalTask: 'Build a reusable Product Card component in React and render a list using props.',
          expectedOutput: 'Modular React project with reusable components.'
        }
      },
      {
        id: 'pg2-c8',
        classNum: 8,
        topic: 'React State Management & Hooks (useState, useEffect)',
        simpleConcept: 'Managing dynamic application state like user inputs, shopping carts, and live data updates.',
        objective: 'Master useState for reactive UI updates and useEffect for side effects and data fetching.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain state reactivity, re-rendering triggers, effect dependency arrays, and handling form inputs.',
          demonstrate: 'Build an interactive Task Manager app in React with add, edit, complete, and delete states.',
          practicalTask: 'Create an interactive calculator or shopping cart in React using useState and useEffect.',
          expectedOutput: 'Working interactive React application with state management.'
        }
      },
      {
        id: 'pg2-c9',
        classNum: 9,
        topic: 'Multi-Page Web Routing & Third-Party API Integration',
        simpleConcept: 'Adding multi-page navigation (React Router) and connecting live databases.',
        objective: 'Implement React Router DOM for seamless single-page application (SPA) routing.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain single-page app routing, dynamic URL parameters (:id), Link navigation, and loading states.',
          demonstrate: 'Build a multi-page dashboard with Home, Details, and Settings pages without browser page reload.',
          practicalTask: 'Implement React Router in a web project with dynamic detail pages for items.',
          expectedOutput: 'A multi-page React single-page application with smooth route transitions.'
        }
      },
      {
        id: 'pg2-c10',
        classNum: 10,
        topic: 'Full-Stack Web App Optimization & Production Vercel Build',
        simpleConcept: 'Optimizing web application speed, accessibility, and deploying a production build.',
        objective: 'Perform code splitting, lighthouse optimization, environment setup, and Vercel production build.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain production build assets, minification, bundle optimization, and continuous deployment git integration.',
          demonstrate: 'Run `npm run build` and deploy a production-grade React app to Vercel with clean Lighthouse scores.',
          practicalTask: 'Build, optimize, and deploy your complete React Web Application live on Vercel.',
          expectedOutput: 'A production-ready React web app live URL on Vercel.'
        }
      }
    ]
  },
  {
    id: 'pg2-mod-3',
    number: 3,
    title: 'Cinema-Style Video Production & AI Media Creation',
    purpose: 'Master cinema-style video creation using AI video generators (Runway/Pika/Midjourney), cinematic camera movement, color grading, and After Effects motion graphics.',
    color: '#D97706',
    icon: 'fas fa-film',
    realProject: {
      title: '90-Second Cinematic AI Commercial Video & Trailer',
      description: 'Produce a high-end cinematic promotional trailer using AI video generation, camera movement prompts, color grading, sound design, and After Effects motion graphics.'
    },
    classes: [
      {
        id: 'pg2-c11',
        classNum: 11,
        topic: 'AI Video Generation & Cinema Prompting (Runway Gen-2 & Pika)',
        simpleConcept: 'Creating realistic cinematic video shots from text prompts and keyframe images using AI.',
        objective: 'Master text-to-video, image-to-video, motion brush controls, and camera movement parameters.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain AI video generation models, prompt syntax for camera movement (pan, tilt, zoom, tracking shot), and frame consistency.',
          demonstrate: 'Generate a 4-second cinematic camera pan shot from a Midjourney image using Runway Gen-2.',
          practicalTask: 'Generate 4 cinematic video shots with specific camera movements (tracking, aerial zoom, dolly).',
          expectedOutput: 'A collection of 4 seamless AI-generated cinematic video clips.'
        }
      },
      {
        id: 'pg2-c12',
        classNum: 12,
        topic: 'Cinematic Storyboarding, Shot Types & Visual Composition',
        simpleConcept: 'Planning cinematic storytelling using establishing shots, close-ups, overhead angles, and pacing.',
        objective: 'Design a professional video storyboard with focal length, rule of thirds, and lighting setups.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Teach cinema shot types (Wide, Medium, Close-Up, Extreme Close-Up), lighting (key, fill, rim), and color temperature.',
          demonstrate: 'Assemble a 6-shot cinematic storyboard sequence for a product trailer or short film concept.',
          practicalTask: 'Create a 6-shot cinematic storyboard sequence for a 60-second video project.',
          expectedOutput: 'A complete visual storyboard document detailing shot angles and camera moves.'
        }
      },
      {
        id: 'pg2-c13',
        classNum: 13,
        topic: 'After Effects Compositing, VFX & Motion Graphics',
        simpleConcept: 'Adding visual effects, 3D text overlays, and motion graphics to elevate video production quality.',
        objective: 'Master After Effects keyframing, 3D camera tracker, text motion graphics, and green screen keying.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Cover keyframe easing (Easy Ease), graph editor speed curves, track matte masking, and 3D camera layer setup.',
          demonstrate: 'Track a 3D cinematic text title onto a moving video background in After Effects.',
          practicalTask: 'Create a cinematic title reveal animation with particles and motion blur in After Effects.',
          expectedOutput: 'An animated Motion Graphics video clip exported in high resolution.'
        }
      },
      {
        id: 'pg2-c14',
        classNum: 14,
        topic: '3D Animation & Asset Integration Concepts (Blender / Ae 3D)',
        simpleConcept: 'Introducing 3D models, textures, and camera fly-throughs for high-end video visuals.',
        objective: 'Understand 3D asset import, lighting setups, material textures, and camera animation concepts.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain 3D space coordinates (X, Y, Z), HDRI environment lighting, keyframe 3D camera rotation, and rendering.',
          demonstrate: 'Import a 3D product model and animate a 360-degree camera orbit around the object.',
          practicalTask: 'Render a 3D logo or product showcase scene with realistic lighting and reflections.',
          expectedOutput: 'A 3D animated showcase video clip.'
        }
      },
      {
        id: 'pg2-c15',
        classNum: 15,
        topic: 'Final Cinema Reel Mastering, Color LUTs & Sound Scoring',
        simpleConcept: 'Combining AI shots, VFX, sound design, color grading, and titles into a Hollywood-grade commercial reel.',
        objective: 'Edit, grade with cinematic LUTs, mix orchestral sound score, and export final 4K video.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Discuss sound design layering (risers, hits, sub-booms), color space mastering, and high-bitrate export settings.',
          demonstrate: 'Perform final audio mix and color grade on a 90-second cinematic trailer project.',
          practicalTask: 'Produce, render, and export your complete 90-second Cinematic AI Video Commercial.',
          expectedOutput: 'A 90-second high-resolution Cinematic Commercial Trailer video.'
        }
      }
    ]
  },
  {
    id: 'pg2-mod-4',
    number: 4,
    title: 'Strategic Digital Marketing, E-Commerce & Sales Funnels',
    purpose: 'Master digital marketing campaigns, Search Engine Optimization (SEO), Meta Ads (Facebook/Instagram), Google Ads, and Amazon/Shopify E-Commerce store setup.',
    color: '#059669',
    icon: 'fas fa-bullhorn',
    realProject: {
      title: 'Complete Digital Marketing Campaign & E-Commerce Funnel',
      description: 'Launch an end-to-end digital marketing strategy including SEO keyword research, high-converting Meta ad graphics, and an E-Commerce store strategy.'
    },
    classes: [
      {
        id: 'pg2-c16',
        classNum: 16,
        topic: 'Search Engine Optimization (SEO) & High-Intent Keyword Strategy',
        simpleConcept: 'Ranking websites higher on Google search results to get free organic customer traffic.',
        objective: 'Master On-Page SEO, Meta Titles, Alt Text, Keyword Research (Ahrefs/SEMrush concepts), and Technical SEO.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain search intent (informational vs transactional), title tag optimization, schema markup, and backlink strategies.',
          demonstrate: 'Perform an SEO audit on a live website and optimize heading tags, meta descriptions, and keywords.',
          practicalTask: 'Conduct keyword research for a business niche and optimize a web page for search engines.',
          expectedOutput: 'An SEO audit report and fully keyword-optimized content page.'
        }
      },
      {
        id: 'pg2-c17',
        classNum: 17,
        topic: 'Meta Ads Manager (Facebook & Instagram Paid Advertising)',
        simpleConcept: 'Running targeted paid ad campaigns on Instagram and Facebook to drive leads and sales.',
        objective: 'Master Meta Business Suite, Campaign Objectives (Leads/Sales), Audience Targeting, and Pixel Tracking.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain ad account structure (Campaign -> Ad Set -> Ad), lookalike audiences, ROAS (Return on Ad Spend), and retargeting.',
          demonstrate: 'Set up a targeted Lead Generation ad campaign in Meta Ads Manager live on screen.',
          practicalTask: 'Design 2 high-converting ad creatives and configure a complete Meta Ad campaign strategy.',
          expectedOutput: 'Configured Meta Ads campaign mockup with target audience and ad creatives.'
        }
      },
      {
        id: 'pg2-c18',
        classNum: 18,
        topic: 'Google PPC Search Ads & High-Converting Landing Page Design',
        simpleConcept: 'Capturing active buyers searching on Google and directing them to a high-converting sales landing page.',
        objective: 'Create Google Search campaigns, ad copy extensions, and design high-converting sales landing pages.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Pay-Per-Click (PPC) bidding, Quality Score, negative keywords, and landing page Call-to-Action (CTA) placement.',
          demonstrate: 'Build a Google Search ad with sitelink extensions and design a matching landing page wireframe.',
          practicalTask: 'Write 3 Google search ad variations and structure a conversion-focused sales landing page.',
          expectedOutput: 'Google PPC campaign setup with copy variations and landing page layout.'
        }
      },
      {
        id: 'pg2-c19',
        classNum: 19,
        topic: 'E-Commerce Platform Setup (Amazon Seller Central & Shopify)',
        simpleConcept: 'Setting up an online store to list products, manage inventory, and process customer payments.',
        objective: 'Understand Amazon product listing optimization, A+ content, Shopify store architecture, and payment gateways.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Cover Amazon product SEO keywords, bullet point structure, Shopify themes, payment gateways (Stripe/PayPal), and shipping.',
          demonstrate: 'Build a mockup Shopify store product page with high-res imagery, reviews, and checkout buttons.',
          practicalTask: 'Create an optimized E-Commerce product listing with images, bullet features, and SEO description.',
          expectedOutput: 'An optimized E-Commerce product store page setup.'
        }
      },
      {
        id: 'pg2-c20',
        classNum: 20,
        topic: 'Social Media Content Strategy, Analytics & Funnel Automation',
        simpleConcept: 'Creating content calendars, tracking conversion analytics, and nurturing leads automatically.',
        objective: 'Utilize Google Analytics 4 (GA4), content scheduling tools, and automated email marketing funnels.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain sales funnel stages (Awareness -> Interest -> Decision -> Action), GA4 conversion tracking, and email automation.',
          demonstrate: 'Set up a 3-email automated sequence in Mailchimp/Klaviyo triggered by form submission.',
          practicalTask: 'Design a 30-day social media content calendar and map out an automated sales funnel.',
          expectedOutput: 'A 30-day marketing content calendar and visual sales funnel map.'
        }
      }
    ]
  },
  {
    id: 'pg2-mod-5',
    number: 5,
    title: 'Postgraduate Career Launch, Global Freelancing & Capstone',
    purpose: 'Launch your professional career with global freelancing profiles (Upwork/Fiverr), high-converting client proposals, an ATS-optimized master resume, and final portfolio presentation.',
    color: '#2563EB',
    icon: 'fas fa-user-graduate',
    realProject: {
      title: 'Live Global Freelance Profile, ATS Resume & Capstone Hub',
      description: 'Publish a high-ranking Upwork/Fiverr freelance profile, ATS-optimized master resume, and present your final Postgraduate Capstone Portfolio.'
    },
    classes: [
      {
        id: 'pg2-c21',
        classNum: 21,
        topic: 'Global Freelancing Mastery (Upwork & Fiverr Profile Optimization)',
        simpleConcept: 'Setting up high-paying freelance accounts to land international clients for digital services.',
        objective: 'Build top-rated Upwork and Fiverr profiles with specialized titles, overview copy, and portfolio tags.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain profile keyword SEO, pricing strategy (hourly vs fixed-price), client trust badges, and niche specialization.',
          demonstrate: 'Build a top 1% Upwork specialized profile overview targeting high-ticket international clients.',
          practicalTask: 'Create and refine your professional freelance profile overview, title, and skill tags.',
          expectedOutput: 'A fully formatted professional freelance profile draft ready for publication.'
        }
      },
      {
        id: 'pg2-c22',
        classNum: 22,
        topic: 'Winning Client Proposals, Pitching & Contract Negotiations',
        simpleConcept: 'Writing custom proposals that win clients and negotiating fair pricing for digital projects.',
        objective: 'Master the 4-part proposal formula, video cover letters (Loom), scope management, and pricing negotiation.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Teach proposal hook, problem diagnosis, solution outline, call to action, and handling price objections.',
          demonstrate: 'Write a winning proposal response to a sample client job posting live in class.',
          practicalTask: 'Write 2 winning proposal templates responding to realistic client job briefs.',
          expectedOutput: 'Custom proposal templates ready to send to prospective clients.'
        }
      },
      {
        id: 'pg2-c23',
        classNum: 23,
        topic: 'ATS-Optimized Master Resume & LinkedIn Executive Branding',
        simpleConcept: 'Crafting a resume that passes AI job screeners (ATS) and building an active LinkedIn network.',
        objective: 'Optimize resume formatting for Applicant Tracking Systems (ATS) and upgrade LinkedIn profile for recruiters.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain ATS keyword scanning, action verb bullet points, LinkedIn headline optimization, and networking outreach.',
          demonstrate: 'Audit a resume using ATS scanner software and reformat bullet points into quantified achievement statements.',
          practicalTask: 'Reformat your professional resume with ATS-friendly layout and update your LinkedIn profile headline.',
          expectedOutput: 'An ATS-tested 1-page master resume PDF and updated LinkedIn profile layout.'
        }
      },
      {
        id: 'pg2-c24',
        classNum: 24,
        topic: 'Client Project Management, Contracts & Quality Delivery',
        simpleConcept: 'Managing freelance client projects professionally, setting deadlines, and getting paid securely.',
        objective: 'Utilize project management tools (Trello/Notion), contract agreements, invoicing, and client handoffs.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain scope creep prevention, milestone payments, client feedback loops, and final asset handoffs.',
          demonstrate: 'Set up a client project board in Notion detailing deliverables, assets, and delivery deadlines.',
          practicalTask: 'Create a client project onboarding checklist and formal service contract agreement.',
          expectedOutput: 'A client onboarding document and project management template.'
        }
      },
      {
        id: 'pg2-c25',
        classNum: 25,
        topic: 'Final Postgraduate Capstone Defense & Portfolio Exhibition',
        simpleConcept: 'Presenting your complete digital skills portfolio to instructors and peers for graduation certification.',
        objective: 'Deliver a 3-minute professional capstone presentation showcasing your live web app, media assets, and AI tools.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Review final portfolio evaluation criteria: technical quality, design aesthetic, live accessibility, and presentation confidence.',
          demonstrate: 'Demonstrate a model 3-minute capstone presentation walk-through of a live web portfolio.',
          practicalTask: 'Present your final postgraduate digital portfolio live to the class.',
          expectedOutput: 'Graduation Capstone certification and complete live portfolio website.'
        }
      }
    ]
  }
];

export const PG_2_SPECIALIZATION_OPTIONS = [
  {
    id: 'pg2-spec-1',
    title: 'Custom AI Tool Building & Web Engineering',
    icon: 'fas fa-robot',
    description: 'Develop custom AI-powered web tools, domain research assistants (e.g. Islamic Studies AI tools), and full-stack React web applications.',
    keySkills: ['OpenAI/Claude API', 'React & Async JS', 'Custom AI Agents', 'Vercel Deployment'],
    portfolioDeliverable: 'Live Domain AI Research Assistant Web App & Full-Stack React Project'
  },
  {
    id: 'pg2-spec-2',
    title: 'Cinema-Style AI Video & Motion Media Production',
    icon: 'fas fa-film',
    description: 'Produce high-end cinema-style commercial videos, AI video animations, After Effects motion graphics, and color-graded trailers.',
    keySkills: ['Runway Gen-2 AI Video', 'After Effects VFX', 'Cinematic LUTs', 'Sound Scoring'],
    portfolioDeliverable: '90-Second Cinematic AI Commercial Video Trailer & VFX Reel'
  },
  {
    id: 'pg2-spec-3',
    title: 'Digital Marketing, E-Commerce & Global Freelancing',
    icon: 'fas fa-briefcase',
    description: 'Launch digital ad campaigns, SEO strategies, Amazon/Shopify product stores, and top-rated Upwork/Fiverr freelance profiles.',
    keySkills: ['SEO & Meta Paid Ads', 'E-Commerce Store Setup', 'Upwork & Proposals', 'ATS Master Resume'],
    portfolioDeliverable: 'Live Freelance Hub, Digital Marketing Campaign Strategy & E-Commerce Store'
  }
];

export const calculatePg2Metrics = (savedProgress) => {
  let totalClasses = 0;
  let completedClasses = 0;
  let inProgressClasses = 0;

  const moduleMetrics = PG_2_MODULES.map((mod) => {
    let modTotal = mod.classes.length;
    let modCompleted = 0;

    mod.classes.forEach((cls) => {
      totalClasses++;
      const status = savedProgress[cls.id]?.status || 'NOT STARTED';
      if (status === 'COMPLETED') {
        completedClasses++;
        modCompleted++;
      } else if (status === 'IN PROGRESS') {
        inProgressClasses++;
      }
    });

    const percentage = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
    return {
      moduleId: mod.id,
      title: mod.title,
      total: modTotal,
      completed: modCompleted,
      percentage
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
