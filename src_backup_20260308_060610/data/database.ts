export type Student = {
  studentId: string
  studentName: string
  major: string
  year?: number
  studyMode?: string
}

export type Enrollment = {
  courseCode: string
  grade: string
  color?: string
}

export type AttendanceRecord = {
  courseCode: string
  percentage: number
}

export type Announcement = {
  id: string
  title: string
  message: string
  priority: "HIGH" | "MEDIUM" | "LOW"
}

export type SyncLog = {
  status: string
  message?: string
}

export const students: Student[] = []

export const announcements: Announcement[] = []

export const syncLogs: SyncLog[] = []

export function getStudentEnrollments(studentId: string): Enrollment[] {
  return []
}

export function getStudentAttendance(studentId: string): AttendanceRecord[] {
  return []
}

export function getCourseById(id: string) {
  return { color: "#6b7280" }
}

export function getGradePoint(g: string) {
  const map: Record<string, number> = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
    F: 0
  }
  return map[g] ?? 3
}

export function getProgressForCourse(studentId: string, courseCode: string) {
  return 0
}

export function calculateGPA(studentId: string) {
  return 3.5
}

export function getInitials(name?: string) {
  if (!name) return ""
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
}