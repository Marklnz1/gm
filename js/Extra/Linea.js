class Linea {
  constructor(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.p1 = new Point(x1,y1);
    this.p2 = new Point(x2,y2);
  }

  dibujar(graficos, color = "blue") {
    graficos.strokeStyle = color;
    graficos.beginPath();
    graficos.moveTo(this.p1.x, this.p1.y);
    graficos.lineTo(this.p2.x, this.p2.y);

    graficos.closePath();
    graficos.stroke();
  }

  getSemiModulo() {
    return (
      Math.pow(this.x2 - this.x1, 2) +
      Math.pow(this.y2 - this.y1, 2)
    );
  }
  setLineC(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.p1.setX(x1);
    this.p1.setY(y1);
    this.p2.setX(x2);
    this.p2.setY(y2);
  }
  setLineP(punto1, punto2) {
    this.setLineC(punto1.getX(),punto1.getY(),punto2.getX(),punto2.getY())
  }
  getX1() {
    return this.p1.getX();
  }
  getY1() {
    return this.p1.getY();
  }
  getX2() {
    return this.p2.getX();
  }
  getY2() {
    return this.p2.getY();
  }
  getP1() {
    return this.p1;
  }
  getP2() {
    return this.p2;
  }
  //===================CODIGO COPIADO======================
  onSegment(p, q, r) {
    if (
      q.getX() <= Math.max(p.getX(), r.getX()) &&
      q.getX() >= Math.min(p.getX(), r.getX()) &&
      q.getY() <= Math.max(p.getY(), r.getY()) &&
      q.getY() >= Math.min(p.getY(), r.getY())
    )
      return true;

    return false;
  }

  orientation(p, q, r) {
    let val =
      (q.getY() - p.getY()) * (r.getX() - q.getX()) -
      (q.getX() - p.getX()) * (r.getY() - q.getY());
    if (val === 0) return 0; // colinear

    return val > 0 ? 1 : 2; // clock or counterclock wise
  }
  intersectaLinea(linea) {
    // Find the four orientations needed for general and
    // special cases
    let p1 = this.getP1();
    let q1 = this.getP2();
    let p2 = linea.getP1();
    let q2 = linea.getP2();
    
    let o1 = this.orientation(p1, q1, p2);
    let o2 = this.orientation(p1, q1, q2);
    let o3 = this.orientation(p2, q2, p1);
    let o4 = this.orientation(p2, q2, q1);

    // General case
    if (o1 !== o2 && o3 !== o4) return true;

    // Special Cases
    // p1, q1 and p2 are colinear and p2 lies on segment p1q1
    if (o1 === 0 && this.onSegment(p1, p2, q1)) return true;

    // p1, q1 and q2 are colinear and q2 lies on segment p1q1
    if (o2 === 0 && this.onSegment(p1, q2, q1)) return true;

    // p2, q2 and p1 are colinear and p1 lies on segment p2q2
    if (o3 === 0 && this.onSegment(p2, p1, q2)) return true;

    // p2, q2 and q1 are colinear and q1 lies on segment p2q2
    if (o4 === 0 && this.onSegment(p2, q1, q2)) return true;

    return false; // Doesn't fall in any of the above cases
  }
  getP1(){
    return this.p1;
  }
  getP2(){
    return this.p2;
  }
}
