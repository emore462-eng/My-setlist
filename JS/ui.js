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

// Notificación con opción de "Deshacer" la última eliminación (HU13)
export const showUndoToast = (message, onUndo, durationMs = 5000) => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Si ya había un aviso de "deshacer" pendiente, se reemplaza:
  // solo se puede deshacer la última eliminación (criterio de HU13)
  const previous = document.getElementById('undo-toast');
  if (previous) {
    clearTimeout(previous._timeoutId);
    previous.remove();
  }

  const toast = document.createElement('div');
  toast.id = 'undo-toast';
  toast.className = 'toast toast-undo';
  toast.innerHTML = `
    <span>${message}</span>
    <button class="btn-undo">Deshacer</button>
  `;

  container.appendChild(toast);

  toast._timeoutId = setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, durationMs);

  toast.querySelector('.btn-undo').addEventListener('click', () => {
    clearTimeout(toast._timeoutId);
    toast.remove();
    onUndo();
  });
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

// Suma la duración (en ms) de todas las canciones de una playlist (HU7)
const calcularDuracionTotalMs = (canciones) =>
  canciones.reduce((total, cancion) => total + (cancion.duracionMs || 0), 0);

// Formatea milisegundos totales a un texto legible tipo "1 h 23 min" (HU7)
const formatDuracionTotal = (totalMs) => {
  const totalMinutos = Math.floor(totalMs / 60000);
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  if (horas === 0) return `${minutos} min`;
  return `${horas} h ${minutos} min`;
};

// Encuentra el valor más frecuente dentro de una lista de textos (HU8)
const obtenerMasFrecuente = (valores) => {
  if (valores.length === 0) return null;

  const conteo = {};
  valores.forEach((valor) => {
    conteo[valor] = (conteo[valor] || 0) + 1;
  });

  return Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0];
};

// Calcula las estadísticas de una playlist: género y artista más frecuentes (HU8)
const calcularEstadisticas = (canciones) => ({
  generoTop: obtenerMasFrecuente(canciones.map((c) => c.genero || 'Desconocido')),
  artistaTop: obtenerMasFrecuente(canciones.map((c) => c.artista))
});

// Devuelve una copia ordenada de las canciones según el criterio elegido (HU9)
const ordenarCanciones = (canciones, orden) => {
  const copia = [...canciones];

  switch (orden) {
    case 'antigua':
      return copia.sort((a, b) => a.fechaAgregado - b.fechaAgregado);
    case 'alfabetico':
      return copia.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es', { sensitivity: 'base' }));
    case 'reciente':
    default:
      return copia.sort((a, b) => b.fechaAgregado - a.fechaAgregado);
  }
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

// Renderizado de la lista lateral de Playlists (HU3, HU6)
export const renderPlaylistsList = (playlists, onOpenClick, onDeleteClick) => {
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
      <div class="playlist-card-actions">
        <button class="btn-icon btn-delete-playlist" title="Eliminar playlist" aria-label="Eliminar playlist">🗑️</button>
        <span class="playlist-card-arrow">➔</span>
      </div>
    `;

    item.addEventListener('click', () => onOpenClick(playlist.id));

    const deleteBtn = item.querySelector('.btn-delete-playlist');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      onDeleteClick(playlist.id, playlist.nombre);
    });

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

// Modal de Confirmación genérico para acciones destructivas (HU6)
export const showConfirmModal = (message, onConfirm) => {
  const existingModal = document.getElementById('confirm-modal');
  if (existingModal) existingModal.remove();

  const modal = document.createElement('div');
  modal.id = 'confirm-modal';
  modal.className = 'modal-backdrop';

  modal.innerHTML = `
    <div class="modal-content">
      <h3 class="modal-title">¿Estás seguro?</h3>
      <p class="modal-text">${message}</p>
      <div class="modal-actions">
        <button id="confirm-cancel" class="btn btn-secondary">Cancelar</button>
        <button id="confirm-accept" class="btn btn-danger">Sí, eliminar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('confirm-cancel').onclick = () => modal.remove();
  document.getElementById('confirm-accept').onclick = () => {
    modal.remove();
    onConfirm();
  };
};

// Pantalla de aviso cuando los datos guardados están dañados/corruptos (HU10)
export const renderDatosCorruptos = (onReset) => {
  const existingScreen = document.getElementById('corrupted-data-screen');
  if (existingScreen) existingScreen.remove();

  const overlay = document.createElement('div');
  overlay.id = 'corrupted-data-screen';
  overlay.className = 'corrupted-screen';

  overlay.innerHTML = `
    <div class="corrupted-box">
      <div class="corrupted-icon">⚠️</div>
      <h2>No pudimos leer tus playlists guardadas</h2>
      <p>Los datos guardados en este navegador parecen estar dañados y no podemos mostrarlos de forma segura. Esto no afecta al resto de tu equipo ni a otras apps.</p>
      <button id="btn-reset-data" class="btn btn-danger">Empezar de cero</button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById('btn-reset-data').addEventListener('click', onReset);
};

// Detalle de Playlist y mensaje de Estado Vacío (HU5, HU6, HU7, HU8, HU9, HU12)
export const renderPlaylistDetail = (
  playlist,
  container,
  onBack,
  onRemoveSong,
  ordenActual,
  onOrderChange,
  filtroFavoritosActivo,
  onToggleFiltroFavoritos,
  onToggleFavorito
) => {
  container.innerHTML = '';

  const duracionTotalMs = calcularDuracionTotalMs(playlist.canciones);
  const stats = calcularEstadisticas(playlist.canciones);
  const sinDatos = 'Todavía no hay datos';

  const header = document.createElement('div');
  header.className = 'playlist-detail-header';
  header.innerHTML = `
    <button id="btn-back" class="btn btn-secondary">⬅ Volver al buscador</button>
    <div class="playlist-detail-info">
      <h2>${playlist.nombre}</h2>
      <p class="playlist-meta">${playlist.canciones.length} canción(es) guardada(s) • ⏱️ ${formatDuracionTotal(duracionTotalMs)}</p>
    </div>
  `;

  container.appendChild(header);
  document.getElementById('btn-back').addEventListener('click', onBack);

  // Estadísticas de la playlist (HU8)
  const statsBox = document.createElement('div');
  statsBox.className = 'playlist-stats';
  statsBox.innerHTML = `
    <div class="stat-item">
      <span class="stat-label">🎵 Canciones</span>
      <span class="stat-value">${playlist.canciones.length}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">🎧 Género más repetido</span>
      <span class="stat-value">${stats.generoTop ?? sinDatos}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">⭐ Artista más repetido</span>
      <span class="stat-value">${stats.artistaTop ?? sinDatos}</span>
    </div>
  `;
  container.appendChild(statsBox);

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

  // Barra de herramientas: orden (HU9) + filtro de favoritas (HU12). Solo aplica a esta playlist.
  const toolbar = document.createElement('div');
  toolbar.className = 'playlist-toolbar';
  toolbar.innerHTML = `
    <div class="playlist-sort">
      <label for="sort-select" class="sort-label">Ordenar por:</label>
      <select id="sort-select" class="sort-select">
        <option value="reciente" ${ordenActual === 'reciente' ? 'selected' : ''}>Más reciente primero</option>
        <option value="antigua" ${ordenActual === 'antigua' ? 'selected' : ''}>Más antigua primero</option>
        <option value="alfabetico" ${ordenActual === 'alfabetico' ? 'selected' : ''}>Alfabético (A-Z)</option>
      </select>
    </div>
    <label class="filter-favoritos">
      <input type="checkbox" id="filtro-favoritos" ${filtroFavoritosActivo ? 'checked' : ''} />
      Solo favoritas ⭐
    </label>
  `;
  container.appendChild(toolbar);

  document.getElementById('sort-select').addEventListener('change', (e) => {
    onOrderChange(playlist.id, e.target.value);
  });

  document.getElementById('filtro-favoritos').addEventListener('change', () => {
    onToggleFiltroFavoritos(playlist.id);
  });

  const cancionesOrdenadas = ordenarCanciones(playlist.canciones, ordenActual);
  const cancionesVisibles = filtroFavoritosActivo
    ? cancionesOrdenadas.filter((c) => c.favorito)
    : cancionesOrdenadas;

  // Estado vacío del filtro: hay canciones, pero ninguna es favorita (HU12)
  if (cancionesVisibles.length === 0) {
    const emptyFilter = document.createElement('div');
    emptyFilter.className = 'empty-state empty-state-inline';
    emptyFilter.innerHTML = `
      <div class="empty-icon">⭐</div>
      <h3>Todavía no marcaste favoritas</h3>
      <p>Tocá la estrella de una canción para verla acá.</p>
    `;
    container.appendChild(emptyFilter);
    return;
  }

  cancionesVisibles.forEach((cancion) => {
    const item = document.createElement('li');
    item.className = 'song-detail-item';
    item.innerHTML = `
      <img src="${cancion.albumCover}" alt="${cancion.titulo}" class="song-detail-cover" />
      <div class="song-detail-info">
        <span class="song-detail-title">${cancion.titulo}</span>
        <span class="song-detail-artist">${cancion.artista} — <em>${cancion.album}</em></span>
      </div>
      <span class="song-detail-date">Agregada: ${formatDate(cancion.fechaAgregado)}</span>
      <button class="btn-icon btn-favorito ${cancion.favorito ? 'is-favorito' : ''}" title="${cancion.favorito ? 'Quitar de favoritas' : 'Marcar como favorita'}" aria-label="Marcar como favorita">${cancion.favorito ? '⭐' : '☆'}</button>
      <button class="btn-icon btn-remove-song" title="Quitar canción" aria-label="Quitar canción">🗑️</button>
    `;

    item
      .querySelector('.btn-favorito')
      .addEventListener('click', () => onToggleFavorito(playlist.id, cancion.id));

    item
      .querySelector('.btn-remove-song')
      .addEventListener('click', () => onRemoveSong(playlist.id, cancion.id, cancion.titulo));

    list.appendChild(item);
  });

  container.appendChild(list);
};