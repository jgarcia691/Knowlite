import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!name || !birthdate || !email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://knowlite-backend.vercel.app/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: name,
          fechaNacimiento: birthdate,
          correo: email,
          contraseña: password
        })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.message || 'Error al registrar usuario.');
      } else {
        setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setName('');
        setBirthdate('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      setError('Error de red o del servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0002', padding: 40, maxWidth: 400, width: '100%' }}>
        <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Crear cuenta</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 24 }}>Regístrate en KnowLite para subir y consultar libros</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}
            autoFocus
          />
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            value={birthdate}
            onChange={e => setBirthdate(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}
          />
          {error && <div style={{ color: 'red', marginBottom: 12, fontSize: 14 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: 12, fontSize: 14 }}>{success}</div>}
          <button type="submit" style={{ width: '100%', background: '#3b4cca', color: '#fff', border: 'none', borderRadius: 6, padding: '0.75rem', fontWeight: 700, fontSize: 16, marginBottom: 16, cursor: 'pointer' }} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        <div style={{ textAlign: 'center', fontSize: 14, marginTop: 8 }}>
          ¿Ya tienes cuenta? <a href="/login" style={{ color: '#3b4cca', textDecoration: 'underline' }}>Inicia sesión aquí</a>.
        </div>
      </div>
    </div>
  );
};

export default SignUpPage; 