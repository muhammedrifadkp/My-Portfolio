import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const bioRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const bioTextRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Apple-Style Smooth Fade & Scale Up
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

      // 2. Profile Photo Apple 3D Tilt & Reveal on Scroll
      gsap.fromTo(
        imageWrapperRef.current,
        { opacity: 0, y: 60, rotateY: -12, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 3. Bio Text Paragraphs Staggered Slide In
      gsap.fromTo(
        bioTextRef.current.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 4. Tabs Container Reveal
      gsap.fromTo(
        tabsRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate skill bars when tab changes to 'skills'
  useEffect(() => {
    if (activeTab === 'skills') {
      const bars = containerRef.current.querySelectorAll('.skill-progress');
      gsap.fromTo(
        bars,
        { width: '0%' },
        {
          width: (i, target) => target.dataset.level + '%',
          duration: 1.2,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    }
  }, [activeTab]);

  const skills = [
    { name: 'React.js', level: 95, category: 'Frontend' },
    { name: 'Next.js (App Router)', level: 90, category: 'Full Stack' },
    { name: 'JavaScript (ES6+)', level: 92, category: 'Language' },
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'Express.js', level: 86, category: 'Backend' },
    { name: 'MongoDB & Mongoose', level: 85, category: 'Database' },
    { name: 'Tailwind CSS', level: 90, category: 'Styling' },
    { name: 'HTML5 & CSS3', level: 95, category: 'Frontend' },
    { name: 'RESTful APIs', level: 92, category: 'Architecture' },
    { name: 'Git & GitHub', level: 88, category: 'Tools' },
    { name: 'Vercel Deployment', level: 90, category: 'DevOps' },
    { name: 'Responsive Web Design', level: 95, category: 'UI/UX' },
  ];

  const experiences = [
    {
      title: 'Full-Stack Web Developer',
      company: 'Zuditt AI',
      period: '6 Months',
      location: 'Remote / Hybrid',
      description: 'Engineered responsive AI-driven web application interfaces and backend REST API integrations with database schemas.',
      achievements: [
        'Developed dynamic frontend dashboards using React.js and Next.js',
        'Integrated backend AI microservices with secure REST API endpoints',
        'Optimized component rendering performance and app loading speeds'
      ]
    },
    {
      title: 'Freelance Full-Stack Developer',
      company: 'Client Projects (UAE & India)',
      period: '2023 - Present',
      location: 'Dubai, Abu Dhabi & India',
      description: 'Delivered 10+ live production web applications for clients across e-commerce, real estate, and business services.',
      achievements: [
        'Built AG Star Automobiles — e-commerce site featuring custom "Bike Finder" compatibility search',
        'Engineered ZHM Real Estate LLC portal for Dubai & Abu Dhabi luxury property showcases',
        'Developed Ad Firms UAE consultancy platform with dynamic pricing and WhatsApp lead funnels',
        'Created CDC Attendance Management System with JWT authentication and MongoDB'
      ]
    },
    {
      title: 'Full Stack Instructor & Mentor',
      company: 'CADD Centre',
      period: '1 Year',
      location: 'Kasaragod, Kerala',
      description: 'Instructed student cohorts and junior developers in full-stack web development and modern JS frameworks.',
      achievements: [
        'Taught HTML5, CSS3, JavaScript, React.js, Node.js, and MongoDB hands-on curriculum',
        'Mentored students through capstone web application build projects',
        'Guided best practices in version control (Git/GitHub) and responsive UI design'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'The Yenepoya Institute / University',
      location: 'Mangaluru, Karnataka',
      year: '2021 - 2024',
      description: 'Graduated with strong foundations in Computer Science, Data Structures, Web Technologies, and Software Engineering.'
    },
    {
      degree: 'Higher Secondary (Computer Science)',
      institution: 'Emjay Vocational Higher Secondary School',
      location: 'Calicut, Kerala',
      year: '2019 - 2021',
      description: 'Specialized in Computer Science curriculum focusing on C++ programming and database management basics.'
    },
    {
      degree: 'High School Education (SSLC)',
      institution: 'SS HSS Moorkanad',
      location: 'Calicut, Kerala',
      year: '2018 - 2019',
      description: 'Completed secondary schooling with distinction in science and mathematics.'
    }
  ];

  const certifications = [
    {
      name: 'Full-Stack Web Development Certification',
      issuer: 'CADD Centre',
      year: '2024',
      icon: 'fas fa-certificate'
    },
    {
      name: 'React.js & Next.js Production Engineering',
      issuer: 'Self-Driven / Production Apps',
      year: '2023',
      icon: 'fab fa-react'
    },
    {
      name: 'MERN Stack & Node.js Masterclass',
      issuer: 'Full Stack Mentorship',
      year: '2023',
      icon: 'fab fa-node-js'
    }
  ];

  return (
    <section className="about-container" ref={containerRef}>
      {/* Ambient background glow orbs */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      <div className="bg-grid-pattern"></div>

      <div className="about-wrapper">
        <div className="about-header" ref={headerRef}>
          <span className="section-badge">👤 Get To Know Me</span>
          <h1 className="about-title">About Muhammed Rifad KP</h1>
          <p className="about-subtitle">
            Full Stack Developer specializing in MERN Stack & Next.js. Building scalable, high-performance production web applications.
          </p>
        </div>

        <div className="about-content">
          <div className="about-bio" ref={bioRef}>
            <div className="bio-image-wrapper" ref={imageWrapperRef}>
              <div className="bio-image">
                <img src="/profile.png" alt="Muhammed Rifad KP" className="profile-img" />
                <div className="image-border-glow"></div>
              </div>
              <div className="profile-badge">
                <span className="pulse-dot"></span>
                <span>Available for Clients</span>
              </div>
            </div>

            <div className="bio-text" ref={bioTextRef}>
              <span className="bio-tag">Engineering Profile</span>
              <h2>Muhammed Rifad KP</h2>
              <h3>Full Stack & MERN Developer | React.js & Next.js Engineer</h3>
              <p>
                I am a passionate <strong>Full Stack Engineer</strong> with experience crafting 
                <strong> 10+ live production web applications</strong> across e-commerce, real estate, and healthcare domains 
                in international markets like the UAE (Dubai, Abu Dhabi) and India.
              </p>
              <p>
                My expertise spans the entire development lifecycle — from architecting responsive 
                <strong> React.js & Next.js</strong> frontends to building robust <strong>Node.js & Express</strong> RESTful APIs 
                and optimizing <strong>MongoDB</strong> database models.
              </p>
              <p>
                Having served as a <strong>Full Stack Instructor at CADD Centre</strong> and a <strong>Full-Stack Engineer at Zuditt AI</strong>, 
                I bring technical clarity, clean code standards, and rapid project delivery to every build.
              </p>

              <div className="bio-details">
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-envelope"></i></div>
                  <div>
                    <span className="detail-label">Email</span>
                    <span className="detail-value">muhammedrifadkp3@gmail.com</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div>
                    <span className="detail-label">Location</span>
                    <span className="detail-value">Calicut, Kerala, India</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-briefcase"></i></div>
                  <div>
                    <span className="detail-label">Experience</span>
                    <span className="detail-value">10+ Deployed Apps (2+ Yrs)</span>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon"><i className="fas fa-graduation-cap"></i></div>
                  <div>
                    <span className="detail-label">Education</span>
                    <span className="detail-value">BCA (Yenepoya University)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-tabs" ref={tabsRef}>
            <div className="tab-buttons">
              <button
                className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <i className="fas fa-code"></i> <span>Technical Skills</span>
              </button>
              <button
                className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                <i className="fas fa-briefcase"></i> <span>Experience</span>
              </button>
              <button
                className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <i className="fas fa-graduation-cap"></i> <span>Education</span>
              </button>
              <button
                className={`tab-button ${activeTab === 'certifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('certifications')}
              >
                <i className="fas fa-certificate"></i> <span>Certifications</span>
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'skills' && (
                <div className="skills-content">
                  <div className="skills-grid">
                    {skills.map((skill, index) => (
                      <div className="skill-item" key={index}>
                        <div className="skill-info">
                          <span className="skill-name">{skill.name}</span>
                          <span className="skill-percentage">{skill.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div
                            className="skill-progress"
                            data-level={skill.level}
                            style={{ width: '0%' }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="experience-content">
                  <div className="timeline">
                    {experiences.map((exp, index) => (
                      <div className="timeline-item" key={index}>
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                          <div className="timeline-header">
                            <h3>{exp.title}</h3>
                            <span className="period">{exp.period}</span>
                          </div>
                          <div className="timeline-info">
                            <span className="company"><i className="fas fa-building"></i> {exp.company}</span>
                            <span className="location"><i className="fas fa-map-marker-alt"></i> {exp.location}</span>
                          </div>
                          <p className="exp-desc">{exp.description}</p>
                          <ul className="achievements">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="education-content">
                  <div className="education-grid">
                    {education.map((edu, index) => (
                      <div className="education-item" key={index}>
                        <div className="education-icon">
                          <i className="fas fa-graduation-cap"></i>
                        </div>
                        <div className="education-details">
                          <h3>{edu.degree}</h3>
                          <div className="education-info">
                            <span className="institution">{edu.institution}</span>
                            <span className="year">{edu.year}</span>
                          </div>
                          <p>{edu.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'certifications' && (
                <div className="certifications-content">
                  <div className="certifications-grid">
                    {certifications.map((cert, index) => (
                      <div className="certification-item" key={index}>
                        <div className="certification-icon">
                          <i className={cert.icon}></i>
                        </div>
                        <div className="certification-details">
                          <h3>{cert.name}</h3>
                          <div className="certification-info">
                            <span className="issuer">{cert.issuer}</span>
                            <span className="year">{cert.year}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
