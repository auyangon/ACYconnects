import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const { login, loading, error } = useStudent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e3c2c, #2d5a3e)'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderRadius: '24px',
        width: '400px'
      }}>
        <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>AUY Student Portal</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '12px',
            border: 'none',
            marginBottom: '1rem',
            background: 'rgba(255,255,255,0.2)',
            color: 'white'
          }}
          required
        />
        {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '12px',
            border: 'none',
            background: '#c5a572',
            color: '#1e3c2c',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
