interface Props {
  darkMode: boolean;
}

export default function DashboardView({ darkMode }: Props) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4" style={{ color: darkMode ? '#fff' : '#000' }}>
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg" style={{ background: darkMode ? '#2d3748' : '#f7fafc' }}>
          <h2 className="font-semibold">Welcome to AUY Portal</h2>
          <p className="text-sm mt-2">Your dashboard is loading...</p>
        </div>
      </div>
    </div>
  );
}
