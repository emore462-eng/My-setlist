/**
 * Modelo de Dominio para una Canción (HU1, HU4, HU5)
 */
export class Cancion {
  constructor({ id, titulo, artista, album, albumCover, duracionMs, fechaAgregado = new Date() }) {
    this.id = id;
    this.titulo = titulo;
    this.artista = artista;
    this.album = album;
    this.albumCover = albumCover;
    this.duracionMs = duracionMs || 0;
    this.fechaAgregado = fechaAgregado instanceof Date ? fechaAgregado : new Date(fechaAgregado);
  }

  /**
   * Formatea la duración en milisegundos a minutos y segundos (mm:ss)
   */
  get duracionFormateada() {
    if (!this.duracionMs) return '0:00';
    const totalSegundos = Math.floor(this.duracionMs / 1000);
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  }
}