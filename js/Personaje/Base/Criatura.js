class Criatura extends Ente {
  //	protected BufferedImage imagenActual;
  //Crear gestorCriaturas
  ajustePosXimagen = 0;
  ajustePosYimagen = 0;
  solicitudesMov = 0;
  transformaciones = [];
  transActual;
  ultimaTrans;
  cazadores = [];
  objetivo;
  capaParasito;
  temporizadoresDescanso = [];
  direccionBloqueada = false;
  vidaMax = 400;
  vidaActual = 0;
  ataquesRecibidos = [];
  ataquesRemover = [];
  contador = 0;
  temporizador = new Temporizador();
  esDifunto = false;
  ataquesRecibidosTemporal = [];
  ultimaDireccionImagen;
  direccionImagen;
  dirImagenBloqueadas = [];
  animacionBidirencional = false;
  constructor(anchoCuadroColision, altoCuadroColision, id) {
    super(anchoCuadroColision, altoCuadroColision, id);
    this.temporizador.setTiempoMaximo(180);

    this.vidaMax = this.vidaActual = 999;
    this.direccionImagen = this.ultimaDireccionImagen = this.direccion;
    
  }
  bloquearDirImagen(direcciones){
    this.dirImagenBloqueadas = direcciones;
  }
  getBacteria(){
    return MAPA.getMapaBacteria().getBacteriaPosMapa(
    this.registroMov.getX(),
    this.registroMov.getY());
  }
  getPeso() {
    if (this.objetivo == null) this.calcularObjetivo();

    return this.objetivo.getCapaParasito().getPeso(this.getBacteria().bloqueT);
  }
  getCapaParasitoObjetivo(){
    if (this.objetivo == null) this.calcularObjetivo();
    return this.objetivo.getCapaParasito();
  }
  setCapaParasito(capaParasito) {
    this.capaParasito = capaParasito;
  }
  getCapaParasito() {
    return this.capaParasito;
  }
  recibirAtaque(ataque) {
    if (!this.existeAtaque(ataque)) {
      if (!this.transActual.getEstadoActual().getTipo() === "defensa") {
        this.aumentarVida(-ataque.getHurt());
      }

      this.ataquesRecibidos.add(ataque);
    }
  }
  aumentarVida(vida) {
    this.vidaActual += vida;
    if (this.vidaActual <= 0) {
      vidaActual = 0;
      GestorJuego.MAPA.getGestorCriaturas().configurarSemiDifunto(this);
    }
  }
  intentarRemoverAtaquesRecibidos() {
    this.ataquesRecibidosTemporal.push(...this.ataquesRecibidos);

    for (let ac of this.ataquesRecibidos) {
      if (!ac.activo) {
        removeItemFromArr(this.ataquesRecibidosTemporal, ac);
      }
    }
    this.ataquesRecibidos.length = 0;
    this.ataquesRecibidos.push(...this.ataquesRecibidosTemporal);
  }
  existeAtaque(ataque) {
    for (let ac of ataquesRecibidos) {
      if (ac === ataque) {
        return true;
      }
    }
    return false;
  }
  setObjetivo(objetivoNuevo) {
    if (this.objetivo != null) this.objetivo.getCazadores().remove(this);

    objetivoNuevo.getCazadores().add(this);
    this.objetivo = objetivoNuevo;
  }
  estaEmparejado() {
    if (this.objetivo == null) return false;
    if (this.objetivo.getObjetivo() !== this) return false;

    return true;
  }
  calcularObjetivo() {
    this.objetivo = JUGADOR;
  }
  actualizarMov() {}
  actualizar() {
    super.actualizar();
    this.calcularObjetivo();
    this.intentarRemoverAtaquesRecibidos();
    this.temporizador.actualizar();
    this.actualizarTemporizadoresDescansoTrans();
    if (this.transActual.transicionEnProceso()) {
      this.transActual.getTransicion().actualizar();

      return;
    }
    if (this.transActual.estadoMuerteActivo()) {
      transActual.getEstadoMuerte().actualizar();

      return;
    }

    if (!this.transActual.getEstadoActual().estadoBloqueado()) {
      let estadoInstantaneo = this.transActual.getEstadoInstantaneoActivo();
      if (estadoInstantaneo != null) {
        estadoInstantaneo.accion();
      }

      this.calcularTransformacion();
    }
    this.transActual.getEstadoActual().actualizar();
    this.actualizarMov();
    if(this.animacionBidirencional){
      if(this.getVectorDirMov().x===0&&this.getVectorDirMov().y!==0){
        this.direccionImagen = this.ultimaDireccionImagen;
      }else if(this.getVectorDirMov().x!==0){
        this.ultimaDireccionImagen = this.direccionImagen;
        this.direccionImagen = this.getVectorDirMov().x>0?2:6;
      }
    }else{
      this.ultimaDireccionImagen = this.direccionImagen;
        this.direccionImagen = this.direccion;
    }
    
  }
  getVectorDirMov(){
    
  }
  addTransformacion(transformacion) {
    this.transformaciones.push(transformacion);
    if (this.transformaciones.length == 1) {
      this.transActual = transformacion;
      this.transActual.accionInicial();
    }
  }
  actualizarImagenActual() {
    this.transActual.actualizarImagen();
  }

  agregarTemporizadorDescanso(temporizador) {
    let existe = false;
    for (let t of this.temporizadoresDescanso) {
      if (t === temporizador) {
        existe = true;
        break;
      }
    }
    if (!existe && temporizador.estaConfigurado()) {
      this.temporizadoresDescanso.push(temporizador);
    }
  }
  actualizarTemporizadoresDescansoTrans() {
    for (let tp of this.temporizadoresDescanso) {
      if (this.transActual.getEstadoActual().getTemporizadorDescanso() != tp)
        tp.actualizar();
    }
  }
  calcularTransformacion() {
    let transEnlazeActiva = this.transActual.getTransEnlazeActivo();
    if (transEnlazeActiva != null) {
      this.transActual.getTemporizadorDescanso().reiniciar();
      let transNueva = transEnlazeActiva.getTrans();
      transNueva.accionInicial();

      transEnlazeActiva.prepararTransicion();
      transNueva.iniciarTransicion();
      this.transActual.getEstadoActual().accionFinal();
      this.ultimaTrans = this.transActual;
      this.transActual = transNueva;
    }
    this.transActual.actualizarEstadoNormal();
  }

  getTrans(id) {
    for (let tp of this.transformaciones) if (id == tp.getID()) return tp;
    return null;
  }

  getEstadoActual() {
    return this.transActual.getEstadoActual();
  }

  //=========================================================================================

  dibujar(graficos) {
    
    if (this.transActual.getImagenActual() == null) {
      return;
    }
    this.colision.dibujar(graficos,"red");
    // graficos.drawStringMapa("Vida : "+this.vidaActual, registroMov.getX()-30, registroMov.getY()-50+ajustePosYimagen, Color.WHITE);
    let posX = parseInt(
      this.registroMov.getX() -
        this.transActual.getImagenActual().width / 2 +
        this.ajustePosXimagen
    );
    let posY = parseInt(
      this.registroMov.getY() -
        this.transActual.getImagenActual().height / 2 +
        this.ajustePosYimagen
    );
    this.transActual.dibujar(posX, posY, graficos);
    
  }

  setSolicitudesDeMov(direccion, distanciaTile) {}
  solicitudMovCompletada() {}
  getEstado() {
    return this.transActual.getEstadoActual().getNombre();
  }

  setAjustePXimagen(ajusteX) {
    this.ajustePosXimagen = ajusteX;
  }
  setAjustePYimagen(ajusteY) {
    this.ajustePosYimagen = ajusteY;
  }
  getYorden() {
    return parseInt(this.registroMov.getY());
  }
  getBacteria() {
    return MAPA.getMapaBacteria().getBacteriaPosMapa(
      this.registroMov.getX(),
      this.registroMov.getY()
    );
  }
  getObjetivo(){
      return this.objetivo;
  }
}
