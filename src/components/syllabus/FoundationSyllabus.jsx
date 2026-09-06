import React, { useState, useEffect, useMemo } from 'react';
import {
  FOUNDATION_MODULES,
  calculateFoundationMetrics
} from '../../data/foundationSyllabusData';
import ClassPresentationModal from './ClassPresentationModal';
import './FoundationSyllabus.css';

const LOCAL_STORAGE_KEY = 'syllabus_foundation_progress';

const FoundationSyllabus = () => {
  // LocalStorage State for Progress Tracking
  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = item ? JSON.parse(item) : {};
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch (e) {
      console.error('Failed to parse foundation syllabus progress from localStorage:', e);
      return {};
    }
  });

  const [activeModuleId, setActiveModuleId] = useState('all');
  const [selectedPPTClass, setSelectedPPTClass] = useState(null);

  // Sync to LocalStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedProgress));
    } catch (e) {
      console.error('Failed to save foundation syllabus progress to localStorage:', e);
    }
  }, [savedProgress]);

  // Compute overall & module progress metrics dynamically
  const metrics = useMemo(() => {
    return calculateFoundationMetrics(savedProgress);
  }, [savedProgress]);

  // Flatten all classes for linear navigation & today's/next class determination
  const allFlattenedClasses = useMemo(() => {
    const list = [];
    FOUNDATION_MODULES.forEach((mod) => {
      mod.classes.forEach((cls) => {
        list.push({ ...cls, moduleTitle: mod.title, moduleId: mod.id, moduleNumber: mod.number });
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

    const currentModule = todayClass ? todayClass.moduleTitle : 'PC Hardware Essentials';

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

  // Filter modules based on active filter tab
  const displayedModules = useMemo(() => {
    if (activeModuleId === 'all') return FOUNDATION_MODULES;
    return FOUNDATION_MODULES.filter((m) => m.id === activeModuleId);
  }, [activeModuleId]);

  return (
    <div className="foundation-syllabus-container">
      {/* 1. SYLLABUS HEADER */}
      <div className="syllabus-header-card">
        <div className="header-badge-row">
          <span className="meta-chip chip-universal">
            <i className="fas fa-globe"></i> Universal Starter Track (All Streams)
          </span>
          <span className="meta-chip chip-portion">
            <i className="fas fa-clock"></i> 1-2 Week Orientation
          </span>
          <span className="meta-chip chip-pacing">
            <i className="fas fa-bolt"></i> Practical Baseline
          </span>
        </div>

        <h1 className="main-dashboard-title">
          Foundation Course Syllabus
        </h1>
        <p className="main-dashboard-subtitle">
          Computer Literacy &amp; System Essentials Orientation
        </p>
        <p className="main-dashboard-subtext">
          Master essential PC hardware, Windows OS, file navigation, keyboard hotkeys, web security, and AI learning tools.
        </p>

        <div className="header-metadata-chips">
          <span className="meta-chip"><i className="fas fa-layer-group"></i> 6 Modules</span>
          <span className="meta-chip"><i className="fas fa-list-check"></i> 14 Interactive Classes</span>
          <span className="meta-chip"><i className="fas fa-laptop-code"></i> Practical Lab Practice</span>
        </div>
      </div>

      {/* 2. OVERALL PROGRESS SECTION */}
      <div className="overall-progress-card">
        <div className="progress-header-row">
          <h3 className="progress-section-title">Overall Progress</h3>
          <span className="progress-percentage-text">{metrics.percentage}% Completed</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${metrics.percentage}%` }}
          ></div>
        </div>
        <p className="progress-counts-text">
          {metrics.completedClasses} of {metrics.totalClasses} classes completed
        </p>
      </div>

      {/* 3. DASHBOARD STATS GRID */}
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
            <span className="stat-value">{metrics.percentage}%</span>
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

      {/* 4. CONTINUE LEARNING SECTION */}
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
                <span className="class-number-label">Class 0{statusSummary.todayClass.classNum}</span>
                <h4 className="class-topic-name">{statusSummary.todayClass.topic}</h4>
                <button
                  className="action-link-btn primary-btn"
                  onClick={() => setSelectedPPTClass(statusSummary.todayClass)}
                >
                  <i className="fas fa-desktop"></i> Launch Class PPT →
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
                <span className="class-number-label">Class 0{statusSummary.nextClass.classNum}</span>
                <h4 className="class-topic-name">{statusSummary.nextClass.topic}</h4>
                <button
                  className="action-link-btn outline-btn"
                  onClick={() => setSelectedPPTClass(statusSummary.nextClass)}
                >
                  <i className="fas fa-eye"></i> Preview Class →
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
                <span className="class-number-label">Class 0{statusSummary.lastCompletedClass.classNum}</span>
                <h4 className="class-topic-name">{statusSummary.lastCompletedClass.topic}</h4>
                <button
                  className="action-link-btn outline-btn"
                  onClick={() => setSelectedPPTClass(statusSummary.lastCompletedClass)}
                >
                  <i className="fas fa-redo"></i> Review Class PPT →
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

      {/* 5. MODULE FILTER TABS */}
      <div className="module-filter-bar">
        <button
          className={`filter-tab-btn ${activeModuleId === 'all' ? 'active' : ''}`}
          onClick={() => setActiveModuleId('all')}
        >
          <i className="fas fa-th"></i> All 6 Modules
        </button>
        {FOUNDATION_MODULES.map((mod) => (
          <button
            key={mod.id}
            className={`filter-tab-btn ${activeModuleId === mod.id ? 'active' : ''}`}
            onClick={() => setActiveModuleId(mod.id)}
          >
            <i className={mod.icon}></i> Mod 0{mod.number}
          </button>
        ))}
      </div>

      {/* 6. CLEAN MODULE & CLASS LIST */}
      <div className="foundation-modules-list">
        {displayedModules.map((mod) => {
          let modTotal = mod.classes.length;
          let modCompleted = 0;
          mod.classes.forEach((c) => {
            if (savedProgress[c.id]?.status === 'COMPLETED') modCompleted++;
          });
          const modPct = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;

          return (
            <div className="clean-module-card" key={mod.id}>
              {/* Module Header */}
              <div className="clean-mod-header">
                <div className="clean-mod-title-area">
                  <span className="clean-mod-number">Module 0{mod.number}</span>
                  <h3 className="clean-mod-title">
                    <i className={mod.icon || 'fas fa-book-open'}></i> {mod.title}
                  </h3>
                </div>
                <div className="clean-mod-progress-area">
                  <div className="clean-mod-bar-wrap">
                    <div className="clean-mod-fill" style={{ width: `${modPct}%` }}></div>
                  </div>
                  <span className="clean-mod-pct">{modCompleted}/{modTotal} ({modPct}%)</span>
                </div>
              </div>

              <p className="clean-mod-desc">{mod.description}</p>

              {/* Clean Class List */}
              <div className="clean-classes-grid">
                {mod.classes.map((cls) => {
                  const currentStatus = savedProgress[cls.id]?.status || 'NOT STARTED';

                  return (
                    <div className={`clean-class-row status-${currentStatus.toLowerCase().replace(/\s+/g, '-')}`} key={cls.id}>
                      <div className="clean-class-left">
                        <span className="clean-class-num">Class 0{cls.classNum}</span>
                        <div className="clean-class-meta">
                          <h4 className="clean-class-topic">{cls.topic}</h4>
                          <p className="clean-class-concept">{cls.simpleConcept}</p>
                        </div>
                      </div>

                      <div className="clean-class-right">
                        <button
                          className="launch-ppt-pill-btn"
                          onClick={() => setSelectedPPTClass({ ...cls, moduleTitle: mod.title })}
                          title="Open Fullscreen PPT Presentation"
                        >
                          <i className="fas fa-desktop"></i>
                          <span>Present (PPT)</span>
                        </button>

                        <select
                          className={`clean-status-select status-${currentStatus.toLowerCase().replace(/\s+/g, '-')}`}
                          value={currentStatus}
                          onChange={(e) => handleStatusChange(cls.id, e.target.value)}
                        >
                          <option value="NOT STARTED">Not Started</option>
                          <option value="IN PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* FULLSCREEN PPT PRESENTATION MODAL */}
      <ClassPresentationModal
        isOpen={!!selectedPPTClass}
        onClose={() => setSelectedPPTClass(null)}
        classData={selectedPPTClass}
        moduleTitle={selectedPPTClass?.moduleTitle || 'Foundation Course'}
        batchName="Foundation Course"
      />
    </div>
  );
};

export default FoundationSyllabus;

