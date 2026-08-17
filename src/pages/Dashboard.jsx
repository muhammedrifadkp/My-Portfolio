import React, { useState, useEffect, useMemo } from 'react';
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
  FileSpreadsheet
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
    const courses = Array.from(new Set(students.map(s => s.course).filter(Boolean))).sort();
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
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = student.fullName.toLowerCase().includes(query);
        const matchesRequest = student.specificLearning.toLowerCase().includes(query);
        if (!matchesName && !matchesRequest) return false;
      }
      return true;
    });
  }, [students, courseFilter, divisionFilter, skillLevelFilter, interestedSkillFilter, mainGoalFilter, searchQuery]);

  // Reset Filters
  const handleResetFilters = () => {
    setCourseFilter('All');
    setDivisionFilter('All');
    setSkillLevelFilter('All');
    setInterestedSkillFilter('All');
    setMainGoalFilter('All');
    setSearchQuery('');
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

  // Table Sorting & Display calculation
  const sortedStudents = useMemo(() => {
    const copy = [...filteredStudents];
    copy.sort((a, b) => {
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';
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
            <div className="table-card">
              <div className="table-header">
                <div>
                  <h2 className="chart-title">Detailed Student Responses</h2>
                  <span className="chart-subtitle">
                    {viewMode === 'full'
                      ? `Showing all ${sortedStudents.length} student records`
                      : `Showing ${displayedStudents.length} of ${sortedStudents.length} student records`}
                  </span>
                </div>

                {/* View Mode Toggle Controls */}
                <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-lg border border-slate-700/80">
                  <button
                    onClick={() => { setViewMode('paginated'); setCurrentPage(1); }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                      viewMode === 'paginated'
                        ? 'bg-sky-500 text-slate-950 shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Paginated View
                  </button>
                  <button
                    onClick={() => { setViewMode('full'); setCurrentPage(1); }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                      viewMode === 'full'
                        ? 'bg-sky-500 text-slate-950 shadow-md'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Full Content Display
                  </button>
                </div>
              </div>

              <div className="table-wrapper">
                <table className="student-table">
                  <thead>
                    <tr>
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
                      displayedStudents.map(student => (
                        <tr key={student.id}>
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
                        <td colSpan="8" className="text-center py-6 text-slate-400">
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
