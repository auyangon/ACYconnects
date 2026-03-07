import { type Student } from '../data/database';
import ProfileCard from './ProfileCard';
import CourseProgressCard from './CourseProgressCard';
import AttendanceCard from './AttendanceCard';
import AnnouncementsCard from './AnnouncementsCard';
import DeadlinesCard from './DeadlinesCard';
import QuickStatsCard from './QuickStatsCard';
import SyncStatus from './SyncStatus';

interface Props {
  student: Student;
  darkMode: boolean;
  unreadCount: number;
}

export default function DashboardView({ student, darkMode, unreadCount }: Props) {
  return (
    <div className="p-6 space-y-6">
      {/* Sync status bar */}
      <SyncStatus darkMode={darkMode} />

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ProfileCard student={student} darkMode={darkMode} />
        <CourseProgressCard student={student} darkMode={darkMode} />
        <AttendanceCard student={student} darkMode={darkMode} />
        <AnnouncementsCard darkMode={darkMode} />
        <DeadlinesCard darkMode={darkMode} />
        <QuickStatsCard student={student} darkMode={darkMode} unreadCount={unreadCount} />
      </div>
    </div>
  );
}
