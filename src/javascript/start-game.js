'use strict';

const startBegginerClassicGame = document.getElementById('begginer-classic');
const startBegginerRivotrilGame = document.getElementById('begginer-rivotril');
const startIntermediateClassicGame = document.getElementById('intermediate-classic');
const startIntermediateRivotrilGame = document.getElementById('intermediate-rivotril');
const startAdvancedClassicGame = document.getElementById('advanced-classic');
const startAdvancedRivotrilGame = document.getElementById('advanced-rivotril');

const currentUser = getCurrentUser();

startBegginerClassicGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const rows = 8; 
    const cols = 10; 
    const bombs = 10; 
    const mode = 'classico'; 
    const timeLimit = null; 

    createGame(currentUser.username, rows, cols, bombs, mode, timeLimit);
    window.location.href = 'game.html'
});

startBegginerRivotrilGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const rows = 8; 
    const cols = 10; 
    const bombs = 10; 
    const mode = 'rivotril'; 
    const timeLimit = 60; 

    createGame(currentUser.username, rows, cols, bombs, mode, timeLimit);
    window.location.href = 'game.html'
});

startIntermediateClassicGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const rows = 15; 
    const cols = 20; 
    const bombs = 40; 
    const mode = 'classico'; 
    const timeLimit = null; 

    createGame(currentUser.username, rows, cols, bombs, mode, timeLimit);
    window.location.href = 'game.html'
});

startIntermediateRivotrilGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const rows = 15; 
    const cols = 20; 
    const bombs = 40;  
    const mode = 'rivotril'; 
    const timeLimit = 300; 

    createGame(currentUser.username, rows, cols, bombs, mode, timeLimit);
    window.location.href = 'game.html'
});

startAdvancedClassicGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const rows = 20; 
    const cols = 25; 
    const bombs = 100; 
    const mode = 'classico'; 
    const timeLimit = null; 

    createGame(currentUser.username, rows, cols, bombs, mode, timeLimit);
    window.location.href = 'game.html'
});

startAdvancedRivotrilGame.addEventListener('click', (event) => {
    event.preventDefault(); 

    const rows = 20; 
    const cols = 25; 
    const bombs = 100; 
    const mode = 'rivotril'; 
    const timeLimit = 900; 

    createGame(currentUser.username, rows, cols, bombs, mode, timeLimit);
    window.location.href = 'game.html'
});
