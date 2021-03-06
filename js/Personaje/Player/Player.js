class Player extends Criatura{
  vectMov = { x: 0, y: 0 };
  capaParasito;
  uDiagonal = 1/Math.sqrt(2);
  numerosV =[];
  constructor( x, y) {
    super(23,16);
    this.setPosMapa(x,y);
    this.addTransformacion(new Transformacion1PY(this));

    this.getBacteria=()=>MAPA.getMapaBacteria().getBacteriaPosMapa(
      this.registroMov.getX(),
      this.registroMov.getY()
    );
    this.setAjustePYimagen(-15);
    this.bloquearDirImagen([0,4]);
    this.animacionBidirencional = true;
  }

 
  calcularVectorMov() {
    this.vectMov.x = 0;
    this.vectMov.y = 0;
    if (teclaPresionada("arrowUp")) {
      this.vectMov.y = -1;
    } else if (teclaPresionada("arrowDown")) {
      this.vectMov.y = 1;
    }

    if (teclaPresionada("arrowLeft")) {
      this.vectMov.x = -1;
    } else if (teclaPresionada("arrowRight")) {
      this.vectMov.x = 1;
    }

    if(this.vectMov.x!=0&&this.vectMov.y!=0){
      this.vectMov.x*=this.uDiagonal;
      this.vectMov.y*=this.uDiagonal;
    }
  }
  getVectorDirMov(){
    return this.vectMov;
  }
  actualizar() {
    super.actualizar();   
    this.vectMov.x =0 ;
    this.vectMov.y = 0;
    if(!isMobile()){
      this.calcularVectorMov();
    }else if(estaTocandoPantalla){      
        this.vectMov.x = GESTOR_MOVIL.vectMovU.x;
        this.vectMov.y = GESTOR_MOVIL.vectMovU.y;
    }
    if(this.vectMov.x==0&&this.vectMov.y==0){
      return;
    }
    this.actualizarDireccionVect(this.vectMov.x,this.vectMov.y);
    this.moverse();  
    this.actualizarNumerosV();
  }
  actualizarNumerosV(){
    let vecino = this.getBacteria().getVecino(6);
    if(vecino!=null){
      this.numerosV[0] = vecino.numeroV;
    }else{
      this.numerosV[0] = null;
    }
    this.numerosV[1] = this.getBacteria().numeroV;

    vecino = this.getBacteria().getVecino(2);
    if(vecino!=null){
      this.numerosV[2] = vecino.numeroV;
    }else{
      this.numerosV[2] = null;
    }

    
  }
  moverse() {
    let desX = this.vectMov.x * this.velocidadActual;
    let desY = this.vectMov.y * this.velocidadActual;
    if(isNaN(desX)||isNaN(desY)) return;
    super.movPosColision(desX,desY);
  }
  getYorden(){
    return this.registroMov.getY();
  }
  getBacteria(){
    return MAPA.getMapaBacteria().getBacteriaPosMapa(this.registroMov.getX(),this.registroMov.getY());
  }
  setCapaParasito(capaParasito){
    this.capaParasito = capaParasito;
  }
  getCapaParasito(){
    return this.capaParasito;
  }
}
