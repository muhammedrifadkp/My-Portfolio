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
  const [activeDrive, setActiveDrive] = useState('D');
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
      setActiveDrive('D');
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

  const isClass5 = classData.classNum === 5 || classData.id === 'fnd-cls-5';

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
                  <i className="fas fa-arrow-right"></i> {isClass5 ? 'Next slide: Drives & Root Directory' : 'Next slide contains full interactive visual diagram & reference guides'}
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: FULL HIGH-RES VISUAL DIAGRAM / CLASS 05 DRIVES */}
          {currentSlide === 1 && (
            isClass5 ? (
              <div className="ppt-slide slide-class5-drives animate-slide">
                <div className="slide-header-strip">
                  <h2><i className="fas fa-hdd"></i> Drives &amp; Root Directory</h2>
                  <span className="tag-pill">Storage Foundation</span>
                </div>

                <div className="c5-drives-row">
                  <button
                    className={`c5-drive-badge ${activeDrive === 'C' ? 'active drive-c' : ''}`}
                    onClick={() => setActiveDrive('C')}
                    title="Click to view C:\ Drive Root Tree Example"
                  >
                    <div className="c5-drive-icon"><i className="fas fa-hdd"></i></div>
                    <div className="c5-drive-text">
                      <span className="drive-letter">C:\</span>
                      <small>System Drive (OS &amp; Apps)</small>
                    </div>
                    <span className="c5-click-hint-badge">{activeDrive === 'C' ? '✓ Selected' : 'Click to View'}</span>
                  </button>

                  <button
                    className={`c5-drive-badge main ${activeDrive === 'D' ? 'active drive-d' : ''}`}
                    onClick={() => setActiveDrive('D')}
                    title="Click to view D:\ Drive Root Tree Example"
                  >
                    <div className="c5-drive-icon"><i className="fas fa-hard-drive"></i></div>
                    <div className="c5-drive-text">
                      <span className="drive-letter">D:\</span>
                      <small>Data Drive (Work &amp; Storage)</small>
                    </div>
                    <span className="c5-click-hint-badge">{activeDrive === 'D' ? '✓ Selected' : 'Click to View'}</span>
                  </button>
                </div>

                <div className="c5-tree-box">
                  <div className="c5-tree-header">
                    <i className="fas fa-folder-tree"></i> Root Path Visual — <span className="tree-drive-highlight">{activeDrive === 'C' ? 'C:\\ System Drive Example' : 'D:\\ Data Drive Example'}</span>
                  </div>

                  {activeDrive === 'C' ? (
                    <div className="c5-tree-content animate-slide">
                      <div className="tree-node level-0"><i className="fas fa-hdd text-sky"></i> <strong>C:\</strong></div>
                      <div className="tree-node level-1"><span className="branch">└──</span> <i className="fas fa-folder text-amber"></i> Program Files</div>
                      <div className="tree-node level-2"><span className="branch">    └──</span> <i className="fas fa-folder text-amber"></i> Google</div>
                      <div className="tree-node level-3"><span className="branch">        └──</span> <i className="fas fa-folder text-amber"></i> Chrome</div>
                      <div className="tree-node level-4 active-file"><span className="branch">            └──</span> <i className="fas fa-cog text-sky"></i> chrome.exe</div>
                    </div>
                  ) : (
                    <div className="c5-tree-content animate-slide">
                      <div className="tree-node level-0"><i className="fas fa-hard-drive text-emerald"></i> <strong>D:\</strong></div>
                      <div className="tree-node level-1"><span className="branch">└──</span> <i className="fas fa-folder text-amber"></i> Projects</div>
                      <div className="tree-node level-2"><span className="branch">    └──</span> <i className="fas fa-folder text-amber"></i> Website</div>
                      <div className="tree-node level-3"><span className="branch">        └──</span> <i className="fas fa-folder text-amber"></i> Images</div>
                      <div className="tree-node level-4 active-file"><span className="branch">            └──</span> <i className="fas fa-file-image text-cyan"></i> Logo.png</div>
                    </div>
                  )}
                </div>

                <div className="c5-labels-footer">
                  <div className="c5-label-item">
                    <span className="c5-label-title"><i className="fas fa-database"></i> Drive</span>
                    <span className="c5-label-val">= Main storage area</span>
                  </div>
                  <div className="c5-label-item">
                    <span className="c5-label-title"><i className="fas fa-sitemap"></i> Root</span>
                    <span className="c5-label-val">= First / main level</span>
                  </div>
                </div>
              </div>
            ) : (
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
            )
          )}

          {/* SLIDE 3: FOLDER HIERARCHY / TEACHER STEPS */}
          {currentSlide === 2 && (
            isClass5 ? (
              <div className="ppt-slide slide-class5-hierarchy animate-slide">
                <div className="slide-header-strip">
                  <h2><i className="fas fa-sitemap"></i> Folder Hierarchy</h2>
                  <span className="tag-pill">Directory Structure</span>
                </div>

                <div className="c5-tree-box hierarchy">
                  <div className="c5-tree-header">
                    <i className="fas fa-folder-tree"></i> Clear Folder Tree
                  </div>
                  <div className="c5-tree-content">
                    <div className="tree-node level-0"><i className="fas fa-hard-drive text-emerald"></i> <strong>D:\</strong></div>
                    <div className="tree-node level-1"><span className="branch">└──</span> <i className="fas fa-folder text-amber"></i> Projects</div>
                    <div className="tree-node level-2"><span className="branch">    └──</span> <i className="fas fa-folder-open text-amber"></i> Website</div>
                    <div className="tree-node level-3"><span className="branch">        ├──</span> <i className="fas fa-folder text-sky"></i> Design</div>
                    <div className="tree-node level-3"><span className="branch">        ├──</span> <i className="fas fa-folder text-sky"></i> Images</div>
                    <div className="tree-node level-3"><span className="branch">        ├──</span> <i className="fas fa-folder text-sky"></i> Documents</div>
                    <div className="tree-node level-3"><span className="branch">        └──</span> <i className="fas fa-folder text-sky"></i> Final</div>
                  </div>
                </div>

                <div className="c5-flow-bar">
                  <span className="flow-pill"><i className="fas fa-hard-drive"></i> Drive</span>
                  <i className="fas fa-chevron-right flow-arrow"></i>
                  <span className="flow-pill"><i className="fas fa-folder"></i> Folder</span>
                  <i className="fas fa-chevron-right flow-arrow"></i>
                  <span className="flow-pill"><i className="fas fa-folder-open"></i> Subfolder</span>
                  <i className="fas fa-chevron-right flow-arrow"></i>
                  <span className="flow-pill highlight"><i className="fas fa-file"></i> File</span>
                </div>
              </div>
            ) : (
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
            )
          )}

          {/* SLIDE 4: COPY VS CUT / STUDENT PRACTICE */}
          {currentSlide === 3 && (
            isClass5 ? (
              <div className="ppt-slide slide-class5-copycut animate-slide">
                <div className="slide-header-strip">
                  <h2><i className="fas fa-exchange-alt"></i> Copy vs Cut</h2>
                  <span className="tag-pill">File Operations</span>
                </div>

                <div className="c5-copycut-grid">
                  {/* COPY Card */}
                  <div className="c5-copycut-card copy">
                    <div className="c5-card-header">
                      <span className="c5-card-emoji">📋</span>
                      <h3>COPY</h3>
                    </div>
                    <p className="c5-card-desc">Original stays in place</p>
                    <div className="c5-shortcut-badge">
                      <kbd>Ctrl</kbd> + <kbd>C</kbd> <i className="fas fa-arrow-right"></i> <kbd>Ctrl</kbd> + <kbd>V</kbd>
                    </div>
                    <div className="c5-anim-box copy-anim-box">
                      <div className="c5-file src">📄 File</div>
                      <div className="c5-anim-icon"><i className="fas fa-copy pulse-icon"></i></div>
                      <div className="c5-file dup">📄 File (Copy)</div>
                    </div>
                  </div>

                  {/* CUT Card */}
                  <div className="c5-copycut-card cut">
                    <div className="c5-card-header">
                      <span className="c5-card-emoji">✂️</span>
                      <h3>CUT</h3>
                    </div>
                    <p className="c5-card-desc">File moves to new location</p>
                    <div className="c5-shortcut-badge">
                      <kbd>Ctrl</kbd> + <kbd>X</kbd> <i className="fas fa-arrow-right"></i> <kbd>Ctrl</kbd> + <kbd>V</kbd>
                    </div>
                    <div className="c5-anim-box cut-anim-box">
                      <div className="c5-folder src">📁 Folder A</div>
                      <div className="c5-anim-icon"><i className="fas fa-long-arrow-alt-right move-icon"></i></div>
                      <div className="c5-folder dest">📁 Folder B</div>
                    </div>
                  </div>
                </div>

                <div className="c5-copycut-footer">
                  <span className="footer-pill copy">COPY = Duplicate</span>
                  <span className="footer-sep">•</span>
                  <span className="footer-pill cut">CUT = Move</span>
                </div>
              </div>
            ) : (
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
            )
          )}

          {/* SLIDE 5: PROFESSIONAL FILE NAMING / SUMMARY */}
          {currentSlide === 4 && (
            isClass5 ? (
              <div className="ppt-slide slide-class5-naming animate-slide">
                <div className="slide-header-strip">
                  <h2><i className="fas fa-pen-nib"></i> Professional File Naming</h2>
                  <span className="tag-pill">Best Practices</span>
                </div>

                <div className="c5-naming-grid">
                  {/* BAD */}
                  <div className="c5-naming-box bad">
                    <div className="c5-box-title bad-text">
                      <i className="fas fa-times-circle"></i> BAD
                    </div>
                    <div className="c5-file-list">
                      <div className="c5-file-item bad-item"><i className="fas fa-file"></i> final.pdf</div>
                      <div className="c5-file-item bad-item"><i className="fas fa-file"></i> final2.pdf</div>
                      <div className="c5-file-item bad-item"><i className="fas fa-file"></i> newfinal.pdf</div>
                      <div className="c5-file-item bad-item"><i className="fas fa-file"></i> final_final.pdf</div>
                    </div>
                  </div>

                  <div className="c5-naming-arrow">
                    <i className="fas fa-arrow-down-long text-amber"></i>
                  </div>

                  {/* GOOD */}
                  <div className="c5-naming-box good">
                    <div className="c5-box-title good-text">
                      <i className="fas fa-check-circle"></i> GOOD
                    </div>
                    <div className="c5-file-list">
                      <div className="c5-file-item good-item"><i className="fas fa-file-pdf"></i> Website_v01.pdf</div>
                      <div className="c5-file-item good-item"><i className="fas fa-file-pdf"></i> Website_v02.pdf</div>
                      <div className="c5-file-item good-item"><i className="fas fa-file-word"></i> Meeting_Notes_2026-09-14.docx</div>
                    </div>
                  </div>
                </div>

                <div className="c5-rules-row">
                  <span className="c5-rule-tag"><i className="fas fa-check"></i> Clear name</span>
                  <span className="c5-rule-tag"><i className="fas fa-check"></i> Use version numbers</span>
                  <span className="c5-rule-tag"><i className="fas fa-check"></i> Use date when useful</span>
                </div>

                <div className="c5-naming-footer">
                  Clear + Consistent + Easy to Find
                </div>

                {/* Class / Module Completion Button */}
                {nextClassObj && (
                  <div className="c5-finish-nav">
                    <button className="ppt-next-step-btn class-btn" onClick={goToNextClass}>
                      <span>Proceed to Class 0{nextClassObj.classNum}: {nextClassObj.topic}</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                )}
              </div>
            ) : (
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
            )
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
