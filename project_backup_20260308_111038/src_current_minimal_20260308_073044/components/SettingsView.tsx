import { useStudent } from '../context/StudentContext';

interface Props {
  darkMode: boolean;
}

export default function SettingsView({ darkMode }: Props) {
  const { student } = useStudent();
  
  return (
    <div style={{ 
      background: darkMode ? '#1a202c' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000000',
      padding: '20px',
      borderRadius: '12px'
    }}>
      <h2>Settings</h2>
      {student && <p>Welcome, {student.studentName}</p>}
    </div>
  );
}
