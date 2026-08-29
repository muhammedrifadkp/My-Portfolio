// Degree 3rd Year Digital Skills Syllabus Data Structure
// Framework: LEARN -> DEMONSTRATE -> PRACTICE -> CREATE -> COMPLETE

export const DEGREE_3_MODULES = [
  {
    id: 'deg3-mod-1',
    number: 1,
    title: 'Advanced AI Engineering, Prompting & AI Agents',
    purpose: 'Master Claude 3.5 Sonnet, ChatGPT 4o, Custom GPT builder, AI Agent automations (n8n/Make), and AI-driven workflow optimization.',
    icon: 'fas fa-brain',
    color: '#8B5CF6',
    realProject: {
      title: 'Autonomous AI Agent Workflow System',
      description: 'Students build a custom AI Agent or automated n8n/Make pipeline that monitors inputs, processes content using AI models, and posts formatted reports.'
    },
    classes: [
      {
        id: 'deg3-cls-1',
        classNum: 1,
        topic: 'Advanced Prompt Engineering & Chain-of-Thought Reasoning',
        simpleConcept: 'Mastering Chain-of-Thought (CoT), Tree-of-Thought, system prompt architecture, and few-shot formatting for complex reasoning.',
        objective: 'Architect bulletproof system prompts for deterministic AI responses.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain system prompt framing, JSON output enforcement, Few-Shot examples, and Chain-of-Thought reasoning steps.',
          demonstrate: 'Build a system prompt forcing AI to act as a strict code auditor and output findings strictly in JSON.',
          practice: 'Architect a system prompt that parses unstructured text and outputs clean JSON schema.',
          realWorldExample: 'Enterprise customer support routing engines and automated financial document extraction.',
          practicalTask: 'Write a complex system prompt enforcing JSON schema output for student report evaluation.',
          expectedOutput: 'Deterministic AI prompt returning clean JSON output.'
        }
      },
      {
        id: 'deg3-cls-2',
        classNum: 2,
        topic: 'Building Custom GPTs & Knowledge Base Assistants',
        simpleConcept: 'Creating specialized Custom GPTs / Claude Projects with custom instructions, uploaded documentation, and actions.',
        objective: 'Build a domain-specific custom AI assistant with custom uploaded knowledge bases.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain RAG (Retrieval-Augmented Generation), vector databases, context injection, and GPT Action triggers.',
          demonstrate: 'Build a "College Academic Advisor GPT" trained on university course syllabus PDFs.',
          practice: 'Create a custom GPT assistant trained on a specific company policy document or software manual.',
          realWorldExample: 'Internal company knowledge base bots answering HR and technical questions instantly.',
          practicalTask: 'Build a custom AI assistant trained on a multi-page reference PDF file.',
          expectedOutput: 'Functional custom AI assistant answering questions based on uploaded documents.'
        }
      },
      {
        id: 'deg3-cls-3',
        classNum: 3,
        topic: 'AI Agents & Autonomous Workflow Automations',
        simpleConcept: 'Understanding AI Agents (Goal -> Plan -> Action -> Tool Use) and no-code automation platforms (Make.com / n8n).',
        objective: 'Connect AI APIs with web webhooks and automated workflow triggers.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Explain agentic loops, tool calling, API webhooks, trigger events, and automated multi-step workflows.',
          demonstrate: 'Build a Make.com scenario: New Gmail received -> AI summarizes message -> sends Slack notification.',
          practice: 'Build a 3-step automation: Google Form response -> AI formats response -> auto-generates email reply.',
          realWorldExample: 'Automated lead processing in sales operations and social media auto-posting pipelines.',
          practicalTask: 'Create an automated workflow triggering AI document processing on form submission.',
          expectedOutput: 'Working no-code AI automation workflow.'
        }
      },
      {
        id: 'deg3-cls-4',
        classNum: 4,
        topic: 'AI Content Pipelines (Scripts, Images & Voiceover)',
        simpleConcept: 'Combining Claude + Midjourney/Leonardo + ElevenLabs + AI Video generators for end-to-end media automation.',
        objective: 'Build a multi-tool AI pipeline for automated video, podcast, or report production.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain media pipeline automation: script generation -> voice synthesis -> visual generation -> auto assembly.',
          demonstrate: 'Generate a 1-minute educational video using 4 interconnected AI tools.',
          practice: 'Execute an AI workflow to produce a fully narrated visual story video from a single prompt.',
          realWorldExample: 'Automated video publishing for news outlets and educational content creators.',
          practicalTask: 'Produce a complete narrated media asset using a 4-stage AI tool pipeline.',
          expectedOutput: 'Complete AI-generated audio-visual project asset.'
        }
      },
      {
        id: 'deg3-cls-5',
        classNum: 5,
        topic: 'AI Ethics, Bias Auditing & Enterprise Compliance',
        simpleConcept: 'Auditing AI output for bias, hallucination risks, copyright liabilities, data privacy (GDPR), and enterprise deployment policies.',
        objective: 'Conduct risk assessments for deploying AI systems in production corporate environments.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Explain training data bias, privacy protection, intellectual property laws, and human-in-the-loop validation.',
          demonstrate: 'Audit an AI model response for hallucinated facts and privacy leaks.',
          practice: 'Draft an AI Usage Policy document for an enterprise business or educational institution.',
          realWorldExample: 'Corporate IT governance for AI deployment in healthcare and banking.',
          practicalTask: 'Write a comprehensive AI Ethics & Compliance audit report for a proposed AI deployment.',
          expectedOutput: 'Structured AI compliance policy document.'
        }
      }
    ]
  },
  {
    id: 'deg3-mod-2',
    number: 2,
    title: 'Master Data Analytics & Advanced MS Excel',
    purpose: 'Master lookup functions (XLOOKUP, VLOOKUP), Pivot Tables, Slicers, advanced conditional formulas, and executive dashboards.',
    icon: 'fas fa-chart-line',
    color: '#10B981',
    realProject: {
      title: 'Executive Data Analytics & Interactive Dashboard',
      description: 'Clean a raw multi-thousand row dataset, write lookup formulas, build Pivot Tables with interactive Slicers, and export an executive dashboard.'
    },
    classes: [
      {
        id: 'deg3-cls-6',
        classNum: 6,
        topic: 'Advanced Lookup Formulas (XLOOKUP, INDEX-MATCH & VLOOKUP)',
        simpleConcept: 'Mastering XLOOKUP for multi-column lookups, wildcard searching, and replacing legacy VLOOKUP/INDEX-MATCH.',
        objective: 'Perform complex data merging across multiple worksheets using XLOOKUP and dynamic arrays.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain lookup array vs return array, handling `#N/A` errors (`if_not_found`), and two-way lookups.',
          demonstrate: 'Merge customer names and order history from 2 separate sheets into 1 master dataset using XLOOKUP.',
          practice: 'Use XLOOKUP to match product IDs with pricing data across multi-tab workbook.',
          realWorldExample: 'Merging customer CRM data with transactional accounting tables.',
          practicalTask: 'Combine 2 raw data tables into a master report using XLOOKUP and error handling.',
          expectedOutput: 'Accurate combined data sheet with zero lookup errors.'
        }
      },
      {
        id: 'deg3-cls-7',
        classNum: 7,
        topic: 'Nested Logic Formulas (`SUMIFS`, `COUNTIFS`, `AVERAGEIFS`, `IF/AND/OR`)',
        simpleConcept: 'Multi-criteria conditional mathematical calculations and logical evaluation formulas.',
        objective: 'Extract targeted aggregate business metrics based on multiple filtering conditions.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain syntax of `SUMIFS(sum_range, criteria_range1, criteria1, ...)`, date ranges, and boolean logic.',
          demonstrate: 'Calculate total revenue for "South Region" in "Q3" for "Product A" using `SUMIFS`.',
          practice: 'Write formulas to count transactions exceeding $500 made by active subscribers.',
          realWorldExample: 'Financial reporting, sales target metrics, and inventory audits.',
          practicalTask: 'Build a summary table with `SUMIFS` and `COUNTIFS` formulas evaluating 3 simultaneous criteria.',
          expectedOutput: 'Dynamic summary table automatically updating with criteria changes.'
        }
      },
      {
        id: 'deg3-cls-8',
        classNum: 8,
        topic: 'Pivot Tables, Calculated Fields & Interactive Slicers',
        simpleConcept: 'Summarizing massive datasets into Pivot Tables, grouping dates, adding calculated fields, and interactive Slicer buttons.',
        objective: 'Build interactive Pivot Tables with dynamic time grouping and visual slicer filters.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Values vs Rows vs Columns vs Filters, percentage of grand total display, and Timeline slicers.',
          demonstrate: 'Create a Pivot Table summarizing sales by Category and Quarter; add region Slicers.',
          practice: 'Build a Pivot Table from 500 sales rows and add Slicer buttons for Category and City.',
          realWorldExample: 'Executive sales summaries and quarterly financial performance tracking.',
          practicalTask: 'Construct a Pivot Table with interactive Category and Date Slicers.',
          expectedOutput: 'Interactive Pivot Table filtering data on Slicer clicks.'
        }
      },
      {
        id: 'deg3-cls-9',
        classNum: 9,
        topic: 'Data Cleaning, Validation Rules & Conditional Formatting',
        simpleConcept: 'Removing duplicates, text-to-columns, data validation dropdown lists, and dynamic color heatmap formatting.',
        objective: 'Clean dirty raw data and enforce data entry validation rules with visual heatmaps.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain `TRIM()`, `PROPER()`, duplicate removal, custom validation lists, and formula-based conditional rules.',
          demonstrate: 'Clean a messy contact list (extra spaces, inconsistent capitalization) and highlight top 10% values in green.',
          practice: 'Clean a raw data dump and create a dropdown validation menu for status selection.',
          realWorldExample: 'Preparing clean data pipelines for corporate business intelligence tools.',
          practicalTask: 'Clean a raw dataset, apply validation dropdowns, and highlight key metrics with conditional formatting.',
          expectedOutput: 'Clean dataset with dropdown inputs and visual highlight rules.'
        }
      },
      {
        id: 'deg3-cls-10',
        classNum: 10,
        topic: 'Building Executive Analytics Dashboards & Chart Combo Cards',
        simpleConcept: 'Combining KPI summary cards, combo charts (bar + line), Pivot charts, and Slicers into an executive dashboard.',
        objective: 'Design a clean, C-suite executive dashboard layout in Excel.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain gridlines removal, KPI card layout, chart color harmony, and lock protection.',
          demonstrate: 'Assemble a single-screen executive dashboard featuring 4 KPI cards and 2 connected Pivot charts.',
          practice: 'Build a sales executive dashboard layout connected to a master data sheet.',
          realWorldExample: 'C-suite executive business performance reviews and monthly board meetings.',
          practicalTask: 'Create an executive Excel Analytics Dashboard with KPI cards, charts, and Slicers.',
          expectedOutput: 'Polished executive Excel dashboard workbook.'
        }
      }
    ]
  },
  {
    id: 'deg3-mod-3',
    number: 3,
    title: 'Full-Stack Web Engineering & Cybersecurity',
    purpose: 'Understand web security principles (OWASP Top 10), ethical hacking fundamentals, HTTPS, JWT authentication, and full-stack app deployment.',
    icon: 'fas fa-shield-alt',
    color: '#00F0FF',
    realProject: {
      title: 'Secure Full-Stack Web App & Security Audit',
      description: 'Build a web application with secure user authentication (JWT/OAuth) and write a security audit report evaluating OWASP vulnerabilities.'
    },
    classes: [
      {
        id: 'deg3-cls-11',
        classNum: 11,
        topic: 'Web Security Fundamentals & OWASP Top 10',
        simpleConcept: 'Understanding common web vulnerabilities: SQL Injection, Cross-Site Scripting (XSS), CSRF, and broken authentication.',
        objective: 'Identify web security vulnerabilities and understand mitigation strategies.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Explain OWASP Top 10 risks, SQL parameterization, input sanitization, and Content Security Policy (CSP).',
          demonstrate: 'Demonstrate SQL injection vulnerability in a vulnerable test lab app and show parameterization fix.',
          practice: 'Audit a sample codebase for unescaped user inputs causing XSS vulnerabilities.',
          realWorldExample: 'Securing online banking applications and e-commerce payment gateways.',
          practicalTask: 'Perform a security audit on sample code snippets and document identified vulnerabilities and fixes.',
          expectedOutput: 'Security assessment audit report highlighting code vulnerabilities.'
        }
      },
      {
        id: 'deg3-cls-12',
        classNum: 12,
        topic: 'Ethical Hacking & Penetration Testing Tools Intro',
        simpleConcept: 'Understanding ethical hacking methodology (Reconnaissance -> Scanning -> Exploitation) and tools like Wireshark, Nmap, and Burp Suite.',
        objective: 'Understand network scanning basics and HTTP packet inspection using ethical hacking tools.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Explain legal authorization, white-hat vs black-hat, port scanning, and intercepting HTTP traffic in Burp Suite.',
          demonstrate: 'Scan local network ports using Nmap in a sandbox and inspect HTTP GET/POST headers in Burp Suite.',
          practice: 'Capture and inspect network request headers using browser developer tools and Wireshark capture.',
          realWorldExample: 'Cybersecurity vulnerability assessments and bug bounty programs.',
          practicalTask: 'Inspect network traffic headers of a web application and document request parameters.',
          expectedOutput: 'Network request inspection log and security header summary.'
        }
      },
      {
        id: 'deg3-cls-13',
        classNum: 13,
        topic: 'Authentication & Authorization (JWT & Password Hashing)',
        simpleConcept: 'Password hashing with bcrypt, JSON Web Tokens (JWT) for session authentication, and protected API routes.',
        objective: 'Implement secure user authentication with password hashing and JWT token handling.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain plaintext password dangers, salt + bcrypt hashing, JWT payload structure, and Authorization headers.',
          demonstrate: 'Hash a user password with bcrypt, issue a signed JWT token on login, and verify token on protected route.',
          practice: 'Build a login API handler that validates credentials and returns a signed JWT token.',
          realWorldExample: 'User login systems on Google, modern web apps, and mobile APIs.',
          practicalTask: 'Create a password hashing and JWT token generation code routine.',
          expectedOutput: 'Functional authentication script issuing and validating JWT tokens.'
        }
      },
      {
        id: 'deg3-cls-14',
        classNum: 14,
        topic: 'Database Management Basics (SQL & MongoDB)',
        simpleConcept: 'Relational databases (SQL queries: `SELECT`, `INSERT`, `UPDATE`) vs NoSQL document databases (MongoDB collections).',
        objective: 'Write database queries to create, read, update, and delete (CRUD) records.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain tables/rows (SQL) vs collections/documents (MongoDB), primary keys, foreign keys, and indexes.',
          demonstrate: 'Execute SQL queries to create a `users` table, insert 3 records, and run filtered `WHERE` queries.',
          practice: 'Write CRUD database operations for an e-commerce product inventory database.',
          realWorldExample: 'Backend data storage powering web applications and mobile apps.',
          practicalTask: 'Write a set of SQL/NoSQL queries executing full CRUD operations on a database dataset.',
          expectedOutput: 'Verified database query script returning expected dataset records.'
        }
      },
      {
        id: 'deg3-cls-15',
        classNum: 15,
        topic: 'Full-Stack Application Deployment & Environment Safety',
        simpleConcept: 'Connecting frontend to backend API, managing production environment variables, and automated HTTPS SSL certificates.',
        objective: 'Deploy a full-stack web application securely to cloud hosting servers.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain CORS (Cross-Origin Resource Sharing), SSL/TLS certificates, process managers (PM2), and cloud hosting (Render/Vercel).',
          demonstrate: 'Deploy a full-stack node/web app, configure CORS headers, set production environment variables, and verify HTTPS.',
          practice: 'Deploy your full-stack web project with working API endpoints and secure environment keys.',
          realWorldExample: 'Production release pipeline for modern cloud software applications.',
          practicalTask: 'Publish a full-stack web application live online with HTTPS encryption enabled.',
          expectedOutput: 'Live secure web application URL.'
        }
      }
    ]
  },
  {
    id: 'deg3-mod-4',
    number: 4,
    title: 'Enterprise Media Suite & Brand Design',
    purpose: 'Master high-end Photoshop manipulation, advanced Illustrator vector branding, promo video mastering, and corporate creative direction.',
    icon: 'fas fa-layer-group',
    color: '#3B82F6',
    realProject: {
      title: 'Enterprise Brand Campaign Master Deck',
      description: 'Create a high-end composite Photoshop visual, vector logo suite, 30-second promo video, and campaign launch presentation.'
    },
    classes: [
      {
        id: 'deg3-cls-16',
        classNum: 16,
        topic: 'Photoshop Masterclass: Advanced Compositing & Lighting',
        simpleConcept: 'Blending multiple images seamlessly using layer masks, atmospheric depth, matched light sources, and dodge/burn.',
        objective: 'Construct complex surreal or photorealistic multi-image composited artwork.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain light source direction, rim light highlights, shadows, color matching adjustment layers, and camera depth of field.',
          demonstrate: 'Blend 4 distinct photos (landscape + model + sky + particles) into a single cohesive cinematic key art photo.',
          practice: 'Composite a product into a futuristic dynamic background with matching shadows and highlights.',
          realWorldExample: 'Hollywood movie posters, AAA video game covers, and luxury ad campaigns.',
          practicalTask: 'Create a 4-layer photorealistic composite visual image in Photoshop.',
          expectedOutput: 'High-end composited image asset saved as PSD and 4K PNG.'
        }
      },
      {
        id: 'deg3-cls-17',
        classNum: 17,
        topic: 'Illustrator Vector Masterclass: Isometric & 3D Artwork',
        simpleConcept: 'Using Illustrator 3D and Materials tools, isometric design grids, and complex vector illustrations.',
        objective: 'Design isometric 3D vector graphics and complex vector illustrations.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain 30-degree isometric grid angles, 3D Extrude & Bevel, vector lighting, and ambient occlusion.',
          demonstrate: 'Build an isometric vector workstation or city building graphic using Illustrator 3D tools.',
          practice: 'Create a 3D isometric vector icon set for a modern technology website.',
          realWorldExample: 'SaaS website illustrations, tech conference graphics, and modern UI vector art.',
          practicalTask: 'Design an isometric 3D vector graphic illustration in Illustrator.',
          expectedOutput: 'Scalable 3D isometric vector artwork file.'
        }
      },
      {
        id: 'deg3-cls-18',
        classNum: 18,
        topic: 'High-End Video Editing, Motion Tracking & Color Match',
        simpleConcept: 'Motion tracking camera movement in After Effects/Premiere, screen replacement, and shot-to-shot color matching.',
        objective: 'Apply motion tracking to pin graphics onto moving video elements and color match multi-camera shots.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain 2D vs 3D camera tracking, Mocha AE tracking, Lumetri Color Match, and vector scope skin tone lines.',
          demonstrate: 'Track a moving smartphone screen and replace screen content with custom video overlay.',
          practice: 'Track a text graphic onto a moving vehicle or person in a video clip.',
          realWorldExample: 'Commercial VFX, screen replacements in movies, and high-end brand promos.',
          practicalTask: 'Complete a video tracking edit pinning graphics onto moving video footage.',
          expectedOutput: 'Rendered video sequence with accurate motion tracking.'
        }
      },
      {
        id: 'deg3-cls-19',
        classNum: 19,
        topic: 'PowerPoint & Keynote Executive Presentation Design',
        simpleConcept: 'Designing high-impact slide decks: visual storytelling, slide master layouts, custom data charts, and smooth morph transitions.',
        objective: 'Design an executive pitch deck applying modern presentation design principles.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain 1-idea-per-slide rule, visual contrast, custom slide masters, vector icon usage, and Morph transition.',
          demonstrate: 'Redesign a cluttered text slide into a sleek, visual 3-column executive deck slide.',
          practice: 'Design a 5-slide startup pitch deck with title slide, problem, solution, data chart, and contact slide.',
          realWorldExample: 'Venture capital pitch decks, corporate keynote presentations, and client proposals.',
          practicalTask: 'Design a 6-slide executive presentation deck with custom graphics and Morph transitions.',
          expectedOutput: 'Polished executive presentation slide deck (PPTX/PDF).'
        }
      },
      {
        id: 'deg3-cls-20',
        classNum: 20,
        topic: 'Creative Direction & Portfolio Review',
        simpleConcept: 'Developing a unique artistic voice, organizing a creative portfolio, writing case studies, and presenting work to clients.',
        objective: 'Compile creative design projects into a unified professional portfolio showcase.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain portfolio structure (Problem -> Solution -> Process -> Final Result), Behance/Dribbble presentation.',
          demonstrate: 'Review a Behance case study presentation: break down project process, sketches, and final renders.',
          practice: 'Draft a written case study breakdown for your best creative project.',
          realWorldExample: 'Creative director hiring portfolios and agency pitch decks.',
          practicalTask: 'Publish a comprehensive creative project case study deck on Behance/Portfolio.',
          expectedOutput: 'Complete professional creative portfolio project showcase.'
        }
      }
    ]
  },
  {
    id: 'deg3-mod-5',
    number: 5,
    title: 'Digital Career Mastery, E-Commerce & Freelancing',
    purpose: 'Master Amazon Seller / E-Commerce basics, Upwork & Fiverr freelancing profile setup, speed touch typing, and job interview preparation.',
    icon: 'fas fa-briefcase',
    color: '#F59E0B',
    realProject: {
      title: 'Digital Career Launch Kit',
      description: 'Set up a professional freelance profile (Upwork/Fiverr), list a sample Amazon product, polish LinkedIn resume, and pass typing certification.'
    },
    classes: [
      {
        id: 'deg3-cls-21',
        classNum: 21,
        topic: 'Amazon Seller & E-Commerce Operations Overview',
        simpleConcept: 'Understanding Amazon FBA vs FBM, product listing creation, keyword optimization, pricing strategies, and order fulfillment.',
        objective: 'Understand Amazon seller central workflow and create an optimized e-commerce product listing.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Explain ASIN numbers, bullet point keyword placement, A+ content, Amazon FBA fee structures, and reviews.',
          demonstrate: 'Walk through Amazon product listing creation: title optimization, key feature bullet points, and product images.',
          practice: 'Write an optimized product title, 5 bullet points, and description for an e-commerce product.',
          realWorldExample: 'Managing online stores on Amazon, Flipkart, Shopify, and global market hubs.',
          practicalTask: 'Draft a complete optimized Amazon product listing spec sheet.',
          expectedOutput: 'High-converting Amazon e-commerce product listing draft.'
        }
      },
      {
        id: 'deg3-cls-22',
        classNum: 22,
        topic: 'Freelancing Mastery (Upwork, Fiverr & Direct Client Outreach)',
        simpleConcept: 'Creating high-converting freelance profiles, writing winning client proposals, pricing services, and client communication.',
        objective: 'Set up professional freelance profiles and write winning proposal pitches.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Explain profile optimization, portfolio attachment, proposal hook framing, hourly vs fixed rates, and client reviews.',
          demonstrate: 'Review winning Upwork proposal template: greeting -> proof of understanding -> past work link -> CTA question.',
          practice: 'Write 2 custom proposal responses for sample freelance job postings in video editing or web dev.',
          realWorldExample: 'Building a independent remote freelancing career earning global currency income.',
          practicalTask: 'Create an optimized Upwork/Fiverr profile draft and write 2 winning job proposals.',
          expectedOutput: 'Verified freelance profile setup and winning proposal templates.'
        }
      },
      {
        id: 'deg3-cls-23',
        classNum: 23,
        topic: 'Speed Touch Typing & Fast Workplace Productivity',
        simpleConcept: 'Advanced speed typing drills in English (target 40+ WPM) and keyboard shortcut mastery for ultimate workplace speed.',
        objective: 'Achieve 40+ WPM typing speed with 95%+ accuracy and master workplace keyboard efficiency.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '45 min',
          explain: 'Explain typing ergonomics, speed milestones, advanced punctuation typing, and OS/app global shortcuts.',
          demonstrate: 'Conduct live speed typing demonstration on Monkeytype / Keybr aiming for 50+ WPM.',
          practice: 'Perform 30 minutes of intensive speed typing exercises focusing on error reduction.',
          realWorldExample: 'High-speed administrative roles, live chat support, coding, and rapid content creation.',
          practicalTask: 'Complete a 5-minute typing speed test achieving >35 WPM with 95% accuracy.',
          expectedOutput: 'Verified typing speed certificate or test score screenshot.'
        }
      },
      {
        id: 'deg3-cls-24',
        classNum: 24,
        topic: 'LinkedIn Profile Optimization & Personal Branding',
        simpleConcept: 'Optimizing LinkedIn headline, About section, featured projects, networking outreach messages, and content posting strategy.',
        objective: 'Transform your LinkedIn profile into a recruiter-magnet personal brand portfolio.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain LinkedIn search algorithm, keyword-rich headline, banner image design, and networking outreach messages.',
          demonstrate: 'Audit a LinkedIn profile: update headline to "Digital Developer & Media Strategist", add featured links.',
          practice: 'Write a compelling 200-word LinkedIn About summary highlighting skills and project achievements.',
          realWorldExample: 'Attracting direct job interview invitations from recruiters and agency founders.',
          practicalTask: 'Update your LinkedIn profile with professional banner, headline, summary, and project links.',
          expectedOutput: 'Fully optimized, recruiter-ready LinkedIn profile.'
        }
      },
      {
        id: 'deg3-cls-25',
        classNum: 25,
        topic: 'Digital Resume, Interview Prep & Capstone Graduation',
        simpleConcept: 'Designing an ATS-friendly resume, mock interview practice for tech/media roles, and final capstone project presentation.',
        objective: 'Prepare an ATS-compliant PDF resume and present final capstone graduation project.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Explain ATS (Applicant Tracking System) parsing, action-verb bullet points, STAR interview method, and final evaluation.',
          demonstrate: 'Review an ATS-formatted single-page resume and conduct a mock interview question session.',
          practice: 'Build your 1-page ATS resume in Canva/Word and present your capstone project deck to the class.',
          realWorldExample: 'Securing high-paying entry-level software engineering, design, and marketing career positions.',
          practicalTask: 'Submit 1-page ATS resume and present your final digital skills capstone project.',
          expectedOutput: 'Completed ATS Resume PDF and successful Capstone Project presentation.'
        }
      }
    ]
  }
];

export const DEGREE_3_SPECIALIZATION_OPTIONS = [
  {
    id: 'track-ai-automation',
    title: 'Advanced AI Engineering & Agent Automation',
    icon: 'fas fa-brain',
    description: 'Focus on Claude 3.5 prompt engineering, Custom GPT creation, n8n/Make AI Agent workflows, and compliance auditing.',
    keySkills: ['Chain-of-Thought Prompting', 'Custom GPT / RAG Creation', 'No-Code AI Automation (n8n/Make)', 'AI Ethics & Compliance Auditing'],
    portfolioDeliverable: 'An autonomous AI Agent workflow system and custom knowledge-trained AI assistant.'
  },
  {
    id: 'track-data-analytics',
    title: 'Enterprise Data Analytics & Excel Dashboarding',
    icon: 'fas fa-chart-line',
    description: 'Focus on XLOOKUP formulas, multi-criteria logic, Pivot Tables with interactive Slicers, and C-suite executive dashboards.',
    keySkills: ['Advanced XLOOKUP & Formulas', 'Pivot Tables & Dynamic Slicers', 'Data Cleaning & Validation Rules', 'Executive Analytics Dashboard Design'],
    portfolioDeliverable: 'A complete multi-tab Executive Excel Analytics Dashboard workbook.'
  },
  {
    id: 'track-career-freelance',
    title: 'Full-Stack Cybersecurity & Freelance Career Mastery',
    icon: 'fas fa-briefcase',
    description: 'Focus on OWASP web security, Amazon seller basics, Upwork/Fiverr freelance setup, speed touch typing, and LinkedIn branding.',
    keySkills: ['OWASP Web Security & JWT Auth', 'Amazon E-Commerce Listing Setup', 'Upwork/Fiverr Client Proposals', 'LinkedIn Optimization & ATS Resume'],
    portfolioDeliverable: 'A verified freelance profile deck, ATS resume, and live secure full-stack web project.'
  }
];

export const calculateDegree3Metrics = (savedProgress) => {
  let totalClasses = 0;
  let completedClasses = 0;
  let inProgressClasses = 0;

  const moduleMetrics = DEGREE_3_MODULES.map((mod) => {
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
