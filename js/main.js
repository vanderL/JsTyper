var tempoInicial = $("#tempo").text();
var campo = $(".campo-digitado");

$(document).ready(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
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

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0 , digitado.length);

        if(digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}


$("#botao-placar").click(mostraPlacar);

function mostraPlacar() {
    $(".placar").stop().slideToggle(1000);
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
				campo.addClass("campo-desativado");
		    $("#botao-reiniciar").removeAttr("disabled");
				inserePlacar();

			}
		}, 1000);
	});
}

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Vander	";
		var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";
    var numPalavras = $("#contador-palavra").text();

		var linha = novaLinha(usuario,numPalavras);
	    linha.find(".botao-remover").click(removeLinha);

	    corpoTabela.append(linha);

			$(".placar").slideDown(500);
    	scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("body").animate(
	    {
      		scrollTop: posicaoPlacar + "px"
	    }, 1000);
}

function novaLinha(usuario,palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event){
    event.preventDefault();
		var linha = $(this).parent().parent();
		linha.fadeOut(1000);
		setTimeout(function() {
        linha.remove();
    }, 1000);
}

function reiniciaJogo() {
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-palavra").text("0");
	$("#contador-caractere").text("0");
	$("#tempo").text(tempoInicial);
	inicializaCronometro();
	campo.removeClass("campo-desativado");
	campo.removeClass("borda-vermelha");
  campo.removeClass("borda-verde");
}
