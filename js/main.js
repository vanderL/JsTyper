//logica do contado de caracteres e palavras

var frase = jQuery(".frase").text();
var contador = frase.split(" ");
var localFrase = $("#tamanho");
localFrase.text(contador.length);

var campo = $(".campo-digitado");
	campo.on("input", function(){
		
		var conteudo = campo.val();

		var qtdPalavras = conteudo.split(/\S+/).length -1;
		$("#contador-palavra").text(qtdPalavras);

		var qtdCaracteres = conteudo.length;
		$("#contador-caractere").text(qtdCaracteres);

	});

//  logica do cronometro
var tempoRestante = $("#tempo").text();
campo.one("focus", function(){
	var cronometroID = setInterval(function(){
		tempoRestante--;
		console.log(tempoRestante);
		$("#tempo").text(tempoRestante);
		if (tempoRestante < 1) {
			campo.attr("disabled", true);
			clearInterval(cronometroID);
		}
	}, 1000);
});