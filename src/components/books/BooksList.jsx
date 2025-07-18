import React from 'react';

const BooksList = ({ books, onViewDetails }) => {
  if (!books || books.length === 0) {
    return <div style={{ textAlign: 'center', color: '#888', marginTop: 32 }}>No hay libros disponibles.</div>;
  }
  // Ordenar por fechaSubida descendente
  const sortedBooks = [...books].sort((a, b) => new Date(b.fechaSubida) - new Date(a.fechaSubida));
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', marginTop: 32 }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 28, color: '#222' }}>Últimos libros subidos</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#f5f6fa', textAlign: 'left' }}>
            <th style={{ padding: '12px 16px' }}>Título</th>
            <th style={{ padding: '12px 16px' }}>Autores</th>
            <th style={{ padding: '12px 16px' }}>Categoría</th>
            <th style={{ padding: '12px 16px' }}>Año</th>
            <th style={{ padding: '12px 16px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map((book) => (
            <tr key={book._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px 16px' }}>{book.titulo}</td>
              <td style={{ padding: '10px 16px' }}>{Array.isArray(book.autores) ? book.autores.join(', ') : book.autores}</td>
              <td style={{ padding: '10px 16px' }}>{book.categoria}</td>
              <td style={{ padding: '10px 16px' }}>{book.fechaPublicacion ? new Date(book.fechaPublicacion).getFullYear() : ''}</td>
              <td style={{ padding: '10px 16px' }}>
                <button
                  onClick={() => onViewDetails(book)}
                  style={{ background: '#3b4cca', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList; 