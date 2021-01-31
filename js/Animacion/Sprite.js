class Sprite {
	imagen;
	constructor(imagen,x,y) {
		this.imagen = imagen;
		this.x = x;
		this.y = y;
	}
	dibujar(graficos){
		graficos.drawImage(this.imagen,this.x,this.y);
	}
	getImagen() {
		return this.imagen;
	}
	getAncho() {
		return this.imagen.width;
	}	
	getAlto() {
		return this.imagen.height;
	}
}