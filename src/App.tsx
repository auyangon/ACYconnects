import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudentProvider, useStudent } from './context/StudentContext';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import CoursesView from './components/CoursesView';
import CalendarView from './components/CalendarView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';

const AppContent = () => {
  const { student } = useStudent();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // System dark mode preference
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