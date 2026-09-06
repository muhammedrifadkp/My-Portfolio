import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBatchBySlug, canAccessBatch } from '../data/syllabusData';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/auth/LoginModal';
import StudentBatchModal from '../components/auth/StudentBatchModal';
import FoundationSyllabus from '../components/syllabus/FoundationSyllabus';
import PlusOneSyllabus from '../components/syllabus/PlusOneSyllabus';
import PlusTwoSyllabus from '../components/syllabus/PlusTwoSyllabus';
import Degree1Syllabus from '../components/syllabus/Degree1Syllabus';
import Degree2Syllabus from '../components/syllabus/Degree2Syllabus';
import Degree3Syllabus from '../components/syllabus/Degree3Syllabus';
import Pg1Syllabus from '../components/syllabus/Pg1Syllabus';
import Pg2Syllabus from '../components/syllabus/Pg2Syllabus';
import './BatchSyllabus.css';

const BatchSyllabus = () => {
  const { batchId } = useParams();
  const { currentUser, userRole } = useAuth();
  const [isTeacherLoginModalOpen, setIsTeacherLoginModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  const decodedBatchId = batchId ? decodeURIComponent(batchId) : '';
  const batch = getBatchBySlug(batchId);
  const batchName = batch ? batch.name : (decodedBatchId || 'Batch');
  const normalizedId = (decodedBatchId || batchId || '').toLowerCase().trim();
  
  const isFoundation = normalizedId === 'foundation' || normalizedId === 'foundation-course';
  const isPlusOne = normalizedId === '+1' || normalizedId === 'plus-1' || normalizedId === 'plus 1';
  const isPlusTwo = normalizedId === '+2' || normalizedId === 'plus-2' || normalizedId === 'plus 2';
  const isDegreeOne = normalizedId === 'degree-1' || normalizedId === 'degree 1';
  const isDegreeTwo = normalizedId === 'degree-2' || normalizedId === 'degree 2';
  const isDegreeThree = normalizedId === 'degree-3' || normalizedId === 'degree 3';
  const isPgOne = normalizedId === 'pg-1' || normalizedId === 'pg 1';
  const isPgTwo = normalizedId === 'pg-2' || normalizedId === 'pg 2';

  // Access Check: Active Batch OR Prerequisite Batch OR Teacher
  const isAccessAllowed = canAccessBatch(userRole, currentUser?.batch, batch?.id);

  return (
    <section className="batch-syllabus-page">
      <div className="batch-syllabus-wrapper">
        
        {/* Top Breadcrumb & User Mode Bar */}
        <div className="syllabus-top-nav-bar">
          <Link to="/syllabus" className="back-link-btn">
            <i className="fas fa-arrow-left"></i> Back to Syllabus
          </Link>

          <div className="batch-user-status">
            {currentUser ? (
              <span className={`role-chip ${userRole}`}>
                {userRole === 'teacher' ? '👨‍🏫 Teacher Projector Mode' : userRole === 'guest' ? '👤 Guest Access' : `👨‍🎓 ${currentUser.name}`}
              </span>
            ) : (
              <button className="mini-login-btn" onClick={() => setIsTeacherLoginModalOpen(true)}>
                <i className="fas fa-key"></i> Teacher Login
              </button>
            )}
          </div>
        </div>

        {/* Portion & Pacing Header Banner (Shown when locked) */}
        {batch && !isAccessAllowed && (
          <div className="batch-portion-banner">
            <div className="batch-banner-left">
              <span className="stream-badge">{batch.level}</span>
              <h2>{batch.name} - Digital Skills Syllabus</h2>
              <p>{batch.subtitle}</p>
            </div>
            <div className="batch-banner-right">
              <div className="portion-chip-lg">{batch.portionBadge}</div>
              <div className="pacing-chip-lg" style={{ borderColor: batch.pacingBadgeColor, color: batch.pacingBadgeColor }}>
                {batch.pacingTag}
              </div>
            </div>
          </div>
        )}

        {/* Strict Gatekeeper Check */}
        {!isAccessAllowed ? (
          <div className="locked-access-card">
            <div className="lock-icon-circle">
              <i className="fas fa-lock"></i>
            </div>
            <h2>{batchName} Access Protected</h2>
            <p>
              This syllabus for <strong>{batchName}</strong> is protected. Please enter your Student Name & Password for {batchName} or login as IT Sir.
            </p>
            <div className="locked-actions-row">
              <button className="unlock-action-btn" onClick={() => setIsStudentModalOpen(true)}>
                <i className="fas fa-user-graduate"></i> Student Login for {batchName}
              </button>
              <button className="unlock-action-btn teacher-btn-alt" onClick={() => setIsTeacherLoginModalOpen(true)}>
                <i className="fas fa-key"></i> IT Sir Login
              </button>
            </div>
          </div>
        ) : (
          /* Active Batch Syllabus Content */
          isFoundation ? (
            <FoundationSyllabus />
          ) : isPlusOne ? (
            <PlusOneSyllabus />
          ) : isPlusTwo ? (
            <PlusTwoSyllabus />
          ) : isDegreeOne ? (
            <Degree1Syllabus />
          ) : isDegreeTwo ? (
            <Degree2Syllabus />
          ) : isDegreeThree ? (
            <Degree3Syllabus />
          ) : isPgOne ? (
            <Pg1Syllabus />
          ) : isPgTwo ? (
            <Pg2Syllabus />
          ) : (
            <div className="batch-syllabus-card">
              <div className="batch-header-block">
                <span className="batch-name-badge">{batchName}</span>
                <h1 className="batch-heading">Digital Skills Syllabus</h1>
                {batch?.subtitle && <p className="batch-subheading">{batch.subtitle}</p>}
              </div>

              <div className="empty-syllabus-area">
                <div className="empty-state-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                <p className="placeholder-text">Syllabus will be added soon.</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Teacher Master Login Modal */}
      <LoginModal isOpen={isTeacherLoginModalOpen} onClose={() => setIsTeacherLoginModalOpen(false)} />

      {/* Batch-Specific Student Access Modal (Name & PIN inputs) */}
      <StudentBatchModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        targetBatch={batch}
      />
    </section>
  );
};

export default BatchSyllabus;
