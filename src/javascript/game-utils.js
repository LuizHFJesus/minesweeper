'use strict';

import { getCurrentUser } from './user-utils.js';

var id_partida = 0;

export function criarGameData(qtdLines, qtdColumns, qtdBombs, mode, datetime, timeLimit, timeFinished) {
    console.log('iniicando criar gamedadta');

    const currentUser = getCurrentUser();

    console.log('corrent user =' + currentUser);

    id_partida++; 
    
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

    console.log('criando gaemdata' + gameData);


    const games = getGames();

    games.push(gameData);
    saveGames(games);
    setCurrentGame(gameData);


}


export function saveGames(games) {
    localStorage.setItem('games', JSON.stringify(games));
    console.log('saveGames');

}

export function setCurrentGame(game) {
    localStorage.setItem('currentGame', JSON.stringify(game));
     console.log('setCurrentGame');
}

export function getGames() {
    console.log('getGames');
    return JSON.parse(localStorage.getItem('games')) || [];
}

export function removeGameById(id) {
    let games = getGames();
    games = games.filter(game => game.id !== id);
    saveGames(games);
}
