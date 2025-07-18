import React from 'react';

const BookDetailsModal = ({ book, isOpen, onClose }) => {
  if (!isOpen || !book) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const handleDownloadPDF = () => {
    if (!book.pdfBase64) return;
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${book.pdfBase64}`;
    link.download = `${book.titulo || 'libro'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: 32, width: 500, maxWidth: '95vw', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Detalles del libro</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#666', padding: 4 }}>×</button>
        </div>
        <div style={{ marginBottom: 18 }}>
          <strong>Título:</strong> {book.titulo}
        </div>
        <div style={{ marginBottom: 18 }}>
          <strong>Autores:</strong> {Array.isArray(book.autores) ? book.autores.join(', ') : book.autores}
        </div>
        <div style={{ marginBottom: 18 }}>
          <strong>Categoría:</strong> {book.categoria}
        </div>
        <div style={{ marginBottom: 18 }}>
          <strong>Año de publicación:</strong> {book.fechaPublicacion ? new Date(book.fechaPublicacion).getFullYear() : ''}
        </div>
        <div style={{ marginBottom: 18 }}>
          <strong>Fecha de subida:</strong> {formatDate(book.fechaSubida)}
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <button onClick={handleDownloadPDF} style={{ padding: '10px 24px', border: 'none', borderRadius: 6, background: '#3b4cca', color: '#fff', cursor: 'pointer', fontSize: 16, fontWeight: 600 }}>
            Descargar PDF
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '10px 24px', border: 'none', borderRadius: 6, background: '#3b4cca', color: '#fff', cursor: 'pointer', fontSize: 16, fontWeight: 600 }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal; 