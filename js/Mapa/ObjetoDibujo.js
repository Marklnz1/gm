class ObjetoDibujo {
  cvImagen;
  posX;
  posY;
  posYorden;
  constructor(r, datosTile, capaSpriteEnlazada) {
    let idsSpriteCapaEnlazada = capaSpriteEnlazada.getIDSprites();
    this.cvImagen = document.createElement("canvas");
    this.cvImagen.width = r.getAncho() * 32;
    this.cvImagen.height = r.getAlto() * 32;
    let grafico = this.cvImagen.getContext("2d");
    let sprites = getHojaSprites("mapa").getSprites();
    for (let i = 0; i < r.getAlto(); i++) {
      for (let j = 0; j < r.getAncho(); j++) {
        let posX = j * 32;
        let posY = i * 32;
        let idImagen =
          idsSpriteCapaEnlazada[
            (r.getY() + i) * (datosTile.anchoMapa / 32) + r.getX() + j
          ];

        if (idImagen == -1) continue;
        let imagenSprite = sprites[idImagen].getImagen();
        grafico.drawImage(imagenSprite, posX, posY);
      }
    }
    this.posX = r.getX() * 32;
    this.posY = r.getY() * 32;
    this.posYorden = (r.getY() + r.getAlto()) * 32 - 1;
  }

  getYorden() {
    return this.posYorden;
  }
  dibujar(graficos) {
    graficos.drawImage(this.cvImagen, this.posX, this.posY);
  }
}
