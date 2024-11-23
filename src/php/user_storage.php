<?php
    session_start();
    require_once 'db_connection.php';

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

        $pdo = getDatabaseConnection();
        $stmt = $pdo->query("SELECT * FROM users");
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response = ['status' => 'success', 'users' => $users];
    }

    function createUser() {
        global $response;

        $pdo = getDatabaseConnection();
        $user = json_decode($_POST['user'], true);

        try {
            $stmt = $pdo->prepare("
                INSERT INTO users (name, cpf, dob, username, tel, email, password)
                VALUES (:name, :cpf, :dob, :username, :tel, :email, :password)
            ");

            $stmt->execute([
                'name' => $user['name'],
                'cpf' => $user['cpf'],
                'dob' => $user['dob'],
                'username' => $user['username'],
                'tel' => $user['tel'],
                'email' => $user['email'],
                'password' => $user['password']
            ]);

            $response = ['status' => 'success'];
        } catch (PDOException $e) {
            $response = ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    function deleteUser() {
        global $response;
    
        $pdo = getDatabaseConnection();
        $username = $_POST['username'];
    
        $stmt = $pdo->prepare("DELETE FROM users WHERE username = :username");
        $stmt->execute(['username' => $username]);
    
        $response = ['status' => 'success'];
    }

    function findUser() {
        global $response;
    
        $pdo = getDatabaseConnection();
        $search = $_POST['cpfOrEmailOrUsername'];
    
        $stmt = $pdo->prepare("
            SELECT * FROM users 
            WHERE cpf = :search OR username = :search OR email = :search
        ");
        $stmt->execute(['search' => $search]);
    
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
        $response = ['status' => 'success', 'user' => $user ?: null];
    }

    function updateUser() {
        global $response;
    
        $pdo = getDatabaseConnection();
        $updatedUser = json_decode($_POST['updatedUser'], true);
    
        $stmt = $pdo->prepare("
            UPDATE users 
            SET name = :name, cpf = :cpf, dob = :dob, tel = :tel, email = :email, password = :password
            WHERE username = :username
        ");
        $stmt->execute([
            'name' => $updatedUser['name'],
            'cpf' => $updatedUser['cpf'],
            'dob' => $updatedUser['dob'],
            'tel' => $updatedUser['tel'],
            'email' => $updatedUser['email'],
            'password' => $updatedUser['password'],
            'username' => $updatedUser['username']
        ]);
    
        $response = ['status' => 'success'];
    }    
?>