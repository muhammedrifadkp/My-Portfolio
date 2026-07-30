import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import './NotFound.css';

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnsRef = useRef(null);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.7)' }
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        btnsRef.current.children,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="not-found-page" ref={containerRef}>
      {/* Ambient background glows */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      <div className="bg-grid-pattern"></div>

      <div className="not-found-wrapper">
        {/* Content Glass Card */}
        <div className="not-found-card">
          <div className="error-badge-glitch">
            <span className="dot-pink"></span> ERROR 404 — SPACE DRIFT
          </div>

          <h1 className="not-found-code" ref={titleRef}>
            404
          </h1>

          <div className="not-found-text" ref={descRef}>
            <h2>Coordinates Lost in Hyperspace</h2>
            <p>
              The path <code className="url-code">{location.pathname}</code> has drifted into black hole coordinates or does not exist.
            </p>
          </div>

          <div className="not-found-actions" ref={btnsRef}>
            <Link to="/" className="action-btn primary">
              <i className="fas fa-rocket"></i> Warp Back Home
            </Link>
            <Link to="/projects" className="action-btn secondary">
              <i className="fas fa-laptop-code"></i> Explore Projects
            </Link>
            <Link to="/contact" className="action-btn outline">
              <i className="fas fa-paper-plane"></i> Contact Rifad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
