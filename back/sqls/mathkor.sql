CREATE DATABASE IF NOT EXISTS MatKor;
Use MatKor;
CREATE TABLE IF NOT EXISTS problems (
    `number` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `title` TEXT NOT NULL,
    `path` TEXT NOT NULL,
    `public` TINYINT NOT NULL,
    `category` TINYINT NOT NULL,
    `algorithm` TEXT NOT NULL,
    `etc` INT NOT NULL,
    `special_path` TEXT,
    `subtask_path` TEXT
);
ALTER TABLE problems AUTO_INCREMENT = 1000;
CREATE TABLE IF NOT EXISTS users (
    `uid` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `id` TEXT NOT NULL,
    `password` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `last_login` DATETIME,
    `register_date` DATETIME NOT NULL
);
ALTER TABLE users AUTO_INCREMENT = 0;
CREATE TABLE IF NOT EXISTS sessions (
    `sid` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `uid` INT NOT NULL,
    `expire` DATETIME NOT NULL,
    `ip` TEXT NOT NULL,
    `session_key` TEXT NOT NULL,
    FOREIGN KEY (uid) REFERENCES users(uid) ON UPDATE CASCADE
);