class Tripulante extends Dependiente {
  constructor() {
    super(28, 16, 2);
    this.condiciones = new CondicionesTripulante(this);
    this.addTransformacion(new Transformacion1TRP(this, this.condiciones));
    this.setAjustePYimagen(-18);
    this.bloquearDirImagen([0,4]);
     this.mb.getBuscadorRuta().alejarse = true;
  }
}
