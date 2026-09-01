import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getModuleConfig, getBatchConfig } from '../data/syllabusRegistry';
import './ModuleDetail.css';

const ModuleDetail = () => {
  const { batchId, moduleId } = useParams();
  const navigate = useNavigate();

  const config = useMemo(() => {
    return getModuleConfig(batchId, moduleId);
  }, [batchId, moduleId]);

  const batch = config?.batch;
  const moduleData = config?.module;

  // LocalStorage State for Progress Tracking & Teacher Notes
  const storageKey = batch?.storageKey || 'syllabus_generic_progress';

  const [savedProgress, setSavedProgress] = useState(() => {
    try {
      const item = localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : {};
    } catch (e) {
      console.error('Failed to parse syllabus progress from localStorage:', e);
      return {};
    }
  });

  // Active sub-navigation tab
  const [activeTab, setActiveTab] = useState('overview');

  // Expanded classes state in accordions
  const [expandedClasses, setExpandedClasses] = useState({});

  // Sync to LocalStorage on progress change
  useEffect(() => {
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(savedProgress));
      } catch (e) {
        console.error('Failed to save syllabus progress to localStorage:', e);
      }
    }
  }, [savedProgress, storageKey]);

  // Expand first class by default
  useEffect(() => {
    if (moduleData?.classes && moduleData.classes.length > 0) {
      setExpandedClasses({ [moduleData.classes[0].id]: true });
    }
  }, [moduleData]);

  // Calculate module progress metrics
  const moduleMetrics = useMemo(() => {
    if (!moduleData?.classes) return { total: 0, completed: 0, percentage: 0, remaining: 0 };
    const total = moduleData.classes.length;
    let completed = 0;

    moduleData.classes.forEach((cls) => {
      const status = savedProgress[cls.id]?.status || 'NOT STARTED';
      if (status === 'COMPLETED') completed++;
    });

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const remaining = total - completed;

    return { total, completed, percentage, remaining };
  }, [moduleData, savedProgress]);

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

  // Toggle class accordion
  const toggleClassAccordion = (classId) => {
    setExpandedClasses((prev) => ({
      ...prev,
      [classId]: !prev[classId]
    }));
  };

  if (!batch || !moduleData) {
    return (
      <div className="module-detail-page not-found-state">
        <div className="not-found-card">
          <i className="fas fa-exclamation-triangle"></i>
          <h2>Module Not Found</h2>
          <p>The requested syllabus module could not be found.</p>
          <Link to="/syllabus" className="back-btn">
            ← Return to Syllabus Overview
          </Link>
        </div>
      </div>
    );
  }

  // Find next module in batch
  const currentModIndex = batch.modules.findIndex((m) => m.id === moduleData.id);
  const nextModule = batch.modules[currentModIndex + 1] || null;
  const prevModule = batch.modules[currentModIndex - 1] || null;

  return (
    <div className="module-detail-page">
      <div className="module-detail-container">
        {/* Top Breadcrumb & Navigation Header */}
        <nav className="top-nav-bar">
          <Link to={`/syllabus/${batch.slug}`} className="back-link">
            <i className="fas fa-arrow-left"></i> Back to {batch.name} Syllabus
          </Link>

          <div className="breadcrumb-trail">
            <Link to="/syllabus">Syllabus</Link>
            <span className="sep">/</span>
            <Link to={`/syllabus/${batch.slug}`}>{batch.shortName}</Link>
            <span className="sep">/</span>
            <span className="current">Module {moduleData.number}: {moduleData.title}</span>
          </div>
        </nav>

        {/* Hero Header Section */}
        <header className="module-hero-card" style={{ borderColor: batch.color }}>
          <div className="hero-top-row">
            <span className="batch-badge" style={{ backgroundColor: `${batch.color}20`, color: batch.color, borderColor: `${batch.color}40` }}>
              {batch.level} • Module 0{moduleData.number}
            </span>
            <span className="difficulty-badge">
              <i className="fas fa-signal"></i> {batch.difficulty}
            </span>
          </div>

          <h1 className="hero-title">
            <i className={moduleData.icon || 'fas fa-book-open'} style={{ color: batch.color }}></i>
            {moduleData.title}
          </h1>

          <p className="hero-description">{moduleData.purpose || moduleData.description}</p>

          <div className="hero-meta-strip">
            <div className="meta-item">
              <i className="fas fa-clock"></i>
              <span>{moduleData.estimatedHours}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-list-ol"></i>
              <span>{moduleData.totalClasses} Interactive Classes</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-project-diagram"></i>
              <span>{moduleData.projects?.length || 1} Practical Capstone Project</span>
            </div>
          </div>

          {/* Module Progress Bar */}
          <div className="hero-progress-block">
            <div className="progress-label-row">
              <span>Module Completion</span>
              <span className="pct-text">{moduleMetrics.percentage}%</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${moduleMetrics.percentage}%`, backgroundColor: batch.color }}></div>
            </div>
            <div className="progress-counts">
              <span>{moduleMetrics.completed} of {moduleMetrics.total} classes marked completed</span>
              <span>{moduleMetrics.remaining} remaining</span>
            </div>
          </div>
        </header>

        {/* Quick Answer Banner (Answers the 5 core student/teacher questions) */}
        <section className="quick-answers-grid">
          <div className="qa-card">
            <div className="qa-icon" style={{ background: '#3B82F615', color: '#3B82F6' }}>
              <i className="fas fa-question-circle"></i>
            </div>
            <div className="qa-content">
              <h4>What is this module?</h4>
              <p>{moduleData.purpose}</p>
            </div>
          </div>

          <div className="qa-card">
            <div className="qa-icon" style={{ background: '#10B98115', color: '#10B981' }}>
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="qa-content">
              <h4>What will I learn?</h4>
              <p>{moduleData.learningObjectives[0] || 'Core practical skills & software mastery.'}</p>
            </div>
          </div>

          <div className="qa-card">
            <div className="qa-icon" style={{ background: '#F59E0B15', color: '#F59E0B' }}>
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
            <div className="qa-content">
              <h4>Today's Class Focus</h4>
              <p>{moduleData.classes?.[0]?.topic || 'Hands-on workstation guide.'}</p>
            </div>
          </div>

          <div className="qa-card">
            <div className="qa-icon" style={{ background: '#8B5CF615', color: '#8B5CF6' }}>
              <i className="fas fa-laptop-code"></i>
            </div>
            <div className="qa-content">
              <h4>What to Practice?</h4>
              <p>{moduleData.studentPractice?.basicExercises?.[0] || 'Hands-on lab tasks and mini-challenges.'}</p>
            </div>
          </div>
        </section>

        {/* Sticky Section Navigation Bar */}
        <div className="sticky-subnav-bar">
          <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <i className="fas fa-info-circle"></i> Overview
          </button>
          <button className={`tab-btn ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>
            <i className="fas fa-tasks"></i> Class Content ({moduleData.totalClasses})
          </button>
          <button className={`tab-btn ${activeTab === 'examples' ? 'active' : ''}`} onClick={() => setActiveTab('examples')}>
            <i className="fas fa-lightbulb"></i> Real-World Examples
          </button>
          <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <i className="fas fa-rocket"></i> Projects
          </button>
          <button className={`tab-btn ${activeTab === 'visuals' ? 'active' : ''}`} onClick={() => setActiveTab('visuals')}>
            <i className="fas fa-image"></i> Visual References
          </button>
          <button className={`tab-btn ${activeTab === 'teacher' ? 'active' : ''}`} onClick={() => setActiveTab('teacher')}>
            <i className="fas fa-chalkboard-teacher"></i> Teacher Guide
          </button>
          <button className={`tab-btn ${activeTab === 'resources' ? 'active' : ''}`} onClick={() => setActiveTab('resources')}>
            <i className="fas fa-link"></i> Tools & Links
          </button>
        </div>

        {/* SECTION 1: MODULE OVERVIEW */}
        {(activeTab === 'overview' || activeTab === 'all') && (
          <section className="detail-section overview-section" id="overview">
            <h2 className="section-heading">
              <i className="fas fa-compass"></i> 1. Module Overview & Outcomes
            </h2>

            <div className="overview-two-col">
              <div className="overview-card">
                <h3><i className="fas fa-bullseye"></i> Why This Skill is Useful</h3>
                <p>
                  In today's digital workforce, possessing practical confidence in <strong>{moduleData.title}</strong> equips students with essential problem-solving abilities. It bridges the gap between academic theory and real-world digital execution.
                </p>
                <div className="utility-highlights">
                  <div className="highlight-pill"><i className="fas fa-check-circle"></i> Digital Independence</div>
                  <div className="highlight-pill"><i className="fas fa-check-circle"></i> Career & Job Readiness</div>
                  <div className="highlight-pill"><i className="fas fa-check-circle"></i> Practical Efficiency</div>
                </div>
              </div>

              <div className="overview-card">
                <h3><i className="fas fa-star"></i> What Students Will Be Able To Do</h3>
                <ul className="outcomes-list">
                  {moduleData.learningObjectives.slice(0, 5).map((obj, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check" style={{ color: batch.color }}></i>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* LEARNING OBJECTIVES GRID */}
            <div className="objectives-block">
              <h3><i className="fas fa-graduation-cap"></i> 2. Detailed Learning Objectives</h3>
              <div className="objectives-grid">
                {moduleData.learningObjectives.map((obj, idx) => (
                  <div className="objective-card" key={idx}>
                    <span className="obj-num">0{idx + 1}</span>
                    <p>{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: CLASS-BY-CLASS CONTENT & TEACHING PROGRESSION */}
        {(activeTab === 'classes' || activeTab === 'all') && (
          <section className="detail-section classes-section" id="classes">
            <div className="classes-header-row">
              <h2 className="section-heading">
                <i className="fas fa-list-ol"></i> 3. Class-by-Class Content & Teaching Guide
              </h2>
              <span className="progression-badge">
                Teaching Progression: Basic → Practice → Application → Task
              </span>
            </div>

            <p className="section-intro-text">
              Teachers can expand any class to view step-by-step instructions, live demonstration guidelines, student practical tasks, and directly toggle completion status.
            </p>

            <div className="classes-accordion-list">
              {moduleData.classes?.map((cls) => {
                const clsStatus = savedProgress[cls.id]?.status || 'NOT STARTED';
                const isExpanded = !!expandedClasses[cls.id];
                const checks = savedProgress[cls.id]?.checks || {
                  explained: false,
                  demonstrated: false,
                  practiced: false,
                  taskCompleted: false
                };
                const teacherNotes = savedProgress[cls.id]?.teacherNotes || '';

                return (
                  <div className={`class-accordion-item status-${clsStatus.toLowerCase().replace(' ', '-')}`} key={cls.id}>
                    <div className="accordion-header" onClick={() => toggleClassAccordion(cls.id)}>
                      <div className="acc-left">
                        <span className="class-num-badge">Class {cls.classNum}</span>
                        <h3 className="class-topic">{cls.topic}</h3>
                      </div>

                      <div className="acc-right">
                        {/* Interactive Status Selector */}
                        <select
                          className={`status-select status-${clsStatus.toLowerCase().replace(' ', '-')}`}
                          value={clsStatus}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleStatusChange(cls.id, e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="NOT STARTED">Not Started</option>
                          <option value="IN PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </select>

                        <button className="expand-toggle-btn" aria-label="Toggle details">
                          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="accordion-body">
                        {/* Concept & Objective Grid */}
                        <div className="class-overview-grid">
                          <div className="mod-info-card concept-box">
                            <span className="box-title"><i className="fas fa-lightbulb"></i> Simple Concept</span>
                            <p>{cls.simpleConcept}</p>
                          </div>
                          <div className="mod-info-card objective-box">
                            <span className="box-title"><i className="fas fa-bullseye"></i> Learning Objective</span>
                            <p>{cls.objective}</p>
                          </div>
                        </div>

                        {/* Detailed Teaching Guide */}
                        {cls.teacherGuide && (
                          <div className="teacher-guide-subcard">
                            <h4 className="subcard-title"><i className="fas fa-chalkboard-teacher"></i> Classroom Step-by-Step Guide</h4>

                            <div className="guide-timing-strip">
                              <span><i className="fas fa-clock"></i> Theory: {cls.teacherGuide.theoryDuration || '15 min'}</span>
                              <span><i className="fas fa-laptop"></i> Practical: {cls.teacherGuide.practicalDuration || '40 min'}</span>
                            </div>

                            <div className="guide-content-grid">
                              <div className="guide-step-card explain-step">
                                <span className="step-tag"><i className="fas fa-comment-alt"></i> 1. Teacher Explains</span>
                                <p>{cls.teacherGuide.explain}</p>
                              </div>

                              <div className="guide-step-card demo-step">
                                <span className="step-tag"><i className="fas fa-desktop"></i> 2. Teacher Demonstrates</span>
                                <p>{cls.teacherGuide.demonstrate}</p>
                              </div>

                              <div className="guide-step-card practice-step">
                                <span className="step-tag"><i className="fas fa-user-edit"></i> 3. Students Practice</span>
                                <p>{cls.teacherGuide.practice}</p>
                              </div>

                              <div className="guide-step-card task-step">
                                <span className="step-tag"><i className="fas fa-tasks"></i> 4. Practical Task</span>
                                <p>{cls.teacherGuide.practicalTask}</p>
                              </div>
                            </div>

                            <div className="guide-footer-row">
                              <div className="example-callout">
                                <strong>Real-World Example:</strong> {cls.teacherGuide.realWorldExample}
                              </div>
                              <div className="outcome-callout">
                                <strong>Expected Outcome:</strong> {cls.teacherGuide.expectedOutput}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Teacher Checkbox Verification & Notes */}
                        <div className="teacher-controls-block">
                          <h4 className="controls-title"><i className="fas fa-tasks"></i> Teacher Verification Checklist</h4>
                          <div className="checks-grid">
                            <label className="checkbox-item">
                              <input
                                type="checkbox"
                                checked={checks.explained}
                                onChange={() => handleCheckToggle(cls.id, 'explained')}
                              />
                              <span>Topic Explained</span>
                            </label>

                            <label className="checkbox-item">
                              <input
                                type="checkbox"
                                checked={checks.demonstrated}
                                onChange={() => handleCheckToggle(cls.id, 'demonstrated')}
                              />
                              <span>Demonstration Complete</span>
                            </label>

                            <label className="checkbox-item">
                              <input
                                type="checkbox"
                                checked={checks.practiced}
                                onChange={() => handleCheckToggle(cls.id, 'practiced')}
                              />
                              <span>Students Practiced</span>
                            </label>

                            <label className="checkbox-item">
                              <input
                                type="checkbox"
                                checked={checks.taskCompleted}
                                onChange={() => handleCheckToggle(cls.id, 'taskCompleted')}
                              />
                              <span>Practical Task Submitted</span>
                            </label>
                          </div>

                          {/* Notes Field */}
                          <div className="teacher-notes-field">
                            <label><i className="fas fa-sticky-note"></i> Teacher Classroom Notes (Auto-saved)</label>
                            <input
                              type="text"
                              className="notes-input"
                              placeholder="Add specific lab observations or student feedback..."
                              value={teacherNotes}
                              onChange={(e) => handleNotesChange(cls.id, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 4: REAL-WORLD EXAMPLES */}
        {(activeTab === 'examples' || activeTab === 'all') && (
          <section className="detail-section examples-section" id="examples">
            <h2 className="section-heading">
              <i className="fas fa-lightbulb"></i> 4. Real-World Practical Examples
            </h2>
            <p className="section-intro-text">
              Every concept in this module connects directly to real-life situations students will encounter in school, jobs, freelancing, and personal projects.
            </p>

            <div className="examples-grid">
              {moduleData.realWorldExamples.map((ex, idx) => (
                <div className="example-card" key={idx}>
                  <div className="example-category">
                    <i className="fas fa-briefcase"></i> {ex.category}
                  </div>
                  <p className="example-text">{ex.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 5: PRACTICAL PROJECTS */}
        {(activeTab === 'projects' || activeTab === 'all') && (
          <section className="detail-section projects-section" id="projects">
            <h2 className="section-heading">
              <i className="fas fa-project-diagram"></i> 5. Module Practical Capstone Projects
            </h2>

            <div className="projects-grid">
              {moduleData.projects.map((proj, idx) => (
                <div className="mod-project-card" key={idx}>
                  <div className="proj-header">
                    <span className="proj-badge">Capstone Project 0{idx + 1}</span>
                    <h3 className="proj-title">{proj.title}</h3>
                  </div>

                  <p className="proj-desc">{proj.description}</p>

                  <div className="proj-footer">
                    <span className="deliverable-tag">
                      <i className="fas fa-file-export"></i> Deliverable: Student Portfolio Output
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 6: IMAGES / VISUAL REFERENCES */}
        {(activeTab === 'visuals' || activeTab === 'all') && (
          <section className="detail-section visuals-section" id="visuals">
            <h2 className="section-heading">
              <i className="fas fa-image"></i> 6. Visual References & Workstation Diagrams
            </h2>

            <div className="visuals-grid">
              {moduleData.visualReferences.map((vis, idx) => (
                <div className="visual-card" key={idx}>
                  <div className="visual-mockup-frame">
                    <div className="mockup-header">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                      <span className="mockup-title">{vis.title}</span>
                    </div>

                    <div className="mockup-body">
                      <i className="fas fa-layer-group mockup-icon" style={{ color: batch.color }}></i>
                      <div className="mockup-labels">
                        {vis.labels.map((lbl, lIdx) => (
                          <span className="mock-label-chip" key={lIdx}>{lbl}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="visual-info">
                    <h4>{vis.title}</h4>
                    <p>{vis.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 8 & 9: TEACHER GUIDE */}
        {(activeTab === 'teacher' || activeTab === 'all') && (
          <section className="detail-section teacher-guide-section" id="teacher">
            <h2 className="section-heading">
              <i className="fas fa-chalkboard-teacher"></i> 9. Master Teacher Classroom Guide
            </h2>

            <div className="teacher-master-card">
              <div className="tg-block">
                <h3><i className="fas fa-play"></i> How to Introduce the Topic</h3>
                <p>{moduleData.teacherGuide.introductionStrategy}</p>
              </div>

              <div className="tg-block">
                <h3><i className="fas fa-desktop"></i> Demonstration Steps</h3>
                <ol className="tg-steps-list">
                  {moduleData.teacherGuide.demonstrationSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="tg-two-col">
                <div className="tg-block warning-block">
                  <h3><i className="fas fa-exclamation-triangle"></i> Common Student Mistakes</h3>
                  <ul>
                    {moduleData.teacherGuide.commonMistakes.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="tg-block activity-block">
                  <h3><i className="fas fa-users"></i> Suggested Classroom Activity</h3>
                  <p>{moduleData.teacherGuide.classroomActivity}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 7, 8, 12: USEFUL LINKS & SOFTWARE TOOLS */}
        {(activeTab === 'resources' || activeTab === 'all') && (
          <section className="detail-section resources-section" id="resources">
            <h2 className="section-heading">
              <i className="fas fa-tools"></i> 8. Software Tools & Learning Resources
            </h2>

            {/* SOFTWARE TOOLS GRID */}
            <h3 className="subheading"><i className="fas fa-download"></i> Required Software & Workstations</h3>
            <div className="tools-grid">
              {moduleData.softwareTools.map((tool, idx) => (
                <div className="tool-card" key={idx}>
                  <div className="tool-icon">
                    <i className={tool.icon}></i>
                  </div>
                  <div className="tool-info">
                    <h4>{tool.name}</h4>
                    <p>{tool.purpose}</p>
                    <span className="pricing-tag">{tool.pricing}</span>
                  </div>
                  <div className="tool-actions">
                    <a href={tool.officialUrl} target="_blank" rel="noopener noreferrer" className="tool-link-btn">
                      Official Site <i className="fas fa-external-link-alt"></i>
                    </a>
                    {tool.downloadUrl && tool.downloadUrl !== tool.officialUrl && (
                      <a href={tool.downloadUrl} target="_blank" rel="noopener noreferrer" className="tool-link-btn download">
                        Download <i className="fas fa-download"></i>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* USEFUL WEBSITE LINKS */}
            <h3 className="subheading" style={{ marginTop: '2.5rem' }}>
              <i className="fas fa-globe"></i> Useful Resource Websites & Documentation
            </h3>
            <div className="links-grid">
              {moduleData.usefulLinks.map((lnk, idx) => (
                <div className="link-card" key={idx}>
                  <span className="category-badge">{lnk.category}</span>
                  <h4>{lnk.name}</h4>
                  <p>{lnk.description}</p>
                  <a href={lnk.url} target="_blank" rel="noopener noreferrer" className="visit-btn">
                    Visit Link <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 11: COMPLETION & FOOTER NAVIGATION */}
        <footer className="module-footer-nav">
          <div className="nav-prev">
            {prevModule ? (
              <Link to={`/syllabus/${batch.slug}/module/${prevModule.id}`} className="nav-mod-btn">
                <i className="fas fa-arrow-left"></i>
                <div>
                  <span className="nav-label">Previous Module</span>
                  <span className="nav-mod-title">Module {prevModule.number}: {prevModule.title}</span>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="nav-center">
            <Link to={`/syllabus/${batch.slug}`} className="back-to-batch-btn">
              <i className="fas fa-th-large"></i> All {batch.shortName} Modules
            </Link>
          </div>

          <div className="nav-next">
            {nextModule ? (
              <Link to={`/syllabus/${batch.slug}/module/${nextModule.id}`} className="nav-mod-btn primary">
                <div>
                  <span className="nav-label">Next Module</span>
                  <span className="nav-mod-title">Module {nextModule.number}: {nextModule.title}</span>
                </div>
                <i className="fas fa-arrow-right"></i>
              </Link>
            ) : (
              <Link to="/syllabus" className="nav-mod-btn primary">
                <div>
                  <span className="nav-label">Curriculum Completed</span>
                  <span className="nav-mod-title">Return to Main Syllabus</span>
                </div>
                <i className="fas fa-check-circle"></i>
              </Link>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ModuleDetail;
