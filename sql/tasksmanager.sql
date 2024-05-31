CREATE DATABASE IF NOT EXISTS tasksmanager;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS categories;

CREATE TABLE `users` (
    `user_id` INT NOT NULL AUTO_INCREMENT, 
    `name` VARCHAR(30) NOT NULL , 
    `email` VARCHAR(30) NOT NULL UNIQUE, 
    `password` VARCHAR(100) NOT NULL, 
    `register` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(), 
    PRIMARY KEY (`user_id`)
) ENGINE = InnoDB;


CREATE TABLE `categories` (
    `cat_id` INT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`cat_id`)
) ENGINE = InnoDB;

CREATE TABLE `tasks` (
    `task_id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `cat_id` INT NOT NULL,
    PRIMARY KEY (`task_id`),
    FOREIGN KEY (`cat_id`) REFERENCES `categories`(`cat_id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE = InnoDB;