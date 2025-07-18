import React, { useEffect, useState } from 'react';
import BookForm from './BookForm';
import BooksList from './BooksList';
import BookDetailsModal from './BookDetailsModal';
import BooksSearchBar from './BooksSearchBar';
import { getAllBooks, searchBooks } from '../../api/booksApi';

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

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
    // Si todos los filtros están vacíos, mostrar todos los libros
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
      <BookForm onBookCreated={handleBookCreated} />
      <BooksSearchBar onSearch={handleSearch} />
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 32 }}>Cargando libros...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: 'red', marginTop: 32 }}>{error}</div>
      ) : (
        <BooksList books={books} onViewDetails={handleViewDetails} />
      )}
      <BookDetailsModal book={selectedBook} isOpen={showDetails} onClose={handleCloseDetails} />
    </div>
  );
};

export default MainPage; 