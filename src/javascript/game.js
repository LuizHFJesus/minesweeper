import { getCurrentGame, saveGame } from "./game-data-utils.js";

let game = getCurrentGame();

const fieldsLabel = document.getElementById('fields-label');
const timeLabel = document.getElementById('time-label');
const bombsLabel = document.getElementById('bombs-label');

const resetButton = document.getElementById('reset-btn');
const finishButton = document.getElementById('finish-btn');
const cheatButton = document.getElementById('cheat-btn');
let isCheatEnabled = false;

const gameBoardDiv = document.getElementById('game-board');

let gameBoard = [];
let isGameRunning = false;
let isGameOver = false;

let timer = null;
let time = 0;

document.addEventListener('DOMContentLoaded', () => initializeGame());

document.querySelector('#game-board').addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

resetButton.addEventListener('click', () => handleResetButton());
function handleResetButton() {
    if (isGameRunning) {
        const confirmRestart = window.confirm("Você tem certeza que deseja reiniciar a partida?\n\nTodas as jogadas atuais serão perdidas e a partida será contabilizada como derrota!");
        if (!confirmRestart) return;

        saveGame(false, time);
    }

    gameBoard = [];
    isGameRunning = false;
    isGameOver = false;
    clearInterval(timer);
    timer = null;

    initializeGame();
}

finishButton.addEventListener('click', () => handleFinishButton());
function handleFinishButton() {
    if (isGameRunning) {
        const confirmRestart = window.confirm("Você tem certeza que deseja sair da partida?\n\nTodas as jogadas atuais serão perdidas e a partida será contabilizada como derrota!");
        if (!confirmRestart) return;

        saveGame(false, time);
    }

    gameBoard = [];
    isGameRunning = false;
    isGameOver = true;
    clearInterval(timer);
    timer = null;

    window.location.href = 'game-selection.html';
}

cheatButton.addEventListener('click', () => handleCheatButton());
function handleCheatButton() {
    if (!isGameRunning) return;
    
    if (isCheatEnabled) {
        isCheatEnabled = false;
        cheatButton.classList.remove('red');

        for (let i = 0; i < game.rows; i++) {
            for (let j = 0; j < game.cols; j++) {
                if (!gameBoard[i][j].isRevealed) {
                    const field = document.getElementById(`field-${i}-${j}`);
                    field.classList.remove('open');
                    field.classList.add('closed');
                    field.innerHTML = '';

                    if (gameBoard[i][j].isFlagged) {
                        field.innerHTML = `<img src="../images/ic-field-flag.png" alt="Bomba">`;
                    } else if (gameBoard[i][j].bombCount > 0) {
                        field.classList.remove(`color-${gameBoard[i][j].bombCount}`);
                    }
                }
            }
        }
    } else {    
        isCheatEnabled = true;
        cheatButton.classList.add('red');

        for (let i = 0; i < game.rows; i++) {
            for (let j = 0; j < game.cols; j++) {
                if (!gameBoard[i][j].isRevealed) {
                    const field = document.getElementById(`field-${i}-${j}`);
                    field.classList.remove('closed');
                    field.classList.add('open');
                    field.innerHTML = '';

                    if (gameBoard[i][j].isBomb) {
                        field.innerHTML = `<img src="../images/ic-field-bomb.png" alt="Bomba">`;
                    } else if (gameBoard[i][j].bombCount > 0) {
                        field.textContent = gameBoard[i][j].bombCount;
                        field.classList.add(`color-${gameBoard[i][j].bombCount}`);
                    }
                }
            }
        }
    }
}


function initializeGame() {
    if (!game) {
        alert('Jogo não encontrado!');
        window.location.href = 'game-selection.html';
    }

    fieldsLabel.textContent = `${game.rows * game.cols}`.padStart(4, '0');
    bombsLabel.textContent = `${game.bombs}`.padStart(4, '0');

    if (game.timeLimit) {
        const minutes = Math.floor(game.timeLimit / 60);
        const seconds = game.timeLimit % 60;
        timeLabel.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        timeLabel.textContent = '00:00';
    }

    gameBoard = Array(game.rows).fill().map(() => 
        Array(game.cols).fill().map(() => ({
            isBomb: false,
            isRevealed: false,
            bombCount: 0,
            isFlagged: false
        }))
    );

    placeBombs();
    calculateBombCount();
    initializeGameBoard();
}

function placeBombs() {
    let bombsPlaced = 0;

    while (bombsPlaced < game.bombs) {
        const row = Math.floor(Math.random() * game.rows);
        const column = Math.floor(Math.random() * game.cols);

        if (!gameBoard[row][column].isBomb) {
            gameBoard[row][column].isBomb = true;
            bombsPlaced++;
        }
    }
}

function calculateBombCount() {
    for (let i = 0; i < game.rows; i++) {
        for (let j = 0; j < game.cols; j++) {
            gameBoard[i][j].bombCount = getAdjacentBombCount(i, j);
        }
    }
}

function getAdjacentBombCount(row, col) {
    let bombCount = 0;

    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            let newRow = row + r;
            let newCol = col + c;

            if (newRow >= 0 && newRow < game.rows && newCol >= 0 && newCol < game.cols) {
                if (gameBoard[newRow][newCol].isBomb) {
                    bombCount++;
                }
            }
        }
    }

    return bombCount;
}

function initializeGameBoard() {
    gameBoardDiv.innerHTML = '';
    gameBoardDiv.style.gridTemplateRows = `repeat(${game.rows}, 50px)`;
    gameBoardDiv.style.gridTemplateColumns = `repeat(${game.cols}, 50px)`;
    
    for (let row = 0; row < game.rows; row++) {
        for (let col = 0; col < game.cols; col++) {
            let field = document.createElement('div');
            field.classList.add('field', 'closed');

            if ((row + col) % 2 === 0) {
                field.classList.add('variant');
            }

            field.id = `field-${row}-${col}`;
            field.addEventListener('click', () => handleFieldClick(row, col));
            field.addEventListener('contextmenu', (e) => handledFieldRightClick(e, row, col));

            gameBoardDiv.appendChild(field);
        }
    }
}

//TODO MOVER PARA OUTRO ARQUIVO
function isRightMouseClick(e) {
    e.preventDefault();
    if ("which" in e) { // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        return e.which == 3; 
    } else if ("button" in e) { // IE, Opera
        return e.button == 2; 
    }   
}

function handledFieldRightClick(e, row, col) {
    if (isGameOver || gameBoard[row][col].isRevealed || isCheatEnabled) return;
    if (!isGameRunning) startGame();

    if (isRightMouseClick(e)) {
        const field = document.getElementById(`field-${row}-${col}`);
        const flagsCount = parseInt(bombsLabel.textContent);

        if (gameBoard[row][col].isFlagged) {
            gameBoard[row][col].isFlagged = false;
            field.innerHTML = '';
            bombsLabel.textContent = `${flagsCount + 1}`.padStart(4, '0');
        } else if (flagsCount > 0) {
            gameBoard[row][col].isFlagged = true;
            field.innerHTML = `<img src="../images/ic-field-flag.png" alt="Bandeira">`;
            bombsLabel.textContent = `${flagsCount - 1}`.padStart(4, '0');
        }
    }
}

function handleFieldClick(row, col) {
    const field = gameBoard[row][col];
    if (isGameOver || field.isRevealed || field.isFlagged || isCheatEnabled) return;
    if (!isGameRunning) startGame();

    revealField(row, col, true);

    if (field.isBomb) {
        handledGameOver(false);
        return;
    }

    if (field.bombCount === 0) revealAdjacentFields(row, col);

    checkGameWin();
}

function handledGameOver(isWin) {  
    isGameOver = true;
    isGameRunning = false;
    clearInterval(timer);
    timer = null;

    bombsLabel.textContent = `${game.bombs}`.padStart(4, '0');

    if (!isWin) revealAllBombs(isWin);
    updateFieldsClosedOnGameOver();
    showGameOverMessage(isWin);

    saveGame(isWin, time);
}

function showGameOverMessage(isWin) {
    setTimeout(function() {
        if (isWin) {
            alert('Game Over! You won.');
        } else {
            alert('Game Over! You clicked on a bomb.');
        }
    }, 500); 
}

function checkGameWin() {
    for (let row = 0; row < game.rows; row++) {
        for (let col = 0; col < game.cols; col++) {
            if (!gameBoard[row][col].isRevealed && !gameBoard[row][col].isBomb) {
                return;
            }
        }
    }

    handledGameOver(true);
}

function startGame() {
    isGameRunning = true;

    time = game.timeLimit || 0;
    timer = setInterval(() => {
        if (isGameRunning) {
            (isClassicMode()) ? time++ : time--;

            const minutes = Math.floor(time / 60);
            const seconds = time % 60;

            timeLabel.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (!isClassicMode() && time === 0) handledGameOver(false);
        }
    }, 1000);
}

//TODO MOVER PARA OUTRO ARQUIVO
function isClassicMode() {
    return game.mode === 'classico';
}

function revealField(row, col, bombClicked = false) {
    const field = document.getElementById(`field-${row}-${col}`);

    gameBoard[row][col].isRevealed = true;
    field.classList.remove('closed');
    field.classList.add('open');
    field.removeEventListener('click', handleFieldClick);
    field.removeEventListener('contextmenu', handledFieldRightClick);

    if (gameBoard[row][col].isFlagged) {
        gameBoard[row][col].isFlagged = false;
        field.innerHTML = '';
        bombsLabel.textContent = `${parseInt(bombsLabel.textContent) + 1}`.padStart(4, '0');
    }

    if (gameBoard[row][col].isBomb) {
        field.innerHTML = `<img src="../images/ic-field-${(bombClicked) ? "explode" : "bomb" }.png" alt="${(bombClicked) ? "Explosão" : "Bomba" }">`;
    } else if (gameBoard[row][col].bombCount > 0) {
        field.textContent = gameBoard[row][col].bombCount;
        field.classList.add(`color-${gameBoard[row][col].bombCount}`);
    }
}

function revealAllBombs() {
    for (let row = 0; row < game.rows; row++) {
        for (let col = 0; col < game.cols; col++) {
            if (gameBoard[row][col].isBomb && !gameBoard[row][col].isRevealed) {
                revealField(row, col);
            }
        }
    }
}

function updateFieldsClosedOnGameOver() {
    for (let row = 0; row < game.rows; row++) {
        for (let col = 0; col < game.cols; col++) {
            if (!gameBoard[row][col].isRevealed) {
                const field = document.getElementById(`field-${row}-${col}`);
                field.classList.add('game-over');
                field.removeEventListener('click', handleFieldClick);
                field.removeEventListener('contextmenu', handledFieldRightClick);

                if (gameBoard[row][col].isBomb) {
                    field.innerHTML = `<img src="../images/ic-bomb-logo-nobg.png" alt="Bomba">`;
                }
            }
        }
    }
}

function revealAdjacentFields(row, col) {
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            let newRow = row + r;
            let newCol = col + c;

            if (newRow >= 0 && newRow < game.rows && newCol >= 0 && newCol < game.cols) {
                if (!gameBoard[newRow][newCol].isRevealed) {
                    revealField(newRow, newCol);
                    if (gameBoard[newRow][newCol].bombCount === 0) {
                        revealAdjacentFields(newRow, newCol);
                    }
                }
            }
        }
    }
}