class HojaSprites {
  anchoHojaEnPixeles;
  altoHojaEnPixeles;

  anchoHojaEnSprites;
  altoHojaEnSprites;

  anchoSprite;
  altoSprite;

  sprites;
  hojaLista = false;
  imagenHoja;
  esperandoSprites = false;
  numSpritesListos = 0;

  constructor(ruta, anchoSprite, altoSprite, funcionReporteItem) {
    this.imagenHoja = new Image();
    this.imagenHoja.src = ruta;
    this.anchoSprite = anchoSprite;
    this.altoSprite = altoSprite;
    this.sprites = [];
    this.funcionReporteItem = funcionReporteItem;
    this.imagenHoja.onload = () => {
      this.configHojaSprite();
    };
  }

  configHojaSprite() {
    this.anchoHojaEnPixeles = this.imagenHoja.width;
    this.altoHojaEnPixeles = this.imagenHoja.height;

    this.anchoHojaEnSprites = this.anchoHojaEnPixeles / this.anchoSprite;
    this.altoHojaEnSprites = this.altoHojaEnPixeles / this.altoSprite;
    let numSprites = this.anchoHojaEnSprites * this.altoHojaEnSprites;
    this.cargadorListaSprites = new CargadorLista(
      numSprites,
      this.funcionReporteItem
    );

    this.rellenarSpriteDeImagen(this.imagenHoja);
    this.hojaLista = true;
  }
  rellenarSpriteDeImagen(imagen) {
    let canvas = document.createElement("canvas");
    canvas.width = imagen.width;
    canvas.height = imagen.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(imagen, 0, 0);

    for (let y = 0; y < this.altoHojaEnSprites; y++) {
      for (let x = 0; x < this.anchoHojaEnSprites; x++) {
        let posX = x * this.anchoSprite;
        let posY = y * this.altoSprite;
        let subImagenData = ctx.getImageData(
          posX,
          posY,
          this.anchoSprite,
          this.altoSprite
        );
        let imagenNueva = imageData_to_image(subImagenData);
        imagenNueva.onload = this.cargadorListaSprites.funcionReportarItem;

        let spriteCreado = new Sprite(imagenNueva, posX, posY);
        this.sprites[y * this.anchoHojaEnSprites + x] = spriteCreado;
      }
    }
  }

  getSprites() {
    return this.sprites;
  }
  getSprite(indice) {
    return this.sprites[indice];
  }
  /*
	getSprite(final int x, final int y) {
		return sprites[y*anchoHojaEnSprites+x];
	}*/
}
