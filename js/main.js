var frase = jQuery(".frase").text();
var contador = frase.split(" ");

var localFrase = $("#tamanho");
localFrase.text(contador.length);
console.log(localFrase);