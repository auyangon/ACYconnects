import { StudentProvider, useStudent } from './context/StudentContext';
import LoginPage from './components/LoginPage';
import { StudentProvider, useStudent } from './context/StudentContext';
import LoginPage from './components/LoginPage';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import CoursesView from './components/CoursesView';
import CalendarView from './components/CalendarView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';

const AppContent = () => {
  const { student, loading } = useStudent();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!student) {
    return <LoginPage />;
  }

  const bg = darkMode
    ? 'linear-gradient(135deg, #0f1a14 0%, #1a202c 50%, #0f1a14 100%)'
    : 'linear-gradient(135deg, #f0f4f1 0%, #f5f7fa 50%, #eef2ee 100%)';

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView darkMode={darkMode} />;
      case 'courses': return <CoursesView darkMode={darkMode} />;
      case 'calendar': return <CalendarView darkMode={darkMode} />;
      case 'analytics': return <AnalyticsView darkMode={darkMode} />;
      case 'settings': return <SettingsView darkMode={darkMode} setDarkMode={setDarkMode} />;
      default: return <DashboardView darkMode={darkMode} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: bg, transition: 'background 0.3s ease' }}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setMobileOpen={setMobileOpen}
        />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { student } = useStudent();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (!student) {
    return <LoginPage />;
  }

  const bg = darkMode
    ? 'linear-gradient(135deg, #0f1a14 0%, #1a202c 50%, #0f1a14 100%)'
    : 'linear-gradient(135deg, #f0f4f1 0%, #f5f7fa 50%, #eef2ee 100%)';

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView darkMode={darkMode} />;
      case 'courses': return <CoursesView darkMode={darkMode} />;
      case 'calendar': return <CalendarView darkMode={darkMode} />;
      case 'analytics': return <AnalyticsView darkMode={darkMode} />;
      case 'settings': return <SettingsView darkMode={darkMode} setDarkMode={setDarkMode} />;
      default: return <DashboardView darkMode={darkMode} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: bg, transition: 'background 0.3s ease' }}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setMobileOpen={setMobileOpen}
        />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StudentProvider>
      <AppContent />
    </StudentProvider>
  );
}
  return (
    <StudentProvider>
      <AppContent />
    </StudentProvider>
  );
}
  const [activeTab, setActiveTab] = useState('dashboard');
  const [student, setStudent] = useState(students[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [readIds] = useState<Set<string>>(new Set());

  const unreadCount = announcements.length - readIds.size;

  // System dark mode preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const bg = darkMode
    ? 'linear-gradient(135deg, #0f1a14 0%, #1a202c 50%, #0f1a14 100%)'
    : 'linear-gradient(135deg, #f0f4f1 0%, #f5f7fa 50%, #eef2ee 100%)';

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView student={student} darkMode={darkMode} unreadCount={unreadCount} />;
      case 'courses': return <CoursesView student={student} darkMode={darkMode} />;
      case 'calendar': return <CalendarView darkMode={darkMode} />;
      case 'analytics': return <AnalyticsView student={student} darkMode={darkMode} />;
      case 'settings': return <SettingsView student={student} darkMode={darkMode} setDarkMode={setDarkMode} />;
      case 'messages':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-black mb-2" style={{ color: darkMode ? '#f7fafc' : '#1a202c' }}>Messages</h1>
            <p className="text-sm" style={{ color: darkMode ? '#718096' : '#6b7280' }}>3 unread messages</p>
            <div className="mt-6 space-y-3">
              {[
                { from: 'Prof. Johnson', msg: 'Please review the BUS101 case study rubric before submission.', time: '2h ago', unread: true },
                { from: 'Dr. Smith', msg: 'Your ENG101 essay draft looks promising. See my feedback.', time: '1d ago', unread: true },
                { from: 'Academic Office', msg: 'Your course registration for next semester is now open.', time: '2d ago', unread: true },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-2xl" style={{ background: darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)', border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">{m.from[0]}</div>
                    <span className="text-sm font-semibold" style={{ color: darkMode ? '#f7fafc' : '#1a202c' }}>{m.from}</span>
                    {m.unread && <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>New</span>}
                    <span className="text-xs" style={{ color: darkMode ? '#718096' : '#6b7280' }}>{m.time}</span>
                  </div>
                  <p className="text-xs" style={{ color: darkMode ? '#a0aec0' : '#6b7280' }}>{m.msg}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'assignments':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-black mb-2" style={{ color: darkMode ? '#f7fafc' : '#1a202c' }}>Assignments</h1>
            <p className="text-sm" style={{ color: darkMode ? '#718096' : '#6b7280' }}>2 pending submissions</p>
            <div className="mt-6 space-y-3">
              {[
                { course: 'BUS101', title: 'Case Study: Market Analysis', due: 'Mar 15, 2026', status: 'Pending', urgent: true, color: '#3b82f6' },
                { course: 'ENG101', title: 'Argumentative Essay', due: 'Mar 18, 2026', status: 'In Progress', urgent: false, color: '#10b981' },
                { course: 'STAT100', title: 'Chapter 4 Problem Set', due: 'Mar 25, 2026', status: 'Not Started', urgent: false, color: '#06b6d4' },
                { course: 'IT101', title: 'Database Design Project', due: 'Apr 1, 2026', status: 'Not Started', urgent: false, color: '#f59e0b' },
                { course: 'HUM11', title: 'Cultural Analysis Paper', due: 'Apr 5, 2026', status: 'Not Started', urgent: false, color: '#8b5cf6' },
                { course: 'MATH101', title: 'Problem Set 3', due: 'Apr 8, 2026', status: 'Not Started', urgent: false, color: '#ef4444' },
              ].map((a, i) => (
                <div key={i} className="p-4 rounded-2xl" style={{ background: darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)', border: a.urgent ? `1px solid ${a.color}40` : (darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)') }}>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: a.color }} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-lg" style={{ background: a.color + '20', color: a.color }}>{a.course}</span>
                        <span className="text-sm font-semibold" style={{ color: darkMode ? '#f7fafc' : '#1a202c' }}>{a.title}</span>
                      </div>
                      <div className="text-xs mt-1" style={{ color: darkMode ? '#718096' : '#6b7280' }}>Due: {a.due}</div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-xl font-medium" style={{
                      background: a.status === 'Pending' ? 'rgba(239,68,68,0.12)' : a.status === 'In Progress' ? 'rgba(245,158,11,0.12)' : 'rgba(107,114,128,0.12)',
                      color: a.status === 'Pending' ? '#ef4444' : a.status === 'In Progress' ? '#f59e0b' : '#6b7280',
                    }}>{a.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <DashboardView student={student} darkMode={darkMode} unreadCount={unreadCount} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: bg, transition: 'background 0.3s ease' }}>
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        student={student}
        unreadCount={unreadCount}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <Header
          student={student}
          setStudent={setStudent}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setMobileOpen={setMobileOpen}
        />

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${student.studentId}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}


