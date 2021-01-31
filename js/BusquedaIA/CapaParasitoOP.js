class CapaParasitoOP{
    criatura;
	bacteriasParaExpandir;
	parasitos;
	mapaBacteriaOP;
	primeraVez = true;
	constructor(mapaBacteriaOP,criatura) {
		this.mapaBacteriaOP = mapaBacteriaOP;
		this.criatura = criatura;
		this.bacteriasParaExpandir = [];		
		this.parasitos = [];
		this.primeraVez = true;
		for(let i = 0; i < mapaBacteriaOP.numBacterias(); i++) {
			this.parasitos[i] = new Parasito(this,mapaBacteriaOP.getBacteria(i));
		}
	}
	getParasito(bacteria) {
		if(this.primeraVez) {
			this.primeraVez = false;
			this.actualizar();
		}

		return this.parasitos[bacteria.getID()];
	}
	getPeso(bacteria) {
		if(this.primeraVez) {
			this.primeraVez = false;
			this.actualizar();	
		}
		
		return this.parasitos[bacteria.getID()].getPeso();
	}
	dibujarPesos(graficos) {
		for(let parasito of this.parasitos) {
			parasito.dibujarPeso(graficos);
		}
	}
	actualizar() {
		let bacteriaCentral = this.mapaBacteriaOP.getBacteria(this.criatura.getBacteria().idOP);
		if(bacteriaCentral == null) {
			return;
		}
		this.bacteriasParaExpandir.length = 0;
		for(let i = 0; i < this.parasitos.length; i++) {
			this.parasitos[i].setPeso(-1);
		}
		this.configurarParasito(bacteriaCentral, null);
		this.bacteriasParaExpandir.push(bacteriaCentral);
		this.ejecutarEnEspera();
	}

	ejecutarEnEspera() {

		let nuevasBacteriasParaExpandir = [];
		for(let bAnalizada of this.bacteriasParaExpandir) {	
			for(let i = 0; i < 8;i+=2) {
				let bVecina = bAnalizada.getVecino(i);
				if(bVecina!=null&&this.parasitos[bVecina.getID()].esLibre) {
					this.configurarParasito(bVecina, bAnalizada);
					nuevasBacteriasParaExpandir.push(bVecina);
				}
			}
		}
		
		if(nuevasBacteriasParaExpandir.length == 0) {
			return;
        }
        this.bacteriasParaExpandir.length=0;
		this.bacteriasParaExpandir.push(...nuevasBacteriasParaExpandir);
		this.ejecutarEnEspera();
	}
	
	configurarParasito(bacteriaHijo,bacteriaPadre) {
		let parasitoHijo = this.getParasito(bacteriaHijo);
		
		if(bacteriaPadre!=null)
			parasitoHijo.setPeso(this.getPeso(bacteriaPadre) + 1);
		else {
			parasitoHijo.setPeso(1);
        }
        bacteriaHijo.peso = parasitoHijo.getPeso();
	}
}