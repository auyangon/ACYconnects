import { LayoutDashboard, BookOpen, Calendar, BarChart3, Settings, LogOut } from "lucide-react";
import { useStudent } from "../context/StudentContext";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }: Props) {
  const { student, logout } = useStudent();
  
  if (!student) return null;

  const handleMobileClose = () => {
    if (mobileOpen && setMobileOpen) {
      setMobileOpen(false);
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-green-900 text-white h-screen fixed">
      <div className="p-4">
        <h2 className="text-xl font-bold">AUY Portal</h2>
        <p className="text-sm mt-2">{student.studentName}</p>
        {mobileOpen && (
          <button onClick={handleMobileClose} className="lg:hidden mt-2 text-sm">
            Close Menu
          </button>
        )}
      </div>
      <nav className="p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                handleMobileClose();
              }}
              className={`block w-full text-left py-2 px-4 hover:bg-green-800 rounded mb-1 ${
                activeTab === item.id ? "bg-green-800" : ""
              }`}
            >
              <Icon className="inline mr-2" size={18} /> {item.label}
            </button>
          );
        })}
      </nav>
      <button
        onClick={logout}
        className="absolute bottom-4 left-4 flex items-center gap-2 hover:text-red-300"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}