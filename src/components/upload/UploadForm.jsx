import React from 'react';

const UploadForm = ({
  isMobile,
  fileInputRef,
  handleSelectFiles,
  handleFileChange,
  loading,
  error,
  description,
  setDescription,
  handleSave,
}) => (
  <div
    style={{
      width: isMobile ? '100%' : 500,
      maxWidth: isMobile ? '100%' : '90%',
      marginBottom: 32,
      padding: isMobile ? 0 : undefined,
    }}
  >
    <h2
      style={{
        fontSize: isMobile ? 22 : 28,
        fontWeight: 700,
        marginBottom: 16,
        textAlign: isMobile ? 'center' : 'left',
      }}
    >
      Subir Archivo
    </h2>
    <div
      style={{
        border: '2px dashed #c3c8d4',
        borderRadius: 12,
        padding: isMobile ? 18 : 40,
        textAlign: 'center',
        background: '#fff',
        marginBottom: 32,
      }}
    >
      <div style={{ fontWeight: 600, fontSize: isMobile ? 15 : 18, marginBottom: 8 }}>
        Selecciona y sube tus archivos de audio aca
      </div>
      <div style={{ color: '#666', fontSize: isMobile ? 13 : 15, marginBottom: 20 }}>
        Soporta audio en formato MP3
      </div>
      <button
        type="button"
        onClick={handleSelectFiles}
        style={{
          background: '#f5f6fa',
          border: '1px solid #c3c8d4',
          borderRadius: 8,
          padding: isMobile ? '8px 18px' : '10px 28px',
          fontWeight: 600,
          fontSize: isMobile ? 14 : 16,
          cursor: 'pointer',
        }}
        disabled={loading}
      >
        {loading ? 'Subiendo...' : 'Select files'}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        multiple={false}
        accept="audio/mp3,audio/mpeg"
        onChange={handleFileChange}
      />
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
    <textarea
      placeholder="Aquí aparecerá la transcripción..."
      style={{
        width: '100%',
        minHeight: isMobile ? 120 : 180,
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: isMobile ? 10 : 16,
        fontSize: isMobile ? 15 : 17,
        resize: 'vertical',
        background: '#f8f9fb',
        marginBottom: 16,
        color: '#111',
      }}
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
        padding: isMobile ? '10px 0' : '14px 0',
        fontWeight: 700,
        fontSize: isMobile ? 16 : 18,
        cursor: 'pointer',
        marginBottom: 8,
      }}
      disabled={loading || !description}
    >
      Guardar
    </button>
  </div>
);

export default UploadForm;
