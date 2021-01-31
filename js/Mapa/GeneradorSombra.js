class GeneradorSombra {
  registroMovOrigen;
  rayosValidos;
  rayos;
  constructor(registroMovOrigen) {
    this.registroMovOrigen = registroMovOrigen;
    this.rayos = [];
    this.rayosValidos = [];
    this.poligono = new Poligono();
  }

  crearRayosEsquina(puntosEsquina) {
    for (let pEsquina of puntosEsquina) {
      let rayoEsquinaSMB = new RayoEsquinaSMB(this.registroMovOrigen, pEsquina);
      this.rayos.push(rayoEsquinaSMB);
    }
  }
  actualizar() {
     
    this.actualizarRayos();
    this.ordenarRayosValidos();

    this.actualizarPoligono();
  }
  actualizarRayos() {
    this.rayosValidos.length = 0;
    for (let ry of this.rayos) {
      ry.actualizar();
      if (ry.rayoPrincipalAceptado) {
        this.rayosValidos.push(ry);
      }
    }
  }
  ordenarRayosValidos() {
    for (let i = 0; i < this.rayosValidos.length; i++) {
      let posMenor = i;
      for (let j = i + 1; j < this.rayosValidos.length; j++) {
        if (
          this.rayosValidos[posMenor].getAngulo() > this.rayosValidos[j].getAngulo()
        ) {
          posMenor = j;
        }
      }
      let auxiliar = this.rayosValidos[i];
      this.rayosValidos[i] = this.rayosValidos[posMenor];
      this.rayosValidos[posMenor] = auxiliar;
    }
  }
  actualizarPoligono() {
    this.poligono.length = 0;
    for (let ry of this.rayosValidos) {
      this.addPuntoRayo(ry);
    }
  }

  recortarGraficos(graficos) {
      this.poligono.recortarGraficos(graficos);
  }
  dibujarRayos(graficos){
    for(let ry of this.rayosValidos){
      ry.dibujar(graficos);
    }
  }
  addPuntoRayo(ry) {
    let posXrEx, posYrEx;
    if (ry.esRayoExtraAceptado()) {
      let puntaRayoExtra = ry.getRayoExtra().getPuntaRayo();
      posXrEx = puntaRayoExtra.getX();
      posYrEx = puntaRayoExtra.getY();
      if (ry.esRayoExtraHorario) {
        this.poligono.addPoint(posXrEx, posYrEx);
        posXrEx = null;
      }
    }
    this.poligono.addPoint(ry.getPuntoDestino().getX(), ry.getPuntoDestino().getY());
    if (posXrEx != null) this.poligono.addPoint(posXrEx, posYrEx);
  }
}
