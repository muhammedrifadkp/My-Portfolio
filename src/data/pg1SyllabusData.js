// PG 1st Year Digital Skills Syllabus Data Structure
// Framework: LEARN -> DEMONSTRATE -> PRACTICE -> CREATE -> COMPLETE

export const PG_1_MODULES = [
  {
    id: 'pg1-mod-1',
    number: 1,
    title: 'Enterprise Office Productivity & Management',
    purpose: 'Master advanced executive document workflows, complex Excel financial modeling, automated office reporting, and team collaboration systems.',
    icon: 'fas fa-briefcase',
    color: '#00F0FF',
    realProject: {
      title: 'Enterprise Operational Management Package',
      description: 'Students build an automated Excel financial model, formal executive report document, and corporate presentation slide deck.'
    },
    classes: [
      {
        id: 'pg1-cls-1',
        classNum: 1,
        topic: 'Executive Document Formatting & Publishing',
        simpleConcept: 'Mastering document styles, table of contents, headers/footers, watermark security, and PDF publishing for corporate board reports.',
        objective: 'Format formal executive reports conforming to corporate documentation standards.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain typography hierarchy, document section breaks, captioning figures, and PDF security settings.',
          demonstrate: 'Format a 10-page corporate report with custom styles, automated table of contents, and cover page.',
          practice: 'Format a 5-page business proposal document with styled headings and table of contents.',
          realWorldExample: 'Corporate annual reports and board meeting documentation.',
          practicalTask: 'Create a 5-page formatted executive report with automated table of contents.',
          expectedOutput: 'Clean, professionally formatted executive PDF report.'
        }
      },
      {
        id: 'pg1-cls-2',
        classNum: 2,
        topic: 'Financial Modeling & Advanced Formulas in MS Excel',
        simpleConcept: 'Using `SUMIFS`, `COUNTIFS`, `INDEX/MATCH`, `XLOOKUP`, `PMT`, and `NPV` for corporate budgeting and financial forecasting.',
        objective: 'Build multi-tab financial models and budget forecast spreadsheets.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain financial model structure, dynamic inputs vs output cells, audit formula tools, and scenario analysis.',
          demonstrate: 'Build a 3-year revenue and expense forecast model with dynamic growth parameters.',
          practice: 'Calculate loan EMI payments using PMT function and build amortization schedule.',
          realWorldExample: 'Corporate budgeting, financial planning, and investment evaluation.',
          practicalTask: 'Construct a 3-year financial budget forecast spreadsheet with dynamic formulas.',
          expectedOutput: 'Accurate multi-year financial model spreadsheet.'
        }
      },
      {
        id: 'pg1-cls-3',
        classNum: 3,
        topic: 'Power Query Data Transformation & Consolidations',
        simpleConcept: 'Consolidating multiple Excel files from a folder automatically, unpivoting data tables, and setting up automated refresh.',
        objective: 'Automate multi-source data consolidation workflows in Excel.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Power Query folder connections, appending queries, merging tables, and data type validation.',
          demonstrate: 'Combine 12 monthly sales CSV files into a single unified data master table automatically using Power Query.',
          practice: 'Merge 2 customer datasets on common ID key using Power Query.',
          realWorldExample: 'Automating monthly multi-branch financial report consolidation.',
          practicalTask: 'Consolidate multiple monthly sales files into one automated Power Query master dataset.',
          expectedOutput: 'Automated data consolidation query setup.'
        }
      },
      {
        id: 'pg1-cls-4',
        classNum: 4,
        topic: 'Executive PowerPoint Slide Decks & Data Visualization',
        simpleConcept: 'Designing executive pitch decks, data-driven charts, infographic layouts, and delivering corporate presentations.',
        objective: 'Create persuasive data-driven executive slide decks.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Minto Pyramid Principle, visual storytelling, reducing slide clutter, and chart emphasis techniques.',
          demonstrate: 'Design a 5-slide strategic corporate presentation with clean chart highlights and key takeaways.',
          practice: 'Create 2 slides presenting business quarterly growth metrics visually.',
          realWorldExample: 'Board of directors presentations and investor fundraising pitch decks.',
          practicalTask: 'Design a 5-slide executive presentation summarizing business performance.',
          expectedOutput: 'Polished 5-slide executive presentation PPTX.'
        }
      },
      {
        id: 'pg1-cls-5',
        classNum: 5,
        topic: 'Cloud Collaboration Systems & Enterprise Storage Security',
        simpleConcept: 'Managing Google Workspace / Microsoft 365 permissions, shared drives, version history, and document access security.',
        objective: 'Configure secure team cloud storage and collaborative document workflows.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain role-based access controls (Viewer vs Editor), version recovery, activity audit logs, and data security.',
          demonstrate: 'Set up a Google Shared Drive with specific department folders, permission levels, and version rollback.',
          practice: 'Configure folder access restrictions and test version restoration.',
          realWorldExample: 'Enterprise cloud document governance and team security.',
          practicalTask: 'Create an enterprise cloud drive folder structure with defined access permissions.',
          expectedOutput: 'Configured cloud storage workspace security plan.'
        }
      }
    ]
  },
  {
    id: 'pg1-mod-2',
    number: 2,
    title: 'Advanced Data Science & Business Intelligence (Power BI)',
    purpose: 'Master Power BI Desktop, DAX formulas (CALCULATE, SUMX, RELATED), interactive report visual layouts, data modeling, and business intelligence dashboards.',
    icon: 'fas fa-chart-line',
    color: '#3B82F6',
    realProject: {
      title: 'Enterprise Power BI Business Intelligence Dashboard',
      description: 'Students build a multi-page Power BI dashboard with star-schema data models, DAX measures, and interactive report visuals.'
    },
    classes: [
      {
        id: 'pg1-cls-6',
        classNum: 6,
        topic: 'Power BI Desktop Interface & Star-Schema Data Modeling',
        simpleConcept: 'Importing data sources into Power BI, creating Relationships (1-to-Many), Fact vs Dimension tables, and Star-Schema design.',
        objective: 'Construct efficient relational data models in Power BI.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Star-Schema vs Snowflake schema, primary/foreign keys, and cross-filter direction.',
          demonstrate: 'Import Sales Fact table and Customer/Product Dimension tables, establishing active 1-to-many relationships.',
          practice: 'Link a Date Dimension table to Sales Fact table in Power BI Model View.',
          realWorldExample: 'Enterprise data warehouse modeling and business intelligence architecture.',
          practicalTask: 'Build a Star-Schema relational model connecting 3 tables in Power BI.',
          expectedOutput: 'Valid Star-Schema data model in Power BI.'
        }
      },
      {
        id: 'pg1-cls-7',
        classNum: 7,
        topic: 'DAX Basics: Measures vs Calculated Columns & Core Functions',
        simpleConcept: 'Writing Data Analysis Expressions (DAX) using `SUM`, `AVERAGE`, `COUNTROWS`, `DIVIDE`, and understanding Measure evaluation context.',
        objective: 'Write DAX formulas for dynamic business metrics calculation.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Row Context vs Filter Context, why to use Measures over Calculated Columns, and `DIVIDE()` error prevention.',
          demonstrate: 'Write DAX measures for Total Revenue, Total Profit, and Profit Margin %.',
          practice: 'Create a DAX measure calculating Average Order Value.',
          realWorldExample: 'Calculating KPI metrics dynamically across global company dashboards.',
          practicalTask: 'Write 4 DAX measures calculating key financial KPI metrics in Power BI.',
          expectedOutput: 'Working DAX measures table in Power BI.'
        }
      },
      {
        id: 'pg1-cls-8',
        classNum: 8,
        topic: 'Advanced DAX: `CALCULATE`, Time Intelligence & Filters',
        simpleConcept: 'Using `CALCULATE()` to override filter context, `SAMEPERIODLASTYEAR`, `YTD`, and year-over-year (YoY) growth calculations.',
        objective: 'Execute time-intelligence data analysis using advanced DAX functions.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain `CALCULATE()` filter modifier, date table requirements, and `TOTALYTD()` vs `SAMEPERIODLASTYEAR()`.',
          demonstrate: 'Write DAX measure calculating Year-Over-Year Sales Growth % comparing current sales to previous year.',
          practice: 'Create a YTD Revenue DAX measure in Power BI.',
          realWorldExample: 'Corporate quarterly growth analysis and financial performance tracking.',
          practicalTask: 'Write DAX measures calculating YTD Revenue and YoY Growth %.',
          expectedOutput: 'Advanced Time Intelligence DAX measures in Power BI.'
        }
      },
      {
        id: 'pg1-cls-9',
        classNum: 9,
        topic: 'Power BI Visualizations, Bookmarks & Interactive Buttons',
        simpleConcept: 'Building matrix tables, line/bar charts, card visuals, tooltips, bookmarks, and page navigation buttons.',
        objective: 'Design intuitive, interactive Power BI report pages.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain visual hierarchy, custom tooltips, bookmark state saving, and button actions.',
          demonstrate: 'Build a Power BI report page with 3 KPI cards, 2 charts, and a bookmark button toggling chart views.',
          practice: 'Add custom tooltip page showing regional breakdown on hover over chart.',
          realWorldExample: 'Interactive executive dashboards for enterprise decision makers.',
          practicalTask: 'Design an interactive Power BI report page with connected visual filters.',
          expectedOutput: 'Interactive single-page Power BI report.'
        }
      },
      {
        id: 'pg1-cls-10',
        classNum: 10,
        topic: 'Power BI Service, Scheduled Refresh & Executive Publishing',
        simpleConcept: 'Publishing reports to Power BI Service cloud workspace, configuring gateway scheduled refresh, and sharing dashboard apps.',
        objective: 'Publish Power BI reports to cloud service for automated team access.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Power BI Service workspaces, app publishing, data gateways, and automated daily refresh.',
          demonstrate: 'Publish Power BI Desktop file to Power BI Service cloud, configure dashboard tiles, and test share link.',
          practice: 'Publish a report to personal Power BI workspace and pin a KPI card to a dashboard.',
          realWorldExample: 'Delivering live automated business intelligence dashboards to company executives.',
          practicalTask: 'Publish completed Power BI dashboard report to cloud workspace.',
          expectedOutput: 'Live cloud Power BI report and workspace URL.'
        }
      }
    ]
  },
  {
    id: 'pg1-mod-3',
    number: 3,
    title: 'Corporate Digital Marketing & Brand Strategy',
    purpose: 'Master strategic brand positioning, multi-channel digital campaigns, performance marketing, content marketing funnels, and marketing ROI analytics.',
    icon: 'fas fa-bullhorn',
    color: '#10B981',
    realProject: {
      title: '360-Degree Corporate Digital Marketing Strategy & Campaign',
      description: 'Students design a full corporate marketing campaign including audience personas, content funnels, paid media plan, and KPI tracking.'
    },
    classes: [
      {
        id: 'pg1-cls-11',
        classNum: 11,
        topic: 'Strategic Brand Positioning & Buyer Persona Architecture',
        simpleConcept: 'Defining value propositions, brand identity guidelines, customer demographic/psychographic personas, and competitive mapping.',
        objective: 'Construct detailed customer buyer personas and brand positioning strategy.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain brand messaging frameworks, pain point mapping, unique selling proposition (USP), and positioning matrices.',
          demonstrate: 'Create a comprehensive Buyer Persona profile for an enterprise software product.',
          practice: 'Draft a brand positioning statement for a new digital service.',
          realWorldExample: 'Corporate marketing strategy development in multinational companies.',
          practicalTask: 'Build 2 target buyer persona profiles for a corporate brand.',
          expectedOutput: 'Detailed Buyer Persona and Brand Positioning document.'
        }
      },
      {
        id: 'pg1-cls-12',
        classNum: 12,
        topic: 'Full-Funnel Content Marketing Strategy (TOFU, MOFU, BOFU)',
        simpleConcept: 'Designing content for Top of Funnel (Awareness), Middle of Funnel (Consideration), and Bottom of Funnel (Conversion).',
        objective: 'Map multi-stage content funnels driving lead acquisition and sales.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain content mapping per funnel stage: blogs/social at TOFU, webinars/case studies at MOFU, free trials at BOFU.',
          demonstrate: 'Design a 30-day full-funnel content marketing calendar for B2B company.',
          practice: 'Create 3 content ideas for each funnel stage for an e-learning platform.',
          realWorldExample: 'Inbound marketing funnels driving automated lead generation.',
          practicalTask: 'Create a 30-day full-funnel content marketing campaign plan.',
          expectedOutput: 'Complete Full-Funnel Content Marketing Blueprint.'
        }
      },
      {
        id: 'pg1-cls-13',
        classNum: 13,
        topic: 'Performance Marketing & Omnichannel Paid Ads (Meta & Google)',
        simpleConcept: 'Structuring paid ad budgets across Google Search, Display, Meta Ads, LinkedIn Ads, and calculating Customer Acquisition Cost (CAC).',
        objective: 'Design performance marketing paid media allocation plans.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain CAC vs LTV (Lifetime Value), ROAS (Return on Ad Spend), conversion tracking pixels, and A/B ad testing.',
          demonstrate: 'Build a monthly $5,000 paid media budget allocation model across search and social channels.',
          practice: 'Calculate ROAS and CPA metrics for a sample ad campaign.',
          realWorldExample: 'Managing multi-channel performance ad budgets for growth brands.',
          practicalTask: 'Formulate an omnichannel paid ad budget strategy with projected ROI.',
          expectedOutput: 'Performance Marketing Budget & ROI Strategy sheet.'
        }
      },
      {
        id: 'pg1-cls-14',
        classNum: 14,
        topic: 'Email Marketing Automation & Lead Nurturing Workflows',
        simpleConcept: 'Setting up automated email drip campaigns (Mailchimp/Klaviyo), lead scoring, segmentation, and conversion copywriting.',
        objective: 'Build automated email marketing drip campaigns and lead nurturing flows.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain email open rates, click-through rates (CTR), automated triggers, welcome series, and abandoned cart recovery.',
          demonstrate: 'Build a 3-step automated welcome email sequence for new newsletter subscribers.',
          practice: 'Write conversion copy for a promotional email campaign.',
          realWorldExample: 'Automated customer onboarding and retention marketing.',
          practicalTask: 'Design a 3-step automated lead nurturing email sequence with copy.',
          expectedOutput: 'Complete automated email marketing workflow.'
        }
      },
      {
        id: 'pg1-cls-15',
        classNum: 15,
        topic: 'Digital Marketing Analytics & Executive Campaign Reporting',
        simpleConcept: 'Consolidating multi-channel analytics into executive dashboards, calculating ROI, and presenting marketing insights.',
        objective: 'Synthesize digital marketing metrics into executive strategy reports.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain executive reporting KPIs, attribution models (First Click vs Last Touch), and recommendations synthesis.',
          demonstrate: 'Build a single-page executive marketing performance report combining SEO, Paid Ads, and Email metrics.',
          practice: 'Write 3 strategic recommendations based on a sample campaign analytics sheet.',
          realWorldExample: 'Presenting quarterly marketing performance to Chief Marketing Officers (CMOs).',
          practicalTask: 'Create an executive digital marketing campaign performance report.',
          expectedOutput: 'Executive Digital Marketing Performance & ROI Report.'
        }
      }
    ]
  },
  {
    id: 'pg1-mod-4',
    number: 4,
    title: 'Web & Cloud Solutions for Enterprise',
    purpose: 'Master enterprise web architecture, CMS deployment (WordPress/Webflow), cloud hosting (AWS/Vercel), domain management, SSL, and web portal administration.',
    icon: 'fas fa-cloud',
    color: '#8B5CF6',
    realProject: {
      title: 'Enterprise Web Portal & Cloud Hosting Deployment',
      description: 'Students configure an enterprise CMS website, set up SSL security, manage cloud hosting, and optimize page load performance.'
    },
    classes: [
      {
        id: 'pg1-cls-16',
        classNum: 16,
        topic: 'Enterprise Web Architecture & Content Management Systems (CMS)',
        simpleConcept: 'Understanding web client-server architecture, headless CMS vs monolithic CMS (WordPress, Webflow, Strapi), and database backends.',
        objective: 'Select and architect appropriate CMS platforms for enterprise websites.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain web architecture layers (Frontend, API Gateway, CMS, Database), security, and scalable infrastructure.',
          demonstrate: 'Set up a local or cloud WordPress/Webflow website instance with enterprise theme template.',
          practice: 'Create 3 web pages with customized content blocks and navigation menu.',
          realWorldExample: 'Managing corporate web portals for global businesses.',
          practicalTask: 'Configure a multi-page enterprise CMS website structure.',
          expectedOutput: 'Configured CMS website structure.'
        }
      },
      {
        id: 'pg1-cls-17',
        classNum: 17,
        topic: 'Cloud Hosting Administration (AWS, Vercel & cPanel Basics)',
        simpleConcept: 'Managing cloud web hosting servers, FTP file transfer, database configuration (MySQL), and environment variables.',
        objective: 'Deploy web applications to cloud hosting servers.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain server environments (Linux, Apache/Nginx), database creation, environment variables, and SSH keys.',
          demonstrate: 'Set up MySQL database, upload web files via FTP/cPanel, and configure server settings.',
          practice: 'Create a database user and connect web app configuration file.',
          realWorldExample: 'System administration and cloud hosting operations.',
          practicalTask: 'Deploy a web portal database and site instance to cloud hosting.',
          expectedOutput: 'Working cloud-hosted web application instance.'
        }
      },
      {
        id: 'pg1-cls-18',
        classNum: 18,
        topic: 'Domain Name System (DNS), SSL Certificates & Web Security',
        simpleConcept: 'Configuring DNS A-records, CNAMEs, SSL HTTPS encryption certificates, Cloudflare CDN, and web security hardening.',
        objective: 'Secure web domains with SSL certificates and CDN firewall protection.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain DNS propagation, SSL handshake, Cloudflare CDN caching, DDoS protection, and HTTPS redirection.',
          demonstrate: 'Configure custom domain DNS settings, issue free Let\'s Encrypt SSL certificate, and set up Cloudflare protection.',
          practice: 'Verify domain SSL HTTPS security rating using SSL Labs scanner.',
          realWorldExample: 'Securing corporate web domains against cyber threats.',
          practicalTask: 'Configure domain DNS records and verify HTTPS SSL security certificate.',
          expectedOutput: 'Secured HTTPS domain setup.'
        }
      },
      {
        id: 'pg1-cls-19',
        classNum: 19,
        topic: 'Website Speed Optimization & Technical SEO Audits',
        simpleConcept: 'Optimizing page load speed (Google PageSpeed Insights), image compression, browser caching, and technical SEO fixes.',
        objective: 'Audit and optimize web page loading speed and technical SEO scores.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Core Web Vitals (LCP, FID, CLS), WebP image formatting, minification, and caching plugins.',
          demonstrate: 'Run PageSpeed Insights on a website, compress images, enable caching, and improve performance score from 40 to 90+.',
          practice: 'Audit a website performance score and fix 2 speed bottlenecks.',
          realWorldExample: 'Optimizing high-traffic enterprise portals for search engine ranking and user experience.',
          practicalTask: 'Conduct a technical website audit and implement speed optimization fixes.',
          expectedOutput: 'Technical Web Audit & Speed Optimization Report.'
        }
      },
      {
        id: 'pg1-cls-20',
        classNum: 20,
        topic: 'Web Analytics, Error Logging & Uptime Monitoring',
        simpleConcept: 'Setting up automated website uptime monitors (UptimeRobot), 404 error tracking, and backup schedules.',
        objective: 'Implement continuous web monitoring and automated backup routines.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain 99.9% SLA uptime, automated database backups, error logging, and alert notifications.',
          demonstrate: 'Set up automated UptimeRobot monitor sending instant SMS/Email alerts if website goes down.',
          practice: 'Configure automated weekly database backup routine.',
          realWorldExample: 'Ensuring 24/7 reliability for critical business websites.',
          practicalTask: 'Set up an automated website uptime monitor and backup schedule.',
          expectedOutput: 'Active website monitoring and backup configuration.'
        }
      }
    ]
  },
  {
    id: 'pg1-mod-5',
    number: 5,
    title: 'AI for Business & Workflow Automation',
    purpose: 'Master corporate AI adoption, custom GPTs, workflow automation platforms (Zapier/Make), AI document processing, and AI strategy execution.',
    icon: 'fas fa-robot',
    color: '#EC4899',
    realProject: {
      title: 'Enterprise AI Workflow & Zapier Automation Solution',
      description: 'Students build an automated business workflow connecting web forms, AI text processing, email notifications, and database logging.'
    },
    classes: [
      {
        id: 'pg1-cls-21',
        classNum: 21,
        topic: 'Corporate AI Adoption & Enterprise Prompt Engineering',
        simpleConcept: 'Structuring advanced multi-persona prompts, system prompts, few-shot prompting, and data security guidelines for enterprise LLMs.',
        objective: 'Formulate enterprise-grade AI prompts for complex business operations.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain enterprise data privacy (preventing confidential leak), system role prompts, and JSON structured outputs.',
          demonstrate: 'Build a master system prompt that acts as a Senior Financial Analyst evaluating quarterly reports into structured JSON.',
          practice: 'Draft a system prompt enforcing formal corporate communication guidelines.',
          realWorldExample: 'Enterprise AI integration across corporate departments.',
          practicalTask: 'Create a library of 5 enterprise system prompts for key business operations.',
          expectedOutput: 'Enterprise AI System Prompt Library.'
        }
      },
      {
        id: 'pg1-cls-22',
        classNum: 22,
        topic: 'Custom GPT Creation & Knowledge Base Integration',
        simpleConcept: 'Building custom GPTs in ChatGPT, uploading company knowledge bases (PDFs/Docs), and setting custom action instructions.',
        objective: 'Build custom AI assistants trained on company documentation.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Retrieval-Augmented Generation (RAG) concepts, knowledge file indexing, and custom GPT instructions.',
          demonstrate: 'Create a custom "Customer Support AI Bot" trained on a company product manual PDF.',
          practice: 'Build a custom GPT assistant trained on a student handbook document.',
          realWorldExample: 'Internal company knowledge bots for employees and customer service AI.',
          practicalTask: 'Build and test a custom GPT assistant trained on specialized business documents.',
          expectedOutput: 'Working custom GPT assistant trained on knowledge files.'
        }
      },
      {
        id: 'pg1-cls-23',
        classNum: 23,
        topic: 'No-Code Workflow Automation (Zapier / Make.com Basics)',
        simpleConcept: 'Creating automated workflows (Zaps) connecting web forms, Google Sheets, Gmail, Slack, and Trello without coding.',
        objective: 'Build multi-app automated business workflows using Zapier or Make.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Triggers, Actions, Filters, Multi-Step Zaps, and app webhook connections.',
          demonstrate: 'Build a Zap: When a new lead submits Google Form -> Send email notification -> Add row to Google Sheet -> Post in Slack.',
          practice: 'Build a 2-step automation sending email alert when a spreadsheet row updates.',
          realWorldExample: 'Automating administrative business tasks and lead routing.',
          practicalTask: 'Construct a 3-step automated business workflow connecting 3 apps.',
          expectedOutput: 'Working automated multi-app workflow setup.'
        }
      },
      {
        id: 'pg1-cls-24',
        classNum: 24,
        topic: 'Combining AI & Automation (Zapier + OpenAI API)',
        simpleConcept: 'Inserting OpenAI AI step inside Zapier to automatically summarize incoming customer emails or analyze lead quality.',
        objective: 'Integrate AI text processing into automated business workflows.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain AI automation steps, sentiment analysis, auto-generating response drafts, and intelligent lead routing.',
          demonstrate: 'Build an AI Zap: When customer emails support -> OpenAI categorizes urgency and drafts response -> Send notification to team.',
          practice: 'Build an AI Zap that summarizes incoming form submissions into 2 bullet points.',
          realWorldExample: 'Intelligent AI customer service routing and lead qualification.',
          practicalTask: 'Build an AI-powered automated workflow that processes text input and routes output.',
          expectedOutput: 'Functional AI-integrated automation workflow.'
        }
      },
      {
        id: 'pg1-cls-25',
        classNum: 25,
        topic: 'Enterprise AI Governance, ROI & Capstone Defense',
        simpleConcept: 'Evaluating AI ROI (time saved vs cost), governance policies, ethics, and presenting final PG 1st Year project.',
        objective: 'Assess AI business value and present PG 1st Year capstone project.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain calculating hours saved per week, AI software subscription ROI, data privacy compliance, and team training.',
          demonstrate: 'Moderate final PG 1st Year capstone presentations showcasing automated AI solutions.',
          practice: 'Calculate annual cost savings of automating 5 hours/week of manual data entry.',
          realWorldExample: 'Executive AI strategy presentations to C-suite leadership.',
          practicalTask: 'Present final PG 1st Year AI & Automation Capstone project to class.',
          expectedOutput: 'Successful presentation of PG 1st Year Capstone project.'
        }
      }
    ]
  }
];

export const PG_1_SPECIALIZATION_OPTIONS = [
  {
    id: 'track-enterprise',
    title: 'Enterprise Management & Power BI',
    icon: 'fas fa-briefcase',
    description: 'Master advanced document workflows, financial modeling, Star-Schema data models, DAX formulas, and Power BI dashboards.',
    keySkills: ['Executive Financial Modeling', 'Power Query Consolidations', 'Star-Schema Data Models', 'DAX Measures & Power BI'],
    portfolioDeliverable: 'An interactive Power BI Business Intelligence dashboard and financial model.'
  },
  {
    id: 'track-strategy',
    title: 'Corporate Digital Marketing & Brand Strategy',
    icon: 'fas fa-bullhorn',
    description: 'Master buyer personas, full-funnel content strategies, omnichannel paid media allocation, and executive ROI analytics reporting.',
    keySkills: ['Buyer Persona Architecture', 'Full-Funnel Content Strategy', 'Omnichannel Paid Media', 'Marketing Analytics ROI'],
    portfolioDeliverable: 'A 360-degree corporate digital marketing campaign strategy and ROI report.'
  },
  {
    id: 'track-ai-automation',
    title: 'Enterprise Cloud & AI Workflow Automation',
    icon: 'fas fa-robot',
    description: 'Master CMS web portals, cloud security, custom GPTs, Zapier multi-app workflows, and AI business automation.',
    keySkills: ['Enterprise CMS & Hosting', 'SSL & DNS Security', 'Custom GPT Assistants', 'Zapier + OpenAI Automations'],
    portfolioDeliverable: 'An automated business workflow integration connecting web forms, AI, and notifications.'
  }
];

export const calculatePg1Metrics = (savedProgress) => {
  let totalClasses = 0;
  let completedClasses = 0;
  let inProgressClasses = 0;

  const moduleMetrics = PG_1_MODULES.map((mod) => {
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
