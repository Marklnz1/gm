class Parasito {
	peso;
	esLibre = true;
	capaParasito;
	bacteria;
	constructor(capaParasito,bacteria) {
		this.capaParasito = capaParasito;	
		this.bacteria = bacteria;
	}

	dibujarPeso(graficos) {
		if(this.peso>20||this.peso==null) return;


		/*graficos.fillText(this.bacteria.numero2, this.bacteria.getXcentro, this.bacteria.getYcentro);
		graficos.fillText(this.bacteria.numero, this.bacteria.getXcentro, this.bacteria.getYcentro);*/
		//this.bacteria.getColision().dibujar(graficos);
		graficos.fillStyle = "white";

		graficos.fillText(this.bacteria.idOP, this.bacteria.getXcentro(), this.bacteria.getYcentro());
		//console.log(this.peso, this.bacteria.getXcentro(), this.bacteria.getYcentro());
		

	}

	getPeso() {
		return this.peso;
	}
	setPeso(peso) {
		this.peso = peso;
		if(peso>=0) {
			this.esLibre = false;
		}else {
			this.esLibre = true;
		}
	}
}
