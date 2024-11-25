'use strict';

const gameHistoryBody = document.getElementById('game-history');

document.addEventListener('DOMContentLoaded', async function() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        alert('Você precisa estar logado para acessar essa página!');
        window.location.href = '../../index.html';
    }

    
    const games = await getGames(currentUser.username);

    for (let game of games) {
        const isClassicMode = game.mode == "classico"

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${game.rows}x${game.cols}</td>
            <td>${game.bombs}</td>
            <td>${(isClassicMode) ? "Clássico" : "Rivotril"}</td>
            <td>${`${game.time}${(!isClassicMode) ? `/${game.timeLimit}` : ''}`}</td>
            <td>${game.datetime}</td>
            <td>${game.won ? 'Ganhou' : 'Perdeu'}</td>
        `;

        gameHistoryBody.appendChild(tr);
    }
});