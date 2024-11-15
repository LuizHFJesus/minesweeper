<?php
    const FILE_PATH = '../data/user_data.json';

    const GET_CURRENT_USER = 'GET_CURRENT_USER';
    const SET_CURRENT_USER = 'SET_CURRENT_USER';
    const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
    const GET_USERS = 'GET_USERS';
    const SAVE_USERS = 'SAVE_USERS';
    const UPDATE_USER = 'UPDATE_USER';

    $response = null;

    if (!file_exists(FILE_PATH)) {
        file_put_contents(FILE_PATH, json_encode([]));
    }

    function getUsersFromJson() {
        $data = file_get_contents(FILE_PATH);
        return json_decode($data, true) ?: [];
    }

    function saveUsersToJson($users) {
        file_put_contents(FILE_PATH, json_encode($users, JSON_PRETTY_PRINT));
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $action = $_POST['action'];
        global $response
        $response = ['status' => 'error', 'message' => 'Invalid action'];

        switch($action) {
            case GET_CURRENT_USER:
                getCurrentUser();
                break;
            case SET_CURRENT_USER:
                setCurrentUser();
                break;
            case REMOVE_CURRENT_USER:
                removeCurrentUser();
                break;
            case GET_USERS:
                getUsers();
                break;
            case SAVE_USERS:
                saveUsers();
                break;
            case FIND_USER:
                findUser();
                break;
            case UPDATE_USER:
                updateUser();
                break;
        }

        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    function getCurrentUser() { 
        $currentUser = $_SESSION['currentUser'] ?? null;
        global $response = ['status' => 'success', 'currentUser' => $currentUser];
    }

    function setCurrentUser() {
        session_start();
        $_SESSION['currentUser'] = $_POST['user'];
        global $response = ['status' => 'success'];
    }

    function removeCurrentUser() {
        session_start();
        unset($_SESSION['currentUser']);
        global $response = ['status' => 'success'];
    }

    function getUsers() {
        global $response = ['status' => 'success', 'users' => getUsersFromJson()];
    }

    function saveUsers() {
        saveUsersToJson($_POST['users']);
        global $response = ['status' => 'success'];
    }

    function findUser() {
        $users = getUsers();
        $search = $_POST['cpfOrEmailOrUsername'];
        $user = array_filter($users, fn($user) => 
            $user['cpf'] === $search || 
            $user['username'] === $search || 
            $user['email'] === $search
        );
       global $response = ['status' => 'success', 'user' => reset($user) ?: null];
    }

    function updateUser() {
        $users = getUsers();
        $updatedUser = $_POST['updatedUser'];
        foreach ($users as &$user) {
            if ($user['username'] === $updatedUser['username']) {
                $user = $updatedUser;
                break;
            }
        }
        saveUsers($users);
        global $response = ['status' => 'success'];
    }
?>