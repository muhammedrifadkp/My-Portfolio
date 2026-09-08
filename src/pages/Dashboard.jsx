import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Users,
  BookOpen,
  Award,
  Target,
  Sparkles,
  Search,
  Filter,
  RotateCcw,
  RefreshCw,
  SlidersHorizontal,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  UserCheck,
  UserX,
  Plus,
  Edit3,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  TrendingUp,
  Activity,
  ChevronRight,
  GraduationCap,
  Lock,
  Key,
  Monitor
} from 'lucide-react';
import { useAuth, syncAttendanceOverrideToCloud } from '../context/AuthContext';
import RegisterStudentModal from '../components/auth/RegisterStudentModal';
import { BATCH_ORDER } from '../data/syllabusData';
import './Dashboard.css';

const SCRIPT_URL = import.meta.env.VITE_SURVEY_SCRIPT_URL || '';

// Color palette for charts
const COLORS = ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fbbf24', '#a78bfa', '#f87171', '#3861fb'];
const ATTENDANCE_COLORS = {
  PRESENT: '#10B981',
  ABSENT: '#EF4444',
  LATE: '#F59E0B'
};

const BATCH_DETAILS = {
  '+1': { label: '+1 Batch (Plus One)', icon: 'fas fa-school', badgeColor: '#00F0FF', track: 'Higher Secondary Stream' },
  '+2': { label: '+2 Batch (Plus Two)', icon: 'fas fa-school', badgeColor: '#FF007A', track: 'Higher Secondary Stream' },
  'degree-1': { label: 'Degree 1st Year', icon: 'fas fa-graduation-cap', badgeColor: '#7000FF', track: 'Undergraduate Stream' },
  'degree-2': { label: 'Degree 2nd Year', icon: 'fas fa-graduation-cap', badgeColor: '#3B82F6', track: 'Undergraduate Stream' },
  'degree-3': { label: 'Degree 3rd Year', icon: 'fas fa-graduation-cap', badgeColor: '#10B981', track: 'Undergraduate Stream' },
  'pg-1': { label: 'PG 1st Year', icon: 'fas fa-user-graduate', badgeColor: '#F59E0B', track: 'Postgraduate Stream' },
  'pg-2': { label: 'PG 2nd Year', icon: 'fas fa-user-graduate', badgeColor: '#EC4899', track: 'Postgraduate Stream' }
};

// ----------------------------------------------------
// IT LAB TIMETABLE CONSTANTS & PRESETS
// ----------------------------------------------------
const LAB_DAYS = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];

const LAB_TIME_SLOTS = [
  '6:30 - 7:00',
  '7:00 - 7:50',
  '7:50 - 8:40',
  '8:40 - 9:30',
  '9:30 - 10:20',
  '10:20 - 11:10',
  '11:10 - 12:00',
  '1:30 - 2:10',
  '3:00 - 3:50'
];

const LAB_BATCHES_LIST = [
  { id: 'HS-1 A', label: 'HS-1 A', title: 'Plus One A', colorClass: 'badge-hs1a' },
  { id: 'HS-1 B', label: 'HS-1 B', title: 'Plus One B', colorClass: 'badge-hs1b' },
  { id: 'HS-2 A', label: 'HS-2 A', title: 'Plus Two A', colorClass: 'badge-hs2a' },
  { id: 'HS-2 B', label: 'HS-2 B', title: 'Plus Two B', colorClass: 'badge-hs2b' },
  { id: 'DG-1 A', label: 'DG-1 A', title: 'Degree 1st Yr A', colorClass: 'badge-dg1a' },
  { id: 'DG-1 B', label: 'DG-1 B', title: 'Degree 1st Yr B', colorClass: 'badge-dg1b' },
  { id: 'DG-2 A', label: 'DG-2 A', title: 'Degree 2nd Yr A', colorClass: 'badge-dg2a' },
  { id: 'DG-2 B', label: 'DG-2 B', title: 'Degree 2nd Yr B', colorClass: 'badge-dg2b' },
  { id: 'DG-3 A', label: 'DG-3 A', title: 'Degree 3rd Yr A', colorClass: 'badge-dg3a' },
  { id: 'DG-3 B', label: 'DG-3 B', title: 'Degree 3rd Yr B', colorClass: 'badge-dg3b' },
  { id: 'PG-1 A', label: 'PG-1 A', title: 'PG 1st Yr A', colorClass: 'badge-pg1a' },
  { id: 'PG-1 B', label: 'PG-1 B', title: 'PG 1st Yr B', colorClass: 'badge-pg1b' },
  { id: 'PG-2 A', label: 'PG-2 A', title: 'PG 2nd Yr A', colorClass: 'badge-pg2a' },
  { id: 'PG-2 B', label: 'PG-2 B', title: 'PG 2nd Yr B', colorClass: 'badge-pg2b' }
];

const SAMPLE_TIMETABLE_PRESET = {
  'SAT-1': 'HS-1 A', 'SAT-3': 'HS-1 A', 'SAT-4': 'DG-1 A', 'SAT-6': 'HS-2 A', 'SAT-7': 'DG-2 A',
  'SUN-1': 'HS-1 A', 'SUN-3': 'HS-2 A', 'SUN-4': 'DG-1 A', 'SUN-6': 'HS-2 A', 'SUN-7': 'DG-2 A',
  'MON-1': 'HS-1 A', 'MON-3': 'HS-1 A', 'MON-4': 'DG-1 A', 'MON-6': 'HS-2 A',
  'TUE-3': 'DG-1 B', 'TUE-4': 'HS-1 B', 'TUE-5': 'HS-2 B', 'TUE-6': 'PG-2 A',
  'WED-3': 'DG-1 B', 'WED-4': 'HS-1 B', 'WED-5': 'HS-2 B', 'WED-6': 'PG-2 A',
  'THU-3': 'DG-1 B', 'THU-4': 'HS-1 B', 'THU-5': 'HS-2 B', 'THU-6': 'PG-2 B'
};

const Dashboard = ({ initialTab }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { studentsList, updateStudent, deleteStudent, userRole, login, logout } = useAuth();

  // Teacher Lock Screen Input State
  const [teacherPinInput, setTeacherPinInput] = useState('');
  const [authErrorMsg, setAuthErrorMsg] = useState('');

  const handleTeacherPinSubmit = (e) => {
    e.preventDefault();
    if (!teacherPinInput.trim()) {
      setAuthErrorMsg('Please enter Teacher Master PIN.');
      return;
    }
    const res = login({ role: 'teacher', pin: teacherPinInput.trim() });
    if (res.success) {
      setAuthErrorMsg('');
      setTeacherPinInput('');
    } else {
      setAuthErrorMsg(res.message || 'Invalid Teacher Master PIN.');
    }
  };

  // Active Tab: 'overview' | 'students' | 'attendance' | 'survey' | 'progress'
  const [activeTab, setActiveTab] = useState(() => {
    if (initialTab) return initialTab;
    const tabParam = searchParams.get('tab');
    return tabParam || 'overview';
  });

  // Sync tab with URL search params
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  // Clock state
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Toast message state
  const [actionToast, setActionToast] = useState('');
  const showToast = (msg) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(''), 4000);
  };

  // ----------------------------------------------------
  // 1. REGISTERED STUDENTS STATE & HANDLERS
  // ----------------------------------------------------
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('all');
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [visiblePins, setVisiblePins] = useState({});
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  const togglePinVisibility = (studentId) => {
    setVisiblePins((prev) => ({ ...prev, [studentId]: !prev[studentId] }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingStudent) return;
    try {
      await updateStudent(editingStudent.id, {
        name: editingStudent.name.trim(),
        batch: editingStudent.batch,
        pin: editingStudent.pin.trim()
      });
      showToast(`Student "${editingStudent.name}" updated successfully!`);
      setEditingStudent(null);
    } catch (err) {
      console.error('Failed to update student:', err);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingStudent) return;
    try {
      await deleteStudent(deletingStudent.id);
      showToast(`Student "${deletingStudent.name}" deleted successfully.`);
      setDeletingStudent(null);
    } catch (err) {
      console.error('Failed to delete student:', err);
    }
  };

  const filteredStudents = useMemo(() => {
    return studentsList.filter((student) => {
      const matchBatch =
        selectedBatchFilter === 'all' ||
        (student.batch || '').toLowerCase() === selectedBatchFilter.toLowerCase();
      const matchSearch =
        studentSearchQuery.trim() === '' ||
        student.name.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
        (student.batch || '').toLowerCase().includes(studentSearchQuery.toLowerCase());
      return matchBatch && matchSearch;
    });
  }, [studentsList, selectedBatchFilter, studentSearchQuery]);

  const groupedStudentsByBatch = useMemo(() => {
    const map = {};
    BATCH_ORDER.forEach((bId) => {
      map[bId] = [];
    });
    filteredStudents.forEach((student) => {
      const bKey = (student.batch || '+1').toLowerCase();
      if (!map[bKey]) map[bKey] = [];
      map[bKey].push(student);
    });
    return map;
  }, [filteredStudents]);

  // ----------------------------------------------------
  // 2. REAL-TIME ATTENDANCE TRACKER STATE & ENGINE
  // ----------------------------------------------------
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState(todayStr);
  const [attendanceSearch, setAttendanceSearch] = useState('');
  const [attendanceBatchFilter, setAttendanceBatchFilter] = useState('all');
  const [attendanceStatusFilter, setAttendanceStatusFilter] = useState('all');

  // Attendance Overrides state: { [dateYYYYMMDD]: { [studentId]: 'PRESENT' | 'ABSENT' | 'LATE' } }
  const [attendanceOverrides, setAttendanceOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('sh_attendance_overrides');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sh_attendance_overrides', JSON.stringify(attendanceOverrides));
      syncAttendanceOverrideToCloud(attendanceOverrides);
    } catch (e) {
      console.error('Failed to save attendance overrides:', e);
    }
  }, [attendanceOverrides]);

  // Read auto-attendance logs: { [dateYYYYMMDD]: { [studentKey]: { timestamp, activity, batch, name } } }
  const attendanceAutoLogs = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('sh_attendance_logs') || '{}');
    } catch (e) {
      return {};
    }
  }, [currentTime]); // re-evaluates periodically

  // Compute roster for selected date
  const attendanceRoster = useMemo(() => {
    const dateLogs = attendanceAutoLogs[selectedAttendanceDate] || {};
    const dateOverrides = attendanceOverrides[selectedAttendanceDate] || {};

    return studentsList.map((student) => {
      const key = student.id || student.name.toLowerCase().trim();
      const autoLog = dateLogs[key] || dateLogs[student.name.toLowerCase().trim()];
      const override = dateOverrides[student.id] || dateOverrides[key];

      let finalStatus = 'ABSENT';
      let sourceLabel = 'Not Logged';

      if (override) {
        finalStatus = override;
        sourceLabel = 'Teacher Manual';
      } else if (autoLog) {
        finalStatus = 'PRESENT';
        sourceLabel = `Auto: ${autoLog.activity} (${autoLog.timestamp})`;
      }

      return {
        id: student.id,
        name: student.name,
        batch: student.batch || '+1',
        pin: student.pin,
        status: finalStatus,
        sourceLabel,
        hasAutoLog: !!autoLog,
        autoTime: autoLog?.timestamp || null
      };
    });
  }, [studentsList, selectedAttendanceDate, attendanceAutoLogs, attendanceOverrides]);

  // Filtered Attendance List
  const filteredAttendanceRoster = useMemo(() => {
    return attendanceRoster.filter((item) => {
      const matchBatch =
        attendanceBatchFilter === 'all' || item.batch.toLowerCase() === attendanceBatchFilter.toLowerCase();
      const matchStatus =
        attendanceStatusFilter === 'all' || item.status.toLowerCase() === attendanceStatusFilter.toLowerCase();
      const matchSearch =
        attendanceSearch.trim() === '' ||
        item.name.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
        item.batch.toLowerCase().includes(attendanceSearch.toLowerCase());
      return matchBatch && matchStatus && matchSearch;
    });
  }, [attendanceRoster, attendanceBatchFilter, attendanceStatusFilter, attendanceSearch]);

  // Attendance Metrics for selected date
  const attendanceMetrics = useMemo(() => {
    const total = attendanceRoster.length;
    let present = 0;
    let absent = 0;
    let late = 0;

    attendanceRoster.forEach((r) => {
      if (r.status === 'PRESENT') present++;
      else if (r.status === 'LATE') late++;
      else absent++;
    });

    const rate = total > 0 ? Math.round(((present + late) / total) * 100) : 0;

    return { total, present, absent, late, rate };
  }, [attendanceRoster]);

  // Attendance Actions
  const handleSetStudentAttendance = (studentId, status) => {
    setAttendanceOverrides((prev) => ({
      ...prev,
      [selectedAttendanceDate]: {
        ...(prev[selectedAttendanceDate] || {}),
        [studentId]: status
      }
    }));
    showToast(`Attendance updated for student.`);
  };

  const handleMarkAllPresent = () => {
    const newDateOverrides = {};
    studentsList.forEach((s) => {
      newDateOverrides[s.id] = 'PRESENT';
    });
    setAttendanceOverrides((prev) => ({
      ...prev,
      [selectedAttendanceDate]: newDateOverrides
    }));
    showToast(`Marked all ${studentsList.length} students PRESENT for ${selectedAttendanceDate}!`);
  };

  const handleMarkAllAbsent = () => {
    const newDateOverrides = {};
    studentsList.forEach((s) => {
      newDateOverrides[s.id] = 'ABSENT';
    });
    setAttendanceOverrides((prev) => ({
      ...prev,
      [selectedAttendanceDate]: newDateOverrides
    }));
    showToast(`Marked all students ABSENT for ${selectedAttendanceDate}.`);
  };

  const handleResetAttendanceOverrides = () => {
    setAttendanceOverrides((prev) => {
      const copy = { ...prev };
      delete copy[selectedAttendanceDate];
      return copy;
    });
    showToast(`Reset attendance to auto-logs for ${selectedAttendanceDate}.`);
  };

  // ----------------------------------------------------
  // 3. SURVEY DATA STATE & FETCHING
  // ----------------------------------------------------
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [surveyLoading, setSurveyLoading] = useState(true);
  const [surveyError, setSurveyError] = useState(null);

  // Survey Filters
  const [surveyCourseFilter, setSurveyCourseFilter] = useState('All');
  const [surveySkillFilter, setSurveySkillFilter] = useState('All');
  const [surveySearchQuery, setSurveySearchQuery] = useState('');

  const fetchSurveyData = useCallback(async () => {
    setSurveyLoading(true);
    setSurveyError(null);
    try {
      let rawData = [];
      if (SCRIPT_URL && SCRIPT_URL.trim() !== '') {
        const response = await fetch(SCRIPT_URL.trim(), { method: 'GET' });
        if (response.ok) {
          const json = await response.json();
          if (json.status === 'success' && Array.isArray(json.data)) {
            rawData = json.data;
          } else if (Array.isArray(json)) {
            rawData = json;
          }
        }
      }

      if (!rawData || rawData.length === 0) {
        const localData = JSON.parse(localStorage.getItem('student_surveys') || '[]');
        if (localData.length > 0) rawData = localData;
      }

      if (!rawData || rawData.length === 0) {
        setSurveyResponses([]);
        setSurveyError('No survey responses recorded yet.');
      } else {
        const normalized = rawData.map((item, index) => ({
          id: item.id || `srv-${index + 1}`,
          fullName: item.fullName || item.name || item.FullName || `Student ${index + 1}`,
          course: item.course || item.Course || '+1',
          division: item.division || item.Division || 'A',
          skillLevel: item.skillLevel || item.SkillLevel || 'Beginner',
          interestedSkill: item.interestedSkill || item.InterestedSkill || 'Coding',
          mainGoal: item.mainGoal || item.MainGoal || 'IT Skills Mastery',
          submittedAt: item.timestamp || item.submittedAt || new Date().toLocaleDateString()
        }));
        setSurveyResponses(normalized);
      }
    } catch (err) {
      console.error('Failed to fetch survey responses:', err);
      setSurveyError('Error loading survey responses from Google Sheet.');
    } finally {
      setSurveyLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSurveyData();
  }, [fetchSurveyData]);

  const filteredSurveyResponses = useMemo(() => {
    return surveyResponses.filter((item) => {
      const matchCourse = surveyCourseFilter === 'All' || item.course === surveyCourseFilter;
      const matchSkill = surveySkillFilter === 'All' || item.skillLevel === surveySkillFilter;
      const matchSearch =
        surveySearchQuery.trim() === '' ||
        item.fullName.toLowerCase().includes(surveySearchQuery.toLowerCase()) ||
        item.course.toLowerCase().includes(surveySearchQuery.toLowerCase());
      return matchCourse && matchSkill && matchSearch;
    });
  }, [surveyResponses, surveyCourseFilter, surveySkillFilter, surveySearchQuery]);

  // Chart data for survey
  const surveySkillChartData = useMemo(() => {
    const counts = {};
    surveyResponses.forEach((r) => {
      const level = r.skillLevel || 'Beginner';
      counts[level] = (counts[level] || 0) + 1;
    });
    return Object.keys(counts).map((key) => ({ name: key, count: counts[key] }));
  }, [surveyResponses]);

  // PDF Export for Survey & Attendance
  const exportAttendancePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text(`Sirajul Huda Student Attendance Report`, 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Date: ${selectedAttendanceDate} | Total Enrolled: ${attendanceMetrics.total} | Present: ${attendanceMetrics.present} | Absent: ${attendanceMetrics.absent} | Rate: ${attendanceMetrics.rate}%`, 14, 28);

    const tableData = filteredAttendanceRoster.map((r, i) => [
      i + 1,
      r.name,
      r.batch.toUpperCase(),
      r.status,
      r.sourceLabel
    ]);

    autoTable(doc, {
      startY: 35,
      head: [['#', 'Student Name', 'Batch', 'Status', 'Log Source']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] }
    });

    doc.save(`Attendance_Report_${selectedAttendanceDate}.pdf`);
  };

  const exportSurveyCSV = () => {
    const headers = ['Full Name', 'Course/Batch', 'Division', 'Current Skill Level', 'Interested Skill', 'Main Goal'];
    const rows = filteredSurveyResponses.map((r) => [
      `"${r.fullName}"`,
      `"${r.course}"`,
      `"${r.division}"`,
      `"${r.skillLevel}"`,
      `"${r.interestedSkill}"`,
      `"${r.mainGoal}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Student_Survey_Responses.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Enrolled Students Chart Data
  const streamEnrolledChartData = useMemo(() => {
    const map = { '+1': 0, '+2': 0, 'Degree 1st': 0, 'Degree 2nd': 0, 'Degree 3rd': 0, 'PG': 0 };
    studentsList.forEach((s) => {
      const b = (s.batch || '+1').toLowerCase();
      if (b === '+1') map['+1']++;
      else if (b === '+2') map['+2']++;
      else if (b === 'degree-1') map['Degree 1st']++;
      else if (b === 'degree-2') map['Degree 2nd']++;
      else if (b === 'degree-3') map['Degree 3rd']++;
      else map['PG']++;
    });
    return Object.keys(map).map((k) => ({ name: k, Students: map[k] }));
  }, [studentsList]);

  const attendancePieChartData = useMemo(() => {
    return [
      { name: 'Present', value: attendanceMetrics.present, color: ATTENDANCE_COLORS.PRESENT },
      { name: 'Absent', value: attendanceMetrics.absent, color: ATTENDANCE_COLORS.ABSENT },
      { name: 'Late', value: attendanceMetrics.late, color: ATTENDANCE_COLORS.LATE }
    ].filter((d) => d.value > 0);
  }, [attendanceMetrics]);

  // ----------------------------------------------------
  // 4. IT LAB PERIOD TIMETABLE STATE & ENGINE
  // ----------------------------------------------------
  const [timetableSchedule, setTimetableSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem('sh_lab_timetable_schedule');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sh_lab_timetable_schedule', JSON.stringify(timetableSchedule));
    } catch (e) {
      console.error('Failed to save timetable schedule:', e);
    }
  }, [timetableSchedule]);

  const [activeDragBatch, setActiveDragBatch] = useState(null);
  const [clickSelectedBatch, setClickSelectedBatch] = useState(null);
  const [dragOverSlotKey, setDragOverSlotKey] = useState(null);

  const handleSlotDrop = (day, slotIdx) => {
    if (day === 'FRI') {
      showToast('Friday is Holiday! Period allocation disabled.');
      setDragOverSlotKey(null);
      return;
    }
    const batchToAssign = activeDragBatch || clickSelectedBatch;
    if (!batchToAssign) return;

    const slotKey = `${day}-${slotIdx}`;
    setTimetableSchedule((prev) => ({
      ...prev,
      [slotKey]: batchToAssign
    }));
    showToast(`Assigned ${batchToAssign} to ${day} (${LAB_TIME_SLOTS[slotIdx]})`);
    setDragOverSlotKey(null);
  };

  const handleSlotClick = (day, slotIdx) => {
    if (day === 'FRI') {
      showToast('Friday is Holiday! Period allocation disabled.');
      return;
    }
    const slotKey = `${day}-${slotIdx}`;
    if (clickSelectedBatch) {
      setTimetableSchedule((prev) => ({
        ...prev,
        [slotKey]: clickSelectedBatch
      }));
      showToast(`Assigned ${clickSelectedBatch} to ${day} (${LAB_TIME_SLOTS[slotIdx]})`);
    } else if (timetableSchedule[slotKey]) {
      const copy = { ...timetableSchedule };
      delete copy[slotKey];
      setTimetableSchedule(copy);
      showToast(`Cleared period at ${day} (${LAB_TIME_SLOTS[slotIdx]})`);
    }
  };

  const handleClearSlot = (e, slotKey) => {
    e.stopPropagation();
    setTimetableSchedule((prev) => {
      const copy = { ...prev };
      delete copy[slotKey];
      return copy;
    });
    showToast('Period slot cleared.');
  };

  const handleResetTimetable = () => {
    setTimetableSchedule({});
    setClickSelectedBatch(null);
    showToast('All timetable slots reset to free.');
  };

  const handleLoadSampleTimetable = () => {
    setTimetableSchedule(SAMPLE_TIMETABLE_PRESET);
    showToast('Sample IT Lab timetable loaded successfully!');
  };

  const exportTimetablePDF = () => {
    const doc = new jsPDF('landscape');
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text('IT LAB - Batch Schedule (Timetable 2024 - 2025)', 14, 18);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Sirajul Huda Educational Complex • IT Infrastructure Management', 14, 25);

    const headers = ['DAYS', ...LAB_TIME_SLOTS];
    const rows = LAB_DAYS.map((day) => {
      if (day === 'FRI') return [day, ...LAB_TIME_SLOTS.map(() => 'FRIDAY OFF')];
      return [
        day,
        ...LAB_TIME_SLOTS.map((_, sIdx) => timetableSchedule[`${day}-${sIdx}`] || '-')
      ];
    });

    autoTable(doc, {
      startY: 30,
      head: [headers],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255] },
      styles: { fontSize: 8, halign: 'center' }
    });

    doc.save(`IT_Lab_Timetable_Schedule.pdf`);
  };

  if (userRole !== 'teacher') {
    return (
      <div className="master-dashboard-container flex items-center justify-center min-h-screen">
        <div className="teacher-auth-lock-card">
          <div className="auth-lock-icon-box">
            <ShieldCheck className="w-10 h-10 text-emerald-400" />
          </div>

          <span className="auth-lock-badge">
            👨‍🏫 TEACHER ADMIN AUTHORIZATION REQUIRED
          </span>

          <h2 className="auth-lock-title">Protected Master Dashboard</h2>
          <p className="auth-lock-desc">
            Access to student directory, automated attendance tracking, and survey analytics is restricted to IT Instructors.
          </p>

          {authErrorMsg && (
            <div className="auth-error-banner">
              <AlertCircle className="w-4 h-4" />
              <span>{authErrorMsg}</span>
            </div>
          )}

          <form onSubmit={handleTeacherPinSubmit} className="teacher-pin-form">
            <div className="pin-input-box">
              <Key className="pin-icon w-5 h-5 text-cyan-400" />
              <input
                type="password"
                placeholder="Enter PIN"
                value={teacherPinInput}
                onChange={(e) => setTeacherPinInput(e.target.value)}
                autoFocus
              />
            </div>

            <button type="submit" className="unlock-dashboard-btn">
              <span>Unlock Master Dashboard</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>

          <div className="auth-lock-footer-info">
            <span>Sirajul Huda Security Protocol</span>
            <Link to="/syllabus" className="back-to-site-link">
              ← Return to Syllabus Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="master-dashboard-container">
      <div className="master-dashboard-wrapper">
        
        {/* TOP HEADER & INSTITUTIONAL BRANDING */}
        <header className="dashboard-top-header">
          <div className="header-left-box">
            <span className="inst-tag-pill">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Sirajul Huda Educational Complex • IT Portal
            </span>
            <h1 className="dashboard-title">Institutional Management Dashboard</h1>
            <p className="dashboard-sub-title">
              Real-time student directory, automated attendance engine, survey analytics &amp; syllabus monitoring.
            </p>
          </div>

          <div className="header-right-box">
            <div className="live-clock-card">
              <Clock className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="time-digit">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
                <span className="time-date">{currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            <button className="primary-action-btn" onClick={() => setIsRegisterModalOpen(true)}>
              <Plus className="w-4 h-4" />
              <span>Register Student</span>
            </button>

            <button className="secondary-action-btn lock-btn" onClick={logout} title="Lock Teacher Session">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Lock Session</span>
            </button>
          </div>
        </header>

        {/* Action Success Toast */}
        {actionToast && (
          <div className="dashboard-toast-banner">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{actionToast}</span>
          </div>
        )}

        {/* MASTER NAVIGATION TABS BAR */}
        <nav className="dashboard-tabs-nav">
          <button
            className={`tab-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            <Activity className="w-4 h-4" />
            <span>Master Overview</span>
          </button>

          <button
            className={`tab-nav-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => handleTabChange('students')}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Registered Students ({studentsList.length})</span>
          </button>

          <button
            className={`tab-nav-btn ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => handleTabChange('attendance')}
          >
            <UserCheck className="w-4 h-4" />
            <span>Attendance Tracker ({attendanceMetrics.rate}%)</span>
          </button>

          <button
            className={`tab-nav-btn ${activeTab === 'survey' ? 'active' : ''}`}
            onClick={() => handleTabChange('survey')}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Survey Details ({surveyResponses.length})</span>
          </button>

          <button
            className={`tab-nav-btn ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => handleTabChange('progress')}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course Progress</span>
          </button>

          <button
            className={`tab-nav-btn ${activeTab === 'timetable' ? 'active' : ''}`}
            onClick={() => handleTabChange('timetable')}
          >
            <Calendar className="w-4 h-4" />
            <span>Lab Timetable</span>
          </button>
        </nav>

        {/* ---------------------------------------------------- */}
        {/* TAB 1: MASTER OVERVIEW & SYSTEM ANALYTICS            */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div className="dashboard-tab-content animate-fade-in">
            {/* KPI STATS CARDS GRID */}
            <div className="kpi-grid">
              <div className="kpi-card blue-kpi">
                <div className="kpi-icon-box">
                  <Users className="w-6 h-6" />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Total Enrolled Students</span>
                  <span className="kpi-value">{studentsList.length}</span>
                  <span className="kpi-hint">Across 7 Academic Streams</span>
                </div>
              </div>

              <div className="kpi-card green-kpi">
                <div className="kpi-icon-box">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Today's Attendance</span>
                  <span className="kpi-value">{attendanceMetrics.rate}%</span>
                  <span className="kpi-hint">{attendanceMetrics.present} Present • {attendanceMetrics.absent} Absent</span>
                </div>
              </div>

              <div className="kpi-card purple-kpi">
                <div className="kpi-icon-box">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Survey Submissions</span>
                  <span className="kpi-value">{surveyResponses.length}</span>
                  <span className="kpi-hint">Google Sheet Live Responses</span>
                </div>
              </div>

              <div className="kpi-card amber-kpi">
                <div className="kpi-icon-box">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="kpi-info">
                  <span className="kpi-label">Foundation Course</span>
                  <span className="kpi-value">15 Classes</span>
                  <span className="kpi-hint">100% Practical IT Modules</span>
                </div>
              </div>
            </div>

            {/* CHARTS SECTION */}
            <div className="charts-two-col-grid">
              <div className="chart-card">
                <div className="chart-card-header">
                  <h3><Users className="w-5 h-5 text-cyan-400" /> Student Enrollment Distribution by Stream</h3>
                  <span className="chart-badge">Batch Registry</span>
                </div>
                <div className="chart-body">
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={streamEnrolledChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94A3B8" />
                      <YAxis stroke="#94A3B8" />
                      <Tooltip contentStyle={{ background: '#0F172A', borderColor: '#38BDF8', borderRadius: '12px', color: '#FFF' }} />
                      <Bar dataKey="Students" fill="#38BDF8" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card">
                <div className="chart-card-header">
                  <h3><UserCheck className="w-5 h-5 text-emerald-400" /> Today's Attendance Status</h3>
                  <span className="chart-badge">{selectedAttendanceDate}</span>
                </div>
                <div className="chart-body flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={attendancePieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {attendancePieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#0F172A', borderColor: '#334155', borderRadius: '12px', color: '#FFF' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* QUICK DASHBOARD ACTIONS ROW */}
            <div className="quick-actions-banner">
              <div className="banner-left">
                <h3><Sparkles className="w-5 h-5 text-amber-400" /> Quick Administrative Actions</h3>
                <p>Manage student roster, mark today's attendance, or inspect student survey data.</p>
              </div>

              <div className="banner-buttons">
                <button className="action-pill-btn green" onClick={() => handleTabChange('attendance')}>
                  <UserCheck className="w-4 h-4" /> Go to Attendance Tracker
                </button>
                <button className="action-pill-btn blue" onClick={() => handleTabChange('students')}>
                  <GraduationCap className="w-4 h-4" /> Manage Registered Students
                </button>
                <button className="action-pill-btn purple" onClick={() => handleTabChange('survey')}>
                  <FileSpreadsheet className="w-4 h-4" /> Open Survey Responses
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 2: REGISTERED STUDENTS DIRECTORY                 */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'students' && (
          <div className="dashboard-tab-content animate-fade-in">
            <div className="tab-section-header">
              <div>
                <h2><GraduationCap className="w-6 h-6 text-cyan-400" /> Registered Students Directory</h2>
                <p>Complete institutional accounts list grouped by academic stream with PIN management.</p>
              </div>

              {userRole === 'teacher' && (
                <button className="primary-action-btn" onClick={() => setIsRegisterModalOpen(true)}>
                  <Plus className="w-4 h-4" /> Register New Student
                </button>
              )}
            </div>

            {/* FILTER & SEARCH BAR */}
            <div className="filter-controls-card">
              <div className="search-input-box">
                <Search className="search-icon w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by student name or batch..."
                  value={studentSearchQuery}
                  onChange={(e) => setStudentSearchQuery(e.target.value)}
                />
                {studentSearchQuery && (
                  <button className="clear-search-btn" onClick={() => setStudentSearchQuery('')}>
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="batch-tabs-pills">
                <button
                  className={`batch-pill ${selectedBatchFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedBatchFilter('all')}
                >
                  All ({studentsList.length})
                </button>
                {BATCH_ORDER.map((bId) => {
                  const bInfo = BATCH_DETAILS[bId] || { label: bId.toUpperCase() };
                  const count = studentsList.filter((s) => (s.batch || '+1').toLowerCase() === bId.toLowerCase()).length;
                  return (
                    <button
                      key={bId}
                      className={`batch-pill ${selectedBatchFilter === bId ? 'active' : ''}`}
                      onClick={() => setSelectedBatchFilter(bId)}
                    >
                      {bId.toUpperCase()} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BATCH GROUPED STUDENTS DISPLAY */}
            {filteredStudents.length === 0 ? (
              <div className="empty-state-box">
                <Users className="w-12 h-12 text-slate-500" />
                <h3>No Students Found</h3>
                <p>No registered student accounts match your filter criteria.</p>
              </div>
            ) : (
              <div className="batch-sections-list">
                {BATCH_ORDER.map((bId) => {
                  const bStudents = groupedStudentsByBatch[bId] || [];
                  if (selectedBatchFilter !== 'all' && selectedBatchFilter !== bId) return null;
                  if (bStudents.length === 0) return null;

                  const bInfo = BATCH_DETAILS[bId] || { label: `${bId.toUpperCase()} Stream`, badgeColor: '#38BDF8' };

                  return (
                    <div key={bId} className="batch-group-card">
                      <div className="batch-group-header">
                        <div className="batch-title-wrapper">
                          <span className="batch-stream-badge" style={{ backgroundColor: bInfo.badgeColor }}>
                            {bId.toUpperCase()}
                          </span>
                          <h3>{bInfo.label}</h3>
                        </div>
                        <span className="batch-count-tag">{bStudents.length} Enrolled</span>
                      </div>

                      <div className="students-cards-grid">
                        {bStudents.map((student) => {
                          const isPinVisible = visiblePins[student.id];
                          const todayAttendance = attendanceRoster.find((r) => r.id === student.id)?.status || 'ABSENT';

                          return (
                            <div key={student.id} className="student-profile-card">
                              <div className="card-top-row">
                                <div className="avatar-circle">
                                  {student.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="student-main-meta">
                                  <h4>{student.name}</h4>
                                  <span className="batch-sub-tag">{bInfo.label}</span>
                                </div>
                              </div>

                              <div className="card-info-rows">
                                <div className="info-item">
                                  <span className="info-label">Access PIN:</span>
                                  <div className="pin-val-box">
                                    <span className="pin-code">
                                      {isPinVisible ? student.pin : '••••'}
                                    </span>
                                    <button
                                      className="icon-eye-btn"
                                      onClick={() => togglePinVisibility(student.id)}
                                      title={isPinVisible ? 'Hide PIN' : 'View PIN'}
                                    >
                                      {isPinVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>

                                <div className="info-item">
                                  <span className="info-label">Today Status:</span>
                                  <span className={`status-pill ${todayAttendance.toLowerCase()}`}>
                                    {todayAttendance === 'PRESENT' ? '🟢 Present' : todayAttendance === 'LATE' ? '🟡 Late' : '🔴 Absent'}
                                  </span>
                                </div>
                              </div>

                              {userRole === 'teacher' && (
                                <div className="card-actions-row">
                                  <button
                                    className="card-act-btn edit"
                                    onClick={() => setEditingStudent({ ...student })}
                                    title="Edit Student"
                                  >
                                    <Edit3 className="w-4 h-4" /> Edit
                                  </button>
                                  <button
                                    className="card-act-btn delete"
                                    onClick={() => setDeletingStudent(student)}
                                    title="Delete Student"
                                  >
                                    <Trash2 className="w-4 h-4" /> Delete
                                  </button>
                                  <button
                                    className={`card-act-btn quick-att ${todayAttendance === 'PRESENT' ? 'is-present' : ''}`}
                                    onClick={() => handleSetStudentAttendance(student.id, todayAttendance === 'PRESENT' ? 'ABSENT' : 'PRESENT')}
                                  >
                                    <Check className="w-4 h-4" />
                                    {todayAttendance === 'PRESENT' ? 'Mark Absent' : 'Mark Present'}
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 3: REAL-TIME ATTENDANCE TRACKER                  */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'attendance' && (
          <div className="dashboard-tab-content animate-fade-in">
            <div className="tab-section-header">
              <div>
                <h2><UserCheck className="w-6 h-6 text-emerald-400" /> Real-Time Attendance Tracker Engine</h2>
                <p>Automated activity tracking on student login &amp; class completion with teacher manual override controls.</p>
              </div>

              <div className="export-actions-group">
                <button className="secondary-action-btn" onClick={exportAttendancePDF}>
                  <Download className="w-4 h-4" /> Export Roster PDF
                </button>
              </div>
            </div>

            {/* ATTENDANCE METRICS CARDS */}
            <div className="attendance-kpi-row">
              <div className="att-stat-card total">
                <span className="stat-num">{attendanceMetrics.total}</span>
                <span className="stat-name">Total Enrolled</span>
              </div>
              <div className="att-stat-card present">
                <span className="stat-num">{attendanceMetrics.present}</span>
                <span className="stat-name">Present Today</span>
              </div>
              <div className="att-stat-card absent">
                <span className="stat-num">{attendanceMetrics.absent}</span>
                <span className="stat-name">Absent</span>
              </div>
              <div className="att-stat-card late">
                <span className="stat-num">{attendanceMetrics.late}</span>
                <span className="stat-name">Late</span>
              </div>
              <div className="att-stat-card rate">
                <span className="stat-num">{attendanceMetrics.rate}%</span>
                <span className="stat-name">Attendance Rate</span>
              </div>
            </div>

            {/* ATTENDANCE CONTROLS BAR */}
            <div className="attendance-controls-bar">
              <div className="date-picker-box">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <label>Select Date:</label>
                <input
                  type="date"
                  value={selectedAttendanceDate}
                  onChange={(e) => setSelectedAttendanceDate(e.target.value)}
                />
              </div>

              <div className="search-input-box text-sm">
                <Search className="search-icon w-4 h-4" />
                <input
                  type="text"
                  placeholder="Filter student..."
                  value={attendanceSearch}
                  onChange={(e) => setAttendanceSearch(e.target.value)}
                />
              </div>

              <div className="filter-selects-row">
                <select
                  value={attendanceBatchFilter}
                  onChange={(e) => setAttendanceBatchFilter(e.target.value)}
                >
                  <option value="all">All Batches</option>
                  {BATCH_ORDER.map((b) => (
                    <option key={b} value={b}>{b.toUpperCase()}</option>
                  ))}
                </select>

                <select
                  value={attendanceStatusFilter}
                  onChange={(e) => setAttendanceStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="present">Present 🟢</option>
                  <option value="absent">Absent 🔴</option>
                  <option value="late">Late 🟡</option>
                </select>
              </div>

              {userRole === 'teacher' && (
                <div className="teacher-att-bulk-btns">
                  <button className="att-bulk-btn green" onClick={handleMarkAllPresent}>
                    <UserCheck className="w-4 h-4" /> Mark All Present
                  </button>
                  <button className="att-bulk-btn red" onClick={handleMarkAllAbsent}>
                    <UserX className="w-4 h-4" /> Mark All Absent
                  </button>
                  <button className="att-bulk-btn reset" onClick={handleResetAttendanceOverrides}>
                    <RotateCcw className="w-4 h-4" /> Reset to Auto
                  </button>
                </div>
              )}
            </div>

            {/* ATTENDANCE ROSTER TABLE */}
            <div className="table-responsive-card">
              <table className="master-data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Batch</th>
                    <th>Attendance Status</th>
                    <th>Tracking Log Source</th>
                    {userRole === 'teacher' && <th>Teacher Controls</th>}
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendanceRoster.length === 0 ? (
                    <tr>
                      <td colSpan={userRole === 'teacher' ? 6 : 5} className="empty-td">
                        No students match the attendance filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAttendanceRoster.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td>{idx + 1}</td>
                        <td className="font-semibold text-white">{item.name}</td>
                        <td>
                          <span className="batch-sub-pill">{item.batch.toUpperCase()}</span>
                        </td>
                        <td>
                          <span className={`status-badge-pill ${item.status.toLowerCase()}`}>
                            {item.status === 'PRESENT' ? '🟢 Present' : item.status === 'LATE' ? '🟡 Late' : '🔴 Absent'}
                          </span>
                        </td>
                        <td className="text-sm text-slate-400">{item.sourceLabel}</td>
                        {userRole === 'teacher' && (
                          <td>
                            <div className="att-toggle-btn-group">
                              <button
                                className={`att-tgl-btn green ${item.status === 'PRESENT' ? 'active' : ''}`}
                                onClick={() => handleSetStudentAttendance(item.id, 'PRESENT')}
                                title="Set Present"
                              >
                                Present
                              </button>
                              <button
                                className={`att-tgl-btn yellow ${item.status === 'LATE' ? 'active' : ''}`}
                                onClick={() => handleSetStudentAttendance(item.id, 'LATE')}
                                title="Set Late"
                              >
                                Late
                              </button>
                              <button
                                className={`att-tgl-btn red ${item.status === 'ABSENT' ? 'active' : ''}`}
                                onClick={() => handleSetStudentAttendance(item.id, 'ABSENT')}
                                title="Set Absent"
                              >
                                Absent
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 4: SURVEY DATA & RESPONSES                       */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'survey' && (
          <div className="dashboard-tab-content animate-fade-in">
            <div className="tab-section-header">
              <div>
                <h2><FileSpreadsheet className="w-6 h-6 text-purple-400" /> Student Survey Submissions Analytics</h2>
                <p>Live responses synced from Google Sheets database with skill level insights.</p>
              </div>

              <div className="export-actions-group">
                <button className="secondary-action-btn" onClick={fetchSurveyData}>
                  <RefreshCw className="w-4 h-4" /> Refresh Survey Data
                </button>
                <button className="secondary-action-btn" onClick={exportSurveyCSV}>
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>
            </div>

            {/* FILTERS & SEARCH */}
            <div className="survey-filter-card">
              <div className="search-input-box">
                <Search className="search-icon w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search response by student name or course..."
                  value={surveySearchQuery}
                  onChange={(e) => setSurveySearchQuery(e.target.value)}
                />
              </div>

              <div className="survey-selects-row">
                <select value={surveyCourseFilter} onChange={(e) => setSurveyCourseFilter(e.target.value)}>
                  <option value="All">All Courses</option>
                  <option value="+1">+1 (Plus One)</option>
                  <option value="+2">+2 (Plus Two)</option>
                  <option value="Degree 1st">Degree 1st Year</option>
                  <option value="Degree 2nd">Degree 2nd Year</option>
                  <option value="Degree 3rd">Degree 3rd Year</option>
                  <option value="PG 1st">PG 1st Year</option>
                  <option value="PG 2nd">PG 2nd Year</option>
                </select>

                <select value={surveySkillFilter} onChange={(e) => setSurveySkillFilter(e.target.value)}>
                  <option value="All">All Skill Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Good">Good</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* SURVEY RESPONSES TABLE */}
            {surveyLoading ? (
              <div className="loading-box">
                <RefreshCw className="w-8 h-8 animate-spin text-cyan-400" />
                <p>Loading Survey Submissions from Google Sheets...</p>
              </div>
            ) : surveyError ? (
              <div className="empty-state-box">
                <AlertCircle className="w-12 h-12 text-amber-400" />
                <h3>{surveyError}</h3>
              </div>
            ) : (
              <div className="table-responsive-card">
                <table className="master-data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student Full Name</th>
                      <th>Course / Stream</th>
                      <th>Division</th>
                      <th>Current Skill Level</th>
                      <th>Target Skill</th>
                      <th>Main Goal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSurveyResponses.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="empty-td">
                          No survey responses match your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredSurveyResponses.map((r, i) => (
                        <tr key={r.id || i}>
                          <td>{i + 1}</td>
                          <td className="font-semibold text-white">{r.fullName}</td>
                          <td><span className="batch-sub-pill">{r.course}</span></td>
                          <td>{r.division}</td>
                          <td>
                            <span className={`skill-level-tag ${r.skillLevel.toLowerCase()}`}>
                              {r.skillLevel}
                            </span>
                          </td>
                          <td>{r.interestedSkill}</td>
                          <td className="text-sm text-slate-300">{r.mainGoal}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 5: SYLLABUS & COURSE PROGRESS                     */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'progress' && (
          <div className="dashboard-tab-content animate-fade-in">
            <div className="tab-section-header">
              <div>
                <h2><BookOpen className="w-6 h-6 text-amber-400" /> Course Progress &amp; Syllabus Tracker</h2>
                <p>Monitor completed practical classes, IT topics, and module milestones across streams.</p>
              </div>

              <Link to="/syllabus" className="primary-action-btn">
                <BookOpen className="w-4 h-4" /> Open Full Syllabus Portal
              </Link>
            </div>

            <div className="progress-courses-grid">
              <div className="course-progress-card">
                <div className="course-card-top">
                  <span className="badge-tag green">FOUNDATION COURSE</span>
                  <h3>IT &amp; PC Essentials (15 Classes)</h3>
                </div>
                <p>PC Hardware, Snap Assist, File Management, Google Drive, Cyber Safety, AI Tools &amp; Touch Typing.</p>
                <div className="progress-bar-box">
                  <div className="bar-label-row">
                    <span>Active Status</span>
                    <span className="font-bold text-emerald-400">100% Ready</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill green" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <Link to="/syllabus" className="course-link-btn">
                  Launch Foundation Syllabus →
                </Link>
              </div>

              <div className="course-progress-card">
                <div className="course-card-top">
                  <span className="badge-tag cyan">+1 STREAM</span>
                  <h3>Plus One Computer Science</h3>
                </div>
                <p>Computer Fundamentals, Data Representation, Python Programming, Flowcharts &amp; Algorithms.</p>
                <div className="progress-bar-box">
                  <div className="bar-label-row">
                    <span>Active Status</span>
                    <span className="font-bold text-cyan-400">Active</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill cyan" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <Link to="/syllabus/+1" className="course-link-btn">
                  Open +1 Syllabus →
                </Link>
              </div>

              <div className="course-progress-card">
                <div className="course-card-top">
                  <span className="badge-tag pink">+2 STREAM</span>
                  <h3>Plus Two Computer Applications</h3>
                </div>
                <p>Web Development, HTML/CSS, JavaScript, PHP, MySQL Database &amp; Web Hosting.</p>
                <div className="progress-bar-box">
                  <div className="bar-label-row">
                    <span>Active Status</span>
                    <span className="font-bold text-pink-400">Active</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill pink" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <Link to="/syllabus/+2" className="course-link-btn">
                  Open +2 Syllabus →
                </Link>
              </div>

              <div className="course-progress-card">
                <div className="course-card-top">
                  <span className="badge-tag purple">DEGREE STREAM</span>
                  <h3>BSc Computer Science &amp; BCA</h3>
                </div>
                <p>Data Structures, C++, OOP, Java, Operating Systems, Computer Networks &amp; Web Stack.</p>
                <div className="progress-bar-box">
                  <div className="bar-label-row">
                    <span>Active Status</span>
                    <span className="font-bold text-purple-400">Active</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill purple" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <Link to="/syllabus/degree-1" className="course-link-btn">
                  Open Degree Syllabus →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAB 6: IT LAB PERIOD TIMETABLE SCHEDULE              */}
        {/* ---------------------------------------------------- */}
        {activeTab === 'timetable' && (
          <div className="dashboard-tab-content animate-fade-in">
            {/* TIMETABLE TOP HEADER & CONTROLS */}
            <div className="tab-section-header">
              <div>
                <h2><Calendar className="w-6 h-6 text-cyan-400" /> IT LAB - Batch Schedule Manager</h2>
                <p>Drag and drop batch badges or click slots to assign periods. All slots start free.</p>
              </div>

              <div className="export-actions-group">
                <button className="secondary-action-btn" onClick={handleLoadSampleTimetable}>
                  <Sparkles className="w-4 h-4 text-amber-400" /> Load Model Schedule
                </button>
                <button className="secondary-action-btn" onClick={handleResetTimetable}>
                  <RotateCcw className="w-4 h-4 text-rose-400" /> Clear All Slots
                </button>
                <button className="primary-action-btn" onClick={exportTimetablePDF}>
                  <Download className="w-4 h-4" /> Export Schedule PDF
                </button>
              </div>
            </div>

            {/* BRANDING CARD MATCHING MODEL SCREENSHOT */}
            <div className="it-lab-timetable-card">
              <div className="lab-card-top-header">
                <div className="lab-logo-title-group">
                  <div className="lab-monitor-icon-box">
                    <Monitor className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="lab-main-title">IT LAB</h2>
                    <span className="lab-sub-title">Batch Schedule</span>
                  </div>
                </div>

                <div className="lab-motto-pills">
                  <span className="motto-item">Learn</span>
                  <span className="motto-divider">|</span>
                  <span className="motto-item">Practice</span>
                  <span className="motto-divider">|</span>
                  <span className="motto-item">Build</span>
                  <span className="motto-divider">|</span>
                  <span className="motto-item">Grow</span>
                </div>

                <div className="lab-year-badge">
                  <Users className="w-4 h-4 text-cyan-500" />
                  <div>
                    <span className="badge-title">Lab Timetable</span>
                    <span className="badge-year">2024 - 2025</span>
                  </div>
                </div>
              </div>

              {/* TIMETABLE MATRIX TABLE */}
              <div className="timetable-matrix-wrapper">
                <table className="timetable-matrix-table">
                  <thead>
                    <tr>
                      <th className="days-col-header">DAYS</th>
                      {LAB_TIME_SLOTS.map((slot, sIdx) => (
                        <th key={sIdx} className="slot-col-header">{slot}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LAB_DAYS.map((day) => {
                      const isFriday = day === 'FRI';

                      return (
                        <tr key={day} className={isFriday ? 'friday-row-holiday' : ''}>
                          <td className="day-cell-label">{day}</td>
                          {LAB_TIME_SLOTS.map((_, sIdx) => {
                            const slotKey = `${day}-${sIdx}`;
                            const assignedBatchId = timetableSchedule[slotKey];
                            const batchMeta = LAB_BATCHES_LIST.find((b) => b.id === assignedBatchId);
                            const isDragOver = dragOverSlotKey === slotKey;

                            if (isFriday) {
                              return (
                                <td key={sIdx} className="timetable-slot-cell friday-disabled">
                                  <span className="holiday-text">FRIDAY OFF</span>
                                </td>
                              );
                            }

                            return (
                              <td
                                key={sIdx}
                                className={`timetable-slot-cell ${assignedBatchId ? 'has-assigned' : 'is-free'} ${isDragOver ? 'drag-over-active' : ''}`}
                                onDragOver={(e) => {
                                  e.preventDefault();
                                  setDragOverSlotKey(slotKey);
                                }}
                                onDragLeave={() => setDragOverSlotKey(null)}
                                onDrop={() => handleSlotDrop(day, sIdx)}
                                onClick={() => handleSlotClick(day, sIdx)}
                              >
                                {assignedBatchId ? (
                                  <div className={`assigned-batch-pill ${batchMeta?.colorClass || 'badge-default'}`}>
                                    <span className="batch-pill-code">{assignedBatchId}</span>
                                    <button
                                      className="clear-slot-x"
                                      onClick={(e) => handleClearSlot(e, slotKey)}
                                      title="Clear Period"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <span className="free-slot-dash">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* BOTTOM BATCH COLORS PALETTE & DRAG SOURCES */}
              <div className="batch-colors-palette-section">
                <div className="palette-header">
                  <Activity className="w-4 h-4 text-indigo-500" />
                  <span>Batch Colors</span>
                  <span className="drag-hint">💡 Drag any batch below and drop onto a timetable slot, or click to select!</span>
                  {clickSelectedBatch && (
                    <button className="clear-selected-batch-btn" onClick={() => setClickSelectedBatch(null)}>
                      Clear Selected ({clickSelectedBatch}) ✕
                    </button>
                  )}
                </div>

                <div className="batches-chips-row">
                  {LAB_BATCHES_LIST.map((batch) => {
                    const isSelected = clickSelectedBatch === batch.id;

                    return (
                      <div
                        key={batch.id}
                        draggable
                        onDragStart={() => setActiveDragBatch(batch.id)}
                        onDragEnd={() => setActiveDragBatch(null)}
                        onClick={() => {
                          setClickSelectedBatch(isSelected ? null : batch.id);
                          showToast(isSelected ? 'Deselected batch.' : `Selected ${batch.id}. Now click any free slot!`);
                        }}
                        className={`batch-drag-chip ${batch.colorClass} ${isSelected ? 'click-selected' : ''}`}
                        title={`Click or Drag ${batch.title}`}
                      >
                        <span className="chip-code">{batch.label}</span>
                        <span className="chip-sub">{batch.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* EDIT STUDENT MODAL                                   */}
        {/* ---------------------------------------------------- */}
        {editingStudent && (
          <div className="dashboard-modal-overlay">
            <div className="dashboard-modal-content">
              <div className="modal-header">
                <h3><Edit3 className="w-5 h-5 text-cyan-400" /> Edit Student Account</h3>
                <button className="modal-close-btn" onClick={() => setEditingStudent(null)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="modal-form">
                <div className="form-field">
                  <label>Student Full Name</label>
                  <input
                    type="text"
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Assigned Batch</label>
                  <select
                    value={editingStudent.batch}
                    onChange={(e) => setEditingStudent({ ...editingStudent, batch: e.target.value })}
                  >
                    <option value="+1">+1 (Plus One)</option>
                    <option value="+2">+2 (Plus Two)</option>
                    <option value="degree-1">Degree 1st Year</option>
                    <option value="degree-2">Degree 2nd Year</option>
                    <option value="degree-3">Degree 3rd Year</option>
                    <option value="pg-1">PG 1st Year</option>
                    <option value="pg-2">PG 2nd Year</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Access Password / PIN</label>
                  <input
                    type="text"
                    value={editingStudent.pin}
                    onChange={(e) => setEditingStudent({ ...editingStudent, pin: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-actions-row">
                  <button type="button" className="btn-cancel" onClick={() => setEditingStudent(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-save">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* DELETE CONFIRM MODAL                                 */}
        {/* ---------------------------------------------------- */}
        {deletingStudent && (
          <div className="dashboard-modal-overlay">
            <div className="dashboard-modal-content delete-modal">
              <div className="modal-header">
                <h3 className="text-red-400"><Trash2 className="w-5 h-5" /> Confirm Delete Student</h3>
                <button className="modal-close-btn" onClick={() => setDeletingStudent(null)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="modal-body">
                <p>Are you sure you want to delete student <strong>"{deletingStudent.name}"</strong>?</p>
                <p className="text-sm text-slate-400 mt-2">This action cannot be undone and will remove access PIN details.</p>
              </div>

              <div className="modal-actions-row mt-6">
                <button className="btn-cancel" onClick={() => setDeletingStudent(null)}>
                  Cancel
                </button>
                <button className="btn-delete-confirm" onClick={handleDeleteConfirm}>
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REGISTER NEW STUDENT MODAL */}
        <RegisterStudentModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
