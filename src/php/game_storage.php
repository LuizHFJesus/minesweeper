<?php
session_start();

const GAME_FILE_PATH = '../data/game_data.json';
const GET_GAMES = 'GET_GAMES';
const SAVE_GAMES = 'SAVE_GAMES';
const ADD_GAME = 'ADD_GAME';
const FIND_GAMES_BY_USERNAME = 'FIND_GAMES_BY_USERNAME';

if (!file_exists(GAME_FILE_PATH)) {
    file_put_contents(GAME_FILE_PATH, json_encode([]));
}

function getGamesFromJson() {
    $data = file_get_contents(GAME_FILE_PATH);
    return json_decode($data, true) ?: [];
}

function saveGamesToJson($games) {
    file_put_contents(GAME_FILE_PATH, json_encode($games, JSON_PRETTY_PRINT));
}

function getGames() {
    global $response;
    $response = ['status' => 'success', 'games' => getGamesFromJson()];
}

function saveGames() {
    global $response;
    saveGamesToJson(json_decode($_POST['games'], true));
    $response = ['status' => 'success'];
}

function addGame() {
    global $response;

    if (!isset($_POST['game'])) {
        $response = ['status' => 'error', 'message' => 'No game data provided'];
        return;
    }

    $newGame = json_decode($_POST['game'], true);

    if (!is_array($newGame)) {
        $response = ['status' => 'error', 'message' => 'Invalid game data'];
        return;
    }

    $games = getGamesFromJson();
    $games[] = $newGame;

    saveGamesToJson($games);
    $response = ['status' => 'success'];
}

function findGamesByUsername() {
    global $response;
    $username = $_POST['username'];
    $games = getGamesFromJson();
    $userGames = array_filter($games, fn($game) => $game['username'] === $username);
    $response = ['status' => 'success', 'games' => array_values($userGames)];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? null;

    if (!$action) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'No action provided']);
        exit;
    }

    $response = ['status' => 'error', 'message' => 'Invalid action'];

    switch ($action) {
        case GET_GAMES:
            getGames();
            break;
        case SAVE_GAMES:
            saveGames();
            break;
        case ADD_GAME:
            addGame();
            break;
        case FIND_GAMES_BY_USERNAME:
            findGamesByUsername();
            break;
    }

    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}
?>
