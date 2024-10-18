'use strict';

import { criarGameData } from "./game-utils.js";

const startPersonalizedClassicGame = document.getElementById('personalized-classic');
const startPersonalizedRivotrilGame = document.getElementById('personalized-rivotril');

const gamePersonalizeForm = document.getElementById('game-personalize');

startPersonalizedClassicGame.addEventListener('click', (event) => {
  event.preventDefault(); 

        const qtdLines = gamePersonalizeForm.row.value.trim();
        const qtdColumns = gamePersonalizeForm.column.value.trim();
        const qtdBombs = gamePersonalizeForm.bomb.value.trim(); 
        const mode = 'classico'; 
        const datetime = new Date(); 
        const timeLimit = null; 
        const timeFinished = 0; 

    if (qtdLines < 3 || qtdLines > 50) {
        alert('Por favor, insira um numero de linhas que seja superior ou igual a 3 e inferior ou igual a 50!');
        return;
    }

    if (qtdColumns < 3 || qtdColumns > 50) {
        alert('Por favor, insira um numero de colunas que seja superior ou igual a 3 e inferior ou igual a 50!');
        return;
    }

    if (qtdBombs > ((qtdColumns*qtdLines)+1)) {
        alert('Por favor, insira um numero de bombas inferiro ao numero de celulas no jogo!');
        return;
    }

    criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished);
    window.location.href = 'game.html'
});

startPersonalizedRivotrilGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const qtdLines = gamePersonalizeForm.row.value.trim();
    const qtdColumns = gamePersonalizeForm.column.value.trim();
    const qtdBombs = gamePersonalizeForm.bomb.value.trim(); 
    const mode = 'rivotril'; 
    const datetime = new Date(); 
    let timeLimit = null; 
    const timeFinished = 0; 

if (qtdLines < 3 || qtdLines > 50) {
    alert('Por favor, insira um numero de linhas que seja superior ou igual a 3 e inferior ou igual a 50!');
    return;
}

if (qtdColumns < 3 || qtdColumns > 50) {
    alert('Por favor, insira um numero de colunas que seja superior ou igual a 3 e inferior ou igual a 50!');
    return;
}

if (qtdBombs > qtdColumns*qtdLines) {
    alert('Por favor, insira um numero de bombas inferiro ao numero de celulas no jogo!');
    return;
}

if (qtdLines > 40 && qtdColumns > 40) {
    timeLimit = 120;
    return;
} else {
    timeLimit = 60;
}

criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished);
window.location.href = 'game.html'
});