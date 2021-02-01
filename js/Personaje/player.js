class Player extends Ente{
  vectMov = { x: 0, y: 0 };
  imagen = new Image();
  contador =0;
  capaParasito;
  constructor( x, y) {
    super(23,16);
    this.velocidad = 5;
    this.setPosMapa(x,y);
    this.imagen.cargado = false;
    this.imagen.onload = ()=>{
      this.imagen.cargado = true;
    }
    this.getBacteria=()=>MAPA.getMapaBacteria().getBacteriaPosMapa(
      this.registroMov.getX(),
      this.registroMov.getY()
    );
    this.getBloqueT=()=>{
      let bacteria = this.getBacteria();
      return MAPA.mapaBacteria.getBloqueT(bacteria.idBloqueT);
    }
    this.imagen.src = "recursos/jugador.png";
  }

 
  calcularVectorMov() {
    this.vectMov.x = 0;
    this.vectMov.y = 0;
    if (teclaPresionada("w")) {
      this.vectMov.y = -1;
    } else if (teclaPresionada("s")) {
      this.vectMov.y = 1;
    }

    if (teclaPresionada("a")) {
      this.vectMov.x = -1;
    } else if (teclaPresionada("d")) {
      this.vectMov.x = 1;
    }
  }
  actualizar() {
    super.actualizar();
   
    this.contador++;
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
    if(this.vectMov.y!=0&&this.vectMov.x==0){
      this.actualizarDireccionChar(this.ultimaDireccion);
   }else{
      this.actualizarDireccionVect(this.vectMov.x,0);
   }
    this.moverse();    
  }
  moverse() {
    let desX = this.vectMov.x * this.velocidad;
    let desY = this.vectMov.y * this.velocidad;
    if(isNaN(desX)||isNaN(desY)) return;
    super.movPosColision(desX,desY);
  }
  getYorden(){
    return this.registroMov.getY();
  }
  dibujar(graficos) {
    //CUADRO
    this.colision.dibujar(graficos,"#ff00bb");
    let posXimg = this.registroMov.getX()-this.imagen.width/2;
    let posYimg = this.registroMov.getY()-this.imagen.height/2-15;
    graficos.drawImage(getAnimacion("JG_MOV").getImagen(this.direccion), parseInt(posXimg), parseInt(posYimg));

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
