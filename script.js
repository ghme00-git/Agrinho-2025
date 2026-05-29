// Estado do Jogo
let producao = 0;
let sustentabilidade = 100;
let saudeSolo = 100;
let nivelAgua = 50; 
let temperatura = 24;
let crescimentoTomate = 0; // 0 a 100%

// Elementos do DOM
const htmlProducao = document.getElementById('score-producao');
const barSustentabilidade = document.getElementById('bar-sustentabilidade');
const txtSustentabilidade = document.getElementById('txt-sustentabilidade');
const barSolo = document.getElementById('bar-solo');
const txtSolo = document.getElementById('txt-solo');
const htmlPlanta = document.getElementById('tomato-plant');
const statusAgua = document.getElementById('status-agua');
const statusTemp = document.getElementById('status-temp');
const feedback = document.getElementById('feedback-mensagem');

// Loop Principal do Jogo (Roda a cada 1.5 segundos)
const gameLoop = setInterval(() => {
    // Recursos decrescem naturalmente com o tempo
    nivelAgua -= 3;
    temperatura += (Math.random() > 0.5 ? 1 : -1); // Oscilação natural

    // Lógica de crescimento baseada no equilíbrio
    if (nivelAgua > 20 && nivelAgua < 80 && temperatura >= 20 && temperatura <= 30 && saudeSolo > 10) {
        crescimentoTomate += 5;
        feedback.innerText = "Condições ideais! O tomateiro está crescendo de forma saudável.";
    } else {
        crescimentoTomate -= 2;
        feedback.innerText = "Alerta! Ajuste os parâmetros da estufa para a planta não murchar.";
    }

    // Trava valores entre 0 e 100
    crescimentoTomate = Math.max(0, Math.min(100, crescimentoTomate));
    nivelAgua = Math.max(0, nivelAgua);
    sustentabilidade = Math.max(0, Math.min(100, sustentabilidade));
    saudeSolo = Math.max(0, Math.min(100, saudeSolo));

    atualizarVisual();
    verificarCicloVida();
    verificarFimDeJogo();
}, 1500);

function atualizarVisual() {
    // Atualiza textos e barras
    htmlProducao.innerText = producao;
    
    barSustentabilidade.style.width = sustentabilidade + '%';
    txtSustentabilidade.innerText = sustentabilidade + '%';
    
    barSolo.style.width = saudeSolo + '%';
    txtSolo.innerText = saudeSolo + '%';

    statusAgua.innerText = `Água: ${nivelAgua}%`;
    statusTemp.innerText = `Temp: ${temperatura}°C`;

    // Muda o emoji baseado no crescimento
    if (crescimentoTomate < 30) {
        htmlPlanta.innerText = "🌱";
        htmlPlanta.className = "plant stage-1";
    } else if (crescimentoTomate < 75) {
        htmlPlanta.innerText = "🌿";
        htmlPlanta.className = "plant stage-2";
    } else {
        htmlPlanta.innerText = "🍅";
        htmlPlanta.className = "plant stage-3";
    }
}

function verificarCicloVida() {
    // Se atingir 100%, colhe e pontua
    if (crescimentoTomate >= 100) {
        producao += 10;
        crescimentoTomate = 0; // Reinicia o ciclo
        sustentabilidade += 5; // Boa colheita aumenta o score sustentável
        feedback.innerText = "Parabéns! Você colheu tomates de qualidade e abasteceu o mercado!";
    }
}

// Ações do Jogador
function regar() {
    nivelAgua += 25;
    if (nivelAgua > 80) {
        sustentabilidade -= 5; // Desperdício de água prejudica o meio ambiente
        feedback.innerText = "Cuidado! Água em excesso gera desperdício de recursos hídricos.";
    } else {
        feedback.innerText = "Irrigação de precisão acionada com sucesso!";
    }
    atualizarVisual();
}

function fertilizarOrganico() {
    saudeSolo += 15;
    sustentabilidade += 5;
    crescimentoTomate += 2;
    feedback.innerText = "Adubo orgânico aplicado! Solo enriquecido e meio ambiente protegido.";
    atualizarVisual();
}

function fertilizarQuimico() {
    crescimentoTomate += 20; // Cresce muito rápido
    saudeSolo -= 20;         // Mas destrói a saúde do solo
    sustentabilidade -= 15;  // Prejudica a pegada ecológica
    feedback.innerText = "Fertilizante químico acelerou a produção, mas degradou o solo!";
    atualizarVisual();
}

function ajustarTemperatura() {
    temperatura = 24; // Reseta para a temperatura ideal
    feedback.innerText = "Climatização da estufa regulada para 24°C (Gasto energético moderado).";
    atualizarVisual();
}

function verificarFimDeJogo() {
    if (sustentabilidade <= 0 || saudeSolo <= 0) {
        clearInterval(gameLoop);
        feedback.style.backgroundColor = "#ffcdd2";
        feedback.style.borderLeftColor = "#d32f2f";
        
        if (saudeSolo <= 0) {
            feedback.innerHTML = `<strong>Fim de Jogo!</strong> O solo ficou completamente infértil devido ao excesso de químicos.`;
        } else {
            feedback.innerHTML = `<strong>Fim de Jogo!</strong> Seus níveis de sustentabilidade zeraram. O ecossistema ao redor faliu.`;
        }
    }
}