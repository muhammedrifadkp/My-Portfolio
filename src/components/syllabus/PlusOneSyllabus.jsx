import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  PLUS_ONE_MODULES,
  FINAL_SPECIALIZATION_OPTIONS,
  calculateSyllabusMetrics
} from '../../data/plus1SyllabusData';
import './PlusOneSyllabus.css';

const LOCAL_STORAGE_KEY = 'syllabus_plus1_progress';

const PlusOneSyllabus = () => {
  // LocalStorage State for Progress Tracking & Teacher Notes
  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY);
      return item ? JSON.parse(item) : {};
    } catch (e) {
      console.error('Failed to parse syllabus progress from localStorage:', e);
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
      console.error('Failed to save syllabus progress to localStorage:', e);
    }
  }, [savedProgress]);

  // Compute overall & module progress metrics dynamically
  const metrics = useMemo(() => {
    return calculateSyllabusMetrics(savedProgress);
  }, [savedProgress]);

  // Flatten all classes for linear navigation & today's/next class determination
  const allFlattenedClasses = useMemo(() => {
    const list = [];
    PLUS_ONE_MODULES.forEach((mod) => {
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
    const currentModule = todayClass ? todayClass.moduleTitle : 'Digital Foundation';

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

  // Filter Modules & Classes based on search & filter selections
  const filteredModules = useMemo(() => {
    return PLUS_ONE_MODULES.filter((mod) => {
      if (selectedModuleId !== 'all' && mod.id !== selectedModuleId) {
        return false;
      }
      return true;
    }).map((mod) => {
      const matchingClasses = mod.classes.filter((cls) => {
        const status = savedProgress[cls.id]?.status || 'NOT STARTED';

        // Filter by Status
        if (statusFilter !== 'all' && status !== statusFilter) {
          return false;
        }

        // Filter by Search Query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTopic = cls.topic.toLowerCase().includes(q);
          const matchNum = `class ${cls.classNum}`.includes(q) || `${cls.classNum}` === q;
          const matchConcept = cls.simpleConcept.toLowerCase().includes(q);
          return matchTopic || matchNum || matchConcept;
        }

        return true;
      });

      return {
        ...mod,
        classes: matchingClasses
      };
    }).filter((mod) => mod.classes.length > 0 || (searchQuery === '' && statusFilter === 'all'));
  }, [selectedModuleId, statusFilter, searchQuery, savedProgress]);

  return (
    <div className="plus1-syllabus-container">
      {/* -------------------- SYLLABUS HEADER -------------------- */}
      <div className="syllabus-header-card">
        <h1 className="main-dashboard-title">+1 Digital Skills Syllabus</h1>
        <p className="main-dashboard-subtitle">
          Practical Digital Skills Development Programme
        </p>
        <p className="main-dashboard-subtext">
          Learn by doing — build real-world computer, office, design, AI, web and coding confidence.
        </p>

        {/* Subtle Metadata Chips */}
        <div className="header-metadata-chips">
          <span className="meta-chip"><i className="fas fa-layer-group"></i> 10 Modules</span>
          <span className="meta-chip"><i className="fas fa-book-reader"></i> 48 Classes</span>
          <span className="meta-chip"><i className="fas fa-laptop-code"></i> Practical Learning</span>
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
          {PLUS_ONE_MODULES.map((mod) => {
            const mMetric = metrics.moduleProgress[mod.id] || { percentage: 0, completed: 0, total: mod.classes.length };
            return (
              <Link
                to={`/syllabus/+1/module/${mod.id}`}
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

      {/* -------------------- CONTROLS & FILTER BAR -------------------- */}
      <div className="filter-controls-bar">
        <div className="search-box-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="syllabus-search-input"
            placeholder="Search by topic, class number, or keyword..."
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
          {/* Module Selector */}
          <select
            className="filter-select"
            value={selectedModuleId}
            onChange={(e) => setSelectedModuleId(e.target.value)}
          >
            <option value="all">All 11 Modules</option>
            {PLUS_ONE_MODULES.map((mod) => (
              <option value={mod.id} key={mod.id}>
                Module {mod.number}: {mod.title}
              </option>
            ))}
          </select>

          {/* Status Filter Selector */}
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
            const mMetric = metrics.moduleProgress[mod.id] || { percentage: 0, completed: 0, total: mod.classes.length };
            return (
              <div className="detailed-module-block" key={mod.id}>
                {/* Module Header */}
                <div className="module-block-header">
                  <div>
                    <div className="mod-block-tag">Module {mod.number}</div>
                    <h2 className="mod-block-title">
                      <i className={mod.icon}></i> {mod.title}
                    </h2>
                    <p className="mod-block-purpose">{mod.purpose}</p>
                  </div>
                  <div className="mod-block-badge">
                    {mMetric.completed} / {mMetric.total} Completed ({mMetric.percentage}%)
                  </div>
                </div>

                {/* Module Real Project Card */}
                {mod.realProject && (
                  <div className="real-project-card">
                    <div className="rp-badge">
                      <i className="fas fa-lightbulb"></i> MODULE REAL PROJECT
                    </div>
                    <h4 className="rp-title">{mod.realProject.title}</h4>
                    <p className="rp-desc">{mod.realProject.description}</p>
                  </div>
                )}

                {/* Multi Real Projects List */}
                {mod.realProjects && (
                  <div className="multi-projects-grid">
                    {mod.realProjects.map((rp, idx) => (
                      <div className="mp-card" key={idx}>
                        <span className="mp-title"><i className="fas fa-star"></i> {rp.title}</span>
                        <p className="mp-desc">{rp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Class Cards Grid */}
                <div className="classes-grid-3col">
                  {mod.classes.map((cls) => {
                    const currentStatus = savedProgress[cls.id]?.status || 'NOT STARTED';
                    const hasNotes = Boolean(savedProgress[cls.id]?.teacherNotes);

                    return (
                      <div
                        className={`class-item-card status-border-${currentStatus.toLowerCase().replace(' ', '-')}`}
                        key={cls.id}
                      >
                        <div className="class-card-top-row">
                          <span className="class-number-tag">Class {cls.classNum}</span>

                          {/* Status Dropdown */}
                          <select
                            className={`status-dropdown status-style-${currentStatus.toLowerCase().replace(' ', '-')}`}
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
                          {hasNotes && (
                            <span className="notes-icon-badge" title="Teacher notes added">
                              <i className="fas fa-sticky-note"></i>
                            </span>
                          )}
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

      {/* -------------------- FINAL PROJECT SPECIALIZATIONS -------------------- */}
      <div className="final-specialization-card">
        <div className="spec-header-block">
          <span className="spec-badge">CAPSTONE ASSESSMENT</span>
          <h2>Final Practical Specialization Project</h2>
          <p>
            At the end of the +1 program, each student selects <strong>ONE specialization</strong> and builds a comprehensive final project.
          </p>
        </div>

        <div className="spec-options-grid">
          {FINAL_SPECIALIZATION_OPTIONS.map((opt) => (
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
          <h4><i className="fas fa-clipboard-check"></i> Final Project Requirements</h4>
          <div className="req-items-grid">
            <div className="req-box"><strong>1. Title:</strong> Project name & objective</div>
            <div className="req-box"><strong>2. Goal:</strong> Digital product created</div>
            <div className="req-box"><strong>3. Tools:</strong> Tools & software used</div>
            <div className="req-box"><strong>4. Process:</strong> Practical steps completed</div>
            <div className="req-box"><strong>5. Output:</strong> Final exported file / URL</div>
            <div className="req-box"><strong>6. Demo:</strong> 2-min classroom presentation</div>
          </div>
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

            {/* Teaching Framework (LEARN -> DEMONSTRATE -> PRACTICE -> CREATE -> COMPLETE) */}
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
                    <strong>DEMONSTRATE (Screen / Projector)</strong>
                    <p>{activeClassDetail.teacherGuide?.demonstrate}</p>
                  </div>
                </div>

                <div className="guide-step-card">
                  <div className="step-badge">3</div>
                  <div className="step-content">
                    <strong>STUDENT PRACTICE (Hands-on Lab)</strong>
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
                    <strong>PRACTICAL TASK & OUTPUT</strong>
                    <p className="task-text"><strong>Task:</strong> {activeClassDetail.teacherGuide?.practicalTask}</p>
                    <p className="output-text"><strong>Expected Output:</strong> {activeClassDetail.teacherGuide?.expectedOutput}</p>
                  </div>
                </div>
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
                  <span>1. Explained Concept</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={Boolean(savedProgress[activeClassDetail.id]?.checks?.demonstrated)}
                    onChange={() => handleCheckToggle(activeClassDetail.id, 'demonstrated')}
                  />
                  <span>2. Demonstrated on Screen</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={Boolean(savedProgress[activeClassDetail.id]?.checks?.practiced)}
                    onChange={() => handleCheckToggle(activeClassDetail.id, 'practiced')}
                  />
                  <span>3. Students Practiced</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={Boolean(savedProgress[activeClassDetail.id]?.checks?.taskCompleted)}
                    onChange={() => handleCheckToggle(activeClassDetail.id, 'taskCompleted')}
                  />
                  <span>4. Verified Student Output</span>
                </label>
              </div>
            </div>

            {/* Teacher Notes */}
            <div className="teacher-notes-field">
              <h4><i className="fas fa-sticky-note"></i> Teacher Notes</h4>
              <textarea
                className="modal-notes-textarea"
                placeholder="Add lab notes or student observations..."
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

export default PlusOneSyllabus;
