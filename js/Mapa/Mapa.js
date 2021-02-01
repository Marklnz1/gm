var tMatrizObjetos;
class Mapa {
  movXinicial;
  movYinicial;
  registroMovCentral;
  registroMovCamara = new Point();
  hojaSprite;
  imagenMapa;
  camaraMapa;
  gestorCriaturas;
  koro;
  mapaBacteriaOP;
  matrizObjetos;
  constructor(datosTiled) {
    this.ancho = datosTiled.anchoMapa;
    this.alto = datosTiled.altoMapa;
    this.anchoTile = this.ancho/32;
    this.altoTile = this.alto/32;
    this.colisionesTile = datosTiled.colisiones;
    this.matrizObjetos = [];
    let t0 = performance.now();
    this.configMatrizObjetos_Colisiones();
    let t1 = performance.now();
    tMatrizObjetos = t1-t0;
    this.hojaSprite = datosTiled.hojasSprites[0];
    this.imagenMapa = datosTiled.imagenMapa;
    this.tamTile = 32;
    this.lineasSombra = [];
    this.objetosDibujo = datosTiled.objetosDibujo;
    this.objetosDibujo.push(JUGADOR);

    this.puntosEsquina = [];

    this.mapaBacteria = new MapaBacteria(this, 2, 14, 1000000);
    //mapaBacteria.crearPuntosEsquina;
    this.registroMovCentral = JUGADOR.getRegistroMov();
    this.generadorSombra = new GeneradorSombra(this.registroMovCentral);
    this.generadorSombra.crearRayosEsquina(this.puntosEsquina);
    this.camaraMapa = new CamaraMapa(this, this.registroMovCentral);
    this.gestorCriaturas = new GestorCriaturas(this);
    //=========================
    for (let colision of this.colisionesTile) {
      this.lineasSombra.push(...this.crearLineasDeRectangulo(colision));
    }
    JUGADOR.setCapaParasito(this.mapaBacteria.crearCapaParasito(JUGADOR));
    this.koro = new KR_NJ();
    this.koro.setPosMapa(208, 378);
    this.contador = 0;
    this.cuadros = [];
  }
  configMatrizObjetos_Colisiones(){
    let anchoC;
    let altoC;
    let posXini;
    let posYini;
    for(let c of this.colisionesTile){
      posXini = c.getX()/32;
      posYini = c.getY()/32;
      anchoC = c.getAncho()/32;
      altoC = c.getAlto()/32;
      for(let y = 0; y < altoC;y++){
        for(let x = 0; x < anchoC; x++){
          this.matrizObjetos[posXini+x+(posYini+y)*this.anchoTile] = 0;
        }
      }
    }
  }
  configuracionFinal() {
    this.koro.mb.configurarBacteriaDestino();
    this.mapaBacteriaOP = new MapaBacteriaOp(this);
    this.capaParasitoOP = new CapaParasitoOP(this.mapaBacteriaOP,JUGADOR);
  }
  colisionaConCuadros(bacteria) {
    let colision = bacteria.getColision();
    for (let cd of this.cuadros) {
      if (cd.intersecta(colision)) {
        return true;
      }
    }
    return false;
  }
  //==========================================================
  crearLineasDeRectangulo(r) {
    let linea1 = new Linea(
      r.getX(),
      r.getY(),
      r.getX() + r.getAncho(),
      r.getY()
    );
    let linea2 = new Linea(
      r.getX(),
      r.getY(),
      r.getX(),
      r.getY() + r.getAlto()
    );
    let linea3 = new Linea(
      r.getX(),
      r.getY() + r.getAlto(),
      r.getX() + r.getAncho(),
      r.getY() + r.getAlto()
    );
    let linea4 = new Linea(
      r.getX() + r.getAncho(),
      r.getY(),
      r.getX() + r.getAncho(),
      r.getY() + r.getAlto()
    );
    return [linea1, linea2, linea3, linea4];
  }
  colisiona(colision) {
    for (let c of this.colisionesTile) {
      if (c.intersecta(colision)) {
        return true;
      }
    }
    return false;
  }
  colisionaC(posX, posY) {
    for (let c of this.colisionesTile) {
      if (
        posX >= c.getX() &&
        posX < c.getX() + c.getAncho() &&
        posY >= c.getY() &&
        posY < c.getY() + c.getAlto()
      ) {
        return true;
      }
    }
    return false;
  }
  actualizar() {
    JUGADOR.actualizar();
    //this.contador++;
    if (this.contador < 4) {
      this.koro.actualizar();
      this.koro.actualizarImagenActual();
    }
    this.camaraMapa.actualizar();
    JUGADOR.getCapaParasito().primeraVez = true;
    this.capaParasitoOP.primeraVez = true;
  }

  dibujar(graficos) {
    this.camaraMapa.dibujar(graficos);
    /*for(let y = 0; y < this.altoTile; y++){
      for(let x = 0; x < this.anchoTile; x++){
        if(this.matrizObjetos[x+y*this.anchoTile]==null) continue;
        let factor = 6;
        let r = new Rectangulo(100+x*factor,100+y*factor,factor,factor);
        r.dibujar(graficos,"blue");
      }
    }*/
  }
  getAncho() {
    return this.ancho;
  }

  getAlto() {
    return this.alto;
  }
  getAnchoTile() {
    return this.anchoTile;
  }
  getAltoTile() {
    return this.altoTile;
  }
  getGeneradorSombra(){
    return this.generadorSombra;
  }
  getObjetosDibujo(){
    return this.objetosDibujo;
  }
  getPuntosEsquina(){
    return this.puntosEsquina;
  }
  getEnemigos(){
    return this.enemigos;
  }
  getObjetosOrdenables(){
    return this.objetosOrdenables;
  }
  getCriaturas(){
    return this.criaturas;
  }
  getMapaBacteria(){
    return this.mapaBacteria;
  }
  getLineasSombra(){
    return this.lineasSombra;
  }
  getColisionesTile(){
    return this.colisionesTile;
  }
  getMapaBacteriaOP(){
    return this.mapaBacteriaOP;
  }
}
