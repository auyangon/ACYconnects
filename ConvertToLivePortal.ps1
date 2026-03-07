# ConvertToLivePortal.ps1
# This script converts your static React portal to a live data portal using your Apps Script backend.

Write-Host "🚀 Converting to Live AUY Student Portal" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# --- Configuration ---
$API_URL = "https://script.google.com/macros/s/AKfycbydGnnALt3qu4MVDqmXzqa49wB7Xl8of-9OqeChOkr6922n6Dj-I6llHJ-aq9aRyWf5lA/exec"
$BACKUP_DIR = "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"

# --- Create backup ---
Write-Host "📦 Creating backup in $BACKUP_DIR ..." -ForegroundColor Cyan
New-Item -ItemType Directory -Path $BACKUP_DIR -Force | Out-Null
Copy-Item -Path "src\*" -Destination "$BACKUP_DIR\" -Recurse -Force

# --- Create necessary directories ---
New-Item -ItemType Directory -Path "src\services" -Force | Out-Null
New-Item -ItemType Directory -Path "src\context" -Force | Out-Null
New-Item -ItemType Directory -Path "src\components" -Force | Out-Null

# --- 1. Create API service file ---
Write-Host "📝 Creating API service..." -ForegroundColor Cyan
$apiContent = @"
const API_BASE = '$API_URL';

export interface Student {
  studentId: string;
  email: string;
  studentName: string;
  major: string;
  studyMode: string;
  status: string;
}

export interface Enrollment {
  enrollmentId: string;
  studentId: string;
  courseCode: string;
  courseName: string;
  teacher: string;
  credits: number;
  grade: string;
  googleClassroomLink: string;
}

export interface AttendanceRecord {
  studentId: string;
  courseCode: string;
  totalClasses: number;
  present: number;
  late: number;
  absent: number;
  percentage: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  targetCourses: string;
  emoji?: string;
}

export interface Notification {
  studentId: string;
  email: string;
  announcementId: string;
  read: string;
  readAt: string;
}

class Api {
  private async request<T>(path: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(API_BASE);
    url.searchParams.append('path', path);
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    
    const res = await fetch(url.toString());
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data as T;
  }

  async auth(email: string): Promise<Student> {
    return this.request<Student>('auth', { email });
  }

  async getStudent(studentId: string): Promise<Student> {
    return this.request<Student>('student', { studentId });
  }

  async getEnrollments(studentId: string): Promise<Enrollment[]> {
    return this.request<Enrollment[]>('enrollments', { studentId });
  }

  async getAttendance(studentId: string): Promise<AttendanceRecord[]> {
    return this.request<AttendanceRecord[]>('attendance', { studentId });
  }

  async getAnnouncements(): Promise<Announcement[]> {
    return this.request<Announcement[]>('announcements');
  }

  async getNotifications(studentId: string): Promise<Notification[]> {
    return this.request<Notification[]>('notifications', { studentId });
  }
}

export const api = new Api();
"@
Set-Content -Path "src\services\api.ts" -Value $apiContent

# --- 2. Create Student Context ---
Write-Host "📝 Creating StudentContext..." -ForegroundColor Cyan
$contextContent = @"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, Student, Enrollment, AttendanceRecord, Announcement, Notification } from '../services/api';

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
      notifs.filter((n: Notification) => n.read !== 'True' && n.read !== true).map(n => n.announcementId)
    );
    setUnreadMap(unread);
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
Set-Content -Path "src\context\StudentContext.tsx" -Value $contextContent

# --- 3. Create Login Page ---
Write-Host "📝 Creating LoginPage..." -ForegroundColor Cyan
$loginContent = @"
import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login, loading, error } = useStudent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3c2c] to-[#2d5a3e]">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-96 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">AUY Student Portal</h2>
        <p className="text-white/70 text-sm mb-6">Enter your university email</p>
        <input
          type="email"
          placeholder="e.g., chanmyae.au.edu.mm@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/50 mb-4 outline-none focus:ring-2 focus:ring-[#c5a572]"
          required
        />
        {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#c5a572] text-[#1e3c2c] font-bold rounded-xl hover:bg-[#d4b78a] transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
"@
Set-Content -Path "src\components\LoginPage.tsx" -Value $loginContent

# --- 4. Modify App.tsx ---
Write-Host "🔧 Modifying App.tsx..." -ForegroundColor Cyan
$appPath = "src\App.tsx"
if (Test-Path $appPath) {
    $appContent = Get-Content $appPath -Raw
    # Replace imports
    $appContent = $appContent -replace 'import.*?from.*?\./data/database.*?\n', ''
    $appContent = $appContent -replace 'import\s+\{\s*(?:students|announcements)\s*\}', ''
    # Add new imports
    $appContent = "import { StudentProvider, useStudent } from './context/StudentContext';`nimport LoginPage from './components/LoginPage';`n" + $appContent
    # Wrap App in provider and conditionally render login
    $appContent = $appContent -replace 'export default function App\(\) \{', @'
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

export default function App() {
  return (
    <StudentProvider>
      <AppContent />
    </StudentProvider>
  );
}
'@
    Set-Content -Path $appPath -Value $appContent
} else {
    Write-Host "❌ App.tsx not found." -ForegroundColor Red
}

# --- 5. Modify DashboardView.tsx to remove props and pass darkMode only ---
$dashPath = "src\components\DashboardView.tsx"
if (Test-Path $dashPath) {
    $dashContent = Get-Content $dashPath -Raw
    $dashContent = $dashContent -replace 'interface Props \{\s*student: Student;\s*darkMode: boolean;\s*unreadCount: number;\s*\}', 'interface Props { darkMode: boolean; }'
    $dashContent = $dashContent -replace 'export default function DashboardView\(\{ student, darkMode, unreadCount \}: Props\)', 'export default function DashboardView({ darkMode }: Props)'
    $dashContent = $dashContent -replace '<ProfileCard student=\{student\} darkMode=\{darkMode\} />', '<ProfileCard darkMode={darkMode} />'
    $dashContent = $dashContent -replace '<CourseProgressCard student=\{student\} darkMode=\{darkMode\} />', '<CourseProgressCard darkMode={darkMode} />'
    $dashContent = $dashContent -replace '<AttendanceCard student=\{student\} darkMode=\{darkMode\} />', '<AttendanceCard darkMode={darkMode} />'
    $dashContent = $dashContent -replace '<QuickStatsCard student=\{student\} darkMode=\{darkMode\} unreadCount=\{unreadCount\} />', '<QuickStatsCard darkMode={darkMode} />'
    Set-Content -Path $dashPath -Value $dashContent
}

# --- 6. Modify all card components to use useStudent() instead of props ---
$components = @(
    "ProfileCard.tsx",
    "CourseProgressCard.tsx",
    "AttendanceCard.tsx",
    "AnnouncementsCard.tsx",
    "DeadlinesCard.tsx",
    "QuickStatsCard.tsx",
    "Header.tsx",
    "Sidebar.tsx"
)

foreach ($comp in $components) {
    $path = "src\components\$comp"
    if (Test-Path $path) {
        Write-Host "🔧 Modifying $comp..." -ForegroundColor Cyan
        $content = Get-Content $path -Raw
        # Remove student prop import if any
        $content = $content -replace 'import\s*\{\s*type\s+Student\s*\}\s*from\s*["'']\.\./data/database["''];?\n?', ''
        $content = $content -replace 'import\s*\{\s*students,\s*announcements,\s*.*?\}\s*from\s*["'']\.\./data/database["''];?\n?', ''
        # Add useStudent import
        if ($content -notmatch "import .* from ['`"]\.\./context/StudentContext['`"]") {
            $content = "import { useStudent } from '../context/StudentContext';`n" + $content
        }
        # Replace props that include student
        if ($comp -eq "ProfileCard.tsx") {
            $content = $content -replace 'interface Props \{\s*student: Student;\s*darkMode: boolean;\s*\}', 'interface Props { darkMode: boolean; }'
            $content = $content -replace 'export default function ProfileCard\(\{ student, darkMode \}: Props\)', 'export default function ProfileCard({ darkMode }: Props)'
            $content = $content -replace '(?<=return \([\s\S]*?)student\.studentId', 'student?.studentId'
            $content = $content -replace 'student\.studentName', 'student?.studentName'
            $content = $content -replace 'student\.email', 'student?.email'
            $content = $content -replace 'student\.major', 'student?.major'
            $content = $content -replace 'student\.studyMode', 'student?.studyMode'
            $content = $content -replace 'student\.status', 'student?.status'
            $content = $content -replace 'const\s*\{\s*student\s*\}\s*=\s*useStudent\(\);', ''
            # Add student destructuring
            $content = $content -replace '(?<=export default function ProfileCard\(\{ darkMode \}: Props\) \{)', "`n  const { student } = useStudent();"
        } elseif ($comp -eq "CourseProgressCard.tsx") {
            $content = $content -replace 'interface Props \{\s*student: Student;\s*darkMode: boolean;\s*\}', 'interface Props { darkMode: boolean; }'
            $content = $content -replace 'export default function CourseProgressCard\(\{ student, darkMode \}: Props\)', 'export default function CourseProgressCard({ darkMode }: Props)'
            $content = $content -replace '(?<=export default function CourseProgressCard\(\{ darkMode \}: Props\) \{)', "`n  const { enrollments } = useStudent();"
            # Remove old attendance fetch etc.
        } elseif ($comp -eq "AttendanceCard.tsx") {
            $content = $content -replace 'interface Props \{\s*student: Student;\s*darkMode: boolean;\s*\}', 'interface Props { darkMode: boolean; }'
            $content = $content -replace 'export default function AttendanceCard\(\{ student, darkMode \}: Props\)', 'export default function AttendanceCard({ darkMode }: Props)'
            $content = $content -replace '(?<=export default function AttendanceCard\(\{ darkMode \}: Props\) \{)', "`n  const { attendance, enrollments } = useStudent();"
        } elseif ($comp -eq "AnnouncementsCard.tsx") {
            $content = $content -replace 'interface Props \{\s*darkMode: boolean;\s*\}', 'interface Props { darkMode: boolean; }'
            $content = $content -replace '(?<=export default function AnnouncementsCard\(\{ darkMode \}: Props\) \{)', "`n  const { announcements, unreadCount, markAnnouncementRead } = useStudent();"
        } elseif ($comp -eq "QuickStatsCard.tsx") {
            $content = $content -replace 'interface Props \{\s*student: Student;\s*darkMode: boolean;\s*unreadCount: number;\s*\}', 'interface Props { darkMode: boolean; }'
            $content = $content -replace 'export default function QuickStatsCard\(\{ student, darkMode, unreadCount \}: Props\)', 'export default function QuickStatsCard({ darkMode }: Props)'
            $content = $content -replace '(?<=export default function QuickStatsCard\(\{ darkMode \}: Props\) \{)', "`n  const { student, enrollments, attendance, unreadCount } = useStudent();"
        } elseif ($comp -eq "Header.tsx") {
            $content = $content -replace 'interface HeaderProps \{\s*student: Student;\s*setStudent: \(s: Student\) => void;\s*darkMode: boolean;\s*setDarkMode: \(v: boolean\) => void;\s*setMobileOpen: \(v: boolean\) => void;\s*\}', 'interface HeaderProps { darkMode: boolean; setDarkMode: (v: boolean) => void; setMobileOpen: (v: boolean) => void; }'
            $content = $content -replace 'export default function Header\(\{ student, setStudent, darkMode, setDarkMode, setMobileOpen \}: HeaderProps\)', 'export default function Header({ darkMode, setDarkMode, setMobileOpen }: HeaderProps)'
            $content = $content -replace '(?<=export default function Header\(\{ darkMode, setDarkMode, setMobileOpen \}: HeaderProps\) \{)', "`n  const { student, logout } = useStudent();"
            # Replace setStudent usage if any
        } elseif ($comp -eq "Sidebar.tsx") {
            $content = $content -replace 'interface SidebarProps \{\s*activeTab: string;\s*setActiveTab: \(tab: string\) => void;\s*student: Student;\s*unreadCount: number;\s*mobileOpen: boolean;\s*setMobileOpen: \(v: boolean\) => void;\s*\}', 'interface SidebarProps { activeTab: string; setActiveTab: (tab: string) => void; mobileOpen: boolean; setMobileOpen: (v: boolean) => void; }'
            $content = $content -replace 'export default function Sidebar\(\{ activeTab, setActiveTab, student, unreadCount, mobileOpen, setMobileOpen \}: SidebarProps\)', 'export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }: SidebarProps)'
            $content = $content -replace '(?<=export default function Sidebar\(\{ activeTab, setActiveTab, mobileOpen, setMobileOpen \}: SidebarProps\) \{)', "`n  const { student, unreadCount } = useStudent();"
        }
        Set-Content -Path $path -Value $content
    }
}

# --- 7. Remove static database.ts if it exists ---
if (Test-Path "src\data\database.ts") {
    Write-Host "🗑️ Removing static database.ts..." -ForegroundColor Cyan
    Move-Item "src\data\database.ts" "$BACKUP_DIR\database.ts" -Force
}

# --- 8. Install additional dependencies if needed ---
Write-Host "📦 Installing additional dependencies (framer-motion, lucide-react, recharts)..." -ForegroundColor Cyan
npm install framer-motion lucide-react recharts

Write-Host ""
Write-Host "✅ Conversion complete!" -ForegroundColor Green
Write-Host "📁 A backup of your original files is in: $BACKUP_DIR"
Write-Host ""
Write-Host "🚀 To start your live portal, run: npm run dev"
Write-Host "🔐 Test login with email: chanmyae.au.edu.mm@gmail.com"