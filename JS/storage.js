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
 * Quita una canción de una playlist de forma inmutable (HU6).
 * Devuelve la canción y su posición original para poder deshacer la acción (HU13).
 */
export const removeSongFromPlaylist = (playlistId, cancionId) => {
  const playlists = getPlaylists();
  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return { success: false, reason: 'NOT_FOUND' };
  }

  const indice = playlist.canciones.findIndex((c) => c.id === cancionId);
  const cancion = playlist.canciones[indice];

  const playlistsActualizadas = playlists.map((p) =>
    p.id === playlistId
      ? { ...p, canciones: p.canciones.filter((c) => c.id !== cancionId) }
      : p
  );

  try {
    savePlaylists(playlistsActualizadas);
    return {
      success: true,
      playlistName: playlist.nombre,
      cancionTitulo: cancion?.titulo,
      cancion,
      indice
    };
  } catch (error) {
    console.error('Error al quitar la canción de la playlist:', error);
    return { success: false, reason: 'SAVE_FAILED', playlistName: playlist.nombre };
  }
};

/**
 * Reinserta una canción en una playlist en la posición indicada, para deshacer HU6 (HU13)
 */
export const insertarCancionEnPlaylist = (playlistId, cancion, indice) => {
  const playlists = getPlaylists();
  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist || !cancion) {
    return { success: false, reason: 'NOT_FOUND' };
  }

  const cancionesActualizadas = [...playlist.canciones];
  const posicion = Math.min(Math.max(indice ?? cancionesActualizadas.length, 0), cancionesActualizadas.length);
  cancionesActualizadas.splice(posicion, 0, new Cancion(cancion));

  const playlistsActualizadas = playlists.map((p) =>
    p.id === playlistId ? { ...p, canciones: cancionesActualizadas } : p
  );

  try {
    savePlaylists(playlistsActualizadas);
    return { success: true, playlistName: playlist.nombre };
  } catch (error) {
    console.error('Error al restaurar la canción:', error);
    return { success: false, reason: 'SAVE_FAILED' };
  }
};

/**
 * Elimina una playlist completa de forma inmutable (HU6).
 * Devuelve la playlist y su posición original para poder deshacer la acción (HU13).
 */
export const deletePlaylist = (playlistId) => {
  const playlists = getPlaylists();
  const indice = playlists.findIndex((p) => p.id === playlistId);

  if (indice === -1) {
    return { success: false, reason: 'NOT_FOUND' };
  }

  const playlist = playlists[indice];
  const playlistsActualizadas = playlists.filter((p) => p.id !== playlistId);

  try {
    savePlaylists(playlistsActualizadas);
    return { success: true, playlistName: playlist.nombre, playlist, indice };
  } catch (error) {
    console.error('Error al eliminar la playlist:', error);
    return { success: false, reason: 'SAVE_FAILED', playlistName: playlist.nombre };
  }
};

/**
 * Reinserta una playlist completa en la posición indicada, para deshacer HU6 (HU13)
 */
export const restaurarPlaylist = (playlist, indice) => {
  if (!playlist) {
    return { success: false, reason: 'NOT_FOUND' };
  }

  const playlists = getPlaylists();
  const playlistsActualizadas = [...playlists];
  const posicion = Math.min(Math.max(indice ?? playlistsActualizadas.length, 0), playlistsActualizadas.length);
  playlistsActualizadas.splice(posicion, 0, playlist);

  try {
    savePlaylists(playlistsActualizadas);
    return { success: true, playlistName: playlist.nombre };
  } catch (error) {
    console.error('Error al restaurar la playlist:', error);
    return { success: false, reason: 'SAVE_FAILED' };
  }
};

/**
 * Marca o desmarca una canción como favorita dentro de una playlist, de forma inmutable (HU12)
 */
export const toggleFavorito = (playlistId, cancionId) => {
  const playlists = getPlaylists();
  const playlist = playlists.find((p) => p.id === playlistId);

  if (!playlist) {
    return { success: false, reason: 'NOT_FOUND' };
  }

  const playlistsActualizadas = playlists.map((p) =>
    p.id === playlistId
      ? {
          ...p,
          canciones: p.canciones.map((c) =>
            c.id === cancionId ? new Cancion({ ...c, favorito: !c.favorito }) : c
          )
        }
      : p
  );

  try {
    savePlaylists(playlistsActualizadas);
    return { success: true };
  } catch (error) {
    console.error('Error al actualizar la canción favorita:', error);
    return { success: false, reason: 'SAVE_FAILED' };
  }
};
