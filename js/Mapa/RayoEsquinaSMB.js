class RayoEsquinaSMB extends RayoSMB {
  //================================================0
  //Hay un bug de visualizacion que no se nota si no dibujas los rayos
  //individualmente, se arregla agregando todos
  //los rayos individualmente y ordenarlos, no como actualmente,
  //se ordena en parejas y eso con angulos pequeños genera una lista mal ordenada

  constructor(registroMovOrigen, puntoEsquina) {
    super(
      registroMovOrigen,
      puntoEsquina.getPuntoDestino(),
      puntoEsquina.getPuntoOrigenRayoExtra()
    );
  }
  getPuntoChoqueRayoExtra() {
    if (this.rayoExtraAceptado) {
      return this.rayoNormalExtra.getPuntaRayo();
    }
    return null;
  }
  getPuntoChoqueRayoPrincipal() {
    if (this.rayoPrincipalAceptado) {
      return this.puntoDestinoPrincipal;
    }
    return null;
  }

  actualizar() {
    this.lineaRayoPrincipal.setLineP(
      this.registroMovOrigen,
      this.puntoDestinoPrincipal
    );
    this.rayoPrincipalAceptado = !super.lineaRayoPrChoca(
      this.lineaRayoPrincipal
    );
    if (!this.rayoPrincipalAceptado) return;
    this.anguloLineaPrincipal = calcularAnguloPantallaL(
      this.lineaRayoPrincipal
  );

  //let anguloExtra = calcularAnguloPantallaP(this.registroMovOrigen,this.puntoDestinoPrincipal);
    this.rayoNormalExtra.setAngulo(this.anguloLineaPrincipal);
	this.rayoNormalExtra.actualizar();
    this.rayoExtraAceptado = this.rayoNormalExtra.getSemiModulo() > 32 * 32;
	if (!this.rayoExtraAceptado) return;

    let anguloH = calcularAnguloHPtll_LP(
      this.lineaRayoPrincipal,
      this.registroMovOrigen,
      this.rayoNormalExtra.getRegistroMovOrigen()
    );
	this.esRayoExtraHorario = anguloH < 180;
  }
}
