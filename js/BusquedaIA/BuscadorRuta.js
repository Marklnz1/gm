class BuscadorRuta {
  criatura;
  tmpCambiarDir;
  alejarse = false;
  posiblesBacterias = [];
  tiemposCambioDir = [20,30,40,50,100,110,120,130,140,100,110,120,130,140];
  contadorBacteria;
  constructor(criatura) {
    this.criatura = criatura;
    this.tmpCambiarDir = new Temporizador();
  }
  actualizarTemporizadores() {
    this.tmpCambiarDir.actualizar();
  }
  calcularNuevaRuta(bAnterior) {
    this.contadorBacteria++;

    for(let e of MAPA.enemigos){
      let dx = Math.abs(e.getX()-this.criatura.getX());
      let dy = Math.abs(e.getY()-this.criatura.getY());
      if(e!=this.criatura&&e.id === this.criatura.id &&e.getDireccion()===this.criatura.getDireccion()&&dx<=1.5&&dy<=1.5){
        this.criatura.setReduccionVelocidad(random(15,25));
        this.contadorBacteria = 0;
        break;
      }
    }
    if(this.contadorBacteria===1){
      this.criatura.reduccionVelocidad = 0;
    }
    if(this.alejarse){
      let bRuta = this.getProxBacteria();
      this.recalcularTiempoCambioDir(bRuta);
      return bRuta;
    }else{
        return this.getBacteriaRutaAcercarse();
    }
    
  }
  getBacteriaRutaAcercarse(){
    let bObjetivo = this.criatura.objetivo.getBacteria();
    let bCriatura = this.criatura.getBacteria();
    let crzObjetivo = MAPA.cruzBacteria;
    let bDireccionada;
    let bRuta;

		let dirMov = crzObjetivo.getDirMovAjuste(bCriatura);
		if(dirMov!==-1){
        bRuta = bCriatura.getVecino(dirMov);
    } 

    if(bRuta==null){
      if(crzObjetivo.esDirAEje(bCriatura,this.criatura.getDireccion())){
        bDireccionada = bCriatura.getVecino(this.criatura.getDireccion());
      }
    }

    if(bRuta==null){
      let numRandom = random(0,1);
      for(let i = 0; i < 8; i+=2){
        if(i!=this.criatura.getDireccion()&&crzObjetivo.esDirAEje(bCriatura,i)){
          bRuta = bCriatura.getVecino(i);
          if(numRandom===1)break;
        }
      }
    }
    if(bRuta==null){
      bRuta = bDireccionada;
    }else if(!this.tmpCambiarDir.tiempoCumplido() && bDireccionada!=null){
      bRuta = bDireccionada;
    }
    if(bRuta==null){
      let proxPeso = this.criatura.getPeso() + (this.alejarse ? 1 : -1);
      let capaDeObjetivo = this.criatura.getCapaParasitoObjetivo();
      let bqActual = bCriatura.bloqueT;
      for (let i = 0; i < 8; i += 2) {
        let bqVecino = bqActual.getVecino(i);
        if (bqVecino == null) continue;
        if (capaDeObjetivo.getPeso(bqVecino) === proxPeso) {
          bRuta = this.criatura.getBacteria().getVecino(i);
          break;
        }
      }
    }
    if(bRuta==null){
      console.log("Error no se encontro una ruta");
      console.log(bCriatura,bObjetivo);
    }
    this.recalcularTiempoCambioDir(bRuta);
    return bRuta;
  }
  recalcularTiempoCambioDir(bSiguiente){
    let vaEnMismaDireccion =
    this.criatura.getBacteria().dirVecinoInt(bSiguiente) === this.criatura.getDireccion();
    if (!vaEnMismaDireccion) {
      this.tmpCambiarDir.reiniciar();
      this.tmpCambiarDir.setTiempoMaximo(this.randomTiempoCambioDir());
    }
  }
  randomTiempoCambioDir(){
    return this.tiemposCambioDir[random(0,this.tiemposCambioDir.length-1)];
  }
  getBacteriaAlineadaV(){
    let estaAlineadoV = false;
    let bCriatura = this.criatura.getBacteria();
    let numV_criatura = bCriatura.numeroV;

    for(let numV_Jugador of JUGADOR.numerosV){
      
      if(numV_Jugador === numV_criatura){
        estaAlineadoV = true;
        break;
      }
    }
     
    
    let bJugador = JUGADOR.getBacteria();
    if(!estaAlineadoV || bJugador.getYtile()===bCriatura.getYtile()) return null;
   
    let bAlineada = null;
    if(bCriatura.getYtile()<bJugador.getYtile()){
      bAlineada = bCriatura.getVecino(4);
    }else{
      bAlineada = bCriatura.getVecino(0);
    }
      return bAlineada;
  }
  getProxBacteria() {
    let bObjetivo = this.criatura.objetivo.getBacteria();
    let bCriatura = this.criatura.getBacteria();
    this.posiblesBacterias.length = 0;
    for (let i = 0; i < 8; i += 2) {
      let bVecina = bCriatura.getVecino(i);
      if (bVecina == null) continue;
      //obtenemos las bacterias que nos acercan al jugador o nos alejan, dependiendo
      let esBacteriaLejana = this.estaMasLejos(bObjetivo, bCriatura, bVecina);
      if (
        (this.alejarse && esBacteriaLejana) ||
        (!this.alejarse && !esBacteriaLejana)
      ) {
        this.posiblesBacterias.push(bVecina);
      }
    }
    //==============
    if (this.posiblesBacterias.length === 1) return this.posiblesBacterias[0];
    let bDireccionada = this.calcularBacteriaDireccionada();
    let cambiarDireccion =
      this.tmpCambiarDir.tiempoCumplido() || bObjetivo === bCriatura;
      // cambiarDireccion = false;

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
      if (drcPosibleBacteria === this.criatura.getDireccion()) {
        return b;
      }
    }
  }
  existeUnaProximaRuta() {
    let bCriatura = this.criatura.getBacteria();
    let bObjetivo = this.criatura.objetivo.getBacteria();
    if (this.alejarse) {
      for (let i = 0; i < 8; i += 2) {
        let bVecina = bCriatura.getVecino(i);
        if (bVecina == null) continue;
        if (this.estaMasLejos(bObjetivo, bCriatura, bVecina)) {
          return true;
        }
      }
      return false;
    }
    return bCriatura.bloqueT !== bObjetivo.bloqueT || bCriatura !== bObjetivo;
  }

  estaMasLejos(bObjetivo, bActual, bDestino) {
    let semiModuloActual =
      (bActual.getXtile() - bObjetivo.getXtile()) ** 2 +
      (bActual.getYtile() - bObjetivo.getYtile()) ** 2;
    let semiModuloDestino =
      (bDestino.getXtile() - bObjetivo.getXtile()) ** 2 +
      (bDestino.getYtile() - bObjetivo.getYtile()) ** 2;
    return semiModuloDestino > semiModuloActual;
  }
}
