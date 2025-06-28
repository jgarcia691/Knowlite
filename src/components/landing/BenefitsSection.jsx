import React from 'react';

const BenefitsSection = () => {
  return (
    <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px', color: '#333' }}>
          Beneficios de KnowLite
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#3b4cca', marginBottom: '15px' }}>🚀 Aumenta tu productividad</h3>
            <p>Obten el texto de tu audio en segundos.</p>
          </div>
          <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#3b4cca', marginBottom: '15px' }}>⏰ Guarda tus archivos</h3>
            <p>Almacena tus archivos en un solo lugar.</p>
          </div>
          <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#3b4cca', marginBottom: '15px' }}>🤖 IA avanzada</h3>
            <p>Utiliza la última tecnología en inteligencia artificial para tus archivos.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection; 