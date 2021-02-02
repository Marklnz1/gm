class EstadoInstantaneo {
	tipo;
	nombre;
	criatura;
	cdActivacion;
	tmpDescanso;
	constructor(nombre,tipo,criatura,tiempoDescanso,cdActivacion) {
		this.nombre = nombre;
		this.tipo = tipo;
		this.criatura = criatura;
		this.cdActivacion = cdActivacion;
		tmpDescanso = new Temporizador(tiempoDescanso);
		tmpDescanso.contador = tmpDescanso.tiempoMaximo;
	}
	cumpleCondicionActivacion() {
		return this.cdActivacion.cumple()&&this.tmpDescanso.tiempoCumplido();
	}
	accion() {
		this.tmpDescanso.reiniciar();
	}
	getNombre() {
		return this.nombre;
	}
	
	getTemporizadorDescanso() {
		return this.tmpDescanso;
	}
}
