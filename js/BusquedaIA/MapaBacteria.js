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
    this.bacteriaCentral = new Bacteria(this, xTile, yTile, this.tamCuadro);
    this.bacteriaCentral.expandirBacteria();

    this.enlazarBacteriasMapa();
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
      if (
        bAnalizada.numVecinos() != 8 &&
        bAnalizada.numVecinosCruz() != 3
      ) {
        bAnalizada.esEsquina = true;
        let puntoEsquina = new PuntoEsquinaRY(bAnalizada);
        this.mapa.puntosEsquina.push(puntoEsquina);
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
    return this.bacteriasTile[yTile * this.mapa.getAnchoTile() + xTile];
  }
  setBacteriaMatriz(xTile, yTile, bacteria) {
    this.bacteriasTile[yTile * this.mapa.getAnchoTile() + xTile] = bacteria;
  }

  getBacteriaPosMapa(posX, posY) {
    return this.getBacteriaMatriz(parseInt(posX / 32), parseInt(posY / 32));
  }

  posibleNacimiento(xTile, yTile) {
    return (
      this.getBacteriaMatriz(xTile, yTile) == null &&
      !this.mapa.colisionaC(xTile * 32, yTile * 32)
    );
  }

  dibujarColoniaBacteria(graficos) {
    for (let bacteriaMapa of this.bacteriasMapa) {
      bacteriaMapa.dibujar(graficos);
    }
  }
}
