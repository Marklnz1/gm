class Dependiente extends Criatura{
	mb = new MecanismoMovimiento( this);
	caminoHuida = [];

	constructor(anchoCuadroColision, altoCuadroColision, id) {
		super(anchoCuadroColision, altoCuadroColision, id);
	}
	actualizarMov() {
		if(!this.transActual.estadoMuerteActivo())
			this.mb.actualizar();
	}
	dibujar(graficos) {
		super.dibujar(graficos);
	}
	getBacteria() {
		if(this.mb.getBacteriaDestino()!=null) {
			return this.mb.getBacteriaDestino();
		}
		return super.getBacteria();
	}
    setSolicitudesDeMov(direccion, distanciaTile) {
		this.mb.recorrerCaminoBacteria( this.mb.crearCaminoBacteria(this.getBacteria(), distanciaTile, this.getDireccion()) );

	}
	solicitudMovCompletada() {
		return !this.mb.solicitudRecorrer;
	}

	estaHuyendo() {
		return this.mb.getBuscadorRuta().alejarse;
	}
	
}
