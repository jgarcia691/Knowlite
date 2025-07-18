// src/api/booksApi.js

// Funciones para interactuar con la API de libros

const BOOKS_API_URL = import.meta.env.VITE_BOOKS_API_URL;

export async function createBook(bookData) {
  // bookData: { autores, titulo, categoria, fechaPublicacion, pdfBase64 }
  const response = await fetch(`${BOOKS_API_URL}/books/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData)
  });
  if (!response.ok) throw new Error('Error al crear el libro');
  return await response.json();
}

export async function getAllBooks() {
  const response = await fetch(`${BOOKS_API_URL}/books/`);
  if (!response.ok) throw new Error('Error al obtener los libros');
  return await response.json();
}

export async function getBookById(id) {
  // GET /books/:id
  const response = await fetch(`${BOOKS_API_URL}/books/${id}`);
  if (!response.ok) throw new Error('Error al obtener el libro');
  return await response.json();
}

export async function updateBook(id, bookData) {
  // PUT /books/:id
  const response = await fetch(`${BOOKS_API_URL}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData)
  });
  if (!response.ok) throw new Error('Error al actualizar el libro');
  return await response.json();
}

export async function deleteBook(id) {
  // DELETE /books/:id
  const response = await fetch(`${BOOKS_API_URL}/books/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar el libro');
  return await response.json();
}

export async function searchBooks({ titulo, autor, categoria, anio }) {
  const params = new URLSearchParams();
  if (titulo) params.append('titulo', titulo);
  if (autor) params.append('autor', autor);
  if (categoria) params.append('categoria', categoria);
  if (anio) params.append('anio', anio);
  const url = `${BOOKS_API_URL}/books/search?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al buscar libros');
  return await response.json();
} 