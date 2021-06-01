class Dependiente extends Criatura{
	mb = new MecanismoMovimiento( this);
	caminoHuida = [];
	constructor(anchoCuadroColision, altoCuadroColision, id) {
		super(anchoCuadroColision, altoCuadroColision, id);
		// this.mb.addEventListener("preCambioDestino",()=>{
		// 	let bDependiente = this.getBacteria();
		// 	let dirMov = MAPA.cruzBacteria.getDirMovAjuste(bDependiente);
		// 	if(dirMov===-1) return;

		// 	let camino = this.mb.crearCaminoBacteria(bDependiente,1,dirMov);
		// 	this.mb.recorrerCaminoBacteria(camino);
		// });

		this.mb.addEventListener("preCambioDestino",()=>{
			// for(let e of MAPA.enemigos){
			// 	if(e!=this&&e.id === this.id && e.getVelocidadActual()===this.getVelocidadActual()){
			// 		this.setReduccionVelocidad(random(10,60));
			// 	}
			// }
		});
	}
	
	esBacteriaAlineada(bacteria){
		if(bacteria==null) return false;
		for(let numV_Jugador of JUGADOR.numerosV){
			if(numV_Jugador === bacteria.numeroV){
			  return true;
			}
		}
		return false;
	}	
	getNumeroV_menor_central(numeroV_actual,numerosV){
		let numeroV_menor = null;
		let direccion = null;
		if(numerosV[0]!=null&&numerosV[2]!=null){
			if(numerosV[0].criaturas.length>numerosV[2].criaturas.length){
				numeroV_menor = numerosV[2];
				direccion = 2;
			}else{	
				numeroV_menor = numerosV[0];
				direccion = 6;
			}
		}
		if(numerosV[0]!=null&&numerosV[2]==null){
			numeroV_menor = numerosV[0];
			direccion = 6;
		}

		if(numerosV[0]==null&&numerosV[2]!=null){
			numeroV_menor = numerosV[2];
			direccion = 2;
		}
		return [numeroV_menor,direccion];
	}
	getVectorDirMov(){
		return this.mb.vectDirMov;
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
