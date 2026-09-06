import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  PG_2_MODULES,
  PG_2_SPECIALIZATION_OPTIONS,
  calculatePg2Metrics
} from '../../data/pg2SyllabusData';
import './DegreeSyllabus.css';

const LOCAL_STORAGE_KEY = 'syllabus_pg2_progress';

const Pg2Syllabus = () => {
  // LocalStorage State for Progress Tracking
  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY);
      return item ? JSON.parse(item) : {};
    } catch (e) {
      console.error('Failed to parse PG 2nd Year syllabus progress from localStorage:', e);
      return {};
    }
  });

  // Filter & Search States
  const [activeClassDetail, setActiveClassDetail] = useState(null);

  // Sync to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedProgress));
    } catch (e) {
      console.error('Failed to save PG 2nd Year syllabus progress to localStorage:', e);
    }
  }, [savedProgress]);

  // Compute overall & module progress metrics dynamically
  const metrics = useMemo(() => {
    return calculatePg2Metrics(savedProgress);
  }, [savedProgress]);

  // Flatten all classes for linear navigation & today's/next class determination
  const allFlattenedClasses = useMemo(() => {
    const list = [];
    PG_2_MODULES.forEach((mod) => {
      mod.classes.forEach((cls) => {
        list.push({ ...cls, moduleTitle: mod.title, moduleId: mod.id });
      });
    });
    return list;
  }, []);

  // Determine Today's Class, Next Class, and Last Completed Class
  const statusSummary = useMemo(() => {
    let inProgressCls = null;
    let firstNotStarted = null;
    let lastCompleted = null;

    for (let i = 0; i < allFlattenedClasses.length; i++) {
      const cls = allFlattenedClasses[i];
      const status = savedProgress[cls.id]?.status || 'NOT STARTED';
      if (status === 'IN PROGRESS' && !inProgressCls) {
        inProgressCls = { cls, index: i };
      }
      if (status === 'NOT STARTED' && !firstNotStarted) {
        firstNotStarted = { cls, index: i };
      }
      if (status === 'COMPLETED') {
        lastCompleted = cls;
      }
    }

    const todayTarget = inProgressCls || firstNotStarted || { cls: allFlattenedClasses[0], index: 0 };
    const todayClass = todayTarget?.cls;
    const nextClassIndex = todayTarget ? todayTarget.index + 1 : 1;
    const nextClass = allFlattenedClasses[nextClassIndex] || null;
    const currentModule = todayClass ? todayClass.moduleTitle : 'AI Tools & Full-Stack Mastery';

    return {
      todayClass,
      nextClass,
      lastCompletedClass: lastCompleted,
      currentModule
    };
  }, [allFlattenedClasses, savedProgress]);

  // Status Change Handler
  const handleStatusChange = (classId, newStatus) => {
    setSavedProgress((prev) => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        status: newStatus
      }
    }));
  };



  return (
    <div className="degree-syllabus-container">
      {/* -------------------- SYLLABUS HEADER -------------------- */}
      <div className="syllabus-header-card">
        <h1 className="main-dashboard-title">PG 2nd Year Digital Skills Syllabus</h1>
        <p className="main-dashboard-subtitle">
          Postgraduate Digital Mastery, Custom AI Tool Building & Career Launch Program
        </p>
        <p className="main-dashboard-subtext">
          Mastery-level practical curriculum engineered directly from PG 2nd Year survey demands: Custom AI Tool Building & AI Agents (Islamic Studies & Research AI Tools), Full-Stack Web Development (React/JS/APIs), Cinema-Style AI Video Production & VFX, Strategic Digital Marketing & Meta Ads, and Global Freelancing (Upwork/Fiverr) & Career Launch.
        </p>

        <div className="header-metadata-chips">
          <span className="meta-chip"><i className="fas fa-user-graduate"></i> Masters Final Year</span>
          <span className="meta-chip"><i className="fas fa-robot"></i> Custom AI Tool Building</span>
          <span className="meta-chip"><i className="fas fa-film"></i> Cinema-Style AI Video</span>
          <span className="meta-chip"><i className="fas fa-briefcase"></i> Upwork/Fiverr Freelancing</span>
        </div>
      </div>

      {/* -------------------- OVERALL PROGRESS CARD -------------------- */}
      <div className="overall-progress-card">
        <div className="progress-header-row">
          <h3 className="progress-section-title">Overall Progress</h3>
          <span className="progress-percentage-text">{metrics.overallPercentage}% Completed</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${metrics.overallPercentage}%` }}
          ></div>
        </div>
        <p className="progress-counts-text">
          {metrics.completedClasses} of {metrics.totalClasses} classes completed
        </p>
      </div>

      {/* -------------------- STATISTICS CARDS -------------------- */}
      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue-icon">
            <i className="fas fa-list-ol"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Classes</span>
            <span className="stat-value">{metrics.totalClasses}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper green-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{metrics.completedClasses}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper amber-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Remaining</span>
            <span className="stat-value">{metrics.totalClasses - metrics.completedClasses}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper blue-icon">
            <i className="fas fa-chart-bar"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Overall Progress</span>
            <span className="stat-value">{metrics.overallPercentage}%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple-icon">
            <i className="fas fa-robot"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Current Track</span>
            <span className="stat-value text-truncate">{statusSummary.currentModule}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper indigo-icon">
            <i className="fas fa-step-forward"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Next Class</span>
            <span className="stat-value text-sm">
              {statusSummary.nextClass ? `Class ${statusSummary.nextClass.classNum}` : 'Completed'}
            </span>
          </div>
        </div>
      </div>

      {/* -------------------- CONTINUE LEARNING SECTION -------------------- */}
      <div className="continue-learning-section">
        <h3 className="section-title">
          <i className="fas fa-play-circle"></i> Continue Learning
        </h3>
        <div className="status-cards-row">
          <div className="status-item-card primary-status">
            <div className="status-badge-label">
              <i className="fas fa-calendar-day"></i> Today's Class Focus
            </div>
            {statusSummary.todayClass ? (
              <div className="status-card-body">
                <span className="class-number-label">Class {statusSummary.todayClass.classNum}</span>
                <h4 className="class-topic-name">{statusSummary.todayClass.topic}</h4>
                <button
                  className="action-link-btn primary-btn"
                  onClick={() => setActiveClassDetail(statusSummary.todayClass)}
                >
                  Open Lab Guide →
                </button>
              </div>
            ) : (
              <div className="status-card-body">
                <p className="empty-status-text">All classes completed!</p>
              </div>
            )}
          </div>

          <div className="status-item-card secondary-status">
            <div className="status-badge-label">
              <i className="fas fa-forward"></i> Up Next
            </div>
            {statusSummary.nextClass ? (
              <div className="status-card-body">
                <span className="class-number-label">Class {statusSummary.nextClass.classNum}</span>
                <h4 className="class-topic-name">{statusSummary.nextClass.topic}</h4>
                <button
                  className="action-link-btn outline-btn"
                  onClick={() => setActiveClassDetail(statusSummary.nextClass)}
                >
                  Preview Class →
                </button>
              </div>
            ) : (
              <div className="status-card-body">
                <p className="empty-status-text">Curriculum finished</p>
              </div>
            )}
          </div>

          <div className="status-item-card completed-status">
            <div className="status-badge-label">
              <i className="fas fa-check-double"></i> Last Completed
            </div>
            {statusSummary.lastCompletedClass ? (
              <div className="status-card-body">
                <span className="class-number-label">Class {statusSummary.lastCompletedClass.classNum}</span>
                <h4 className="class-topic-name">{statusSummary.lastCompletedClass.topic}</h4>
                <button
                  className="action-link-btn outline-btn"
                  onClick={() => setActiveClassDetail(statusSummary.lastCompletedClass)}
                >
                  Review Class →
                </button>
              </div>
            ) : (
              <div className="status-card-body">
                <p className="empty-status-text">No classes completed yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* -------------------- MODULE PROGRESS BREAKDOWN -------------------- */}
      <div className="module-progress-section">
        <h3 className="section-title">
          <i className="fas fa-tasks"></i> Module Progress
        </h3>
        <div className="module-grid-3col">
          {PG_2_MODULES.map((mod) => {
            const modMetric = metrics.moduleMetrics.find((m) => m.moduleId === mod.id) || { percentage: 0, completed: 0 };
            return (
              <Link
                to={`/syllabus/pg-2/module/${mod.id}`}
                className="module-progress-card clickable-module-card"
                key={mod.id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="mod-card-top">
                  <span className="mod-num-chip">Module {mod.number < 10 ? `0${mod.number}` : mod.number}</span>
                  <span className="mod-class-count">{mod.classes.length} Classes</span>
                </div>

                <div className="mod-card-body">
                  <h4 className="mod-title">
                    <i className={mod.icon || 'fas fa-award'}></i> {mod.title}
                  </h4>
                  <div className="mod-progress-text">
                    <span>{modMetric.completed} / {mod.classes.length} completed</span>
                    <span className="mod-pct">{modMetric.percentage}%</span>
                  </div>
                  <div className="mod-track">
                    <div
                      className="mod-fill"
                      style={{ width: `${modMetric.percentage}%` }}
                    ></div>
                  </div>
                  <div className="mod-open-link" style={{ marginTop: '0.75rem', fontSize: '0.8rem', fontWeight: '700', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Open Module Guide</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>



      {/* -------------------- SPECIALIZATION & CAPSTONE TRACKS -------------------- */}
      <div className="final-specialization-card">
        <div className="spec-header-block">
          <span className="spec-badge">CAPSTONE TRACKS</span>
          <h2>PG Final Year Master Specializations</h2>
          <p>Select your final postgraduate graduation career deliverable track:</p>
        </div>

        <div className="spec-options-grid">
          {PG_2_SPECIALIZATION_OPTIONS.map((track) => (
            <div className="spec-option-card" key={track.id}>
              <div className="spec-icon-box">
                <i className={track.icon}></i>
              </div>
              <h4>{track.title}</h4>
              <p>{track.description}</p>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2563EB', marginTop: '6px' }}>
                Deliverable: {track.portfolioDeliverable}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* -------------------- TEACHING GUIDE MODAL -------------------- */}
      {activeClassDetail && (
        <div className="modal-backdrop-overlay" onClick={() => setActiveClassDetail(null)}>
          <div className="modal-dialog-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon-btn" onClick={() => setActiveClassDetail(null)}>
              <i className="fas fa-times"></i>
            </button>

            <div className="modal-top-header">
              <div className="modal-badges">
                <span className="modal-class-num">Class {activeClassDetail.classNum}</span>
                <span className="modal-mod-name">{activeClassDetail.moduleTitle}</span>
              </div>
              <h2 className="modal-topic-heading">{activeClassDetail.topic}</h2>
              <p className="modal-concept-quote">
                <strong>Simple Concept:</strong> "{activeClassDetail.simpleConcept}"
              </p>
            </div>

            <div className="framework-flow-bar">
              <div className="flow-step">1. LEARN</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">2. DEMONSTRATE</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">3. PRACTICE</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">4. CREATE</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">5. COMPLETE</div>
            </div>

            <div className="teacher-guide-container">
              <div className="guide-header-row">
                <h4><i className="fas fa-chalkboard-teacher"></i> Teaching Assistant Guide</h4>
                <div className="duration-tags">
                  <span>Theory: {activeClassDetail.teacherGuide?.theoryDuration || '15 min'}</span>
                  <span>Practical: {activeClassDetail.teacherGuide?.practicalDuration || '40 min'}</span>
                </div>
              </div>

              <div className="guide-steps-column">
                <div className="guide-step-card">
                  <div className="step-badge">1</div>
                  <div className="step-content">
                    <strong>EXPLAIN (Concept)</strong>
                    <p>{activeClassDetail.teacherGuide?.explain}</p>
                  </div>
                </div>

                <div className="guide-step-card">
                  <div className="step-badge">2</div>
                  <div className="step-content">
                    <strong>DEMONSTRATE (Screen / Projector)</strong>
                    <p>{activeClassDetail.teacherGuide?.demonstrate}</p>
                  </div>
                </div>

                <div className="guide-step-card task-highlight-card">
                  <div className="step-badge">3</div>
                  <div className="step-content">
                    <strong>PRACTICAL TASK & OUTPUT</strong>
                    <p className="task-text"><strong>Task:</strong> {activeClassDetail.teacherGuide?.practicalTask}</p>
                    <p className="output-text"><strong>Expected Output:</strong> {activeClassDetail.teacherGuide?.expectedOutput}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-bottom-actions">
              <div className="modal-status-info">
                Current Status: <strong>{savedProgress[activeClassDetail.id]?.status || 'NOT STARTED'}</strong>
              </div>
              <div className="modal-btns-row">
                {savedProgress[activeClassDetail.id]?.status !== 'COMPLETED' ? (
                  <button
                    className="complete-action-btn"
                    onClick={() => handleStatusChange(activeClassDetail.id, 'COMPLETED')}
                  >
                    Mark Class Completed
                  </button>
                ) : (
                  <button
                    className="reopen-action-btn"
                    onClick={() => handleStatusChange(activeClassDetail.id, 'IN PROGRESS')}
                  >
                    Mark In Progress
                  </button>
                )}
                <button className="dismiss-modal-btn" onClick={() => setActiveClassDetail(null)}>
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pg2Syllabus;
