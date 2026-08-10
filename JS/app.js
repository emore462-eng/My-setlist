import { state } from './state.js';
import { searchSongs } from './api.js';
import { getPlaylists, savePlaylists, addSongToPlaylist } from './storage.js';
import {
  showToast,
  renderSearchResults,
  renderPlaylistsList,
  showPlaylistSelectorModal,
  renderPlaylistDetail
} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  renderApp();
});

const initEventListeners = () => {
  // Manejo de la Búsqueda (HU1 y HU2)
  const searchForm = document.getElementById('search-form');
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;

    // Actualizar estado a Carga (HU2)
    state.isLoading = true;
    state.searchError = null;
    renderApp();

    try {
      state.resultadosBusqueda = await searchSongs(query);
    } catch (err) {
      state.resultadosBusqueda = [];
      state.searchError = err.message;
    } finally {
      state.isLoading = false;
      renderApp();
    }
  });

  // Creación de Playlists con Validación (HU3)
  document.getElementById('btn-create-playlist').addEventListener('click', () => {
    const nombre = prompt('Ingresa el nombre para tu nueva playlist (ej. "Road trip"):');

    // Validar nombre no vacío o con solo espacios (HU3)
    if (nombre !== null) {
      if (!nombre.trim()) {
        showToast('⚠️ No puedes crear una playlist sin un nombre válido.', 'warning');
        return;
      }

      const playlists = getPlaylists();
      const nuevaPlaylist = {
        id: Date.now().toString(),
        nombre: nombre.trim(),
        canciones: []
      };

      playlists.push(nuevaPlaylist);
      savePlaylists(playlists);
      renderApp();
      showToast(`✅ Playlist "${nuevaPlaylist.nombre}" creada con éxito`, 'success');
    }
  });
};

// Agregar canción a Playlist (HU4)
export const handleAddSong = (cancion) => {
  const playlists = getPlaylists();

  if (playlists.length === 0) {
    showToast('⚠️ Primero debes crear una playlist para guardar canciones.', 'warning');
    return;
  }

  // Si sólo hay una playlist, agregar directamente
  if (playlists.length === 1) {
    const targetPlaylist = playlists[0];
    const result = addSongToPlaylist(targetPlaylist.id, cancion);
    processAddResult(result);
  } else {
    // Si hay más de una playlist, abrir modal de selección (HU4)
    showPlaylistSelectorModal(playlists, cancion, (selectedPlaylistId) => {
      const result = addSongToPlaylist(selectedPlaylistId, cancion);
      processAddResult(result);
    });
  }
};

const processAddResult = (result) => {
  if (result.success) {
    showToast(`✅ Canción agregada a "${result.playlistName}"`, 'success');
    renderApp();
  } else if (result.reason === 'DUPLICATE') {
    showToast(`⚠️ Esta canción ya está en la playlist "${result.playlistName}"`, 'warning');
  } else {
    showToast('❌ Ocurrió un error al intentar agregar la canción', 'error');
  }
};

// Navegación a Detalle y Retorno (HU5)
export const handleOpenPlaylist = (playlistId) => {
  state.playlistActivaId = playlistId;
  renderApp();
};

export const handleBackToSearch = () => {
  state.playlistActivaId = null;
  renderApp();
};

// Orquestador Principal de Interfaz
export const renderApp = () => {
  const searchSection = document.getElementById('search-section');
  const detailSection = document.getElementById('detail-section');
  state.playlists = getPlaylists();

  // Actualizar la lista lateral de playlists
  renderPlaylistsList(state.playlists, handleOpenPlaylist);

  // Alternar entre Vista Búsqueda y Vista Detalle de Playlist (HU5)
  if (state.playlistActivaId) {
    const activePlaylist = state.playlists.find((p) => p.id === state.playlistActivaId);
    if (activePlaylist) {
      searchSection.style.display = 'none';
      detailSection.style.display = 'block';
      renderPlaylistDetail(activePlaylist, detailSection, handleBackToSearch);
      return;
    }
  }

  searchSection.style.display = 'block';
  detailSection.style.display = 'none';

  // Renderizar los resultados de búsqueda o sus estados (HU1 y HU2)
  renderSearchResults(
    state.resultadosBusqueda,
    handleAddSong,
    state.isLoading,
    state.searchError
  );
};