// Complete +2 Digital Skills Syllabus Data Structure (Development / Intermediate Level)
// Philosophy: LEARN -> PRACTICE -> CREATE -> PUBLISH -> BUILD PORTFOLIO

export const PLUS_TWO_MODULES = [
  {
    id: 'mod-p2-1',
    number: 1,
    title: 'Professional Digital Workspace & Cloud Productivity',
    purpose: 'Master professional cloud workspace management, Google Workspace co-authoring, document formatting, and advanced PDF workflows.',
    icon: 'fas fa-briefcase',
    color: '#2563EB',
    realProject: {
      title: 'Create a Professional Student Digital Workspace',
      description: 'Students build a cloud-synced Google Drive/Local directory tree with standardized naming conventions (YYYY-MM-DD), templates, and automated backups.'
    },
    classes: [
      {
        id: 'p2-cls-1',
        classNum: 1,
        topic: 'Professional File & Folder Architecture',
        simpleConcept: 'Organizing files like a professional software engineer or media producer.',
        objective: 'Establish industry-standard folder hierarchies, versioning (v1, v2_FINAL), and naming conventions.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Why "final_final2.docx" is bad. Teach ISO Date naming (YYYY-MM-DD_Project_v01) and project root structures.',
          demonstrate: 'Building a clean `2026_Media_Projects` directory tree with Assets, Exports, Drafts, and Documentation subfolders.',
          practice: 'Re-organize a cluttered downloads folder into structured project sub-folders.',
          realWorldExample: 'Media production houses managing 500GB+ of film assets and corporate client files.',
          practicalTask: 'Create a root folder `PlusTwo_Digital_Portfolio` with subfolders for Design, Video, Code, and Certificates.',
          expectedOutput: 'Standardized project directory tree verified by teacher.'
        }
      },
      {
        id: 'p2-cls-2',
        classNum: 2,
        topic: 'Google Workspace Ecosystem (Docs, Sheets, Slides)',
        simpleConcept: 'Collaborating live with team members on online documents without emailing files back and forth.',
        objective: 'Master real-time co-authoring, version history restoration, and cloud commenting in Google Workspace.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Real-time multi-user editing. Share settings (Viewer, Commenter, Editor). Accessing Version History.',
          demonstrate: 'Inviting 2 students to edit the same Google Doc simultaneously and restoring an older revision.',
          practice: 'Create a shared Google Doc with 2 lab partners and co-author a project proposal.',
          realWorldExample: 'Modern remote tech teams collaborating live across Dubai, India, and USA.',
          practicalTask: 'Create a Google Doc, share with lab partner as Editor, resolve 2 inline comments.',
          expectedOutput: 'Co-authored Google Doc with comment history.'
        }
      },
      {
        id: 'p2-cls-3',
        classNum: 3,
        topic: 'Advanced PDF Handling, Merging & Compression',
        simpleConcept: 'Combining 5 PDFs into 1 document, reducing file size for web uploads, and digital signing.',
        objective: 'Manipulate PDF files: merge, split, compress, convert, and insert digital signatures.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Why PDF is the universal business standard. PDF compression techniques without quality loss.',
          demonstrate: 'Merging 3 separate assignment PDFs into 1 master PDF and compressing from 15MB to 2MB.',
          practice: 'Take 3 sample PDFs, merge into single document, compress to under 2MB.',
          realWorldExample: 'Submitting passport, marks card, and photo in a single compressed PDF on college admission portals.',
          practicalTask: 'Merge 3 PDF pages into one file named `Full_Application_2026.pdf` compressed under 2MB.',
          expectedOutput: 'Merged and compressed single PDF document under 2MB.'
        }
      },
      {
        id: 'p2-cls-4',
        classNum: 4,
        topic: 'Digital Troubleshooting & Cloud Backup Rules',
        simpleConcept: 'Fixing common computer glitches and setting up automatic cloud backup folders.',
        objective: 'Diagnose network connection issues, clear browser cache, and configure automated cloud folder sync.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: '3-2-1 Backup Rule: 3 copies of data, 2 different storage types, 1 offsite cloud copy.',
          demonstrate: 'Configuring Google Drive for Desktop auto-sync and clearing browser cookies/cache.',
          practice: 'Configure cloud sync folder and clear browser cache on lab computer.',
          realWorldExample: 'Preventing data loss when a computer hard drive crashes before exam submission.',
          practicalTask: 'Set up an auto-sync portfolio folder in Google Drive and verify sync status icon.',
          expectedOutput: 'Cloud-synced folder verified on lab computer.'
        }
      }
    ]
  },
  {
    id: 'mod-p2-2',
    number: 2,
    title: 'Intermediate MS Word & Document Publishing',
    purpose: 'Master multi-page document design, table of contents, cover pages, headers/footers, and professional CV writing.',
    icon: 'fas fa-file-alt',
    color: '#0284C7',
    realProject: {
      title: 'Professional Multi-Page Report & Resume Package',
      description: 'Students build a 1-page modern CV/Resume and a 3-page formal report featuring cover page, table of contents, and header/footers.'
    },
    classes: [
      {
        id: 'p2-cls-5',
        classNum: 5,
        topic: 'Headers, Footers, Page Numbers & Cover Pages',
        simpleConcept: 'Adding professional top/bottom margins with page numbers and custom cover pages.',
        objective: 'Insert different Headers/Footers, page numbering (`Page X of Y`), and pre-designed Cover Pages.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Different First Page rule (hiding header/footer on title cover page). Page number formatting.',
          demonstrate: 'Inserting a Cover Page template, setting `Page X of Y` in footer, and enabling "Different First Page".',
          practice: 'Create a 3-page document with a title cover page and numbered headers/footers.',
          realWorldExample: 'Publishing formal company annual reports and college project documentation.',
          practicalTask: 'Add a Cover Page, Header with document title, and Footer with `Page X of Y` numbering.',
          expectedOutput: '3-page document with cover page and page numbers.'
        }
      },
      {
        id: 'p2-cls-6',
        classNum: 6,
        topic: 'Automated Table of Contents & Headings Styles',
        simpleConcept: 'Using Heading 1 and Heading 2 styles so Word generates an instant clickable Table of Contents.',
        objective: 'Apply Heading Styles (Heading 1, 2, 3) and generate an automated Table of Contents.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Why manually typing dots for page numbers is bad! Styles tab allows instant 1-click Table of Contents.',
          demonstrate: 'Applying Heading 1 to section titles and inserting Table of Contents from References tab.',
          practice: 'Apply styles to a 4-section report and generate a dynamic Table of Contents.',
          realWorldExample: 'Structuring long textbooks, research papers, and business proposals.',
          practicalTask: 'Apply Heading 1 styles across 3 report sections and insert an automated Table of Contents.',
          expectedOutput: 'Document with clickable dynamic Table of Contents.'
        }
      },
      {
        id: 'p2-cls-7',
        classNum: 7,
        topic: 'Section Breaks, Columns & Mail Merge',
        simpleConcept: 'Creating multi-column newspaper layouts and generating personalized certificates automatically.',
        objective: 'Insert Section Breaks, 2-column page layouts, and execute Mail Merge to generate multi-person letters.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Section Breaks vs Page Breaks. Mail Merge concept: Connecting Excel contact list to Word letter template.',
          demonstrate: 'Creating a 2-column newsletter section and performing Mail Merge for 5 student certificates.',
          practice: 'Format a 2-column article section and practice Mail Merge for 3 recipient letters.',
          realWorldExample: 'Printing 500 personalized exam hall tickets or wedding invitations in 1 click.',
          practicalTask: 'Perform Mail Merge using an Excel recipient list to generate 3 customized award letters.',
          expectedOutput: '3 mail-merged customized letters saved as single document.'
        }
      },
      {
        id: 'p2-cls-8',
        classNum: 8,
        topic: 'Real Project: Professional CV / Resume Creation',
        simpleConcept: 'Designing a modern 1-page CV/Resume with clear section dividers, skills, and PDF export.',
        objective: 'Combine multi-column layout, bullet points, font hierarchy, and export print-ready PDF.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Resume Structure: Header -> Career Objective -> Education -> Digital Skills -> Projects -> Languages.',
          demonstrate: 'Designing a clean 1-page modern Resume template in Word and exporting PDF.',
          practice: 'Students complete their personal professional Resume document.',
          realWorldExample: 'Applying for job openings, internships, and higher education admissions.',
          practicalTask: 'Complete your 1-page professional CV and export as `Student_Resume_2026.pdf`.',
          expectedOutput: 'Finished professional PDF Resume file.'
        }
      }
    ]
  },
  {
    id: 'mod-p2-3',
    number: 3,
    title: 'Intermediate MS Excel & Data Analysis',
    purpose: 'Master data management: IF logical functions, sorting, multi-level filtering, conditional formatting, and analytical dashboards.',
    icon: 'fas fa-chart-line',
    color: '#10B981',
    realProject: {
      title: 'Sales & Expense Analytics Dashboard Sheet',
      description: 'Students build a dynamic business expense calculator sheet using IF formulas, conditional formatting, auto-filters, and combo charts.'
    },
    classes: [
      {
        id: 'p2-cls-9',
        classNum: 9,
        topic: 'Logical Formulas: IF & Nested IF',
        simpleConcept: 'Writing formulas that make decisions automatically (e.g. IF marks >= 50 show "PASS" else "FAIL").',
        objective: 'Master `=IF(condition, value_if_true, value_if_false)` syntax and pass/fail evaluation.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Logic: `=IF(E2>=50, "PASS", "FAIL")`. If student score is 50 or higher, Excel outputs PASS automatically.',
          demonstrate: 'Writing `=IF()` formula in Result column and extending down student list.',
          practice: 'Write IF formulas for a list of 10 student test scores.',
          realWorldExample: 'Automated grading systems, loan approvals, and discount eligibility calculators.',
          practicalTask: 'Add a `Result` column in Excel and use `=IF()` formula to display "PASS" or "FAIL" for 5 students.',
          expectedOutput: 'Excel sheet with dynamic IF formula results.'
        }
      },
      {
        id: 'p2-cls-10',
        classNum: 10,
        topic: 'Conditional Formulas: SUMIF & COUNTIF',
        simpleConcept: 'Counting or adding numbers only when specific conditions are met.',
        objective: 'Apply `=COUNTIF(range, criteria)` and `=SUMIF(range, criteria, sum_range)` functions.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: '`=COUNTIF(F2:F10, "PASS")` counts total passing students. `=SUMIF(C2:C10, "Grocery", D2:D10)` sums grocery costs.',
          demonstrate: 'Calculating total number of PASS vs FAIL students and summing expenses by category.',
          practice: 'Calculate total PASS students and total FAIL students using COUNTIF.',
          realWorldExample: 'Inventory stock alerts and sales revenue reporting by product category.',
          practicalTask: 'Calculate total PASS count and total FAIL count using `=COUNTIF()` formulas.',
          expectedOutput: 'Summary table with dynamic COUNTIF formula calculations.'
        }
      },
      {
        id: 'p2-cls-11',
        classNum: 11,
        topic: 'Conditional Formatting & Color Highlights',
        simpleConcept: 'Automatically highlighting top scores in green and low scores or failures in red.',
        objective: 'Apply Highlight Cell Rules (Greater Than, Less Than), Data Bars, and Color Scales.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Conditional Formatting automatically changes cell color based on value! Red for < 40, Green for >= 80.',
          demonstrate: 'Applying Light Red Fill for marks below 40 and Green Fill for marks above 80.',
          practice: 'Apply Conditional Formatting rule to highlight failing marks in red automatically.',
          realWorldExample: 'Highlighting overdue invoices, low inventory stock, and high-performance metrics.',
          practicalTask: 'Apply Conditional Formatting to highlight marks below 40 in Red and above 80 in Green.',
          expectedOutput: 'Excel sheet with dynamic Conditional Formatting rules applied.'
        }
      },
      {
        id: 'p2-cls-12',
        classNum: 12,
        topic: 'Multi-Level Sorting, Filtering & Data Validation',
        simpleConcept: 'Filtering data by categories and creating dropdown selection lists in cells.',
        objective: 'Apply AutoFilters, multi-level sorting, and Data Validation dropdown lists.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Filter button (`Ctrl+Shift+L`). Data Validation: Restricting cell input to a dropdown list (e.g. Yes/No).',
          demonstrate: 'Enabling AutoFilter, filtering table to show only "PASS" students, and creating a dropdown cell list.',
          practice: 'Filter a dataset by subject and add a Data Validation dropdown list.',
          realWorldExample: 'E-commerce product filter menus and corporate survey data entry.',
          practicalTask: 'Enable AutoFilter on table and create a Data Validation dropdown list in Column G.',
          expectedOutput: 'Filtered Excel dataset with a Data Validation dropdown selector.'
        }
      },
      {
        id: 'p2-cls-13',
        classNum: 13,
        topic: 'Real Project: Business Expense & Revenue Dashboard Sheet',
        simpleConcept: 'Creating a complete financial tracker spreadsheet with formulas, conditional formatting, and charts.',
        objective: 'Combine data entry, IF, SUMIF, COUNTIF, AutoFilter, conditional formatting, and 2D charts.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '50 min',
          explain: 'Dashboard project checklist: Data table -> Category totals -> Conditional alerts -> Pie/Bar charts.',
          demonstrate: 'Reviewing complete business expense analytics spreadsheet project requirements.',
          practice: 'Students build their complete Business Expense Tracker project.',
          realWorldExample: 'Small business monthly bookkeeping and financial management.',
          practicalTask: 'Complete and submit `Business_Expense_Tracker.xlsx` file.',
          expectedOutput: 'Finished master Business Expense Tracker Excel file.'
        }
      }
    ]
  },
  {
    id: 'mod-p2-4',
    number: 4,
    title: 'Professional PowerPoint & Visual Storytelling',
    purpose: 'Master slide design: Slide Master, custom typography, infographics, SmartArt diagrams, Morph transitions, and pitch decks.',
    icon: 'fas fa-desktop',
    color: '#F59E0B',
    realProject: {
      title: 'Professional Business Pitch Deck',
      description: 'Students build a 10-slide high-impact pitch presentation featuring Slide Master styling, SmartArt infographics, and Morph transitions.'
    },
    classes: [
      {
        id: 'p2-cls-14',
        classNum: 14,
        topic: 'Slide Master Customization & Color Palettes',
        simpleConcept: 'Editing the Master Slide so every new slide automatically gets your logo and brand colors.',
        objective: 'Customize Slide Master view, insert logo placeholders, and define custom presentation color palettes.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Why manually editing 50 slides is bad! Slide Master controls layout, fonts, and logo positions globally.',
          demonstrate: 'Opening View -> Slide Master, placing school/brand logo at top right, and closing Master view.',
          practice: 'Set up a custom Slide Master layout with logo and color theme.',
          realWorldExample: 'Corporate slide templates created for company-wide sales presentations.',
          practicalTask: 'Create a custom Slide Master layout with logo header and custom color scheme.',
          expectedOutput: 'PowerPoint template file (`.potx` or `.pptx`) with Slide Master setup.'
        }
      },
      {
        id: 'p2-cls-15',
        classNum: 15,
        topic: 'Infographics, SmartArt & Data Visualization',
        simpleConcept: 'Turning boring text bullet lists into clean visual diagrams and process flowcharts.',
        objective: 'Convert bullet lists into SmartArt diagrams (Process, Cycle, Hierarchy) and format infographics.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Convert to SmartArt right-click shortcut! Turn 4 bullet points into a 4-step process timeline instantly.',
          demonstrate: 'Converting a 4-step text list into a colorful SmartArt Process Diagram and styling 3D bevels.',
          practice: 'Convert 2 text bullet lists into SmartArt diagrams.',
          realWorldExample: 'Business strategy slides and organizational chart diagrams.',
          practicalTask: 'Convert a 4-step text list into a formatted SmartArt Process Flowchart.',
          expectedOutput: 'Slide featuring styled SmartArt graphic diagram.'
        }
      },
      {
        id: 'p2-cls-16',
        classNum: 16,
        topic: 'Morph Transitions & Advanced Motion Sequences',
        simpleConcept: 'Creating cinema-quality smooth shape and text movement between slides using Morph transition.',
        objective: 'Apply Morph Slide Transition and configure multi-object Animation Pane sequences.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Morph Magic: Duplicate slide -> Move/Resize object -> Apply Morph transition -> Instant 3D motion!',
          demonstrate: 'Duplicating a slide, enlarging a product picture, applying Morph transition for smooth zoom.',
          practice: 'Create a 3-slide Morph transition sequence demonstrating object movement.',
          realWorldExample: 'Apple product launch keynotes and cinematic presentations.',
          practicalTask: 'Build a 3-slide deck featuring Morph transition object zoom animation.',
          expectedOutput: 'Presentation deck showcasing Morph transition effects.'
        }
      },
      {
        id: 'p2-cls-17',
        classNum: 17,
        topic: 'Real Project: 10-Slide Pitch Deck Presentation',
        simpleConcept: 'Designing and presenting a professional 10-slide business pitch deck for a startup or product.',
        objective: 'Combine Slide Master, visual typography, SmartArt diagrams, Morph transitions, and live presentation skills.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '50 min',
          explain: 'Pitch Deck structure: Problem -> Solution -> Product Demo -> Market -> Business Model -> Team -> Contact.',
          demonstrate: 'Delivering a sample 3-minute business pitch presentation deck.',
          practice: 'Students build and practice delivering their 10-slide pitch presentation.',
          realWorldExample: 'Startup founders pitching investors for business funding.',
          practicalTask: 'Complete and present your 10-slide Business Pitch Deck in full screen presentation mode.',
          expectedOutput: 'Finished 10-slide `.pptx` Pitch Deck presentation delivered live.'
        }
      }
    ]
  },
  {
    id: 'mod-p2-5',
    number: 5,
    title: 'Canva Creative Branding & Campaigns',
    purpose: 'Master brand identity, social media graphics, flyers, thumbnails, and commercial visual designs.',
    icon: 'fas fa-palette',
    color: '#EC4899',
    realProject: {
      title: 'Full Brand Design Package',
      description: 'Students design an event poster, Instagram post, YouTube thumbnail, business flyer, and certificate for a brand.'
    },
    classes: [
      {
        id: 'p2-cls-18',
        classNum: 18,
        topic: 'Visual Hierarchy & Brand Kit Creation',
        simpleConcept: 'Guiding the viewer\'s eyes to the most important information first using scale, contrast, and color.',
        objective: 'Establish a custom Brand Kit (Logo, 3 Brand Colors, 2 Font Pairings) and apply visual hierarchy.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Visual Hierarchy rule: Size = Importance. Primary Focal Point -> Secondary Subheading -> Supporting Text.',
          demonstrate: 'Setting up a Canva Brand Kit with custom hex colors (#1E3A8A, #00F0FF, #F59E0B) and font hierarchy.',
          practice: 'Create a Brand Kit for a fictional Tech Startup or Coffee Brand in Canva.',
          realWorldExample: 'Apple, Nike, and Starbucks visual branding standards.',
          practicalTask: 'Define a 3-color brand palette and font pairing for a local cafe in Canva.',
          expectedOutput: 'Canva Brand Kit setup with 3 brand colors and 2 paired fonts.'
        }
      },
      {
        id: 'p2-cls-19',
        classNum: 19,
        topic: 'Real Project 1: College Event Announcement Poster',
        simpleConcept: 'Designing an eye-catching A4 event poster for a Tech Fest or Cultural Event.',
        objective: 'Combine headline typography, event badge, date/time layout, venue details, and QR code.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Poster formula: Event Title (Huge) -> Date/Venue Badge -> Highlight Images -> Registration QR code.',
          demonstrate: 'Designing an A4 poster for "CYBERFEST 2026" featuring bold typography and clean spacing.',
          practice: 'Design an A4 poster for a school Science Exhibition or Sports Meet.',
          realWorldExample: 'College fest posters and music concert promotional banners.',
          practicalTask: 'Export a print-ready PDF A4 event poster with title, date, venue, speaker photo, and QR code.',
          expectedOutput: 'Print-ready A4 Event Poster PDF.'
        }
      },
      {
        id: 'p2-cls-20',
        classNum: 20,
        topic: 'Real Project 2: High-Converting Instagram Carousel Post',
        simpleConcept: 'Designing a 5-slide educational/promotional carousel that keeps people swiping.',
        objective: 'Create a seamless 1080x1080px multi-slide Instagram carousel with seamless arrows and CTA.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Carousel Hook Slide 1 -> Value Slides 2-4 -> Action Call Slide 5. Continuous graphic elements across slides.',
          demonstrate: 'Designing a 5-slide carousel for "5 Secret AI Tools You Must Know".',
          practice: 'Create a 5-slide carousel post on a study topic or gadget review.',
          realWorldExample: 'Educational marketing carousels published by top Instagram creators.',
          practicalTask: 'Design and export a 5-slide PNG Instagram carousel with consistent branding.',
          expectedOutput: '5-slide PNG Instagram carousel package.'
        }
      },
      {
        id: 'p2-cls-21',
        classNum: 21,
        topic: 'Real Project 3: YouTube Thumbnail & Click-Through Optimization',
        simpleConcept: 'Designing a 1280x720px thumbnail that gets high clicks on YouTube.',
        objective: 'Apply high-contrast color pop, cutout subject image, and 3-word bold title.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'CTR (Click-Through Rate) rules: Max 3-4 words, huge readable font, high contrast background, expressive face cutout.',
          demonstrate: 'Designing a YouTube thumbnail for "EDIT LIKE A PRO!" with yellow shadow text.',
          practice: 'Design a thumbnail for a gaming video, vlog, or coding tutorial.',
          realWorldExample: 'Thumbnails created by top YouTubers to drive millions of views.',
          practicalTask: 'Design a 1280x720px PNG YouTube thumbnail featuring cutout photo and 3-word headline.',
          expectedOutput: 'High-impact 1280x720px PNG YouTube Thumbnail.'
        }
      },
      {
        id: 'p2-cls-22',
        classNum: 22,
        topic: 'Real Project 4 & 5: Business Flyer & Award Certificate',
        simpleConcept: 'Creating marketing flyers for local shops and formal appreciation certificates.',
        objective: 'Produce a 2-sided business flyer and an elegant gold-accented award certificate.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Business Flyer (Offer details, contact numbers, social handles) vs Formal Certificate (Border, signature line).',
          demonstrate: 'Designing a promotional flyer for a local Gym/Bakery and a formal Award Certificate.',
          practice: 'Design a business promotional flyer and an award certificate.',
          realWorldExample: 'Local business marketing distribution and corporate training certificates.',
          practicalTask: 'Complete 1 Business Flyer and 1 Award Certificate in Canva.',
          expectedOutput: 'Print-ready PDF Flyer and Certificate files.'
        }
      }
    ]
  },
  {
    id: 'mod-p2-6',
    number: 6,
    title: 'Photoshop Practical Design & Compositing',
    purpose: 'Master layers, precision selection, background manipulation, color grading, photo retouching, and commercial poster composition.',
    icon: 'fas fa-image',
    color: '#3B82F6',
    realProject: {
      title: 'Commercial Product & Festival Poster Package',
      description: 'Students edit raw photos, remove backgrounds, apply color correction, build light glows, and produce 2 professional posters.'
    },
    classes: [
      {
        id: 'p2-cls-23',
        classNum: 23,
        topic: 'Photoshop Layers, Masks & Non-Destructive Editing',
        simpleConcept: 'Working with layers and masks so you never permanently destroy original photo pixels.',
        objective: 'Master Layer Masks (black hides, white reveals), Adjustment Layers, and Smart Objects.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Golden Rule of Photoshop: Non-destructive editing! Never use Eraser tool on original photo layer; use Layer Mask instead.',
          demonstrate: 'Masking out a background using brush on a Layer Mask and converting layer to Smart Object.',
          practice: 'Apply a non-destructive Layer Mask to separate a subject from background.',
          realWorldExample: 'Professional photo editing in advertising agencies.',
          practicalTask: 'Isolate a subject photo using Layer Mask and apply 1 Adjustment Layer non-destructively.',
          expectedOutput: 'Layered `.psd` file demonstrating Layer Mask usage.'
        }
      },
      {
        id: 'p2-cls-24',
        classNum: 24,
        topic: 'Real Project 1: Commercial Product Poster Design',
        simpleConcept: 'Designing a high-end product advertisement poster (e.g. Perfume, Headphones, Sneakers).',
        objective: 'Composite product photo, create ground contact shadow, light rim glow, and bold product title.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Product advertising layout: Product cutout in center -> Dark radial background -> Soft drop shadow under product -> Neon rim glow.',
          demonstrate: 'Designing a premium Wireless Headphones poster with dark gradient and cyan rim light.',
          practice: 'Create a product poster for a sneaker, phone, or drink bottle.',
          realWorldExample: 'Nike, Samsung, and Apple product billboard ads.',
          practicalTask: 'Export a commercial Product Poster `.jpg` with contact shadow and background light glow.',
          expectedOutput: 'Commercial Product Poster design.'
        }
      },
      {
        id: 'p2-cls-25',
        classNum: 25,
        topic: 'Real Project 2 & 3: Photo Restoration & Background Replacement',
        simpleConcept: 'Fixing damaged old family photos and placing people into brand new backgrounds.',
        objective: 'Use Healing Brush, Clone Stamp, Content-Aware Fill, and Match Color for seamless compositing.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Photo restoration (removing scratches, tears, dust) and color matching subject to new background.',
          demonstrate: 'Restoring a scratched old photo using Clone Stamp and placing a person cutout onto a Dubai skyline photo.',
          practice: 'Restore 1 damaged photo and place 1 person cutout into a new background with matched lighting.',
          realWorldExample: 'Studio photo restoration services and film visual effects compositing.',
          practicalTask: 'Complete 1 Photo Restoration edit and 1 Background Replacement composite.',
          expectedOutput: 'Restored photo `.jpg` and composite scene `.jpg`.'
        }
      },
      {
        id: 'p2-cls-26',
        classNum: 26,
        topic: 'Real Project 4 & 5: Social Ad & Festival Banner',
        simpleConcept: 'Designing promotional banners for Eid, Diwali, New Year, or business flash sales.',
        objective: 'Combine typography, decorative vector elements, color grading, and brand logos into 1 banner.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Festival & sale banner rules: Festive color scheme (Gold/Red/Navy), greeting text, promotional offer, business logo.',
          demonstrate: 'Designing a "Festival Special Offer 50% Off" promotional social media banner.',
          practice: 'Design a festival greeting/sale banner for a local business.',
          realWorldExample: 'Social media festive marketing campaigns run by retail brands.',
          practicalTask: 'Design a 1080x1080px Festival Special Sale Banner exported as PNG.',
          expectedOutput: 'High-quality 1080x1080px Festival Sale Banner PNG.'
        }
      },
      {
        id: 'p2-cls-27',
        classNum: 27,
        topic: 'Advanced Color Correction & Camera Raw Filter',
        simpleConcept: 'Enhancing photo lighting, shadow details, color vibrancy, and cinematic color grading.',
        objective: 'Apply Camera Raw Filter, Color Balance, Curves, and Hue/Saturation controls.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Camera Raw Filter controls: Exposure, Contrast, Highlights, Shadows, Whites, Blacks, and Clarity.',
          demonstrate: 'Color grading a flat outdoor photo to look like a cinematic movie scene.',
          practice: 'Apply Camera Raw Filter color grading to 1 landscape/portrait photo.',
          realWorldExample: 'Professional photography post-processing and fashion magazine editing.',
          practicalTask: 'Apply Camera Raw Filter color grading to an image and save before/after comparison.',
          expectedOutput: 'Color-graded image export with before/after comparison.'
        }
      }
    ]
  },
  {
    id: 'mod-p2-7',
    number: 7,
    title: 'Video Editing — Practical Content Creation',
    purpose: 'CORE PRIORITY MODULE — Master professional timeline cutting, multi-track audio, transitions, kinetic subtitles, speed ramping, green screen keying, and commercial video creation.',
    icon: 'fas fa-film',
    color: '#8B5CF6',
    realProjects: [
      { title: 'Project 1: 30-Second Commercial Product Ad', description: 'Edit a fast-paced product promo with beat-synced cuts and text callouts.' },
      { title: 'Project 2: Instagram Reel / Short with Kinetic Captions', description: 'Create a 9:16 vertical video with auto-animated subtitles and sound effects.' },
      { title: 'Project 3: Event Promotional Video', description: 'Edit a 45-second high-energy trailer for a school/college event.' },
      { title: 'Project 4: YouTube Short / Educational Video', description: 'Produce a 60-second educational short with screen recording and voice-over.' },
      { title: 'Project 5: Cinematic Photo Slideshow', description: 'Create a smooth photo animation slideshow with light leaks and ambient audio.' },
      { title: 'FINAL MODULE PROJECT: Local Business Promo Video', description: 'Produce a complete 30-60 second commercial promo video for a local cafe, gym, or shop.' }
    ],
    classes: [
      {
        id: 'p2-cls-28',
        classNum: 28,
        topic: 'Professional Timeline Editing & Assembly Cuts',
        simpleConcept: 'Setting up video timeline, organizing video B-Roll and A-Roll footage, cutting to the beat.',
        objective: 'Understand A-Roll (main speech) vs B-Roll (supporting footage), timeline tracks (V1-V4, A1-A4), and beat cutting.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'A-Roll (Primary speech/interview) + B-Roll (Overlaid action footage). Cutting on music beats for energy.',
          demonstrate: 'Overlaying B-Roll footage on V2 track while speech audio plays continuously on A1 track.',
          practice: 'Import speech video, add 3 B-Roll clips on V2 matching what speaker mentions.',
          realWorldExample: 'TV documentaries, news reports, and commercial YouTube videos.',
          practicalTask: 'Create an A-Roll / B-Roll edit with speech track on V1/A1 and 3 B-Roll overlays on V2.',
          expectedOutput: 'Synchronized A-Roll / B-Roll timeline sequence.'
        }
      },
      {
        id: 'p2-cls-29',
        classNum: 29,
        topic: 'Kinetic Subtitles, Typography & Sound Effects (SFX)',
        simpleConcept: 'Adding animated pop-up text and sound effects (whoosh, pop, ding) that make videos addictive.',
        objective: 'Generate animated subtitles, apply word highlight colors, and pair text animations with sound effects (SFX).',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Why SFX matters: A Whoosh sound effect makes a title transition feel 10x more impactful! Subtitle styling.',
          demonstrate: 'Adding pop-up yellow subtitle text paired with a "Swoosh" audio effect on A2 audio track.',
          practice: 'Add 3 animated text pop-ups to a vertical video and pair each with a sound effect (pop, swoosh, bell).',
          realWorldExample: 'Viral TikToks and Instagram Reels created by top content creators.',
          practicalTask: 'Create a 15-second video clip with animated subtitles and 3 paired sound effects.',
          expectedOutput: '15-second vertical video clip with text animations and sound effects.'
        }
      },
      {
        id: 'p2-cls-30',
        classNum: 30,
        topic: 'Speed Ramping, Motion Keyframing & Transitions',
        simpleConcept: 'Creating smooth fast-to-slow speed ramps and moving objects across screen using keyframes.',
        objective: 'Apply speed ramping curves (smooth fast-slow-fast transitions) and position/scale keyframe animations.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Speed Ramping (gradual speed change curve). Keyframes: Point A (Start position/scale) -> Point B (End position/scale).',
          demonstrate: 'Creating a smooth Speed Ramp on a car driving footage and zoom-in keyframe on a product.',
          practice: 'Apply speed ramp to 1 action clip and create a keyframe slow zoom on a photo.',
          realWorldExample: 'Car commercials, sports highlight reels, and travel video edits.',
          practicalTask: 'Apply a Speed Ramp to 1 clip and a keyframed Zoom-In animation to another clip.',
          expectedOutput: 'Timeline sequence showcasing speed ramp and keyframe animation.'
        }
      },
      {
        id: 'p2-cls-31',
        classNum: 31,
        topic: 'Green Screen (Chroma Key) & Video Masking',
        simpleConcept: 'Removing green backgrounds to place speakers inside virtual studios or custom graphics.',
        objective: 'Apply Chroma Key / Color Keyer tool, clean edge spill, and composite video backgrounds.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Why Green color? Human skin tone contains no green pigment! Chroma Key removes green shade.',
          demonstrate: 'Applying Chroma Key to a green screen actor clip, cleaning green spill, placing virtual newsroom background on V1.',
          practice: 'Remove green background from a sample video clip and place actor over a new video background.',
          realWorldExample: 'Weather forecasts, Hollywood sci-fi movies, and gaming live streams.',
          practicalTask: 'Key out green screen background from a clip and composite actor over a custom background scene.',
          expectedOutput: 'Clean Chroma Key composite video without green edge halos.'
        }
      },
      {
        id: 'p2-cls-32',
        classNum: 32,
        topic: 'Real Project 1 & 2: 30s Product Ad & Instagram Reel with Captions',
        simpleConcept: 'Editing a 30-second fast-paced product commercial and a 9:16 vertical Reel.',
        objective: 'Produce 1 horizontal product ad and 1 vertical 9:16 Reel featuring captions and beat cuts.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Product Ad formula: Hook -> Product features -> Offer -> Call to Action. Reel format: 1080x1920 vertical.',
          demonstrate: 'Editing a 30-second Smartphone promo video and exporting 9:16 Reel MP4.',
          practice: 'Students edit 1 product ad and 1 vertical Reel.',
          realWorldExample: 'Commercial social media video ads for ecommerce brands.',
          practicalTask: 'Export 1 horizontal 30s Product Ad MP4 and 1 vertical 9:16 Reel MP4.',
          expectedOutput: '2 exported MP4 video files ready for social media.'
        }
      },
      {
        id: 'p2-cls-33',
        classNum: 33,
        topic: 'FINAL MODULE PROJECT: Local Business Commercial Promo Video',
        simpleConcept: 'Creating a complete 30-60 second commercial promo video for a local business.',
        objective: 'Assemble footage, voiceover, background music, captions, transitions, lower thirds, and logo call-to-action into 1 final video.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Final video project checklist: Hook -> Business showcase -> Service benefits -> Client review quote -> Contact info/map location -> Logo outro.',
          demonstrate: 'Reviewing final business promo video submission criteria.',
          practice: 'Students edit and produce their complete 30-60 second Local Business Promo Video.',
          realWorldExample: 'Paid client video editing deliverable for local businesses.',
          practicalTask: 'Export and submit your complete 30-60 second Local Business Commercial Promo Video MP4 file.',
          expectedOutput: 'Finished 30-60 second High Definition 1080p Commercial Video MP4.'
        }
      }
    ]
  },
  {
    id: 'mod-p2-8',
    number: 8,
    title: 'AI Tools & AI Productivity',
    purpose: 'Master Generative AI, prompt engineering, AI-assisted content creation, AI image/video generation, and ethical AI productivity.',
    icon: 'fas fa-robot',
    color: '#6366F1',
    realProject: {
      title: 'AI-Assisted Multi-Channel Content Campaign',
      description: 'Students use AI to generate content ideas, poster prompts, social captions, presentation outlines, video scripts, and study guides while fact-checking all outputs.'
    },
    classes: [
      {
        id: 'p2-cls-34',
        classNum: 34,
        topic: 'Advanced Prompt Engineering & System Prompts',
        simpleConcept: 'Writing master prompts using Persona, Task, Context, Constraints, and Output Format.',
        objective: 'Construct advanced multi-step system prompts for complex research, coding, and creative tasks.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Master Prompt Structure: System Persona + Background Context + Explicit Task + Few-Shot Examples + Negative Constraints + Target Schema.',
          demonstrate: 'Crafting a System Prompt to make AI act as an expert Digital Marketing Director auditing a business campaign.',
          practice: 'Write an advanced prompt asking AI to generate 10 unique video hook ideas for a local gym.',
          realWorldExample: 'Prompt Engineers creating automated AI workflows for companies.',
          practicalTask: 'Write a master prompt for AI to generate a 5-day content calendar for a bakery.',
          expectedOutput: 'Structured 5-day content plan generated via advanced prompt.'
        }
      },
      {
        id: 'p2-cls-35',
        classNum: 35,
        topic: 'AI Image & Graphic Generation (Midjourney/DALL-E/Canva AI)',
        simpleConcept: 'Generating high-quality custom visuals, stock photos, and logos from text descriptions.',
        objective: 'Write image prompts specifying Subject, Medium, Style, Lighting, Camera Angle, and Aspect Ratio.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Image Prompt formula: `[Subject] + [Environment/Setting] + [Art Style/Camera Lens] + [Lighting] + [Color Palette] --ar 16:9`.',
          demonstrate: 'Generating a futuristic studio photo of a wireless earbud with cyan neon rim lighting.',
          practice: 'Generate 2 custom AI images for a product poster and a blog banner.',
          realWorldExample: 'Advertising agencies generating concept art and custom visual assets.',
          practicalTask: 'Generate 2 custom AI images (1 Product Mockup, 1 Concept Art) using detailed text prompts.',
          expectedOutput: '2 AI-generated high-resolution images.'
        }
      },
      {
        id: 'p2-cls-36',
        classNum: 36,
        topic: 'AI for Productivity, Research & Writing',
        simpleConcept: 'Using AI to summarize research reports, proofread documents, and draft emails 10x faster.',
        objective: 'Use AI tools for long text summarization, outline generation, and writing refinement.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'How to use AI as a study editor and research synthesizer without plagiarism.',
          demonstrate: 'Summarizing a 5-page PDF research paper into a 5-bullet summary table using AI.',
          practice: 'Summarize a long article using AI and refine the generated text.',
          realWorldExample: 'Executive assistants and content managers summarizing daily industry news.',
          practicalTask: 'Use AI to generate a 5-point executive summary of an article and paste into a Word report.',
          expectedOutput: 'Executive summary document generated with AI assistance.'
        }
      },
      {
        id: 'p2-cls-37',
        classNum: 37,
        topic: 'Real Project: AI-Assisted Content Campaign Assembly',
        simpleConcept: 'Using AI as a creative partner to draft a complete marketing asset package.',
        objective: 'Generate video script, social captions, poster prompt, and blog outline using AI, then fact-check and edit.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Ethical Rule: AI generates draft -> Human verifies facts, edits tone, and polishes final result!',
          demonstrate: 'Generating a 30-second video script and social caption for a product launch, then fact-checking references.',
          practice: 'Students use AI to generate a complete content package for a brand, then edit to human perfection.',
          realWorldExample: 'Modern content creators using AI to 10x their production speed.',
          practicalTask: 'Submit an AI-Assisted Content Package containing Video Script, Social Captions, and Fact-Check Log.',
          expectedOutput: 'Polished AI-assisted content package document with fact-check verification log.'
        }
      }
    ]
  },
  {
    id: 'mod-p2-9',
    number: 9,
    title: 'Digital Marketing & Local Business Growth',
    purpose: 'Master practical small-business marketing, social media growth, Instagram/Facebook strategy, Google Maps setup, and lead funnels.',
    icon: 'fas fa-bullhorn',
    color: '#F59E0B',
    realProject: {
      title: '7-Day Digital Marketing Campaign for a Local Business',
      description: 'Students create a complete 7-day marketing campaign including brand concept, 7 posts, 2 Reel concepts, captions, hashtags, target persona, and Google Maps setup.'
    },
    classes: [
      {
        id: 'p2-cls-38',
        classNum: 38,
        topic: 'Digital Marketing Fundamentals & Customer Persona',
        simpleConcept: 'Understanding how businesses attract, engage, and convert online followers into paying customers.',
        objective: 'Define Target Audience Persona, Marketing Funnel (Awareness -> Interest -> Decision -> Action), and Customer Journey.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Sales Funnel: Top of Funnel (Reels/Viral posts - Awareness) -> Middle (Carousels/Reviews - Trust) -> Bottom (Offer/WhatsApp link - Sales).',
          demonstrate: 'Building a Customer Persona profile for a local Fitness Gym (Age 18-35, Goal: Weight loss, Pain point: No time).',
          practice: 'Define Customer Persona for a local Bakery, Salon, or Mobile Shop.',
          realWorldExample: 'How Instagram ads target specific age, location, and interest groups.',
          practicalTask: 'Create a 1-page Customer Persona profile including Age, Location, Interests, Pain Points, and Buying Triggers.',
          expectedOutput: 'Detailed Customer Persona profile sheet.'
        }
      },
      {
        id: 'p2-cls-39',
        classNum: 39,
        topic: 'Google Business Profile & Local SEO (Google Maps)',
        simpleConcept: 'Getting local businesses to show up #1 when people search "best cafe near me" on Google Maps.',
        objective: 'Set up Google Business Profile listing, optimize NAP (Name, Address, Phone), collect customer reviews, and post updates.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Local SEO secret: 80%+ of local purchases start with a Google Maps search! Keywords in business title & customer reviews.',
          demonstrate: 'Setting up a Google Business Profile listing, adding photos, categories, opening hours, and review QR code link.',
          practice: 'Create a mock Google Business Profile setup sheet for a local shop.',
          realWorldExample: 'Local restaurants gaining 50+ walk-in customers daily from Google Maps reviews.',
          practicalTask: 'Complete a Google Business Profile Optimization Datasheet for a local business.',
          expectedOutput: 'Google Business Profile optimization datasheet.'
        }
      },
      {
        id: 'p2-cls-40',
        classNum: 40,
        topic: 'Social Media Strategy & Content Calendar Planning',
        simpleConcept: 'Planning 7 days of social media posts, reels, stories, and captions in advance.',
        objective: 'Design a 7-day Content Calendar matching marketing funnel objectives and optimal posting times.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: '7-Day Content Mix: Day 1 (Behind the scenes) -> Day 2 (Customer transformation story) -> Day 3 (Product Reel) -> Day 4 (Educational tip) -> Day 5 (Special Offer) -> Day 6 (User Review) -> Day 7 (Q&A/Call to Action).',
          demonstrate: 'Building a 7-day content calendar spreadsheet with post captions and hashtag sets.',
          practice: 'Draft a 7-day content calendar for a local business.',
          realWorldExample: 'Social media management agencies handling client accounts.',
          practicalTask: 'Create a 7-day Content Calendar sheet specifying Post Type, Caption, Hashtags, and Call to Action.',
          expectedOutput: '7-day Content Calendar spreadsheet file.'
        }
      },
      {
        id: 'p2-cls-41',
        classNum: 41,
        topic: 'Real Project: 7-Day Digital Marketing Campaign',
        simpleConcept: 'Assembling a 7-day social media marketing launch plan for a local business.',
        objective: 'Produce a 7-day Content Calendar featuring 7 post concepts, 2 Reel scripts, captions, hashtags, and CTA strategy.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Reviewing complete 7-day marketing campaign plan for a local business.',
          demonstrate: 'Reviewing final campaign deliverables and WhatsApp business lead automation.',
          practice: 'Students build their 7-day Digital Marketing Campaign for their chosen local business.',
          realWorldExample: 'Real agency marketing campaign proposal delivered to business clients.',
          practicalTask: 'Submit complete 7-Day Digital Marketing Campaign Package (Strategy, Content Calendar, 7 Captions, Hashtag sets).',
          expectedOutput: 'Finished 7-Day Digital Marketing Campaign document.'
        }
      }
    ]
  },
  {
    id: 'mod-p2-10',
    number: 10,
    title: 'Web Development — HTML5, CSS3 & Basic JS',
    purpose: 'Master semantic HTML5 markup, CSS3 Flexbox layouts, responsive web design, and interactive JavaScript DOM manipulation.',
    icon: 'fas fa-code',
    color: '#00F0FF',
    realProject: {
      title: 'Responsive Portfolio Website & Interactive Web App',
      description: 'Students build a multi-section responsive portfolio website in HTML5/CSS3 and an interactive JavaScript application.'
    },
    classes: [
      {
        id: 'p2-cls-42',
        classNum: 42,
        topic: 'Semantic HTML5 Markup & Responsive Viewport',
        simpleConcept: 'Writing clean HTML5 semantic layout tags (`<header>`, `<main>`, `<section>`, `<footer>`) with responsive meta tags.',
        objective: 'Write clean semantic HTML5 markup, viewport meta tag, and structured page sections.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Why Semantic HTML matters: Accessibility and Google SEO ranking! Head metadata & responsive viewport tag.',
          demonstrate: 'Structuring a portfolio page with `<header>`, `<section id="about">`, `<section id="projects">`, and `<footer>`.',
          practice: 'Build the semantic HTML structure for your personal portfolio page.',
          realWorldExample: 'Modern web development standards for responsive web applications.',
          practicalTask: 'Write a semantic HTML5 webpage structure containing 4 distinct sections.',
          expectedOutput: 'Semantic HTML5 document file (`index.html`).'
        }
      },
      {
        id: 'p2-cls-43',
        classNum: 43,
        topic: 'CSS3 Box Model & Flexbox Layouts',
        simpleConcept: 'Styling webpage colors, typography, margins, padding, and aligning cards using CSS Flexbox.',
        objective: 'Apply external CSS stylesheet, CSS variables, Box Model (`box-sizing`), and Flexbox alignment (`display: flex`).',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Flexbox superpower: `display: flex; justify-content: space-between; align-items: center;` lines up cards perfectly!',
          demonstrate: 'Linking `style.css` to `index.html`, declaring CSS color variables, and styling project cards grid using Flexbox.',
          practice: 'Style portfolio page with custom colors, Google Fonts, card padding, and Flexbox layouts.',
          realWorldExample: 'Designing responsive web apps and modern SaaS dashboards.',
          practicalTask: 'Code `style.css` to style your portfolio website with custom fonts, cards, and Flexbox navigation.',
          expectedOutput: 'Styled responsive portfolio webpage rendered in browser.'
        }
      },
      {
        id: 'p2-cls-44',
        classNum: 44,
        topic: 'Responsive Media Queries (@media)',
        simpleConcept: 'Making your webpage layout adapt smoothly between desktop screens and mobile phones.',
        objective: 'Write CSS `@media (max-width: 768px)` rules to adjust flex directions and font sizes on mobile.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Mobile-friendly web design: Changing 3-column desktop grid into 1-column mobile layout using media queries.',
          demonstrate: 'Adding `@media (max-width: 768px) { .grid { flex-direction: column; } }` in CSS file.',
          practice: 'Test mobile responsiveness using Chrome Dev Tools Device Mode (`Ctrl+Shift+M`).',
          realWorldExample: 'Ensuring your website looks beautiful on iPhones, Android phones, and desktops.',
          practicalTask: 'Add mobile media query rules in `style.css` to stack project cards vertically on mobile screens.',
          expectedOutput: 'Responsive CSS file tested in browser device emulator.'
        }
      },
      {
        id: 'p2-cls-45',
        classNum: 45,
        topic: 'JavaScript DOM Event Handling & Interactive Web App',
        simpleConcept: 'Writing JavaScript code that responds to user clicks and updates webpage text dynamically.',
        objective: 'Declare JS variables (`let`, `const`), functions, event listeners (`addEventListener`), and DOM updates.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'DOM (Document Object Model): JS finds elements (`document.getElementById`) and updates content/styles live!',
          demonstrate: 'Coding a button that calculates student total marks dynamically on button click.',
          practice: 'Build a calculator or interactive quiz app in JavaScript.',
          realWorldExample: 'Interactive web features: shopping carts, calculators, and dynamic search filters.',
          practicalTask: 'Write a JavaScript file (`script.js`) connected to HTML that performs a dynamic calculation on button click.',
          expectedOutput: 'Interactive JavaScript web app file (`script.js`).'
        }
      }
    ]
  },
  {
    id: 'mod-p2-11',
    number: 11,
    title: 'Career, Freelancing & Capstone Project',
    purpose: 'CAPSTONE ASSESSMENT — Master digital career paths, freelancing proposals, client communication, and final master capstone project presentation.',
    icon: 'fas fa-rocket',
    color: '#6366F1',
    realProjects: [
      { title: 'Option A: Local Business Marketing Package', description: 'Complete branding, poster, 30s video promo, 7-day social campaign, and Google Maps setup.' },
      { title: 'Option B: YouTube Creator Starter Package', description: 'Channel branding, 2 video thumbnails, 30s Reel/Short with subtitles, and 60s tutorial video.' },
      { title: 'Option C: Personal Developer Portfolio Website', description: 'Complete coded portfolio website featuring project showcase cards, resume download, and contact links.' },
      { title: 'Option D: Small Business Branding Package', description: 'Logo concept, brand kit, business flyer, promotional banner, and appreciation certificate.' },
      { title: 'Option E: Product Launch Campaign', description: 'Commercial product poster, 30s ad video, social ad graphics, and AI-assisted sales script.' }
    ],
    classes: [
      {
        id: 'p2-cls-46',
        classNum: 46,
        topic: 'Digital Skill Careers, Freelancing & Proposals',
        simpleConcept: 'How to turn your digital skills into paid freelance gigs, jobs, or business services.',
        objective: 'Understand digital career roles (Graphic Designer, Video Editor, Web Developer, Digital Marketer), pricing, and proposal writing.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Freelance Basics: Finding clients (Local businesses, Upwork, Fiverr, Instagram DMs). Value-based pricing vs Hourly pricing.',
          demonstrate: 'Writing a professional freelance client pitch proposal for a local shop promo video.',
          practice: 'Draft a 1-page freelance proposal offering digital marketing/video editing services to a local client.',
          realWorldExample: 'Freelance video editors and web developers earning independent income worldwide.',
          practicalTask: 'Draft a 1-page Client Service Proposal (Services offered, Timeline, Deliverables, Price quote).',
          expectedOutput: 'Professional Client Service Proposal document.'
        }
      },
      {
        id: 'p2-cls-47',
        classNum: 47,
        topic: 'Personal Digital Creator Profile & Portfolio Setup',
        simpleConcept: 'Assembling all your best projects (posters, video promo, website, marketing plan) into a master portfolio.',
        objective: 'Organize digital assets, document deliverables, and structure master portfolio showcase.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Master Portfolio Structure: Personal Bio -> Skill Badges -> Project Showcase (Design, Video, Code) -> Resume -> Contact.',
          demonstrate: 'Organizing student digital project files into a master portfolio folder.',
          practice: 'Assemble all 5 major practical project files into your master portfolio directory.',
          realWorldExample: 'Showcasing work to employers, college interview panels, and freelance clients.',
          practicalTask: 'Organize all your completed +2 project files into `Master_Portfolio_2026` folder.',
          expectedOutput: 'Master Portfolio folder containing design, video, code, and document projects.'
        }
      },
      {
        id: 'p2-cls-48',
        classNum: 48,
        topic: 'Final Capstone Presentation & Classroom Pitch',
        simpleConcept: 'Finalizing your capstone project package and delivering a 2-minute live classroom demonstration.',
        objective: 'Assemble all project deliverables into a master portfolio submission and deliver a 2-minute project pitch.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Presentation formula: Project Title -> Problem Solved -> Deliverables Showcased (Poster/Video/Site) -> Tools Used -> Conclusion.',
          demonstrate: 'Conducting sample 2-minute student capstone project demonstration.',
          practice: 'Students present their capstone project to teacher and peer class.',
          realWorldExample: 'Professional project portfolio review and client presentation pitch.',
          practicalTask: 'Deliver 2-minute live demonstration of your Final Capstone Project and submit master portfolio package.',
          expectedOutput: 'Master Portfolio Package submission + 2-minute live demonstration.'
        }
      }
    ]
  }
];

export const BONUS_SPECIAL_TRACKS = [
  {
    id: 'track-python',
    title: 'Python Basics & Scripting (Special Interest Track)',
    icon: 'fab fa-python',
    description: 'Optional track for students interested in software development & data: Python syntax, variables, conditions, loops, and mini-scripts.'
  },
  {
    id: 'track-robotics',
    title: 'Arduino / ESP32 & Robotics Coding (Special Interest Track)',
    icon: 'fas fa-microchip',
    description: 'Optional track for electronics/hardware enthusiasts: C++ micro-controller basics, sensor inputs, LED control, and IoT projects.'
  }
];

export const PLUS_TWO_CAPSTONE_OPTIONS = [
  { id: 'p2-opt-a', title: 'Option A: Local Business Marketing Package', icon: 'fas fa-store', description: 'Logo, flyer, 30s video promo, 7-day social campaign, and Google Maps setup.' },
  { id: 'p2-opt-b', title: 'Option B: YouTube Creator Starter Package', icon: 'fab fa-youtube', description: 'Channel branding, 2 high-CTR thumbnails, 30s Reel with subtitles, and tutorial video.' },
  { id: 'p2-opt-c', title: 'Option C: Personal Portfolio Website', icon: 'fas fa-code', description: 'Coded responsive website featuring projects, resume download, and contact links.' },
  { id: 'p2-opt-d', title: 'Option D: Small Business Branding Package', icon: 'fas fa-palette', description: 'Logo concept, brand style guide, business flyer, festival poster, and certificate.' },
  { id: 'p2-opt-e', title: 'Option E: Product Launch Campaign', icon: 'fas fa-rocket', description: 'Commercial product poster, 30s ad video, social ad graphics, and AI sales script.' }
];

// Helper to compute progress metrics for +2 syllabus
export const calculatePlus2Metrics = (savedProgress = {}) => {
  let totalClassesCount = 0;
  let completedClassesCount = 0;
  let skippedClassesCount = 0;
  let moduleProgressMap = {};

  PLUS_TWO_MODULES.forEach((mod) => {
    let modCompleted = 0;
    const modTotal = mod.classes.length;

    mod.classes.forEach((cls) => {
      totalClassesCount++;
      const status = savedProgress[cls.id]?.status || 'NOT STARTED';
      if (status === 'COMPLETED') {
        completedClassesCount++;
        modCompleted++;
      } else if (status === 'SKIPPED') {
        skippedClassesCount++;
      }
    });

    const modPct = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
    moduleProgressMap[mod.id] = {
      completed: modCompleted,
      total: modTotal,
      percentage: modPct
    };
  });

  const overallPercentage = totalClassesCount > 0
    ? Math.round((completedClassesCount / totalClassesCount) * 100)
    : 0;

  const remainingClassesCount = totalClassesCount - completedClassesCount;

  return {
    totalClasses: totalClassesCount,
    completedClasses: completedClassesCount,
    skippedClasses: skippedClassesCount,
    remainingClasses: remainingClassesCount,
    overallProgress: overallPercentage,
    moduleProgress: moduleProgressMap
  };
};
