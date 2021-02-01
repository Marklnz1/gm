class Bacteria {
  id;
  xTile;
  yTile;
  vecinos = [];
  tam;
  mapaBacteria;
  colision;
  esEsquina;
  posCentro;
  numeros = [];
  constructor(mapaBacteria, xTile, yTile, tam) {
    this.mapaBacteria = mapaBacteria;
    this.xTile = xTile;
    this.yTile = yTile;
    this.id = mapaBacteria.idGlobal++;
    this.tam = tam;
    this.colision = new Rectangulo(xTile * 32, yTile * 32, 32, 32);
    let xCentro = xTile * 32 + tam / 2 - 1;
    let yCentro = yTile * 32 + tam / 2 - 1;
    this.posCentro = new Point(xCentro, yCentro);
  }
  dirVecinoInt(bacteria) {
    let bVecina;
    for(let i = 0; i < 8;i++){
      bVecina = this.vecinos[i];
      if(bVecina ==null) continue;
      if(bVecina===bacteria){
        return i;
      }
    }
    return -1;
  }
 
  numVecinos() {
    let contador = 0;

    for (let bVecina of this.vecinos) {
      if (bVecina != null) contador++;
    }
    return contador;
  }
  numVecinosEsquina() {
    let contador = 0;

    for (let i = 1; i < 8; i += 2) {
      if (this.vecinos[i] != null) contador++;
    }
    return contador;
  }
  numVecinosCruz() {
    let contador = 0;

    for (let i = 0; i < 8; i += 2) {
      if (this.vecinos[i] != null) contador++;
    }
    return contador;
  }

  addVecino(dirNumerica, bVecina) {
    this.vecinos[dirNumerica] = bVecina;
  }
  getVecino(drcNumerica) {
    return this.vecinos[drcNumerica];
  }
  dibujar(graficos) {
    this.colision.dibujar(graficos, this.esEsquina ? "yellow" : "green");
    this.colision.dibujarContorno(graficos);

    graficos.fillStyle = "white";

    graficos.fillText(this.id, this.getXcentro(), this.getYcentro());
  }

  getTam() {
    return this.tam;
  }
  getPosCentro() {
    return this.posCentro;
  }
  getXcentro() {
    return this.posCentro.getX();
  }
  getYcentro() {
    return this.posCentro.getY();
  }
  getXmapa() {
    return this.xTile * 32;
  }
  getXtile() {
    return this.xTile;
  }
  getYtile() {
    return this.yTile;
  }
  getYmapa() {
    return this.yTile * 32;
  }

  getID() {
    return this.id;
  }
  getColision() {
    return this.colision;
  }
}
