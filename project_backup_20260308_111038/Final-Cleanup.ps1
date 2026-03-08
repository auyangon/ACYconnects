# Final-Cleanup.ps1
Write-Host "🧹 Cleaning up old database imports and fixing components..." -ForegroundColor Cyan

# Delete the static database folder
if (Test-Path "src\data") {
    Remove-Item -Path "src\data" -Recurse -Force
    Write-Host "✅ Deleted src/data folder"
}

# Fix all component files
Get-ChildItem -Path "src\components" -Filter "*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Remove old database imports
    $content = $content -replace "import .* from ['`"]\.\./data/database['`"];?\n?", ""
    
    # Add useStudent import if missing
    if ($content -notmatch "import .* from ['`"]\.\./context/StudentContext['`"]") {
        $content = "import { useStudent } from '../context/StudentContext';`n" + $content
    }
    
    # Remove student from props
    $content = $content -replace 'interface Props \{[^}]*student: [^;]*;[^}]*\}', 'interface Props { darkMode: boolean; }'
    
    # Add useStudent destructuring
    if ($content -match 'export default function \w+\(\{ darkMode \}: Props\) \{') {
        $content = $content -replace '(\{[\s\S]*?\})', '$1' + "`n  const { student, enrollments, attendance, announcements, unreadCount } = useStudent();"
    }
    
    Set-Content $_.FullName $content
}
Write-Host "✅ Fixed all component files"

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

  if (!student) return <LoginPage />;

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
    <div className="min-h-screen" style={{ background: bg }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="lg:ml-64">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} setMobileOpen={setMobileOpen} />
        <main>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
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
Write-Host "✅ Fixed App.tsx"

# Build
Write-Host "🔨 Building..." -ForegroundColor Yellow
npm run build

Write-Host "✅ Done! If build succeeds, run: git add . ; git commit -m 'Fix imports' ; git push"