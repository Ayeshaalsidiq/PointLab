# Panduan Lengkap Deployment PointLab di Server Kroombox Cloud Panel
*(Solusi & Analisis Error 404 Berdasarkan Screenshot Server)*

Dokumen ini memuat panduan langkah demi langkah untuk meng-hosting **PointLab** (dan ekosistem integrasi **NGOLAB-GAMI**) pada panel server lab Kroombox Cloud Panel (`panel.kroombox.com/#create_site`) dengan domain target `point.ngolab.online`.

---

## 1. Analisis & Penyebab Utama Terjadinya Error 404

Berdasarkan 4 tangkapan layar (screenshot) panel hosting Kroombox yang Anda sediakan, berikut adalah penyebab utama mengapa situs PointLab menampilkan **Error 404 Not Found**:

| No | Lokasi Pengaturan (Screenshot) | Kesalahan Input / Konfigurasi | Dampak / Mengapa 404 |
| :--- | :--- | :--- | :--- |
| **1** | **Step 4: Backend Folder Location** | Terisi `src/` | `server.js` dan `package.json` berada di **Root Directory (`/`)**, bukan di dalam folder `src/`. Saat Kroombox menjalankan backend, proses Node.js gagal menemukan file entrypoint dan crash. |
| **2** | **Step 4: Webroot Directory** | Terisi `dist` | `vite.config.js` PointLab awalnya menghasilkan output build ke folder `public`. Karena Nginx Kroombox mencari file di folder `dist`, file `index.html` tidak ditemukan sehingga Nginx menampilkan HTTP 404. *(Catatan: Saat ini sudah kami tambahkan plugin auto-sync agar folder `dist/` dan `public/` selalu terisi keduanya).* |
| **3** | **Step 3: Relational Database** | Toggle Database **OFF (Abu-abu / Tidak Aktif)** | `PointLab/server.js` menjalankan `initDb()` pada saat startup. Tanpa koneksi database MySQL dan tanpa file `.env` yang berisi kredensial DB, server backend akan error / gagal berjalan. |
| **4** | **Nginx Web Server Routing** | Belum ada SPA Rewrite Rule | PointLab menggunakan React SPA (`react-router-dom`). Jika pengunjung mengakses URL `/auth`, `/dashboard`, atau `/membership`, Nginx membutuhkan konfigurasi `try_files $uri $uri/ /index.html;` agar tidak menganggap rute tersebut sebagai folder fisik. |

---

## 2. Pilihan Arsitektur Deployment di Kroombox

Terdapat dua cara deploy di Kroombox:

### Rekomendasi: Gunakan **Metode A (Single Service / Monolith Node.js)**
PointLab sudah dirancang dengan arsitektur Monolith modern di `server.js`:
- Menyajikan API REST (`/api/*`).
- Menyajikan static file frontend React (`dist/` & `public/`).
- Memiliki fallback SPA bawaan (`app.use(...)` -> `index.html`).
- **Keuntungan:** Tidak perlu membagi frontend & backend, bebas dari konflik port gateway Nginx, dan anti-404.

Jika Anda tetap ingin menggunakan arsitektur **Metode B (Fullstack Multi-Service 2-in-1)**, ikuti panduan detail di bawah.

---

## 3. Langkah Demi Langkah Pengisian Form Kroombox (Step-by-Step)

### Step 1: Basic Information (Screenshot 1)
1. **Domain Name**: `point.ngolab.online`
2. **Framework / Environment**: Pilih `Node.js`
3. **Node.js Version**: Pilih `v20.x` (LTS)
4. Klik **Next**

---

### Step 2: Source Code (Screenshot 2)
1. **Repository Type**: Pilih `Git / GitHub`
2. **Repository URL**: Masukkan URL repository PointLab Anda (misal: `https://github.com/REzaa13x/PointLab.git`)
3. **Branch**: `main` (atau branch tempat rilis terbaru Anda)
4. **Auto-Deploy on Git Push**: Aktifkan (ON) agar setiap update otomatis dideploy
5. Klik **Next**

---

### Step 3: Database & Environment Variables (Screenshot 3)

#### A. Mengaktifkan Database MySQL (PENTING)
1. Geser toggle **"Use Relational Database"** ke **ON (Hijau / Aktif)**.
2. Tipe Database: Pilih **MySQL 8.0** (atau **MySQL 5.7**).
3. Buat nama database, misalnya: `gesture_eats` (atau nama DB yang disediakan Kroombox).
4. Catat kredensial:
   - **DB Host**: `localhost` (atau `127.0.0.1` / host internal Kroombox)
   - **DB Port**: `3306`
   - **DB Name**: `gesture_eats`
   - **DB User**: (sesuai yang dibuat di panel)
   - **DB Password**: (sesuai yang dibuat di panel)

#### B. Mengisi Environment Variables (.env)
Pada kolom **Environment Variables**, isi konfigurasi berikut:

```env
PORT=3000
NODE_ENV=production
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=gesture_eats
DB_USER=root
DB_PASSWORD=password_database_anda
JWT_SECRET=ngolab_secret_key_pointlab_2026
VITE_POINTLAB_URL=https://point.ngolab.online
VITE_POINTLAB_AUTH_URL=https://point.ngolab.online/auth
ALLOWED_ORIGINS=https://gami.ngolab.online,https://point.ngolab.online,http://localhost:3000,http://localhost:3001
```
*(Sesuaikan `DB_USER` dan `DB_PASSWORD` dengan kredensial database Anda).*

5. Klik **Next**

---

### Step 4: Build & Deployment Settings (Screenshot 4)

Pilih salah satu metode berikut:

---

### METODE A: Single Service / Monolith (DIREKOMENDASIKAN)

1. **Project Architecture Type**: Pilih radio button **Single Service / Monolith**.
2. **Root / Working Directory**: Biarkan default `/` (atau `.`).
3. **Install Command**:
   ```bash
   npm install
   ```
4. **Build Command**:
   ```bash
   npm run build
   ```
5. **Start Command / Entry File**:
   ```bash
   node server.js
   ```
   *(atau isi Entry File: `server.js`)*
6. **Port**: `3000`

---

### METODE B: Fullstack Multi-Service (2-in-1)

Jika Anda memilih radio button **Fullstack Multi-Service (2-in-1)** seperti pada Screenshot 4:

#### 1. Pengaturan Frontend:
- **Frontend Code Folder Location**: Isi `/` atau `.` *(JANGAN diisi `src/`!)*
- **Frontend Install Command**: `npm install`
- **Frontend Build Command**: `npm run build`
- **Webroot Directory / Static Files**: Isi `dist` *(atau `public`, keduanya kini otomatis tersinkron)*

#### 2. Pengaturan Backend:
- **Backend Code Folder Location**: Isi `/` atau `.` *(JANGAN diisi `src/`!)*
- **Backend Install Command**: `npm install`
- **Backend Entry File**: `server.js`
- **Backend Port**: `3000`
- **Gateway Route Prefix**: `/api`

---

## 4. Import Database SQL (Data Akun & Poin)

Setelah website dan database MySQL dibuat di Kroombox:
1. Buka menu **Database** atau **phpMyAdmin** di panel Kroombox.
2. Pilih database `gesture_eats`.
3. Buka tab **Import**.
4. Pilih file dump SQL yang sudah kami sediakan di dalam repository PointLab:
   - Lokasi file: `ngola_geasture_adm_dump.sql` (atau `gesture_eats_SQL_dump.sql`).
5. Klik **Go / Import**.
6. Seluruh tabel akun (`users`), poin (`coins`), promo (`promos`), menu (`menus`), dan loyalty akan terisi data awal resmi.

---

## 5. Konfigurasi Nginx (Anti Error 404 SPA)

Jika setelah dideploy halaman utama bisa dibuka namun saat membuka `/auth` atau `/dashboard` langsung muncul 404 Nginx, tambahkan blok konfigurasi ini di menu **Site Settings -> Nginx Configuration / Reverse Proxy**:

```nginx
# 1. Routing Static SPA React (Mencegah 404 pada reload halaman /auth, /dashboard, /promo)
location / {
    root /www/wwwroot/point.ngolab.online/dist; # sesuaikan path direktori di server
    try_files $uri $uri/ /index.html;
    index index.html;
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

# 3. Static Uploads (Avatar & Gambar Menu)
location /uploads/ {
    proxy_pass http://127.0.0.1:3000/uploads/;
}
```

> **Catatan:** Jika menggunakan **Metode A (Monolith)**, Nginx cukup mem-proxy seluruh request ke `http://127.0.0.1:3000`, karena Express di `server.js` sudah memiliki fallback SPA otomatis.

---

## 6. Aktifkan SSL / HTTPS (Let's Encrypt)

Agar alur SSO redirect antara `gami.ngolab.online` dan `point.ngolab.online` berjalan mulus tanpa peringatan keamanan browser:
1. Masuk ke menu **SSL** pada domain `point.ngolab.online` di Kroombox.
2. Centang domain `point.ngolab.online`.
3. Pilih **Apply Let's Encrypt Free SSL Certificate**.
4. Centang **Force HTTPS Redirect**.

---

## 7. Verifikasi Hasil Deployment

Setelah build selesai dan status website **Running**:

1. **Uji Health Check Backend**:
   Buka di browser:
   ```
   https://point.ngolab.online/api/health
   ```
   Respons yang benar: `{"status":"UP","timestamp":"..."}`

2. **Uji Halaman Login Resmi PointLab**:
   Buka di browser:
   ```
   https://point.ngolab.online/auth
   ```
   Halaman form login & registrasi PointLab harus muncul dengan rapi.

3. **Uji Alur SSO Terpadu dari NGOLAB-GAMI**:
   Buka URL SSO berikut:
   ```
   https://point.ngolab.online/auth?redirect=https%3A%2F%2Fgami.ngolab.online%2F&mode=login
   ```
   - Halaman PointLab akan menampilkan badge:
     `🎮 Terhubung dengan NGOLAB-GAMI (Akun Membership Terpadu)`
   - Saat Anda login dengan akun member (contoh: NIM `6706210001` / Password `123456`), PointLab akan otomatis mengembalikan Anda ke:
     `https://gami.ngolab.online/#token=<JWT>`
   - NGOLAB-GAMI secara otomatis membuka sesi member, menampilkan poin Anda, dan membuka akses seluruh fitur game & study!

---

## 8. Ringkasan Checklist Sebelum Klik "Deploy"

- [x] Backend Code Folder Location diset ke `/` (Bukan `src/`)
- [x] Frontend Code Folder Location diset ke `/` (Bukan `src/`)
- [x] Toggle Relational Database diaktifkan (MySQL aktif)
- [x] Environment variables `.env` sudah diisi (`DB_HOST`, `DB_NAME`, `JWT_SECRET`, dll.)
- [x] File dump SQL `ngola_geasture_adm_dump.sql` sudah di-import
- [x] SSL Let's Encrypt sudah diterbitkan untuk `point.ngolab.online`
