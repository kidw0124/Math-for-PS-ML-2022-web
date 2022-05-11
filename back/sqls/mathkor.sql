CREATE DATABASE IF NOT EXISTS mathkor;
Use mathkor;
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