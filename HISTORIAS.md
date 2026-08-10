## Historias de Usuario — Mi Setlist

Este documento organiza el MVP de **Mi Setlist** en 11 historias de usuario, pensadas para una sola persona desarrollando en **2 sprints**, cada uno equivalente a **una sesión de trabajo**.

Cada historia sigue el formato: *Como... quiero... para...*, seguido de sus criterios de aceptación. Los criterios describen **lo que la persona ve y puede hacer en pantalla**, no cómo está construido por dentro.

---

## 🟢 Sprint 1 (Sesión 1): Buscar música y armar tu primera playlist

**Meta de la sesión:** al terminar, ya se puede buscar canciones reales, crear una playlist, agregarle canciones y ver su contenido.

### Historia 1 — Buscar canciones

**Como** persona que quiere armar una playlist,
**quiero** buscar canciones por artista o por título,
**para** encontrar rápido la música que me interesa guardar.

**Criterios de aceptación:**
- Hay un cuadro de búsqueda donde puedo escribir el nombre de un artista o de una canción.
- Al buscar, veo una lista de resultados con la carátula del álbum, el nombre de la canción, el artista y cuánto dura.
- Puedo hacer varias búsquedas distintas seguidas y los resultados se actualizan cada vez.

---

### Historia 2 — Saber qué está pasando durante la búsqueda

**Como** persona que está buscando canciones,
**quiero** ver claramente si la búsqueda está en curso, si falló o si no encontró nada,
**para** no quedarme confundido esperando sin saber qué ocurre.

**Criterios de aceptación:**
- Mientras se están buscando canciones, aparece un aviso de "cargando" en pantalla.
- Si la búsqueda no encuentra ninguna canción, aparece un mensaje amigable explicándolo (no una pantalla vacía o rota).
- Si la búsqueda falla (por ejemplo, sin conexión), aparece un mensaje de error entendible, no un error técnico.
- Estos tres mensajes (cargando, sin resultados, error) nunca se muestran al mismo tiempo.

---

### Historia 3 — Crear una playlist

**Como** persona que quiere organizar mi música,
**quiero** crear una playlist con el nombre que yo elija,
**para** tener un espacio propio donde ir guardando canciones (ej. "Road trip", "Ensayo sábado").

**Criterios de aceptación:**
- Hay una opción visible para crear una nueva playlist, pidiéndome un nombre.
- Al confirmar, la nueva playlist aparece en la lista de playlists con el nombre que escribí.
- Si intento crear una playlist sin escribir un nombre, la app me avisa y no la crea vacía de nombre.
- Puedo crear varias playlists distintas y todas quedan visibles.

---

### Historia 4 — Agregar canciones a una playlist

**Como** persona que encontró canciones que me gustan,
**quiero** agregarlas directamente desde los resultados de búsqueda a una de mis playlists,
**para** ir armando mi colección sin pasos extra.

**Criterios de aceptación:**
- Desde cada resultado de búsqueda hay una opción para agregarlo a una playlist.
- Puedo elegir a cuál de mis playlists quiero agregar la canción (si tengo más de una).
- Después de agregarla, tengo alguna confirmación visual de que se agregó correctamente.
- Si intento agregar una canción que ya está en esa playlist, la app me lo indica y no la duplica.

---

### Historia 5 — Ver el contenido de una playlist

**Como** persona con playlists creadas,
**quiero** entrar a una playlist y ver todas sus canciones con sus datos,
**para** revisar qué tengo guardado y cuándo lo agregué.

**Criterios de aceptación:**
- Al abrir una playlist, veo la lista de canciones que contiene, con carátula, nombre y artista.
- Cada canción muestra la fecha en que fue agregada a esa playlist.
- Si la playlist todavía no tiene canciones, veo un mensaje amigable invitándome a buscar y agregar alguna (no una lista vacía sin explicación).

---

## 🔵 Sprint 2 (Sesión 2): Administrar, medir y no perder tu música

**Meta de la sesión:** al terminar, ya se puede quitar/eliminar con confirmación, ver duración y estadísticas, ordenar canciones, y la app sobrevive a recargar la página o a datos dañados.

### Historia 6 — Quitar canciones y eliminar playlists con confirmación

**Como** persona que organiza mis playlists,
**quiero** poder quitar una canción o eliminar una playlist completa, confirmando antes de hacerlo,
**para** corregir errores sin miedo a borrar algo sin querer.

**Criterios de aceptación:**
- Hay una opción para quitar una canción individual de una playlist.
- Hay una opción para eliminar una playlist completa.
- Antes de borrar cualquiera de las dos cosas, aparece una ventana propia de la app preguntando si estoy seguro (no el aviso genérico del navegador).
- Si cancelo esa ventana, nada se elimina y todo sigue igual.
- Si confirmo, la canción o la playlist desaparece de la pantalla al instante.

---

### Historia 7 — Ver la duración total de una playlist

**Como** persona con una playlist armada,
**quiero** ver cuánto dura en total,
**para** saber si me alcanza, por ejemplo, para un viaje o un ensayo.

**Criterios de aceptación:**
- Dentro de cada playlist se muestra su duración total.
- La duración se muestra en un formato fácil de leer, como "1 h 23 min" (no solo segundos o números sueltos).
- Si agrego o quito una canción, este total se actualiza solo, sin que tenga que recargar la página.

---

### Historia 8 — Ver estadísticas de una playlist

**Como** persona curiosa por conocer mis gustos musicales,
**quiero** ver algunos datos sobre mi playlist,
**para** entender mejor qué tipo de música estoy guardando.

**Criterios de aceptación:**
- Dentro de cada playlist veo cuántas canciones tiene en total.
- Veo cuál es el género musical que más se repite en esa playlist.
- Veo cuál es el artista que más aparece en esa playlist.
- Si la playlist está vacía, estos datos no muestran errores ni números raros (como "NaN" o "undefined"), sino algo amigable como "Todavía no hay datos".

---

### Historia 9 — Ordenar las canciones de una playlist

**Como** persona con una playlist grande,
**quiero** ordenar sus canciones de distintas formas,
**para** encontrar lo que busco más fácil o revisarla como prefiera.

**Criterios de aceptación:**
- Puedo ordenar las canciones por fecha en que las agregué: de más reciente a más antigua, y también al revés.
- Puedo ordenar las canciones alfabéticamente por nombre.
- Al elegir un orden, la lista en pantalla cambia inmediatamente para reflejarlo.
- El orden elegido se aplica solo a esa playlist, sin afectar a las demás.

---

### Historia 10 — No perder mis playlists nunca

**Como** persona que invierte tiempo armando mis playlists,
**quiero** que todo quede guardado aunque cierre o recargue la página,
**para** no tener que rehacer mi trabajo cada vez.

**Criterios de aceptación:**
- Si cierro el navegador o recargo la página, al volver mis playlists y canciones siguen ahí, tal como las dejé.
- Las fechas en que agregué cada canción también se mantienen correctas después de recargar.
- Si por alguna razón los datos guardados están dañados o corruptos, la app no se rompe ni muestra una pantalla en blanco.
- En ese caso de datos dañados, la app me ofrece un botón claro para "Empezar de cero".

---

### Historia 11 — Recuperarse de datos dañados

**Como** ppersona que utiliza la aplicación,
**quiero** que la aplicación pueda recuperarse cuando los datos almacenados estén dañados,
**para** seguir utilizando la aplicación sin que deje de funcionar.

**Criterios de aceptación:**
- Si los datos almacenados están dañados, la aplicación no muestra una pantalla en blanco ni deja de funcionar.
- Se informa mediante un mensaje claro que ocurrió un problema con los datos.
- En ese caso, existe un botón visible para "Empezar de cero".
- Al seleccionar la opción "Empezar de cero", la aplicación elimina los datos dañados y queda lista para crear nuevas playlists.

---


## 📌 Notas finales

- Estas 11 historias cubren exactamente las 10 funcionalidades del MVP definido — no se agregó ni se quitó alcance.
- El Sprint 1 deja una app **usable de punta a punta** (buscar → crear playlist → agregar → ver contenido).
- El Sprint 2 la convierte en una app **completa y confiable** (gestión, estadísticas, orden y persistencia a prueba de errores).
- Cualquier código generado con ayuda de IA para implementar estas historias debe registrarse en `PROMPTS.md`, según las reglas del proyecto.

### Trazabilidad de los Sprints

La siguiente matriz muestra cómo se distribuyen las funcionalidades del MVP entre los dos sprints del proyecto. Cada funcionalidad tiene una única historia de usuario responsable, evitando duplicidades y asegurando que todo el alcance del MVP esté cubierto.

| Funcionalidad del MVP                   | Historia de Usuario                                            |  Sprint  | Entregable esperado                                                                                               |
| --------------------------------------- | -------------------------------------------------------------- | :------: | ----------------------------------------------------------------------------------------------------------------- |
| Buscar canciones por artista o título   | HU1 – Buscar canciones                                         | Sprint 1 | El usuario puede realizar búsquedas y visualizar resultados.                                                      |
| Mostrar estados de la búsqueda          | HU2 – Saber qué está pasando durante la búsqueda               | Sprint 1 | La aplicación informa cuando está cargando, cuando no encuentra resultados o cuando ocurre un error.              |
| Crear playlists                         | HU3 – Crear una playlist                                       | Sprint 1 | El usuario puede crear una o varias playlists con un nombre personalizado.                                        |
| Agregar canciones a una playlist        | HU4 – Agregar canciones a una playlist                         | Sprint 1 | El usuario puede incorporar canciones a cualquiera de sus playlists.                                              |
| Visualizar el contenido de una playlist | HU5 – Ver el contenido de una playlist                         | Sprint 1 | El usuario puede consultar todas las canciones almacenadas en una playlist.                                       |
| Eliminar canciones y playlists          | HU6 – Quitar canciones y eliminar playlists con confirmación   | Sprint 2 | El usuario puede eliminar elementos de forma segura mediante una confirmación previa.                             |
| Visualizar la duración total            | HU7 – Ver la duración total de una playlist                    | Sprint 2 | La aplicación calcula y muestra la duración acumulada de cada playlist.                                           |
| Consultar estadísticas                  | HU8 – Ver estadísticas de una playlist                         | Sprint 2 | El usuario visualiza información resumida de su playlist (cantidad de canciones, artista y género predominantes). |
| Ordenar canciones                       | HU9 – Ordenar las canciones de una playlist                    | Sprint 2 | El usuario puede reorganizar la lista utilizando distintos criterios de ordenamiento.                             |
| Persistencia de datos                   | HU10 – Conservar las playlists después de cerrar la aplicación | Sprint 2 | Las playlists permanecen disponibles después de cerrar o recargar la aplicación.                                  |
| Recuperación ante datos corruptos       | HU11 – Recuperarse de datos dañados                            | Sprint 2 | La aplicación detecta datos inválidos y permite reiniciar el almacenamiento de forma segura.                      |



## 🟢 Bosquejo de la interfaz (Wireframe)
Antes de comenzar la implementación, se realizó un boceto de la interfaz principal con el objetivo de definir la ubicación de cada componente y facilitar el diseño de la experiencia del usuario.

## Wireframe en ASCII
+--------------------------------------------------------------------+
|                         🎵 Mi Setlist                              |
+--------------------------------------------------------------------+

 Buscar canción o artista
+--------------------------------------------+ [ Buscar ]
| Soda Stereo                                |
+--------------------------------------------+

Resultados de búsqueda

+---------------------------------------------------------------+
| 🎵 De Música Ligera          Soda Stereo      [ Agregar ]      |
| 🎵 Persiana Americana        Soda Stereo      [ Agregar ]      |
| 🎵 Cuando Pase el Temblor    Soda Stereo      [ Agregar ]      |
+---------------------------------------------------------------+

=================================================================

Mis Playlists

+-----------------------+
| 🎼 Road Trip          |
| 🎼 Ensayo             |
| 🎼 Favoritas          |
+-----------------------+

-----------------------------------------------------------------

Playlist seleccionada: Road Trip

Duración: 1 h 24 min

Canciones

-----------------------------------------------------------------
| 🎵 De Música Ligera      Soda Stereo      04/08/2026           |
| 🎵 Trátame Suavemente    Soda Stereo      04/08/2026           |
| 🎵 En la Ciudad de la Furia  Soda Stereo  04/08/2026           |
-----------------------------------------------------------------

Ordenar por:
[ Fecha ] [ Nombre ]

Estadísticas

• Canciones: 15
• Artista más frecuente: Soda Stereo
• Género predominante: Rock

[ Eliminar Playlist ]

### Análisis del diseño

Después de elaborar el wireframe se identificaron las siguientes decisiones de diseño:

- La **barra de búsqueda** se ubica en la parte superior porque representa la primera acción que realizará el usuario al ingresar a la aplicación.
- Debajo de la búsqueda aparecen los **resultados**, permitiendo agregar canciones directamente a una playlist sin cambiar de pantalla.
- Las **playlists** se muestran en una sección independiente para facilitar la selección y navegación entre ellas.
- La zona principal de la interfaz presenta el contenido de la playlist seleccionada junto con su duración, opciones de ordenamiento y estadísticas.
- Las acciones de eliminación se colocan al final para disminuir el riesgo de borrar información accidentalmente.

El flujo que propone este diseño es el siguiente:

Buscar canciones → Agregar a una playlist → Visualizar el contenido → Administrar la playlist

Este flujo coincide con las historias de usuario definidas para el Sprint 1 y Sprint 2.


## 🔴 Ideas de Funcionalidades Futuras

Aunque el MVP ya cubre todas las funcionalidades solicitadas, se plantean algunas mejoras que podrían incorporarse en versiones posteriores de la aplicación.

Estas ideas servirán como base para futuras historias de usuario.

## Idea 1 – Marcar canciones como favoritas

Permitir que el usuario marque determinadas canciones como favoritas para acceder rápidamente a ellas o generar automáticamente una playlist de favoritos.

### Beneficio

Facilita encontrar la música que el usuario escucha con mayor frecuencia.

## Idea 2 – Filtrar canciones dentro de una playlist

Permitir filtrar las canciones por nombre, artista o género dentro de una playlist.

### Beneficio

Mejora la navegación cuando la playlist contiene una gran cantidad de canciones.

## Idea 3 – Editar el nombre de una playlist

Permitir modificar el nombre de una playlist ya creada sin necesidad de eliminarla y crear una nueva.

### Beneficio

Brinda mayor flexibilidad para organizar las playlists sin perder su contenido.

## Conclusiones

El desarrollo de estos logros adicionales permitió definir una primera propuesta de interfaz, comprender la estructura de los datos que ofrecerá la API y generar posibles mejoras para futuras versiones de la aplicación.

Si bien estas funcionalidades no forman parte del MVP actual, representan una base importante para continuar evolucionando Mi Setlist mediante nuevas historias de usuario y futuras iteraciones del proyecto.

