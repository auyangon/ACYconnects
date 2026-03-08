import { useStudent } from '../context/StudentContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronRight, Eye } from 'lucide-react';


interface Props { darkMode: boolean; }

const priorityConfig = {
  HIGH: { label: 'High', bg: 'rgba(239,68,68,0.12)', color: '#ef4444', dot: '#ef4444' },
  MEDIUM: { label: 'Medium', bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', dot: '#f59e0b' },
  LOW: { label: 'Low', bg: 'rgba(107,114,128,0.12)', color: '#6b7280', dot: '#6b7280' },
};

export default function AnnouncementsCard({ darkMode }: Props) {
  const { announcements, unreadCount, markAnnouncementRead } = useStudent();
  const { announcements, unreadCount, markAnnouncementRead } = useStudent();
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Announcement | null>(null);

  const markRead = (id: string) => setReadIds(prev => new Set([...prev, id]));
  const unreadCount = announcements.filter(a => !readIds.has(a.id)).length;

  const card = darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const text = darkMode ? '#f7fafc' : '#1a202c';
  const muted = darkMode ? '#718096' : '#6b7280';
  const rowBg = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
      whileHover={{ y: -4 }}
      className="rounded-3xl p-6 flex flex-col gap-4"
      style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)', boxShadow: '0 8px 30px rgba(0,20,10,0.06)' }}>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-base" style={{ color: text }}>Announcements</h2>
          <p className="text-xs" style={{ color: muted }}>{unreadCount} unread</p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}
          className="w-8 h-8 rounded-xl flex items-center justify-center relative"
          style={{ background: 'rgba(239,68,68,0.12)' }}>
          <Bell size={15} style={{ color: '#ef4444' }} />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: '#ef4444', fontSize: 9 }}>{unreadCount}</div>
          )}
        </motion.div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        {announcements.map((ann, idx) => {
          const cfg = priorityConfig[ann.priority];
          const isRead = readIds.has(ann.id);
          return (
            <motion.button
              key={ann.id}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }}
              onClick={() => { setSelected(ann); markRead(ann.id); }}
              className="w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all"
              style={{ background: rowBg, opacity: isRead ? 0.6 : 1 }}>
              <div className="text-xl flex-shrink-0 mt-0.5">{ann.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold truncate" style={{ color: text }}>{ann.title}</span>
                  {!isRead && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>New</span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                  <span className="text-xs" style={{ color: muted }}>{ann.author}</span>
                </div>
                <div className="text-xs mt-0.5" style={{ color: muted }}>
                  {new Date(ann.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <ChevronRight size={13} style={{ color: muted }} className="mt-1 flex-shrink-0" />
            </motion.button>
          );
        })}
      </div>

      {/* Mark all read */}
      <button
        onClick={() => setReadIds(new Set(announcements.map(a => a.id)))}
        className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl w-full justify-center"
        style={{ background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', color: muted }}>
        <Eye size={12} /> Mark all as read
      </button>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelected(null)}>
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl p-6"
              style={{ background: darkMode ? '#2d3748' : '#fff', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }}>
              <div className="text-3xl mb-3">{selected.emoji}</div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: priorityConfig[selected.priority].bg, color: priorityConfig[selected.priority].color }}>
                  {selected.priority}
                </span>
                <span className="text-xs" style={{ color: muted }}>{selected.author}</span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: text }}>{selected.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: muted }}>{selected.content}</p>
              <p className="text-xs mt-3" style={{ color: muted }}>
                {new Date(selected.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <button onClick={() => setSelected(null)}
                className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #1e3c2c, #2d5a3e)' }}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}






