import React from 'react';

const FilesList = ({
  isMobile,
  files,
  filesLoading,
  filesError,
  handleViewFile,
  handleDeleteFile,
}) => (
  <div
    style={{
      width: isMobile ? '100%' : 700,
      maxWidth: isMobile ? '100%' : '95%',
      marginBottom: 32,
      padding: isMobile ? 0 : undefined,
    }}
  >
    <h2
      style={{
        fontSize: isMobile ? 20 : 28,
        fontWeight: 700,
        marginBottom: 24,
        textAlign: isMobile ? 'center' : 'left',
      }}
    >
      Mis archivos
    </h2>
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
);

export default FilesList;
