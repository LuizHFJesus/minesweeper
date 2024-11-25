'use strict';
const classicRankingBody = document.getElementById('classic-ranking');
const rivotrilRankingBody = document.getElementById('rivotril-ranking');

document.addEventListener('DOMContentLoaded', async function() {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        alert('Você precisa estar logado para acessar essa página!');
        window.location.href = '../../index.html';
    }

    const classicRankingGames = await getGamesRanking("classico");
    let position = 1;
    for (let game of classicRankingGames) {
        const isClassicMode = game.mode == "classico"

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${position++}</td>
            <td>${game.username}</td>
            <td>${game.rows}x${game.cols}</td>
            <td>${game.bombs}</td>
            <td>${`${game.time}${(!isClassicMode) ? `/${game.timeLimit}` : ''}`}</td>
            <td>${game.datetime}</td>
        `;

        classicRankingBody.appendChild(tr);
    }

    const rivotrilRankingGames = await getGamesRanking("rivotril");
    position = 1;
    for (let game of rivotrilRankingGames) {
        const isClassicMode = game.mode == "classico"

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${position++}</td>
            <td>${game.username}</td>
            <td>${game.rows}x${game.cols}</td>
            <td>${game.bombs}</td>
            <td>${`${game.time}${(!isClassicMode) ? `/${game.timeLimit}` : ''}`}</td>
            <td>${game.datetime}</td>
        `;

        rivotrilRankingBody.appendChild(tr);
    }
});