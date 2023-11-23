-- MySQL Script generated by MySQL Workbench
-- Sat Nov  4 21:41:41 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- Drop all table
DROP TABLE IF EXISTS Memory, Item, Aspect, ElementOfTheSoul, Book, Numen, WorkshopAspectRequirement, Workstation, Skill, People, Language;
DROP TABLE IF EXISTS Visitor, Assistant, SkillEOTS, SkillPeople, ItemSkillBook, SkillMemory;


-- -----------------------------------------------------
-- Table `Memory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Memory` (
  `memoryID` VARCHAR(40) NOT NULL,
  `memoryName` VARCHAR(40) NULL,
  `memorySources` VARCHAR(100) NULL,
  `memoryIsSound` BIT(1) NULL,
  `memoryIsOmen` BIT(1) NULL,
  `memoryIsPersistent` BIT(1) NULL,
  `memoryIsWeather` BIT(1) NULL,
  PRIMARY KEY (`memoryID`),
  UNIQUE INDEX `memoryName_UNIQUE` (`memoryName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Item` (
  `itemID` VARCHAR(20) NOT NULL,
  `itemName` VARCHAR(20) NULL,
  PRIMARY KEY (`itemID`),
  UNIQUE INDEX `itemName_UNIQUE` (`itemName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Aspect`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Aspect` (
  `aspectID` VARCHAR(20) NOT NULL,
  `aspectName` VARCHAR(20) NULL,
  `itemID` VARCHAR(20) NULL,
  PRIMARY KEY (`aspectID`),
  UNIQUE INDEX `aspectName_UNIQUE` (`aspectName` ASC) VISIBLE,
    FOREIGN KEY (`aspectID`)
    REFERENCES `Item` (`itemID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ElementOfTheSoul`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ElementOfTheSoul` (
  `elementOfTheSoulID` VARCHAR(20) NOT NULL,
  `elementOfTheSoulName` VARCHAR(20) NULL,
  `assistantID` VARCHAR(20) NULL,
  PRIMARY KEY (`elementOfTheSoulID`),
  UNIQUE INDEX `elementOfTheSoulName_UNIQUE` (`elementOfTheSoulName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Book` (
  `bookID` VARCHAR(20) NOT NULL,
  `bookName` VARCHAR(80) NULL,
  `language` VARCHAR(20) NULL,
  PRIMARY KEY (`bookID`),
  UNIQUE INDEX `bookName_UNIQUE` (`bookName` ASC) VISIBLE,
    FOREIGN KEY (`bookID`)
		REFERENCES `Aspect` (`aspectID`)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    FOREIGN KEY (`bookID`)
		REFERENCES `Memory` (`memoryID`)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    FOREIGN KEY (`bookID`)
		REFERENCES `ElementOfTheSoul` (`elementOfTheSoulID`)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
    FOREIGN KEY (`bookID`)
		REFERENCES `Numen` (`numenID`)
		ON DELETE CASCADE
		ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Numen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Numen` (
    `numenID` VARCHAR(20) NOT NULL,
    `bookID` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`numenID`),
    FOREIGN KEY (`numenID`)
        REFERENCES `Memory` (`memoryID`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`bookID`)
        REFERENCES `Book` (`bookID`)
        ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=INNODB;


-- -----------------------------------------------------
-- Table `Workstation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Workstation` (
  `workstationID` VARCHAR(20) NOT NULL,
  `workstationName` VARCHAR(40) NULL,
  `room` VARCHAR(20) NULL,
  `evolution` VARCHAR(20) NULL,
  `slots` VARCHAR(80) NULL,
  `skillID` VARCHAR(20) NULL,
  PRIMARY KEY (`workstationID`),
  UNIQUE INDEX `skillID_UNIQUE` (`skillID` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WorkshopAspectRequirement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WorkshopAspectRequirement` (
    `workshopAspectRequirementID` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`workshopAspectRequirementID`),
    FOREIGN KEY (`workshopAspectRequirementID`)
        REFERENCES `Aspect` (`aspectID`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`workshopAspectRequirementID`)
        REFERENCES `Workstation` (`workstationID`)
        ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=INNODB;


-- -----------------------------------------------------
-- Table `Skill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Skill` (
  `skillID` VARCHAR(20) NOT NULL,
  `skillName` VARCHAR(40) NULL,
  `specialAttribute` VARCHAR(20) NULL,
  `aspectID` VARCHAR(20) NULL,
  PRIMARY KEY (`skillID`),
  UNIQUE INDEX `skillName_UNIQUE` (`skillName` ASC) VISIBLE,
  INDEX `aspectID_idx` (`aspectID` ASC) VISIBLE,
    FOREIGN KEY (`aspectID`)
    REFERENCES `Aspect` (`aspectID`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `People`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `People` (
  `peopleID` VARCHAR(20) NOT NULL,
  `peopleName` VARCHAR(20) NULL,
  PRIMARY KEY (`peopleID`),
  UNIQUE INDEX `peopleName_UNIQUE` (`peopleName` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Language`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Language` (
    `languageID` VARCHAR(20) NOT NULL,
    `notCraftable` BIT(1) NULL,
    PRIMARY KEY (`languageID`),
    FOREIGN KEY (`languageID`)
        REFERENCES `Skill` (`skillID`)
        ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=INNODB;


-- -----------------------------------------------------
-- Table `Visitor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Visitor` (
  `visitorID` VARCHAR(20) NOT NULL,
  `visitorIsNumaOnly` BIT(1) NULL,
  `languageID` VARCHAR(20) NULL,
  PRIMARY KEY (`visitorID`),
  UNIQUE INDEX `languageID_UNIQUE` (`languageID` ASC) VISIBLE,
    FOREIGN KEY (`visitorID`)
    REFERENCES `People` (`peopleID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`languageID`)
    REFERENCES Language(`languageID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Assistant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Assistant` (
    `assistantID` VARCHAR(20) NOT NULL,
    `assistantSpecialty` VARCHAR(20) NULL,
    `assistantCost` INT NULL,
    `assistantLocation` VARCHAR(20) NULL,
    `itemID` VARCHAR(20) NULL,
    `elementOfTheSoulID` VARCHAR(20) NULL,
    PRIMARY KEY (`assistantID`),
    FOREIGN KEY (`itemID`)
        REFERENCES `Item` (`itemID`)
        ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (`assistantID`)
        REFERENCES `People` (`peopleID`)
        ON DELETE CASCADE ON UPDATE CASCADE
)  ENGINE=INNODB;


-- -----------------------------------------------------
-- Table `SkillEOTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SkillEOTS` (
  `skillID` VARCHAR(20) NOT NULL,
  `elementOfTheSoulID` VARCHAR(20) NULL,
  PRIMARY KEY (`skillID`),
  INDEX `elementOfTheSoulID_idx` (`elementOfTheSoulID` ASC) VISIBLE,
    FOREIGN KEY (`elementOfTheSoulID`)
    REFERENCES `ElementOfTheSoul` (`elementOfTheSoulID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillPeople`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SkillPeople` (
  `skillID` VARCHAR(20) NOT NULL,
  `peopleID` VARCHAR(45) NULL,
  PRIMARY KEY (`skillID`),
  INDEX `peopleID_idx` (`peopleID` ASC) VISIBLE,
    FOREIGN KEY (`skillID`)
    REFERENCES `SkillEOTS` (`skillID`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
    FOREIGN KEY (`peopleID`)
    REFERENCES `People` (`peopleID`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ItemSkillBook`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ItemSkillBook` (
  `itemID` VARCHAR(20) NOT NULL,
  `skillID` VARCHAR(20) NOT NULL,
  `bookID` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`itemID`, `skillID`),
  INDEX `skillID_idx` (`skillID` ASC) VISIBLE,
  INDEX `bookID_idx` (`bookID` ASC) VISIBLE,
    FOREIGN KEY (`itemID`)
    REFERENCES `Item` (`itemID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`bookID`)
    REFERENCES `Book` (`bookID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SkillMemory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SkillMemory` (
  `skillID` VARCHAR(20) NOT NULL,
  `memoryID` VARCHAR(20) NULL,
  PRIMARY KEY (`skillID`),
  INDEX `memoryID_idx` (`memoryID` ASC) VISIBLE,
  FOREIGN KEY (`skillID`)
  REFERENCES `ItemSkillBook`(`skillID`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
FOREIGN KEY (`memoryID`)
REFERENCES `Memory` (`memoryID`)
ON DELETE CASCADE
ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Adding Data
-- -----------------------------------------------------

-- MEMORY --
INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME001', 'Memory: Taste', 'Considering sustenance and beverages', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME002', 'Memory: Sound', 'Considering the Hush House Key', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME003', 'Memory: Sight', 'Considering Busts, burning things', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME004', 'Memory: Scent', 'Considering flowers', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME005', 'Memory: Touch', 'Considering comforts', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME006', 'Memory: Contradiction', 'Edge books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME007', 'Memory: Foresight', 'Edge or Forge books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME008', 'Memory: Satisfaction', 'Grail books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME009', 'Memory: Solace', 'Heart or Sky books, or Dog / Cat pets', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME010', 'Memory: Storm', 'Heart books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME011', 'Memory: Salt', 'Moon books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME012', 'Memory: Pattern', 'Knock books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME013', 'Memory: Revelation', 'Lantern books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME014', 'Memory: A Stolen Secret', 'Knock or Moon books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME015', 'Memory: Intuition', 'Rose or Moon books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME016', 'Memory: Impulse', 'Moth books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME017', 'Memory: Gossip', 'Various books, or Cockatoo pet', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME018', 'Memory: Fear', 'Scale or Edge books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME019', 'Memory: Regret', 'Winter books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME020', 'Memory: Hindsight', 'Winter books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME021', 'Secret Threshold', 'Knock books, or Knock 5 crafts', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME022', 'Confounding Parable', 'Rose, Sky or Moon 5 crafts and books', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME023', 'Beguiling Melody', 'Grail books or Grail 5 craft', 1, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME024', 'Cheerful Ditty', 'Sky books, or Heart 5 crafts', 1, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME025', 'Savage Hymm', 'Singlefoot Songs, Unhatched Hymms (books) or Scale/Nectar 5 crafts', 1, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME026', 'Wistful Air', 'Sky 5 crafts', 1, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME027', 'Bittersweet Uncertainty', 'Various books, or Winter 5 crafts', 1, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME028', 'Earth-Sign', 'Rapt in the King, De Ratio Quercum (books), or Viper pets', 0, 1, 1, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME029', 'Occult Scraps', 'Considering Yellowing Newspaper', 0, 0, 1, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME030', 'Old Wound', 'Edicts Martial Moon 5 craft', 0, 0, 1, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME031', 'Winning Move', 'Edge 10 crafts', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME032', 'Curious Hunch', 'Knock 10 crafts', 0, 1, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME033', 'Enduring Reflection', 'Rose 10 crafts', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME034', 'Old Moment', 'Scale crafting, or Living Relic pet', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME035', 'Hive''s Lament', 'Gather at Beehive during Numa', 1, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME036', 'Wind-Rumour', 'Sky craft, or Seagull pet', 0, 1, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME037', 'Ascendant Harmony', 'Sky 10 crafts', 1, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME038', 'Didumos', 'Sky 15 crafts', 0, 0, 1, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME039', 'Horizon-Sight', 'Stymphling pet, or craft Rose 15', 0, 0, 1, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME040', 'Forbidden Epic', 'Edge 15 crafts', 0, 0, 1, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME041', 'Invincible Audacity', 'Edge 15 crafts', 0, 0, 1, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME042', 'Earthquake Name', 'Scale 15 crafts', 0, 1, 1, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME043', 'Numen: Loopholes', 'Serpent-Root', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME044', 'Numen: Inescapable Confinement', 'Towards A Fundamental Aesthetic', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME045', 'Numen: The Sun''s Weakness', 'The Sun Disfigured', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME046', 'Numen: A Final Understanding', 'Towards A Fundamental Aesthetic: Second Edition', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME047', 'Numen: That Old Lost Music', 'The Turquoise Hand', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME048', 'Numen: The Great Counterfeit', 'Shuritic Book of Suns', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME049', 'Numen: Merciless Alterations', 'A Child''s Treasure of Golden Afternoons', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME050', 'Numen: The Bells of Ys', 'Amiranis Beteli', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME051', 'Numen: Back Into Balance', 'The Sky in the Scar', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME052', 'Numen: Weaving The World', 'Kopralith Omphalos', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME053', 'Numen: The Paths of the Sun', 'The Sun''s Design', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME054', 'Numen: An Irresistible Feast', 'The Writing On The Wall', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME055', 'Numen: Three Rules', 'The Three And The Three (St Chiavi Manuscript)', 0, 0, 0, 0);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME056', 'Clouds', 'Random draw on new day, most likely in Spring and Summer', 0, 0, 0, 1);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME057', 'Sunny', 'Random draw on new day, most likely in Spring and Summer', 0, 0, 0, 1);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME058', 'Rain', 'Random draw on new day, most likely in Fall', 0, 0, 0, 1);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME059', 'Gale', 'Random draw on new day, most likely in Fall and Winter', 0, 0, 0, 1);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME060', 'Fog', 'Random draw on new day, most likely in Fall', 0, 0, 0, 1);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME061', 'Hail', 'Random draw on new day, most likely in Winter', 0, 0, 0, 1);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME062', 'Storm', 'Random draw on new day, most likely in Winter', 0, 0, 0, 1);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME063', 'Snow', 'Random draw on new day, only in Winter', 0, 0, 0, 1);

INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather)
VALUES ('ME064', 'Nume-Brume', 'Guaranteed in Numa', 0, 0, 0, 1);

-- Book

INSERT IGNORE INTO Book(bookID, bookName, language, aspectID, memoryID, skillID, numenID, elementOfTheSoulID)
VALUES ('BK001', 'The War of the Roads, 1451-1551', NULL, 'AS001', 'ME007', NULL, NULL, NULL)