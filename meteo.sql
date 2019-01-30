-- Adminer 4.7.0 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';

DROP DATABASE IF EXISTS `meteo`;
CREATE DATABASE `meteo` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `meteo`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `prenom` varchar(255) DEFAULT NULL,
  `sexe` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `pass` varchar(45) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `user_weather`;
CREATE TABLE `user_weather` (
  `user_id` int(4) DEFAULT NULL,
  `weather_id` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `weather`;
CREATE TABLE `weather` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `j0` text DEFAULT NULL,
  `j1` text DEFAULT NULL,
  `j2` text DEFAULT NULL,
  `j3` text DEFAULT NULL,
  `j4` text DEFAULT NULL,
  `j5` text DEFAULT NULL,
  `j6` text DEFAULT NULL,
  `j7` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- 2019-01-30 14:37:55
