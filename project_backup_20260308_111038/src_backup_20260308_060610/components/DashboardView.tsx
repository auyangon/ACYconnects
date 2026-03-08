import { Student, getStudentEnrollments, getStudentAttendance, getCourseById, getGradePoint, getProgressForCourse, calculateGPA, getInitials, announcements, syncLogs, students } from '../data/database';
import ProfileCard from './ProfileCard';
import CourseProgressCard from './CourseProgressCard';
import AttendanceCard from './AttendanceCard';
import AnnouncementsCard from './AnnouncementsCard';
import DeadlinesCard from './DeadlinesCard';
import QuickStatsCard from './QuickStatsCard';
import SyncStatus from './SyncStatus';

interface Props {
  darkMode: boolean;
}

export default function DashboardView({ darkMode }: Props) {
  return (
    <div className="p-6 space-y-6">
      <SyncStatus darkMode={darkMode} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ProfileCard darkMode={darkMode} />
        <CourseProgressCard darkMode={darkMode} />
        <AttendanceCard darkMode={darkMode} />
        <AnnouncementsCard darkMode={darkMode} />
        <DeadlinesCard darkMode={darkMode} />
        <QuickStatsCard darkMode={darkMode} />
      </div>
    </div>
  );
}



