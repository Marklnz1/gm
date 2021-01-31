class GestorEstadosJugador {
	tipo;
	estadosNormales = [];
	estadosInstantaneos = [];
	constructor(tipo) {
		this.tipo = tipo;
	}
	getEstadosNormales(){
		return this.estadosNormales;
	}
	getEstadosInstantaneos(){
		return this.estadosInstantaneos;
	}
	
	getEstadoNormal(nombre) {
		for(let ej of this.estadosNormales) {
			if(ej.getNombre().equalsIgnoreCase(nombre)) {
				return ej;
			}
		}
		return null;
	}
	getEstadoInstantaneo( nombre) {
		for(let ej of this.estadosInstantaneos) {
			if(ej.getNombre()===nombre) {
				return ej;
			}
		}
		return null;
	}
	addEstado(estado) {
		this.estadosNormales.push(estado);
		
	}
	addEstadoInstantaneo(estado) {
		this.estadosInstantaneos.push(estado);
	}
	 
	getEstadoNormalActivo() {
		for(let ej of this.estadosNormales) {
			if(ej.cumpleCondicionActivacion())
				return ej;
		}
		return null;
	}
	
	getEstadoInstantaneoActivo() {
		for(let ei of this.estadosInstantaneos) {
			if(ei.cumpleCondicionActivacion())
				return ei;
		}
		return null;
	}

}
