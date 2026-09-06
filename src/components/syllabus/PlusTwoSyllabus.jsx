import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  PLUS_TWO_MODULES,
  PLUS_TWO_CAPSTONE_OPTIONS,
  BONUS_SPECIAL_TRACKS,
  calculatePlus2Metrics
} from '../../data/plus2SyllabusData';
import './PlusTwoSyllabus.css';

const LOCAL_STORAGE_KEY = 'syllabus_plus2_progress';

const PlusTwoSyllabus = () => {
  // LocalStorage State for Progress Tracking & Teacher Notes
  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = item ? JSON.parse(item) : {};
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch (e) {
      console.error('Failed to parse +2 syllabus progress from localStorage:', e);
      return {};
    }
  });

  const [activeClassDetail, setActiveClassDetail] = useState(null);

  // Sync to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedProgress));
    } catch (e) {
      console.error('Failed to save +2 syllabus progress to localStorage:', e);
    }
  }, [savedProgress]);

  // Compute overall & module progress metrics dynamically
  const metrics = useMemo(() => {
    return calculatePlus2Metrics(savedProgress);
  }, [savedProgress]);

  // Flatten all classes for linear navigation & today's/next class determination
  const allFlattenedClasses = useMemo(() => {
    const list = [];
    PLUS_TWO_MODULES.forEach((mod) => {
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

    // Determine current active module title
    const currentModule = todayClass ? todayClass.moduleTitle : 'Digital Productivity';

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

  // Teacher Checkbox Toggle Handler
  const handleCheckToggle = (classId, checkKey) => {
    setSavedProgress((prev) => {
      const currentChecks = prev[classId]?.checks || {
        explained: false,
        demonstrated: false,
        practiced: false,
        taskCompleted: false
      };
      return {
        ...prev,
        [classId]: {
          ...prev[classId],
          checks: {
            ...currentChecks,
            [checkKey]: !currentChecks[checkKey]
          }
        }
      };
    });
  };

  // Teacher Notes Input Handler
  const handleNotesChange = (classId, notesText) => {
    setSavedProgress((prev) => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        teacherNotes: notesText
      }
    }));
  };



  return (
    <div className="plus2-syllabus-container">
      {/* -------------------- SYLLABUS HEADER -------------------- */}
      <div className="syllabus-header-card">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <span className="meta-chip" style={{ background: 'rgba(0,240,255,0.1)', color: '#00D8E6', fontWeight: '700', border: '1px solid rgba(0,240,255,0.3)' }}>Higher Secondary</span>
          <span className="meta-chip" style={{ background: 'rgba(59,130,246,0.1)', color: '#2563EB', fontWeight: '700', border: '1px solid rgba(59,130,246,0.3)' }}>50% Syllabus (Second Half)</span>
          <span className="meta-chip" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', fontWeight: '700', border: '1px solid rgba(16,185,129,0.3)' }}>Creative & Tech Track</span>
        </div>
        <h1 className="main-dashboard-title">+2 Digital Skills Syllabus</h1>
        <p className="main-dashboard-subtitle">
          Plus Two Advanced Media & Tech (Year 2) — Learn by Doing
        </p>
        <p className="main-dashboard-subtext">
          Practical, project-oriented, and career-focused curriculum designed for Plus Two students. Focuses on MS PowerPoint, Canva, Photoshop, Video Editing, Web/AI Basics, AI Productivity, and Portfolio Building.
        </p>

        {/* Subtle Metadata Chips */}
        <div className="header-metadata-chips">
          <span className="meta-chip"><i className="fas fa-layer-group"></i> {PLUS_TWO_MODULES.length} Modules (Modules 7 to 12)</span>
          <span className="meta-chip"><i className="fas fa-book-reader"></i> {metrics.totalClasses} Interactive Classes</span>
          <span className="meta-chip"><i className="fas fa-briefcase"></i> Career & Portfolio Ready</span>
        </div>
      </div>

      {/* -------------------- OVERALL PROGRESS SECTION -------------------- */}
      <div className="overall-progress-card">
        <div className="progress-header-row">
          <h3 className="progress-section-title">Overall Progress</h3>
          <span className="progress-percentage-text">{metrics.overallProgress}% Completed</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${metrics.overallProgress}%` }}
          ></div>
        </div>
        <p className="progress-counts-text">
          {metrics.completedClasses} of {metrics.totalClasses} classes completed
          {metrics.skippedClasses > 0 && ` (${metrics.skippedClasses} skipped)`}
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
            <span className="stat-value">{metrics.remainingClasses}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper blue-icon">
            <i className="fas fa-chart-bar"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Overall Progress</span>
            <span className="stat-value">{metrics.overallProgress}%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple-icon">
            <i className="fas fa-book"></i>
          </div>
          <div className="stat-content">
            <span className="stat-label">Current Module</span>
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
          {/* Today's Class */}
          <div className="status-item-card primary-status">
            <div className="status-badge-label">
              <i className="fas fa-calendar-day"></i> Today's Class
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

          {/* Up Next */}
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

          {/* Last Completed */}
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
          {PLUS_TWO_MODULES.map((mod) => {
            const mMetric = metrics.moduleProgress[mod.id] || { percentage: 0, completed: 0, total: mod.classes.length };
            return (
              <Link
                to={`/syllabus/+2/module/${mod.id}`}
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
                    <i className={mod.icon}></i> {mod.title}
                  </h4>
                  <div className="mod-progress-text">
                    <span>{mMetric.completed} / {mMetric.total} completed</span>
                    <span className="mod-pct">{mMetric.percentage}%</span>
                  </div>
                  <div className="mod-track">
                    <div
                      className="mod-fill"
                      style={{ width: `${mMetric.percentage}%` }}
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

      {/* -------------------- FINAL CAPSTONE PROJECT OPTIONS -------------------- */}
      <div className="final-specialization-card">
        <div className="spec-header-block">
          <span className="spec-badge">CAPSTONE ASSESSMENT</span>
          <h2>Final Real-World Capstone Project</h2>
          <p>
            At the end of the +2 program, each student selects <strong>ONE capstone project option</strong> and creates a master multi-channel digital output package.
          </p>
        </div>

        <div className="spec-options-grid">
          {PLUS_TWO_CAPSTONE_OPTIONS.map((opt) => (
            <div className="spec-option-card" key={opt.id}>
              <div className="spec-icon-box">
                <i className={opt.icon}></i>
              </div>
              <h4>{opt.title}</h4>
              <p>{opt.description}</p>
            </div>
          ))}
        </div>

        <div className="project-requirements-box">
          <h4><i className="fas fa-clipboard-check"></i> Master Capstone Deliverables</h4>
          <div className="req-items-grid">
            <div className="req-box"><strong>1. Brand Asset:</strong> Custom Logo / Graphic Banner</div>
            <div className="req-box"><strong>2. Print/Social Poster:</strong> Photoshop / Canva Poster Design</div>
            <div className="req-box"><strong>3. Commercial Video:</strong> 30-60s Edited Commercial Video</div>
            <div className="req-box"><strong>4. Social Strategy:</strong> 7-Day Content Plan & Captions</div>
            <div className="req-box"><strong>5. AI & Digital:</strong> AI-assisted script & Web Portfolio Page</div>
            <div className="req-box"><strong>6. Demo Pitch:</strong> 2-minute live classroom project pitch</div>
          </div>
        </div>
      </div>

      {/* -------------------- BONUS SPECIAL INTEREST TRACKS -------------------- */}
      <div className="bonus-tracks-card">
        <div className="bonus-header-block">
          <span className="bonus-badge">SPECIAL INTEREST TRACKS</span>
          <h2>Optional / Special Interest Learning Tracks</h2>
          <p>For students interested in specialized programming, automation, or hardware robotics.</p>
        </div>

        <div className="bonus-tracks-grid">
          {BONUS_SPECIAL_TRACKS.map((tr) => (
            <div className="bonus-track-item" key={tr.id}>
              <div className="bonus-track-icon">
                <i className={tr.icon}></i>
              </div>
              <div>
                <h4>{tr.title}</h4>
                <p>{tr.description}</p>
              </div>
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

            {/* Modal Header */}
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

            {/* Teaching Framework (LEARN -> PRACTICE -> CREATE -> PUBLISH -> BUILD PORTFOLIO) */}
            <div className="framework-flow-bar">
              <div className="flow-step">1. LEARN</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">2. PRACTICE</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">3. CREATE</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">4. PUBLISH</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step">5. BUILD PORTFOLIO</div>
            </div>

            {/* Teacher Assistant Guide */}
            <div className="teacher-guide-container">
              <div className="guide-header-row">
                <h4><i className="fas fa-chalkboard-teacher"></i> Teaching Assistant Guide</h4>
                <div className="duration-tags">
                  <span>Theory: {activeClassDetail.teacherGuide?.theoryDuration || '15-20 min'}</span>
                  <span>Practical: {activeClassDetail.teacherGuide?.practicalDuration || '35-40 min'}</span>
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
                    <strong>STEP-BY-STEP DEMONSTRATION</strong>
                    <p>{activeClassDetail.teacherGuide?.demonstrate}</p>
                  </div>
                </div>

                <div className="guide-step-card">
                  <div className="step-badge">3</div>
                  <div className="step-content">
                    <strong>STUDENT PRACTICAL TASK</strong>
                    <p>{activeClassDetail.teacherGuide?.practice}</p>
                  </div>
                </div>

                <div className="guide-step-card">
                  <div className="step-badge">4</div>
                  <div className="step-content">
                    <strong>REAL WORLD EXAMPLE</strong>
                    <p>{activeClassDetail.teacherGuide?.realWorldExample}</p>
                  </div>
                </div>

                <div className="guide-step-card task-highlight-card">
                  <div className="step-badge">5</div>
                  <div className="step-content">
                    <strong>EXPECTED STUDENT OUTPUT & TASK</strong>
                    <p className="task-text"><strong>Task:</strong> {activeClassDetail.teacherGuide?.practicalTask}</p>
                    <p className="output-text"><strong>Expected Output:</strong> {activeClassDetail.teacherGuide?.expectedOutput}</p>
                  </div>
                </div>

                <div className="guide-step-card tip-card">
                  <div className="step-badge">6</div>
                  <div className="step-content">
                    <strong>COMMON MISTAKES & TEACHER TIPS</strong>
                    <p><strong>Mistakes:</strong> {activeClassDetail.teacherGuide?.commonMistakes}</p>
                    <p><strong>Teacher Tip:</strong> {activeClassDetail.teacherGuide?.teacherTips}</p>
                  </div>
                </div>

                {activeClassDetail.teacherGuide?.optionalChallenge && (
                  <div className="guide-step-card challenge-card">
                    <div className="step-badge">★</div>
                    <div className="step-content">
                      <strong>OPTIONAL CHALLENGE & HOMEWORK</strong>
                      <p><strong>Challenge:</strong> {activeClassDetail.teacherGuide?.optionalChallenge}</p>
                      <p><strong>Homework:</strong> {activeClassDetail.teacherGuide?.homework}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Teacher Verification Checklist */}
            <div className="teacher-checklist-box">
              <h4><i className="fas fa-check-square"></i> Teacher Verification Checklist</h4>
              <div className="checklist-options-grid">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={Boolean(savedProgress[activeClassDetail.id]?.checks?.explained)}
                    onChange={() => handleCheckToggle(activeClassDetail.id, 'explained')}
                  />
                  <span>1. Explained Concept & Rules</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={Boolean(savedProgress[activeClassDetail.id]?.checks?.demonstrated)}
                    onChange={() => handleCheckToggle(activeClassDetail.id, 'demonstrated')}
                  />
                  <span>2. Demonstrated Live on Screen</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={Boolean(savedProgress[activeClassDetail.id]?.checks?.practiced)}
                    onChange={() => handleCheckToggle(activeClassDetail.id, 'practiced')}
                  />
                  <span>3. Students Executed Hands-on Lab</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={Boolean(savedProgress[activeClassDetail.id]?.checks?.taskCompleted)}
                    onChange={() => handleCheckToggle(activeClassDetail.id, 'taskCompleted')}
                  />
                  <span>4. Verified & Saved Output File</span>
                </label>
              </div>
            </div>

            {/* Teacher Notes */}
            <div className="teacher-notes-field">
              <h4><i className="fas fa-sticky-note"></i> Teacher Notes & Student Evaluation</h4>
              <textarea
                className="modal-notes-textarea"
                placeholder="Add lab notes, observations, or student grades..."
                value={savedProgress[activeClassDetail.id]?.teacherNotes || ''}
                onChange={(e) => handleNotesChange(activeClassDetail.id, e.target.value)}
                rows={3}
              ></textarea>
            </div>

            {/* Modal Bottom Actions */}
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
                <button
                  className="skip-action-btn"
                  onClick={() => handleStatusChange(activeClassDetail.id, 'SKIPPED')}
                >
                  Mark Skipped
                </button>
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

export default PlusTwoSyllabus;
