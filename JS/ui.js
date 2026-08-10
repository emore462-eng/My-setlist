/// Notificaciones emergentes (Toast)
export const showToast = (message, type = 'info') => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 2500);
};

// Formateador helper para fechas (HU5)
const formatDate = (date) => {
  if (!(date instanceof Date) || isNaN(date.getTime())) return 'Fecha desconocida';
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

// Renderizado de Resultados de Búsqueda y Estados de Carga/Error (HU1 y HU2)
export const renderSearchResults = (songs, onAddClick, isLoading, errorMsg) => {
  const container = document.getElementById('search-results');
  container.innerHTML = '';

  // 1. Estado de Carga
  if (isLoading) {
    container.innerHTML = `
      <div class="status-box loading">
        <p>⏳ Buscando canciones en tiempo real...</p>
      </div>
    `;
    return;
  }

  // 2. Estado de Error
  if (errorMsg) {
    container.innerHTML = `
      <div class="status-box error">
        <p>⚠️ ${errorMsg}</p>
      </div>
    `;
    return;
  }

  // 3. Estado Sin Resultados
  if (songs.length === 0) {
    container.innerHTML = `
      <div class="status-box empty">
        <p>🔍 No encontramos ninguna canción para tu búsqueda. Intenta con otro nombre o artista.</p>
      </div>
    `;
    return;
  }

  // 4. Muestra de Resultados con duración (HU1)
  songs.forEach((song) => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
      <img src="${song.albumCover}" alt="${song.titulo}" class="song-card-img" />
      <div class="song-card-info">
        <h4 class="song-title">${song.titulo}</h4>
        <div class="song-meta">
          <span>${song.artista}</span> • 
          <span class="song-duration">⏱️ ${song.duracionFormateada}</span>
        </div>
      </div>
      <button class="btn btn-secondary btn-add">➕ Agregar</button>
    `;

    card.querySelector('.btn-add').addEventListener('click', () => onAddClick(song));
    container.appendChild(card);
  });
};

// Renderizado de la lista lateral de Playlists (HU3)
export const renderPlaylistsList = (playlists, onOpenClick) => {
  const container = document.getElementById('playlists-list');
  container.innerHTML = '';

  if (playlists.length === 0) {
    container.innerHTML = '<p class="text-muted">Aún no has creado playlists.</p>';
    return;
  }

  playlists.forEach((playlist) => {
    const item = document.createElement('div');
    item.className = 'playlist-card';
    item.innerHTML = `
      <div class="playlist-card-content">
        <h4 class="playlist-card-title">${playlist.nombre}</h4>
        <span class="playlist-card-count">${playlist.canciones.length} canción(es)</span>
      </div>
      <span class="playlist-card-arrow">➔</span>
    `;

    item.addEventListener('click', () => onOpenClick(playlist.id));
    container.appendChild(item);
  });
};

// Modal de Selección de Playlist cuando existen múltiples (HU4)
export const showPlaylistSelectorModal = (playlists, song, onSelect) => {
  const existingModal = document.getElementById('playlist-modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'playlist-modal';
  modal.className = 'modal-backdrop';

  const optionsHtml = playlists
    .map((p) => `<option value="${p.id}">${p.nombre} (${p.canciones.length} canciones)</option>`)
    .join('');

  modal.innerHTML = `
    <div class="modal-content">
      <h3 class="modal-title">Selecciona una Playlist</h3>
      <p class="modal-text">Añadir "<strong>${song.titulo}</strong>" a:</p>
      <select id="select-playlist" class="modal-select">
        ${optionsHtml}
      </select>
      <div class="modal-actions">
        <button id="modal-cancel" class="btn btn-secondary">Cancelar</button>
        <button id="modal-confirm" class="btn btn-primary">Guardar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('modal-cancel').onclick = () => modal.remove();
  document.getElementById('modal-confirm').onclick = () => {
    const select = document.getElementById('select-playlist');
    onSelect(select.value);
    modal.remove();
  };
};

// Detalle de Playlist y mensaje de Estado Vacío (HU5)
export const renderPlaylistDetail = (playlist, container, onBack) => {
  container.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'playlist-detail-header';
  header.innerHTML = `
    <button id="btn-back" class="btn btn-secondary">⬅ Volver al buscador</button>
    <div class="playlist-detail-info">
      <h2>${playlist.nombre}</h2>
      <p class="playlist-meta">${playlist.canciones.length} canción(es) guardada(s)</p>
    </div>
  `;

  container.appendChild(header);
  document.getElementById('btn-back').addEventListener('click', onBack);

  // Mensaje amigable si no hay canciones (HU5)
  if (playlist.canciones.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <div class="empty-icon">🎧</div>
      <h3>Tu playlist está vacía</h3>
      <p>Explora y busca canciones en la pantalla principal para agregarlas a "${playlist.nombre}".</p>
    `;
    container.appendChild(emptyState);
    return;
  }

  const list = document.createElement('ul');
  list.className = 'song-detail-list';
s
  playlist.canciones.forEach((cancion) => {
    const item = document.createElement('li');
    item.className = 'song-detail-item';
    item.innerHTML = `
      <img src="${cancion.albumCover}" alt="${cancion.titulo}" class="song-detail-cover" />
      <div class="song-detail-info">
        <span class="song-detail-title">${cancion.titulo}</span>
        <span class="song-detail-artist">${cancion.artista} — <em>${cancion.album}</em></span>
      </div>
      <span class="song-detail-date">Agregada: ${formatDate(cancion.fechaAgregado)}</span>
    `;
    list.appendChild(item);
  });

  container.appendChild(list);
};