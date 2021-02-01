class MecanismoMovimiento {
  bacteriaAnterior;
  bacteriaDestino;
  criatura;
  vectDirMov;
  movX;
  movY;
  recorriendoCamino = false;
  solicitudRecorrer = false;
  caminoBacteria;
  contadorCamino = 0;
  buscadorRuta;
  tmpHuirYa = new Temporizador(60);
  constructor(dependiente) {
    this.criatura = dependiente;
    this.buscadorRuta = new BuscadorRuta(dependiente);
    this.movX = 0;
    this.movY = 0;
    this.vectDirMov = new Point();
  }

  getBacteriaDestino() {
    return this.bacteriaDestino;
  }
  recorrerCaminoBacteria(caminoBacteria) {
    if (caminoBacteria.length > 0 && !this.recorriendoCamino) {
      this.caminoBacteria = caminoBacteria;
      this.solicitudRecorrer = true;
    }
  }
  configurarBacteriaDestino() {
    this.bacteriaDestino = MAPA.getMapaBacteria().getBacteriaPosMapa(
      this.criatura.getX(),
      this.criatura.getY()
    );
    if (this.bacteriaDestino == null) {
      console.log(
        "ERROR : criatura fuera de los limites, no se obtuvo la bacteria Destino"
      );
      return;
    }

    this.calcularVecDirMov();
  }

  actualizar() {
    this.buscadorRuta.actualizarTemporizadores();
    if (!this.posibleMovimiento()) return;
    this.movX += this.vectDirMov.getX() * this.criatura.getVelocidadActual();
    this.movY += this.vectDirMov.getY() * this.criatura.getVelocidadActual();
    do {
      if (this.rutaCompletada()) {
        this.calcularBacteriaDestino();
        this.calcularVecDirMov();
      }

      this.moverse();
      if (!this.posibleMovimiento()) {
        this.movX = 0;
        this.movY = 0;
        break;
      }
      if (this.posXcompleto() != this.posYcompleto()) {
        this.calcularVecDirMov();
      }
      if (this.movX == 0 && this.movY == 0) {
        break;
      }
    } while (this.posibleMovimiento());

    this.criatura.actualizarDireccionVect(
      this.vectDirMov.getX(),
      this.vectDirMov.getY()
    );
  }
  moverse() {
    if (this.movX != 0) {
      let dx = this.getXdestino() - this.criatura.getX();
      let movXfinal = Math.abs(this.movX) > Math.abs(dx) ? dx : this.movX;
      this.criatura.sumarPosMapaX(movXfinal);
      this.movX -= movXfinal;
    }

    if (this.movY != 0) {
      let dy = this.getYdestino() - this.criatura.getY();
      let movYfinal = Math.abs(this.movY) > Math.abs(dy) ? dy : this.movY;
      this.criatura.sumarPosMapaY(movYfinal);
      this.movY -= movYfinal;
    }
  }

  //=========================================================================================================================
  //=========================================================================================================================
  //=========================================================================================================================
  //=========================================================================================================================

  rutaCompletada() {
    return this.posXcompleto() && this.posYcompleto();
  }
  calcularBacteriaDestino() {
    let bacteriaDestinoAux = null;

    if (!this.solicitudRecorrer) {
      bacteriaDestinoAux = this.buscadorRuta.calcularNuevaRuta(
        this.bacteriaAnterior
      );
    } else {
      if (!this.recorriendoCamino) this.recorriendoCamino = true;
      bacteriaDestinoAux = this.caminoBacteria.get(this.contadorCamino++);

      if (this.contadorCamino >= this.caminoBacteria.size()) {
        this.recorriendoCamino = false;
        this.solicitudRecorrer = false;
        this.contadorCamino = 0;
      }
    }

    this.bacteriaAnterior = this.bacteriaDestino;
    this.bacteriaDestino = bacteriaDestinoAux;
  }

  calcularVecDirMov() {
    calcularVectUnitarioP(
      this.vectDirMov,
      this.criatura.getRegistroMov(),
      this.getPosDestino()
    );
    let movSobrante = Math.abs(this.movX) + Math.abs(this.movY);
    this.movX = movSobrante * this.vectDirMov.getX();
    this.movY = movSobrante * this.vectDirMov.getY();
  }

  posibleMovimiento() {
    return (
      !this.rutaCompletada() ||
      this.solicitudRecorrer ||
      this.buscadorRuta.existeUnaProximaRuta()
    );
  }
  posXcompleto() {
    return this.criatura.getX() == this.getXdestino();
  }
  posYcompleto() {
    return this.criatura.getY() == this.getYdestino();
  }
  crearCaminoBacteria(origen, numBacterias, direccion) {
    let caminoBacteria = [];
    let bacteriaEncontrada = origen.getBacteriaVecina(direccion);

    while (bacteriaEncontrada != null && caminoBacteria.length < numBacterias) {
      caminoBacteria.add(bacteriaEncontrada);
      bacteriaEncontrada = bacteriaEncontrada.getBacteriaVecina(direccion);
    }
    return caminoBacteria;
  }

  getXdestino() {
    return this.bacteriaDestino.getXcentro();
  }
  getYdestino() {
    return this.bacteriaDestino.getYcentro();
  }
  getPosDestino() {
    return this.bacteriaDestino.getPosCentro();
  }
}
