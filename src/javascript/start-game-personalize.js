'use strict';

import { createGame } from "./game-data-utils.js";

const startPersonalizedClassicGame = document.getElementById('personalized-classic');
const startPersonalizedRivotrilGame = document.getElementById('personalized-rivotril');

const gamePersonalizeForm = document.getElementById('game-personalize');

startPersonalizedClassicGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const rows = Number(gamePersonalizeForm.row.value.trim());
    const cols = Number(gamePersonalizeForm.column.value.trim());
    const bombs = Number(gamePersonalizeForm.bomb.value.trim()); 
    const mode = 'classico'; 
    const timeLimit = null; 

    const confirmStart = shouldStartGamePersonalize(bombs, rows, cols);
    if (!confirmStart) return;

    createGame(rows, cols, bombs, mode, timeLimit);
    window.location.href = 'game.html'
});

startPersonalizedRivotrilGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const rows = Number(gamePersonalizeForm.row.value.trim());
    const cols = Number(gamePersonalizeForm.column.value.trim());
    const bombs = Number(gamePersonalizeForm.bomb.value.trim()); 
    const mode = 'rivotril'; 
    let timeLimit = null;

    const confirmStart = shouldStartGamePersonalize(bombs, rows, cols);
    if (!confirmStart) return;

    // TODO: Implement new rule for time limit calculation
    timeLimit = parseInt(5 * ((rows*cols) ** 1.1) / (bombs ** 0.9));

    createGame(rows, cols, bombs, mode, timeLimit);
    window.location.href = 'game.html'
});

function shouldStartGamePersonalize (bombs, rows, cols) {
    if (bombs == 0 || rows == 0 || cols == 0) {
        alert('Por favor, insira valores em todos os campos solicitados!');
        return false;
    }

    if (bombs > ((cols*rows)+1)) {
        alert('Por favor, insira um numero de bombas inferiro ao numero de celulas no jogo!');
        return false;
    }

    if (rows > 50 || cols > 50) {
        const confirmStart = window.confirm("É recomendado jogar em tabuleiros com numero de linhas e colunas de no máximo 50! \n\nAcima desses valores podem ocorrer erros inesperados devido a limitações de processamento.");
        if (!confirmStart) return false;
    }

    if (rows < 3 || cols < 3) {
        const confirmStart = window.confirm("É recomendado jogar em tabuleiros com numero de linhas e colunas de no mínimo 3! \n\nAbaixo desses valores o jogo pode se tornar muito simples ou limitado para partidas.");
        if (!confirmStart) return false;
    }

    if ((bombs/(rows*cols)) < 0.10 || (bombs/(rows*cols)) > 0.20) {
        const confirmStart = window.confirm(`É recomendado que a razão entre células e bombas deve ficar entre 10% e 20%, em um tabuleiro como esse, entre ${parseInt((rows*cols)*0.10)} e ${parseInt((rows*cols)*0.20)} bombas!\n\nCom razões muito baixas ou muito altas o jogo pode se tornar muito limitado ou frustrante.`);
        if (!confirmStart) return false;
    }
    return true;
}