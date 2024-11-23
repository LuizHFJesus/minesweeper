<?php
const DB_HOST = 'localhost';
const DB_NAME = 'minesweeper';
const DB_USER = 'root';
const DB_PASS = '1234'; // Adjust if you have a password in MySQL

function getDatabaseConnection() {
    try {
        $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
}
?>
