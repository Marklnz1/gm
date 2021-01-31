class MapaBacteriaOp {
  idGlobal = 0;
  bacteriasOP = [];
  constructor(mapa) {
    this.cuadros = [];
    this.altoTile = mapa.getAltoTile();
    this.anchoTile = mapa.getAnchoTile();
    this.mapaBacteria = mapa.getMapaBacteria();
    this.configNumerosMapaBacteria(2, 0);
    this.configNumerosMapaBacteria(4, 1);
    this.configurarBacteriasOP();
    for(let i = 0; i < this.cuadros.length;i++){
      this.bacteriasOP[i] = new BacteriaOP(this,this.cuadros[i]);
    }
    this.enlazarBacteriasMapa();
    this.insertarIDenMapaBacteria();
  }
  numBacterias(){
    return this.bacteriasOP.length;
  }
  getBacteria(id){
    return this.bacteriasOP[id];
  }
  insertarIDenMapaBacteria(){
    for(let b of this.bacteriasOP){
      this.insertarIDdeBacteriaOp(b);
    }
  }
  insertarIDdeBacteriaOp(bacteriaOP){
    let colision = bacteriaOP.getColision();
    for(let y = 0; y < colision.getAlto()/32;y++){
      for(let x = 0; x < colision.getAncho()/32;x++){
        let bacteria = this.mapaBacteria.getBacteriaMatriz(colision.getX()/32+x,colision.getY()/32+y);
        bacteria.idOP = bacteriaOP.getID();
      }
    }
  }
  enlazarBacteriasMapa() {
    let colision;
    for (let bAnalizada of this.bacteriasOP) {
      for (let i = 0; i < 8; i+=2) {
        let pDir = Direccion.convertIntToPoint(i);
        colision = bAnalizada.getColision();
        let x = colision.getX()+pDir.getX()*32;
        let y = colision.getY()-pDir.getY()*32;
        colision.setLocation(x,y);
        bAnalizada.addVecino(i,this.calcularVecinoColision(colision));
        x = colision.getX()-pDir.getX()*32;
        y = colision.getY()+pDir.getY()*32;
        colision.setLocation(x,y);
      }
    }
  }
  calcularVecinoColision(colision){
    for(let b of this.bacteriasOP){
      if(b.getColision().intersecta(colision)&&b.getColision()!==colision){
        return b;
      }
    }
    return null;
  }
  configNumerosMapaBacteria(drcNumerica, posNumero) {
    const lista = [];
    let bMapa;
    let bProx;
    for (let y = 0; y < this.altoTile; y++) {
      for (let x = 0; x < this.anchoTile; x++) {
        bMapa = this.mapaBacteria.getBacteriaMatriz(x, y);
        if (bMapa == null || bMapa.numeros[posNumero] != null) continue;
        bProx = bMapa;
        while (bProx != null) {
          lista.push(bProx);
          bProx = bProx.getVecino(drcNumerica);
        }
        for (let b of lista) {
          b.numeros[posNumero] = lista.length;
        }
        lista.length = 0;
      }
    }
  }
  configurarBacteriasOP() {
    for (let y = 0; y < this.altoTile; y++) {
      for (let x = 0; x < this.anchoTile; x++) {
        let bMapa = this.mapaBacteria.getBacteriaMatriz(x, y);
        if (bMapa == null || this.colisionaConCuadros(bMapa)) {
          continue;
        }
        this.configurarCuadroBacteria(bMapa);
      }
    }
  }
  enlazarBacteriasOP(){

  }
  configurarCuadroBacteria(bMapa) {
    let ancho = this.calcularTamFilaNumeros(2, bMapa) * 32;
    let alto = this.calcularTamFilaNumeros(4, bMapa) * 32;
    let posX = bMapa.getXmapa();
    let posY = bMapa.getYmapa();
    let colision = new Rectangulo(posX, posY, ancho, alto);
    let color = "#" + random(10, 99) + random(10, 99) + random(10, 99) + "dd";
    colision.color = color;
    this.cuadros.push(colision);
  }
  
  calcularTamFilaNumeros(drcNumerica, bMapa) {
    let n1 = bMapa.numeros[0];
    let n2 = bMapa.numeros[1];
    let distancia = 0;
    let bProx = bMapa;

    while (bProx != null && bProx.numeros[0] === n1 && bProx.numeros[1] == n2) {
      distancia++;
      bProx = bProx.getVecino(drcNumerica);
    }
    return distancia;
  }

  dibujar(graficos) {
    for (let b of this.bacteriasOP) {
      b.dibujar(graficos);
    }
  }
  colisionaConCuadros(bMapa) {
    let colision = bMapa.getColision();
    for (let cd of this.cuadros) {
      if (cd.intersecta(colision)) {
        return true;
      }
    }
    return false;
  }
}
