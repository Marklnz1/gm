class CamaraMapa {
  mapa;
  cvPreImagenFinal;
  preGraficos;
  cvImagenMapa;
  registroMovCamara;
  registroMovCentral;
  generadorSombra;
  objetosDibujo;
  puntosEsquina;
  constructor(mapa, registroMovCentral) {
    this.mapa = mapa;
    this.cvPreImagenFinal = document.createElement("canvas");
    this.cvPreImagenFinal.width = canvas.width;
    this.cvPreImagenFinal.height = canvas.height;
    this.preGraficos = this.cvPreImagenFinal.getContext("2d", { alpha: false });
    this.imagenMapa = mapa.imagenMapa;
    this.registroMovCamara = new Point();
    this.registroMovCentral = registroMovCentral;
    this.generadorSombra = mapa.getGeneradorSombra();
    this.objetosDibujo = mapa.getObjetosDibujo();
    this.puntosEsquina = mapa.getPuntosEsquina();
    //=============================================
    this.rectangulo = new Rectangulo(0,0,10,10);

  }
  actualizar() {
    this.actualizarRegistroMovCamara();
    if (!isMobile()) this.generadorSombra.actualizar();
    this.ordenarObjetosDibujo();
    
  }

  recortarGraficosCirculo(graficos) {
    graficos.beginPath();
    graficos.arc(
      this.registroMovCentral.getX(),
      this.registroMovCentral.getY(),
      400,
      0,
      2 * Math.PI
    );
    graficos.clip();

  }
  dibujar(graficos) {
    this.dibujarPreImagenFinal();
    graficos.drawImage(this.cvPreImagenFinal, 0, 0);
    this.dibujarCuadroSombra(graficos);
    graficos.save();
    graficos.translate(this.getXdes(), this.getYdes());
    if (isMobile()) {
      this.recortarGraficosCirculo(graficos);
      this.generadorSombra.recortarGraficos(graficos);
    } else {
      this.recortarGraficosCirculo(graficos);
       this.generadorSombra.recortarGraficos(graficos);
     }
    //========================================================
    

    //======================================================
    /*let posXmapaC = -this.getXdes;
    let linea = new Linea();
    for (let pev of this.puntosEsquinaValidos) {
      linea.setLineaP(this.registroMovCentral, pev.puntoDestino);
      linea.dibujar(graficos);
    }
    let posYmapaC = -this.getYdes;
    let posX = parseInt(posXmapaC / 32) * 32;
    let posY = parseInt(posYmapaC / 32) * 32;
    let vector = { x: 1, y: 0 };
    let nextPosX;
    let nextPosY;
    let contadorGiros = 0;
    while (contadorGiros < 4) {
      this.cuadroPrueba.setLocation(posX, posY);
      if (this.mapa.colisiona(this.cuadroPrueba)) {
        this.cuadroPrueba.dibujar(graficos, "red");
      } else {
        this.cuadroPrueba.dibujar(graficos, "green");
      }
      nextPosX = posX + vector.x * 32;
      nextPosY = posY + vector.y * 32;

      let condicionX =
        nextPosX < parseInt(posXmapaC / 32) * 32 ||
        nextPosX > -this.getXdes + canvas.width - 1;
      let condicionY =
        nextPosY < parseInt(posYmapaC / 32) * 32 ||
        nextPosY > -this.getYdes + canvas.height - 1;

      if (condicionX) {
        this.girar90grados(vector);
        contadorGiros++;
      } else if (condicionY) {
        this.girar90grados(vector);
        contadorGiros++;
      }
      posX += vector.x * 32;
      posY += vector.y * 32;
    
    }
    */
    //========================================================
    //JUGADOR.capaParasito.dibujarPesos(graficos);
    //this.mapa.mapaBacteria.mapaTetris.dibujar(graficos);
    //========================================================
    //this.rectangulo.setLocation(this.mapa.koro.registroMov.getX(),this.mapa.koro.registroMov.getY());
    //this.rectangulo.dibujar(graficos,"magenta");
    graficos.resetTransform();
    graficos.drawImage(this.cvPreImagenFinal, 0, 0);
    graficos.restore();
  }
  dibujarPreImagenFinal() {
    this.preGraficos.drawImage(
      this.imagenMapa,
      -this.getXdes(),
      -this.getYdes(),
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );

    this.preGraficos.translate(this.getXdes(), this.getYdes());

    for (let od of this.objetosDibujo) {
      od.dibujar(this.preGraficos);
    }
    for (let c of this.mapa.getColisionesTile()) {
      c.dibujarContorno(this.preGraficos, "red");
    }
    this.preGraficos.resetTransform();
  }
  dibujarCuadroSombra(graficos) {
    graficos.fillStyle = "#0007";
    graficos.fillRect(0, 0, canvas.width, canvas.height);
  }

  getXdes() {
    return this.registroMovCamara.getX();
  }
  getYdes() {
    return this.registroMovCamara.getY();
  }
  actualizarRegistroMovCamara() {
    this.movXinicial = canvas.width / 2;
    this.movYinicial = canvas.height / 2;
    let posX = this.movXinicial - this.registroMovCentral.getX();
    let posY = this.movYinicial - this.registroMovCentral.getY();
    if (posX > 0) {
      posX = 0;
    }
    if (posX < canvas.width - this.mapa.getAncho()) {
      posX = canvas.width - this.mapa.getAncho();
    }
    if (posY > 0) {
      posY = 0;
    }
    if (posY < canvas.height - this.mapa.getAlto()) {
      posY = canvas.height - this.mapa.getAlto();
    }
    this.registroMovCamara.setLocation(parseInt(posX), parseInt(posY));
  }
  ordenarObjetosDibujo() {
    for (let i = 0; i < this.objetosDibujo.length; i++) {
      let posMenor = i;
      for (let j = i + 1; j < this.objetosDibujo.length; j++) {
        if (
          this.objetosDibujo[posMenor].getYorden() >
          this.objetosDibujo[j].getYorden()
        ) {
          posMenor = j;
        }
      }
      let auxiliar = this.objetosDibujo[i];
      this.objetosDibujo[i] = this.objetosDibujo[posMenor];
      this.objetosDibujo[posMenor] = auxiliar;
    }
  }
}
