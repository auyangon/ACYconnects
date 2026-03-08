interface Props { darkMode: boolean; }
export default function DashboardView({ darkMode }: Props) {
  return <div className="p-6"><h1 style={{ color: darkMode ? '#fff' : '#000' }}>Dashboard</h1></div>;
}
