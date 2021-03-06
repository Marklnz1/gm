class Transformacion1PY extends TransPersonaje {
  constructor(jugador) {
      super(1,0,jugador);
      
    let estadoQuieto = new EstadoJugador(
      "quieto",
      "basico",
      jugador,
      ()=>teclasMovNoActiva()&&!estaTocandoPantalla
    );
    estadoQuieto.addAnimador(getAnimacion("JG_Quieto"));
    this.addEstado(estadoQuieto);

    let estadoMoviendose = new EstadoJugador(
      "moviendose",
      "basico",
      jugador,
      ()=>teclasMovActiva()||estaTocandoPantalla
    );
    estadoMoviendose.addAnimador(getAnimacion("JG_MOV"));
    estadoMoviendose.setVelocidad(5);
    this.addEstado(estadoMoviendose);
  }
}
