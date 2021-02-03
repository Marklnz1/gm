class EstadoJugador {
  nombre;
  animadores = new GestorAnimadores();
  animadorActual;
  criatura;
  velocidad = 0;
  cdActivacion;
  tmpDescanso;
  bloqueado = false;
  tipo;
  imagenActual;
  constructor(nombre, tipo, criatura, cdActivacion, tiempoDescanso = 0) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.criatura = criatura;
    this.cdActivacion = cdActivacion;
    this.tmpDescanso = new Temporizador();
    this.tmpDescanso.setTiempoMaximo(tiempoDescanso);
    this.tmpDescanso.setContador(this.tmpDescanso.getTiempoMaximo());
  }
  bloquear(){
    this.bloqueado = true;
  }
  desbloquear(){
    this.bloqueado = false;
  }
  estadoBloqueado() {
    return this.bloqueado;
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
  actualizar(){
    
  }
  accionInicial() {
    this.criatura.setVelocidadActual(this.velocidad);
    this.criatura.setReduccionVelocidad(0);
    this.tmpDescanso.reiniciar();
    this.bloqueado = false;
  }
  accionFinal() {
  }
  getAnimadorActual() {
    return this.animadorActual;
  }
  getImagenActual() {
    return this.imagenActual;
  }
  getTemporizadorDescanso() {
    return this.tmpDescanso;
  }
  actualizarImagen() {
    this.imagenActual = this.animadorActual.getImagen(
      this.criatura.direccionImagen
    );
  }
  dibujar(posX, posY, graficos) {
    graficos.drawImage(this.imagenActual, posX, posY);
  }
}
