var animaciones = new Map();
function getAnimacion(nombre) {
    return animaciones.get(nombre);
}

function cargarAnimaciones() {
  let animacion = new Animador(getHojaSprites("Jugador"), 7);
  animacion.setAnimacion(2, [1, 2, 3, 4]);
  animacion.setAnimacion(6, [5, 6, 7, 8]);
  animacion.setAnimacion(0, [1, 2, 3, 4]);
  animacion.setAnimacion(4, [1, 2, 3, 4]);
  animaciones.set("JG_MOV", animacion);
  //=========ANIMACIONES KORO ===========================
  let transformacion1_quieto = new Animador(getHojaSprites("KR_hjBasico"), 12);
  transformacion1_quieto.setAnimacion(2, [2]);
  transformacion1_quieto.setAnimacion(6, [3]);
  transformacion1_quieto.setAnimacion(0, [1]);
  transformacion1_quieto.setAnimacion(4, [0]);
  animaciones.set("KR_transformacion1_quieto", transformacion1_quieto);
  let transformacion1_moviendose = new Animador(
    getHojaSprites("KR_hjBasico"),
    8
  );
  transformacion1_moviendose.setAnimacion(2, [6, 2, 10, 2]);
  transformacion1_moviendose.setAnimacion(6, [7, 3, 11, 3]);
  transformacion1_moviendose.setAnimacion(0, [5, 1, 9, 1]);
  transformacion1_moviendose.setAnimacion(4, [4, 0, 8, 0]);
  animaciones.set("KR_transformacion1_moviendose", transformacion1_moviendose);
}
