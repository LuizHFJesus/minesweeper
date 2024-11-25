<?php
/*
 * Database configuration constants
 * Update these values according to your MySQL setup
 */
const DB_HOST = 'localhost'; // Hostname for the database server
const DB_NAME = 'minesweeper'; // Name of the database
const DB_USER = 'root'; // Username for the database
const DB_PASS = ''; // Password for the database (leave empty if none)

function getDatabaseConnection() {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->query("SHOW DATABASES LIKE '" . DB_NAME . "'");
        if ($stmt->rowCount() === 0) {
            $pdo->exec("CREATE DATABASE " . DB_NAME);
        }

        $pdo->exec("USE " . DB_NAME);

        $pdo->exec("
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                cpf VARCHAR(11) NOT NULL UNIQUE,
                dob DATE NOT NULL,
                username VARCHAR(12) NOT NULL UNIQUE,
                tel VARCHAR(15),
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        ");

        $pdo->exec("
            CREATE TABLE IF NOT EXISTS games (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(12) NOT NULL,
                `rows` INT NOT NULL,
                `cols` INT NOT NULL,
                bombs INT NOT NULL,
                mode VARCHAR(10) NOT NULL,
                timeLimit INT NULL,
                datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
                time INT NOT NULL,
                won BOOLEAN NOT NULL,
                FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
            )
        ");

        return $pdo;
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
}
?>
