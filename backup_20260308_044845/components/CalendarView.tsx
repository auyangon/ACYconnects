import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props { darkMode: boolean; }

const events: Record<string, { title: string; color: string }[]> = {
  '2026-03-15': [{ title: 'BUS101 Due', color: '#3b82f6' }],
  '2026-03-18': [{ title: 'ENG101 Essay', color: '#10b981' }],
  '2026-03-25': [{ title: 'STAT100 Quiz', color: '#06b6d4' }],
  '2026-03-30': [{ title: 'Thingyan Break', color: '#10b981' }],
  '2026-03-31': [{ title: 'Thingyan Break', color: '#10b981' }],
  '2026-04-01': [{ title: 'Thingyan Break', color: '#10b981' }],
  '2026-04-02': [{ title: 'Thingyan Break', color: '#10b981' }],
  '2026-04-03': [{ title: 'Thingyan Break', color: '#10b981' }],
  '2026-04-04': [{ title: 'Thingyan Break', color: '#10b981' }],
  '2026-04-10': [{ title: 'Course Reg Deadline', color: '#f59e0b' }],
  '2026-04-15': [{ title: 'Finals Begin', color: '#ef4444' }],
};

export default function CalendarView({ darkMode }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date('2026-03-01'));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const text = darkMode ? '#f7fafc' : '#1a202c';
  const muted = darkMode ? '#718096' : '#6b7280';
  const card = darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const dayBg = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)';

  const today = '2026-03-10';

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black" style={{ color: text }}>Calendar</h1>
        <p className="text-sm" style={{ color: muted }}>Academic schedule & deadlines</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-3xl p-6" style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)' }}>

        {/* Month header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-2 rounded-xl" style={{ color: muted }}>
            <ChevronLeft size={18} />
          </button>
          <h2 className="font-bold text-lg" style={{ color: text }}>{monthName}</h2>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-2 rounded-xl" style={{ color: muted }}>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-xs font-semibold py-2" style={{ color: muted }}>{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events[dateStr] ?? [];
            const isToday = dateStr === today;

            return (
              <motion.div key={day} whileHover={{ scale: 1.05 }}
                className="rounded-xl p-1.5 min-h-12 flex flex-col items-center gap-0.5 cursor-pointer"
                style={{ background: isToday ? 'linear-gradient(135deg, #1e3c2c, #2d5a3e)' : dayEvents.length > 0 ? dayBg : 'transparent' }}>
                <span className="text-xs font-semibold" style={{ color: isToday ? '#fff' : text }}>{day}</span>
                {dayEvents.slice(0, 2).map((ev, ei) => (
                  <div key={ei} className="w-full text-center px-0.5 py-0.5 rounded text-xs truncate" style={{ background: ev.color + '25', color: ev.color, fontSize: 8 }}>
                    {ev.title}
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Upcoming events list */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-3xl p-6" style={{ background: card, border: `1px solid ${border}`, backdropFilter: 'blur(20px)' }}>
        <h3 className="font-bold text-sm mb-4" style={{ color: text }}>Upcoming Events</h3>
        <div className="space-y-2">
          {Object.entries(events)
            .filter(([d]) => d >= today)
            .sort(([a], [b]) => a.localeCompare(b))
            .slice(0, 8)
            .map(([date, evs]) => evs.map((ev, i) => (
              <div key={`${date}-${i}`} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: dayBg }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ev.color }} />
                <div className="flex-1">
                  <div className="text-xs font-semibold" style={{ color: text }}>{ev.title}</div>
                  <div className="text-xs" style={{ color: muted }}>
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
            )))
          }
        </div>
      </motion.div>
    </div>
  );
}
