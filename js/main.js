var tempoInicial = $("#tempo").text();
var campo = $(".campo-digitado");

$(document).ready(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	$("#botao-reiniciar").click(reiniciaJogo);
})

function atualizaTamanhoFrase() {
	var frase = jQuery(".frase").text();
	var contador = frase.split(" ");
	var localFrase = $("#tamanho");
	localFrase.text(contador.length);

}

//logica do contado de caracteres e palavras
function inicializaContadores() {
	campo.on("input", function(){
		
		var conteudo = campo.val();

		var qtdPalavras = conteudo.split(/\S+/).length -1;
		$("#contador-palavra").text(qtdPalavras);

		var qtdCaracteres = conteudo.length;
		$("#contador-caractere").text(qtdCaracteres);

	});		
}	

//  logica do cronometro e fim do jogo
function inicializaCronometro() {
	
	var tempoRestante = $("#tempo").text();
	campo.one("focus", function(){
        $("#botao-reiniciar").attr("disabled",true);

		var cronometroID = setInterval(function(){
			tempoRestante--;
			$("#tempo").text(tempoRestante);
			if (tempoRestante < 1) {
				campo.attr("disabled", true);
				clearInterval(cronometroID);
		        $("#botao-reiniciar").removeAttr("disabled");

			}
		}, 1000);
	});
}

function reiniciaJogo() {
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-palavra").text("0");
	$("#contador-caractere").text("0");
	$("#tempo").text(tempoInicial);
	inicializaCronometro();
}