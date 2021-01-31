class CapaSprites{
    constructor(idSprites,dibujoPlano,nombre){
        this.idSprites = idSprites;
        this.dibujoPlano = dibujoPlano;
        this.nombre = nombre;
    }

    esDibujoPlano(){
        return this.dibujoPlano;
    }
    getIDSprites(){
        return this.idSprites;
    }
    getNombre(){
        return this.nombre;
    }
}