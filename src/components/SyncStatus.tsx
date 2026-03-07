import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { syncLogs } from '../data/database';

interface Props { darkMode: boolean; }

export default function SyncStatus({ darkMode }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const hasErrors = syncLogs.some(l => l.status === 'Error');
  const hasWarnings = syncLogs.some(l => l.status === 'Warning');
  const lastSync = syncLogs[0];

  const statusColor = hasErrors ? '#ef4444' : hasWarnings ? '#f59e0b' : '#10b981';
  const statusLabel = hasErrors ? 'Sync Issues' : hasWarnings ? 'Warnings' : 'Synced';
  const StatusIcon = hasErrors ? AlertTriangle : CheckCircle;

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  const statusIconMap: Record<string, React.ReactNode> = {
    Success: <CheckCircle size={12} style={{ color: '#10b981' }} />,
    Error: <XCircle size={12} style={{ color: '#ef4444' }} />,
    Warning: <AlertTriangle size={12} style={{ color: '#f59e0b' }} />,
  };

  const bg = darkMode ? 'rgba(45,55,72,0.8)' : 'rgba(255,255,255,0.85)';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const text = darkMode ? '#f7fafc' : '#1a202c';
  const muted = darkMode ? '#718096' : '#6b7280';

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: bg, border: `1px solid ${border}`, backdropFilter: 'blur(20px)' }}>
      <div className="flex items-center gap-3 px-4 py-3">
        <StatusIcon size={14} style={{ color: statusColor }} />
        <div className="flex-1 min-w-0">
          <span className="text-xs font-semibold" style={{ color: text }}>{statusLabel}</span>
          <span className="text-xs ml-2" style={{ color: muted }}>Last: {lastSync.timestamp}</span>
        </div>
        <button
          onClick={handleSync}
          className="p-1.5 rounded-lg"
          style={{ color: muted }}>
          <motion.div animate={syncing ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 1, repeat: syncing ? Infinity : 0 }}>
            <RefreshCw size={13} />
          </motion.div>
        </button>
        <button onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg" style={{ color: muted }}>
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="overflow-hidden">
            <div className="px-4 pb-3 border-t space-y-1.5" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }}>
              <p className="text-xs font-semibold pt-2" style={{ color: muted }}>Sync Log</p>
              {syncLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="mt-0.5 flex-shrink-0">{statusIconMap[log.status]}</div>
                  <div>
                    <span className="text-xs" style={{ color: muted }}>{log.timestamp}</span>
                    <span className="text-xs ml-2 px-1.5 py-0.5 rounded" style={{ background: log.type === 'Auto' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)', color: log.type === 'Auto' ? '#3b82f6' : '#8b5cf6' }}>{log.type}</span>
                    <p className="text-xs" style={{ color: text }}>{log.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
