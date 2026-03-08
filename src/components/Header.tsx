import { useStudent } from '../context/StudentContext';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  setMobileOpen: (v: boolean) => void;
}

export default function Header({ darkMode, setDarkMode, setMobileOpen }: HeaderProps) {
  const { student, logout } = useStudent();
  
  if (!student) return null;

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: darkMode ? '#1a202c' : '#ffffff',
      borderBottom: '1px solid #e2e8f0'
    }}>
      <button onClick={() => setMobileOpen(true)}>?</button>
      <div>
        <h2>Welcome, {student.studentName}</h2>
      </div>
      <div>
        <button onClick={() => setDarkMode(!darkMode)} style={{ marginRight: '1rem' }}>
          {darkMode ? '??' : '??'}
        </button>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

