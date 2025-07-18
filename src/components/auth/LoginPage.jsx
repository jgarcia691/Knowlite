import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, completa ambos campos.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch('https://knowlite-backend.vercel.app/users/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: email,
          contraseña: password
        })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.message || 'Credenciales incorrectas.');
      } else {
        login({ email: email });
        navigate('/');
      }
    } catch (err) {
      setError('Error de red o del servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0002', padding: 40, maxWidth: 370, width: '100%' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Iniciar sesión</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 24 }}>Accede a tu cuenta de KnowLite</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}
            autoFocus
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}
          />
          {error && <div style={{ color: 'red', marginBottom: 12, fontSize: 14 }}>{error}</div>}
          <button type="submit" style={{ width: '100%', background: '#3b4cca', color: '#fff', border: 'none', borderRadius: 6, padding: '0.75rem', fontWeight: 700, fontSize: 16, marginBottom: 16, cursor: 'pointer' }} disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
        <div style={{ textAlign: 'center', fontSize: 14, marginTop: 8 }}>
          ¿No tienes cuenta? <a href="/signup" style={{ color: '#3b4cca', textDecoration: 'underline' }}>Regístrate aquí</a>.
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 