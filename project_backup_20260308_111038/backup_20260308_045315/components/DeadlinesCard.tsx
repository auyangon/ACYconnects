import { useStudent } from '../context/StudentContext';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, Calendar, ExternalLink } from 'lucide-react';

interface Props { darkMode: boolean; }

const deadlines = [
  { title: 'BUS101 Assignment Due', course: 'BUS101', date: '2026-03-15', daysLeft: 5, type: 'assignment', urgent: true, link: 'https://classroom.google.com/c/bus101' },
  { title: 'ENG101 Essay Submission', course: 'ENG101', date: '2026-03-18', daysLeft: 8, type: 'assignment', urgent: false, link: 'https://classroom.google.com/c/eng101' },
  { title: 'STAT100 Chapter Quiz', course: 'STAT100', date: '2026-03-25', daysLeft: 15, type: 'quiz', urgent: false, link: 'https://classroom.google.com/c/stat100' },
  { title: 'Thingyan Holiday Break', course: null, date: '2026-03-30', daysLeft: 20, type: 'holiday', urgent: false, link: null },
  { title: 'Course Registration Deadline', course: null, date: '2026-04-10', daysLeft: 31, type: 'admin', urgent: false, link: null },
  { title: 'Final Exam Period Begins', course: null, date: '2026-04-15', daysLeft: 36, type: 'exam', urgent: false, link: null },
];

const typeConfig: Record<string, { bg: string; color: string; icon: string }> = {
  assignment: { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6', icon: '📝' },
  quiz: { bg: 'rgba(139,92,246,0.12)', color: '#8b5cf6', icon: '📊' },
  exam: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444', icon: '🎓' },
  holiday: { bg: 'rgba(16,185,129,0.12)', color: '#10b981', icon: '🎉' },
  admin: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', icon: '📅' },
};

export default function DeadlinesCard({ darkMode }: Props) {
  const card = darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const text = darkMode ? '#f7fafc' : '#1a202c';
  const muted = darkMode ? '#718096' : '#6b7280';
  const rowBg = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
      whileHover={{ y: -4 }}
      className="rounded-3xl p-6 flex flex-col gap-4"
      style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)', boxShadow: '0 8px 30px rgba(0,20,10,0.06)' }}>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-base" style={{ color: text }}>Upcoming Deadlines</h2>
          <p className="text-xs" style={{ color: muted }}>Next 40 days</p>
        </div>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.12)' }}>
          <AlertTriangle size={15} style={{ color: '#ef4444' }} />
        </div>
      </div>

      <div className="space-y-2">
        {deadlines.map((d, idx) => {
          const cfg = typeConfig[d.type];
          return (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{ background: d.urgent ? 'rgba(239,68,68,0.06)' : rowBg, border: d.urgent ? '1px solid rgba(239,68,68,0.15)' : '1px solid transparent' }}>
              <div className="text-lg flex-shrink-0">{cfg.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate" style={{ color: text }}>{d.title}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Calendar size={10} style={{ color: muted }} />
                  <span className="text-xs" style={{ color: muted }}>
                    {new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  {d.course && (
                    <span className="text-xs px-1.5 py-0.5 rounded-md font-medium" style={{ background: cfg.bg, color: cfg.color }}>{d.course}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-1 rounded-xl"
                  style={{
                    background: d.daysLeft <= 7 ? 'rgba(239,68,68,0.12)' : d.daysLeft <= 14 ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)',
                    color: d.daysLeft <= 7 ? '#ef4444' : d.daysLeft <= 14 ? '#f59e0b' : '#10b981',
                  }}>
                  <Clock size={9} />
                  <span className="text-xs font-bold">{d.daysLeft}d</span>
                </div>
                {d.link && (
                  <a href={d.link} target="_blank" rel="noreferrer"
                    className="p-1 rounded-lg"
                    style={{ color: muted }}
                    onClick={e => e.stopPropagation()}>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

