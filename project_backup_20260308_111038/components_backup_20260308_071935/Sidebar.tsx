import { useStudent } from '../context/StudentContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Calendar, MessageSquare,
  ClipboardList, BarChart3, Settings, LogOut, ChevronRight,
  Bell, X
} from 'lucide-react';


interface SidebarProps { activeTab: string; setActiveTab: (tab: string) => void; mobileOpen: boolean; setMobileOpen: (v: boolean) => void; }

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'My Courses', icon: BookOpen, badge: '6' },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '3' },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList, badge: '2' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }: SidebarProps) {
  const { student, unreadCount } = useStudent();
  const { student, unreadCount } = useStudent();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-lg" style={{ background: 'linear-gradient(135deg, #c5a572, #a8834d)' }}>
            A
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-wide">Assumption</div>
            <div className="text-xs font-medium" style={{ color: '#c5a572' }}>University • AUY</div>
          </div>
        </div>
        {/* Notification bell */}
        <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(197,165,114,0.12)' }}>
          <Bell size={14} style={{ color: '#c5a572' }} />
          <span className="text-xs text-white/70 flex-1">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#c5a572', color: '#1e3c2c' }}>{unreadCount}</span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileOpen(false); }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-left relative overflow-hidden"
              style={{
                background: isActive ? 'rgba(197,165,114,0.18)' : hoveredItem === item.id ? 'rgba(255,255,255,0.06)' : 'transparent',
                color: isActive ? '#c5a572' : 'rgba(255,255,255,0.65)',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                  style={{ background: '#c5a572' }}
                />
              )}
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: isActive ? '#c5a572' : 'rgba(255,255,255,0.12)', color: isActive ? '#1e3c2c' : 'rgba(255,255,255,0.6)' }}>
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight size={14} style={{ color: '#c5a572' }} />}
            </motion.button>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="px-4 pb-6 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 px-3 py-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #1e5c3c, #2d7a54)' }}>
            {getInitials(student.studentName)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">{student.studentName.split(' ')[0]}</div>
            <div className="text-white/40 text-xs">{student.studentId}</div>
          </div>
          <LogOut size={14} className="text-white/30 hover:text-white/60 cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-0 bottom-0 z-40"
        style={{ background: 'linear-gradient(180deg, #0f2419 0%, #1e3c2c 60%, #162d20 100%)' }}>
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50"
              style={{ background: 'linear-gradient(180deg, #0f2419 0%, #1e3c2c 60%, #162d20 100%)' }}>
              <button onClick={() => setMobileOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                <X size={20} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}






