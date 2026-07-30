import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillConstellation from '../components/SkillConstellation';
import InteractiveProjectShowcase from '../components/InteractiveProjectShowcase';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const [activeTab, setActiveTab] = useState('demo');
  const [activeDemo, setActiveDemo] = useState('constellation');

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const demosRef = useRef(null);
  const gridRef = useRef(null);

  const capabilities = [
    {
      icon: 'fas fa-robot',
      badge: 'AI Integration',
      title: 'Rifad AI Chat Assistant',
      description: 'Built-in intelligent AI assistant trained on Muhammed Rifad KP\'s technical resume, MERN projects, and architecture experience.',
      status: 'Live & Active'
    },
    {
      icon: 'fas fa-cubes',
      badge: '3D WebGL',
      title: 'Three.js 3D PC Workstation',
      description: 'Interactive 3D GLTF computer model with real-time dynamic canvas texture mapping on monitor screen and neon emissive case lighting.',
      status: 'Live & Active'
    },
    {
      icon: 'fas fa-globe',
      badge: 'Deployment',
      title: 'Multi-Region Edge Hosting',
      description: 'Fast Next.js server-side rendering deployed to global Vercel Edge networks serving international clients across UAE and India.',
      status: 'Production Ready'
    },
    {
      icon: 'fas fa-shield-alt',
      badge: 'Security',
      title: 'JWT Auth & Role Control',
      description: 'Secure enterprise authentication protocols featuring password hashing (bcrypt), JSON Web Tokens (JWT), and role-based access levels.',
      status: 'Production Ready'
    },
    {
      icon: 'fas fa-palette',
      badge: 'Design System',
      title: 'Adaptive Cyber Glass UI',
      description: 'Custom dark glassmorphic design system with HSL neon glows, high-contrast typography, and smooth GSAP scroll triggers.',
      status: 'Live & Active'
    },
    {
      icon: 'fas fa-tachometer-alt',
      badge: 'Performance',
      title: 'Vite & GSAP Animations',
      description: 'Ultra-fast bundle loading with Vite 7 build optimization and GPU-accelerated GSAP ScrollTrigger animations.',
      status: 'Live & Active'
    }
  ];

  // GSAP Animations
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

      // 2. Demos Section Reveal
      gsap.fromTo(
        demosRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: demosRef.current,
            start: 'top 85%',
          },
        }
      );

      // 3. Grid Cards Batch Reveal
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="features-page" ref={containerRef}>
      {/* Background glowing ambient orbs */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      <div className="bg-grid-pattern"></div>

      <div className="features-wrapper">
        {/* Header */}
        <div className="features-header" ref={headerRef}>
          <span className="section-badge">⚡ Advanced Portfolio Engineering</span>
          <h1 className="features-title">Technical Capabilities & Features</h1>
          <p className="features-subtitle">
            Experience cutting-edge web architecture including 3D WebGL graphics, AI assistance, and dark glassmorphic design systems.
          </p>
        </div>

        {/* Top Tab Switcher */}
        <div className="features-tabs-nav">
          <button
            className={`tab-nav-btn ${activeTab === 'demo' ? 'active' : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            <i className="fas fa-desktop"></i> Interactive Live Demos
          </button>
          <button
            className={`tab-nav-btn ${activeTab === 'capabilities' ? 'active' : ''}`}
            onClick={() => setActiveTab('capabilities')}
          >
            <i className="fas fa-layer-group"></i> All Core Capabilities
          </button>
        </div>

        {/* Live Interactive Demos Section */}
        {activeTab === 'demo' && (
          <div className="interactive-demos-section" ref={demosRef}>
            <div className="demo-selector-bar">
              <button
                className={`demo-btn ${activeDemo === 'constellation' ? 'active' : ''}`}
                onClick={() => setActiveDemo('constellation')}
              >
                <i className="fas fa-project-diagram"></i> 3D Skill Constellation
              </button>
              <button
                className={`demo-btn ${activeDemo === 'showcase' ? 'active' : ''}`}
                onClick={() => setActiveDemo('showcase')}
              >
                <i className="fas fa-cubes"></i> Interactive 3D Showcase
              </button>
            </div>

            <div className="demo-canvas-container">
              {activeDemo === 'constellation' && <SkillConstellation />}
              {activeDemo === 'showcase' && <InteractiveProjectShowcase />}
            </div>
          </div>
        )}

        {/* Capabilities Grid Section */}
        {activeTab === 'capabilities' && (
          <div className="capabilities-section">
            <div className="capabilities-grid" ref={gridRef}>
              {capabilities.map((item, index) => (
                <div className="capability-card" key={index}>
                  <div className="capability-card-glow"></div>
                  <div className="capability-top">
                    <div className="capability-icon">
                      <i className={item.icon}></i>
                    </div>
                    <span className="capability-badge">{item.badge}</span>
                  </div>
                  <h3 className="capability-title">{item.title}</h3>
                  <p className="capability-desc">{item.description}</p>
                  <div className="capability-footer">
                    <span className="status-chip">
                      <span className="pulse-dot"></span> {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Banner */}
        <div className="features-tech-banner">
          <div className="banner-content">
            <h3>Ready to Build Your Next Web Platform?</h3>
            <p>Combining modern React.js, Next.js App Router, Node.js, and Three.js 3D web graphics to deliver production-ready applications.</p>
            <a href="/contact" className="banner-cta-btn">
              <span>Contact Muhammed Rifad KP</span> <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
