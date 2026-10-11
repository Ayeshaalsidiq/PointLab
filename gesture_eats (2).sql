-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Okt 2026 pada 16.05
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gesture_eats`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `api_keys`
--

CREATE TABLE `api_keys` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `key_prefix` varchar(32) NOT NULL,
  `key_hash` char(64) NOT NULL,
  `scopes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`scopes`)),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_used_at` datetime DEFAULT NULL,
  `revoked_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `app_settings`
--

CREATE TABLE `app_settings` (
  `key` varchar(100) NOT NULL,
  `value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `app_settings`
--

INSERT INTO `app_settings` (`key`, `value`) VALUES
('active_zone', '60'),
('brand_logo_url', '/uploads/brand/logo-1780674481356.jpeg'),
('brand_name', 'ngolab'),
('brand_subtitle', 'Gesture-Eats'),
('coin_reward_rate', '0.001'),
('dwell_time', '1.5'),
('kds_new_order_sound_url', '/uploads/sounds/kds-new_order-ce5f25c3-763d-4a27-b2e3-9e3fd0814223.mp3'),
('kds_ready_sound_url', '/uploads/sounds/kds-ready-685321cc-a2b0-4e6e-80b1-c1b36d5d109c.mp3'),
('kds_sound_enabled', '1'),
('kds_sound_volume', '100'),
('kiosk_idle_timeout', '60'),
('kiosk_mode', 'gesture'),
('maintenance_mode', '0'),
('receipt_footer', 'Terima kasih atas kunjungan Anda!'),
('sidebar_active_bg_color', '#4f1c31'),
('sidebar_active_text_color', '#dd3131'),
('sidebar_bg_color', '#0f172a'),
('sidebar_border_color', '#ff0569'),
('sidebar_hover_bg_color', '#1e293b'),
('sidebar_hover_text_color', '#f0dc05'),
('sidebar_logo_text_color', '#d71414'),
('sidebar_section_text_color', '#fb04ad'),
('sidebar_text_color', '#ffffff'),
('theme_color', '#f97316'),
('theme_mode', 'light');

-- --------------------------------------------------------

--
-- Struktur dari tabel `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` int(11) NOT NULL,
  `user` varchar(100) NOT NULL,
  `action` varchar(100) NOT NULL,
  `target` varchar(255) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('success','warning','info') NOT NULL DEFAULT 'success',
  `ip` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `audit_logs`
--

INSERT INTO `audit_logs` (`id`, `user`, `action`, `target`, `timestamp`, `status`, `ip`) VALUES
(1, 'Admin Tangolab', 'Penetapan Shift', 'Fahreza Azhar (Pagi)', '2026-06-05 15:08:04', 'success', '192.168.1.10'),
(2, 'Admin Tangolab', 'Penetapan Shift', 'fahreza  (Full Day)', '2026-06-05 15:17:15', 'success', '192.168.1.10'),
(3, 'Koki', 'Tambah Menu Baru', 'Nasi goreng Gila (coworking)', '2026-06-05 15:28:44', 'success', '192.168.1.10'),
(4, 'fahreza', 'Ubah Status Bayar', 'INV-897 (lunas)', '2026-06-05 15:31:48', 'success', '192.168.1.10'),
(5, 'fahreza', 'Ubah Status Bayar', 'INV-897 (belum_bayar)', '2026-06-05 15:40:03', 'success', '192.168.1.10'),
(6, 'fahreza', 'Ubah Status Bayar', 'INV-897 (lunas)', '2026-06-05 15:40:06', 'success', '192.168.1.10'),
(7, 'fahreza', 'Upload Logo Brand', 'Logo diperbarui: /uploads/brand/logo-1780674481356.jpeg', '2026-06-05 15:48:01', 'success', '192.168.1.10'),
(8, 'fahreza', 'Update Pengaturan Aplikasi', 'Konfigurasi diperbarui: brand_name, brand_subtitle, brand_logo_url, theme_color, receipt_footer, active_zone, dwell_time, kiosk_idle_timeout, kiosk_mode, maintenance_mode', '2026-06-05 15:48:01', 'success', '192.168.1.10'),
(9, 'fahreza', 'Update Pengaturan Aplikasi', 'Konfigurasi diperbarui: brand_name, brand_subtitle, brand_logo_url, theme_color, receipt_footer, active_zone, dwell_time, kiosk_idle_timeout, kiosk_mode, maintenance_mode', '2026-06-05 15:48:08', 'success', '192.168.1.10'),
(10, 'fahreza', 'Update Pengaturan Aplikasi', 'Konfigurasi diperbarui: brand_name, brand_subtitle, brand_logo_url, theme_color, receipt_footer, active_zone, dwell_time, kiosk_idle_timeout, kiosk_mode, maintenance_mode', '2026-06-05 15:52:58', 'success', '192.168.1.10'),
(11, 'fahreza', 'Update Pengaturan Aplikasi', 'Konfigurasi diperbarui: brand_name, brand_subtitle, brand_logo_url, theme_color, receipt_footer, active_zone, dwell_time, kiosk_idle_timeout, kiosk_mode, maintenance_mode', '2026-06-05 15:53:05', 'success', '192.168.1.10'),
(12, 'fahreza', 'Update Pengaturan Aplikasi', 'Konfigurasi diperbarui: brand_name, brand_subtitle, brand_logo_url, theme_color, receipt_footer, active_zone, dwell_time, kiosk_idle_timeout, kiosk_mode, maintenance_mode, sidebar_bg_color, sidebar_text_color, sidebar_active_bg_color, sidebar_active_text_', '2026-06-05 16:02:24', 'success', '192.168.1.10'),
(13, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-687 (v)', '2026-06-05 16:34:01', 'success', '192.168.1.10'),
(14, 'Admin Tangolab', 'Update Status Pesanan', 'INV-897 (siap)', '2026-06-05 16:40:25', 'success', '192.168.1.10'),
(15, 'Admin Tangolab', 'Update Status Pesanan', 'INV-687 (siap)', '2026-06-05 16:40:26', 'success', '192.168.1.10'),
(16, 'Admin Tangolab', 'Update Status Pesanan', 'INV-897 (selesai)', '2026-06-05 16:40:28', 'success', '192.168.1.10'),
(17, 'Admin Tangolab', 'Update Status Pesanan', 'INV-687 (selesai)', '2026-06-05 16:40:29', 'success', '192.168.1.10'),
(18, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-630 (m)', '2026-06-05 16:40:46', 'success', '192.168.1.10'),
(19, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-630 (lunas)', '2026-06-05 16:41:03', 'success', '192.168.1.10'),
(20, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-769 (gd)', '2026-06-05 16:43:57', 'success', '192.168.1.10'),
(21, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-946 (r)', '2026-06-05 16:45:45', 'success', '192.168.1.10'),
(22, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-946 (lunas)', '2026-06-05 16:46:04', 'success', '192.168.1.10'),
(23, 'Admin Tangolab', 'Update Status Pesanan', 'INV-630 (siap)', '2026-06-05 16:46:08', 'success', '192.168.1.10'),
(24, 'Admin Tangolab', 'Update Status Pesanan', 'INV-630 (selesai)', '2026-06-05 16:46:09', 'success', '192.168.1.10'),
(25, 'Admin Tangolab', 'Update Status Pesanan', 'INV-946 (sedang_diproses)', '2026-06-05 16:50:06', 'success', '192.168.1.10'),
(26, 'Admin Tangolab', 'Update Status Pesanan', 'INV-946 (siap)', '2026-06-05 16:50:10', 'success', '192.168.1.10'),
(27, 'Admin Tangolab', 'Update Status Pesanan', 'INV-946 (selesai)', '2026-06-05 16:50:13', 'success', '192.168.1.10'),
(28, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-951 (m)', '2026-06-05 16:50:26', 'success', '192.168.1.10'),
(29, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-769 (lunas)', '2026-06-05 16:50:30', 'success', '192.168.1.10'),
(30, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-951 (lunas)', '2026-06-05 16:50:31', 'success', '192.168.1.10'),
(31, 'Admin Tangolab', 'Update Status Pesanan', 'INV-769 (sedang_diproses)', '2026-06-05 16:50:43', 'success', '192.168.1.10'),
(32, 'Admin Tangolab', 'Update Status Pesanan', 'INV-769 (siap)', '2026-06-05 16:50:51', 'success', '192.168.1.10'),
(33, 'Admin Tangolab', 'Update Status Pesanan', 'INV-769 (selesai)', '2026-06-05 17:25:40', 'success', '192.168.1.10'),
(34, 'Admin Tangolab', 'Update Status Pesanan', 'INV-951 (sedang_diproses)', '2026-06-05 17:25:48', 'success', '192.168.1.10'),
(35, 'Admin Tangolab', 'Update Status Pesanan', 'INV-951 (siap)', '2026-06-05 17:25:58', 'success', '192.168.1.10'),
(36, 'Admin Tangolab', 'Update Status Pesanan', 'INV-951 (selesai)', '2026-06-05 17:26:00', 'success', '192.168.1.10'),
(37, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-055 (gf)', '2026-06-05 17:26:11', 'success', '192.168.1.10'),
(38, 'Admin Tangolab', 'Update Status Pesanan', 'INV-055 (sedang_diproses)', '2026-06-05 17:26:23', 'success', '192.168.1.10'),
(39, 'Admin Tangolab', 'Update Status Pesanan', 'INV-055 (siap)', '2026-06-05 17:26:26', 'success', '192.168.1.10'),
(40, 'Admin Tangolab', 'Update Status Pesanan', 'INV-055 (selesai)', '2026-06-05 17:26:27', 'success', '192.168.1.10'),
(41, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-031 (b)', '2026-06-05 17:26:54', 'success', '192.168.1.10'),
(42, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-031 (lunas)', '2026-06-05 17:26:57', 'success', '192.168.1.10'),
(43, 'Admin Tangolab', 'Update Status Pesanan', 'INV-031 (sedang_diproses)', '2026-06-05 17:27:03', 'success', '192.168.1.10'),
(44, 'Admin Tangolab', 'Update Status Pesanan', 'INV-031 (siap)', '2026-06-05 17:27:12', 'success', '192.168.1.10'),
(45, 'Admin Tangolab', 'Update Status Pesanan', 'INV-031 (selesai)', '2026-06-05 17:27:15', 'success', '192.168.1.10'),
(46, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-031 (belum_bayar)', '2026-06-05 17:27:20', 'success', '192.168.1.10'),
(47, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-031 (lunas)', '2026-06-05 17:27:22', 'success', '192.168.1.10'),
(48, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-031 (belum_bayar)', '2026-06-05 17:27:23', 'success', '192.168.1.10'),
(49, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-031 (lunas)', '2026-06-05 17:27:23', 'success', '192.168.1.10'),
(50, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-031 (belum_bayar)', '2026-06-05 17:27:24', 'success', '192.168.1.10'),
(51, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-031 (lunas)', '2026-06-05 17:27:24', 'success', '192.168.1.10'),
(52, 'Admin Tangolab', 'Update Status Pesanan', 'INV-031 (sedang_diproses)', '2026-06-05 17:27:27', 'success', '192.168.1.10'),
(53, 'Admin Tangolab', 'Update Status Pesanan', 'INV-031 (siap)', '2026-06-05 17:27:28', 'success', '192.168.1.10'),
(54, 'Admin Tangolab', 'Update Status Pesanan', 'INV-031 (selesai)', '2026-06-05 17:27:29', 'success', '192.168.1.10'),
(55, 'Admin Tangolab', 'Ubah Status Bayar', 'KIOSK-1780939659417 (belum_bayar)', '2026-06-08 17:31:14', 'success', '192.168.1.10'),
(56, 'Admin Tangolab', 'Update Status Pesanan', 'KIOSK-1780947855560 (siap)', '2026-06-14 15:14:01', 'success', '192.168.1.10'),
(57, 'Admin Tangolab', 'Update Status Pesanan', 'KIOSK-1780948186057 (siap)', '2026-06-14 15:14:05', 'success', '192.168.1.10'),
(58, 'Admin Tangolab', 'Update Status Pesanan', 'KIOSK-1780947855560 (selesai)', '2026-06-14 15:14:07', 'success', '192.168.1.10'),
(59, 'Admin Tangolab', 'Update Status Pesanan', 'KIOSK-1780948186057 (selesai)', '2026-06-14 15:14:14', 'success', '192.168.1.10'),
(60, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-395 (nn)', '2026-06-14 15:14:30', 'success', '192.168.1.10'),
(61, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:14:36', 'success', '192.168.1.10'),
(62, 'Admin Tangolab', 'Ubah Status Bayar', 'KIOSK-1780939659417 (lunas)', '2026-06-14 15:14:57', 'success', '192.168.1.10'),
(63, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:18:58', 'success', '192.168.1.10'),
(64, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:19:00', 'success', '192.168.1.10'),
(65, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:19:20', 'success', '192.168.1.10'),
(66, 'Admin Tangolab', 'Ubah Status Bayar', 'KIOSK-1780939659417 (belum_bayar)', '2026-06-14 15:19:46', 'success', '192.168.1.10'),
(67, 'Admin Tangolab', 'Ubah Status Bayar', 'KIOSK-1780939659417 (lunas)', '2026-06-14 15:19:46', 'success', '192.168.1.10'),
(68, 'Admin Tangolab', 'Ubah Status Bayar', 'KIOSK-1780939659417 (belum_bayar)', '2026-06-14 15:19:47', 'success', '192.168.1.10'),
(69, 'Admin Tangolab', 'Ubah Status Bayar', 'KIOSK-1780939659417 (lunas)', '2026-06-14 15:19:48', 'success', '192.168.1.10'),
(70, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:23:09', 'success', '192.168.1.10'),
(71, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:23:32', 'success', '192.168.1.10'),
(72, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:23:38', 'success', '192.168.1.10'),
(73, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:24:13', 'success', '192.168.1.10'),
(74, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:24:21', 'success', '192.168.1.10'),
(75, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:24:41', 'success', '192.168.1.10'),
(76, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:24:45', 'success', '192.168.1.10'),
(77, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:25:26', 'success', '192.168.1.10'),
(78, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:25:33', 'success', '192.168.1.10'),
(79, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:15', 'success', '192.168.1.10'),
(80, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:15', 'success', '192.168.1.10'),
(81, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:16', 'success', '192.168.1.10'),
(82, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:17', 'success', '192.168.1.10'),
(83, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:17', 'success', '192.168.1.10'),
(84, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:17', 'success', '192.168.1.10'),
(85, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:17', 'success', '192.168.1.10'),
(86, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:17', 'success', '192.168.1.10'),
(87, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:18', 'success', '192.168.1.10'),
(88, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:19', 'success', '192.168.1.10'),
(89, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:29', 'success', '192.168.1.10'),
(90, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:30', 'success', '192.168.1.10'),
(91, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:30', 'success', '192.168.1.10'),
(92, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:30', 'success', '192.168.1.10'),
(93, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:30', 'success', '192.168.1.10'),
(94, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:30', 'success', '192.168.1.10'),
(95, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:30', 'success', '192.168.1.10'),
(96, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:31', 'success', '192.168.1.10'),
(97, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:31', 'success', '192.168.1.10'),
(98, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:31', 'success', '192.168.1.10'),
(99, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:32', 'success', '192.168.1.10'),
(100, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:32', 'success', '192.168.1.10'),
(101, 'Admin Tangolab', 'Update Status Pesanan', 'KIOSK-1780939659417 (sedang_diproses)', '2026-06-14 15:27:36', 'success', '192.168.1.10'),
(102, 'Admin Tangolab', 'Update Status Pesanan', 'KIOSK-1780939659417 (siap)', '2026-06-14 15:27:39', 'success', '192.168.1.10'),
(103, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (sedang_diproses)', '2026-06-14 15:27:41', 'success', '192.168.1.10'),
(104, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (siap)', '2026-06-14 15:27:44', 'success', '192.168.1.10'),
(105, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:27:51', 'success', '192.168.1.10'),
(106, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:27:52', 'success', '192.168.1.10'),
(107, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (sedang_diproses)', '2026-06-14 15:27:58', 'success', '192.168.1.10'),
(108, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (siap)', '2026-06-14 15:39:31', 'success', '192.168.1.10'),
(109, 'Admin Tangolab', 'Update Status Pesanan', 'KIOSK-1780939659417 (selesai)', '2026-06-14 15:39:32', 'success', '192.168.1.10'),
(110, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (selesai)', '2026-06-14 15:39:33', 'success', '192.168.1.10'),
(111, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:39:37', 'success', '192.168.1.10'),
(112, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:39:37', 'success', '192.168.1.10'),
(113, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:39:39', 'success', '192.168.1.10'),
(114, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:39:44', 'success', '192.168.1.10'),
(115, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (sedang_diproses)', '2026-06-14 15:39:52', 'success', '192.168.1.10'),
(116, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (siap)', '2026-06-14 15:41:23', 'success', '192.168.1.10'),
(117, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (selesai)', '2026-06-14 15:41:25', 'success', '192.168.1.10'),
(118, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:41:34', 'success', '192.168.1.10'),
(119, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:41:35', 'success', '192.168.1.10'),
(120, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (sedang_diproses)', '2026-06-14 15:41:38', 'success', '192.168.1.10'),
(121, 'Admin Tangolab', 'Ubah Status Bayar', 'KIOSK-1780948186057 (belum_bayar)', '2026-06-14 15:44:18', 'success', '192.168.1.10'),
(122, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (siap)', '2026-06-14 15:44:23', 'success', '192.168.1.10'),
(123, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (selesai)', '2026-06-14 15:44:25', 'success', '192.168.1.10'),
(124, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:44:31', 'success', '192.168.1.10'),
(125, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:44:32', 'success', '192.168.1.10'),
(126, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (sedang_diproses)', '2026-06-14 15:44:49', 'success', '192.168.1.10'),
(127, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (siap)', '2026-06-14 15:45:04', 'success', '192.168.1.10'),
(128, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (selesai)', '2026-06-14 15:45:07', 'success', '192.168.1.10'),
(129, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-14 15:49:40', 'success', '192.168.1.10'),
(130, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-14 15:49:41', 'success', '192.168.1.10'),
(131, 'Admin Tangolab', 'Ubah Status Bayar', 'KIOSK-1780948186057 (lunas)', '2026-06-14 15:49:42', 'success', '192.168.1.10'),
(132, 'Admin Tangolab', 'Update Status Pesanan', 'KIOSK-1780948186057 (sedang_diproses)', '2026-06-14 15:49:47', 'success', '192.168.1.10'),
(133, 'Admin Tangolab', 'Update Status Pesanan', 'KIOSK-1780948186057 (siap)', '2026-06-14 15:49:48', 'success', '192.168.1.10'),
(134, 'Admin Tangolab', 'Update Status Pesanan', 'KIOSK-1780948186057 (selesai)', '2026-06-14 15:49:52', 'success', '192.168.1.10'),
(135, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (sedang_diproses)', '2026-06-14 15:49:53', 'success', '192.168.1.10'),
(136, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (siap)', '2026-06-14 15:49:55', 'success', '192.168.1.10'),
(137, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (selesai)', '2026-06-14 15:50:00', 'success', '192.168.1.10'),
(138, 'Koki', 'Tambah Menu Baru', 'estehh manis (coworking)', '2026-06-16 10:23:23', 'success', '192.168.1.10'),
(139, 'Admin Tangolab', 'Buat Promo Koin', 'Beli Ayam Bakar Gratis Esteh manis (400 koin)', '2026-06-16 10:24:54', 'success', '192.168.1.10'),
(140, 'Koki', 'Tambah Menu Baru', 'nasi goreng (ngolab)', '2026-06-16 16:09:30', 'success', '192.168.1.10'),
(141, 'Kasir Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-17 13:33:20', 'success', '192.168.1.10'),
(142, 'Kasir Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-17 13:33:44', 'success', '192.168.1.10'),
(143, 'Koki Tangolab', 'Update Status Pesanan', 'INV-395 (sedang_diproses)', '2026-06-17 13:36:56', 'success', '192.168.1.10'),
(144, 'Koki Tangolab', 'Update Status Pesanan', 'INV-395 (siap)', '2026-06-17 13:38:01', 'success', '192.168.1.10'),
(145, 'Admin Tangolab', 'Restock Bahan Baku', 'Mie Basah (+50 Porsi)', '2026-06-17 13:41:33', 'success', '192.168.1.10'),
(146, 'Koki', 'Tambah Menu Baru', 'Menu Uji Katalon 1781703940262 (ngolab)', '2026-06-17 13:45:56', 'success', '192.168.1.10'),
(147, 'Koki', 'Toggle Stok Menu', 'Menu Uji Katalon 1781703940262 (Habis)', '2026-06-17 13:46:48', 'success', '192.168.1.10'),
(148, 'Koki', 'Tambah Menu Baru', 'Temp Delete Menu 1781704060178 (ngolab)', '2026-06-17 13:47:54', 'success', '192.168.1.10'),
(149, 'Admin Tangolab', 'Registrasi Pegawai', 'Staff Uji Katalon 1781704220462 (Kasir)', '2026-06-17 13:50:34', 'success', '192.168.1.10'),
(150, 'Admin Tangolab', 'Registrasi Pegawai', 'Temp Staff 1781704353218 (Kasir)', '2026-06-17 13:52:49', 'success', '192.168.1.10'),
(151, 'Admin Tangolab', 'Hapus Pegawai', 'Staff Uji Katalon 1781704220462', '2026-06-17 13:52:53', 'warning', '192.168.1.10'),
(152, 'Admin Tangolab', 'Buat Promo Koin', 'Voucher Uji Katalon 1781704514123 (200 koin)', '2026-06-17 13:55:30', 'success', '192.168.1.10'),
(153, 'Admin Tangolab', 'Buat Promo Koin', 'Temp Voucher 1781704591914 (100 koin)', '2026-06-17 13:56:51', 'success', '192.168.1.10'),
(154, 'Admin Tangolab', 'Hapus Promo Koin', 'Temp Voucher 1781704591914', '2026-06-17 13:56:56', 'warning', '192.168.1.10'),
(155, 'Admin Tangolab', 'Restock Bahan Baku', 'Mie Basah (+5 Porsi)', '2026-06-17 13:59:57', 'success', '192.168.1.10'),
(156, 'Koki', 'Toggle Stok Menu', 'Temp Delete Menu 1781704060178 (Habis)', '2026-06-17 14:00:44', 'success', '192.168.1.10'),
(157, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-17 14:39:25', 'success', '192.168.1.10'),
(158, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-17 14:39:26', 'success', '192.168.1.10'),
(159, 'Admin Tangolab', 'Update Status Pesanan', 'INV-395 (sedang_diproses)', '2026-06-17 14:39:28', 'success', '192.168.1.10'),
(160, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (belum_bayar)', '2026-06-17 14:39:38', 'success', '192.168.1.10'),
(161, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-395 (lunas)', '2026-06-17 14:39:38', 'success', '192.168.1.10'),
(162, 'Koki', 'Hapus Menu', 'Temp Delete Menu 1781704060178', '2026-06-17 14:45:52', 'warning', '192.168.1.10'),
(163, 'Admin Tangolab', 'Hapus Pesanan', 'INV-395', '2026-08-31 01:49:13', 'warning', '192.168.1.10'),
(164, 'Admin Tangolab', 'Hapus Pesanan', 'KIOSK-1780948186057', '2026-08-31 01:49:16', 'warning', '192.168.1.10'),
(165, 'Admin Tangolab', 'Hapus Pesanan', 'KIOSK-1780947855560', '2026-08-31 01:49:20', 'warning', '192.168.1.10'),
(166, 'Admin Tangolab', 'Hapus Pesanan', 'KIOSK-1780939659417', '2026-08-31 01:49:23', 'warning', '192.168.1.10'),
(167, 'Admin Tangolab', 'Hapus Pesanan', 'INV-031', '2026-08-31 01:49:26', 'warning', '192.168.1.10'),
(168, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-457 (redd)', '2026-08-31 01:50:51', 'success', '192.168.1.10'),
(169, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-457 (lunas)', '2026-08-31 01:50:56', 'success', '192.168.1.10'),
(170, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-678 (wer)', '2026-08-31 01:51:33', 'success', '192.168.1.10'),
(171, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-678 (lunas)', '2026-08-31 01:51:45', 'success', '192.168.1.10'),
(172, 'Admin Tangolab', 'Update Status Pesanan', 'INV-457 (sedang_diproses)', '2026-08-31 01:51:58', 'success', '192.168.1.10'),
(173, 'Admin Tangolab', 'Update Status Pesanan', 'INV-678 (sedang_diproses)', '2026-08-31 01:51:59', 'success', '192.168.1.10'),
(174, 'Admin Tangolab', 'Update Status Pesanan', 'INV-457 (siap)', '2026-08-31 01:52:00', 'success', '192.168.1.10'),
(175, 'Admin Tangolab', 'Update Status Pesanan', 'INV-457 (selesai)', '2026-08-31 01:52:01', 'success', '192.168.1.10'),
(176, 'Admin Tangolab', 'Update Status Pesanan', 'INV-678 (siap)', '2026-08-31 01:52:02', 'success', '192.168.1.10'),
(177, 'Admin Tangolab', 'Update Status Pesanan', 'INV-678 (selesai)', '2026-08-31 01:52:03', 'success', '192.168.1.10'),
(178, 'Automated Bell Verification', 'Buat Pesanan Manual', 'INV-604 (Bell Test (otomatis dihapus))', '2026-08-31 02:07:51', 'success', '192.168.1.10'),
(179, 'Admin', 'Hapus Pesanan', 'INV-604', '2026-08-31 02:07:51', 'warning', '192.168.1.10'),
(180, 'Automated Bell Verification', 'Buat Pesanan Manual', 'INV-729 (Bell Test (otomatis dihapus))', '2026-08-31 02:09:39', 'success', '192.168.1.10'),
(181, 'Admin', 'Hapus Pesanan', 'INV-729', '2026-08-31 02:09:39', 'warning', '192.168.1.10'),
(182, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-583 (zx)', '2026-08-31 02:16:58', 'success', '192.168.1.10'),
(183, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-882 (lunas)', '2026-08-31 02:17:12', 'success', '192.168.1.10'),
(184, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-583 (lunas)', '2026-08-31 02:17:20', 'success', '192.168.1.10'),
(185, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-583 (belum_bayar)', '2026-08-31 02:17:25', 'success', '192.168.1.10'),
(186, 'Admin Tangolab', 'Update Status Pesanan', 'INV-882 (sedang_diproses)', '2026-08-31 02:17:29', 'success', '192.168.1.10'),
(187, 'Admin Tangolab', 'Update Status Pesanan', 'INV-882 (siap)', '2026-08-31 02:17:30', 'success', '192.168.1.10'),
(188, 'Admin Tangolab', 'Update Status Pesanan', 'INV-882 (selesai)', '2026-08-31 02:17:31', 'success', '192.168.1.10'),
(189, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-882 (belum_bayar)', '2026-08-31 02:17:47', 'success', '192.168.1.10'),
(190, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-583 (lunas)', '2026-08-31 02:17:53', 'success', '192.168.1.10'),
(191, 'Admin Tangolab', 'Update Status Pesanan', 'INV-583 (sedang_diproses)', '2026-08-31 02:17:56', 'success', '192.168.1.10'),
(192, 'Admin Tangolab', 'Update Status Pesanan', 'INV-583 (siap)', '2026-08-31 02:17:57', 'success', '192.168.1.10'),
(193, 'Admin Tangolab', 'Update Status Pesanan', 'INV-583 (selesai)', '2026-08-31 02:18:00', 'success', '192.168.1.10'),
(194, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-583 (belum_bayar)', '2026-08-31 02:18:03', 'success', '192.168.1.10'),
(195, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-583 (lunas)', '2026-08-31 02:18:08', 'success', '192.168.1.10'),
(196, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-882 (lunas)', '2026-08-31 02:18:12', 'success', '192.168.1.10'),
(197, 'Admin Tangolab', 'Update Status Pesanan', 'INV-882 (sedang_diproses)', '2026-08-31 02:18:15', 'success', '192.168.1.10'),
(198, 'Admin Tangolab', 'Update Status Pesanan', 'INV-882 (siap)', '2026-08-31 02:18:16', 'success', '192.168.1.10'),
(199, 'Admin Tangolab', 'Update Status Pesanan', 'INV-583 (sedang_diproses)', '2026-08-31 02:18:16', 'success', '192.168.1.10'),
(200, 'Admin Tangolab', 'Update Status Pesanan', 'INV-583 (siap)', '2026-08-31 02:18:17', 'success', '192.168.1.10'),
(201, 'Admin Tangolab', 'Update Status Pesanan', 'INV-882 (selesai)', '2026-08-31 02:18:18', 'success', '192.168.1.10'),
(202, 'Admin Tangolab', 'Update Status Pesanan', 'INV-583 (selesai)', '2026-08-31 02:18:19', 'success', '192.168.1.10'),
(203, 'Admin Tangolab', 'Penetapan Shift', 'fahreza  (Full Day)', '2026-08-31 02:21:16', 'success', '192.168.1.10'),
(204, 'Automated Test', 'Buat Program PO', 'PO Smoke Test (otomatis dihapus) (ngolab)', '2026-08-31 04:05:18', 'success', '192.168.1.10'),
(205, 'Automated Test', 'Buat Pesanan PO', 'PO-MTGPTERL-7264 (ngolab)', '2026-08-31 04:05:19', 'success', '192.168.1.10'),
(206, 'Admin', 'Hapus Pesanan', 'PO-MTGPTERL-7264', '2026-08-31 04:05:21', 'warning', '192.168.1.10'),
(207, 'Admin Tangolab', 'Buat Program PO', 'PO Jum\'at Berkeah (ngolab)', '2026-08-31 06:08:41', 'success', '192.168.1.10'),
(208, 'Ops Test', 'Buat Program PO', 'PO Ops Smoke Test (otomatis dihapus) (coworking)', '2026-08-31 06:34:50', 'success', '192.168.1.10'),
(209, 'Ops Test', 'Buat Pesanan PO', 'PO-MTGV5P6R-9627 (coworking)', '2026-08-31 06:34:50', 'success', '192.168.1.10'),
(210, 'Ops Test', 'Buat Pesanan PO', 'PO-MTGV5POF-6840 (coworking)', '2026-08-31 06:34:51', 'success', '192.168.1.10'),
(211, 'Ops Test', 'Buat Pesanan PO', 'PO-MTGV5Q4Q-9747 (coworking)', '2026-08-31 06:34:51', 'success', '192.168.1.10'),
(212, 'Ops Test', 'Pelunasan PO', 'PO-MTGV5P6R-9627', '2026-08-31 06:34:53', 'success', '192.168.1.10'),
(213, 'Ops Test', 'PO Sudah Diambil', 'PO-MTGV5P6R-9627', '2026-08-31 06:34:53', 'success', '192.168.1.10'),
(214, 'Ops Test', 'PO No-show', 'PO-MTGV5POF-6840', '2026-08-31 06:34:54', 'warning', '192.168.1.10'),
(215, 'Admin Tangolab', 'Toggle Program PO', 'PO Jum\'at Berkeah', '2026-09-09 02:30:11', 'success', '192.168.1.10'),
(216, 'Admin Tangolab', 'Toggle Program PO', 'PO Jum\'at Berkeah', '2026-09-09 02:30:12', 'success', '192.168.1.10'),
(217, 'Admin Tangolab', 'Hapus Pegawai', 'Temp Staff 1781704353218', '2026-09-09 02:32:06', 'warning', '192.168.1.10'),
(218, 'Koki', 'Toggle Stok Menu', 'Menu Uji Katalon 1781703940262 (Tersedia)', '2026-09-09 03:35:29', 'success', '192.168.1.10'),
(238, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-219 (dada)', '2026-09-10 01:44:54', 'success', '192.168.1.10'),
(239, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-219 (lunas)', '2026-09-10 01:45:02', 'success', '192.168.1.10'),
(240, 'Admin Tangolab', 'Update Status Pesanan', 'INV-219 (sedang_diproses)', '2026-09-10 01:45:25', 'success', '192.168.1.10'),
(241, 'Admin Tangolab', 'Update Status Pesanan', 'INV-219 (siap)', '2026-09-10 01:45:25', 'success', '192.168.1.10'),
(242, 'Admin Tangolab', 'Update Status Pesanan', 'INV-219 (selesai)', '2026-09-10 01:45:26', 'success', '192.168.1.10'),
(243, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-219 (belum_bayar)', '2026-09-10 01:45:37', 'success', '192.168.1.10'),
(244, 'Admin Tangolab', 'Ubah Status Bayar', 'INV-219 (lunas)', '2026-09-10 01:45:37', 'success', '192.168.1.10'),
(246, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-573 (trtr)', '2026-09-10 02:02:07', 'success', '192.168.1.10'),
(247, 'Admin Tangolab', 'Upload Suara KDS', 'new_order: kds-new_order-ce5f25c3-763d-4a27-b2e3-9e3fd0814223.mp3', '2026-09-10 02:04:05', 'success', '192.168.1.10'),
(248, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-301 (kook)', '2026-09-10 02:04:45', 'success', '192.168.1.10'),
(249, 'Admin Tangolab', 'Update Status Pesanan', 'INV-219 (sedang_diproses)', '2026-09-10 02:05:02', 'success', '192.168.1.10'),
(250, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-907 (ooollp)', '2026-09-10 02:05:20', 'success', '192.168.1.10'),
(251, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-678 (rere)', '2026-09-10 04:02:24', 'success', '192.168.1.10'),
(252, 'Admin Tangolab', 'Update Status Pesanan', 'INV-573 (sedang_diproses)', '2026-09-10 04:02:31', 'success', '192.168.1.10'),
(253, 'Admin Tangolab', 'Update Status Pesanan', 'INV-219 (siap)', '2026-09-10 04:02:32', 'success', '192.168.1.10'),
(254, 'Admin Tangolab', 'Upload Suara KDS', 'ready: kds-ready-685321cc-a2b0-4e6e-80b1-c1b36d5d109c.mp3', '2026-09-10 04:03:45', 'success', '192.168.1.10'),
(255, 'Admin Tangolab', 'Update Status Pesanan', 'INV-573 (siap)', '2026-09-10 04:03:55', 'success', '192.168.1.10'),
(256, 'Admin Tangolab', 'Update Status Pesanan', 'INV-219 (selesai)', '2026-09-10 07:12:29', 'success', '192.168.1.10'),
(257, 'Admin Tangolab', 'Update Status Pesanan', 'INV-573 (selesai)', '2026-09-10 07:12:31', 'success', '192.168.1.10'),
(258, 'Admin Tangolab', 'Update Status Pesanan', 'INV-301 (sedang_diproses)', '2026-09-10 07:12:33', 'success', '192.168.1.10'),
(259, 'Admin Tangolab', 'Update Status Pesanan', 'INV-301 (siap)', '2026-09-10 07:12:34', 'success', '192.168.1.10'),
(260, 'Admin Tangolab', 'Update Status Pesanan', 'INV-301 (selesai)', '2026-09-10 07:12:35', 'success', '192.168.1.10'),
(261, 'Admin Tangolab', 'Update Status Pesanan', 'INV-907 (sedang_diproses)', '2026-09-10 07:12:42', 'success', '192.168.1.10'),
(262, 'Admin Tangolab', 'Update Status Pesanan', 'INV-907 (siap)', '2026-09-10 07:12:43', 'success', '192.168.1.10'),
(263, 'Admin Tangolab', 'Update Status Pesanan', 'INV-907 (selesai)', '2026-09-10 07:12:47', 'success', '192.168.1.10'),
(264, 'Admin Tangolab', 'Update Status Pesanan', 'INV-678 (sedang_diproses)', '2026-09-10 07:12:48', 'success', '192.168.1.10'),
(265, 'Admin Tangolab', 'Update Status Pesanan', 'INV-678 (siap)', '2026-09-10 07:12:48', 'success', '192.168.1.10'),
(266, 'Admin Tangolab', 'Buat Pesanan Manual', 'INV-436 (nuhh)', '2026-09-10 07:13:00', 'success', '192.168.1.10'),
(267, 'Admin Tangolab', 'Upload Foto Menu PO', 'preorder-51e5f9f6-893d-41a9-9e23-ad27508bdea5.png', '2026-09-10 08:04:19', 'success', '192.168.1.10'),
(268, 'Admin Tangolab', 'Buat Program PO', 'TEST (ngolab)', '2026-09-10 08:06:08', 'success', '192.168.1.10'),
(269, 'Admin Tangolab', 'Toggle Program PO', 'PO Jum\'at Berkeah', '2026-09-10 08:09:19', 'success', '192.168.1.10'),
(270, 'Admin Tangolab', 'Toggle Program PO', 'PO Jum\'at Berkeah', '2026-09-10 08:09:19', 'success', '192.168.1.10'),
(271, 'Uji Super Admin', 'Registrasi Pegawai', 'Pegawai Uji Baru (Support)', '2026-09-22 04:49:19', 'success', '192.168.1.10'),
(272, 'Uji Super Admin', 'Update Data Pegawai', 'Pegawai Uji Baru (Info Kontak)', '2026-09-22 04:49:19', 'success', '192.168.1.10'),
(273, 'Uji Super Admin', 'Penetapan Shift', 'Pegawai Uji Baru (Pagi)', '2026-09-22 04:49:19', 'success', '192.168.1.10'),
(274, 'Uji Super Admin', 'Buat Pesanan Manual', 'INV-226 (Uji Hapus KDS)', '2026-09-22 05:13:21', 'success', '192.168.1.10'),
(275, 'Uji Super Admin', 'Hapus Pesanan', 'INV-226', '2026-09-22 05:13:21', 'warning', '192.168.1.10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `coin_promos`
--

CREATE TABLE `coin_promos` (
  `id` varchar(50) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `coin_cost` int(11) NOT NULL,
  `discount_type` enum('fixed','percentage','free_item') NOT NULL DEFAULT 'fixed',
  `discount_value` int(11) NOT NULL,
  `min_order` int(11) NOT NULL DEFAULT 0,
  `max_usage` int(11) NOT NULL DEFAULT 100,
  `used_count` int(11) NOT NULL DEFAULT 0,
  `valid_until` datetime NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `image_url` varchar(500) DEFAULT NULL,
  `category` varchar(100) DEFAULT 'Semua',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `free_item_name` varchar(200) DEFAULT NULL,
  `required_item_name` varchar(200) DEFAULT NULL,
  `product_id` varchar(50) DEFAULT NULL,
  `category_id` varchar(50) DEFAULT NULL,
  `promo_code` varchar(100) DEFAULT NULL,
  `limit_per_user` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `coin_promos`
--

INSERT INTO `coin_promos` (`id`, `title`, `description`, `coin_cost`, `discount_type`, `discount_value`, `min_order`, `max_usage`, `used_count`, `valid_until`, `is_active`, `image_url`, `category`, `created_at`, `updated_at`, `free_item_name`, `required_item_name`, `product_id`, `category_id`, `promo_code`, `limit_per_user`) VALUES
('cp-1780646073298', 'Diskon 20% Ayam Bakar', 'ayam bakar diskon besar besaran', 200, 'percentage', 20, 10000, 10, 0, '2026-06-29 00:00:00', 1, '/uploads/promos/promo-1780646072923.jpeg', 'Semua', '2026-06-05 07:54:33', '2026-06-05 07:56:44', 'Ayam Bakar', '', '1779568926193', NULL, NULL, 1),
('cp-1780649192893', 'Voucher diskon 20%', 'diskon 5rb', 200, 'percentage', 20, 10000, 100, 0, '2026-07-05 00:00:00', 1, '/uploads/default_voucher.png', 'Semua', '2026-06-05 08:46:32', '2026-06-05 08:47:11', NULL, NULL, NULL, NULL, 'NGOLABin88', 9),
('cp-1781605494257', 'Beli Ayam Bakar Gratis Esteh manis', 'gratis esteh', 400, 'free_item', 0, 10000, 100, 0, '2026-06-26 00:00:00', 1, '/uploads/promos/promo-1781605494248.jpeg', 'Semua', '2026-06-16 10:24:54', '2026-06-16 10:24:54', 'estehh manis', 'Ayam Bakar', '1779568926193', NULL, NULL, 1),
('cp-1781704530917', 'Voucher Uji Katalon 1781704514123', 'Voucher diskon uji otomatis oleh Katalon.', 200, 'percentage', 15, 0, 100, 0, '0000-00-00 00:00:00', 1, '/uploads/default_voucher.png', 'Semua', '2026-06-17 13:55:30', '2026-06-17 13:55:30', NULL, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `coin_transactions`
--

CREATE TABLE `coin_transactions` (
  `id` varchar(50) NOT NULL,
  `order_id` varchar(50) DEFAULT NULL,
  `user_id` varchar(50) NOT NULL,
  `user_name` varchar(100) NOT NULL COMMENT 'Snapshot nama user',
  `type` enum('earn','redeem') NOT NULL,
  `amount` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `promo_id` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `coin_transactions`
--

INSERT INTO `coin_transactions` (`id`, `order_id`, `user_id`, `user_name`, `type`, `amount`, `description`, `promo_id`, `created_at`) VALUES
('ct-1780329913764', NULL, '607012400054', 'ahmad husen', 'earn', 100, 'Bonus Pendaftaran', NULL, '2026-06-01 16:05:13'),
('ct-1780329955250', NULL, '607012400054', 'ahmad husen', 'earn', 500, 'Hadiah koin dari aktivitas game/kiosk', NULL, '2026-06-01 16:05:55'),
('ct-1780329961341', NULL, '607012400054', 'ahmad husen', 'redeem', 200, 'Tukar: Diskon 50% nasi goreng', NULL, '2026-06-01 16:06:01'),
('ct-1780648444705', NULL, 'user-1780648444622', 'Ahmad Fauzi Fore Test', 'earn', 100, 'Bonus Pendaftaran', NULL, '2026-06-05 08:34:04'),
('ct-1781625191786', NULL, 'u-1781625191785', 'Bagus Mahasiswa', 'earn', 100, 'Bonus Pendaftaran', NULL, '2026-06-16 15:53:11'),
('ct-1781625191807', NULL, 'u-1781625191785', 'Bagus Mahasiswa', 'earn', 45, 'Belajar: Kalkulus II (90 Menit)', NULL, '2026-06-16 15:53:11'),
('ct-1781625191820', NULL, 'u-1781625191785', 'Bagus Mahasiswa', 'redeem', 20, 'Urunan Poin: Patungan Buku Perpustakaan Baru', NULL, '2026-06-16 15:53:11'),
('ct-1781697553700', NULL, '7049509454', 'ahamd', 'earn', 100, 'Bonus Pendaftaran', NULL, '2026-06-17 11:59:13'),
('ct-1788142632215', NULL, 'user-1780648444622', 'Ahmad Fauzi Fore Test', 'earn', 750, 'Cashback 5% dari INV-882', NULL, '2026-08-31 02:17:12'),
('ct-1788142692687', NULL, 'user-1780648444622', 'Ahmad Fauzi Fore Test', 'earn', 750, 'Cashback 5% dari INV-882', NULL, '2026-08-31 02:18:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `digital_screens`
--

CREATE TABLE `digital_screens` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `location` varchar(200) DEFAULT NULL,
  `status` enum('online','offline','maintenance') NOT NULL DEFAULT 'offline',
  `last_ping` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `digital_screens`
--

INSERT INTO `digital_screens` (`id`, `name`, `location`, `status`, `last_ping`, `created_at`, `updated_at`) VALUES
(1, 'Kiosk Utama', 'Lantai 1 - Dekat Kasir', 'online', '2026-06-08 19:49:23', '2026-05-14 19:54:04', '2026-06-08 19:49:23'),
(2, 'Display Tunggu', 'Area Tunggu Pelanggan', 'offline', NULL, '2026-05-14 19:54:04', '2026-05-14 19:54:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `display_logs`
--

CREATE TABLE `display_logs` (
  `id` bigint(20) NOT NULL,
  `screen_id` int(11) NOT NULL,
  `media_id` int(11) NOT NULL,
  `playlist_id` int(11) NOT NULL,
  `displayed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `duration_shown` int(11) NOT NULL DEFAULT 0 COMMENT 'Detik konten ditampilkan'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `ingredients`
--

CREATE TABLE `ingredients` (
  `id` varchar(50) NOT NULL,
  `name` varchar(150) NOT NULL,
  `inventory_type` varchar(30) NOT NULL DEFAULT 'raw_material',
  `sku` varchar(100) DEFAULT NULL,
  `barcode` varchar(100) DEFAULT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'Bahan Baku',
  `unit` varchar(50) NOT NULL,
  `purchase_unit` varchar(50) DEFAULT NULL,
  `purchase_conversion` decimal(12,3) NOT NULL DEFAULT 1.000,
  `stock` decimal(12,2) NOT NULL DEFAULT 0.00,
  `min_stock` decimal(12,2) NOT NULL DEFAULT 0.00,
  `critical_stock` decimal(12,2) NOT NULL DEFAULT 0.00,
  `cost_price` decimal(14,2) NOT NULL DEFAULT 0.00,
  `supplier` varchar(150) DEFAULT NULL,
  `outlet` varchar(50) NOT NULL DEFAULT 'ngolab',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `inventory_type`, `sku`, `barcode`, `category`, `unit`, `purchase_unit`, `purchase_conversion`, `stock`, `min_stock`, `critical_stock`, `cost_price`, `supplier`, `outlet`, `is_active`, `created_at`, `updated_at`) VALUES
('ing-1', 'Mie Basah', 'raw_material', NULL, NULL, 'Bahan Baku', 'Porsi', NULL, 1.000, 100.00, 20.00, 6.00, 0.00, NULL, 'ngolab', 1, '2026-08-31 01:25:18', '2026-09-09 04:20:02'),
('ing-2', 'Ayam Cincang', 'raw_material', NULL, NULL, 'Bahan Baku', 'Porsi', NULL, 1.000, 80.00, 15.00, 4.00, 0.00, NULL, 'ngolab', 1, '2026-08-31 01:25:18', '2026-09-09 04:20:02'),
('ing-3', 'Bakso Halus', 'raw_material', NULL, NULL, 'Bahan Baku', 'Biji', NULL, 1.000, 250.00, 50.00, 15.00, 0.00, NULL, 'ngolab', 1, '2026-08-31 01:25:18', '2026-09-09 04:20:02'),
('ing-4', 'Bakso Urat', 'raw_material', NULL, NULL, 'Bahan Baku', 'Biji', NULL, 1.000, 100.00, 20.00, 6.00, 0.00, NULL, 'ngolab', 1, '2026-08-31 01:25:18', '2026-09-09 04:20:02'),
('ing-5', 'Pangsit Goreng', 'raw_material', NULL, NULL, 'Bahan Baku', 'Biji', NULL, 1.000, 150.00, 30.00, 9.00, 0.00, NULL, 'ngolab', 1, '2026-08-31 01:25:18', '2026-09-09 04:20:02'),
('ing-6', 'Siomay', 'raw_material', NULL, NULL, 'Bahan Baku', 'Biji', NULL, 1.000, 120.00, 20.00, 6.00, 0.00, NULL, 'ngolab', 1, '2026-08-31 01:25:18', '2026-09-09 04:20:02'),
('ing-7', 'Sawi Hijau', 'raw_material', NULL, NULL, 'Bahan Baku', 'Porsi', NULL, 1.000, 100.00, 15.00, 4.00, 0.00, NULL, 'ngolab', 1, '2026-08-31 01:25:18', '2026-09-09 04:20:02'),
('ing-8', 'Bumbu Rahasia', 'raw_material', NULL, NULL, 'Bahan Baku', 'Gram', NULL, 1.000, 5000.00, 500.00, 150.00, 0.00, NULL, 'ngolab', 1, '2026-08-31 01:25:18', '2026-09-09 04:20:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `inventory_movements`
--

CREATE TABLE `inventory_movements` (
  `id` bigint(20) NOT NULL,
  `ingredient_id` varchar(50) NOT NULL,
  `outlet` varchar(50) NOT NULL DEFAULT 'ngolab',
  `movement_type` varchar(30) NOT NULL,
  `quantity` decimal(12,2) NOT NULL,
  `stock_before` decimal(12,2) NOT NULL,
  `stock_after` decimal(12,2) NOT NULL,
  `input_method` varchar(30) NOT NULL DEFAULT 'manual',
  `reference_type` varchar(50) DEFAULT NULL,
  `reference_id` varchar(100) DEFAULT NULL,
  `purchase_unit` varchar(50) DEFAULT NULL,
  `purchase_quantity` decimal(12,2) DEFAULT NULL,
  `unit_cost` decimal(14,2) DEFAULT NULL,
  `supplier` varchar(150) DEFAULT NULL,
  `batch_number` varchar(100) DEFAULT NULL,
  `expires_at` date DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `actor_id` varchar(50) DEFAULT NULL,
  `actor_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `media_files`
--

CREATE TABLE `media_files` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_url` varchar(500) NOT NULL,
  `file_size` bigint(20) NOT NULL DEFAULT 0,
  `file_type` enum('image','video') NOT NULL DEFAULT 'image',
  `mime_type` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL DEFAULT 10 COMMENT 'Durasi tampil dalam detik',
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `uploaded_by` varchar(100) NOT NULL DEFAULT 'Admin',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `media_files`
--

INSERT INTO `media_files` (`id`, `title`, `description`, `file_name`, `file_path`, `file_url`, `file_size`, `file_type`, `mime_type`, `duration`, `thumbnail_url`, `width`, `height`, `uploaded_by`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Nasi Goreng', NULL, 'media-1778789906315.jpg', 'D:\\Telkom_University\\Ko+lab\\Tangolab\\public\\uploads\\digital-board\\media-1778789906315.jpg', '/uploads/digital-board/media-1778789906315.jpg', 122588, 'image', 'image/jpeg', 10, NULL, NULL, NULL, 'Admin', 1, '2026-05-14 20:18:26', '2026-05-14 21:09:26'),
(2, 'nasi nasi', NULL, 'media-1778789939357.jpg', 'D:\\Telkom_University\\Ko+lab\\Tangolab\\public\\uploads\\digital-board\\media-1778789939357.jpg', '/uploads/digital-board/media-1778789939357.jpg', 124527, 'image', 'image/jpeg', 10, NULL, NULL, NULL, 'Admin', 1, '2026-05-14 20:18:59', '2026-05-14 20:18:59');

-- --------------------------------------------------------

--
-- Struktur dari tabel `menus`
--

CREATE TABLE `menus` (
  `id` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'Semua',
  `price` int(11) NOT NULL DEFAULT 0,
  `in_stock` tinyint(1) NOT NULL DEFAULT 1,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `inventory_available` tinyint(1) NOT NULL DEFAULT 1,
  `availability_override` varchar(20) NOT NULL DEFAULT 'auto',
  `availability_reason` varchar(255) DEFAULT NULL,
  `availability_updated_by` varchar(100) DEFAULT NULL,
  `availability_updated_at` datetime DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `outlet` varchar(50) NOT NULL DEFAULT 'ngolab' COMMENT 'Sumber menu: ngolab, coworking, smart_tag_qr',
  `image_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `menus`
--

INSERT INTO `menus` (`id`, `name`, `category`, `price`, `in_stock`, `is_active`, `inventory_available`, `availability_override`, `availability_reason`, `availability_updated_by`, `availability_updated_at`, `stock`, `outlet`, `image_url`, `created_at`, `updated_at`, `description`) VALUES
('1779568926193', 'Ayam Bakar', 'Ready Meal', 23000, 1, 1, 1, 'auto', NULL, NULL, NULL, 8, 'coworking', 'https://picsum.photos/seed/AyamBakar/400/300', '2026-05-23 20:42:06', '2026-09-10 07:13:00', 'enakkk'),
('1780673324565', 'Nasi goreng Gila', 'Ready Meal', 14000, 1, 1, 1, 'auto', NULL, NULL, NULL, 47, 'coworking', '/uploads/menus/menu-1780673324566-45.jpg', '2026-06-05 15:28:44', '2026-09-22 05:13:21', 'sangat pedas'),
('1781605403131', 'estehh manis', 'Minuman Siap Saji', 7000, 1, 1, 1, 'auto', NULL, NULL, NULL, 26, 'coworking', '/uploads/menus/menu-1781605403132-825.jpg', '2026-06-16 10:23:23', '2026-09-10 02:04:45', 'esteh manis dengan gula sedang'),
('1781626170670', 'nasi goreng', 'Main Course', 15000, 1, 1, 1, 'auto', NULL, NULL, NULL, 30, 'ngolab', '/uploads/menus/menu-1781626170671-151.jpg', '2026-06-16 16:09:30', '2026-08-31 01:51:33', 'nasi di goreng'),
('1781703956232', 'Menu Uji Katalon 1781703940262', 'Main Course', 15000, 1, 1, 1, 'auto', NULL, NULL, NULL, 20, 'ngolab', 'https://picsum.photos/seed/MenuUjiKatalon1781703940262/400/300', '2026-06-17 13:45:56', '2026-09-09 03:35:29', 'Deskripsi menu uji otomatis Katalon.');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` varchar(50) NOT NULL,
  `destination_label` varchar(100) DEFAULT NULL,
  `user_id` varchar(50) DEFAULT NULL COMMENT 'NULL jika tamu/offline',
  `customer_name` varchar(100) NOT NULL,
  `customer_phone` varchar(50) DEFAULT NULL,
  `invoice_number` varchar(50) NOT NULL,
  `total_price` int(11) NOT NULL DEFAULT 0,
  `status` varchar(30) NOT NULL DEFAULT 'Menunggu',
  `payment_status` enum('belum_bayar','pending_verifikasi','lunas','ditolak') NOT NULL DEFAULT 'belum_bayar',
  `payment_method` varchar(100) DEFAULT NULL,
  `external_id` varchar(100) DEFAULT NULL COMMENT 'ID dari payment gateway atau resi',
  `source` varchar(50) NOT NULL DEFAULT 'ngolab' COMMENT 'Sumber pesanan: ngolab, coworking, smart_tag_qr',
  `external_api_client_id` varchar(100) DEFAULT NULL,
  `outlet` varchar(50) NOT NULL DEFAULT 'ngolab',
  `amount_paid` int(11) NOT NULL DEFAULT 0,
  `change_amount` int(11) NOT NULL DEFAULT 0,
  `order_type` varchar(30) NOT NULL DEFAULT 'regular',
  `preorder_campaign_id` varchar(50) DEFAULT NULL,
  `payment_timing` varchar(30) DEFAULT NULL,
  `fulfillment_at` datetime DEFAULT NULL,
  `preorder_status` varchar(30) DEFAULT NULL,
  `picked_up_at` datetime DEFAULT NULL,
  `payment_proof` varchar(500) DEFAULT NULL COMMENT 'Path file bukti transfer',
  `payment_proof_url` varchar(500) DEFAULT NULL,
  `payment_proof_uploaded_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `destination_label`, `user_id`, `customer_name`, `customer_phone`, `invoice_number`, `total_price`, `status`, `payment_status`, `payment_method`, `external_id`, `source`, `external_api_client_id`, `outlet`, `amount_paid`, `change_amount`, `order_type`, `preorder_campaign_id`, `payment_timing`, `fulfillment_at`, `preorder_status`, `picked_up_at`, `payment_proof`, `payment_proof_url`, `payment_proof_uploaded_at`, `created_at`, `updated_at`) VALUES
('1779571383504', NULL, NULL, 'REX', NULL, 'INV-383', 23000, 'Selesai', 'lunas', 'Tunai', 'MANUAL', 'ngolab', NULL, 'ngolab', 23000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-23 21:23:03', '2026-08-31 04:02:55'),
('1780506715682', NULL, NULL, 'RexxC', NULL, 'INV-353', 23000, 'Selesai', 'lunas', 'Tunai', 'MANUAL', 'coworking', NULL, 'coworking', 23000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-06-03 17:11:55', '2026-08-31 04:02:55'),
('1780507471498', NULL, NULL, 'REEXS', NULL, 'INV-321', 23000, 'Selesai', 'lunas', 'Transfer', 'MANUAL', 'coworking', NULL, 'coworking', 23000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-06-03 17:24:31', '2026-08-31 04:02:55'),
('1780654882431', NULL, NULL, 'rex', NULL, 'INV-012', 23000, 'Selesai', 'lunas', 'QRIS', 'MANUAL', 'coworking', NULL, 'coworking', 23000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-06-05 10:21:22', '2026-08-31 04:02:55'),
('1780672575590', NULL, NULL, 'dada', NULL, 'INV-897', 69000, 'Selesai', 'lunas', 'Tunai', 'MANUAL', 'coworking', NULL, 'coworking', 69000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-06-05 15:16:15', '2026-08-31 04:02:55'),
('1780677241520', NULL, NULL, 'v', NULL, 'INV-687', 23000, 'Selesai', 'lunas', 'Tunai', 'MANUAL', 'coworking', NULL, 'coworking', 23000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-06-05 16:34:01', '2026-08-31 04:02:55'),
('1780677646755', NULL, NULL, 'm', NULL, 'INV-630', 37000, 'Selesai', 'lunas', 'Tunai', 'MANUAL', 'coworking', NULL, 'coworking', 37000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-06-05 16:40:46', '2026-08-31 04:02:55'),
('1780677837483', NULL, NULL, 'gd', NULL, 'INV-769', 83000, 'Selesai', 'lunas', 'Tunai', 'MANUAL', 'coworking', NULL, 'coworking', 83000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-06-05 16:43:57', '2026-08-31 04:02:55'),
('1780677945714', NULL, NULL, 'r', NULL, 'INV-946', 37000, 'Selesai', 'lunas', 'Transfer', 'MANUAL', 'coworking', NULL, 'coworking', 37000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-06-05 16:45:45', '2026-08-31 04:02:55'),
('1780678226251', NULL, NULL, 'm', NULL, 'INV-951', 37000, 'Selesai', 'lunas', 'Tunai', 'MANUAL', 'coworking', NULL, 'coworking', 37000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-06-05 16:50:26', '2026-08-31 04:02:55'),
('1780680371181', NULL, NULL, 'gf', NULL, 'INV-055', 37000, 'Selesai', 'lunas', 'Tunai', 'MANUAL', 'coworking', NULL, 'coworking', 37000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-06-05 17:26:11', '2026-08-31 04:02:55'),
('1788141051524', NULL, NULL, 'redd', NULL, 'INV-457', 14000, 'Selesai', 'lunas', 'QRIS', 'MANUAL', 'coworking', NULL, 'coworking', 14000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-08-31 01:50:51', '2026-08-31 04:02:55'),
('1788141093734', NULL, NULL, 'wer', NULL, 'INV-678', 15000, 'Selesai', 'lunas', 'Tunai', 'MANUAL', 'ngolab', NULL, 'ngolab', 15000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-08-31 01:51:33', '2026-08-31 04:02:55'),
('1788141526093', NULL, 'user-1780648444622', 'Ahmad Fauzi Fore Test', NULL, 'INV-882', 15000, 'Selesai', 'lunas', 'E-Wallet (Dana)', 'SIM-1788141526093', 'ngolab', NULL, 'ngolab', 15000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-08-31 01:58:46', '2026-08-31 04:02:55'),
('1788142618967', NULL, NULL, 'zx', NULL, 'INV-583', 23000, 'Selesai', 'lunas', 'Tunai', 'MANUAL', 'coworking', NULL, 'coworking', 23000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-08-31 02:16:58', '2026-08-31 04:02:55'),
('1789004693998', NULL, NULL, 'dada', NULL, 'INV-219', 37000, 'Selesai', 'lunas', 'QRIS', 'MANUAL', 'manual', NULL, 'coworking', 37000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-10 01:44:53', '2026-09-10 07:12:29'),
('1789005727590', NULL, NULL, 'trtr', NULL, 'INV-573', 14000, 'Selesai', 'belum_bayar', 'QRIS', 'MANUAL', 'manual', NULL, 'coworking', 0, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-10 02:02:07', '2026-09-10 07:12:31'),
('1789005885745', NULL, NULL, 'kook', NULL, 'INV-301', 28000, 'Selesai', 'belum_bayar', 'QRIS', 'MANUAL', 'manual', NULL, 'coworking', 0, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-10 02:04:45', '2026-09-10 07:12:35'),
('1789005920708', NULL, NULL, 'ooollp', NULL, 'INV-907', 69000, 'Selesai', 'lunas', 'Tunai', 'MANUAL', 'manual', NULL, 'coworking', 69000, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-10 02:05:20', '2026-09-10 07:12:47'),
('1789012944341', NULL, NULL, 'rere', NULL, 'INV-678', 46000, 'siap', 'belum_bayar', 'Tunai', 'MANUAL', 'manual', NULL, 'coworking', 0, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-10 04:02:24', '2026-09-10 07:12:48'),
('1789024380706', NULL, NULL, 'nuhh', NULL, 'INV-436', 92000, 'Menunggu', 'belum_bayar', 'Tunai', 'MANUAL', 'manual', NULL, 'coworking', 0, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-10 07:13:00', '2026-09-10 07:13:00'),
('1789024487705', NULL, '7049509454', 'ahamd', NULL, 'INV-085', 30000, 'Menunggu', 'belum_bayar', 'Transfer Bank (BCA)', 'SIM-1789024487705', 'ngolab', NULL, 'ngolab', 0, 0, 'regular', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-09-10 07:14:47', '2026-09-10 07:14:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `menu_id` varchar(50) DEFAULT NULL COMMENT 'ID menu dari external API teman (opsional)',
  `menu_name` varchar(200) DEFAULT NULL,
  `item_name` varchar(200) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `note` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL DEFAULT 0 COMMENT 'Snapshot harga satuan saat dibeli',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `preorder_item_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `menu_id`, `menu_name`, `item_name`, `quantity`, `note`, `price`, `created_at`, `preorder_item_id`) VALUES
(8, '1779571383504', 'ext-1779568926193', 'Ayam Bakar', 'Ayam Bakar', 1, NULL, 23000, '2026-05-23 21:23:03', NULL),
(9, '1780506715682', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 1, NULL, 23000, '2026-06-03 17:11:55', NULL),
(10, '1780507471498', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 1, NULL, 23000, '2026-06-03 17:24:31', NULL),
(11, '1780654882431', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 1, NULL, 23000, '2026-06-05 10:21:22', NULL),
(12, '1780672575590', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 3, NULL, 23000, '2026-06-05 15:16:15', NULL),
(13, '1780677241520', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 1, NULL, 23000, '2026-06-05 16:34:01', NULL),
(14, '1780677646755', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 1, NULL, 23000, '2026-06-05 16:40:46', NULL),
(15, '1780677646755', '1780673324565', 'Nasi goreng Gila', 'Nasi goreng Gila', 1, NULL, 14000, '2026-06-05 16:40:46', NULL),
(16, '1780677837483', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 3, NULL, 23000, '2026-06-05 16:43:57', NULL),
(17, '1780677837483', '1780673324565', 'Nasi goreng Gila', 'Nasi goreng Gila', 1, NULL, 14000, '2026-06-05 16:43:57', NULL),
(18, '1780677945714', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 1, NULL, 23000, '2026-06-05 16:45:45', NULL),
(19, '1780677945714', '1780673324565', 'Nasi goreng Gila', 'Nasi goreng Gila', 1, NULL, 14000, '2026-06-05 16:45:45', NULL),
(20, '1780678226251', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 1, NULL, 23000, '2026-06-05 16:50:26', NULL),
(21, '1780678226251', '1780673324565', 'Nasi goreng Gila', 'Nasi goreng Gila', 1, NULL, 14000, '2026-06-05 16:50:26', NULL),
(22, '1780680371181', '1780673324565', 'Nasi goreng Gila', 'Nasi goreng Gila', 1, NULL, 14000, '2026-06-05 17:26:11', NULL),
(23, '1780680371181', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 1, NULL, 23000, '2026-06-05 17:26:11', NULL),
(30, '1788141051524', '1780673324565', 'Nasi goreng Gila', 'Nasi goreng Gila', 1, NULL, 14000, '2026-08-31 01:50:51', NULL),
(31, '1788141093734', '1779568926193', 'Unknown', 'Unknown', 1, NULL, 0, '2026-08-31 01:51:33', NULL),
(32, '1788141093734', '1781626170670', 'nasi goreng', 'nasi goreng', 1, NULL, 15000, '2026-08-31 01:51:33', NULL),
(33, '1788141526093', '1781626170670', 'nasi goreng', 'nasi goreng', 1, NULL, 15000, '2026-08-31 01:58:46', NULL),
(36, '1788142618967', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 1, NULL, 23000, '2026-08-31 02:16:58', NULL),
(42, '1789004693998', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 1, NULL, 23000, '2026-09-10 01:44:53', NULL),
(43, '1789004693998', '1780673324565', 'Nasi goreng Gila', 'Nasi goreng Gila', 1, NULL, 14000, '2026-09-10 01:44:54', NULL),
(45, '1789005727590', '1780673324565', 'Nasi goreng Gila', 'Nasi goreng Gila', 1, NULL, 14000, '2026-09-10 02:02:07', NULL),
(46, '1789005885745', '1781605403131', 'estehh manis', 'estehh manis', 4, NULL, 7000, '2026-09-10 02:04:45', NULL),
(47, '1789005920708', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 3, NULL, 23000, '2026-09-10 02:05:20', NULL),
(48, '1789012944341', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 2, NULL, 23000, '2026-09-10 04:02:24', NULL),
(49, '1789024380706', '1779568926193', 'Ayam Bakar', 'Ayam Bakar', 4, NULL, 23000, '2026-09-10 07:13:00', NULL),
(50, '1789024487705', '1781626170670', 'nasi goreng', 'nasi goreng', 1, NULL, 15000, '2026-09-10 07:14:47', NULL),
(51, '1789024487705', '1781703956232', 'Menu Uji Katalon 1781703940262', 'Menu Uji Katalon 1781703940262', 1, NULL, 15000, '2026-09-10 07:14:47', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `patungan_contributions`
--

CREATE TABLE `patungan_contributions` (
  `id` int(11) NOT NULL,
  `room_id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `amount` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `patungan_contributions`
--

INSERT INTO `patungan_contributions` (`id`, `room_id`, `user_id`, `amount`, `created_at`) VALUES
(1, 'room-1', 'u-1781625191785', 20, '2026-06-16 15:53:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `patungan_rooms`
--

CREATE TABLE `patungan_rooms` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `target_amount` int(11) NOT NULL,
  `current_amount` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `patungan_rooms`
--

INSERT INTO `patungan_rooms` (`id`, `title`, `target_amount`, `current_amount`, `created_at`) VALUES
('room-1', 'Patungan Buku Perpustakaan Baru', 50000, 20, '2026-06-16 15:51:14'),
('room-2', 'Sumbangan Wi-Fi Coworking Space', 100000, 0, '2026-06-16 15:51:14'),
('room-3', 'Donasi Event Himpunan Mahasiswa', 150000, 0, '2026-06-16 15:51:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1 = diputar saat idle jika tidak ada jadwal',
  `loop_mode` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1 = putar ulang terus',
  `total_duration` int(11) NOT NULL DEFAULT 0 COMMENT 'Total durasi semua item (detik)',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `description`, `is_default`, `loop_mode`, `total_duration`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Playlist Promosi Utama', 'Playlist default saat layar idle', 1, 1, 0, 1, '2026-05-14 19:54:04', '2026-05-14 19:54:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `playlist_items`
--

CREATE TABLE `playlist_items` (
  `id` int(11) NOT NULL,
  `playlist_id` int(11) NOT NULL,
  `media_id` int(11) NOT NULL,
  `order_index` int(11) NOT NULL DEFAULT 0,
  `duration_override` int(11) DEFAULT NULL COMMENT 'NULL = pakai durasi dari media_files',
  `transition` enum('fade','slide','zoom','none') NOT NULL DEFAULT 'fade',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `preorder_campaigns`
--

CREATE TABLE `preorder_campaigns` (
  `id` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `outlet` enum('ngolab','coworking') NOT NULL,
  `order_start_at` datetime NOT NULL,
  `order_deadline_at` datetime NOT NULL,
  `service_at` datetime NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `kds_released_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `preorder_campaigns`
--

INSERT INTO `preorder_campaigns` (`id`, `name`, `description`, `outlet`, `order_start_at`, `order_deadline_at`, `service_at`, `is_active`, `kds_released_at`, `created_at`, `updated_at`) VALUES
('6865aa3c-83bc-4627-adbd-5ff62efdf099', 'PO Jum\'at Berkeah', 'sasasasass', 'ngolab', '2026-09-01 13:06:00', '2026-09-05 13:06:00', '2026-09-07 12:07:00', 1, NULL, '2026-08-31 06:08:41', '2026-09-10 08:09:19'),
('90bee6ac-560c-4557-bbb4-0340a56a725a', 'TEST', 'DDMFDFDF', 'ngolab', '2026-09-10 15:05:00', '2026-09-19 15:08:00', '2026-09-25 13:04:00', 1, NULL, '2026-09-10 08:06:08', '2026-09-10 08:06:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `preorder_items`
--

CREATE TABLE `preorder_items` (
  `id` varchar(50) NOT NULL,
  `campaign_id` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'PO',
  `price` int(11) NOT NULL,
  `quota_total` int(11) NOT NULL,
  `quota_sold` int(11) NOT NULL DEFAULT 0,
  `image_url` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `preorder_items`
--

INSERT INTO `preorder_items` (`id`, `campaign_id`, `name`, `category`, `price`, `quota_total`, `quota_sold`, `image_url`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
('407e9cbc-8cc1-4cd9-a250-957d232f55d9', '90bee6ac-560c-4557-bbb4-0340a56a725a', 'Mie Dok Dok', 'PO', 17000, 30, 0, '/uploads/preorders/preorder-51e5f9f6-893d-41a9-9e23-ad27508bdea5.png', '', 1, '2026-09-10 08:06:08', '2026-09-10 08:06:08'),
('cedd48ab-fba8-43b7-8ed5-14f16dcbfe5c', '6865aa3c-83bc-4627-adbd-5ff62efdf099', 'Nasi Padang', 'PO', 15000, 10, 0, '', '', 1, '2026-08-31 06:08:41', '2026-08-31 06:08:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `recipe_ingredients`
--

CREATE TABLE `recipe_ingredients` (
  `menu_name` varchar(200) NOT NULL,
  `outlet` varchar(50) NOT NULL DEFAULT 'ngolab',
  `ingredient_id` varchar(50) NOT NULL,
  `amount` decimal(12,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `recipe_ingredients`
--

INSERT INTO `recipe_ingredients` (`menu_name`, `outlet`, `ingredient_id`, `amount`) VALUES
('Bakso Malang Komplit Ibu Sri', 'ngolab', 'ing-1', 0.50),
('Bakso Malang Komplit Ibu Sri', 'ngolab', 'ing-3', 3.00),
('Bakso Malang Komplit Ibu Sri', 'ngolab', 'ing-5', 2.00),
('Bakso Malang Komplit Ibu Sri', 'ngolab', 'ing-6', 1.00),
('Bakso Malang Komplit Ibu Sri', 'ngolab', 'ing-8', 30.00),
('Batagor Ikan Bandung', 'ngolab', 'ing-5', 2.00),
('Batagor Ikan Bandung', 'ngolab', 'ing-6', 3.00),
('Mie Bakso Urat Super', 'ngolab', 'ing-1', 1.00),
('Mie Bakso Urat Super', 'ngolab', 'ing-3', 2.00),
('Mie Bakso Urat Super', 'ngolab', 'ing-4', 1.00),
('Mie Bakso Urat Super', 'ngolab', 'ing-7', 1.00),
('Mie Bakso Urat Super', 'ngolab', 'ing-8', 40.00),
('Mie Yamin Spesial Ayam', 'ngolab', 'ing-1', 1.00),
('Mie Yamin Spesial Ayam', 'ngolab', 'ing-2', 1.00),
('Mie Yamin Spesial Ayam', 'ngolab', 'ing-7', 1.00),
('Mie Yamin Spesial Ayam', 'ngolab', 'ing-8', 50.00),
('Nasi Ayam Geprek Level 3', 'ngolab', 'ing-8', 20.00),
('Siomay Bandung Asli', 'ngolab', 'ing-6', 5.00);

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `playlist_id` int(11) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `days_of_week` varchar(100) NOT NULL DEFAULT '["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]' COMMENT 'JSON array hari berlaku',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `priority` int(11) NOT NULL DEFAULT 1 COMMENT 'Lebih tinggi = menang konflik',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `screen_playlists`
--

CREATE TABLE `screen_playlists` (
  `id` int(11) NOT NULL,
  `screen_id` int(11) NOT NULL,
  `playlist_id` int(11) NOT NULL,
  `schedule_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `shifts`
--

CREATE TABLE `shifts` (
  `id` int(11) NOT NULL,
  `staff_id` varchar(50) NOT NULL,
  `shift_type` varchar(50) NOT NULL,
  `time` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `shifts`
--

INSERT INTO `shifts` (`id`, `staff_id`, `shift_type`, `time`, `date`, `created_at`) VALUES
(1, 'S694', 'Pagi', '08:00 - 16:00', '2026-06-05', '2026-06-05 15:08:04'),
(2, 'S792-4498', 'Full Day', '08:00 - 16:00', '2026-06-05', '2026-06-05 15:17:15'),
(3, 'S792-4498', 'Full Day', '08:00 - 16:00', '2026-08-31', '2026-08-31 02:21:16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `staff`
--

CREATE TABLE `staff` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` enum('Super Admin','Admin','Kasir','Koki','Support') NOT NULL DEFAULT 'Kasir',
  `email` varchar(150) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `password_plain` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `staff`
--

INSERT INTO `staff` (`id`, `name`, `role`, `email`, `phone`, `password_hash`, `password_plain`, `status`, `created_at`, `updated_at`) VALUES
('S001', 'Admin Tangolab', 'Super Admin', 'admin@gmail.com', '08111111', '$2b$12$FNEjfNNBsKhw6h2nd36jAu31u1LC0ZgyxesVjYNtdRrgcx9G2c0gC', NULL, 'active', '2026-06-05 10:55:54', '2026-08-31 01:36:10'),
('S002', 'Kasir Tangolab', 'Kasir', 'kasir@gmail.com', '08222222', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', NULL, 'active', '2026-06-05 10:55:54', '2026-06-05 10:55:54'),
('S003', 'Koki Tangolab', 'Koki', 'koki@gmail.com', '08333333', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', NULL, 'active', '2026-06-05 10:55:54', '2026-06-05 10:55:54'),
('S694', 'Fahreza Azhar', 'Kasir', 'bagusazhareko@gmail.com', '086869896', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', NULL, 'active', '2026-06-05 14:50:54', '2026-06-05 14:50:54'),
('S792-4498', 'fahreza ', 'Kasir', 'reza@gmail.com', '0819273724', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', NULL, 'active', '2026-06-05 15:15:34', '2026-06-05 15:15:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `study_sessions`
--

CREATE TABLE `study_sessions` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `points_earned` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `study_sessions`
--

INSERT INTO `study_sessions` (`id`, `user_id`, `subject`, `duration_minutes`, `points_earned`, `created_at`) VALUES
(1, 'u-1781625191785', 'Kalkulus II', 90, 45, '2026-06-16 15:53:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `nim` varchar(50) DEFAULT NULL,
  `coin_balance` int(11) NOT NULL DEFAULT 0,
  `avatar_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `rfid_tag_id` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'Pelanggan',
  `password_hash` varchar(255) DEFAULT NULL,
  `password_plain` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `nim`, `coin_balance`, `avatar_url`, `created_at`, `updated_at`, `rfid_tag_id`, `email`, `phone`, `role`, `password_hash`, `password_plain`) VALUES
('607012400054', 'ahmad husen', '607012400054', 400, 'https://picsum.photos/seed/607012400054/100/100', '2026-06-01 16:05:13', '2026-06-01 16:06:01', NULL, NULL, NULL, 'Pelanggan', NULL, NULL),
('7049509454', 'ahamd', '7049509454', 100, 'https://picsum.photos/seed/7049509454/100/100', '2026-06-17 11:59:13', '2026-06-17 11:59:13', NULL, 'ahmad@gmail.com', '584837432', 'Pelanggan', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', NULL),
('u-1781625191785', 'Bagus Mahasiswa', '081234567890', 125, 'https://picsum.photos/seed/u-1781625191785/100/100', '2026-06-16 15:53:11', '2026-06-16 15:53:11', NULL, NULL, '081234567890', 'Pelanggan', NULL, NULL),
('user-1780648444622', 'Ahmad Fauzi Fore Test', 'NIM-771', 1600, 'https://picsum.photos/seed/user-1780648444622/100/100', '2026-06-05 08:34:04', '2026-08-31 02:18:12', NULL, NULL, NULL, 'Pelanggan', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_vouchers`
--

CREATE TABLE `user_vouchers` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `promo_id` varchar(50) NOT NULL,
  `voucher_code` varchar(100) NOT NULL,
  `status` enum('unused','used') NOT NULL DEFAULT 'unused',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `api_keys`
--
ALTER TABLE `api_keys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_api_keys_hash` (`key_hash`),
  ADD KEY `idx_api_keys_active` (`is_active`,`created_at`);

--
-- Indeks untuk tabel `app_settings`
--
ALTER TABLE `app_settings`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `coin_promos`
--
ALTER TABLE `coin_promos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `promo_code` (`promo_code`);

--
-- Indeks untuk tabel `coin_transactions`
--
ALTER TABLE `coin_transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_coin_transactions_order_reward` (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `promo_id` (`promo_id`);

--
-- Indeks untuk tabel `digital_screens`
--
ALTER TABLE `digital_screens`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `display_logs`
--
ALTER TABLE `display_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `screen_id` (`screen_id`),
  ADD KEY `media_id` (`media_id`),
  ADD KEY `playlist_id` (`playlist_id`);

--
-- Indeks untuk tabel `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_inventory_barcode_outlet` (`barcode`,`outlet`),
  ADD UNIQUE KEY `uniq_inventory_sku_outlet` (`sku`,`outlet`);

--
-- Indeks untuk tabel `inventory_movements`
--
ALTER TABLE `inventory_movements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_inventory_movements_item` (`ingredient_id`,`created_at`),
  ADD KEY `idx_inventory_movements_reference` (`reference_type`,`reference_id`),
  ADD KEY `idx_inventory_movements_outlet` (`outlet`,`created_at`);

--
-- Indeks untuk tabel `media_files`
--
ALTER TABLE `media_files`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_orders_payment_proof_url` (`payment_proof_url`),
  ADD KEY `idx_orders_payment_proof` (`payment_proof`),
  ADD KEY `idx_orders_external_api_client` (`external_api_client_id`);

--
-- Indeks untuk tabel `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indeks untuk tabel `patungan_contributions`
--
ALTER TABLE `patungan_contributions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_id` (`room_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `patungan_rooms`
--
ALTER TABLE `patungan_rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `playlist_items`
--
ALTER TABLE `playlist_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playlist_id` (`playlist_id`),
  ADD KEY `media_id` (`media_id`);

--
-- Indeks untuk tabel `preorder_campaigns`
--
ALTER TABLE `preorder_campaigns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_preorder_window` (`outlet`,`is_active`,`order_start_at`,`order_deadline_at`),
  ADD KEY `idx_preorder_service` (`service_at`);

--
-- Indeks untuk tabel `preorder_items`
--
ALTER TABLE `preorder_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_preorder_items_campaign` (`campaign_id`,`is_active`);

--
-- Indeks untuk tabel `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD PRIMARY KEY (`menu_name`,`outlet`,`ingredient_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indeks untuk tabel `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playlist_id` (`playlist_id`);

--
-- Indeks untuk tabel `screen_playlists`
--
ALTER TABLE `screen_playlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `screen_id` (`screen_id`),
  ADD KEY `playlist_id` (`playlist_id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indeks untuk tabel `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indeks untuk tabel `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `study_sessions`
--
ALTER TABLE `study_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rfid_tag_id` (`rfid_tag_id`),
  ADD UNIQUE KEY `uniq_users_email` (`email`);

--
-- Indeks untuk tabel `user_vouchers`
--
ALTER TABLE `user_vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `voucher_code` (`voucher_code`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `promo_id` (`promo_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `api_keys`
--
ALTER TABLE `api_keys`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=276;

--
-- AUTO_INCREMENT untuk tabel `digital_screens`
--
ALTER TABLE `digital_screens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `display_logs`
--
ALTER TABLE `display_logs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `inventory_movements`
--
ALTER TABLE `inventory_movements`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `media_files`
--
ALTER TABLE `media_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT untuk tabel `patungan_contributions`
--
ALTER TABLE `patungan_contributions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `playlist_items`
--
ALTER TABLE `playlist_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `screen_playlists`
--
ALTER TABLE `screen_playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `shifts`
--
ALTER TABLE `shifts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `study_sessions`
--
ALTER TABLE `study_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `coin_transactions`
--
ALTER TABLE `coin_transactions`
  ADD CONSTRAINT `coin_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `coin_transactions_ibfk_2` FOREIGN KEY (`promo_id`) REFERENCES `coin_promos` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `display_logs`
--
ALTER TABLE `display_logs`
  ADD CONSTRAINT `display_logs_ibfk_1` FOREIGN KEY (`screen_id`) REFERENCES `digital_screens` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `display_logs_ibfk_2` FOREIGN KEY (`media_id`) REFERENCES `media_files` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `display_logs_ibfk_3` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `inventory_movements`
--
ALTER TABLE `inventory_movements`
  ADD CONSTRAINT `fk_inventory_movements_item` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`);

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `patungan_contributions`
--
ALTER TABLE `patungan_contributions`
  ADD CONSTRAINT `patungan_contributions_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `patungan_rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `patungan_contributions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `playlist_items`
--
ALTER TABLE `playlist_items`
  ADD CONSTRAINT `playlist_items_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `playlist_items_ibfk_2` FOREIGN KEY (`media_id`) REFERENCES `media_files` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `preorder_items`
--
ALTER TABLE `preorder_items`
  ADD CONSTRAINT `fk_preorder_items_campaign` FOREIGN KEY (`campaign_id`) REFERENCES `preorder_campaigns` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `recipe_ingredients`
--
ALTER TABLE `recipe_ingredients`
  ADD CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `screen_playlists`
--
ALTER TABLE `screen_playlists`
  ADD CONSTRAINT `screen_playlists_ibfk_1` FOREIGN KEY (`screen_id`) REFERENCES `digital_screens` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `screen_playlists_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `screen_playlists_ibfk_3` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `shifts`
--
ALTER TABLE `shifts`
  ADD CONSTRAINT `shifts_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `study_sessions`
--
ALTER TABLE `study_sessions`
  ADD CONSTRAINT `study_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_vouchers`
--
ALTER TABLE `user_vouchers`
  ADD CONSTRAINT `user_vouchers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_vouchers_ibfk_2` FOREIGN KEY (`promo_id`) REFERENCES `coin_promos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
