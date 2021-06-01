class MapaTetris {
  idGlobal = 0;
  bloquesT = [];
  datosOP = [];
  constructor(mapaBacteria) {
    this.cuadros = [];
    this.altoTile = mapaBacteria.mapa.getAltoTile();
    this.anchoTile = mapaBacteria.mapa.getAnchoTile();
    this.mapaBacteria = mapaBacteria;    
    this.configNumerosMapaBacteria(4, 1);
    this.crearDatosOP();
    this.crearBacteriasOP();
    
  }
  crearBacteriasOP(){
    for (let d of this.datosOP) {
      this.bloquesT.push(new BloqueT(this,d));
    }
    for(let bop of this.bloquesT){
      bop.configVecinos();
    }
  }
  crearDatosOP() {
    let objColumna = [];
    let id = 0;
    let bacteria;
    for (let y = 0; y < this.altoTile; y++) {
      for (let x = 0; x < this.anchoTile; x++) {
        bacteria = this.mapaBacteria.getBacteriaMatriz(x, y);
        if (bacteria == null) {
          objColumna[x] = null;
          continue;
        }

        if (objColumna[x] != null && !this.numsEqual(objColumna[x], bacteria)) {
          objColumna[x] = null;
        }
        if (objColumna[x] == null) {
          if (
            objColumna[x - 1] == null ||
            !this.numsEqual(objColumna[x - 1], bacteria)
          ) {
            objColumna[x] = { id, bOrigen: bacteria };
            id++;
            this.datosOP.push(objColumna[x]);
          } else {
            objColumna[x] = objColumna[x - 1];
          }
        }
        objColumna[x].bFinal = bacteria;
        bacteria.idBloqueT = objColumna[x].id;
      }
    }
  }
  numsEqual(objetoColumna, bacteria) {
    return (
      objetoColumna.bOrigen.numeros[0] === bacteria.numeros[0] &&
      objetoColumna.bOrigen.numeros[1] === bacteria.numeros[1]
    );
  }
  numBacterias() {
    return this.bloquesT.length;
  }
  getBloqueT(id) {
    return this.bloquesT[id];
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
        let numeroV = {valor:lista.length,bacterias:[],criaturas:[]};
        let lineaBacteriaV = new LineaBacteria(4);
        for (let b of lista) {
          b.numeros[posNumero] = lista.length;
          numeroV.bacterias.push(b);
          b.numeroV = numeroV;    
          //========================================
          b.lineaBacteriaV = lineaBacteriaV;  
          lineaBacteriaV.addBacteria(b);
        }
        lista.length = 0;
      }
    }
  }

  dibujar(graficos) {
    for (let b of this.bloquesT) {
      b.dibujar(graficos);
    }
  }
 
}
