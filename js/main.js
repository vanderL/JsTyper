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

	})