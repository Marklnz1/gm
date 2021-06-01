class CruzBacteria{
    tablaBacteriaV;
    tablaBacteriaH;
    criatura;
    datosTemp;
    constructor(criatura){
        this.criatura = criatura;
        this.tablaBacteriaH = new TablaBacteria(criatura,2);
        this.tablaBacteriaV = new TablaBacteria(criatura,4);
        this.datosTemp = [];
    }
    actualizar(){
        this.tablaBacteriaH.actualizar();
        this.tablaBacteriaV.actualizar();


    }
    getDirMovAjuste(bacteria){
        let tablaActiva = this.getTablaActiva(bacteria,this.datosTemp);
        if(tablaActiva==null) return -1;
        let bCriatura = this.criatura.getBacteria();
        let indiceLineaActiva = this.datosTemp["indice"];
        let dirMov = -1;
        if(indiceLineaActiva===1){
            let lineaCentral = tablaActiva.getLineaBacteria(1);
            let diferenciaD = 0;
            let diferenciaI = 0;
            let lineaDerecha = tablaActiva.getLineaBacteria(0);
            let bDerecha = bacteria.getVecino(tablaActiva.getDirMov(2));

            let lineaIzquierda = tablaActiva.getLineaBacteria(2);
            let bIzquierda = bacteria.getVecino(tablaActiva.getDirMov(0));
            //para casos donde la bacteria este posicionado donde la tabla pero no pertenezca realmente
            if(lineaDerecha!=null&&bDerecha!=null&&tablaActiva.estaDentro(bDerecha)){
                diferenciaD = this.diferenciaCriaturas(lineaCentral,lineaDerecha);
            }

            if(lineaIzquierda!=null&&bIzquierda!=null&&tablaActiva.estaDentro(bIzquierda)){
                diferenciaI = this.diferenciaCriaturas(lineaCentral,lineaIzquierda);
            }

            if(diferenciaD>diferenciaI&&diferenciaD>=2){
                dirMov = tablaActiva.getDirMov(2);
            }else if(diferenciaI>=diferenciaD&&diferenciaI>=2){
                dirMov = tablaActiva.getDirMov(0);
            }

        }else{
            let lineaCentral = tablaActiva.getLineaBacteria(1);
            let lineaLateral = tablaActiva.getLineaBacteria(indiceLineaActiva);
            let bCentral = bacteria.getVecino(tablaActiva.getDirMov(indiceLineaActiva));
            if(this.trasladoNecesario(lineaLateral,lineaCentral)&&bCentral!=null&&tablaActiva.estaDentro(bCentral)){
                dirMov = tablaActiva.getDirMov(indiceLineaActiva);
            }
        }
        if(dirMov===-1){
            
            if(tablaActiva.dirEje===2){
                if(bCriatura.getXtile()-bacteria.getXtile()>0){
                    dirMov = 2;
                }else{
                    dirMov = 6;
                }
            }else{
                if(bCriatura.getYtile()-bacteria.getYtile()>0){
                    dirMov = 4;
                }else{
                    dirMov = 0;
                }
            }
        }

        return dirMov;
    }
    
    trasladoNecesario(lineaOrigen,lineaDestino){
        if(lineaOrigen==null || lineaDestino==null) return false;
        return this.diferenciaCriaturas(lineaOrigen,lineaDestino)>=2;
    }
    diferenciaCriaturas(lineaOrigen,lineaDestino){
        return lineaOrigen.numCriaturas() - lineaDestino.numCriaturas();
    }
    getTablaActiva(bacteria, datosTemp){
        let indiceLineaV = this.tablaBacteriaV.getIndiceLinea(bacteria);
        let indiceLineaH = this.tablaBacteriaH.getIndiceLinea(bacteria);

        if(indiceLineaV!=-1 && indiceLineaH!=-1) return null;
       
        if(indiceLineaV!=-1){
            datosTemp["indice"] = indiceLineaV;
            return this.tablaBacteriaV;
        } 
        if(indiceLineaH!=-1){
            datosTemp["indice"] = indiceLineaH;
            return this.tablaBacteriaH;
        }
        return null;

    }

    dibujar(graficos){
        this.tablaBacteriaH.dibujar(graficos);
        this.tablaBacteriaV.dibujar(graficos);
    }

    esDirAEje(bIngresada,dir){
        let bCriatura = this.criatura.getBacteria();
        let dx = bCriatura.getXtile() - bIngresada.getXtile();
        let dy = bCriatura.getYtile() - bIngresada.getYtile();
        
              if(dir === 0 && dy<0 && bIngresada.lineaBacteriaV.intersecta(bCriatura.lineaBacteriaH)){
            return true;
        }else if(dir === 4 && dy>0 && bIngresada.lineaBacteriaV.intersecta(bCriatura.lineaBacteriaH)){
            return true;
        }else if(dir === 2 && dx>0 && bIngresada.lineaBacteriaH.intersecta(bCriatura.lineaBacteriaV)){
            return true;
        }else if(dir === 6 && dx<0 && bIngresada.lineaBacteriaH.intersecta(bCriatura.lineaBacteriaV)){
            return true;
        }
        return false;
    }

}