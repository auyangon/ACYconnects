import { useState, useEffect } from 'react';
import { StudentProvider, useStudent } from './context/StudentContext';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';

const AppContent = () => {
  const { student } = useStudent();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mq.matches);
  }, []);

  if (!student) return <LoginPage />;

  return (
    <div className="min-h-screen">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="lg:ml-64">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} setMobileOpen={setMobileOpen} />
        <main><DashboardView darkMode={darkMode} /></main>
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
