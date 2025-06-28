// src/api/knowLiteApi.js

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

// Subir archivo a AssemblyAI
async function uploadToAssemblyAI(file) {
  const response = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      'authorization': API_KEY
    },
    body: file,
  });
  if (!response.ok) throw new Error('Error al subir el archivo a AssemblyAI');
  const data = await response.json();
  return data.upload_url;
}

// Crear transcripción
async function createTranscription(uploadUrl) {
  const response = await fetch(`${BASE_URL}/transcript`, {
    method: 'POST',
    headers: {
      'authorization': API_KEY,
      'content-type': 'application/json'
    },
    body: JSON.stringify({ audio_url: uploadUrl, language_code: 'es' }),
  });
  if (!response.ok) throw new Error('Error al crear la transcripción');
  const data = await response.json();
  return data.id;
}

// Obtener transcripción (polling)
async function waitForTranscription(id) {
  const pollingEndpoint = `${BASE_URL}/transcript/${id}`;
  while (true) {
    const response = await fetch(pollingEndpoint, {
      headers: { 'authorization': API_KEY }
    });
    if (!response.ok) throw new Error('Error al consultar la transcripción');
    const data = await response.json();
    if (data.status === 'completed') return data.text;
    if (data.status === 'failed') throw new Error('La transcripción falló');
    await new Promise(res => setTimeout(res, 2500)); // Espera 2.5s antes de volver a consultar
  }
}

// Función principal para subir y transcribir
export const uploadAudioFile = async (file) => {
  const uploadUrl = await uploadToAssemblyAI(file);
  const transcriptId = await createTranscription(uploadUrl);
  const text = await waitForTranscription(transcriptId);
  return { text };
};