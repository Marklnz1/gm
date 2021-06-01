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
  lineaBacteriaV;
  lineaBacteriaH;
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
  getLineaBacteria(dirEje){
    if(this.lineaBacteriaH.dirEje === dirEje){
      return this.lineaBacteriaH;
    }else{
      return this.lineaBacteriaV;
    }
  }
  insertarBloqueT(){
    this.bloqueT = this.mapaBacteria.getBloqueT(this.idBloqueT);
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
  getGestorLineaBacteriaActivo(){
    if(this.lineaBacteriaH.dirMov!=null) return this.lineaBacteriaH.gtLineaBacteria;
    if(this.lineaBacteriaV.dirMov!=null) return this.lineaBacteriaV.gtLineaBacteria;
    return null;
  }
  dibujar(graficos) {
    this.colision.dibujar(graficos, this.esEsquina ? "yellow" : "#0F01");
    this.colision.dibujarContorno(graficos);

    graficos.fillStyle = "white";

    // graficos.fillText(this.id, this.getXcentro(), this.getYcentro());
    // if(this.lineaBacteriaV.dirMov!="bidireccional")
    if(this.lineaBacteriaH.gtLineaBacteria!=null){
      graficos.fillText(this.lineaBacteriaH.gtLineaBacteria.dirEje, this.getXcentro(), this.getYcentro());
    }
    if(this.lineaBacteriaV.gtLineaBacteria!=null){
      graficos.fillText(this.lineaBacteriaV.gtLineaBacteria.dirEje, this.getXcentro(), this.getYcentro());
    }

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
