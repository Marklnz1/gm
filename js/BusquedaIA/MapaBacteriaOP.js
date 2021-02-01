var tMapaBacteriaOP;
class MapaBacteriaOp {
  idGlobal = 0;
  bacteriasOP = [];
  datosOP = [];
  constructor(mapa) {
    this.cuadros = [];
    this.altoTile = mapa.getAltoTile();
    this.anchoTile = mapa.getAnchoTile();
    this.mapaBacteria = mapa.getMapaBacteria();    
    this.configNumerosMapaBacteria(4, 1);
    let t0 = performance.now();
    this.crearDatosOP();
    let t1 = performance.now();
    tMapaBacteriaOP = t1 - t0;
    this.crearBacteriasOP();
    
  }
  crearBacteriasOP(){
    for (let d of this.datosOP) {
      this.bacteriasOP.push(new BacteriaOP(this,d));
    }
    for(let bop of this.bacteriasOP){
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
        bacteria.idOP = objColumna[x].id;
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
    return this.bacteriasOP.length;
  }
  getBacteria(id) {
    return this.bacteriasOP[id];
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

  dibujar(graficos) {
    for (let b of this.bacteriasOP) {
      b.dibujar(graficos);
    }
  }
 
}
