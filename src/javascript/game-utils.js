'use strict';

import { getCurrentUser } from './user-utils.js';

export function criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished) {

    const currentUser = getCurrentUser();

    const id_partida = incrementGameId();

    var gameData = {
        id: id_partida,
        username: currentUser.username,
        qtdLines: qtdLines,
        qtdColumns: qtdColumns,
        qtdBombs: qtdBombs,
        mode: mode,
        datetime: datetime,
        timeLimit: timeLimit,
        timeFinished: timeFinished
    };

    const games = getGames();

    setCurrentGame(gameData);
    finalizarJogo(55); //mover para o lugar certo depois
}

export function saveGames(games) {
    localStorage.setItem('games', JSON.stringify(games));
}

export function setCurrentGame(game) {
    localStorage.setItem('currentGame', JSON.stringify(game));
}

export function getCurrentGame() {
    const currentGame = localStorage.getItem('currentGame');
    
    if (currentGame) {
        return JSON.parse(currentGame);
    } else {
        return null;  
    }
}

export function getGames() {
    const games = localStorage.getItem('games');
    
    if (games) {
        return JSON.parse(games);
    } else {
        return [];
    }
}

export function removeGameById(id) {
    let games = getGames();
    games = games.filter(game => game.id !== id);
    saveGames(games);
}

export function finalizarJogo(timeFinished) {
    let currentGame = getCurrentGame();
    
    currentGame.timeFinished = timeFinished;
    
    let games = getGames(); 
    games.push(currentGame);
    saveGames(games);
}

function getNextGameId() {
    let id_partida = localStorage.getItem('id_partida');
    if (!id_partida) {
        id_partida = 0;
    }
    return parseInt(id_partida, 10);
}

function incrementGameId() {
    let id_partida = getNextGameId();
    id_partida++;
    localStorage.setItem('id_partida', id_partida);
    return id_partida;
}