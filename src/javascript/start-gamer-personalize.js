'use strict';

import { criarGameData } from "./game-utils";

const startPersonalizedClassicGame = document.getElementById('personalized-classic');
const startPersonalizedRivotrilGame = document.getElementById('personalized-rivotril');

startPersonalizedClassicGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const qtdLines = 10; 
    const qtdColumns = 10; 
    const qtdBombs = 20; 
    const mode = 'normal'; 
    const datetime = new Date(); 
    const timeLimit = 60; 
    const timeFinished = 0; 

    criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished);
});

startPersonalizedRivotrilGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const qtdLines = 10; 
    const qtdColumns = 10; 
    const qtdBombs = 20; 
    const mode = 'normal'; 
    const datetime = new Date(); 
    const timeLimit = 60; 
    const timeFinished = 0; 

    criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished);
});