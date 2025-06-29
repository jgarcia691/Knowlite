import React, { useRef, useState, useEffect } from 'react';
import { uploadAudioFile } from '../../api/knowLiteApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import FileDetailsModal from '../common/FileDetailsModal';
import UploadMenu from './UploadMenu';
import UploadForm from './UploadForm';
import FilesList from './FilesList';

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
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');
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
    <div
      style={{
        display: isMobile ? 'block' : 'flex',
        minHeight: '100vh',
        background: '#fafbfc',
      }}
    >
      <UploadMenu
        isMobile={isMobile}
        view={view}
        setView={setView}
        handleShowFiles={handleShowFiles}
        handleGoProfile={handleGoProfile}
      />
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: isMobile ? '24px 0' : '60px 0',
          width: '100%',
        }}
      >
        {view === 'upload' && (
          <UploadForm
            isMobile={isMobile}
            fileInputRef={fileInputRef}
            handleSelectFiles={handleSelectFiles}
            handleFileChange={handleFileChange}
            loading={loading}
            error={error}
            description={description}
            setDescription={setDescription}
            handleSave={handleSave}
          />
        )}
        {view === 'files' && (
          <FilesList
            isMobile={isMobile}
            files={files}
            filesLoading={filesLoading}
            filesError={filesError}
            handleViewFile={handleViewFile}
            handleDeleteFile={handleDeleteFile}
          />
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
          left: isMobile ? '50%' : 32,
          bottom: 32,
          transform: isMobile ? 'translateX(-50%)' : 'none',
          background: '#fff',
          color: '#e53935',
          border: '2px solid #e53935',
          borderRadius: 8,
          padding: isMobile ? '10px 18px' : '12px 28px',
          fontSize: isMobile ? 16 : 18,
          fontWeight: 700,
          boxShadow: '0 2px 12px #0002',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        title="Cerrar sesión"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default UploadPage;