class CapaParasito {
	criatura;
	bacteriasParaExpandir;
	parasitos;
	mapaBacteria;
	primeraVez = true;
	constructor(mapaBacteria,criatura) {
		this.mapaBacteria = mapaBacteria;
		this.criatura = criatura;
		this.bacteriasParaExpandir = [];		
		this.parasitos = [];
		this.primeraVez = true;
		for(let i = 0; i < mapaBacteria.numBacterias(); i++) {
			this.parasitos[i] = new Parasito(this,mapaBacteria.getBacteria(i));
		}
	}
/*
	crearCaminoBacteria(bacteriaDestino){
		let caminoBacteria = [];
		let parasitoActual = this.getParasito(bacteriaDestino);
		let parasitoNuevo = null;
	
		caminoBacteria.add(parasitoActual.bacteria);
		let bacteriaVecina = null;

		do {
			
			parasitoNuevo = null;
			
			for(int i = 0; i<8;i+=2) {
				bacteriaVecina = parasitoActual.bacteria.getBacteriaVecina(i);
				if(bacteriaVecina!=null&&getPeso(bacteriaVecina)<parasitoActual.getPeso()) {
					caminoBacteria.add(bacteriaVecina);
					parasitoNuevo = getParasito(bacteriaVecina);
					parasitoActual = parasitoNuevo;
					break;
				}
			}
		}while(parasitoNuevo!=null);
		
		ArrayList<Bacteria> caminoBacteriaRevertido = new ArrayList<Bacteria>();
		for(int i = caminoBacteria.size()-1; i >=0; i--) {
			caminoBacteriaRevertido.add(caminoBacteria.get(i));
		}

		return caminoBacteriaRevertido;
	}*/
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
		let bacteriaCentral = this.criatura.getBacteria();
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
	}

}
