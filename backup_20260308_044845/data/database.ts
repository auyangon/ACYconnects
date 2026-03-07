// ============================================================
// AUY STUDENT PORTAL - COMPLETE DATABASE (from Excel)
// ============================================================

export interface Student {
  studentId: string;
  email: string;
  studentName: string;
  major: string;
  studyMode: string;
  status: string;
  year: number;
}

export interface Enrollment {
  studentId: string;
  courseCode: string;
  grade: string;
  googleClassroomLink: string;
  teacher: string;
}

export interface Course {
  courseCode: string;
  courseName: string;
  credits: number;
  teacher: string;
  googleClassroomLink: string;
  color: string;
}

export interface Announcement {
  id: string;
  title: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  author: string;
  date: string;
  content: string;
  emoji: string;
}

export interface AttendanceRecord {
  studentId: string;
  courseCode: string;
  totalClasses: number;
  present: number;
  late: number;
  absent: number;
  percentage: number;
}

export interface Notification {
  studentId: string;
  announcementId: string;
  read: boolean;
}

export interface SyncLog {
  timestamp: string;
  type: string;
  status: string;
  message: string;
}

// ============================================================
// STUDENTS SHEET (24 students)
// ============================================================
export const students: Student[] = [
  { studentId: 'S001', email: 'aung.khant@auy.edu.mm', studentName: 'Aung Khant Phyo', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S002', email: 'hsu.eain@auy.edu.mm', studentName: 'Hsu Eain Htet', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S003', email: 'kyaw.zin@auy.edu.mm', studentName: 'Kyaw Zin Oo', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S004', email: 'may.thu@auy.edu.mm', studentName: 'May Thu Zar', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S005', email: 'nay.lin@auy.edu.mm', studentName: 'Nay Lin Tun', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S006', email: 'su.myat@auy.edu.mm', studentName: 'Su Myat Noe', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S007', email: 'thant.zin@auy.edu.mm', studentName: 'Thant Zin Win', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S008', email: 'ei.phyu@auy.edu.mm', studentName: 'Ei Phyu Sin', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S009', email: 'min.khant@auy.edu.mm', studentName: 'Min Khant Kyaw', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S010', email: 'yadanar@auy.edu.mm', studentName: 'Yadanar Htun', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S011', email: 'zaw.linn@auy.edu.mm', studentName: 'Zaw Linn Aung', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S012', email: 'phyu.phyu@auy.edu.mm', studentName: 'Phyu Phyu Khin', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S013', email: 'thet.naing@auy.edu.mm', studentName: 'Thet Naing Oo', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S014', email: 'wai.yan@auy.edu.mm', studentName: 'Wai Yan Phyo', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S015', email: 'hnin.wai@auy.edu.mm', studentName: 'Hnin Wai Lwin', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S016', email: 'pyae.sone@auy.edu.mm', studentName: 'Pyae Sone Aung', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S017', email: 'myat.noe@auy.edu.mm', studentName: 'Myat Noe Khin', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S018', email: 'kaung.htet@auy.edu.mm', studentName: 'Kaung Htet Zaw', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S019', email: 'nan.ei@auy.edu.mm', studentName: 'Nan Ei Mon', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S020', email: 'lin.thu@auy.edu.mm', studentName: 'Lin Thu Zar', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S021', email: 'aung.myo@auy.edu.mm', studentName: 'Aung Myo Thu', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S022', email: 'thin.zar@auy.edu.mm', studentName: 'Thin Zar Win', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S023', email: 'ko.ko@auy.edu.mm', studentName: 'Ko Ko Naing', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
  { studentId: 'S024', email: 'ma.yamone@auy.edu.mm', studentName: 'Ma Yamone Kyaw', major: 'ISP', studyMode: 'OnCampus', status: 'Active', year: 1 },
];

// ============================================================
// COURSES SHEET (6 courses)
// ============================================================
export const courses: Course[] = [
  { courseCode: 'BUS101', courseName: 'Introduction to Business', credits: 3, teacher: 'Prof. Johnson', googleClassroomLink: 'https://classroom.google.com/c/bus101', color: '#3b82f6' },
  { courseCode: 'ENG101', courseName: 'English Communication Skills', credits: 3, teacher: 'Dr. Smith', googleClassroomLink: 'https://classroom.google.com/c/eng101', color: '#10b981' },
  { courseCode: 'HUM11', courseName: 'Humanities and Society', credits: 3, teacher: 'Prof. Green', googleClassroomLink: 'https://classroom.google.com/c/hum11', color: '#8b5cf6' },
  { courseCode: 'IT101', courseName: 'Introduction to Information Technology', credits: 3, teacher: 'Dr. Brown', googleClassroomLink: 'https://classroom.google.com/c/it101', color: '#f59e0b' },
  { courseCode: 'MATH101', courseName: 'Mathematics for Business', credits: 3, teacher: 'Prof. Lee', googleClassroomLink: 'https://classroom.google.com/c/math101', color: '#ef4444' },
  { courseCode: 'STAT100', courseName: 'Introduction to Statistics', credits: 3, teacher: 'Dr. White', googleClassroomLink: 'https://classroom.google.com/c/stat100', color: '#06b6d4' },
];

// ============================================================
// ENROLLMENTS SHEET (63 enrollments - 24 students × 6 courses minus some)
// ============================================================
const gradeMap: Record<string, Record<string, string>> = {
  S001: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S002: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S003: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S004: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S005: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S006: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S007: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S008: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S009: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S010: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S011: { BUS101: 'C', ENG101: 'C', HUM11: 'C', IT101: 'B', MATH101: 'C', STAT100: 'C' },
  S012: { BUS101: 'C', ENG101: 'C', HUM11: 'B', IT101: 'C', MATH101: 'C', STAT100: 'B' },
  S013: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S014: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S015: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S016: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S017: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S018: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S019: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S020: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S021: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S022: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S023: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
  S024: { BUS101: 'B', ENG101: 'B', HUM11: 'B', IT101: 'B', MATH101: 'B', STAT100: 'B' },
};

export const enrollments: Enrollment[] = students.flatMap(s =>
  courses.map(c => ({
    studentId: s.studentId,
    courseCode: c.courseCode,
    grade: gradeMap[s.studentId]?.[c.courseCode] ?? 'B',
    googleClassroomLink: c.googleClassroomLink,
    teacher: c.teacher,
  }))
);

// ============================================================
// ATTENDANCE SUMMARY SHEET
// ============================================================
const attendanceSeedMap: Record<string, Record<string, { total: number; present: number; late: number; absent: number }>> = {
  S001: {
    BUS101: { total: 30, present: 26, late: 2, absent: 2 },
    ENG101: { total: 28, present: 27, late: 1, absent: 0 },
    HUM11:  { total: 25, present: 22, late: 2, absent: 1 },
    IT101:  { total: 28, present: 25, late: 2, absent: 1 },
    MATH101:{ total: 30, present: 25, late: 3, absent: 2 },
    STAT100:{ total: 26, present: 21, late: 3, absent: 2 },
  },
  S002: {
    BUS101: { total: 30, present: 28, late: 1, absent: 1 },
    ENG101: { total: 28, present: 26, late: 1, absent: 1 },
    HUM11:  { total: 25, present: 23, late: 1, absent: 1 },
    IT101:  { total: 28, present: 26, late: 1, absent: 1 },
    MATH101:{ total: 30, present: 27, late: 2, absent: 1 },
    STAT100:{ total: 26, present: 24, late: 1, absent: 1 },
  },
};

function generateAttendance(_studentId: string, _courseCode: string, seed: number) {
  const total = 25 + (seed % 6);
  const absent = seed % 3;
  const late = 1 + (seed % 3);
  const present = total - absent - late;
  return { total, present, late, absent };
}

export const attendanceSummary: AttendanceRecord[] = students.flatMap(s =>
  courses.map((c, ci) => {
    const pre = attendanceSeedMap[s.studentId]?.[c.courseCode];
    const seed = (parseInt(s.studentId.replace('S', '')) * 7 + ci * 13) % 17;
    const data = pre ?? generateAttendance(s.studentId, c.courseCode, seed);
    const percentage = Math.round(((data.present + data.late * 0.5) / data.total) * 10000) / 100;
    return {
      studentId: s.studentId,
      courseCode: c.courseCode,
      totalClasses: data.total,
      present: data.present,
      late: data.late,
      absent: data.absent,
      percentage,
    };
  })
);

// ============================================================
// ANNOUNCEMENTS SHEET (8 announcements)
// ============================================================
export const announcements: Announcement[] = [
  { id: 'A001', title: 'Final Exam Schedule', priority: 'HIGH', author: 'Academic Office', date: '2026-04-15', content: 'Final examinations will be held from April 15–30, 2026. Please check the timetable on the portal and prepare accordingly. All students must carry their student ID.', emoji: '🎓' },
  { id: 'A002', title: 'Thingyan Holiday Notice', priority: 'HIGH', author: 'Administration', date: '2026-03-20', content: 'The university will be closed for Thingyan Water Festival from March 30 – April 4, 2026. Classes resume on April 5. Enjoy the holidays!', emoji: '🎉' },
  { id: 'A003', title: 'Library Extended Hours', priority: 'MEDIUM', author: 'Library Services', date: '2026-05-01', content: 'The library will be open until 10 PM during exam season starting May 1, 2026. Quiet study zones are available on all floors.', emoji: '📖' },
  { id: 'A004', title: 'BUS101 Assignment Due', priority: 'HIGH', author: 'Prof. Johnson', date: '2026-03-15', content: 'The BUS101 case study assignment is due on March 15, 2026 at 11:59 PM. Submit via Google Classroom. Late submissions will incur a 10% penalty per day.', emoji: '📝' },
  { id: 'A005', title: 'ENG101 Essay Guidelines', priority: 'MEDIUM', author: 'Dr. Smith', date: '2026-03-18', content: 'Please review the updated essay guidelines for ENG101. The essay should be 1500–2000 words, double-spaced, APA format. Submit via Google Classroom by March 18.', emoji: '🔬' },
  { id: 'A006', title: 'Campus Network Maintenance', priority: 'LOW', author: 'IT Department', date: '2026-03-01', content: 'Scheduled network maintenance on March 1, 2026 from 2–4 AM. Internet services may be temporarily unavailable during this period.', emoji: '⚙️' },
  { id: 'A007', title: 'STAT100 Quiz Reminder', priority: 'MEDIUM', author: 'Dr. White', date: '2026-03-25', content: 'Reminder: STAT100 in-class quiz on Chapter 4 (Probability) will be held on March 25. Review lecture notes and practice problems.', emoji: '📊' },
  { id: 'A008', title: 'Course Registration Deadline', priority: 'HIGH', author: 'Registrar Office', date: '2026-04-10', content: 'Course registration for the next semester closes on April 10, 2026. Log in to the student portal to select your courses before the deadline.', emoji: '📅' },
];

// ============================================================
// STUDENT NOTIFICATIONS (all unread initially)
// ============================================================
export const notifications: Notification[] = students.flatMap(s =>
  announcements.map(a => ({
    studentId: s.studentId,
    announcementId: a.id,
    read: false,
  }))
);

// ============================================================
// SYNC LOG
// ============================================================
export const syncLogs: SyncLog[] = [
  { timestamp: '2026-03-03 08:31:22', type: 'Auto', status: 'Success', message: 'Students sheet synced successfully (24 records)' },
  { timestamp: '2026-03-03 08:31:45', type: 'Auto', status: 'Error', message: 'Announcements sync failed: Invalid date format in row 7' },
  { timestamp: '2026-03-03 08:32:01', type: 'Auto', status: 'Error', message: 'Enrollments sync failed: Missing grade data for S011 row 14' },
  { timestamp: '2026-03-03 08:32:30', type: 'Auto', status: 'Success', message: 'Courses sheet synced successfully (6 records)' },
  { timestamp: '2026-03-02 14:15:00', type: 'Manual', status: 'Success', message: 'Attendance form responses imported (40 records)' },
  { timestamp: '2026-03-01 09:00:00', type: 'Auto', status: 'Success', message: 'AttendanceSummary sheet synced successfully' },
  { timestamp: '2026-02-28 08:00:00', type: 'Auto', status: 'Warning', message: 'StudentNotifications: 144 records processed, 2 duplicates skipped' },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================
export function getStudentEnrollments(studentId: string): Enrollment[] {
  return enrollments.filter(e => e.studentId === studentId);
}

export function getStudentAttendance(studentId: string): AttendanceRecord[] {
  return attendanceSummary.filter(a => a.studentId === studentId);
}

export function getStudentNotifications(studentId: string): Notification[] {
  return notifications.filter(n => n.studentId === studentId);
}

export function getGradePoint(grade: string): number {
  const map: Record<string, number> = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0 };
  return map[grade] ?? 0;
}

export function calculateGPA(studentId: string): number {
  const enrs = getStudentEnrollments(studentId);
  if (enrs.length === 0) return 0;
  const total = enrs.reduce((sum, e) => sum + getGradePoint(e.grade), 0);
  return Math.round((total / enrs.length) * 100) / 100;
}

export function getOverallAttendance(studentId: string): { present: number; late: number; absent: number; total: number; percentage: number } {
  const records = getStudentAttendance(studentId);
  const present = records.reduce((s, r) => s + r.present, 0);
  const late = records.reduce((s, r) => s + r.late, 0);
  const absent = records.reduce((s, r) => s + r.absent, 0);
  const total = records.reduce((s, r) => s + r.totalClasses, 0);
  const percentage = total > 0 ? Math.round(((present + late * 0.5) / total) * 10000) / 100 : 0;
  return { present, late, absent, total, percentage };
}

export function getCourseById(code: string): Course | undefined {
  return courses.find(c => c.courseCode === code);
}

export function getProgressForCourse(studentId: string, courseCode: string): number {
  const progressMap: Record<string, Record<string, number>> = {
    S001: { BUS101: 75, ENG101: 80, HUM11: 70, IT101: 85, MATH101: 60, STAT100: 65 },
  };
  if (progressMap[studentId]?.[courseCode] !== undefined) return progressMap[studentId][courseCode];
  const seed = (parseInt(studentId.replace('S', '')) * 11 + courseCode.charCodeAt(0)) % 30;
  return 55 + seed;
}

export function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date('2026-03-10');
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}
