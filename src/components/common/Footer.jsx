import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: '#fff',
      color: '#222',
      padding: '2.5rem 0 1.5rem 0',
      textAlign: 'center',
      borderTop: '1px solid #eee',
      marginTop: 48,
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginBottom: 16, flexWrap: 'wrap' }}>
        <a href="#" style={{ color: '#3b4cca', textDecoration: 'none', fontWeight: 500 }}>Sobre Nosotros</a>
        <a href="#" style={{ color: '#3b4cca', textDecoration: 'none', fontWeight: 500 }}>Contacto</a>
        <a href="#" style={{ color: '#3b4cca', textDecoration: 'none', fontWeight: 500 }}>Política de Privacidad</a>
        <a href="#" style={{ color: '#3b4cca', textDecoration: 'none', fontWeight: 500 }}>Términos de Servicio</a>
      </div>
      <div style={{ color: '#888', fontSize: 15 }}>
        &copy; 2024 KnowLite. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer; 