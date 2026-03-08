import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api } from '../services/api';
import type { Student, Enrollment, AttendanceRecord, Announcement } from '../services/api';

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
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
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
    try {
      const [enr, att, ann, notifs] = await Promise.all([
        api.getEnrollments(studentId),
        api.getAttendance(studentId),
        api.getAnnouncements(),
        api.getNotifications(studentId),
      ]);
      setEnrollments(enr);
      setAttendance(att);
      setAnnouncements(ann);
      setUnreadCount(notifs.filter(n => String(n.read).toLowerCase() !== 'true').length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

  return (
    <StudentContext.Provider value={{
      student,
      enrollments,
      attendance,
      announcements,
      unreadCount,
      loading,
      error,
      login,
      logout,
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

