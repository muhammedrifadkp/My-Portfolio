import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { batchesData, syllabusStreams, canAccessBatch } from '../data/syllabusData';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/auth/LoginModal';
import RegisterStudentModal from '../components/auth/RegisterStudentModal';
import StudentBatchModal from '../components/auth/StudentBatchModal';
import './Syllabus.css';

const Syllabus = () => {
  const { currentUser, userRole, login, logout, getBatchCompletionStats } = useAuth();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedStream, setSelectedStream] = useState('all');
  const [accessAlert, setAccessAlert] = useState('');

  // Gateway Login Form States
  const [loginRole, setLoginRole] = useState('student'); // 'student' or 'teacher'
  const [studentName, setStudentName] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState('+1');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredBatches = selectedStream === 'all'
    ? batchesData
    : batchesData.filter(b => b.streamId === 'stream-all' || b.streamId === selectedStream);

  // Gateway Form Submission
  const handleGatewaySubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (loginRole === 'student') {
      const res = login({
        role: 'student',
        name: studentName,
        batch: selectedBatchId,
        pin: pin
      });
      if (!res.success) {
        setErrorMsg(res.message);
      }
    } else {
      const res = login({
        role: 'teacher',
        pin: pin
      });
      if (!res.success) {
        setErrorMsg(res.message);
      }
    }
  };

  const handleGuestAccess = () => {
    login({
      role: 'guest',
      batch: selectedBatchId
    });
  };

  // Batch Access Click Handler
  const handleBatchAccess = (batch) => {
    setAccessAlert('');

    // Teacher -> Unrestricted Access for Projector
    if (userRole === 'teacher') {
      navigate(`/syllabus/${encodeURIComponent(batch.slug)}`);
      return;
    }

    // Guest -> Access allowed only for guest-selected batch
    if (userRole === 'guest') {
      if (canAccessBatch(userRole, currentUser?.batch, batch.id)) {
        navigate(`/syllabus/${encodeURIComponent(batch.slug)}`);
        return;
      }
      const selectedBatchName = batchesData.find(b => b.id === currentUser?.batch)?.name || currentUser?.batch?.toUpperCase();
      setAccessAlert(`Access Protected: You are viewing in Guest Mode for ${selectedBatchName} only. Please log in with your Student Name & Password to unlock ${batch.name}.`);
      return;
    }

    // Student -> Check if student can access target batch (Active batch OR Prerequisite batch)
    if (userRole === 'student' && canAccessBatch(userRole, currentUser?.batch, batch.id)) {
      navigate(`/syllabus/${encodeURIComponent(batch.slug)}`);
      return;
    }

    // Attempting to access future batch
    setAccessAlert(`Access Protected: ${batch.name} is a future batch. You currently have access to ${currentUser?.batch?.toUpperCase() || 'your batch'} and prerequisite batches.`);
  };

  return (
    <section className="syllabus-page" ref={containerRef}>
      <div className="syllabus-wrapper">

        {/* 1. UNAUTHENTICATED LANDING GATEWAY */}
        {!currentUser ? (
          <div className="syllabus-login-gateway">
            <div className="gateway-card">
              <div className="gateway-badge">
                <i className="fas fa-shield-alt"></i> Institutional Learning Portal
              </div>
              <h1 className="gateway-title">Sirajul Huda Digital Skills Syllabus</h1>
              <p className="gateway-sub">
                {loginRole === 'student'
                  ? 'Enter your Student Name & Password to unlock your batch syllabus and all prerequisite modules.'
                  : 'Enter IT Sir Master PIN to launch unrestricted projector presentation mode.'}
              </p>

              {/* Role Toggle Switch */}
              <div className="gateway-role-toggle">
                <button
                  type="button"
                  className={`toggle-role-btn ${loginRole === 'student' ? 'active' : ''}`}
                  onClick={() => { setLoginRole('student'); setErrorMsg(''); }}
                >
                  <i className="fas fa-user-graduate"></i> Student Access
                </button>
                <button
                  type="button"
                  className={`toggle-role-btn ${loginRole === 'teacher' ? 'active' : ''}`}
                  onClick={() => { setLoginRole('teacher'); setErrorMsg(''); }}
                >
                  <i className="fas fa-chalkboard-teacher"></i> IT Sir Login
                </button>
              </div>

              {errorMsg && (
                <div className="gateway-error">
                  <i className="fas fa-exclamation-circle"></i> {errorMsg}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleGatewaySubmit} className="gateway-form">
                {loginRole === 'student' ? (
                  <>
                    <div className="input-group">
                      <label><i className="fas fa-user"></i> Student Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Muhammed Rifad"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="input-group">
                      <label><i className="fas fa-graduation-cap"></i> Select Your Registered Batch</label>
                      <select
                        value={selectedBatchId}
                        onChange={(e) => setSelectedBatchId(e.target.value)}
                      >
                        <option value="+1">+1 (Higher Secondary Year 1)</option>
                        <option value="+2">+2 (Higher Secondary Year 2)</option>
                        <option value="degree-1">Degree 1st Year</option>
                        <option value="degree-2">Degree 2nd Year</option>
                        <option value="degree-3">Degree 3rd Year</option>
                        <option value="pg-1">PG 1st Year</option>
                        <option value="pg-2">PG 2nd Year</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label><i className="fas fa-lock"></i> Student Password / PIN</label>
                      <input
                        type="password"
                        placeholder="Enter Password / PIN (Default: 1234)"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="gateway-submit-btn student-submit">
                      <span>Unlock My Syllabus</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>

                    <div className="gateway-guest-divider">
                      <span>OR</span>
                    </div>

                    <button
                      type="button"
                      className="gateway-guest-btn"
                      onClick={handleGuestAccess}
                    >
                      <i className="fas fa-eye"></i>
                      <span>View {batchesData.find(b => b.id === selectedBatchId)?.name || 'Selected Batch'} Syllabus Without Login</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="input-group">
                      <label><i className="fas fa-key"></i> IT Sir Master PIN</label>
                      <input
                        type="password"
                        placeholder="Enter Master PIN (SIRAJ-2026 or 1234)"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="gateway-submit-btn teacher-submit">
                      <span>Launch IT Sir Projector Mode</span>
                      <i className="fas fa-projector"></i>
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        ) : (
          /* 2. AUTHENTICATED SYLLABUS DASHBOARD */
          <>
            {/* User Session Bar */}
            <div className="session-bar">
              <div className={`session-info ${userRole}`}>
                <div className="user-avatar">
                  {userRole === 'teacher' ? '👨‍🏫' : userRole === 'guest' ? '👤' : '👨‍🎓'}
                </div>
                <div className="user-details">
                  <span className="user-name">
                    {userRole === 'guest' ? 'Guest Student' : currentUser.name}
                  </span>
                  <span className="user-role-badge">
                    {userRole === 'teacher'
                      ? 'IT Sir (Projector Presentation Mode - All Batches Unlocked)'
                      : userRole === 'guest'
                      ? `Guest Mode • ${batchesData.find(b => b.id === currentUser?.batch)?.name || currentUser?.batch?.toUpperCase()} Syllabus Only (Login Required for Other Batches)`
                      : `Student • ${currentUser.batch?.toUpperCase()} Batch (Tab Session Active)`}
                  </span>
                </div>
                <div className="teacher-actions">
                  {userRole === 'teacher' && (
                    <button className="register-student-trigger-btn" onClick={() => setIsRegisterModalOpen(true)}>
                      <i className="fas fa-user-plus"></i> Register Student
                    </button>
                  )}
                  <button className="switch-user-btn" onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i> {userRole === 'teacher' ? 'Logout' : userRole === 'guest' ? 'Student Login' : 'Exit Session'}
                  </button>
                </div>
              </div>
            </div>

            {/* Security Alert Toast */}
            {accessAlert && (
              <div className="access-lock-alert">
                <i className="fas fa-shield-alt"></i>
                <span>{accessAlert}</span>
              </div>
            )}

            {/* Top Header Banner */}
            <div className="syllabus-header" ref={headerRef}>
              <span className="section-badge"><i className="fas fa-layer-group"></i> Sirajul Huda Institutional Curriculum</span>
              <h1 className="syllabus-header-title">Stream-wise Digital Skills Syllabus</h1>
              <p className="syllabus-header-desc">
                Standardized, hands-on digital literacy & technology track tailored across Higher Secondary, Undergraduate, and Postgraduate streams.
              </p>
            </div>

            {/* Teacher Projector Controls Banner */}
            {userRole === 'teacher' && (
              <div className="projector-teacher-bar">
                <div className="projector-header">
                  <i className="fas fa-projector"></i>
                  <h3>Projector Teaching & Presentation Mode (Unrestricted Access)</h3>
                </div>
                <p>Quick switch between active batches on your lab projector screen:</p>
                <div className="projector-batch-pills">
                  {batchesData.map(b => (
                    <button key={b.id} onClick={() => handleBatchAccess(b)} className="projector-pill">
                      <span>{b.name}</span>
                      <small>{b.portionBadge}</small>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stream Filter Tabs */}
            <div className="stream-tabs-bar">
              <button
                className={`stream-tab ${selectedStream === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedStream('all')}
              >
                <i className="fas fa-th-large"></i> All Streams
              </button>
              {syllabusStreams.map(stream => (
                <button
                  key={stream.id}
                  className={`stream-tab ${selectedStream === stream.id ? 'active' : ''}`}
                  onClick={() => setSelectedStream(stream.id)}
                >
                  <i className={stream.icon}></i> {stream.streamName}
                </button>
              ))}
            </div>

        {/* Batches Grid */}
        <div className="syllabus-grid">
          {filteredBatches.map((batch) => {
            const isTeacher = userRole === 'teacher';
            const isGuest = userRole === 'guest';
            const isGuestAllowed = isGuest && canAccessBatch(userRole, currentUser?.batch, batch.id);
            const isStudentActiveBatch = userRole === 'student' && currentUser?.batch === batch.id;
            const isPrereqUnlocked = userRole === 'student' && canAccessBatch(userRole, currentUser?.batch, batch.id);
            const stats = getBatchCompletionStats(batch.id, batch.totalClassesCount || 12);

            return (
              <div
                className={`batch-card ${isStudentActiveBatch || isGuestAllowed ? 'active-batch-card' : isPrereqUnlocked ? 'prereq-unlocked-card' : ''}`}
                key={batch.id}
              >
                {/* Header & Badges */}
                <div className="batch-card-header">
                  <span className="batch-level-tag">{batch.level}</span>
                  <div className="batch-badges-row">
                    <span className="portion-tag">{batch.portionBadge}</span>
                    <span className="pacing-tag" style={{ borderColor: batch.pacingBadgeColor, color: batch.pacingBadgeColor }}>
                      {batch.pacingTag}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="batch-card-body">
                  <div className="batch-title-row">
                    <h2 className="batch-name">{batch.name}</h2>
                    {batch.id === 'foundation' ? (
                      <span className="unlocked-prereq-pill" style={{ background: '#10B981', color: '#FFFFFF' }}>
                        <i className="fas fa-globe"></i> Open for All
                      </span>
                    ) : isTeacher ? (
                      <span className="your-batch-pill">Teacher View</span>
                    ) : isGuest ? (
                      isGuestAllowed ? (
                        <span className="unlocked-prereq-pill"><i className="fas fa-eye"></i> Guest Access</span>
                      ) : (
                        <span className="locked-pill"><i className="fas fa-lock"></i> Login Required</span>
                      )
                    ) : isStudentActiveBatch ? (
                      <span className="your-batch-pill">Your Batch</span>
                    ) : isPrereqUnlocked ? (
                      <span className="unlocked-prereq-pill"><i className="fas fa-unlock"></i> Unlocked</span>
                    ) : (
                      <span className="locked-pill"><i className="fas fa-key"></i> Student PIN Required</span>
                    )}
                  </div>

                  <h4 className="batch-subtitle">{batch.subtitle}</h4>
                  <p className="batch-description">{batch.description}</p>

                  <div className="target-modules-info">
                    <i className="fas fa-book-open"></i>
                    <span>{batch.targetModulesText}</span>
                  </div>

                  {/* Batch Progress Bar */}
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Progress:</span>
                      <strong>{stats.completedCount} / {stats.totalCount} Topics ({stats.percentage}%)</strong>
                    </div>
                    <div className="progress-bar-track">
                      <div className="progress-bar-fill" style={{ width: `${stats.percentage}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Footer Link Button */}
                <div className="batch-card-footer">
                  <button
                    onClick={() => handleBatchAccess(batch)}
                    className="view-syllabus-btn"
                  >
                    <span>Open {batch.name} Syllabus</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
          </>
        )}
      </div>

      {/* Teacher-Only Student Registration Modal */}
      <RegisterStudentModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
    </section>
  );
};

export default Syllabus;
