function getSemiModuloPP(punto1, punto2) {
  return (
    Math.pow(punto2.getX() - punto1.getX(), 2) +
    Math.pow(punto2.getY() - punto1.getY(), 2)
  );
}

function calcularAnguloHPtll_LP(linea1, l2p1, l2p2) {
  let anguloLinea1 = calcularAnguloPantallaL(linea1);
  let anguloLinea2 = calcularAnguloPantallaP(l2p1, l2p2);
  let anguloFormado = anguloLinea1 + (360 - anguloLinea2);
  anguloFormado = anguloFormado - parseInt(anguloFormado / 360) * 360;

  return anguloFormado;
}
function calcularAnguloPantallaL(linea) {
  return calcularAnguloPantallaP(linea.getP1(), linea.getP2());
}

function calcularAnguloPantallaP(p1, p2) {
  return calcularAnguloPantallaC(p1.getX(), p1.getY(), p2.getX(), p2.getY());
}
function calcularAnguloPantallaC(x1, y1, x2, y2) {
  let deltaX = x2 - x1;
  let deltaY = y1 - y2;
  if (deltaX === 0) return deltaY > 0 ? 90 : 270;
  if (deltaY === 0) return deltaX > 0 ? 0 : 180;

  let angulo = toDegrees(Math.atan2(deltaY, deltaX));
  let aumento = angulo < 0 ? 360 : 0;
  return angulo + aumento;
}
function calcularVectUnitarioC(vect, posX1, posY1, posX2, posY2) {
  let dx = posX2 - posX1;
  let dy = posY2 - posY1;
  let modulo = Math.sqrt(dx * dx + dy * dy);
  vect.setX(dx / modulo);
  vect.setY(dy / modulo);
}
function calcularVectUnitarioP(vect, punto1, punto2) {
  return this.calcularVectUnitarioC(
    vect,
    punto1.getX(),
    punto1.getY(),
    punto2.getX(),
    punto2.getY()
  );
}