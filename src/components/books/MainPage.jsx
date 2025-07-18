import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import BookForm from './BookForm';
import BooksList from './BooksList';
import BookDetailsModal from './BookDetailsModal';
import BooksSearchBar from './BooksSearchBar';
import { getAllBooks, searchBooks } from '../../api/booksApi';

const MainPage = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (err) {
      setError('Error al cargar los libros.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookCreated = () => {
    fetchBooks();
    setShowModal(false);
  };

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedBook(null);
  };

  const handleSearch = async (filters) => {
    if (!filters.titulo && !filters.autor && !filters.categoria && !filters.anio) {
      fetchBooks();
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await searchBooks(filters);
      setBooks(data);
    } catch (err) {
      setError('Error al buscar libros.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 0', background: '#f7f9fb', minHeight: '100vh' }}>
      {/* Botón Add Book solo si autenticado */}
      {user ? (
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              background: '#3b4cca',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 28px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              marginBottom: 16,
              boxShadow: '0 2px 8px #0002',
              transition: 'background 0.2s',
            }}
          >
            + Agregar libro
          </button>
        </div>
      ) : (
        <div style={{ maxWidth: 900, margin: '0 auto', marginBottom: 16, textAlign: 'center', color: '#3b4cca', fontWeight: 600, fontSize: 18 }}>
          Inicia sesión o regístrate para poder subir libros a KnowLite.
        </div>
      )}
      <BooksSearchBar onSearch={handleSearch} />
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 32 }}>Cargando libros...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red', marginTop: 32 }}>{error}</div>
      ) : (
        <BooksList books={books} onViewDetails={handleViewDetails} />
      )}
      <BookDetailsModal book={selectedBook} isOpen={showDetails} onClose={handleCloseDetails} />
      {/* Modal para subir libro solo si autenticado */}
      {user && showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 340, maxWidth: 420, boxShadow: '0 4px 24px #0003', position: 'relative' }}>
            <button
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 26, color: '#888', cursor: 'pointer' }}
              title="Cerrar"
            >
              ×
            </button>
            <BookForm onBookCreated={handleBookCreated} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage; 