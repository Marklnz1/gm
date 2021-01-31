let listaMapa = new Map();
function teclaPresionada(tecla){
    return listaMapa.get(tecla.toLowerCase())||false;
}
    document.addEventListener("keydown", function (tecla) {
    listaMapa.set(tecla.key.toLowerCase(),true);
  });
  
  document.addEventListener("keyup", function (tecla) {
    listaMapa.set(tecla.key.toLowerCase(),false);
  });
  //-------------------------------------------------------
  