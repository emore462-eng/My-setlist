## [14-07-2026] — Descomposición del MVP en HUs
**Para qué:** derivar mis historias de usuario.

**Prompt:** 
[CONTEXTO] : ESTOY CONSTRUYENDO MI SETLIST, una aplicación web que permita buscar canciones en un catálogo real (API de iTunes) y organizarlas en playlists personales que sobreviven al recargar la página. La app calcula la duración total de cada playlist y muestra estadísticas de tu música.
Stack: HTML5 semántico + CSS3 (propio o Tailwind Play CDN, a tu criterio) + JavaScript vanilla con módulos ESM (import/export, <script type="module">).
Arquitectura: estado central plano + patrón “cambias el estado → llamas render()”. CRUD inmutable (.filter/.map/spread). Delegación de eventos para las listas. Ids con crypto.randomUUID().
Persistencia: localStorage + JSON.stringify/parse envueltos en try/catch; fechas rehidratadas al cargar.
UX: confirmaciones con modal propio (nada de confirm() nativo); estados vacíos amigables.
API: iTunes Search API (solo lectura, sin key).
Deploy: GitHub Pages. ESM no corre con file:// → usar Live Server.
No se permite: frameworks JS (React, Vue…), librerías de manejo de estado, backend, copiar código de la IA sin registrarlo en PROMPTS.md.
EL MVP tiene estas 10 funcionalidades como mínimio:
1.Buscar canciones por artista o título en la API, mostrando carátula, nombre, artista y duración.
2.Comunicar el estado de la búsqueda: indicador de carga, mensaje de error si la API falla, mensaje amigable si no hay resultados.
3.Crear playlists con nombre propio (ej: “Road trip”, “Ensayo sábado”).
4.Agregar canciones desde los resultados de búsqueda a una playlist.
5.Ver el contenido de una playlist con los datos de cada canción y la fecha en que se agregó.
6.Quitar canciones y eliminar playlists con confirmación previa (modal propio).
7.Ver la duración total de la playlist en formato legible (ej: “1 h 23 min”).
8.Ver estadísticas de la playlist: cantidad de canciones, género más frecuente, artista más repetido.
9.Ordenar las canciones de una playlist (recientes/antiguas, alfabético).
10.Persistir todo en LocalStorage y restaurar al recargar; si los datos están corruptos, la app no se rompe y ofrece “Empezar de cero”.
[TAREA]     Pídele descomponer el MVP en historias de usuario para UNA persona
            desarrollando en 2 sprints de una sesión cada uno.
[FORMATO]   Historia ("Como... quiero... para...") + 3-5 criterios de aceptación.
[RESTRICCIÓN] Los criterios describen RESULTADOS observables en pantalla,
            no implementación. Nada fuera del MVP.
Generame un documento con el resultado
Redactamelo en un lenguaje claro, sencillo y sin tecnicismo, facil de comprender

**Resultado:** 
Ahora tengo un documento con 11 historias, las cuales cumplen con los requerimientos que me pide el proyecto.


## [14-07-2026] — Auditoria de mis Historias

**Para qué:** Comprobar que cumpla con los requerimientos del proyecto.

**Prompt:**
Teniendo en cuenta mis historias de usuario, desarrolla esto por favor: 1.2 Audita cada historia (la IA se equivoca con confianza) Pasa cada HU por esta tabla. Si falla un check, corrígela tú o re-promptea: Check ❌ Falla ✅ Pasa ¿Resultado observable? “La búsqueda usa fetch con async/await” “Al buscar ‘Soda Stereo’ aparecen resultados con carátula y artista” ¿Tamaño razonable? 1 HU = “toda la gestión de playlists” 1 HU = “crear una playlist con nombre” ¿Dentro del MVP? “Compartir en redes”, “login de usuarios” Solo las 10 funcionalidades del enunciado ¿Cobertura completa? Ninguna HU cubre los datos corruptos Cada punto del MVP tiene una HU dueña Re-prompts útiles para corregir (cópialos y adáptalos): El criterio "___" describe implementación. Reescríbelo como algo que un usuario pueda ver o probar en pantalla. La HU "___" es demasiado grande para una fracción de clase. Divídela en dos historias independientes.

**Resultado:**  
Después de revisar las 11 historias de usuario, se observa que el documento presenta una buena calidad para iniciar el desarrollo del MVP.


## [14-07-2026] — Distribucion de mis historias en los Sprints

**Para qué:**  Comprobar que cumpla con los requerimientos del proyecto.

**Prompt:** 
Teneindo en cuenta mis Sprints, por favor audita la propuesta con estas tres preguntas: ¿El Sprint 1 termina en algo demostrable, o es puro setup? ¿Las dependencias son reales? (sin búsqueda no hay canciones que agregar a nada) ¿La IA mandó todo lo difícil al Sprint 2? Si tu reto revienta en la Clase 19, ya no hay margen. ✅ Checkpoint: SPRINTS.md completo: metas por sprint, 4 HUs (±1) por sprint, ≥1 dependencia documentada y tu reto técnico identificado.

**Resultado:**
El documento SPRINTS.md cumple con los criterios del checkpoint. La planificación presenta un incremento funcional al finalizar el Sprint 1, las dependencias están correctamente justificadas y el reto técnico ha sido identificado.

## [16-07-2026] - Prompt de Implementación

**Para qué:** Como dueño del producto tomare yo las decisiones y no la IA

**Prompt:**
CONTEXTO:
⚙️ Contrato Técnico
Stack: HTML5 semántico + CSS3 (propio o Tailwind Play CDN, a tu criterio) + JavaScript vanilla con módulos ESM (import/export, <script type="module">).
Arquitectura: estado central plano + patrón “cambias el estado → llamas render()”. CRUD inmutable (.filter/.map/spread). Delegación de eventos para las listas. Ids con crypto.randomUUID().
Persistencia: localStorage + JSON.stringify/parse envueltos en try/catch; fechas rehidratadas al cargar.
UX: confirmaciones con modal propio (nada de confirm() nativo); estados vacíos amigables.
API: iTunes Search API (solo lectura, sin key).
Deploy: GitHub Pages. ESM no corre con file:// → usar Live Server.
No se permite: frameworks JS (React, Vue…), librerías de manejo de estado, backend, copiar código de la IA sin registrarlo en PROMPTS.md.

Mi Estructura de archivos
mi-setlist/
├── index.html
├── css/styles.css
├── js/
│   ├── app.js             # Punto de entrada, inicialización
│   ├── models/Cancion.js  # Clase que modela una canción
│   ├── state.js           # Estado central (playlists)
│   ├── storage.js         # localStorage (guardar/cargar/limpiar)
│   ├── api.js             # fetch a la API de iTunes
│   └── ui.js              # render + eventos del DOM
├── PROMPTS.md             # Registro de trabajo con la IA
├── README.md              # Documentación del proyecto
└── .gitignore 

Mi proyecto ya tiene: [describe qué hay
en cada archivo js/ o pega el código relevante].

TAREA: Implementemos JUNTOS esta historia:
### Historia 1 — Buscar canciones

**Como** persona que quiere armar una playlist,
**quiero** buscar canciones por artista o por título,
**para** encontrar rápido la música que me interesa guardar.

**Criterios de aceptación:**
- Hay un cuadro de búsqueda donde puedo escribir el nombre de un artista o de una canción.
- Al buscar, veo una lista de resultados con la carátula del álbum, el nombre de la canción, el artista y cuánto dura.
- Puedo hacer varias búsquedas distintas seguidas y los resultados se actualizan cada vez.


MODO: Antes de escribir código, hazme las preguntas estratégicas necesarias
sobre decisiones que me corresponden a mí (experiencia de usuario,
casos borde, estructura de datos). Espera mis respuestas. Después
dame el código en porciones pequeñas, explicando qué hace cada una
y en qué archivo va.

RESTRICCIONES: Respeta el contrato tecnico que te compartí. No reescribas archivos que no
te pedí. Si el contrato te impide algo, dímelo en vez de saltártelo. No supongas nada.

TAMBIEN TUVE EN CUENTA LO SIGUIENTE EN MI PROMPT:
Guía de dónde va cada cosa cuando trabajes cada pieza (tu contrato lo exige):

Pieza	Archivo
fetch al endpoint + adaptación del JSON	js/api.js
Modelo de canción (class Cancion)	js/models/Cancion.js
Pintar resultados y estados carga/error/vacío	js/ui.js
Conectar el formulario de búsqueda	js/app.js
Reglas de la API (van también en tus prompts):

Endpoint: https://itunes.apple.com/search?term=PALABRAS&entity=song&limit=10
Buscar con botón (submit), nunca en cada tecla.
Respuesta 403 = te pasaste del límite → espera un minuto.
Campos útiles: trackName, artistName, artworkUrl100, trackTimeMillis, primaryGenreName.
✅ Checkpoint mitad de sprint (~min 90): Sea cual sea tu orden, aquí la búsqueda debe estar viva (es la barra común del grupo): buscas “Soda Stereo” y ves resultados con carátula, nombre y artista; indicador mientras carga, mensaje de error sin WiFi, estado vacío con “zzzzz”. Además, al menos una HU tuya cerrada con commit.


Y así hice sucesivamente con las demas historias 

## [09-08-2026] — Historia 12: Marcar canciones como favoritas

**Para qué:** implementar la Historia 12, una de las 2 HUs propias definidas en la Parte 4 (features de producción sin backend ni librerías).

**Prompt:**
Mi app hace: Mi Setlist es una app de música vanilla JS donde busco canciones
reales con la API de iTunes, las agrego a playlists propias con nombre,
puedo ver el contenido de cada playlist (carátula, artista, fecha agregada),
quitar canciones o eliminar playlists con confirmación propia, ver su
duración total y estadísticas (género/artista más repetido), ordenarlas
por fecha o alfabéticamente, y todo persiste en localStorage —
recuperándose de forma amigable si los datos guardados se dañan.

Propón 5 features pequeñas "de producción" que aporten valor real al
usuario, factibles con mi contrato (sin backend ni librerías). Una línea
cada una.

[La IA propuso 5 features: favoritos, filtro interno, deshacer eliminación,
exportar playlist y modo aleatorio. Elegí Favoritos y Deshacer eliminación,
las redactamos como HU con criterios de aceptación siguiendo el mismo
formato de HISTORIAS.md, y luego pedí implementar ambas: "las 2 historias
que me señalas está bien, implementalas ambas"]

MODO: Antes de escribir código, hazme las preguntas estratégicas necesarias
sobre decisiones que me corresponden a mí (experiencia de usuario,
casos borde, estructura de datos). Espera mis respuestas. Después
dame el código en porciones pequeñas, explicando qué hace cada una
y en qué archivo va.

RESTRICCIONES: Respeta el contrato técnico que te compartí. No reescribas archivos que no
te pedí. Si el contrato te impide algo, dímelo en vez de saltártelo. No supongas nada.

**Resultado:**
Agregué la Historia 12 a `HISTORIAS.md` con sus 4 criterios de aceptación. Para implementarla toqué 5 archivos:
- `models/Cancion.js`: nuevo campo `favorito` (default `false`) en el constructor.
- `storage.js`: `toggleFavorito(playlistId, cancionId)`, inmutable — reconstruye la canción con `new Cancion({...c, favorito: !c.favorito})` (respeta `.map`/spread) y la guarda en `localStorage`, por lo que el favorito persiste al recargar.
- `state.js`: `filtroFavoritosPorPlaylist: {}`, un mapa `{ playlistId: boolean }` para que el filtro de una playlist no afecte a las demás (mismo criterio que el orden de HU9: vive solo en memoria, no se persiste).
- `ui.js`: dentro de `renderPlaylistDetail`, agregué el botón ⭐/☆ por canción y el checkbox "Solo favoritas ⭐" en la barra de herramientas; el filtrado se hace con `.filter((c) => c.favorito)` sobre la lista ya ordenada, con un estado vacío propio ("Todavía no marcaste favoritas") si el filtro no encuentra nada.
- `app.js`: `handleToggleFavorito()` y `handleToggleFiltroFavoritos()`, ambos disparando `renderApp()` para reflejar el cambio al instante.
Probé con Node que el toggle es inmutable, que el filtro funciona, y que las canciones actualizadas siguen siendo instancias de `Cancion` (conservan `duracionFormateada` y demás getters).

---

## [09-08-2026] — Historia 13: Deshacer la última eliminación

**Para qué:** implementar la Historia 13, la segunda de las 2 HUs propias definidas en la Parte 4.

**Prompt:**
[Mismo prompt de la Parte 4 que dio origen a la Historia 12: propuesta de 5 features,
elección de "Favoritos" y "Deshacer eliminación", redacción como HU con criterios,
y pedido de implementar ambas]

MODO: Antes de escribir código, hazme las preguntas estratégicas necesarias
sobre decisiones que me corresponden a mí (experiencia de usuario,
casos borde, estructura de datos). Espera mis respuestas. Después
dame el código en porciones pequeñas, explicando qué hace cada una
y en qué archivo va.

RESTRICCIONES: Respeta el contrato técnico que te compartí. No reescribas archivos que no
te pedí. Si el contrato te impide algo, dímelo en vez de saltártelo. No supongas nada.

**Resultado:**
Agregué la Historia 13 a `HISTORIAS.md` con sus 4 criterios de aceptación. Para implementarla toqué 4 archivos:
- `storage.js`: extendí `removeSongFromPlaylist()` y `deletePlaylist()` (ya existían de HU6) para que además devuelvan el `indice` (posición original) y el objeto completo eliminado. Agregué `insertarCancionEnPlaylist(playlistId, cancion, indice)` y `restaurarPlaylist(playlist, indice)`, que reinsertan el elemento borrado exactamente en su posición original con `.splice()` sobre una copia, sin mutar el arreglo original.
- `ui.js`: `showUndoToast(message, onUndo, durationMs = 5000)`, una variante de `showToast()` con botón "Deshacer" y temporizador. Antes de mostrar un aviso nuevo, cancela el temporizador y elimina cualquier aviso de deshacer pendiente, así solo se puede deshacer la última eliminación.
- `app.js`: modifiqué `handleRemoveSong` y `handleDeletePlaylist` (de HU6) para usar `showUndoToast()` en vez de `showToast()` simple, con un callback que restaura vía `insertarCancionEnPlaylist()` o `restaurarPlaylist()`. Saqué del modal de confirmación la frase "Esta acción no se puede deshacer", porque dejó de ser cierta.
- `CSS/styles.css`: estilos `.toast-undo` y `.btn-undo` para diferenciar este aviso de los toasts normales.
Probé con Node que la canción vuelve exactamente a su posición original al deshacer, y que un segundo aviso de "deshacer" reemplaza y cancela el anterior (no se pueden acumular deshacer de varias eliminaciones).