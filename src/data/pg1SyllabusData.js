// PG 1st Year (Postgraduate 1st Year) Digital Skills Syllabus Data
// Designed based on Postgraduate student survey demands: Advanced MS Office (Word/Excel/PowerPoint), Arabic/Malayalam Typing, Graphic Design (Photoshop/Canva), Video Editing, Applied AI Research Tools, and Web Development.

export const PG_1_MODULES = [
  {
    id: 'pg1-mod-1',
    number: 1,
    title: 'Advanced Enterprise Office & Multi-Language Digital Typing',
    purpose: 'Master enterprise-grade document creation, data analytics in Excel, high-impact executive presentations, and Arabic/Malayalam touch typing for modern workplaces.',
    color: '#2563EB',
    icon: 'fas fa-file-excel',
    realProject: {
      title: 'Automated Financial Dashboard & Dual-Language Executive Report',
      description: 'Build a dynamic Excel dashboard with XLOOKUP and Pivot Charts, alongside a professionally formatted multi-language report using Arabic and Malayalam touch typing.'
    },
    classes: [
      {
        id: 'pg1-c1',
        classNum: 1,
        topic: 'Enterprise Document Formatting & Automated Styling (MS Word)',
        simpleConcept: 'Designing long-form academic and business reports with automated Tables of Contents, styles, and citation managers.',
        objective: 'Master structural styles, section breaks, auto-numbering, and referencing in MS Word.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain document hierarchy, style sets, headers/footers, and automated citation tools (Mendeley/Zotero integration).',
          demonstrate: 'Demonstrate creating a 10-page thesis document layout with automated table of contents and page numbering.',
          practicalTask: 'Format a multi-page document with custom heading styles, cover page, and cross-references.',
          expectedOutput: 'A clean, print-ready PDF executive report with working table of contents.'
        }
      },
      {
        id: 'pg1-c2',
        classNum: 2,
        topic: 'Master Excel Data Lookup & Logical Formulas (XLOOKUP, VLOOKUP, IF/IFS)',
        simpleConcept: 'Extracting and analyzing business data instantly using modern lookup and conditional formulas.',
        objective: 'Perform advanced data queries across multiple worksheets using XLOOKUP, INDEX/MATCH, and nested IF logic.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Cover lookup mechanisms, approximate vs exact match, error handling with IFERROR, and multi-criteria evaluation.',
          demonstrate: 'Show how to search student or sales databases with XLOOKUP and clean broken references with IFERROR.',
          practicalTask: 'Build a dynamic lookup sheet querying 500+ records to retrieve employee or student performance data.',
          expectedOutput: 'Functional Excel spreadsheet with error-free XLOOKUP formulas.'
        }
      },
      {
        id: 'pg1-c3',
        classNum: 3,
        topic: 'Excel Data Analytics, Pivot Tables & Dynamic Dashboards',
        simpleConcept: 'Summarizing massive data sets into visual, interactive analytical charts and slicers.',
        objective: 'Construct interactive Pivot Tables, calculated fields, and KPI dashboards.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain data aggregation, grouping date ranges, conditional formatting, and dashboard slicers.',
          demonstrate: 'Build an interactive sales dashboard live on screen using Pivot Charts and timelines.',
          practicalTask: 'Import raw survey data and turn it into a 4-chart interactive executive dashboard with slicers.',
          expectedOutput: 'An interactive Excel Dashboard file containing Pivot Charts and slice filters.'
        }
      },
      {
        id: 'pg1-c4',
        classNum: 4,
        topic: 'Executive Slide Design & Storytelling (MS PowerPoint)',
        simpleConcept: 'Creating pitch decks and academic presentations that captivate audiences with clean layout principles.',
        objective: 'Apply visual hierarchy, slide master customization, infographics, and smooth morph transitions.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Teach the 6x6 rule, contrast, typography pairing, iconography, and PowerPoint Morph transition.',
          demonstrate: 'Transform a bullet-heavy text slide into a modern infographic slide with Morph animation.',
          practicalTask: 'Design a 5-slide executive presentation pitch deck adhering to modern design principles.',
          expectedOutput: 'A 5-slide PPTX deck with custom Master Layouts and Morph transitions.'
        }
      },
      {
        id: 'pg1-c5',
        classNum: 5,
        topic: 'Arabic & Malayalam Touch Typing & Multi-Language Workplace Tools',
        simpleConcept: 'Typing efficiently in Arabic and Malayalam using standard keyboard layouts for regional and international communication.',
        objective: 'Master touch typing techniques for Arabic (Keyman/InScript) and Malayalam Unicode layouts.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain keyboard layout maps, finger placement, right-to-left alignment, and font encoding (Unicode).',
          demonstrate: 'Demonstrate typing a bilingual document in Word with Arabic RTL and Malayalam font styles.',
          practicalTask: 'Type a 200-word paragraph in Arabic and Malayalam accurately within the lab timeframe.',
          expectedOutput: 'A formatted Word document containing clean Arabic and Malayalam translated text.'
        }
      }
    ]
  },
  {
    id: 'pg1-mod-2',
    number: 2,
    title: 'Professional Graphic Design & Visual Communication',
    purpose: 'Master graphic design tools like Adobe Photoshop and Canva Pro to produce high-impact branding assets and marketing visuals.',
    color: '#059669',
    icon: 'fas fa-palette',
    realProject: {
      title: 'Complete Corporate Brand Identity Kit',
      description: 'Design a comprehensive brand kit including logo concepts, poster flyers, social media banners, and digital business cards.'
    },
    classes: [
      {
        id: 'pg1-c6',
        classNum: 6,
        topic: 'Photoshop Workspace, Layers & Non-Destructive Editing',
        simpleConcept: 'Understanding layers, layer masks, and smart objects to edit images without ruining original files.',
        objective: 'Master Photoshop layer hierarchies, masks, smart objects, and essential selection tools.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Cover raster vs vector, non-destructive editing using Layer Masks, Adjustment Layers, and Selection tools.',
          demonstrate: 'Demonstrate isolating a product from a background using Select Subject and Masking.',
          practicalTask: 'Cut out 3 objects and composite them cleanly into a new background scene.',
          expectedOutput: 'A multi-layered PSD composition with non-destructive layer masks.'
        }
      },
      {
        id: 'pg1-c7',
        classNum: 7,
        topic: 'Photo Retouching, Color Correction & Generative Fill AI',
        simpleConcept: 'Enhancing photo quality, correcting colors, and using Photoshop Generative AI to expand images.',
        objective: 'Perform portrait retouching, color grading, object removal, and AI generative fill.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain curves, levels, healing brush, clone stamp, and Adobe Firefly Generative Fill in Photoshop.',
          demonstrate: 'Remove blemishes from a photo and use Generative Fill to replace background elements.',
          practicalTask: 'Retouch an underexposed photo and seamlessly add/remove elements using AI fill.',
          expectedOutput: 'High-resolution before/after images showing professional color correction and edit.'
        }
      },
      {
        id: 'pg1-c8',
        classNum: 8,
        topic: 'Canva Pro for Rapid Branding & Social Media Graphics',
        simpleConcept: 'Designing promotional flyers, posters, and Instagram graphics effortlessly using Canva Pro.',
        objective: 'Utilize Canva Brand Kits, custom grids, animations, and social media template design.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Teach color theory, visual hierarchy, alignment, margin rules, and brand consistency.',
          demonstrate: 'Create an event poster and resize it into Instagram Story, Reel cover, and banner formats.',
          practicalTask: 'Design an event poster and export a complete 3-size social media promotion pack.',
          expectedOutput: 'A 3-part social media graphics pack exported in high-res PNG format.'
        }
      },
      {
        id: 'pg1-c9',
        classNum: 9,
        topic: 'Vector Logos & Typography Design Principles',
        simpleConcept: 'Combining font hierarchy, logo marks, and vectors to build recognizable brand identity.',
        objective: 'Create vector logos, typography pairing rules, and vector path manipulations.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Discuss typography classifications (Serif, Sans-serif, Script), kerning, tracking, and logo symbolism.',
          demonstrate: 'Design a minimal corporate logo combining typography with a geometric icon mark.',
          practicalTask: 'Create a logo concept for a startup with primary, secondary, and mark variations.',
          expectedOutput: 'Vector logo file exported in transparent PNG and SVG formats.'
        }
      },
      {
        id: 'pg1-c10',
        classNum: 10,
        topic: 'Digital Business Banners & Marketing Collateral Assembly',
        simpleConcept: 'Assembling all design components into professional print and digital marketing collateral.',
        objective: 'Prepare print-ready CMYK PDFs and RGB web banners with bleed and margin guidelines.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain CMYK vs RGB color spaces, DPI/PPI resolution requirements, and print bleed margins.',
          demonstrate: 'Set up a business card template with bleed lines and export print-ready PDF files.',
          practicalTask: 'Design a double-sided business card and corporate brochure with proper print margins.',
          expectedOutput: 'Print-ready PDF files with crop marks and CMYK color profile.'
        }
      }
    ]
  },
  {
    id: 'pg1-mod-3',
    number: 3,
    title: 'Video Production & Motion Graphics Studio',
    purpose: 'Learn video editing techniques in Premiere Pro & CapCut, sound design, animated captions, and promotional reel creation.',
    color: '#D97706',
    icon: 'fas fa-video',
    realProject: {
      title: 'Cinematic Promotional Reel & Explainer Video',
      description: 'Edit a 60-second high-energy promotional video complete with jump cuts, background score, captions, and motion graphics.'
    },
    classes: [
      {
        id: 'pg1-c11',
        classNum: 11,
        topic: 'Video Editing Fundamentals (CapCut & Premiere Pro Interface)',
        simpleConcept: 'Importing clips, timeline trimming, organizing footage, and mastering basic cuts.',
        objective: 'Understand aspect ratios (16:9 vs 9:16), frame rates (24fps vs 60fps), and timeline assembly.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain project setup, A-roll vs B-roll footage, ripple edit, razor tool, and timeline organization.',
          demonstrate: 'Import raw interview clips and assemble a 30-second structured timeline cut.',
          practicalTask: 'Cut down 5 raw video clips into a tight 30-second sequence without filler pauses.',
          expectedOutput: 'A clean timeline sequence exported as 1080p MP4.'
        }
      },
      {
        id: 'pg1-c12',
        classNum: 12,
        topic: 'Audio Editing, Voiceover Enhancement & Sound Effects',
        simpleConcept: 'Cleaning background noise, balancing music levels, and adding impact sound effects.',
        objective: 'Apply noise reduction, audio equalization (EQ), ducking, and sound effect layering.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain audio decibel levels (-6dB peak rule), background music ducking, and pop filter cleaning.',
          demonstrate: 'Denoise a background hum from a voice track and lower background music automatically when speaking.',
          practicalTask: 'Add background music and 3 sound effects (whoosh, pop, click) to a video project.',
          expectedOutput: 'Video project with crystal-clear voiceover and balanced background score.'
        }
      },
      {
        id: 'pg1-c13',
        classNum: 13,
        topic: 'Auto-Captions, Text Animations & Kinetic Typography',
        simpleConcept: 'Adding engaging animated captions and lower thirds to increase viewer retention.',
        objective: 'Generate auto-captions, style highlight colors, and animate lower-third title graphics.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Discuss video caption engagement statistics, color highlighting key words, and font readability.',
          demonstrate: 'Generate auto-captions in CapCut/Premiere, style words with yellow highlights, and animate entrance.',
          practicalTask: 'Add animated multi-color captions and lower third speaker tags to a talking-head video.',
          expectedOutput: 'Reel video with dynamic animated captions synced to speech.'
        }
      },
      {
        id: 'pg1-c14',
        classNum: 14,
        topic: 'Color Grading, LUTs & Visual Transitions',
        simpleConcept: 'Giving raw video a professional color look and smooth scene transitions.',
        objective: 'Apply Lumetri color adjustments, Look-Up Tables (LUTs), and seamless transition effects.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain color correction vs grading, exposure adjustment, saturation, and cinematic LUT application.',
          demonstrate: 'Color grade a dull smartphone clip into a warm cinematic look using Lumetri color controls.',
          practicalTask: 'Color grade 3 different video clips and apply smooth zoom/whip transitions between scenes.',
          expectedOutput: 'Color-graded video file showing enhanced vibrant tones.'
        }
      },
      {
        id: 'pg1-c15',
        classNum: 15,
        topic: 'Short-Form Social Media Promo Reel Production',
        simpleConcept: 'Combining cuts, audio, captions, color, and motion graphics into a complete 60-second promo.',
        objective: 'Produce, render, and export an Instagram Reel / YouTube Short optimized for mobile screens.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Discuss hook timing (first 3 seconds), fast pacing, thumbnail creation, and export presets (H.264 MP4).',
          demonstrate: 'Review a finished 60s promo reel and demonstrate high-quality export settings.',
          practicalTask: 'Edit and render a complete 60-second vertical promotional video ready for publishing.',
          expectedOutput: 'Full 1080x1920 MP4 promotional reel ready for social media posting.'
        }
      }
    ]
  },
  {
    id: 'pg1-mod-4',
    number: 4,
    title: 'Applied AI Research Tools & Academic Productivity',
    purpose: 'Leverage modern AI tools (ChatGPT, Claude 3.5, Midjourney, Consensus) for academic research, literature synthesis, and prompt engineering.',
    color: '#7C3AED',
    icon: 'fas fa-brain',
    realProject: {
      title: 'AI-Assisted Research Literature Synthesis & Knowledge Agent',
      description: 'Build a research synthesis pipeline using AI prompting, paper summarization, and custom GPT knowledge tools.'
    },
    classes: [
      {
        id: 'pg1-c16',
        classNum: 16,
        topic: 'Prompt Engineering Mastery for LLMs (ChatGPT & Claude)',
        simpleConcept: 'Writing clear instructions to get accurate, high-quality responses from AI models.',
        objective: 'Master System Prompts, Few-Shot Prompting, Chain-of-Thought reasoning, and Role Assignment.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain context window limitations, hallucination prevention, persona prompting, and structured JSON output.',
          demonstrate: 'Compare a vague prompt with a structured mega-prompt to produce a detailed analysis document.',
          practicalTask: 'Write a 4-part structured prompt to analyze a complex business case study with AI.',
          expectedOutput: 'A documented prompt template producing accurate, structured output.'
        }
      },
      {
        id: 'pg1-c17',
        classNum: 17,
        topic: 'AI Academic Literature Discovery & Paper Summarization',
        simpleConcept: 'Using AI tools to search, summarize, and extract insights from academic research papers.',
        objective: 'Utilize Consensus, Elicit, SciSpace, and Claude to analyze dense PDF papers and generate citations.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Teach ethical AI usage in academic research, checking paper sources, citation formats, and literature reviews.',
          demonstrate: 'Upload a research paper PDF to AI and extract methodology, key findings, and limitations in 2 minutes.',
          practicalTask: 'Use AI literature tools to find 3 research papers on a topic and generate a comparative summary.',
          expectedOutput: 'A structured 1-page literature matrix generated with AI assistance.'
        }
      },
      {
        id: 'pg1-c18',
        classNum: 18,
        topic: 'AI Generative Image Creation (Midjourney, DALL-E & Ideogram)',
        simpleConcept: 'Creating custom visual assets and illustrations by writing descriptive text prompts.',
        objective: 'Write visual art prompts incorporating style tags, lighting, camera angles, and text rendering.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain image prompt parameters (--ar aspect ratio, style raw), photorealism keywords, and Ideogram text rendering.',
          demonstrate: 'Generate a 3D isometric product mock-up and a realistic photo illustration using text prompts.',
          practicalTask: 'Generate 3 high-quality custom visual assets for a presentation or website using AI image tools.',
          expectedOutput: 'A collection of 3 high-resolution AI-generated graphics.'
        }
      },
      {
        id: 'pg1-c19',
        classNum: 19,
        topic: 'AI Document Processing, Audio Transcripts & Note Automation',
        simpleConcept: 'Converting long meeting recordings, lectures, and PDFs into structured notes automatically.',
        objective: 'Utilize Whisper AI, NotebookLM, and AI summarizers for automated transcription and note-taking.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Cover Google NotebookLM features, audio transcription tools, chapter splitting, and automated Q&A.',
          demonstrate: 'Upload a 10-minute audio lecture to transcript AI and produce key takeaways and flashcards.',
          practicalTask: 'Process a sample lecture audio file into action items, meeting minutes, and study notes.',
          expectedOutput: 'Automated meeting minutes and structured note outline generated from audio.'
        }
      },
      {
        id: 'pg1-c20',
        classNum: 20,
        topic: 'Building Custom GPTs & Personal AI Knowledge Assistants',
        simpleConcept: 'Creating a personalized AI assistant trained on specific guidelines and documents.',
        objective: 'Configure custom GPT instructions, upload knowledge base files, and define actions.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Custom GPT architecture, knowledge retrieval, system instructions, and privacy controls.',
          demonstrate: 'Build a custom "Academic Research Tutor" GPT that answers queries based on uploaded syllabus PDFs.',
          practicalTask: 'Build a custom AI assistant tailored to your subject area or personal workflow.',
          expectedOutput: 'A working Custom GPT link or saved AI assistant persona.'
        }
      }
    ]
  },
  {
    id: 'pg1-mod-5',
    number: 5,
    title: 'Web Development Foundations (HTML, CSS & JavaScript)',
    purpose: 'Build modern, responsive websites using semantic HTML5, CSS Grid/Flexbox, and DOM-manipulating JavaScript, then deploy live.',
    color: '#0284C7',
    icon: 'fas fa-code',
    realProject: {
      title: 'Live Responsive Personal Portfolio & Web App',
      description: 'Develop a fully responsive personal portfolio website with interactive projects, responsive navigation, and live Vercel deployment.'
    },
    classes: [
      {
        id: 'pg1-c21',
        classNum: 21,
        topic: 'HTML5 Semantic Web Structure & Code Editors (VS Code)',
        simpleConcept: 'Writing clean code structure with standard tags using Visual Studio Code.',
        objective: 'Set up VS Code, extensions (Live Server), and write semantic HTML5 page structures.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain HTML boilerplate, semantic tags (<header>, <nav>, <main>, <section>, <footer>), and SEO metadata.',
          demonstrate: 'Create a semantic HTML page with navigation menu, hero section, and contact form.',
          practicalTask: 'Write a semantic HTML structure for a 3-page personal profile site.',
          expectedOutput: 'Valid HTML5 file viewing cleanly in browser with Live Server.'
        }
      },
      {
        id: 'pg1-c22',
        classNum: 22,
        topic: 'CSS Styling, Color Schemes & Modern Typography',
        simpleConcept: 'Styling plain web pages with colors, custom Google Fonts, margins, and borders.',
        objective: 'Master CSS selectors, class rules, Box Model (margin, padding, border), and font loading.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Cover class vs ID selectors, CSS reset, Google Fonts embedding, and box-sizing: border-box.',
          demonstrate: 'Style a plain HTML card into a sleek modern design element with drop shadows and rounded corners.',
          practicalTask: 'Apply a cohesive color palette and typography rules to your HTML profile page.',
          expectedOutput: 'A styled CSS stylesheet linked to HTML file.'
        }
      },
      {
        id: 'pg1-c23',
        classNum: 23,
        topic: 'Responsive Layout Engineering (Flexbox & CSS Grid)',
        simpleConcept: 'Arranging webpage components side-by-side cleanly for mobile, tablet, and desktop screens.',
        objective: 'Master Flexbox alignment, CSS Grid columns, and Media Queries for responsive design.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain flex-direction, justify-content, align-items, grid-template-columns, and @media breakpoints.',
          demonstrate: 'Build a responsive 3-column feature grid that collapses into a single column on mobile screens.',
          practicalTask: 'Create a responsive 3-column layout that adapts dynamically to browser screen width.',
          expectedOutput: 'A fully responsive layout working smoothly across desktop and mobile screen sizes.'
        }
      },
      {
        id: 'pg1-c24',
        classNum: 24,
        topic: 'JavaScript Basics & Interactive DOM Manipulation',
        simpleConcept: 'Adding interactivity like click events, dark mode toggles, and mobile menus to web pages.',
        objective: 'Understand JS variables, functions, event listeners, and DOM element modification.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Cover variables (const/let), querySelector, addEventListener, and modifying style/class properties.',
          demonstrate: 'Build a Light/Dark theme toggle button that switches webpage background and text colors dynamically.',
          practicalTask: 'Create an interactive mobile menu toggle button and a dynamic counter using JavaScript.',
          expectedOutput: 'Working JavaScript file adding interactive toggles to the web page.'
        }
      },
      {
        id: 'pg1-c25',
        classNum: 25,
        topic: 'Git, GitHub Repository & Live Vercel Web Deployment',
        simpleConcept: 'Publishing your code to GitHub and deploying your website live to the internet for free.',
        objective: 'Initialize Git, commit code, push to GitHub, and deploy to Vercel/GitHub Pages with custom domain URL.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain version control with Git, repository creation on GitHub, continuous deployment with Vercel.',
          demonstrate: 'Push a website project to GitHub and deploy it live to a custom .vercel.app link in 3 minutes.',
          practicalTask: 'Deploy your complete personal website live on Vercel and submit your public website URL.',
          expectedOutput: 'A live, accessible public website URL hosted on Vercel/GitHub Pages.'
        }
      }
    ]
  }
];

export const PG_1_SPECIALIZATION_OPTIONS = [
  {
    id: 'pg1-spec-1',
    title: 'Enterprise Analytics & Data Visualization',
    icon: 'fas fa-chart-line',
    description: 'Build an automated multi-sheet business dashboard with dynamic formulas, Pivot visual charts, and multi-language reporting.',
    keySkills: ['Excel XLOOKUP', 'Pivot Dashboards', 'Word Document Automation', 'Multi-Language Typing'],
    portfolioDeliverable: 'Interactive Excel Data Dashboard & Dual-Language Executive Report PDF'
  },
  {
    id: 'pg1-spec-2',
    title: 'Creative Media & Video Production Track',
    icon: 'fas fa-film',
    description: 'Produce a complete brand media kit including vector logos, social media posters, and a 60s color-graded commercial video reel.',
    keySkills: ['Photoshop Editing', 'Canva Brand Kit', 'Premiere Pro Editing', 'Auto-Captions & LUTs'],
    portfolioDeliverable: 'Brand Identity Design Kit & 60-Second Promotional Commercial Video'
  },
  {
    id: 'pg1-spec-3',
    title: 'AI Research & Web Development Track',
    icon: 'fas fa-laptop-code',
    description: 'Develop a responsive web application and custom AI knowledge assistant hosted live on Vercel.',
    keySkills: ['Custom GPT Building', 'Prompt Engineering', 'HTML5/CSS Grid/JS', 'Vercel Deployment'],
    portfolioDeliverable: 'Live Deployed Personal Portfolio Website & Custom AI Research Assistant'
  }
];

export const calculatePg1Metrics = (savedProgress) => {
  let totalClasses = 0;
  let completedClasses = 0;
  let inProgressClasses = 0;

  const moduleMetrics = PG_1_MODULES.map((mod) => {
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
