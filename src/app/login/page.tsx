'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Špatné uživatelské jméno nebo heslo.');
    } else {
      router.push('/');
      router.refresh();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Registrace selhala.');
      return;
    }

    setSuccess('Účet vytvořen! Přihlašuji...');
    setTimeout(async () => {
      const result = await signIn('credentials', { username, password, redirect: false });
      if (!result?.error) {
        router.push('/');
        router.refresh();
      }
    }, 800);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '1rem',
    outline: 'none',
    color: '#1a1a1a',
    background: '#fafafa',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    cursor: 'text',
  };

  const btnStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '700',
    background: loading ? '#aaa' : '#1a1a1a',
    color: '#fff',
    cursor: loading ? 'not-allowed' : 'pointer',
    marginTop: '8px',
    letterSpacing: '0.3px',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(80,200,120,0.2) 0%, transparent 70%)', filter: 'blur(80px)', top: '-10%', left: '-10%' }} />
        <div style={{ position: 'absolute', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(255,191,0,0.15) 0%, transparent 70%)', filter: 'blur(80px)', bottom: '-10%', right: '-10%' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: '#fff',
          border: '1px solid #e8e8e8',
          borderRadius: '24px',
          padding: '40px 36px',
          width: '100%',
          maxWidth: '360px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            fontSize: '2.2rem', fontWeight: '800', letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #1a1a1a, #666)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            KRYSTAL
          </div>
          <div style={{ color: '#999', fontSize: '0.85rem', marginTop: '4px' }}>
            Česká slovní hra
          </div>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', background: '#f5f5f5', borderRadius: '12px', padding: '4px', marginBottom: '24px' }}>
          {(['login', 'register'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); setSuccess(''); }}
              style={{
                flex: 1, padding: '9px', border: 'none', cursor: 'pointer',
                borderRadius: '9px', fontWeight: '600', fontSize: '0.9rem',
                background: mode === m ? '#1a1a1a' : 'transparent',
                color: mode === m ? '#fff' : '#666',
                transition: 'all 0.2s',
              }}
            >
              {m === 'login' ? 'Přihlásit se' : 'Registrovat'}
            </button>
          ))}
        </div>

        <form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              placeholder="Uživatelské jméno"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Heslo"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              style={inputStyle}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '10px', textAlign: 'center', fontWeight: '600' }}>
                {error}
              </motion.p>
            )}
            {success && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ color: '#27ae60', fontSize: '0.85rem', marginTop: '10px', textAlign: 'center', fontWeight: '600' }}>
                {success}
              </motion.p>
            )}
          </AnimatePresence>

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? '...' : mode === 'login' ? 'Přihlásit se' : 'Vytvořit účet'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#bbb', marginTop: '20px' }}>
          {mode === 'register' ? 'Min. 3 znaky pro jméno, 6 pro heslo' : 'Statistiky se ukládají do tvého účtu 🎯'}
        </p>
      </motion.div>
    </div>
  );
}
