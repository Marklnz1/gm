class TransPersonaje{
	estadoMuerte;
	id;
    estadoActual;
    ultimoEstado;
	gestorDeBasicos = new GestorEstadosJugador("basico");
	gestorDeDefensas = new GestorEstadosJugador("defensa");
	gestorDeAtaques = new GestorEstadosJugador("ataque");
	transformacionesEnlaze = [];
	transicionActual;
	tmpDescanso;
	criatura;
	constructor(id,tiempoDescanso,criatura) {
		this.id = id;
		this.criatura = criatura;

		this.tmpDescanso = new Temporizador(tiempoDescanso);
		this.tmpDescanso.setContador(tiempoDescanso);
		this.criatura.agregarTemporizadorDescanso(this.tmpDescanso);
		
	}

	getID() {
		return this.id;
	}
    /*
    addTransEnlaze(trans,condicion,animador,tiempoTransicion) {
		let transicionTrans = new TransicionTrans(tiempoTransicion, animador);
		let transEnlaze = new TransEnlaze(trans, condicion, transicionTrans);
		this.transformacionesEnlaze.push(transEnlaze);
	}
	addTransEnlaze(trans,condicion) {
		let transEnlaze = new TransEnlaze(trans, condicion, null);
		this.transformacionesEnlaze.push(transEnlaze);
	}*/
	getTransEnlazeActivo() {
		
		for(let te of this.transformacionesEnlaze) {
			if(te.cumpleCondicion()&&te.getTrans().tiempoDescansoCumplido()) {
				return te;
			}
		}
		
		return null;
	}
	
	estadoMuerteActivo() {
		return this.estadoMuerte!=null&&this.estadoMuerte.cumpleCondicionActivacion();
	}
	getEstadoNormalActivo() {
		
		let estado = this.gestorDeDefensas.getEstadoNormalActivo();
		
		if(estado!=null) {
			return estado;
		}
		
		estado = this.gestorDeAtaques.getEstadoNormalActivo();
		
		if(estado!=null) {
			return estado;
		}
		
		return this.gestorDeBasicos.getEstadoNormalActivo();
	}
	getEstadoInstantaneoActivo() {
		let estado = this.gestorDeDefensas.getEstadoInstantaneoActivo();
		
		if(estado!=null) {
			return estado;
		}
		
		estado = this.gestorDeAtaques.getEstadoInstantaneoActivo();
		
		if(estado!=null) {
			return estado;
		}
		
		return this.gestorDeBasicos.getEstadoInstantaneoActivo();
	}
	addEstado(estado) {
		switch (estado.tipo) {
		case "ataque":
			this.gestorDeAtaques.addEstado(estado);
			break;
		case "defensa":
			this.gestorDeDefensas.addEstado(estado);
			break;
		case "basico":
			this.gestorDeBasicos.addEstado(estado);
		break;
		
		default:
			return;
		}
		this.criatura.agregarTemporizadorDescanso(estado.getTemporizadorDescanso());
	}
	addEstadoInstantaneo(estado) {
		switch (estado.tipo) {
		case "ataque":
			this.gestorDeAtaques.addEstadoInstantaneo(estado);
			break;
		case "defensa":
			this.gestorDeDefensas.addEstadoInstantaneo(estado);
			break;
		case "basico":
			this.gestorDeBasicos.addEstadoInstantaneo(estado);
		break;
		}
		this.criatura.agregarTemporizadorDescanso(estado.getTemporizadorDescanso());
	}

	getTransicion() {
		return this.transicionActual;
	}
	transicionEnProceso() {
		if(this.transicionActual==null) {
			return false;
		}
		if(this.transicionActual.transicionEnProceso==false) {
			this.transicionActual = null;
			return false;
		}
		return true;
	}
	iniciarTransicion() {
		if(this.transicionActual!=null)
		this.transicionActual.iniciarTransicion();
	}
	
	accionInicial() {
		this.estadoActual = this.gestorDeBasicos.getEstadosNormales()[0];
		this.estadoActual.accionInicial();
	}

	actualizarEstadoNormal() {
		let estadoNormalNuevo = this.getEstadoNormalActivo();
		if(estadoNormalNuevo!=null&&estadoNormalNuevo!==this.estadoActual) {
			this.estadoActual.accionFinal();
			estadoNormalNuevo.accionInicial();
			estadoNormalNuevo.getAnimadorActual().reiniciarAnimacion();
			this.ultimoEstado = this.estadoActual;
			this.estadoActual =  estadoNormalNuevo;
			
		}
	}

	tiempoDescansoCumplido() {
		return this.tmpDescanso.tiempoCumplido();
	}

    reiniciarTemporizador() {
		this.tmpDescanso.reiniciar();
	}
	getTemporizadorDescanso() {
		return this.tmpDescanso;
	}

	getEstadoNormal(nombreEstado) {
		let estadoNormal = this.gestorDeDefensas.getEstadoNormal(nombreEstado);
		if(estadoNormal!=null) return estadoNormal;
		estadoNormal = this.gestorDeAtaques.getEstadoNormal(nombreEstado);
		if(estadoNormal!=null) return estadoNormal;
		estadoNormal = this.gestorDeBasicos.getEstadoNormal(nombreEstado);
		if(estadoNormal!=null) return estadoNormal;
		return null;
	}
	getEstadoInstantaneo(nombreEstado) {
		let estadoInstantaneo = this.gestorDeDefensas.getEstadoInstantaneo(nombreEstado);
		if(estadoInstantaneo!=null) return estadoInstantaneo;
		estadoInstantaneo = this.gestorDeAtaques.getEstadoInstantaneo(nombreEstado);
		if(estadoInstantaneo!=null) return estadoInstantaneo;
		estadoInstantaneo = this.gestorDeBasicos.getEstadoInstantaneo(nombreEstado);
		if(estadoInstantaneo!=null) return estadoInstantaneo;
		return null;

	}
	actualizarImagen() {
		if(this.estadoMuerteActivo()) {
			this.estadoMuerte.actualizarImagen();
		}else if(this.transicionEnProceso()) {
			this.transicionActual.actualizarImagen(this.criatura.getDireccion());
		}else {
			this.estadoActual.actualizarImagen();
		}

	}
	getEstadoActual() {
		if(this.estadoMuerteActivo())
			return this.estadoMuerte;
		return this.estadoActual;
	}
	dibujar(posX,posY,graficos) {
		if(this.estadoMuerteActivo()) {
			this.estadoMuerte.dibujar(posX, posY,graficos);
		}else if(this.transicionEnProceso()) {
			this.transicionActual.dibujar(posX, posY,graficos);
		}else {
			this.estadoActual.dibujar(posX, posY,graficos);

		}
	}
	getImagenActual() {
		
		if(this.estadoMuerteActivo()) {
			return this.estadoMuerte.getImagenActual();
		}else if(this.transicionEnProceso()) {
			return this.transicionActual.getImagenActual();
		}else {
			return this.estadoActual.getImagenActual();
		}
			
	}
	
}