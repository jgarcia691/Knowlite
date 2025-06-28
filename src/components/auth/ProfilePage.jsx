import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Obtener datos del usuario al cargar
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.email) return;
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`https://knowlite-backend.vercel.app/users/email/${encodeURIComponent(user.email)}`);
        if (!res.ok) throw new Error('No se pudo obtener el usuario');
        const data = await res.json();
        setName(data.nombre || '');
        setEmail(data.correo || '');
        setPassword(data.contraseña || '');
        setBirthdate(data.fechaNacimiento ? data.fechaNacimiento.slice(0, 10) : '');
        setUserId(data._id || '');
      } catch (err) {
        setError('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!userId) return;
    try {
      const res = await fetch(`https://knowlite-backend.vercel.app/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: name, correo: email, contraseña: password, fechaNacimiento: birthdate })
      });
      if (!res.ok) throw new Error('No se pudo actualizar el usuario');
      setSuccess('¡Información actualizada!');
    } catch (err) {
      setError('Error al actualizar la información.');
    }
  };

  const handleDelete = async () => {
    setSuccess('');
    setError('');
    if (!userId) return;
    if (!window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) return;
    try {
      const res = await fetch(`https://knowlite-backend.vercel.app/users/${userId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('No se pudo eliminar la cuenta');
      logout();
      window.location.href = '/signup';
    } catch (err) {
      setError('Error al eliminar la cuenta.');
    }
  };

  // Responsive styles
  const containerStyle = {
    padding: '60px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f7f9fb',
  };
  const cardStyle = {
    width: 600,
    maxWidth: '95vw',
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 12px #0001',
    padding: 40,
    boxSizing: 'border-box',
  };
  const isMobile = window.innerWidth <= 700;
  if (isMobile) {
    cardStyle.width = '100%';
    cardStyle.padding = 18;
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Datos del perfil</h2>
        {loading ? (
          <div style={{ fontSize: 18, color: '#888' }}>Cargando...</div>
        ) : (
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: '100%', padding: 14, border: '1px solid #e0e6ed', borderRadius: 8, fontSize: 17, background: '#f7f9fb', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>Correo</label>
            <input
              type="email"
              value={email}
              style={{ width: '100%', padding: 14, border: '1px solid #e0e6ed', borderRadius: 8, fontSize: 17, background: '#f7f9fb', boxSizing: 'border-box' }}
              disabled
            />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>Fecha de nacimiento</label>
            <input
              type="date"
              value={birthdate}
              onChange={e => setBirthdate(e.target.value)}
              style={{ width: '100%', padding: 14, border: '1px solid #e0e6ed', borderRadius: 8, fontSize: 17, background: '#f7f9fb', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: 36 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: 14, border: '1px solid #e0e6ed', borderRadius: 8, fontSize: 17, background: '#f7f9fb', boxSizing: 'border-box' }}
              placeholder="Nueva contraseña"
            />
          </div>
          {success && <div style={{ color: 'green', marginBottom: 16 }}>{success}</div>}
          {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 16, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
            <button type="submit" style={{ background: '#bcd2e8', color: '#222', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
              Actualizar Informacion
            </button>
            <button type="button" onClick={handleDelete} style={{ background: '#f5f6fa', color: '#222', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
              Eliminar Cuenta
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 