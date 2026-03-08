import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, Student, Enrollment, AttendanceRecord, Announcement, Notification } from '../services/api';

interface StudentContextType {
  student: Student | null;
  enrollments: Enrollment[];
  attendance: AttendanceRecord[];
  announcements: Announcement[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  refreshData: () => Promise<void>;
  markAnnouncementRead: (announcementId: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [unreadMap, setUnreadMap] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const studentData = await api.auth(email);
      setStudent(studentData);
      localStorage.setItem('studentId', studentData.studentId);
      await fetchAllData(studentData.studentId);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem('studentId');
  };

  const fetchAllData = async (studentId: string) => {
    const [enr, att, ann, notifs] = await Promise.all([
      api.getEnrollments(studentId),
      api.getAttendance(studentId),
      api.getAnnouncements(),
      api.getNotifications(studentId),
    ]);
    setEnrollments(enr);
    setAttendance(att);
    setAnnouncements(ann);
    const unread = new Set(
      notifs.filter((n: Notification) => n.read !== 'True' && n.read !== true).map(n => n.announcementId)
    );
    setUnreadMap(unread);
  };

  const refreshData = async () => {
    if (!student) return;
    await fetchAllData(student.studentId);
  };

  const markAnnouncementRead = (announcementId: string) => {
    setUnreadMap(prev => {
      const next = new Set(prev);
      next.delete(announcementId);
      return next;
    });
  };

  useEffect(() => {
    const savedId = localStorage.getItem('studentId');
    if (savedId) {
      api.getStudent(savedId)
        .then(s => {
          setStudent(s);
          fetchAllData(s.studentId);
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (!student) return;
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [student]);

  return (
    <StudentContext.Provider value={{
      student,
      enrollments,
      attendance,
      announcements,
      unreadCount: unreadMap.size,
      loading,
      error,
      login,
      logout,
      refreshData,
      markAnnouncementRead,
    }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useStudent must be used within StudentProvider');
  return ctx;
};


