class Transformacion1KR extends TransPersonaje{

	constructor(koro,tiempoDescanso,condiciones) {
		super(1, tiempoDescanso, koro);
		
		let estadoQuieto = new EstadoJugador("Quieto","basico", koro, condiciones.movimientoInactivo);
		estadoQuieto.addAnimador(getAnimacion("KR_transformacion1_quieto"));
		this.addEstado(estadoQuieto);
		
		let estadoMoviendose = new EstadoJugador("Moviendose","basico", koro, condiciones.movimientoActivo);
		estadoMoviendose.addAnimador(getAnimacion("KR_transformacion1_moviendose"));
		estadoMoviendose.setVelocidad(5);
		this.addEstado(estadoMoviendose);		
	}

}
