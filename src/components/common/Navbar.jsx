import React from 'react';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      background: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b4cca' }}>
        KnowLite
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="/login" style={{ textDecoration: 'none', color: '#333', padding: '0.5rem 1rem' }}>
          Iniciar sesión
        </a>
        <a href="/signup" style={{ 
          textDecoration: 'none', 
          color: '#fff', 
          background: '#3b4cca', 
          padding: '0.5rem 1rem', 
          borderRadius: '4px' 
        }}>
          Get Started
        </a>
      </div>
    </nav>
  );
};

export default Navbar; 