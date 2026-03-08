import { useState } from 'react';
import { useStudent } from '../context/StudentContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login, loading, error } = useStudent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3c2c] to-[#2d5a3e]">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-96">
        <h2 className="text-2xl font-bold text-white mb-6">AUY Student Portal</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 text-white mb-4"
          required
        />
        {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#c5a572] text-[#1e3c2c] font-bold rounded-xl"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
