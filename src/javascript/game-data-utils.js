'use strict';

const SAVE_GAME = 'SAVE_GAME';
const GET_GAMES_BY_USERNAME = 'GET_GAMES_BY_USERNAME';
const GET_GAMES_RANKING_BY_MODE = 'GET_GAMES_RANKING_BY_MODE';

async function _ajaxRequest(action, data = {}) {
    data.action = action;

    const response = await fetch('http://localhost/minesweeper/src/php/game_storage.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data),
    });

    return response.json();
}

function createGame(username, rows, cols, bombs, mode, timeLimit) {
    var gameData = {
        username: username,
        rows: rows,
        cols: cols,
        bombs: bombs,
        mode: mode,
        timeLimit: timeLimit,
        time: null,
        won: null
    };

    setCurrentGame(gameData);
}

function getCurrentGame() {
    return JSON.parse(localStorage.getItem('currentGame') ?? 'null');
}

function removeCurrentGame() {
    localStorage.removeItem('currentGame');
}

function setCurrentGame(game) {
    localStorage.setItem('currentGame', JSON.stringify(game));
}

function saveGame(won, time) {
    let currentGame = getCurrentGame();

    currentGame.time = time;
    currentGame.won = won;   

    _ajaxRequest(SAVE_GAME, { game: JSON.stringify(currentGame) });
}

async function getGames(username) {
    console.log("getGames=", username);
    const response = await _ajaxRequest(GET_GAMES_BY_USERNAME, { username });
    console.log("response=", response);
    return response.games || [];
}

async function getGamesRanking(mode) {
    const response = await _ajaxRequest(GET_GAMES_RANKING_BY_MODE, { mode });
    return response.games || [];
}