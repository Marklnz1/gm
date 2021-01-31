class GestorFotogramas {
	fotogramas;
	hojaSprites;
	indiceImagen;
	contador;
	unaVez;
	temporizador;
	constructor(hojaSprites,tiempoEspera,unaVez) {
        this.fotogramas = [];
		this.hojaSprites = hojaSprites;
		this.indiceImagen = 0;
		this.contador = 0;
		this.unaVez = unaVez;
		this.temporizador = new Temporizador(tiempoEspera);
	}

	setSecuenciaFotogramas(idSprites) {
		
		for(let i = 0; i < idSprites.length;i++) {
			this.fotogramas[i] = this.hojaSprites.getSprite(idSprites[i]).getImagen();
		}
		
	}
	setTiempoEspera(tiempoEspera) {
		this.temporizador.setTiempoMaximo(tiempoEspera);
	}
	getImagen() {
		this.temporizador.actualizar();
		if( this.temporizador.tiempoCumplido()) {
			this.temporizador.reiniciar();
			this.indiceImagen++;
			if(this.indiceImagen>=this.fotogramas.length) {
				if(this.unaVez) 
                this.indiceImagen = this.fotogramas.length-1;
				else 
                this.indiceImagen = 0;
			}
		}	

		return this.fotogramas[this.indiceImagen];
	}
	
	reiniciarAnimacion() {
		this.temporizador.reiniciar();
		this.indiceImagen = 0;
	}
}
