import { PLUS_ONE_MODULES } from './plus1SyllabusData';
import { PLUS_TWO_MODULES } from './plus2SyllabusData';
import { DEGREE_1_MODULES } from './degree1SyllabusData';
import { DEGREE_2_MODULES } from './degree2SyllabusData';
import { DEGREE_3_MODULES } from './degree3SyllabusData';
import { PG_1_MODULES } from './pg1SyllabusData';
import { PG_2_MODULES } from './pg2SyllabusData';

// Map batch slug or ID to module list and localStorage progress key
export const BATCH_MAP = {
  '+1': {
    id: '+1',
    slug: '+1',
    name: '+1 (Higher Secondary 1st Year)',
    shortName: '+1',
    level: 'Higher Secondary',
    difficulty: 'Beginner / Foundation',
    storageKey: 'syllabus_plus1_progress',
    modules: PLUS_ONE_MODULES,
    color: '#00F0FF'
  },
  'plus-1': {
    id: '+1',
    slug: '+1',
    name: '+1 (Higher Secondary 1st Year)',
    shortName: '+1',
    level: 'Higher Secondary',
    difficulty: 'Beginner / Foundation',
    storageKey: 'syllabus_plus1_progress',
    modules: PLUS_ONE_MODULES,
    color: '#00F0FF'
  },
  '+2': {
    id: '+2',
    slug: '+2',
    name: '+2 (Higher Secondary 2nd Year)',
    shortName: '+2',
    level: 'Higher Secondary',
    difficulty: 'Intermediate',
    storageKey: 'syllabus_plus2_progress',
    modules: PLUS_TWO_MODULES,
    color: '#3B82F6'
  },
  'plus-2': {
    id: '+2',
    slug: '+2',
    name: '+2 (Higher Secondary 2nd Year)',
    shortName: '+2',
    level: 'Higher Secondary',
    difficulty: 'Intermediate',
    storageKey: 'syllabus_plus2_progress',
    modules: PLUS_TWO_MODULES,
    color: '#3B82F6'
  },
  'degree-1': {
    id: 'degree-1',
    slug: 'degree-1',
    name: 'Degree 1st Year',
    shortName: 'Degree 1',
    level: 'Undergraduate',
    difficulty: 'Applied / Practical',
    storageKey: 'syllabus_degree1_progress',
    modules: DEGREE_1_MODULES,
    color: '#10B981'
  },
  'degree-2': {
    id: 'degree-2',
    slug: 'degree-2',
    name: 'Degree 2nd Year',
    shortName: 'Degree 2',
    level: 'Undergraduate',
    difficulty: 'Advanced Practical',
    storageKey: 'syllabus_degree2_progress',
    modules: DEGREE_2_MODULES,
    color: '#8B5CF6'
  },
  'degree-3': {
    id: 'degree-3',
    slug: 'degree-3',
    name: 'Degree 3rd Year',
    shortName: 'Degree 3',
    level: 'Undergraduate',
    difficulty: 'Professional / Capstone',
    storageKey: 'syllabus_degree3_progress',
    modules: DEGREE_3_MODULES,
    color: '#EC4899'
  },
  'pg-1': {
    id: 'pg-1',
    slug: 'pg-1',
    name: 'PG 1st Year',
    shortName: 'PG 1',
    level: 'Postgraduate',
    difficulty: 'Advanced Enterprise',
    storageKey: 'syllabus_pg1_progress',
    modules: PG_1_MODULES,
    color: '#F59E0B'
  },
  'pg-2': {
    id: 'pg-2',
    slug: 'pg-2',
    name: 'PG 2nd Year',
    shortName: 'PG 2',
    level: 'Postgraduate',
    difficulty: 'Mastery & Research Launch',
    storageKey: 'syllabus_pg2_progress',
    modules: PG_2_MODULES,
    color: '#6366F1'
  }
};

/**
 * Normalizes batch ID parameter and fetches configuration
 */
export const getBatchConfig = (batchIdParam) => {
  if (!batchIdParam) return null;
  const decoded = decodeURIComponent(batchIdParam).trim().toLowerCase();
  
  if (decoded === '+1' || decoded === 'plus-1' || decoded === 'plus 1') return BATCH_MAP['+1'];
  if (decoded === '+2' || decoded === 'plus-2' || decoded === 'plus 2') return BATCH_MAP['+2'];
  if (decoded === 'degree-1' || decoded === 'degree 1') return BATCH_MAP['degree-1'];
  if (decoded === 'degree-2' || decoded === 'degree 2') return BATCH_MAP['degree-2'];
  if (decoded === 'degree-3' || decoded === 'degree 3') return BATCH_MAP['degree-3'];
  if (decoded === 'pg-1' || decoded === 'pg 1') return BATCH_MAP['pg-1'];
  if (decoded === 'pg-2' || decoded === 'pg 2') return BATCH_MAP['pg-2'];
  
  return null;
};

/**
 * Enriches module data with all 13 required sections for dedicated single page views
 */
export const getModuleConfig = (batchIdParam, moduleIdParam) => {
  const batchConfig = getBatchConfig(batchIdParam);
  if (!batchConfig) return null;

  const decodedModId = decodeURIComponent(moduleIdParam || '').trim();
  const moduleRaw = batchConfig.modules.find(
    (m) => m.id === decodedModId || `mod-${m.number}` === decodedModId || m.number === Number(decodedModId)
  );

  if (!moduleRaw) return null;

  // Extract or synthesize enriched module sections
  const totalClasses = moduleRaw.classes ? moduleRaw.classes.length : 0;
  const estimatedHours = `${Math.ceil(totalClasses * 1.5)} Hours (${totalClasses} Lab Classes)`;

  // Learning Objectives
  const learningObjectives = moduleRaw.learningObjectives || (
    moduleRaw.classes
      ? moduleRaw.classes.map((cls) => cls.objective || cls.simpleConcept)
      : ['Master foundational concepts', 'Apply practical skills in hands-on tasks', 'Complete real-world projects']
  );

  // Practical Projects
  let projects = [];
  if (Array.isArray(moduleRaw.realProject)) {
    projects = moduleRaw.realProject;
  } else if (moduleRaw.realProject && typeof moduleRaw.realProject === 'object') {
    projects = [moduleRaw.realProject];
  } else {
    projects = [
      {
        title: `${moduleRaw.title} Capstone Hands-on Task`,
        description: `Students apply all topics learned in Module ${moduleRaw.number} to produce a polished deliverable.`
      }
    ];
  }

  // Real-world scenarios tailored to domain
  const realWorldExamples = moduleRaw.realWorldExamples || generateRealWorldExamples(moduleRaw.title, batchConfig.level);

  // Software & Tools
  const softwareTools = moduleRaw.softwareTools || generateSoftwareTools(moduleRaw.title);

  // Useful Website Links
  const usefulLinks = moduleRaw.usefulLinks || generateUsefulLinks(moduleRaw.title);

  // Visual References & Screenshots
  const visualReferences = moduleRaw.visualReferences || generateVisualReferences(moduleRaw.title);

  // Teacher Guide
  const teacherGuide = moduleRaw.teacherGuide || {
    introductionStrategy: `Start Module ${moduleRaw.number} with a 10-minute real-world live demonstration showing why ${moduleRaw.title} is essential in modern digital work.`,
    demonstrationSteps: [
      'Open the target software workstation on the projector.',
      'Demonstrate step-by-step workflow from basic startup to practical output.',
      'Show common beginner mistakes and how to fix them quickly.',
      'Guide students through the hands-on lab task.'
    ],
    classroomActivity: 'Pair students into buddy learning groups (driver & navigator) for hands-on practice.',
    commonMistakes: [
      'Forgetting to save files into designated project folders.',
      'Skipping keyboard shortcuts and relying only on slow menu clicks.',
      'Not reviewing output formatting before final submission.'
    ],
    simpleExplanations: [
      'Compare digital concepts to physical daily items (e.g. Folders to filing cabinets, OS to hotel manager).',
      'Focus on practical repetition rather than memorizing technical terms.'
    ],
    completionCriteria: [
      'Student can perform the task independently without teacher intervention.',
      'Student output satisfies formatting and objective guidelines.',
      'Student saves deliverable in correct lab directory.'
    ]
  };

  // Student Practice
  const studentPractice = moduleRaw.studentPractice || {
    basicExercises: moduleRaw.classes ? moduleRaw.classes.map(c => `Class ${c.classNum} Practice: ${c.teacherGuide?.practice || c.simpleConcept}`) : [],
    miniChallenges: [
      'Complete lab task within 25 minutes without asking for assistance.',
      'Help a lab partner troubleshoot a common error.',
      'Apply custom styling or formatting beyond basic lab requirements.'
    ],
    practicalTasks: moduleRaw.classes ? moduleRaw.classes.map(c => `Task ${c.classNum}: ${c.teacherGuide?.practicalTask || c.topic}`) : [],
    optionalAdvancedTask: `Build an enhanced version of the module project with custom personal elements.`
  };

  // Resources Section
  const resources = moduleRaw.resources || [
    { title: 'Official Documentation & Guides', type: 'Website', link: softwareTools[0]?.officialUrl || 'https://www.google.com' },
    { title: 'Practice Assets & Exercise Files', type: 'Templates', link: '#' },
    { title: 'Video Walkthrough Tutorials', type: 'Tutorial', link: 'https://youtube.com' },
    { title: 'Keyboard Shortcut Cheatsheet', type: 'Reference', link: '#' }
  ];

  return {
    batch: batchConfig,
    module: {
      ...moduleRaw,
      estimatedHours,
      totalClasses,
      learningObjectives,
      projects,
      realWorldExamples,
      softwareTools,
      usefulLinks,
      visualReferences,
      teacherGuide,
      studentPractice,
      resources
    }
  };
};

// Helper generator functions for rich metadata fallback
function generateRealWorldExamples(title, level) {
  const t = title.toLowerCase();
  if (t.includes('word') || t.includes('document')) {
    return [
      { category: 'School / College Work', text: 'Formatting academic research papers, assignments, and project reports with automated table of contents.' },
      { category: 'Job / Office Work', text: 'Drafting professional business letters, official memos, contracts, and company newsletters.' },
      { category: 'Freelancing / Business', text: 'Creating client resumes (CVs), proposal documents, and invoice templates for local clients.' },
      { category: 'Personal Usage', text: 'Designing personal study schedules, letters, and printable family documents.' }
    ];
  } else if (t.includes('excel') || t.includes('spreadsheet') || t.includes('data')) {
    return [
      { category: 'School / College Work', text: 'Tracking student test marks, calculating grade averages, and creating performance chart reports.' },
      { category: 'Personal Budgeting', text: 'Building a monthly personal expense tracker to monitor savings, subscriptions, and daily spend.' },
      { category: 'Job / Office Work', text: 'Managing company inventory, sales analytics, employee attendance, and payroll calculations.' },
      { category: 'Freelancing', text: 'Creating client billing spreadsheets, revenue projection models, and automated quotation sheets.' }
    ];
  } else if (t.includes('canva') || t.includes('photoshop') || t.includes('design') || t.includes('poster')) {
    return [
      { category: 'Social Media', text: 'Designing Instagram posts, story graphics, YouTube thumbnails, and LinkedIn promotional banners.' },
      { category: 'Business Marketing', text: 'Creating flyers, festival greeting posters, business cards, and product launch ads for local shops.' },
      { category: 'School Events', text: 'Designing college fest posters, sports day invitations, and club announcement flyers.' },
      { category: 'Personal Branding', text: 'Crafting personal logos, digital portfolio covers, and social media profile graphics.' }
    ];
  } else if (t.includes('video') || t.includes('capcut') || t.includes('premiere') || t.includes('editing')) {
    return [
      { category: 'Social Media Content', text: 'Editing 30-second Instagram Reels and YouTube Shorts with beat-synced cuts and kinetic subtitles.' },
      { category: 'Local Business Ads', text: 'Producing high-energy commercial promo videos for local cafes, gyms, or boutiques.' },
      { category: 'College & Events', text: 'Editing event recap trailers, fest highlights, and student club promotional videos.' },
      { category: 'Educational', text: 'Creating screen-recorded tutorial videos with voice-overs and text callouts.' }
    ];
  } else if (t.includes('web') || t.includes('html') || t.includes('react') || t.includes('coding')) {
    return [
      { category: 'Personal Portfolio', text: 'Building and publishing a personal developer portfolio website showcase.' },
      { category: 'Local Business Website', text: 'Creating a modern landing page for a local service business with contact forms.' },
      { category: 'Web Applications', text: 'Building interactive web apps like todo managers, weather dashboards, and quiz tools.' },
      { category: 'Freelance Web Design', text: 'Designing custom responsive websites for clients on Upwork/Fiverr.' }
    ];
  } else if (t.includes('ai') || t.includes('prompt')) {
    return [
      { category: 'Academic Research', text: 'Using AI assistants to summarize long research papers, draft outlines, and clarify complex concepts.' },
      { category: 'Content Creation', text: 'Generating blog post drafts, social media captions, and video scripts in seconds.' },
      { category: 'Workplace Productivity', text: 'Automating email responses, data classification, and coding assistance.' },
      { category: 'Custom AI Tools', text: 'Building custom chatbots trained on domain knowledge bases.' }
    ];
  } else {
    return [
      { category: 'School & College Work', text: 'Applying practical digital skills to complete academic coursework efficiently.' },
      { category: 'Office & Career', text: 'Utilizing modern software workstations to execute daily workplace tasks.' },
      { category: 'Personal Projects', text: 'Building digital assets, personal documentation, and creative content.' },
      { category: 'Freelancing & Business', text: 'Offering specialized digital services to clients and local businesses.' }
    ];
  }
}

function generateSoftwareTools(title) {
  const t = title.toLowerCase();
  if (t.includes('word') || t.includes('document')) {
    return [
      { name: 'Microsoft Word', icon: 'fas fa-file-word', purpose: 'Word Processing & Document Publishing', officialUrl: 'https://www.microsoft.com/en-us/microsoft-365/word', downloadUrl: 'https://www.office.com', pricing: 'Commercial / Academic Free' },
      { name: 'LibreOffice Writer', icon: 'fas fa-file-alt', purpose: 'Free Open-Source Document Editor', officialUrl: 'https://www.libreoffice.org', downloadUrl: 'https://www.libreoffice.org/download', pricing: 'Free & Open Source' },
      { name: 'Google Docs', icon: 'fab fa-google-drive', purpose: 'Cloud Document Collaboration', officialUrl: 'https://docs.google.com', downloadUrl: 'https://docs.google.com', pricing: 'Free Web App' }
    ];
  } else if (t.includes('excel') || t.includes('spreadsheet')) {
    return [
      { name: 'Microsoft Excel', icon: 'fas fa-file-excel', purpose: 'Spreadsheets & Data Analytics', officialUrl: 'https://www.microsoft.com/en-us/microsoft-365/excel', downloadUrl: 'https://www.office.com', pricing: 'Commercial / Academic Free' },
      { name: 'Google Sheets', icon: 'fas fa-table', purpose: 'Cloud Spreadsheets & Formulas', officialUrl: 'https://sheets.google.com', downloadUrl: 'https://sheets.google.com', pricing: 'Free Web App' }
    ];
  } else if (t.includes('canva')) {
    return [
      { name: 'Canva', icon: 'fas fa-palette', purpose: 'Graphic Design, Posters & Brand Kits', officialUrl: 'https://www.canva.com', downloadUrl: 'https://www.canva.com/download', pricing: 'Free Tier Available' }
    ];
  } else if (t.includes('photoshop')) {
    return [
      { name: 'Adobe Photoshop', icon: 'fas fa-image', purpose: 'Professional Photo Editing & Graphic Design', officialUrl: 'https://www.adobe.com/products/photoshop.html', downloadUrl: 'https://www.adobe.com/creativecloud/desktop-app.html', pricing: 'Commercial Subscription' },
      { name: 'GIMP', icon: 'fas fa-paint-brush', purpose: 'Free Open Source Image Editor', officialUrl: 'https://www.gimp.org', downloadUrl: 'https://www.gimp.org/downloads', pricing: 'Free & Open Source' },
      { name: 'Photopea', icon: 'fas fa-layer-group', purpose: 'Free Online Photoshop Alternative in Browser', officialUrl: 'https://www.photopea.com', downloadUrl: 'https://www.photopea.com', pricing: 'Free Web App' }
    ];
  } else if (t.includes('video') || t.includes('capcut') || t.includes('editing')) {
    return [
      { name: 'CapCut Desktop', icon: 'fas fa-video', purpose: 'Fast Video Editing, Auto Captions & Effects', officialUrl: 'https://www.capcut.com', downloadUrl: 'https://www.capcut.com/pc-download', pricing: 'Free App' },
      { name: 'Adobe Premiere Pro', icon: 'fas fa-film', purpose: 'Industry-Standard Professional Video Editing', officialUrl: 'https://www.adobe.com/products/premiere.html', downloadUrl: 'https://www.adobe.com', pricing: 'Commercial Subscription' }
    ];
  } else if (t.includes('web') || t.includes('html') || t.includes('coding') || t.includes('react')) {
    return [
      { name: 'Visual Studio Code', icon: 'fas fa-code', purpose: 'Code Editor & IDE', officialUrl: 'https://code.visualstudio.com', downloadUrl: 'https://code.visualstudio.com/download', pricing: 'Free & Open Source' },
      { name: 'Node.js', icon: 'fab fa-node-js', purpose: 'JavaScript Runtime Environment', officialUrl: 'https://nodejs.org', downloadUrl: 'https://nodejs.org/en/download', pricing: 'Free & Open Source' },
      { name: 'GitHub', icon: 'fab fa-github', purpose: 'Code Hosting & Version Control', officialUrl: 'https://github.com', downloadUrl: 'https://desktop.github.com', pricing: 'Free Tier Available' }
    ];
  } else {
    return [
      { name: 'Google Workspace', icon: 'fab fa-google', purpose: 'Cloud Productivity & Docs', officialUrl: 'https://workspace.google.com', downloadUrl: 'https://workspace.google.com', pricing: 'Free Web App' },
      { name: 'Microsoft 365', icon: 'fab fa-windows', purpose: 'Office Applications Suite', officialUrl: 'https://www.office.com', downloadUrl: 'https://www.office.com', pricing: 'Free Web / Paid Desktop' }
    ];
  }
}

function generateUsefulLinks(title) {
  const t = title.toLowerCase();
  return [
    { name: 'Official Documentation & User Manual', category: 'Documentation', url: 'https://support.microsoft.com', description: 'Official step-by-step guides and reference materials.' },
    { name: 'Interactive Practice Exercises', category: 'Practice Platform', url: 'https://www.w3schools.com', description: 'Hands-on quizzes and interactive practice modules.' },
    { name: 'Free Templates & Downloadable Assets', category: 'Templates', url: 'https://www.freepik.com', description: 'Ready-to-use templates, sample datasets, and design assets.' },
    { name: 'YouTube Video Tutorial Playlist', category: 'Tutorial', url: 'https://www.youtube.com', description: 'Curated video guides demonstrating lab tasks visually.' }
  ];
}

function generateVisualReferences(title) {
  return [
    {
      title: 'Module Workflow Architecture',
      type: 'diagram',
      description: 'Step-by-step practical progression from raw input to finished project output.',
      labels: ['Step 1: Input Setup', 'Step 2: Core Processing', 'Step 3: Styling & Refinement', 'Step 4: Project Export']
    },
    {
      title: 'Target Workstation Interface Layout',
      type: 'ui',
      description: 'Anatomy of the software workspace showing primary toolbars, panels, and shortcuts.',
      labels: ['Menu Bar & Tools', 'Primary Canvas / Workspace', 'Properties Panel', 'Timeline / Status Bar']
    },
    {
      title: 'Expected Final Project Deliverable',
      type: 'workflow',
      description: 'Visual benchmark showing how a completed 100% student submission should look.',
      labels: ['Clean Typography', 'Proper Alignment', 'Color Hierarchy', 'Verified Save Structure']
    }
  ];
}
