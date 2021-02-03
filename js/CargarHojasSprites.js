
var hojas = new Map();
let hojasEspera = [];

function cargarHojasSprites(funcionRetorno) {
  let cargadorHojas = new CargadorLista(hojasEspera.length, funcionRetorno);
  let funcionReporte = cargadorHojas.funcionReportarItem;
  let hjCreada;
  for (let h of hojasEspera) {
    hjCreada = new HojaSprites(h.direccion, h.ancho, h.alto, funcionReporte);
    hojas.set(h.nombre,hjCreada);
  }
}
function agregarHojaSprites(nombre, direccion, ancho, alto) {
    hojasEspera.push({ nombre, direccion, ancho, alto });
}
function getHojaSprites(nombre) {
    return hojas.get(nombre);
}

function agregarHojasSprites(){
    agregarHojaSprites("KR_hjBasico", "recursos/1.png", 64, 64);
    agregarHojaSprites("Jugador", "recursos/jugador2.png", 64, 64);
    agregarHojaSprites("KR_T2","recursos/3.png",64,64);
    agregarHojaSprites("KR_T3","recursos/4.png",64,64);
}


