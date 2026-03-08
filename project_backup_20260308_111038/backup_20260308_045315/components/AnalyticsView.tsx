import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Cell
} from 'recharts';
import { type Student, getStudentAttendance, getStudentEnrollments, getCourseById, getGradePoint } from '../data/database';

interface Props { student: Student; darkMode: boolean; }

export default function AnalyticsView({ student, darkMode }: Props) {
  const attendance = getStudentAttendance(student.studentId);
  const enrollments = getStudentEnrollments(student.studentId);

  const text = darkMode ? '#f7fafc' : '#1a202c';
  const muted = darkMode ? '#718096' : '#6b7280';
  const gridColor = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
  const card = darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  const weeklyData = [
    { week: 'Jan W1', attendance: 85, gpa: 3.0 },
    { week: 'Jan W2', attendance: 90, gpa: 3.0 },
    { week: 'Jan W3', attendance: 88, gpa: 3.1 },
    { week: 'Jan W4', attendance: 92, gpa: 3.1 },
    { week: 'Feb W1', attendance: 87, gpa: 3.2 },
    { week: 'Feb W2', attendance: 91, gpa: 3.2 },
    { week: 'Feb W3', attendance: 89, gpa: 3.2 },
    { week: 'Feb W4', attendance: 93, gpa: 3.2 },
    { week: 'Mar W1', attendance: 88, gpa: 3.2 },
  ];

  const radarData = attendance.map(r => ({
    course: r.courseCode,
    attendance: r.percentage,
    grade: (getGradePoint(enrollments.find(e => e.courseCode === r.courseCode)?.grade ?? 'B') / 4) * 100,
  }));

  const gradeData = enrollments.map(e => {
    const course = getCourseById(e.courseCode);
    return { name: e.courseCode, gp: getGradePoint(e.grade), fill: course?.color ?? '#6b7280' };
  });

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black" style={{ color: text }}>Analytics</h1>
        <p className="text-sm" style={{ color: muted }}>Academic performance overview for {student.studentName}</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Attendance trend */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-3xl p-6" style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)' }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: text }}>Attendance Trend (Weekly)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="week" tick={{ fontSize: 9, fill: muted }} axisLine={false} tickLine={false} />
              <YAxis domain={[75, 100]} tick={{ fontSize: 9, fill: muted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: darkMode ? '#2d3748' : '#fff', border: 'none', borderRadius: 12, fontSize: 11 }} />
              <Line type="monotone" dataKey="attendance" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Radar chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-3xl p-6" style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)' }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: text }}>Course Performance Radar</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke={gridColor} />
              <PolarAngleAxis dataKey="course" tick={{ fontSize: 10, fill: muted }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 8, fill: muted }} />
              <Radar name="Attendance" dataKey="attendance" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Grade" dataKey="grade" stroke="#c5a572" fill="#c5a572" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ background: darkMode ? '#2d3748' : '#fff', border: 'none', borderRadius: 12, fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Grade points */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-3xl p-6" style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)' }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: text }}>Grade Points by Course</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={gradeData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: muted }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} tick={{ fontSize: 9, fill: muted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: darkMode ? '#2d3748' : '#fff', border: 'none', borderRadius: 12, fontSize: 11 }}
                formatter={(v) => [Number(v).toFixed(1), 'Grade Points']} />
              <Bar dataKey="gp" radius={[8, 8, 0, 0]}>
                {gradeData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Class comparison */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="rounded-3xl p-6" style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)' }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: text }}>My Attendance vs Class Average</h3>
          <div className="space-y-3">
            {attendance.map(r => {
              const course = getCourseById(r.courseCode);
              const classAvg = 85 + (r.courseCode.charCodeAt(0) % 8);
              return (
                <div key={r.courseCode}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: text }}>{r.courseCode}</span>
                    <span style={{ color: muted }}>Me: {r.percentage}% | Avg: {classAvg}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                    <div className="h-full rounded-full relative" style={{ width: `${Math.max(r.percentage, classAvg)}%` }}>
                      <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(classAvg / Math.max(r.percentage, classAvg)) * 100}%`, background: 'rgba(107,114,128,0.4)' }} />
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${(r.percentage / Math.max(r.percentage, classAvg)) * 100}%` }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: course?.color ?? '#1e3c2c' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
