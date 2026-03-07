import { useStudent } from '../context/StudentContext';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { getStudentAttendance, getOverallAttendance, getCourseById, type Student } from '../data/database';

interface Props { darkMode: boolean; }

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

export default function AttendanceCard({ darkMode }: Props) {
  const { attendance, enrollments } = useStudent();
  const { attendance, enrollments } = useStudent();
  const overall = {
  const total = attendance.reduce((acc, a) => acc + a.totalClasses, 0);
  const present = attendance.reduce((acc, a) => acc + a.present, 0);
  const late = attendance.reduce((acc, a) => acc + a.late, 0);
  const absent = attendance.reduce((acc, a) => acc + a.absent, 0);
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
  return { total, present, late, absent, percentage };
};
  const records = attendance;

  const pieData = [
    { name: 'Present', value: overall.present },
    { name: 'Late', value: overall.late },
    { name: 'Absent', value: overall.absent },
  ];

  const barData = records.map(r => {
    const course = getCourseById(r.courseCode);
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

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-base" style={{ color: text }}>Attendance</h2>
          <p className="text-xs" style={{ color: muted }}>Overall: {overall.percentage}% • {overall.total} classes</p>
        </div>
        <div className="px-3 py-1.5 rounded-xl text-xs font-bold"
          style={{
            background: overall.percentage >= 90 ? 'rgba(16,185,129,0.12)' : overall.percentage >= 75 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)',
            color: overall.percentage >= 90 ? '#10b981' : overall.percentage >= 75 ? '#f59e0b' : '#ef4444',
          }}>
          {overall.percentage >= 90 ? 'Excellent' : overall.percentage >= 75 ? 'Good' : 'At Risk'}
        </div>
      </div>

      {/* Donut + legend */}
      <div className="flex items-center gap-4">
        <div className="relative" style={{ width: 120, height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={36} outerRadius={52}
                dataKey="value" strokeWidth={0}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: darkMode ? '#2d3748' : '#fff', border: 'none', borderRadius: 12, fontSize: 11 }}
                labelStyle={{ color: text }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-black" style={{ color: text }}>{overall.percentage}%</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {pieData.map((d, i) => (
            <div key={d.name} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
              <span className="text-xs flex-1" style={{ color: muted }}>{d.name}</span>
              <span className="text-xs font-bold" style={{ color: text }}>{d.value}</span>
              <span className="text-xs" style={{ color: muted }}>
                ({overall.total > 0 ? Math.round((d.value / overall.total) * 100) : 0}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Per-course bar chart */}
      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: muted }}>Per-Course Attendance</p>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 9, fill: muted }} axisLine={false} tickLine={false} />
            <YAxis domain={[60, 100]} tick={{ fontSize: 9, fill: muted }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: darkMode ? '#2d3748' : '#fff', border: 'none', borderRadius: 12, fontSize: 11 }}
              formatter={(v) => [`${v}%`, 'Attendance']}
            />
            <Bar dataKey="attendance" radius={[6, 6, 0, 0]}>
              {barData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly trend */}
      <div>
        <p className="text-xs font-semibold mb-2" style={{ color: muted }}>Weekly Trend (last 4 weeks)</p>
        <div className="flex gap-2">
          {['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'].map((w, i) => {
            const val = [85, 90, 88, 92][i];
            return (
              <div key={w} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-lg overflow-hidden" style={{ height: 40, background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }}>
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: `${val}%` }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="w-full rounded-lg mt-auto"
                    style={{ background: 'linear-gradient(180deg, #10b981, #059669)', marginTop: `${100 - val}%` }}
                  />
                </div>
                <span className="text-xs" style={{ color: muted }}>{w}</span>
                <span className="text-xs font-bold" style={{ color: text }}>{val}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}


