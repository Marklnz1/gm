class DatosTiled {
  anchoMapa;
  altoMapa;
  colisiones;
  hojasSprites;
  numSeccionesCargadas = 0;
  capasSprites;
  imagenMapa;
  datosListos;
  objetosDibujo;
  constructor(objetoTiled,funcionSalida) {
    this.objetoTiled = objetoTiled;
    this.anchoMapa = objetoTiled.width * 32;
    this.altoMapa = objetoTiled.height * 32;
    this.colisiones = [];
    this.capasSprites = [];
    this.hojasSprites = [];
    this.objetosDibujo = [];
    this.datosListos = false;
    this.reportarSeccionCargada = () => {
      this.numSeccionesCargadas++;
      if (this.numSeccionesCargadas == 2) { //Cuando las capas y hojas de sprites estan cargadas
        this.cargarImagenMapa();
      } else if (this.numSeccionesCargadas == 3) {//imagenMapa Cargada
        this.cargarObjetosDibujo();
        cargarAnimaciones();
        funcionSalida();
      }
    };
    this.cargarHojasSprites();
    this.cargarCapas();
  }
  
  cargarHojasSprites() {
    let tileSets = this.objetoTiled.tilesets;
    let ruta = "recursos/" + tileSets[0].image;
    let anchoSprite = this.objetoTiled.tilewidth;
    let altoSprite = this.objetoTiled.tileheight;
    agregarHojaSprites("mapa",ruta,anchoSprite,altoSprite);
    agregarHojasSprites();
    cargarHojasSprites(this.reportarSeccionCargada);
  }
  cargarCapas() {
    for (let capa of this.objetoTiled.layers) {
      if (capa.name === "Colisiones") {
        this.cargarColisiones(capa.objects);
      } else if (capa.type == "tilelayer") {
        this.cargarCapaSprites(capa);
      }
    }
    this.reportarSeccionCargada();
  }
  cargarImagenMapa() {
    let cvImagenMapa = document.createElement("canvas");
    cvImagenMapa.width = this.anchoMapa;
    cvImagenMapa.height = this.altoMapa;
    let grafico = cvImagenMapa.getContext("2d");
    for (let capaActual of this.capasSprites) {
      if (!capaActual.esDibujoPlano()) continue;
      this.dibujarImagenCapa(capaActual, grafico);
    }
    this.imagenMapa = imageData_to_image(grafico.getImageData(0,0,this.anchoMapa,this.altoMapa));
    this.imagenMapa.onload = this.reportarSeccionCargada;

  }
  cargarObjetosDibujo() {
    for (let cs of this.capasSprites) {
      if (cs.esDibujoPlano()) continue;

      for (let capa of this.objetoTiled.layers) {

        if (capa.type !== "objectgroup" || capa.name !== cs.getNombre()) continue;

        for (let r of capa.objects) {
          let ancho = parseInt(parseFloat(r.width));
          let alto = parseInt(parseFloat(r.height));
          let x = parseInt(parseFloat(r.x));
          let y = parseInt(parseFloat(r.y));
          let xTile = parseInt(x / 32);
          let yTile = parseInt(y / 32);
          let anchoTile = parseInt((x + ancho) / 32) - parseInt(x / 32) + 1;
          let altoTile = parseInt((y + alto) / 32) - parseInt(y / 32) + 1;
          let rectanguloTile = new Rectangulo(
            xTile,
            yTile,
            anchoTile,
            altoTile
          );
          let objetoDibujoCreado = new ObjetoDibujo(rectanguloTile, this, cs);
          this.objetosDibujo.push(objetoDibujoCreado);
        }
      }
    }
    this.reportarSeccionCargada();
  }
  //====================================================================================
  cargarColisiones(colisionesTiled) {
    for (let r of colisionesTiled) {
      let colision = new Rectangulo(r.x, r.y, r.width, r.height);
      this.colisiones.push(colision);
    }
  }
  cargarCapaSprites(capaTiled) {
    let nombre = capaTiled.name;
    let esDibujoPlano = capaTiled.properties[0].value == "dibujoPlano";
    let listaIdTiled = capaTiled.data;
    let listaIdSprites = [];

    for (let idTiled of listaIdTiled) {
      listaIdSprites.push(parseInt(idTiled - 1));
    }
    let capaSprites = new CapaSprites(listaIdSprites, esDibujoPlano, nombre);
    this.capasSprites.push(capaSprites);
  }
  

  dibujarImagenCapa(capaActual, grafico) {
    let listaId = capaActual.getIDSprites();
    let hojaSpritesMapa = getHojaSprites("mapa");
    for (let y = 0; y < this.altoMapa / 32; y++) {
      for (let x = 0; x < this.anchoMapa / 32; x++) {
        let idSpriteActual = listaId[x + (y * this.anchoMapa) / 32];

        if (idSpriteActual != -1) {
          let puntoX = x * 32;
          let puntoY = y * 32;
          grafico.drawImage(
            hojaSpritesMapa.getSprite(idSpriteActual).getImagen(),
            puntoX,
            puntoY
          );
        }
      }
    }
  }
}
