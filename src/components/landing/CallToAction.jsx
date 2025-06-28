import React from 'react';

const CallToAction = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #3b4cca 0%, #5a6ee6 100%)',
      color: 'white',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          ¿Listo para comenzar?
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
          Únete a miles de usuarios que ya están aumentando su productividad con KnowLite
        </p>
        <a href="/signup" style={{
          background: 'white',
          color: '#3b4cca',
          padding: '15px 40px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          display: 'inline-block'
        }}>
          Crear cuenta gratuita
        </a>
      </div>
    </section>
  );
};

export default CallToAction; 