class Point{
    constructor(x=0,y=0){
        this.x = x;
        this.y = y;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
    setLocation(x,y){
        this.x = x;
        this.y = y;
    }
    setX(x){
        this.x = x;
    }
    setY(y){
        this.y = y;
    }
    equals(punto){
        return punto.x==this.x&&punto.y==this.y;
    }
}