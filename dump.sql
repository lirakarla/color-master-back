-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: color_master
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idCategoria` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Pasteles'),(2,'Colores Vivos'),(3,'Atardecer'),(4,'Nocturnos'),(5,'Frescos'),(6,'Cálidos'),(7,'Infantiles'),(8,'Claros'),(9,'Llamativos'),(10,'Nude'),(11,'Fríos');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `idColor` int NOT NULL AUTO_INCREMENT,
  `hexadecimal` varchar(10) DEFAULT NULL,
  `idPaleta` int NOT NULL,
  PRIMARY KEY (`idColor`),
  KEY `FK_Color_Paleta_idPaleta` (`idPaleta`),
  CONSTRAINT `FK_Color_Paleta_idPaleta` FOREIGN KEY (`idPaleta`) REFERENCES `paleta` (`idPaleta`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'#d9d0c1',36),(2,'#c79a81',36),(3,'#732439',36),(4,'#59192a',36),(5,'#4b1520',36),(6,'#f48c06',37),(7,'#e85d04',37),(8,'#dc2f02',37),(9,'#d00000',37),(10,'#9d0208',37),(11,'#dad7cd',38),(12,'#a3b18a',38),(13,'#588157',38),(14,'#3a5a40',38),(15,'#344e41',38),(16,'#010440',39),(17,'#020659',39),(18,'#030a8c',39),(19,'#040dbf',39),(20,'#040fd9',39),(21,'#011f26',40),(22,'#033a40',40),(23,'#035959',40),(24,'#f2786d',40),(25,'#733c3c',40),(26,'#7d8a2e',41),(27,'#c9d787',41),(28,'#ffffff',41),(29,'#fac0a9',41),(30,'#ff8598',41),(31,'#d9072d',42),(32,'#ee925d',42),(33,'#f2ae30',42),(34,'#EAD068',42),(35,'#e8c0ad',42),(36,'#4a7a8c',43),(37,'#3c6973',43),(38,'#d0d8d9',43),(39,'#f2bf91',43),(40,'#0d0d0d',43),(41,'#2b2240',44),(42,'#7d5cf2',44),(43,'#7790a6',44),(44,'#f2f2f2',44),(45,'#0d0d0d',44),(46,'#f9dbbd',45),(47,'#ffa5ab',45),(48,'#da627d',45),(49,'#a53860',45),(50,'#450920',45),(51,'#ede0d4',46),(52,'#e6ccb2',46),(53,'#ddb892',46),(54,'#b08968',46),(55,'#7f5539',46),(56,'#22577a',47),(57,'#38a3a5',47),(58,'#57cc98',47),(59,'#FFF0DB',47),(60,'#f3eeef',47),(61,'#f2f2f2',48),(62,'#f2cb05',48),(63,'#f2d857',48),(64,'#F7F0C3',48),(65,'#d9d0c1',48),(66,'#96BD5D',49),(67,'#0E9350',49),(68,'#1DCD6E',49),(69,'#0DB58E',49),(70,'#3BEBBC',49),(71,'#25ced1',50),(72,'#ffffff',50),(73,'#fceade',50),(74,'#ff8a5b',50),(75,'#ea526f',50),(76,'#cc5803',51),(77,'#e2711d',51),(78,'#ff9505',51),(79,'#ffb627',51),(80,'#f4d198',51),(81,'#ffd8be',52),(82,'#ffeedd',52),(83,'#f8f7ff',52),(84,'#b8b8ff',52),(85,'#9381ff',52),(101,'#ED0A55',55),(102,'#E7A6C1',55),(103,'#F59C7C',55),(104,'#9FAA86',55),(105,'#FEF23D',55),(106,'#ffd6ff',56),(107,'#e7c6ff',56),(108,'#c8b6ff',56),(109,'#b8c0ff',56),(110,'#bbd0ff',56),(111,'#86e3ce',57),(112,'#d0e6a5',57),(113,'#ffdd94',57),(114,'#ffaa88',57),(115,'#ccabdb',57),(121,'#f28993',58),(122,'#aec4c5',58),(123,'#f2d274',58),(124,'#ebc071',58),(125,'#f0af61',58),(161,'#d9ab73',59),(162,'#bf8654',59),(163,'#bfab99',59),(164,'#d9d0c7',59),(165,'#f2eae4',59),(166,'#f28705',61),(167,'#f2b56b',61),(168,'#d95204',61),(169,'#d9d5d2',61),(170,'#8c0e03',61),(181,'#353440',60),(182,'#f2808a',60),(183,'#F9D6D9',60),(184,'#d9b777',60),(185,'#bf9b6f',60);
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorito`
--

DROP TABLE IF EXISTS `favorito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorito` (
  `idPaleta` int NOT NULL,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idPaleta`,`idUsuario`),
  KEY `FK_Favorito_Usuario_idUsuario` (`idUsuario`),
  CONSTRAINT `FK_Favorito_Paleta_idPaleta` FOREIGN KEY (`idPaleta`) REFERENCES `paleta` (`idPaleta`),
  CONSTRAINT `FK_Favorito_Usuario_idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorito`
--

LOCK TABLES `favorito` WRITE;
/*!40000 ALTER TABLE `favorito` DISABLE KEYS */;
INSERT INTO `favorito` VALUES (36,2),(38,2),(39,2),(41,2),(42,2),(48,2),(49,2),(56,2),(38,11),(39,11),(40,11),(41,12),(43,12),(36,14),(37,14),(38,14),(39,14),(40,14),(36,15);
/*!40000 ALTER TABLE `favorito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paleta`
--

DROP TABLE IF EXISTS `paleta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paleta` (
  `idPaleta` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idPaleta`),
  KEY `FK_Paleta_Usuario_idUsuario` (`idUsuario`),
  CONSTRAINT `FK_Paleta_Usuario_idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paleta`
--

LOCK TABLES `paleta` WRITE;
/*!40000 ALTER TABLE `paleta` DISABLE KEYS */;
INSERT INTO `paleta` VALUES (36,'Borgoña',10),(37,'Coctel',10),(38,'Verde Militar',10),(39,'Océano',10),(40,'Nube',10),(41,'Watermelon',2),(42,'Gold',2),(43,'Le Comptoir',2),(44,'Analytics ',2),(45,'Pink',2),(46,'nudes',2),(47,'bosque',2),(48,'Sunshine',2),(49,'Verdes',1),(50,'Primavera',1),(51,'Atardecer',1),(52,'Claros',1),(55,'primavera',14),(56,'Morados',14),(57,'Turtle',14),(58,'Pillows',14),(59,'Native',14),(60,'IAS ',14),(61,'Coctel',14);
/*!40000 ALTER TABLE `paleta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paletacategoria`
--

DROP TABLE IF EXISTS `paletacategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paletacategoria` (
  `idPaleta` int NOT NULL,
  `idCategoria` int NOT NULL,
  PRIMARY KEY (`idPaleta`,`idCategoria`),
  KEY `FK_PaletaCategoria_Categoria_idCategoria` (`idCategoria`),
  CONSTRAINT `FK_PaletaCategoria_Categoria_idCategoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`),
  CONSTRAINT `FK_PaletaCategoria_Paleta_idPaleta` FOREIGN KEY (`idPaleta`) REFERENCES `paleta` (`idPaleta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paletacategoria`
--

LOCK TABLES `paletacategoria` WRITE;
/*!40000 ALTER TABLE `paletacategoria` DISABLE KEYS */;
INSERT INTO `paletacategoria` VALUES (36,1),(41,1),(45,1),(60,1),(37,2),(40,2),(42,2),(48,2),(50,2),(37,3),(42,3),(43,3),(50,3),(57,3),(39,4),(40,4),(56,4),(39,5),(47,5),(49,5),(41,6),(42,6),(48,6),(51,6),(57,6),(58,6),(61,6),(61,7),(40,8),(41,8),(42,8),(43,8),(45,8),(46,8),(52,8),(55,8),(59,8),(37,9),(40,9),(42,9),(47,9),(48,9),(50,9),(55,9),(61,9),(36,10),(46,10),(52,10),(59,10),(38,11),(39,11),(47,11),(56,11);
/*!40000 ALTER TABLE `paletacategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(1024) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `contrasena` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'fernando.periquito@hotmail.com','Fernando Periquito','$2y$10$aVHzkd7.DsJP.dYwQnVlNOe0UfPgFP2hED44YivrkHA.ztcmIUGSS '),(2,'karla.lira@gmail.com','Karla','$2b$10$juFO1Oo74J30iTcAVLA82Ou/eFkX002WmUkjb3vokXdYWLGJIwiI6'),(10,'Jesus.Aremendariz@hotmail.com','Jesus','$2b$10$juFO1Oo74J30iTcAVLA82Ou/eFkX002WmUkjb3vokXdYWLGJIwiI6'),(11,'anameliaShepard@gmail.com','Amelia','$2b$10$juFO1Oo74J30iTcAVLA82Ou/eFkX002WmUkjb3vokXdYWLGJIwiI6'),(12,'patrick.13@hotmail.com','Patrick Dempsey','$2b$10$juFO1Oo74J30iTcAVLA82Ou/eFkX002WmUkjb3vokXdYWLGJIwiI6'),(13,'Ruben@gmail.com','Ruben.Robles','$2b$10$juFO1Oo74J30iTcAVLA82Ou/eFkX002WmUkjb3vokXdYWLGJIwiI6'),(14,'alejandra@gmail.com','alejandra.lira','$2b$10$juFO1Oo74J30iTcAVLA82Ou/eFkX002WmUkjb3vokXdYWLGJIwiI6'),(15,'delia.lira@gmail.com','delia','$2b$10$juFO1Oo74J30iTcAVLA82Ou/eFkX002WmUkjb3vokXdYWLGJIwiI6'),(16,'karlita@gmail.com','karlitaa','$2b$10$juFO1Oo74J30iTcAVLA82Ou/eFkX002WmUkjb3vokXdYWLGJIwiI6');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-18 19:11:41
