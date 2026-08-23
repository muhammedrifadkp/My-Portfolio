// Syllabus Data Configuration
// Designed to be future-proof for modules, classes, topics, progress tracking, completed classes, and teacher notes.

export const batchesData = [
  {
    id: '+1',
    name: '+1',
    slug: '+1',
    level: 'Higher Secondary',
    subtitle: 'Plus One Digital Skills Program',
    description: 'Practical skill development program tailored for Higher Secondary 1st Year students.',
    modules: [],
    classes: [],
    topics: [],
    progressTracking: false,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: '+2',
    name: '+2',
    slug: '+2',
    level: 'Higher Secondary',
    subtitle: 'Plus Two Digital Skills Program',
    description: 'Advanced practical skill development program for Higher Secondary 2nd Year students.',
    modules: [],
    classes: [],
    topics: [],
    progressTracking: false,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: 'degree-1',
    name: 'Degree 1st Year',
    slug: 'degree-1',
    level: 'Undergraduate',
    subtitle: 'Bachelors 1st Year Digital Skills Program',
    description: 'Foundational computer science and software development syllabus for first-year degree undergraduates.',
    modules: [],
    classes: [],
    topics: [],
    progressTracking: false,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: 'degree-2',
    name: 'Degree 2nd Year',
    slug: 'degree-2',
    level: 'Undergraduate',
    subtitle: 'Bachelors 2nd Year Digital Skills Program',
    description: 'Intermediate full-stack engineering and digital tools program for second-year degree undergraduates.',
    modules: [],
    classes: [],
    topics: [],
    progressTracking: false,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: 'degree-3',
    name: 'Degree 3rd Year',
    slug: 'degree-3',
    level: 'Undergraduate',
    subtitle: 'Bachelors 3rd Year Digital Skills Program',
    description: 'Advanced industry-level web development, cloud, and project capstone syllabus for third-year degree undergraduates.',
    modules: [],
    classes: [],
    topics: [],
    progressTracking: false,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: 'pg-1',
    name: 'PG 1st Year',
    slug: 'pg-1',
    level: 'Postgraduate',
    subtitle: 'Masters 1st Year Digital Skills Program',
    description: 'Advanced postgraduate software engineering, architecture, and practical digital skills program.',
    modules: [],
    classes: [],
    topics: [],
    progressTracking: false,
    completedClasses: [],
    teacherNotes: []
  },
  {
    id: 'pg-2',
    name: 'PG 2nd Year',
    slug: 'pg-2',
    level: 'Postgraduate',
    subtitle: 'Masters 2nd Year Digital Skills Program',
    description: 'Mastery-level digital skills, enterprise software architecture, and research project syllabus for PG final year.',
    modules: [],
    classes: [],
    topics: [],
    progressTracking: false,
    completedClasses: [],
    teacherNotes: []
  }
];

export const getBatchBySlug = (slug) => {
  if (!slug) return null;
  // Decode URL parameter if encoded
  const decodedSlug = decodeURIComponent(slug);
  return batchesData.find(b => b.slug === decodedSlug || b.id === decodedSlug) || null;
};
