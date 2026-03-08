import { useStudent } from '../context/StudentContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface Props { darkMode: boolean; }
const gradeColors: Record<string, string> = { A: '#10b981', B: '#3b82f6', C: '#f59e0b', D: '#ef4444', F: '#6b7280' };
export default function CourseProgressCard({ darkMode }: Props) {
  const { enrollments } = useStudent();
  const [expanded, setExpanded] = useState<string | null>(null);
  const enrollments = enrollments;
  const attendance = attendance;
  const card = darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const text = darkMode ? '#f7fafc' : '#1a202c';
  const muted = darkMode ? '#718096' : '#6b7280';
  const rowBg = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      whileHover={{ y: -4 }}
      className="rounded-3xl p-6 flex flex-col gap-4"
      style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)', boxShadow: '0 8px 30px rgba(0,20,10,0.06)' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-base" style={{ color: text }}>My Courses</h2>
          <p className="text-xs" style={{ color: muted }}>Spring 2026 • {enrollments.length} enrolled</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
          style={{ background: 'rgba(30,60,44,0.1)', color: '#1e3c2c' }}>
          <BookOpen size={12} />
          18 Credits
      </div>
      <div className="space-y-2">
        {enrollments.map((enr, idx) => {
          const course = getCourseById(enr.courseCode);
          const att = attendance.find(a => a.courseCode === enr.courseCode);
          const progress = getProgressForCourse(student.studentId, enr.courseCode);
          const isExpanded = expanded === enr.courseCode;
          if (!course) return null;
          return (
            <motion.div key={enr.courseCode}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: rowBg }}>
              <button
                className="w-full flex items-center gap-3 p-3 text-left"
                onClick={() => setExpanded(isExpanded ? null : enr.courseCode)}>
                {/* Color dot */}
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: course.color }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold" style={{ color: text }}>{enr.courseCode}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg"
                      style={{ background: `${gradeColors[enr.grade] ?? '#6b7280'}20`, color: gradeColors[enr.grade] ?? '#6b7280' }}>
                      {enr.grade}
                    </span>
                  </div>
                  <div className="text-xs truncate" style={{ color: muted }}>{course.courseName}</div>
                  {/* Progress bar */}
                  <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${course.color}, ${course.color}99)` }}
                    />
                </div>
                {isExpanded ? <ChevronUp size={13} style={{ color: muted }} /> : <ChevronDown size={13} style={{ color: muted }} />}
              </button>
              {/* Expanded detail */}
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  className="px-4 pb-3 border-t"
                  style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}>
                  <div className="pt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span style={{ color: muted }}>Teacher</span>
                      <div className="font-semibold" style={{ color: text }}>{course.teacher}</div>
                    </div>
                      <span style={{ color: muted }}>Attendance</span>
                      <div className="font-semibold" style={{ color: text }}>{att ? `${att.percentage}%` : 'N/A'}</div>
                      <span style={{ color: muted }}>Progress</span>
                      <div className="font-semibold" style={{ color: text }}>{progress}%</div>
                      <span style={{ color: muted }}>Credits</span>
                      <div className="font-semibold" style={{ color: text }}>{course.credits} cr</div>
                  <a href={course.googleClassroomLink} target="_blank" rel="noreferrer"
                    className="mt-2 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl w-fit"
                    style={{ background: 'rgba(30,60,44,0.1)', color: '#1e3c2c' }}
                    onClick={e => e.stopPropagation()}>
                    <ExternalLink size={11} /> Open Classroom
                  </a>
                </motion.div>
              )}
            </motion.div>
          );
        })}
    </motion.div>
  );
}

