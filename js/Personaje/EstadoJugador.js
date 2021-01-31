class EstadoJugador {
  nombre;
  animadores = new GestorAnimadores();
  animadorActual;
  criatura;
  velocidad = 0;
  cdActivacion;
  tmpDescanso;
  temporizadorGeneral = new Temporizador();
  bloquearEstado = false;
  tipo;
  estadoActivo = false;
  cdPermanencia;
  imagenActual;
  aceptaImpulso = true;

  constructor(
    nombre,
    tipo,
    criatura,
    cdActivacion,
    tiempoDescanso = 0,
    cdPermanencia
  ) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.criatura = criatura;
    this.cdActivacion = cdActivacion;
    this.tmpDescanso = new Temporizador();
    this.tmpDescanso.setTiempoMaximo(tiempoDescanso);
    this.tmpDescanso.setContador(this.tmpDescanso.getTiempoMaximo());
    this.cdPermanencia = cdPermanencia;
  }
  getTemporizadorGeneral() {
    return this.temporizadorGeneral;
  }
  estadoBloqueado() {
    if (this.temporizadorGeneral.estaConfigurado()) {
      if (this.cdPermanencia != null) {
        return (
          !this.temporizadorGeneral.tiempoCumplido() &&
          this.cdPermanencia.cumple()
        );
      } else {
        return !this.temporizadorGeneral.tiempoCumplido();
      }
    } else {
      return this.cdPermanencia != null && this.cdPermanencia.cumple();
    }
  }
  configTemporizador(tiempoMax) {
    this.temporizadorGeneral.setTiempoMaximo(tiempoMax);
  }
  actualizar() {
    this.temporizadorGeneral.actualizar();
  }
  cumpleCondicionActivacion() {
    return this.cdActivacion() && this.tmpDescanso.tiempoCumplido();
  }
  setVelocidad(velocidad) {
    this.velocidad = velocidad;
  }
  addAnimador(animador, nombre) {
    this.animadores.addAnimador(animador, nombre);
    if (this.animadorActual == null) {
      this.animadorActual = animador;
    }
  }
  getAnimador(nombre) {
    return this.animadores.getAnimador(nombre);
  }
  getGestorAnimadores() {
    return this.animadores;
  }
  setAnimadorActual(nombre) {
    this.animadorActual = this.animadores.getAnimador(nombre);
  }
  getNombre() {
    return this.nombre;
  }

  accionInicial() {
    this.criatura.setVelocidadActual(this.velocidad);
    this.criatura.setReduccionVelocidad(0);
    this.tmpDescanso.reiniciar();
    this.temporizadorGeneral.reiniciar();
    this.estadoActivo = true;
  }
  accionFinal() {
    this.estadoActivo = false;
  }
  getAnimadorActual() {
    return this.animadorActual;
  }
  getImagenActual(){
	  return this.imagenActual;
  }
  getTemporizadorDescanso() {
    return this.tmpDescanso;
  }
  actualizarImagen() {
    this.imagenActual = this.animadorActual.getImagen(
      this.criatura.getDireccion()
    );
  }
  dibujar(posX, posY, graficos) {
    graficos.drawImage(this.imagenActual, posX, posY);
  }
}
