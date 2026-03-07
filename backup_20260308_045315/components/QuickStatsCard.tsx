import { useStudent } from '../context/StudentContext';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Award, Calendar, Bell, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { type Student, calculateGPA, getOverallAttendance, getStudentEnrollments } from '../data/database';

interface Props { darkMode: boolean; }

export default function QuickStatsCard({ darkMode }: Props) {
  const { student, enrollments, attendance, unreadCount } = useStudent();
  const gpa = calculateGPA(student.studentId);
  const att = getOverallAttendance(student.studentId);
  const enrollments = getStudentEnrollments(student.studentId);
  const totalCredits = enrollments.length * 3;

  const card = darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const text = darkMode ? '#f7fafc' : '#1a202c';
  const muted = darkMode ? '#718096' : '#6b7280';

  const stats = [
    { icon: Award, label: 'GPA', value: gpa.toFixed(2), sub: 'B Average', color: '#c5a572', bg: 'rgba(197,165,114,0.12)' },
    { icon: TrendingUp, label: 'Attendance', value: `${att.percentage}%`, sub: 'Overall rate', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
    { icon: BookOpen, label: 'Courses', value: String(enrollments.length), sub: 'Active courses', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
    { icon: CreditCard, label: 'Credits', value: String(totalCredits), sub: 'This semester', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
    { icon: CheckCircle, label: 'Completed', value: '0/6', sub: 'Ongoing semester', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    { icon: Calendar, label: 'Finals', value: '36d', sub: 'Until finals', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
    { icon: Bell, label: 'Unread', value: String(unreadCount), sub: 'Announcements', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
    { icon: Clock, label: 'Classes', value: String(att.total), sub: 'Total attended', color: '#1e3c2c', bg: 'rgba(30,60,44,0.1)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      whileHover={{ y: -4 }}
      className="rounded-3xl p-6 flex flex-col gap-4"
      style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)', boxShadow: '0 8px 30px rgba(0,20,10,0.06)' }}>

      <div>
        <h2 className="font-bold text-base" style={{ color: text }}>Quick Stats</h2>
        <p className="text-xs" style={{ color: muted }}>Academic Overview • Spring 2026</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ icon: Icon, label, value, sub, color, bg }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + idx * 0.05 }}
            className="p-3 rounded-2xl"
            style={{ background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)' }}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                <Icon size={13} style={{ color }} />
              </div>
              <span className="text-xs" style={{ color: muted }}>{label}</span>
            </div>
            <div className="text-xl font-black" style={{ color }}>{value}</div>
            <div className="text-xs" style={{ color: muted }}>{sub}</div>
          </motion.div>
        ))}
      </div>

      {/* GPA visual bar */}
      <div className="px-3 py-3 rounded-2xl" style={{ background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)' }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold" style={{ color: muted }}>GPA Progress</span>
          <span className="text-xs font-bold" style={{ color: '#c5a572' }}>{gpa.toFixed(2)} / 4.00</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
          <motion.div
            initial={{ width: 0 }} animate={{ width: `${(gpa / 4) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #c5a572, #a8834d)' }}
          />
        </div>
        <div className="flex justify-between mt-1">
          {['F', 'D', 'C', 'B', 'A'].map((g) => (
            <span key={g} className="text-xs" style={{ color: muted }}>{g}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

