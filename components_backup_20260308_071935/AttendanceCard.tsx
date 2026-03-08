import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useStudent } from '../context/StudentContext';

interface Props { darkMode: boolean; }

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export default function AttendanceCard({ darkMode }: Props) {
  const { attendance, enrollments } = useStudent();

  // Calculate overall attendance using useMemo
  const overall = useMemo(() => {
    const total = attendance.reduce((acc, a) => acc + a.totalClasses, 0);
    const present = attendance.reduce((acc, a) => acc + a.present, 0);
    const late = attendance.reduce((acc, a) => acc + a.late, 0);
    const absent = attendance.reduce((acc, a) => acc + a.absent, 0);
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    return { total, present, late, absent, percentage };
  }, [attendance]);

  const records = attendance;

  const pieData = [
    { name: 'Present', value: overall.present },
    { name: 'Late', value: overall.late },
    { name: 'Absent', value: overall.absent },
  ];

  const barData = records.map(r => {
    const course = enrollments.find(e => e.courseCode === r.courseCode);
    return { name: r.courseCode, attendance: r.percentage, fill: course?.color ?? '#6b7280' };
  });

  const card = darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const text = darkMode ? '#f7fafc' : '#1a202c';
  const muted = darkMode ? '#718096' : '#6b7280';
  const gridColor = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
      whileHover={{ y: -4 }}
      className="rounded-3xl p-6 flex flex-col gap-4"
      style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)', boxShadow: '0 8px 30px rgba(0,20,10,0.06)' }}>
      {/* Keep your existing JSX from this point onward – copy it from your original file */}
      {/* The rest of your component's return statement goes here */}
    </motion.div>
  );
}




