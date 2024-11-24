'use strict';

const GET_GAMES = 'GET_GAMES';
const SAVE_GAMES = 'SAVE_GAMES';
const ADD_GAME = 'ADD_GAME';
const FIND_GAMES_BY_USERNAME = 'FIND_GAMES_BY_USERNAME';



async function ajaxRequest(action, data = {}) {
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
        datetime: null,
        time: null,
        won: null
    };

    setCurrentGame(gameData);
}
const GameStorage = {
    async getGames() {
        const response = await ajaxRequest(GET_GAMES);
        return response.games || [];
    },
    async saveGames(games) {
        await ajaxRequest(SAVE_GAMES, { games: JSON.stringify(games) });
    },
    async addGame(game) {
        let games = await this.getGames();
        games.push(game);
        await this.saveGames(games);
    },
    async findGamesByUsername(username) {
        const response = await ajaxRequest(FIND_GAMES_BY_USERNAME, { username });
        return response.games || [];
    }
};


async function saveGame(won, time) {
    let currentGame = getCurrentGame();

    currentGame.datetime = formatDate(new Date());
    currentGame.time = time;
    currentGame.won = won;   

    try {
        await GameStorage.addGame(currentGame);
        console.log('Jogo salvo com sucesso no servidor!');
    } catch (error) {
        console.error('Erro ao salvar o jogo no servidor:', error);
    }
}


function getCurrentGame() {
    return JSON.parse(localStorage.getItem('currentGame') ?? 'null');
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