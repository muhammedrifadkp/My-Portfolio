// PG 2nd Year Digital Skills Syllabus Data Structure
// Framework: LEARN -> DEMONSTRATE -> PRACTICE -> CREATE -> COMPLETE

export const PG_2_MODULES = [
  {
    id: 'pg2-mod-1',
    number: 1,
    title: 'Executive IT Leadership & Project Management',
    purpose: 'Master Agile/Scrum methodologies, JIRA project tracking, technical product management, IT governance, and strategic tech leadership.',
    icon: 'fas fa-user-tie',
    color: '#00F0FF',
    realProject: {
      title: 'Executive Software Product Roadmap & Agile Release Plan',
      description: 'Students design an enterprise software product roadmap, create user stories in JIRA/Trello, and structure sprint release plans.'
    },
    classes: [
      {
        id: 'pg2-cls-1',
        classNum: 1,
        topic: 'Agile & Scrum Frameworks in Enterprise Tech',
        simpleConcept: 'Understanding Agile manifesto, Scrum roles (Product Owner, Scrum Master, Dev Team), Sprint ceremonies, and backlog prioritization.',
        objective: 'Implement Scrum frameworks and run Sprint planning sessions.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Sprints (2-week cycles), Daily Standups, Sprint Review, Retrospective, and Backlog Grooming.',
          demonstrate: 'Set up an Agile board on Trello/JIRA, define a Product Backlog, and estimate story points.',
          practice: 'Create 5 User Stories for an e-commerce mobile app feature backlog.',
          realWorldExample: 'Software delivery management in global tech corporations.',
          practicalTask: 'Create an Agile Product Backlog with 5 prioritized User Stories.',
          expectedOutput: 'Configured Product Backlog in Agile project tool.'
        }
      },
      {
        id: 'pg2-cls-2',
        classNum: 2,
        topic: 'User Stories, Acceptance Criteria & JIRA Management',
        simpleConcept: 'Writing user stories in "As a [user], I want [feature] so that [benefit]" format with strict Given-When-Then acceptance criteria.',
        objective: 'Write clear User Stories with verified Acceptance Criteria.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain INVEST criteria for User Stories, Definition of Done (DoD), and Acceptance Criteria testing.',
          demonstrate: 'Write User Story for user registration with 4 testable acceptance criteria.',
          practice: 'Write User Story and acceptance criteria for a shopping cart checkout step.',
          realWorldExample: 'Technical Product Spec documentation in software engineering teams.',
          practicalTask: 'Write 3 complete User Stories with Given-When-Then Acceptance Criteria.',
          expectedOutput: 'Formal Technical Product Spec document.'
        }
      },
      {
        id: 'pg2-cls-3',
        classNum: 3,
        topic: 'Tech Product Roadmap & Feature Prioritization (RICE Framework)',
        simpleConcept: 'Using Reach, Impact, Confidence, Effort (RICE) scoring to prioritize feature roadmaps objectively.',
        objective: 'Prioritize feature backlogs using data-driven scoring frameworks.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain RICE formula: `(Reach * Impact * Confidence) / Effort`, MoSCoW method, and roadmap quarter planning (Q1-Q4).',
          demonstrate: 'Build a RICE scoring spreadsheet evaluating 10 proposed web app features to select top 3 for Q1.',
          practice: 'Calculate RICE scores for 4 feature ideas and rank priority order.',
          realWorldExample: 'Product Management prioritization decisions at Google and Microsoft.',
          practicalTask: 'Build a RICE Feature Prioritization sheet evaluating 6 product features.',
          expectedOutput: 'Calculated RICE Product Prioritization spreadsheet.'
        }
      },
      {
        id: 'pg2-cls-4',
        classNum: 4,
        topic: 'IT Governance, Risk Management & Compliance (GDPR/ISO)',
        simpleConcept: 'Understanding data privacy laws (GDPR), cybersecurity risk assessment, backup recovery plans, and ISO compliance.',
        objective: 'Assess IT security risks and draft compliance policies.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain data privacy principles, risk probability vs impact matrix, data breach response, and compliance audits.',
          demonstrate: 'Conduct an IT Risk Assessment for a cloud web application, identifying vulnerabilities and mitigation steps.',
          practice: 'Draft a simple Data Privacy Policy for a customer web app.',
          realWorldExample: 'Enterprise compliance management and cybersecurity governance.',
          practicalTask: 'Create an IT Risk Assessment Matrix for an enterprise software project.',
          expectedOutput: 'IT Risk Assessment & Security Policy document.'
        }
      },
      {
        id: 'pg2-cls-5',
        classNum: 5,
        topic: 'Executive Communication & Leadership Pitching',
        simpleConcept: 'Presenting technical roadmaps to C-level executives, stakeholder alignment, and managing project budget expectations.',
        objective: 'Deliver executive IT project proposals to leadership stakeholders.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain executive summary brevity, ROI justification, risk disclosure, and visual roadmap presentation.',
          demonstrate: 'Deliver a 5-minute executive pitch for a $50k IT infrastructure upgrade proposal.',
          practice: 'Present a 2-minute project pitch to class acting as executive board.',
          realWorldExample: 'Securing executive approval and budget for IT projects.',
          practicalTask: 'Deliver a 5-minute Executive Tech Leadership presentation for a new IT initiative.',
          expectedOutput: 'Executive IT Leadership Pitch & Slides.'
        }
      }
    ]
  },
  {
    id: 'pg2-mod-2',
    number: 2,
    title: 'Advanced AI Agents & Enterprise Automation',
    purpose: 'Master multi-agent AI frameworks (AutoGPT, CrewAI, LangChain basics), custom LLM API integrations (OpenAI/Claude API), vector embeddings, and autonomous agent workflows.',
    icon: 'fas fa-robot',
    color: '#3B82F6',
    realProject: {
      title: 'Autonomous Multi-Agent AI Business Solution',
      description: 'Students configure an autonomous AI agent workflow that conducts research, generates content, and executes automated multi-step actions.'
    },
    classes: [
      {
        id: 'pg2-cls-6',
        classNum: 6,
        topic: 'Autonomous AI Agents Overview & Architecture',
        simpleConcept: 'Understanding the difference between simple chatbots vs autonomous AI agents (Goal + Memory + Tools + Planning loop).',
        objective: 'Architect autonomous multi-step AI agent systems.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Agentic loop: Perception -> Planning -> Tool Execution -> Evaluation -> Completion.',
          demonstrate: 'Show how an AI agent uses web search tools to research a topic and write a summary independently.',
          practice: 'Diagram an autonomous AI market research agent flow.',
          realWorldExample: 'Next-generation AI automation replacing manual multi-step tasks.',
          practicalTask: 'Design a functional architecture diagram for an autonomous AI research agent.',
          expectedOutput: 'AI Agent Architecture Blueprint.'
        }
      },
      {
        id: 'pg2-cls-7',
        classNum: 7,
        topic: 'OpenAI & Anthropic Claude API Integration',
        simpleConcept: 'Connecting to OpenAI API (`gpt-4o`) or Claude API via Python/JavaScript, passing API keys, and handling JSON responses.',
        objective: 'Call LLM APIs programmatically in software code.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain API endpoints, authentication headers, model parameters (`temperature`, `max_tokens`), and system messages.',
          demonstrate: 'Write a 15-line JS/Python script that sends a prompt to OpenAI API and prints the response.',
          practice: 'Modify script to adjust temperature parameter and observe creativity changes.',
          realWorldExample: 'Embedding AI intelligence directly into commercial web applications.',
          practicalTask: 'Write a working code script that sends custom requests to an LLM API and receives structured output.',
          expectedOutput: 'Working LLM API integration script.'
        }
      },
      {
        id: 'pg2-cls-8',
        classNum: 8,
        topic: 'Vector Embeddings & Semantic Search (Pinecone / ChromaDB Intro)',
        simpleConcept: 'Converting text documents into vector numbers (embeddings) and searching for semantically similar information.',
        objective: 'Understand vector databases and semantic document retrieval.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain text embeddings, cosine similarity, vector databases, and Retrieval-Augmented Generation (RAG).',
          demonstrate: 'Generate embeddings for 3 text snippets using OpenAI embeddings API and compare similarity scores.',
          practice: 'Perform a semantic search query matching a question to relevant document chunks.',
          realWorldExample: 'Powering intelligent Enterprise Search engines and AI knowledge bots.',
          practicalTask: 'Build a basic semantic search script comparing query embeddings to document vectors.',
          expectedOutput: 'Semantic Search Embeddings demonstration script.'
        }
      },
      {
        id: 'pg2-cls-9',
        classNum: 9,
        topic: 'Multi-Agent Frameworks (CrewAI / Auto-GPT Workflow Setup)',
        simpleConcept: 'Setting up CrewAI/Auto-GPT agents with specific roles (Researcher, Writer, Editor) collaborating to complete a complex task.',
        objective: 'Build multi-agent AI teams with specialized roles and tasks.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain agent roles, tools (Web Search, File Writer), delegation between agents, and sequential execution.',
          demonstrate: 'Set up a CrewAI workflow: Researcher agent searches web news -> Writer agent drafts article -> Editor agent reviews quality.',
          practice: 'Define roles and tasks for a 2-agent customer support escalation crew.',
          realWorldExample: 'Automated content teams and market intelligence multi-agent pipelines.',
          practicalTask: 'Configure a multi-agent AI workflow executing a 2-step automated collaborative task.',
          expectedOutput: 'Working multi-agent AI workflow execution.'
        }
      },
      {
        id: 'pg2-cls-10',
        classNum: 10,
        topic: 'AI Agent Guardrails, Monitoring & Production Deployment',
        simpleConcept: 'Setting safety guardrails, budget limits, error fallback loops, and deploying AI agent services live.',
        objective: 'Deploy secure, cost-managed AI agents in production environments.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain API cost monitoring, rate limit handling, preventing infinite loops, and content safety moderation.',
          demonstrate: 'Add API rate limit error handling and token cost logging to an AI agent script.',
          practice: 'Implement a token budget cap in code to prevent overspending.',
          realWorldExample: 'Enterprise AI safety governance and infrastructure cost control.',
          practicalTask: 'Deploy a monitored AI agent service with cost caps and fallback handling.',
          expectedOutput: 'Production-ready monitored AI agent deployment.'
        }
      }
    ]
  },
  {
    id: 'pg2-mod-3',
    number: 3,
    title: 'Digital Product Design & Full-Scale Production',
    purpose: 'Master UI/UX design in Figma, wireframing, interactive prototyping, design systems, and transforming designs into full-stack web applications.',
    icon: 'fas fa-palette',
    color: '#10B981',
    realProject: {
      title: 'Full-Scale Interactive UI/UX Figma Design & Web Prototype',
      description: 'Students design a mobile/web product in Figma with component design systems, interactive prototypes, and web code implementation.'
    },
    classes: [
      {
        id: 'pg2-cls-11',
        classNum: 11,
        topic: 'Figma UI/UX Fundamentals, Frames & Vector Tools',
        simpleConcept: 'Navigating Figma interface, frames (mobile vs desktop), vector shapes, typography, and visual alignment grids.',
        objective: 'Construct clean UI wireframes and screens in Figma.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain UI design principles, 8pt spatial grid system, contrast ratios, and frame canvas management.',
          demonstrate: 'Build a mobile app login screen wireframe in Figma using text, input shapes, and primary button.',
          practice: 'Create a desktop homepage hero section frame in Figma.',
          realWorldExample: 'Professional UI design workflows across global product companies.',
          practicalTask: 'Design a 2-screen mobile UI wireframe in Figma.',
          expectedOutput: 'Clean Figma mobile UI wireframe file.'
        }
      },
      {
        id: 'pg2-cls-12',
        classNum: 12,
        topic: 'Figma Auto Layout & Responsive UI Components',
        simpleConcept: 'Using Figma Auto Layout (`Shift + A`), flex-like spacing, padding, constraints, and responsive component resizing.',
        objective: 'Build responsive UI layouts using Figma Auto Layout.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Auto Layout direction (vertical/horizontal), hug content vs fill container, and nested auto layout frames.',
          demonstrate: 'Build a responsive button and navigation bar that automatically resizes when text changes.',
          practice: 'Create a card component with image, title, and badge using Auto Layout.',
          realWorldExample: 'Scalable UI design systems built for seamless developer handoff.',
          practicalTask: 'Create 3 responsive UI components using Figma Auto Layout.',
          expectedOutput: 'Figma file with Auto Layout components.'
        }
      },
      {
        id: 'pg2-cls-13',
        classNum: 13,
        topic: 'Design Systems, Color Styles & Reusable Component Libraries',
        simpleConcept: 'Creating design tokens (Color styles, Typography hierarchy, Shadow elevation) and reusable Component variants.',
        objective: 'Construct a reusable Design System library in Figma.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Design Systems (Material Design, Tailwind UI), component state variants (Default, Hover, Disabled), and token naming.',
          demonstrate: 'Set up a mini Design System with 4 color styles, 3 font styles, and a primary button variant component.',
          practice: 'Create a card component with 2 variant states in Figma.',
          realWorldExample: 'Maintaining consistent brand UI across large engineering teams.',
          practicalTask: 'Build a Figma Design System file with color tokens, typography, and button variants.',
          expectedOutput: 'Complete mini Design System library in Figma.'
        }
      },
      {
        id: 'pg2-cls-14',
        classNum: 14,
        topic: 'Interactive Prototyping, Smart Animate & Micro-Interactions',
        simpleConcept: 'Connecting Figma screens with interactive prototyping links, Smart Animate transitions, overlays, and hover states.',
        objective: 'Create clickable, realistic interactive UI prototypes in Figma.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain prototype triggers (On Click, On Hover, While Pressing), Smart Animate easing, and modal overlays.',
          demonstrate: 'Link 3 app screens into a clickable prototype with smooth slide transitions and modal popup overlay.',
          practice: 'Add click interaction connecting a product list screen to a product detail screen.',
          realWorldExample: 'Usability testing interactive prototypes with users before writing code.',
          practicalTask: 'Build a 3-screen clickable interactive prototype in Figma.',
          expectedOutput: 'Clickable interactive Figma prototype link.'
        }
      },
      {
        id: 'pg2-cls-15',
        classNum: 15,
        topic: 'Figma Handoff to Code & Web Implementation',
        simpleConcept: 'Extracting CSS properties, SVG assets, font specifications from Figma Dev Mode and implementing designs in code.',
        objective: 'Transform Figma UI designs into live responsive web application code.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain Figma Dev Mode, exporting vector SVGs, inspecting spacing tokens, and translating designs to HTML/CSS/Tailwind.',
          demonstrate: 'Inspect a Figma hero card design and code the exact matching HTML/CSS layout in VS Code.',
          practice: 'Code a styled button matching Figma specifications precisely.',
          realWorldExample: 'Designer-to-Developer handoff in professional tech companies.',
          practicalTask: 'Implement a coded web component matching your Figma UI design pixel-perfect.',
          expectedOutput: 'Live web page component matching Figma design.'
        }
      }
    ]
  },
  {
    id: 'pg2-mod-4',
    number: 4,
    title: 'International Freelancing & Agency Operations',
    purpose: 'Master setting up a digital agency, acquiring international B2B clients, retainer contracts, team scaling, pricing strategies, and global agency monetization.',
    icon: 'fas fa-chart-line',
    color: '#8B5CF6',
    realProject: {
      title: 'Global Digital Agency Launch & Client Acquisition System',
      description: 'Students build a complete digital agency brand, service catalog, cold outreach pipeline, retainer agreement, and client onboarding system.'
    },
    classes: [
      {
        id: 'pg2-cls-16',
        classNum: 16,
        topic: 'Digital Agency Niche Selection & Service Packaging',
        simpleConcept: 'Positioning an agency for a high-value niche (e.g., E-Commerce Video Reels / Real Estate Web Dev), defining core service offers, and pricing.',
        objective: 'Define high-ticket agency service packages and niche positioning.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain generalist vs specialist agency rates, productized service packaging, and high-ticket pricing models.',
          demonstrate: 'Define a specialized agency offering: "Monthly Video Reel Production for Dental Clinics" priced at $2,000/month.',
          practice: 'Draft a niche agency service offer with defined deliverables and target market.',
          realWorldExample: 'Scaling digital service agencies to 6-figure recurring revenues.',
          practicalTask: 'Create an Agency Niche Specification & Service Offer catalog sheet.',
          expectedOutput: 'Defined Digital Agency Service Catalog.'
        }
      },
      {
        id: 'pg2-cls-17',
        classNum: 17,
        topic: 'International B2B Cold Outreach & Lead Generation (LinkedIn / Email)',
        simpleConcept: 'Building target lead lists (Apollo.io/LinkedIn Sales Navigator), writing personalized cold emails, and booking sales calls.',
        objective: 'Build B2B lead generation pipelines and execute cold outreach campaigns.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain cold email deliverability (SPF/DKIM/DMARC), email personalization, 3-step follow-up sequences, and booking discovery calls.',
          demonstrate: 'Build a 3-step personalized B2B cold email outreach sequence offering a free website audit to potential clients.',
          practice: 'Write a cold email message targeting business owners with a custom value hook.',
          realWorldExample: 'Acquiring US/UK/European clients for remote digital agencies.',
          practicalTask: 'Write a 3-step B2B cold outreach campaign sequence.',
          expectedOutput: 'B2B Cold Outreach Campaign Sequence document.'
        }
      },
      {
        id: 'pg2-cls-18',
        classNum: 18,
        topic: 'Discovery Calls, Sales Presentations & Closing Contracts',
        simpleConcept: 'Conducting Zoom discovery calls, uncovering client business problems, presenting high-value proposals, and handling objections.',
        objective: 'Execute strategic sales discovery calls and close high-ticket service contracts.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain SPIN selling (Situation, Problem, Implication, Need-payoff), presenting proposals live on call, and closing techniques.',
          demonstrate: 'Roleplay a 10-minute client discovery call: ask probing business questions, present solution, and handle price objections.',
          practice: 'Practice handling common client objections ("Your price is too high", "Send me an email").',
          realWorldExample: 'Closing $5,000+ agency service contracts on video calls.',
          practicalTask: 'Conduct a mock client discovery call and draft a custom master service proposal.',
          expectedOutput: 'Completed Master Service Proposal document.'
        }
      },
      {
        id: 'pg2-cls-19',
        classNum: 19,
        topic: 'Retainer Agreements, Master Contracts & Legal Compliance',
        simpleConcept: 'Structuring monthly recurring retainer contracts, Master Services Agreements (MSA), Statements of Work (SOW), and NDA agreements.',
        objective: 'Draft legally compliant agency contracts and recurring retainer agreements.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain monthly retainers vs one-off projects, IP ownership transfer upon payment, termination clauses, and late payment penalties.',
          demonstrate: 'Review a standard Agency Statement of Work (SOW) agreement specifying scope, timeline, monthly retainer fee, and terms.',
          practice: 'Draft a 1-page SOW contract for a web maintenance retainer service.',
          realWorldExample: 'Protecting agency businesses legally and securing predictable monthly recurring revenue.',
          practicalTask: 'Draft a complete Master Service Agreement (MSA) and SOW contract template.',
          expectedOutput: 'Legal Agency Service Contract Template.'
        }
      },
      {
        id: 'pg2-cls-20',
        classNum: 20,
        topic: 'Agency Client Onboarding, SOPs & Team Scaling',
        simpleConcept: 'Building Standard Operating Procedures (SOPs), client onboarding questionnaires, hiring freelancers, and delegating work.',
        objective: 'Systematize agency operations and client onboarding workflows.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain SOP creation (Loom video + step-by-step checklist), client kickoff onboarding forms, project management boards, and profit margins.',
          demonstrate: 'Build a Notion/Trello Client Onboarding portal with welcome checklist, asset submission link, and project timeline.',
          practice: 'Write an SOP checklist for delivering a weekly social media graphic bundle.',
          realWorldExample: 'Building automated agency operations that run smoothly without owner bottleneck.',
          practicalTask: 'Create an automated Client Onboarding portal and team SOP checklist.',
          expectedOutput: 'Complete Agency Client Onboarding & SOP system.'
        }
      }
    ]
  },
  {
    id: 'pg2-mod-5',
    number: 5,
    title: 'Master Capstone Project & Executive Industry Portfolio',
    purpose: 'Construct an executive-level master portfolio, deliver the Postgraduate Master Capstone Project defense, and receive Master Certification in Digital Skills & IT Leadership.',
    icon: 'fas fa-graduation-cap',
    color: '#EC4899',
    realProject: {
      title: 'Postgraduate Master Capstone Defense & Executive Industry Portfolio',
      description: 'Students defend their Master Capstone Project featuring an AI Agent System, Figma UI Design, Agency System, and Web Platform.'
    },
    classes: [
      {
        id: 'pg2-cls-21',
        classNum: 21,
        topic: 'Executive Master Portfolio Curation & Personal Branding',
        simpleConcept: 'Curating an elite executive digital portfolio website showcasing AI systems, agency case studies, UI prototypes, and enterprise metrics.',
        objective: 'Build an elite executive digital portfolio showcasing master-level projects.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain executive personal branding, presenting multi-disciplinary mastery (AI + UX + Agency + Dev), and high-level case study design.',
          demonstrate: 'Review an executive IT leader portfolio, dissecting case study narrative structure and visual presentation.',
          practice: 'Draft executive summary for your master portfolio website.',
          realWorldExample: 'Positioning for executive roles (CTO, Product Director, Agency Founder).',
          practicalTask: 'Assemble an executive master portfolio website showcasing all Postgraduate project deliverables.',
          expectedOutput: 'Published Master Executive Portfolio website.'
        }
      },
      {
        id: 'pg2-cls-22',
        classNum: 22,
        topic: 'Thought Leadership, Technical Publishing & Speaker Profile',
        simpleConcept: 'Writing technical industry articles on Medium/LinkedIn, publishing open-source projects, and establishing thought leadership.',
        objective: 'Establish digital industry thought leadership through technical publishing.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain content marketing for executives, writing technical breakdown articles, GitHub repository documentation, and industry authority.',
          demonstrate: 'Draft a technical case study breakdown article: "How I Built an Autonomous AI Agent Team for B2B Market Research".',
          practice: 'Write an outline for a technical industry article based on your capstone project.',
          realWorldExample: 'Attracting high-value advisory roles, consulting clients, and executive opportunities.',
          practicalTask: 'Write and publish a technical industry case study article on LinkedIn/Medium.',
          expectedOutput: 'Published technical industry article.'
        }
      },
      {
        id: 'pg2-cls-23',
        classNum: 23,
        topic: 'Executive Career Positioning & C-Suite Interview Strategy',
        simpleConcept: 'Navigating executive recruiter networks, negotiating high-ticket consulting retainers/salaries, and executive interview mastery.',
        objective: 'Prepare for C-suite executive interviews and strategic consulting proposals.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain executive search firm engagement, equity vs salary negotiation, advisory board roles, and strategic vision presentation.',
          demonstrate: 'Conduct a mock executive interview answering strategic questions on AI implementation and team management.',
          practice: 'Practice delivering a 3-minute executive vision pitch for a digital transformation project.',
          realWorldExample: 'Securing senior technology leadership roles and high-value consulting contracts.',
          practicalTask: 'Draft a comprehensive Executive Career Positioning Document & 3-year vision statement.',
          expectedOutput: 'Executive Career Positioning Document.'
        }
      },
      {
        id: 'pg2-cls-24',
        classNum: 24,
        topic: 'Master Capstone Dry Run & Peer Review Evaluation',
        simpleConcept: 'Conducting a full rehearsal defense of the Master Capstone Project with peer feedback, slide refinements, and live demo testing.',
        objective: 'Rehearse Master Capstone defense and incorporate peer evaluation feedback.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Explain presentation timing control, live software demo backup plans, crisp Q&A responses, and slide visual polish.',
          demonstrate: 'Conduct a sample 7-minute capstone rehearsal defense and provide structured constructive critique.',
          practice: 'Deliver a 5-minute draft presentation of your Master Capstone Project to peer group.',
          realWorldExample: 'Academic thesis defense and corporate board meeting dry runs.',
          practicalTask: 'Execute full rehearsal defense of your Master Capstone Project and refine based on feedback.',
          expectedOutput: 'Refined Master Capstone Presentation & Demo.'
        }
      },
      {
        id: 'pg2-cls-25',
        classNum: 25,
        topic: 'Postgraduate Master Capstone Defense & Certification',
        simpleConcept: 'Delivering the official Postgraduate Master Capstone Project defense to evaluation board and receiving Master Certification.',
        objective: 'Successfully defend Master Capstone Project and graduate with Master Certification.',
        teacherGuide: {
          theoryDuration: '15 min',
          practicalDuration: '40 min',
          explain: 'Moderate final Postgraduate Master Capstone Defense evaluations, score against master rubric, and present graduation certificates.',
          demonstrate: 'Evaluate student live demonstrations of AI systems, UI designs, and web platforms.',
          practice: 'Deliver final 10-minute Master Capstone Project defense with live software demonstration.',
          realWorldExample: 'Master Degree Defense and professional industry certification.',
          practicalTask: 'Deliver final 10-minute Postgraduate Master Capstone Defense.',
          expectedOutput: 'Successful Master Capstone Defense and Graduation Certification.'
        }
      }
    ]
  }
];

export const PG_2_SPECIALIZATION_OPTIONS = [
  {
    id: 'track-leadership',
    title: 'Executive IT Leadership & Product Management',
    icon: 'fas fa-user-tie',
    description: 'Master Agile/Scrum sprint planning, technical spec documentation, RICE feature prioritization, IT risk management, and executive pitching.',
    keySkills: ['Agile & Scrum Sprints', 'JIRA & Spec Writing', 'RICE Feature Prioritization', 'Executive Leadership Pitching'],
    portfolioDeliverable: 'An enterprise product roadmap, backlog specification, and executive pitch deck.'
  },
  {
    id: 'track-ai-agents',
    title: 'Advanced AI Agents & Multi-Agent Automation',
    icon: 'fas fa-robot',
    description: 'Master autonomous AI agent loops, LLM APIs (OpenAI/Claude), vector embeddings, semantic search, and CrewAI multi-agent teams.',
    keySkills: ['Autonomous Agent Loops', 'OpenAI & Claude APIs', 'Vector Embeddings & Semantic Search', 'CrewAI Multi-Agent Teams'],
    portfolioDeliverable: 'A working autonomous multi-agent AI system and API code implementation.'
  },
  {
    id: 'track-agency',
    title: 'Digital Product UI/UX & Agency Operations',
    icon: 'fas fa-chart-line',
    description: 'Master Figma Auto Layout UI design, interactive prototyping, B2B cold outreach pipelines, agency retainer contracts, and team SOPs.',
    keySkills: ['Figma UI/UX & Prototyping', 'B2B Lead Gen Outreach', 'Retainer Contracts & SOW', 'Agency Operations & SOPs'],
    portfolioDeliverable: 'A clickable Figma UI prototype, client acquisition pipeline, and agency launch system.'
  }
];

export const calculatePg2Metrics = (savedProgress) => {
  let totalClasses = 0;
  let completedClasses = 0;
  let inProgressClasses = 0;

  const moduleMetrics = PG_2_MODULES.map((mod) => {
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
