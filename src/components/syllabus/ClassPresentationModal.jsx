import React, { useState, useEffect, useCallback } from 'react';
import InteractiveImageViewer from './InteractiveImageViewer';
import './ClassPresentationModal.css';

const ClassPresentationModal = ({
  isOpen,
  onClose,
  classData,
  moduleTitle,
  batchName,
  allClasses = [],
  onSelectClass
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeVisualTab, setActiveVisualTab] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const totalSlides = 5;

  // Compute current class index in allClasses list
  const currentIndex = Array.isArray(allClasses) && classData
    ? allClasses.findIndex(c => c.id === classData.id || c.classNum === classData.classNum)
    : -1;

  const nextClassObj = (currentIndex !== -1 && currentIndex < allClasses.length - 1)
    ? allClasses[currentIndex + 1]
    : null;

  const prevClassObj = (currentIndex > 0)
    ? allClasses[currentIndex - 1]
    : null;

  const isModuleChangeNext = nextClassObj && (
    nextClassObj.moduleNumber !== (classData?.moduleNumber || 1) ||
    nextClassObj.moduleTitle !== (classData?.moduleTitle || moduleTitle)
  );

  // Reset slide index & visual tab when modal opens or class changes
  useEffect(() => {
    if (isOpen && classData) {
      setCurrentSlide(0);
      setActiveVisualTab(0);
    }
  }, [isOpen, classData?.id, classData?.classNum]);

  const goToNextClass = useCallback(() => {
    if (nextClassObj && onSelectClass) {
      onSelectClass(nextClassObj);
      setCurrentSlide(0);
      setActiveVisualTab(0);
      const isNewMod = nextClassObj.moduleNumber !== (classData?.moduleNumber || 1);
      const msg = isNewMod
        ? `🚀 Entering Module 0${nextClassObj.moduleNumber}: ${nextClassObj.moduleTitle}`
        : `📖 Class 0${nextClassObj.classNum}: ${nextClassObj.topic}`;
      setToastMsg(msg);
      setTimeout(() => setToastMsg(''), 3500);
    } else {
      setCurrentSlide(0);
      setActiveVisualTab(0);
    }
  }, [nextClassObj, onSelectClass, classData]);

  const goToPrevClass = useCallback(() => {
    if (prevClassObj && onSelectClass) {
      onSelectClass(prevClassObj);
      setCurrentSlide(totalSlides - 1); // Go to final slide of previous class
      setActiveVisualTab(0);
    } else {
      setCurrentSlide(totalSlides - 1);
    }
  }, [prevClassObj, onSelectClass, totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      // On Slide 5 (Last slide): Proceed to Next Class or Next Module!
      goToNextClass();
    }
  }, [currentSlide, totalSlides, goToNextClass]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    } else {
      // On Slide 1: Go back to previous class's last slide!
      goToPrevClass();
    }
  }, [currentSlide, goToPrevClass]);

  // Keyboard Navigation (Arrow Right/Left, Spacebar, ESC, F)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextSlide, prevSlide, onClose]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  if (!isOpen || !classData) return null;

  const visualImagePath = classData.visualImage || `/images/foundation/class${classData.classNum}_default.svg`;
  const hasExtraVisuals = Array.isArray(classData.extraVisuals) && classData.extraVisuals.length > 0;
  const currentVisualSrc = hasExtraVisuals
    ? (classData.extraVisuals[activeVisualTab]?.src || visualImagePath)
    : visualImagePath;

  return (
    <div className="ppt-modal-backdrop">
      <div className={`ppt-modal-container ${isFullscreen ? 'fullscreen-mode' : ''}`}>
        
        {/* Top Presentation Bar */}
        <header className="ppt-top-bar">
          <div className="ppt-bar-left">
            <span className="ppt-badge"><i className="fas fa-desktop"></i> IT SIR PROJECTOR PRESENTATION MODE</span>
            <span className="class-tag">Class 0{classData.classNum}: {classData.topic}</span>
          </div>

          <div className="ppt-bar-controls">
            <button className="ppt-icon-btn" onClick={toggleFullscreen} title="Toggle Fullscreen (F)">
              <i className={`fas fa-${isFullscreen ? 'compress' : 'expand'}`}></i>
              <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </button>

            <button className="ppt-close-btn" onClick={onClose} title="Close Presentation (ESC)">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </header>

        {/* SLIDE CANVAS STAGE */}
        <main className="ppt-slide-stage">
          
          {/* SLIDE 1: TOPIC OVERVIEW & LEARNING GOAL */}
          {currentSlide === 0 && (
            <div className="ppt-slide slide-overview animate-slide">
              <div className="slide-hero-badge">
                <span>{batchName || 'Foundation Course'}</span> • <span>{moduleTitle}</span>
              </div>
              <h1 className="slide-title">Class 0{classData.classNum}: {classData.topic}</h1>
              
              <div className="slide-two-col">
                <div className="slide-concept-box">
                  <h3><i className="fas fa-lightbulb"></i> Concept Overview</h3>
                  <p className="concept-large">{classData.simpleConcept}</p>
                </div>

                <div className="slide-objective-box">
                  <h3><i className="fas fa-bullseye"></i> Learning Target</h3>
                  <p className="objective-large">{classData.objective}</p>
                </div>
              </div>

              {/* Recommended Tool Banner */}
              {classData.recommendedTool && (
                <div className="ppt-recommended-tool-banner">
                  <div className="tool-banner-info">
                    <span className="tool-badge"><i className="fas fa-cube"></i> {classData.recommendedTool.badge || 'Recommended Software Tool'}</span>
                    <h4>{classData.recommendedTool.name}</h4>
                    <p>{classData.recommendedTool.description}</p>
                  </div>
                  <a
                    href={classData.recommendedTool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tool-download-btn"
                  >
                    <i className="fas fa-download"></i> Get Software / View Details <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              )}

              {/* Visual Thumbnail Teaser */}
              <div className="slide-visual-preview-strip">
                <img src={currentVisualSrc} alt={classData.topic} className="teaser-img" />
                <div className="teaser-hint">
                  <i className="fas fa-arrow-right"></i> Next slide contains full interactive visual diagram &amp; reference guides
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: FULL HIGH-RES VISUAL DIAGRAM / AI MATRIX */}
          {currentSlide === 1 && (
            <div className="ppt-slide slide-visual animate-slide">
              <div className="slide-header-strip">
                <h2><i className="fas fa-image"></i> Visual Component &amp; Architecture Breakdown</h2>
                {hasExtraVisuals ? (
                  <div className="visual-tab-buttons-row">
                    {classData.extraVisuals.map((vis, idx) => (
                      <button
                        key={vis.id || idx}
                        className={`vis-tab-btn ${activeVisualTab === idx ? 'active' : ''}`}
                        onClick={() => setActiveVisualTab(idx)}
                      >
                        <i className="fas fa-photo-video"></i> {vis.title}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="tag-pill">Visual Learning Diagram</span>
                )}
              </div>

              {classData.typingToolsMatrix && (hasExtraVisuals && classData.extraVisuals[activeVisualTab]?.id === 'typing_tools') ? (
                <div className="ai-tools-matrix-container">
                  <div className="ai-matrix-header">
                    <h3><i className="fas fa-keyboard"></i> Top 5 Free Typing Speed Increasing Websites &amp; Apps</h3>
                    <span className="matrix-badge">Top 5 Typing Tools</span>
                  </div>
                  <div className="ai-tools-cards-grid">
                    {classData.typingToolsMatrix.map((tool, idx) => (
                      <div key={idx} className="ai-tool-card">
                        <div className="ai-tool-card-top">
                          <span className="ai-tool-icon">{tool.icon}</span>
                          <div className="ai-tool-title-box">
                            <h4>{tool.name}</h4>
                            <span className="ai-tool-badge">{tool.badge}</span>
                          </div>
                        </div>
                        <div className="ai-tool-use-row">
                          <i className="fas fa-bullseye"></i> <strong>Best Use:</strong> {tool.use}
                        </div>
                        <div className="ai-tool-quote-box">
                          <span>{tool.description}</span>
                        </div>
                        <a href={tool.link} target="_blank" rel="noopener noreferrer" className="ai-tool-try-btn">
                          Practice Free on {tool.name} <i className="fas fa-external-link-alt"></i>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : classData.cmdCategories && (hasExtraVisuals && classData.extraVisuals[activeVisualTab]?.id === 'cmd_matrix') ? (
                <div className="cmd-tools-matrix-container">
                  <div className="cmd-matrix-header">
                    <h3><i className="fas fa-terminal"></i> Command Prompt (CMD) Complete Reference &amp; Hacker Commands</h3>
                    <span className="matrix-badge">Basic to Advanced CLI Cheatsheet</span>
                  </div>
                  <div className="cmd-categories-grid">
                    {classData.cmdCategories.map((cat, cIdx) => (
                      <div key={cIdx} className="cmd-category-box">
                        <h4 className="cmd-cat-title"><i className={cat.icon || 'fas fa-terminal'}></i> {cat.title}</h4>
                        <div className="cmd-table-wrapper">
                          <table className="cmd-matrix-table">
                            <thead>
                              <tr>
                                <th>Command Syntax</th>
                                <th>Malayalam / Simple Explanation</th>
                                <th>Example Usage</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cat.commands.map((cmd, rIdx) => (
                                <tr key={rIdx} className={cmd.isHacker ? 'hacker-row' : ''}>
                                  <td><code className="cmd-syntax-code">{cmd.command}</code></td>
                                  <td><span className="cmd-meaning-text">{cmd.meaning}</span></td>
                                  <td><code className="cmd-example-code">{cmd.example}</code></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : classData.aiToolsMatrix && (hasExtraVisuals && classData.extraVisuals[activeVisualTab]?.id === 'matrix' || !hasExtraVisuals) ? (
                <div className="ai-tools-matrix-container">
                  <div className="ai-matrix-header">
                    <h3><i className="fas fa-robot"></i> Essential AI Tools &amp; Student Use Cases</h3>
                    <span className="matrix-badge">Top 7 AI Tools Guide</span>
                  </div>
                  <div className="ai-tools-cards-grid">
                    {classData.aiToolsMatrix.map((tool, idx) => (
                      <div key={idx} className="ai-tool-card">
                        <div className="ai-tool-card-top">
                          <span className="ai-tool-icon">{tool.icon}</span>
                          <div className="ai-tool-title-box">
                            <h4>{tool.name}</h4>
                            <span className="ai-tool-badge">{tool.badge}</span>
                          </div>
                        </div>
                        <div className="ai-tool-use-row">
                          <i className="fas fa-bullseye"></i> <strong>Best Use:</strong> {tool.use}
                        </div>
                        <div className="ai-tool-quote-box">
                          <span>{tool.description}</span>
                        </div>

                        {tool.examplePrompt && (
                          <div className="ai-tool-prompt-box">
                            <div className="prompt-label"><i className="fas fa-terminal"></i> Student Example Prompt:</div>
                            <code className="prompt-text">{tool.examplePrompt}</code>
                          </div>
                        )}

                        <a href={tool.link} target="_blank" rel="noopener noreferrer" className="ai-tool-try-btn">
                          Open {tool.name} <i className="fas fa-external-link-alt"></i>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="visual-full-container">
                  <InteractiveImageViewer src={currentVisualSrc} alt={classData.topic} title={classData.topic} />
                </div>
              )}
            </div>
          )}

          {/* SLIDE 3: TEACHER LIVE DEMONSTRATION STEPS */}
          {currentSlide === 2 && (
            <div className="ppt-slide slide-teacher animate-slide">
              <div className="slide-header-strip teacher">
                <h2><i className="fas fa-chalkboard-teacher"></i> IT Sir Live Demonstration Guide</h2>
                <span className="tag-pill teacher">Projector Teaching Steps</span>
              </div>

              <div className="teacher-steps-grid">
                <div className="teacher-step-card">
                  <span className="step-num">1</span>
                  <div className="step-body">
                    <h4>Teacher Explains Concept</h4>
                    <p>{classData.teacherGuide?.explain || classData.simpleConcept}</p>
                  </div>
                </div>

                <div className="teacher-step-card">
                  <span className="step-num">2</span>
                  <div className="step-body">
                    <h4>Live Workstation Demonstration</h4>
                    <p>{classData.teacherGuide?.demonstrate || 'Demonstrate workflow step-by-step on projector screen.'}</p>
                  </div>
                </div>

                <div className="teacher-step-card">
                  <span className="step-num">3</span>
                  <div className="step-body">
                    <h4>Highlight Common Mistakes</h4>
                    <p>Show students what errors to avoid and how to troubleshoot quickly.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 4: STUDENT HANDS-ON LAB PRACTICE */}
          {currentSlide === 3 && (
            <div className="ppt-slide slide-student-practice animate-slide">
              <div className="slide-header-strip practice">
                <h2><i className="fas fa-laptop"></i> Student Hands-On Lab Workstation Practice</h2>
                <span className="tag-pill practice">Lab Exercise Step-by-Step</span>
              </div>

              <div className="student-task-large-card">
                <div className="task-header-row">
                  <i className="fas fa-tasks"></i>
                  <h3>Practical Task for Student PC Workstations:</h3>
                </div>
                
                <p className="task-instruction-text">
                  {classData.teacherGuide?.practicalTask || classData.objective}
                </p>

                <div className="practice-substeps-box">
                  <h4><i className="fas fa-check-circle"></i> Student Execution Checklist:</h4>
                  <ul>
                    <li>1. Perform task on your assigned lab computer workstation.</li>
                    <li>2. Refer to the projector diagram if stuck.</li>
                    <li>3. Verify output with lab partner or teacher before submitting.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 5: REAL-WORLD EXAMPLE & SHORTCUTS */}
          {currentSlide === 4 && (
            <div className="ppt-slide slide-summary animate-slide">
              <div className="slide-header-strip summary">
                <h2><i className="fas fa-star"></i> Real-World Usage &amp; Class Summary</h2>
                <span className="tag-pill summary">Practical Takeaway</span>
              </div>

              <div className="summary-two-col">
                <div className="summary-card">
                  <h3><i className="fas fa-briefcase"></i> Real-World Workplace Context</h3>
                  <p>{classData.teacherGuide?.realWorldExample || 'Daily workplace application.'}</p>
                </div>

                <div className="summary-card">
                  <h3><i className="fas fa-key"></i> Expected Output Benchmark</h3>
                  <p>{classData.teacherGuide?.expectedOutput || 'Independent student execution.'}</p>
                </div>
              </div>

              {/* Recommended Tool Link Banner */}
              {classData.recommendedTool && (
                <div className="ppt-recommended-tool-banner">
                  <div className="tool-banner-info">
                    <span className="tool-badge"><i className="fas fa-link"></i> Free Software Link</span>
                    <h4>{classData.recommendedTool.name}</h4>
                    <p>Free tool install for PDF creation, editing, merging, converting, and page management.</p>
                  </div>
                  <a
                    href={classData.recommendedTool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tool-download-btn"
                  >
                    <i className="fas fa-download"></i> Open PDFgear Link <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              )}

              {/* Slide 5 Interactive Class / Module Completion Card */}
              {nextClassObj ? (
                isModuleChangeNext ? (
                  <div className="ppt-finish-class-card next-module">
                    <div className="finish-icon-wrap">
                      <i className="fas fa-rocket"></i>
                    </div>
                    <div className="finish-text-wrap">
                      <h3>🚀 Module 0{classData.moduleNumber || 1} Complete!</h3>
                      <p>You have completed all classes in <strong>{classData.moduleTitle || moduleTitle}</strong>. Ready to enter <strong>Module 0{nextClassObj.moduleNumber}: {nextClassObj.moduleTitle}</strong>!</p>
                    </div>
                    <button className="ppt-next-step-btn module-btn" onClick={goToNextClass}>
                      <span>Launch Module 0{nextClassObj.moduleNumber} (Class 0{nextClassObj.classNum})</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                ) : (
                  <div className="ppt-finish-class-card next-class">
                    <div className="finish-icon-wrap">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="finish-text-wrap">
                      <h3>Class 0{classData.classNum} Complete!</h3>
                      <p>Great job! Proceed to the next topic: <strong>Class 0{nextClassObj.classNum}: {nextClassObj.topic}</strong></p>
                    </div>
                    <button className="ppt-next-step-btn class-btn" onClick={goToNextClass}>
                      <span>Proceed to Class 0{nextClassObj.classNum}</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                )
              ) : (
                <div className="ppt-finish-class-card course-complete">
                  <div className="finish-icon-wrap">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <div className="finish-text-wrap">
                    <h3>🏆 Entire Foundation Course Completed!</h3>
                    <p>Congratulations! You have completed all classes across all modules of the Foundation Course.</p>
                  </div>
                  <button className="ppt-next-step-btn finish-btn" onClick={onClose}>
                    <span>Return to Dashboard</span>
                    <i className="fas fa-award"></i>
                  </button>
                </div>
              )}
            </div>
          )}

        </main>

        {/* Toast Notification Banner for Module / Class Transitions */}
        {toastMsg && (
          <div className="ppt-transition-toast animate-slide">
            <i className="fas fa-magic"></i>
            <span>{toastMsg}</span>
          </div>
        )}

        {/* BOTTOM NAVIGATION BAR */}
        <footer className="ppt-bottom-bar">
          {/* Previous Button */}
          <button className="nav-arrow-btn prev" onClick={prevSlide} title="Previous Slide (Arrow Left)">
            <i className="fas fa-chevron-left"></i>
            <span>Previous</span>
          </button>

          {/* Slide Indicator Dots */}
          <div className="slide-dots-strip">
            {[...Array(totalSlides)].map((_, idx) => (
              <button
                key={idx}
                className={`dot-btn ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                title={`Jump to Slide ${idx + 1}`}
              >
                <span>{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="slide-counter-badge">
            Slide {currentSlide + 1} of {totalSlides}
          </div>

          {/* Next Button */}
          <button className="nav-arrow-btn next" onClick={nextSlide} title="Next Slide / Proceed (Space or Arrow Right)">
            <span>
              {currentSlide === totalSlides - 1
                ? nextClassObj
                  ? isModuleChangeNext
                    ? `Next Module (Class 0${nextClassObj.classNum})`
                    : `Next Class (Class 0${nextClassObj.classNum})`
                  : 'Finish Course'
                : 'Next Slide'}
            </span>
            <i className="fas fa-chevron-right"></i>
          </button>
        </footer>

      </div>
    </div>
  );
};

export default ClassPresentationModal;
