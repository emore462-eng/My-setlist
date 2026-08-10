/**
 * Estado central reactivo en memoria de la aplicación
 */
export const state = {
  playlistActivaId: null,
  resultadosBusqueda: [],
  playlists: [],
  isLoading: false,
  searchError: null,
  // Orden elegido por el usuario para cada playlist (HU9). Clave: playlistId, valor: 'reciente' | 'antigua' | 'alfabetico'
  ordenPorPlaylist: {},
  // Filtro "solo favoritas" activo por playlist (HU12). Clave: playlistId, valor: boolean
  filtroFavoritosPorPlaylist: {}
};