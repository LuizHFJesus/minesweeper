<?php
    session_start();

    const FILE_PATH = '../data/user_data.json';

    const GET_CURRENT_USER = 'GET_CURRENT_USER';
    const SET_CURRENT_USER = 'SET_CURRENT_USER';
    const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
    const GET_USERS = 'GET_USERS';
    const CREATE_USER = 'CREATE_USER';
    const SAVE_USERS = 'SAVE_USERS';
    const DELETE_USER = 'DELETE_USER';
    const FIND_USER = 'FIND_USER';
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
            case CREATE_USER:
                createUser();
                break;
            case DELETE_USER:
                deleteUser();
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
        global $response;
        $currentUser = $_SESSION['currentUser'] ?? null;
        $response = ['status' => 'success', 'currentUser' => $currentUser];
    }

    function setCurrentUser() {
        global $response;
        $_SESSION['currentUser'] = $_POST['user'];
        $response = ['status' => 'success'];
    }

    function removeCurrentUser() {
        global $response;
        unset($_SESSION['currentUser']);
        $response = ['status' => 'success'];
    }

    function getUsers() {
        global $response;
        $response = ['status' => 'success', 'users' => getUsersFromJson()];
    }

    function createUser() {
        global $response;
        $users = getUsersFromJson();
        $user = json_decode($_POST['user'], true);
        $users[] = $user;
        saveUsersToJson($users);
        $response = ['status' => 'success'];
    }

    function deleteUser() {
        global $response;
        $users = getUsersFromJson();
        $username = $_POST['username'];
        $users = array_filter($users, fn($user) => $user['username'] !== $username);
        saveUsersToJson($users);
        $response = ['status' => 'success'];
    }

    function findUser() {
        global $response;
        $users = getUsersFromJson();

        $search = $_POST['cpfOrEmailOrUsername'];
        $user = array_filter($users, fn($user) => 
            $user['cpf'] === $search || 
            $user['username'] === $search || 
            $user['email'] === $search
        );

        $response = ['status' => 'success', 'user' => reset($user) ?: null];
    }

    function updateUser() {
        global $response;
        $users = getUsersFromJson();
        
        $updatedUser = json_decode($_POST['updatedUser'], true);
        foreach ($users as &$user) {
            if ($user['username'] === $updatedUser['username']) {
                $user = $updatedUser;
                break;
            }
        }

        saveUsersToJson($users);
        $response = ['status' => 'success'];
    }
?>