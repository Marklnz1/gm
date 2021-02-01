class BuscadorRuta {
  criatura;
  tmpCambiarDir;
  alejarse = false;
  posiblesBacterias = [];
  constructor(criatura) {
    this.criatura = criatura;
    this.tmpCambiarDir = new Temporizador();
  }
  actualizarTemporizadores() {
    this.tmpCambiarDir.actualizar();
  }
  calcularNuevaRuta(bAnterior){
    let bObjetivo = this.criatura.objetivo.getBacteria();
    let bCriatura = this.criatura.getBacteria();
    if(bCriatura.bloqueT===bObjetivo.bloqueT){
      let dir_bacteriaX = Math.sign(bObjetivo.getXmapa()-bCriatura.getXmapa());
      let bacteriaX = bCriatura.getVecino( Direccion.convertPointToInt(dir_bacteriaX,0) );

      let dir_bacteriaY = Math.sign(bObjetivo.getYmapa()-bCriatura.getYmapa());
      let bacteriaY = bCriatura.getVecino( Direccion.convertPointToInt(0,dir_bacteriaY) );

      if(bacteriaX!=null) return bacteriaX;
      
      return bacteriaY;
    }
    let proxPeso = this.criatura.getPeso() + (this.alejarse ? 1 : -1);
    let capaDeObjetivo = this.criatura.getCapaParasitoObjetivo();
    let bqActual = bCriatura.bloqueT;
    for(let i = 0; i < 8; i+=2){
      let bqVecino = bqActual.getVecino(i);
      if(bqVecino==null) continue;
      if(capaDeObjetivo.getPeso(bqVecino)===proxPeso){
        return this.criatura.getBacteria().getVecino(i);
      }
    }
    //========================================================================================
    
  }
  existeUnaProximaRuta() {
    let bCriatura = this.criatura.getBacteria();
    let bObjetivo = this.criatura.objetivo.getBacteria();
    return bCriatura.bloqueT!==bObjetivo.bloqueT||bCriatura!==bObjetivo;

   }
  
  
}
