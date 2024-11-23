CREATE DATABASE minesweeper;

USE minesweeper;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    dob DATE NOT NULL,
    username VARCHAR(12) NOT NULL UNIQUE,
    tel VARCHAR(15),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(12) NOT NULL,
    rows INT NOT NULL,
    cols INT NOT NULL,
    bombs INT NOT NULL,
    mode VARCHAR(10) NOT NULL,
    time_limit INT NOT NULL,
    datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
    time INT NOT NULL,
    won BOOLEAN NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
);