-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mar 15 Janvier 2019 à 16:44
-- Version du serveur :  10.3.12-MariaDB-1:10.3.12+maria~bionic-log
-- Version de PHP :  7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `meteo`
--

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(4) NOT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `sexe` varchar(45) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `pass` varchar(45) DEFAULT NULL,
  `localisation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user_weather`
--

CREATE TABLE `user_weather` (
  `user_id` int(4) DEFAULT NULL,
  `weather_id` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `weather`
--

CREATE TABLE `weather` (
  `id` int(4) NOT NULL,
  `j0` text DEFAULT NULL,
  `j1` text DEFAULT NULL,
  `j2` text DEFAULT NULL,
  `j3` text DEFAULT NULL,
  `j4` text DEFAULT NULL,
  `j5` text DEFAULT NULL,
  `j6` text DEFAULT NULL,
  `j7` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `weather`
--
ALTER TABLE `weather`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `weather`
--
ALTER TABLE `weather`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
