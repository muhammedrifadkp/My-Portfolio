// Complete +1 Digital Skills Syllabus Data Structure (Foundation / Beginner Level)
// Framework: LEARN -> DEMONSTRATE -> PRACTICE -> CREATE -> COMPLETE

export const PLUS_ONE_MODULES = [
  {
    id: 'mod-1',
    number: 1,
    title: 'Computer & OS Basics',
    purpose: 'Build core computer confidence, operating system navigation, system settings, and basic troubleshooting.',
    icon: 'fas fa-desktop',
    color: '#00F0FF',
    realProject: {
      title: 'Workstation Setup & System Inspection',
      description: 'Students inspect hardware peripherals, navigate desktop control centers, snap side-by-side windows, and record workstation specifications.'
    },
    classes: [
      {
        id: 'cls-1',
        classNum: 1,
        topic: 'Computer Overview & Peripheral Connections',
        simpleConcept: 'What a computer is and how input, processing, and output devices work together.',
        objective: 'Understand the primary role of computers, inputs, processing, and outputs.',
        teacherGuide: {
          theoryDuration: '15-20 min',
          practicalDuration: '35-40 min',
          explain: 'Explain input, process, output (IPO cycle) using real life examples like a fruit blender or ATM.',
          demonstrate: 'Identify physical computer setup (Monitor, System Unit/CPU, Keyboard, Mouse, Cables).',
          practice: 'Students inspect their lab workstation and identify all connected input/output peripherals.',
          realWorldExample: 'How computers run hospitals, banks, retail shops, and school labs.',
          practicalTask: 'Power on workstation and list 5 physical hardware components on your desktop desk.',
          expectedOutput: 'Student can list and identify 5 hardware components correctly.'
        }
      },
      {
        id: 'cls-2',
        classNum: 2,
        topic: 'Hardware vs Software',
        simpleConcept: 'Hardware is physical parts you can touch; Software is programs that run inside.',
        objective: 'Distinguish clearly between physical hardware components and software applications.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Compare hardware to human body parts and software to human mind/thought.',
          demonstrate: 'Show System Properties in Windows/Linux and open Task Manager.',
          practice: 'Classify a list of items (Mouse, Word, Keyboard, Windows 11, Chrome) into Hardware vs Software.',
          realWorldExample: 'A smartphone is hardware; WhatsApp and Instagram are software.',
          practicalTask: 'Create a text document listing 4 hardware devices and 4 software apps you use daily.',
          expectedOutput: 'Correct 2-column list saved on student desktop.'
        }
      },
      {
        id: 'cls-3',
        classNum: 3,
        topic: 'Operating Systems (Windows 11 Overview)',
        simpleConcept: 'The master software that runs the computer and manages all files and apps.',
        objective: 'Understand what an Operating System does and identify major OS types.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Define OS as the manager of a hotel or principal of a school.',
          demonstrate: 'Show Windows 11 desktop, settings, task manager, and system info screen.',
          practice: 'Explore system specs: CPU model, RAM size, storage space on lab PC.',
          realWorldExample: 'Android and iOS for phones; Windows, macOS, and Linux for computers.',
          practicalTask: 'Find your lab computer RAM size, OS version, and Processor name using System Info.',
          expectedOutput: 'Student writes down OS: Windows 10/11, RAM: 8GB, Processor specs.'
        }
      },
      {
        id: 'cls-4',
        classNum: 4,
        topic: 'Ubuntu / Linux Introduction & Open Source',
        simpleConcept: 'An open-source, free, secure operating system used worldwide in servers and labs.',
        objective: 'Understand open-source software and navigate basic Ubuntu GUI interface.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Explain open source vs commercial software. Introduce Linux reliability in tech companies.',
          demonstrate: 'Boot into Ubuntu/Linux interface, show Dock, App Launcher, Files app.',
          practice: 'Launch Firefox, Text Editor, and Terminal in Ubuntu environment.',
          realWorldExample: '90%+ of cloud servers, supercomputers, and Android OS run on Linux kernel.',
          practicalTask: 'Open Ubuntu file manager, browse Home directory, open Terminal and type "whoami".',
          expectedOutput: 'Student executes first Linux command in terminal.'
        }
      },
      {
        id: 'cls-5',
        classNum: 5,
        topic: 'Desktop Navigation, Side-by-Side Windows & Troubleshooting',
        simpleConcept: 'Navigating Start Menu, Taskbar, Control Center, and snapping windows side-by-side.',
        objective: 'Master desktop UI navigation, window management, and basic task manager troubleshooting.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain taskbar, quick settings, window snapping, and closing frozen apps via Task Manager.',
          demonstrate: 'Opening 2 apps (Notepad, Calculator), snapping windows side-by-side, switching with Alt+Tab.',
          practice: 'Snap Calculator on the left and Notepad on the right screen half.',
          realWorldExample: 'Working with multiple reference documents side-by-side while taking study notes.',
          practicalTask: 'Snap Notepad and Calculator side-by-side, take a screenshot, and save it.',
          expectedOutput: 'Clean side-by-side window snap configuration.'
        }
      }
    ]
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'File Management & Storage',
    purpose: 'Master file, folder, and storage management on local and external drives.',
    icon: 'fas fa-folder-open',
    color: '#3B82F6',
    realProject: {
      title: 'Organize My Personal Computer Workspace',
      description: 'Students design a clean folder tree for Documents, Photos, Projects, Assignments, and Certificates.'
    },
    classes: [
      {
        id: 'cls-6',
        classNum: 6,
        topic: 'Files, Folders & File Extension Basics',
        simpleConcept: 'How computers store data in files inside folders, and what file types mean (.jpg, .mp3, .pdf).',
        objective: 'Understand file extensions, folder hierarchies, and file types.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Compare files to paper documents and folders to physical office file cabinets.',
          demonstrate: 'Creating a new folder, showing file extensions in File Explorer view options.',
          practice: 'Create a main folder named `My_First_Computer_Folder` on Desktop.',
          realWorldExample: 'Organizing school notes, music playlists, and photo albums.',
          practicalTask: 'Create a root folder with 3 subfolders: `Documents`, `Pictures`, and `School_Projects`.',
          expectedOutput: 'Root folder with 3 correctly named subfolders.'
        }
      },
      {
        id: 'cls-7',
        classNum: 7,
        topic: 'Creating, Naming, Renaming & Searching Files',
        simpleConcept: 'Giving clear names to your work so you can find any file in seconds.',
        objective: 'Master file creation, clear naming conventions, and Windows search bar filters.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Good file naming (e.g. `English_Assignment_Class1.txt`) vs bad naming (`asdf.txt`).',
          demonstrate: 'Creating text files, renaming them, and using File Explorer search bar.',
          practice: 'Create 3 text files inside subfolders and search for them using wildcard keywords.',
          realWorldExample: 'Finding a specific receipt or project file out of 1,000 documents.',
          practicalTask: 'Create a text file `My_Bio.txt`, rename it to `Student_Profile_2026.txt`, search for it in Explorer.',
          expectedOutput: 'Renamed file located via File Explorer search bar.'
        }
      },
      {
        id: 'cls-8',
        classNum: 8,
        topic: 'Copy, Move, Cut, Paste & Recycle Bin',
        simpleConcept: 'Duplicating files, relocating files, and restoring accidentally deleted files.',
        objective: 'Master Copy vs Cut, pasting across folders, and Recycle Bin/Trash recovery.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Difference between Copy (Duplicate) and Cut (Move). How Recycle Bin works as safety net.',
          demonstrate: 'Copying a file from Desktop to Documents folder, deleting a file and restoring from Recycle Bin.',
          practice: 'Practice copying 2 files into a backup folder, deleting 1 file, and restoring it.',
          realWorldExample: 'Backing up assignment files to a secondary folder before making edits.',
          practicalTask: 'Copy a text file into a backup folder, delete original to Recycle Bin, and restore it.',
          expectedOutput: 'Successful file copy, deletion, and restoration.'
        }
      },
      {
        id: 'cls-9',
        classNum: 9,
        topic: 'USB Flash Drives & Safe Ejection',
        simpleConcept: 'Transferring files between computers safely using USB drives without data corruption.',
        objective: 'Connect external USB drives, copy files across drives, and perform safe hardware ejection.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Why pulling out a USB drive while writing data corrupts files! Always click "Safely Remove Hardware".',
          demonstrate: 'Inserting a USB flash drive, copying a folder to the drive, and safely ejecting drive from taskbar.',
          practice: 'Students insert lab USB drive, copy project folder, and perform safe removal.',
          realWorldExample: 'Submitting lab projects to teachers via USB pen drive.',
          practicalTask: 'Copy your `School_Projects` folder to a USB drive and safely eject the drive.',
          expectedOutput: 'Verified file transfer to USB and clean hardware ejection notification.'
        }
      }
    ]
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Keyboard & Typing Mastery',
    purpose: 'Develop touch-typing posture, home-row finger placement, speed, and essential keyboard shortcuts.',
    icon: 'fas fa-keyboard',
    color: '#8B5CF6',
    realProject: {
      title: 'Typing Speed Certification Test',
      description: 'Students complete a 5-minute touch-typing assessment reaching 25+ WPM with 95%+ accuracy.'
    },
    classes: [
      {
        id: 'cls-10',
        classNum: 10,
        topic: 'Keyboard Layout, Home Row & Finger Placement',
        simpleConcept: 'Placing your fingers on ASDF and JKL; keys so you can type without looking at keys.',
        objective: 'Master home-row finger positioning, posture, and touch-typing fundamentals.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Home row keys (F and J bumps). Left hand (A S D F), Right hand (J K L ;), thumbs on Spacebar.',
          demonstrate: 'Demonstrate proper ergonomic posture, hand curvature, and typing without looking down.',
          practice: 'Practice typing home row letter combinations (asdf jkl; fj fj asdf) in Typing Club / Monkeytype.',
          realWorldExample: 'Professional programmers and writers typing at 60+ WPM effortlessly.',
          practicalTask: 'Complete 10 minutes of Home Row typing exercises with 90%+ accuracy.',
          expectedOutput: 'Home row typing lesson completed with score report.'
        }
      },
      {
        id: 'cls-11',
        classNum: 11,
        topic: 'Essential Keyboard Shortcuts (Ctrl+C, V, Z, S, A, Tab)',
        simpleConcept: 'Using keyboard shortcuts to work 5x faster than using mouse clicks.',
        objective: 'Memorize and execute top 10 universal system and editing shortcuts.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+X (Cut), Ctrl+Z (Undo), Ctrl+S (Save), Ctrl+A (Select All), Alt+Tab (Switch App).',
          demonstrate: 'Performing a complete text edit operation using ONLY keyboard shortcuts without mouse.',
          practice: 'Type a paragraph in Notepad, select all with Ctrl+A, copy with Ctrl+C, paste 3 times with Ctrl+V.',
          realWorldExample: 'Speeding up daily office work and computer tasks.',
          practicalTask: 'Complete a text editing test using strictly keyboard shortcuts.',
          expectedOutput: 'Text editing task completed 100% via keyboard shortcuts.'
        }
      },
      {
        id: 'cls-12',
        classNum: 12,
        topic: 'Speed & Accuracy Typing Challenge',
        simpleConcept: 'Increasing your typing speed (Words Per Minute) while keeping errors low.',
        objective: 'Measure baseline WPM speed and improve accuracy above 95%.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '45 min',
          explain: 'Speed vs Accuracy rule: Accuracy comes FIRST! Speed follows naturally.',
          demonstrate: 'Running a 1-minute typing test on Monkeytype or Typing.com.',
          practice: 'Students take 3 timed 1-minute typing tests and record their highest WPM score.',
          realWorldExample: 'Data entry jobs and office secretary speed requirements (30-40 WPM).',
          practicalTask: 'Achieve a minimum 20 WPM typing speed on a 1-minute test with 90%+ accuracy.',
          expectedOutput: 'Typing test score screenshot showing WPM and accuracy percentage.'
        }
      },
      {
        id: 'cls-13',
        classNum: 13,
        topic: 'Malayalam & Regional Language Keyboard Input',
        simpleConcept: 'Typing in Malayalam and regional languages on your computer keyboard.',
        objective: 'Enable regional language input method (InScript/Phonetic) and type simple Malayalam words.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Language input tools (Malayalam ISM / Google Input Tools / Phonetic keyboard).',
          demonstrate: 'Switching language keyboard layout to Malayalam and typing "നമസ്കാരം" (Namaskaram).',
          practice: 'Type your name, school name, and district in Malayalam.',
          realWorldExample: 'Government web portals, local news publishing, and regional office documentation.',
          practicalTask: 'Create a Word document containing 3 sentences written in Malayalam.',
          expectedOutput: 'Short text document formatted in Malayalam script.'
        }
      }
    ]
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Internet, Email & Digital Safety',
    purpose: 'Master web browsers, search techniques, professional email writing, cloud storage, and cyber safety.',
    icon: 'fas fa-globe',
    color: '#EC4899',
    realProject: {
      title: 'Professional Email & Cloud Drive Setup',
      description: 'Students compose a formal email with attachments to their teacher and share a Google Drive folder link.'
    },
    classes: [
      {
        id: 'cls-14',
        classNum: 14,
        topic: 'Web Browsers & Effective Search Techniques',
        simpleConcept: 'Using browsers (Chrome, Edge) and search engine tricks to find exact answers quickly.',
        objective: 'Understand browser UI (Tabs, Bookmarks, History) and search operators (quotes, site search).',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Search operators: Using exact quotes `"digital skills"`, site filter `site:edu`, and filetype filter `filetype:pdf`.',
          demonstrate: 'Searching for a syllabus PDF using search filters and saving a bookmark.',
          practice: 'Search for 3 specific educational topics using search operators and bookmark official websites.',
          realWorldExample: 'Researching academic topics and verifying official government announcements.',
          practicalTask: 'Find an educational PDF online using search operator `filetype:pdf` and save it to Downloads.',
          expectedOutput: 'Downloaded PDF document found via advanced search query.'
        }
      },
      {
        id: 'cls-15',
        classNum: 15,
        topic: 'Email Basics & Writing Formal Emails',
        simpleConcept: 'Creating an email account, sending messages, adding attachments, and writing formal emails.',
        objective: 'Master Email fields (To, Cc, Bcc, Subject), formal email structure, and file attachments.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Email etiquette: Subject Line -> Greeting -> Clear Body -> Sign-off -> Sender Name.',
          demonstrate: 'Composing a formal email to teacher requesting leave, attaching a PDF assignment.',
          practice: 'Compose a formal email to lab teacher with an assignment attachment.',
          realWorldExample: 'Job application emails, college admission inquiries, and corporate correspondence.',
          practicalTask: 'Send an email to your teacher with subject `[Class 15] Assignment Submission` and attached file.',
          expectedOutput: 'Received email with subject line and attachment in teacher inbox.'
        }
      },
      {
        id: 'cls-16',
        classNum: 16,
        topic: 'Google Drive & Cloud Storage Basics',
        simpleConcept: 'Saving your files on the internet cloud so you can access them from any computer.',
        objective: 'Upload files to Google Drive, organize cloud folders, and share file view links.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Cloud storage concept (Google Drive / OneDrive). Link sharing permissions (Restricted vs Anyone with link).',
          demonstrate: 'Uploading a file to Google Drive, getting shareable link, and opening link in Incognito tab.',
          practice: 'Upload 2 files to Google Drive, create shareable link, and submit link.',
          realWorldExample: 'Accessing your certificates from a mobile phone at any cyber cafe.',
          practicalTask: 'Upload your assignment to Google Drive and copy the view link.',
          expectedOutput: 'Valid shareable Google Drive file link.'
        }
      },
      {
        id: 'cls-17',
        classNum: 17,
        topic: 'Cyber Safety, Passwords & Phishing Awareness',
        simpleConcept: 'Protecting your personal data, creating strong passwords, and avoiding online scams.',
        objective: 'Understand strong password criteria, 2-Factor Authentication (2FA), and recognize phishing scams.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Phishing red flags: Unknown sender, urgency ("Account blocked!"), suspicious URL links, asking for OTP/passwords.',
          demonstrate: 'Evaluating fake vs real website URLs, testing password strength on a password analyzer.',
          practice: 'Identify phishing red flags in 3 sample email screenshots.',
          realWorldExample: 'Preventing bank account fraud, social media account hacks, and identity theft.',
          practicalTask: 'Write down 5 rules of online cyber safety in a digital checklist document.',
          expectedOutput: '5-point Cyber Safety checklist document.'
        }
      },
      {
        id: 'cls-18',
        classNum: 18,
        topic: 'Digital Etiquette & Safe Downloading',
        simpleConcept: 'Downloading files safely without accidentally installing viruses or adware.',
        objective: 'Identify safe download sources, check file extension safety (.exe vs .pdf), and practice netiquette.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Download safety: Avoid green fake "Download" ads! Verify official website domain before downloading software.',
          demonstrate: 'Downloading a free open-source software (e.g. VLC or GIMP) safely from official home site.',
          practice: 'Verify official vs fake download links for a software package.',
          realWorldExample: 'Keeping personal and school computers free from malware and viruses.',
          practicalTask: 'Locate official download page for VLC player, verify HTTPS secure icon, download installer file.',
          expectedOutput: 'Installer file downloaded safely from verified official website.'
        }
      }
    ]
  },
  {
    id: 'mod-5',
    number: 5,
    title: 'MS Word Fundamentals',
    purpose: 'Master word processing: text formatting, paragraph alignment, tables, borders, and formal document creation.',
    icon: 'fas fa-file-word',
    color: '#2563EB',
    realProject: {
      title: 'Formal Application & Student Profile Document',
      description: 'Students format a complete leave application letter and a 2-page student profile document with tables and images.'
    },
    classes: [
      {
        id: 'cls-19',
        classNum: 19,
        topic: 'MS Word Interface & Text Formatting',
        simpleConcept: 'Creating word documents and styling fonts, colors, sizes, and highlights.',
        objective: 'Navigate MS Word ribbon, apply Font Type, Size, Bold, Italic, Underline, and Text Color.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Ribbon tabs (Home, Insert, Layout). Standard document font rules (Calibri/Times New Roman, 12pt body text).',
          demonstrate: 'Creating a document, formatting heading to 18pt Bold, body text to 12pt regular.',
          practice: 'Type a paragraph about your school and format headings and text colors.',
          realWorldExample: 'Writing school essays, letters, and homework reports.',
          practicalTask: 'Type a 100-word paragraph, format Title (18pt Bold Blue) and Subheading (14pt Italic).',
          expectedOutput: 'Formatted MS Word `.docx` file saved.'
        }
      },
      {
        id: 'cls-20',
        classNum: 20,
        topic: 'Paragraph Alignment, Spacing & Bullet Lists',
        simpleConcept: 'Aligning text (Left, Center, Right, Justify), setting line spacing, and making bulleted lists.',
        objective: 'Apply Paragraph Alignment, Line Spacing (1.15/1.5), and Bulleted/Numbered lists.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'When to use Center (Titles), Justify (Formal articles/reports), and Bullet lists (Key points).',
          demonstrate: 'Setting 1.5 line spacing, applying bullet points, and justifying body paragraphs.',
          practice: 'Format a list of 5 school subjects into a numbered list with 1.5 line spacing.',
          realWorldExample: 'Formatting formal resume points and meeting action items.',
          practicalTask: 'Create a numbered list of 5 study goals with 1.5 line spacing and justified text alignment.',
          expectedOutput: 'Formatted Word document with bullet list and line spacing.'
        }
      },
      {
        id: 'cls-21',
        classNum: 21,
        topic: 'Inserting Images, Shapes & Page Setup',
        simpleConcept: 'Adding pictures, shapes, text wrapping, and adjusting page margins and paper size.',
        objective: 'Insert images, configure Text Wrapping (In Front of Text / Square), and set Page Margins to Normal/Narrow.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Text Wrapping: Why images jump around until you set Wrap Text to Square or Tight! Margins (Normal 1 inch).',
          demonstrate: 'Inserting a picture into Word, setting Text Wrapping to Square, resizing and positioning image.',
          practice: 'Insert a school logo or photo into a Word document and align text around it.',
          realWorldExample: 'Adding diagrams to science projects and news articles.',
          practicalTask: 'Insert an image into Word, set Wrap Text to Square, add a border to the image.',
          expectedOutput: 'Word document with formatted image and text wrapping.'
        }
      },
      {
        id: 'cls-22',
        classNum: 22,
        topic: 'Working with Tables in Word',
        simpleConcept: 'Organizing data in rows and columns inside Word documents.',
        objective: 'Insert tables, adjust row/column widths, apply shading, and style cell borders.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Table terms: Rows (horizontal), Columns (vertical), Cells (boxes). Table Design tab styling.',
          demonstrate: 'Inserting a 4x5 table for a class weekly timetable and applying header background shading.',
          practice: 'Create a 4x4 weekly study timetable table in Word.',
          realWorldExample: 'Creating school class timetables, price lists, and comparison sheets.',
          practicalTask: 'Build a 5-column Weekly School Timetable table with colored header row.',
          expectedOutput: 'Styled 5-column timetable table in MS Word.'
        }
      },
      {
        id: 'cls-23',
        classNum: 23,
        topic: 'Real Project 1: Formal Leave Application Letter',
        simpleConcept: 'Writing a perfectly formatted formal letter to your School Principal or Teacher.',
        objective: 'Assemble formal letter layout: Sender Address, Date, Recipient, Subject line, Salutation, Body, Sign-off.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Formal letter template structure and spacing rules.',
          demonstrate: 'Formatting a formal leave application letter with correct margins and text alignment.',
          practice: 'Type and format a formal leave letter for 2 days absence.',
          realWorldExample: 'Official correspondence to principals, bank managers, and employers.',
          practicalTask: 'Create and format a formal Leave Application Letter saved as `Leave_Application.docx`.',
          expectedOutput: 'Print-ready formal leave application document.'
        }
      },
      {
        id: 'cls-24',
        classNum: 24,
        topic: 'Real Project 2: Student Resume / Profile Sheet',
        simpleConcept: 'Creating a clean 1-page student profile document showcasing contact info, education, and skills.',
        objective: 'Combine typography, bullet lists, table layout, and profile photo into a single page document.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Student Profile layout: Header (Name & Contact) -> Education Table -> Skills Bullets -> Languages.',
          demonstrate: 'Building a 1-page Student Profile sheet in MS Word.',
          practice: 'Students build their personal 1-page Student Profile sheet.',
          realWorldExample: 'Applying for school student council posts, club memberships, and competitions.',
          practicalTask: 'Complete 1-page Student Profile document saved as `Student_Profile.docx`.',
          expectedOutput: 'Finished 1-page Student Profile document file.'
        }
      }
    ]
  },
  {
    id: 'mod-6',
    number: 6,
    title: 'MS Excel Fundamentals',
    purpose: 'Master spreadsheets: grid cells, formatting, basic math formulas (SUM, AVERAGE), simple tables, and charts.',
    icon: 'fas fa-file-excel',
    color: '#10B981',
    realProject: {
      title: 'Student Marks & Class Result Sheet',
      description: 'Students enter subject marks into Excel, calculate Total and Average using formulas, format cells, and generate a column chart.'
    },
    classes: [
      {
        id: 'cls-25',
        classNum: 25,
        topic: 'Excel Grid Interface, Cells & Data Entry',
        simpleConcept: 'Understanding rows (1, 2, 3), columns (A, B, C), and cell addresses (A1, B5).',
        objective: 'Navigate Excel grid, enter text and numbers into cells, and adjust column widths.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Grid concept: Columns are letters, Rows are numbers. Cell address = Column letter + Row number (e.g. C4).',
          demonstrate: 'Entering student names in Column A and marks in Column B, double-clicking column border to auto-fit width.',
          practice: 'Enter 5 student names and their marks for 3 subjects into an Excel sheet.',
          realWorldExample: 'Shop inventory sheets, attendance registers, and scorecards.',
          practicalTask: 'Create an Excel table with 5 student rows and columns for Name, Math, Science, and English.',
          expectedOutput: 'Clean Excel grid with 5 student data rows.'
        }
      },
      {
        id: 'cls-26',
        classNum: 26,
        topic: 'Cell Formatting, Borders & Number Styles',
        simpleConcept: 'Making spreadsheet data easy to read with fill colors, borders, and number formats.',
        objective: 'Apply Cell Fill Color, All Borders, Bold Headers, Currency/Percentage formatting, and Number alignment.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Why unformatted Excel sheets look messy! Apply header fill color, grid borders, and right-align numbers.',
          demonstrate: 'Applying blue header fill, white bold text, and thin black cell gridlines.',
          practice: 'Format a raw mark sheet into a clean visual table with styled header row.',
          realWorldExample: 'Corporate financial statements and published statistical reports.',
          practicalTask: 'Format your mark sheet table with colored header fill, grid borders, and bold text.',
          expectedOutput: 'Visually formatted Excel table.'
        }
      },
      {
        id: 'cls-27',
        classNum: 27,
        topic: 'Basic Formulas: SUM & AutoSum',
        simpleConcept: 'Writing formulas starting with `=` to make Excel calculate totals automatically.',
        objective: 'Understand formula syntax (`=`) and write `=SUM(range)` formulas.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Golden Rule of Excel: All formulas start with `=` sign! `=SUM(B2:B6)` adds all numbers from B2 to B6 automatically.',
          demonstrate: 'Writing `=SUM(B2:D2)` for a student total mark and dragging AutoFill handle down Column E.',
          practice: 'Calculate total marks for 5 students using `=SUM()` formula and fill handle.',
          realWorldExample: 'Automatic bill totals in supermarkets and bank calculations.',
          practicalTask: 'Add a `Total Marks` column and calculate total for 5 students using `=SUM()` formula.',
          expectedOutput: 'Total marks calculated dynamically using `=SUM()` formulas.'
        }
      },
      {
        id: 'cls-28',
        classNum: 28,
        topic: 'Basic Formulas: AVERAGE, MIN, MAX & COUNT',
        simpleConcept: 'Calculating average marks, finding highest/lowest scores, and counting total entries.',
        objective: 'Apply `=AVERAGE()`, `=MIN()`, `=MAX()`, and `=COUNT()` functions.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: '`=AVERAGE(B2:B6)` calculates mean score. `=MAX()` finds top score. `=MIN()` finds lowest score.',
          demonstrate: 'Adding summary rows at the bottom of table for Class Average, Top Mark, and Lowest Mark.',
          practice: 'Calculate Average, Highest, and Lowest mark for each subject in your sheet.',
          realWorldExample: 'Calculating student pass percentages and weather temperature statistics.',
          practicalTask: 'Calculate Average, Min, and Max scores for 3 subject columns using formulas.',
          expectedOutput: 'Summary statistics calculated using AVERAGE, MIN, MAX formulas.'
        }
      },
      {
        id: 'cls-29',
        classNum: 29,
        topic: 'Basic Data Sorting & Creating Column Charts',
        simpleConcept: 'Sorting student names alphabetically or by total marks, and turning data into visual column charts.',
        objective: 'Perform Data Sort (A-Z, Largest to Smallest) and insert a 2D Column / Bar Chart.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Data Sorting (Rank students by total marks) and Chart Insertion (Select data -> Insert Column Chart).',
          demonstrate: 'Sorting mark table by Total Marks descending, and creating a Column Chart comparing student scores.',
          practice: 'Sort student list by total marks and generate a column chart.',
          realWorldExample: 'Comparing sales performance across store branches using bar graphs.',
          practicalTask: 'Sort 5 students by Total Marks descending and insert a Column Chart visualizing total scores.',
          expectedOutput: 'Sorted Excel table with embedded 2D Column Chart.'
        }
      },
      {
        id: 'cls-30',
        classNum: 30,
        topic: 'Real Project: Complete Student Mark Sheet & Report',
        simpleConcept: 'Building a complete, print-ready Student Mark Sheet with formatted header, total, average, and chart.',
        objective: 'Combine data entry, formatting, SUM, AVERAGE, sorting, and chart visual into 1 master Excel file.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '50 min',
          explain: 'Final Mark Sheet checklist: Title banner -> Table headers -> Student data -> SUM Total -> AVERAGE -> Column Chart.',
          demonstrate: 'Reviewing complete student mark sheet project requirements.',
          practice: 'Students build their complete Student Mark Sheet project.',
          realWorldExample: 'School term exam results processing and progress report cards.',
          practicalTask: 'Complete and submit your master `Student_MarkSheet_2026.xlsx` file.',
          expectedOutput: 'Finished master Student Mark Sheet Excel spreadsheet.'
        }
      }
    ]
  },
  {
    id: 'mod-7',
    number: 7,
    title: 'MS PowerPoint Fundamentals',
    purpose: 'Master slide presentations: slide layouts, typography, images, simple slide transitions, and presentation delivery.',
    icon: 'fas fa-file-powerpoint',
    color: '#F59E0B',
    realProject: {
      title: '5-Slide Topic Presentation',
      description: 'Students design and present a 5-slide presentation on a topic like "My Favorite Hobby" or "Cyber Safety Tips".'
    },
    classes: [
      {
        id: 'cls-31',
        classNum: 31,
        topic: 'PowerPoint Interface, Slides & Layouts',
        simpleConcept: 'Creating presentation slides using Title, Content, and Comparison layouts.',
        objective: 'Navigate PowerPoint UI, add new slides, and choose appropriate Slide Layouts.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Slide Layouts: Title Slide (Cover) -> Title & Content (Body) -> Two Content (Comparison).',
          demonstrate: 'Creating a new 3-slide deck, changing layouts, and editing title placeholders.',
          practice: 'Create a 3-slide presentation with Title, Subheading, and Content list.',
          realWorldExample: 'School seminar presentations and project reviews.',
          practicalTask: 'Create a 3-slide presentation deck: Slide 1 (Title), Slide 2 (About Me), Slide 3 (My Hobbies).',
          expectedOutput: '3-slide presentation saved as `.pptx`.'
        }
      },
      {
        id: 'cls-32',
        classNum: 32,
        topic: 'Adding Text, Colors, Themes & Formatting',
        simpleConcept: 'Making slides look attractive using design themes, background colors, and readable fonts.',
        objective: 'Apply PowerPoint Design Themes, Background Styles, and Font Formatting.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Contrast Rule: Light text on dark background OR dark text on light background! Avoid cluttered backgrounds.',
          demonstrate: 'Applying a clean Design Theme, changing theme color variant, and adjusting font sizes.',
          practice: 'Apply a design theme to your 3-slide deck and format headings.',
          realWorldExample: 'Professional keynote presentations and business proposals.',
          practicalTask: 'Apply a built-in PowerPoint Design Theme to your deck and format text for high contrast.',
          expectedOutput: 'Presentation deck with consistent design theme.'
        }
      },
      {
        id: 'cls-33',
        classNum: 33,
        topic: 'Inserting Pictures, Shapes & Icons',
        simpleConcept: 'Adding visuals, pictures, shapes, and icons to support slide text.',
        objective: 'Insert images, shapes, smart icons, and arrange visual elements on slides.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Visual Rule: "Show, don\'t just tell!" Pair key text bullet points with relevant images or icons.',
          demonstrate: 'Inserting an image into Slide 2, resizing with corner handles, and adding a subtle shape banner.',
          practice: 'Add 2 images and 2 icons to your presentation slides.',
          realWorldExample: 'TED talks and educational lecture presentations.',
          practicalTask: 'Insert 2 relevant images into your presentation slides and align them cleanly.',
          expectedOutput: 'Slides formatted with text and matching image visuals.'
        }
      },
      {
        id: 'cls-34',
        classNum: 34,
        topic: 'Slide Transitions & Basic Animations',
        simpleConcept: 'Adding smooth page-turn transitions between slides and subtle text entrance animations.',
        objective: 'Apply Slide Transitions (Fade, Wipe, Push) and basic Text Animations (Appear, Fade).',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Subtlety Rule: Use gentle transitions like Fade or Push! Avoid crazy spinning animations that distract.',
          demonstrate: 'Applying "Fade" transition to all slides and "Fade In" entrance animation to bullet text.',
          practice: 'Apply Fade transition to all slides and test in Full Screen Slide Show mode (F5).',
          realWorldExample: 'Smooth broadcast slide shows and webinar presentations.',
          practicalTask: 'Apply Fade transition across all slides and test presentation in Full Screen view (F5).',
          expectedOutput: 'Presentation deck with smooth slide transitions.'
        }
      },
      {
        id: 'cls-35',
        classNum: 35,
        topic: 'Real Project: 5-Slide Topic Presentation & Practice',
        simpleConcept: 'Designing and delivering a complete 5-slide presentation on a topic of your choice.',
        objective: 'Combine title slide, content slides, image visuals, slide transitions, and full screen delivery (F5).',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '50 min',
          explain: 'Delivery tips: Speak clearly, look at audience, press Spacebar/Arrow key to advance slides.',
          demonstrate: 'Conducting a sample 2-minute slide presentation.',
          practice: 'Students complete and practice delivering their 5-slide presentation.',
          realWorldExample: 'Classroom seminar presentations and public speaking skills.',
          practicalTask: 'Present your 5-slide presentation deck to your lab teacher in full screen mode.',
          expectedOutput: '5-slide completed `.pptx` presentation delivered in full screen.'
        }
      }
    ]
  },
  {
    id: 'mod-8',
    number: 8,
    title: 'Canva Design Fundamentals',
    purpose: 'Learn cloud-based graphic design: Canva templates, typography, colors, and simple poster creation.',
    icon: 'fas fa-palette',
    color: '#EC4899',
    realProject: {
      title: 'Simple Event Poster & Social Media Post',
      description: 'Students use Canva to design an eye-catching poster for a school event and an Instagram post graphic.'
    },
    classes: [
      {
        id: 'cls-36',
        classNum: 36,
        topic: 'Canva Interface & Template Selection',
        simpleConcept: 'Setting up a free Canva account, browsing template categories, and starting a design.',
        objective: 'Navigate Canva dashboard, search design templates (Poster, Social Media), and open canvas editor.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'What Canva is: Easy cloud graphic design tool with thousands of ready-made professional templates.',
          demonstrate: 'Opening Canva, searching "School Event Poster", selecting a clean template, and exploring left sidebar.',
          practice: 'Select an event poster template and customize title text.',
          realWorldExample: 'Quick social media design for small businesses and school clubs.',
          practicalTask: 'Open a Canva Poster canvas, select a template, and edit headline text to "Science Exhibition 2026".',
          expectedOutput: 'Customized Canva poster design in editor.'
        }
      },
      {
        id: 'cls-37',
        classNum: 37,
        topic: 'Text, Font Pairings & Basic Graphics in Canva',
        simpleConcept: 'Adding custom headings, picking readable fonts, and inserting graphic elements/shapes.',
        objective: 'Combine font pairings, adjust text sizes/colors, and search/insert Canva Elements (shapes, icons).',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Font pairing rule: Pair a bold display heading font (Montserrat) with a simple body font (Open Sans).',
          demonstrate: 'Adding text box, changing font color, searching for "Star icon" in Elements tab, and positioning shapes.',
          practice: 'Add 2 graphic elements and 2 styled text boxes to your Canva poster.',
          realWorldExample: 'Designing promotional banners, flyers, and notice board announcements.',
          practicalTask: 'Add a graphic icon element and 2 customized text boxes to your poster canvas.',
          expectedOutput: 'Poster canvas updated with icons and custom font styling.'
        }
      },
      {
        id: 'cls-38',
        classNum: 38,
        topic: 'Color Selection & Image Uploads in Canva',
        simpleConcept: 'Uploading your own photos into Canva and applying matching background colors.',
        objective: 'Upload external images into Canva, apply background color palettes, and adjust element transparency.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Uploads tab: Importing personal photos into Canva designs. Color palette recommendations.',
          demonstrate: 'Uploading a school photo, placing it inside a photo frame element, and changing background color.',
          practice: 'Upload a picture into Canva and format background colors.',
          realWorldExample: 'Customizing brand templates with custom product photos.',
          practicalTask: 'Upload an image file into Canva, place it in design, and export as PNG image file.',
          expectedOutput: 'Exported PNG image file downloaded from Canva.'
        }
      },
      {
        id: 'cls-39',
        classNum: 39,
        topic: 'Real Project: Simple Event Poster & Social Graphic',
        simpleConcept: 'Designing and downloading a complete School Event Poster and a matching Instagram Post.',
        objective: 'Combine typography, images, icons, color palette, and export as PNG / PDF file.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '50 min',
          explain: 'Export options: PNG (High quality image for web/social) vs PDF Print (For paper printing).',
          demonstrate: 'Exporting final Canva poster as PNG and downloading file to computer Downloads folder.',
          practice: 'Students complete their event poster and export final PNG file.',
          realWorldExample: 'Publishing posters on school notice boards and social media pages.',
          practicalTask: 'Export your finished Canva School Event Poster as a PNG file and save in your portfolio folder.',
          expectedOutput: 'Finished School Event Poster PNG image file.'
        }
      }
    ]
  },
  {
    id: 'mod-9',
    number: 9,
    title: 'Photoshop Fundamentals',
    purpose: 'Learn desktop photo editing: interface, crop, selection tools, layers, text, and simple background removal.',
    icon: 'fas fa-image',
    color: '#3B82F6',
    realProject: {
      title: 'Edited Photo & Background Removal Project',
      description: 'Students open a photo in Photoshop, crop/resize, select and remove the background, and add text.'
    },
    classes: [
      {
        id: 'cls-40',
        classNum: 40,
        topic: 'Photoshop Interface, Canvas Setup & Crop/Resize',
        simpleConcept: 'Opening images in Photoshop, zooming, panning, cropping unwanted edges, and resizing image size.',
        objective: 'Navigate Photoshop interface, use Zoom/Hand tools, Crop Tool, and Image Size dialog.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Photoshop canvas workspace, Tools bar (left), Layers panel (right), Crop Tool rules.',
          demonstrate: 'Opening a photo in Photoshop, cropping out unwanted background, and resizing to 1000x1000px.',
          practice: 'Open a photo, crop to 1:1 square ratio, and check Image Size dimensions.',
          realWorldExample: 'Cropping profile photos and resizing product photos for web pages.',
          practicalTask: 'Open a photo in Photoshop, crop unwanted edges using Crop Tool, resize to 1000px width.',
          expectedOutput: 'Cropped and resized photo file.'
        }
      },
      {
        id: 'cls-41',
        classNum: 41,
        topic: 'Selection Tools & Basic Layers Concept',
        simpleConcept: 'Selecting specific parts of a picture and understanding how layers work like stacked glass sheets.',
        objective: 'Master Quick Selection Tool / Lasso Tool and understand Layers Panel basics.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Layers concept: Transparent stacked sheets! Background layer vs new floating content layers.',
          demonstrate: 'Selecting an object using Quick Selection Tool (`W`), copying selection onto a new layer (`Ctrl+J`).',
          practice: 'Select an object in a photo and copy it to a new layer.',
          realWorldExample: 'Isolating people or objects in professional photo editing.',
          practicalTask: 'Use Quick Selection Tool to select a subject in a photo and press `Ctrl+J` to duplicate to new layer.',
          expectedOutput: 'Photoshop file with subject isolated on a new layer.'
        }
      },
      {
        id: 'cls-42',
        classNum: 42,
        topic: 'Simple Background Removal & Text Tool',
        simpleConcept: 'Removing solid backgrounds from objects and adding stylized text headers.',
        objective: 'Remove background pixels, create transparent background PNG, and format Type Tool (`T`).',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Transparent canvas background (checkerboard pattern). Adding title text with Type Tool (`T`).',
          demonstrate: 'Removing a white background from a logo, adding text below it, and exporting as PNG.',
          practice: 'Remove background from an image and add a text title.',
          realWorldExample: 'Creating transparent logos for websites and video overlays.',
          practicalTask: 'Remove background from an object image, add text title below, and save as `.psd` and `.png`.',
          expectedOutput: 'Transparent PNG image file with text overlay.'
        }
      },
      {
        id: 'cls-43',
        classNum: 43,
        topic: 'Real Project: Photo Edit & Background Removal',
        simpleConcept: 'Editing a portrait/product photo, cleaning background, adding title text, and saving final export.',
        objective: 'Combine crop/resize, background removal, text formatting, and save as JPEG and PNG file.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '50 min',
          explain: 'Export formats: JPEG (for general photos with solid background) vs PNG (for transparent graphics).',
          demonstrate: 'Saving master `.psd` file and exporting final JPEG image.',
          practice: 'Students complete their photo edit project and export final files.',
          realWorldExample: 'Preparing graphics for school magazine articles and posters.',
          practicalTask: 'Save your completed Photoshop edit project as `Photo_Project.psd` and export `Photo_Project.jpg`.',
          expectedOutput: 'Master PSD file and exported JPEG image.'
        }
      }
    ]
  },
  {
    id: 'mod-10',
    number: 10,
    title: 'AI Awareness & Web Basics',
    purpose: 'Understand AI tools, responsible AI prompt usage, web browser concepts, and basic HTML webpage tags.',
    icon: 'fas fa-code',
    color: '#00F0FF',
    realProject: {
      title: 'My First Web Page Project',
      description: 'Students write a basic HTML file with headings, paragraphs, lists, and images, and preview it in web browser.'
    },
    classes: [
      {
        id: 'cls-44',
        classNum: 44,
        topic: 'Introduction to AI Tools & Simple Prompting',
        simpleConcept: 'Understanding what AI assistants (ChatGPT, Gemini) are and how to ask simple questions.',
        objective: 'Understand AI tools, write simple clear prompts, and observe generated text responses.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'What AI is: Smart computer assistant trained on text! Explain simple prompt formula (Role + Question).',
          demonstrate: 'Asking ChatGPT/Gemini: "Give me 5 interesting facts about Space for a 7th grade science project".',
          practice: 'Ask AI 2 study questions and review answers.',
          realWorldExample: 'Using AI to brainstorm topic ideas, practice English grammar, or summarize long articles.',
          practicalTask: 'Ask an AI tool to generate 5 study tips for exams and copy answers into a text document.',
          expectedOutput: '5 AI-generated study tips document.'
        }
      },
      {
        id: 'cls-45',
        classNum: 45,
        topic: 'Responsible AI Usage & Fact Checking',
        simpleConcept: 'Using AI responsibly for study without cheating, and verifying AI answers for accuracy.',
        objective: 'Understand AI limitations (hallucinations/mistakes), ethical rules, and fact-checking basics.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'AI Warning: AI can make up false facts! Always verify AI facts using Google search or textbooks.',
          demonstrate: 'Fact-checking an AI claim using Google Search and textbook references.',
          practice: 'Check 1 factual claim made by AI against a trusted educational website.',
          realWorldExample: 'Verifying news stories and academic references.',
          practicalTask: 'Verify 2 AI-generated facts using Google Search and record source URL links.',
          expectedOutput: 'Fact-check verification sheet with source website URLs.'
        }
      },
      {
        id: 'cls-46',
        classNum: 46,
        topic: 'How Websites Work & Introduction to HTML',
        simpleConcept: 'How websites load in browsers and how HTML creates the skeleton structure of web pages.',
        objective: 'Understand Web Browsers, HTML (HyperText Markup Language), tags, and document structure.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'HTML structure: `<html>`, `<head>`, `<body>`. HTML tags open `<p>` and close `</p>`.',
          demonstrate: 'Opening Notepad/VS Code, writing first `index.html` file, and opening file in web browser.',
          practice: 'Write basic HTML document structure and display "Hello World" in browser.',
          realWorldExample: 'Every website on the internet (Google, YouTube, Wikipedia) is built with HTML code.',
          practicalTask: 'Create `index.html` in Notepad/VS Code, write basic HTML structure, open in Chrome browser.',
          expectedOutput: 'Working `index.html` file displaying in web browser.'
        }
      },
      {
        id: 'cls-47',
        classNum: 47,
        topic: 'Basic HTML Tags (Headings, Paragraphs, Lists & Links)',
        simpleConcept: 'Writing HTML tags for headings (`<h1>`), text paragraphs (`<p>`), lists (`<ul>`), and links (`<a>`).',
        objective: 'Use HTML5 elements: `<h1>`-`<h6>`, `<p>`, `<ul>`, `<li>`, `<a>`, and `<img>`.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'HTML tags: `<h1>` (Main heading), `<p>` (Paragraph), `<ul><li>` (Bullet list), `<a href="...">` (Link).',
          demonstrate: 'Adding a heading, paragraph, bullet list of hobbies, and a hyperlink to `index.html`.',
          practice: 'Add heading, paragraph, bullet list, and link to your HTML file.',
          realWorldExample: 'Building personal blogs and simple informational web pages.',
          practicalTask: 'Add `<h1>` Title, `<p>` Bio, `<ul>` List of 3 favorite subjects, and `<a>` Link to `index.html`.',
          expectedOutput: 'HTML file containing heading, paragraph, bullet list, and hyperlink.'
        }
      },
      {
        id: 'cls-48',
        classNum: 48,
        topic: 'Real Project: My First Simple HTML Web Page',
        simpleConcept: 'Building and previewing a complete simple personal profile HTML webpage in browser.',
        objective: 'Assemble headings, paragraphs, bullet list, image, and link into a complete `.html` file.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '50 min',
          explain: 'Final +1 Web Project checklist: HTML structure -> Heading -> Photo -> About paragraph -> Skills list -> Link.',
          demonstrate: 'Reviewing complete personal profile HTML webpage preview in Chrome browser.',
          practice: 'Students build and complete their first personal profile HTML webpage.',
          realWorldExample: 'Foundation step towards becoming a web developer or software engineer.',
          practicalTask: 'Complete and submit your `my_first_website.html` file and preview it in web browser.',
          expectedOutput: 'Finished personal profile HTML webpage previewed in browser.'
        }
      }
    ]
  }
];

export const FINAL_SPECIALIZATION_OPTIONS = [
  { id: 'opt-1', title: 'Option A: Digital Office & Document Publishing', icon: 'fas fa-file-word', description: 'Create a formal letter, student mark sheet spreadsheet, and presentation deck.' },
  { id: 'opt-2', title: 'Option B: Graphic Design & Poster Media', icon: 'fas fa-palette', description: 'Design a school event poster in Canva and crop/edit a custom photo in Photoshop.' },
  { id: 'opt-3', title: 'Option C: Web Development Foundation', icon: 'fas fa-code', description: 'Code a personal profile webpage in HTML with headings, lists, images, and links.' }
];

// Helper to compute metrics for +1 syllabus
export const calculateSyllabusMetrics = (savedProgress = {}) => {
  let totalClassesCount = 0;
  let completedClassesCount = 0;
  let moduleProgressMap = {};

  PLUS_ONE_MODULES.forEach((mod) => {
    let modCompleted = 0;
    const modTotal = mod.classes.length;

    mod.classes.forEach((cls) => {
      totalClassesCount++;
      const status = savedProgress[cls.id]?.status || 'NOT STARTED';
      if (status === 'COMPLETED') {
        completedClassesCount++;
        modCompleted++;
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
    remainingClasses: remainingClassesCount,
    overallProgress: overallPercentage,
    moduleProgress: moduleProgressMap
  };
};
