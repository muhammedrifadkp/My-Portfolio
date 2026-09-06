import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './RegisterStudentModal.css';

const RegisterStudentModal = ({ isOpen, onClose }) => {
  const { registerStudent, userRole } = useAuth();
  
  const [regName, setRegName] = useState('');
  const [regBatch, setRegBatch] = useState('+1');
  const [regPin, setRegPin] = useState('1234');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Strictly Blocked for non-teachers
  if (!isOpen || userRole !== 'teacher') return null;

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regName.trim()) {
      setErrorMsg('Please enter student name.');
      return;
    }

    try {
      setErrorMsg('');
      const created = await registerStudent({
        name: regName,
        batch: regBatch,
        pin: regPin
      });

      setSuccessMsg(`✅ Student "${created.name}" registered successfully to Cloud Database for batch ${created.batch}!`);
      setRegName('');
      setTimeout(() => {
        setSuccessMsg('');
      }, 4000);
    } catch (err) {
      setErrorMsg('Error registering student: ' + err.message);
    }
  };

  return (
    <div className="register-modal-overlay">
      <div className="register-modal-content">
        <button className="register-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="register-modal-header">
          <div className="teacher-only-badge">👨‍🏫 Teacher Admin Panel</div>
          <h2>Register New Student</h2>
          <p>Add students to Sirajul Huda Portal and assign simple PINs.</p>
        </div>

        {errorMsg && <div className="auth-alert error">{errorMsg}</div>}
        {successMsg && <div className="auth-alert success">{successMsg}</div>}

        <form className="auth-form" onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label>Student Full Name</label>
            <input
              type="text"
              placeholder="e.g. Salmanul Faris"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Assigned Batch</label>
            <select value={regBatch} onChange={(e) => setRegBatch(e.target.value)}>
              <option value="+1">+1 (Higher Secondary)</option>
              <option value="+2">+2 (Higher Secondary)</option>
              <option value="degree-1">Degree 1st Year</option>
              <option value="degree-2">Degree 2nd Year</option>
              <option value="degree-3">Degree 3rd Year</option>
              <option value="pg-1">PG 1st Year</option>
              <option value="pg-2">PG 2nd Year</option>
            </select>
          </div>

          <div className="form-group">
            <label>Student Access PIN</label>
            <input
              type="text"
              placeholder="Default: 1234"
              value={regPin}
              onChange={(e) => setRegPin(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-submit-btn register-submit">
            <span>Register & Save Student</span>
            <i className="fas fa-user-plus"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudentModal;
