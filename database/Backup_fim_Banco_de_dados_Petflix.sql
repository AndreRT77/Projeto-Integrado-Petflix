CREATE DATABASE  IF NOT EXISTS `db_pet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_pet`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: db_pet
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `tbl_abrigo`
--

DROP TABLE IF EXISTS `tbl_abrigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_abrigo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cnpj` varchar(20) NOT NULL,
  `informacoes` text NOT NULL,
  `contato` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_abrigo`
--

LOCK TABLES `tbl_abrigo` WRITE;
/*!40000 ALTER TABLE `tbl_abrigo` DISABLE KEYS */;
INSERT INTO `tbl_abrigo` VALUES (1,'Abrigo Patinhas Felizes','12.345.678/0001-90','Especializado em cães idosos.','1133334444','contato@patinhas.com'),(2,'Recanto dos Bichos','98.765.432/0001-10','Resgate de animais de rua.','1133335555','adm@recanto.com'),(3,'Abrigo Patinhas Felizes','12.345.678/0001-90','Especializado em cães idosos.','1133334444','contato@patinhas.com'),(4,'Recanto dos Bichos','98.765.432/0001-10','Resgate de animais de rua.','1133335555','adm@recanto.com');
/*!40000 ALTER TABLE `tbl_abrigo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_abrigo_ong`
--

DROP TABLE IF EXISTS `tbl_abrigo_ong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_abrigo_ong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status_patrocinio` enum('Ativo','Desfeita','Em processo') NOT NULL,
  `tipo_paceria` text NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date DEFAULT NULL,
  `id_ong` int NOT NULL,
  `id_abrigo` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ong` (`id_ong`),
  KEY `id_abrigo` (`id_abrigo`),
  CONSTRAINT `tbl_abrigo_ong_ibfk_1` FOREIGN KEY (`id_ong`) REFERENCES `tbl_ong` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_abrigo_ong_ibfk_2` FOREIGN KEY (`id_abrigo`) REFERENCES `tbl_abrigo` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_abrigo_ong`
--

LOCK TABLES `tbl_abrigo_ong` WRITE;
/*!40000 ALTER TABLE `tbl_abrigo_ong` DISABLE KEYS */;
INSERT INTO `tbl_abrigo_ong` VALUES (1,'Ativo','Financeira','0000-00-00',NULL,1,1),(2,'Ativo','Financeira','0000-00-00',NULL,1,1);
/*!40000 ALTER TABLE `tbl_abrigo_ong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_endereco_abrigo`
--

DROP TABLE IF EXISTS `tbl_endereco_abrigo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_endereco_abrigo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(100) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `id_abrigo` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_abrigo` (`id_abrigo`),
  CONSTRAINT `tbl_endereco_abrigo_ibfk_1` FOREIGN KEY (`id_abrigo`) REFERENCES `tbl_abrigo` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_endereco_abrigo`
--

LOCK TABLES `tbl_endereco_abrigo` WRITE;
/*!40000 ALTER TABLE `tbl_endereco_abrigo` DISABLE KEYS */;
INSERT INTO `tbl_endereco_abrigo` VALUES (1,' R Benedito Pereira Leite','14','Centro','Jandira','SP','06600055',1);
/*!40000 ALTER TABLE `tbl_endereco_abrigo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_endereco_ong`
--

DROP TABLE IF EXISTS `tbl_endereco_ong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_endereco_ong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(100) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `id_ong` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ong` (`id_ong`),
  CONSTRAINT `tbl_endereco_ong_ibfk_1` FOREIGN KEY (`id_ong`) REFERENCES `tbl_ong` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_endereco_ong`
--

LOCK TABLES `tbl_endereco_ong` WRITE;
/*!40000 ALTER TABLE `tbl_endereco_ong` DISABLE KEYS */;
INSERT INTO `tbl_endereco_ong` VALUES (1,' Rua Albino Imparato','320','Vila Guanabara','Duque de Caxias','RJ','25080000',1);
/*!40000 ALTER TABLE `tbl_endereco_ong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_endereco_responsavel_pet`
--

DROP TABLE IF EXISTS `tbl_endereco_responsavel_pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_endereco_responsavel_pet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(100) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `id_responsavel_pet` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_responsavel_pet` (`id_responsavel_pet`),
  CONSTRAINT `tbl_endereco_responsavel_pet_ibfk_1` FOREIGN KEY (`id_responsavel_pet`) REFERENCES `tbl_responsavel_pet` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_endereco_responsavel_pet`
--

LOCK TABLES `tbl_endereco_responsavel_pet` WRITE;
/*!40000 ALTER TABLE `tbl_endereco_responsavel_pet` DISABLE KEYS */;
INSERT INTO `tbl_endereco_responsavel_pet` VALUES (1,'Rua Barão de Vitória','102','Casa Grande','Diadema','SP','09961660',1);
/*!40000 ALTER TABLE `tbl_endereco_responsavel_pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_endereco_tutor_interessado`
--

DROP TABLE IF EXISTS `tbl_endereco_tutor_interessado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_endereco_tutor_interessado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `logradouro` varchar(100) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `id_tutor_interessado` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tutor_interessado` (`id_tutor_interessado`),
  CONSTRAINT `tbl_endereco_tutor_interessado_ibfk_1` FOREIGN KEY (`id_tutor_interessado`) REFERENCES `tbl_tutor_interessado` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_endereco_tutor_interessado`
--

LOCK TABLES `tbl_endereco_tutor_interessado` WRITE;
/*!40000 ALTER TABLE `tbl_endereco_tutor_interessado` DISABLE KEYS */;
INSERT INTO `tbl_endereco_tutor_interessado` VALUES (1,'Rua Serra de Bragança','391','Vila Gomes Cardim','São Paulo','SP','03318000',1);
/*!40000 ALTER TABLE `tbl_endereco_tutor_interessado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_especie`
--

DROP TABLE IF EXISTS `tbl_especie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_especie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `habitat` varchar(100) NOT NULL,
  `descricao` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_especie`
--

LOCK TABLES `tbl_especie` WRITE;
/*!40000 ALTER TABLE `tbl_especie` DISABLE KEYS */;
INSERT INTO `tbl_especie` VALUES (1,'Cachorro','Doméstico',NULL),(3,'undefined','undefined','undefined'),(4,'undefined','undefined','undefined'),(5,'Gato','Doméstico','independente e as vezes carinhoso'),(6,'Gato','Doméstico','independente e as vezes carinhoso'),(7,'Cachorro','Doméstico',NULL),(8,'Gato','Doméstico',NULL);
/*!40000 ALTER TABLE `tbl_especie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_historico_adocao`
--

DROP TABLE IF EXISTS `tbl_historico_adocao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_historico_adocao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pet` varchar(100) NOT NULL,
  `informacoes` text,
  `data_adocao` date DEFAULT NULL,
  `observacoes` text,
  `id_tutor_interessado` int NOT NULL,
  `id_pet` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tutor_interessado` (`id_tutor_interessado`),
  KEY `id_pet` (`id_pet`),
  CONSTRAINT `tbl_historico_adocao_ibfk_1` FOREIGN KEY (`id_tutor_interessado`) REFERENCES `tbl_tutor_interessado` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_historico_adocao_ibfk_2` FOREIGN KEY (`id_pet`) REFERENCES `tbl_pet` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_historico_adocao`
--

LOCK TABLES `tbl_historico_adocao` WRITE;
/*!40000 ALTER TABLE `tbl_historico_adocao` DISABLE KEYS */;
INSERT INTO `tbl_historico_adocao` VALUES (1,'Ludwig',NULL,'2025-12-15',NULL,4,16),(2,'Cleito',NULL,'2025-12-16',NULL,2,17);
/*!40000 ALTER TABLE `tbl_historico_adocao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ong`
--

DROP TABLE IF EXISTS `tbl_ong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ong` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cnpj` varchar(20) NOT NULL,
  `informacoes` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `contato` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ong`
--

LOCK TABLES `tbl_ong` WRITE;
/*!40000 ALTER TABLE `tbl_ong` DISABLE KEYS */;
INSERT INTO `tbl_ong` VALUES (1,'ONG Amigos de 4 Patas','11.222.333/0001-44','Campanhas de castração.','fale@amigos4patas.org','11977776666'),(2,'SOS Vida Animal','55.666.777/0001-88','Resgate de emergência.','sos@vidaanimal.org','11966665555'),(3,'ONG Amigos de 4 Patas','11.222.333/0001-44','Campanhas de castração.','fale@amigos4patas.org','11977776666'),(4,'SOS Vida Animal','55.666.777/0001-88','Resgate de emergência.','sos@vidaanimal.org','11966665555');
/*!40000 ALTER TABLE `tbl_ong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_pedido_adocao`
--

DROP TABLE IF EXISTS `tbl_pedido_adocao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_pedido_adocao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status_processo` enum('Em análise','Aprovado','Negado') NOT NULL,
  `informacoes` text NOT NULL,
  `data_pedido` date DEFAULT NULL,
  `id_tutor_interessado` int NOT NULL,
  `id_responsavel_pet` int NOT NULL,
  `id_pet` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tutor_interessado` (`id_tutor_interessado`),
  KEY `id_responsavel_pet` (`id_responsavel_pet`),
  KEY `id_pet` (`id_pet`),
  CONSTRAINT `tbl_pedido_adocao_ibfk_1` FOREIGN KEY (`id_tutor_interessado`) REFERENCES `tbl_tutor_interessado` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_pedido_adocao_ibfk_2` FOREIGN KEY (`id_responsavel_pet`) REFERENCES `tbl_responsavel_pet` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_pedido_adocao_ibfk_3` FOREIGN KEY (`id_pet`) REFERENCES `tbl_pet` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pedido_adocao`
--

LOCK TABLES `tbl_pedido_adocao` WRITE;
/*!40000 ALTER TABLE `tbl_pedido_adocao` DISABLE KEYS */;
INSERT INTO `tbl_pedido_adocao` VALUES (2,'Aprovado','Cachorro adotado','0000-00-00',1,1,1),(5,'Aprovado','O pedido foi aprovado com sucesso','2025-12-15',3,3,11),(6,'Aprovado','O pedido foi aprovado com sucesso','2025-12-15',4,4,14),(7,'Em análise','Cachorro adotado','0000-00-00',4,4,14),(8,'Negado','O pedido foi aprovado com sucesso','2025-12-15',4,4,15),(9,'Aprovado','O pedido foi aprovado com sucesso','2025-12-16',4,4,16),(10,'Em análise','Pedido para adoção do gato Ludwig','0000-00-00',2,2,17),(11,'Aprovado','O pedido foi aprovado com sucesso','2025-12-16',2,2,17);
/*!40000 ALTER TABLE `tbl_pedido_adocao` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_pedido_insert_pet_em_processo` AFTER INSERT ON `tbl_pedido_adocao` FOR EACH ROW BEGIN
    UPDATE tbl_pet
    SET status_adocao = 'Em processo de adoção'
    WHERE id = NEW.id_pet;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_usuario_para_tutor_interessado` AFTER INSERT ON `tbl_pedido_adocao` FOR EACH ROW BEGIN
    DECLARE v_existe INT;

    -- verifica se já é tutor_interessado
    SELECT COUNT(*) INTO v_existe
    FROM tbl_tutor_interessado
    WHERE id = NEW.id_tutor_interessado;

    -- se não existir, insere usando dados do usuário
    IF v_existe = 0 THEN
        INSERT INTO tbl_tutor_interessado (
            id,
            nome,
            cpf,
            contato,
            email,
            data_nascimento,
            lista_de_interesse,
            preferencias
        )
        SELECT
            u.id,
            u.nome,
            u.cpf,
            u.contato,
            u.email,
            u.data_nascimento,
            u.lista_de_interesse,
            u.preferencias
        FROM tbl_usuario u
        WHERE u.id = NEW.id_tutor_interessado;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_pedido_update_pet_status` AFTER UPDATE ON `tbl_pedido_adocao` FOR EACH ROW BEGIN
    IF NEW.status_processo <> OLD.status_processo THEN

        IF NEW.status_processo = 'Aprovado' THEN
            UPDATE tbl_pet
            SET status_adocao = 'Já foi Adotado'
            WHERE id = NEW.id_pet;

        ELSEIF NEW.status_processo = 'Negado' THEN
            UPDATE tbl_pet
            SET status_adocao = 'Disponível'
            WHERE id = NEW.id_pet;
        END IF;

    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tbl_pet`
--

DROP TABLE IF EXISTS `tbl_pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_pet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `idade` int NOT NULL,
  `sexo` enum('Macho','Fêmea') NOT NULL,
  `tamanho` double(4,2) NOT NULL,
  `status_adocao` enum('Disponível','Em processo de adoção','Já foi Adotado') NOT NULL,
  `nacionalidade` varchar(200) NOT NULL,
  `necessidades_especiais` text,
  `descricao` text,
  `midia` varchar(255) NOT NULL,
  `id_especie` int NOT NULL,
  `id_responsavel_pet` int NOT NULL,
  `id_abrigo` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_responsavel_pet` (`id_responsavel_pet`),
  KEY `id_abrigo` (`id_abrigo`),
  KEY `id_especie` (`id_especie`),
  CONSTRAINT `tbl_pet_ibfk_1` FOREIGN KEY (`id_responsavel_pet`) REFERENCES `tbl_responsavel_pet` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_pet_ibfk_2` FOREIGN KEY (`id_abrigo`) REFERENCES `tbl_abrigo` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tbl_pet_ibfk_3` FOREIGN KEY (`id_especie`) REFERENCES `tbl_especie` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_pet`
--

LOCK TABLES `tbl_pet` WRITE;
/*!40000 ALTER TABLE `tbl_pet` DISABLE KEYS */;
INSERT INTO `tbl_pet` VALUES (1,'Aenocyon',3,'Macho',60.00,'Disponível','Brasil',NULL,'Amigável e agitado','https://www.petz.com.br/blog/wp-content/uploads/2023/07/husky-siberiano-e-bravo.jpg',1,1,1),(11,'Aenocyon',3,'Macho',60.00,'Em processo de adoção','Brasil',NULL,'Amigável e agitado','https://www.petz.com.br/blog/wp-content/uploads/2023/07/husky-siberiano-e-bravo.jpg',1,1,1),(14,'Ludwig',2,'Macho',40.00,'Em processo de adoção','Brasil',NULL,'Inteligente, antipático e reservado','https://upload.wikimedia.org/wikipedia/commons/9/9b/Photograph_of_Socks_the_Cat-_07-13-1994_%286461517483%29.jpg',8,4,4),(15,'Ludwig',2,'Macho',40.00,'Disponível','Brasil',NULL,'Inteligente, antipático e reservado','https://upload.wikimedia.org/wikipedia/commons/9/9b/Photograph_of_Socks_the_Cat-_07-13-1994_%286461517483%29.jpg',8,4,4),(16,'Ludwig',2,'Macho',40.00,'Já foi Adotado','Brasil',NULL,'Inteligente, antipático e reservado','https://upload.wikimedia.org/wikipedia/commons/9/9b/Photograph_of_Socks_the_Cat-_07-13-1994_%286461517483%29.jpg',8,4,4),(17,'Cleito',2,'Macho',40.00,'Já foi Adotado','Brasil',NULL,'Inteligente, antipático e reservado','https://upload.wikimedia.org/wikipedia/commons/9/9b/Photograph_of_Socks_the_Cat-_07-13-1994_%286461517483%29.jpg',8,4,4);
/*!40000 ALTER TABLE `tbl_pet` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_usuario_para_responsavel_pet` AFTER INSERT ON `tbl_pet` FOR EACH ROW BEGIN
    DECLARE v_existe INT;

    -- verifica se já é responsável
    SELECT COUNT(*) INTO v_existe
    FROM tbl_responsavel_pet
    WHERE id = NEW.id_responsavel_pet;

    -- se não existir, cria o responsável
    IF v_existe = 0 THEN
        INSERT INTO tbl_responsavel_pet (
            id,
            nome,
            cpf,
            contato,
            email
        )
        SELECT
            u.id,
            u.nome,
            u.cpf,
            u.contato,
            u.email
        FROM tbl_usuario u
        WHERE u.id = NEW.id_responsavel_pet;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_adicionar_pet_historico_adocao` AFTER UPDATE ON `tbl_pet` FOR EACH ROW BEGIN
    -- Executa apenas se o status mudou para "Já foi Adotado"
    IF NEW.status_adocao <> OLD.status_adocao
       AND NEW.status_adocao = 'Já foi Adotado' THEN

        INSERT INTO tbl_historico_adocao (
            pet,
            id_pet,
            id_tutor_interessado,
            data_adocao
        )
        SELECT
            p.nome,                    -- nome do pet
            p.id,                      -- id do pet
            pa.id_tutor_interessado,   -- tutor adotante
            CURRENT_DATE()
        FROM tbl_pedido_adocao pa
        JOIN tbl_pet p ON p.id = pa.id_pet
        WHERE pa.id_pet = NEW.id
          AND pa.status_processo = 'Aprovado'
        LIMIT 1;

    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tbl_raca`
--

DROP TABLE IF EXISTS `tbl_raca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_raca` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `expectativa_de_vida` int NOT NULL,
  `saude` text NOT NULL,
  `peso_medio` int DEFAULT NULL,
  `porte` enum('Pequeno','Médio','Grande','Gigante') NOT NULL,
  `capacidades` text,
  `id_especie` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_especie` (`id_especie`),
  CONSTRAINT `tbl_raca_ibfk_1` FOREIGN KEY (`id_especie`) REFERENCES `tbl_especie` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_raca`
--

LOCK TABLES `tbl_raca` WRITE;
/*!40000 ALTER TABLE `tbl_raca` DISABLE KEYS */;
INSERT INTO `tbl_raca` VALUES (1,'Husky Siberiano',15,'Saudável',27,'Grande','Carregar trenó, ficar em lugares extramente frios',1),(2,'Husky Siberiano',15,'Saudável',27,'Grande','Carregar trenó, ficar em lugares extramente frios',1);
/*!40000 ALTER TABLE `tbl_raca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_responsavel_pet`
--

DROP TABLE IF EXISTS `tbl_responsavel_pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_responsavel_pet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(100) NOT NULL,
  `contato` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_responsavel_pet`
--

LOCK TABLES `tbl_responsavel_pet` WRITE;
/*!40000 ALTER TABLE `tbl_responsavel_pet` DISABLE KEYS */;
INSERT INTO `tbl_responsavel_pet` VALUES (1,'Ana Souza','123.456.789-00','11999998888','ana.souza@email.com'),(2,'Carlos Lima','987.654.321-11','11988887777','carlos.lima@email.com'),(3,'Ana Souza','123.456.789-00','11999998888','ana.souza@email.com'),(4,'Carlos Lima','987.654.321-11','11988887777','carlos.lima@email.com');
/*!40000 ALTER TABLE `tbl_responsavel_pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tutor_interessado`
--

DROP TABLE IF EXISTS `tbl_tutor_interessado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tutor_interessado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(100) NOT NULL,
  `contato` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `lista_de_interesse` text NOT NULL,
  `preferencias` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tutor_interessado`
--

LOCK TABLES `tbl_tutor_interessado` WRITE;
/*!40000 ALTER TABLE `tbl_tutor_interessado` DISABLE KEYS */;
INSERT INTO `tbl_tutor_interessado` VALUES (1,'Beatriz Mendes','111.222.333-44','11955554444','bia.mendes@email.com','1995-05-20','Cães médios','Animais agitados'),(2,'João Paulo','555.666.777-88','11944443333','joao.paulo@email.com','1988-12-10','Gatos',''),(3,'Beatriz Mendes','111.222.333-44','11955554444','bia.mendes@email.com','1995-05-20','Cães médios','Animais agitados'),(4,'João Paulo','555.666.777-88','11944443333','joao.paulo@email.com','1988-12-10','Gatos','');
/*!40000 ALTER TABLE `tbl_tutor_interessado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_usuário`
--

DROP TABLE IF EXISTS `tbl_usuário`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_usuário` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(100) NOT NULL,
  `contato` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `preferencias` text,
  `lista_de_interesse` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_usuário`
--

LOCK TABLES `tbl_usuário` WRITE;
/*!40000 ALTER TABLE `tbl_usuário` DISABLE KEYS */;
INSERT INTO `tbl_usuário` VALUES (1,'Beatriz Mendes','111.222.333-44','11955554444','bia.mendes@email.com','1995-05-20','Animais agitados','Cães médios');
/*!40000 ALTER TABLE `tbl_usuário` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_pet'
--

--
-- Dumping routines for database 'db_pet'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 10:25:43
