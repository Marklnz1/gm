class GestorCriaturas {	
	enemigos;
	objetosOrdenables;
	criaturas;
	semiDifuntos = [];
    difuntos = [];
    contador = 0;
	constructor(mapa) {
		this.enemigos = mapa.getEnemigos();
		this.objetosOrdenables = mapa.getObjetosOrdenables();
		this.criaturas = mapa.getCriaturas();
	}
	generarEnemigo() {
		this.contador++;
		if(teclaPresionada("m")&&contador>=20) {
			for(let i = 0 ; i < 1;i++) {
				let enemigo = RegistroEnemigos.crearEnemigo(1,"enemigo");
				this.contador=0;
				MAPA.agregarEnemigo(enemigo);
				enemigo.setPosMapa(JUGADOR.getRegistroMov().getX(), jugador.getRegistroMov().getY());
			}
		}
	}
	
	actualizar() {
		//generarEnemigo();
		//======================================
		for(let criatura of this.criaturas) {
			criatura.actualizar();
		}
		for(let criatura of this.criaturas) {
			criatura.actualizarImagenActual();
		}
		for(let semiDifunto of this.semiDifuntos) {
			if(semiDifunto.esDifunto) {
				this.difuntos.push(semiDifunto);
			}
        }
        this.removeArrFromArr(this.semiDifunto,this.difuntos);
		for(let difunto of difuntos) {
			this.configurarDifunto(difunto);
		}
		difuntos.length = 0;
	}
	configurarDifunto(criatura) {
        removeItemFromArr(this.objetosOrdenables,criatura);
		removeItemFromArr(MAPA.getCriaturas(),criatura);
	}
	configurarSemiDifunto( criatura) {

		enemigos.remove(criatura);
		
		for(let c of this.criatura.getCazadores()) {
			c.setObjetivo(null);	
		}
        if(criatura.getObjetivo()!=null)
        removeItemFromArr(criatura.getObjetivo().getCazadores(),criatura);
            this.semiDifuntos.push(criatura);
	}

}