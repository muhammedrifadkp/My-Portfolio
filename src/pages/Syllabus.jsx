import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { batchesData } from '../data/syllabusData';
import './Syllabus.css';

const Syllabus = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="syllabus-page" ref={containerRef}>
      <div className="syllabus-wrapper">
        <div className="syllabus-header" ref={headerRef}>
          <span className="section-badge">Learning Roadmap</span>
          <h1 className="syllabus-title">Digital Skills Syllabus</h1>
          <p className="syllabus-subtitle">Practical Skill Development Programme for Students</p>
        </div>

        <div className="syllabus-grid" ref={gridRef}>
          {batchesData.map((batch) => (
            <div className="batch-card" key={batch.id}>
              <div className="batch-card-header">
                <span className="batch-level-tag">{batch.level}</span>
                <div className="batch-icon-wrapper">
                  <i className="fas fa-graduation-cap"></i>
                </div>
              </div>

              <div className="batch-card-body">
                <h2 className="batch-name">{batch.name}</h2>
                <p className="batch-description">{batch.description}</p>
              </div>

              <div className="batch-card-footer">
                <Link to={`/syllabus/${encodeURIComponent(batch.slug)}`} className="view-syllabus-btn">
                  <span>View Syllabus</span>
                  <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Syllabus;
