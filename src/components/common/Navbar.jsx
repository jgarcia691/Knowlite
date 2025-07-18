import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleProfileClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    setShowMenu(false);
    logout();
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 3rem 1.5rem 2rem',
      background: '#fff',
      boxShadow: '0 2px 8px #0001',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo y nombre */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 900, fontSize: 22, color: '#222', letterSpacing: 0.5 }}>📚 KnowLite</span>
      </div>
      {/* Navegación */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <a href="#" style={{ textDecoration: 'none', color: '#222', fontWeight: 600 }}>Inicio</a>
        <a href="#" style={{ textDecoration: 'none', color: '#222', fontWeight: 600 }}>Categorías</a>
        <a href="#" style={{ textDecoration: 'none', color: '#222', fontWeight: 600 }}>Autores</a>
      </div>
      {/* Usuario o login/signup */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, position: 'relative' }}>
        {user ? (
          <div style={{ position: 'relative' }}>
            <div
              style={{ width: 36, height: 36, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#888', cursor: 'pointer' }}
              onClick={handleProfileClick}
              title="Perfil"
            >
              <span role="img" aria-label="user">👤</span>
            </div>
            {showMenu && (
              <div style={{
                position: 'absolute',
                top: 44,
                right: 0,
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 8,
                boxShadow: '0 2px 8px #0002',
                padding: '8px 0',
                minWidth: 140,
                zIndex: 1000
              }}>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: '#e53935',
                    fontWeight: 600,
                    fontSize: 15,
                    padding: '10px 0',
                    cursor: 'pointer',
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <a href="/login" style={{ textDecoration: 'none', color: '#3b4cca', fontWeight: 600, padding: '8px 18px', borderRadius: 6, border: '1px solid #3b4cca', background: '#fff', marginRight: 4 }}>Iniciar sesión</a>
            <a href="/signup" style={{ textDecoration: 'none', color: '#fff', fontWeight: 600, padding: '8px 18px', borderRadius: 6, background: '#3b4cca', border: 'none' }}>Registrarse</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 