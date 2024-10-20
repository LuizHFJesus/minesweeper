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

    if (rows < 3 || rows > 50) {
        alert('Por favor, insira um numero de linhas que seja superior ou igual a 3 e inferior ou igual a 50!');
        return;
    }

    if (cols < 3 || cols > 50) {
        alert('Por favor, insira um numero de colunas que seja superior ou igual a 3 e inferior ou igual a 50!');
        return;
    }

    if (bombs > ((cols*rows)+1)) {
        alert('Por favor, insira um numero de bombas inferiro ao numero de celulas no jogo!');
        return;
    }

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

    if (rows < 3 || rows > 50) {
        alert('Por favor, insira um numero de linhas que seja superior ou igual a 3 e inferior ou igual a 50!');
        return;
    }

    if (cols < 3 || cols > 50) {
        alert('Por favor, insira um numero de colunas que seja superior ou igual a 3 e inferior ou igual a 50!');
        return;
    }

    if (bombs > cols*rows) {
        alert('Por favor, insira um numero de bombas inferiro ao numero de celulas no jogo!');
        return;
    }

    if (rows > 40 && cols > 40) {
        timeLimit = 120;
        return;
    } else {
        timeLimit = 60;
    }

    createGame(rows, cols, bombs, mode, timeLimit);
    window.location.href = 'game.html'
});