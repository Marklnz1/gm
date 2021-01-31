class PuntoEsquinaRY {
  constructor(bEsquina) {
    let aristaEsquinaVacia = this.getAristaEsquinaVaciaValida(bEsquina);

    this.puntoDestino = new Point();
    this.puntoOrigenRayoExtra = new Point();

    let b = bEsquina;
    switch (aristaEsquinaVacia) {
      case 7:
        this.puntoOrigenRayoExtra.setLocation(
          b.getXmapa() + 0.4,
          b.getYmapa() + 0.4
        );
        this.puntoDestino.setLocation(b.getXmapa(), b.getYmapa());
        break;
      case 1:
        this.puntoOrigenRayoExtra.setLocation(
          b.getXmapa() + 32 - 0.4,
          b.getYmapa() + 0.4
        );
        this.puntoDestino.setLocation(b.getXmapa() + 32, b.getYmapa());
        break;
      case 3:
        this.puntoOrigenRayoExtra.setLocation(
          b.getXmapa() + 32 - 0.4,
          b.getYmapa() + 32 - 0.4
        );
        this.puntoDestino.setLocation(b.getXmapa() + 32, b.getYmapa() + 32);
        break;
      case 5:
        this.puntoOrigenRayoExtra.setLocation(
          b.getXmapa() + 0.4,
          b.getYmapa() + 32 - 0.4
        );
        this.puntoDestino.setLocation(b.getXmapa(), b.getYmapa() + 32);

        break;
    }
  }
  getPuntoOrigenRayoExtra(){
    return this.puntoOrigenRayoExtra;
  }
  getPuntoDestino(){
    return this.puntoDestino;
  }
  getAristaEsquinaVaciaValida(bEsquina) {
    //Busqueda de la unica esquinaVacia si existe
    if (
      bEsquina.numVecinosEsquina() == 3 &&
      bEsquina.numVecinosCruz() == 4
    ) {
      for (let i = 1; i < 8; i += 2) {
        if (bEsquina.getVecino(i) == null) {
          return i;
        }
      }
    }

    //EsquinaVacia como punta de esquinas vacias formando una "V"
    for (let i = 1; i < 8; i += 2) {
      let posAntiHr = i - 1;
      let posHr = (i + 1) % 8;
      if (
        bEsquina.getVecino(i) == null &&
        bEsquina.getVecino(posAntiHr) == null &&
        bEsquina.getVecino(posHr) == null
      ) {
        return i;
      }
    }
  }
}
