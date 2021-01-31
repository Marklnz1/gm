class Rectangulo {
  constructor(x=0, y=0, ancho=0, alto=0) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
  }

  dibujar(graficos, color = "red") {
    graficos.fillStyle = color;
    graficos.fillRect(this.x, this.y, this.ancho, this.alto);
  }
  dibujarContorno(graficos, color = "red") {
    graficos.strokeStyle = color;
    graficos.strokeRect(this.x, this.y, this.ancho, this.alto);
  }

  intersecta(r) {
    return !(
      this.x + this.ancho -1< r.x ||
      r.x + r.ancho -1< this.x ||
      this.y + this.alto -1< r.y ||
      r.y + r.alto -1< this.y
    );
  }
  setLocation(x,y){
    this.x = x;
    this.y = y;
  }
  setSize(ancho,alto){
    this.ancho = ancho;
    this.alto = alto;
  }
  getAncho(){
    return this.ancho;
  }
  getAlto(){
    return this.alto;
  }
  getX(){
    return this.x;
  }
  getY(){
    return this.y;
  }
  getXcentro(){
    return this.x+this.ancho/2;
  }
  getYcentro(){
    return this.y+this.alto/2;
  }
}
