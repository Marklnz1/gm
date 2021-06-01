class ConfigMovil {
  vectMovU = { x: 0, y: 0 };
  posUsuarioCanvas = { x: 0, y: 0 };
  constructor() {
    this.cuadroRangoMovimiento = new Rectangulo();
    this.cuadroToque = new Rectangulo(0, 0, 100, 100);
   // this.reportarCambioPantalla();
  }
  getVectMovU() {
    return this.vectMovU;
  }
  dibujar(graficos) {
    
    this.cuadroRangoMovimiento.dibujarContorno(graficos, "purple");
    this.cuadroToque.dibujar(graficos, "#f1a7");
    dibujarTexto(
      "FPS7 : " +
        FPSactuales +
        "  movil : " +
        isMobile() +
        "  tocoPtll : " +
        estaTocandoPantalla +
        " pxm : " +
        this.posUsuarioCanvas.x +
        "  pym : " +
        this.posUsuarioCanvas.y,
      10,
      20,
      graficos
    );
    dibujarTexto(
      "Device ratio : " + window.devicePixelRatio,
      10,
      50,
      graficos
    );
    dibujarTexto(
      "  width : " + screen.width + " height : " + screen.height+" array "+objetoMostrar[0]+" , "+objetoMostrar[1]+" , "+objetoMostrar[2],
      10,
      80,
      graficos
    );
    dibujarTexto(
      " wd : " +
        canvas.width +
        " hg : " +
        canvas.height +
        " orientation : " +
        getOrientation(),
      10,
      110,
      graficos
    );
  }
  
  //================================================================================
  reportarCambioPantalla(num) {
   
    let factor = Math.round(window.devicePixelRatio);
    
    let anchoCanvas = (screen.width * window.devicePixelRatio) / factor;
    let altoCanvas = (screen.height * window.devicePixelRatio) / factor;

    canvas.width = anchoCanvas;
    canvas.height = altoCanvas;
    canvas.style.width = `${screen.width}px`;
    canvas.style.height = `${screen.height}px`;
    //=======================================
    this.cuadroRangoMovimiento.setLocation(0, parseInt(canvas.height / 2));
    this.cuadroRangoMovimiento.setSize(canvas.width / 3, canvas.height / 2);
    this.resetearVectorMov();
    //=======================================
    MAPA.camaraMapa.cvPreImagenFinal.width = canvas.width;
    MAPA.camaraMapa.cvPreImagenFinal.height = canvas.height;
  }
  resetearDatosControladorMov() {
    this.cuadroRangoMovimiento.setLocation(0, parseInt(canvas.height / 2));
    this.cuadroRangoMovimiento.setSize(canvas.width / 3, canvas.height / 2);
    this.resetearVectorMov();
  }
  resetearVectorMov() {
    this.vectMovU.x = 0;
    this.vectMovU.y = 0;
    this.cuadroToque.x =
      this.cuadroRangoMovimiento.getXcentro() - this.cuadroToque.getAncho() / 2;
    this.cuadroToque.y =
      this.cuadroRangoMovimiento.getYcentro() - this.cuadroToque.getAlto() / 2;
  }
  //================================================================================
  reportarToquePantalla(posXusuario, posYusuario) {
    let posUsuCanvas = oMousePosScaleCSS(canvas, posXusuario, posYusuario);
    this.posUsuarioCanvas = posUsuCanvas;
    this.actualizarCuadroToque(posUsuCanvas.x, posUsuCanvas.y);
    this.actualizarVectorMov();
  }
  actualizarCuadroToque(posX, posY) {
    this.cuadroToque.x = posX - this.cuadroToque.getAncho() / 2;
    this.cuadroToque.y = posY - this.cuadroToque.getAlto() / 2;
  }
  actualizarVectorMov() {
    let dx =
      this.cuadroToque.getXcentro() - this.cuadroRangoMovimiento.getXcentro();
    let dy =
      this.cuadroToque.getYcentro() - this.cuadroRangoMovimiento.getYcentro();
    if (dx === 0 && dy === 0) {
      this.resetearVectorMov();
    }
    let modulo = Math.sqrt(dx * dx + dy * dy);
    this.vectMovU.x = dx / modulo;
    this.vectMovU.y = dy / modulo;

  }
  getXmov() {
    return this.vect.x;
  }

  getYmov() {
    return this.vect.y;
  }
}
