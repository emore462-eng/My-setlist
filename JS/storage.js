import { Cancion } from './models/Cancion.js';

const STORAGE_KEY = 'mi_setlist_playlists_v1';

/**
 * Obtiene las playlists de LocalStorage rehidratando las clases Cancion y fechas (HU5)
 */
export const getPlaylists = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  try {
    const rawPlaylists = JSON.parse(data);
    return rawPlaylists.map((p) => ({
      ...p,
      canciones: (p.canciones || []).map((c) => new Cancion(c))
    }));
  } catch (error) {
    console.error('Error al leer LocalStorage:', error);
    return [];
  }
};

/**
 * Guarda las playlists en LocalStorage
 */
export const savePlaylists = (playlists) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  } catch (error) {
    console.error('Error al guardar en LocalStorage:', error);
  }
};

/**
 * Agrega una canción a una playlist impidiendo duplicados (HU4)
 */
export const addSongToPlaylist = (playlistId, cancionData) => {
  const playlists = getPlaylists();
  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return { success: false, reason: 'NOT_FOUND' };
  }

  const yaExiste = playlist.canciones.some((c) => c.id === cancionData.id);

  if (yaExiste) {
    return { success: false, reason: 'DUPLICATE', playlistName: playlist.nombre };
  }

  const nuevaCancion = new Cancion({
    ...cancionData,
    fechaAgregado: new Date()
  });

  playlist.canciones.push(nuevaCancion);
  savePlaylists(playlists);

  return { success: true, playlistName: playlist.nombre };
};

/**
 * Limpia todo el almacenamiento local
 */
export const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};