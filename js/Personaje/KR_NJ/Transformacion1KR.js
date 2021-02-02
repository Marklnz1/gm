class Transformacion1KR extends TransPersonaje{

	constructor(kr,tiempoDescanso,condiciones) {
		super(1, tiempoDescanso, kr);
		
		let estadoQuieto = new EstadoJugador("Quieto","basico", kr, condiciones.movimientoInactivo);
		estadoQuieto.addAnimador(getAnimacion("KR_transformacion1_quieto"));
		this.addEstado(estadoQuieto);
		
		let estadoMoviendose = new EstadoJugador("Moviendose","basico", kr, condiciones.movimientoActivo);
		estadoMoviendose.addAnimador(getAnimacion("KR_transformacion1_moviendose"));
		estadoMoviendose.setVelocidad(3);
		this.addEstado(estadoMoviendose);		

		this.addEstado(new EstadoEscape(kr,condiciones.huir));
	}

}

class EstadoEscape extends EstadoJugador{
	temporizador = new Temporizador(60);
	constructor(kr,condicion){
		super("escape", "defensa",kr,condicion,0);
		this.addAnimador(getAnimacion("KR_transformacion1_moviendose"));
		this.setVelocidad(3);
	}
	accionInicial(){
		super.accionInicial();
		this.bloquear();
		this.criatura.mb.getBuscadorRuta().alejarse = true;
	}
	actualizar(){
		this.temporizador.actualizar();
		if(this.temporizador.tiempoCumplido()||!this.criatura.mb.posibleMovimiento()){
			this.desbloquear();
			this.criatura.mb.getBuscadorRuta().alejarse = false;
			this.temporizador.setTiempoMaximo(random(30,75));
			this.temporizador.reiniciar();
		}
	}

}