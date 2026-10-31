# Panduan Lengkap Deployment Ekosistem NGOLAB di Server Kroombox Cloud Panel
### Deployment PointLab (`point.ngolab.online`) & NGOLAB-GAMI (`gami.ngolab.online`)
*(Berdasarkan Arsitektur Server Lab, Analisis 4 Screenshot Panel, dan Pemecahan Error 404)*

Dokumen ini memuat panduan komprehensif langkah demi langkah untuk meng-hosting **kedua proyek** pada panel server lab Kroombox Cloud Panel (`panel.kroombox.com/#create_site`):
1. **PointLab (`point.ngolab.online`)**: Pusat Autentikasi Tunggal (SSO Login & Register), Pengelola Loyalty Points, Database Membership, dan Katalog Penukaran Voucher.
2. **NGOLAB-GAMI (`gami.ngolab.online`)**: Platform Gamifikasi Mahasiswa, Mini Games Arcade, AI Study Coach, dan Konsumen Voucher Terintegrasi.

---

## 1. Analisis & Akar Masalah Error 404 pada PointLab

Berdasarkan 4 tangkapan layar (screenshot) panel Kroombox Anda, berikut adalah penyebab utama mengapa situs PointLab menampilkan **Error 404 Not Found**:

| No | Pengaturan di Panel (Screenshot) | Kesalahan Input / Konfigurasi | Solusi & Penjelasan Teknis |
| :--- | :--- | :--- | :--- |
| **1** | **Step 4: Backend Folder Location** | Terisi `src/` | `server.js` dan `package.json` berada di **Root Directory (`/`)**, bukan di `src/`. Akibatnya proses Node.js gagal menemukan file entrypoint dan crash saat dijalankan. Ubah menjadi `/` atau `.`. |
| **2** | **Step 4: Webroot Directory** | Terisi `dist` | `vite.config.js` PointLab awalnya menghasilkan output build ke `public/`. Nginx Kroombox mencari file di `dist/` sehingga melempar HTTP 404. Saat ini kami telah menambahkan plugin sinkronisasi otomatis agar folder `dist/` dan `public/` selalu terisi keduanya. |
| **3** | **Step 3: Relational Database** | Toggle Database **OFF (Abu-abu)** | `PointLab/server.js` menjalankan `initDb()` saat startup. Tanpa MySQL yang aktif dan `.env` yang terisi, backend crash karena gagal terhubung ke database. Aktifkan MySQL dan isi `.env`. |
| **4** | **Nginx Web Server Routing** | Tanpa SPA Rewrite Rule | PointLab menggunakan React SPA (`react-router-dom`). Saat membuka `/auth`, `/dashboard`, atau `/membership`, Nginx membutuhkan `try_files $uri $uri/ /index.html;` agar tidak menganggap rute tersebut sebagai folder fisik di disk. |

---

## 2. BAGIAN I: Deployment Proyek PointLab (`point.ngolab.online`)

PointLab berfungsi sebagai backend server sekaligus frontend manajemen poin & autentikasi terpusat.

### Step 1: Basic Information
1. **Domain Name**: `point.ngolab.online`
2. **Framework / Environment**: Pilih `Node.js`
3. **Node.js Version**: Pilih `v20.x` (LTS)
4. Klik **Next**

### Step 2: Source Code
1. **Repository Type**: Pilih `Git / GitHub`
2. **Repository URL**: Masukkan URL Git PointLab (misal: `https://github.com/Ayeshaalsidiq/PointLab.git`)
3. **Branch**: `Udin`
4. **Auto-Deploy on Git Push**: Aktifkan (ON)
5. Klik **Next**

### Step 3: Database MySQL & Environment Variables

#### A. Mengaktifkan Database MySQL
1. Geser toggle **"Use Relational Database"** ke **ON (Hijau / Aktif)**.
2. Tipe Database: Pilih **MySQL 8.0** (atau **MySQL 5.7**).
3. Buat nama database: `gesture_eats` (atau nama DB yang disediakan Kroombox).
4. Catat kredensial DB (Host, Port, User, Password).

#### B. Mengisi Environment Variables (.env) PointLab
Pada kolom **Environment Variables**, masukkan konfigurasi berikut:

```env
PORT=3000
NODE_ENV=production
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=gesture_eats
DB_USER=kroombox_db_user
DB_PASSWORD=kroombox_db_password
JWT_SECRET=ngolab_secret_key_pointlab_2026
VITE_POINTLAB_URL=https://point.ngolab.online
VITE_POINTLAB_AUTH_URL=https://point.ngolab.online/auth
ALLOWED_ORIGINS=https://gami.ngolab.online,https://point.ngolab.online,http://localhost:3000,http://localhost:3001
```
*(Sesuaikan `DB_USER` dan `DB_PASSWORD` dengan kredensial database Anda).*

5. Klik **Next**

### Step 4: Build & Deployment Settings PointLab

Pilih salah satu metode berikut:

#### OPSI A: Single Service / Monolith (SANGAT DIREKOMENDASIKAN)
Metode ini paling stabil karena file [`server.js`](file:///f:/College/PABW/Ngolab/PointLab/server.js) sudah menyajikan static frontend SPA, API backend, dan fallback anti-404 secara terpadu:
* **Project Architecture Type**: Pilih **Single Service / Monolith**
* **Root / Working Directory**: `/` (atau `.`)
* **Install Command**:
  ```bash
  npm install
  ```
* **Build Command**:
  ```bash
  npm run build
  ```
* **Start Command / Entry File**:
  ```bash
  node server.js
  ```
  *(atau isi Entry File: `server.js`)*
* **Port**: `3000`

---

#### OPSI B: Fullstack Multi-Service (2-in-1)
Jika memilih radio button **Fullstack Multi-Service (2-in-1)** seperti pada screenshot 4:
* **Frontend Settings**:
  * Frontend Code Folder Location: `/` (atau `.` — **JANGAN diisi `src/`!**)
  * Frontend Install Command: `npm install`
  * Frontend Build Command: `npm run build`
  * Webroot Directory / Static Files: `dist` *(atau `public`)*
* **Backend Settings**:
  * Backend Code Folder Location: `/` (atau `.` — **JANGAN diisi `src/`!**)
  * Backend Install Command: `npm install`
  * Backend Entry File: `server.js`
  * Backend Port: `3000`
  * Gateway Route Prefix: `/api`

### Step 5: Import Database SQL PointLab
1. Buka menu **Database** atau **phpMyAdmin** di Kroombox.
2. Buka database `gesture_eats`.
3. Buka tab **Import**, pilih file dump resmi yang sudah tersedia di repository PointLab:
   * File: `ngola_geasture_adm_dump.sql` (atau `gesture_eats_SQL_dump.sql`).
4. Klik **Go / Import**. Semua tabel `users`, `coins`, `promos`, `menus`, dan `loyalty_accounts` akan terisi data awal.

---

## 3. BAGIAN II: Deployment Proyek NGOLAB-GAMI (`gami.ngolab.online`)

NGOLAB-GAMI merupakan aplikasi web React + Vite yang dilengkapi server proxy Study Coach AI di [`server/index.mjs`](file:///f:/College/PABW/Ngolab/NGOLAB-GAMI/server/index.mjs).

### Step 1: Basic Information
1. Klik **Create Website** baru di panel Kroombox.
2. **Domain Name**: `gami.ngolab.online`
3. **Framework / Environment**: Pilih `Node.js`
4. **Node.js Version**: Pilih `v20.x` (LTS)
5. Klik **Next**

### Step 2: Source Code
1. **Repository Type**: Pilih `Git / GitHub`
2. **Repository URL**: Masukkan URL Git NGOLAB-GAMI (misal: `https://github.com/rizkynurdiansyahrn/NGOLAB-GAMI.git`)
3. **Branch**: `Udin`
4. **Auto-Deploy on Git Push**: Aktifkan (ON)
5. Klik **Next**

### Step 3: Database & Environment Variables NGOLAB-GAMI
* **"Use Relational Database"**: Biarkan **OFF (Abu-abu)**. NGOLAB-GAMI tidak mengakses MySQL secara langsung; semua data akun, poin, dan voucher diakses melalui API PointLab (`https://point.ngolab.online`).
* **Environment Variables (.env)**:
  ```env
  PORT=3001
  NODE_ENV=production
  VITE_API_BASE_URL=https://point.ngolab.online
  VITE_POINTLAB_URL=https://point.ngolab.online
  VITE_POINTLAB_AUTH_URL=https://point.ngolab.online/auth
  VITE_VOUCHER_URL=https://point.ngolab.online/promo
  RAG_API_URL=https://rag.aiones.app/api/v1
  RAG_API_KEY=
  ```
  *(Isi `RAG_API_KEY` jika menggunakan layanan AI Study Coach RAG).*

### Step 4: Build & Deployment Settings NGOLAB-GAMI
* **Project Architecture Type**: Pilih **Single Service / Monolith**
* **Root / Working Directory**: `/` (atau `.`)
* **Install Command**:
  ```bash
  npm install
  ```
* **Build Command**:
  ```bash
  npm run build
  ```
* **Start Command / Entry File**:
  ```bash
  node server/index.mjs
  ```
* **Port**: `3001`
* Klik **Deploy / Create Site**

---

## 4. Konfigurasi Nginx Web Server (Reverse Proxy & Anti-404 SPA)

Jika panel Kroombox menggunakan Nginx sebagai reverse proxy gateway ke aplikasi Node.js Anda:

### A. Konfigurasi Nginx untuk PointLab (`point.ngolab.online`)
Buka **Site Settings -> Nginx Configuration**:
```nginx
server {
    server_name point.ngolab.online;

    # 1. Routing Static SPA React (Mencegah 404 saat refresh rute /auth, /dashboard, dll.)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 2. Reverse Proxy untuk REST API
    location /api/ {
        proxy_pass http://127.0.0.1:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### B. Konfigurasi Nginx untuk NGOLAB-GAMI (`gami.ngolab.online`)
Buka **Site Settings -> Nginx Configuration**:
```nginx
server {
    server_name gami.ngolab.online;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 5. Konfigurasi SSL / HTTPS (Let's Encrypt)

Agar alur pertukaran token SSO (`#token=<JWT>`) antara `point.ngolab.online` dan `gami.ngolab.online` tidak diblokir oleh kebijakan keamanan browser (CORS & Mixed Content):

1. Masuk ke menu **SSL** untuk situs `point.ngolab.online` -> Pilih **Apply Let's Encrypt SSL** -> Centang **Force HTTPS**.
2. Masuk ke menu **SSL** untuk situs `gami.ngolab.online` -> Pilih **Apply Let's Encrypt SSL** -> Centang **Force HTTPS**.

---

## 6. Verifikasi Alur Pengguna & Aturan Bisnis (End-to-End Testing)

Setelah kedua situs berstatus **Running**:

| Langkah Pengujian | Cara Uji | Hasil yang Diharapkan |
| :--- | :--- | :--- |
| **1. Health Check PointLab** | Buka `https://point.ngolab.online/api/health` | Mengembalikan JSON: `{"status":"UP","timestamp":"..."}` |
| **2. Health Check GAMI** | Buka `https://gami.ngolab.online/api/health` | Mengembalikan JSON: `{"status":"UP","timestamp":"..."}` |
| **3. Homepage Landing** | Buka `https://gami.ngolab.online/` | Tampil halaman utama (Homepage Landing). Pengguna yang belum login melihat katalog game & fitur edukasi. |
| **4. Proteksi Member (Mini Games & Study)** | Klik tombol **Main** pada kartu game atau **Mulai Belajar** | Pengguna **tidak bisa langsung main** jika belum login, melainkan langsung diarahkan ke `https://point.ngolab.online/auth?redirect=...&mode=login`. |
| **5. Login Terpadu di PointLab** | Masukkan kredensial member di PointLab (NIM: `6706210001` / Pass: `123456`) | Muncul badge `🎮 Terhubung dengan NGOLAB-GAMI`. Setelah berhasil login, otomatis dialihkan kembali ke `https://gami.ngolab.online/#token=...`. |
| **6. Dashboard Member Aktif** | Masuk ke NGOLAB-GAMI | Sesi terbuka: Nama member, saldo Loyalty Points, dan seluruh Mini Game dapat dimainkan. |
| **7. Marketplace & Riwayat Voucher** | Buka tab **Reward** di NGOLAB-GAMI | Muncul katalog voucher F&B kantin dari PointLab, riwayat penukaran voucher aktif, serta tombol buka QR code di PointLab. |


---

## 7. Solusi Tuntas Error 404 pada Kroombox Cloud Panel (Penyebab & Solusi Definitif)

Bagi pengembang yang masih menjumpai **Error 404 Not Found** setelah melakukan deploy di Kroombox Cloud Panel, berikut adalah matriks diagnosis akar masalah dan solusi permanen yang telah diterapkan pada codebase:

| Kategori Masalah | Gejala di Browser / Log | Penyebab Utama | Solusi Permanen yang Diterapkan |
| :--- | :--- | :--- | :--- |
| **1. Client-Side Routing (SPA)** | Mengakses `/` berhasil, namun saat membuka rute langsung seperti `/auth`, `/dashboard`, `/resep`, `/membership`, atau menekan Refresh (F5), muncul **404 Not Found**. | Server web (Nginx/Apache) mencari file atau folder fisik bernama `/auth` atau `/resep` di disk server yang memang tidak ada karena menggunakan `react-router-dom`. | **A. File `.htaccess` Otomatis:** Telah ditambahkan berkas `.htaccess` di folder `public/` dan `dist/` seluruh proyek frontend (`PointLab`, `NGOLAB-GAMI`, dan `kolab-logistik`). Vite otomatis menyalinnya ke `dist/` setiap kali `npm run build` dijalankan.<br>**B. Aturan Nginx:** Jika menggunakan Nginx, tambahkan `try_files $uri $uri/ /index.html;` pada blok `location /`. |
| **2. Folder Webroot Kosong / Tidak Cocok** | Mengakses domain langsung melempar **404 Not Found** (halaman utama tidak muncul sama sekali). | (a) Panel Kroombox menyetel Webroot ke `dist`, namun build gagal atau `dist` diabaikan oleh `.gitignore` sehingga tidak ada file `index.html` di server.<br>(b) Vite menghasilkan output ke folder selain `dist` (misal: `public/`). | (a) Pastikan perintah **Build Command** pada panel Kroombox selalu menyertakan `npm run build`.<br>(b) Seluruh proyek telah dikonfigurasi menghasilkan bundle resmi ke `dist/` yang memuat `index.html` dan aset minified. |
| **3. Backend Entrypoint Mismatch** | Node.js crash saat start atau reverse proxy mengembalikan **404 / 502 Bad Gateway**. | Panel Kroombox secara default menjalankan `node server.js` pada direktori root (`/`). Jika file entrypoint berada di `server/index.js` atau `src/`, Node gagal menemukan file dan mati. | (a) **Root Entrypoint Universal:** Telah dibuat berkas root `server.js` di seluruh proyek (`PointLab/server.js`, `backend_ngolab/server.ts`, `kolab-logistik/server.js`).<br>(b) Pada panel Kroombox, set **Working Directory** ke `/` (atau `.`) dan **Entry File** ke `server.js`. |
| **4. Port Mismatch pada Reverse Proxy** | Server Node berjalan, namun browser menampilkan **404 Not Found** atau **502 Bad Gateway**. | Aplikasi mendengarkan port yang berbeda dari port yang di-forward oleh Nginx / Kroombox Gateway (misal: Nginx mem-forward ke `:3000`, tapi aplikasi berjalan di `:5000` tanpa membaca `process.env.PORT`). | Seluruh backend membaca `const PORT = process.env.PORT || <default_port>`. Di panel Kroombox, pastikan nilai **Port** di tab Deployment sama dengan port yang diinginkan (misal: `3000` untuk PointLab, `3001` untuk GAMI, `5000` untuk Logistik). |

---

## 8. BAGIAN III: Deployment Proyek Logistik & Manufaktur (`kolab-logistik` / `logistik.ngolab.online`)

Proyek `kolab-logistik` (`ngolab-logistik`) menangani manajemen inventaris bahan baku, mutasi stok multi-gudang, resep menu, dan simulasi peramalan manufaktur porsi (*yield forecasting*). Seluruh data dan API dilayani secara terpusat oleh `backend_ngolab` (`ngola_geasture_adm`).

### Step 1: Basic Information
1. Klik **Create Website** baru di panel Kroombox.
2. **Domain Name**: `logistik.ngolab.online`
3. **Framework / Environment**: Pilih `Node.js`
4. **Node.js Version**: Pilih `v20.x` (LTS)
5. Klik **Next**

### Step 2: Source Code
1. **Repository Type**: Pilih `Git / GitHub`
2. **Repository URL**: Masukkan URL Git repositori logistik.
3. **Branch**: `main` (atau branch aktif Anda)
4. **Auto-Deploy on Git Push**: Aktifkan (ON)
5. Klik **Next**

### Step 3: Database & Environment Variables Logistik
* **Database Relasional**: Hubungkan ke MySQL `ngola_geasture_adm` yang sudah memuat migrasi `007_logistik_and_manufacturing_integration.sql`.
* **Environment Variables (.env)**:
  ```env
  PORT=5000
  NODE_ENV=production
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_NAME=ngola_geasture_adm
  DB_USER=kroombox_db_user
  DB_PASSWORD=kroombox_db_password
  VITE_API_URL=https://point.ngolab.online/api
  ```
  *(Catatan: Jika deploy terpisah dengan backend master, `VITE_API_URL` mengarah ke master API hub `https://point.ngolab.online/api` atau backend lokal `http://127.0.0.1:3000/api`)*.

### Step 4: Build & Deployment Settings Logistik
* **Project Architecture Type**: Pilih **Single Service / Monolith**
* **Root / Working Directory**: `/` (atau `.`)
* **Install Command**:
  ```bash
  npm install
  ```
* **Build Command**:
  ```bash
  npm run build
  ```
* **Start Command / Entry File**:
  ```bash
  node server.js
  ```
  *(atau `node server/index.js`)*
* **Port**: `5000`
* Klik **Deploy / Create Site**

### Step 5: Konfigurasi Nginx untuk Logistik (`logistik.ngolab.online`)
Buka **Site Settings -> Nginx Configuration**:
```nginx
server {
    server_name logistik.ngolab.online;

    # 1. Routing Static SPA React & Fallback (Anti-404)
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 2. Reverse Proxy untuk REST API Logistik
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 9. Verifikasi Operasional 4 Proyek Terintegrasi

| Domain Layanan | Port Internal | Endpoint Verifikasi | Hasil yang Diharapkan |
| :--- | :---: | :--- | :--- |
| **PointLab** (`point.ngolab.online`) | `:3000` / `:3002` | `GET /api/health` | `{"status":"UP","timestamp":"..."}` |
| **NGOLAB-GAMI** (`gami.ngolab.online`) | `:3001` | `GET /api/health` | `{"status":"UP","timestamp":"..."}` |
| **Ko+Lab Logistik** (`logistik.ngolab.online`) | `:5000` | `GET /api/health` | `{"status":"OK","message":"Backend Ko+Lab Logistik API berjalan lancar"}` |
| **Backend Ngolab Master** | `:3000` | `GET /api/logistik/dashboard/summary` | `{"success":true,"data":{"total_items":9,...}}` |
| **Forecasting Manufaktur** | `:3000` / `:5000` | `GET /api/logistik/menus/1/forecast` | `{"success":true,"data":{"max_portions":80,"bottleneck":{...}}}` |
