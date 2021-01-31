
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
