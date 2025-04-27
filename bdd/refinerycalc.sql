-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : mer. 26 juil. 2023 à 20:31
-- Version du serveur : 8.0.33
-- Version de PHP : 8.1.17

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
  `idJob` int NOT NULL,
  `fk_idUser` int NOT NULL,
  `Raffinery` varchar(45) NOT NULL,
  `heurePlace` varchar(45) DEFAULT NULL,
  `tRestant` varchar(45) DEFAULT NULL,
  `Quantainium` int DEFAULT NULL,
  `Bexalite` int DEFAULT NULL,
  `Taranite` int DEFAULT NULL,
  `Borase` int DEFAULT NULL,
  `Laranite` int DEFAULT NULL,
  `Agricium` int DEFAULT NULL,
  `Hephaestanite` int DEFAULT NULL,
  `Titanium` int DEFAULT NULL,
  `Gold` int DEFAULT NULL,
  `Copper` int DEFAULT NULL,
  `Beryl` int DEFAULT NULL,
  `Tungsten` int DEFAULT NULL,
  `Corundum` int DEFAULT NULL,
  `Quartz` int DEFAULT NULL,
  `Aluminum` int DEFAULT NULL,
  `Diamond` int DEFAULT NULL,
  `Iron` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `idUser` int NOT NULL,
  `login` varchar(70) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD CONSTRAINT `fk_Jobs_user1` FOREIGN KEY (`fk_idUser`) REFERENCES `user` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
