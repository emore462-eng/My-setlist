# 🎵 Mi Setlist

> **Gestor de Playlists y Setlists de Música** — Una Single Page Application (SPA) modular construida con JavaScript vanilla, CSS3 moderno y la API pública de iTunes.

---

## 📌 Visión General

**Mi Setlist** permite a los usuarios buscar canciones en tiempo real a través de la API de iTunes, organizar su música en múltiples playlists personalizadas y gestionar sus listas de reproducción con persistencia de datos local (`localStorage`).

---

## ✨ Funcionalidades (Sprint 1: HU1 – HU5)

### 🔍 1. Búsqueda de Canciones (HU1)
- Búsqueda dinámica por artista, título o álbum.
- Muestra de resultados en tarjetas interactivas que incluyen:
  - Carátula del álbum en alta resolución.
  - Título de la canción y nombre del artista.
  - Duración formateada automáticamente (`mm:ss`).

### ⏳ 2. Gestión de Estados de Búsqueda (HU2)
- **Cargando:** Indicador visual claro mientras la API procesa la consulta.
- **Sin resultados:** Mensaje amigable cuando la búsqueda no arroja coincidencias.
- **Error:** Captura de fallos de red o conexión con un mensaje inteligible para el usuario.
- *Estados mutuamente excluyentes para evitar inconsistencias en pantalla.*

### ➕ 3. Creación de Playlists (HU3)
- Creación de playlists personalizadas con nombres elegidos por el usuario.
- **Validación de entradas:** Bloqueo de creación con nombres vacíos o espacios en blanco.
- Renderizado inmediato en el panel lateral de listas.

### ➕ 4. Adición de Canciones a Playlists (HU4)
- **Flujo inteligente:**
  - Si no hay playlists, alerta al usuario para crear una.
  - Si hay 1 playlist, la canción se agrega de manera directa.
  - Si existen múltiples playlists, despliega un **Modal interactivo** para seleccionar la lista de destino.
- **Prevención de duplicados:** Control mediante ID único para impedir canciones repetidas en la misma playlist.
- Sistema de **Notificaciones Toast** con retroalimentación visual de éxito, advertencia o error.

### 📋 5. Vista de Detalle de Playlist (HU5)
- Navegación fluida entre la vista de búsqueda y el detalle de playlist sin recargar la página.
- Lista completa de canciones con portada, título, artista, álbum y **fecha exacta de adición**.
- **Estado vacío amigable:** Diseño informativo cuando una playlist aún no tiene canciones.

---

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular separando responsabilidades (Modelos, Estado, Persistencia, API e Interfaz):

```text
mi-setlist/
├── index.html             # Interfaz de usuario y maquetación principal
├── css/
│   └── styles.css         # Estilos globales, diseño responsive y temas
├── js/
│   ├── app.js             # Punto de entrada, inicialización y manejadores principales
│   ├── models/
│   │   └── Cancion.js     # Clase de modelo (entidad Canción y formateador de tiempo)
│   ├── state.js           # Estado global en memoria (playlists, loading, errores)
│   ├── storage.js         # Capa de almacenamiento en LocalStorage y rehidratación
│   ├── api.js             # Cliente HTTP para consumo de la API de iTunes
│   └── ui.js              # Funciones de renderizado del DOM, modales y toasts
├── PROMPTS.md             # Trazabilidad de trabajo y prompts utilizados con IA
├── README.md              # Documentación del proyecto