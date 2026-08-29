// Degree 1st Year Digital Skills Syllabus Data Structure
// Framework: LEARN -> DEMONSTRATE -> PRACTICE -> CREATE -> COMPLETE

export const DEGREE_1_MODULES = [
  {
    id: 'deg1-mod-1',
    number: 1,
    title: 'Professional Video Editing & Motion Content Creation',
    purpose: 'Master CapCut Desktop, Premiere Pro basics, timeline editing, color grading, audio balancing, and viral short-form video production.',
    icon: 'fas fa-video',
    color: '#00F0FF',
    realProject: {
      title: '60-Second Promotional Short Video',
      description: 'Students shoot or curate raw clips, cut on beat, apply text overlays, auto-captions, transition effects, and export a polished HD vertical reel.'
    },
    classes: [
      {
        id: 'deg1-cls-1',
        classNum: 1,
        topic: 'Video Editing Overview & Software Workstations',
        simpleConcept: 'Understanding video frame rates, resolution (1080p vs 4K, 16:9 vs 9:16), and CapCut/Premiere workspace layout.',
        objective: 'Set up video editing projects with proper aspect ratio and sequence settings.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain video fps (24fps vs 30fps vs 60fps), vertical (9:16) vs horizontal (16:9) formats, and timeline concepts.',
          demonstrate: 'Launch CapCut Desktop/Premiere Pro, create a project, import raw media, and explain timeline panels.',
          practice: 'Import 3 video clips and 1 audio file into project media bin.',
          realWorldExample: 'Creating Instagram Reels, YouTube Shorts, and brand ads.',
          practicalTask: 'Create a 1080x1920 vertical video sequence, import clips, and arrange them chronologically.',
          expectedOutput: 'Clean media bin and properly formatted video project timeline.'
        }
      },
      {
        id: 'deg1-cls-2',
        classNum: 2,
        topic: 'Timeline Trimming, Ripple Edits & Beat Syncing',
        simpleConcept: 'Cutting unwanted video portions, trimming clips precisely, and matching cuts to music rhythm.',
        objective: 'Master razor cut tool, ripple edit, gap removal, and background music beat syncing.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Demonstrate J-cuts, L-cuts, and snapping video cuts on beat markers.',
          demonstrate: 'Show split clip (Ctrl+B / C), delete gap (Shift+Delete), and mark audio beats.',
          practice: 'Trim 5 raw clips down to 3 seconds each and align cuts to background music beats.',
          realWorldExample: 'Fast-paced travel vlogs and promo teasers synced to music.',
          practicalTask: 'Sync 4 event video clips precisely to the beat of an upbeat background audio track.',
          expectedOutput: 'Dynamic 15-second video cut seamlessly on music beats.'
        }
      },
      {
        id: 'deg1-cls-3',
        classNum: 3,
        topic: 'Text Animation, Auto-Captions & Motion Graphics',
        simpleConcept: 'Adding engaging typography, lower thirds, automated speech-to-text captions, and sticker overlays.',
        objective: 'Create dynamic animated text, captions, and title graphics.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain caption readability, font hierarchy, animated text presets, and contrast against video backgrounds.',
          demonstrate: 'Use Auto-Caption feature, customize text color/stroke, add animated lower third for speaker name.',
          practice: 'Generate auto-captions for a voiceover video and style keywords with pop color accents.',
          realWorldExample: 'Informative reels and educational viral video captions.',
          practicalTask: 'Add animated title card and auto-captions to a 30-second speaking reel.',
          expectedOutput: 'Accurate, stylized, animated captions on video reel.'
        }
      },
      {
        id: 'deg1-cls-4',
        classNum: 4,
        topic: 'Video Transitions, Effects & Keyframe Motion',
        simpleConcept: 'Applying smooth camera transitions (whip zoom, blur dissolve) and animating video elements with keyframes.',
        objective: 'Apply cinematic transitions and animate video scale/position over time using keyframes.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain keyframes (start point, end point) for smooth zoom-in and pan effects.',
          demonstrate: 'Add whip zoom transition between clips; animate a logo zooming in onto the video corner.',
          practice: 'Apply 3 seamless transitions and animate a logo overlay using 2 keyframe points.',
          realWorldExample: 'High-energy YouTube intros and commercial advertisement transitions.',
          practicalTask: 'Create a video intro with keyframed logo motion and whip zoom transitions.',
          expectedOutput: 'Smooth animated video intro with keyframe motion.'
        }
      },
      {
        id: 'deg1-cls-5',
        classNum: 5,
        topic: 'Audio Editing, Noise Reduction & Color Grading',
        simpleConcept: 'Cleaning audio background noise, balancing voice vs music volume, and applying color filters/LUTs.',
        objective: 'Enhance audio quality and apply professional color correction and LUT grading.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain audio decibels (-12dB voice, -24dB background music), noise cancellation, and LUT color filters.',
          demonstrate: 'Apply noise reduction to voice clip, duck music during speech, adjust brightness/contrast/saturation.',
          practice: 'Balance voiceover with background music and color-grade a dull clip into vibrant cinematic colors.',
          realWorldExample: 'Professional documentary audio cleanup and cinema-grade color grading.',
          practicalTask: 'Clean voice audio track and apply vibrant cinematic color grading to a 30-second video.',
          expectedOutput: 'Crystal clear audio balance and beautifully color-graded video clip.'
        }
      }
    ]
  },
  {
    id: 'deg1-mod-2',
    number: 2,
    title: 'Creative Graphic Design & Brand Visuals',
    purpose: 'Learn Photoshop photo manipulation, Canva rapid graphic creation, logo design basics, and visual layout principles.',
    icon: 'fas fa-paint-brush',
    color: '#3B82F6',
    realProject: {
      title: 'Complete Social Media Event Brand Kit',
      description: 'Design an event poster in Photoshop, promotional Instagram story in Canva, and vector badge in Illustrator.'
    },
    classes: [
      {
        id: 'deg1-cls-6',
        classNum: 6,
        topic: 'Photoshop Workspace, Layers & Selection Tools',
        simpleConcept: 'Understanding canvas resolution (300 DPI vs 72 DPI), layers, selection tools (Quick Selection, Lasso), and non-destructive editing.',
        objective: 'Master Photoshop layers, selections, masks, and canvas setup.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain layers like stacked transparent sheets. Introduce selection tools for subject extraction.',
          demonstrate: 'Cut out a person from a portrait photo, place onto a custom gradient background.',
          practice: 'Extract a product image from its background and place it on a styled background layer.',
          realWorldExample: 'E-commerce product photos and movie poster subject cutouts.',
          practicalTask: 'Isolate a subject photo using selection tools and combine with a clean background.',
          expectedOutput: 'Clean cut-out graphic saved as a layered PSD and PNG.'
        }
      },
      {
        id: 'deg1-cls-7',
        classNum: 7,
        topic: 'Typography, Photo Retouching & Color Adjustments',
        simpleConcept: 'Using adjustment layers (Curves, Levels, Hue/Saturation), font pairing rules, and portrait retouching.',
        objective: 'Apply photo color adjustments and construct visually balanced typographic headlines.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain visual hierarchy (title, subtitle, body), serif vs sans-serif, and adjustment layer masks.',
          demonstrate: 'Fix photo lighting with Curves, smooth minor blemishes, and add bold typography with drop shadow.',
          practice: 'Design a motivational quote poster with retouched background photo and elegant font hierarchy.',
          realWorldExample: 'Magazine covers, billboard ads, and social media announcements.',
          practicalTask: 'Create an event announcement flyer with photo color correction and typography.',
          expectedOutput: 'High-resolution event flyer graphic with balanced typography.'
        }
      },
      {
        id: 'deg1-cls-8',
        classNum: 8,
        topic: 'Canva Pro Workflows for Rapid Graphic Creation',
        simpleConcept: 'Using Canva for quick marketing collateral, Instagram carousels, thumbnail designs, and brand kits.',
        objective: 'Rapidly design multi-page social media carousels and posters using Canva.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Compare custom Photoshop workflows vs rapid Canva template customization for fast turnarounds.',
          demonstrate: 'Create a 5-slide educational Instagram carousel with brand color palette and elements.',
          practice: 'Build a 3-slide carousel graphics deck for a college workshop event.',
          realWorldExample: 'Digital agency daily social media posts and client slide decks.',
          practicalTask: 'Design a 4-slide Instagram informative carousel graphic in Canva.',
          expectedOutput: 'Cohesive 4-slide carousel exported as PNG images.'
        }
      },
      {
        id: 'deg1-cls-9',
        classNum: 9,
        topic: 'Logo Design Principles & Illustrator Vector Tools',
        simpleConcept: 'Difference between raster (pixels) and vector (math curves), Pen Tool, Shape Builder, and logo creation.',
        objective: 'Understand vector graphics and design a scalable clean vector logo in Adobe Illustrator.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain raster pixelation vs vector infinite scalability. Introduce Pen Tool and Shape Builder.',
          demonstrate: 'Combine geometric shapes using Shape Builder to create a minimalist modern brand logo mark.',
          practice: 'Trace a geometric logo icon using Illustrator shapes and Pen Tool.',
          realWorldExample: 'Corporate logo branding for Nike, Apple, and startup identities.',
          practicalTask: 'Design a clean geometric brand logo mark in vector format.',
          expectedOutput: 'Scalable vector logo exported as SVG and AI.'
        }
      },
      {
        id: 'deg1-cls-10',
        classNum: 10,
        topic: 'Poster Design Composition & Export Formats',
        simpleConcept: 'Grid alignment, contrast, rule of thirds, bleed/margin specs, and exporting PNG, JPG, PDF for print/web.',
        objective: 'Assemble a complete event poster applying graphic design principles and export in print/digital formats.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain visual focal points, whitespace, CMYK (print) vs RGB (digital), and PDF print standards.',
          demonstrate: 'Finalize college fest poster: combine vector logo, retouched photo, and text layout.',
          practice: 'Export poster design for web (RGB 72DPI PNG) and print (CMYK 300DPI PDF).',
          realWorldExample: 'Marketing campaigns for music festivals, conferences, and product launches.',
          practicalTask: 'Create an A4 promotional poster and export web & print ready files.',
          expectedOutput: 'Complete fest poster in PNG and PDF print formats.'
        }
      }
    ]
  },
  {
    id: 'deg1-mod-3',
    number: 3,
    title: 'AI Tools & Practical Prompting Workflows',
    purpose: 'Harness ChatGPT, Claude, AI image generators (Midjourney/DALL-E/Leonardo), and AI audio tools for academic & creative productivity.',
    icon: 'fas fa-robot',
    color: '#8B5CF6',
    realProject: {
      title: 'AI-Assisted Campaign Content Suite',
      description: 'Generate marketing copy using ChatGPT/Claude, produce AI concept artwork, and convert text to speech voiceovers.'
    },
    classes: [
      {
        id: 'deg1-cls-11',
        classNum: 11,
        topic: 'Prompt Engineering Fundamentals (Role, Context, Task, Format)',
        simpleConcept: 'How to write precise prompts to get expert-level output from ChatGPT and Claude.',
        objective: 'Structure effective AI prompts using the RCTF (Role, Context, Task, Format) framework.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain hallucination, zero-shot vs few-shot prompting, and context window limits.',
          demonstrate: 'Compare basic prompt ("Write an email") vs RCTF prompt ("Act as a senior marketer, write a formal launch email...").',
          practice: 'Refine a vague prompt into a 4-part structured RCTF prompt and evaluate AI output quality.',
          realWorldExample: 'Automating customer support responses, drafting grant proposals, and summary reports.',
          practicalTask: 'Use RCTF framework to prompt AI for a detailed 3-day event schedule and script outline.',
          expectedOutput: 'High quality, structured AI output matching prompt specs.'
        }
      },
      {
        id: 'deg1-cls-12',
        classNum: 12,
        topic: 'Academic Research & Summarization with AI',
        simpleConcept: 'Using AI to summarize research papers, extract key insights, translate documents, and verify facts.',
        objective: 'Leverage Claude/ChatGPT for fast PDF document analysis, research summaries, and study guides.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain document upload, citation checking, and avoiding AI plagiarism/hallucination.',
          demonstrate: 'Upload a 10-page report to Claude/ChatGPT, prompt for key takeaways, bulleted summaries, and Q&A.',
          practice: 'Upload an article PDF, generate a 300-word executive summary, and extract 5 key statistics.',
          realWorldExample: 'Speeding up literature review for college research papers and industry market research.',
          practicalTask: 'Summarize a long study report using AI into a structured 1-page summary sheet.',
          expectedOutput: 'Accurate 1-page executive summary with key takeaways.'
        }
      },
      {
        id: 'deg1-cls-13',
        classNum: 13,
        topic: 'AI Image Generation (Midjourney / Leonardo / DALL-E)',
        simpleConcept: 'Generating custom visual artwork, stock photos, and design mockups using descriptive text prompts.',
        objective: 'Craft detailed text-to-image prompts specifying camera style, lighting, art medium, and aspect ratio.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain prompt keywords: lighting (cinematic, studio), camera lens (85mm, macro), style (cyberpunk, photorealistic, vector).',
          demonstrate: 'Generate a futuristic workspace image on Leonardo AI using negative prompts and camera parameters.',
          practice: 'Write image prompts to generate 3 distinct style concept images (vector illustration, realistic portrait, 3D render).',
          realWorldExample: 'Creating website hero graphics, book covers, and concept art for game development.',
          practicalTask: 'Generate 2 photorealistic promotional campaign image assets using AI image tools.',
          expectedOutput: 'High-resolution custom AI generated artwork assets.'
        }
      },
      {
        id: 'deg1-cls-14',
        classNum: 14,
        topic: 'AI Voiceovers, Audio Enhancers & Music Generation',
        simpleConcept: 'Converting text script to natural human voiceovers (ElevenLabs) and generating AI background music (Suno/Udio).',
        objective: 'Produce natural AI voice narration and custom background audio for media projects.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain synthetic voice synthesis, emotional tone adjustments, and copyright-free AI music.',
          demonstrate: 'Convert a 30-second script into ElevenLabs natural voice audio; generate background track on Suno.',
          practice: 'Generate a realistic voiceover for a short advertisement script and combine with AI background music.',
          realWorldExample: 'Podcast intro production, audiobooks, and video voiceovers in multiple languages.',
          practicalTask: 'Produce a 30-second voiceover track with background music using AI audio tools.',
          expectedOutput: 'Clear AI voiceover audio file ready for video overlay.'
        }
      },
      {
        id: 'deg1-cls-15',
        classNum: 15,
        topic: 'Ethical AI Usage, Attribution & Workflow Automation',
        simpleConcept: 'Copyright rules, detecting AI bias, verifying facts, and combining AI tools into an automated pipeline.',
        objective: 'Understand legal/ethical AI standards and integrate ChatGPT + AI Image + AI Audio into a single workflow.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Discuss AI ethics, deepfake risks, fact-checking sources, and intellectual property guidelines.',
          demonstrate: 'Chain AI tools: ChatGPT (script) -> ElevenLabs (voice) -> Leonardo (image) -> CapCut (final video).',
          practice: 'Execute an AI content pipeline to create a complete short video reel from scratch in 30 minutes.',
          realWorldExample: 'Digital agency automated video ad factory and content generation pipelines.',
          practicalTask: 'Build a short 30-second AI content video combining AI script, voice, and image assets.',
          expectedOutput: 'Complete AI-generated short video campaign.'
        }
      }
    ]
  },
  {
    id: 'deg1-mod-4',
    number: 4,
    title: 'Web Development & Coding Fundamentals',
    purpose: 'Learn semantic HTML5 markup, CSS3 styling & layout, JavaScript interactive scripting, and Python coding basics.',
    icon: 'fas fa-code',
    color: '#10B981',
    realProject: {
      title: 'Personal Portfolio Web Page',
      description: 'Build a fully responsive personal profile webpage with styled header, bio, skills list, project showcase, and contact form.'
    },
    classes: [
      {
        id: 'deg1-cls-16',
        classNum: 16,
        topic: 'Web Fundamentals, VS Code Setup & HTML5 Structure',
        simpleConcept: 'How the web works (Browser, Server, DNS), setting up Visual Studio Code, and core HTML tags.',
        objective: 'Set up local dev environment and construct a semantic HTML5 web page.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain HTTP requests, HTML element anatomy (`<head>`, `<body>`, `<h1>`, `<p>`, `<a>`, `<img>`).',
          demonstrate: 'Install VS Code, Live Server extension, create `index.html`, and run live preview in browser.',
          practice: 'Create a basic HTML structure with headings, paragraphs, image tag, and hyperlink.',
          realWorldExample: 'Structure of websites like Wikipedia, news portals, and personal blogs.',
          practicalTask: 'Build an HTML page containing your personal bio, profile image, and list of favorite books.',
          expectedOutput: 'Valid HTML5 document displaying correctly in web browser.'
        }
      },
      {
        id: 'deg1-cls-17',
        classNum: 17,
        topic: 'CSS3 Styling, Colors, Typography & Box Model',
        simpleConcept: 'Styling HTML elements with CSS selectors, hex/RGB colors, Google Fonts, margin, padding, and borders.',
        objective: 'Apply custom CSS styles, understand the CSS Box Model, and import web typography.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain inline vs internal vs external CSS, Box Model (Content -> Padding -> Border -> Margin).',
          demonstrate: 'Link `style.css` to HTML, style cards with background colors, custom fonts, rounded corners, and shadow.',
          practice: 'Style an unstyled HTML card component using CSS borders, padding, shadows, and Google Fonts.',
          realWorldExample: 'Modern sleek UI card designs seen on Spotify, Airbnb, and Instagram web.',
          practicalTask: 'Style your personal HTML bio page with custom colors, card containers, and clean fonts.',
          expectedOutput: 'Visually attractive styled web page.'
        }
      },
      {
        id: 'deg1-cls-18',
        classNum: 18,
        topic: 'CSS Flexbox Layouts & Responsive Design',
        simpleConcept: 'Using Flexbox (`display: flex`, `justify-content`, `align-items`) and media queries for mobile-friendly layouts.',
        objective: 'Build flexible multi-column web layouts that adapt seamlessly to mobile and desktop screens.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain main axis vs cross axis in Flexbox, `flex-wrap`, and CSS media queries (`@media (max-width: 768px)`).',
          demonstrate: 'Build a responsive 3-card grid that stacks vertically on mobile screens.',
          practice: 'Create a navigation header bar with logo on left and links on right using Flexbox.',
          realWorldExample: 'Mobile-first responsive web design for mobile phones, tablets, and laptops.',
          practicalTask: 'Build a responsive 3-column project showcase layout using Flexbox.',
          expectedOutput: 'Responsive web layout adapting cleanly to desktop and mobile screen widths.'
        }
      },
      {
        id: 'deg1-cls-19',
        classNum: 19,
        topic: 'JavaScript Basics (Variables, Events & DOM Manipulation)',
        simpleConcept: 'Adding interactive functionality to web pages: button click events, light/dark mode toggling, and dynamic text changes.',
        objective: 'Write JavaScript functions to handle click events and dynamically mutate DOM elements.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain JavaScript variables (`let`, `const`), functions, `document.querySelector()`, and `addEventListener`.',
          demonstrate: 'Create a theme toggle button that switches page background between light and dark mode.',
          practice: 'Build a simple click counter app with + and - buttons modifying text on page.',
          realWorldExample: 'Interactive web UI toggles like dark mode switches, modal popups, and dropdown menus.',
          practicalTask: 'Add a working Light/Dark mode toggle button to your personal web page.',
          expectedOutput: 'Functional interactive web page with dark mode state switch.'
        }
      },
      {
        id: 'deg1-cls-20',
        classNum: 20,
        topic: 'Python Programming Intro (Variables, Loops & Functions)',
        simpleConcept: 'Writing basic Python scripts in Google Colab / VS Code: data types, conditional logic (`if/else`), loops, and functions.',
        objective: 'Write fundamental Python scripts for data calculation and automated decision logic.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Python simplicity, variables, user input (`input()`), `if/elif/else`, and `for` loops.',
          demonstrate: 'Write a Python script that calculates grade percentages and prints student report status.',
          practice: 'Write a Python function that takes a number input and prints its multiplication table.',
          realWorldExample: 'Automation scripts in data science, artificial intelligence, and backend web servers.',
          practicalTask: 'Write a Python script that accepts 3 subject marks, calculates average, and assigns grade.',
          expectedOutput: 'Working Python script executed successfully in terminal/Colab.'
        }
      }
    ]
  },
  {
    id: 'deg1-mod-5',
    number: 5,
    title: 'Digital Workplace Essentials & Touch Typing',
    purpose: 'Master speed touch typing in English & Arabic, advanced document formatting, spreadsheet management, and cybersecurity awareness.',
    icon: 'fas fa-keyboard',
    color: '#F59E0B',
    realProject: {
      title: 'Workplace Document & Data Package',
      description: 'Prepare a professional formatted report document, bilingual Arabic/English table, and automated calculation spreadsheet.'
    },
    classes: [
      {
        id: 'deg1-cls-21',
        classNum: 21,
        topic: 'English & Arabic Touch Typing Techniques',
        simpleConcept: 'Correct home row finger positioning (ASDF JKL;), typing speed drills, and switching to Arabic keyboard layout.',
        objective: 'Achieve 30+ WPM touch typing speed without looking at key labels and master Arabic typing basics.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '45 min',
          explain: 'Explain home row keys, finger placement diagram, muscle memory, and OS language input switching (Alt+Shift).',
          demonstrate: 'Demonstrate typing drills on TypingClub / Keybr; show Arabic keyboard layout on screen.',
          practice: 'Complete 15 minutes of English touch typing exercises followed by 15 minutes of Arabic keyboard navigation.',
          realWorldExample: 'Bilingual administrative jobs, content translation, and fast data entry roles.',
          practicalTask: 'Complete a 5-minute typing test in English (target >25 WPM) and type 2 Arabic paragraphs.',
          expectedOutput: 'Verified typing speed test score sheet.'
        }
      },
      {
        id: 'deg1-cls-22',
        classNum: 22,
        topic: 'Advanced MS Word Document Formatting & Indexing',
        simpleConcept: 'Styles (Heading 1, 2), Table of Contents automation, page breaks, headers/footers, and cover pages.',
        objective: 'Format long academic reports with automated Table of Contents and professional styling.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain document structure, paragraph spacing, page numbering (different first page), and reference citations.',
          demonstrate: 'Apply Heading styles to 5 sections, insert automated Table of Contents, and format header/footer.',
          practice: 'Format a raw 3-page text file into a professional document with title page, numbered sections, and TOC.',
          realWorldExample: 'College degree project reports, corporate proposals, and formal documentation.',
          practicalTask: 'Format a raw article into a structured PDF report with automated Table of Contents.',
          expectedOutput: 'Polished PDF document with automated Table of Contents.'
        }
      },
      {
        id: 'deg1-cls-23',
        classNum: 23,
        topic: 'MS Excel Data Tables, Formulas & Charts',
        simpleConcept: 'Grid navigation, basic formulas (`SUM`, `AVERAGE`, `COUNT`, `MAX`, `MIN`), formatting cells, and bar/pie charts.',
        objective: 'Create structured spreadsheet tables, apply mathematical formulas, and generate visual charts.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain relative vs absolute cell references (`$A$1`), number formatting (currency, percentage), and chart types.',
          demonstrate: 'Build a monthly budget sheet: calculate total expenses, net savings, and generate a 3D pie chart.',
          practice: 'Build a student grade sheet with 10 student rows, calculate totals/averages using formulas, and create bar graph.',
          realWorldExample: 'Financial budgeting, sales tracking, inventory management, and academic grading.',
          practicalTask: 'Create an expense log spreadsheet with automated totals, averages, and pie chart visualization.',
          expectedOutput: 'Functional Excel spreadsheet containing automated formulas and visual chart.'
        }
      },
      {
        id: 'deg1-cls-24',
        classNum: 24,
        topic: 'Cybersecurity Hygiene, Phishing & Account Safety',
        simpleConcept: 'Password managers, 2-Factor Authentication (2FA), recognizing phishing emails, secure browsing, and data backup.',
        objective: 'Implement strong digital security practices to protect online accounts and personal data.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Explain password entropy, phishing email indicators (fake URLs, urgency), HTTPS encryption, and cloud backups.',
          demonstrate: 'Inspect suspicious email headers, enable 2FA on Google account, and check password strength.',
          practice: 'Audit account security settings, enable 2FA, and identify 3 phishing email examples in a test quiz.',
          realWorldExample: 'Protecting personal banking credentials, corporate email systems, and social media channels.',
          practicalTask: 'Enable 2FA on your student Google account and complete a cybersecurity awareness quiz.',
          expectedOutput: 'Secured account status and passed cybersecurity audit quiz.'
        }
      },
      {
        id: 'deg1-cls-25',
        classNum: 25,
        topic: 'Cloud Collaboration (Google Workspace & Drive Storage)',
        simpleConcept: 'Collaborative editing on Google Docs/Sheets, setting access permissions (Viewer, Commenter, Editor), and organized Drive folders.',
        objective: 'Collaborate live with peers on cloud documents and organize digital files efficiently.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain cloud vs local storage, version history, real-time co-authoring, and share link security.',
          demonstrate: 'Create a shared Google Doc, invite student co-authors, use suggestions mode, and view revision history.',
          practice: 'Create a shared Google Sheet project log with a teammate and simultaneously enter data.',
          realWorldExample: 'Remote team collaboration in modern software companies and university group projects.',
          practicalTask: 'Create an organized Google Drive folder, share a collaborative document with peer commenter access.',
          expectedOutput: 'Shared Google Drive link with configured access permissions.'
        }
      }
    ]
  }
];

export const DEGREE_1_SPECIALIZATION_OPTIONS = [
  {
    id: 'track-video',
    title: 'Video Content Production & Reels',
    icon: 'fas fa-video',
    description: 'Focus on short-form viral editing, CapCut/Premiere timelines, audio mastering, and thumbnail graphics.',
    keySkills: ['CapCut / Premiere Pro', 'Timeline Beat Syncing', 'Auto-Captions & Motion Text', 'YouTube & Instagram Shorts Workflow'],
    portfolioDeliverable: 'A 3-video promotional reel portfolio deck uploaded to YouTube/Drive.'
  },
  {
    id: 'track-design',
    title: 'Graphic Design & Brand Identity',
    icon: 'fas fa-palette',
    description: 'Focus on Photoshop photo manipulation, Canva collateral, vector logo design, and social media branding.',
    keySkills: ['Photoshop Retouching & Cutouts', 'Canva Pro Marketing Kits', 'Illustrator Vector Logos', 'Poster Composition & Export'],
    portfolioDeliverable: 'A complete brand design kit containing poster, logo, and social media graphics.'
  },
  {
    id: 'track-web',
    title: 'Frontend Web & Coding Basics',
    icon: 'fas fa-code',
    description: 'Focus on building responsive webpages with HTML5, CSS Flexbox, JavaScript interactivity, and basic Python scripts.',
    keySkills: ['Semantic HTML5', 'CSS Flexbox & Responsive Layouts', 'JavaScript DOM Interactivity', 'Python Scripting Basics'],
    portfolioDeliverable: 'A live responsive personal portfolio webpage hosted on GitHub Pages or Vercel.'
  }
];

export const calculateDegree1Metrics = (savedProgress) => {
  let totalClasses = 0;
  let completedClasses = 0;
  let inProgressClasses = 0;

  const moduleMetrics = DEGREE_1_MODULES.map((mod) => {
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
