import React, { useState } from 'react';

const FILTROS = [
  { key: 'titulo', label: 'Título' },
  { key: 'autor', label: 'Autor' },
  { key: 'categoria', label: 'Categoría' },
  { key: 'anio', label: 'Año' },
];

const BooksSearchBar = ({ onSearch }) => {
  const [filtro, setFiltro] = useState('titulo');
  const [valor, setValor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construir el objeto de filtros según el atributo seleccionado
    const filtros = { titulo: '', autor: '', categoria: '', anio: '' };
    filtros[filtro] = valor;
    onSearch(filtros);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '32px 0 40px 0',
      width: '100%',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#f5f7fa',
        borderRadius: 14,
        boxShadow: '0 2px 8px #0001',
        padding: '0.5rem 1.5rem',
        width: '100%',
        maxWidth: 600,
        gap: 12,
      }}>
        <span style={{ color: '#b0b4c0', fontSize: 22, marginRight: 8 }}>🔍</span>
        <input
          type={filtro === 'anio' ? 'number' : 'text'}
          placeholder={`Buscar por ${FILTROS.find(f => f.key === filtro).label.toLowerCase()}`}
          value={valor}
          onChange={e => setValor(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 18,
            flex: 1,
            padding: '0.7rem 0',
            color: '#222',
          }}
        />
        <div style={{ display: 'flex', gap: 4 }}>
          {FILTROS.map(f => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFiltro(f.key)}
              style={{
                background: filtro === f.key ? '#3b4cca' : '#e0e4ef',
                color: filtro === f.key ? '#fff' : '#3b4cca',
                border: 'none',
                borderRadius: 6,
                padding: '6px 12px',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          type="submit"
          style={{
            background: '#3b4cca',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 600,
            fontSize: 16,
            marginLeft: 8,
            cursor: 'pointer',
          }}
        >
          Buscar
        </button>
      </div>
    </form>
  );
};

export default BooksSearchBar; 