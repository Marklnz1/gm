class TablaBacteria{
    criatura;
    lineasBacteria  = [];
    dirMovs;
    dirEje;
    constructor(criatura,dirEje){
        this.criatura = criatura;
        this.dirEje = dirEje;
        this.dirMovs = [];
        this.dirMovs[0] = dirEje-2;
        this.dirMovs[1] = null;
        this.dirMovs[2] = dirEje+2;
    
    }
    estaDentro(bacteria){
        if(bacteria==null) return false;

        for(let lb of this.lineasBacteria){
           if(lb===bacteria.getLineaBacteria(this.dirEje)){
               return true;
           }
        }

        return false;
    }
    getDirMov(indiceLineaBacteria){
        return this.dirMovs[indiceLineaBacteria];
    }   
    getLineaBacteria(indice){
        return this.lineasBacteria[indice];
    }
    getIndiceLinea(bacteria){
        if(bacteria==null) return -1;

        for(let i = 0; i < this.lineasBacteria.length; i++){
            let lb = this.lineasBacteria[i];
           if(lb===bacteria.getLineaBacteria(this.dirEje)){
               return i;
           }
        }

        return -1;
    }
    actualizar(){
        for(let i= 0; i < 3; i++){
            this.lineasBacteria[i] = null;
        }

        let bCriatura = this.criatura.getBacteria();

        let bDerecha = bCriatura.getVecino(this.dirMovs[2]);
        if(bDerecha!=null){
            this.lineasBacteria[0] = bDerecha.getLineaBacteria(this.dirEje);
        }

        let bIzquierda = bCriatura.getVecino(this.dirMovs[0]);
        if(bIzquierda!=null){
            this.lineasBacteria[2] = bIzquierda.getLineaBacteria(this.dirEje);
        }

        this.lineasBacteria[1] = bCriatura.getLineaBacteria(this.dirEje);        


        
        
    }
    // getDirMov(bacteria){
    //     let lineaBacteria = bacteria.lineaBacteriaH;
    //     if(this.dirEje===4){
    //         lineaBacteria = bacteria.lineaBacteriaV;
    //     }
    //     let lineaMenor = lineaBacteria;

    //     if(lineaBacteria.dirMov==="bidireccional"){
            
    //     }else{
    //        let bVecina =  bacteria.getVecino(lineaBacteria.dirMov);
    //        if(bVecina!=null){
    //            let lineaVecina = null;
    //            if(this.dirEje===4){
    //                lineaVecina = bVecina.lineaBacteriaV;
    //            }else if(this.dirEje===2){
    //                lineaVecina = bVecina.lineaBacteriaH;
    //            }
    //            let diferencia = lineaBacteria.numBacterias() - lineaVecina.numBacterias();
    //         //    console.log(diferencia)
    //            if(diferencia>=2){
    //                return lineaBacteria.dirMov;
    //            }
    //        }
    //     }
    //     return null;
    // }
    dibujar(graficos){
        for(let lb of this.lineasBacteria){
            if(lb==null) continue;
            lb.dibujar(graficos);
        }
    }
    configLineaBacteriaLateral(bOrigen,direccion,indice){
        let bVecina = bOrigen.getVecino(direccion);
        if(bVecina==null) return;
        this.addLineaBacteria(bVecina,indice,(direccion+4)%8);
    }

    addLineaBacteria(bAnalizada,indice,dirMov){
        if(bAnalizada==null) return;
        if(this.dirEje === 2){
            this.lineasBacteria[indice] = bAnalizada.lineaBacteriaH;
            this.lineasBacteria[indice].gtLineaBacteria = this;
        }else{
            this.lineasBacteria[indice] = bAnalizada.lineaBacteriaV;
            this.lineasBacteria[indice].gtLineaBacteria = this;
        }
        this.lineasBacteria[indice].dirMov = dirMov;
    }
}