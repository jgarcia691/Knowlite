import React from 'react';

const ServicesSection = () => {
  return (
    <section style={{ padding: '80px 20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#333' }}>
          Nuestros servicios
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🎯</div>
            <h3 style={{ color: '#3b4cca', marginBottom: '15px' }}>Automatización inteligente</h3>
            <p>Automatiza procesos complejos con nuestra tecnología de IA.</p>
          </div>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔒</div>
            <h3 style={{ color: '#3b4cca', marginBottom: '15px' }}>Seguridad garantizada</h3>
            <p>Tus datos están protegidos con los más altos estándares de seguridad.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 