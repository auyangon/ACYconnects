import { Sun, Moon, Menu, LogOut } from 'lucide-react';
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
    <header className="flex justify-between p-4">
      <button onClick={() => setMobileOpen(true)} className="lg:hidden"><Menu /></button>
      <div><h1>Welcome, {student.studentName}</h1></div>
      <button onClick={() => setDarkMode(!darkMode)}>{darkMode ? <Sun /> : <Moon />}</button>
      <button onClick={logout}><LogOut /></button>
    </header>
  );
}
