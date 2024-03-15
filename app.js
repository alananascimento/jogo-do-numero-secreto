let listaDeNumerosSorteados = [];
let numeroLimite = 3;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");
}
exibirMensagemInicial();


function verificarChute() {
    console.log(numeroSecreto);
    let chute = document.querySelector("input").value;

    if(chute == numeroSecreto){
        exibirTextoNaTela("h1", "Você acertou!");
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabêns você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela("h1", "Você errou :(");
            exibirTextoNaTela("p", "O número secreto é MENOR que o seu chute!");
        } else {
            exibirTextoNaTela("h1", "Você errou :(");
            exibirTextoNaTela("p", "O número secreto é MAIOR que o seu chute!");  
        }
        // tentativas++; e limparCampo(); estão dentro do else, só conta sem entrar nessa condição (else)
        tentativas++;
        limparCampo();
    } 
}
//verificarChute();

function limparCampo() {
    let chute = document.querySelector("input");
    chute.value = '';
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    exibirMensagemInicial();
    tentativas = 1;
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}


