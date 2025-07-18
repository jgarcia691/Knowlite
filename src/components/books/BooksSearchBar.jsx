import React, { useState } from 'react';

const BooksSearchBar = ({ onSearch }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [anio, setAnio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ titulo, autor, categoria, anio });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', margin: '32px 0' }}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120 }}
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={e => setAutor(e.target.value)}
        style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120 }}
      />
      <input
        type="text"
        placeholder="Categoría"
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 120 }}
      />
      <input
        type="number"
        placeholder="Año"
        value={anio}
        onChange={e => setAnio(e.target.value)}
        style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 80, maxWidth: 120 }}
      />
      <button type="submit" style={{ background: '#3b4cca', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>
        Buscar
      </button>
    </form>
  );
};

export default BooksSearchBar; 