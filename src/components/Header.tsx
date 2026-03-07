import { useStudent } from '../context/StudentContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Sun, Moon, Menu, LogOut, ChevronDown } from 'lucide-react';
import { type Student, students, getInitials } from '../data/database';

interface HeaderProps { darkMode: boolean; setDarkMode: (v: boolean) => void; setMobileOpen: (v: boolean) => void; }

export default function Header({ darkMode, setDarkMode, setMobileOpen }: HeaderProps) {
  const { student, logout } = useStudent();
  const { student, logout } = useStudent();
  const [time, setTime] = useState(new Date('2026-03-10T14:45:00'));
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setTime(prev => new Date(prev.getTime() + 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const filteredStudents = students.filter(s =>
    s.studentName.toLowerCase().includes(search.toLowerCase()) || s.studentId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4"
      style={{
        background: darkMode ? 'rgba(26,32,44,0.95)' : 'rgba(245,247,250,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
      }}>
      {/* Mobile menu */}
      <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-xl" style={{ color: darkMode ? '#e2e8f0' : '#1e3c2c' }}>
        <Menu size={22} />
      </button>

      {/* Welcome */}
      <div className="flex-1 min-w-0">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col">
          <h1 className="text-lg font-bold truncate" style={{ color: darkMode ? '#f7fafc' : '#1e3c2c' }}>
            Welcome back, {student.studentName.split(' ')[0]} 👋
          </h1>
          <p className="text-xs" style={{ color: darkMode ? '#718096' : '#6b7280' }}>
            {student.major} Program • Year {student.year} • {student.studyMode} &nbsp;·&nbsp; {formatted} • {timeStr}
          </p>
        </motion.div>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl text-sm"
        style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', color: darkMode ? '#a0aec0' : '#6b7280' }}>
        <Search size={15} />
        <input
          className="bg-transparent outline-none w-44 text-sm placeholder-current"
          placeholder="Search courses..."
          style={{ color: darkMode ? '#e2e8f0' : '#374151' }}
        />
      </div>

      {/* Dark mode */}
      <button onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-xl transition-colors"
        style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', color: darkMode ? '#c5a572' : '#1e3c2c' }}>
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Student selector */}
      <div className="relative">
        <button
          onClick={() => setSelectorOpen(!selectorOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-2xl transition-all"
          style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(30,60,44,0.08)' }}>
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #1e5c3c, #2d7a54)' }}>
            {getInitials(student.studentName)}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold" style={{ color: darkMode ? '#f7fafc' : '#1e3c2c' }}>{student.studentName.split(' ')[0]}</div>
            <div className="text-xs" style={{ color: darkMode ? '#718096' : '#6b7280' }}>{student.studentId}</div>
          </div>
          <ChevronDown size={14} style={{ color: darkMode ? '#718096' : '#6b7280' }} />
        </button>

        {selectorOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute right-0 top-full mt-2 w-72 rounded-2xl shadow-2xl z-50 overflow-hidden"
            style={{ background: darkMode ? '#2d3748' : '#fff', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)' }}>
            <div className="p-3 border-b" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : '#f5f7fa' }}>
                <Search size={13} style={{ color: darkMode ? '#718096' : '#9ca3af' }} />
                <input
                  className="bg-transparent outline-none text-xs flex-1"
                  placeholder="Search student..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ color: darkMode ? '#e2e8f0' : '#374151' }}
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto py-2">
              {filteredStudents.map(s => (
                <button key={s.studentId}
                  onClick={() => { /* setStudent removed */; setSelectorOpen(false); setSearch(''); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left"
                  style={{
                    background: s.studentId === student.studentId ? (darkMode ? 'rgba(197,165,114,0.15)' : 'rgba(30,60,44,0.06)') : 'transparent',
                    color: darkMode ? '#e2e8f0' : '#374151',
                  }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1e5c3c, #2d7a54)' }}>
                    {getInitials(s.studentName)}
                  </div>
                  <div>
                    <div className="text-xs font-medium">{s.studentName}</div>
                    <div className="text-xs opacity-50">{s.studentId} • {s.email}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-white"
        style={{ background: 'linear-gradient(135deg, #1e3c2c, #2d5a3e)' }}>
        <LogOut size={13} />
        <span>Logout</span>
      </button>
    </header>
  );
}


