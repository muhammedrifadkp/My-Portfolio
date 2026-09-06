import { MODULE_0_FOUNDATION } from './foundationSyllabusData';

export const DEGREE_2_MODULES = [
  MODULE_0_FOUNDATION,
  {
    id: 'deg2-mod-1',
    number: 1,
    title: 'Photoshop Practical Design & Compositing',
    purpose: 'Master advanced Photoshop techniques, layers, photo retouching, background removal, digital posters, and thumbnail compositing.',
    icon: 'fas fa-paint-brush',
    color: '#00F0FF',
    realProject: {
      title: 'Commercial Product Poster & Composite Graphic',
      description: 'Students blend multiple images, apply lighting effects, color matching, shadows, and typography to create a commercial brand poster.'
    },
    classes: [
      {
        id: 'deg2-cls-1',
        classNum: 1,
        topic: 'Photoshop Layer Selection & Advanced Cutouts',
        simpleConcept: 'Using Pen tool, Object Selection, and Select Subject for pixel-precise subject isolation.',
        objective: 'Extract complex subjects cleanly from busy backgrounds.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain edge refinement, anti-aliasing, and mask feathering.',
          demonstrate: 'Isolate a model/product with hair details using Select & Mask workspace.',
          practice: 'Extract 2 product images and place them on transparent backgrounds.',
          realWorldExample: 'E-commerce product catalog design and banner ads.',
          practicalTask: 'Extract a product image cleanly and save as transparent PNG.',
          expectedOutput: 'Clean cutout PNG with sharp edges.'
        }
      },
      {
        id: 'deg2-cls-2',
        classNum: 2,
        topic: 'Photo Retouching, Healing & Color Correction',
        simpleConcept: 'Removing unwanted blemishes, skin smoothing, Spot Healing Brush, and Curves/Levels adjustments.',
        objective: 'Retouch portrait photographs and adjust lighting exposure.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain frequency separation basics, exposure histogram, and adjustment layers.',
          demonstrate: 'Retouch a portrait using Spot Healing tool and adjust Curves for vibrant tones.',
          practice: 'Fix 1 underexposed portrait photo and remove background objects.',
          realWorldExample: 'Fashion magazine photo editing and portrait retouching.',
          practicalTask: 'Retouch a sample portrait photo and correct color balance.',
          expectedOutput: 'Polished portrait photo with clean skin and balanced lighting.'
        }
      },
      {
        id: 'deg2-cls-3',
        classNum: 3,
        topic: 'Layer Blending Modes, Shadows & Compositing',
        simpleConcept: 'Combining separate images seamlessly using Multiply, Screen, Overlay, and realistic drop shadows.',
        objective: 'Composite subjects into new background scenes with realistic lighting.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain blend mode categories (darken, lighten, contrast) and manual drop shadow painting.',
          demonstrate: 'Place a shoe product into a neon street scene, match color tone, and draw ground shadows.',
          practice: 'Composite a sports product into an outdoor stadium background.',
          realWorldExample: 'Movie poster designs and high-end advertising composites.',
          practicalTask: 'Create a composite graphic placing a product into an artificial background scene.',
          expectedOutput: 'Realistic image composite with matched lighting and shadows.'
        }
      },
      {
        id: 'deg2-cls-4',
        classNum: 4,
        topic: 'Typography, Vector Shapes & Poster Design',
        simpleConcept: 'Combining text hierarchy, font pairs, vector shapes, and smart objects for poster layouts.',
        objective: 'Design promotional event posters and marketing banners.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain font pairing rules, alignment grid, text wrap, and contrast.',
          demonstrate: 'Design a concert poster with bold header text, event details, and graphics.',
          practice: 'Create a workshop banner with 3 text levels and logo graphic.',
          realWorldExample: 'Music festival posters and social media event graphics.',
          practicalTask: 'Design a 1080x1350 Instagram promotional event poster.',
          expectedOutput: 'High-quality event poster PSD and JPEG.'
        }
      },
      {
        id: 'deg2-cls-5',
        classNum: 5,
        topic: 'YouTube Thumbnails & Social Media Visuals',
        simpleConcept: 'Designing high CTR (Click-Through Rate) YouTube thumbnails with glowing effects and bold titles.',
        objective: 'Produce eye-catching thumbnails optimized for mobile and desktop screens.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain CTR psychology, face expression emphasis, stroke outline, and color contrast.',
          demonstrate: 'Create a YouTube tech review thumbnail with cutouts, outer glow, and large text.',
          practice: 'Design 1 YouTube thumbnail for a gaming or tech vlog.',
          realWorldExample: 'Viral YouTube video thumbnails driving millions of views.',
          practicalTask: 'Create a 1280x720 YouTube video thumbnail with glowing cutout and title.',
          expectedOutput: 'High-contrast 1280x720 YouTube thumbnail.'
        }
      }
    ]
  },
  {
    id: 'deg2-mod-2',
    number: 2,
    title: 'Professional Video Editing & Motion Content Creation',
    purpose: 'Master CapCut Desktop & Premiere Pro basics, multi-track timeline editing, speed ramping, transitions, auto-captions, and viral short-form video production.',
    icon: 'fas fa-video',
    color: '#3B82F6',
    realProject: {
      title: '60-Second Promotional Short Reel',
      description: 'Students edit a vertical commercial reel with beat syncing, animated text overlays, color grading, and auto-captions.'
    },
    classes: [
      {
        id: 'deg2-cls-6',
        classNum: 6,
        topic: 'Video Editing Interface & Multi-Track Timelines',
        simpleConcept: 'Understanding 1080p/4K resolution, 9:16 vertical reels format, media bin organization, and timeline tracks.',
        objective: 'Set up vertical video projects and organize raw footage.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain sequence settings, frame rates (24fps vs 60fps), and timeline tracks.',
          demonstrate: 'Launch CapCut Desktop/Premiere, import media, set 9:16 ratio, and arrange clips.',
          practice: 'Import 4 video clips and 1 audio track into timeline.',
          realWorldExample: 'Creating Instagram Reels, YouTube Shorts, and TikTok ads.',
          practicalTask: 'Create a 1080x1920 vertical video sequence with 4 clips.',
          expectedOutput: 'Organized video timeline ready for editing.'
        }
      },
      {
        id: 'deg2-cls-7',
        classNum: 7,
        topic: 'Precision Trimming, Speed Ramping & Beat Syncing',
        simpleConcept: 'Cutting unwanted footage, smooth speed curves (fast-forward to slow-mo), and matching cuts to music beat.',
        objective: 'Create dynamic video pacing synced to background music rhythm.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain speed ramping curves, optical flow smooth slow-motion, and beat markers.',
          demonstrate: 'Apply speed ramp curve to a sports clip and snap cuts on music bass drops.',
          practice: 'Sync 4 action clips to background audio beat.',
          realWorldExample: 'Fast-paced travel vlogs and fitness promo reels.',
          practicalTask: 'Sync a 15-second promo video to background music beats with 1 slow-mo speed ramp.',
          expectedOutput: 'Dynamic beat-synced short video.'
        }
      },
      {
        id: 'deg2-cls-8',
        classNum: 8,
        topic: 'Auto-Captions, Text Animations & Animated Titles',
        simpleConcept: 'Generating speech-to-text automated captions, text highlight colors, and lower third titles.',
        objective: 'Add readable, animated text and speech captions to videos.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain caption font readability, yellow/cyan pop colors, and lower thirds.',
          demonstrate: 'Run auto-caption generator, format font style, and add speaker title.',
          practice: 'Generate captions for a 30-second speaking video clip.',
          realWorldExample: 'Social media reels designed for sound-off viewing.',
          practicalTask: 'Add animated title card and auto-captions to a 30-second voiceover reel.',
          expectedOutput: 'Accurate, stylized video reel with animated captions.'
        }
      },
      {
        id: 'deg2-cls-9',
        classNum: 9,
        topic: 'Transitions, Keyframe Zoom & Masking Effects',
        simpleConcept: 'Applying whip zoom transitions, animating scale/position with keyframes, and video masking.',
        objective: 'Apply smooth camera transitions and keyframe motion effects.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain keyframe start/end values, smooth motion easing, and mask reveals.',
          demonstrate: 'Add whip zoom transition and keyframe a digital zoom into subject face.',
          practice: 'Apply 2 transitions and 1 keyframe zoom effect.',
          realWorldExample: 'High-energy commercial promos and YouTube video intros.',
          practicalTask: 'Create a video intro with keyframe zoom and transition effect.',
          expectedOutput: 'Smooth animated video with keyframed motion.'
        }
      },
      {
        id: 'deg2-cls-10',
        classNum: 10,
        topic: 'Audio Ducking, Sound FX & Color Grading',
        simpleConcept: 'Lowering background music during voiceover (ducking), adding sound FX (whoosh, pop), and color filters.',
        objective: 'Balance audio tracks and apply color grading for cinema look.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain audio dB levels (-12dB speech, -24dB music), sound FX placement, and LUT color filters.',
          demonstrate: 'Duck music behind voiceover, insert whoosh sound on transition, and color grade clips.',
          practice: 'Balance voiceover with music and apply 1 color grade filter.',
          realWorldExample: 'Professional brand commercials and documentary filmmaking.',
          practicalTask: 'Export a finished 60-second vertical promotional video reel in 1080p HD.',
          expectedOutput: 'Final MP4 vertical reel ready for publishing.'
        }
      }
    ]
  },
  {
    id: 'deg2-mod-3',
    number: 3,
    title: 'Web Development Foundations (HTML5 & CSS3 Layouts)',
    purpose: 'Learn semantic HTML5 structure, CSS styling, box model, Flexbox layout system, CSS Grid, and building responsive web pages.',
    icon: 'fas fa-code',
    color: '#10B981',
    realProject: {
      title: 'Responsive Multi-Page Personal Portfolio Website',
      description: 'Students code a responsive personal website with homepage, about section, project gallery, and contact form.'
    },
    classes: [
      {
        id: 'deg2-cls-11',
        classNum: 11,
        topic: 'HTML5 Semantic Structure, Tags & Page Blueprint',
        simpleConcept: 'Using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` instead of plain divs.',
        objective: 'Construct accessible, SEO-friendly HTML web pages.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain document outline, semantic tag SEO value, headings (`h1`-`h6`), and list structures.',
          demonstrate: 'Build index.html boilerplate with semantic header, main section, and footer.',
          practice: 'Create a profile webpage with header title, paragraph bio, and skills list.',
          realWorldExample: 'Standard web document architecture across professional websites.',
          practicalTask: 'Create `index.html` with semantic structure for a personal bio page.',
          expectedOutput: 'Valid HTML5 semantic document.'
        }
      },
      {
        id: 'deg2-cls-12',
        classNum: 12,
        topic: 'CSS Styling, Box Model, Typography & Colors',
        simpleConcept: 'Understanding margin, border, padding, content height/width, Google Fonts, and HSL/HEX color palettes.',
        objective: 'Apply custom CSS styles, fonts, and box spacing.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain box-sizing: border-box, font-family imports, line-height, and CSS color codes.',
          demonstrate: 'Style a text card with rounded borders, Google Font Outfit, padding, and subtle shadow.',
          practice: 'Style 3 feature cards with custom background colors and font styling.',
          realWorldExample: 'Modern visual aesthetics in web design.',
          practicalTask: 'Create `style.css` and format headings, paragraph cards, and buttons.',
          expectedOutput: 'Visually appealing styled HTML page.'
        }
      },
      {
        id: 'deg2-cls-13',
        classNum: 13,
        topic: 'CSS Flexbox Layout System & Alignment',
        simpleConcept: 'Using `display: flex`, `flex-direction`, `justify-content`, `align-items`, and `gap` for responsive alignment.',
        objective: 'Build navbar headers and card grids using Flexbox.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain main axis vs cross axis, space-between, center alignment, and flex-wrap.',
          demonstrate: 'Build a responsive navigation header with logo on left and links on right.',
          practice: 'Construct a 3-column pricing table using Flexbox.',
          realWorldExample: 'Navbar layouts and horizontal content rows across major websites.',
          practicalTask: 'Build a flexbox navigation header and 3-card features section.',
          expectedOutput: 'Clean flexbox layout webpage.'
        }
      },
      {
        id: 'deg2-cls-14',
        classNum: 14,
        topic: 'CSS Grid & Responsive Media Queries',
        simpleConcept: 'Using `display: grid`, `grid-template-columns`, `minmax()`, and `@media` queries for mobile responsiveness.',
        objective: 'Create 2D responsive webpage layouts adapting to mobile screens.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain 2D grid placement, mobile-first design, and screen breakpoint media queries.',
          demonstrate: 'Build a responsive project grid that changes from 3 columns on desktop to 1 column on mobile.',
          practice: 'Add media query to collapse navbar on screens smaller than 768px.',
          realWorldExample: 'Responsive web applications viewable seamlessly on phones and desktops.',
          practicalTask: 'Create a 3-column image gallery that becomes 1-column on mobile screens.',
          expectedOutput: 'Fully responsive mobile-friendly webpage layout.'
        }
      },
      {
        id: 'deg2-cls-15',
        classNum: 15,
        topic: 'Web Hosting, GitHub Pages & Live Website Deployment',
        simpleConcept: 'Pushing code to GitHub repository and hosting live website using GitHub Pages or Vercel.',
        objective: 'Publish personal website code live on the internet with custom link.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain web servers, static hosting, GitHub web interface, and live domain URLs.',
          demonstrate: 'Upload project repository to GitHub, enable GitHub Pages, and open live website URL.',
          practice: 'Deploy personal HTML portfolio page live on GitHub Pages.',
          realWorldExample: 'Publishing client websites and online portfolios.',
          practicalTask: 'Deploy student portfolio website live and verify URL on mobile phone.',
          expectedOutput: 'Live HTTPS website link.'
        }
      }
    ]
  },
  {
    id: 'deg2-mod-4',
    number: 4,
    title: 'JavaScript & Interactive Web UI Basics',
    purpose: 'Master core JavaScript programming fundamentals, variables, functions, DOM manipulation, click events, and dynamic webpage interactivity.',
    icon: 'fas fa-terminal',
    color: '#8B5CF6',
    realProject: {
      title: 'Interactive Web Tool (Task Manager / Quiz App)',
      description: 'Students program a dynamic JavaScript application with user input, interactive state updates, and dynamic DOM rendering.'
    },
    classes: [
      {
        id: 'deg2-cls-16',
        classNum: 16,
        topic: 'JavaScript Basics: Variables, Data Types & Console',
        simpleConcept: 'Using `let`, `const`, strings, numbers, booleans, arrays, objects, and browser Developer Tools (`console.log`).',
        objective: 'Write basic JavaScript scripts and log outputs in browser console.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain JS role in web stack, `const` vs `let`, data types, and console inspection.',
          demonstrate: 'Open browser console, declare variables, create array of student names, and output values.',
          practice: 'Declare 3 variables and create an object representing a product.',
          realWorldExample: 'Storing user inputs and session data in web apps.',
          practicalTask: 'Write a script defining student variables and output message to browser console.',
          expectedOutput: 'Working console output script.'
        }
      },
      {
        id: 'deg2-cls-17',
        classNum: 17,
        topic: 'Functions, Conditions (If/Else) & Event Listeners',
        simpleConcept: 'Creating reusable functions, conditional logic, and responding to button clicks with `addEventListener`.',
        objective: 'Add interactive click handlers to webpage elements.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain function parameters, return values, `if`/`else` decisions, and click event listeners.',
          demonstrate: 'Create a button that triggers a function to display a popup message when clicked.',
          practice: 'Build a button that changes text message based on counter count.',
          realWorldExample: 'Interactive form submit buttons and modal popups.',
          practicalTask: 'Create an interactive button that toggles message state on click.',
          expectedOutput: 'Working click event listener webpage.'
        }
      },
      {
        id: 'deg2-cls-18',
        classNum: 18,
        topic: 'DOM Manipulation: Changing Text, Styles & Classes',
        simpleConcept: 'Using `document.querySelector`, `.textContent`, `.style`, and `.classList.toggle` to dynamically alter web elements.',
        objective: 'Manipulate HTML elements dynamically using JavaScript DOM methods.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Document Object Model (DOM), selecting elements, modifying text, and toggling CSS classes.',
          demonstrate: 'Build a Dark Mode toggle button that switches page background color and text.',
          practice: 'Build a button that changes heading text and text color on click.',
          realWorldExample: 'Dark Mode toggles and dynamic UI theme switches.',
          practicalTask: 'Build a functional Dark Mode / Light Mode toggle for a webpage.',
          expectedOutput: 'Working theme toggle webpage.'
        }
      },
      {
        id: 'deg2-cls-19',
        classNum: 19,
        topic: 'Form Handling & Dynamic Input Reading',
        simpleConcept: 'Reading user input values from `<input>` fields, validating inputs, and rendering dynamic list items.',
        objective: 'Process user form entries and display generated content dynamically.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain `input.value`, `e.preventDefault()`, input validation, and creating HTML elements dynamically (`createElement`).',
          demonstrate: 'Build a simple To-Do List app where typing a task and clicking "Add" inserts a new list item.',
          practice: 'Create a calculator tool that takes 2 numbers from inputs and displays sum.',
          realWorldExample: 'Comment sections, search bars, and task management apps.',
          practicalTask: 'Build an interactive To-Do List web app where users can add and remove tasks.',
          expectedOutput: 'Working interactive To-Do List web application.'
        }
      },
      {
        id: 'deg2-cls-20',
        classNum: 20,
        topic: 'API Data Fetching (`fetch` & Async JS Intro)',
        simpleConcept: 'Fetching live data from external APIs using `fetch()` and displaying dynamic API information on screen.',
        objective: 'Retrieve live web API data and render dynamic UI elements.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain JSON data format, HTTP GET requests, `fetch()`, `.then()`, and async data rendering.',
          demonstrate: 'Fetch a random quote or weather data from a free public API and display it inside a card.',
          practice: 'Fetch user data from JSONPlaceholder API and display names in a list.',
          realWorldExample: 'Live weather widgets, news feeds, and live stock prices.',
          practicalTask: 'Build a live Quote Generator web app fetching data from an external API.',
          expectedOutput: 'Working live API fetch web application.'
        }
      }
    ]
  },
  {
    id: 'deg2-mod-5',
    number: 5,
    title: 'AI Tools & AI Productivity Mastery',
    purpose: 'Master generative AI tools (ChatGPT, Claude, Midjourney/DALL-E), prompt engineering, AI coding assistants, and automated workflow productivity.',
    icon: 'fas fa-robot',
    color: '#EC4899',
    realProject: {
      title: 'AI-Powered Digital Content & Automation Workflow',
      description: 'Students generate complete brand strategy, marketing copy, AI graphics, and web code using AI prompt engineering.'
    },
    classes: [
      {
        id: 'deg2-cls-21',
        classNum: 21,
        topic: 'Generative AI Overview & Prompt Engineering Techniques',
        simpleConcept: 'Understanding LLMs (ChatGPT, Claude), role prompting, system instructions, and chain-of-thought prompting.',
        objective: 'Formulate precise AI prompts to get accurate, high-quality responses.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain prompt structure: Role + Task + Context + Format Constraints.',
          demonstrate: 'Prompt ChatGPT as a Senior Copywriter to draft 5 viral headlines with specific guidelines.',
          practice: 'Write a prompt asking AI to summarize a complex article into 3 bullet points.',
          realWorldExample: 'Accelerating content writing and business communication with AI.',
          practicalTask: 'Write structured prompts to generate a 5-day social media content plan.',
          expectedOutput: 'Structured AI prompt template and generated content.'
        }
      },
      {
        id: 'deg2-cls-22',
        classNum: 22,
        topic: 'AI Image Generation & Visual Prompting (DALL-E / Midjourney)',
        simpleConcept: 'Generating custom AI art, stock photos, and logos by writing descriptive visual prompts.',
        objective: 'Create original visual art and marketing graphics using AI image generators.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain image prompt keywords: lighting, style, camera angle, aspect ratio, and artistic medium.',
          demonstrate: 'Generate a futuristic product image using DALL-E/Bing Image Creator with custom prompt styling.',
          practice: 'Generate 2 AI images for a sports brand concept.',
          realWorldExample: 'Concept art, website hero images, and advertising illustration.',
          practicalTask: 'Generate 3 high-resolution AI product images using descriptive text prompts.',
          expectedOutput: 'Generated high-quality AI images.'
        }
      },
      {
        id: 'deg2-cls-23',
        classNum: 23,
        topic: 'AI Code Generation & Web Development Assistants',
        simpleConcept: 'Using AI tools (ChatGPT, GitHub Copilot, V0.dev) to generate HTML/CSS/JS code, debug errors, and refactor code.',
        objective: 'Accelerate web development using AI coding assistants.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain AI coding capabilities, prompt-driven UI generation, and code review.',
          demonstrate: 'Ask ChatGPT to generate a responsive CSS navigation bar with dropdown menus, then fix a bug.',
          practice: 'Use AI assistant to write a JavaScript countdown timer function.',
          realWorldExample: 'Rapid prototyping and automated debugging in modern software engineering.',
          practicalTask: 'Use AI assistant to generate and debug a custom HTML/CSS pricing card widget.',
          expectedOutput: 'Working HTML/CSS code generated with AI assistance.'
        }
      },
      {
        id: 'deg2-cls-24',
        classNum: 24,
        topic: 'AI Productivity for Documents, Summaries & Research',
        simpleConcept: 'Using AI to summarize PDFs, extract key insights, draft professional emails, and create presentation outlines.',
        objective: 'Utilize AI tools to automate daily academic and workplace document tasks.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain document upload analysis, data extraction, and executive summary creation.',
          demonstrate: 'Upload a 10-page research PDF to AI tool, extract 5 key takeaways, and draft executive email.',
          practice: 'Summarize a news report into a 2-paragraph executive brief using AI.',
          realWorldExample: 'Corporate research synthesis and executive communication.',
          practicalTask: 'Generate an executive project report summary and presentation outline using AI.',
          expectedOutput: 'Polished executive report and presentation outline.'
        }
      },
      {
        id: 'deg2-cls-25',
        classNum: 25,
        topic: 'Ethical AI Usage, Copyright & Capstone Presentation',
        simpleConcept: 'Understanding AI ethics, plagiarism prevention, fact-checking AI hallucinations, and presenting AI projects.',
        objective: 'Apply ethical AI guidelines and deliver final project demo.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain AI hallucinations, verifying sources, copyright considerations, and human oversight.',
          demonstrate: 'Review AI generated text for factual errors and refine for human tone.',
          practice: 'Verify 3 facts generated by AI against reliable web sources.',
          realWorldExample: 'Responsible AI adoption in business, journalism, and education.',
          practicalTask: 'Present final Degree 2nd Year digital project to classroom using live demo.',
          expectedOutput: 'Completed project presentation and live demonstration.'
        }
      }
    ]
  }
];

export const DEGREE_2_SPECIALIZATION_OPTIONS = [
  {
    id: 'track-design',
    title: 'Photoshop Design & Graphic Media',
    icon: 'fas fa-paint-brush',
    description: 'Master photo retouching, image compositing, poster typography, thumbnail design, and commercial branding graphics.',
    keySkills: ['Photoshop Compositing', 'Layer Masks & Cutouts', 'Color Correction', 'Poster & Banner Layouts'],
    portfolioDeliverable: 'A commercial product composite poster and 3 social media event banners.'
  },
  {
    id: 'track-video',
    title: 'Commercial Video & Reel Production',
    icon: 'fas fa-video',
    description: 'Master vertical short-form reel editing, speed ramping, beat syncing, auto-captions, sound design, and color grading.',
    keySkills: ['CapCut & Premiere Pro', 'Beat Syncing & Trimming', 'Auto-Captions & Titles', 'Color Grading & Sound FX'],
    portfolioDeliverable: 'A 60-second polished vertical commercial promo reel in 1080p HD.'
  },
  {
    id: 'track-web',
    title: 'Web Foundations & Interactivity',
    icon: 'fas fa-code',
    description: 'Master semantic HTML5, CSS Flexbox/Grid, responsive web design, JavaScript DOM interactivity, and live GitHub deployment.',
    keySkills: ['HTML5 & CSS3 Layouts', 'Flexbox & Grid', 'JavaScript DOM Interactivity', 'Live GitHub Deployment'],
    portfolioDeliverable: 'A live responsive portfolio website hosted on GitHub Pages with interactive JS apps.'
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
