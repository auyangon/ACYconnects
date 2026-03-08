import { Student, getStudentEnrollments, getStudentAttendance, getCourseById, getGradePoint, getProgressForCourse, calculateGPA, getInitials, announcements, syncLogs, students } from '../data/database';
import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login, loading, error } = useStudent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3c2c] to-[#2d5a3e]">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-96 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">AUY Student Portal</h2>
        <p className="text-white/70 text-sm mb-6">Enter your university email</p>
        <input
          type="email"
          placeholder="e.g., chanmyae.au.edu.mm@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/50 mb-4 outline-none focus:ring-2 focus:ring-[#c5a572]"
          required
        />
        {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#c5a572] text-[#1e3c2c] font-bold rounded-xl hover:bg-[#d4b78a] transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}



