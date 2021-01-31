class GestorAnimadores {
	animadores = [];
	
	addAnimador(animador, nombre) {
		animador.setNombre(nombre);
		this.animadores.push(animador);
	}
	
	getAnimador(nombre) {
		for(let animador of this.animadores) {
			if(animador.getNombre()===nombre) {
				return animador;
			}
		}
		
		return null;
	}
	getAnimador(i) {
		return animadores.get(i);
	}
}
