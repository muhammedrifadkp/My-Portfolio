import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const gridRef = useRef(null);
  const footerRef = useRef(null);

  const projects = [
    {
      id: 15,
      title: 'Ztoiq — Modern E-Commerce Platform',
      category: 'client',
      type: 'Full Stack & E-Commerce',
      featured: true,
      image: '/screenshots/ztoiq.png',
      description: 'Full-featured e-commerce web application featuring dynamic product catalog browsing, custom category filters, shopping cart workflows, and secure online checkout.',
      technologies: ['TypeScript', 'Next.js', 'React', 'E-Commerce', 'Tailwind CSS', 'Node.js'],
      demoLink: 'https://ztoiq.com/',
      codeLink: 'https://github.com/muhammedrifadkp/ztoiq',
      highlights: ['Dynamic product catalog & category filters', 'Shopping cart persistence & checkout workflow', 'Next.js server-side rendering & SEO optimization']
    },
    {
      id: 1,
      title: 'AG Star Automobiles — E-Commerce',
      category: 'client',
      type: 'Full Stack & E-Commerce',
      featured: true,
      image: '/screenshots/agstarautomobiles.png',
      description: 'Full-featured motorcycle accessories platform with dynamic "Bike Finder" compatibility search, custom filtering, and shopping cart integration.',
      technologies: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Vercel'],
      demoLink: 'https://agstarautomobiles.vercel.app',
      codeLink: 'https://github.com/muhammedrifadkp/agstarautomobiles',
      highlights: ['Dynamic Bike Finder compatibility search algorithm', 'Responsive shopping cart & checkout flow', 'Optimized SEO and fast server rendering']
    },
    {
      id: 2,
      title: 'ZHM Real Estate LLC — Dubai & Abu Dhabi',
      category: 'client',
      type: 'Real Estate Portal',
      featured: true,
      image: '/screenshots/zhmrealestatellc.png',
      description: 'Multi-region luxury real estate showcase for Dubai & Abu Dhabi markets empowering UAE nationals with dynamic property search and lead capture.',
      technologies: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'SEO'],
      demoLink: 'https://zhmrealestatellc.ae',
      codeLink: 'https://github.com/muhammedrifadkp/zhmrealestatellc',
      highlights: ['Multi-region property listing engine', 'High-converting client lead generation forms', 'Mobile-first responsive UX architecture']
    },
    {
      id: 3,
      title: 'Ad Firms — UAE Business Setup',
      category: 'client',
      type: 'Consultancy & Lead-Gen',
      featured: true,
      image: '/screenshots/adfirms.png',
      description: 'High-converting Dubai business setup platform featuring dynamic Mainland & Freezone pricing packages, WhatsApp integration, and lead funnels.',
      technologies: ['TypeScript', 'Next.js', 'WhatsApp API', 'Tailwind CSS', 'React'],
      demoLink: 'https://businesssetup.ad-firms.com',
      codeLink: 'https://github.com/muhammedrifadkp/adfirms',
      highlights: ['Mainland & Freezone package calculator', 'Instant WhatsApp business consultation', 'High-converting lead funnel']
    },
    {
      id: 4,
      title: 'Daily Horeca — Hospitality Supplies',
      category: 'client',
      type: 'E-Commerce & Supply',
      featured: true,
      image: '/screenshots/dailyhoreca.png',
      description: 'Service-oriented platform for Hotels, Restaurants, Cafes, and Caterers to manage daily operational supplies and bulk ingredient orders.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'Vercel'],
      demoLink: 'https://www.dailyhoreca.com',
      codeLink: 'https://github.com/muhammedrifadkp/Daily-Horeca',
      highlights: ['B2B order request system for HoReCa clients', 'Product catalog categorization', 'Fast responsive layout']
    },
    {
      id: 5,
      title: 'One Pack Online — Packaging Solutions',
      category: 'client',
      type: 'Industrial E-Commerce',
      featured: true,
      image: '/screenshots/onepackonline.png',
      description: 'Industrial & commercial packaging supply e-commerce platform with product catalogs, bulk pricing quotes, and responsive navigation.',
      technologies: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'REST API'],
      demoLink: 'https://www.onepackonline.com/',
      codeLink: 'https://github.com/muhammedrifadkp/one-pack',
      highlights: ['Bulk packaging item categorization', 'Quote request & contact integration', 'Performance-optimized bundle']
    },
    {
      id: 6,
      title: 'CDC Attendance Management System',
      category: 'fullstack',
      type: 'Enterprise MERN Web App',
      featured: true,
      image: '/screenshots/cdc-attendance.png',
      description: 'Enterprise digital attendance management system for educational institutes featuring secure role-based auth, REST APIs, and structured MongoDB database.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT Auth', 'Tailwind CSS'],
      demoLink: 'https://cdc-attendance-com.vercel.app',
      codeLink: 'https://github.com/muhammedrifadkp/CDC_Attendance',
      highlights: ['Role-based access control (Admin, Faculty, Student)', 'Real-time lab attendance analytics & tracking', 'Secure JWT authentication & bcrypt']
    },
    {
      id: 7,
      title: 'Rasdent — Dental & Healthcare Platform',
      category: 'client',
      type: 'Healthcare Web App',
      featured: false,
      image: '/screenshots/rasdent.png',
      description: 'Modern dental clinic platform featuring patient appointment scheduling, service showcases, and clinic care consultation.',
      technologies: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'REST APIs'],
      demoLink: 'https://rasdent.in',
      codeLink: 'https://github.com/muhammedrifadkp/rasdent',
      highlights: ['Online patient appointment booking', 'Dental treatment catalog & pricing', 'Responsive mobile UX']
    },
    {
      id: 8,
      title: 'B4-Baking — Ingredient Supply Platform',
      category: 'client',
      type: 'Food Service B2B',
      featured: false,
      image: '/screenshots/b4baking.png',
      description: 'Bulk pre-baking & food service ingredient supply platform supporting bakeries, confectioneries, and commercial kitchens.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
      demoLink: 'https://www.b4baking.com',
      codeLink: 'https://github.com/muhammedrifadkp/B4-Baking',
      highlights: ['Bulk pre-baking product showcase', 'Ingredient supply inquiry forms', 'Clean visual hierarchy']
    },
    {
      id: 9,
      title: 'Chillera — HVAC & Cooling Services',
      category: 'client',
      type: 'Service Showcase',
      featured: false,
      image: '/screenshots/chillera.png',
      description: 'Commercial air conditioning and refrigeration service platform offering service bookings, maintenance plans, and client support.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Vercel'],
      demoLink: 'https://www.chillera.co.in',
      codeLink: 'https://github.com/muhammedrifadkp/Chillera',
      highlights: ['HVAC service scheduling forms', 'Interactive service package comparison', 'Fast loading static site']
    },
    {
      id: 10,
      title: 'Zuditt AI Innovation LLP',
      category: 'fullstack',
      type: 'AI Web Platform',
      featured: false,
      image: '/screenshots/zuditt.png',
      description: 'AI-driven business solutions platform offering web development, digital marketing, BPO services, and innovative technology integrations.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'AI Integration'],
      demoLink: 'https://www.zuditt.com/',
      codeLink: 'https://github.com/muhammedrifadkp/zuditt-next',
      highlights: ['AI microservices integration', 'Interactive service showcase cards', 'Fast server-side rendering']
    },
    {
      id: 11,
      title: 'FreshMarket E-Commerce Platform',
      category: 'fullstack',
      type: 'MERN E-Commerce',
      featured: false,
      image: '/screenshots/my-ecommerce.png',
      description: 'Modern e-commerce platform with product categories, shopping cart, user accounts, admin panel, and WhatsApp checkout integration.',
      technologies: ['Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'WhatsApp API'],
      demoLink: 'https://my-ecommerce-black.vercel.app/',
      codeLink: 'https://github.com/muhammedrifadkp/my-ecommerce',
      highlights: ['Full MERN database cart persistence', 'One-click WhatsApp order dispatch', 'Admin management portal']
    },
    {
      id: 12,
      title: '3D Interactive Workstation Portfolio',
      category: 'frontend',
      type: '3D WebGL Portfolio',
      featured: true,
      image: '/screenshots/portfolio-3d.png',
      description: 'Interactive 3D workstation portfolio showcasing projects and skills with Three.js WebGL models, smooth camera orbits, and GSAP animations.',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'GSAP', 'Tailwind CSS', 'Vite'],
      demoLink: 'https://muhammedrifad.vercel.app/',
      codeLink: 'https://github.com/muhammedrifadkp/My-Portfolio',
      highlights: ['Custom 3D GLTF PC setup with neon branding', 'Interactive monitor screen texture rendering', 'Apple-style GSAP scroll triggers']
    },
    {
      id: 13,
      title: 'Nasiha Digital Platform',
      category: 'frontend',
      type: 'Web Application',
      featured: false,
      image: '/screenshots/nasiha.png',
      description: 'Digital platform built with JavaScript and modern responsive UI components.',
      technologies: ['JavaScript', 'React', 'Tailwind CSS', 'Vercel'],
      demoLink: 'https://nasiha-arc.vercel.app',
      codeLink: 'https://github.com/muhammedrifadkp/nasiha',
      highlights: ['Responsive interface design', 'Interactive component states', 'Deploys automatically on Vercel']
    },
    {
      id: 14,
      title: 'Rainforest Platformer Game',
      category: 'frontend',
      type: '2D HTML5 Canvas Game',
      featured: false,
      image: '/screenshots/rain-forest.png',
      description: 'Interactive 2D platformer game built with HTML5 Canvas and JavaScript, featuring rainforest mechanics and smooth physics.',
      technologies: ['HTML5 Canvas', 'JavaScript', 'CSS3', 'Game Physics'],
      demoLink: 'https://rain-forest.vercel.app',
      codeLink: 'https://github.com/muhammedrifadkp/rain-forest-game',
      highlights: ['HTML5 Canvas game loop', 'Custom collision detection', 'Responsive keyboard controls']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects (15)' },
    { id: 'client', name: 'Client Apps (UAE & India)' },
    { id: 'fullstack', name: 'Full Stack & MERN' },
    { id: 'frontend', name: 'Frontend & 3D' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );

      // 2. Filter Buttons Reveal
      gsap.fromTo(
        filterRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: filterRef.current,
            start: 'top 85%',
          },
        }
      );

      // 3. Footer Reveal
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate grid cards when filter changes
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.project-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power3.out',
        }
      );
    }
  }, [activeFilter]);

  return (
    <section className="projects-page" ref={containerRef}>
      {/* Ambient background glow orbs */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      <div className="bg-grid-pattern"></div>

      <div className="projects-wrapper">
        <div className="projects-header" ref={headerRef}>
          <span className="section-badge">💻 GitHub & Live Production Portfolio</span>
          <h1 className="projects-title">Featured Engineering Work</h1>
          <p className="projects-subtitle">
            Explore 15 live production web platforms, client applications, and full-stack solutions built for businesses across the UAE & India.
          </p>
        </div>

        <div className="projects-filter" ref={filterRef}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-button ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="projects-grid" ref={gridRef}>
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <button 
                    className="view-details-btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    <i className="fas fa-eye"></i> Quick Overview
                  </button>
                </div>
                {project.featured && <span className="featured-badge">Live Production App</span>}
              </div>

              <div className="project-content">
                <span className="project-category-tag">{project.type}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span className="tech-tag" key={index}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-tag more">+{project.technologies.length - 4}</span>
                  )}
                </div>

                <div className="project-links">
                  {project.demoLink && project.demoLink !== '#' && (
                    <a
                      href={project.demoLink}
                      className="project-link primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Live Demo</span> <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      className="project-link secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"></i> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Overview Modal */}
        {selectedProject && (
          <div className="project-modal">
            <div className="modal-overlay" onClick={() => setSelectedProject(null)}></div>
            <div className="modal-content">
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                <i className="fas fa-times"></i>
              </button>

              <div className="modal-header">
                <h2>{selectedProject.title}</h2>
                <span className="modal-category">{selectedProject.type}</span>
              </div>

              <div className="modal-body">
                <div className="modal-image">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>

                <p className="modal-description">{selectedProject.description}</p>

                {selectedProject.highlights && (
                  <div className="modal-features">
                    <h3>Key Engineering Highlights</h3>
                    <ul>
                      {selectedProject.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="modal-technologies">
                  <h3>Tech Stack & Tools</h3>
                  <div className="tech-tags">
                    {selectedProject.technologies.map((t, i) => (
                      <span key={i} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-links">
                  {selectedProject.demoLink && selectedProject.demoLink !== '#' && (
                    <a href={selectedProject.demoLink} className="demo-link" target="_blank" rel="noopener noreferrer">
                      <span>Visit Live Application</span> <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                  <a href={selectedProject.codeLink} className="code-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i> View GitHub Repository
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="projects-footer" ref={footerRef}>
          <div className="footer-content">
            <h3>Have a Project in Mind?</h3>
            <p>I'm available for full-time roles, contract development, and custom web platform builds.</p>
            <div className="footer-actions">
              <a href="/contact" className="cta-button primary">
                Get In Touch <i className="fas fa-arrow-right"></i>
              </a>
              <a href="https://github.com/muhammedrifadkp" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                <i className="fab fa-github"></i> GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
