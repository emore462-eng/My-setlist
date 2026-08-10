import { Cancion } from './models/Cancion.js';

/**
 * Consulta la API pública de iTunes para buscar canciones (HU1 & HU2)
 */
export const searchSongs = async (query) => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`
    );

    // Límite de peticiones excedido (guía de la API)
    if (response.status === 403) {
      throw new Error('RATE_LIMIT');
    }

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
          duracionMs: track.trackTimeMillis,
          genero: track.primaryGenreName || 'Desconocido'
        })
    );
  } catch (error) {
    if (error.message === 'RATE_LIMIT') {
      throw new Error('Alcanzaste el límite de búsquedas permitidas por la API. Espera un minuto y vuelve a intentarlo.');
    }
    console.error('Error en servicio de API:', error);
    throw new Error('No se pudo conectar con el servidor de música. Revisa tu conexión a internet.');
  }
};