class CondicionesKoroNJ {
	kr_nj;
	constructor(koroNJ) {
        this.kr_nj = koroNJ;
        this.movimientoActivo = ()=>this.kr_nj.mb.posibleMovimiento();
        this.movimientoInactivo = ()=>!this.kr_nj.mb.posibleMovimiento();
	}

}
