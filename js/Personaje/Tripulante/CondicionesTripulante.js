class CondicionesTripulante{
    constructor(tripulante){
        this.huir = ()=>tripulante.mb.posibleMovimiento();
        this.quieto = ()=>!tripulante.mb.posibleMovimiento();
    }
}