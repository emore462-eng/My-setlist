# Plan de Sprints — Mi Setlist

Distribución de las 11 historias de usuario en 2 sesiones de clase, pensada para que en cada sesión termines con algo que **funciona de principio a fin**, no solo piezas sueltas.

---

## Sprint 1 (Clase 18) — Meta: al terminar, puedo buscar canciones reales, crear una playlist y ver las canciones que le agregué.

- **HU1 — Buscar canciones**: va primero porque sin esto no hay nada que agregar a ninguna playlist. Es la puerta de entrada de todo el proyecto.
- **HU2 — Saber qué está pasando durante la búsqueda**: va justo después porque es un complemento directo de la búsqueda. No tiene sentido construirla por separado; se hace al mismo tiempo que HU1, pero se cuenta como el segundo paso porque primero necesitas que la búsqueda funcione para luego cubrir sus casos (cargando, error, sin resultados).
- **HU3 — Crear una playlist**: va tercero porque es independiente de la búsqueda (no necesita canciones para existir), pero es el requisito para todo lo que sigue: sin una playlist creada, no hay dónde agregar canciones.
- **HU4 — Agregar canciones a una playlist**: va cuarto porque junta las dos piezas anteriores: necesita que ya existan resultados de búsqueda (HU1) y que ya exista al menos una playlist (HU3).
- **HU5 — Ver el contenido de una playlist**: cierra el sprint porque solo tiene sentido una vez que ya hay canciones agregadas (HU4). Es el "premio" visual del sprint: ver tu playlist armada.

---

## Sprint 2 (Clase 19) — Meta: al terminar, mis playlists se pueden administrar, muestran datos útiles, se pueden ordenar, y no se pierden ni se rompen aunque algo salga mal.

- **HU6 — Quitar canciones y eliminar playlists con confirmación**: va primero porque es la continuación natural de poder ver una playlist (HU5): ahora que la puedo ver, también necesito poder corregirla.
- **HU7 — Ver la duración total**: va segundo porque es un cálculo relativamente simple sobre las canciones que ya están en la playlist. Es un buen calentamiento antes de algo más complejo.
- **HU8 — Ver estadísticas de una playlist**: va tercero porque es parecida a HU7 (ambas leen las canciones de la playlist y calculan algo), pero un poco más compleja porque hay que comparar y contar repeticiones (género y artista más frecuente).
- **HU9 — Ordenar las canciones**: va cuarto porque también depende de tener canciones ya cargadas, y es independiente de las estadísticas, así que puede ir después sin problema.
- **HU10 — No perder mis playlists nunca**: va quinto porque, para que la persistencia tenga sentido probarla, ya necesitas tener playlists con canciones, duración, estadísticas y orden — así compruebas que se guarda y recupera *todo*, no solo una parte.
- **HU11 — Recuperarse de datos dañados**: cierra el sprint porque es un caso extremo de HU10: primero necesitas que guardar y recuperar funcione bien en el caso normal, para después poder probar qué pasa cuando los datos guardados están dañados a propósito.

---

## Dependencias detectadas

- Para **HU2** necesito antes **HU1**, porque los mensajes de "cargando", "error" y "sin resultados" solo tienen sentido si ya existe una búsqueda funcionando.
- Para **HU4** necesito antes **HU1** y **HU3**, porque para agregar una canción necesito, por un lado, resultados de búsqueda, y por otro, al menos una playlist donde guardarla.
- Para **HU5** necesito antes **HU4**, porque no puedo mostrar el contenido de una playlist si todavía no hay forma de agregarle canciones.
- Para **HU6** necesito antes **HU5**, porque para quitar una canción primero tengo que poder verla listada.
- Para **HU7** y **HU8** necesito antes **HU5**, porque ambas leen y procesan las canciones que ya están dentro de la playlist.
- Para **HU9** necesito antes **HU5**, por la misma razón: no se puede ordenar una lista que todavía no se puede ver.
- Para **HU10** necesito antes **HU1 a HU9**, porque la idea es guardar y recuperar el estado completo de la app (playlists, canciones, orden, fechas), así que conviene que esas funciones ya existan antes de ponerlas a prueba con la persistencia.
- Para **HU11** necesito antes **HU10**, porque solo puedo simular "datos dañados" si antes ya existen datos guardándose de forma normal.

---

## Mi reto técnico principal

La historia que más me intimida es **HU11 — Recuperarse de datos dañados**, porque a diferencia de las demás, no se trata de construir algo que funcione en el caso normal, sino de anticipar **todo lo que puede salir mal** y asegurarme de que la app no se rompa en ningún punto donde lea esos datos guardados. Es más difícil de probar (tengo que dañar los datos a propósito para ver si mi solución realmente aguanta) y toca varias partes de la app a la vez, no solo una pantalla aislada como las demás historias.

### Luego de la Auditoria con Copilot
“Plan sin cambios — auditoría sin mayores”