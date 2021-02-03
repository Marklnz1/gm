class RectanguloHelice extends Rectangulo {
  anchoHelice;
  distancia;
  criatura;
  separacionH = 0;
  separacionV = 0;
  direccionAnterior = " ";
  ajusteCentroPosY_H = 0;
  ajusteCentroPosX_V = 0;
  ajusteCentroPosY_V = 0;
  ajusteCentroPosX_H = 0;
  posXanterior = 0;
  posYanterior = 0;
  constructor(criatura, anchoHelice, distancia) {
      super();
    this.anchoHelice = anchoHelice;
    this.distancia = distancia;
    this.criatura = criatura;
  }
  setSeparacionH(separacionH) {
    this.separacionH = separacionH;
  }
  setSeparacionV(separacionV) {
    this.separacionV = separacionV;
  }
  setAjusteCentroX_V(ajusteCentroPosX) {
    this.ajusteCentroPosX_V = ajusteCentroPosX;
  }
  setAjusteCentroY_H(ajusteCentroPosY) {
    this.ajusteCentroPosY_H = ajusteCentroPosY;
  }
  setAjusteCentroY_V(ajusteCentroPosY) {
    this.ajusteCentroPosY_V = ajusteCentroPosY;
  }
  setAjusteCentroX_H(ajusteCentroPosX) {
    this.ajusteCentroPosX_H = ajusteCentroPosX;
  }
  centrarVertical() {
    this.separacionV = -this.distancia / 2;
  }
  centrarHorizontal() {
    this.separacionH = -this.anchoHelice / 2;
  }
  intersecta(rectangle) {
    this.actualizarRectangulo();
    return super.intersecta(rectangle);
  }

  actualizarRectangulo() {
    if (!this.estaRectanguloAtrasado()) return;
    let origen = this.criatura.getRegistroMov();
    this.direccionAnterior = this.criatura.getDireccion();
    this.posXanterior = origen.getX();
    this.posYanterior = origen.getY();
    switch (this.criatura.getDireccion()) {
      case 2:
        this.x = origen.getX() + this.separacionH + this.ajusteCentroPosX_H;
        this.y = origen.getY() - this.anchoHelice / 2 + this.ajusteCentroPosY_H;
        this.ancho = this.distancia;
        this.alto = this.anchoHelice;
        break;
      case 6:
        this.x =
          origen.getX() -
          this.distancia -
          1 -
          this.separacionH +
          this.ajusteCentroPosX_H;
        this.y = origen.getY() - this.anchoHelice / 2 + this.ajusteCentroPosY_H;
        this.ancho = this.distancia;
        this.alto = this.anchoHelice;
        break;
      case 0:
        this.x = origen.getX() - this.anchoHelice/2 + this.ajusteCentroPosX_V;
        this.y =
          origen.getY() -
          this.distancia -
          1 -
          this.separacionV +
          this.ajusteCentroPosY_V;
        this.ancho = this.anchoHelice;
        this.alto = this.distancia;
        break;
      case 4:
        this.x = origen.getX() - this.anchoHelice / 2 + this.ajusteCentroPosX_V;
        this.y = origen.getY() + this.separacionV + this.ajusteCentroPosY_V;

        this.ancho = this.anchoHelice;
        this.alto = this.distancia;
        break;
    }
  }
  estaRectanguloAtrasado() {
    return (
      this.direccionAnterior != this.criatura.getDireccion() ||
      this.posXanterior != this.criatura.getRegistroMov().getX() ||
      this.posYanterior != this.criatura.getRegistroMov().getY()
    );
  }

  dibujar(graficos, color = "blue") {
    this.actualizarRectangulo();
    super.dibujarContorno(graficos,color);
  }
}
