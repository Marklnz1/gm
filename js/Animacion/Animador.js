class Animador {
  tiempoEspera;
  anEste;
  anOeste;
  anNorte;
  anSur;
  nombre;
  unaVez;
  direccionAnterior;
  constructor(hoja, tiempoEspera, unaVez = false) {

    this.tiempoEspera = tiempoEspera;
    this.anEste = new GestorFotogramas(hoja, tiempoEspera, unaVez);
    this.anOeste = new GestorFotogramas(hoja, tiempoEspera, unaVez);
    this.anNorte = new GestorFotogramas(hoja, tiempoEspera, unaVez);
    this.anSur = new GestorFotogramas(hoja, tiempoEspera, unaVez);
    this.unaVez = unaVez;

  }

  setNombre(nombre) {
    this.nombre = nombre;
  }
  getNombre() {
    return nombre;
  }

  setAnimacion(direccion, ubicacionSprites) {
    if (direccion == 2) {
       
        this.anEste.setSecuenciaFotogramas(ubicacionSprites);
    } else if (direccion == 6) {
        this.anOeste.setSecuenciaFotogramas(ubicacionSprites);
    } else if (direccion == 0) {
        this.anNorte.setSecuenciaFotogramas(ubicacionSprites);
    } else if (direccion == 4) {
        this.anSur.setSecuenciaFotogramas(ubicacionSprites);
    }
  }

  setTiempoEspera(tiempoEspera, direccion) {
    if (direccion == 2) {
      
        this.anEste.setTiempoEspera(tiempoEspera);
    } else if (direccion == 6) {
        this.anOeste.setTiempoEspera(tiempoEspera);
    } else if (direccion == 0) {
        this.anNorte.setTiempoEspera(tiempoEspera);
    } else if (direccion == 4) {
        this.anSur.setTiempoEspera(tiempoEspera);
    }
  }
  getImagen(direccion) {
    let imagen = null;
    if (direccion != this.direccionAnterior) {
      this.reiniciarAnimacion();
    }
    if (direccion == 2) {
      imagen = this.anEste.getImagen();
    } else if (direccion == 6) {
      imagen = this.anOeste.getImagen();
    } else if (direccion == 0) {
      imagen = this.anNorte.getImagen();
    } else if (direccion == 4) {
      imagen = this.anSur.getImagen();
    }
    this.direccionAnterior = direccion;
    return imagen;
  }

  reiniciarAnimacion() {
    this.anEste.reiniciarAnimacion();
    this.anOeste.reiniciarAnimacion();
    this.anNorte.reiniciarAnimacion();
    this.anSur.reiniciarAnimacion();
  }
  getUnaVez() {
    return this.unaVez;
  }
}
