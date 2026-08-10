# 🎵 Mi Setlist

> **Gestor de Playlists y Setlists de Música** — Una Single Page Application (SPA) modular construida con JavaScript vanilla (ES Modules), CSS3 moderno y la API pública de iTunes.

---

## 📌 Visión General

**Mi Setlist** permite a los usuarios buscar canciones en tiempo real a través de la API de iTunes, organizar su música en múltiples playlists personalizadas, administrarlas (ordenar, marcar favoritas, eliminar con opción de deshacer) y consultar estadísticas — todo con persistencia local en `localStorage` y protección ante datos corruptos.

El proyecto está desarrollado sin frameworks ni dependencias externas: HTML, CSS y JavaScript puro, usando módulos ES nativos (`type="module"`).

---

## ✨ Funcionalidades

### Sprint 1 — Buscar música y armar tu primera playlist

- **🔍 Búsqueda de canciones (HU1):** búsqueda dinámica por artista, título o álbum contra la API de iTunes. Resultados en tarjetas con carátula, título, artista y duración formateada (`mm:ss`).
- **⏳ Estados de búsqueda (HU2):** indicadores claros y mutuamente excluyentes de carga, sin resultados y error de conexión.
- **➕ Creación de playlists (HU3):** creación con nombre personalizado y validación contra nombres vacíos o solo espacios.
- **🎯 Agregar canciones a playlists (HU4):** flujo inteligente — si no hay playlists, avisa al usuario; si hay una sola, agrega directo; si hay varias, abre un modal de selección. Bloquea duplicados por ID y notifica todo mediante **toasts**.
- **📋 Detalle de playlist (HU5):** navegación entre búsqueda y detalle sin recargar la página, con listado completo (portada, título, artista, álbum, fecha de adición) y estado vacío amigable.

### Sprint 2 — Administrar, medir y no perder tu música

- **🗑️ Eliminar con confirmación y deshacer (HU6):** quitar canciones individuales o eliminar playlists completas, siempre con un modal de confirmación previo.
- **⏱️ Duración total de la playlist (HU7):** suma automática de la duración de todas las canciones, mostrada en formato legible (ej. "1 h 23 min").
- **📊 Estadísticas de playlist (HU8):** cálculo del artista y género más frecuentes dentro de una playlist.
- **↕️ Ordenar canciones (HU9):** ordenamiento por fecha (más reciente/más antigua) o alfabético, configurable por playlist.
- **💾 Persistencia robusta (HU10):** las playlists, el orden y las preferencias se guardan y recuperan íntegramente desde `localStorage`.
- **🛡️ Recuperación ante datos dañados (HU11):** si los datos guardados están corruptos, la app detecta el problema y ofrece una pantalla de recuperación en lugar de romperse.

### Iniciativa personal (HUs propias)

- **⭐ Favoritas (HU12):** marcar/desmarcar canciones como favoritas dentro de una playlist, con filtro "solo favoritas".
- **↩️ Deshacer última eliminación (HU13):** al quitar una canción o eliminar una playlist, aparece un toast con la opción de deshacer la acción y restaurar el elemento en su posición original.

---

## 📂 Estructura del Proyecto

Arquitectura modular con separación de responsabilidades (modelo de dominio, estado, persistencia, API e interfaz):

```text
My-setlist/
├── index.html              # Interfaz de usuario y maquetación principal
├── CSS/
│   └── styles.css          # Estilos globales, diseño responsive y temas
├── JS/
│   ├── app.js               # Punto de entrada, inicialización y manejadores de eventos
│   ├── state.js             # Estado global en memoria (playlists, loading, errores, orden, filtros)
│   ├── storage.js           # Capa de persistencia en LocalStorage, CRUD de playlists y canciones
│   ├── api.js                # Cliente HTTP para la API de iTunes
│   ├── ui.js                 # Renderizado del DOM: tarjetas, modales, toasts, estadísticas
│   └── models/
│       └── Cancion.js        # Clase de modelo (entidad Canción + formateador de duración)
├── HISTORIAS.md              # Las 13 historias de usuario con criterios de aceptación
├── SPRINTS.md                 # Planificación y dependencias entre historias
├── PROMPTS.md                  # Trazabilidad de prompts utilizados durante el desarrollo con IA
└── README.md                    # Este documento
```

---

## 🧱 Arquitectura

El flujo de datos sigue un patrón simple de estado centralizado + renderizado explícito:

1. **`state.js`** mantiene el estado en memoria (qué playlist está activa, resultados de búsqueda, filtros y orden por playlist).
2. **`storage.js`** es la única capa que lee y escribe en `localStorage`, y se encarga de rehidratar los datos guardados como instancias reales de `Cancion`.
3. **`api.js`** aísla la comunicación con la API externa (iTunes) del resto de la app.
4. **`ui.js`** contiene únicamente funciones de renderizado — no maneja lógica de negocio ni persistencia.
5. **`app.js`** orquesta todo: conecta eventos del usuario con la lógica de `storage.js` y dispara el re-renderizado vía `renderApp()`.

---

## 🚀 Cómo ejecutar el proyecto

Este proyecto no requiere instalación de dependencias ni proceso de build. Solo necesitas servir los archivos estáticos.

### Con la extensión Live Server (VS Code) — recomendado

1. Clona el repositorio:
   ```bash
   git clone https://github.com/emore462-eng/My-setlist.git
   cd My-setlist
   ```
2. Abre la carpeta en VS Code:
   ```bash
   code .
   ```
3. Haz clic derecho sobre `index.html` → **"Open with Live Server"**.
4. Se abrirá automáticamente en `http://127.0.0.1:5500`.

> ⚠️ Como el proyecto usa módulos ES nativos (`<script type="module">`), **no funciona abriendo `index.html` directamente con doble clic** (protocolo `file://`). Es necesario servirlo mediante un servidor local como Live Server.

---

## 🛠️ Tecnologías

- **JavaScript (ES Modules)** — sin frameworks ni librerías.
- **CSS3** — variables custom (`:root`), Flexbox, Grid y diseño responsive.
- **HTML5** semántico.
- **[iTunes Search API](https://performance-partners.apple.com/search-api)** — fuente de datos de canciones.
- **LocalStorage** — persistencia de playlists en el navegador.

---

## 📖 Documentación adicional

- **`HISTORIAS.md`** — las 13 historias de usuario completas, con formato *Como / quiero / para* y criterios de aceptación.
- **`SPRINTS.md`** — planificación de las historias en 2 sprints, con las dependencias técnicas entre ellas.
- **`PROMPTS.md`** — registro de los prompts usados durante el desarrollo asistido por IA.