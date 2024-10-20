'use strict';

import { getCurrentUser } from './user-utils.js';

export function createGame(rows, cols, bombs, mode, timeLimit) {
    const currentUser = getCurrentUser();

    var gameData = {
        id: null,
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

    setCurrentGame(gameData);
}

export function saveGame(won, time) {
    let currentGame = getCurrentGame();

    currentGame.id = getGameId();
    currentGame.datetime = new Date();
    currentGame.time = time;
    currentGame.won = won;
    
    let games = getGames(); 
    games.push(currentGame);
    saveGames(games);
}

export function getCurrentGame() {
    return JSON.parse(localStorage.getItem('currentGame') ?? 'null');
}

function setCurrentGame(game) {
    localStorage.setItem('currentGame', JSON.stringify(game));
}

function getGames() {
    return JSON.parse(localStorage.getItem('games') ?? '[]');
}


function saveGames(games) {
    localStorage.setItem('games', JSON.stringify(games));
}

function getGameId() {
    let gameId = getNextGameId();
    localStorage.setItem('gameId', ++gameId);
    return gameId;
}

function getNextGameId() {
    let gameId = localStorage.getItem('gameId');
    return parseInt(gameId ?? -1, 10);
}