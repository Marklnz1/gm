var canvas;
var FPS = 600;
var contadorFPS = 0;
var FPSactuales = 40;
var JUGADOR;
var MAPA;
var DATOS_TILED;
var GESTOR_MOVIL;
let CANVAS_ANCHO = 450;
let CANVAS_ALTO = 250;

window.addEventListener("resize", rotacionMovil, false);

function comenzar() {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "recursos/laboratorio.json", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let datos = JSON.parse(this.responseText);
      DATOS_TILED = new DatosTiled(datos, configurarTodo);
    }
  };
}
function configurarTodo(){
  configurarCanvas();
  configurarJuego();
}
function configurarCanvas() {
  canvas = document.getElementById("canvas");
  canvas.addEventListener("touchstart", handleStart, false);
  canvas.addEventListener("touchend", handleEnd, false);
  canvas.addEventListener("touchmove", handleMove, false);

  ctx = canvas.getContext("2d");
  let anchoCanvas = 1100;
  let altoCanvas = 620;
  canvas.width = anchoCanvas;
  canvas.height = altoCanvas;
  canvas.style.width = `${anchoCanvas / window.devicePixelRatio}px`;
  canvas.style.height = `${altoCanvas / window.devicePixelRatio}px`;
}

function configurarJuego() {
  JUGADOR = new Player(98, 378);
  MAPA = new Mapa(DATOS_TILED);
  MAPA.configuracionFinal();
  GESTOR_MOVIL = new ConfigMovil();
  setInterval(bucleJuego, 1000 / FPS);
  setInterval(() => {
    FPSactuales = contadorFPS;
    contadorFPS = 0;
  }, 1000);
}
function bucleJuego() {
  contadorFPS++;
  MAPA.actualizar();
  MAPA.dibujar(ctx);
  GESTOR_MOVIL.dibujar(ctx);
}
