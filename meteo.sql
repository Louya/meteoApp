-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mer 30 Janvier 2019 à 15:39
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
  `color` varchar(45) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `pass` varchar(45) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `prenom`, `sexe`, `color`, `mail`, `pass`, `adresse`, `ville`) VALUES
(1, 'Jules', NULL, NULL, 'mail@mail.mail', '0XxbVTAzmD4JQqWnZY8mGg==', 'Rue du Docteur Jean-Georges Girard', 'Vesoul'),
(2, 'Fabien', NULL, NULL, 'unmail@unmail.unmail', '0XxbVTAzmD4JQqWnZY8mGg==', 'Rue du Docteur Jean-Georges Girard', 'Vesoul'),
(3, 'Abdel', NULL, NULL, 'deuxmail@deuxmail.deuxmail', '0XxbVTAzmD4JQqWnZY8mGg==', 'Rue du Docteur Jean-Georges Girard', 'Vesoul'),
(4, 'Antoine', NULL, NULL, 'sefdrtedte@sdfdsf.ssdf', '4oXBfVmjwKV2X7r7/MZCxA==', 'Rue du Docteur Jean-Georges Girard', 'dsffsdfdVesoul'),
(5, 'Antoine', NULL, NULL, 'sefdrtedte@sdfdsf.ssdfgf', '4oXBfVmjwKV2X7r7/MZCxA==', 'Rue du Docteur Jean-Georges Girard', 'gfdighdf'),
(6, 'Pierre', NULL, NULL, 'laim@laim.laim', '0XxbVTAzmD4JQqWnZY8mGg==', 'Baniyas', 'Dubai'),
(7, 'Damien', NULL, NULL, 'test@mail.fr', '0XxbVTAzmD4JQqWnZY8mGg==', 'Chemin des Perches', 'Pusey'),
(8, 'AurÃ©lien', NULL, NULL, 'le@le.le', '0XxbVTAzmD4JQqWnZY8mGg==', 'Chemin des Perches', 'Pusey'),
(9, 'Test', NULL, NULL, 'el@el.el', '0XxbVTAzmD4JQqWnZY8mGg==', 'Chemin des Perches', 'Pusey'),
(10, 'dfssdffs', NULL, NULL, 'qsdqsd@dfdf.dsf', 'e8XyvkZhGrgUMFuwzcr4gA==', 'Chemin des Perches', 'Pusey'),
(11, 'Jean', NULL, NULL, 'mail1@mail1.mail1', '0XxbVTAzmD4JQqWnZY8mGg==', 'Rue de Vesoul', 'BesanÃ§on'),
(12, 'Antoine', NULL, NULL, 'mail2@mail2.mail2', '0XxbVTAzmD4JQqWnZY8mGg==', 'Rue de Vesoul', 'BesanÃ§on'),
(13, 'sdfiojdoifhdf', NULL, NULL, 'sdghdfio@dfghd.dfgf', 'eUtJWkCLmuzpQjP1puBtiw==', 'Chemin des Perches', 'Pusey'),
(14, 'sdfiojdoifhdf', NULL, NULL, 'sdghdfio@dfghd.dfgfe', 'eUtJWkCLmuzpQjP1puBtiw==', 'Chemin des Perches', 'Pusey'),
(15, 'sdfdsfdsfqff', NULL, NULL, 'sdfiudgui@diufg.sdf', 'hlVZB71+DMZyPiAfcWHX2Q==', 'Chemin des Perches', 'Pusey'),
(16, 'sdfdsfdsfqff', NULL, NULL, 'sdfiudgui@diufg.sdffdr', 'hlVZB71+DMZyPiAfcWHX2Q==', 'Chemin des Perches', 'Pusey');

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
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT pour la table `weather`
--
ALTER TABLE `weather`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
