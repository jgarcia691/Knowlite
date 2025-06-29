import React from 'react';

const UploadMenu = ({ isMobile, view, setView, handleShowFiles, handleGoProfile }) => (
  isMobile ? (
    <nav
      style={{
        width: '100%',
        background: '#f5f6fa',
        padding: '12px 0',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 18 }}>Knowlite</div>
      <div
        style={{ fontWeight: 600, color: view === 'upload' ? '#3b4cca' : '#444', cursor: 'pointer' }}
        onClick={() => setView('upload')}
      >
        + Nuevo
      </div>
      <div
        style={{ fontWeight: 600, color: view === 'files' ? '#3b4cca' : '#444', cursor: 'pointer' }}
        onClick={handleShowFiles}
      >
        📄 Archivos
      </div>
      <div
        style={{ fontWeight: 600, color: '#444', cursor: 'pointer' }}
        onClick={handleGoProfile}
      >
        👤 Perfil
      </div>
    </nav>
  ) : (
    <aside
      style={{
        width: 260,
        background: '#f5f6fa',
        padding: '32px 0',
        borderRight: '1px solid #eee',
        minHeight: '100vh',
      }}
    >
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
  )
);

export default UploadMenu;
