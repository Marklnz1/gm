class Ente {
  velocidadActual;
  constructor(anchoCuadroColision, altoCuadroColision) {
    this.registroMov = new Point();
    this.direccion = 0;
    this.ultimaDireccion = this.direccion;
    this.colision = new Rectangulo(
      parseInt(anchoCuadroColision / 2) * 2 + 1,
      parseInt(altoCuadroColision / 2) * 2 + 1,
      anchoCuadroColision,
      altoCuadroColision
    );
  }
  getDireccion() {
    return this.direccion;
  }
  getRegistroMov() {
    return this.registroMov;
  }
  getX() {
    return this.registroMov.getX();
  }
  getY() {
    return this.registroMov.getY();
  }
  setReduccionVelocidad(reduccion){
    //FALTA CODIGO
  }
  setVelocidadActual(velocidad) {
    this.velocidadActual = velocidad;
  }
  getVelocidadActual() {
    return this.velocidadActual;
  }
  actualizar() {
    this.actualizarCuadroColision();
  }
  fueraLimiteMapa() {
    return false;
  }
  enColision(colision) {
    return MAPA.colisiona(colision);
  }
  movPosColision(movX, movY) {
    while (movX != 0) {
      let posXunitaria = Math.abs(movX) >= 1 ? Math.sign(movX) : movX;
      this.sumarPosMapa(posXunitaria, 0);
      if (
        this.enColision(this.colision) ||
        this.fueraLimiteMapa(this.colision)
      ) {
        this.sumarPosMapa(-posXunitaria, 0);
        movX = 0;
        break;
      }
      movX = Math.abs(movX) >= 1 ? movX - Math.sign(movX) : 0;
    }

    while (movY != 0) {
      let posYunitaria = Math.abs(movY) >= 1 ? Math.sign(movY) : movY;
      this.sumarPosMapa(0, posYunitaria);
      if (
        this.enColision(this.colision) ||
        this.fueraLimiteMapa(this.colision)
      ) {
        this.sumarPosMapa(0, -posYunitaria);
        movY = 0;
        break;
      }
      movY = Math.abs(movY) >= 1 ? movY - Math.sign(movY) : 0;
    }
  }
  setPosMapa(posX, posY) {
    this.registroMov.setLocation(posX, posY);
    this.actualizarCuadroColision();
  }
  sumarPosMapa(aumentoX, aumentoY) {
    this.setPosMapa(
      this.registroMov.getX() + aumentoX,
      this.registroMov.getY() + aumentoY
    );
  }
  sumarPosMapaX(aumentoX) {
    this.sumarPosMapa(aumentoX, 0);
  }
  sumarPosMapaY(aumentoY) {
    this.sumarPosMapa(0, aumentoY);
  }
  actualizarCuadroColision() {
    this.colision.x =
      parseInt(this.registroMov.getX()) - parseInt(this.colision.getAncho() / 2);
    this.colision.y =
      parseInt(this.registroMov.getY()) - parseInt(this.colision.getAlto() / 2);
  }
  actualizarDireccionChar(direccionChar) {
    this.ultimaDireccion = direccionChar;
    this.direccion = direccionChar;
  }
  actualizarDireccionVect(movX, movY) {
    if (movX == 0 && movY == 0) return;
    let angulo = calcularAnguloPantallaC(0, 0, movX, movY);
    if (angulo > 45 && angulo < 135) {
      this.actualizarDireccionChar(0);
    } else if (angulo > 225 && angulo < 315) {
      this.actualizarDireccionChar(4);
    } else if (angulo >= 315 || angulo <= 45) {
      this.actualizarDireccionChar(2);
    } else if (angulo >= 135 || angulo <= 225) {
      this.actualizarDireccionChar(6);
    }
  }
}
