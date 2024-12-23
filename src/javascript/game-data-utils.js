'use strict';

function createGame(username, rows, cols, bombs, mode, timeLimit) {
    var gameData = {
        username: username,
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

function saveGame(won, time) {
    let currentGame = getCurrentGame();

    currentGame.datetime = formatDate(new Date());
    currentGame.time = time;
    currentGame.won = won;
    
    let games = getGames(); 
    games.push(currentGame);
    saveGames(games);
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

function getGames() {
    return JSON.parse(localStorage.getItem('games') ?? '[]');
}

function saveGames(games) {
    localStorage.setItem('games', JSON.stringify(games));
}

function getGamesByUsername(username) {
    return getGames().filter(game => game.username === username).reverse();
}

function getGamesRanking(mode) {
    return getGames()
        .filter(game => game.mode === mode && ((game.bombs/(game.rows*game.cols)) >= 0.10) && game.won)
        .sort((a, b) => (a.rows*a.cols) - (b.rows*b.cols))
        .sort((a, b) => a.bombs - b.bombs)
        .sort((a, b) => {
            if (mode == "classico") {
                return a.time - b.time;
            } else {
                return b.time + a.time;
            }
        })
        .slice(0, 10);
}

// TODO: Move this function to another file
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}