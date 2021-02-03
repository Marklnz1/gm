class KR_NJ extends Dependiente {
  condiciones;
  decidioMoverse;
  posXanterior;
  posYanterior;
  constructor() {
    super(28, 16, 1);
    this.condiciones = new CondicionesKoroNJ(this);
    this.addTransformacion( new Transformacion1KR(this, 30, this.condiciones));
    this.configurarTransformaciones();
    this.setAjustePYimagen(-18);  }

  configurarTransformaciones() {}

  //=============================================================================================================================
  actualizar() {
    // TODO Auto-generated method stub
    super.actualizar();
    //		System.out.println(transActual.getEstadoActual().getNombre());
    this.posXanterior = this.registroMov.getX;
    this.posYanterior = this.registroMov.getY;
  }
}
