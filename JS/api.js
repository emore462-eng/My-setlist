import { Cancion } from './models/Cancion.js';

/**
 * Consulta la API pública de iTunes para buscar canciones (HU1 & HU2)
 */
export const searchSongs = async (query) => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=15`
    );

    if (!response.ok) {
      throw new Error('NO_RESPONSE');
    }

    const data = await response.json();

    return data.results.map(
      (track) =>
        new Cancion({
          id: track.trackId.toString(),
          titulo: track.trackName,
          artista: track.artistName,
          album: track.collectionName || 'Sencillo',
          albumCover: track.artworkUrl100 || 'https://via.placeholder.com/100?text=Sin+Portada',
          duracionMs: track.trackTimeMillis
        })
    );
  } catch (error) {
    console.error('Error en servicio de API:', error);
    throw new Error('No se pudo conectar con el servidor de música. Revisa tu conexión a internet.');
  }
};