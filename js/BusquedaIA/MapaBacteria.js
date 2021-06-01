class MapaBacteria {
  bacteriaCentral;
  bacteriasMapa;
  idGlobal = 0;
  tamCuadro = 32 * 1;
  mapa;
  limiteBacterias;
  bacteriasTile;
  capasParasito = [];
  mapaTetris;
  constructor(mapa, limiteBacterias = 30000) {
    this.bacteriasTile = [];
    this.mapa = mapa;
    this.limiteBacterias = limiteBacterias;
    this.bacteriasMapa = [];
    this.matrizBacterias = [];
    this.crearBacterias();
    this.enlazarBacteriasMapa();
    this.mapaTetris = new MapaTetris(this);
    for (let b of this.bacteriasMapa) {
      b.insertarBloqueT();
    }
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
          //===========================================
          if (lista.length != 0) {
            let lineaBacteriaH = new LineaBacteria(2);
            for (let b of lista){
              b.numeros[0] = lista.length;
              b.lineaBacteriaH = lineaBacteriaH;
              lineaBacteriaH.addBacteria(b);
            } 
            lista.length = 0;
          }
          //===========================================
          continue;
        }
        bCreada = this.insertarBacteria(x, y);
        lista.push(bCreada);
      }
    }
  }
  insertarBacteria(x, y) {
    let bCreada = new Bacteria(this, x, y, 32);
    this.bacteriasMapa.push(bCreada);
    this.matrizBacterias[x + y * this.mapa.getAnchoTile()] = bCreada;
    return bCreada;
  }
  crearCapaParasito(criatura) {
    let capaParasitoCreada = new CapaParasito(
      criatura,
      this.mapaTetris.bloquesT
    );
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
  getBloqueT(id) {
    return this.mapaTetris.getBloqueT(id);
  }
  //=========================================================================================================
  enlazarBacteriasMapa() {
    let anchoTile = this.mapa.getAnchoTile();
    let altoTile = this.mapa.getAltoTile();
    let lista = [];
    let bAnalizada;
    for (let x = 0; x < altoTile; x++) {
      for (let y = 0; y < anchoTile; y++) {
        bAnalizada = this.getBacteriaMatriz(x, y);
        if (bAnalizada == null) continue;
        bAnalizada.addVecino(0, this.getBacteriaMatriz(x, y - 1));
        bAnalizada.addVecino(1, this.getBacteriaMatriz(x + 1, y - 1));
        bAnalizada.addVecino(2, this.getBacteriaMatriz(x + 1, y));
        bAnalizada.addVecino(3, this.getBacteriaMatriz(x + 1, y + 1));
        bAnalizada.addVecino(4, this.getBacteriaMatriz(x, y + 1));
        bAnalizada.addVecino(5, this.getBacteriaMatriz(x - 1, y + 1));
        bAnalizada.addVecino(6, this.getBacteriaMatriz(x - 1, y));
        bAnalizada.addVecino(7, this.getBacteriaMatriz(x - 1, y - 1));

        if (bAnalizada.numVecinos() != 8 && bAnalizada.numVecinosCruz() != 3) {
          bAnalizada.esEsquina = true;
          let puntoEsquina = new PuntoEsquinaRY(bAnalizada);
          this.mapa.puntosEsquina.push(puntoEsquina);
        }
      }
    }
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
  crearCaminoBacteria(bOrigen, numBacterias, direccion) {
    let caminoBacteria = [];
    let bEncontrada = bOrigen.getVecino(direccion);

    while (bEncontrada != null && caminoBacteria.length < numBacterias) {
      caminoBacteria.push(bEncontrada);
      bEncontrada = bEncontrada.getVecino(direccion);
    }
    return caminoBacteria;
  }
}
