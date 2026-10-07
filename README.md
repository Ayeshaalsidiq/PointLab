# 🌟 PointLab

![PointLab Banner](https://img.shields.io/badge/Status-Active-success.svg) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) 

**PointLab** adalah sebuah *Mobile-First Web Application* bergaya premium yang dirancang sebagai platform **Sistem Keanggotaan & Loyalitas Pelanggan (Membership & Loyalty Program)**. Aplikasi ini memberikan pengalaman *user interface* (UI) yang memanjakan mata melalui implementasi *Glassmorphism*, gradien warna yang elegan, serta interaksi yang *smooth* layaknya aplikasi *mobile native* kelas atas (seperti Starbucks Rewards atau Grab).

## ✨ Fitur Utama

- 📊 **Dashboard Interaktif**: Halaman beranda yang menampilkan *banner* promosi dengan *auto-sliding carousel*, kartu progres keanggotaan, aksi cepat (*Quick Actions*), serta ringkasan aktivitas pengguna.
- 🎁 **Promo & Penukaran (Redeem)**: Katalog *voucher* terintegrasi di mana pengguna dapat menukarkan poin loyalitas mereka dengan berbagai diskon, *cashback*, hingga tiket hiburan. Dilengkapi dengan kolom penukaran *Promo Code* berdesain bersih.
- 🎟️ **Manajemen Voucher (Promo Detail)**: Pengalaman layar penuh (fullscreen) bergaya premium saat membuka detail voucher yang diklaim. Lengkap dengan tampilan QR Code, kode unik, masa berlaku, serta syarat & ketentuan penukaran.
- 💾 **Sistem Penyimpanan Lokal (Local Storage)**: Poin pengguna dan riwayat klaim voucher secara otomatis disimpan dengan aman di memori *browser*. Data Anda tidak akan hilang meskipun halaman di-*refresh* atau browser ditutup.
- 💳 **Profil Premium (Membership)**: Menampilkan kartu keanggotaan *floating* (melayang) bergaya 3D yang sangat premium, memperlihatkan status *Tier* (misal: Sobat Jajan, Duta Kantin, dll), saldo poin, dan menu pengaturan ala iOS.
- 📱 **Mobile-First Design**: Struktur kode HTML/CSS dirancang khusus agar merespons secara sempurna dan presisi pada perangkat ponsel pintar (tanpa area kosong terpotong).

## 🛠️ Teknologi yang Digunakan

- **React.js**: Library JavaScript untuk membangun antarmuka pengguna berbasis komponen.
- **Vite**: *Build-tool* super cepat yang mendukung pengembangan React.
- **Lucide-React**: Kumpulan set ikon SVG yang indah dan konsisten untuk navigasi.
- **Vanilla CSS (Custom)**: Menggunakan CSS murni yang dioptimalkan untuk efek *glassmorphism*, gradasi warna *modern*, *flexbox*, dan animasi CSS tanpa bergantung pada *framework* eksternal seperti Tailwind (untuk kontrol gaya 100%).

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan **PointLab** di komputer lokal Anda:

1. **Clone Repositori**
   ```bash
   git clone https://github.com/Ayeshaalsidiq/PointLab.git
   cd PointLab
   ```

2. **Instal Dependensi**
   Pastikan Anda telah menginstal [Node.js](https://nodejs.org/). Lalu jalankan:
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan Lokal**
   ```bash
   npm run dev
   ```

4. **Buka di Browser**
   Buka URL yang muncul di terminal (biasanya `http://localhost:5173`) dan nikmati pengalamannya. *Disarankan untuk melihat melalui mode inspect (Mobile View) di browser Anda untuk pengalaman terbaik.*

## 🎨 Konsep Desain (UI/UX)

- **Dark-to-Light Canvas**: Memanfaatkan latar belakang gelap (`#1A1B27`) di bagian *Header* untuk memancarkan aura eksklusif, lalu bertransisi mulus ke area kertas melengkung (`border-radius`) putih solid untuk menyajikan konten agar tetap bersih dan mudah dibaca.
- **No Overlapping Clutter**: Semua elemen kartu dihitung ketat menggunakan parameter Flexbox (`flex: 1`, `flexShrink: 0`) untuk memastikan teks tidak saling tabrak di layar-layar terkecil sekalipun.

---
*Dibuat dengan ❤️ untuk pengalaman membership yang memukau.*
