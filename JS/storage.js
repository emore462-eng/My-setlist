import { Cancion } from './models/Cancion.js';

const STORAGE_KEY = 'mi_setlist_playlists_v1';

/**
 * Intenta parsear y rehidratar el texto crudo de LocalStorage.
 * Lanza un error si el formato no es válido o no tiene la forma esperada (HU10).
 */
const intentarLeerPlaylists = (data) => {
  const rawPlaylists = JSON.parse(data);

  if (!Array.isArray(rawPlaylists)) {
    throw new Error('El formato guardado no corresponde a una lista de playlists');
  }

  return rawPlaylists.map((p) => ({
    ...p,
    canciones: (p.canciones || []).map((c) => new Cancion(c))
  }));
};

/**
 * Obtiene las playlists de LocalStorage rehidratando las clases Cancion y fechas (HU5)
 * Si los datos guardados están dañados, no rompe la app: devuelve una lista vacía.
 */
export const getPlaylists = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  try {
    return intentarLeerPlaylists(data);
  } catch (error) {
    console.error('Error al leer LocalStorage:', error);
    return [];
  }
};

/**
 * Indica si hay datos guardados pero están dañados/corruptos (HU10).
 * Devuelve false si simplemente no hay nada guardado todavía (usuario nuevo).
 */
export const hayDatosCorruptos = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return false;

  try {
    intentarLeerPlaylists(data);
    return false;
  } catch (error) {
    return true;
  }
};

/**
 * Borra los datos guardados para que la persona pueda "Empezar de cero" (HU10)
 */
export const reiniciarDatos = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true };
  } catch (error) {
    console.error('Error al reiniciar los datos:', error);
    return { success: false };
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
    throw error;
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

  try {
    savePlaylists(playlists);
    return { success: true, playlistName: playlist.nombre };
  } catch (error) {
    console.error('Error al guardar la canción en la playlist:', error);
    return { success: false, reason: 'SAVE_FAILED', playlistName: playlist.nombre };
  }
};

/**
 * Quita una canción de una playlist de forma inmutable (HU6)
 */
export const removeSongFromPlaylist = (playlistId, cancionId) => {
  const playlists = getPlaylists();
  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return { success: false, reason: 'NOT_FOUND' };
  }

  const cancion = playlist.canciones.find((c) => c.id === cancionId);

  const playlistsActualizadas = playlists.map((p) =>
    p.id === playlistId
      ? { ...p, canciones: p.canciones.filter((c) => c.id !== cancionId) }
      : p
  );

  try {
    savePlaylists(playlistsActualizadas);
    return { success: true, playlistName: playlist.nombre, cancionTitulo: cancion?.titulo };
  } catch (error) {
    console.error('Error al quitar la canción de la playlist:', error);
    return { success: false, reason: 'SAVE_FAILED', playlistName: playlist.nombre };
  }
};

/**
 * Elimina una playlist completa de forma inmutable (HU6)
 */
export const deletePlaylist = (playlistId) => {
  const playlists = getPlaylists();
  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return { success: false, reason: 'NOT_FOUND' };
  }

  const playlistsActualizadas = playlists.filter((p) => p.id !== playlistId);

  try {
    savePlaylists(playlistsActualizadas);
    return { success: true, playlistName: playlist.nombre };
  } catch (error) {
    console.error('Error al eliminar la playlist:', error);
    return { success: false, reason: 'SAVE_FAILED', playlistName: playlist.nombre };
  }
};