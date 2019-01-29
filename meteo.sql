-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mar 29 Janvier 2019 à 08:36
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
(1, 'qdsdsqd', 'homme', '#FFD699', 'jqdqdjslq@sodifhs.dqsd', 'MYMdx7kWHgjGm151PLbOnQ==', 'ici', NULL),
(2, 'Jean', 'femme', '#553301', 'qsopfjs@mail.com', 'EH8JsQbpneAyUPpON9cS3A==', '7 rue des casernes', 'Vesoul'),
(3, 'tr', 'homme', '#FFC266', 'ertret@mail.fr', 'txwPNy6KB7dxmGwOGBVUjw==', 'dgffgg', 'gdgfdg'),
(4, 'sdqdqsdqs', 'homme', '#FFC266', 'sffdsf@sdfsd.fsqd', 'iBFdCr4Yn42Nf1LeHReFOw==', 'sdsdkldn', 'sqdqsd'),
(5, 'zasdfsdf', 'homme', '#FFD699', 'zgdfgdfg@esfsfd.sdfsf', 'UEmG0bnVgl4mdP3uS6VVsQ==', 'dfsdfsfd', 'sdfsdf'),
(6, 'David', 'homme', '#FFC266', 'qsdoih@sdfsd.dsf', 'eyqio6Xn2zl2BTpkQ08wEA==', 'avenue renÃ©', 'nantes'),
(7, 'David', 'homme', '#FFC266', 'qsdoih@sdfsd.dsfg', 'eyqio6Xn2zl2BTpkQ08wEA==', '7 RUE DES CASERNES', 'Vesoul'),
(8, 'Pedro', 'homme', '#FFC266', 'dfdfdg@sdfd.fdf', 'ZcbyTR8E+EcExryhJbed8g==', 'Rue du Bois', 'Ã‰chenoz-le-Sec'),
(9, 'HervÃ©', 'homme', '#FFC266', 'dfdfdg@sdfd.fdfriu', 'ZcbyTR8E+EcExryhJbed8g==', 'Rue du Bois', 'dspohdoigh'),
(10, 'Germaine', 'femme', '#FFEFD6', 'dsffd@dsf.dffd', 'T2ay5kWY2dXsdV6hSvF9jw==', 'sdfhf', 'sfoisfoi'),
(11, 'Manon', 'homme', '#FFD699', 'sfd@dsff.dfs', 'Mz3G2SZ04WcU/aSldTDSVg==', 'repoiejroie', 'sdffsh'),
(12, 'Thomas', 'femme', '#FFD699', 'sdfihsdiu@df.df', 'Msx7cOJOz35x6OTXpS28Zw==', 'sdfjfoi', 'sdfpofjdsoi'),
(13, 'Aragorn', 'homme', '#FFD699', 'dgfg.dgf@dfgdg.dg', '9zg+vSLF5iVWyUu7WdrgOA==', 'sdhjjo', 'sdfidj'),
(14, 'AurÃ©lien', 'homme', '#FFD699', 'sdgdgdg.dsf@dsf.fds', 'wtrzlpey7tcNL0DBSbMq6g==', '7 rue des casernes', 'Vesoul'),
(15, 'KÃ©vin', 'homme', '#FFD699', 'dgg@sdf.df', '+Re+0JArT9hCt/08r7aocA==', '7 rue des casernes', 'Vesoul'),
(16, 'Claude', 'homme', '#FFD699', 'sfd.dff@dfd.df', 'd1XB47zMo6j8ig1krh6VHQ==', '7 rue des casernes', 'Vesoul'),
(17, 'Natasha', 'homme', '#FFEFD6', 'sdf@sdf.fd', 'd/X9vYQfq9KJE5u2BFg8Ng==', '7 rue des casernes', 'Vesoul'),
(18, 'Dimitri', 'homme', '#FFD699', 'dgdgg.fdggd@dfdf.d', 'BRbY0C031/q4slXki31TTw==', '7 rue des casernes', 'Vesoul'),
(19, 'Claire', 'femme', '#FFD699', 'sefrdg@sdfdf.fdf', '9OXBKVP6HfZ84+U60NyaLA==', '7 rue des casernes', 'Vesoul'),
(20, 'Claire', 'femme', '#FFD699', 'sefrdg@sdfdf.fdfr', '9OXBKVP6HfZ84+U60NyaLA==', '7 rue des casernes', 'Vesoul'),
(21, 'Max', 'femme', '#FFD699', 'iuhdruig@diufhdfi.ds', 'ateQPrrBzY8GAYEGfUGF1w==', '7 rue des casernes', 'Vesoul'),
(22, 'Rakesh', 'homme', '#FFD699', 'oidhwdio@sdggd.d', 'B/nNNBLndDPymcT6Xzf3tg==', 'Rue du Bois', 'Ã‰chenoz-le-Sec'),
(23, 'Valentin', 'homme', '#FFEFD6', 'dsffdsf@dff.f', 'YMaMWZjsntNO1e0SDkGT/A==', '7 rue des casernes', 'Vesoul'),
(24, 'Alexandre', 'homme', '#FFD699', 'sdgd@dfggf.dff', 'VrE3FuDzMZ2uqdgIR6MKGg==', '7 rue des casernes', 'Vesoul'),
(25, 'Roger', 'homme', '#FFD699', 'dsgf@dfs.fdss', 'm9L3R9oeEt8DYC20dkzrgQ==', 'Rue du Docteur Jean-Georges Girard', 'Vesoul'),
(26, 'Lucien', 'homme', '#FFD699', 'mail@mail.mail', '0XxbVTAzmD4JQqWnZY8mGg==', 'Rue du Docteur Jean-Georges Girard', 'Vesoul'),
(27, 'Lucie', 'femme', '#FFD699', 'mail1@mail.mail', 'JJ+WFIV51ny32cHsd2hxRA==', 'Rue du Docteur Jean-Georges Girard', 'Vesoul'),
(28, 'Antoine', 'homme', '#FFD699', 'test@test.test', 'JhOZ0WnNv6L51JRFJRxgpw==', 'Rue de Praley', 'Vesoul'),
(29, 'Abdelkrim', 'homme', '#553301', 'lemail@lemail.lemail', '0XxbVTAzmD4JQqWnZY8mGg==', 'Rue du Docteur Jean-Georges Girard', 'Vesoul');

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
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT pour la table `weather`
--
ALTER TABLE `weather`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
