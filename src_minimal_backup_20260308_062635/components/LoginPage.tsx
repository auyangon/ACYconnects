import { useState } from 'react';
import { useStudent } from '../context/StudentContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login, loading, error } = useStudent();
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-900">
      <form onSubmit={(e) => { e.preventDefault(); login(email); }} className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6">AUY Student Portal</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4" required />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-green-700 text-white py-2 rounded">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
