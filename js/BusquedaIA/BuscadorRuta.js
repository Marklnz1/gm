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
  calcularNuevaRuta2(bAnterior) {
    let bRuta = null;
    let proxPeso = this.criatura.getPeso() + (this.alejarse ? 1 : -1);
    let bCriatura = this.criatura.getBacteria();
    bRuta = this.getProxBacteria(proxPeso);

    //Si regresamos al mismo lugar recalculamos la bacteria destino si es posible
    let bNoRetorno = this.getBacteriaNoRetorno(bAnterior, bCriatura, bRuta);
    if (bNoRetorno != null) {
      bRuta = bNoRetorno;
    }

    //Configuracion para que no vaya en la misma direccion siempre
    let vaEnMismaDireccion =
      bCriatura.dirVecinoInt(bRuta) === this.criatura.getDireccion();
    if (!vaEnMismaDireccion) {
      this.tmpCambiarDir.reiniciar();
      this.tmpCambiarDir.setTiempoMaximo(generarNumRD(20, 45));
    }
    return bRuta;
  }
 
  getProxBacteria(proxPeso) {

    if (proxPeso < 1) return null;

    this.calcularPosiblesBacteriasRuta(proxPeso);
    //REGRESA SI SOLO EXISTE UNA BACTERIA RUTA
    if (this.posiblesBacterias.length === 1) return this.posiblesBacterias[0];

    let bDireccionada = this.calcularBacteriaDireccionada();

    let cambiarDireccion =
      this.tmpCambiarDir.tiempoCumplido() || this.criatura.getPeso() == 1;

    if (cambiarDireccion || bDireccionada == null) {
      if (bDireccionada != null) {
        removeItemFromArr(this.posiblesBacterias, bDireccionada);
        if (this.posiblesBacterias.length === 1)
          return this.posiblesBacterias[0];
      }
      return this.posiblesBacterias[
        random(0, this.posiblesBacterias.length - 1)
      ];
    }

    return bDireccionada;
  }
  calcularBacteriaDireccionada() {
    //BUSCA LA BACTERIA RUTA QUE MANTENGA LA DIRECCION DE MOVIMIENTO ACTUAL
    for (let b of this.posiblesBacterias) {
      let drcPosibleBacteria = this.criatura.getBacteria().dirVecinoInt(b);
      if (drcPosibleBacteria == this.criatura.getDireccion()) {
        return b;
      }
    }
  }
  calcularPosiblesBacteriasRuta(proxPeso) {
    this.posiblesBacterias.length = 0;
    for (let i = 0; i < 8; i += 2) {
      let bVecina = this.criatura.getBacteria().getVecino(i);
      if (bVecina == null) continue;
      let capaObjetivo = this.criatura.getCapaParasitoObjetivo();
      let pesoVecino = capaObjetivo.getPeso(bVecina);
      if (pesoVecino === proxPeso) this.posiblesBacterias.push(bVecina);
    }
  }
  existeUnaProximaRuta2() {
   /* let bacteriaOPactual = MAPA.mapaBacteriaOP.getBacteria(this.criatura.getBacteria().idOP);
    let proxPeso = MAPA.capaParasitoOP.getPeso(bacteriaOPactual) + (this.alejarse ? 1 : -1);
    return proxPeso!=null&&proxPeso!==0;*/
    let proxPeso = 0;
    let pesoActual = this.criatura.getPeso();
    proxPeso = pesoActual + (this.alejarse ? 1 : -1);
    if (proxPeso == 0) return false;

    let bVecina;
    let capaObjetivo;
    for (let i = 0; i < 8; i += 2) {
      bVecina = this.criatura.getBacteria().getVecino(i);
      if (bVecina == null) continue;
      capaObjetivo = this.criatura.getCapaParasitoObjetivo();
      if (capaObjetivo.getPeso(bVecina) == proxPeso) {
        return true;
      }
    }
    return false;
  }
  getBacteriaNoRetorno(bAnterior, bacteriaActual, bRuta) {
    if (bAnterior == null || bRuta == null || bRuta != bAnterior) return null;
    let bVecina;
    let capaDeObjetivo;
    let pesoAnterior;
    let pesoVecino;
    for (let i = 0; i < 8; i += 2) {
      bVecina = bacteriaActual.getVecino(i);
      if (bVecina == null) continue;
      capaDeObjetivo = this.criatura.getCapaParasitoObjetivo();
      pesoAnterior = capaDeObjetivo.getPeso(bAnterior);
      pesoVecino = capaDeObjetivo.getPeso(bVecina);
      if (bAnterior != bVecina && pesoAnterior == pesoVecino) {
        return bVecina;
      }
    }
    return null;
  }
}
