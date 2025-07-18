import React, { useRef, useState } from 'react';
import { createBook } from '../../api/booksApi';

const CATEGORIAS = [
  "Ciencias Exactas y Naturales",
  "Ingeniería y Tecnología",
  "Ciencias de la Salud",
  "Ciencias Sociales",
  "Economía y Negocios",
  "Educación y Pedagogía",
  "Derecho y Ciencias Jurídicas",
  "Humanidades",
  "Informática y Ciencias de la Computación",
  "Investigación y Metodología",
  "Material de Apoyo / Recursos Generales"
];

const BookForm = ({ onBookCreated }) => {
  const fileInputRef = useRef(null);
  const [titulo, setTitulo] = useState('');
  const [autores, setAutores] = useState('');
  const [categoria, setCategoria] = useState('');
  const [anio, setAnio] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setError('');
    } else {
      setPdfFile(null);
      setError('Solo se permiten archivos PDF.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!titulo || !autores || !categoria || !anio || !pdfFile) {
      setError('Completa todos los campos y selecciona un PDF.');
      return;
    }
    if (!/^\d{4}$/.test(anio)) {
      setError('El año debe tener 4 dígitos.');
      return;
    }
    setLoading(true);
    try {
      // Convertir PDF a base64
      const pdfBase64 = await toBase64(pdfFile);
      const autoresArr = autores.split(',').map(a => a.trim()).filter(Boolean);
      await createBook({
        titulo,
        autores: autoresArr,
        categoria,
        fechaPublicacion: `${anio}-01-01`,
        pdfBase64
      });
      setSuccess('¡Libro subido exitosamente!');
      setTitulo('');
      setAutores('');
      setCategoria('');
      setAnio('');
      setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (onBookCreated) onBookCreated();
    } catch (err) {
      setError('Error al subir el libro.');
    } finally {
      setLoading(false);
    }
  };

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Solo base64
      reader.onerror = error => reject(error);
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 10, boxShadow: '0 2px 12px #0001' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 18 }}>Subir nuevo libro</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <input
        type="text"
        placeholder="Autores (separados por coma)"
        value={autores}
        onChange={e => setAutores(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
      />
      <select
        value={categoria}
        onChange={e => setCategoria(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        required
      >
        <option value="">Selecciona una categoría</option>
        {CATEGORIAS.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Año de publicación (YYYY)"
        value={anio}
        onChange={e => setAnio(e.target.value)}
        style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        min="1000"
        max="9999"
        required
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ width: '100%', marginBottom: 12 }}
      />
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 10 }}>{success}</div>}
      <button type="submit" disabled={loading} style={{ width: '100%', background: '#3b4cca', color: '#fff', border: 'none', borderRadius: 6, padding: 12, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
        {loading ? 'Subiendo...' : 'Subir libro'}
      </button>
    </form>
  );
};

export default BookForm; 