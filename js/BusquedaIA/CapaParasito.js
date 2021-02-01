class CapaParasito {
	criatura;
	huespedesParaExpandir;
	parasitos;
	mapaBacteria;
	primeraVez = true;
	constructor(criatura,listaHuesped) {
		this.huespedesParaExpandir = [];		
		this.parasitos = [];
		this.primeraVez = true;
		this.criatura = criatura;
		for(let i = 0; i < listaHuesped.length; i++) {
			this.parasitos[i] = new Parasito(this,listaHuesped[i]);
		}
	}
/*
	crearCaminoBacteria(bacteriaDestino){
		let caminoBacteria = [];
		let parasitoActual = this.getParasito(bacteriaDestino);
		let parasitoNuevo = null;
	
		caminoBacteria.add(parasitoActual.huesped);
		let bacteriaVecina = null;

		do {
			
			parasitoNuevo = null;
			
			for(int i = 0; i<8;i+=2) {
				bacteriaVecina = parasitoActual.huesped.getBacteriaVecina(i);
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
	getParasito(huesped) {
		if(this.primeraVez) {
			this.primeraVez = false;
			this.actualizar();
		}

		return this.parasitos[huesped.getID()];
	}
	getPeso(huesped) {
		if(this.primeraVez) {
			this.primeraVez = false;
			this.actualizar();	
		}
		
		return this.parasitos[huesped.getID()].getPeso();
	}
	dibujarPesos(graficos) {
		for(let parasito of this.parasitos) {
			parasito.dibujarPeso(graficos);
		}
	}
	actualizar() {
		let huespedOrigen = this.criatura.getBacteria().bloqueT;
		if(huespedOrigen == null) {
			return;
		}
		this.huespedesParaExpandir.length = 0;
		for(let i = 0; i < this.parasitos.length; i++) {
			this.parasitos[i].setPeso(-1);
		}
		this.configurarParasito(huespedOrigen, null);
		this.huespedesParaExpandir.push(huespedOrigen);
		this.ejecutarEnEspera();
	}

	ejecutarEnEspera() {

		let nuevosHuespedesExpandir = [];
		for(let hAnalizado of this.huespedesParaExpandir) {	
			for(let i = 0; i < 8;i+=2) {
				let vecino = hAnalizado.getVecino(i);
				if(vecino!=null&&this.parasitos[vecino.getID()].esLibre) {
					this.configurarParasito(vecino, hAnalizado);
					nuevosHuespedesExpandir.push(vecino);
				}
			}
		}
		
		if(nuevosHuespedesExpandir.length == 0) {
			return;
        }
        this.huespedesParaExpandir.length=0;
		this.huespedesParaExpandir.push(...nuevosHuespedesExpandir);
		this.ejecutarEnEspera();
	}
	
	configurarParasito(huespedHijo,huespedPadre) {
		let parasitoHijo = this.getParasito(huespedHijo);
		
		if(huespedPadre!=null)
			parasitoHijo.setPeso(this.getPeso(huespedPadre) + 1);
		else {
			parasitoHijo.setPeso(1);
		}
	}

}
