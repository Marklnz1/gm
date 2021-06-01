
var removeItemFromArr = (arr, item) => {
  let i = arr.indexOf(item);
  i !== -1 && arr.splice(i, 1);
};
var removeArrFromArr = (arr, arrRemove) => {
  for (let itemRemove of arrRemove) {
    removeItemFromArr(arr, itemRemove);
  }
};
function imageData_to_image(imagedata) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = imagedata.width;
  canvas.height = imagedata.height;
  ctx.putImageData(imagedata, 0, 0);

  let image = new Image();
  image.src = canvas.toDataURL();

  return image;
}
function toRadians(angulo) {
  return ((Math.PI * 2) / 360) * angulo;
}
function toDegrees(radianes) {
  return (360 / (Math.PI * 2)) * radianes;
}
function random(min, max) {
  return parseInt(min + Math.random() * (max - min + 1));
}
function dibujarTexto(texto, x, y, graficos) {
  graficos.font = "bold 13px Verdana";
  graficos.fillStyle = "red";
  graficos.fillText(texto, x, y);
}

 function createImage(width, height) {
  let c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  c.ctx = c.getContext("2d");
  return c;
}
function cargarImagen(url){
  return new Promise( (resolve, reject) => {
      var image = new Image()
      image.src = url
      image.onload = () => resolve(image)
      image.onerror = () => reject(new Error('could not load image'))
  })
}  

function rotateAndPaintImage ( context, image, angle , positionX, positionY, axisX, axisY ) {
  let angleInRad = Math.PI/180*angle;
  context.translate( positionX, positionY );
  context.rotate( angleInRad );
  context.drawImage( image, -axisX, -axisY );
  context.rotate( -angleInRad );
  context.translate( -positionX, -positionY );
}

  function dibujarImagenCentrada(imagen,posX,posY,angulo,graficos) {
    let mitadAncho = parseInt(imagen.width/2);
    let mitadAlto = parseInt(imagen.height/2);
    let anguloRad = toRadians(angulo);
    graficos.translate(posX,posY);

    graficos.rotate(-anguloRad);
    graficos.translate(-mitadAncho, -mitadAlto);
    
    graficos.drawImage(imagen, 0,0);
    graficos.translate(mitadAncho, mitadAlto);
    graficos.rotate(anguloRad);
    graficos.translate(-posX,-posY);
   
}