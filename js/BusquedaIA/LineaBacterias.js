class LineaBacteria{
    bacterias = [];
    criaturas = [];
    dirMov;
    dirEje;
    posSeleccion = -1;
    gtLineaBacteria;
    xTile;
    yTile;
    constructor(dirEje){
        this.dirEje = dirEje;
    }
    addBacteria(bacteria){
        if(this.bacterias.length===0){
            this.xTile = bacteria.getXtile();
            this.yTile = bacteria.getYtile();
        }
        this.bacterias.push(bacteria);
    }

    numBacterias(){
        return this.bacterias.length;
    }
    numCriaturas(){
        return this.criaturas.length;
    }
    addCriatura(criatura){
        this.criaturas.push(criatura);
    }

    removeCriatura(criatura){
        removeItemFromArr(this.criaturas, criatura);   
    }

    dibujar(graficos){
        for(let i = 0; i < this.bacterias.length; i++){
            this.bacterias[i].dibujar(graficos);
        }
    }

    getPosSeleccion(){
        return this.posSeleccion;
    }
    getXtile(){
        return this.xTile;
    }
    getYtile(){
        return this.yTile
    }

    intersecta(lb){
        if(lb.dirEje===this.dirEje) return false;
        let lh = this;  //linea horizontal
        let lv = lb;    //linea vertical
        
        if(this.dirEje!=2){
            lv = this;
            lh = lb;
        }

        return lv.getXtile() >= lh.getXtile() && ( lv.getXtile() <= lh.getXtile()+lh.numBacterias()-1 )
            && lh.getYtile() >= lv.getYtile() && ( lh.getYtile() <= lv.getYtile()+lv.numBacterias()-1 );
    }
}