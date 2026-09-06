// Universal Foundation Syllabus Data for Sirajul Huda Digital Skills Institution
// 1-2 Week Orientation Track for ALL Students (Higher Secondary, Undergraduate, & Postgraduate)

export const FOUNDATION_MODULES = [
  {
    id: 'mod-1',
    number: 1,
    title: 'PC & Laptop Hardware Essentials',
    icon: 'fas fa-laptop',
    description: 'Practical hardware literacy: Understanding PC/Laptop components, ports, power management, peripherals, and safe operating procedures.',
    purpose: 'To equip every student with physical confidence in operating desktop computers, laptops, and peripheral hardware in modern digital workplaces.',
    targetAudience: 'All Streams (Higher Secondary, Degree & PG)',
    totalClasses: 3,
    estimatedHours: '4.5 Hours (3 Lab Classes)',
    learningObjectives: [
      'Identify and distinguish desktop components, laptops, and peripheral devices.',
      'Understand internal system architecture: CPU, RAM, Hard Drive/SSD, and Motherboard.',
      'Safely connect USB drives, HDMI displays, Bluetooth peripherals, and audio devices.',
      'Master power operations, battery care, and proper system shutdown/restart cycles.'
    ],
    classes: [
      {
        id: 'fnd-cls-1',
        classNum: 1,
        topic: 'Introduction to Personal Computers & Laptops',
        visualImage: '/images/foundation/class1_pc_vs_laptop.svg',
        simpleConcept: 'Understanding Desktop PCs vs Laptops, power switches, ports, monitors, keyboard, mouse, and safe startup/shutdown procedures.',
        objective: 'Identify external PC parts and perform safe system startup and graceful shutdown.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '30 min',
          explain: 'Explain the difference between desktop workstations and laptops. Show physical power buttons, power cables, and display monitors.',
          demonstrate: 'Demonstrate turning on a lab PC, logging into Windows, and performing a proper Windows Start -> Shutdown vs Force Power-off (and why holding the power button is harmful).',
          practice: 'Each student turns on their workstation, identifies monitor power, keyboard, mouse, and performs a clean shutdown and restart.',
          practicalTask: 'Power on lab PC, inspect all external ports (USB, Audio, HDMI), log in, and perform a graceful system restart.',
          realWorldExample: 'Daily workplace startup: Setting up a workstation at an office desk or lab safely.',
          expectedOutput: 'Student independently powers on computer, identifies external ports, and shuts down cleanly.'
        }
      },
      {
        id: 'fnd-cls-2',
        classNum: 2,
        topic: 'Inside the System Unit: CPU, RAM & Storage',
        visualImage: '/images/foundation/class2_cpu_ram_ssd.svg',
        extraVisuals: [
          { id: 'vector', title: 'System Unit Breakdown', src: '/images/foundation/class2_cpu_ram_ssd.svg', badge: 'Architecture Guide' },
          { id: 'cpu', title: 'CPU Processors (Intel vs AMD)', src: '/images/foundation/class2_cpu_intel_amd.png', badge: 'Real CPU Chips' },
          { id: 'ram', title: 'RAM Memory Stick', src: '/images/foundation/class2_ram_module.png', badge: 'Real RAM Module' },
          { id: 'ssd', title: 'SSD Storage Drive', src: '/images/foundation/class2_kingston_ssd.png', badge: 'Real SSD Drive' }
        ],
        simpleConcept: 'Demystifying what is inside a computer: Processor (CPU), System Memory (RAM), Storage (HDD vs SSD), and why memory gets full.',
        objective: 'Understand how CPU speed, RAM capacity, and SSD storage affect computer performance.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '30 min',
          explain: 'Use real-life analogies: CPU = Brain, RAM = Study Desk (temporary working space), Storage = Filing Cabinet (permanent storage). Show physical Intel/AMD CPUs, RAM sticks, and SSD drives.',
          demonstrate: 'Open Windows System Properties (Win + Pause/Break or Settings -> About) to view installed RAM, CPU model, and Drive capacity in This PC.',
          practice: 'Students navigate to Windows About Settings on their PC and note down their system CPU type, RAM size, and free storage space.',
          practicalTask: 'Open Settings -> System -> About and This PC, write down RAM (GB), CPU model, and C: Drive free space.',
          realWorldExample: 'Buying a laptop or checking if software will run smoothly on your system.',
          expectedOutput: 'Student can read and explain system specifications (RAM, CPU, Storage) on any PC.'
        }
      },
      {
        id: 'fnd-cls-3',
        classNum: 3,
        topic: 'Connecting Peripherals, Ports & Connectors',
        visualImage: '/images/foundation/class3_ports_hdmi_usb.svg',
        extraVisuals: [
          { id: 'vector', title: 'Standard Ports Guide', src: '/images/foundation/class3_ports_hdmi_usb.svg', badge: 'Vector Guide' },
          { id: 'grid', title: 'Essential Ports Grid', src: '/images/foundation/class3_essential_ports_reference.png', badge: 'User Uploaded Reference' },
          { id: 'diagram', title: 'PC Rear Ports Infographic', src: '/images/foundation/class3_understanding_ports_diagram.jpg', badge: 'Cable Connections' }
        ],
        simpleConcept: 'Mastering all computer ports & plugs: Ethernet (RJ45 Internet), HDMI/DisplayPort/VGA (Monitors/Projectors), USB-A/B/C, Audio Jacks, SD Card, and Power plugs.',
        objective: 'Identify Ethernet LAN, HDMI, USB-A/C, Audio ports, plug peripherals safely, and toggle projection displays (Win + P).',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '35 min',
          explain: 'Explain all physical computer ports: Ethernet RJ45 (Network LAN), HDMI & DisplayPort (Digital Video/Audio), VGA & DVI (Legacy Video), USB-A, USB-C (Reversible), USB-B (Printers), 3.5mm Audio Jacks, and SD Card slots.',
          demonstrate: 'Demonstrate connecting an Ethernet cable for wired internet, plugging in a USB flash drive, safely ejecting media, and connecting a laptop to the lab projector (Win + P to toggle Duplicate/Extend screen).',
          practice: 'Students inspect their PC ports, connect an Ethernet cable and USB drive, safely eject media, and practice projection display mode switching with Win + P.',
          practicalTask: '1. Identify Ethernet RJ45, USB-A/C, and HDMI ports on your PC. 2. Plug in USB drive & eject safely via Taskbar. 3. Test Win+P screen projection modes.',
          realWorldExample: 'Connecting to wired office internet, projecting slides in conference rooms, or plugging printers/monitors into workstations.',
          expectedOutput: 'Student identifies Ethernet, HDMI, USB ports, safely ejects media, and manages screen display projection.'
        }
      }
    ],
    realProject: {
      title: 'Lab Workstation Inspection & Specs Sheet',
      description: 'Students inspect their lab computer hardware, document CPU/RAM/Storage specs, and test peripheral connections.'
    }
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'Operating System & File Management',
    icon: 'fas fa-folder-open',
    description: 'Mastering Windows/Linux desktop navigation, File Explorer, folder hierarchy, drive letters, cloud storage, and file organization.',
    purpose: 'To ensure every student can create, organize, search, compress, and back up digital files systematically without losing work.',
    targetAudience: 'All Streams (Higher Secondary, Degree & PG)',
    totalClasses: 3,
    estimatedHours: '4.5 Hours (3 Lab Classes)',
    learningObjectives: [
      'Navigate desktop, Taskbar, Start Menu, Control Panel/Settings, and Window controls.',
      'Build structured folder hierarchies and follow professional file naming conventions.',
      'Understand file extensions (.docx, .xlsx, .pdf, .jpg, .zip) and default app associations.',
      'Compress folders into .ZIP archives and use Google Drive/Cloud storage for backups.'
    ],
    classes: [
      {
        id: 'fnd-cls-4',
        classNum: 4,
        topic: 'Desktop Navigation & Window Controls',
        visualImage: '/images/foundation/class4_windows_snap_assist.svg',
        extraVisuals: [
          { id: 'vector', title: 'Snap Assist Guide', src: '/images/foundation/class4_windows_snap_assist.svg', badge: 'Vector Guide' },
          { id: 'snap_grid', title: 'Windows 11 Snap Layouts', src: '/images/foundation/class4_snap_assist_real_grid.png', badge: 'Real Multitasking UI' },
          { id: 'keys', title: 'Win + Arrow Keys Shortcut', src: '/images/foundation/class4_win_arrow_keys.png', badge: 'Keyboard Shortcut' }
        ],
        simpleConcept: 'Navigating Windows 11/10 desktop, Taskbar, Start Menu, Search bar, and mastering side-by-side window snapping (Win + Arrow Keys).',
        objective: 'Navigate OS interface smoothly and manage multiple open windows side-by-side.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '35 min',
          explain: 'Explain the Desktop layout, Taskbar pinning, Start Menu search, and Window title bar controls. Show how Win + Left/Right/Up/Down Arrow keys snap open windows into 2x2 or split-screen layouts.',
          demonstrate: 'Demonstrate snapping windows side-by-side (Win + Left/Right Arrow) and switching between open apps with Alt + Tab.',
          practice: 'Students open Notepad and Calculator simultaneously, snap them side-by-side using Win + Arrow keys, and switch between them using Alt + Tab.',
          practicalTask: 'Open 3 applications (Notepad, File Explorer, Browser), snap 2 side-by-side using Win+Arrow keys, and use Alt+Tab to cycle through all 3.',
          realWorldExample: 'Multitasking: Typing notes on one side while reading a reference document on the other.',
          expectedOutput: 'Student manages multiple open windows and snaps screens effortlessly.'
        }
      },
      {
        id: 'fnd-cls-5',
        classNum: 5,
        topic: 'File Explorer & Professional Folder Structure',
        visualImage: '/images/foundation/class5_folder_hierarchy.svg',
        extraVisuals: [
          { id: 'vector', title: 'Folder Structure Guide', src: '/images/foundation/class5_folder_hierarchy.svg', badge: 'Vector Guide' },
          { id: 'tree', title: 'C:\\ Drive Directory Tree', src: '/images/foundation/class5_directory_tree_hierarchy.png', badge: 'OS File System' },
          { id: 'naming', title: 'File Naming Conventions', src: '/images/foundation/class5_file_naming_rules.png', badge: 'Best Practices' }
        ],
        simpleConcept: 'Understanding Drives (C: D:), Root Directory Trees, Folder Hierarchies, Copy vs Cut, and Professional File Naming Rules.',
        objective: 'Create organized folder structures for academic subjects and follow professional file naming conventions.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '30 min',
          explain: 'Explain C:\\ Drive directory tree hierarchy (System, Users, Program Files, Documents). Explain why saving files with bad names like "final_v2_EDIT.pdf" causes loss of work, and teach structured naming like "2026-03-15_Project_Proposal.pdf".',
          demonstrate: 'Demonstrate creating a main folder "Sirajul_Huda_Digital_Skills" with subfolders for "Assignments", "Notes", and "Projects". Demonstrate Copy vs Cut (Move).',
          practice: 'Students create a personal root folder under Documents with subfolders for 3 subjects, practice file naming rules, and copy files into subfolders.',
          practicalTask: 'Create folder tree: Documents -> Digital_Skills -> [Module_1, Module_2, Practice_Files]. Create a text file with proper date_name convention.',
          realWorldExample: 'Organizing personal computer files so assignments can be retrieved in 5 seconds without searching randomly.',
          expectedOutput: 'Student maintains a clean, well-structured file & folder hierarchy with proper file naming.'
        }
      },
      {
        id: 'fnd-cls-6',
        classNum: 6,
        topic: 'File Extensions, Compression (.ZIP) & Cloud Backup',
        visualImage: '/images/foundation/class6_zip_cloud_backup.svg',
        extraVisuals: [
          { id: 'vector', title: 'Compression & Cloud Workflow', src: '/images/foundation/class6_zip_cloud_backup.svg', badge: 'Vector Guide' },
          { id: 'win10_zip', title: 'Send to ZIP (Windows 10)', src: '/images/foundation/class6_win10_zip_menu.png', badge: 'Windows 10 Context Menu' },
          { id: 'win11_zip', title: 'Compress to ZIP (Windows 11)', src: '/images/foundation/class6_win11_zip_menu.png', badge: 'Windows 11 Context Menu' },
          { id: 'zip_folder', title: 'ZIP vs Folder View', src: '/images/foundation/class6_zip_folder_view.png', badge: 'File Explorer Icon' },
          { id: 'gdrive', title: 'Google Drive Upload', src: '/images/foundation/class6_gdrive_upload.png', badge: 'Cloud Backup' }
        ],
        simpleConcept: 'Understanding file types (.pdf, .docx, .png, .mp4), compressing folders into .ZIP archives, and backing up to Google Drive.',
        objective: 'Identify file formats, zip/unzip project folders, and upload backups to cloud storage.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '30 min',
          explain: 'Explain file extensions, why Windows hides them by default, how to enable View -> File Name Extensions, and how .ZIP compression works.',
          demonstrate: 'Demonstrate right-click -> Compress to ZIP file, extracting ZIP files, and dragging a ZIP file into Google Drive / email attachment.',
          practice: 'Students compress their practice folder into a .ZIP archive, extract it to a new location, and practice file extension identification.',
          practicalTask: 'Enable File Name Extensions in Explorer, compress "Digital_Skills" folder to "Digital_Skills.zip", and extract it.',
          realWorldExample: 'Submitting a complete project folder via email or Google Classroom as a single ZIP file.',
          expectedOutput: 'Student zips/unzips folder packages and understands file extensions.'
        }
      }
    ],
    realProject: {
      title: 'Digital Portfolio Storage & Backup System',
      description: 'Students build a standardized course folder directory structure on their lab PC and create a ZIP backup archive.'
    }
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Essential Software Applications & Tools',
    icon: 'fas fa-th-large',
    description: 'Hands-on familiarity with essential productivity tools: Web Browsers, PDF Viewers, Text Editors, Snipping Tool, and Media Players.',
    purpose: 'To ensure students know which application software tool to open for any daily digital task.',
    targetAudience: 'All Streams (Higher Secondary, Degree & PG)',
    totalClasses: 3,
    estimatedHours: '4.5 Hours (3 Lab Classes)',
    learningObjectives: [
      'Master web browser operations: Tabs, Bookmarks, Downloading, Clear Cache, and Private/Incognito windows.',
      'Understand document processing vs plain text editors (Notepad vs MS Word vs Google Docs).',
      'Use screen capture tools (Snipping Tool / Win + Shift + S) to capture and annotate screenshots.',
      'Open and manage PDF documents, fill basic PDF forms, and print documents.'
    ],
    classes: [
      {
        id: 'fnd-cls-7',
        classNum: 7,
        topic: 'Web Browsers & Internet Essentials',
        visualImage: '/images/foundation/class7_browser_navigation.svg',
        extraVisuals: [
          { id: 'vector', title: 'Browser Tabs & Bookmarks', src: '/images/foundation/class7_browser_navigation.svg', badge: 'Vector Guide' },
          { id: 'diagram', title: 'Chrome Interface Anatomy', src: '/images/foundation/class7_browser_elements_diagram.png', badge: 'Browser Controls' },
          { id: 'address_bar', title: 'Address Bar & Auto-Suggestions', src: '/images/foundation/class7_address_bar_autocomplete.png', badge: 'URL & Search Suggestions' }
        ],
        simpleConcept: 'Navigating Google Chrome / Edge: Address bar vs Search bar, Opening/Closing Tabs, Bookmarking useful sites, Downloads bar.',
        objective: 'Perform efficient web searches, manage browser tabs, and bookmark essential educational portals.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '35 min',
          explain: 'Explain URLs (https://), Domain names (.org, .edu, .in), Browser Tabs, History (Ctrl+H), and Bookmark Bar (Ctrl+Shift+O).',
          demonstrate: 'Demonstrate searching for Sirajul Huda portal, opening multiple tabs (Ctrl+T), restoring closed tab (Ctrl+Shift+T), and bookmarking.',
          practice: 'Students bookmark 3 educational sites (Sirajul Huda Portal, Wikipedia, W3Schools), download a sample PDF, and locate it in Downloads folder.',
          practicalTask: 'Open Chrome, search for course website, create a "Study Bookmarks" folder, add 3 links, and download a sample image.',
          realWorldExample: 'Researching topics online without getting lost in dozens of open browser tabs.',
          expectedOutput: 'Student navigates browser efficiently with tab shortcuts and bookmark organization.'
        }
      },
      {
        id: 'fnd-cls-8',
        classNum: 8,
        topic: 'Screen Capture & Annotation (Snipping Tool)',
        visualImage: '/images/foundation/class8_snipping_tool.svg',
        extraVisuals: [
          { id: 'vector', title: 'Screen Capture & Annotation Guide', src: '/images/foundation/class8_snipping_tool.svg', badge: 'Vector Guide' },
          { id: 'modes', title: '4 Snip Modes Toolbar', src: '/images/foundation/class8_snip_modes_toolbar.png', badge: 'Win + Shift + S Bar' },
          { id: 'app', title: 'Windows 11 Snipping Tool App', src: '/images/foundation/class8_snipping_tool_app.png', badge: 'App Interface' },
          { id: 'annotation', title: 'Selection & Markup Tools', src: '/images/foundation/class8_rectangular_selection_annotation.png', badge: 'Crop & Pen Markup' }
        ],
        simpleConcept: 'Capturing screenshots using Snipping Tool / Windows Snip (Win + Shift + S), drawing highlights, and saving screenshot images.',
        objective: 'Capture full screen, active window, or custom rectangle screenshots for lab submissions.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '35 min',
          explain: 'Explain why taking a clean screenshot on PC is better than taking a blurry phone photo of a computer monitor.',
          demonstrate: 'Demonstrate Win + Shift + S shortcut, capturing a rectangular selection, highlighting key areas in Snipping Tool, and saving as PNG.',
          practice: 'Students open a web page, press Win+Shift+S, highlight a section, and save the image into their practice folder.',
          practicalTask: 'Take a clean screenshot of your Windows System Specs page using Win+Shift+S, highlight your RAM size, and save as "My_RAM.png".',
          realWorldExample: 'Submitting screenshot proof of completed lab assignments or bug reports to teachers.',
          expectedOutput: 'Student captures crisp screenshots and annotates them for assignment submissions.'
        }
      },
      {
        id: 'fnd-cls-9',
        classNum: 9,
        topic: 'PDF Management & Printing Basics',
        visualImage: '/images/foundation/class9_pdf_search_print.svg',
        extraVisuals: [
          { id: 'vector', title: 'PDF Search (Ctrl+F) & Print Setup', src: '/images/foundation/class9_pdf_search_print.svg', badge: 'Vector Guide' },
          { id: 'overview', title: 'PDF Management & Print Overview', src: '/images/foundation/class9_pdf_management_overview.png', badge: 'Class Overview' }
        ],
        recommendedTool: {
          name: 'PDFgear (Free PDF Creator, Editor & Manager)',
          url: 'https://www.pdfgear.com/whats-new/',
          badge: 'Free Download & Software Link',
          description: 'Free software for PDF creation, editing, annotating, page management, and format conversion without limits.'
        },
        simpleConcept: 'Opening PDF documents, searching text (Ctrl+F), converting Word/Web to PDF, and using free tools like PDFgear (https://www.pdfgear.com/whats-new/) for full PDF creation, editing & management.',
        objective: 'Read, search, edit, convert to PDF, and configure print settings for physical documents using PDFgear & browser tools.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '35 min',
          explain: 'Explain why PDF (Portable Document Format) is the universal standard for sharing non-editable printable documents. Introduce PDFgear (https://www.pdfgear.com/whats-new/) as a free software for creating, editing, and managing PDFs.',
          demonstrate: 'Demonstrate opening a PDF, using Ctrl+F to search keywords, selecting "Print to PDF" in Windows, and installing/using PDFgear for PDF creation & editing.',
          practice: 'Students access PDFgear via https://www.pdfgear.com/whats-new/, open a sample PDF, search for specific keywords using Ctrl+F, practice page reordering, and save/print documents to PDF.',
          practicalTask: '1. Access PDFgear (https://www.pdfgear.com/whats-new/). 2. Open sample PDF, search for "Hardware" using Ctrl+F. 3. Print page 1 to PDF ("Print to PDF") and save as "Summary_Page1.pdf".',
          realWorldExample: 'Editing official forms, merging PDF certificates, or converting Word/PowerPoint assignments into clean PDFs for submission.',
          expectedOutput: 'Student navigates, edits, searches, and prints/converts PDF documents using browser tools & PDFgear.'
        }
      }
    ],
    realProject: {
      title: 'Digital Tools Showcase Document',
      description: 'Students collect educational resources, take annotated screenshots, and export a finished PDF portfolio page.'
    }
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Pro Keyboard Shortcuts & System Speed',
    icon: 'fas fa-keyboard',
    description: 'Transforming speed: Essential Windows hotkeys, text editing shortcuts, touch typing posture, and system Task Manager controls.',
    purpose: 'To double student computer operating speed by eliminating slow, repetitive mouse menu clicks.',
    targetAudience: 'All Streams (Higher Secondary, Degree & PG)',
    totalClasses: 2,
    estimatedHours: '3 Hours (2 Lab Classes)',
    learningObjectives: [
      'Master universal Windows hotkeys (Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z, Ctrl+A, Ctrl+S, Ctrl+F, Alt+F4).',
      'Use Windows key shortcuts (Win+D, Win+E, Win+L, Win+V, Win+P).',
      'Learn touch typing home-row finger placement to increase Typing Speed (WPM).',
      'Use Task Manager (Ctrl+Shift+Esc) to force-close frozen programs safely.'
    ],
    classes: [
      {
        id: 'fnd-cls-10',
        classNum: 10,
        topic: 'Mastering Essential Windows & Editing Hotkeys',
        visualImage: '/images/foundation/class10_keyboard_hotkeys.svg',
        extraVisuals: [
          { id: 'vector', title: 'Hotkeys & Muscle Memory Guide', src: '/images/foundation/class10_keyboard_hotkeys.svg', badge: 'Vector Guide' },
          { id: 'win11_grid', title: 'Windows 11 Shortcuts Grid', src: '/images/foundation/class10_win11_shortcuts_grid.png', badge: 'Win 11 UI' },
          { id: 'pastel', title: 'Essential Core Hotkeys', src: '/images/foundation/class10_hotkeys_pastel_cheatsheet.png', badge: 'Core Shortcuts' },
          { id: 'poster', title: 'Full Windows Hotkeys Poster', src: '/images/foundation/class10_windows_shortcuts_poster.png', badge: 'Infographic Poster' },
          { id: 'dark_table', title: 'Windows A-Z Shortcuts Table', src: '/images/foundation/class10_dark_hotkeys_table.png', badge: 'A-Z Cheatsheet' }
        ],
        simpleConcept: 'The power hotkeys every student must know by muscle memory: Copy, Paste, Cut, Undo, Select All, Save, Lock PC, and Desktop toggle.',
        objective: 'Execute core computer actions using keyboard shortcuts without right-clicking menus.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '35 min',
          explain: 'Explain why professional computer users rely 80% on keyboard shortcuts and only 20% on mouse clicks.',
          demonstrate: 'Demonstrate live text editing in Notepad using Ctrl+A (Select All), Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+Z (Undo), Win+D (Show Desktop), Win+L (Lock).',
          practice: 'Students participate in a 10-minute hotkey speed challenge: copying text, saving files (Ctrl+S), and switching windows without mouse.',
          practicalTask: 'Open Notepad, type a paragraph using touch typing finger alignment, perform Copy/Paste/Undo cycles using hotkeys only.',
          realWorldExample: 'Drafting essays or editing code rapidly using hotkey combinations.',
          expectedOutput: 'Student demonstrates muscle memory for top 10 universal hotkeys.'
        }
      },
      {
        id: 'fnd-cls-11',
        classNum: 11,
        topic: 'Task Manager, Clipboard History & System Troubleshooting',
        visualImage: '/images/foundation/class11_task_manager_clipboard.svg',
        extraVisuals: [
          { id: 'vector', title: 'Task Manager & Clipboard Guide', src: '/images/foundation/class11_task_manager_clipboard.svg', badge: 'Vector Guide' },
          { id: 'clipboard', title: 'Clipboard History (Win + V)', src: '/images/foundation/class11_clipboard_history_win_v.png', badge: 'Win + V Popup' },
          { id: 'processes', title: 'Task Manager Processes Tab', src: '/images/foundation/class11_task_manager_processes.png', badge: 'CPU & RAM Usage' },
          { id: 'performance', title: 'Task Manager Performance Tab', src: '/images/foundation/class11_task_manager_performance.png', badge: 'Hardware Graph' },
          { id: 'end_task', title: 'Force-Close Unresponsive Apps', src: '/images/foundation/class11_task_manager_end_task.png', badge: 'End Task Action' },
          { id: 'troubleshoot', title: 'Windows Troubleshoot Settings', src: '/images/foundation/class11_system_troubleshoot.png', badge: 'System Settings' }
        ],
        simpleConcept: 'Accessing Windows Clipboard History (Win + V), opening Task Manager (Ctrl + Shift + Esc) to end frozen tasks, and system rebooting.',
        objective: 'Troubleshoot frozen applications and utilize advanced Windows productivity features.',
        teacherGuide: {
          theoryDuration: '10 min',
          practicalDuration: '35 min',
          explain: 'Explain what happens when a program stops responding (Not Responding state) and how Clipboard History saves multiple copied items.',
          demonstrate: 'Demonstrate enabling Win + V (Clipboard History) to paste past copied items, and pressing Ctrl + Shift + Esc to view running apps and End Task.',
          practice: 'Students enable Win + V, copy 3 separate text items, paste them selectively from Clipboard History, and launch Task Manager.',
          practicalTask: 'Enable Win+V clipboard history, copy 3 sentences from different places, paste them using Win+V menu, and inspect CPU usage in Task Manager.',
          realWorldExample: 'Fixing a frozen software app during class without rebooting the whole computer.',
          expectedOutput: 'Student uses Clipboard History and resolves frozen app crashes with Task Manager.'
        }
      }
    ],
    realProject: {
      title: 'Shortcut Mastery Speed Test',
      description: 'Hands-on timed lab test where students complete document formatting and navigation using only keyboard shortcuts.'
    }
  },
  {
    id: 'mod-5',
    number: 5,
    title: 'Cyber Safety, Internet Hygiene & AI Basics',
    icon: 'fas fa-shield-alt',
    description: 'Digital citizenship: Online privacy, strong passwords, phishing awareness, shared lab PC safety, and introductory AI learning prompts.',
    purpose: 'To ensure students use the internet safely, protect their online identity, and leverage AI tools responsibly.',
    targetAudience: 'All Streams (Higher Secondary, Degree & PG)',
    totalClasses: 2,
    estimatedHours: '3 Hours (2 Lab Classes)',
    learningObjectives: [
      'Recognize phishing emails, malicious popups, fake download buttons, and suspicious links.',
      'Create strong memorable passwords and understand Two-Factor Authentication (2FA).',
      'Follow institutional lab PC rules: Logging out of email/accounts after every session.',
      'Use AI assistants (ChatGPT / Google Gemini) responsibly for study assistance, summarizing notes, and learning.'
    ],
    classes: [
      {
        id: 'fnd-cls-12',
        classNum: 12,
        topic: 'Cyber Safety & Shared Lab PC Logout Hygiene',
        visualImage: '/images/foundation/class12_cyber_safety_logout.svg',
        extraVisuals: [
          { id: 'vector', title: 'Cyber Safety & Logout Guide', src: '/images/foundation/class12_cyber_safety_logout.svg', badge: 'Vector Guide' },
          { id: 'hover_check', title: 'Hover Before Click (Safe vs Phishing Link)', src: '/images/foundation/class12_phishing_url_hover_check.png', badge: 'Link Safety Guide' },
          { id: 'url_anatomy', title: 'Real vs Fake URL Anatomy', src: '/images/foundation/class12_url_anatomy_real_vs_fake.png', badge: 'Phishing Defense' }
        ],
        simpleConcept: 'Recognizing online scams, fake download buttons, creating strong passwords, and ALWAYS logging out of accounts on shared lab PCs.',
        objective: 'Protect personal digital accounts and observe shared computer lab security guidelines.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '30 min',
          explain: 'Discuss real-world risks: Leaving Google account logged in on a public lab PC allows next student to access personal emails, Drive, and passwords.',
          demonstrate: 'Demonstrate identifying HTTPS padlock, spotting fake "Download Now" ads on free software sites, and performing a full browser Sign Out.',
          practice: 'Students inspect sample web addresses for safety, check their browser security settings, and practice account logout procedures.',
          practicalTask: 'Audit browser settings, check saved passwords list, sign out of test session, and clear browsing data for shared safety.',
          realWorldExample: 'Logging off your account at a public cyber cafe or college lab PC.',
          expectedOutput: 'Student demonstrates thorough logout practices on shared computer workstations.'
        }
      },
      {
        id: 'fnd-cls-13',
        classNum: 13,
        topic: 'Mastering Modern AI Tools for Learning & Study',
        visualImage: '/images/foundation/class13_ai_study_prompts.svg',
        extraVisuals: [
          { id: 'matrix', title: 'Top 7 AI Tools Comparison Matrix', src: '/images/foundation/class13_ai_study_prompts.svg', badge: 'AI Tools Guide' },
          { id: 'vector', title: 'AI Prompt Engineering Guide', src: '/images/foundation/class13_ai_study_prompts.svg', badge: 'Vector Guide' }
        ],
        aiToolsMatrix: [
          {
            name: 'ChatGPT',
            icon: '🧠',
            use: 'General AI / Study / Writing',
            description: '“എന്തും ചോദിക്കാനുള്ള AI tutor”',
            examplePrompt: '"Explain photosynthesis in simple step-by-step terms with real-world examples for a 10th-grade student."',
            link: 'https://chatgpt.com',
            badge: 'AI Tutor'
          },
          {
            name: 'Gemini',
            icon: '🔎',
            use: 'Google Ecosystem / Multimodal / Image',
            description: '“Google-ന്റെ AI assistant”',
            examplePrompt: '"Analyze this math problem image and explain the formula used to solve it step-by-step."',
            link: 'https://gemini.google.com',
            badge: 'Google AI'
          },
          {
            name: 'Claude',
            icon: '✍️',
            use: 'Writing / Documents / Reasoning',
            description: '“Long content & writing assistant”',
            examplePrompt: '"Review my 2-page essay draft, improve sentence flow, and fix grammar without changing my original tone."',
            link: 'https://claude.ai',
            badge: 'Deep Writing'
          },
          {
            name: 'Perplexity',
            icon: '🔬',
            use: 'Research with Citations & Sources',
            description: '“Sources സഹിതം research ചെയ്യാൻ”',
            examplePrompt: '"What are the latest developments in renewable solar energy in 2026? Provide trusted source links."',
            link: 'https://www.perplexity.ai',
            badge: 'AI Research'
          },
          {
            name: 'NotebookLM',
            icon: '📚',
            use: 'PDF / Notes / Personalized Study',
            description: '“നമ്മുടെ documents-നെക്കുറിച്ച് പഠിക്കാൻ”',
            examplePrompt: '"Create a 10-question revision quiz based strictly on my uploaded syllabus PDF notes."',
            link: 'https://notebooklm.google.com',
            badge: 'PDF & Notes'
          },
          {
            name: 'Canva AI',
            icon: '🎨',
            use: 'Design / Presentation / Visuals',
            description: '“Design work വേഗത്തിൽ ചെയ്യാൻ”',
            examplePrompt: '"Generate a modern dark-themed 5-slide presentation template on Computer Hardware for a school seminar."',
            link: 'https://www.canva.com',
            badge: 'AI Design'
          },
          {
            name: 'Microsoft Copilot',
            icon: '💻',
            use: 'Windows & Microsoft Office Work',
            description: '“Microsoft apps-നൊപ്പം AI”',
            examplePrompt: '"Summarize this Word document into 5 key bullet points and highlight action items for class presentation."',
            link: 'https://copilot.microsoft.com',
            badge: 'Microsoft AI'
          }
        ],
        simpleConcept: 'Mastering specific AI tools for study tasks: ChatGPT (AI Tutor), Gemini (Google AI), Claude (Writing), Perplexity (Research), NotebookLM (PDF Study), Canva AI (Design), and Copilot (Windows Work).',
        objective: 'Select the right AI tool for specific academic tasks (Research vs Writing vs PDF Analysis) and craft effective prompts.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '30 min',
          explain: 'Explain that different AI tools specialize in different study tasks. Demonstrate when to use Perplexity for sourced research, NotebookLM for studying personal PDFs, Claude for long essays, and Canva AI for slides.',
          demonstrate: 'Demonstrate live comparison: Uploading a syllabus PDF to NotebookLM vs searching a research question on Perplexity with citations.',
          practice: 'Students test 2 specific AI tools (Perplexity for a subject question and NotebookLM for a note PDF) and compare results.',
          practicalTask: '1. Use Perplexity to find 3 cited facts on a study topic. 2. Load a 1-page notes PDF into NotebookLM and ask 2 summary questions.',
          realWorldExample: 'Choosing the exact right AI assistant for research papers, slide presentations, or revision notes.',
          expectedOutput: 'Student identifies best use case for top 7 AI tools and uses them effectively for study.'
        }
      }
    ],
    realProject: {
      title: 'Cyber Safety Audit & AI Study Assistant Guide',
      description: 'Students complete a cyber hygiene checklist and create a personal AI prompt template sheet for academic revision.'
    }
  },
  {
    id: 'mod-6',
    number: 6,
    title: 'Practical Real-World Lab & Hands-On Assessment',
    icon: 'fas fa-vial',
    description: 'Comprehensive practical synthesis: Putting all hardware, OS, application, shortcut, and cloud skills together in a final practical evaluation.',
    purpose: 'To verify 100% practical competency before students transition into their batch-specific advanced track.',
    targetAudience: 'All Streams (Higher Secondary, Degree & PG)',
    totalClasses: 1,
    estimatedHours: '2 Hours (1 Comprehensive Lab Session)',
    learningObjectives: [
      'Synthesize all foundational computer skills into a single 45-minute lab test.',
      'Demonstrate independent system startup, file creation, hotkey editing, screenshotting, and PDF export.',
      'Receive official Sirajul Huda Digital Literacy Foundation Readiness Verification.'
    ],
    classes: [
      {
        id: 'fnd-cls-14',
        classNum: 14,
        topic: 'Comprehensive Digital Skills Practical Lab Exam',
        visualImage: '/images/foundation/class14_lab_practical_exam.svg',
        simpleConcept: 'A hands-on practical task incorporating file organization, document formatting, shortcut speed, screenshot capture, and cloud backup.',
        objective: 'Complete a timed, end-to-end computer practical task independently.',
        teacherGuide: {
          theoryDuration: '5 min',
          practicalDuration: '55 min',
          explain: 'Explain the rules of the Foundation Readiness Practical Test. Every student works independently on their assigned lab PC.',
          demonstrate: 'Briefly review the task checklist on the lab projector screen.',
          practice: 'Students execute the multi-step practical task within the 50-minute lab window.',
          practicalTask: '1. Create folder structure. 2. Write a 1-page specs summary document using hotkeys. 3. Capture annotated screenshot of system specs. 4. Convert to PDF. 5. Zip folder & clean up session.',
          realWorldExample: 'Workplace onboarding test: Proving computer competency to an employer.',
          expectedOutput: 'Student successfully submits completed practical lab package adhering to all guidelines.'
        }
      }
    ],
    realProject: {
      title: 'Foundation Track Graduation Portfolio Package',
      description: 'Final submission package containing folder structure, system specs PDF, annotated screenshots, and readiness certificate.'
    }
  }
];

export const calculateFoundationMetrics = (progressState = {}) => {
  let totalClasses = 0;
  let completedClasses = 0;

  FOUNDATION_MODULES.forEach((mod) => {
    mod.classes.forEach((cls) => {
      totalClasses++;
      if (progressState[cls.id]?.status === 'COMPLETED') {
        completedClasses++;
      }
    });
  });

  const percentage = totalClasses > 0 ? Math.round((completedClasses / totalClasses) * 100) : 0;
  return { totalClasses, completedClasses, percentage };
};

export const MODULE_0_FOUNDATION = FOUNDATION_MODULES[0];
