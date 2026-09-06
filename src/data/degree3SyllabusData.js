// Degree 3rd Year Digital Skills Syllabus Data Structure
// Framework: LEARN -> DEMONSTRATE -> PRACTICE -> CREATE -> COMPLETE

export const DEGREE_3_MODULES = [
  {
    id: 'deg3-mod-1',
    number: 1,
    title: 'Modern Web Development (React & Web Apps)',
    purpose: 'Master React.js fundamentals, component-based UI, JSX syntax, props, useState/useEffect hooks, API integrations, and Vercel/Netlify deployment.',
    icon: 'fas fa-laptop-code',
    color: '#3B82F6',
    realProject: {
      title: 'Single-Page React Web Application with Live API Integration',
      description: 'Students build and deploy a multi-component React app with live data fetching, interactive search/filter, and responsive state UI.'
    },
    classes: [
      {
        id: 'deg3-cls-1',
        classNum: 1,
        topic: 'React.js Overview, JSX & Component Architecture',
        simpleConcept: 'Understanding React virtual DOM, JSX syntax rules, modular component design, and Vite React starter setups.',
        objective: 'Set up Vite React project and construct reusable UI components.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain component trees, JSX syntax vs HTML, and modular code separation.',
          demonstrate: 'Create a Vite React app (`npm create vite`), build `Header`, `Card`, and `Footer` components.',
          practice: 'Create a custom `ProductCard` React component rendering title and image.',
          realWorldExample: 'Modern web app UI architecture (Netflix, Airbnb, Spotify).',
          practicalTask: 'Build a React project with 3 custom reusable components.',
          expectedOutput: 'Working React web application running on local dev server.'
        }
      },
      {
        id: 'deg3-cls-2',
        classNum: 2,
        topic: 'React State Management (`useState`) & Event Handling',
        simpleConcept: 'Using `useState` hook to handle dynamic UI state changes, counter buttons, and form inputs.',
        objective: 'Manage reactive state updates and handle user interaction events in React.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain state immutability, re-rendering triggers, and `useState` hook syntax.',
          demonstrate: 'Build an interactive counter app and a live text input preview component using `useState`.',
          practice: 'Build a Like/Unlike button component that updates count dynamically.',
          realWorldExample: 'Like buttons, cart item counts, and interactive forms.',
          practicalTask: 'Build a React component with stateful input fields and dynamic counter.',
          expectedOutput: 'Interactive React component with working state updates.'
        }
      },
      {
        id: 'deg3-cls-3',
        classNum: 3,
        topic: 'React Effects (`useEffect`) & Live API Data Fetching',
        simpleConcept: 'Using `useEffect` for side-effects, fetching REST API data on component mount, and showing loading states.',
        objective: 'Fetch and render external API data in React components dynamically.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain dependency array `[]`, `async`/`await` inside `useEffect`, and loading spinners.',
          demonstrate: 'Fetch data from JSONPlaceholder/OpenWeather API inside `useEffect` and render dynamic cards.',
          practice: 'Fetch news articles from a free API and display them in a responsive card grid.',
          realWorldExample: 'Live dashboard data feeds and social media timelines.',
          practicalTask: 'Fetch live API data in React and display formatted items in a grid.',
          expectedOutput: 'Live API data rendering React app.'
        }
      },
      {
        id: 'deg3-cls-4',
        classNum: 4,
        topic: 'Tailwind CSS & Styling Modern React Components',
        simpleConcept: 'Using utility-first Tailwind CSS classes (`flex`, `bg-blue-500`, `rounded-xl`, `hover:scale-105`) for rapid UI styling.',
        objective: 'Style React components quickly using Tailwind CSS classes.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain utility CSS concepts, responsive prefixes (`md:`, `lg:`), and hover states.',
          demonstrate: 'Install Tailwind CSS in React project and style a landing page hero section with gradient buttons.',
          practice: 'Style 3 pricing cards using Tailwind utility classes.',
          realWorldExample: 'High-speed UI development in modern tech startups.',
          practicalTask: 'Style a complete React landing page using Tailwind CSS utility classes.',
          expectedOutput: 'Visually impressive Tailwind-styled React application.'
        }
      },
      {
        id: 'deg3-cls-5',
        classNum: 5,
        topic: 'Production Build & Vercel/Netlify Deployment',
        simpleConcept: 'Building production bundle (`npm run build`) and deploying live React website to Vercel/Netlify.',
        objective: 'Deploy production-ready React web application to live web server.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain production build minification, static assets, Vercel CLI / GitHub integration.',
          demonstrate: 'Connect GitHub repository to Vercel and deploy live React website with SSL certificate.',
          practice: 'Deploy personal React portfolio project live on Vercel.',
          realWorldExample: 'Launching commercial web products to global audiences.',
          practicalTask: 'Deploy student React application live and share accessible HTTPS link.',
          expectedOutput: 'Live production HTTPS link for React web app.'
        }
      }
    ]
  },
  {
    id: 'deg3-mod-2',
    number: 2,
    title: 'Advanced Data Analytics & Excel Power Query Dashboards',
    purpose: 'Master Power Query data transformation, INDEX/MATCH, XLOOKUP, advanced Pivot Tables, slicers, and building interactive business intelligence dashboards in MS Excel.',
    icon: 'fas fa-chart-bar',
    color: '#10B981',
    realProject: {
      title: 'Interactive Executive Business Intelligence Dashboard',
      description: 'Students clean raw sales data with Power Query, calculate KPIs, create Pivot Charts, and construct a dynamic executive dashboard.'
    },
    classes: [
      {
        id: 'deg3-cls-6',
        classNum: 6,
        topic: 'Power Query Data Cleaning & Automated ETL Workflows',
        simpleConcept: 'Importing raw CSV/Excel files into Power Query, splitting columns, removing duplicates, and unpivoting data.',
        objective: 'Automate raw data cleaning and transformation using Power Query.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain ETL (Extract, Transform, Load), data types, unpivoting, and refreshable query steps.',
          demonstrate: 'Import messy multi-branch sales data, clean missing values, split names, and load clean table into Excel.',
          practice: 'Clean a 100-row messy survey dataset using Power Query.',
          realWorldExample: 'Corporate data analyst daily data preparation workflows.',
          practicalTask: 'Clean a raw CSV dataset using Power Query and load clean table.',
          expectedOutput: 'Automated, clean data table ready for analysis.'
        }
      },
      {
        id: 'deg3-cls-7',
        classNum: 7,
        topic: 'Advanced Lookup Formulas (XLOOKUP, INDEX/MATCH & Nested IFs)',
        simpleConcept: 'Using `XLOOKUP` for flexible left/right lookups, `INDEX/MATCH` combinations, and multi-condition logical formulas.',
        objective: 'Execute complex multi-table data lookup calculations in Excel.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain XLOOKUP exact match vs wildcard, multi-criteria lookup with INDEX/MATCH, and error handling with `IFERROR`.',
          demonstrate: 'Match student IDs to exam grades and calculate bonus points based on attendance.',
          practice: 'Write XLOOKUP formula retrieving employee salary and department based on ID.',
          realWorldExample: 'Financial modeling and enterprise database lookup operations.',
          practicalTask: 'Build a multi-table lookup sheet calculating order totals with XLOOKUP and IFERROR.',
          expectedOutput: 'Accurate lookup spreadsheet without formula errors.'
        }
      },
      {
        id: 'deg3-cls-8',
        classNum: 8,
        topic: 'Advanced Pivot Tables, Calculated Fields & Data Slicers',
        simpleConcept: 'Grouping data by dates, adding Calculated Fields/Items, and linking interactive timeline slicers.',
        objective: 'Analyze large datasets dynamically using advanced Pivot Table features.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Pivot Table cache, calculated fields, percentage of total summaries, and date grouping.',
          demonstrate: 'Create a Pivot Table analyzing revenue by region and product category, add Slicer for Year.',
          practice: 'Build Pivot Table summarizing monthly sales growth per region.',
          realWorldExample: 'Sales reporting and performance tracking in corporate companies.',
          practicalTask: 'Construct a Pivot Table with slicers analyzing a 500-row sales dataset.',
          expectedOutput: 'Interactive Pivot Table with connected slicers.'
        }
      },
      {
        id: 'deg3-cls-9',
        classNum: 9,
        topic: 'Pivot Charts, KPI Cards & Dashboard Layout Design',
        simpleConcept: 'Creating dynamic Pivot Charts (Column, Line, Donut), key performance indicator (KPI) metric cards, and dashboard themes.',
        objective: 'Design visually compelling executive KPI dashboard screens.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain visual hierarchy, removing gridlines, metric card design, and color palettes for management reports.',
          demonstrate: 'Design an executive dashboard screen with 3 KPI cards (Total Revenue, Avg Order, Top Region) and 2 charts.',
          practice: 'Create 2 Pivot Charts formatted with custom colors and clean labels.',
          realWorldExample: 'Executive board meeting presentation dashboards.',
          practicalTask: 'Design a single-screen Excel KPI dashboard with slicer controls.',
          expectedOutput: 'Professional executive dashboard sheet.'
        }
      },
      {
        id: 'deg3-cls-10',
        classNum: 10,
        topic: 'Dashboard Interactivity, Protection & Executive Report Export',
        simpleConcept: 'Connecting slicers to multiple Pivot Tables simultaneously, locking sheet cells, and exporting PDF reports.',
        objective: 'Finalize interactive Excel dashboard and export for management.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Slicer Report Connections, protecting dashboard worksheets, and print/PDF setup.',
          demonstrate: 'Connect 1 Slicer to 4 Pivot Tables so clicking a button updates all charts on screen at once.',
          practice: 'Set up Slicer Report Connections across 2 charts.',
          realWorldExample: 'Self-service business intelligence dashboards for managers.',
          practicalTask: 'Export completed interactive Excel sales dashboard as executive PDF report.',
          expectedOutput: 'Fully functional interactive Excel dashboard and PDF export.'
        }
      }
    ]
  },
  {
    id: 'deg3-mod-3',
    number: 3,
    title: 'Digital Marketing, SEO & Local Business Growth',
    purpose: 'Master search engine optimization (SEO), Google My Business local listings, Facebook/Instagram ad campaign setup, Google Analytics 4, and digital marketing strategy.',
    icon: 'fas fa-bullhorn',
    color: '#F59E0B',
    realProject: {
      title: 'Comprehensive Digital Marketing & Local SEO Campaign',
      description: 'Students conduct keyword research, create a Google Business Profile setup, design ad creatives, and build a 30-day marketing plan.'
    },
    classes: [
      {
        id: 'deg3-cls-11',
        classNum: 11,
        topic: 'Search Engine Optimization (SEO) & Keyword Research',
        simpleConcept: 'Understanding search engine algorithms, keyword intent (transactional vs informational), Google Keyword Planner, and search volume.',
        objective: 'Perform keyword research and identify high-value search terms.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain organic search vs paid ads, keyword difficulty, search intent, and long-tail keywords.',
          demonstrate: 'Use Google Keyword Planner / Ubersuggest to find 10 low-competition keywords for a local bakery.',
          practice: 'Find 5 target keywords for a local IT training institute.',
          realWorldExample: 'Ranking websites on Google search results page 1.',
          practicalTask: 'Create an SEO keyword research spreadsheet with 10 targeted keywords and search metrics.',
          expectedOutput: 'Structured SEO keyword research document.'
        }
      },
      {
        id: 'deg3-cls-12',
        classNum: 12,
        topic: 'On-Page SEO & Content Optimization',
        simpleConcept: 'Optimizing page title tags, meta descriptions, H1/H2 tags, URL slugs, image ALT text, and content readability.',
        objective: 'Optimize HTML webpage elements for higher search engine ranking.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain title tag character limits (60 chars), meta description click-through rate, and image optimization.',
          demonstrate: 'Write optimized meta titles, descriptions, and heading structure for a digital marketing service page.',
          practice: 'Optimize an un-optimized HTML page with target keywords in titles, headers, and ALT tags.',
          realWorldExample: 'SEO copywriting for e-commerce and business blogs.',
          practicalTask: 'Write optimized Meta Title, Description, and H1 tags for 3 website pages.',
          expectedOutput: 'Complete On-Page SEO optimization specification sheet.'
        }
      },
      {
        id: 'deg3-cls-13',
        classNum: 13,
        topic: 'Local SEO & Google Business Profile Optimization',
        simpleConcept: 'Setting up and optimizing a Google Business Profile (Google Maps listing), local citations, customer reviews, and NAP consistency.',
        objective: 'Setup and rank local business listings on Google Maps.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Local 3-Pack ranking factors: Name-Address-Phone (NAP), business category, customer reviews, and geotagged photos.',
          demonstrate: 'Walk through Google Business Profile creation, adding services, opening hours, and response strategy for reviews.',
          practice: 'Draft a Google Business profile setup plan for a local retail shop.',
          realWorldExample: 'Driving local foot traffic and phone calls to restaurants, clinics, and shops.',
          practicalTask: 'Create a complete Google Business Profile optimization checklist for a local business.',
          expectedOutput: 'Local Business SEO optimization plan.'
        }
      },
      {
        id: 'deg3-cls-14',
        classNum: 14,
        topic: 'Meta Ads Manager (Facebook & Instagram Ad Campaigns)',
        simpleConcept: 'Understanding Meta Ads Manager structure (Campaign -> Ad Set -> Ad), audience targeting, budgeting, and ad formats.',
        objective: 'Configure Meta social media ad campaigns with target audience segmentation.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain campaign objectives (Awareness, Leads, Sales), custom audiences, pixel tracking, and daily ad budget setting.',
          demonstrate: 'Create a lead generation ad campaign setup in Meta Ads Manager demo, targeting local demographics.',
          practice: 'Define target audience parameters (age, location, interests) for a clothing brand ad.',
          realWorldExample: 'Scaling online sales and lead acquisition via Instagram & Facebook advertising.',
          practicalTask: 'Build a complete Meta Ad campaign plan with targeted audiences and budget allocation.',
          expectedOutput: 'Comprehensive Meta Ad campaign blueprint.'
        }
      },
      {
        id: 'deg3-cls-15',
        classNum: 15,
        topic: 'Google Analytics 4 (GA4) & Digital Campaign Tracking',
        simpleConcept: 'Installing GA4 tracking code, understanding users, sessions, bounce rate, event tracking, and traffic sources.',
        objective: 'Analyze digital website traffic and measure marketing campaign performance.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain acquisition channels (Organic, Direct, Paid, Referral), user engagement metrics, and conversion goals.',
          demonstrate: 'Navigate GA4 interface, view real-time traffic, analyze top pages, and set up event conversions.',
          practice: 'Interpret a sample GA4 analytics report to identify top performing traffic sources.',
          realWorldExample: 'Measuring return on investment (ROI) for digital advertising campaigns.',
          practicalTask: 'Create a digital marketing performance report analyzing web traffic metrics.',
          expectedOutput: 'Digital Marketing campaign analytics report.'
        }
      }
    ]
  },
  {
    id: 'deg3-mod-4',
    number: 4,
    title: 'Freelancing, E-Commerce & Monetization',
    purpose: 'Master international freelancing platforms (Upwork, Fiverr), profile building, proposal writing, pricing strategies, payment gateways, and launching e-commerce stores.',
    icon: 'fas fa-briefcase',
    color: '#8B5CF6',
    realProject: {
      title: 'Professional Freelance Agency Profile & Monetization Launch',
      description: 'Students build a verified freelance profile, write winning client proposals, define service packages, and launch an online storefront.'
    },
    classes: [
      {
        id: 'deg3-cls-16',
        classNum: 16,
        topic: 'Freelancing Platforms Overview (Upwork, Fiverr & LinkedIn)',
        simpleConcept: 'Understanding global freelance marketplaces, service gig packages vs hourly jobs, and platform commission structures.',
        objective: 'Select optimal freelance platforms and construct professional freelancer profiles.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Upwork Job Success Score (JSS), Fiverr Level system, profile bio optimization, and portfolio showcase.',
          demonstrate: 'Analyze top-rated freelancer profiles on Upwork/Fiverr, dissecting title, bio, video intro, and pricing tiers.',
          practice: 'Draft a professional freelancer bio highlighting digital skills (Video Editing / Web Dev / Graphics).',
          realWorldExample: 'Earning USD income through international remote freelance work.',
          practicalTask: 'Write a high-converting freelance profile bio and service catalog list.',
          expectedOutput: 'Optimized professional freelance profile document.'
        }
      },
      {
        id: 'deg3-cls-17',
        classNum: 17,
        topic: 'Winning Proposal Writing & Client Communication',
        simpleConcept: 'Writing custom proposal letters that convert job posts into paid contracts, asking discovery questions, and closing deals.',
        objective: 'Draft persuasive freelance job proposals and manage client communications.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain the 4-part proposal formula: Acknowledge Problem + Proposed Solution + Relevant Work Sample + Call to Action.',
          demonstrate: 'Review a real Upwork client job post and draft a tailored winning proposal live in class.',
          practice: 'Write a response proposal for a sample client request looking for a social media video editor.',
          realWorldExample: 'Converting client inquiries into paid freelance projects.',
          practicalTask: 'Write 2 custom proposal cover letters targeting specific sample freelance job posts.',
          expectedOutput: '2 high-converting freelance job proposals.'
        }
      },
      {
        id: 'deg3-cls-18',
        classNum: 18,
        topic: 'Service Pricing, Contracts & International Payments',
        simpleConcept: 'Setting hourly vs fixed-price rates, milestone payments, invoicing, contract scope protection, and foreign exchange payouts.',
        objective: 'Structure profitable pricing packages and secure payment methods.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain scope creep prevention, deposit upfront policies, Payoneer/PayPal/Bank transfer payouts, and tax compliance.',
          demonstrate: 'Calculate hourly billable rate (Expenses + Desired Income / Hours) and build a 3-tier pricing table (Basic, Standard, Premium).',
          practice: 'Create a 3-tier service pricing package for a digital graphic service.',
          realWorldExample: 'Managing freelance business finances and international client billing.',
          practicalTask: 'Create a 3-tier service pricing table with clear deliverables and milestones.',
          expectedOutput: 'Structured 3-tier freelance service pricing catalog.'
        }
      },
      {
        id: 'deg3-cls-19',
        classNum: 19,
        topic: 'E-Commerce Storefront Setup (Shopify & WooCommerce Basics)',
        simpleConcept: 'Setting up an online store, adding products, setting up categories, shopping cart, and local payment gateway integration.',
        objective: 'Build and configure a functional e-commerce online store.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain e-commerce architecture, product photos/descriptions, checkout process, and shipping settings.',
          demonstrate: 'Build a demo online store on Shopify/WooCommerce, upload 2 products, and test checkout workflow.',
          practice: 'Upload 1 digital/physical product with title, description, price, and image to store.',
          realWorldExample: 'Launching online brands, apparel stores, and digital product shops.',
          practicalTask: 'Configure a functional demo e-commerce store with 3 products.',
          expectedOutput: 'Working e-commerce storefront demo.'
        }
      },
      {
        id: 'deg3-cls-20',
        classNum: 20,
        topic: 'Digital Product Monetization & Content Business Models',
        simpleConcept: 'Monetizing digital products (templates, ebooks, stock assets), digital courses, affiliate marketing, and subscription models.',
        objective: 'Design passive income digital product monetization strategies.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain digital product creation (Canva templates, Notion setups, Lightroom presets), Gumroad sales, and affiliate links.',
          demonstrate: 'Set up a digital product listing on Gumroad/Etsy selling a social media template pack.',
          practice: 'Create a concept for 1 digital product you can create and sell online.',
          realWorldExample: 'Generating recurring passive income from reusable digital assets.',
          practicalTask: 'Create a digital product monetization plan with product mockups and pricing.',
          expectedOutput: 'Digital product monetization blueprint.'
        }
      }
    ]
  },
  {
    id: 'deg3-mod-5',
    number: 5,
    title: 'Career Mastery, Portfolio & Industry Capstone Project',
    purpose: 'Build an industry-grade master digital portfolio, optimize LinkedIn professional profile, prepare for tech job interviews, and execute the final degree capstone project.',
    icon: 'fas fa-award',
    color: '#EC4899',
    realProject: {
      title: 'Final Degree Industry Master Capstone Project & Defense',
      description: 'Students deliver a master capstone portfolio featuring web apps, video reels, graphic brand kits, and analytics dashboards.'
    },
    classes: [
      {
        id: 'deg3-cls-21',
        classNum: 21,
        topic: 'Master Portfolio Architecture & Case Study Presentation',
        simpleConcept: 'Organizing digital projects into problem-solution case studies, showcasing real metrics, and personal branding.',
        objective: 'Structure digital projects into compelling portfolio case studies.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain case study format: Problem Statement + Role + Tools Used + Process + Final Results & Screenshots.',
          demonstrate: 'Review a top-tier digital portfolio case study, highlighting visual proof and quantifiable achievements.',
          practice: 'Write a case study outline for 1 project created during the degree program.',
          realWorldExample: 'Winning job offers at leading tech companies and agencies.',
          practicalTask: 'Write 2 complete project case studies for your digital portfolio website.',
          expectedOutput: '2 detailed project case study documents.'
        }
      },
      {
        id: 'deg3-cls-22',
        classNum: 22,
        topic: 'LinkedIn Profile Optimization & Professional Networking',
        simpleConcept: 'Optimizing LinkedIn headline, summary bio, featured work section, experience highlights, and networking outreach.',
        objective: 'Build an optimized professional LinkedIn profile to attract recruiters.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain recruiter search keywords, LinkedIn All-Star status, engaging post content, and connection request etiquette.',
          demonstrate: 'Optimize a LinkedIn profile step-by-step: headline formula, keyword-rich about section, and linking portfolio.',
          practice: 'Draft a keyword-optimized LinkedIn headline and about section.',
          realWorldExample: 'Attracting inbound job interviews and recruiter messages on LinkedIn.',
          practicalTask: 'Update LinkedIn profile with optimized headline, about bio, and portfolio link.',
          expectedOutput: 'All-Star level professional LinkedIn profile.'
        }
      },
      {
        id: 'deg3-cls-23',
        classNum: 23,
        topic: 'Resume Building, Cover Letters & Job Application Strategy',
        simpleConcept: 'Crafting ATS-friendly (Applicant Tracking System) single-page tech resumes, tailored cover letters, and job search strategy.',
        objective: 'Create ATS-compliant professional tech resume and job application materials.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain ATS scanner formatting rules, action verbs, quantifying results (e.g. "Increased engagement by 40%"), and clean templates.',
          demonstrate: 'Build an ATS-optimized resume using Reactive Resume / Canva, customizing for a Digital Specialist role.',
          practice: 'Draft 3 bullet points quantifying project achievements for your resume.',
          realWorldExample: 'Passing automated HR resume screeners and securing interviews.',
          practicalTask: 'Build a single-page ATS-optimized tech resume in PDF format.',
          expectedOutput: 'Professional single-page ATS tech resume.'
        }
      },
      {
        id: 'deg3-cls-24',
        classNum: 24,
        topic: 'Tech & Creative Job Interview Preparation',
        simpleConcept: 'Preparing for behavioral interview questions (STAR method), technical portfolio reviews, salary negotiation, and mock interviews.',
        objective: 'Master interview techniques and articulate technical skills confidently.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain STAR method (Situation, Task, Action, Result), answering "Tell me about yourself", and asking smart questions.',
          demonstrate: 'Conduct a mock interview session demonstrating how to walk a recruiter through a live portfolio website.',
          practice: 'Practice answering 2 common behavioral interview questions using the STAR framework.',
          realWorldExample: 'Securing high-paying jobs and negotiating salary offers.',
          practicalTask: 'Record a 2-minute video pitch introducing yourself and walking through your digital portfolio.',
          expectedOutput: '2-minute video portfolio introduction pitch.'
        }
      },
      {
        id: 'deg3-cls-25',
        classNum: 25,
        topic: 'Degree Master Capstone Defense & Project Presentation',
        simpleConcept: 'Presenting the comprehensive final Degree Capstone Project to instructors and peer audience with live demonstration.',
        objective: 'Deliver final capstone project defense and receive degree completion certification.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain presentation delivery, managing live tech demos, handling Q&A, and showcasing end-to-end skill mastery.',
          demonstrate: 'Moderate final student capstone project presentations and evaluate against industry rubric.',
          practice: 'Deliver a 5-minute live demonstration of master capstone project to class.',
          realWorldExample: 'Final university capstone defense and professional project showcase.',
          practicalTask: 'Deliver final 5-minute Degree Capstone Project presentation and live demo.',
          expectedOutput: 'Successful Capstone Project defense and graduation readiness.'
        }
      }
    ]
  }
];

export const DEGREE_3_SPECIALIZATION_OPTIONS = [
  {
    id: 'track-fullstack',
    title: 'Modern Web Apps & Full-Stack',
    icon: 'fas fa-laptop-code',
    description: 'Build single-page React applications with live API data integration, Tailwind CSS styling, and Vercel cloud deployment.',
    keySkills: ['React.js & Hooks', 'Tailwind CSS', 'REST API Integration', 'Vercel Deployment'],
    portfolioDeliverable: 'A live responsive React web application hosted on Vercel.'
  },
  {
    id: 'track-analytics',
    title: 'Data Analytics & Power Query Dashboards',
    icon: 'fas fa-chart-bar',
    description: 'Clean raw enterprise datasets with Power Query, write complex lookup formulas, build Pivot Charts, and construct executive KPI dashboards.',
    keySkills: ['Power Query ETL', 'XLOOKUP & Formulas', 'Pivot Charts & Slicers', 'Executive KPI Dashboards'],
    portfolioDeliverable: 'An interactive MS Excel Business Intelligence Dashboard with live slicers.'
  },
  {
    id: 'track-freelance',
    title: 'Digital Marketing & Freelance Monetization',
    icon: 'fas fa-briefcase',
    description: 'Execute keyword SEO research, set up Meta Ads campaigns, launch e-commerce storefronts, and build international freelance client pipelines.',
    keySkills: ['SEO & Local Business Maps', 'Meta Ads Manager', 'Upwork & Fiverr Profiles', 'E-Commerce Storefronts'],
    portfolioDeliverable: 'A complete freelance business profile, campaign plan, and live online store.'
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
