class Transformacion1TRP extends TransPersonaje{
    constructor(tripulante,condiciones){
        super(1,0,tripulante);
        let estadoQuieto = new EstadoJugador(
          "quieto",
          "basico",
          tripulante,
          condiciones.quieto
        );
        estadoQuieto.addAnimador(getAnimacion("JG_Quieto"));
        this.addEstado(estadoQuieto);
    
        let estadoMoviendose = new EstadoJugador(
          "huyendo",
          "basico",
          tripulante,
          condiciones.huir
        );
        estadoMoviendose.addAnimador(getAnimacion("JG_MOV"));
        estadoMoviendose.setVelocidad(5);
        this.addEstado(estadoMoviendose);
    }
}