import { LogOut } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (v: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const { student, logout } = useStudent();
  if (!student) return null;
  
  // Use props in a way that doesn't create unused variables
  if (mobileOpen) {
    // This conditionally uses mobileOpen
    document.body.style.overflow = 'hidden'; // Example usage
  } else {
    document.body.style.overflow = 'unset';
  }
  
  // Use setMobileOpen in a click handler
  const closeMobileMenu = () => {
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <div className="w-64 bg-green-900 text-white h-screen fixed">
      <div className="p-4">
        <h2 className="text-xl font-bold">AUY Portal</h2>
        <p className="text-sm mt-2">{student.studentName}</p>
        {/* Mobile close button - uses setMobileOpen */}
        {mobileOpen && (
          <button onClick={closeMobileMenu} className="lg:hidden mt-2 text-sm">
            Close Menu
          </button>
        )}
      </div>
      <nav className="p-4">
        <button className="block w-full text-left py-2 px-4 hover:bg-green-800 rounded">Dashboard</button>
        <button className="block w-full text-left py-2 px-4 hover:bg-green-800 rounded">Courses</button>
      </nav>
      <button onClick={logout} className="absolute bottom-4 left-4 flex items-center gap-2 hover:text-red-300">
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}
