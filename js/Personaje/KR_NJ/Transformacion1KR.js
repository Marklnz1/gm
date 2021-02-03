class Transformacion1KR extends TransPersonaje {
  constructor(kr, tiempoDescanso, condiciones) {
    super(1, tiempoDescanso, kr);

	this.addEstado(new EstadoAcelerar(kr));
    let estadoQuieto = new EstadoJugador(
      "quieto",
      "basico",
      kr,
      condiciones.movimientoInactivo
    );
    estadoQuieto.addAnimador(getAnimacion("KR_transformacion1_quieto"));
    this.addEstado(estadoQuieto);

    let estadoMoviendose = new EstadoJugador(
      "moviendose",
      "basico",
      kr,
      condiciones.movimientoActivo
    );
    estadoMoviendose.addAnimador(getAnimacion("KR_transformacion1_moviendose"));
    estadoMoviendose.setVelocidad(3);
    this.addEstado(estadoMoviendose);

	this.addEstado(new EstadoEscape(kr, condiciones.huir));
	this.addEstado(new EstadoEmbestida(kr));
  }
}

class EstadoEscape extends EstadoJugador {
  temporizador = new Temporizador(60);
  constructor(kr, condicion) {
    super("escape", "defensa", kr, condicion, 0);
    this.addAnimador(getAnimacion("KR_T2_MOV"));
    this.setVelocidad(6);
  }
  accionInicial() {
    super.accionInicial();
    this.bloquear();
    this.criatura.mb.getBuscadorRuta().alejarse = true;
  }
  actualizar() {
    this.temporizador.actualizar();
    if (
      this.temporizador.tiempoCumplido() ||
      !this.criatura.mb.posibleMovimiento()
    ) {
      this.desbloquear();
      this.criatura.mb.getBuscadorRuta().alejarse = false;
      this.temporizador.setTiempoMaximo(random(30, 75));
      this.temporizador.reiniciar();
    }
  }
}
class EstadoEmbestida extends EstadoJugador {
  areaAtaque;
  distanciaT;

  constructor(kr) {
    super("embestida", "ataque", kr, null, 120);
   
    this.areaAtaque = new RectanguloHelice(kr, 32*2, 12* 32);
    this.cdActivacion = () =>{
		return this.areaAtaque.intersecta(kr.objetivo.getColision())
	}
	
	this.addAnimador(getAnimacion("KR_T3"));
	this.setVelocidad(10);
  }

  accionInicial() {
	super.accionInicial();
    this.bloquear();
    this.criatura.mb.recorrerCaminoBacteria(
      MAPA.mapaBacteria.crearCaminoBacteria(
        this.criatura.getBacteria(),
        14,
        this.criatura.getDireccion()
      )
    );
  }
  actualizar(){
	  if(!this.criatura.mb.solicitudRecorrer){
		  this.desbloquear();
	  }
  }
  dibujar(posX, posY, graficos) {
	  super.dibujar(posX,posY,graficos);
		this.areaAtaque.dibujar(graficos);
	}
}

class EstadoAcelerar extends EstadoJugador{
	constructor(kr){
		super("acelerar","basico",kr,null,0);
		this.cdActivacion = ()=> this.semiDistanciaObjetivo()>2**2;
		this.setVelocidad(5);
		this.addAnimador(getAnimacion("KR_T2_MOV"))
	}
	semiDistanciaObjetivo(){
		let bObjetivo = this.criatura.objetivo.getBacteria();
		let bCriatura = this.criatura.getBacteria();
		let dx = bObjetivo.getXtile()-bCriatura.getXtile();
		let dy = bObjetivo.getYtile()-bCriatura.getYtile();

		return dx*dx+dy*dy;
	}
}
