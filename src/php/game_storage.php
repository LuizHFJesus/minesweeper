<?php
    session_start();

    require_once 'db_connection.php';

    const SAVE_GAME = 'SAVE_GAME';
    const GET_GAMES_BY_USERNAME = 'GET_GAMES_BY_USERNAME';
    const GET_GAMES_RANKING_BY_MODE = 'GET_GAMES_RANKING_BY_MODE';

    $response = null;

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $action = $_POST['action'];
        $response = ['status' => 'error', 'message' => 'Invalid action: ' . $_POST['action']];

        switch ($action) {
            case SAVE_GAME:
                saveGame();
                break;
            case GET_GAMES_BY_USERNAME:
                getGamesByUsername();
                break;
            case GET_GAMES_RANKING_BY_MODE:
                getGamesRankingByMode();
                break;
        }

        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    function saveGame() {
        global $response;

        $pdo = getDatabaseConnection();
        $game = json_decode($_POST['game'], true);

        $stmt = $pdo->prepare("
            INSERT INTO games (username, `rows`, `cols`, bombs, mode, timeLimit, time, won)
            VALUES (:username, :rows, :cols, :bombs, :mode, :timeLimit, :time, :won)
        ");

        $stmt->execute([
            'username' => $game['username'],
            'rows' => $game['rows'],
            'cols' => $game['cols'],
            'bombs' => $game['bombs'],
            'mode' => $game['mode'],
            'timeLimit' => $game['timeLimit'],
            'time' => $game['time'],
            'won' => $game['won'] ? 1 : 0
        ]);

        $response = ['status' => 'success'];
    }

    function getGamesByUsername() {
        global $response;

        $pdo = getDatabaseConnection();
        $username = $_POST['username'];

        $stmt = $pdo->prepare("
            SELECT * FROM games WHERE username = :username ORDER BY id DESC
        ");

        $stmt->execute(['username' => $username]);
        $games = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($games as &$game) {
            $game['datetime'] = gmdate('d/m/Y H:i', strtotime($game['datetime']));
        }

        $response = ['status' => 'success', 'games' => $games];
    }

    function getGamesRankingByMode() {
        global $response;

        $pdo = getDatabaseConnection();
        $mode = $_POST['mode'];

        $stmt = $pdo->prepare("
            SELECT * FROM games WHERE mode = :mode AND (bombs/(`rows`*`cols`) >= 0.10) AND won
            ORDER BY (`rows`*`cols`), bombs, time
            LIMIT 10
        ");

        $stmt->execute(['mode' => $mode]);
        $games = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($games as &$game) {
            $game['datetime'] = gmdate('d/m/Y H:i', strtotime($game['datetime']));
        }

        $response = ['status' => 'success', 'games' => $games];
    }
?>
