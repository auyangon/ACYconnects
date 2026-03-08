# Restore-FullDesign.ps1 - Fixed version
Write-Host "🎨 Restoring full AUY Portal design..." -ForegroundColor Cyan

# Find the most recent backup
$backupFolders = Get-ChildItem -Path . -Directory -Name "src_backup_*" | Sort-Object -Descending
if ($backupFolders.Count -eq 0) {
    Write-Host "❌ No backup folder found! Looking for any backup..." -ForegroundColor Red
    
    # Try to find any backup folder
    $backupFolders = Get-ChildItem -Path . -Directory -Name "*backup*" | Sort-Object -Descending
    if ($backupFolders.Count -eq 0) {
        Write-Host "❌ No backup folders found at all!" -ForegroundColor Red
        exit 1
    }
}

$latestBackup = $backupFolders[0]
Write-Host "📦 Found backup: $latestBackup" -ForegroundColor Green

# Create src directory if it doesn't exist
if (!(Test-Path "src")) {
    New-Item -ItemType Directory -Path "src" -Force | Out-Null
}

# Copy everything from backup to src
Write-Host "📋 Copying files from backup to src folder..." -ForegroundColor Yellow
Copy-Item -Path "$latestBackup\*" -Destination "src\" -Recurse -Force
Write-Host "✅ Restored full design from: $latestBackup"

# Now fix the essential files
Write-Host "🔧 Applying essential fixes..." -ForegroundColor Cyan

# Fix StudentContext.tsx
$studentContext = @"
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api } from '../services/api';
import type { Student, Enrollment, AttendanceRecord, Announcement, Notification } from '../services/api';

interface StudentContextType {
  student: Student | null;
  enrollments: Enrollment[];
  attendance: AttendanceRecord[];
  announcements: Announcement[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  refreshData: () => Promise<void>;
  markAnnouncementRead: (announcementId: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [unreadMap, setUnreadMap] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const studentData = await api.auth(email);
      setStudent(studentData);
      localStorage.setItem('studentId', studentData.studentId);
      await fetchAllData(studentData.studentId);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem('studentId');
  };

  const fetchAllData = async (studentId: string) => {
    try {
      const [enr, att, ann, notifs] = await Promise.all([
        api.getEnrollments(studentId),
        api.getAttendance(studentId),
        api.getAnnouncements(),
        api.getNotifications(studentId),
      ]);
      setEnrollments(enr);
      setAttendance(att);
      setAnnouncements(ann);
      const unread = new Set(
        notifs.filter((n: Notification) => {
          const readValue = String(n.read).toLowerCase();
          return readValue !== 'true' && readValue !== '1';
        }).map(n => n.announcementId)
      );
      setUnreadMap(unread);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const refreshData = async () => {
    if (!student) return;
    await fetchAllData(student.studentId);
  };

  const markAnnouncementRead = (announcementId: string) => {
    setUnreadMap(prev => {
      const next = new Set(prev);
      next.delete(announcementId);
      return next;
    });
  };

  useEffect(() => {
    const savedId = localStorage.getItem('studentId');
    if (savedId) {
      api.getStudent(savedId)
        .then(s => {
          setStudent(s);
          fetchAllData(s.studentId);
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (!student) return;
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [student]);

  return (
    <StudentContext.Provider value={{
      student,
      enrollments,
      attendance,
      announcements,
      unreadCount: unreadMap.size,
      loading,
      error,
      login,
      logout,
      refreshData,
      markAnnouncementRead,
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useStudent must be used within StudentProvider');
  return ctx;
};
"@
Set-Content -Path "src\context\StudentContext.tsx" -Value $studentContext

# Fix App.tsx
$appContent = @"
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
"@
Set-Content -Path "src\App.tsx" -Value $appContent

Write-Host "✅ Context and App files fixed" -ForegroundColor Green

# Now build and deploy
Write-Host ""
Write-Host "🚀 Ready to deploy!" -ForegroundColor Green
Write-Host "Run these commands:" -ForegroundColor Cyan
Write-Host "    npm run build"
Write-Host "    git add ."
Write-Host "    git commit -m 'Restore full design'"
Write-Host "    git push"
Write-Host ""
Write-Host "Vercel will automatically redeploy with your beautiful design!" -ForegroundColor Green