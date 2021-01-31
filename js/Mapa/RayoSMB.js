class RayoSMB {
  rayoPrincipalAceptado;
  rayoExtraAceptado = false;
  esRayoExtraHorario;
  anguloLineaPrincipal;
  registroMovOrigen;
  lineaRayoPrincipal;
  rayoNormalExtra;
  puntoDestinoPrincipal;
  r2d = new Rectangulo();
  lineasSombra = [];
  constructor(registroMovOrigen, puntoDestinoPrincipal, puntoOrigenRayoExtra) {
    this.registroMovOrigen = registroMovOrigen;
    this.puntoDestinoPrincipal = puntoDestinoPrincipal;
    this.rayoNormalExtra = new RayoNormalSMB(puntoOrigenRayoExtra, 0);
    this.lineaRayoPrincipal = new Linea();
  }
  /*lineaRayoPrChoca(lineaRayoPr) {
    let puntoDestino = lineaRayoPr.getP2()();
    for (let linea of GestorJuego.MAPA.lineasSombra) {
      if (linea.intersectaLinea(lineaRayoPr)) {
        if (this.esLineaCruz(linea)) {
          if (!this.puntoDentroDeLineaCruz(linea, puntoDestino)) return true;
        } else if (!this.esPuntoLateral(linea, puntoDestino)) {
          return true;
        }
      }
    }

    return false;
  }*/

  /*lineaRayoPrChoca(lineaRayoPr,lineaExcepcion) {
		puntoDestino = lineaRayoPr.getP2()();
		for(let l of MAPA.lineasSombra) {
			if(l!=lineaExcepcion&&l.intersectsLine(lineaRayoPr)) {
				if(esLineaCruz(l)) {
					if(!puntoDentroDeLineaCruz(l, puntoDestino))
						return true;
				}else if(!esPuntoLateral(l, puntoDestino)){
					return true;
				}
			}
		}
		
		return false;
	}*/
  lineaRayoPrChoca(lineaRayoPr, lineaExcepcion) {
    /*this.lineasSombra = MAPA.lineasSombra.filter(lineaSMB=>{
            for(let lineaExcepcion of lineasExcepcion){
                  if(lineaExcepcion === lineaSMB){
                      return false;
                  }  
            }
            return true;
        });*/
    let puntoDestino = lineaRayoPr.getP2();
    for (let l of MAPA.getLineasSombra()) {
      if (l.intersectaLinea(lineaRayoPr) && l != lineaExcepcion) {
        if (this.esLineaCruz(l)) {
          if (!this.puntoDentroDeLineaCruz(l, puntoDestino)) return true;
        } else if (!this.esPuntoLateral(l, puntoDestino)) {
          return true;
        }
      }
    }

    return false;
  }

  esLineaCruz(linea) {
    return linea.getX1() == linea.getX2() || linea.getY1() == linea.getY2();
  }
  esPuntoLateral(linea, punto) {
    return punto.equals(linea.getP1()) || punto.equals(linea.getP2());
  }
  puntoDentroDeLineaCruz(lineaCruz, punto) {
    if (punto.getX() == lineaCruz.getX1()) {
      let yMenor = Math.min(lineaCruz.getY1(), lineaCruz.getY2());
      let yMayor = Math.max(lineaCruz.getY1(), lineaCruz.getY2());
      return punto.getY() >= yMenor && punto.getY() <= yMayor;
    } else if (punto.getY() == lineaCruz.getY1()) {
      let xMenor = Math.min(lineaCruz.getX1(), lineaCruz.getX2());
      let xMayor = Math.max(lineaCruz.getX1(), lineaCruz.getX2());
      return punto.getX() >= xMenor && punto.getX() <= xMayor;
    }
    return false;
  }

  lineaChoca(lineaVerificacion) {
    for (let l of MAPA.getLineasSombra()) {
      if (l.intersectaLinea(lineaVerificacion)) {
        return true;
      }
    }
    return false;
  }
  //	public boolean lineaChoca(Line2D lineaVerificacion, Line2D lineaExcepcion) {
  //		for(Rectangle r : GestorJuego.MAPA.getColisiones()) {
  //			r2d.setRect(r.x, r.y, r.width-0.0000002, r.height-0.0000002);
  //			if(r2d.intersectsLine(lineaVerificacion)) return true;
  //		}
  //		for(Line2D linea : GestorJuego.MAPA.lineasColision) {
  //			if(lineaExcepcion!=linea&&linea.intersectsLine(lineaVerificacion))  return true;
  //		}
  //
  //		return false;
  //	}
  //	public boolean lineaChoca(Line2D lineaVerificacion, ArrayList<Line2D> lineasExcepcion) {
  //		for(Rectangle r : GestorJuego.MAPA.getColisiones()) {
  //			r2d.setRect(r.x, r.y, r.width-0.0000002, r.height-0.0000002);
  //			if(r2d.intersectsLine(lineaVerificacion)) return true;
  //		}
  //		lineasColision.clear();
  //		lineasColision.addAll(GestorJuego.MAPA.lineasColision);
  //		lineasColision.removeAll(lineasExcepcion);
  //		for(Line2D linea : lineasColision) {
  //			if(linea.intersectsLine(lineaVerificacion))  return true;
  //		}
  //
  //		return false;
  //	}
  dibujar(graficos) {
    if (this.rayoPrincipalAceptado) {
      this.lineaRayoPrincipal.dibujar(graficos, "blue");
        if(this.rayoExtraAceptado){
            this.rayoNormalExtra.dibujar(graficos,"magenta");
        }
    }
  }

  getAngulo() {
    return this.anguloLineaPrincipal;
  }
  getRayoExtra() {
    return this.rayoNormalExtra;
  }
  getPuntoDestino() {
    return this.puntoDestinoPrincipal;
  }
  esRayoExtraAceptado() {
    // TODO Auto-generated method stub
    return this.rayoExtraAceptado;
  }
}
