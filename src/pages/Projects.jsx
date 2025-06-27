import React, { useState, useEffect } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Project data for Muhammed Rifad KP
  const projects = [
    {
      id: 1,
      title: 'EcomNova – E-commerce Platform',
      category: 'fullstack',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center',
      description: 'A scalable e-commerce website with comprehensive user management, product catalog, shopping cart functionality, and order management system.',
      technologies: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Stripe API'],
      demoLink: 'https://ecomnova-demo.vercel.app',
      codeLink: 'https://github.com/muhammedrifadkp/ecomnova'
    },
    {
      id: 2,
      title: 'TravelX – Travel Website',
      category: 'frontend',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop&crop=center',
      description: 'A visually appealing one-page travel website showcasing destinations with smooth scrolling, modal interactions, and responsive design.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'AOS'],
      demoLink: 'https://travelx-showcase.netlify.app',
      codeLink: 'https://github.com/muhammedrifadkp/travelx'
    },
    {
      id: 3,
      title: '3D Portfolio Website',
      category: 'frontend',
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&h=400&fit=crop&crop=center',
      description: 'An interactive 3D portfolio website showcasing projects and skills with Three.js animations, smooth transitions, and modern design.',
      technologies: ['React', 'Three.js', 'React Three Fiber', 'Framer Motion', 'Tailwind CSS', 'Vite'],
      demoLink: 'https://rifad-portfolio.netlify.app',
      codeLink: 'https://github.com/muhammedrifadkp/3d-portfolio'
    }
  ];

  // Filter categories
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'fullstack', name: 'Full Stack' }
  ];

  // Initialize filtered projects
  useEffect(() => {
    setFilteredProjects(projects);
    setIsVisible(true);
  }, []);

  // Filter projects when activeFilter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === activeFilter);
      setFilteredProjects(filtered);
    }
  }, [activeFilter]);

  // Handle filter click
  const handleFilterClick = (category) => {
    setActiveFilter(category);
  };

  return (
    <section className="projects-page">
      <div className={`projects-container ${isVisible ? 'visible' : ''}`}>
        <div className="projects-header">
          <h1 className="projects-title">My Projects</h1>
          <div className="title-underline"></div>
          <p className="projects-subtitle">
            Welcome to my project showcase! Here you'll find a collection of my web development work,
            from responsive frontend designs to full-stack applications. Each project demonstrates my
            passion for clean code, modern technologies, and user-centered design.
          </p>
        </div>
        
        <div className="projects-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-button ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => handleFilterClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <span>View Details</span>
                </div>
              </div>
              <div className="project-content">
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
                  <a href={project.demoLink} className="project-link primary" target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                  <a href={project.codeLink} className="project-link secondary" target="_blank" rel="noopener noreferrer">
                    View Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="projects-footer">
          <div className="footer-content">
            <h3>Interested in working together?</h3>
            <p>I'm always open to discussing new opportunities and exciting projects.</p>
            <div className="footer-actions">
              <a href="/contact" className="cta-button primary">
                Get In Touch
              </a>
              <a href="https://github.com/muhammedrifadkp" target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
