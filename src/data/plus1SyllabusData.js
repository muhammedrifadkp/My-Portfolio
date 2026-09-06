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
        topic: 'Touch-Typing Posture & Home Row Finger Placement',
        simpleConcept: 'Positioning your 10 fingers on ASDF and JKL; without looking at the keys.',
        objective: 'Learn ergonomics, home row anchor keys (F & J bumps), and proper finger movement.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Ergonomic posture (straight back, wrists floating) and tactile bumps on F and J keys.',
          demonstrate: 'Positioning fingers on home row keys and typing sample home row words.',
          practice: 'Practice home row exercises on TypingClub / Monkeytype platform.',
          realWorldExample: 'Professional programmers and writers typing at 70+ WPM effortlessly.',
          practicalTask: 'Complete 10 minutes of Home Row exercises reaching 95% accuracy.',
          expectedOutput: 'Home row typing exercise completed with 95%+ accuracy.'
        }
      },
      {
        id: 'cls-11',
        classNum: 11,
        topic: 'Top Row, Bottom Row & Number Pad Navigation',
        simpleConcept: 'Reaching numbers, symbols, and bottom row letters while keeping fingers anchored on home row.',
        objective: 'Expand touch-typing to QWERTY top row, ZXCV bottom row, and number pad.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Reaching up for QWERTY and down for ZXCV while keeping thumbs resting on spacebar.',
          demonstrate: 'Typing full sentence pangrams (e.g. "The quick brown fox jumps over the lazy dog").',
          practice: 'Type 5 full-alphabet sentences without looking at the physical keyboard.',
          realWorldExample: 'Data entry operators entering numerical financial records rapidly.',
          practicalTask: 'Type the full alphabet pangram 5 times without looking down at keys.',
          expectedOutput: 'Completed 5 pangram lines with minimal errors.'
        }
      },
      {
        id: 'cls-12',
        classNum: 12,
        topic: 'Essential Windows Keyboard Shortcuts',
        simpleConcept: 'Using keyboard shortcuts to perform tasks 10 times faster than mouse clicks.',
        objective: 'Master master shortcuts: Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+A, Alt+Tab, Win+D, Win+E.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Why power users use shortcuts. Demonstrate Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+Z (Undo).',
          demonstrate: 'Selecting all text (Ctrl+A), copying, opening Explorer (Win+E), switching apps (Alt+Tab).',
          practice: 'Complete a shortcut speed drill manipulating text without touching the mouse.',
          realWorldExample: 'Speeding up daily office work by eliminating unnecessary mouse clicks.',
          practicalTask: 'Open 3 apps, use Alt+Tab to navigate, copy text with Ctrl+C, paste with Ctrl+V without using mouse.',
          expectedOutput: 'Demonstrated mouse-free shortcut execution to lab instructor.'
        }
      },
      {
        id: 'cls-13',
        classNum: 13,
        topic: 'Typing Speed & Accuracy Benchmark Test',
        simpleConcept: 'Testing your Words Per Minute (WPM) speed and accuracy score.',
        objective: 'Reach a benchmark speed of 25+ WPM with 95%+ accuracy on a 3-minute typing test.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '45 min',
          explain: 'How WPM is calculated (5 characters = 1 word). The importance of accuracy over raw speed.',
          demonstrate: 'Running a 3-minute test on Monkeytype / Typing.com and viewing detailed performance graph.',
          practice: 'Students complete 3 practice tests and record their highest score.',
          realWorldExample: 'Job requirement benchmarks for IT support, transcription, and admin roles.',
          practicalTask: 'Take a 3-minute official typing test and save screenshot of WPM certificate.',
          expectedOutput: 'Typing test result showing WPM score and accuracy percentage.'
        }
      }
    ]
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Internet, Email & Digital Safety',
    purpose: 'Understand web browsing, professional email communication, digital security, and online safety.',
    icon: 'fas fa-globe',
    color: '#10B981',
    realProject: {
      title: 'Professional Email & Security Audit',
      description: 'Students create a clean professional Gmail account, send formatted emails with attachments, and conduct a security audit.'
    },
    classes: [
      {
        id: 'cls-14',
        classNum: 14,
        topic: 'Web Browsers, Search Engines & Smart Search Tricks',
        simpleConcept: 'How the internet works, Chrome vs Google Search, and using quotation marks to find exact answers.',
        objective: 'Understand browser vs search engine and use advanced Google search operators.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Difference between URL address bar and Google search bar. Using quotes `"exact phrase"` and `filetype:pdf`.',
          demonstrate: 'Searching for `"computer fundamentals" filetype:pdf` to find instant textbook PDFs.',
          practice: 'Find 3 specific educational articles using search operators.',
          realWorldExample: 'Finding exact academic research papers quickly without wading through ads.',
          practicalTask: 'Search for a free computer history PDF using `filetype:pdf` operator and download it.',
          expectedOutput: 'Target PDF downloaded to student Downloads folder.'
        }
      },
      {
        id: 'cls-15',
        classNum: 15,
        topic: 'Professional Email Creation & Etiquette',
        simpleConcept: 'Creating a clean email ID (e.g. name.student@gmail.com) and writing respectful emails.',
        objective: 'Create a professional email account, understand Subject lines, and formal greeting etiquette.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Professional email address vs informal address. Importance of clear Subject line and formal sign-off.',
          demonstrate: 'Drafting a formal leave application or project submission email to a teacher.',
          practice: 'Draft a formal email template with Subject, Salutation, Body, and Signature.',
          realWorldExample: 'Applying for college admissions, jobs, or communicating with professors.',
          practicalTask: 'Write a formal email draft requesting project feedback from your IT instructor.',
          expectedOutput: 'Clean email draft with subject, salutation, body text, and signature.'
        }
      },
      {
        id: 'cls-16',
        classNum: 16,
        topic: 'Sending Emails with Attachments, CC, and BCC',
        simpleConcept: 'Attaching files to emails, and understanding CC (Carbon Copy) vs BCC (Blind Carbon Copy).',
        objective: 'Attach documents, images, PDFs to emails and correctly use CC/BCC fields.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'When to use CC (looping in team members) vs BCC (protecting recipient privacy when sending to groups).',
          demonstrate: 'Composing an email, attaching a 1MB document, adding CC recipient, and sending.',
          practice: 'Send an email with a sample PDF attachment to a classmate and CC the teacher.',
          realWorldExample: 'Sending job application resumes with attached PDFs to hiring managers.',
          practicalTask: 'Send an email to lab partner with an attached text file and CC the lab instructor.',
          expectedOutput: 'Email received by classmate with verified attachment.'
        }
      },
      {
        id: 'cls-17',
        classNum: 17,
        topic: 'Password Security, 2FA & Online Scam Defense',
        simpleConcept: 'Creating unhackable passwords, enabling 2-Factor Authentication, and spotting fake phishing links.',
        objective: 'Understand strong password formulas, 2FA security, and recognize phishing red flags.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Why `123456` or `password` get hacked in seconds. Passphrases like `Blue!Sky2026#`. Phishing email signs.',
          demonstrate: 'Checking password strength on safety tools and inspecting fake vs real website URLs.',
          practice: 'Audit 3 sample emails to spot suspicious sender addresses and fake urgent links.',
          realWorldExample: 'Protecting bank accounts, social media profiles, and personal identity from cyber criminals.',
          practicalTask: 'Create a 14-character passphrase and audit 3 sample emails for phishing indicators.',
          expectedOutput: 'Student identifies fake phishing email correctly.'
        }
      },
      {
        id: 'cls-18',
        classNum: 18,
        topic: 'Digital Footprint, Privacy Settings & Cyber Safety Laws',
        simpleConcept: 'Everything you post online stays online forever. Understanding cyber safety and privacy.',
        objective: 'Manage social media privacy settings, protect personal data, and understand IT safety laws.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Digital footprint concept. Cyberbullying, privacy settings, and basic IT Act laws.',
          demonstrate: 'Checking Google account privacy dashboard and turning off unnecessary location tracking.',
          practice: 'Perform a self-google search and review public profile privacy settings.',
          realWorldExample: 'Employers and university admissions committees reviewing applicants\' public online footprints.',
          practicalTask: 'Review account privacy settings and list 3 rules for maintaining cyber safety.',
          expectedOutput: 'Student submits 3 golden rules for personal cyber safety.'
        }
      }
    ]
  },
  {
    id: 'mod-5',
    number: 5,
    title: 'MS Word Fundamentals',
    purpose: 'Master document creation, text formatting, tables, images, and page layout in Microsoft Word.',
    icon: 'fab fa-microsoft',
    color: '#0284C7',
    realProject: {
      title: 'Formal School Report & Certificate Design',
      description: 'Students create a 2-page formatted school activity report complete with cover title, tables, images, and headers.'
    },
    classes: [
      {
        id: 'cls-19',
        classNum: 19,
        topic: 'MS Word Interface, Ribbon Navigation & Creating Documents',
        simpleConcept: 'Opening MS Word, understanding tabs (Home, Insert, Layout), and typing your first document.',
        objective: 'Navigate the Word interface, create, save (.docx), and open documents.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Overview of Word ribbon, Quick Access Toolbar, status bar, and view modes.',
          demonstrate: 'Opening Word, creating a blank document, typing a paragraph, and saving to `Documents`.',
          practice: 'Type a 5-sentence personal introduction paragraph and save as `My_Word_Doc.docx`.',
          realWorldExample: 'Drafting everyday letters, school notes, and official letters in office environments.',
          practicalTask: 'Create a blank document, type a 5-line paragraph, save to Desktop as `Class19_Doc.docx`.',
          expectedOutput: 'Saved `.docx` document in desktop folder.'
        }
      },
      {
        id: 'cls-20',
        classNum: 20,
        topic: 'Text Formatting, Fonts, Colors, Line Spacing & Alignment',
        simpleConcept: 'Making text look clean using Bold, Italics, Font Styles, Colors, and Line Spacing.',
        objective: 'Apply font styles, sizes, text colors, highlight, line spacing (1.5), and paragraph alignments.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Font hierarchy (Headings 18pt Bold, Body 12pt Regular). Alignment (Left, Center, Justify).',
          demonstrate: 'Formatting a plain text document into a beautiful title and structured body paragraphs.',
          practice: 'Format a plain news article: add bold title, 1.5 line spacing, and justified text.',
          realWorldExample: 'Formatting clean assignments, newspaper articles, and formal printed notices.',
          practicalTask: 'Format a raw text block with a 20pt Bold Centered Title, 12pt body text, and 1.5 line spacing.',
          expectedOutput: 'Properly formatted document with visual typography hierarchy.'
        }
      },
      {
        id: 'cls-21',
        classNum: 21,
        topic: 'Inserting Images, Shapes, Tables & Page Layout Settings',
        simpleConcept: 'Adding pictures, drawing shapes, adjusting page margins, and inserting tables.',
        objective: 'Insert images, wrap text around pictures, adjust page margins (1-inch), and format tables.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Picture formatting: Text Wrap (In Front of Text / Square). Inserting 3x4 tables.',
          demonstrate: 'Inserting a picture, setting text wrapping, setting margins to Normal, and styling a table.',
          practice: 'Insert a 3x3 table listing 3 computer items with price and quantity.',
          realWorldExample: 'Creating price lists, class timetables, and illustrated project reports.',
          practicalTask: 'Create a 3-column table (Item, Description, Price) and insert 1 image with text wrapping.',
          expectedOutput: 'Document containing formatted table and picture with text wrapping.'
        }
      },
      {
        id: 'cls-22',
        classNum: 22,
        topic: 'Bullets, Numbered Lists & Header/Footer Setup',
        simpleConcept: 'Creating neat bullet point lists and adding page numbers at the top or bottom of pages.',
        objective: 'Create bulleted/numbered lists, multi-level lists, and insert Headers, Footers, Page Numbers.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'When to use bullets (items without order) vs numbers (sequential steps). Headers/footers.',
          demonstrate: 'Creating a recipe list with bullet points and adding "Page 1 of 2" in the footer.',
          practice: 'Create a multi-page document with automated page numbers in the footer.',
          realWorldExample: 'Official books, project reports, and manuals requiring page numbers on every page.',
          practicalTask: 'Create a numbered list of 5 steps and add a footer with your name and Page Number.',
          expectedOutput: 'Document featuring bulleted/numbered list and footer page numbers.'
        }
      },
      {
        id: 'cls-23',
        classNum: 23,
        topic: 'Spell Check, Find & Replace, and Exporting to PDF',
        simpleConcept: 'Fixing spelling errors automatically, replacing words instantly, and converting Word files to PDF.',
        objective: 'Use Editor/Spelling Check (F7), Find & Replace (Ctrl+H), and export documents to non-editable PDF.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Red squiggly lines (spelling) vs Blue lines (grammar). Using Ctrl+H to replace terms across 10 pages.',
          demonstrate: 'Running Spell Check on a messy document and exporting file as PDF via `File > Export`.',
          practice: 'Fix spelling errors in a sample document and export the finalized copy to PDF.',
          realWorldExample: 'Exporting final resumes and official documents to PDF so formatting never shifts on printing.',
          practicalTask: 'Run Spell Check on a sample document, replace 1 word using Ctrl+H, and export as PDF.',
          expectedOutput: 'Exported `.pdf` file saved on student desktop.'
        }
      },
      {
        id: 'cls-24',
        classNum: 24,
        topic: 'Real-World Hands-on Project: Formal Document Design',
        simpleConcept: 'Combining all Word skills to design a complete professional 2-page school report.',
        objective: 'Produce a complete formatted document with Title, Headings, Images, Table, and Footer.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '45 min',
          explain: 'Brief students on project specs: Title, Sub-headings, 1 Table, 1 Image, Footers, and PDF export.',
          demonstrate: 'Reviewing a high-scoring sample school activity report deliverable.',
          practice: 'Students build their 2-page report from scratch during lab session.',
          realWorldExample: 'Real-world administrative office reporting and school newsletter creation.',
          practicalTask: 'Create a 2-page report on "My School IT Lab", format typography, add table, image, and export PDF.',
          expectedOutput: 'Polished 2-page PDF deliverable submitted to teacher.'
        }
      }
    ]
  },
  {
    id: 'mod-6',
    number: 6,
    title: 'MS Excel Fundamentals',
    purpose: 'Master spreadsheet basics, data tables, math formulas, sorting, filtering, and visual chart generation.',
    icon: 'fas fa-file-excel',
    color: '#059669',
    realProject: {
      title: 'Student Gradebook & Financial Expense Sheet',
      description: 'Students build an automated Excel marklist sheet using formulas (SUM, AVERAGE), formatting, and bar charts.'
    },
    classes: [
      {
        id: 'cls-25',
        classNum: 25,
        topic: 'MS Excel Spreadsheet Structure (Rows, Columns, Cells)',
        simpleConcept: 'Understanding grid lines, columns (A, B, C), rows (1, 2, 3), and cell addresses (A1, B5).',
        objective: 'Navigate Excel grid, understand cell references, enter text and numbers into cells.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Spreadsheet grid layout. Difference between text (left aligned) and numbers (right aligned).',
          demonstrate: 'Opening Excel, selecting cells, entering data, navigating with arrow keys and Enter/Tab.',
          practice: 'Enter a list of 5 students with Roll No, Name, and Mark in Excel grid.',
          realWorldExample: 'Managing lists, marksheets, phone directories, and inventories in businesses.',
          practicalTask: 'Create a new workbook, label columns A1: Name, B1: Subject, C1: Marks, and enter 5 rows of data.',
          expectedOutput: 'Clean Excel worksheet with 5 rows of formatted student data.'
        }
      },
      {
        id: 'cls-26',
        classNum: 26,
        topic: 'Formatting Tables, AutoFit & Cell Borders',
        simpleConcept: 'Making spreadsheet data easy to read with cell colors, borders, and column width adjustments.',
        objective: 'Apply cell borders, header background fill colors, text alignment, and AutoFit column widths.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Why `###` error appears (column too narrow!). Double-clicking column border to AutoFit.',
          demonstrate: 'Applying All Borders, bolding header row, adding light blue fill color, and AutoFitting columns.',
          practice: 'Format a plain unformatted price list into a styled table.',
          realWorldExample: 'Preparing clean financial tables for business meetings and printouts.',
          practicalTask: 'Format your 5-row student sheet with bold headers, background fill color, All Borders, and AutoFit.',
          expectedOutput: 'Visually styled Excel data table.'
        }
      },
      {
        id: 'cls-27',
        classNum: 27,
        topic: 'Basic Math Formulas (SUM, AVERAGE, MIN, MAX, COUNT)',
        simpleConcept: 'Writing formulas starting with `=` to make Excel calculate totals and averages automatically.',
        objective: 'Write basic Excel formulas starting with `=`, using `=SUM()`, `=AVERAGE()`, `=MIN()`, `=MAX()`.',
        teacherGuide: {
          theoryDuration: '20 min',
          practicalDuration: '35 min',
          explain: 'Rule #1 of Excel: ALWAYS start formulas with `=`. Dragging AutoFill handle (plus icon) down columns.',
          demonstrate: 'Calculating Total Marks with `=SUM(C2:C6)` and Average Mark with `=AVERAGE(C2:C6)`.',
          practice: 'Calculate total sales and average monthly sales for a 5-item product table.',
          realWorldExample: 'Calculating student exam result totals, monthly household budgets, and shop sales.',
          practicalTask: 'Add a Total row with `=SUM()` and an Average row with `=AVERAGE()` to calculate student marks.',
          expectedOutput: 'Excel worksheet calculating automated sum and average values correctly.'
        }
      },
      {
        id: 'cls-28',
        classNum: 28,
        topic: 'Working with Multiple Sheets, Sorting & Filtering Data',
        simpleConcept: 'Renaming sheet tabs, sorting lists alphabetically (A-Z), and filtering data.',
        objective: 'Manage worksheet tabs (add, rename, color), sort columns A-Z / High-Low, and use Data Filters.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Multiple tabs like pages in a workbook. Using Filter funnel icon to view only students scoring > 80.',
          demonstrate: 'Renaming Sheet1 to `Term_1`, adding a Filter to header row, and sorting marks High to Low.',
          practice: 'Filter a 10-item product list to show only items costing under Rs. 500.',
          realWorldExample: 'E-commerce sites and schools filtering thousands of database records instantly.',
          practicalTask: 'Rename sheet tab to `Marks_2026`, apply Filter to headers, and sort marks from Highest to Lowest.',
          expectedOutput: 'Worksheet filtered and sorted in descending mark order.'
        }
      },
      {
        id: 'cls-29',
        classNum: 29,
        topic: 'Creating Visual Charts (Bar Charts, Pie Charts, Column Charts)',
        simpleConcept: 'Turning rows of numbers into colorful visual graphs and charts in one click.',
        objective: 'Insert Column Charts, Bar Charts, and Pie Charts to visualize spreadsheet data.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Selecting data range first, going to `Insert > Recommended Charts`, adding Chart Title and Data Labels.',
          demonstrate: 'Selecting student names and total marks, inserting a 3D Column Chart, and customizing colors.',
          practice: 'Create a 3D Pie Chart showing monthly expense breakdown (Rent, Food, Books, Fun).',
          realWorldExample: 'Business presentations and news reports using graphs to convey data quickly.',
          practicalTask: 'Select your student names and marks columns, insert a 2D Column Chart, and title it "Class Marks".',
          expectedOutput: 'Excel worksheet containing embedded data chart.'
        }
      },
      {
        id: 'cls-30',
        classNum: 30,
        topic: 'Real-World Hands-on Project: Student Gradebook / Expense Sheet',
        simpleConcept: 'Building a complete automated gradebook sheet with formatting, formulas, and chart.',
        objective: 'Build an end-to-end spreadsheet project incorporating formatting, formulas, sorting, and charts.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '45 min',
          explain: 'Review project requirements: 5+ students, 3 subject columns, Total `=SUM()`, Average `=AVERAGE()`, Chart.',
          demonstrate: 'Showcase a finished gradebook template.',
          practice: 'Students build their complete spreadsheet project independently.',
          realWorldExample: 'Real-world teacher marksheets and corporate financial performance dashboards.',
          practicalTask: 'Build a complete 5-student Gradebook with 3 subject marks, total, average, and a Column Chart.',
          expectedOutput: 'Fully functional, styled Excel Gradebook workbook submitted to teacher.'
        }
      }
    ]
  }
];

export const FINAL_SPECIALIZATION_OPTIONS = [
  { id: 'spec-1', name: 'Office Productivity & Document Publishing', desc: 'Focus on advanced Word, Excel, and office document workflows.' },
  { id: 'spec-2', name: 'Digital Media & Creative Design', desc: 'Focus on Canva poster design and basic digital graphics.' },
  { id: 'spec-3', name: 'IT Infrastructure & Cyber Safety', desc: 'Focus on OS navigation, hardware inspection, and digital security.' }
];

export const calculateSyllabusMetrics = (savedProgress = {}) => {
  const safeProgress = savedProgress && typeof savedProgress === 'object' && !Array.isArray(savedProgress) ? savedProgress : {};
  let totalClasses = 0;
  let completedClasses = 0;
  let inProgressClasses = 0;
  let skippedClasses = 0;
  const moduleProgress = {};

  (PLUS_ONE_MODULES || []).forEach((mod) => {
    if (!mod) return;
    let modCompleted = 0;
    let modTotal = (mod.classes || []).length;

    (mod.classes || []).forEach((cls) => {
      if (!cls) return;
      totalClasses++;
      const status = safeProgress[cls.id]?.status || 'NOT STARTED';
      if (status === 'COMPLETED') {
        completedClasses++;
        modCompleted++;
      } else if (status === 'IN PROGRESS') {
        inProgressClasses++;
      } else if (status === 'SKIPPED') {
        skippedClasses++;
      }
    });

    const percentage = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
    moduleProgress[mod.id] = {
      percentage,
      completed: modCompleted,
      total: modTotal
    };
  });

  const remainingClasses = Math.max(0, totalClasses - completedClasses);
  const overallPercentage = totalClasses > 0 ? Math.round((completedClasses / totalClasses) * 100) : 0;

  return {
    totalClasses,
    completedClasses,
    inProgressClasses,
    skippedClasses,
    remainingClasses,
    overallProgress: overallPercentage,
    overallPercentage,
    moduleProgress
  };
};

