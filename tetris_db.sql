DROP DATABASE IF EXISTS `Tetris` ;
CREATE SCHEMA `Tetris` ;

CREATE TABLE `Tetris`.`playerInfo` (
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Email`, `Password`));

CREATE TABLE `Tetris`.`score` (
  `idscore` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(45) NULL,
  `Score` INT(11) NULL,
  `Time` VARCHAR(45) NULL,
  `Lines` VARCHAR(45) NULL,
  PRIMARY KEY (`idscore`),
  INDEX `Email_idx` (`Email` ASC),
  CONSTRAINT `Email`
    FOREIGN KEY (`Email`)
    REFERENCES `Tetris`.`playerInfo` (`Email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


INSERT INTO `Tetris`.`playerInfo` (`Email`, `Password`, `Name`) VALUES ('saurabh.mathur@outlook.com', 'eternal', 'Saurabh Mathur');
INSERT INTO `Tetris`.`playerInfo` (`Email`, `Password`, `Name`) VALUES ('scooper@gmail.com', 'shelly', 'Sheldon Cooper');
INSERT INTO `Tetris`.`playerInfo` (`Email`, `Password`, `Name`) VALUES ('ritz@gmail.com', 'ritrocks', 'Ritika Singh');
INSERT INTO `Tetris`.`playerInfo` (`Email`, `Password`, `Name`) VALUES ('gregory@yahoo.com', 'housegreg', 'Gregory Cuddy');
INSERT INTO `Tetris`.`playerInfo` (`Email`, `Password`, `Name`) VALUES ('tanvi@gmail.com', 'gyanbharti', 'Tanvi Sapra');

INSERT INTO `Tetris`.`score` (`Email`, `Score`, `Time`, `Lines`) VALUES ('saurabh.mathur@outlook.com', '600', '2014-12-11 22:04:28', '6');

INSERT INTO `Tetris`.`score` (`Email`, `Score`, `Time`, `Lines`) VALUES ('saurabh.mathur@outlook.com', '1200', '2014-12-11 23:04:28', '10');

INSERT INTO `Tetris`.`score` (`Email`, `Score`, `Time`, `Lines`) VALUES ('tanvi@gmail.com', '1600', '2014-12-11 10:04:28', '12');

INSERT INTO `Tetris`.`score` (`Email`, `Score`, `Time`, `Lines`) VALUES ('gregory@yahoo.com', '1100', '2014-12-11 14:04:28', '11');

INSERT INTO `Tetris`.`score` (`Email`, `Score`, `Time`, `Lines`) VALUES ('scooper@gmail.com', '900', '2014-12-11 16:04:30', '8');