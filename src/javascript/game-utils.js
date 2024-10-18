'use strict';

import { getCurrentUser } from './user-utils.js';

export function criarGameData(rows, cols, bombs, mode, timeLimit) {
    const currentUser = getCurrentUser();
    const idPartida = incrementGameId();

    var gameData = {
        id: idPartida,
        username: currentUser.username,
        rows: rows,
        cols: cols,
        bombs: bombs,
        mode: mode,
        timeLimit: timeLimit,
        datetime: null,
        time: null,
        won: null
    };

    const games = getGames();

    setCurrentGame(gameData);
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

export function finishGame(won, time) {
    let currentGame = getCurrentGame();

    currentGame.won = won;
    currentGame.time = time;
    currentGame.datetime = new Date();
    
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