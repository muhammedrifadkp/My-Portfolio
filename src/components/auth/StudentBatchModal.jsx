import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './StudentBatchModal.css';

const StudentBatchModal = ({ isOpen, onClose, targetBatch, onSuccess }) => {
  const { login } = useAuth();
  const [studentName, setStudentName] = useState('');
  const [studentPin, setStudentPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !targetBatch) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!studentName.trim()) {
      setErrorMsg('Please enter your Student Name.');
      return;
    }

    if (!studentPin.trim()) {
      setErrorMsg('Please enter your 4-digit PIN.');
      return;
    }

    const res = login({
      role: 'student',
      name: studentName.trim(),
      batch: targetBatch.id,
      pin: studentPin.trim()
    });

    if (res.success) {
      setStudentName('');
      setStudentPin('');
      onClose();
      if (onSuccess) onSuccess(targetBatch);
    } else {
      setErrorMsg(res.message || 'Invalid Name or PIN for this batch.');
    }
  };

  return (
    <div className="student-batch-modal-overlay">
      <div className="student-batch-modal-content">
        <button className="student-batch-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="student-batch-modal-header">
          <span className="batch-access-tag">{targetBatch.level}</span>
          <h2>{targetBatch.name} Access</h2>
          <p>Enter your credentials to view {targetBatch.name} syllabus.</p>
        </div>

        {errorMsg && <div className="auth-alert error">{errorMsg}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Student Full Name</label>
            <input
              type="text"
              placeholder="Enter your Full Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Student Password / PIN</label>
            <input
              type="password"
              placeholder="Enter your Password or PIN"
              value={studentPin}
              onChange={(e) => setStudentPin(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn student-submit">
            <span>Unlock {targetBatch.name} Syllabus</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentBatchModal;
