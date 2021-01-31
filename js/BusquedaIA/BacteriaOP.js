class BacteriaOP {
  id;
  vecinos = [];
  mapaBacteriaOP;
  colision;
  posCentro;
  constructor(mapaBacteriaOP,colision) {
    this.mapaBacteriaOP = mapaBacteriaOP;
    this.id = colision.id;
    this.colision = colision;
    let xCentro = this.getX()  + colision.getAncho() / 2 - 1;
    let yCentro = this.getY()  + colision.getAlto() / 2 - 1;
    this.posCentro = new Point(xCentro,yCentro);
  }

  dirVecinoInt(bacteriaOP) {
    let bVecina;
    for(let i = 0; i < 8;i++){
      bVecina = this.vecinos[i];
      if(bVecina ==null) continue;
      if(bVecina===bacteriaOP){
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
  
  addVecino(dir, bVecina) {
    this.vecinos[dir] = bVecina;
  }
  getVecino(dir) {
    return this.vecinos[dir];
  }
  dibujar(graficos) {
    this.colision.dibujar(graficos, this.colision.color);
    dibujarTexto(""+this.id,this.getXcentro(), this.getYcentro(),graficos);
  }

  getAncho() {
    return this.colision.getAncho();
  }
  getAlto(){
      return this.colision.getAlto();
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
  getX() {
    return this.colision.getX();
  }
  getY() {
    return this.colision.getY();
  }
  getID() {
    return this.id;
  }
  getColision() {
    return this.colision;
  }
}
