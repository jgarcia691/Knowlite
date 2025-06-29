import React, { useState } from 'react';
// Asegúrate de instalar jsPDF: npm install jspdf
import { jsPDF } from 'jspdf';

const FileDetailsModal = ({ file, isOpen, onClose }) => {
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  if (!isOpen || !file) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(file.nombre || 'Transcripción', 10, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${formatDate(file.fecha)}`, 10, 30);
    doc.text(`Autor: ${file.autor}`, 10, 40);
    doc.setFontSize(13);
    doc.text('Transcripción:', 10, 55);
    doc.setFontSize(12);
    doc.text(file.texto || '', 10, 65, { maxWidth: 180 });
    doc.save(`${file.nombre || 'transcripcion'}.pdf`);
  };

  const handleShowSummaryModal = async () => {
    setShowSummaryModal(true);
    setSummary('');
    setSummaryError('');
    setSummaryLoading(true);
    try {
      const response = await fetch('https://knowlite-backend.vercel.app/api/resumir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: file.texto })
      });
      if (!response.ok) throw new Error('Error al generar el resumen');
      const data = await response.json();
      setSummary(data.resumen || '');
    } catch (err) {
      setSummaryError('No se pudo generar el resumen.');
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
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
        width: 600,
        maxWidth: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Detalles del archivo</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: '#666',
              padding: 4
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>Nombre:</label>
          <div style={{ padding: 12, background: '#f8f9fa', borderRadius: 6, fontSize: 16 }}>
            {file.nombre}
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>Fecha:</label>
          <div style={{ padding: 12, background: '#f8f9fa', borderRadius: 6, fontSize: 16 }}>
            {formatDate(file.fecha)}
          </div>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>Autor:</label>
          <div style={{ padding: 12, background: '#f8f9fa', borderRadius: 6, fontSize: 16 }}>
            {file.autor}
          </div>
        </div>
        
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>Transcripción:</label>
          <div style={{ 
            padding: 16, 
            background: '#f8f9fa', 
            borderRadius: 6, 
            fontSize: 16, 
            lineHeight: 1.6,
            maxHeight: 300,
            overflow: 'auto',
            whiteSpace: 'pre-wrap'
          }}>
            {file.texto}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <button
            onClick={handleDownloadPDF}
            style={{
              padding: '10px 24px',
              border: 'none',
              borderRadius: 6,
              background: '#3b4cca',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Descargar PDF
          </button>
          <button
            onClick={handleShowSummaryModal}
            style={{
              padding: '10px 24px',
              border: 'none',
              borderRadius: 6,
              background: '#bcd2e8',
              color: '#222',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Resumen IA
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 24px',
              border: 'none',
              borderRadius: 6,
              background: '#3b4cca',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
      {/* Modal Resumen IA */}
      {showSummaryModal && (
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
          zIndex: 1100
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 32,
            width: 500,
            maxWidth: '95vw',
            maxHeight: '80vh',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18 }}>Resumen IA</h3>
            {summaryLoading && <div style={{ color: '#888', marginBottom: 16 }}>Generando resumen...</div>}
            {summaryError && <div style={{ color: 'red', marginBottom: 12 }}>{summaryError}</div>}
            {summary && (
              <div style={{
                background: '#f5f6fa',
                border: '1px solid #c3c8d4',
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
                color: '#222',
                fontSize: 16,
                maxHeight: 250,
                overflowY: 'auto',
                whiteSpace: 'pre-wrap',
              }}>
                {summary}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowSummaryModal(false)}
                style={{
                  padding: '10px 24px',
                  border: 'none',
                  borderRadius: 6,
                  background: '#3b4cca',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 16,
                  fontWeight: 600
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDetailsModal;