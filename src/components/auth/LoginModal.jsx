import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [teacherPin, setTeacherPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleTeacherLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login({
      role: 'teacher',
      pin: teacherPin
    });

    if (res.success) {
      setTeacherPin('');
      onClose();
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content">
        <button className="login-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="login-modal-header">
          <div className="institution-badge">Sirajul Huda IT Portal</div>
          <h2>IT Sir / Teacher Login</h2>
          <p>Enter Master PIN to unlock Projector Presentation & Management Mode.</p>
        </div>

        {errorMsg && <div className="auth-alert error">{errorMsg}</div>}

        <form className="auth-form" onSubmit={handleTeacherLogin}>
          <div className="teacher-banner">
            <i className="fas fa-projector"></i>
            <div>
              <h4>Projector Presentation Mode</h4>
              <p>Unlocks all batch syllabi, class completion tracking & student administration.</p>
            </div>
          </div>

          <div className="form-group">
            <label>Teacher Master Passcode / PIN</label>
            <input
              type="password"
              placeholder="Enter Master PIN (Default: 1234 or SIRAJ-2026)"
              value={teacherPin}
              onChange={(e) => setTeacherPin(e.target.value)}
              required
              autoFocus
            />
          </div>

          <button type="submit" className="auth-submit-btn teacher-submit">
            <span>Unlock Teacher Projector Mode</span>
            <i className="fas fa-key"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
