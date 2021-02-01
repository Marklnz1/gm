class BacteriaOP {
  id;
  vecinos = [];
  mapaBacteriaOP;
  colision;
  posCentro;
  bOrigen;
  bFinal;
  constructor(mapaBacteriaOP,datos) {
    this.mapaBacteriaOP = mapaBacteriaOP;
    this.id = datos.id;
    this.bOrigen = datos.bOrigen;
    this.bFinal = datos.bFinal;
    this.crearColision();
    let xCentro = this.getX()  + this.colision.getAncho() / 2 - 1;
    let yCentro = this.getY()  + this.colision.getAlto() / 2 - 1;
    this.posCentro = new Point(xCentro,yCentro);
  }
  configVecinos(){
    let bVecina;
    for(let i = 0; i<2;i++){
        bVecina = this.bOrigen.getVecino(i*6);
        if(bVecina!=null)
        this.vecinos[i*6] = this.mapaBacteriaOP.getBacteria(bVecina.idOP);
        
    }
    for(let i = 0; i<2;i++){
        bVecina = this.bFinal.getVecino(2+i*2);
        if(bVecina!=null)
        this.vecinos[2+i*2] = this.mapaBacteriaOP.getBacteria(bVecina.idOP);
    }
   
  }
  crearColision(){
    let posX = this.bOrigen.getXmapa();
    let posY = this.bOrigen.getYmapa();
    let ancho = this.bFinal.getXmapa() - posX + 32;
    let alto = this.bFinal.getYmapa() - posY + 32;
    this.colision = new Rectangulo(posX, posY, ancho, alto);

    let color = "#" + random(10, 99) + random(10, 99) + random(10, 99) + "dd";
    this.colision.color = color;
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
  getVecino(dir) {
    return this.vecinos[dir];
  }
  dibujar(graficos) {
    this.colision.dibujar(graficos, this.colision.color);
    dibujarTexto(""+this.numVecinos(),this.getXcentro(), this.getYcentro(),graficos);
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
