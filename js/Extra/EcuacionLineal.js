class EcuacionLinealS{
    a;
    b;
	xVertical;
	tipo;
	constructor(linea) {
        if(linea!=null)
		this.configEcuacion(linea.getX1(),linea.getY1(),linea.getX2(),linea.getY2());
	}
	
	
	setEcuacion(linea) {
		this.configEcuacion(linea.getX1(), linea.getY1(),linea.getX2(),linea.getY2());
	}
	configEcuacion(posX1,posY1,posX2,posY2) {
        this.a = (posY2-posY1)/(posX2-posX1);
        this.b = (posY1-this.a*posX1);
		 if(!isFinite(this.a)) {
            this.xVertical = posX1;
		 }
		 
		if(!isFinite(this.a)) {
			this.tipo = 'v';
		}else if(this.a===0) {
			this.tipo = 'h';
		}else {
			this.tipo = 'n';
		}
	}
	getY(x) {
		if(this.a==0) {
			return this.b;
		}else if(!isFinite(this.a)) {
			return null;
		}
		return this.a*x+this.b;
	}
	
	getX(y) {
		if(!isFinite(this.a)) {
			return this.xVertical;
		}else if(this.a==0){

			return null;
		}else {
            return (y-this.b)/this.a;
		}
	}
	
	toString() {
		return "y = "+this.a+"x"+" + "+this.b;
	}
	getInterseccionEcuacion(ec2) {
		let xInterseccion = 0;
        let yInterseccion = 0;
        let contador=0;
		if(this.tipo=='n'&&ec2.tipo=='n'&&!this.a===ec2.a) {
			xInterseccion = (ec2.b-this.b)/(this.a-ec2.a);
            yInterseccion = this.getY(xInterseccion);	
		}else if(this.tipo=='v'&&ec2.tipo=='n') {
			xInterseccion = this.xVertical;
            yInterseccion = ec2.getY(xInterseccion);

		}else if(this.tipo=='n'&&ec2.tipo=='v') {
			xInterseccion = ec2.xVertical;
            yInterseccion = this.getY(xInterseccion);            

		}else if(this.tipo=='h'&&ec2.tipo=='n') {
			yInterseccion = this.b;
            xInterseccion = ec2.getX(yInterseccion);		

		}else if(this.tipo=='n'&&ec2.tipo=='h') {
			yInterseccion = ec2.b;
            xInterseccion = this.getX(yInterseccion);

		}else if(this.tipo=='v'&&ec2.tipo=='h') {
			xInterseccion = this.xVertical;
            yInterseccion = ec2.b;

		}else if(this.tipo=='h'&&ec2.tipo=='v') {
			xInterseccion = ec2.xVertical;
            yInterseccion = this.b;
            

		}
		return new Point(xInterseccion, yInterseccion);
	}
	
}
