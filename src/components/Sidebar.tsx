import { useStudent } from '../context/StudentContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }: SidebarProps) {
  if (mobileOpen) { /* mobile menu is open */ }
  const { student, logout } = useStudent();
  
  if (!student) return null;

  const tabs = ['dashboard', 'courses', 'calendar', 'analytics', 'settings'];

  return (
    <div style={{
      width: '250px',
      height: '100vh',
      background: '#1e3c2c',
      color: 'white',
      position: 'fixed',
      left: 0,
      top: 0
    }}>
      <div style={{ padding: '2rem 1rem' }}>
        <h3>AUY Portal</h3>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{student.studentName}</p>
      </div>
      <nav style={{ padding: '1rem' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setMobileOpen(false);
            }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '0.75rem 1rem',
              marginBottom: '0.5rem',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === tab ? '#c5a572' : 'transparent',
              color: activeTab === tab ? '#1e3c2c' : 'white',
              cursor: 'pointer'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
      <button
        onClick={logout}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '1rem',
          padding: '0.5rem 1rem',
          background: 'transparent',
          border: '1px solid white',
          color: 'white',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
}


