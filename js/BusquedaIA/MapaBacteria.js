var tMetodo1, tMetodo2;
class MapaBacteria {
  bacteriaCentral;
  bacteriasMapa;
  idGlobal = 0;
  tamCuadro = 32 * 1;
  mapa;
  limiteBacterias;
  bacteriasTile;
  capasParasito = [];
  constructor(mapa, xTile, yTile, limiteBacterias = 30000) {
    this.bacteriasTile = [];

    this.mapa = mapa;
    this.limiteBacterias = limiteBacterias;
    this.bacteriasMapa = [];
    this.matrizBacterias = [];
    this.crearBacterias();

    let t0 = performance.now();
    this.enlazarBacteriasMapa();
    let t1 = performance.now();
    tMetodo1 = t1-t0;
    t0 = performance.now();
    this.enlazarBacteriasMapa2();
    t1 = performance.now();
    tMetodo2 = t1-t0;
  }
  crearBacterias() {
    let matrizColisiones = this.mapa.matrizColisiones;
    let anchoTile = this.mapa.getAnchoTile();
    let altoTile = this.mapa.getAltoTile();
    let bCreada;
    let lista = [];
    for (let y = 0; y < altoTile; y++) {
      for (let x = 0; x < anchoTile; x++) {
        if (matrizColisiones[x + y * anchoTile] != null) {
          if (lista.length != 0) {
            for (let b of lista) b.numeros[0] = lista.length;
            lista.length = 0;
          }
          
          continue;
        }
        bCreada = this.insertarBacteria(x,y);
        lista.push(bCreada);
      }
    }
  }
  insertarBacteria(x,y){
    let bCreada = new Bacteria(this, x, y, 32);
    this.bacteriasMapa.push(bCreada);
    this.matrizBacterias[x + y * this.mapa.getAnchoTile()] = bCreada;
    return bCreada;
  }
  crearCapaParasito(criatura) {
    let capaParasitoCreada = new CapaParasito(this, criatura);
    this.capasParasito.push(capaParasitoCreada);
    return capaParasitoCreada;
  }
  numBacterias() {
    return this.bacteriasMapa.length;
  }
  getBacterias() {
    return this.bacteriasMapa;
  }
  getBacteria(id) {
    return this.bacteriasMapa[id];
  }
  //=========================================================================================================
  enlazarBacteriasMapa() {
    for (let bAnalizada of this.bacteriasMapa) {
      for (let i = 0; i < 8; i++) {
        let pDir = Direccion.convertIntToPoint(i);
        let xTileB = bAnalizada.getXtile() + pDir.getX();
        let yTileB = bAnalizada.getYtile() - pDir.getY();
        let bVecina = null;
        if ((bVecina = this.getBacteriaMatriz(xTileB, yTileB)) != null) {
          bAnalizada.addVecino(i, bVecina);
        }
      }
      if (bAnalizada.numVecinos() != 8 && bAnalizada.numVecinosCruz() != 3) {
        bAnalizada.esEsquina = true;
        let puntoEsquina = new PuntoEsquinaRY(bAnalizada);
        this.mapa.puntosEsquina.push(puntoEsquina);
      }
    }
  }
  enlazarBacteriasMapa2(){
    let anchoTile = this.mapa.getAnchoTile();
    let altoTile = this.mapa.getAltoTile();
    let lista = [];
    let bAnalizada;
    for (let x = 0; x < altoTile; x++) {
      for (let y = 0; y < anchoTile; y++) {
        bAnalizada = this.getBacteriaMatriz(x,y);
        if(bAnalizada==null) continue;
        bAnalizada.addVecino(0,this.getBacteriaMatriz(x,y-1));
        bAnalizada.addVecino(1,this.getBacteriaMatriz(x+1,y-1));
        bAnalizada.addVecino(2,this.getBacteriaMatriz(x+1,y));
        bAnalizada.addVecino(3,this.getBacteriaMatriz(x+1,y+1));
        bAnalizada.addVecino(4,this.getBacteriaMatriz(x,y+1));
        bAnalizada.addVecino(5,this.getBacteriaMatriz(x-1,y+1));
        bAnalizada.addVecino(6,this.getBacteriaMatriz(x-1,y));
        bAnalizada.addVecino(7,this.getBacteriaMatriz(x-1,y-1));

        if (bAnalizada.numVecinos() != 8 && bAnalizada.numVecinosCruz() != 3) {
          bAnalizada.esEsquina = true;
          let puntoEsquina = new PuntoEsquinaRY(bAnalizada);
          this.mapa.puntosEsquina.push(puntoEsquina);
        }
      }
    }
  }
  dirVacioEsquinaPorPatron(bacteria) {
    /*1 0 0		0 0 0	|N 0 0 --> el lugar que se busca
     *1 B 0		1 B 0   |N B 0
     *1 1 1 	1 1 0	|N N N
     *
     *Donde 0 es vacio
     *		1 es vecino
     *		B es bacteria ingresada
     */
    for (let i = 1; i < 8; i += 2) {
      let posAntiHr = i - 1;
      let posHr = (i + 1) % 8;
      if (
        bacteria.getBacteriaVecina(i) == null &&
        bacteria.getBacteriaVecina(posAntiHr) == null &&
        bacteria.getBacteriaVecina(posHr) == null
      ) {
        return i;
      }
    }

    return -1;
  }
  dirUnicaBacteriaEsquinaVacia(bacteria) {
    let tieneUnaBacteria =
      bacteria.numBacteriasEsquina() == 3 && bacteria.numBacteriasCruz() == 4;

    for (let i = 1; i < 8 && tieneUnaBacteria; i += 2) {
      if (bacteria.getBacteriaVecina(i) == null) {
        return i;
      }
    }

    return -1;
  }

  getBacteriaMatriz(xTile, yTile) {
    return this.matrizBacterias[yTile * this.mapa.getAnchoTile() + xTile];
  }

  getBacteriaPosMapa(posX, posY) {
    return this.getBacteriaMatriz(parseInt(posX / 32), parseInt(posY / 32));
  }

  dibujarColoniaBacteria(graficos) {
    for (let bacteriaMapa of this.bacteriasMapa) {
      bacteriaMapa.dibujar(graficos);
    }
  }
}
