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

  // Estilos responsivos
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'row',
  };
  const leftColStyle = {
    flex: 1,
    background: 'linear-gradient(135deg, #3b4cca 60%, #5a6ee6 100%)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: '0 5vw',
    position: 'relative',
    minHeight: 320,
  };
  const rightColStyle = {
    flex: 1,
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 32px #0001',
    minHeight: 320,
  };
  const formStyle = {
    width: '100%',
    maxWidth: 350,
    padding: 32,
    borderRadius: 12,
    background: '#fff',
    boxShadow: '0 2px 16px #0001',
    boxSizing: 'border-box',
  };

  // Media query para móviles
  const isMobile = window.innerWidth <= 700;
  if (isMobile) {
    containerStyle.flexDirection = 'column';
    leftColStyle.alignItems = 'center';
    leftColStyle.justifyContent = 'flex-start';
    leftColStyle.padding = '40px 5vw 24px 5vw';
    rightColStyle.boxShadow = 'none';
    rightColStyle.padding = '0 0 40px 0';
    formStyle.maxWidth = '95vw';
    formStyle.padding = 18;
  }

  return (
    <div style={containerStyle}>
      {/* Columna izquierda */}
      <div style={leftColStyle}>
        <div style={{maxWidth: 400, width: '100%'}}>
          <h1 style={{fontSize: isMobile ? 28 : 40, fontWeight: 800, marginBottom: 8}}>¡Bienvenido a KnowLite! <span role="img" aria-label="saludo">👋</span></h1>
          <p style={{fontSize: isMobile ? 15 : 18, opacity: 0.95, marginBottom: 0}}>
            Crea tu cuenta y comienza a transcribir tus audios de forma eficaz!
          </p>
        </div>
      </div>
      {/* Columna derecha */}
      <div style={rightColStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={{fontWeight: 700, fontSize: 24, marginBottom: 8}}>KnowLite</div>
          <div style={{fontWeight: 600, fontSize: 20, marginBottom: 16}}>Crea tu cuenta</div>
          <div style={{fontSize: 14, marginBottom: 18, color: '#444'}}>
            ¿Ya tienes cuenta? <a href="/login" style={{color: '#3b4cca', textDecoration: 'underline'}}>Inicia sesión aquí</a>.
          </div>
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box'}}
            autoFocus
          />
          <input
            type="date"
            placeholder="Fecha de nacimiento"
            value={birthdate}
            onChange={e => setBirthdate(e.target.value)}
            style={{width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box'}}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box'}}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box'}}
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{width: '100%', padding: '0.75rem', marginBottom: 16, border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box'}}
          />
          {error && <div style={{color: 'red', marginBottom: 12, fontSize: 14}}>{error}</div>}
          {success && <div style={{color: 'green', marginBottom: 12, fontSize: 14}}>{success}</div>}
          <button type="submit" style={{width: '100%', background: '#222', color: '#fff', border: 'none', borderRadius: 6, padding: '0.75rem', fontWeight: 700, fontSize: 16, marginBottom: 16, cursor: 'pointer'}} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage; 