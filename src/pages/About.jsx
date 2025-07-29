import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    { name: 'HTML5/CSS3', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'Bootstrap', level: 85 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'React.js', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'Vite', level: 80 },
    { name: 'jQuery', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Express.js', level: 75 },
    { name: 'Python', level: 75 },
    { name: 'MongoDB', level: 75 },
    { name: 'RESTful APIs', level: 80 },
    { name: 'Git/GitHub', level: 85 },
    { name: 'Responsive Design', level: 90 },
  ];

  const experiences = [
    {
      title: 'Frontend Developer (Freelance)',
      company: 'Self-initiated Projects',
      period: '2023 - Present',
      description: 'Developing responsive and interactive web applications using modern frontend technologies. Creating clean, user-friendly interfaces with a focus on performance and accessibility.',
      achievements: [
        'Developed a fully responsive travel-themed website using HTML, CSS, Bootstrap, JavaScript, and jQuery',
        'Ensured seamless UX across devices with interactive UI and dynamic elements',
        'Focused on accessibility, performance, and cross-browser compatibility'
      ]
    },
    {
      title: 'Full-Stack Developer',
      company: 'Personal Projects',
      period: '2022 - 2023',
      description: 'Built complete web applications from concept to deployment, handling both frontend and backend development.',
      achievements: [
        'Developed EcomNova, a scalable e-commerce platform with React, Vite, Node.js, and MongoDB',
        'Built reusable React components and integrated state management',
        'Used Vite for faster builds and optimized bundling'
      ]
    },
    {
      title: 'Web Designer',
      company: 'Freelance',
      period: '2021 - 2022',
      description: 'Created visually appealing and functional websites for small businesses and individuals.',
      achievements: [
        'Designed and deployed EtheReal, a static landing page for a mobile fuel delivery company',
        'Created TravelX, a visually appealing one-page travel website as a frontend showcase',
        'Implemented smooth scrolling, modal interactions, and responsive elements'
      ]
    }
  ];

  const education = [
    {
      degree: 'Full-Stack Development Certification',
      institution: 'Cadd Center, Kasaragod',
      year: '2023-2024',
      description: 'Comprehensive training in modern web development technologies and practices'
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'The Yenepoya Institute, Mangaluru',
      year: '2020-2023',
      description: 'Focused on computer science fundamentals and application development'
    },
    {
      degree: 'Higher Secondary (Computer Science)',
      institution: 'Emjay Vocational Higher Secondary School, Calicut',
      year: '2018-2020',
      description: 'Specialized in Computer Science with focus on programming and IT fundamentals'
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      year: '2022'
    },
    {
      name: 'MongoDB Certified Developer',
      issuer: 'MongoDB Inc.',
      year: '2021'
    },
    {
      name: 'React.js Advanced Concepts',
      issuer: 'Frontend Masters',
      year: '2020'
    },
    {
      name: 'Node.js Microservices Architecture',
      issuer: 'Udemy',
      year: '2021'
    }
  ];

  return (
    <section className={`about-container ${isVisible ? 'visible' : ''}`}>
      <div className="about-header">
        <h1 className="about-title">About Me</h1>
        <div className="about-subtitle">
          <p>Get to know more about my skills, experience, and background</p>
        </div>
      </div>

      <div className="about-content">
        <div className="about-bio">
          <div className="bio-image">
            <div className="image-placeholder">
              <span>Your Photo</span>
            </div>
          </div>
          <div className="bio-text">
            <h2>Muhammed Rifad KP</h2>
            <h3>Full-Stack Developer | React | Node.js | Python | Next.js | Vite</h3>
            <p>
              Self-taught and highly motivated Full-Stack Developer with strong foundational knowledge
              and practical experience in modern web technologies. Proficient in both frontend and
              backend development, with a passion for clean code, responsive design, and scalable applications.
            </p>
            <p>
              Comfortable with collaborative workflows and modern tools. Specialized in React.js,
              Next.js, Node.js, and Python, with hands-on experience in Vite and performance-optimized
              frontend frameworks.
            </p>
            <p>
              Fast learner with a self-driven approach to new tech stacks. Strong interest in building
              user-centric interfaces and efficient backend systems. Open-source contributor and
              project-oriented developer.
            </p>

            <div className="bio-details">
              <div className="detail-item">
                <span className="detail-label">
                  <i className="fas fa-envelope"></i> Email:
                </span>
                <span className="detail-value">muhammedrifadkp3@gmail.com</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">
                  <i className="fas fa-map-marker-alt"></i> Location:
                </span>
                <span className="detail-value">Calicut, Kerala, India</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">
                  <i className="fas fa-briefcase"></i> Experience:
                </span>
                <span className="detail-value">3+ Years</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">
                  <i className="fas fa-language"></i> Languages:
                </span>
                <span className="detail-value">English, Malayalam, Hindi, Tamil</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-tabs">
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <i className="fas fa-code"></i> Skills
            </button>
            <button
              className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              <i className="fas fa-briefcase"></i> Experience
            </button>
            <button
              className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <i className="fas fa-graduation-cap"></i> Education
            </button>
            <button
              className={`tab-button ${activeTab === 'certifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('certifications')}
            >
              <i className="fas fa-certificate"></i> Certifications
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
                          style={{ width: `${skill.level}%` }}
                          data-level={skill.level}
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
                        <h3>{exp.title}</h3>
                        <div className="timeline-info">
                          <span className="company">{exp.company}</span>
                          <span className="period">{exp.period}</span>
                        </div>
                        <p>{exp.description}</p>
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
                        <i className="fas fa-certificate"></i>
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
    </section>
  );
};

export default About;
