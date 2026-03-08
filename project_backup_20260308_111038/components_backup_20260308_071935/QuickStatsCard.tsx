import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Award, Calendar, Bell, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

interface Props { darkMode: boolean; }

export default function QuickStatsCard({ darkMode }: Props) {
  const { student, enrollments, attendance, unreadCount } = useStudent();

  // GPA calculation with useMemo
  const gpa = useMemo(() => {
    const grades = enrollments.map(e => e.grade);
    const points = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
    const total = grades.reduce((acc, g) => acc + (points[g as keyof typeof points] || 0), 0);
    return grades.length ? total / grades.length : 0;
  }, [enrollments]);

  // Attendance summary with useMemo
  const att = useMemo(() => {
    const total = attendance.reduce((acc, a) => acc + a.totalClasses, 0);
    const present = attendance.reduce((acc, a) => acc + a.present, 0);
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    return { total, present, percentage };
  }, [attendance]);

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
      {/* Paste your existing JSX for the stats display here */}
    </motion.div>
  );
}




