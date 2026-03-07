import { useStudent } from '../context/StudentContext';
import { motion } from 'framer-motion';
import { Mail, Hash, BookOpen, Wifi, CheckCircle, QrCode, Star } from 'lucide-react';
import { type Student, calculateGPA, getStudentEnrollments, getInitials } from '../data/database';

interface ProfileCardProps {
  student: Student;
  darkMode: boolean;
}

export default function ProfileCard({ student, darkMode }: ProfileCardProps) {
  const gpa = calculateGPA(student?.studentId);
  const enrollCount = getStudentEnrollments(student?.studentId).length;
  const initials = getInitials(student?.studentName);

  const card = darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const text = darkMode ? '#f7fafc' : '#1a202c';
  const muted = darkMode ? '#718096' : '#6b7280';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
      whileHover={{ y: -4 }}
      className="rounded-3xl p-6 flex flex-col gap-5"
      style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)', boxShadow: '0 8px 30px rgba(0,20,10,0.06)' }}>

      {/* Avatar + name */}
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
            style={{ background: 'linear-gradient(135deg, #1e3c2c, #2d7a54)' }}>
            {initials}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
            style={{ background: '#10b981', borderColor: darkMode ? '#2d3748' : '#fff' }}>
            <CheckCircle size={10} className="text-white" strokeWidth={3} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-base leading-tight truncate" style={{ color: text }}>{student?.studentName}</h2>
          <p className="text-xs mt-0.5" style={{ color: '#c5a572' }}>{student?.major} Program</p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}>Active</span>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', color: muted }}>Year 1</span>
          </div>
        </div>
        {/* GPA badge */}
        <div className="text-center px-3 py-2 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(197,165,114,0.15), rgba(197,165,114,0.08))' }}>
          <div className="text-xl font-black" style={{ color: '#c5a572' }}>{gpa.toFixed(1)}</div>
          <div className="text-xs font-medium" style={{ color: '#c5a572', opacity: 0.7 }}>GPA</div>
        </div>
      </div>

      {/* Info rows */}
      <div className="space-y-2.5">
        {[
          { icon: Hash, label: 'Student ID', value: student?.studentId },
          { icon: Mail, label: 'Email', value: student?.email },
          { icon: Wifi, label: 'Study Mode', value: student?.studyMode },
          { icon: BookOpen, label: 'Enrolled', value: `${enrollCount} Courses` },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(30,60,44,0.1)' }}>
              <Icon size={13} style={{ color: '#1e3c2c' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs" style={{ color: muted }}>{label}</div>
              <div className="text-xs font-semibold truncate" style={{ color: text }}>{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Stars / rating row */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl" style={{ background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)' }}>
        <QrCode size={13} style={{ color: muted }} />
        <span className="text-xs flex-1" style={{ color: muted }}>Student Card QR</span>
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => (
            <Star key={i} size={10} fill={i <= Math.round(gpa / 0.8) ? '#c5a572' : 'none'} style={{ color: '#c5a572' }} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}


