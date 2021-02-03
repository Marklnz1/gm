class BuscadorRuta {
  criatura;
  tmpCambiarDir;
  alejarse = false;
  posiblesBacterias = [];
  constructor(criatura) {
    this.criatura = criatura;
    this.tmpCambiarDir = new Temporizador();
  }
  actualizarTemporizadores() {
    this.tmpCambiarDir.actualizar();
  }
  calcularNuevaRuta(bAnterior) {
    let bObjetivo = this.criatura.objetivo.getBacteria();
    let bCriatura = this.criatura.getBacteria();
    if (!this.alejarse && bCriatura.bloqueT !== bObjetivo.bloqueT) {
      let proxPeso = this.criatura.getPeso() + (this.alejarse ? 1 : -1);
      let capaDeObjetivo = this.criatura.getCapaParasitoObjetivo();
      let bqActual = bCriatura.bloqueT;
      for (let i = 0; i < 8; i += 2) {
        let bqVecino = bqActual.getVecino(i);
        if (bqVecino == null) continue;
        if (capaDeObjetivo.getPeso(bqVecino) === proxPeso) {
          return this.criatura.getBacteria().getVecino(i);
        }
      }
    } else {
      let bRuta = this.getProxBacteria();
      let vaEnMismaDireccion =
        bCriatura.dirVecinoInt(bRuta) === this.criatura.getDireccion();
      if (!vaEnMismaDireccion) {
        this.tmpCambiarDir.reiniciar();
        this.tmpCambiarDir.setTiempoMaximo(random(20, 60));
      }
      return bRuta;
    } 
  }
  getProxBacteria() {
    let bObjetivo = this.criatura.objetivo.getBacteria();
    let bCriatura = this.criatura.getBacteria();
    this.posiblesBacterias.length = 0;
    for (let i = 0; i < 8; i += 2) {
      let bVecina = bCriatura.getVecino(i);
      if (bVecina == null) continue;
      let esBacteriaLejana = this.estaMasLejos(bObjetivo, bCriatura, bVecina);
      if (
        (this.alejarse && esBacteriaLejana) ||
        (!this.alejarse && !esBacteriaLejana)
      ) {
        this.posiblesBacterias.push(bVecina);
      }
    }
    //==============
    if (this.posiblesBacterias.length === 1) return this.posiblesBacterias[0];
    let bDireccionada = this.calcularBacteriaDireccionada();
    let cambiarDireccion =
      this.tmpCambiarDir.tiempoCumplido() || bObjetivo === bCriatura;

    if (cambiarDireccion || bDireccionada == null) {
      if (bDireccionada != null) {
        removeItemFromArr(this.posiblesBacterias, bDireccionada);
        if (this.posiblesBacterias.length === 1)
          return this.posiblesBacterias[0];
      }
      return this.posiblesBacterias[
        random(0, this.posiblesBacterias.length - 1)
      ];
    }
    return bDireccionada;
  }
  calcularBacteriaDireccionada() {
    //BUSCA LA BACTERIA RUTA QUE MANTENGA LA DIRECCION DE MOVIMIENTO ACTUAL
    for (let b of this.posiblesBacterias) {
      let drcPosibleBacteria = this.criatura.getBacteria().dirVecinoInt(b);
      if (drcPosibleBacteria === this.criatura.getDireccion()) {
        return b;
      }
    }
  }
  existeUnaProximaRuta() {
    let bCriatura = this.criatura.getBacteria();
    let bObjetivo = this.criatura.objetivo.getBacteria();
    if (this.alejarse) {
      for (let i = 0; i < 8; i += 2) {
        let bVecina = bCriatura.getVecino(i);
        if (bVecina == null) continue;
        if (this.estaMasLejos(bObjetivo, bCriatura, bVecina)) {
          return true;
        }
      }
      return false;
    }
    return bCriatura.bloqueT !== bObjetivo.bloqueT || bCriatura !== bObjetivo;
  }

  estaMasLejos(bObjetivo, bActual, bDestino) {
    let semiModuloActual =
      (bActual.getXtile() - bObjetivo.getXtile()) ** 2 +
      (bActual.getYtile() - bObjetivo.getYtile()) ** 2;
    let semiModuloDestino =
      (bDestino.getXtile() - bObjetivo.getXtile()) ** 2 +
      (bDestino.getYtile() - bObjetivo.getYtile()) ** 2;
    return semiModuloDestino > semiModuloActual;
  }
}
