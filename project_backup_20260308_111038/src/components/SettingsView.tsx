import { useStudent } from '../context/StudentContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Palette, User, Shield } from 'lucide-react';

interface Props { student: Student; darkMode: boolean; setDarkMode: (v: boolean) => void; }
interface ToggleItem {
  label: string;
  desc: string;
  toggle: true;
  value: boolean;
  onChange: (v: boolean) => void;
}
interface StaticItem {
  toggle: false;
type SettingItem = ToggleItem | StaticItem;
export default function SettingsView(props: any) {
  const { student, enrollments, attendance, announcements, unreadCount } = useStudent();
  const [notifAnnounce, setNotifAnnounce] = useState(true);
  const [notifAssign, setNotifAssign] = useState(true);
  const [notifAttend, setNotifAttend] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const text = darkMode ? '#f7fafc' : '#1a202c';
  const muted = darkMode ? '#718096' : '#6b7280';
  const card = darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const rowBg = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)';
  const sections: { title: string; icon: React.ElementType; items: SettingItem[] }[] = [
    {
      title: 'Appearance', icon: Palette,
      items: [
        { label: 'Dark Mode', desc: 'Switch between light and dark theme', toggle: true, value: darkMode, onChange: setDarkMode },
        { label: 'Language', desc: 'English (US)', toggle: false },
        { label: 'Font Size', desc: 'Medium', toggle: false },
      ],
    },
      title: 'Notifications', icon: Bell,
        { label: 'Announcement Alerts', desc: 'Get notified for new announcements', toggle: true, value: notifAnnounce, onChange: setNotifAnnounce },
        { label: 'Assignment Reminders', desc: 'Reminders 24h before deadlines', toggle: true, value: notifAssign, onChange: setNotifAssign },
        { label: 'Attendance Alerts', desc: 'Alert when attendance drops below 75%', toggle: true, value: notifAttend, onChange: setNotifAttend },
      title: 'Account', icon: User,
        { label: 'Student ID', desc: student.studentId, toggle: false },
        { label: 'Email', desc: student.email, toggle: false },
        { label: 'Program', desc: `${student.major} • Year ${student.year}`, toggle: false },
        { label: 'Study Mode', desc: student.studyMode, toggle: false },
      title: 'Security', icon: Shield,
        { label: 'Change Password', desc: 'Last changed 30 days ago', toggle: false },
        { label: 'Two-Factor Auth', desc: 'Add extra security to your account', toggle: true, value: twoFactor, onChange: setTwoFactor },
  ];
  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black" style={{ color: text }}>Settings</h1>
        <p className="text-sm" style={{ color: muted }}>Manage your preferences and account</p>
      </motion.div>
      {sections.map((section, si) => (
        <motion.div key={section.title}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.08 }}
          className="rounded-3xl p-5" style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center gap-2 mb-4">
            <section.icon size={16} style={{ color: '#c5a572' }} />
            <h3 className="font-bold text-sm" style={{ color: text }}>{section.title}</h3>
          </div>
          <div className="space-y-2">
            {section.items.map((item, ii) => (
              <div key={ii} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: rowBg }}>
                <div className="flex-1">
                  <div className="text-xs font-semibold" style={{ color: text }}>{item.label}</div>
                  <div className="text-xs" style={{ color: muted }}>{item.desc}</div>
                </div>
                {item.toggle && (
                  <button
                    onClick={() => item.onChange(!item.value)}
                    className="w-10 h-6 rounded-full transition-all relative flex-shrink-0"
                    style={{ background: item.value ? '#1e3c2c' : (darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)') }}>
                    <div className="absolute top-1 transition-all w-4 h-4 rounded-full bg-white"
                      style={{ left: item.value ? '22px' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                  </button>
                )}
              </div>
            ))}
        </motion.div>
      ))}
    </div>
  );

