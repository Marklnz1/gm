var objetoMostrar = [];
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
  radio = 200;
  colorSombra = "#000b"
  listaLaser = [];
  temporizador = new Temporizador(7);
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
    this.temporizador.actualizar();
    if((JUGADOR.vectMov.x!=0||JUGADOR.vectMov.y!=0)&&this.temporizador.tiempoCumplido()){
      this.listaLaser.push(new Laser(JUGADOR.getX(),JUGADOR.getY()));
      this.temporizador.setTiempoMaximo(random(4,10));
      this.temporizador.reiniciar();
    }
   for(let l of this.listaLaser){
     l.actualizar();
   }
    this.actualizarRegistroMovCamara();
    if (!isMobile()) this.generadorSombra.actualizar();
    this.ordenarObjetosDibujo();
    
  }

  recortarGraficosCirculo(graficos) {
    graficos.beginPath();
    graficos.arc(
      this.registroMovCentral.getX(),
      this.registroMovCentral.getY(),
      this.radio,
      0,
      2 * Math.PI
    );
    graficos.clip();

  }
  rellenarGraficosCirculo(graficos){
      // Radii of the white glow.
    let  innerRadius = 5,
      outerRadius = 100;
      let posX = this.registroMovCentral.getX();
      let posY = this.registroMovCentral.getY();
      // Radius of the entire circle.
    let gradient = graficos.createRadialGradient(
      this.traducirX(posX),
      this.traducirY(posY),
      0,
      this.traducirX(posX),
      this.traducirY(posY),
      this.radio
    );
    gradient.addColorStop(0, "#0002");
    gradient.addColorStop(1, this.colorSombra);
    graficos.beginPath();
    graficos.arc(
      this.traducirX(posX),
      this.traducirY(posY),
      this.radio,
      0,
      2 * Math.PI
    );
    
    graficos.fillStyle = gradient;
    graficos.fill();
  }
  dibujar(graficos) {
    // addBullet(200,200,BULLET_TYPES.red);
    // updateDrawAllBullets(graficos);
    this.dibujarPreImagenFinal();
    graficos.drawImage(this.cvPreImagenFinal, 0, 0);
    this.dibujarCuadroSombra(graficos);
    graficos.save();
    graficos.translate(this.getXdes(), this.getYdes());
    // this.mapa.cruzBacteria.dibujar(graficos);


    // let totalCriaturas = 0;
    // objetoMostrar[1] = JUGADOR.getBacteria().numeroV.criaturas.length; 
    // totalCriaturas+=objetoMostrar[1];
    // for(let b of JUGADOR.getBacteria().numeroV.bacterias){
    //   // b.dibujar(graficos);
    // }

    // let vecinoDerecha = JUGADOR.getBacteria().getVecino(2);
    // if(vecinoDerecha!=null){
    //   objetoMostrar[2] = vecinoDerecha.numeroV.criaturas.length; 
    //   totalCriaturas+=objetoMostrar[2];

    //   for(let b of vecinoDerecha.numeroV.bacterias){
    //     // b.dibujar(graficos);
    //   }
    // }

    // let vecinoIzquierda = JUGADOR.getBacteria().getVecino(6);
    // if(vecinoIzquierda!=null){
    //   objetoMostrar[0] = vecinoIzquierda.numeroV.criaturas.length; 
    //   totalCriaturas+=objetoMostrar[0];

    //   for(let b of vecinoIzquierda.numeroV.bacterias){
    //     // b.dibujar(graficos);
    //   }
    // }
    // JUGADOR.getBacteria().lineaBacteriaV.dibujar(graficos);
    // JUGADOR.getBacteria().lineaBacteriaH.dibujar(graficos);
    // MAPA.gLineaBacteriaV.dibujar(graficos);
    // MAPA.gLineaBacteriaH.dibujar(graficos);

    // console.log(JUGADOR.getBacteria().numeroV.bacterias.length);
    // this.mapa.mapaBacteria.dibujarColoniaBacteria(graficos);
    //  this.mapa.mapaBacteria.mapaTetris.dibujar(graficos);
    if (isMobile()) {
      this.recortarGraficosCirculo(graficos);
      
    } else {
      //this.recortarGraficosCirculo(graficos);
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
    //this.rellenarGraficosCirculo(graficos);
    graficos.restore();
   
    
  }
  repartirCriaturas(numCriaturas){
    numCriaturas/3;
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
    for(let l of this.listaLaser){
      l.dibujar(this.preGraficos);
    }
    this.preGraficos.resetTransform();
  }
  dibujarCuadroSombra(graficos) {
    //graficos.fillStyle = "#0007";
    graficos.fillStyle = this.colorSombra;

    graficos.fillRect(0, 0, canvas.width, canvas.height);
  }
  traducirX(posX){
    return posX+this.getXdes();
  }
  traducirY(posY){
    return posY+this.getYdes();
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


class Laser{
  x;
  y;
  imagen;
  angulo = 0;
  point;
  constructor(x,y){
    this.x = x;
    this.y = y;
    cargarImagen("recursos/laserRojo.png").then((imagen)=>{
      this.imagen = imagen;
    });
    this.point = {x:JUGADOR.vectMov.x,y:JUGADOR.vectMov.y};
    
  }

  actualizar(){
    if(this.fueraDeMapa()) return;
  
    let dx = this.point.x;
    let dy = this.point.y;
  
    let modulo = Math.sqrt(dx*dx+dy*dy);
    let mx = dx*27/modulo;
    let my = dy*27/modulo;
    this.angulo = calcularAnguloPantallaC(0,0,mx,my);
    this.x+=mx;
    this.y+=my;
  }
  fueraDeMapa(){
    return this.x>MAPA.getAncho()||this.y>MAPA.getAlto();
  }
  dibujar(graficos){
    if(this.fueraDeMapa()) return;
    if(this.imagen!=null){
      let ajusteX = this.imagen.width/2;
      let ajusteY = this.imagen.height/2;
      let posX = parseInt(this.x - ajusteX);
      let posY = parseInt(this.y - ajusteY);

      dibujarImagenCentrada(this.imagen,posX+ajusteX,posY+ajusteY,this.angulo,graficos);
      // rotateAndPaintImage(graficos,this.imagen,this.angulo,posX,posY,ajusteX*2,ajusteY*2);
      // graficos.drawImage(this.imagen,posX,posY);
    }
  }
}