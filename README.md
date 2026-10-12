# 🌟 PointLab — Smart Membership & Loyalty App

[![Status](https://img.shields.io/badge/Status-Active-success.svg)](https://github.com/Ayeshaalsidiq/PointLab)
[![React](https://img.shields.io/badge/React-18-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Lucide Icons](https://img.shields.io/badge/Icons-Lucide--React-F59E0B?style=flat&logo=feather&logoColor=white)](https://lucide.dev/)
[![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini_&_RAG-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**PointLab** adalah aplikasi web *Mobile-First & Responsive* modern berbasis **React + Vite** yang dirancang sebagai platform **Sistem Keanggotaan, Loyalitas, dan Asisten Cerdas (Membership, Loyalty & AI Assistant)** resmi untuk kantin modern **WarmingUp / Ngolab** di **Lantai 4 FIT (Fakultas Ilmu Terapan), Telkom University**.

Aplikasi ini menyajikan estetika premium bergaya *Dark Glassmorphism* yang berpadu dengan aksen warna oranye enerjik (`#FF7A03`) dan biru modern (`#3B82F6`), serta interaksi *micro-animation* halus layaknya aplikasi *mobile native* kelas dunia.

---

## 🎯 Fitur Unggulan

### 🤖 1. Ngolab AI Chat Assistant (RAG & Gemini Integration)
- **Hybrid Knowledge Engine:** Mengombinasikan arsitektur *Retrieval-Augmented Generation (RAG)* dan *Google Gemini AI* yang dilengkapi dengan *fallback resolver* lokal super akurat.
- **Informasi Lengkap WarmingUp:** Menjawab seputar menu resmi (*Ayam Bakar, Nasi Goreng Gila, Es Teh Manis*), harga, jam operasional, lokasi Lantai 4 FIT, cara memesan via Kiosk Sensor Gestur atau kasir, pembayaran QRIS/Tunai, hingga program kerja sama sewa tempat rapat & cashback tunai.
- **Multi-Session Management:** Pengguna dapat membuat percakapan baru, beralih antar sesi obrolan lama melalui *drawer* riwayat obrolan, menyalin respon AI, atau menghapus sesi.
- **Konfirmasi Aman (Data Loss Prevention):** Tombol *Bersihkan Semua Riwayat* dilengkapi modal konfirmasi pop-up custom untuk mencegah riwayat terhapus secara tidak sengaja.

### 💳 2. Sistem Tier Keanggotaan Dinamis (Loyalty Tiers)
Sistem otomatis mengalkulasi dan menaikkan level keanggotaan berdasarkan saldo koin dan poin akumulasi:
| Tier | Nama Tier | Syarat Poin | Keuntungan Utama |
| :---: | :--- | :--- | :--- |
| **0** | **Classmate** | 0 – 5.000 Poin | 1x Poin transaksi, Akses promo bulanan, Minuman selamat datang gratis |
| **1** | **Study Buddy** | 5.001 – 15.000 Poin | 1.2x Poin transaksi, Upsize minuman 1x/minggu gratis, Promo 2 hari lebih awal |
| **2** | **Campus Star** | 15.001 – 35.000 Poin | 1.5x Poin transaksi, Potongan 5% semua menu, Gratis Main Course saat Ultah |
| **3** | **Hall of Fame** | > 35.000 Poin (MAX) | 2x Lipat poin, Diskon 30% bulanan, Bonus kejutan mingguan gratis |

- Setiap tingkatan dilengkapi kartu keanggotaan 3D eksklusif, progress bar interaktif, serta panduan detail keuntungan di modal *Member Package*.

### 🎁 3. Katalog Promo & Penukaran Poin (Redeem System)
- **Tukar Poin Instan:** Tukarkan poin dengan aneka voucher diskon makanan, cashback, hingga tiket fasilitas kampus.
- **Auto-Generate Voucher Unik:** Setiap penukaran menghasilkan kode voucher unik, tanggal kedaluwarsa 30 hari, dan otomatis mengurangi saldo poin secara real-time.
- **Klaim Kode Promo:** Mendukung input kode promo khusus langsung (*misal: promo code dari campaign*).
- **Tab "Promo Saya":** Menampilkan seluruh voucher yang telah diklaim lengkap dengan QR Code siap-scan untuk digunakan di kasir.

### 👤 4. Profil & Manajemen Akun Terintegrasi
- **Identitas Digital:** Menampilkan kartu QR Code member untuk mempermudah identifikasi saat transaksi di Kiosk Gestur atau kasir.
- **Edit Profil Interaktif:** Kemudahan mengganti Nama Lengkap, Nomor Telepon, serta upload Foto Profil (Avatar).
- **Ganti Password:** Dilengkapi validasi keamanan (minimal 6 karakter & konfirmasi kecocokan) serta tombol toggle lihat/sembunyikan password (*Eye / EyeOff*).
- **Pusat Bantuan Resmi:** Tombol pintas bantuan langsung menuju WhatsApp Support resmi dan Instagram `@ngolabcafe`.

### 🔐 5. Autentikasi Pengguna
- Halaman Login & Registrasi terpadu dengan efek visual latar *ambient animated orbs*.
- Dukungan login menggunakan NIM atau Email kampus, pengingat *Keep me logged in*, serta validasi password.

---

## 🛠️ Tech Stack & Arsitektur MVC

PointLab mengadopsi arsitektur **Model-View-Controller (MVC)** berbasis server Node.js / Express untuk deployment yang stabil, reliabel, dan kompatibel dengan berbagai platform cloud:

| Lapisan MVC | Deskripsi & Komponen |
| :--- | :--- |
| **Model** (`models/`) | `userModel.js`, `coinModel.js`, `promoModel.js`, `chatModel.js` — Mengelola entitas data, logika saldo poin, tier status, kalkulasi reward, dan knowledge base RAG. |
| **View** (`views/` & `src/`) | Komponen visual antarmuka pengguna bergaya *Dark Glassmorphism*, animasi 3D kartu tier, ikon Lucide, dan template view per rute. |
| **Controller** (`controllers/`) | `authController.js`, `dashboardController.js`, `promoController.js`, `membershipController.js`, `chatController.js` — Memproses request HTTP, validasi, dan menghubungkan data Model ke View. |
| **Routing** (`routes/`) | `webRoutes.js` (navigasi multi-page) & `apiRoutes.js` (RESTful API terstruktur). |
| **Server Engine** (`server.js`) | Express.js Web Service sebagai entry point utama aplikasi. |

---

## 📁 Struktur Direktori Proyek (Arsitektur MVC)

```plaintext
PointLab/
├── controllers/             # [C] Lapisan Controller (Auth, Dashboard, Promo, Chat, Member)
│   ├── authController.js
│   ├── dashboardController.js
│   ├── promoController.js
│   ├── membershipController.js
│   └── chatController.js
├── models/                  # [M] Lapisan Model (User, Poin/Koin, Promo/Voucher, Knowledge Base)
│   ├── userModel.js
│   ├── coinModel.js
│   ├── promoModel.js
│   └── chatModel.js
├── views/                   # [V] Lapisan View (Template View Rendered)
│   └── index.html
├── routes/                  # [ROUTER] Pemetaan URL ke Controller
│   ├── webRoutes.js         # Rute halaman (/dashboard, /auth, /promo, /chat, dll)
│   └── apiRoutes.js         # Endpoint RESTful API (/api/*)
├── public/                  # File statis publik
├── src/                     # Core komponen UI, styling CSS & interaksi frontend
├── server.js                # Server Entry Point Utama (Express MVC)
├── gesture_eats (2).sql     # Skema database MySQL backend
├── package.json             # Startup script "start": "node server.js" & "main": "server.js"
└── README.md
```

---

## 🚀 Panduan Memulai (Quick Start)

### 1. Prasyarat
Pastikan komputer Anda telah terinstal:
- [Node.js](https://nodejs.org/) (versi 16.x atau lebih tinggi)
- Git

### 2. Kloning Repositori
```bash
git clone https://github.com/Ayeshaalsidiq/PointLab.git
cd PointLab
```

### 3. Instal Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment (Opsional untuk AI)
Buat file `.env` di root direktori jika ingin mengaktifkan API Gemini & RAG kustom:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_RAG_API_URL=your_rag_api_url_here
VITE_RAG_API_KEY=your_rag_api_key_here
VITE_RAG_KB_ID=your_kb_id_here
```

### 5. Jalankan Aplikasi
```bash
npm run dev
```
Buka browser di `http://localhost:5173`. *Untuk tampilan optimal, gunakan mode responsif (Mobile View) di browser inspect element.*

---

## 🔌 Spesifikasi Kebutuhan REST API Backend

Untuk rekan pengembang backend, berikut adalah ringkasan modul endpoint yang terintegrasi dengan PointLab:

| Modul | Method | Endpoint | Fungsi |
| :--- | :---: | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Pendaftaran akun baru |
| | `POST` | `/api/auth/login` | Login user & generate token JWT |
| **User & Profile** | `GET` | `/api/users/profile` | Ambil profil user & saldo koin |
| | `PUT` | `/api/users/profile` | Update nama & nomor telepon |
| | `PUT` | `/api/users/password` | Ganti password akun |
| | `POST` | `/api/users/avatar` | Upload foto profil baru |
| **Poin & Mutasi** | `GET` | `/api/coins/balance` | Saldo poin & akumulasi tier |
| | `GET` | `/api/coins/history` | Riwayat transaksi poin (`earn` / `redeem`) |
| **Promo & Voucher** | `GET` | `/api/promos` | Katalog voucher yang tersedia |
| | `POST` | `/api/promos/redeem` | Menukar koin dengan voucher |
| | `POST` | `/api/promos/claim-code` | Klaim kupon promo kode |
| | `GET` | `/api/vouchers/my-vouchers` | Daftar voucher milik user |
| **Menu & Order** | `GET` | `/api/menus` | Katalog menu makanan WarmingUp |
| | `GET` | `/api/orders/my-orders` | Riwayat pesanan makanan user |

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah lisensi **MIT**. Bebas dikembangkan dan dimodifikasi untuk keperluan pembelajaran dan pengembangan layanan WarmingUp / Ngolab Telkom University.

---

<p align="center">
  Dibuat dengan ❤️ untuk kemudahan dan kepuasan komunitas <b>WarmingUp / Ngolab FIT Telkom University</b>.
</p>
