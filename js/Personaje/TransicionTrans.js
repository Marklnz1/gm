class TransicionTrans {
	animador;
	transicionEnProceso = false;
	temporizador;
	imagenActual;
constructor(tiempoTransicion, animador) {
		this.animador = animador;
		this.temporizador = new Temporizador(tiempoTransicion);
	}
	
	iniciarTransicion() {
		this.transicionEnProceso = true;
		this.animador.reiniciarAnimacion();
	}
	actualizar() {
		if(this.transicionEnProceso) {
			this.temporizador.actualizar();
			if(this.temporizador.tiempoCumplido()) {
				this.transicionEnProceso = false;
				this.temporizador.reiniciar();	
			}
		}
	}
	actualizarImagen(direccion) {
		this.imagenActual = this.animador.getImagen(direccion);
	}
	transicionEnProceso() {
		return this.transicionEnProceso;
	}
	dibujar(posX,posY,graficos) {
        graficos.drawImage(this.imagenActual,posX,posY);
	}
	getImagen(direccion) {
		return this.animador.getImagen(direccion);
	}
}
