-- MySQL Script generated by MySQL Workbench
-- Thu Mar 10 21:01:26 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema outofspace
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `outofspace` ;

-- -----------------------------------------------------
-- Schema outofspace
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `outofspace` DEFAULT CHARACTER SET utf8 ;
USE `outofspace` ;


-- Prendre à partir d'ici pour le serv -----------------------------------------------------------------------------------------------------


-- -----------------------------------------------------
-- Table `outofspace`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `idUser` INT(11) NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(70) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `outofspace`.`jobs`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `jobs` ;

CREATE TABLE IF NOT EXISTS `jobs` (
  `idJob` INT(11) NOT NULL,
  `fk_idUser` INT(11) NOT NULL,
  `Raffinery` VARCHAR(45) NOT NULL,
  `heurePlace` VARCHAR(45) NULL DEFAULT NULL,
  `tRestant` VARCHAR(45) NULL,
  `Quantainium` INT NULL DEFAULT NULL,
  `Bexalite` INT NULL DEFAULT NULL,
  `Taranite` INT NULL DEFAULT NULL,
  `Borase` INT NULL DEFAULT NULL,
  `Laranite` INT NULL DEFAULT NULL,
  `Agricium` INT NULL DEFAULT NULL,
  `Hephaestanite` INT NULL DEFAULT NULL,
  `Titanium` INT NULL DEFAULT NULL,
  `Diamond` INT NULL DEFAULT NULL,
  `Gold` INT NULL DEFAULT NULL,
  `Copper` INT NULL DEFAULT NULL,
  `Beryl` INT NULL DEFAULT NULL,
  `Tungsten` INT NULL DEFAULT NULL,
  `Corundum` INT NULL DEFAULT NULL,
  `Quartz` INT NULL DEFAULT NULL,
  `Aluminium` INT NULL DEFAULT NULL,
  `Inert Material` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idJob`),
  INDEX `fk_Jobs_user1_idx` (`fk_idUser` ASC),
  CONSTRAINT `fk_Jobs_user1`
    FOREIGN KEY (`fk_idUser`)
    REFERENCES `outofspace`.`user` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


