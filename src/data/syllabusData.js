// Unified Syllabus Architecture for Sirajul Huda Institution
// 3 Main Streams with custom portion allocation & differentiated teaching speeds:
// 1. Higher Secondary Track (+1: 50% Slow Track | +2: 100% Fast Track Full Syllabus)
// 2. Undergraduate Track (D1: 33% Foundations | D2: 66% Intermediate | D3: 100% Full Capstone)
// 3. Postgraduate Track (P1: 50% Core Architecture | P2: 100% Full Enterprise & Deployment)

export const syllabusStreams = [
  {
    id: 'stream-hs',
    streamName: 'Higher Secondary Stream',
    level: 'Higher Secondary',
    icon: 'fas fa-school',
    description: 'Foundational Digital Literacy, OS Navigation, Office Productivity, Graphic Design & AI Tools.',
    batches: ['+1', '+2']
  },
  {
    id: 'stream-ug',
    streamName: 'Undergraduate Stream',
    level: 'Undergraduate (Degree)',
    icon: 'fas fa-graduation-cap',
    description: 'Computer Science Foundations, Web Development (HTML/CSS/JS/React), Git/GitHub & Databases.',
    batches: ['degree-1', 'degree-2', 'degree-3']
  },
  {
    id: 'stream-pg',
    streamName: 'Postgraduate Stream',
    level: 'Postgraduate (PG)',
    icon: 'fas fa-user-graduate',
    description: 'Enterprise System Architecture, Full-Stack Engineering, AI API Integrations & Production Deployment.',
    batches: ['pg-1', 'pg-2']
  }
];

export const batchesData = [
  {
    id: 'foundation',
    name: 'Foundation Course',
    slug: 'foundation',
    level: 'Universal Starter Track',
    streamId: 'stream-all',
    subtitle: '1-2 Week Universal Digital Skills & System Essentials',
    description: 'Common starter track for ALL streams (+1, +2, Degree, PG). Covers PC/Laptop Hardware, Windows/Linux OS, File Explorer, Keyboard Hotkeys, Software Apps, Cyber Safety, and AI Basics.',
    portionBadge: '1-2 Week Universal Track',
    portionPercentage: 100,
    pacingTag: 'Common Foundation',
    pacingBadgeColor: '#10B981',
    targetModulesText: '6 Modules (Hardware, OS & Files, Essential Apps, Hotkeys, Cyber/AI Hygiene, Practical Lab)',
    totalClassesCount: 14,
    modules: [],
    classes: [],
    topics: [],
    progressTracking: true,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: '+1',
    name: '+1',
    slug: '+1',
    level: 'Higher Secondary',
    streamId: 'stream-hs',
    subtitle: 'Plus One Digital Foundations (Year 1)',
    description: 'First half of Higher Secondary Syllabus. Focuses on core PC confidence, file storage, typing, internet safety, MS Word, and MS Excel at a steady, hands-on pace.',
    portionBadge: '50% Syllabus (First Half)',
    portionPercentage: 50,
    pacingTag: 'Slow & Steady Pace',
    pacingBadgeColor: '#00F0FF',
    targetModulesText: 'Modules 1 to 6 (Computer Basics, Files, Typing, Internet, Word, Excel)',
    totalClassesCount: 30,
    modules: [],
    classes: [],
    topics: [],
    progressTracking: true,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: '+2',
    name: '+2',
    slug: '+2',
    level: 'Higher Secondary',
    streamId: 'stream-hs',
    subtitle: 'Plus Two Advanced Media & Tech (Year 2)',
    description: 'Second half of Higher Secondary Syllabus. Advanced creative design, PowerPoint, Canva, Photoshop, Video Editing, and AI Productivity.',
    portionBadge: '50% Syllabus (Second Half)',
    portionPercentage: 50,
    pacingTag: 'Creative & Tech Track',
    pacingBadgeColor: '#FF007A',
    targetModulesText: 'Modules 7 to 12 (PowerPoint, Canva, Photoshop, Video Editing, Web/AI Basics, AI Productivity)',
    totalClassesCount: 28,
    modules: [],
    classes: [],
    topics: [],
    progressTracking: true,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: 'degree-1',
    name: 'Degree 1st Year',
    slug: 'degree-1',
    level: 'Undergraduate',
    streamId: 'stream-ug',
    subtitle: 'Degree Phase 1: Digital Workplace & Media Engineering',
    description: 'Practical curriculum based on survey feedback: Digital Workspace, Advanced Document Publishing, Data Analysis, PowerPoint Storytelling, and Canva Visual Branding.',
    portionBadge: '5 Modules',
    portionPercentage: 100,
    pacingTag: 'Practical Workplace Track',
    pacingBadgeColor: '#7000FF',
    targetModulesText: '5 Modules (Workspace, Docs, Excel, PowerPoint, Canva Branding)',
    totalClassesCount: 25,
    modules: [],
    classes: [],
    topics: [],
    progressTracking: true,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: 'degree-2',
    name: 'Degree 2nd Year',
    slug: 'degree-2',
    level: 'Undergraduate',
    streamId: 'stream-ug',
    subtitle: 'Degree Phase 2: Graphic Design, Video & Web Foundations',
    description: 'Intermediate practical track: Photoshop Compositing, Video Editing (CapCut/Premiere), Web Dev (HTML5/CSS3), JS Interactivity, and AI Tools.',
    portionBadge: '5 Modules',
    portionPercentage: 100,
    pacingTag: 'Creative & Tech Engineering',
    pacingBadgeColor: '#00F0FF',
    targetModulesText: '5 Modules (Photoshop, Video Editing, HTML/CSS, JavaScript, AI Tools)',
    totalClassesCount: 25,
    modules: [],
    classes: [],
    topics: [],
    progressTracking: true,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: 'degree-3',
    name: 'Degree 3rd Year',
    slug: 'degree-3',
    level: 'Undergraduate',
    streamId: 'stream-ug',
    subtitle: 'Degree Phase 3: Web Apps, Analytics & Monetization',
    description: 'Degree final year track: React & Modern Web Apps, Excel Power Query Dashboards, SEO & Marketing, Freelancing (Upwork/Fiverr), and Capstone Project.',
    portionBadge: '5 Modules (Capstone Track)',
    portionPercentage: 100,
    pacingTag: 'Full Stack & Monetization',
    pacingBadgeColor: '#FFD700',
    targetModulesText: '5 Modules (React Apps, Dashboards, SEO, Freelancing, Capstone Project)',
    totalClassesCount: 25,
    modules: [],
    classes: [],
    topics: [],
    progressTracking: true,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: 'pg-1',
    name: 'PG 1st Year',
    slug: 'pg-1',
    level: 'Postgraduate',
    streamId: 'stream-pg',
    subtitle: 'PG Phase 1: Enterprise Systems & Business Analytics',
    description: 'Masters Level Phase 1: Enterprise Office Productivity, Data Science & Power BI, Corporate Digital Strategy, Cloud Solutions, and AI Business Automation.',
    portionBadge: '5 Modules',
    portionPercentage: 100,
    pacingTag: 'Enterprise Architecture',
    pacingBadgeColor: '#00F0FF',
    targetModulesText: '5 Modules (Enterprise Productivity, Power BI, Corporate Strategy, Cloud, AI Automation)',
    totalClassesCount: 25,
    modules: [],
    classes: [],
    topics: [],
    progressTracking: true,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: 'pg-2',
    name: 'PG 2nd Year',
    slug: 'pg-2',
    level: 'Postgraduate',
    streamId: 'stream-pg',
    subtitle: 'PG Phase 2: Executive Leadership & Agency Operations',
    description: 'Masters Level Phase 2: Executive IT Leadership, Advanced AI Agents, Digital Product Design, International Freelancing Agency Setup, and Master Capstone Portfolio.',
    portionBadge: '5 Modules (Mastery Track)',
    portionPercentage: 100,
    pacingTag: 'Executive Leadership & Agency',
    pacingBadgeColor: '#FF007A',
    targetModulesText: '5 Modules (Executive Leadership, AI Agents, Product Design, Agency Setup, Master Capstone)',
    totalClassesCount: 25,
    modules: [],
    classes: [],
    topics: [],
    progressTracking: true,
    completedClasses: [],
    teacherNotes: []
  }
];

export const getBatchBySlug = (slug) => {
  if (!slug) return null;
  const decodedSlug = decodeURIComponent(slug);
  return batchesData.find(b => b.slug === decodedSlug || b.id === decodedSlug) || null;
};

export const BATCH_ORDER = ['foundation', '+1', '+2', 'degree-1', 'degree-2', 'degree-3', 'pg-1', 'pg-2'];

/**
 * Checks if a user role and batch can access a given target batch syllabus.
 * - Universal Foundation Course is 100% accessible to ALL users!
 * - Teachers have access to ALL batches.
 * - Guests have access to ONLY their selected batch.
 * - Students have access to their registered batch AND all previous batches (prerequisites).
 */
export const canAccessBatch = (userRole, userBatchId, targetBatchId) => {
  if (!targetBatchId) return false;
  const normTargetBatch = (targetBatchId || '').toString().toLowerCase().trim();

  // Foundation Course is universal and accessible to everyone!
  if (normTargetBatch === 'foundation') return true;

  if (userRole === 'teacher') return true;

  const normUserBatch = (userBatchId || '').toString().toLowerCase().trim();

  if (userRole === 'guest' && normUserBatch) {
    return normUserBatch === normTargetBatch;
  }

  if (userRole === 'student' && normUserBatch) {
    const userIndex = BATCH_ORDER.map(b => b.toLowerCase()).indexOf(normUserBatch);
    const targetIndex = BATCH_ORDER.map(b => b.toLowerCase()).indexOf(normTargetBatch);
    
    if (userIndex !== -1 && targetIndex !== -1) {
      return targetIndex <= userIndex;
    }
    return normUserBatch === normTargetBatch;
  }
  return false;
};

