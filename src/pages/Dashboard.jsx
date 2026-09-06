import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  ChevronLeft,
  ChevronRight,
  Code,
  FileSpreadsheet,
  Download,
  X
} from 'lucide-react';
import './Dashboard.css';

const SCRIPT_URL = import.meta.env.VITE_SURVEY_SCRIPT_URL || '';

// Palette for charts
const COLORS = ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fbbf24', '#a78bfa', '#f87171', '#3861fb'];
const SKILL_COLORS = {
  'Beginner': '#ef4444',
  'Basic': '#f97316',
  'Intermediate': '#3b82f6',
  'Good': '#10b981',
  'Advanced': '#8b5cf6'
};

// Course ordering rank (+1 -> +2 -> d1 -> d2 -> d3 -> p1 -> p2)
const getCourseRank = (courseStr) => {
  if (!courseStr) return 999;
  const str = String(courseStr).trim().toLowerCase();

  if (str.includes('+1') || str.includes('plus one') || str === 'plus 1') return 1;
  if (str.includes('+2') || str.includes('plus two') || str === 'plus 2') return 2;
  if (str.includes('d1') || str.includes('degree 1') || str.includes('degree 1st') || str.includes('1st degree')) return 3;
  if (str.includes('d2') || str.includes('degree 2') || str.includes('degree 2nd') || str.includes('2nd degree')) return 4;
  if (str.includes('d3') || str.includes('degree 3') || str.includes('degree 3rd') || str.includes('3rd degree')) return 5;
  if (str.includes('p1') || str.includes('pg 1') || str.includes('pg 1st') || str.includes('1st pg')) return 6;
  if (str.includes('p2') || str.includes('pg 2') || str.includes('pg 2nd') || str.includes('2nd pg')) return 7;

  return 100;
};

const getShortCourseLabel = (course) => {
  if (!course) return '';
  const str = String(course).trim();
  const lower = str.toLowerCase();

  if (lower.includes('+1') || lower.includes('plus one')) return '+1';
  if (lower.includes('+2') || lower.includes('plus two')) return '+2';
  if (lower.includes('d1') || lower.includes('degree 1') || lower.includes('degree 1st')) return 'D1';
  if (lower.includes('d2') || lower.includes('degree 2') || lower.includes('degree 2nd')) return 'D2';
  if (lower.includes('d3') || lower.includes('degree 3') || lower.includes('degree 3rd')) return 'D3';
  if (lower.includes('p1') || lower.includes('pg 1') || lower.includes('pg 1st')) return 'P1';
  if (lower.includes('p2') || lower.includes('pg 2') || lower.includes('pg 2nd')) return 'P2';

  return str;
};

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Filters State
  const [courseFilter, setCourseFilter] = useState('All');
  const [divisionFilter, setDivisionFilter] = useState('All');
  const [skillLevelFilter, setSkillLevelFilter] = useState('All');
  const [interestedSkillFilter, setInterestedSkillFilter] = useState('All');
  const [mainGoalFilter, setMainGoalFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tableNameSearch, setTableNameSearch] = useState('');

  // Table State
  const [sortField, setSortField] = useState('fullName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('paginated'); // 'paginated' | 'full'
  const itemsPerPage = 10;

  // Key normalization helper
  const extractVal = (obj, candidateKeys) => {
    for (const key of candidateKeys) {
      for (const k in obj) {
        if (k.toLowerCase().replace(/[^a-z0-9]/g, '') === key.toLowerCase().replace(/[^a-z0-9]/g, '')) {
          if (obj[k] !== undefined && obj[k] !== null) return String(obj[k]).trim();
        }
      }
    }
    return '';
  };

  // Fetch data function
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
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

      // If live API returned no data or errored, fallback to localStorage backup submissions
      if (!rawData || rawData.length === 0) {
        const localData = JSON.parse(localStorage.getItem('student_surveys') || '[]');
        if (localData.length > 0) {
          rawData = localData;
        }
      }

      if (!rawData || rawData.length === 0) {
        setStudents([]);
        setError('No student responses found in Google Sheet or local storage.');
      } else {
        // Normalize each record
        const parsed = rawData.map((row, index) => {
          const fullName = extractVal(row, ['fullname', 'name', 'studentname']) || `Student ${index + 1}`;
          const course = extractVal(row, ['course', 'courseclass', 'class']) || 'Unspecified';
          const division = extractVal(row, ['division', 'batch', 'divisionbatch']) || 'Unspecified';
          const currentSkill = extractVal(row, ['currentskill', 'skilllevel', 'currentcomputerlevel']) || 'Beginner';
          const knownTools = extractVal(row, ['knowntools', 'toolsknown', 'softwaretoolsknown']);
          const learningInterests = extractVal(row, ['learninginterests', 'skillstolearn', 'whatwouldyouliketolearn']);
          const mostInterestedSkill = extractVal(row, ['mostinterestedskill', 'mostinterested']) || 'Unspecified';
          const mainGoal = extractVal(row, ['maingoal', 'goal']) || 'Unspecified';
          const specificLearning = extractVal(row, ['specificlearning', 'specifictopics', 'anythingspecific']);
          const timestamp = extractVal(row, ['timestamp', 'time']);

          return {
            id: index + 1,
            fullName,
            course,
            division,
            currentSkill,
            knownTools: knownTools ? knownTools.split(',').map(s => s.trim()).filter(Boolean) : [],
            learningInterests: learningInterests ? learningInterests.split(',').map(s => s.trim()).filter(Boolean) : [],
            mostInterestedSkill,
            mainGoal,
            specificLearning,
            timestamp
          };
        });

        setStudents(parsed);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error('Fetch error:', err);
      // Fallback check
      const localData = JSON.parse(localStorage.getItem('student_surveys') || '[]');
      if (localData.length > 0) {
        const parsed = localData.map((row, index) => ({
          id: index + 1,
          fullName: row.fullName || `Student ${index + 1}`,
          course: row.course || 'Unspecified',
          division: row.division || 'Unspecified',
          currentSkill: row.currentSkill || 'Beginner',
          knownTools: row.knownTools ? row.knownTools.split(',').map(s => s.trim()).filter(Boolean) : [],
          learningInterests: row.learningInterests ? row.learningInterests.split(',').map(s => s.trim()).filter(Boolean) : [],
          mostInterestedSkill: row.mostInterestedSkill || 'Unspecified',
          mainGoal: row.mainGoal || 'Unspecified',
          specificLearning: row.specificLearning || '',
          timestamp: row.timestamp || ''
        }));
        setStudents(parsed);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        setError('Unable to load Google Sheet data. Please check your Google Apps Script GET endpoint.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Filter options lists extracted from data
  const filterOptions = useMemo(() => {
    const courses = Array.from(new Set(students.map(s => s.course).filter(Boolean)))
      .sort((a, b) => {
        const rankA = getCourseRank(a);
        const rankB = getCourseRank(b);
        if (rankA !== rankB) return rankA - rankB;
        return a.localeCompare(b);
      });
    const divisions = Array.from(new Set(students.map(s => s.division).filter(Boolean))).sort();
    const skills = ['Beginner', 'Basic', 'Intermediate', 'Good', 'Advanced'];
    const interestedSkills = Array.from(new Set(students.map(s => s.mostInterestedSkill).filter(Boolean))).sort();
    const goals = Array.from(new Set(students.map(s => s.mainGoal).filter(Boolean))).sort();

    return { courses, divisions, skills, interestedSkills, goals };
  }, [students]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      if (courseFilter !== 'All' && student.course !== courseFilter) return false;
      if (divisionFilter !== 'All' && student.division !== divisionFilter) return false;
      if (skillLevelFilter !== 'All' && student.currentSkill !== skillLevelFilter) return false;
      if (interestedSkillFilter !== 'All' && student.mostInterestedSkill !== interestedSkillFilter) return false;
      if (mainGoalFilter !== 'All' && student.mainGoal !== mainGoalFilter) return false;
      if (tableNameSearch.trim() !== '') {
        const nameQuery = tableNameSearch.toLowerCase().trim();
        if (!student.fullName.toLowerCase().includes(nameQuery)) return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = student.fullName.toLowerCase().includes(query);
        const matchesRequest = student.specificLearning.toLowerCase().includes(query);
        if (!matchesName && !matchesRequest) return false;
      }
      return true;
    });
  }, [students, courseFilter, divisionFilter, skillLevelFilter, interestedSkillFilter, mainGoalFilter, tableNameSearch, searchQuery]);

  // Reset Filters
  const handleResetFilters = () => {
    setCourseFilter('All');
    setDivisionFilter('All');
    setSkillLevelFilter('All');
    setInterestedSkillFilter('All');
    setMainGoalFilter('All');
    setSearchQuery('');
    setTableNameSearch('');
    setCurrentPage(1);
  };

  // KPI Calculations
  const kpis = useMemo(() => {
    const totalStudents = filteredStudents.length;
    const totalCourses = new Set(filteredStudents.map(s => s.course)).size;

    // Helper for finding mode (most frequent value)
    const getMode = (arr) => {
      if (arr.length === 0) return 'N/A';
      const counts = {};
      arr.forEach(val => { if (val) counts[val] = (counts[val] || 0) + 1; });
      let maxKey = 'N/A';
      let maxCount = 0;
      for (const key in counts) {
        if (counts[key] > maxCount) {
          maxCount = counts[key];
          maxKey = key;
        }
      }
      return maxKey;
    };

    const mostCommonSkill = getMode(filteredStudents.map(s => s.currentSkill));
    const mostRequestedSkill = getMode(filteredStudents.map(s => s.mostInterestedSkill));
    const mostCommonGoal = getMode(filteredStudents.map(s => s.mainGoal));

    return { totalStudents, totalCourses, mostCommonSkill, mostRequestedSkill, mostCommonGoal };
  }, [filteredStudents]);

  // Chart 1: Students by Course
  const courseChartData = useMemo(() => {
    const counts = {};
    filteredStudents.forEach(s => {
      counts[s.course] = (counts[s.course] || 0) + 1;
    });
    return Object.keys(counts).map(course => ({
      course,
      count: counts[course]
    })).sort((a, b) => b.count - a.count);
  }, [filteredStudents]);

  // Chart 2: Students by Skill Level
  const skillChartData = useMemo(() => {
    const counts = { 'Beginner': 0, 'Basic': 0, 'Intermediate': 0, 'Good': 0, 'Advanced': 0 };
    filteredStudents.forEach(s => {
      if (counts[s.currentSkill] !== undefined) {
        counts[s.currentSkill]++;
      } else {
        counts[s.currentSkill] = 1;
      }
    });
    return Object.keys(counts).map(level => ({
      level,
      count: counts[level]
    })).filter(item => item.count > 0);
  }, [filteredStudents]);

  // Chart 3: Most Interested Skills
  const interestedSkillsChartData = useMemo(() => {
    const counts = {};
    filteredStudents.forEach(s => {
      if (s.mostInterestedSkill) {
        const cleanSkill = s.mostInterestedSkill.replace(/^Other:\s*/i, '');
        counts[cleanSkill] = (counts[cleanSkill] || 0) + 1;
      }
    });
    return Object.keys(counts).map(skill => ({
      skill,
      count: counts[skill]
    })).sort((a, b) => b.count - a.count);
  }, [filteredStudents]);

  // Chart 4: Main Goals
  const goalChartData = useMemo(() => {
    const counts = {};
    filteredStudents.forEach(s => {
      if (s.mainGoal) {
        counts[s.mainGoal] = (counts[s.mainGoal] || 0) + 1;
      }
    });
    return Object.keys(counts).map(goal => ({
      goal,
      count: counts[goal]
    })).sort((a, b) => b.count - a.count);
  }, [filteredStudents]);

  // Chart 5: Top Learning Topics (All selected learning interests)
  const learningTopicsData = useMemo(() => {
    const counts = {};
    filteredStudents.forEach(s => {
      s.learningInterests.forEach(topic => {
        const cleanTopic = topic.replace(/^Other:\s*/i, '');
        counts[cleanTopic] = (counts[cleanTopic] || 0) + 1;
      });
    });
    return Object.keys(counts).map(topic => ({
      topic,
      count: counts[topic]
    })).sort((a, b) => b.count - a.count).slice(0, 8);
  }, [filteredStudents]);

  // Software / Known Tools Breakdown
  const knownToolsData = useMemo(() => {
    const counts = {};
    filteredStudents.forEach(s => {
      s.knownTools.forEach(tool => {
        const cleanTool = tool.replace(/^Other:\s*/i, '');
        counts[cleanTool] = (counts[cleanTool] || 0) + 1;
      });
    });
    return Object.keys(counts).map(tool => ({
      tool,
      count: counts[tool]
    })).sort((a, b) => b.count - a.count);
  }, [filteredStudents]);

  // Specific Learning Requests List
  const learningRequests = useMemo(() => {
    return filteredStudents
      .filter(s => s.specificLearning && s.specificLearning.trim() !== '')
      .map(s => ({
        fullName: s.fullName,
        course: s.course,
        division: s.division,
        request: s.specificLearning
      }));
  }, [filteredStudents]);

  // Cycle course filter sequence (+1 -> +2 -> d1 -> d2 -> d3 -> p1 -> p2 -> All)
  const handleCycleCourseFilter = () => {
    const orderedCourses = filterOptions.courses;
    if (orderedCourses.length === 0) return;

    if (courseFilter === 'All') {
      setCourseFilter(orderedCourses[0]);
    } else {
      const currentIndex = orderedCourses.indexOf(courseFilter);
      if (currentIndex === -1 || currentIndex === orderedCourses.length - 1) {
        setCourseFilter('All');
      } else {
        setCourseFilter(orderedCourses[currentIndex + 1]);
      }
    }
    setCurrentPage(1);
  };

  // Table Sorting & Display calculation
  const sortedStudents = useMemo(() => {
    const copy = [...filteredStudents];
    copy.sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';

      if (sortField === 'course') {
        const rankA = getCourseRank(a.course);
        const rankB = getCourseRank(b.course);
        if (rankA !== rankB) {
          return sortOrder === 'asc' ? rankA - rankB : rankB - rankA;
        }
      }

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filteredStudents, sortField, sortOrder]);

  const totalPages = useMemo(() => {
    if (viewMode === 'full') return 1;
    return Math.ceil(sortedStudents.length / itemsPerPage) || 1;
  }, [sortedStudents, viewMode, itemsPerPage]);

  const displayedStudents = useMemo(() => {
    if (viewMode === 'full') return sortedStudents;
    const start = (currentPage - 1) * itemsPerPage;
    return sortedStudents.slice(start, start + itemsPerPage);
  }, [sortedStudents, viewMode, currentPage, itemsPerPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Export Filtered Students Data to PDF
  const handleExportPDF = () => {
    if (!sortedStudents || sortedStudents.length === 0) {
      alert('No student records available to export.');
      return;
    }

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [15, 23, 42]; // slate-900

    // Header Background Banner
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 297, 24, 'F');

    // Header Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('Detailed Student Responses Report', 14, 15);

    // Timestamp & Record Count
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const timestampStr = new Date().toLocaleString();
    doc.text(`Generated: ${timestampStr}  |  Total Records: ${sortedStudents.length}`, 283, 15, { align: 'right' });

    // Active Filters Summary Line
    const activeFilters = [];
    if (courseFilter !== 'All') activeFilters.push(`Course: ${courseFilter}`);
    if (divisionFilter !== 'All') activeFilters.push(`Div: ${divisionFilter}`);
    if (skillLevelFilter !== 'All') activeFilters.push(`Skill: ${skillLevelFilter}`);
    if (interestedSkillFilter !== 'All') activeFilters.push(`Interested: ${interestedSkillFilter}`);
    if (mainGoalFilter !== 'All') activeFilters.push(`Goal: ${mainGoalFilter}`);
    if (tableNameSearch.trim() !== '') activeFilters.push(`Name Filter: "${tableNameSearch.trim()}"`);
    if (searchQuery.trim() !== '') activeFilters.push(`Global Search: "${searchQuery.trim()}"`);

    const filterText = activeFilters.length > 0
      ? `Applied Filters: ${activeFilters.join(' | ')}`
      : 'Applied Filters: None (Showing All Students)';

    doc.setTextColor(71, 85, 105);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'italic');
    doc.text(filterText, 14, 30);

    // Table Column Definitions
    const tableColumns = [
      { header: '#', dataKey: 'no' },
      { header: 'Student Name', dataKey: 'fullName' },
      { header: 'Course', dataKey: 'course' },
      { header: 'Div', dataKey: 'division' },
      { header: 'Current Skill', dataKey: 'currentSkill' },
      { header: 'Interested Skill', dataKey: 'mostInterestedSkill' },
      { header: 'Main Goal', dataKey: 'mainGoal' },
      { header: 'Learning Interests', dataKey: 'learningInterests' },
      { header: 'Specific Request', dataKey: 'specificLearning' },
    ];

    const tableRows = sortedStudents.map((student, idx) => ({
      no: idx + 1,
      fullName: student.fullName || '-',
      course: student.course || '-',
      division: student.division || '-',
      currentSkill: student.currentSkill || '-',
      mostInterestedSkill: student.mostInterestedSkill || '-',
      mainGoal: student.mainGoal || '-',
      learningInterests: Array.isArray(student.learningInterests) ? student.learningInterests.join(', ') : '-',
      specificLearning: student.specificLearning || '-'
    }));

    autoTable(doc, {
      columns: tableColumns,
      body: tableRows,
      startY: 34,
      styles: {
        fontSize: 8,
        cellPadding: 2.5,
        overflow: 'linebreak',
        valign: 'middle'
      },
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [248, 250, 252],
        fontStyle: 'bold',
        fontSize: 8.5
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      },
      columnStyles: {
        no: { cellWidth: 10, halign: 'center' },
        fullName: { cellWidth: 35, fontStyle: 'bold' },
        course: { cellWidth: 18 },
        division: { cellWidth: 14 },
        currentSkill: { cellWidth: 24 },
        mostInterestedSkill: { cellWidth: 32 },
        mainGoal: { cellWidth: 34 },
        learningInterests: { cellWidth: 48 },
        specificLearning: { cellWidth: 48 }
      },
      didDrawPage: (data) => {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount}`,
          283,
          203,
          { align: 'right' }
        );
        doc.text(
          'Sirajul Huda Student IT & Digital Skills Interest Survey',
          14,
          203
        );
      }
    });

    const dateStr = new Date().toISOString().slice(0, 10);
    doc.save(`Student_Responses_Report_${dateStr}.pdf`);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="dashboard-title flex items-center gap-3">
                <Sparkles className="text-sky-400 w-8 h-8" />
                Student IT & Digital Skills Analytics
              </h1>
              <p className="dashboard-subtitle">
                Real-time insights and survey analytics from Sirajul Huda Student IT & Digital Skills Interest Survey
              </p>
            </div>
            <div className="dashboard-actions">
              <Link
                to="/registered-students"
                className="view-students-portal-btn inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 text-sm"
              >
                <Users className="w-4 h-4" />
                <span>Registered Students Database (Batch-wise)</span>
              </Link>
              {lastUpdated && (
                <div className="last-updated-badge">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Updated: {lastUpdated}</span>
                </div>
              )}
              <button onClick={fetchDashboardData} disabled={loading} className="refresh-btn">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh Data'}
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="state-container">
            <div className="spinner"></div>
            <p className="text-sky-400 font-semibold text-lg">Fetching live survey data...</p>
          </div>
        )}

        {/* Error State with Setup Help */}
        {!loading && error && students.length === 0 && (
          <div className="state-container">
            <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
            <h2 className="text-xl font-bold text-slate-100 mb-2">Google Sheet Data Unavailable</h2>
            <p className="text-slate-400 max-w-lg mb-4">{error}</p>

            <div className="script-instructions-box">
              <h3 className="text-sky-400 font-bold flex items-center gap-2 mb-2">
                <Code className="w-5 h-5" /> How to enable GET API in Google Apps Script:
              </h3>
              <p className="text-sm text-slate-300">
                Open your Google Sheet &gt; <strong>Extensions</strong> &gt; <strong>Apps Script</strong>, then add/replace your script with this <code>doGet</code> handler:
              </p>
              <pre className="script-code">
{`function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var result = [];
  for (var i = 1; i < data.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) obj[headers[j]] = data[i][j];
    result.push(obj);
  }
  return ContentService.createTextOutput(JSON.stringify({ status: "success", data: result }))
    .setMimeType(ContentService.MimeType.JSON);
}`}
              </pre>
              <p className="text-xs text-slate-400 mt-2">
                Click <strong>Deploy &gt; New deployment &gt; Anyone</strong> to publish.
              </p>
            </div>

            <button onClick={fetchDashboardData} className="refresh-btn mt-6">
              <RefreshCw className="w-4 h-4" /> Retry Fetching Data
            </button>
          </div>
        )}

        {/* Main Content Dashboard */}
        {!loading && students.length > 0 && (
          <>
            {/* Top KPI Cards */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon-wrapper bg-sky-500/20 text-sky-400">
                  <Users className="w-5 h-5" />
                </div>
                <div className="kpi-label">Total Students</div>
                <div className="kpi-value text-sky-400">{kpis.totalStudents}</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-wrapper bg-indigo-500/20 text-indigo-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="kpi-label">Courses / Batches</div>
                <div className="kpi-value text-indigo-400">{kpis.totalCourses}</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-wrapper bg-emerald-500/20 text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <div className="kpi-label">Top Skill Level</div>
                <div className="kpi-value text-emerald-400">{kpis.mostCommonSkill}</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-wrapper bg-pink-500/20 text-pink-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="kpi-label">Most Requested Skill</div>
                <div className="kpi-value text-pink-400">{kpis.mostRequestedSkill}</div>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-wrapper bg-amber-500/20 text-amber-400">
                  <Target className="w-5 h-5" />
                </div>
                <div className="kpi-label">Top Main Goal</div>
                <div className="kpi-value text-amber-400">{kpis.mostCommonGoal}</div>
              </div>
            </div>

            {/* Filter Panel */}
            <div className="filter-panel">
              <div className="filter-title">
                <span className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-sky-400" /> Filter Analytics Panel
                </span>
                {(courseFilter !== 'All' || divisionFilter !== 'All' || skillLevelFilter !== 'All' || interestedSkillFilter !== 'All' || mainGoalFilter !== 'All' || searchQuery !== '') && (
                  <button onClick={handleResetFilters} className="reset-filter-btn">
                    <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
                  </button>
                )}
              </div>

              <div className="filter-grid">
                {/* Search */}
                <div className="filter-item">
                  <label>Search Student Name or Request</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="filter-input pl-9"
                      placeholder="Type student name..."
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                {/* Course Filter */}
                <div className="filter-item">
                  <label>Course / Class</label>
                  <select
                    className="filter-select"
                    value={courseFilter}
                    onChange={(e) => { setCourseFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All">All Courses</option>
                    {filterOptions.courses.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Division Filter */}
                <div className="filter-item">
                  <label>Division / Batch</label>
                  <select
                    className="filter-select"
                    value={divisionFilter}
                    onChange={(e) => { setDivisionFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All">All Divisions</option>
                    {filterOptions.divisions.map(d => (
                      <option key={d} value={d}>Division {d}</option>
                    ))}
                  </select>
                </div>

                {/* Skill Level Filter */}
                <div className="filter-item">
                  <label>Current Skill Level</label>
                  <select
                    className="filter-select"
                    value={skillLevelFilter}
                    onChange={(e) => { setSkillLevelFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All">All Skill Levels</option>
                    {filterOptions.skills.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Most Interested Skill Filter */}
                <div className="filter-item">
                  <label>Most Interested Skill</label>
                  <select
                    className="filter-select"
                    value={interestedSkillFilter}
                    onChange={(e) => { setInterestedSkillFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All">All Interested Skills</option>
                    {filterOptions.interestedSkills.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Main Goal Filter */}
                <div className="filter-item">
                  <label>Main Goal</label>
                  <select
                    className="filter-select"
                    value={mainGoalFilter}
                    onChange={(e) => { setMainGoalFilter(e.target.value); setCurrentPage(1); }}
                  >
                    <option value="All">All Goals</option>
                    {filterOptions.goals.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Charts Visual Analytics Grid */}
            <div className="charts-grid">
              {/* Chart 1: Students by Course */}
              <div className="chart-card">
                <div className="chart-header">
                  <div>
                    <h2 className="chart-title">Students by Course</h2>
                    <span className="chart-subtitle">Distribution across classes</span>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={courseChartData} onClick={(data) => { if (data && data.activePayload) setCourseFilter(data.activePayload[0].payload.course); }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="course" stroke="#94a3b8" fontSize={11} interval={0} angle={-15} textAnchor="end" />
                      <YAxis stroke="#94a3b8" allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                      <Bar dataKey="count" fill="#38bdf8" radius={[4, 4, 0, 0]} cursor="pointer" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Students by Current Skill Level */}
              <div className="chart-card">
                <div className="chart-header">
                  <div>
                    <h2 className="chart-title">Students by Current Skill Level</h2>
                    <span className="chart-subtitle">Self-assessed proficiency</span>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={skillChartData}
                        dataKey="count"
                        nameKey="level"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={95}
                        paddingAngle={4}
                        label={({ level, count }) => `${level}: ${count}`}
                        onClick={(data) => { if (data && data.level) setSkillLevelFilter(data.level); }}
                        cursor="pointer"
                      >
                        {skillChartData.map((entry) => (
                          <Cell key={entry.level} fill={SKILL_COLORS[entry.level] || '#38bdf8'} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                      <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 3: Most Interested Skills */}
              <div className="chart-card">
                <div className="chart-header">
                  <div>
                    <h2 className="chart-title">Most Interested Skills</h2>
                    <span className="chart-subtitle">Top choice by students</span>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={interestedSkillsChartData} onClick={(data) => { if (data && data.activePayload) setInterestedSkillFilter(data.activePayload[0].payload.skill); }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis type="number" stroke="#94a3b8" allowDecimals={false} />
                      <YAxis dataKey="skill" type="category" stroke="#94a3b8" width={110} fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                      <Bar dataKey="count" fill="#818cf8" radius={[0, 4, 4, 0]} cursor="pointer" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 4: Main Goals */}
              <div className="chart-card">
                <div className="chart-header">
                  <div>
                    <h2 className="chart-title">Main Student Goals</h2>
                    <span className="chart-subtitle">Primary motivation</span>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={goalChartData}
                        dataKey="count"
                        nameKey="goal"
                        cx="50%"
                        cy="50%"
                        outerRadius={95}
                        onClick={(data) => { if (data && data.goal) setMainGoalFilter(data.goal); }}
                        cursor="pointer"
                      >
                        {goalChartData.map((entry, index) => (
                          <Cell key={entry.goal} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                      <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 5: Top Requested Learning Topics */}
              <div className="chart-card chart-card-full">
                <div className="chart-header">
                  <div>
                    <h2 className="chart-title">Top Requested Learning Topics</h2>
                    <span className="chart-subtitle">Individual topic interest count</span>
                  </div>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={learningTopicsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="topic" stroke="#94a3b8" fontSize={11} interval={0} angle={-15} textAnchor="end" />
                      <YAxis stroke="#94a3b8" allowDecimals={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                      <Bar dataKey="count" fill="#34d399" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Software / Tools Known Section */}
            <div className="chart-card mb-8">
              <div className="chart-header">
                <div>
                  <h2 className="chart-title flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-sky-400" /> Currently Known Tools Analysis
                  </h2>
                  <span className="chart-subtitle">Number of students who already know each tool</span>
                </div>
              </div>
              <div className="tools-grid">
                {knownToolsData.length > 0 ? (
                  knownToolsData.map(item => (
                    <div key={item.tool} className="tool-badge-card">
                      <span className="tool-name">{item.tool}</span>
                      <span className="tool-count-badge">{item.count}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm">No tool data available.</p>
                )}
              </div>
            </div>

            {/* Student Learning Requests Section */}
            <div className="chart-card mb-8">
              <div className="chart-header">
                <div>
                  <h2 className="chart-title">Student Specific Learning Requests</h2>
                  <span className="chart-subtitle">Free-text requests submitted by students</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">
                  {learningRequests.length} Requests
                </span>
              </div>
              <div className="requests-list">
                {learningRequests.length > 0 ? (
                  learningRequests.map((req, idx) => (
                    <div key={idx} className="request-card">
                      <div className="request-student">{req.fullName}</div>
                      <div className="request-meta">{req.course} — Division {req.division}</div>
                      <div className="request-text">"{req.request}"</div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm p-4">No specific text requests match current filter.</p>
                )}
              </div>
            </div>

            {/* Detailed Student Data Table */}
            <div className="table-card" id="detailed-responses-table">
              <div className="table-header flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="chart-title flex items-center gap-2">
                    Detailed Student Responses
                  </h2>
                  <span className="chart-subtitle block">
                    {viewMode === 'full'
                      ? `Showing all ${sortedStudents.length} student records`
                      : `Showing ${displayedStudents.length} of ${sortedStudents.length} student records`}
                  </span>

                  {/* Course Filter Quick Pills in Header (+1 -> +2 -> d1 -> d2 -> d3 -> p1 -> p2) */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                      <Filter className="w-3 h-3 text-sky-400" /> Course Filter:
                    </span>
                    <button
                      onClick={() => { setCourseFilter('All'); setCurrentPage(1); }}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                        courseFilter === 'All'
                          ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/80'
                      }`}
                    >
                      All
                    </button>
                    {filterOptions.courses.map(c => (
                      <button
                        key={c}
                        onClick={() => { setCourseFilter(c); setCurrentPage(1); }}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                          courseFilter === c
                            ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/80'
                        }`}
                        title={`Filter by ${c}`}
                      >
                        {getShortCourseLabel(c)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* View Mode, Name Search & PDF Export Controls */}
                <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
                  {/* Dedicated Name Search Filter */}
                  <div className="relative min-w-[200px] sm:min-w-[230px]">
                    <input
                      type="text"
                      className="w-full bg-slate-900/90 text-slate-100 text-xs placeholder:text-slate-400 pl-8 pr-7 py-2 rounded-lg border border-slate-700/80 focus:border-sky-500 focus:outline-none transition-all shadow-inner"
                      placeholder="Search student name..."
                      value={tableNameSearch}
                      onChange={(e) => {
                        setTableNameSearch(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                    {tableNameSearch && (
                      <button
                        onClick={() => { setTableNameSearch(''); setCurrentPage(1); }}
                        className="absolute right-2 top-2.5 text-slate-400 hover:text-slate-200 transition-colors"
                        title="Clear name filter"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Export PDF Button */}
                  <button
                    onClick={handleExportPDF}
                    className="px-3.5 py-2 text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-lg shadow-md hover:shadow-sky-500/25 transition-all flex items-center gap-1.5 border border-sky-400/30 active:scale-95 cursor-pointer"
                    title="Export filtered student responses report to PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export PDF</span>
                  </button>

                  {/* Cycle Course Filter */}
                  <button
                    onClick={handleCycleCourseFilter}
                    className="px-3 py-2 text-xs font-bold bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 rounded-lg border border-sky-500/30 transition-all flex items-center gap-1 cursor-pointer"
                    title="Cycle through course filter (+1 -> +2 -> d1 -> d2 -> d3 -> p1 -> p2)"
                  >
                    <span>Next Course</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-700/80">
                    <button
                      onClick={() => { setViewMode('paginated'); setCurrentPage(1); }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                        viewMode === 'paginated'
                          ? 'bg-sky-500 text-slate-950 shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      Paginated
                    </button>
                    <button
                      onClick={() => { setViewMode('full'); setCurrentPage(1); }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                        viewMode === 'full'
                          ? 'bg-sky-500 text-slate-950 shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      Full List
                    </button>
                  </div>
                </div>
              </div>

              <div className="table-wrapper">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th className="w-12 text-center">No.</th>
                      <th onClick={() => handleSort('fullName')}>
                        Student Name <ArrowUpDown className="inline w-3 h-3 ml-1" />
                      </th>
                      <th onClick={() => handleSort('course')}>
                        Course <ArrowUpDown className="inline w-3 h-3 ml-1" />
                      </th>
                      <th onClick={() => handleSort('division')}>
                        Div <ArrowUpDown className="inline w-3 h-3 ml-1" />
                      </th>
                      <th onClick={() => handleSort('currentSkill')}>
                        Current Skill <ArrowUpDown className="inline w-3 h-3 ml-1" />
                      </th>
                      <th onClick={() => handleSort('mostInterestedSkill')}>
                        Interested Skill <ArrowUpDown className="inline w-3 h-3 ml-1" />
                      </th>
                      <th onClick={() => handleSort('mainGoal')}>
                        Main Goal <ArrowUpDown className="inline w-3 h-3 ml-1" />
                      </th>
                      <th>Learning Interests</th>
                      <th>Specific Request</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedStudents.length > 0 ? (
                      displayedStudents.map((student, idx) => (
                        <tr key={student.id}>
                          <td className="text-center font-mono text-slate-400 text-xs font-semibold">
                            {(currentPage - 1) * itemsPerPage + idx + 1}
                          </td>
                          <td className="font-semibold text-slate-100 whitespace-nowrap">{student.fullName}</td>
                          <td className="whitespace-nowrap">{student.course}</td>
                          <td className="whitespace-nowrap">{student.division}</td>
                          <td className="whitespace-nowrap">
                            <span className={`badge badge-${student.currentSkill.toLowerCase()}`}>
                              {student.currentSkill}
                            </span>
                          </td>
                          <td className="text-sky-300 font-medium whitespace-nowrap">{student.mostInterestedSkill}</td>
                          <td className="whitespace-nowrap">{student.mainGoal}</td>
                          <td className="text-xs text-slate-300">
                            {student.learningInterests.join(', ')}
                          </td>
                          <td className="text-xs italic text-slate-300">
                            {student.specificLearning || '-'}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center py-6 text-slate-400">
                          No student records match the selected filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {viewMode === 'paginated' && totalPages > 1 && (
                <div className="pagination">
                  <div>Page {currentPage} of {totalPages}</div>
                  <div className="pagination-controls">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="page-btn"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="page-btn"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
