import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterStudentModal from '../components/auth/RegisterStudentModal';
import { BATCH_ORDER } from '../data/syllabusData';
import { Users, Search, Plus, ArrowLeft, ShieldCheck, Key, GraduationCap, BookOpen, Edit3, Trash2, Check, X } from 'lucide-react';
import './RegisteredStudents.css';

const BATCH_DETAILS = {
  '+1': { label: '+1 Batch (Plus One)', icon: 'fas fa-school', badgeColor: '#00F0FF', track: 'Higher Secondary Stream' },
  '+2': { label: '+2 Batch (Plus Two)', icon: 'fas fa-school', badgeColor: '#FF007A', track: 'Higher Secondary Stream' },
  'degree-1': { label: 'Degree 1st Year', icon: 'fas fa-graduation-cap', badgeColor: '#7000FF', track: 'Undergraduate Stream' },
  'degree-2': { label: 'Degree 2nd Year', icon: 'fas fa-graduation-cap', badgeColor: '#3B82F6', track: 'Undergraduate Stream' },
  'degree-3': { label: 'Degree 3rd Year', icon: 'fas fa-graduation-cap', badgeColor: '#10B981', track: 'Undergraduate Stream' },
  'pg-1': { label: 'PG 1st Year', icon: 'fas fa-user-graduate', badgeColor: '#F59E0B', track: 'Postgraduate Stream' },
  'pg-2': { label: 'PG 2nd Year', icon: 'fas fa-user-graduate', badgeColor: '#EC4899', track: 'Postgraduate Stream' }
};

const RegisteredStudents = () => {
  const { studentsList, updateStudent, deleteStudent } = useAuth();
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [visiblePins, setVisiblePins] = useState({});

  // Modals for Edit & Delete
  const [editingStudent, setEditingStudent] = useState(null); // student object or null
  const [deletingStudent, setDeletingStudent] = useState(null); // student object or null
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // Toggle PIN visibility for student
  const togglePinVisibility = (studentId) => {
    setVisiblePins(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingStudent) return;

    try {
      await updateStudent(editingStudent.id, {
        name: editingStudent.name.trim(),
        batch: editingStudent.batch,
        pin: editingStudent.pin.trim()
      });

      setActionSuccessMsg(`Student "${editingStudent.name}" updated successfully!`);
      setEditingStudent(null);
      setTimeout(() => setActionSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to update student:', err);
    }
  };

  // Handle Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!deletingStudent) return;

    try {
      await deleteStudent(deletingStudent.id);
      setActionSuccessMsg(`Student "${deletingStudent.name}" deleted successfully.`);
      setDeletingStudent(null);
      setTimeout(() => setActionSuccessMsg(''), 4000);
    } catch (err) {
      console.error('Failed to delete student:', err);
    }
  };

  // Filter students based on search query and batch tab
  const filteredStudents = useMemo(() => {
    return studentsList.filter(student => {
      const matchBatch = selectedBatchFilter === 'all' || (student.batch || '').toLowerCase() === selectedBatchFilter.toLowerCase();
      const matchSearch = searchQuery.trim() === '' || 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (student.batch || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchBatch && matchSearch;
    });
  }, [studentsList, selectedBatchFilter, searchQuery]);

  // Group filtered students batch by batch
  const groupedByBatch = useMemo(() => {
    const map = {};
    BATCH_ORDER.forEach(bId => { map[bId] = []; });
    
    filteredStudents.forEach(student => {
      const bKey = (student.batch || '+1').toLowerCase();
      if (!map[bKey]) map[bKey] = [];
      map[bKey].push(student);
    });

    return map;
  }, [filteredStudents]);

  return (
    <section className="registered-students-page">
      <div className="registered-students-wrapper">
        
        {/* Top Header & Breadcrumb Navigation */}
        <div className="students-page-header">
          <div className="header-nav-row">
            <Link to="/dashboard" className="back-to-dashboard-btn">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Analytics Dashboard</span>
            </Link>
            
            <Link to="/syllabus" className="syllabus-nav-link">
              <BookOpen className="w-4 h-4" />
              <span>Open Syllabus Portal</span>
            </Link>
          </div>

          <div className="header-title-row">
            <div>
              <span className="inst-badge">
                <ShieldCheck className="w-4 h-4" />
                Sirajul Huda Institutional Student Directory
              </span>
              <h1 className="main-title">Registered Students Database</h1>
              <p className="main-desc">
                Complete student accounts registry grouped batch-by-batch with authentication PIN details, Edit, and Delete controls.
              </p>
            </div>

            <button className="add-student-btn" onClick={() => setIsRegisterModalOpen(true)}>
              <Plus className="w-5 h-5" />
              <span>Register New Student</span>
            </button>
          </div>
        </div>

        {/* Action Success Toast */}
        {actionSuccessMsg && (
          <div className="action-success-toast">
            <Check className="w-5 h-5 text-emerald-500" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="students-controls-card">
          <div className="search-box">
            <Search className="search-icon w-5 h-5" />
            <input
              type="text"
              placeholder="Search student by name or batch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          {/* Batch Filter Tabs */}
          <div className="batch-filter-tabs">
            <button
              className={`filter-tab ${selectedBatchFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedBatchFilter('all')}
            >
              <Users className="w-4 h-4" /> All Batches ({studentsList.length})
            </button>

            {BATCH_ORDER.map(bId => {
              const count = studentsList.filter(s => (s.batch || '').toLowerCase() === bId.toLowerCase()).length;
              return (
                <button
                  key={bId}
                  className={`filter-tab ${selectedBatchFilter === bId ? 'active' : ''}`}
                  onClick={() => setSelectedBatchFilter(bId)}
                >
                  <span>{bId.toUpperCase()}</span>
                  <small className="tab-count-pill">{count}</small>
                </button>
              );
            })}
          </div>
        </div>

        {/* Batch-wise Grouped Student Cards & Tables */}
        <div className="batches-container">
          {BATCH_ORDER.filter(bId => selectedBatchFilter === 'all' || selectedBatchFilter === bId).map(bId => {
            const batchStudents = groupedByBatch[bId] || [];
            const info = BATCH_DETAILS[bId] || { label: bId, track: 'Digital Skills' };

            return (
              <div className="batch-group-card" key={bId}>
                {/* Batch Header */}
                <div className="batch-group-header">
                  <div className="batch-title-left">
                    <span className="batch-icon-badge" style={{ background: info.badgeColor }}>
                      <GraduationCap className="w-5 h-5 text-white" />
                    </span>
                    <div>
                      <h2 className="batch-group-name">{info.label}</h2>
                      <span className="batch-track-subtitle">{info.track}</span>
                    </div>
                  </div>

                  <div className="batch-stats-badge">
                    <Users className="w-4 h-4" />
                    <span>{batchStudents.length} Registered Students</span>
                  </div>
                </div>

                {/* Batch Students Table */}
                {batchStudents.length > 0 ? (
                  <div className="students-table-wrapper">
                    <table className="students-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Student Name</th>
                          <th>Registered Batch</th>
                          <th>Access Password / PIN</th>
                          <th>Account Status</th>
                          <th>Admin Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {batchStudents.map((std, idx) => (
                          <tr key={std.id || idx}>
                            <td className="col-idx">{idx + 1}</td>
                            <td className="col-name">
                              <div className="std-avatar-box">
                                <span className="avatar-initial">{std.name.charAt(0).toUpperCase()}</span>
                                <span className="std-full-name">{std.name}</span>
                              </div>
                            </td>
                            <td className="col-batch">
                              <span className="batch-pill-badge" style={{ borderColor: info.badgeColor, color: info.badgeColor }}>
                                {bId.toUpperCase()}
                              </span>
                            </td>
                            <td className="col-pin">
                              <div className="pin-box">
                                <Key className="w-4 h-4 text-slate-400" />
                                <span className="pin-text">
                                  {visiblePins[std.id] ? (std.pin || '1234') : '••••'}
                                </span>
                                <button
                                  className="toggle-pin-btn"
                                  onClick={() => togglePinVisibility(std.id)}
                                  title="Toggle PIN Visibility"
                                >
                                  {visiblePins[std.id] ? 'Hide' : 'Show'}
                                </button>
                              </div>
                            </td>
                            <td className="col-status">
                              <span className="active-status-chip">
                                <ShieldCheck className="w-3.5 h-3.5" /> Active Student
                              </span>
                            </td>
                            <td className="col-actions">
                              <div className="actions-btn-group">
                                <button
                                  className="action-edit-btn"
                                  onClick={() => setEditingStudent({ ...std })}
                                  title="Edit Student Account"
                                >
                                  <Edit3 className="w-4 h-4" /> Edit
                                </button>
                                <button
                                  className="action-delete-btn"
                                  onClick={() => setDeletingStudent(std)}
                                  title="Delete Student Account"
                                >
                                  <Trash2 className="w-4 h-4" /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="no-students-in-batch">
                    <p>No registered students found for {info.label} matching your search.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Register Student Modal */}
      <RegisterStudentModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="student-edit-modal-overlay">
          <div className="student-edit-card">
            <div className="modal-header-row">
              <h3><Edit3 className="w-5 h-5 text-blue-600" /> Edit Student Account</h3>
              <button className="close-modal-btn" onClick={() => setEditingStudent(null)}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleEditSubmit} className="edit-student-form">
              <div className="input-group">
                <label>Student Full Name</label>
                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label>Registered Batch</label>
                <select
                  value={editingStudent.batch}
                  onChange={(e) => setEditingStudent({ ...editingStudent, batch: e.target.value })}
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
                <label>Password / PIN</label>
                <input
                  type="text"
                  value={editingStudent.pin}
                  onChange={(e) => setEditingStudent({ ...editingStudent, pin: e.target.value })}
                  required
                />
              </div>

              <div className="modal-actions-row">
                <button type="button" className="cancel-btn" onClick={() => setEditingStudent(null)}>Cancel</button>
                <button type="submit" className="save-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingStudent && (
        <div className="student-edit-modal-overlay">
          <div className="student-delete-card">
            <div className="delete-icon-box">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h3>Delete Student Account?</h3>
            <p>
              Are you sure you want to delete student <strong>"{deletingStudent.name}"</strong> ({deletingStudent.batch?.toUpperCase()})? This action cannot be undone.
            </p>

            <div className="modal-actions-row">
              <button type="button" className="cancel-btn" onClick={() => setDeletingStudent(null)}>Cancel</button>
              <button type="button" className="confirm-delete-btn" onClick={handleDeleteConfirm}>Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RegisteredStudents;
