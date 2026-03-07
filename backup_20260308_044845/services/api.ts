const API_BASE = 'https://script.google.com/macros/s/AKfycbydGnnALt3qu4MVDqmXzqa49wB7Xl8of-9OqeChOkr6922n6Dj-I6llHJ-aq9aRyWf5lA/exec';

export interface Student {
  studentId: string;
  email: string;
  studentName: string;
  major: string;
  studyMode: string;
  status: string;
}

export interface Enrollment {
  enrollmentId: string;
  studentId: string;
  courseCode: string;
  courseName: string;
  teacher: string;
  credits: number;
  grade: string;
  googleClassroomLink: string;
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

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  targetCourses: string;
  emoji?: string;
}

export interface Notification {
  studentId: string;
  email: string;
  announcementId: string;
  read: string;
  readAt: string;
}

class Api {
  private async request<T>(path: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(API_BASE);
    url.searchParams.append('path', path);
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
    
    const res = await fetch(url.toString());
    const json = await res.json();
    if (!json.success) throw new Error(json.error);
    return json.data as T;
  }

  async auth(email: string): Promise<Student> {
    return this.request<Student>('auth', { email });
  }

  async getStudent(studentId: string): Promise<Student> {
    return this.request<Student>('student', { studentId });
  }

  async getEnrollments(studentId: string): Promise<Enrollment[]> {
    return this.request<Enrollment[]>('enrollments', { studentId });
  }

  async getAttendance(studentId: string): Promise<AttendanceRecord[]> {
    return this.request<AttendanceRecord[]>('attendance', { studentId });
  }

  async getAnnouncements(): Promise<Announcement[]> {
    return this.request<Announcement[]>('announcements');
  }

  async getNotifications(studentId: string): Promise<Notification[]> {
    return this.request<Notification[]>('notifications', { studentId });
  }
}

export const api = new Api();
