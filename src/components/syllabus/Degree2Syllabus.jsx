import React, { useState, useEffect, useMemo } from 'react';
import {
  DEGREE_2_MODULES,
  DEGREE_2_SPECIALIZATION_OPTIONS,
  calculateDegree2Metrics
} from '../../data/degree2SyllabusData';
import './DegreeSyllabus.css';

const LOCAL_STORAGE_KEY = 'syllabus_degree2_progress';

const Degree2Syllabus = () => {
  // LocalStorage State for Progress Tracking
  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY);
      return item ? JSON.parse(item) : {};
    } catch (e) {
      console.error('Failed to parse Degree 2nd Year syllabus progress from localStorage:', e);
      return {};
    }
  });

  // Filter & Search States
  const [selectedModuleId, setSelectedModuleId] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeClassDetail, setActiveClassDetail] = useState(null);

  // Sync to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedProgress));
    } catch (e) {
      console.error('Failed to save Degree 2nd Year syllabus progress to localStorage:', e);
    }
  }, [savedProgress]);

  // Compute overall & module progress metrics dynamically
  const metrics = useMemo(() => {
    return calculateDegree2Metrics(savedProgress);
  }, [savedProgress]);

  // Flatten all classes for linear navigation & today's/next class determination
  const allFlattenedClasses = useMemo(() => {
    const list = [];
    DEGREE_2_MODULES.forEach((mod) => {
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
    const currentModule = todayClass ? todayClass.moduleTitle : 'Full-Stack Web & AI';

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

  // Filter Modules & Classes based on search query and status filters
  const filteredModules = useMemo(() => {
    return DEGREE_2_MODULES.map((mod) => {
      if (selectedModuleId !== 'all' && mod.id !== selectedModuleId) {
        return null;
      }

      const matchingClasses = mod.classes.filter((cls) => {
        const clsStatus = savedProgress[cls.id]?.status || 'NOT STARTED';
        if (statusFilter !== 'all' && clsStatus !== statusFilter) {
          return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTopic = cls.topic.toLowerCase().includes(q);
          const matchConcept = cls.simpleConcept.toLowerCase().includes(q);
          const matchObjective = cls.objective.toLowerCase().includes(q);
          return matchTopic || matchConcept || matchObjective;
        }

        return true;
      });

      if (matchingClasses.length === 0 && (selectedModuleId !== 'all' || searchQuery.trim() || statusFilter !== 'all')) {
        return null;
      }

      return {
        ...mod,
        classes: matchingClasses
      };
    }).filter(Boolean);
  }, [selectedModuleId, statusFilter, searchQuery, savedProgress]);

  return (
    <div className="degree-syllabus-container">
      {/* -------------------- SYLLABUS HEADER -------------------- */}
      <div className="syllabus-header-card">
        <h1 className="main-dashboard-title">Degree 2nd Year Digital Skills Syllabus</h1>
        <p className="main-dashboard-subtitle">
          Intermediate Full-Stack & Creative Engineering Program
        </p>
        <p className="main-dashboard-subtext">
          Comprehensive practical curriculum aligned with second-year undergraduate survey demands: Full-Stack Web Apps (HTML/CSS Grid/JS ES6+/React), AI Tool Integration & AI App Building, Advanced Adobe Illustrator Vector Branding, Premiere Pro Commercial Video Production, and Meta Ads Digital Marketing.
        </p>

        <div className="header-metadata-chips">
          <span className="meta-chip"><i className="fas fa-rocket"></i> Focus: Interactive Web Apps & AI Tools</span>
          <span className="meta-chip"><i className="fas fa-layer-group"></i> 5 Modules</span>
          <span className="meta-chip"><i className="fas fa-book-reader"></i> 25 Advanced Classes</span>
          <span className="meta-chip"><i className="fas fa-globe"></i> Deployment: Vercel & Live Web Hosting</span>
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
            <i className="fas fa-laptop-code"></i>
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
          {DEGREE_2_MODULES.map((mod) => {
            const modMetric = metrics.moduleMetrics.find((m) => m.moduleId === mod.id) || { percentage: 0, completed: 0 };
            return (
              <div
                className={`module-progress-card ${selectedModuleId === mod.id ? 'active-mod-card' : ''}`}
                key={mod.id}
                onClick={() => setSelectedModuleId(selectedModuleId === mod.id ? 'all' : mod.id)}
              >
                <div className="mod-card-top">
                  <span className="mod-num-chip">Module {mod.number < 10 ? `0${mod.number}` : mod.number}</span>
                  <span className="mod-class-count">{mod.classes.length} Classes</span>
                </div>

                <div className="mod-card-body">
                  <h4 className="mod-title">
                    <i className={mod.icon || 'fas fa-code'}></i> {mod.title}
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
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* -------------------- CONTROLS & FILTER BAR -------------------- */}
      <div className="filter-controls-bar">
        <div className="search-box-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="syllabus-search-input"
            placeholder="Search React, AI APIs, Illustrator, Premiere, SEO..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        <div className="filter-dropdowns-group">
          <select
            className="filter-select"
            value={selectedModuleId}
            onChange={(e) => setSelectedModuleId(e.target.value)}
          >
            <option value="all">All 5 Modules</option>
            {DEGREE_2_MODULES.map((m) => (
              <option key={m.id} value={m.id}>
                Module {m.number}: {m.title}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="NOT STARTED">Not Started</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* -------------------- DETAILED MODULES & CLASSES -------------------- */}
      <div className="detailed-modules-container">
        {filteredModules.length === 0 ? (
          <div className="no-results-card">
            <i className="fas fa-search-minus no-results-icon"></i>
            <h4>No matching classes found</h4>
            <p>Try adjusting your search query or filter settings.</p>
            <button className="reset-filter-btn" onClick={() => { setSearchQuery(''); setStatusFilter('all'); setSelectedModuleId('all'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          filteredModules.map((mod) => {
            const modMetric = metrics.moduleMetrics.find((m) => m.moduleId === mod.id) || { percentage: 0, completed: 0 };
            return (
              <div className="detailed-module-block" key={mod.id}>
                <div className="module-block-header">
                  <div>
                    <div className="mod-block-tag">Module {mod.number}</div>
                    <h2 className="mod-block-title">
                      <i className={mod.icon || 'fas fa-cube'}></i> {mod.title}
                    </h2>
                    <p className="mod-block-purpose">{mod.purpose}</p>
                  </div>
                  <div className="mod-block-badge">
                    {modMetric.completed} / {mod.classes.length} Completed ({modMetric.percentage}%)
                  </div>
                </div>

                {mod.realProject && (
                  <div className="real-project-card">
                    <div className="rp-badge">
                      <i className="fas fa-cube"></i> MODULE REAL PROJECT
                    </div>
                    <h4 className="rp-title">{mod.realProject.title}</h4>
                    <p className="rp-desc">{mod.realProject.description}</p>
                  </div>
                )}

                <div className="classes-grid-3col">
                  {mod.classes.map((cls) => {
                    const currentStatus = savedProgress[cls.id]?.status || 'NOT STARTED';
                    const statusKey = currentStatus.toLowerCase().replace(' ', '-');

                    return (
                      <div
                        className={`class-item-card status-border-${statusKey}`}
                        key={cls.id}
                      >
                        <div className="class-card-top-row">
                          <span className="class-number-tag">Class {cls.classNum}</span>
                          <select
                            className={`status-dropdown status-style-${statusKey}`}
                            value={currentStatus}
                            onChange={(e) => handleStatusChange(cls.id, e.target.value)}
                          >
                            <option value="NOT STARTED">Not Started</option>
                            <option value="IN PROGRESS">In Progress</option>
                            <option value="COMPLETED">✓ Completed</option>
                          </select>
                        </div>

                        <div className="class-card-content" onClick={() => setActiveClassDetail(cls)}>
                          <h4 className="class-title-text">{cls.topic}</h4>
                          <p className="class-concept-text">{cls.simpleConcept}</p>
                          <div className="class-objective-block">
                            <strong>Objective:</strong> {cls.objective}
                          </div>
                        </div>

                        <div className="class-card-bottom-row">
                          <button
                            className="open-guide-link-btn"
                            onClick={() => setActiveClassDetail(cls)}
                          >
                            Open Teaching Guide →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* -------------------- SPECIALIZATION & CAPSTONE TRACKS -------------------- */}
      <div className="final-specialization-card">
        <div className="spec-header-block">
          <span className="spec-badge">CAPSTONE TRACKS</span>
          <h2>Degree 2nd Year Capstone Options</h2>
          <p>Select your final term intermediate engineering project track:</p>
        </div>

        <div className="spec-options-grid">
          {DEGREE_2_SPECIALIZATION_OPTIONS.map((track) => (
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

export default Degree2Syllabus;
