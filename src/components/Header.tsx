import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, LogOut } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

interface Props {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  setMobileOpen: (v: boolean) => void;
}

export default function Header({ darkMode, setDarkMode, setMobileOpen }: Props) {
  const { student, logout } = useStudent();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!student) return null;

  return (
    <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-lg border-b">
      <button onClick={() => setMobileOpen(true)} className="lg:hidden">
        <Menu />
      </button>
      <div>
        <h1 className="text-xl font-bold">Welcome, {student.studentName}</h1>
        <p className="text-sm text-gray-600">{time.toLocaleString()}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-gray-100">
          {darkMode ? <Sun /> : <Moon />}
        </button>
        <button onClick={logout} className="p-2 rounded-lg hover:bg-gray-100">
          <LogOut />
        </button>
      </div>
    </header>
  );
}
