'use strict';

import { criarGameData } from "./game-utils.js";

const startBegginerClassicGame = document.getElementById('begginer-classic');
const startBegginerRivotrilGame = document.getElementById('begginer-rivotril');
const startIntermediateClassicGame = document.getElementById('intermediate-classic');
const startIntermediateRivotrilGame = document.getElementById('intermediate-rivotril');
const startAdvancedClassicGame = document.getElementById('advanced-classic');
const startAdvancedRivotrilGame = document.getElementById('advanced-rivotril');

startBegginerClassicGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const qtdLines = 10; 
    const qtdColumns = 10; 
    const qtdBombs = 20; 
    const mode = 'normal'; 
    const datetime = new Date(); 
    const timeLimit = null; 
    const timeFinished = 0; 

    criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished);
    window.location.href = 'game.html'
});

startBegginerRivotrilGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const qtdLines = 10; 
    const qtdColumns = 10; 
    const qtdBombs = 20; 
    const mode = 'normal'; 
    const datetime = new Date(); 
    const timeLimit = 60; 
    const timeFinished = 0; 

    criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished);
    window.location.href = 'game.html'
});

startIntermediateClassicGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const qtdLines = 10; 
    const qtdColumns = 10; 
    const qtdBombs = 20; 
    const mode = 'normal'; 
    const datetime = new Date(); 
    const timeLimit = 60; 
    const timeFinished = 0; 

    criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished);
    window.location.href = 'game.html'
});

startIntermediateRivotrilGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const qtdLines = 10; 
    const qtdColumns = 10; 
    const qtdBombs = 20; 
    const mode = 'normal'; 
    const datetime = new Date(); 
    const timeLimit = 60; 
    const timeFinished = 0; 

    criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished);
    window.location.href = 'game.html'
});

startAdvancedClassicGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const qtdLines = 10; 
    const qtdColumns = 10; 
    const qtdBombs = 20; 
    const mode = 'normal'; 
    const datetime = new Date(); 
    const timeLimit = 60; 
    const timeFinished = 0; 

    criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished);
    window.location.href = 'game.html'
});

startAdvancedRivotrilGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const qtdLines = 10; 
    const qtdColumns = 10; 
    const qtdBombs = 20; 
    const mode = 'normal'; 
    const datetime = new Date(); 
    const timeLimit = 60; 
    const timeFinished = 0; 

    criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished);
    window.location.href = 'game.html'
});
