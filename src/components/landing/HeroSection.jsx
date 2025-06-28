import React from 'react';

const HeroSection = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #3b4cca 0%, #5a6ee6 100%)',
      color: 'white',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
          KnowLite
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
          Automatiza tus tareas repetitivas y aumenta tu productividad con inteligencia artificial
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/signup" style={{
            background: 'white',
            color: '#3b4cca',
            padding: '15px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            Comenzar ahora
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 