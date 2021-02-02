class Poligono{
    puntos = [];
    length = 0;
    addPoint(x,y){
        this.puntos[this.length++] = new Point(x,y);
    }
    dibujar(graficos,color = "#21deb290"){
        graficos.fillStyle = color;
        //graficos.strokeStyle = color;
        graficos.beginPath();
        graficos.moveTo(this.puntos[0].getX(),this.puntos[0].getY());
        for(let i = 1; i < this.length;i++){
            graficos.lineTo(this.puntos[i].getX(),this.puntos[i].getY());
        }
        graficos.closePath();

        graficos.fill();
        //graficos.stroke();
    }
    recortarGraficos(graficos){
        graficos.beginPath();
        graficos.moveTo(this.puntos[0].getX(),this.puntos[0].getY());
        for(let i = 1; i < this.length;i++){
            graficos.lineTo(this.puntos[i].getX(),this.puntos[i].getY());
        }
        graficos.clip();
    }
    get getPuntos(){
        return this.puntos;
    }
}