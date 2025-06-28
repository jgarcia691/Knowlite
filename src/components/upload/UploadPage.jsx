import React, { useRef, useState, useEffect } from 'react';
import { uploadAudioFile } from '../../api/knowLiteApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import FileDetailsModal from '../common/FileDetailsModal';

const UploadPage = () => {
  const fileInputRef = useRef(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [view, setView] = useState('upload'); // 'upload' o 'files'
  const [files, setFiles] = useState([]);
  const [filesLoading, setFilesLoading] = useState(false);
  const [filesError, setFilesError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isMobile = window.innerWidth <= 700;

  // Limpiar estado al montar el componente
  useEffect(() => {
    setDescription('');
    setError('');
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleSelectFiles = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'audio/mp3' && file.type !== 'audio/mpeg') {
      setError('Solo se permiten archivos mp3.');
      return;
    }
    setError('');
    setLoading(true);
    setDescription('');
    try {
      const result = await uploadAudioFile(file);
      setDescription(result.text || '');
    } catch (err) {
      setError('Error al subir o transcribir el archivo.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = () => {
    if (!description.trim()) {
      alert('No hay transcripción para guardar.');
      return;
    }
    setShowModal(true);
    setFileName('');
    setSaveError('');
  };

  const handleSaveTranscription = async () => {
    if (!fileName.trim()) {
      setSaveError('Por favor, ingresa un nombre para el archivo.');
      return;
    }
    
    setSaving(true);
    setSaveError('');
    
    try {
      const currentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const userEmail = user ? user.email : 'usuario@ejemplo.com'; // Usar email del contexto
      
      const response = await fetch('https://knowlite-backend.vercel.app/saves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: fileName,
          fecha: currentDate,
          autor: userEmail,
          texto: description
        })
      });
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setSaveError(data.message || 'Error al guardar la transcripción.');
      } else {
        alert('¡Transcripción guardada exitosamente!');
        setShowModal(false);
        setFileName('');
      }
    } catch (err) {
      setSaveError('Error de red o del servidor.');
    } finally {
      setSaving(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFileName('');
    setSaveError('');
  };

  const handleShowFiles = async () => {
    setView('files');
    setFilesLoading(true);
    setFilesError('');
    try {
      const userEmail = user ? user.email : '';
      const response = await fetch(`https://knowlite-backend.vercel.app/saves/email/${encodeURIComponent(userEmail)}`);
      if (!response.ok) throw new Error('No se pudieron obtener los archivos');
      const data = await response.json();
      if (Array.isArray(data)) {
        setFiles(data);
      } else if (data && typeof data === 'object') {
        setFiles([data]);
      } else {
        setFiles([]);
      }
    } catch (err) {
      setFilesError('Error al obtener los archivos.');
    } finally {
      setFilesLoading(false);
    }
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedFile(null);
  };

  const handleDeleteFile = (file) => {
    setFileToDelete(file);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!fileToDelete) return;
    
    setDeleting(true);
    try {
      const response = await fetch(`https://knowlite-backend.vercel.app/saves/${fileToDelete._id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar el archivo');
      }
      
      // Actualizar la lista de archivos
      setFiles(files.filter(file => file._id !== fileToDelete._id));
      setShowDeleteModal(false);
      setFileToDelete(null);
      alert('Archivo eliminado exitosamente');
    } catch (err) {
      alert('Error al eliminar el archivo');
    } finally {
      setDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setFileToDelete(null);
  };

  const handleGoProfile = () => {
    navigate('/profile');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fafbfc' }}>
      {/* Menú lateral */}
      <aside style={{ width: 260, background: '#f5f6fa', padding: '32px 0', borderRight: '1px solid #eee', minHeight: '100vh' }}>
        <div style={{ fontWeight: 800, fontSize: 22, marginLeft: 32, marginBottom: 8 }}>Knowlite</div>
        <div style={{ color: '#888', fontSize: 14, marginLeft: 32, marginBottom: 32 }}>AI-powered transcription</div>
        <nav>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 32px', background: view === 'upload' ? '#e9ecf6' : '#fff', borderRadius: 8, margin: '0 16px 8px 16px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setView('upload')}>
            <span style={{ fontSize: 20, marginRight: 12 }}>+</span> Nuevo Archivo
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 32px', background: view === 'files' ? '#e9ecf6' : '#fff', borderRadius: 8, margin: '0 16px 8px 16px', fontWeight: 500, color: '#444', cursor: 'pointer' }} onClick={handleShowFiles}>
            <span style={{ fontSize: 18, marginRight: 12 }}>📄</span> Mis archivos
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 32px', margin: '0 16px', fontWeight: 500, color: '#444', cursor: 'pointer' }} onClick={handleGoProfile}>
            <span style={{ fontSize: 18, marginRight: 12 }}>👤</span> Perfil
          </div>
        </nav>
      </aside>
      {/* Contenido principal */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '60px 0' }}>
        {view === 'upload' && (
          <div style={{ width: 500, maxWidth: '90%', marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Subir Archivo</h2>
            <div style={{ border: '2px dashed #c3c8d4', borderRadius: 12, padding: 40, textAlign: 'center', background: '#fff', marginBottom: 32 }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Arrastra y suelta tus archivos aca</div>
              <div style={{ color: '#666', fontSize: 15, marginBottom: 20 }}>Soporta audio en formato MP3</div>
              <button type="button" onClick={handleSelectFiles} style={{ background: '#f5f6fa', border: '1px solid #c3c8d4', borderRadius: 8, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }} disabled={loading}>
                {loading ? 'Subiendo...' : 'Select files'}
              </button>
              <input ref={fileInputRef} type="file" style={{ display: 'none' }} multiple={false} accept="audio/mp3,audio/mpeg" onChange={handleFileChange} />
              {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
            </div>
            <textarea 
              placeholder="Aquí aparecerá la transcripción..." 
              style={{ width: '100%', minHeight: 180, border: '1px solid #ddd', borderRadius: 8, padding: 16, fontSize: 17, resize: 'vertical', background: '#f8f9fb', marginBottom: 16 }} 
              value={description}
              onChange={e => setDescription(e.target.value)}
              disabled={loading}
            />
            <button 
              onClick={handleSave}
              style={{
                width: '100%',
                background: '#3b4cca',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '14px 0',
                fontWeight: 700,
                fontSize: 18,
                cursor: 'pointer',
                marginBottom: 8
              }}
              disabled={loading || !description}
            >
              Guardar
            </button>
          </div>
        )}
        {view === 'files' && (
          <div style={{ width: 700, maxWidth: '95%', marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Mis archivos</h2>
            {filesLoading ? (
              <div style={{ fontSize: 18 }}>Cargando archivos...</div>
            ) : filesError ? (
              <div style={{ color: 'red', fontSize: 16 }}>{filesError}</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: '#f5f6fa', textAlign: 'left' }}>
                    <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: 16 }}>Nombre</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: 16 }}>Fecha</th>
                    <th style={{ padding: '14px 18px', fontWeight: 700, fontSize: 16 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {files.length === 0 ? (
                    <tr><td colSpan={3} style={{ padding: 24, textAlign: 'center', color: '#888' }}>No hay archivos guardados.</td></tr>
                  ) : (
                    files.map((file, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 18px' }}>{file.nombre}</td>
                        <td style={{ padding: '12px 18px' }}>{new Date(file.fecha).toLocaleDateString('es-ES')}</td>
                        <td style={{ padding: '12px 18px' }}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              onClick={() => handleViewFile(file)}
                              style={{
                                padding: '6px 12px',
                                border: 'none',
                                borderRadius: 4,
                                background: '#3b4cca',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: 14,
                                fontWeight: 500
                              }}
                            >
                              Ver
                            </button>
                            <button
                              onClick={() => handleDeleteFile(file)}
                              style={{
                                padding: '6px 12px',
                                border: 'none',
                                borderRadius: 4,
                                background: '#e53935',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: 14,
                                fontWeight: 500
                              }}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
      
      {/* Modal para guardar */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            width: 400,
            maxWidth: '90%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Guardar transcripción</h3>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Nombre del archivo:</label>
              <input
                type="text"
                placeholder="Ingresa el nombre del archivo"
                value={fileName}
                onChange={e => setFileName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: 6,
                  fontSize: 16
                }}
                autoFocus
              />
            </div>
            {saveError && <div style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{saveError}</div>}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={closeModal}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #ddd',
                  borderRadius: 6,
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: 16
                }}
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveTranscription}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: 6,
                  background: '#3b4cca',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 600
                }}
                disabled={saving}
              >
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de detalles del archivo */}
      <FileDetailsModal 
        file={selectedFile}
        isOpen={showDetailsModal}
        onClose={closeDetailsModal}
      />
      
      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            width: 400,
            maxWidth: '90%',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Confirmar eliminación</h3>
            <p style={{ fontSize: 16, marginBottom: 24, color: '#666' }}>
              ¿Estás seguro de que quieres eliminar el archivo "{fileToDelete?.nombre}"? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                onClick={closeDeleteModal}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #ddd',
                  borderRadius: 6,
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: 16
                }}
                disabled={deleting}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: 6,
                  background: '#e53935',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 600
                }}
                disabled={deleting}
              >
                {deleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Botón flotante para cerrar sesión */}
      <button
        onClick={handleLogout}
        style={{
          position: 'fixed',
          left: 32,
          bottom: 32,
          background: '#fff',
          color: '#e53935',
          border: '2px solid #e53935',
          borderRadius: 8,
          padding: '12px 28px',
          fontSize: 18,
          fontWeight: 700,
          boxShadow: '0 2px 12px #0002',
          cursor: 'pointer',
          zIndex: 1000
        }}
        title="Cerrar sesión"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default UploadPage; 