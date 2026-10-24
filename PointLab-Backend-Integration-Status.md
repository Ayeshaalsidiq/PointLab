# PointLab — Backend Integration & Feature Status

**Terakhir update:** 24 Oktober 2026  
**Frontend owner:** Tim NGOLAB-GAMI / PointLab frontend  
**Backend owner:** Rekan (Point-Lab-api terpisah)  
**Status dokumen:** Updated setelah implementasi P0–P2 + tambahan fitur

---

## Legend

- ✅ DONE
- 🚧 PARTIAL / needs external dependency
- ❌ NOT DONE

---

## 1. ALUR TARGET (kesepakatan kebutuhan)

1. Pengunjung baru masuk ke homepage NGOLAB-GAMI.
2. Login / daftar memakai akun PointLab (PointLab = IdP).
3. Setelah login, pengguna masuk beranda NGOLAB-GAMI dengan akun yang sama.
4. Pengguna bermain game di NGOLAB-GAMI dan memperoleh poin.
5. Poin tersimpan pada akun PointLab yang sama.
6. Saat menukar poin, dialihkan ke halaman voucher PointLab - mengenali akun login.
7. Edit profil (nama, telepon, avatar) di NGOLAB-GAMI - tersimpan di akun PointLab.
8. Satu akun untuk semua aktivitas di ekosistem Ngolab.

---

## 2. STATUS IMPLEMENTASI BACKEND

### PointLab (panel.kroombox.com)

| # | Temuan | Status |
|---|--------|--------|
| 1 | Login tidak memverifikasi password (atau backend crash) | ✅ FIXED — verifyPassword kini strict bcrypt only |
| 2 | Data pengguna in-memory | ✅ FIXED — persist ke MySQL dengan fallback in-memory |
| 3 | Registrasi tidak persisten | ✅ FIXED — registrasi disimpan ke DB |
| 4 | GET /api/users/profile mengabaikan token | ✅ FIXED — requireAuth middleware aktif |
| 5 | Endpoint loyalty kontrak tidak ada | ✅ FIXED — 5 endpoint loyalty contract sudah diimplementasi |
| 6 | Token bukan JWT | ✅ FIXED — JWT 7d dengan memberId di payload |
| 7 | CORS tidak diatur | ✅ FIXED — CORS untuk gami.ngolab.online + localhost |
| 8 | /api/promos/redeem pakai data demo | ✅ FIXED — redeem atomic ke DB |

### GeastEats (backend_ngolab)

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| G-1 CORS | P0 | ❌ PENDING | Harus di-set di repo backend_ngolab terpisah |
| G-2 memberId di login/profil | P1 | ❌ PENDING | Harus di-set di repo backend_ngolab terpisah |
| G-3 Sinkronisasi poin transaksi | P1 | ❌ PENDING | Harus di-set di repo backend_ngolab terpisah |
| G-4 Scope token tulis Pelanggan | P2 | ❌ PENDING | Harus di-set di repo backend_ngolab terpisah |

---

## 3. YANG SUDAH DISELESAIKAN — TIM POINTLAB

### Prioritas 0 (blocker)

**P0-1. Autentikasi sungguh** ✅
- [x] Backend: verifikasi password (bcrypt only)
- [x] Backend: hapus backdoor password di userModel.js verifyPassword()
- [x] Backend: simpan user ke MySQL permanen

**P0-2. Token JWT asli + memberId** ✅
- [x] Backend: memberId disertakan di JWT payload
- [x] Backend: memberId di respons login/register/profile
- [x] Frontend: simpan memberId dari res.user.memberId, fallback user.id

**P0-3. Endpoint loyalty per-member (kontrak WAJIB persis)** ✅
```
GET  /api/members/{memberId}/loyalty/balance      -> { currentPoints, tier?, totalPoints, allTiers }
POST /api/members/{memberId}/loyalty/points/earn  -> header: Authorization Bearer, Idempotency-Key
                                                   body: { points, source, referenceType, referenceId, description }
GET  /api/rewards                                 -> katalog hadiah (array langsung)
GET  /api/members/{memberId}/redemptions          -> riwayat penukaran
POST /api/members/{memberId}/rewards/{rewardId}/redeem -> atomic: { redemptionId, rewardName, redemptionCode, remainingPoints }
```
- [x] Backend: implementasi 5 endpoint di atas
- [x] Frontend: api.js — getLoyaltyBalance(), earnPoints(), getRedemptions(), redeemReward()
- [x] Frontend: UserContext — refreshCoinData() pakai loyalty balance; redeemPromo() pakai new endpoint
- [x] Frontend: response parsing support 3 format balance + 2 format redeem
- [x] Frontend: fallback ke legacy endpoint saat contract belum ada

**P0-4. Registrasi** ✅
- [x] Backend: sertakan memberId di respons register

### Prioritas 1

**P1-5. Profil per-akun** ✅
- [x] Frontend: PUT /api/users/profile (nama, phone, email, avatar_url, nim)
- [x] Backend: persisten ke database

**P1-6. Halaman voucher mengenali akun** 🚧
- [x] Frontend siap — redirect ke https://point.ngolab.online/voucher?token=<JWT>
- [ ] Backend: handle token param; komunikasi URL final ke frontend

**P1-7. CORS** ✅
- [x] Backend PointLab: izinkan origin https://gami.ngolab.online + http://localhost:3000

**P1-8. Kontrak data tier & saldo** ✅
- [x] Backend: respon format stabil { currentPoints, balance, totalPoints, tier, allTiers }

### Prioritas 2

**P2-9. Format error konsisten** ✅
- [x] Backend: { message, code } untuk semua error

**P2-10. Logout/refresh token** ✅
- [x] Backend: endpoint POST /api/auth/logout + audit log
- [x] Frontend: api.logout() clear localStorage + state + panggil backend

**P2-11. Rate limit auth** ❌
- [ ] Backend: rate limiter pada /api/auth/login + /api/auth/register
- **Kebutuhan:** Install `express-rate-limit`, konfigurasi window & max requests

**P2-12. Dokumentasi OpenAPI** ❌
- [ ] Backend: OpenAPI spec untuk endpoint loyalty + auth
- **Kebutuhan:** Manual dokumentasi atau generate dari annotations

---

## 4. TAMBAHAN FITUR YANG SUDAH DIIMPLEMENTASI

| Fitur | Status | Keterangan |
|-------|--------|------------|
| Forgot Password page + API | ✅ | Frontend + backend `/api/auth/forgot-password` |
| Feedback page + API | ✅ | Frontend `Feedback.jsx` + backend `/api/auth/feedback` + persist DB `feedbacks` |
| Review/Ulasan per transaksi | ✅ | Frontend `History.jsx` modal review + backend `/api/auth/review` + persist DB `reviews` |
| History page dengan tab | ✅ | `/history` — tab "Semua / Riwayat Poin / Riwayat Transaksi" |
| Session timeout auto-logout | ✅ | Frontend `UserContext.jsx` — 10 menit inactivity auto-logout |
| Logout confirmation alert | ✅ | Header + Membership page |
| QR Member close via background | ✅ | Dashboard + Membership QR modal |
| Tukar Poin integrated | ✅ | `Redeem.jsx` + backend atomic redeem |
| memberId di JWT + responses | ✅ | Login, register, profile |
| CORS configured | ✅ | gami.ngolab.online + localhost |
| Error format {message, code} | ✅ | Semua controller |

---

## 5. LIST QnA AYESHA — STATUS IMPLEMENTASI

### ✅ SUDAH DILAKUKAN

| No | Item | Keterangan |
|----|------|------------|
| 1 | Fitur Lupa Password | Frontend `ForgotPassword.jsx` + `/api/auth/forgot-password` |
| 2 | Edit Profile lengkap | Bisa ubah nama, email, NIM/NIP, phone, password |
| 3 | Alert password change | `Membership.jsx` — alert saat save jika password diisi |
| 4 | Feedback laman + API | `Feedback.jsx` + `/api/auth/feedback` + persist DB |
| 5 | Riwayat transaksi + ulasan | `History.jsx` tab switchable + `/api/auth/review` + DB `reviews` |
| 6 | Session login + auto-logout | `UserContext.jsx` — 10 menit inactivity |
| 7 | Logout confirmation alert | Header + Membership page |
| 8 | QR Member close background | Dashboard + Membership modal |
| 9 | Tukar Poin terintegrasi | `Redeem.jsx` + backend atomic redeem |
| 10 | memberId di JWT | `authMiddleware.js` + controller responses |
| 11 | CORS | `server.js` |
| 12 | Format error konsisten | Semua controller `{message, code}` |
| 13 | Logout endpoint | `/api/auth/logout` + audit log |
| 14 | Riwayat Poin laman tersendiri | `/history` dengan tab switchable |

### 🚧 PARTIAL / BUTUH EKsternal

| No | Item | Keterangan |
|----|------|------------|
| 15 | Forgot Password email asli | Endpoint ada, tapi butuh SMTP/API key (nodemailer/SendGrid) |
| 16 | Tukar Poin di Beranda dummy | Sudah terintegrasi, tapi tab "Use" masih ke `/redeem` (semua hadiah) |
| 17 | Harga hadiah sinkron GeastEats | Butuh akses repo backend_ngolab terpisah |

### ❌ BELUM DILAKUKAN

| No | Item | Kebutuhan untuk menyelesaikan |
|----|------|-------------------------------|
| 18 | Button2 Dashboard quick actions | Edit `Dashboard.jsx` — hilangkan/dipindah tombol Member Package, QR, Riwayat |
| 19 | Sidebar logout confirmation | Edit `Sidebar.jsx` — tambah konfirmasi alert seperti Header |
| 20 | Nama "Member Benefit" | Edit `Membership.jsx` — ganti "Keuntungan Membership" → "Member Benefit" |
| 21 | Tukar Poin Beranda hanya promo hangat | Edit `Dashboard.jsx` tab "Use" — filter promo hot saja |
| 22 | Rate limiter auth | Install `express-rate-limit`, tambah di `server.js` untuk `/api/auth/*` |
| 23 | OpenAPI spec | Manual dokumentasi endpoint |
| 24 | Chatbot respons kurang | Sesuaikan knowledge base `chatModel.js` atau prompt Gemini |
| 25 | Riwayat Poin button di Navbar | Edit `Sidebar.jsx` — tambah/ubah routing Riwayat |
| 26 | Member Package → press card | Edit `Dashboard.jsx` — buat card profile bisa diklik ke `/membership` |

---

## 6. YANG DIBUTUHKAN UNTUK MELANJUTKAN

### A. Backend (dari repo PointLab ini)

| Item | Prioritas | Kebutuhan |
|------|-----------|-----------|
| Rate limiter | P2 | Install `npm i express-rate-limit`, konfigurasi untuk `/api/auth/login`, `/api/auth/register` |
| OpenAPI spec | P2 | Dokumentasi manual semua endpoint |
| Forgot password email | P1 | SMTP creds / API key (nodemailer, SendGrid, dll) + env vars |
| Voucher page token handling | P1 | Verifikasi frontend `point.ngolab.online/voucher?token=` |
| Sinkron harga hadiah GeastEats | P1 | API endpoint baru dari backend_ngolab |

### B. Frontend (dari repo PointLab ini)

| Item | Prioritas | Kebutuhan |
|------|-----------|-----------|
| Button2 Dashboard quick actions | P1 | Edit `Dashboard.jsx` quick actions section |
| Sidebar logout confirmation | P2 | Edit `Sidebar.jsx` — tambah modal confirm |
| "Member Benefit" naming | P2 | Edit `Membership.jsx` text |
| Tukar Poin Beranda promo hangat | P2 | Edit `Dashboard.jsx` tab "Use" — filter logic |
| Chatbot response improvement | P2 | Edit `chatModel.js` knowledge base atau Gemini prompt |
| Riwayat Poin button di Navbar | P2 | Edit `Sidebar.jsx` navigation |

### C. Backend LAIN (bisa dilakukan dari repo ini)

| Item | Prioritas | Kebutuhan |
|------|-----------|-----------|
| GeastEats CORS + memberId + poin sync + scope | P0-P2 | Akses repo `backend_ngolab` terpisah |

### D. Deploy & Hosting

| Item | Prioritas | Kebutuhan |
|------|-----------|-----------|
| Deploy backend PointLab | P0 | Upload ke panel.kroombox.com / hosting |
| Deploy frontend build | P0 | Upload `dist/` ke hosting |
| Set env vars | P0 | `JWT_SECRET`, `DB_*`, `VITE_API_BASE_URL`, `CORS_ORIGIN` |

---

## 7. FILE YANG TELAH DIUBAH

| File | Perubahan |
|------|-----------|
| `models/userModel.js` | Hapus backdoor password, strict bcrypt only |
| `middleware/authMiddleware.js` | Tambah `memberId` di JWT payload |
| `controllers/authController.js` | Tambah `memberId` di response, format error `{message,code}`, tambah `submitReview()`, `logout()`, feedback persist DB |
| `controllers/membershipController.js` | Tambah 4 endpoint loyalty contract, format error konsisten |
| `controllers/promoController.js` | Tambah `getRewards()` array langsung, format error konsisten |
| `controllers/dashboardController.js` | Format error konsisten |
| `controllers/chatController.js` | Format error konsisten |
| `routes/apiRoutes.js` | Tambah route `/auth/review`, `/auth/logout`, `/members/:memberId/loyalty/*`, `/rewards` |
| `config/db.js` | Tambah `CREATE TABLE IF NOT EXISTS` untuk `feedbacks` & `reviews` |
| `server.js` | Konfigurasi CORS, pindah health check sebelum apiRoutes |
| `src/services/api.js` | Tambah `submitReview()`, `logout()` panggil backend |
| `src/pages/History.jsx` | Import `api`, `handleReviewSubmit()` async kirim ke backend |

---

## 8. VERIFIKASI YANG SUDAH DILAKUKAN

- `npm run build` ✅ — 1914 modules, 0 error
- Server startup ✅ — PID 15152
- `GET /api/health` ✅ — `{"status":"UP"}`
- `GET /api/rewards` ✅ — array langsung
- `POST /api/auth/login` ✅ — returns `memberId`
- `POST /api/auth/register` ✅ — returns `memberId`
- `GET /api/members/1/loyalty/balance` ✅ — full contract
- `POST /api/members/1/loyalty/points/earn` ✅ — poin bertambah
- `POST /api/members/1/rewards/cp-.../redeem` ✅ — atomic redeem
- `POST /api/auth/feedback` ✅ — persist DB
- `POST /api/auth/review` ✅ — persist DB
- CORS headers ✅ — `gami.ngolab.online`, `localhost:3000`
