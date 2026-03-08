import { useStudent } from '../context/StudentContext';
import { motion } from 'framer-motion';
import { ExternalLink, Users, Clock, BookOpen, Star } from 'lucide-react';


interface Props { darkMode: boolean; }

const gradeColors: Record<string, string> = { A: '#10b981', B: '#3b82f6', C: '#f59e0b', D: '#ef4444', F: '#6b7280' };

export default function CoursesView({ student, darkMode }: Props) {
  const enrollments = getStudentEnrollments(student.studentId);
  const attendance = getStudentAttendance(student.studentId);

  const text = darkMode ? '#f7fafc' : '#1a202c';
  const muted = darkMode ? '#718096' : '#6b7280';
  const card = darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black" style={{ color: text }}>My Courses</h1>
        <p className="text-sm" style={{ color: muted }}>Spring 2026 • {enrollments.length} courses enrolled • 18 credits</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {enrollments.map((enr, idx) => {
          const course = getCourseById(enr.courseCode);
          const att = attendance.find(a => a.courseCode === enr.courseCode);
          const progress = getProgressForCourse(student.studentId, enr.courseCode);
          if (!course) return null;

          return (
            <motion.div key={enr.courseCode}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl p-5 flex flex-col gap-4"
              style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)', boxShadow: '0 8px 30px rgba(0,20,10,0.06)' }}>

              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm"
                  style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}99)` }}>
                  {enr.courseCode.slice(0, 3)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm" style={{ color: text }}>{enr.courseCode}</div>
                  <div className="text-xs truncate" style={{ color: muted }}>{course.courseName}</div>
                </div>
                <div className="px-2.5 py-1 rounded-xl text-xs font-bold"
                  style={{ background: `${gradeColors[enr.grade]}20`, color: gradeColors[enr.grade] }}>
                  {enr.grade}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Users, label: 'Teacher', value: enr.teacher.split(' ')[1] },
                  { icon: Clock, label: 'Attendance', value: att ? `${att.percentage}%` : 'N/A' },
                  { icon: BookOpen, label: 'Credits', value: `${course.credits} cr` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="text-center p-2 rounded-xl" style={{ background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }}>
                    <Icon size={12} style={{ color: course.color, margin: '0 auto 2px' }} />
                    <div className="text-xs font-bold" style={{ color: text }}>{value}</div>
                    <div className="text-xs" style={{ color: muted, fontSize: 9 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: muted }}>Course Progress</span>
                  <span className="font-bold" style={{ color: course.color }}>{progress}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}>
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${course.color}, ${course.color}99)` }}
                  />
                </div>
              </div>

              {/* Attendance breakdown */}
              {att && (
                <div className="grid grid-cols-3 gap-1 text-center">
                  {[
                    { label: 'Present', value: att.present, color: '#10b981' },
                    { label: 'Late', value: att.late, color: '#f59e0b' },
                    { label: 'Absent', value: att.absent, color: '#ef4444' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="p-1.5 rounded-xl" style={{ background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }}>
                      <div className="text-sm font-black" style={{ color }}>{value}</div>
                      <div className="text-xs" style={{ color: muted, fontSize: 9 }}>{label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Stars + link */}
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={10} fill={i <= (enr.grade === 'A' ? 5 : enr.grade === 'B' ? 4 : 3) ? course.color : 'none'}
                      style={{ color: course.color }} />
                  ))}
                </div>
                <a href={course.googleClassroomLink} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl text-white"
                  style={{ background: course.color }}>
                  <ExternalLink size={10} /> Classroom
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}




