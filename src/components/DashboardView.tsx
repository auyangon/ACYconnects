import { useStudent } from '../context/StudentContext';

interface Props {
  darkMode: boolean;
}

export default function DashboardView({ darkMode }: Props) {
  const { student, enrollments, announcements, unreadCount } = useStudent();

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: darkMode ? 'white' : 'black', marginBottom: '2rem' }}>Dashboard</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        <div style={{ 
          background: darkMode ? '#2d3748' : 'white', 
          padding: '1.5rem', 
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>Student Info</h3>
          <p><strong>Name:</strong> {student?.studentName}</p>
          <p><strong>ID:</strong> {student?.studentId}</p>
          <p><strong>Email:</strong> {student?.email}</p>
          <p><strong>Major:</strong> {student?.major}</p>
        </div>

        <div style={{ 
          background: darkMode ? '#2d3748' : 'white', 
          padding: '1.5rem', 
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>Courses ({enrollments.length})</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {enrollments.slice(0, 3).map(e => (
              <li key={e.courseCode} style={{ marginBottom: '0.5rem' }}>
                {e.courseCode}: {e.grade}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ 
          background: darkMode ? '#2d3748' : 'white', 
          padding: '1.5rem', 
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>Announcements ({unreadCount} new)</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {announcements.slice(0, 3).map(a => (
              <li key={a.id} style={{ marginBottom: '0.5rem' }}>
                {a.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


