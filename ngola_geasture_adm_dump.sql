/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.11-MariaDB, for Linux (x86_64)
--
-- Host: 192.168.100.185    Database: ngola_geasture_adm
-- ------------------------------------------------------
-- Server version	8.4.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_keys`
--

DROP TABLE IF EXISTS `api_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_keys` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `key_prefix` varchar(32) COLLATE utf8mb4_general_ci NOT NULL,
  `key_hash` char(64) COLLATE utf8mb4_general_ci NOT NULL,
  `scopes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_used_at` datetime DEFAULT NULL,
  `revoked_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_api_keys_hash` (`key_hash`),
  KEY `idx_api_keys_active` (`is_active`,`created_at`),
  CONSTRAINT `api_keys_chk_1` CHECK (json_valid(`scopes`))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_keys`
--

LOCK TABLES `api_keys` WRITE;
/*!40000 ALTER TABLE `api_keys` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_keys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_settings`
--

DROP TABLE IF EXISTS `app_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_settings` (
  `key` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `value` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_settings`
--

LOCK TABLES `app_settings` WRITE;
/*!40000 ALTER TABLE `app_settings` DISABLE KEYS */;
INSERT INTO `app_settings` VALUES
('active_zone','60'),
('brand_logo_url','/uploads/brand/logo-1780674481356.jpeg'),
('brand_name','Geasture Eats'),
('brand_subtitle','Admin Panel'),
('coin_reward_rate','0.001'),
('dwell_time','1.5'),
('kds_new_order_sound_url','/uploads/sounds/kds-new_order-ce5f25c3-763d-4a27-b2e3-9e3fd0814223.mp3'),
('kds_ready_sound_url','/uploads/sounds/kds-ready-685321cc-a2b0-4e6e-80b1-c1b36d5d109c.mp3'),
('kds_sound_enabled','1'),
('kds_sound_volume','100'),
('kiosk_idle_timeout','60'),
('kiosk_mode','gesture'),
('maintenance_mode','0'),
('receipt_footer','Terima kasih atas kunjungan Anda!'),
('sidebar_active_bg_color','#4f1c31'),
('sidebar_active_text_color','#dd3131'),
('sidebar_bg_color','#0f172a'),
('sidebar_border_color','#ff0569'),
('sidebar_hover_bg_color','#1e293b'),
('sidebar_hover_text_color','#f0dc05'),
('sidebar_logo_text_color','#d71414'),
('sidebar_section_text_color','#fb04ad'),
('sidebar_text_color','#ffffff'),
('theme_color','#f97316'),
('theme_mode','light');
/*!40000 ALTER TABLE `app_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `audit_logs`
--

DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `action` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `target` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('success','warning','info') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'success',
  `ip` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=566 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_logs`
--

LOCK TABLES `audit_logs` WRITE;
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
INSERT INTO `audit_logs` VALUES
(1,'Admin Tangolab','Penetapan Shift','Fahreza Azhar (Pagi)','2026-06-05 15:08:04','success','192.168.1.10'),
(2,'Admin Tangolab','Penetapan Shift','fahreza  (Full Day)','2026-06-05 15:17:15','success','192.168.1.10'),
(3,'Koki','Tambah Menu Baru','Nasi goreng Gila (coworking)','2026-06-05 15:28:44','success','192.168.1.10'),
(4,'fahreza','Ubah Status Bayar','INV-897 (lunas)','2026-06-05 15:31:48','success','192.168.1.10'),
(5,'fahreza','Ubah Status Bayar','INV-897 (belum_bayar)','2026-06-05 15:40:03','success','192.168.1.10'),
(6,'fahreza','Ubah Status Bayar','INV-897 (lunas)','2026-06-05 15:40:06','success','192.168.1.10'),
(7,'fahreza','Upload Logo Brand','Logo diperbarui: /uploads/brand/logo-1780674481356.jpeg','2026-06-05 15:48:01','success','192.168.1.10'),
(8,'fahreza','Update Pengaturan Aplikasi','Konfigurasi diperbarui: brand_name, brand_subtitle, brand_logo_url, theme_color, receipt_footer, active_zone, dwell_time, kiosk_idle_timeout, kiosk_mode, maintenance_mode','2026-06-05 15:48:01','success','192.168.1.10'),
(9,'fahreza','Update Pengaturan Aplikasi','Konfigurasi diperbarui: brand_name, brand_subtitle, brand_logo_url, theme_color, receipt_footer, active_zone, dwell_time, kiosk_idle_timeout, kiosk_mode, maintenance_mode','2026-06-05 15:48:08','success','192.168.1.10'),
(10,'fahreza','Update Pengaturan Aplikasi','Konfigurasi diperbarui: brand_name, brand_subtitle, brand_logo_url, theme_color, receipt_footer, active_zone, dwell_time, kiosk_idle_timeout, kiosk_mode, maintenance_mode','2026-06-05 15:52:58','success','192.168.1.10'),
(11,'fahreza','Update Pengaturan Aplikasi','Konfigurasi diperbarui: brand_name, brand_subtitle, brand_logo_url, theme_color, receipt_footer, active_zone, dwell_time, kiosk_idle_timeout, kiosk_mode, maintenance_mode','2026-06-05 15:53:05','success','192.168.1.10'),
(12,'fahreza','Update Pengaturan Aplikasi','Konfigurasi diperbarui: brand_name, brand_subtitle, brand_logo_url, theme_color, receipt_footer, active_zone, dwell_time, kiosk_idle_timeout, kiosk_mode, maintenance_mode, sidebar_bg_color, sidebar_text_color, sidebar_active_bg_color, sidebar_active_text_','2026-06-05 16:02:24','success','192.168.1.10'),
(13,'Admin Tangolab','Buat Pesanan Manual','INV-687 (v)','2026-06-05 16:34:01','success','192.168.1.10'),
(14,'Admin Tangolab','Update Status Pesanan','INV-897 (siap)','2026-06-05 16:40:25','success','192.168.1.10'),
(15,'Admin Tangolab','Update Status Pesanan','INV-687 (siap)','2026-06-05 16:40:26','success','192.168.1.10'),
(16,'Admin Tangolab','Update Status Pesanan','INV-897 (selesai)','2026-06-05 16:40:28','success','192.168.1.10'),
(17,'Admin Tangolab','Update Status Pesanan','INV-687 (selesai)','2026-06-05 16:40:29','success','192.168.1.10'),
(18,'Admin Tangolab','Buat Pesanan Manual','INV-630 (m)','2026-06-05 16:40:46','success','192.168.1.10'),
(19,'Admin Tangolab','Ubah Status Bayar','INV-630 (lunas)','2026-06-05 16:41:03','success','192.168.1.10'),
(20,'Admin Tangolab','Buat Pesanan Manual','INV-769 (gd)','2026-06-05 16:43:57','success','192.168.1.10'),
(21,'Admin Tangolab','Buat Pesanan Manual','INV-946 (r)','2026-06-05 16:45:45','success','192.168.1.10'),
(22,'Admin Tangolab','Ubah Status Bayar','INV-946 (lunas)','2026-06-05 16:46:04','success','192.168.1.10'),
(23,'Admin Tangolab','Update Status Pesanan','INV-630 (siap)','2026-06-05 16:46:08','success','192.168.1.10'),
(24,'Admin Tangolab','Update Status Pesanan','INV-630 (selesai)','2026-06-05 16:46:09','success','192.168.1.10'),
(25,'Admin Tangolab','Update Status Pesanan','INV-946 (sedang_diproses)','2026-06-05 16:50:06','success','192.168.1.10'),
(26,'Admin Tangolab','Update Status Pesanan','INV-946 (siap)','2026-06-05 16:50:10','success','192.168.1.10'),
(27,'Admin Tangolab','Update Status Pesanan','INV-946 (selesai)','2026-06-05 16:50:13','success','192.168.1.10'),
(28,'Admin Tangolab','Buat Pesanan Manual','INV-951 (m)','2026-06-05 16:50:26','success','192.168.1.10'),
(29,'Admin Tangolab','Ubah Status Bayar','INV-769 (lunas)','2026-06-05 16:50:30','success','192.168.1.10'),
(30,'Admin Tangolab','Ubah Status Bayar','INV-951 (lunas)','2026-06-05 16:50:31','success','192.168.1.10'),
(31,'Admin Tangolab','Update Status Pesanan','INV-769 (sedang_diproses)','2026-06-05 16:50:43','success','192.168.1.10'),
(32,'Admin Tangolab','Update Status Pesanan','INV-769 (siap)','2026-06-05 16:50:51','success','192.168.1.10'),
(33,'Admin Tangolab','Update Status Pesanan','INV-769 (selesai)','2026-06-05 17:25:40','success','192.168.1.10'),
(34,'Admin Tangolab','Update Status Pesanan','INV-951 (sedang_diproses)','2026-06-05 17:25:48','success','192.168.1.10'),
(35,'Admin Tangolab','Update Status Pesanan','INV-951 (siap)','2026-06-05 17:25:58','success','192.168.1.10'),
(36,'Admin Tangolab','Update Status Pesanan','INV-951 (selesai)','2026-06-05 17:26:00','success','192.168.1.10'),
(37,'Admin Tangolab','Buat Pesanan Manual','INV-055 (gf)','2026-06-05 17:26:11','success','192.168.1.10'),
(38,'Admin Tangolab','Update Status Pesanan','INV-055 (sedang_diproses)','2026-06-05 17:26:23','success','192.168.1.10'),
(39,'Admin Tangolab','Update Status Pesanan','INV-055 (siap)','2026-06-05 17:26:26','success','192.168.1.10'),
(40,'Admin Tangolab','Update Status Pesanan','INV-055 (selesai)','2026-06-05 17:26:27','success','192.168.1.10'),
(41,'Admin Tangolab','Buat Pesanan Manual','INV-031 (b)','2026-06-05 17:26:54','success','192.168.1.10'),
(42,'Admin Tangolab','Ubah Status Bayar','INV-031 (lunas)','2026-06-05 17:26:57','success','192.168.1.10'),
(43,'Admin Tangolab','Update Status Pesanan','INV-031 (sedang_diproses)','2026-06-05 17:27:03','success','192.168.1.10'),
(44,'Admin Tangolab','Update Status Pesanan','INV-031 (siap)','2026-06-05 17:27:12','success','192.168.1.10'),
(45,'Admin Tangolab','Update Status Pesanan','INV-031 (selesai)','2026-06-05 17:27:15','success','192.168.1.10'),
(46,'Admin Tangolab','Ubah Status Bayar','INV-031 (belum_bayar)','2026-06-05 17:27:20','success','192.168.1.10'),
(47,'Admin Tangolab','Ubah Status Bayar','INV-031 (lunas)','2026-06-05 17:27:22','success','192.168.1.10'),
(48,'Admin Tangolab','Ubah Status Bayar','INV-031 (belum_bayar)','2026-06-05 17:27:23','success','192.168.1.10'),
(49,'Admin Tangolab','Ubah Status Bayar','INV-031 (lunas)','2026-06-05 17:27:23','success','192.168.1.10'),
(50,'Admin Tangolab','Ubah Status Bayar','INV-031 (belum_bayar)','2026-06-05 17:27:24','success','192.168.1.10'),
(51,'Admin Tangolab','Ubah Status Bayar','INV-031 (lunas)','2026-06-05 17:27:24','success','192.168.1.10'),
(52,'Admin Tangolab','Update Status Pesanan','INV-031 (sedang_diproses)','2026-06-05 17:27:27','success','192.168.1.10'),
(53,'Admin Tangolab','Update Status Pesanan','INV-031 (siap)','2026-06-05 17:27:28','success','192.168.1.10'),
(54,'Admin Tangolab','Update Status Pesanan','INV-031 (selesai)','2026-06-05 17:27:29','success','192.168.1.10'),
(55,'Admin Tangolab','Ubah Status Bayar','KIOSK-1780939659417 (belum_bayar)','2026-06-08 17:31:14','success','192.168.1.10'),
(56,'Admin Tangolab','Update Status Pesanan','KIOSK-1780947855560 (siap)','2026-06-14 15:14:01','success','192.168.1.10'),
(57,'Admin Tangolab','Update Status Pesanan','KIOSK-1780948186057 (siap)','2026-06-14 15:14:05','success','192.168.1.10'),
(58,'Admin Tangolab','Update Status Pesanan','KIOSK-1780947855560 (selesai)','2026-06-14 15:14:07','success','192.168.1.10'),
(59,'Admin Tangolab','Update Status Pesanan','KIOSK-1780948186057 (selesai)','2026-06-14 15:14:14','success','192.168.1.10'),
(60,'Admin Tangolab','Buat Pesanan Manual','INV-395 (nn)','2026-06-14 15:14:30','success','192.168.1.10'),
(61,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:14:36','success','192.168.1.10'),
(62,'Admin Tangolab','Ubah Status Bayar','KIOSK-1780939659417 (lunas)','2026-06-14 15:14:57','success','192.168.1.10'),
(63,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:18:58','success','192.168.1.10'),
(64,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:19:00','success','192.168.1.10'),
(65,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:19:20','success','192.168.1.10'),
(66,'Admin Tangolab','Ubah Status Bayar','KIOSK-1780939659417 (belum_bayar)','2026-06-14 15:19:46','success','192.168.1.10'),
(67,'Admin Tangolab','Ubah Status Bayar','KIOSK-1780939659417 (lunas)','2026-06-14 15:19:46','success','192.168.1.10'),
(68,'Admin Tangolab','Ubah Status Bayar','KIOSK-1780939659417 (belum_bayar)','2026-06-14 15:19:47','success','192.168.1.10'),
(69,'Admin Tangolab','Ubah Status Bayar','KIOSK-1780939659417 (lunas)','2026-06-14 15:19:48','success','192.168.1.10'),
(70,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:23:09','success','192.168.1.10'),
(71,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:23:32','success','192.168.1.10'),
(72,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:23:38','success','192.168.1.10'),
(73,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:24:13','success','192.168.1.10'),
(74,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:24:21','success','192.168.1.10'),
(75,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:24:41','success','192.168.1.10'),
(76,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:24:45','success','192.168.1.10'),
(77,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:25:26','success','192.168.1.10'),
(78,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:25:33','success','192.168.1.10'),
(79,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:15','success','192.168.1.10'),
(80,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:15','success','192.168.1.10'),
(81,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:16','success','192.168.1.10'),
(82,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:17','success','192.168.1.10'),
(83,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:17','success','192.168.1.10'),
(84,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:17','success','192.168.1.10'),
(85,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:17','success','192.168.1.10'),
(86,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:17','success','192.168.1.10'),
(87,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:18','success','192.168.1.10'),
(88,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:19','success','192.168.1.10'),
(89,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:29','success','192.168.1.10'),
(90,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:30','success','192.168.1.10'),
(91,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:30','success','192.168.1.10'),
(92,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:30','success','192.168.1.10'),
(93,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:30','success','192.168.1.10'),
(94,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:30','success','192.168.1.10'),
(95,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:30','success','192.168.1.10'),
(96,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:31','success','192.168.1.10'),
(97,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:31','success','192.168.1.10'),
(98,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:31','success','192.168.1.10'),
(99,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:32','success','192.168.1.10'),
(100,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:32','success','192.168.1.10'),
(101,'Admin Tangolab','Update Status Pesanan','KIOSK-1780939659417 (sedang_diproses)','2026-06-14 15:27:36','success','192.168.1.10'),
(102,'Admin Tangolab','Update Status Pesanan','KIOSK-1780939659417 (siap)','2026-06-14 15:27:39','success','192.168.1.10'),
(103,'Admin Tangolab','Update Status Pesanan','INV-395 (sedang_diproses)','2026-06-14 15:27:41','success','192.168.1.10'),
(104,'Admin Tangolab','Update Status Pesanan','INV-395 (siap)','2026-06-14 15:27:44','success','192.168.1.10'),
(105,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:27:51','success','192.168.1.10'),
(106,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:27:52','success','192.168.1.10'),
(107,'Admin Tangolab','Update Status Pesanan','INV-395 (sedang_diproses)','2026-06-14 15:27:58','success','192.168.1.10'),
(108,'Admin Tangolab','Update Status Pesanan','INV-395 (siap)','2026-06-14 15:39:31','success','192.168.1.10'),
(109,'Admin Tangolab','Update Status Pesanan','KIOSK-1780939659417 (selesai)','2026-06-14 15:39:32','success','192.168.1.10'),
(110,'Admin Tangolab','Update Status Pesanan','INV-395 (selesai)','2026-06-14 15:39:33','success','192.168.1.10'),
(111,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:39:37','success','192.168.1.10'),
(112,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:39:37','success','192.168.1.10'),
(113,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:39:39','success','192.168.1.10'),
(114,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:39:44','success','192.168.1.10'),
(115,'Admin Tangolab','Update Status Pesanan','INV-395 (sedang_diproses)','2026-06-14 15:39:52','success','192.168.1.10'),
(116,'Admin Tangolab','Update Status Pesanan','INV-395 (siap)','2026-06-14 15:41:23','success','192.168.1.10'),
(117,'Admin Tangolab','Update Status Pesanan','INV-395 (selesai)','2026-06-14 15:41:25','success','192.168.1.10'),
(118,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:41:34','success','192.168.1.10'),
(119,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:41:35','success','192.168.1.10'),
(120,'Admin Tangolab','Update Status Pesanan','INV-395 (sedang_diproses)','2026-06-14 15:41:38','success','192.168.1.10'),
(121,'Admin Tangolab','Ubah Status Bayar','KIOSK-1780948186057 (belum_bayar)','2026-06-14 15:44:18','success','192.168.1.10'),
(122,'Admin Tangolab','Update Status Pesanan','INV-395 (siap)','2026-06-14 15:44:23','success','192.168.1.10'),
(123,'Admin Tangolab','Update Status Pesanan','INV-395 (selesai)','2026-06-14 15:44:25','success','192.168.1.10'),
(124,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:44:31','success','192.168.1.10'),
(125,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:44:32','success','192.168.1.10'),
(126,'Admin Tangolab','Update Status Pesanan','INV-395 (sedang_diproses)','2026-06-14 15:44:49','success','192.168.1.10'),
(127,'Admin Tangolab','Update Status Pesanan','INV-395 (siap)','2026-06-14 15:45:04','success','192.168.1.10'),
(128,'Admin Tangolab','Update Status Pesanan','INV-395 (selesai)','2026-06-14 15:45:07','success','192.168.1.10'),
(129,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-14 15:49:40','success','192.168.1.10'),
(130,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-14 15:49:41','success','192.168.1.10'),
(131,'Admin Tangolab','Ubah Status Bayar','KIOSK-1780948186057 (lunas)','2026-06-14 15:49:42','success','192.168.1.10'),
(132,'Admin Tangolab','Update Status Pesanan','KIOSK-1780948186057 (sedang_diproses)','2026-06-14 15:49:47','success','192.168.1.10'),
(133,'Admin Tangolab','Update Status Pesanan','KIOSK-1780948186057 (siap)','2026-06-14 15:49:48','success','192.168.1.10'),
(134,'Admin Tangolab','Update Status Pesanan','KIOSK-1780948186057 (selesai)','2026-06-14 15:49:52','success','192.168.1.10'),
(135,'Admin Tangolab','Update Status Pesanan','INV-395 (sedang_diproses)','2026-06-14 15:49:53','success','192.168.1.10'),
(136,'Admin Tangolab','Update Status Pesanan','INV-395 (siap)','2026-06-14 15:49:55','success','192.168.1.10'),
(137,'Admin Tangolab','Update Status Pesanan','INV-395 (selesai)','2026-06-14 15:50:00','success','192.168.1.10'),
(138,'Koki','Tambah Menu Baru','estehh manis (coworking)','2026-06-16 10:23:23','success','192.168.1.10'),
(139,'Admin Tangolab','Buat Promo Koin','Beli Ayam Bakar Gratis Esteh manis (400 koin)','2026-06-16 10:24:54','success','192.168.1.10'),
(140,'Koki','Tambah Menu Baru','nasi goreng (ngolab)','2026-06-16 16:09:30','success','192.168.1.10'),
(141,'Kasir Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-17 13:33:20','success','192.168.1.10'),
(142,'Kasir Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-17 13:33:44','success','192.168.1.10'),
(143,'Koki Tangolab','Update Status Pesanan','INV-395 (sedang_diproses)','2026-06-17 13:36:56','success','192.168.1.10'),
(144,'Koki Tangolab','Update Status Pesanan','INV-395 (siap)','2026-06-17 13:38:01','success','192.168.1.10'),
(145,'Admin Tangolab','Restock Bahan Baku','Mie Basah (+50 Porsi)','2026-06-17 13:41:33','success','192.168.1.10'),
(146,'Koki','Tambah Menu Baru','Menu Uji Katalon 1781703940262 (ngolab)','2026-06-17 13:45:56','success','192.168.1.10'),
(147,'Koki','Toggle Stok Menu','Menu Uji Katalon 1781703940262 (Habis)','2026-06-17 13:46:48','success','192.168.1.10'),
(148,'Koki','Tambah Menu Baru','Temp Delete Menu 1781704060178 (ngolab)','2026-06-17 13:47:54','success','192.168.1.10'),
(149,'Admin Tangolab','Registrasi Pegawai','Staff Uji Katalon 1781704220462 (Kasir)','2026-06-17 13:50:34','success','192.168.1.10'),
(150,'Admin Tangolab','Registrasi Pegawai','Temp Staff 1781704353218 (Kasir)','2026-06-17 13:52:49','success','192.168.1.10'),
(151,'Admin Tangolab','Hapus Pegawai','Staff Uji Katalon 1781704220462','2026-06-17 13:52:53','warning','192.168.1.10'),
(152,'Admin Tangolab','Buat Promo Koin','Voucher Uji Katalon 1781704514123 (200 koin)','2026-06-17 13:55:30','success','192.168.1.10'),
(153,'Admin Tangolab','Buat Promo Koin','Temp Voucher 1781704591914 (100 koin)','2026-06-17 13:56:51','success','192.168.1.10'),
(154,'Admin Tangolab','Hapus Promo Koin','Temp Voucher 1781704591914','2026-06-17 13:56:56','warning','192.168.1.10'),
(155,'Admin Tangolab','Restock Bahan Baku','Mie Basah (+5 Porsi)','2026-06-17 13:59:57','success','192.168.1.10'),
(156,'Koki','Toggle Stok Menu','Temp Delete Menu 1781704060178 (Habis)','2026-06-17 14:00:44','success','192.168.1.10'),
(157,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-17 14:39:25','success','192.168.1.10'),
(158,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-17 14:39:26','success','192.168.1.10'),
(159,'Admin Tangolab','Update Status Pesanan','INV-395 (sedang_diproses)','2026-06-17 14:39:28','success','192.168.1.10'),
(160,'Admin Tangolab','Ubah Status Bayar','INV-395 (belum_bayar)','2026-06-17 14:39:38','success','192.168.1.10'),
(161,'Admin Tangolab','Ubah Status Bayar','INV-395 (lunas)','2026-06-17 14:39:38','success','192.168.1.10'),
(162,'Koki','Hapus Menu','Temp Delete Menu 1781704060178','2026-06-17 14:45:52','warning','192.168.1.10'),
(163,'Admin Tangolab','Hapus Pesanan','INV-395','2026-08-31 01:49:13','warning','192.168.1.10'),
(164,'Admin Tangolab','Hapus Pesanan','KIOSK-1780948186057','2026-08-31 01:49:16','warning','192.168.1.10'),
(165,'Admin Tangolab','Hapus Pesanan','KIOSK-1780947855560','2026-08-31 01:49:20','warning','192.168.1.10'),
(166,'Admin Tangolab','Hapus Pesanan','KIOSK-1780939659417','2026-08-31 01:49:23','warning','192.168.1.10'),
(167,'Admin Tangolab','Hapus Pesanan','INV-031','2026-08-31 01:49:26','warning','192.168.1.10'),
(168,'Admin Tangolab','Buat Pesanan Manual','INV-457 (redd)','2026-08-31 01:50:51','success','192.168.1.10'),
(169,'Admin Tangolab','Ubah Status Bayar','INV-457 (lunas)','2026-08-31 01:50:56','success','192.168.1.10'),
(170,'Admin Tangolab','Buat Pesanan Manual','INV-678 (wer)','2026-08-31 01:51:33','success','192.168.1.10'),
(171,'Admin Tangolab','Ubah Status Bayar','INV-678 (lunas)','2026-08-31 01:51:45','success','192.168.1.10'),
(172,'Admin Tangolab','Update Status Pesanan','INV-457 (sedang_diproses)','2026-08-31 01:51:58','success','192.168.1.10'),
(173,'Admin Tangolab','Update Status Pesanan','INV-678 (sedang_diproses)','2026-08-31 01:51:59','success','192.168.1.10'),
(174,'Admin Tangolab','Update Status Pesanan','INV-457 (siap)','2026-08-31 01:52:00','success','192.168.1.10'),
(175,'Admin Tangolab','Update Status Pesanan','INV-457 (selesai)','2026-08-31 01:52:01','success','192.168.1.10'),
(176,'Admin Tangolab','Update Status Pesanan','INV-678 (siap)','2026-08-31 01:52:02','success','192.168.1.10'),
(177,'Admin Tangolab','Update Status Pesanan','INV-678 (selesai)','2026-08-31 01:52:03','success','192.168.1.10'),
(178,'Automated Bell Verification','Buat Pesanan Manual','INV-604 (Bell Test (otomatis dihapus))','2026-08-31 02:07:51','success','192.168.1.10'),
(179,'Admin','Hapus Pesanan','INV-604','2026-08-31 02:07:51','warning','192.168.1.10'),
(180,'Automated Bell Verification','Buat Pesanan Manual','INV-729 (Bell Test (otomatis dihapus))','2026-08-31 02:09:39','success','192.168.1.10'),
(181,'Admin','Hapus Pesanan','INV-729','2026-08-31 02:09:39','warning','192.168.1.10'),
(182,'Admin Tangolab','Buat Pesanan Manual','INV-583 (zx)','2026-08-31 02:16:58','success','192.168.1.10'),
(183,'Admin Tangolab','Ubah Status Bayar','INV-882 (lunas)','2026-08-31 02:17:12','success','192.168.1.10'),
(184,'Admin Tangolab','Ubah Status Bayar','INV-583 (lunas)','2026-08-31 02:17:20','success','192.168.1.10'),
(185,'Admin Tangolab','Ubah Status Bayar','INV-583 (belum_bayar)','2026-08-31 02:17:25','success','192.168.1.10'),
(186,'Admin Tangolab','Update Status Pesanan','INV-882 (sedang_diproses)','2026-08-31 02:17:29','success','192.168.1.10'),
(187,'Admin Tangolab','Update Status Pesanan','INV-882 (siap)','2026-08-31 02:17:30','success','192.168.1.10'),
(188,'Admin Tangolab','Update Status Pesanan','INV-882 (selesai)','2026-08-31 02:17:31','success','192.168.1.10'),
(189,'Admin Tangolab','Ubah Status Bayar','INV-882 (belum_bayar)','2026-08-31 02:17:47','success','192.168.1.10'),
(190,'Admin Tangolab','Ubah Status Bayar','INV-583 (lunas)','2026-08-31 02:17:53','success','192.168.1.10'),
(191,'Admin Tangolab','Update Status Pesanan','INV-583 (sedang_diproses)','2026-08-31 02:17:56','success','192.168.1.10'),
(192,'Admin Tangolab','Update Status Pesanan','INV-583 (siap)','2026-08-31 02:17:57','success','192.168.1.10'),
(193,'Admin Tangolab','Update Status Pesanan','INV-583 (selesai)','2026-08-31 02:18:00','success','192.168.1.10'),
(194,'Admin Tangolab','Ubah Status Bayar','INV-583 (belum_bayar)','2026-08-31 02:18:03','success','192.168.1.10'),
(195,'Admin Tangolab','Ubah Status Bayar','INV-583 (lunas)','2026-08-31 02:18:08','success','192.168.1.10'),
(196,'Admin Tangolab','Ubah Status Bayar','INV-882 (lunas)','2026-08-31 02:18:12','success','192.168.1.10'),
(197,'Admin Tangolab','Update Status Pesanan','INV-882 (sedang_diproses)','2026-08-31 02:18:15','success','192.168.1.10'),
(198,'Admin Tangolab','Update Status Pesanan','INV-882 (siap)','2026-08-31 02:18:16','success','192.168.1.10'),
(199,'Admin Tangolab','Update Status Pesanan','INV-583 (sedang_diproses)','2026-08-31 02:18:16','success','192.168.1.10'),
(200,'Admin Tangolab','Update Status Pesanan','INV-583 (siap)','2026-08-31 02:18:17','success','192.168.1.10'),
(201,'Admin Tangolab','Update Status Pesanan','INV-882 (selesai)','2026-08-31 02:18:18','success','192.168.1.10'),
(202,'Admin Tangolab','Update Status Pesanan','INV-583 (selesai)','2026-08-31 02:18:19','success','192.168.1.10'),
(203,'Admin Tangolab','Penetapan Shift','fahreza  (Full Day)','2026-08-31 02:21:16','success','192.168.1.10'),
(204,'Automated Test','Buat Program PO','PO Smoke Test (otomatis dihapus) (ngolab)','2026-08-31 04:05:18','success','192.168.1.10'),
(205,'Automated Test','Buat Pesanan PO','PO-MTGPTERL-7264 (ngolab)','2026-08-31 04:05:19','success','192.168.1.10'),
(206,'Admin','Hapus Pesanan','PO-MTGPTERL-7264','2026-08-31 04:05:21','warning','192.168.1.10'),
(207,'Admin Tangolab','Buat Program PO','PO Jum\'at Berkeah (ngolab)','2026-08-31 06:08:41','success','192.168.1.10'),
(208,'Ops Test','Buat Program PO','PO Ops Smoke Test (otomatis dihapus) (coworking)','2026-08-31 06:34:50','success','192.168.1.10'),
(209,'Ops Test','Buat Pesanan PO','PO-MTGV5P6R-9627 (coworking)','2026-08-31 06:34:50','success','192.168.1.10'),
(210,'Ops Test','Buat Pesanan PO','PO-MTGV5POF-6840 (coworking)','2026-08-31 06:34:51','success','192.168.1.10'),
(211,'Ops Test','Buat Pesanan PO','PO-MTGV5Q4Q-9747 (coworking)','2026-08-31 06:34:51','success','192.168.1.10'),
(212,'Ops Test','Pelunasan PO','PO-MTGV5P6R-9627','2026-08-31 06:34:53','success','192.168.1.10'),
(213,'Ops Test','PO Sudah Diambil','PO-MTGV5P6R-9627','2026-08-31 06:34:53','success','192.168.1.10'),
(214,'Ops Test','PO No-show','PO-MTGV5POF-6840','2026-08-31 06:34:54','warning','192.168.1.10'),
(215,'Admin Tangolab','Toggle Program PO','PO Jum\'at Berkeah','2026-09-09 02:30:11','success','192.168.1.10'),
(216,'Admin Tangolab','Toggle Program PO','PO Jum\'at Berkeah','2026-09-09 02:30:12','success','192.168.1.10'),
(217,'Admin Tangolab','Hapus Pegawai','Temp Staff 1781704353218','2026-09-09 02:32:06','warning','192.168.1.10'),
(218,'Koki','Toggle Stok Menu','Menu Uji Katalon 1781703940262 (Tersedia)','2026-09-09 03:35:29','success','192.168.1.10'),
(238,'Admin Tangolab','Buat Pesanan Manual','INV-219 (dada)','2026-09-10 01:44:54','success','192.168.1.10'),
(239,'Admin Tangolab','Ubah Status Bayar','INV-219 (lunas)','2026-09-10 01:45:02','success','192.168.1.10'),
(240,'Admin Tangolab','Update Status Pesanan','INV-219 (sedang_diproses)','2026-09-10 01:45:25','success','192.168.1.10'),
(241,'Admin Tangolab','Update Status Pesanan','INV-219 (siap)','2026-09-10 01:45:25','success','192.168.1.10'),
(242,'Admin Tangolab','Update Status Pesanan','INV-219 (selesai)','2026-09-10 01:45:26','success','192.168.1.10'),
(243,'Admin Tangolab','Ubah Status Bayar','INV-219 (belum_bayar)','2026-09-10 01:45:37','success','192.168.1.10'),
(244,'Admin Tangolab','Ubah Status Bayar','INV-219 (lunas)','2026-09-10 01:45:37','success','192.168.1.10'),
(246,'Admin Tangolab','Buat Pesanan Manual','INV-573 (trtr)','2026-09-10 02:02:07','success','192.168.1.10'),
(247,'Admin Tangolab','Upload Suara KDS','new_order: kds-new_order-ce5f25c3-763d-4a27-b2e3-9e3fd0814223.mp3','2026-09-10 02:04:05','success','192.168.1.10'),
(248,'Admin Tangolab','Buat Pesanan Manual','INV-301 (kook)','2026-09-10 02:04:45','success','192.168.1.10'),
(249,'Admin Tangolab','Update Status Pesanan','INV-219 (sedang_diproses)','2026-09-10 02:05:02','success','192.168.1.10'),
(250,'Admin Tangolab','Buat Pesanan Manual','INV-907 (ooollp)','2026-09-10 02:05:20','success','192.168.1.10'),
(251,'Admin Tangolab','Buat Pesanan Manual','INV-678 (rere)','2026-09-10 04:02:24','success','192.168.1.10'),
(252,'Admin Tangolab','Update Status Pesanan','INV-573 (sedang_diproses)','2026-09-10 04:02:31','success','192.168.1.10'),
(253,'Admin Tangolab','Update Status Pesanan','INV-219 (siap)','2026-09-10 04:02:32','success','192.168.1.10'),
(254,'Admin Tangolab','Upload Suara KDS','ready: kds-ready-685321cc-a2b0-4e6e-80b1-c1b36d5d109c.mp3','2026-09-10 04:03:45','success','192.168.1.10'),
(255,'Admin Tangolab','Update Status Pesanan','INV-573 (siap)','2026-09-10 04:03:55','success','192.168.1.10'),
(256,'Admin Tangolab','Update Status Pesanan','INV-219 (selesai)','2026-09-10 07:12:29','success','192.168.1.10'),
(257,'Admin Tangolab','Update Status Pesanan','INV-573 (selesai)','2026-09-10 07:12:31','success','192.168.1.10'),
(258,'Admin Tangolab','Update Status Pesanan','INV-301 (sedang_diproses)','2026-09-10 07:12:33','success','192.168.1.10'),
(259,'Admin Tangolab','Update Status Pesanan','INV-301 (siap)','2026-09-10 07:12:34','success','192.168.1.10'),
(260,'Admin Tangolab','Update Status Pesanan','INV-301 (selesai)','2026-09-10 07:12:35','success','192.168.1.10'),
(261,'Admin Tangolab','Update Status Pesanan','INV-907 (sedang_diproses)','2026-09-10 07:12:42','success','192.168.1.10'),
(262,'Admin Tangolab','Update Status Pesanan','INV-907 (siap)','2026-09-10 07:12:43','success','192.168.1.10'),
(263,'Admin Tangolab','Update Status Pesanan','INV-907 (selesai)','2026-09-10 07:12:47','success','192.168.1.10'),
(264,'Admin Tangolab','Update Status Pesanan','INV-678 (sedang_diproses)','2026-09-10 07:12:48','success','192.168.1.10'),
(265,'Admin Tangolab','Update Status Pesanan','INV-678 (siap)','2026-09-10 07:12:48','success','192.168.1.10'),
(266,'Admin Tangolab','Buat Pesanan Manual','INV-436 (nuhh)','2026-09-10 07:13:00','success','192.168.1.10'),
(267,'Admin Tangolab','Upload Foto Menu PO','preorder-51e5f9f6-893d-41a9-9e23-ad27508bdea5.png','2026-09-10 08:04:19','success','192.168.1.10'),
(268,'Admin Tangolab','Buat Program PO','TEST (ngolab)','2026-09-10 08:06:08','success','192.168.1.10'),
(269,'Admin Tangolab','Toggle Program PO','PO Jum\'at Berkeah','2026-09-10 08:09:19','success','192.168.1.10'),
(270,'Admin Tangolab','Toggle Program PO','PO Jum\'at Berkeah','2026-09-10 08:09:19','success','192.168.1.10'),
(271,'Admin Tangolab','Update Status Pesanan','INV-436 (sedang_diproses)','2026-09-11 02:42:04','success','192.168.1.10'),
(272,'Admin Tangolab','Update Status Pesanan','INV-678 (selesai)','2026-09-11 02:42:05','success','192.168.1.10'),
(273,'Admin Tangolab','Update Status Pesanan','INV-436 (siap)','2026-09-11 02:42:14','success','192.168.1.10'),
(274,'Admin Tangolab','Update Status Pesanan','INV-436 (selesai)','2026-09-11 02:42:15','success','192.168.1.10'),
(275,'Admin Tangolab','Ubah Status Bayar','INV-085 (lunas)','2026-09-11 09:09:03','success','192.168.1.10'),
(276,'Admin Tangolab','Ubah Status Bayar','INV-085 (belum_bayar)','2026-09-11 09:09:05','success','192.168.1.10'),
(277,'Admin Tangolab','Buat Promo Koin','Voucher Diskon 20%  (500 koin)','2026-09-16 03:54:49','success','192.168.1.10'),
(278,'Admin Tangolab','Hapus Promo Koin','Voucher Uji Katalon 1781704514123','2026-09-16 03:54:55','warning','192.168.1.10'),
(279,'Admin Tangolab','Hapus Promo Koin','Voucher diskon 20%','2026-09-16 03:54:59','warning','192.168.1.10'),
(280,'Admin Tangolab','Ubah Status Bayar','KIOSK-TEST-002 (lunas)','2026-09-22 02:34:47','success','192.168.1.10'),
(281,'Admin Tangolab','Update Status Pesanan','INV-085 (sedang_diproses)','2026-09-22 02:35:02','success','192.168.1.10'),
(282,'Admin Tangolab','Update Status Pesanan','INV-085 (siap)','2026-09-22 02:35:04','success','192.168.1.10'),
(283,'Admin Tangolab','Update Status Pesanan','INV-085 (selesai)','2026-09-22 02:35:10','success','192.168.1.10'),
(284,'Admin Tangolab','Update Status Pesanan','KIOSK-TEST-002 (sedang_diproses)','2026-09-22 04:19:42','success','192.168.1.10'),
(285,'Admin Tangolab','Update Status Pesanan','KIOSK-TEST-002 (siap)','2026-09-22 04:19:43','success','192.168.1.10'),
(286,'Admin Tangolab','Update Status Pesanan','KIOSK-TEST-002 (selesai)','2026-09-22 04:19:45','success','192.168.1.10'),
(287,'Admin Tangolab','Buat Pesanan Manual','INV-619 (fdfdf)','2026-09-22 05:02:29','success','192.168.1.10'),
(288,'Admin Tangolab','Ubah Status Bayar','INV-619 (lunas)','2026-09-22 05:02:48','success','192.168.1.10'),
(289,'Admin Tangolab','Hapus Pesanan','INV-619','2026-09-22 05:24:21','warning','192.168.1.10'),
(290,'Admin Tangolab','Registrasi Pegawai','budski (Koki)','2026-09-22 05:30:09','success','192.168.1.10'),
(291,'Admin Tangolab','Update Data Pegawai','budski (Role: Koki)','2026-09-22 05:30:19','success','192.168.1.10'),
(292,'Admin Tangolab','Update Data Pegawai','budski (Role: Koki)','2026-09-22 05:30:19','success','192.168.1.10'),
(293,'Admin Tangolab','Arsipkan Menu','estehh manis','2026-09-28 01:47:54','warning','192.168.1.10'),
(294,'Admin Tangolab','Arsipkan Menu','Nasi goreng Gila','2026-09-28 01:48:03','warning','192.168.1.10'),
(295,'Admin Tangolab','Arsipkan Menu','Ayam Bakar','2026-09-28 01:48:05','warning','192.168.1.10'),
(296,'Admin Tangolab','Tambah Menu Baru','Nasi Goreng Telor (coworking)','2026-09-28 01:52:28','success','192.168.1.10'),
(297,'Admin Tangolab','Tambah Menu Baru','Nasi Ayam Ketumbar  (coworking)','2026-09-28 02:03:22','success','192.168.1.10'),
(298,'Admin Tangolab','Tambah Menu Baru','Nasi Ayam Ketumbar  (coworking)','2026-09-28 02:40:22','success','192.168.1.10'),
(299,'Admin Tangolab','Arsipkan Menu','Nasi Ayam Ketumbar ','2026-09-28 02:40:28','warning','192.168.1.10'),
(300,'Admin Tangolab','Registrasi Pegawai','arap (Kasir)','2026-09-29 09:23:18','success','192.168.1.10'),
(301,'arap','Hapus Pesanan','KIOSK-TEST-002','2026-09-30 01:26:16','warning','192.168.1.10'),
(302,'arap','Hapus Pesanan','INV-085','2026-09-30 01:26:17','warning','192.168.1.10'),
(303,'arap','Hapus Pesanan','INV-436','2026-09-30 01:26:20','warning','192.168.1.10'),
(304,'arap','Hapus Pesanan','INV-678','2026-09-30 01:26:23','warning','192.168.1.10'),
(305,'arap','Hapus Pesanan','INV-907','2026-09-30 01:26:25','warning','192.168.1.10'),
(306,'arap','Hapus Pesanan','INV-301','2026-09-30 01:26:28','warning','192.168.1.10'),
(307,'arap','Hapus Pesanan','INV-573','2026-09-30 01:26:30','warning','192.168.1.10'),
(308,'arap','Hapus Pesanan','INV-219','2026-09-30 01:26:33','warning','192.168.1.10'),
(309,'arap','Hapus Pesanan','INV-583','2026-09-30 01:26:38','warning','192.168.1.10'),
(310,'arap','Hapus Pesanan','INV-882','2026-09-30 01:26:46','warning','192.168.1.10'),
(311,'arap','Hapus Pesanan','INV-678','2026-09-30 01:26:47','warning','192.168.1.10'),
(312,'arap','Hapus Pesanan','INV-457','2026-09-30 01:26:50','warning','192.168.1.10'),
(313,'arap','Hapus Pesanan','INV-055','2026-09-30 01:26:52','warning','192.168.1.10'),
(314,'arap','Hapus Pesanan','INV-951','2026-09-30 01:26:55','warning','192.168.1.10'),
(315,'arap','Hapus Pesanan','INV-946','2026-09-30 01:26:57','warning','192.168.1.10'),
(316,'arap','Hapus Pesanan','INV-769','2026-09-30 01:27:01','warning','192.168.1.10'),
(317,'Admin Tangolab','Hapus Pegawai','fahreza ','2026-09-30 01:27:48','warning','192.168.1.10'),
(318,'Admin Tangolab','Hapus Pegawai','Fahreza Azhar','2026-09-30 01:27:52','warning','192.168.1.10'),
(319,'Admin Tangolab','Registrasi Pegawai','Fahreza (Kasir)','2026-09-30 01:28:26','success','192.168.1.10'),
(320,'Fahreza','Buat Pesanan Manual','INV-003 (cukimbek)','2026-09-30 01:31:10','success','192.168.1.10'),
(321,'Admin Tangolab','Tambah Menu Baru','Nasi goreng Teri (coworking)','2026-09-30 01:43:56','success','192.168.1.10'),
(322,'Admin Tangolab','Tambah Menu Baru','Indomie Dokdok (coworking)','2026-09-30 01:45:19','success','192.168.1.10'),
(323,'Admin Tangolab','Tambah Menu Baru','Indomie Tek Tek (coworking)','2026-09-30 01:46:09','success','192.168.1.10'),
(324,'Admin Tangolab','Tambah Menu Baru','Nasi Ayam Goreng Bawang Putih (coworking)','2026-09-30 01:48:09','success','192.168.1.10'),
(325,'Admin Tangolab','Tambah Menu Baru','chiken wing hot lava (coworking)','2026-09-30 01:49:01','success','192.168.1.10'),
(326,'Admin Tangolab','Tambah Menu Baru','Es teh (coworking)','2026-09-30 01:49:48','success','192.168.1.10'),
(327,'Admin Tangolab','Tambah Menu Baru','HOt tea (coworking)','2026-09-30 01:50:30','success','192.168.1.10'),
(328,'Admin Tangolab','Tambah Menu Baru','Es coklat  (coworking)','2026-09-30 01:51:17','success','192.168.1.10'),
(329,'Admin Tangolab','Tambah Menu Baru','hot coklat (coworking)','2026-09-30 01:51:57','success','192.168.1.10'),
(330,'Admin Tangolab','Buat Pesanan Manual','INV-299 (test)','2026-09-30 01:54:57','success','192.168.1.10'),
(331,'Admin Tangolab','Buat Pesanan Manual','INV-165 (50-01)','2026-09-30 03:42:59','success','192.168.1.10'),
(332,'Admin Tangolab','Buat Pesanan Manual','INV-726 (nadine)','2026-09-30 05:56:42','success','192.168.1.10'),
(333,'Admin Tangolab','Tambah Menu Baru','egg (coworking)','2026-09-30 05:58:36','success','192.168.1.10'),
(334,'Admin Tangolab','Buat Pesanan Manual','INV-078 (pa yusuf)','2026-09-30 06:00:10','success','192.168.1.10'),
(335,'Admin Tangolab','Buat Pesanan Manual','INV-550 (tyio)','2026-09-30 06:11:28','success','192.168.1.10'),
(336,'Admin Tangolab','Ubah Status Bayar','INV-078 (lunas)','2026-09-30 06:11:44','success','192.168.1.10'),
(337,'Admin Tangolab','Buat Pesanan Manual','INV-001 (fahmi)','2026-09-30 06:32:21','success','192.168.1.10'),
(338,'Admin Tangolab','Update Status Pesanan','INV-003 (sedang_diproses)','2026-10-01 02:00:35','success','192.168.1.10'),
(339,'Admin Tangolab','Update Status Pesanan','INV-003 (sedang_diproses)','2026-10-01 02:00:35','success','192.168.1.10'),
(340,'Admin Tangolab','Update Status Pesanan','INV-299 (sedang_diproses)','2026-10-01 02:00:35','success','192.168.1.10'),
(341,'Admin Tangolab','Update Status Pesanan','INV-299 (siap)','2026-10-01 02:00:40','success','192.168.1.10'),
(342,'Admin Tangolab','Update Status Pesanan','INV-299 (selesai)','2026-10-01 02:00:42','success','192.168.1.10'),
(343,'Fahreza','Buat Pesanan Manual','INV-872 (yy)','2026-10-01 03:46:23','success','192.168.1.10'),
(344,'Fahreza','Buat Pesanan Manual','INV-190 (yo)','2026-10-01 03:46:49','success','192.168.1.10'),
(345,'Admin Tangolab','Update Status Pesanan','INV-003 (siap)','2026-10-01 04:29:42','success','192.168.1.10'),
(346,'Admin Tangolab','Update Status Pesanan','INV-003 (siap)','2026-10-01 04:29:43','success','192.168.1.10'),
(347,'Admin Tangolab','Update Status Pesanan','INV-003 (selesai)','2026-10-01 04:29:44','success','192.168.1.10'),
(348,'Admin Tangolab','Update Status Pesanan','INV-165 (sedang_diproses)','2026-10-01 04:29:45','success','192.168.1.10'),
(349,'Admin Tangolab','Update Status Pesanan','INV-165 (siap)','2026-10-01 04:29:46','success','192.168.1.10'),
(350,'Admin Tangolab','Update Status Pesanan','INV-165 (siap)','2026-10-01 04:29:46','success','192.168.1.10'),
(351,'Admin Tangolab','Update Status Pesanan','INV-165 (selesai)','2026-10-01 04:29:48','success','192.168.1.10'),
(352,'Admin Tangolab','Update Status Pesanan','INV-165 (selesai)','2026-10-01 04:29:48','success','192.168.1.10'),
(353,'Admin Tangolab','Update Status Pesanan','INV-726 (sedang_diproses)','2026-10-01 04:29:50','success','192.168.1.10'),
(354,'Admin Tangolab','Update Status Pesanan','INV-726 (sedang_diproses)','2026-10-01 04:29:50','success','192.168.1.10'),
(355,'Admin Tangolab','Update Status Pesanan','INV-726 (siap)','2026-10-01 04:29:51','success','192.168.1.10'),
(356,'Admin Tangolab','Update Status Pesanan','INV-726 (selesai)','2026-10-01 04:29:52','success','192.168.1.10'),
(357,'Admin Tangolab','Update Status Pesanan','INV-078 (sedang_diproses)','2026-10-01 04:29:53','success','192.168.1.10'),
(358,'Admin Tangolab','Update Status Pesanan','INV-078 (siap)','2026-10-01 04:29:54','success','192.168.1.10'),
(359,'Admin Tangolab','Update Status Pesanan','INV-078 (siap)','2026-10-01 04:29:54','success','192.168.1.10'),
(360,'Admin Tangolab','Update Status Pesanan','INV-078 (selesai)','2026-10-01 04:29:55','success','192.168.1.10'),
(361,'Admin Tangolab','Update Status Pesanan','INV-550 (sedang_diproses)','2026-10-01 04:29:56','success','192.168.1.10'),
(362,'Admin Tangolab','Update Status Pesanan','INV-001 (sedang_diproses)','2026-10-01 04:29:56','success','192.168.1.10'),
(363,'Admin Tangolab','Update Status Pesanan','INV-550 (siap)','2026-10-01 04:29:57','success','192.168.1.10'),
(364,'Admin Tangolab','Update Status Pesanan','INV-550 (siap)','2026-10-01 04:29:57','success','192.168.1.10'),
(365,'Admin Tangolab','Update Status Pesanan','INV-001 (siap)','2026-10-01 04:29:57','success','192.168.1.10'),
(366,'Admin Tangolab','Update Status Pesanan','INV-001 (siap)','2026-10-01 04:29:58','success','192.168.1.10'),
(367,'Admin Tangolab','Update Status Pesanan','INV-550 (selesai)','2026-10-01 04:29:59','success','192.168.1.10'),
(368,'Admin Tangolab','Update Status Pesanan','INV-001 (selesai)','2026-10-01 04:29:59','success','192.168.1.10'),
(369,'Admin Tangolab','Update Status Pesanan','INV-872 (sedang_diproses)','2026-10-01 04:30:00','success','192.168.1.10'),
(370,'Admin Tangolab','Update Status Pesanan','INV-190 (sedang_diproses)','2026-10-01 04:30:00','success','192.168.1.10'),
(371,'Admin Tangolab','Update Status Pesanan','INV-872 (siap)','2026-10-01 04:30:01','success','192.168.1.10'),
(372,'Admin Tangolab','Update Status Pesanan','INV-190 (siap)','2026-10-01 04:30:01','success','192.168.1.10'),
(373,'Admin Tangolab','Update Status Pesanan','INV-190 (siap)','2026-10-01 04:30:01','success','192.168.1.10'),
(374,'Admin Tangolab','Update Status Pesanan','INV-872 (selesai)','2026-10-01 04:30:02','success','192.168.1.10'),
(375,'Admin Tangolab','Update Status Pesanan','INV-190 (selesai)','2026-10-01 04:30:03','success','192.168.1.10'),
(376,'Admin Tangolab','Buat Pesanan Manual','INV-346 (AMEL)','2026-10-01 05:08:02','success','192.168.1.10'),
(377,'Admin Tangolab','Update Status Pesanan','INV-346 (sedang_diproses)','2026-10-01 05:09:14','success','192.168.1.10'),
(378,'Admin Tangolab','Update Status Pesanan','INV-346 (siap)','2026-10-01 05:09:15','success','192.168.1.10'),
(379,'Admin Tangolab','Update Status Pesanan','INV-346 (selesai)','2026-10-01 05:09:16','success','192.168.1.10'),
(380,'Admin Tangolab','Update Menu','egg','2026-10-01 05:11:16','success','192.168.1.10'),
(381,'Admin Tangolab','Hapus Pesanan','INV-299','2026-10-01 05:14:25','warning','192.168.1.10'),
(382,'Admin Tangolab','Hapus Pesanan','INV-003','2026-10-01 05:14:30','warning','192.168.1.10'),
(383,'Admin Tangolab','Hapus Pesanan','INV-550','2026-10-01 05:14:44','warning','192.168.1.10'),
(384,'Admin Tangolab','Update Status Pesanan','INV-689 (sedang_diproses)','2026-10-01 05:25:18','success','192.168.1.10'),
(385,'Admin Tangolab','Update Status Pesanan','INV-689 (sedang_diproses)','2026-10-01 05:25:20','success','192.168.1.10'),
(386,'Admin Tangolab','Update Status Pesanan','INV-689 (sedang_diproses)','2026-10-01 05:25:21','success','192.168.1.10'),
(387,'Admin Tangolab','Update Status Pesanan','INV-689 (siap)','2026-10-01 05:25:21','success','192.168.1.10'),
(388,'Admin Tangolab','Update Status Pesanan','INV-689 (selesai)','2026-10-01 05:25:23','success','192.168.1.10'),
(389,'Admin Tangolab','Hapus Pesanan','INV-689','2026-10-01 05:25:35','warning','192.168.1.10'),
(390,'Admin Tangolab','Buat Pesanan Manual','INV-059 (TEMEN NANDA)','2026-10-01 05:56:03','success','192.168.1.10'),
(391,'Admin Tangolab','Hapus Pesanan','INV-383','2026-10-01 05:56:29','warning','192.168.1.10'),
(392,'Admin Tangolab','Hapus Pesanan','INV-353','2026-10-01 05:56:35','warning','192.168.1.10'),
(393,'Admin Tangolab','Hapus Pesanan','INV-321','2026-10-01 05:56:48','warning','192.168.1.10'),
(394,'Admin Tangolab','Hapus Pesanan','INV-012','2026-10-01 05:56:52','warning','192.168.1.10'),
(395,'Admin Tangolab','Hapus Pesanan','INV-897','2026-10-01 05:56:57','warning','192.168.1.10'),
(396,'Admin Tangolab','Hapus Pesanan','INV-687','2026-10-01 05:56:59','warning','192.168.1.10'),
(397,'Admin Tangolab','Hapus Pesanan','INV-630','2026-10-01 05:57:02','warning','192.168.1.10'),
(398,'Admin Tangolab','Ubah Status Bayar','INV-872 (lunas)','2026-10-01 05:58:09','success','192.168.1.10'),
(399,'Admin Tangolab','Ubah Status Bayar','INV-872 (belum_bayar)','2026-10-01 06:01:36','success','192.168.1.10'),
(400,'Admin Tangolab','Ubah Status Bayar','INV-872 (lunas)','2026-10-01 06:01:36','success','192.168.1.10'),
(401,'Admin Tangolab','Update Status Pesanan','INV-872 (sedang_diproses)','2026-10-01 06:01:44','success','192.168.1.10'),
(402,'Admin Tangolab','Update Status Pesanan','INV-872 (siap)','2026-10-01 06:01:45','success','192.168.1.10'),
(403,'Admin Tangolab','Update Status Pesanan','INV-872 (selesai)','2026-10-01 06:01:47','success','192.168.1.10'),
(404,'Admin Tangolab','Update Status Pesanan','INV-059 (sedang_diproses)','2026-10-01 06:01:48','success','192.168.1.10'),
(405,'Admin Tangolab','Update Status Pesanan','INV-059 (siap)','2026-10-01 06:01:50','success','192.168.1.10'),
(406,'Admin Tangolab','Buat Pesanan Manual','INV-068 (alif)','2026-10-02 08:33:46','success','192.168.1.10'),
(407,'Admin Tangolab','Buat Pesanan Manual','INV-210 (cristin)','2026-10-02 08:34:50','success','192.168.1.10'),
(408,'Admin Tangolab','Ubah Status Bayar','INV-210 (lunas)','2026-10-02 08:36:12','success','192.168.1.10'),
(409,'Admin Tangolab','Ubah Status Bayar','INV-068 (lunas)','2026-10-02 08:36:20','success','192.168.1.10'),
(410,'Admin Tangolab','Ubah Status Bayar','INV-059 (lunas)','2026-10-02 08:36:22','success','192.168.1.10'),
(411,'Admin Tangolab','Buat Pesanan Manual','INV-879 (arika)','2026-10-02 09:01:26','success','192.168.1.10'),
(412,'Admin Tangolab','Buat Pesanan Manual','INV-580 (arika)','2026-10-02 09:01:48','success','192.168.1.10'),
(413,'Admin Tangolab','Ubah Status Bayar','INV-580 (lunas)','2026-10-05 01:05:58','success','192.168.1.10'),
(414,'Admin Tangolab','Ubah Status Bayar','INV-879 (lunas)','2026-10-05 01:05:58','success','192.168.1.10'),
(415,'Admin Tangolab','Buat Pesanan Manual','INV-520 (pa yusuf)','2026-10-05 02:05:52','success','192.168.1.10'),
(416,'Admin Tangolab','Tambah Menu Baru','telor dadar (coworking)','2026-10-05 02:12:53','success','192.168.1.10'),
(417,'Admin Tangolab','Tambah Menu Baru','kentang omlete (coworking)','2026-10-05 02:15:30','success','192.168.1.10'),
(418,'Admin Tangolab','Buat Pesanan Manual','INV-655 (amany)','2026-10-05 02:16:22','success','192.168.1.10'),
(419,'Admin Tangolab','Buat Pesanan Manual','INV-613 (Nadine)','2026-10-05 02:16:52','success','192.168.1.10'),
(420,'Admin Tangolab','Buat Pesanan Manual','INV-519 (pa yusuf)','2026-10-05 02:17:19','success','192.168.1.10'),
(421,'Admin Tangolab','Buat Pesanan Manual','INV-615 (hapis)','2026-10-05 02:20:31','success','192.168.1.10'),
(422,'Admin Tangolab','Buat Pesanan Manual','INV-560 (rianti)','2026-10-05 02:50:06','success','192.168.1.10'),
(423,'Admin Tangolab','Buat Pesanan Manual','INV-178 (dyan)','2026-10-05 03:33:42','success','192.168.1.10'),
(424,'Admin Tangolab','Ubah Status Bayar','INV-178 (lunas)','2026-10-05 03:52:48','success','192.168.1.10'),
(425,'Admin Tangolab','Buat Pesanan Manual','INV-970 (sena)','2026-10-05 04:41:10','success','192.168.1.10'),
(426,'Admin Tangolab','Buat Pesanan Manual','INV-111 (b maul)','2026-10-05 04:42:05','success','192.168.1.10'),
(427,'Admin Tangolab','Buat Pesanan Manual','INV-980 (Danu)','2026-10-05 07:23:52','success','192.168.1.10'),
(428,'Admin Tangolab','Buat Pesanan Manual','INV-571 (Gins)','2026-10-05 07:45:41','success','192.168.1.10'),
(429,'Admin Tangolab','Buat Pesanan Manual','INV-369 (farrel)','2026-10-05 07:56:32','success','192.168.1.10'),
(430,'Admin Tangolab','Buat Pesanan Manual','INV-224 (azra)','2026-10-05 07:57:40','success','192.168.1.10'),
(431,'Admin Tangolab','Buat Pesanan Manual','INV-682 (nazira)','2026-10-05 08:30:17','success','192.168.1.10'),
(432,'Admin Tangolab','Ubah Status Bayar','INV-682 (lunas)','2026-10-05 08:44:24','success','192.168.1.10'),
(433,'Admin Tangolab','Ubah Status Bayar','INV-682 (belum_bayar)','2026-10-05 08:44:28','success','192.168.1.10'),
(434,'Admin Tangolab','Ubah Status Bayar','INV-682 (lunas)','2026-10-06 02:51:24','success','192.168.1.10'),
(435,'Admin Tangolab','Ubah Status Bayar','INV-224 (lunas)','2026-10-06 02:51:25','success','192.168.1.10'),
(436,'Admin Tangolab','Ubah Status Bayar','INV-369 (lunas)','2026-10-06 02:51:27','success','192.168.1.10'),
(437,'Admin Tangolab','Ubah Status Bayar','INV-571 (lunas)','2026-10-06 02:51:29','success','192.168.1.10'),
(438,'Admin Tangolab','Ubah Status Bayar','INV-980 (lunas)','2026-10-06 02:51:30','success','192.168.1.10'),
(439,'Admin Tangolab','Ubah Status Bayar','INV-111 (lunas)','2026-10-06 02:51:32','success','192.168.1.10'),
(440,'Admin Tangolab','Ubah Status Bayar','INV-970 (lunas)','2026-10-06 02:51:34','success','192.168.1.10'),
(441,'Admin Tangolab','Ubah Status Bayar','INV-560 (lunas)','2026-10-06 02:51:36','success','192.168.1.10'),
(442,'Admin Tangolab','Ubah Status Bayar','INV-615 (lunas)','2026-10-06 02:51:38','success','192.168.1.10'),
(443,'Admin Tangolab','Ubah Status Bayar','INV-519 (lunas)','2026-10-06 02:51:41','success','192.168.1.10'),
(444,'Admin Tangolab','Ubah Status Bayar','INV-655 (lunas)','2026-10-06 02:51:45','success','192.168.1.10'),
(445,'Admin Tangolab','Ubah Status Bayar','INV-520 (lunas)','2026-10-06 02:51:47','success','192.168.1.10'),
(446,'Admin Tangolab','Ubah Status Bayar','INV-613 (lunas)','2026-10-06 02:52:00','success','192.168.1.10'),
(447,'Admin Tangolab','Ubah Status Bayar','INV-613 (belum_bayar)','2026-10-06 02:52:15','success','192.168.1.10'),
(448,'Admin Tangolab','Tambah Menu Baru','mie goreng  (coworking)','2026-10-06 13:07:20','success','192.168.1.10'),
(449,'Admin Tangolab','Tambah Menu Baru','nasi goreng katsu  (coworking)','2026-10-06 13:07:46','success','192.168.1.10'),
(450,'Admin Tangolab','Tambah Menu Baru','nasi bento shrimp roll (coworking)','2026-10-06 13:10:58','success','192.168.1.10'),
(451,'Admin Tangolab','Tambah Menu Baru','nasi bento katsu (coworking)','2026-10-06 13:12:06','success','192.168.1.10'),
(452,'Admin Tangolab','Buat Pesanan Manual','INV-027 (Panitia OCL)','2026-10-06 13:16:41','success','192.168.1.10'),
(453,'Admin Tangolab','Ubah Status Bayar','INV-027 (lunas)','2026-10-06 13:50:34','success','192.168.1.10'),
(454,'Admin Tangolab','Buat Pesanan Manual','INV-884 (bayu)','2026-10-07 08:45:10','success','192.168.1.10'),
(455,'Admin Tangolab','Buat Pesanan Manual','INV-996 (fefe)','2026-10-08 02:07:21','success','192.168.1.10'),
(456,'Admin Tangolab','Hapus Pesanan','INV-996','2026-10-08 02:07:33','warning','192.168.1.10'),
(457,'Admin Tangolab','Buat Pesanan Manual','INV-272 (mkkm)','2026-10-09 03:19:39','success','192.168.1.10'),
(458,'Admin Tangolab','Buat Pesanan Manual','INV-748 (cvbnj)','2026-10-09 03:20:22','success','192.168.1.10'),
(459,'Admin Tangolab','Tambah Menu Baru','Indomie fried noodles 85g (coworking)','2026-10-09 03:29:16','success','192.168.1.10'),
(460,'Admin Tangolab','Tambah Menu Baru','Astor Wafer Stick Single (coworking)','2026-10-09 03:31:24','success','192.168.1.10'),
(461,'Admin Tangolab','Hapus Menu','Astor Wafer Stick Single (coworking)','2026-10-09 03:32:04','warning','192.168.1.10'),
(462,'Admin Tangolab','Tambah Menu Baru','Astor Wafer Stick Single (coworking)','2026-10-09 03:32:25','success','192.168.1.10'),
(463,'Admin Tangolab','Tambah Menu Baru','Chitato All Var (coworking)','2026-10-09 03:33:29','success','192.168.1.10'),
(464,'Admin Tangolab','Tambah Menu Baru','Japota All Var (coworking)','2026-10-09 03:34:26','success','192.168.1.10'),
(465,'Admin Tangolab','Update Menu','Japota All Var','2026-10-09 03:34:54','success','192.168.1.10'),
(466,'Admin Tangolab','Tambah Menu Baru','Oreo SoftCake (coworking)','2026-10-09 03:35:56','success','192.168.1.10'),
(467,'Admin Tangolab','Tambah Menu Baru','Superstar Triple Choco (coworking)','2026-10-09 03:37:13','success','192.168.1.10'),
(468,'Admin Tangolab','Tambah Menu Baru','Beng-beng (coworking)','2026-10-09 03:38:02','success','192.168.1.10'),
(469,'Admin Tangolab','Update Menu','Beng-beng','2026-10-09 03:38:13','success','192.168.1.10'),
(470,'Admin Tangolab','Tambah Menu Baru','Saltchese (coworking)','2026-10-09 03:39:02','success','192.168.1.10'),
(471,'Admin Tangolab','Update Menu','Saltchese','2026-10-09 03:39:14','success','192.168.1.10'),
(472,'Admin Tangolab','Tambah Menu Baru','Oishi Popcorn Caramel (coworking)','2026-10-09 03:40:03','success','192.168.1.10'),
(473,'Admin Tangolab','Tambah Menu Baru','Tango Wafle (coworking)','2026-10-09 03:46:33','success','192.168.1.10'),
(474,'Admin Tangolab','Tambah Menu Baru','Chitato lite Saewed (coworking)','2026-10-09 03:47:14','success','192.168.1.10'),
(475,'Admin Tangolab','Tambah Menu Baru','Superco (coworking)','2026-10-09 03:47:36','success','192.168.1.10'),
(476,'Admin Tangolab','Tambah Menu Baru','Cheetos Corn Chese (coworking)','2026-10-09 03:48:26','success','192.168.1.10'),
(477,'Admin Tangolab','Tambah Menu Baru','Chitato Kecil (coworking)','2026-10-09 03:58:10','success','192.168.1.10'),
(478,'Admin Tangolab','Tambah Menu Baru','Taro Net (coworking)','2026-10-09 03:58:40','success','192.168.1.10'),
(479,'Admin Tangolab','Update Menu','Taro Net Seawed','2026-10-09 03:58:53','success','192.168.1.10'),
(480,'Admin Tangolab','Tambah Menu Baru','Sukro Oven (coworking)','2026-10-09 03:59:18','success','192.168.1.10'),
(481,'Admin Tangolab','Tambah Menu Baru','Pop Mie  (coworking)','2026-10-09 03:59:52','success','192.168.1.10'),
(482,'Admin Tangolab','Tambah Menu Baru','Qtella Singkong (coworking)','2026-10-09 04:00:20','success','192.168.1.10'),
(483,'Admin Tangolab','Tambah Menu Baru','Roppang Semua Rasa (coworking)','2026-10-09 04:00:57','success','192.168.1.10'),
(484,'Admin Tangolab','Tambah Menu Baru','Mie Kremez (coworking)','2026-10-09 04:01:23','success','192.168.1.10'),
(485,'Admin Tangolab','Tambah Menu Baru','Chiki Balls (coworking)','2026-10-09 04:01:51','success','192.168.1.10'),
(486,'Admin Tangolab','Tambah Menu Baru','Sakura Mi Goreng (coworking)','2026-10-09 04:02:23','success','192.168.1.10'),
(487,'Admin Tangolab','Tambah Menu Baru','Mie Gelas (coworking)','2026-10-09 04:02:45','success','192.168.1.10'),
(488,'Admin Tangolab','Tambah Menu Baru','TicTac (coworking)','2026-10-09 04:03:17','success','192.168.1.10'),
(489,'Admin Tangolab','Tambah Menu Baru','Keju Cake (coworking)','2026-10-09 04:03:42','success','192.168.1.10'),
(490,'Admin Tangolab','Tambah Menu Baru','Kue (coworking)','2026-10-09 04:04:06','success','192.168.1.10'),
(491,'Admin Tangolab','Update Menu','Indomie Fried Noodles ','2026-10-09 04:04:33','success','192.168.1.10'),
(492,'Admin Tangolab','Update Menu','Beng-beng','2026-10-09 04:05:27','success','192.168.1.10'),
(493,'Admin Tangolab','Update Menu','Superstar Triple Choco','2026-10-09 04:06:15','success','192.168.1.10'),
(494,'Admin Tangolab','Update Menu','Tango Wafle','2026-10-09 04:07:05','success','192.168.1.10'),
(495,'Admin Tangolab','Update Menu','Pop Mie ','2026-10-09 04:08:34','success','192.168.1.10'),
(496,'Admin Tangolab','Update Menu','Kue','2026-10-09 04:08:47','success','192.168.1.10'),
(497,'Admin Tangolab','Update Menu','Roppang ','2026-10-09 04:09:03','success','192.168.1.10'),
(498,'Admin Tangolab','Update Menu','Oishi Popcorn Caramel','2026-10-09 04:09:30','success','192.168.1.10'),
(499,'Admin Tangolab','Update Menu','Superco','2026-10-09 04:09:37','success','192.168.1.10'),
(500,'Admin Tangolab','Update Menu','Chitato Kecil','2026-10-09 04:11:11','success','192.168.1.10'),
(501,'Admin Tangolab','Tambah Menu Baru','Lemineral (coworking)','2026-10-09 04:16:14','success','192.168.1.10'),
(502,'Admin Tangolab','Buat Pesanan Manual','INV-700 (asdf)','2026-10-09 04:16:42','success','192.168.1.10'),
(503,'Admin Tangolab','Tambah Menu Baru','Teh Javana (coworking)','2026-10-09 04:26:08','success','192.168.1.10'),
(504,'Admin Tangolab','Tambah Menu Baru','Cimory Susu (coworking)','2026-10-09 04:26:47','success','192.168.1.10'),
(505,'Admin Tangolab','Tambah Menu Baru','Frisian Flag  Full Cream (coworking)','2026-10-09 04:27:46','success','192.168.1.10'),
(506,'Admin Tangolab','Tambah Menu Baru','Pulpy (coworking)','2026-10-09 04:28:11','success','192.168.1.10'),
(507,'Admin Tangolab','Tambah Menu Baru','Cincau Hitam Cap Panda (coworking)','2026-10-09 04:28:46','success','192.168.1.10'),
(508,'Admin Tangolab','Tambah Menu Baru','Kin Yogurt (coworking)','2026-10-09 04:29:13','success','192.168.1.10'),
(509,'Admin Tangolab','Tambah Menu Baru','Larutan Cap Kaki Tiga (coworking)','2026-10-09 04:29:47','success','192.168.1.10'),
(510,'Admin Tangolab','Tambah Menu Baru','Cimory Yogurt (coworking)','2026-10-09 04:30:13','success','192.168.1.10'),
(511,'Admin Tangolab','Tambah Menu Baru','Nii Milk Tea (coworking)','2026-10-09 04:30:47','success','192.168.1.10'),
(512,'Admin Tangolab','Tambah Menu Baru','Fruit Tea (coworking)','2026-10-09 04:31:32','success','192.168.1.10'),
(513,'Admin Tangolab','Tambah Menu Baru','Milku (coworking)','2026-10-09 04:32:02','success','192.168.1.10'),
(514,'Admin Tangolab','Tambah Menu Baru','Nipis Madu (coworking)','2026-10-09 04:32:33','success','192.168.1.10'),
(515,'Admin Tangolab','Tambah Menu Baru','Teh Pucuk Harum (coworking)','2026-10-09 04:32:59','success','192.168.1.10'),
(516,'Admin Tangolab','Buat Pesanan Manual','INV-346 (hana)','2026-10-09 05:38:25','success','192.168.1.10'),
(517,'Admin Tangolab','Update Menu','nasi bento katsu','2026-10-12 01:32:58','success','192.168.1.10'),
(518,'Admin Tangolab','Update Menu','nasi bento shrimp roll','2026-10-12 01:35:19','success','192.168.1.10'),
(519,'Admin Tangolab','Update Menu','nasi goreng katsu ','2026-10-12 01:35:26','success','192.168.1.10'),
(520,'Admin Tangolab','Update Menu','mie goreng ','2026-10-12 01:35:32','success','192.168.1.10'),
(521,'Admin Tangolab','Update Menu','kentang omlete','2026-10-12 01:35:39','success','192.168.1.10'),
(522,'Admin Tangolab','Update Menu','telor dadar','2026-10-12 01:35:54','success','192.168.1.10'),
(523,'Admin Tangolab','Update Data Pegawai','Mas\'ud (Role: Support -> Super Admin)','2026-10-12 01:35:54','success','192.168.1.10'),
(524,'Admin Tangolab','Update Menu','chiken wing hot lava','2026-10-12 01:35:59','success','192.168.1.10'),
(525,'Admin Tangolab','Update Menu','Nasi Ayam Goreng Bawang Putih','2026-10-12 01:36:05','success','192.168.1.10'),
(526,'Admin Tangolab','Update Menu','Indomie Tek Tek','2026-10-12 01:36:11','success','192.168.1.10'),
(527,'Admin Tangolab','Update Menu','Indomie Dokdok','2026-10-12 01:36:17','success','192.168.1.10'),
(528,'Admin Tangolab','Buat Pesanan Manual','INV-955 (Pa yusuf)','2026-10-12 04:20:25','success','192.168.1.10'),
(529,'Admin Tangolab','Buat Pesanan Manual','INV-993 (Sena)','2026-10-12 04:28:44','success','192.168.1.10'),
(530,'Admin Tangolab','Buat Pesanan Manual','INV-921 (Oo)','2026-10-12 04:37:59','success','192.168.1.10'),
(531,'Admin Tangolab','Buat Pesanan Manual','INV-801 (Lara)','2026-10-12 05:00:32','success','192.168.1.10'),
(532,'Admin Tangolab','Buat Pesanan Manual','INV-657 (Lara)','2026-10-12 05:01:16','success','192.168.1.10'),
(533,'Admin Tangolab','Buat Pesanan Manual','INV-203 (Rre)','2026-10-12 05:02:50','success','192.168.1.10'),
(534,'Admin Tangolab','Buat Pesanan Manual','INV-582 (Rre)','2026-10-12 05:03:23','success','192.168.1.10'),
(535,'Admin Tangolab','Buat Pesanan Manual','INV-560 (lm)','2026-10-12 05:28:11','success','192.168.1.10'),
(536,'Admin Tangolab','Buat Pesanan Manual','INV-108 (Krombok)','2026-10-12 06:03:19','success','192.168.1.10'),
(537,'Admin Tangolab','Buat Pesanan Manual','INV-190 (Amni)','2026-10-12 07:10:09','success','192.168.1.10'),
(538,'Admin Tangolab','Buat Pesanan Manual','INV-915 (Hvj)','2026-10-12 07:10:26','success','192.168.1.10'),
(539,'Admin Tangolab','Buat Pesanan Manual','INV-538 (Yuuy)','2026-10-12 07:12:15','success','192.168.1.10'),
(540,'Admin Tangolab','Buat Pesanan Manual','INV-705 (Pak Yusuf)','2026-10-13 01:39:46','success','192.168.1.10'),
(541,'Admin Tangolab','Buat Pesanan Manual','INV-825 (Pa arwin)','2026-10-13 05:18:38','success','192.168.1.10'),
(542,'Admin Tangolab','Update Status Pesanan','INV-879 (sedang_diproses)','2026-10-13 08:36:33','success','192.168.1.10'),
(543,'Admin Tangolab','Update Status Pesanan','INV-580 (sedang_diproses)','2026-10-13 08:36:34','success','192.168.1.10'),
(544,'Admin Tangolab','Update Status Pesanan','INV-980 (sedang_diproses)','2026-10-13 08:36:35','success','192.168.1.10'),
(545,'Admin Tangolab','Update Status Pesanan','INV-571 (sedang_diproses)','2026-10-13 08:36:36','success','192.168.1.10'),
(546,'Admin Tangolab','Update Status Pesanan','INV-369 (sedang_diproses)','2026-10-13 08:36:37','success','192.168.1.10'),
(547,'Admin Tangolab','Update Status Pesanan','INV-224 (sedang_diproses)','2026-10-13 08:36:38','success','192.168.1.10'),
(548,'Admin Tangolab','Update Status Pesanan','INV-682 (sedang_diproses)','2026-10-13 08:36:39','success','192.168.1.10'),
(549,'Admin Tangolab','Update Status Pesanan','INV-884 (sedang_diproses)','2026-10-13 08:36:41','success','192.168.1.10'),
(550,'Admin Tangolab','Update Status Pesanan','INV-879 (siap)','2026-10-13 08:36:41','success','192.168.1.10'),
(551,'Admin Tangolab','Update Status Pesanan','INV-580 (siap)','2026-10-13 08:36:42','success','192.168.1.10'),
(552,'Admin Tangolab','Update Status Pesanan','INV-980 (siap)','2026-10-13 08:36:43','success','192.168.1.10'),
(553,'Admin Tangolab','Update Status Pesanan','INV-571 (siap)','2026-10-13 08:36:44','success','192.168.1.10'),
(554,'Admin Tangolab','Update Status Pesanan','INV-369 (siap)','2026-10-13 08:36:45','success','192.168.1.10'),
(555,'Admin Tangolab','Update Status Pesanan','INV-224 (siap)','2026-10-13 08:36:46','success','192.168.1.10'),
(556,'Admin Tangolab','Update Status Pesanan','INV-682 (siap)','2026-10-13 08:36:48','success','192.168.1.10'),
(557,'Admin Tangolab','Update Status Pesanan','INV-884 (siap)','2026-10-13 08:36:49','success','192.168.1.10'),
(558,'Admin Tangolab','Update Status Pesanan','INV-879 (selesai)','2026-10-13 08:36:50','success','192.168.1.10'),
(559,'Admin Tangolab','Update Status Pesanan','INV-580 (selesai)','2026-10-13 08:36:51','success','192.168.1.10'),
(560,'Admin Tangolab','Update Status Pesanan','INV-980 (selesai)','2026-10-13 08:36:52','success','192.168.1.10'),
(561,'Admin Tangolab','Update Status Pesanan','INV-571 (selesai)','2026-10-13 08:36:53','success','192.168.1.10'),
(562,'Admin Tangolab','Update Status Pesanan','INV-369 (selesai)','2026-10-13 08:36:54','success','192.168.1.10'),
(563,'Admin Tangolab','Update Status Pesanan','INV-224 (selesai)','2026-10-13 08:36:55','success','192.168.1.10'),
(564,'Admin Tangolab','Update Status Pesanan','INV-682 (selesai)','2026-10-13 08:36:55','success','192.168.1.10'),
(565,'Admin Tangolab','Update Status Pesanan','INV-884 (selesai)','2026-10-13 08:36:57','success','192.168.1.10');
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coin_promos`
--

DROP TABLE IF EXISTS `coin_promos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `coin_promos` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `coin_cost` int NOT NULL,
  `discount_type` enum('fixed','percentage','free_item') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'fixed',
  `discount_value` int NOT NULL,
  `min_order` int NOT NULL DEFAULT '0',
  `max_usage` int NOT NULL DEFAULT '100',
  `used_count` int NOT NULL DEFAULT '0',
  `valid_until` datetime NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `image_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(100) COLLATE utf8mb4_general_ci DEFAULT 'Semua',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `free_item_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `required_item_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `promo_code` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `limit_per_user` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `promo_code` (`promo_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coin_promos`
--

LOCK TABLES `coin_promos` WRITE;
/*!40000 ALTER TABLE `coin_promos` DISABLE KEYS */;
INSERT INTO `coin_promos` VALUES
('cp-1780646073298','Diskon 20% Ayam Bakar','ayam bakar diskon besar besaran',200,'percentage',20,10000,10,0,'2026-06-29 00:00:00',1,'/uploads/promos/promo-1780646072923.jpeg','Semua','2026-06-05 07:54:33','2026-06-05 07:56:44','Ayam Bakar','','1779568926193',NULL,NULL,1),
('cp-1781605494257','Beli Ayam Bakar Gratis Esteh manis','gratis esteh',400,'free_item',0,10000,100,0,'2026-06-26 00:00:00',1,'/uploads/promos/promo-1781605494248.jpeg','Semua','2026-06-16 10:24:54','2026-06-16 10:24:54','estehh manis','Ayam Bakar','1779568926193',NULL,NULL,1),
('cp-1789530889514','Voucher Diskon 20% ','Minimal 5000 pemebelian',500,'fixed',5000,5000,10,0,'2026-09-30 00:00:00',1,'/uploads/default_voucher.png','Semua','2026-09-16 03:54:49','2026-09-16 03:54:49',NULL,NULL,NULL,NULL,'NGOLABID',1);
/*!40000 ALTER TABLE `coin_promos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coin_transactions`
--

DROP TABLE IF EXISTS `coin_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `coin_transactions` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `order_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `user_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Snapshot nama user',
  `type` enum('earn','redeem') COLLATE utf8mb4_general_ci NOT NULL,
  `amount` int NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `promo_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_coin_transactions_order_reward` (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `promo_id` (`promo_id`),
  CONSTRAINT `coin_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `coin_transactions_ibfk_2` FOREIGN KEY (`promo_id`) REFERENCES `coin_promos` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coin_transactions`
--

LOCK TABLES `coin_transactions` WRITE;
/*!40000 ALTER TABLE `coin_transactions` DISABLE KEYS */;
INSERT INTO `coin_transactions` VALUES
('ct-1780329913764',NULL,'607012400054','ahmad husen','earn',100,'Bonus Pendaftaran',NULL,'2026-06-01 16:05:13'),
('ct-1780329955250',NULL,'607012400054','ahmad husen','earn',500,'Hadiah koin dari aktivitas game/kiosk',NULL,'2026-06-01 16:05:55'),
('ct-1780329961341',NULL,'607012400054','ahmad husen','redeem',200,'Tukar: Diskon 50% nasi goreng',NULL,'2026-06-01 16:06:01'),
('ct-1780648444705',NULL,'user-1780648444622','Ahmad Fauzi Fore Test','earn',100,'Bonus Pendaftaran',NULL,'2026-06-05 08:34:04'),
('ct-1781625191786',NULL,'u-1781625191785','Bagus Mahasiswa','earn',100,'Bonus Pendaftaran',NULL,'2026-06-16 15:53:11'),
('ct-1781625191807',NULL,'u-1781625191785','Bagus Mahasiswa','earn',45,'Belajar: Kalkulus II (90 Menit)',NULL,'2026-06-16 15:53:11'),
('ct-1781625191820',NULL,'u-1781625191785','Bagus Mahasiswa','redeem',20,'Urunan Poin: Patungan Buku Perpustakaan Baru',NULL,'2026-06-16 15:53:11'),
('ct-1781697553700',NULL,'7049509454','ahamd','earn',100,'Bonus Pendaftaran',NULL,'2026-06-17 11:59:13'),
('ct-1788142632215',NULL,'user-1780648444622','Ahmad Fauzi Fore Test','earn',750,'Cashback 5% dari INV-882',NULL,'2026-08-31 02:17:12'),
('ct-1788142692687',NULL,'user-1780648444622','Ahmad Fauzi Fore Test','earn',750,'Cashback 5% dari INV-882',NULL,'2026-08-31 02:18:12'),
('ct-1789117743348-614',NULL,'7049509454','ahamd','earn',30,'Reward dari transaksi INV-085',NULL,'2026-09-11 09:09:03'),
('ct-1791478820454',NULL,'u-1791478820035','kiki','earn',100,'Bonus Pendaftaran',NULL,'2026-10-08 17:00:20'),
('ct-1791726218835',NULL,'u-1791726218402','Nothing To See Here','earn',100,'Bonus Pendaftaran',NULL,'2026-10-11 13:43:38'),
('ct-1791740416858',NULL,'u-1791740416465','Uji Integrasi Hermes','earn',100,'Bonus Pendaftaran',NULL,'2026-10-11 17:40:16');
/*!40000 ALTER TABLE `coin_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `digital_screens`
--

DROP TABLE IF EXISTS `digital_screens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `digital_screens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `location` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('online','offline','maintenance') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'offline',
  `last_ping` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `digital_screens`
--

LOCK TABLES `digital_screens` WRITE;
/*!40000 ALTER TABLE `digital_screens` DISABLE KEYS */;
INSERT INTO `digital_screens` VALUES
(1,'Kiosk Utama','Lantai 1 - Dekat Kasir','online','2026-10-10 11:20:24','2026-05-14 19:54:04','2026-10-10 11:20:24'),
(2,'Display Tunggu','Area Tunggu Pelanggan','offline',NULL,'2026-05-14 19:54:04','2026-05-14 19:54:04');
/*!40000 ALTER TABLE `digital_screens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `display_logs`
--

DROP TABLE IF EXISTS `display_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `display_logs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `screen_id` int NOT NULL,
  `media_id` int NOT NULL,
  `playlist_id` int NOT NULL,
  `displayed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `duration_shown` int NOT NULL DEFAULT '0' COMMENT 'Detik konten ditampilkan',
  PRIMARY KEY (`id`),
  KEY `screen_id` (`screen_id`),
  KEY `media_id` (`media_id`),
  KEY `playlist_id` (`playlist_id`),
  CONSTRAINT `display_logs_ibfk_1` FOREIGN KEY (`screen_id`) REFERENCES `digital_screens` (`id`) ON DELETE CASCADE,
  CONSTRAINT `display_logs_ibfk_2` FOREIGN KEY (`media_id`) REFERENCES `media_files` (`id`) ON DELETE CASCADE,
  CONSTRAINT `display_logs_ibfk_3` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `display_logs`
--

LOCK TABLES `display_logs` WRITE;
/*!40000 ALTER TABLE `display_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `display_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `inventory_type` varchar(30) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'raw_material',
  `sku` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `barcode` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Bahan Baku',
  `unit` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `purchase_unit` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purchase_conversion` decimal(12,3) NOT NULL DEFAULT '1.000',
  `stock` decimal(12,2) NOT NULL DEFAULT '0.00',
  `min_stock` decimal(12,2) NOT NULL DEFAULT '0.00',
  `critical_stock` decimal(12,2) NOT NULL DEFAULT '0.00',
  `cost_price` decimal(14,2) NOT NULL DEFAULT '0.00',
  `supplier` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `outlet` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ngolab',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_inventory_barcode_outlet` (`barcode`,`outlet`),
  UNIQUE KEY `uniq_inventory_sku_outlet` (`sku`,`outlet`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES
('ing-1','Mie Basah','raw_material',NULL,NULL,'Bahan Baku','Porsi',NULL,1.000,100.00,20.00,6.00,0.00,NULL,'ngolab',1,'2026-08-31 01:25:18','2026-09-09 04:20:02'),
('ing-2','Ayam Cincang','raw_material',NULL,NULL,'Bahan Baku','Porsi',NULL,1.000,80.00,15.00,4.00,0.00,NULL,'ngolab',1,'2026-08-31 01:25:18','2026-09-09 04:20:02'),
('ing-3','Bakso Halus','raw_material',NULL,NULL,'Bahan Baku','Biji',NULL,1.000,250.00,50.00,15.00,0.00,NULL,'ngolab',1,'2026-08-31 01:25:18','2026-09-09 04:20:02'),
('ing-4','Bakso Urat','raw_material',NULL,NULL,'Bahan Baku','Biji',NULL,1.000,100.00,20.00,6.00,0.00,NULL,'ngolab',1,'2026-08-31 01:25:18','2026-09-09 04:20:02'),
('ing-5','Pangsit Goreng','raw_material',NULL,NULL,'Bahan Baku','Biji',NULL,1.000,150.00,30.00,9.00,0.00,NULL,'ngolab',1,'2026-08-31 01:25:18','2026-09-09 04:20:02'),
('ing-6','Siomay','raw_material',NULL,NULL,'Bahan Baku','Biji',NULL,1.000,120.00,20.00,6.00,0.00,NULL,'ngolab',1,'2026-08-31 01:25:18','2026-09-09 04:20:02'),
('ing-7','Sawi Hijau','raw_material',NULL,NULL,'Bahan Baku','Porsi',NULL,1.000,100.00,15.00,4.00,0.00,NULL,'ngolab',1,'2026-08-31 01:25:18','2026-09-09 04:20:02'),
('ing-8','Bumbu Rahasia','raw_material',NULL,NULL,'Bahan Baku','Gram',NULL,1.000,5000.00,500.00,150.00,0.00,NULL,'ngolab',1,'2026-08-31 01:25:18','2026-09-09 04:20:02');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_movements`
--

DROP TABLE IF EXISTS `inventory_movements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_movements` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ingredient_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `outlet` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ngolab',
  `movement_type` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `quantity` decimal(12,2) NOT NULL,
  `stock_before` decimal(12,2) NOT NULL,
  `stock_after` decimal(12,2) NOT NULL,
  `input_method` varchar(30) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'manual',
  `reference_type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reference_id` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purchase_unit` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `purchase_quantity` decimal(12,2) DEFAULT NULL,
  `unit_cost` decimal(14,2) DEFAULT NULL,
  `supplier` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `batch_number` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `expires_at` date DEFAULT NULL,
  `notes` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `actor_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `actor_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_inventory_movements_item` (`ingredient_id`,`created_at`),
  KEY `idx_inventory_movements_reference` (`reference_type`,`reference_id`),
  KEY `idx_inventory_movements_outlet` (`outlet`,`created_at`),
  CONSTRAINT `fk_inventory_movements_item` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_movements`
--

LOCK TABLES `inventory_movements` WRITE;
/*!40000 ALTER TABLE `inventory_movements` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory_movements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `media_files`
--

DROP TABLE IF EXISTS `media_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `media_files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `file_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `file_path` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `file_url` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `file_size` bigint NOT NULL DEFAULT '0',
  `file_type` enum('image','video') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'image',
  `mime_type` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `duration` int NOT NULL DEFAULT '10' COMMENT 'Durasi tampil dalam detik',
  `thumbnail_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `uploaded_by` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Admin',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media_files`
--

LOCK TABLES `media_files` WRITE;
/*!40000 ALTER TABLE `media_files` DISABLE KEYS */;
INSERT INTO `media_files` VALUES
(1,'Nasi Goreng',NULL,'media-1778789906315.jpg','D:\\Telkom_University\\Ko+lab\\Tangolab\\public\\uploads\\digital-board\\media-1778789906315.jpg','/uploads/digital-board/media-1778789906315.jpg',122588,'image','image/jpeg',10,NULL,NULL,NULL,'Admin',0,'2026-05-14 20:18:26','2026-09-16 03:48:58'),
(2,'nasi nasi',NULL,'media-1778789939357.jpg','D:\\Telkom_University\\Ko+lab\\Tangolab\\public\\uploads\\digital-board\\media-1778789939357.jpg','/uploads/digital-board/media-1778789939357.jpg',124527,'image','image/jpeg',10,NULL,NULL,NULL,'Admin',0,'2026-05-14 20:18:59','2026-09-16 03:48:56'),
(3,'New Coworking Menu',NULL,'media-1789530527864.png','/mnt/web/www/KOLABPANEL_USERS/fnb@ngolab.com/Geasture-admin/public/uploads/digital-board/media-1789530527864.png','/uploads/digital-board/media-1789530527864.png',2915164,'image','image/png',10,NULL,NULL,NULL,'Admin',1,'2026-09-16 03:48:51','2026-09-16 03:48:51'),
(4,'Chiken wings',NULL,'media-1789530602331.png','/mnt/web/www/KOLABPANEL_USERS/fnb@ngolab.com/Geasture-admin/public/uploads/digital-board/media-1789530602331.png','/uploads/digital-board/media-1789530602331.png',2316064,'image','image/png',10,NULL,NULL,NULL,'Admin',1,'2026-09-16 03:50:03','2026-09-16 03:50:03'),
(5,'Ayam Ketumbar',NULL,'media-1789530624820.png','/mnt/web/www/KOLABPANEL_USERS/fnb@ngolab.com/Geasture-admin/public/uploads/digital-board/media-1789530624820.png','/uploads/digital-board/media-1789530624820.png',2078822,'image','image/png',10,NULL,NULL,NULL,'Admin',1,'2026-09-16 03:50:25','2026-09-16 03:50:25'),
(6,'Ayam Baput',NULL,'media-1789530638048.png','/mnt/web/www/KOLABPANEL_USERS/fnb@ngolab.com/Geasture-admin/public/uploads/digital-board/media-1789530638048.png','/uploads/digital-board/media-1789530638048.png',2225922,'image','image/png',10,NULL,NULL,NULL,'Admin',1,'2026-09-16 03:50:40','2026-09-16 03:50:40'),
(7,'Mie dok dok',NULL,'media-1789530656548.png','/mnt/web/www/KOLABPANEL_USERS/fnb@ngolab.com/Geasture-admin/public/uploads/digital-board/media-1789530656548.png','/uploads/digital-board/media-1789530656548.png',2229924,'image','image/png',10,NULL,NULL,NULL,'Admin',1,'2026-09-16 03:50:58','2026-09-16 03:50:58'),
(8,'Mie tek tek',NULL,'media-1789530669968.png','/mnt/web/www/KOLABPANEL_USERS/fnb@ngolab.com/Geasture-admin/public/uploads/digital-board/media-1789530669968.png','/uploads/digital-board/media-1789530669968.png',2336781,'image','image/png',10,NULL,NULL,NULL,'Admin',1,'2026-09-16 03:51:11','2026-09-16 03:51:11'),
(9,'Nasi Goreng Biasa',NULL,'media-1789530692122.png','/mnt/web/www/KOLABPANEL_USERS/fnb@ngolab.com/Geasture-admin/public/uploads/digital-board/media-1789530692122.png','/uploads/digital-board/media-1789530692122.png',2255091,'image','image/png',10,NULL,NULL,NULL,'Admin',1,'2026-09-16 03:51:50','2026-09-16 03:51:50'),
(10,'Nasi goreng Teri',NULL,'media-1789530727914.png','/mnt/web/www/KOLABPANEL_USERS/fnb@ngolab.com/Geasture-admin/public/uploads/digital-board/media-1789530727914.png','/uploads/digital-board/media-1789530727914.png',2200278,'image','image/png',10,NULL,NULL,NULL,'Admin',1,'2026-09-16 03:52:12','2026-09-16 03:52:12');
/*!40000 ALTER TABLE `media_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Semua',
  `price` int NOT NULL DEFAULT '0',
  `in_stock` tinyint(1) NOT NULL DEFAULT '1',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `inventory_available` tinyint(1) NOT NULL DEFAULT '1',
  `availability_override` varchar(20) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'auto',
  `availability_reason` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `availability_updated_by` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `availability_updated_at` datetime DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `outlet` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ngolab' COMMENT 'Sumber menu: ngolab, coworking, smart_tag_qr',
  `image_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES
('1779568926193','Ayam Bakar','Ready Meal',23000,0,0,1,'auto',NULL,NULL,NULL,8,'coworking','https://picsum.photos/seed/AyamBakar/400/300','2026-05-23 20:42:06','2026-09-28 01:48:05','enakkk'),
('1780673324565','Nasi goreng Gila','Ready Meal',14000,0,0,1,'auto',NULL,NULL,NULL,48,'coworking','/uploads/menus/menu-1780673324566-45.jpg','2026-06-05 15:28:44','2026-09-28 01:48:03','sangat pedas'),
('1781605403131','estehh manis','Minuman Siap Saji',7000,0,0,1,'auto',NULL,NULL,NULL,25,'coworking','/uploads/menus/menu-1781605403132-825.jpg','2026-06-16 10:23:23','2026-09-28 01:47:54','esteh manis dengan gula sedang'),
('1781626170670','nasi goreng','Main Course',15000,1,1,1,'auto',NULL,NULL,NULL,30,'ngolab','/uploads/menus/menu-1781626170671-151.jpg','2026-06-16 16:09:30','2026-08-31 01:51:33','nasi di goreng'),
('1781703956232','Menu Uji Katalon 1781703940262','Main Course',15000,1,1,1,'auto',NULL,NULL,NULL,20,'ngolab','https://picsum.photos/seed/MenuUjiKatalon1781703940262/400/300','2026-06-17 13:45:56','2026-09-09 03:35:29','Deskripsi menu uji otomatis Katalon.'),
('1790560348054','Nasi Goreng Telor','Menu Coworking',15000,0,1,1,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1790560348055-849.jpg','2026-09-28 01:52:28','2026-10-13 01:39:46',''),
('1790561002026','Nasi Ayam Ketumbar ','Menu Coworking',17000,0,0,1,'auto',NULL,NULL,NULL,10,'coworking','/uploads/menus/menu-1790561002056-35.png','2026-09-28 02:03:22','2026-10-06 19:02:37',''),
('1790563222672','Nasi Ayam Ketumbar ','Menu Coworking',17000,1,1,1,'auto',NULL,NULL,NULL,2,'coworking','/uploads/menus/menu-1790563222675-885.jpg','2026-09-28 02:40:22','2026-10-12 05:01:16',''),
('1790732636733','Nasi goreng Teri','Menu Coworking',18000,1,1,1,'auto',NULL,NULL,NULL,2,'coworking','/uploads/menus/menu-1790732636734-249.jpg','2026-09-30 01:43:56','2026-10-13 05:18:38',''),
('1790732719604','Indomie Dokdok','Menu Coworking',15000,1,1,1,'auto',NULL,NULL,NULL,10,'coworking','/uploads/menus/menu-1790732719605-567.jpg','2026-09-30 01:45:19','2026-10-12 01:36:17',''),
('1790732769532','Indomie Tek Tek','Menu Coworking',15000,1,1,1,'auto',NULL,NULL,NULL,7,'coworking','/uploads/menus/menu-1790732769532-925.jpg','2026-09-30 01:46:09','2026-10-12 05:03:23',''),
('1790732889297','Nasi Ayam Goreng Bawang Putih','Menu Coworking',17000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1790732889298-138.jpg','2026-09-30 01:48:09','2026-10-12 01:36:05',''),
('1790732941390','chiken wing hot lava','Menu Coworking',17000,1,1,1,'auto',NULL,NULL,NULL,10,'coworking','/uploads/menus/menu-1790732941391-784.jpg','2026-09-30 01:49:01','2026-10-12 01:35:59',''),
('1790732988763','Es teh','Minuman Siap Saji',5000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1790732988763-793.jpg','2026-09-30 01:49:48','2026-09-30 01:49:48',''),
('1790733030819','HOt tea','Minuman Siap Saji',5000,1,1,1,'auto',NULL,NULL,NULL,5,'coworking','/uploads/menus/menu-1790733030819-53.jpg','2026-09-30 01:50:30','2026-10-12 05:03:23',''),
('1790733077540','Es coklat ','Minuman Siap Saji',10000,1,1,1,'auto',NULL,NULL,NULL,4,'coworking','/uploads/menus/menu-1790733077540-891.jpg','2026-09-30 01:51:17','2026-10-06 13:16:41',''),
('1790733117217','hot coklat','Minuman Siap Saji',10000,1,1,1,'auto',NULL,NULL,NULL,10,'coworking','/uploads/menus/menu-1790733117218-656.jpg','2026-09-30 01:51:57','2026-09-30 01:51:57',''),
('1790747916190','egg','Menu Coworking',5000,1,1,1,'auto',NULL,NULL,NULL,8,'coworking','/uploads/menus/menu-1790747916195-343.jpg','2026-09-30 05:58:36','2026-10-06 19:02:37',''),
('1791166373638','telor dadar','Menu Coworking',6000,1,1,1,'auto',NULL,NULL,NULL,98,'coworking','/uploads/menus/menu-1791166373640-201.webp','2026-10-05 02:12:53','2026-10-12 04:20:25',''),
('1791166530765','kentang omlete','Menu Coworking',15000,1,1,1,'auto',NULL,NULL,NULL,99,'coworking','/uploads/menus/menu-1791166530767-369.jpg','2026-10-05 02:15:30','2026-10-12 01:35:39',''),
('1791292040706','mie goreng ','Menu Coworking',12000,1,1,1,'auto',NULL,NULL,NULL,97,'coworking','https://picsum.photos/seed/miegoreng/400/300','2026-10-06 13:07:20','2026-10-12 01:35:32',''),
('1791292066383','nasi goreng katsu ','Menu Coworking',25000,1,1,1,'auto',NULL,NULL,NULL,996,'coworking','https://picsum.photos/seed/nasigorengkatsu/400/300','2026-10-06 13:07:46','2026-10-12 01:35:26',''),
('1791292258358','nasi bento shrimp roll','Menu Coworking',17000,1,1,1,'auto',NULL,NULL,NULL,99,'coworking','https://picsum.photos/seed/nasibentoshrimproll/400/300','2026-10-06 13:10:58','2026-10-12 01:35:19',''),
('1791292326396','nasi bento katsu','Menu Coworking',18000,1,1,1,'auto',NULL,NULL,NULL,999,'coworking','https://picsum.photos/seed/nasibentokatsu/400/300','2026-10-06 13:12:06','2026-10-12 01:32:58',''),
('1791516556400','Indomie Fried Noodles ','Retail',4500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791516556402-95.jpg','2026-10-09 03:29:16','2026-10-09 04:04:33',''),
('1791516745136','Astor Wafer Stick Single','Retail',1600,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791516745139-183.jpg','2026-10-09 03:32:25','2026-10-09 03:32:25',''),
('1791516809841','Chitato All Var','Retail',11600,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791516809844-161.jpg','2026-10-09 03:33:29','2026-10-09 03:33:29',''),
('1791516866918','Japota All Var','Retail',11600,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791516894414-322.jpg','2026-10-09 03:34:26','2026-10-09 03:34:54',''),
('1791516956785','Oreo SoftCake','Retail',3500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791516956787-537.jpg','2026-10-09 03:35:56','2026-10-09 03:35:56',''),
('1791517033883','Superstar Triple Choco','Retail',1500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518775605-210.jpg','2026-10-09 03:37:13','2026-10-09 04:06:15',''),
('1791517082219','Beng-beng','Retail',3500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518727559-352.jpg','2026-10-09 03:38:02','2026-10-09 04:05:27',''),
('1791517142622','Saltchese','Retail',1500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791517142623-188.jpg','2026-10-09 03:39:02','2026-10-09 03:39:14',''),
('1791517203817','Oishi Popcorn Caramel','Retail',2500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791517203819-234.jpg','2026-10-09 03:40:03','2026-10-09 04:09:30',''),
('1791517593305','Tango Wafle','Retail',3000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518825713-187.jpg','2026-10-09 03:46:33','2026-10-09 04:07:05',''),
('1791517634734','Chitato lite Saewed','Retail',2500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791517634734-214.jpg','2026-10-09 03:47:14','2026-10-09 03:47:14',''),
('1791517656657','Superco','Retail',1500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791517656659-789.jpg','2026-10-09 03:47:36','2026-10-09 04:09:37',''),
('1791517706874','Cheetos Corn Chese','Retail',2500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791517706876-826.jpg','2026-10-09 03:48:26','2026-10-09 03:48:26',''),
('1791518290056','Chitato Kecil','Retail',2500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791519071776-199.jpg','2026-10-09 03:58:10','2026-10-09 04:11:11',''),
('1791518320425','Taro Net Seawed','Retail',2500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518320426-222.jpg','2026-10-09 03:58:40','2026-10-09 03:58:53',''),
('1791518358550','Sukro Oven','Retail',2500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518358552-705.jpg','2026-10-09 03:59:18','2026-10-09 03:59:18',''),
('1791518392236','Pop Mie ','Retail',6500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518914335-352.jpg','2026-10-09 03:59:52','2026-10-09 04:08:34',''),
('1791518419991','Qtella Singkong','Retail',2500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518419993-587.jpg','2026-10-09 04:00:20','2026-10-09 04:00:20',''),
('1791518457980','Roppang ','Retail',2500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518457984-847.jpg','2026-10-09 04:00:57','2026-10-09 04:09:03',''),
('1791518483178','Mie Kremez','Retail',2500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518483182-8.jpg','2026-10-09 04:01:23','2026-10-09 04:01:23',''),
('1791518511263','Chiki Balls','Retail',2500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518511264-159.jpg','2026-10-09 04:01:51','2026-10-09 04:01:51',''),
('1791518543485','Sakura Mi Goreng','Retail',2500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518543486-586.jpg','2026-10-09 04:02:23','2026-10-09 04:02:23',''),
('1791518565900','Mie Gelas','Retail',1500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518565901-317.jpg','2026-10-09 04:02:45','2026-10-09 04:02:45',''),
('1791518597638','TicTac','Retail',7500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518597639-98.jpg','2026-10-09 04:03:17','2026-10-09 04:03:17',''),
('1791518622671','Keju Cake','Retail',3000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518622672-854.jpg','2026-10-09 04:03:42','2026-10-09 04:03:42',''),
('1791518646135','Kue','Retail',8000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791518646137-920.jpg','2026-10-09 04:04:06','2026-10-09 04:08:47',''),
('1791519374634','Lemineral','Retail',4000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791519374636-25.jpg','2026-10-09 04:16:14','2026-10-09 04:16:14',''),
('1791519968371','Teh Javana','Retail',4000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791519968373-369.jpg','2026-10-09 04:26:08','2026-10-09 04:26:08',''),
('1791520007521','Cimory Susu','Retail',8000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520007522-46.jpg','2026-10-09 04:26:47','2026-10-09 04:26:47',''),
('1791520066351','Frisian Flag  Full Cream','Retail',7500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520066352-849.jpg','2026-10-09 04:27:46','2026-10-09 04:27:46',''),
('1791520091550','Pulpy','Retail',7000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520091552-399.jpg','2026-10-09 04:28:11','2026-10-09 04:28:11',''),
('1791520126204','Cincau Hitam Cap Panda','Retail',8000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520126204-467.jpg','2026-10-09 04:28:46','2026-10-09 04:28:46',''),
('1791520153458','Kin Yogurt','Retail',4000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520153458-959.jpg','2026-10-09 04:29:13','2026-10-09 04:29:13',''),
('1791520187088','Larutan Cap Kaki Tiga','Retail',9000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520187090-49.jpg','2026-10-09 04:29:47','2026-10-09 04:29:47',''),
('1791520213843','Cimory Yogurt','Retail',6000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520213846-414.jpg','2026-10-09 04:30:13','2026-10-09 04:30:13',''),
('1791520247939','Nii Milk Tea','Retail',9000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520247941-749.jpg','2026-10-09 04:30:47','2026-10-09 04:30:47',''),
('1791520292545','Fruit Tea','Retail',4500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520292545-122.jpg','2026-10-09 04:31:32','2026-10-09 04:31:32',''),
('1791520322911','Milku','Retail',4000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520322912-648.jpg','2026-10-09 04:32:02','2026-10-09 04:32:02',''),
('1791520353042','Nipis Madu','Retail',5000,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520353042-572.png','2026-10-09 04:32:33','2026-10-09 04:32:33',''),
('1791520379560','Teh Pucuk Harum','Retail',4500,0,1,0,'auto',NULL,NULL,NULL,0,'coworking','/uploads/menus/menu-1791520379561-616.jpg','2026-10-09 04:32:59','2026-10-09 04:32:59','');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `menu_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ID menu dari external API teman (opsional)',
  `menu_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `item_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `note` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `price` int NOT NULL DEFAULT '0' COMMENT 'Snapshot harga satuan saat dibeli',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `preorder_item_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES
(57,'1790739779597','1790732889297','Nasi Ayam Goreng Bawang Putih','Nasi Ayam Goreng Bawang Putih',6,NULL,17000,'2026-09-30 03:42:59',NULL),
(58,'1790747802631','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',1,NULL,15000,'2026-09-30 05:56:42',NULL),
(59,'1790748010911','1790563222672','Nasi Ayam Ketumbar ','Nasi Ayam Ketumbar ',1,NULL,17000,'2026-09-30 06:00:10',NULL),
(60,'1790748010911','1790747916190','egg','egg',1,NULL,3000,'2026-09-30 06:00:10',NULL),
(62,'1790749941114','1790733077540','Es coklat ','Es coklat ',1,NULL,10000,'2026-09-30 06:32:21',NULL),
(63,'1790826383114','1790732636733','Nasi goreng Teri','Nasi goreng Teri',2,NULL,18000,'2026-10-01 03:46:23',NULL),
(64,'1790826383114','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',3,NULL,15000,'2026-10-01 03:46:23',NULL),
(65,'1790826409519','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',1,NULL,15000,'2026-10-01 03:46:49',NULL),
(66,'1790826409519','1790732988763','Es teh','Es teh',1,NULL,5000,'2026-10-01 03:46:49',NULL),
(67,'1790831282076','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',1,NULL,15000,'2026-10-01 05:08:02',NULL),
(69,'1790834163518','1790732636733','Nasi goreng Teri','Nasi goreng Teri',1,NULL,18000,'2026-10-01 05:56:03',NULL),
(70,'1790930026164','1790733077540','Es coklat ','Es coklat ',3,NULL,10000,'2026-10-02 08:33:46',NULL),
(71,'1790930090773','1790733077540','Es coklat ','Es coklat ',1,NULL,10000,'2026-10-02 08:34:50',NULL),
(72,'1790930090773','1790732988763','Es teh','Es teh',1,NULL,5000,'2026-10-02 08:34:50',NULL),
(73,'1790931686420','29','Nasi Ayam Goreng Ketumbar','Nasi Ayam Goreng Ketumbar',1,NULL,17000,'2026-10-02 09:01:26',NULL),
(74,'1790931708377','27','Nasi Goreng Telur','Nasi Goreng Telur',1,NULL,12000,'2026-10-02 09:01:48',NULL),
(75,'1791165952170','1790563222672','Nasi Ayam Ketumbar ','Nasi Ayam Ketumbar ',1,NULL,17000,'2026-10-05 02:05:52',NULL),
(76,'1791165952170','1790747916190','egg','egg',1,NULL,5000,'2026-10-05 02:05:52',NULL),
(77,'1791166582217','1791166530765','kentang omlete','kentang omlete',1,NULL,15000,'2026-10-05 02:16:22',NULL),
(78,'1791166612122','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',1,NULL,15000,'2026-10-05 02:16:52',NULL),
(79,'1791166639962','1790563222672','Nasi Ayam Ketumbar ','Nasi Ayam Ketumbar ',1,NULL,17000,'2026-10-05 02:17:19',NULL),
(80,'1791166639962','1791166373638','telor dadar','telor dadar',1,NULL,6000,'2026-10-05 02:17:19',NULL),
(81,'1791166831984','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',1,NULL,15000,'2026-10-05 02:20:31',NULL),
(82,'1791168606925','1790732636733','Nasi goreng Teri','Nasi goreng Teri',1,NULL,18000,'2026-10-05 02:50:06',NULL),
(83,'1791171222295','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',1,NULL,15000,'2026-10-05 03:33:42',NULL),
(84,'1791175270108','1790732636733','Nasi goreng Teri','Nasi goreng Teri',1,NULL,18000,'2026-10-05 04:41:10',NULL),
(85,'1791175325689','1790563222672','Nasi Ayam Ketumbar ','Nasi Ayam Ketumbar ',1,NULL,17000,'2026-10-05 04:42:05',NULL),
(86,'1791185032054','27','Nasi Goreng Telur','Nasi Goreng Telur',1,NULL,12000,'2026-10-05 07:23:52',NULL),
(87,'1791186341724','33','Nasi Ayam Goreng Bawang Putih','Nasi Ayam Goreng Bawang Putih',1,NULL,17000,'2026-10-05 07:45:41',NULL),
(88,'1791186341724','38','Es Teh','Es Teh',1,NULL,5000,'2026-10-05 07:45:41',NULL),
(89,'1791186992171','33','Nasi Ayam Goreng Bawang Putih','Nasi Ayam Goreng Bawang Putih',1,NULL,17000,'2026-10-05 07:56:32',NULL),
(90,'1791186992171','38','Es Teh','Es Teh',2,NULL,5000,'2026-10-05 07:56:32',NULL),
(91,'1791187060749','27','Nasi Goreng Telur','Nasi Goreng Telur',1,NULL,12000,'2026-10-05 07:57:40',NULL),
(92,'1791189017012','33','Nasi Ayam Goreng Bawang Putih','Nasi Ayam Goreng Bawang Putih',1,NULL,17000,'2026-10-05 08:30:17',NULL),
(93,'1791292601564','1791292326396','nasi bento katsu','nasi bento katsu',1,NULL,18000,'2026-10-06 13:16:41',NULL),
(94,'1791292601564','1791292258358','nasi bento shrimp roll','nasi bento shrimp roll',1,NULL,17000,'2026-10-06 13:16:41',NULL),
(95,'1791292601564','1791292066383','nasi goreng katsu ','nasi goreng katsu ',3,NULL,25000,'2026-10-06 13:16:41',NULL),
(96,'1791292601564','1790732889297','Nasi Ayam Goreng Bawang Putih','Nasi Ayam Goreng Bawang Putih',3,NULL,17000,'2026-10-06 13:16:41',NULL),
(97,'1791292601564','1790732636733','Nasi goreng Teri','Nasi goreng Teri',2,NULL,18000,'2026-10-06 13:16:41',NULL),
(98,'1791292601564','1791292040706','mie goreng ','mie goreng ',2,NULL,12000,'2026-10-06 13:16:41',NULL),
(99,'1791292601564','1790732988763','Es teh','Es teh',23,NULL,5000,'2026-10-06 13:16:41',NULL),
(100,'1791292601564','1790733077540','Es coklat ','Es coklat ',1,NULL,10000,'2026-10-06 13:16:41',NULL),
(101,'1791292601564','1790732769532','Indomie Tek Tek','Indomie Tek Tek',2,NULL,15000,'2026-10-06 13:16:41',NULL),
(102,'1791292601564','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',20,NULL,15000,'2026-10-06 13:16:41',NULL),
(103,'1791362710589','43','Indomie Goreng ','Indomie Goreng ',1,NULL,12000,'2026-10-07 08:45:10',NULL),
(106,'1791515979851','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',1,NULL,15000,'2026-10-09 03:19:39',NULL),
(107,'1791515979851','1790732889297','Nasi Ayam Goreng Bawang Putih','Nasi Ayam Goreng Bawang Putih',1,NULL,17000,'2026-10-09 03:19:39',NULL),
(108,'1791516022873','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',6,NULL,15000,'2026-10-09 03:20:22',NULL),
(109,'1791516022873','1790732889297','Nasi Ayam Goreng Bawang Putih','Nasi Ayam Goreng Bawang Putih',1,NULL,17000,'2026-10-09 03:20:22',NULL),
(110,'1791519402968','1791519374634','Lemineral','Lemineral',1,NULL,4000,'2026-10-09 04:16:42',NULL),
(111,'1791524305592','1790732988763','Es teh','Es teh',2,NULL,5000,'2026-10-09 05:38:25',NULL),
(112,'1791778825660','1790563222672','Nasi Ayam Ketumbar ','Nasi Ayam Ketumbar ',1,NULL,17000,'2026-10-12 04:20:25',NULL),
(113,'1791778825660','1791166373638','telor dadar','telor dadar',1,NULL,6000,'2026-10-12 04:20:25',NULL),
(114,'1791779324289','1790563222672','Nasi Ayam Ketumbar ','Nasi Ayam Ketumbar ',1,NULL,17000,'2026-10-12 04:28:44',NULL),
(115,'1791779324289','1791519374634','Lemineral','Lemineral',1,NULL,4000,'2026-10-12 04:28:44',NULL),
(116,'1791779879729','1791519374634','Lemineral','Lemineral',1,NULL,4000,'2026-10-12 04:37:59',NULL),
(117,'1791781232903','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',1,NULL,15000,'2026-10-12 05:00:32',NULL),
(118,'1791781232903','1790733030819','HOt tea','HOt tea',1,NULL,5000,'2026-10-12 05:00:32',NULL),
(119,'1791781276327','1790563222672','Nasi Ayam Ketumbar ','Nasi Ayam Ketumbar ',1,NULL,17000,'2026-10-12 05:01:16',NULL),
(120,'1791781276327','1790733030819','HOt tea','HOt tea',1,NULL,5000,'2026-10-12 05:01:16',NULL),
(121,'1791781370102','1790733030819','HOt tea','HOt tea',1,NULL,5000,'2026-10-12 05:02:50',NULL),
(122,'1791781370102','1790732889297','Nasi Ayam Goreng Bawang Putih','Nasi Ayam Goreng Bawang Putih',1,NULL,17000,'2026-10-12 05:02:50',NULL),
(123,'1791781402987','1790732769532','Indomie Tek Tek','Indomie Tek Tek',1,NULL,15000,'2026-10-12 05:03:23',NULL),
(124,'1791781402987','1790733030819','HOt tea','HOt tea',1,NULL,5000,'2026-10-12 05:03:23',NULL),
(125,'1791782891545','1791519374634','Lemineral','Lemineral',1,NULL,4000,'2026-10-12 05:28:11',NULL),
(126,'1791784999225','1791519374634','Lemineral','Lemineral',1,NULL,4000,'2026-10-12 06:03:19',NULL),
(127,'1791784999225','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',1,NULL,15000,'2026-10-12 06:03:19',NULL),
(128,'1791789009806','1791518392236','Pop Mie ','Pop Mie ',1,NULL,6500,'2026-10-12 07:10:09',NULL),
(129,'1791789026300','1791520379560','Teh Pucuk Harum','Teh Pucuk Harum',1,NULL,4500,'2026-10-12 07:10:26',NULL),
(130,'1791789135487','1791518392236','Pop Mie ','Pop Mie ',2,NULL,6500,'2026-10-12 07:12:15',NULL),
(131,'1791855586816','1790560348054','Nasi Goreng Telor','Nasi Goreng Telor',1,NULL,15000,'2026-10-13 01:39:46',NULL),
(132,'1791868718305','1790732636733','Nasi goreng Teri','Nasi goreng Teri',1,NULL,18000,'2026-10-13 05:18:38',NULL);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `destination_label` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'NULL jika tamu/offline',
  `customer_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `customer_phone` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `invoice_number` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `total_price` int NOT NULL DEFAULT '0',
  `status` varchar(30) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Menunggu',
  `payment_status` enum('belum_bayar','pending_verifikasi','lunas','ditolak') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'belum_bayar',
  `payment_method` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_proof_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_proof_uploaded_at` datetime DEFAULT NULL,
  `external_id` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'ID dari payment gateway atau resi',
  `source` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ngolab' COMMENT 'Sumber pesanan: ngolab, coworking, smart_tag_qr',
  `external_api_client_id` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `outlet` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ngolab',
  `amount_paid` int NOT NULL DEFAULT '0',
  `change_amount` int NOT NULL DEFAULT '0',
  `order_type` varchar(30) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'regular',
  `preorder_campaign_id` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_timing` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fulfillment_at` datetime DEFAULT NULL,
  `preorder_status` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `picked_up_at` datetime DEFAULT NULL,
  `payment_proof` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Path file bukti transfer',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_orders_payment_proof_url` (`payment_proof_url`),
  KEY `idx_orders_payment_proof` (`payment_proof`),
  KEY `idx_orders_external_api_client` (`external_api_client_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES
('1790739779597',NULL,NULL,'50-01',NULL,'INV-165',102000,'selesai','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',102000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-09-30 03:42:59','2026-10-01 04:29:48'),
('1790747802631',NULL,NULL,'nadine',NULL,'INV-726',15000,'selesai','belum_bayar','Tunai',NULL,NULL,'MANUAL','manual',NULL,'coworking',0,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-09-30 05:56:42','2026-10-01 04:29:52'),
('1790748010911',NULL,NULL,'pa yusuf',NULL,'INV-078',20000,'selesai','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',20000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-09-30 06:00:10','2026-10-01 04:29:55'),
('1790749941114',NULL,NULL,'fahmi',NULL,'INV-001',10000,'selesai','lunas','Tunai',NULL,NULL,'MANUAL','manual',NULL,'coworking',10000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-09-30 06:32:21','2026-10-01 04:29:59'),
('1790826383114',NULL,NULL,'yy',NULL,'INV-872',81000,'selesai','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',81000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-01 03:46:23','2026-10-01 06:01:47'),
('1790826409519',NULL,NULL,'yo',NULL,'INV-190',20000,'selesai','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',20000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-01 03:46:49','2026-10-01 04:30:03'),
('1790831282076',NULL,NULL,'AMEL',NULL,'INV-346',15000,'selesai','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',15000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-01 05:08:02','2026-10-01 05:09:16'),
('1790834163518',NULL,NULL,'TEMEN NANDA',NULL,'INV-059',18000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',18000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-01 05:56:03','2026-10-02 08:36:22'),
('1790930026164',NULL,NULL,'alif',NULL,'INV-068',30000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',30000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-02 08:33:46','2026-10-02 08:36:20'),
('1790930090773',NULL,NULL,'cristin',NULL,'INV-210',15000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',15000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-02 08:34:50','2026-10-02 08:36:12'),
('1790931686420',NULL,NULL,'arika',NULL,'INV-879',17000,'selesai','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'ngolab',17000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-02 09:01:26','2026-10-13 08:36:50'),
('1790931708377',NULL,NULL,'arika',NULL,'INV-580',12000,'selesai','lunas','Tunai',NULL,NULL,'MANUAL','manual',NULL,'ngolab',12000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-02 09:01:48','2026-10-13 08:36:51'),
('1791165952170',NULL,NULL,'pa yusuf',NULL,'INV-520',22000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',22000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 02:05:52','2026-10-06 02:51:47'),
('1791166582217',NULL,NULL,'amany',NULL,'INV-655',15000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',15000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 02:16:22','2026-10-06 02:51:45'),
('1791166612122',NULL,NULL,'Nadine',NULL,'INV-613',15000,'menunggu','belum_bayar','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',0,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 02:16:52','2026-10-06 02:52:15'),
('1791166639962',NULL,NULL,'pa yusuf',NULL,'INV-519',23000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',23000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 02:17:19','2026-10-06 02:51:41'),
('1791166831984',NULL,NULL,'hapis',NULL,'INV-615',15000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',15000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 02:20:31','2026-10-06 02:51:38'),
('1791168606925',NULL,NULL,'rianti',NULL,'INV-560',18000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',18000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 02:50:06','2026-10-06 02:51:36'),
('1791171222295',NULL,NULL,'dyan',NULL,'INV-178',15000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',15000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 03:33:42','2026-10-05 03:52:48'),
('1791175270108',NULL,NULL,'sena',NULL,'INV-970',18000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',18000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 04:41:10','2026-10-06 02:51:34'),
('1791175325689',NULL,NULL,'b maul',NULL,'INV-111',17000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',17000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 04:42:05','2026-10-06 02:51:32'),
('1791185032054',NULL,NULL,'Danu',NULL,'INV-980',12000,'selesai','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'ngolab',12000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 07:23:52','2026-10-13 08:36:52'),
('1791186341724',NULL,NULL,'Gins',NULL,'INV-571',22000,'selesai','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'ngolab',22000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 07:45:41','2026-10-13 08:36:53'),
('1791186992171',NULL,NULL,'farrel',NULL,'INV-369',27000,'selesai','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'ngolab',27000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 07:56:32','2026-10-13 08:36:54'),
('1791187060749',NULL,NULL,'azra',NULL,'INV-224',12000,'selesai','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'ngolab',12000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 07:57:40','2026-10-13 08:36:55'),
('1791189017012',NULL,NULL,'nazira',NULL,'INV-682',17000,'selesai','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'ngolab',17000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-05 08:30:17','2026-10-13 08:36:55'),
('1791292601564',NULL,NULL,'Panitia OCL',NULL,'INV-027',676000,'menunggu','lunas','Tunai',NULL,NULL,'MANUAL','manual',NULL,'coworking',676000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-06 13:16:41','2026-10-06 13:50:34'),
('1791362710589',NULL,NULL,'bayu',NULL,'INV-884',12000,'selesai','belum_bayar','QRIS',NULL,NULL,'MANUAL','manual',NULL,'ngolab',0,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-07 08:45:10','2026-10-13 08:36:57'),
('1791515979851',NULL,NULL,'mkkm',NULL,'INV-272',32000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',32000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-09 03:19:39','2026-10-09 03:19:39'),
('1791516022873',NULL,NULL,'cvbnj',NULL,'INV-748',107000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',107000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-09 03:20:22','2026-10-09 03:20:22'),
('1791519402968',NULL,NULL,'asdf',NULL,'INV-700',4000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',4000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-09 04:16:42','2026-10-09 04:16:42'),
('1791524305592',NULL,NULL,'hana',NULL,'INV-346',10000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',10000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-09 05:38:25','2026-10-09 05:38:25'),
('1791778825660',NULL,NULL,'Pa yusuf',NULL,'INV-955',23000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',23000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 04:20:25','2026-10-12 04:20:25'),
('1791779324289',NULL,NULL,'Sena',NULL,'INV-993',21000,'menunggu','belum_bayar','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',0,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 04:28:44','2026-10-12 04:28:44'),
('1791779879729',NULL,NULL,'Oo',NULL,'INV-921',4000,'menunggu','belum_bayar','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',0,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 04:37:59','2026-10-12 04:37:59'),
('1791781232903',NULL,NULL,'Lara',NULL,'INV-801',20000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',20000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 05:00:32','2026-10-12 05:00:32'),
('1791781276327',NULL,NULL,'Lara',NULL,'INV-657',22000,'menunggu','belum_bayar','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',0,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 05:01:16','2026-10-12 05:01:16'),
('1791781370102',NULL,NULL,'Rre',NULL,'INV-203',22000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',22000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 05:02:50','2026-10-12 05:02:50'),
('1791781402987',NULL,NULL,'Rre',NULL,'INV-582',20000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',20000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 05:03:23','2026-10-12 05:03:23'),
('1791782891545',NULL,NULL,'lm',NULL,'INV-560',4000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',4000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 05:28:11','2026-10-12 05:28:11'),
('1791784999225',NULL,NULL,'Krombok',NULL,'INV-108',19000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',19000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 06:03:19','2026-10-12 06:03:19'),
('1791789009806',NULL,NULL,'Amni',NULL,'INV-190',6500,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',6500,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 07:10:09','2026-10-12 07:10:09'),
('1791789026300',NULL,NULL,'Hvj',NULL,'INV-915',4500,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',4500,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 07:10:26','2026-10-12 07:10:26'),
('1791789135487',NULL,NULL,'Yuuy',NULL,'INV-538',13000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',13000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-12 07:12:15','2026-10-12 07:12:15'),
('1791855586816',NULL,NULL,'Pak Yusuf',NULL,'INV-705',15000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',15000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-13 01:39:46','2026-10-13 01:39:46'),
('1791868718305',NULL,NULL,'Pa arwin',NULL,'INV-825',18000,'menunggu','lunas','QRIS',NULL,NULL,'MANUAL','manual',NULL,'coworking',18000,0,'regular',NULL,NULL,NULL,NULL,NULL,NULL,'2026-10-13 05:18:38','2026-10-13 05:18:38');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patungan_contributions`
--

DROP TABLE IF EXISTS `patungan_contributions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `patungan_contributions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `amount` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `patungan_contributions_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `patungan_rooms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `patungan_contributions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patungan_contributions`
--

LOCK TABLES `patungan_contributions` WRITE;
/*!40000 ALTER TABLE `patungan_contributions` DISABLE KEYS */;
INSERT INTO `patungan_contributions` VALUES
(1,'room-1','u-1781625191785',20,'2026-06-16 15:53:11');
/*!40000 ALTER TABLE `patungan_contributions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patungan_rooms`
--

DROP TABLE IF EXISTS `patungan_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `patungan_rooms` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `target_amount` int NOT NULL,
  `current_amount` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patungan_rooms`
--

LOCK TABLES `patungan_rooms` WRITE;
/*!40000 ALTER TABLE `patungan_rooms` DISABLE KEYS */;
INSERT INTO `patungan_rooms` VALUES
('room-1','Patungan Buku Perpustakaan Baru',50000,20,'2026-06-16 15:51:14'),
('room-2','Sumbangan Wi-Fi Coworking Space',100000,0,'2026-06-16 15:51:14'),
('room-3','Donasi Event Himpunan Mahasiswa',150000,0,'2026-06-16 15:51:14');
/*!40000 ALTER TABLE `patungan_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist_items`
--

DROP TABLE IF EXISTS `playlist_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `playlist_id` int NOT NULL,
  `media_id` int NOT NULL,
  `order_index` int NOT NULL DEFAULT '0',
  `duration_override` int DEFAULT NULL COMMENT 'NULL = pakai durasi dari media_files',
  `transition` enum('fade','slide','zoom','none') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'fade',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `playlist_id` (`playlist_id`),
  KEY `media_id` (`media_id`),
  CONSTRAINT `playlist_items_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE,
  CONSTRAINT `playlist_items_ibfk_2` FOREIGN KEY (`media_id`) REFERENCES `media_files` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist_items`
--

LOCK TABLES `playlist_items` WRITE;
/*!40000 ALTER TABLE `playlist_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlist_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlists`
--

DROP TABLE IF EXISTS `playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `is_default` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 = diputar saat idle jika tidak ada jadwal',
  `loop_mode` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 = putar ulang terus',
  `total_duration` int NOT NULL DEFAULT '0' COMMENT 'Total durasi semua item (detik)',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlists`
--

LOCK TABLES `playlists` WRITE;
/*!40000 ALTER TABLE `playlists` DISABLE KEYS */;
INSERT INTO `playlists` VALUES
(1,'Playlist Promosi Utama','Playlist default saat layar idle',1,1,0,1,'2026-05-14 19:54:04','2026-05-14 19:54:04');
/*!40000 ALTER TABLE `playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preorder_campaigns`
--

DROP TABLE IF EXISTS `preorder_campaigns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `preorder_campaigns` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `outlet` enum('ngolab','coworking') COLLATE utf8mb4_general_ci NOT NULL,
  `order_start_at` datetime NOT NULL,
  `order_deadline_at` datetime NOT NULL,
  `service_at` datetime NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `kds_released_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_preorder_window` (`outlet`,`is_active`,`order_start_at`,`order_deadline_at`),
  KEY `idx_preorder_service` (`service_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preorder_campaigns`
--

LOCK TABLES `preorder_campaigns` WRITE;
/*!40000 ALTER TABLE `preorder_campaigns` DISABLE KEYS */;
INSERT INTO `preorder_campaigns` VALUES
('90bee6ac-560c-4557-bbb4-0340a56a725a','TEST','DDMFDFDF','ngolab','2026-09-10 15:05:00','2026-09-19 15:08:00','2026-09-25 13:04:00',1,NULL,'2026-09-10 08:06:08','2026-09-10 08:06:08');
/*!40000 ALTER TABLE `preorder_campaigns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preorder_items`
--

DROP TABLE IF EXISTS `preorder_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `preorder_items` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `campaign_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PO',
  `price` int NOT NULL,
  `quota_total` int NOT NULL,
  `quota_sold` int NOT NULL DEFAULT '0',
  `image_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_preorder_items_campaign` (`campaign_id`,`is_active`),
  CONSTRAINT `fk_preorder_items_campaign` FOREIGN KEY (`campaign_id`) REFERENCES `preorder_campaigns` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preorder_items`
--

LOCK TABLES `preorder_items` WRITE;
/*!40000 ALTER TABLE `preorder_items` DISABLE KEYS */;
INSERT INTO `preorder_items` VALUES
('407e9cbc-8cc1-4cd9-a250-957d232f55d9','90bee6ac-560c-4557-bbb4-0340a56a725a','Mie Dok Dok','PO',17000,30,0,'/uploads/preorders/preorder-51e5f9f6-893d-41a9-9e23-ad27508bdea5.png','',1,'2026-09-10 08:06:08','2026-09-10 08:06:08');
/*!40000 ALTER TABLE `preorder_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_ingredients`
--

DROP TABLE IF EXISTS `recipe_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_ingredients` (
  `menu_name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `outlet` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'ngolab',
  `ingredient_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  PRIMARY KEY (`menu_name`,`outlet`,`ingredient_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_ingredients`
--

LOCK TABLES `recipe_ingredients` WRITE;
/*!40000 ALTER TABLE `recipe_ingredients` DISABLE KEYS */;
INSERT INTO `recipe_ingredients` VALUES
('Bakso Malang Komplit Ibu Sri','ngolab','ing-1',0.50),
('Bakso Malang Komplit Ibu Sri','ngolab','ing-3',3.00),
('Bakso Malang Komplit Ibu Sri','ngolab','ing-5',2.00),
('Bakso Malang Komplit Ibu Sri','ngolab','ing-6',1.00),
('Bakso Malang Komplit Ibu Sri','ngolab','ing-8',30.00),
('Batagor Ikan Bandung','ngolab','ing-5',2.00),
('Batagor Ikan Bandung','ngolab','ing-6',3.00),
('Mie Bakso Urat Super','ngolab','ing-1',1.00),
('Mie Bakso Urat Super','ngolab','ing-3',2.00),
('Mie Bakso Urat Super','ngolab','ing-4',1.00),
('Mie Bakso Urat Super','ngolab','ing-7',1.00),
('Mie Bakso Urat Super','ngolab','ing-8',40.00),
('Mie Yamin Spesial Ayam','ngolab','ing-1',1.00),
('Mie Yamin Spesial Ayam','ngolab','ing-2',1.00),
('Mie Yamin Spesial Ayam','ngolab','ing-7',1.00),
('Mie Yamin Spesial Ayam','ngolab','ing-8',50.00),
('Nasi Ayam Geprek Level 3','ngolab','ing-8',20.00),
('Siomay Bandung Asli','ngolab','ing-6',5.00);
/*!40000 ALTER TABLE `recipe_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `playlist_id` int NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `days_of_week` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]' COMMENT 'JSON array hari berlaku',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `priority` int NOT NULL DEFAULT '1' COMMENT 'Lebih tinggi = menang konflik',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `playlist_id` (`playlist_id`),
  CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screen_playlists`
--

DROP TABLE IF EXISTS `screen_playlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `screen_playlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `screen_id` int NOT NULL,
  `playlist_id` int NOT NULL,
  `schedule_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `screen_id` (`screen_id`),
  KEY `playlist_id` (`playlist_id`),
  KEY `schedule_id` (`schedule_id`),
  CONSTRAINT `screen_playlists_ibfk_1` FOREIGN KEY (`screen_id`) REFERENCES `digital_screens` (`id`) ON DELETE CASCADE,
  CONSTRAINT `screen_playlists_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE,
  CONSTRAINT `screen_playlists_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screen_playlists`
--

LOCK TABLES `screen_playlists` WRITE;
/*!40000 ALTER TABLE `screen_playlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `screen_playlists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shifts`
--

DROP TABLE IF EXISTS `shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `shifts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `staff_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `shift_type` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `time` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `staff_id` (`staff_id`),
  CONSTRAINT `shifts_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shifts`
--

LOCK TABLES `shifts` WRITE;
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('Super Admin','Admin','Kasir','Koki','Support') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Kasir',
  `email` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password_plain` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES
('S001','Admin Tangolab','Super Admin','admin@gmail.com','08111111','$2b$12$FNEjfNNBsKhw6h2nd36jAu31u1LC0ZgyxesVjYNtdRrgcx9G2c0gC',NULL,'active','2026-06-05 10:55:54','2026-08-31 01:36:10'),
('S002','Kasir Tangolab','Kasir','kasir@gmail.com','08222222','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',NULL,'active','2026-06-05 10:55:54','2026-06-05 10:55:54'),
('S003','Koki Tangolab','Koki','koki@gmail.com','08333333','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',NULL,'active','2026-06-05 10:55:54','2026-06-05 10:55:54'),
('S010','budski','Koki','budski@gmail.com','0894324244','$2b$12$Fs.2l4ZBKWylJyiL9CNAKu60YWRI5hDg3GPpWq56MysxTrxHWvxW2','12345678','active','2026-09-22 05:30:09','2026-09-22 05:30:09'),
('S484','arap','Kasir','arap@gmail.com','0987654','$2b$12$66YnKxvyWadhrepoMEJHB.TYIrSFIZEUMLDUqr7cwRyIUrMtQFfxa','asdfghjkl;\'','active','2026-09-29 09:23:18','2026-09-29 09:23:18'),
('S928-9173','Mas\'ud','Super Admin','mibnuz170221@gmail.com','085179834825','$2b$12$Dxwu8/Qv0SGCtwOVYMsWs.1lFPEksm0kuTkXqazlEY8i2rbiaSqZe',NULL,'active','2026-09-22 04:24:09','2026-10-12 01:35:54'),
('S981','Fahreza','Kasir','fahreza@gmail.com','083297439','$2b$12$5khZGDEzaX5c0VJVeWNltOxvVzDeafopWMwXK0csxPnCp52hRIvAO','asdfghjkl;\'','active','2026-09-30 01:28:26','2026-09-30 01:28:26');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_sessions`
--

DROP TABLE IF EXISTS `study_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `study_sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `subject` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `duration_minutes` int NOT NULL,
  `points_earned` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `study_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_sessions`
--

LOCK TABLES `study_sessions` WRITE;
/*!40000 ALTER TABLE `study_sessions` DISABLE KEYS */;
INSERT INTO `study_sessions` VALUES
(1,'u-1781625191785','Kalkulus II',90,45,'2026-06-16 15:53:11');
/*!40000 ALTER TABLE `study_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_vouchers`
--

DROP TABLE IF EXISTS `user_vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_vouchers` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `promo_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `voucher_code` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('unused','used') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'unused',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `voucher_code` (`voucher_code`),
  KEY `user_id` (`user_id`),
  KEY `promo_id` (`promo_id`),
  CONSTRAINT `user_vouchers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_vouchers_ibfk_2` FOREIGN KEY (`promo_id`) REFERENCES `coin_promos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_vouchers`
--

LOCK TABLES `user_vouchers` WRITE;
/*!40000 ALTER TABLE `user_vouchers` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `nama` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `nim` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `coin_balance` int NOT NULL DEFAULT '0',
  `avatar_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rfid_tag_id` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(50) COLLATE utf8mb4_general_ci DEFAULT 'Pelanggan',
  `password_hash` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password_plain` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rfid_tag_id` (`rfid_tag_id`),
  UNIQUE KEY `uniq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('607012400054','ahmad husen','607012400054',400,'https://picsum.photos/seed/607012400054/100/100','2026-06-01 16:05:13','2026-06-01 16:06:01',NULL,NULL,NULL,'Pelanggan',NULL,NULL),
('7049509454','ahamd','7049509454',130,'https://picsum.photos/seed/7049509454/100/100','2026-06-17 11:59:13','2026-09-11 09:09:03',NULL,'ahmad@gmail.com','584837432','Pelanggan','ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f',NULL),
('u-1781625191785','Bagus Mahasiswa','081234567890',125,'https://picsum.photos/seed/u-1781625191785/100/100','2026-06-16 15:53:11','2026-06-16 15:53:11',NULL,NULL,'081234567890','Pelanggan',NULL,NULL),
('u-1791478820035','kiki','kiki',100,'https://picsum.photos/seed/u-1791478820035/100/100','2026-10-08 17:00:20','2026-10-08 17:00:20',NULL,'kiki@gmail.com','kiki','Pelanggan','$2b$12$wH/Hc6ThuBLTdBHvMADv9uqpFIHT.EmPY0w169c4X8Uch4Zmp42fq','kiki'),
('u-1791726218402','Nothing To See Here','nothing5758',100,'https://picsum.photos/seed/u-1791726218402/100/100','2026-10-11 13:43:38','2026-10-11 13:43:38',NULL,'nothing5758@gmail.com','nothing5758','Pelanggan','$2b$12$oBK2OC3pS7gjsRvfbY6GEuzFM8300P3G.u7BOnG02ZaZ5H5Ju3rdC','123'),
('u-1791740416465','Uji Integrasi Hermes','089900011122',100,'https://picsum.photos/seed/u-1791740416465/100/100','2026-10-11 17:40:16','2026-10-11 17:40:16',NULL,'uji.integrasi.hermes@contoh.test','089900011122','Pelanggan','$2b$12$7f3iMB12O0hoC51v0TnmbufCjA2JiI/QFIhcQMbqjNBYIbd8MTODy','UjiIntegrasi#2026'),
('user-1780648444622','Ahmad Fauzi Fore Test','NIM-771',1600,'https://picsum.photos/seed/user-1780648444622/100/100','2026-06-05 08:34:04','2026-08-31 02:18:12',NULL,NULL,NULL,'Pelanggan',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-13 15:40:42
