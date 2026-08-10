import { state } from './state.js';
import { searchSongs } from './api.js';
import {
  getPlaylists,
  savePlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
  hayDatosCorruptos,
  reiniciarDatos
} from './storage.js';
import {
  showToast,
  renderSearchResults,
  renderPlaylistsList,
  showPlaylistSelectorModal,
  showConfirmModal,
  renderPlaylistDetail,
  renderDatosCorruptos
} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // Si los datos guardados están dañados, mostrar pantalla de recuperación (HU10)
  if (hayDatosCorruptos()) {
    renderDatosCorruptos(handleReiniciarDatos);
    return;
  }

  initEventListeners();
  renderApp();
});

// Borra los datos dañados y recarga la app desde cero (HU10)
const handleReiniciarDatos = () => {
  reiniciarDatos();
  window.location.reload();
};

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
        id: crypto?.randomUUID?.() ?? Date.now().toString(),
        nombre: nombre.trim(),
        canciones: []
      };
      
      playlists.push(nuevaPlaylist);
      try {
        savePlaylists(playlists);
        renderApp();
        showToast(`✅ Playlist "${nuevaPlaylist.nombre}" creada con éxito`, 'success');
      } catch (error) {
        console.error('Error creando playlist:', error);
        showToast('❌ No se pudo crear la playlist. Intenta de nuevo.', 'error');
      }
    }
  });
};

// Agregar canción a Playlist (HU4)
const handleAddSong = (cancion) => {
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
const handleOpenPlaylist = (playlistId) => {
  state.playlistActivaId = playlistId;
  renderApp();
};

const handleBackToSearch = () => {
  state.playlistActivaId = null;
  renderApp();
};

// Quitar canción individual con confirmación previa (HU6)
const handleRemoveSong = (playlistId, cancionId, cancionTitulo) => {
  showConfirmModal(
    `Vas a quitar "${cancionTitulo}" de esta playlist.`,
    () => {
      const result = removeSongFromPlaylist(playlistId, cancionId);
      if (result.success) {
        renderApp();
        showToast(`🗑️ "${result.cancionTitulo}" quitada de "${result.playlistName}"`, 'success');
      } else {
        showToast('❌ No se pudo quitar la canción. Intenta de nuevo.', 'error');
      }
    }
  );
};

// Eliminar playlist completa con confirmación previa (HU6)
const handleDeletePlaylist = (playlistId, playlistNombre) => {
  showConfirmModal(
    `Vas a eliminar la playlist "${playlistNombre}" junto con todas sus canciones. Esta acción no se puede deshacer.`,
    () => {
      const result = deletePlaylist(playlistId);
      if (result.success) {
        if (state.playlistActivaId === playlistId) {
          state.playlistActivaId = null;
        }
        renderApp();
        showToast(`🗑️ Playlist "${result.playlistName}" eliminada`, 'success');
      } else {
        showToast('❌ No se pudo eliminar la playlist. Intenta de nuevo.', 'error');
      }
    }
  );
};

// Cambiar el criterio de orden de una playlist puntual (HU9)
const handleOrderChange = (playlistId, ordenSeleccionado) => {
  state.ordenPorPlaylist[playlistId] = ordenSeleccionado;
  renderApp();
};

// Orquestador Principal de Interfaz
const renderApp = () => {
  const searchSection = document.getElementById('search-section');
  const detailSection = document.getElementById('detail-section');
  state.playlists = getPlaylists();

  // Actualizar la lista lateral de playlists
  renderPlaylistsList(state.playlists, handleOpenPlaylist, handleDeletePlaylist);

  // Alternar entre Vista Búsqueda y Vista Detalle de Playlist (HU5)
  if (state.playlistActivaId) {
    const activePlaylist = state.playlists.find((p) => p.id === state.playlistActivaId);
    if (activePlaylist) {
      searchSection.style.display = 'none';
      detailSection.style.display = 'block';
      const ordenActual = state.ordenPorPlaylist[activePlaylist.id] || 'reciente';
      renderPlaylistDetail(
        activePlaylist,
        detailSection,
        handleBackToSearch,
        handleRemoveSong,
        ordenActual,
        handleOrderChange
      );
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