-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 15 fév. 2022 à 17:41
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `refinerycalc`
--

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `idJob` int(11) NOT NULL,
  `fk_idUser` int(11) NOT NULL,
  `Raffinery` varchar(45) NOT NULL,
  `heurePlace` varchar(45) DEFAULT NULL,
  `Quantainium` int(11) DEFAULT NULL,
  `Bexalite` int(11) DEFAULT NULL,
  `Taranite` int(11) DEFAULT NULL,
  `Borase` int(11) DEFAULT NULL,
  `Laranite` int(11) DEFAULT NULL,
  `Agricium` int(11) DEFAULT NULL,
  `Hephaestanite` int(11) DEFAULT NULL,
  `Titanium` int(11) DEFAULT NULL,
  `Diamond` int(11) DEFAULT NULL,
  `Gold` int(11) DEFAULT NULL,
  `Copper` int(11) DEFAULT NULL,
  `Beryl` int(11) DEFAULT NULL,
  `Tungsten` int(11) DEFAULT NULL,
  `Corundum` int(11) DEFAULT NULL,
  `Quartz` int(11) DEFAULT NULL,
  `Aluminium` int(11) DEFAULT NULL,
  `Inert Material` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `jobs`
--

INSERT INTO `jobs` (`idJob`, `fk_idUser`, `Raffinery`, `heurePlace`, `Quantainium`, `Bexalite`, `Taranite`, `Borase`, `Laranite`, `Agricium`, `Hephaestanite`, `Titanium`, `Diamond`, `Gold`, `Copper`, `Beryl`, `Tungsten`, `Corundum`, `Quartz`, `Aluminium`, `Inert Material`) VALUES
(1, 1, 'CRU-L1', '30', 2500, NULL, NULL, 300, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 1, 'CRU-L1', '40', NULL, 300, 2000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 1, 'ARC-L1', '36', 3200, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 2, 'CRU-L1', '34', 2323, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 1, 'CRU-L1', '48', 3200, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 1, 'ARC-L2', '27', 4004, NULL, 300, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 2, 'CRU-L1', '54', 3200, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 2, 'CRU-L1', '76', 6293, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 2, 'CRU-L1', '75', 7863, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 1, 'ARC-L1', '32', 3200, NULL, NULL, 300, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `login` varchar(70) DEFAULT NULL,
  `password` varchar(70) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idUser`, `login`, `password`) VALUES
(1, 'Liduen', 'azerty'),
(2, 'Okami', 'azerty');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`idJob`),
  ADD KEY `fk_Jobs_user1_idx` (`fk_idUser`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `idJob` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `fk_Jobs_user1` FOREIGN KEY (`fk_idUser`) REFERENCES `user` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
