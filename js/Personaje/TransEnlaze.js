class TransEnlaze {
	condicion;
	trans;
	transicion;
	constructor(trans,condicion,transicion) {
		this.trans = trans;
		this.condicion = condicion;
		this.transicion = transicion;
	}
	
	cumpleCondicion() {
		return this.condicion.cumple();
	}
	
	getTrans() {
		return this.trans;
	}
	getTransicion() {
		return this.transicion;
	}
	
	prepararTransicion() {
		this.trans.setTransicionActual(this.transicion);
	}
}
