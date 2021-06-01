class GestorLineaBacteria{
    criatura;
    orientacion;
    lineasBacteria  = [];
    dirEje;
    constructor(criatura,dirEje){
        //la direccion tiene que ser  1 o 2;
        this.criatura = criatura;
        this.dirEje = dirEje;
    }

    actualizar(){
        
        for(let i = 0; i < this.lineasBacteria.length; i++){
            if(this.lineasBacteria[i]==null) continue;
            this.lineasBacteria[i].dirMov = null;
            this.lineasBacteria[i].gtLineaBacteria = null;
            this.lineasBacteria[i] = null;
        }
        let bCriatura = this.criatura.getBacteria();
        this.configLineaBacteriaLateral(bCriatura,this.dirEje - 2,0);
        this.addLineaBacteria(bCriatura,1,"bidireccional");
        this.configLineaBacteriaLateral(bCriatura,this.dirEje + 2,2);        
    }
    getDirMov(bacteria){
        let lineaBacteria = bacteria.lineaBacteriaH;
        if(this.dirEje===4){
            lineaBacteria = bacteria.lineaBacteriaV;
        }
        let lineaMenor = lineaBacteria;

        if(lineaBacteria.dirMov==="bidireccional"){
            
        }else{
           let bVecina =  bacteria.getVecino(lineaBacteria.dirMov);
           if(bVecina!=null){
               let lineaVecina = null;
               if(this.dirEje===4){
                   lineaVecina = bVecina.lineaBacteriaV;
               }else if(this.dirEje===2){
                   lineaVecina = bVecina.lineaBacteriaH;
               }
               let diferencia = lineaBacteria.numBacterias() - lineaVecina.numBacterias();
            //    console.log(diferencia)
               if(diferencia>=2){
                   return lineaBacteria.dirMov;
               }
           }
        }
        // for(let lb of this.lineasBacteria){
            
        //     if(lb===lineaBacteria || lb==null) continue;

        //     let diferencia = lineaBacteria.numCriaturas()-lb.numCriaturas();
        //     if(diferencia>=2){
        //         return lineaBacteria.dirMov;
        //     }
        // }

        return null;
    }
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