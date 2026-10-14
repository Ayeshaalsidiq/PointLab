# Requirement Integrasi Backend — Alur Akun Tunggal Ngolab (NGOLAB-GAMI)

**Status terakhir update:** 15 Oktober 2026
**Frontend owner:** tim NGOLAB-GAMI / PointLab frontend
**Backend owner:** rekan (Point-Lab-api terpisah)

> Legend: [x] DONE (frontend) | [ ] PENDING (backend)

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

## 2. STATUS SAAT INI (hasil uji 12 Okt 2026)

### PointLab (panel.kroombox.com)
Live deployment berbeda dari kode repo lokal - menggunakan backend terpisah (Point-Lab-api).

| # | Temuan | Status |
|---|--------|--------|
| 1 | Login tidak memverifikasi password (atau backend crash) | [ ] PENDING (backend) |
| 2 | Data pengguna in-memory | [x] DONE (repo lokal) / [ ] PENDING (live) |
| 3 | Registrasi tidak persisten | [x] DONE (repo lokal) / [ ] PENDING (live) |
| 4 | GET /api/users/profile mengabaikan token | [x] DONE (repo lokal) / [ ] PENDING (live) |
| 5 | Endpoint loyalty kontrak tidak ada | [ ] PENDING (backend) |
| 6 | Token bukan JWT | [x] DONE (repo lokal) / [ ] PENDING (live) |
| 7 | CORS tidak diatur | [ ] PENDING (backend) |
| 8 | /api/promos/redeem pakai data demo | [ ] PENDING (backend) |

### GeastEats (backend_ngolab)

| # | Temuan | Status |
|---|--------|--------|
| 1 | Login/registrasi nyata (MySQL, hash, JWT) | [x] DONE |
| 2 | Tidak mengirim header CORS | [ ] PENDING |
| 3 | Endpoint publik berfungsi | [x] DONE |
| 4 | /api/orders/external/* butuh x-api-key | [x] DONE |
| 5 | Login respons tidak memuat memberId | [ ] PENDING |
| 6 | Operasi tulis role Pelanggan 403 | [ ] PENDING |

---

## 3. YANG HARUS DISELESAIKAN — TIM POINTLAB

### Prioritas 0 (blocker)

**P0-1. Autentikasi sungguhi**
- [x] Frontend siap — api.js + UserContext handle login/register dengan JWT
- [ ] Backend: verifikasi password (bcrypt); salah -> 401
- [ ] Backend: hapus backdoor password di userModel.js verifyPassword()
- [ ] Backend: simpan user ke MySQL permanen

**P0-2. Token JWT asli + memberId**
- [x] Frontend siap — simpan memberId (dari res.user.memberId, fallback user.id)
- [x] Frontend siap — semua API calls pakai memberId di URL path
- [ ] Backend: sertakan memberId di JWT payload + respons login/register/profil

**P0-3. Endpoint loyalty per-member (kontrak WAJIB persis)**
Frontend sudah implementasi semua panggilan API:
```
GET  /api/members/{memberId}/loyalty/balance      -> { currentPoints, tier?, totalPoints, allTiers }
POST /api/members/{memberId}/loyalty/points/earn  -> header: Authorization Bearer, Idempotency-Key
                                                   body: { points, source, referenceType, referenceId, description }
GET  /api/rewards                                 -> katalog hadiah (array langsung)
GET  /api/members/{memberId}/redemptions          -> riwayat penukaran
POST /api/members/{memberId}/rewards/{rewardId}/redeem -> atomic: { redemptionId, rewardName, redemptionCode, remainingPoints }
```
- [x] Frontend: api.js — getLoyaltyBalance(), earnPoints(), getRedemptions(), redeemReward()
- [x] Frontend: UserContext — refreshCoinData() pakai loyalty balance; redeemPromo() pakai new endpoint
- [x] Frontend: response parsing support 3 format balance + 2 format redeem
- [x] Frontend: fallback ke legacy endpoint (/api/rewards/redeem) saat contract belum ada
- [ ] Backend: implementasi 5 endpoint di atas
- [ ] Backend: earn idempoten via Idempotency-Key
- [ ] Backend: redeem atomic (cek saldo -> potong -> generate kode -> response)
- [ ] Backend: GET /api/rewards balik array langsung

**P0-4. Registrasi**
- [x] Frontend siap — kirim nama, nim, email, phone, password
- [x] Frontend siap — parse token + user dari response
- [ ] Backend: sertakan memberId di respons register

### Prioritas 1

**P1-5. Profil per-akun**
- [x] Frontend siap — PUT /api/users/profile (nama, phone, avatar_url)
- [x] Frontend siap — updateProfile() update state + localStorage
- [ ] Backend: persisten ke database

**P1-6. Halaman voucher mengenali akun**
- [x] Frontend siap — redirect ke https://point.ngolab.online/voucher?token=<JWT>
- [ ] Backend: handle token param; komunikasi URL final ke frontend

**P1-7. CORS**
- [ ] Backend PointLab: izinkan origin https://gami.ngolab.online + http://localhost:3000
- [ ] Backend GeastEats: set CORS_ORIGIN

**P1-8. Kontrak data tier & saldo**
- [x] Frontend siap — support format { balance, totalPoints, tier, allTiers } + fallback
- [ ] Backend: respon format stabil

### Prioritas 2

**P2-9. Format error konsisten**
- [x] Frontend toleran — handle err.message + err.status di semua try-catch
- [ ] Backend: { message, code } untuk semua error

**P2-10. Logout/refresh token**
- [x] Frontend siap — api.logout() clear localStorage + state
- [ ] Backend: endpoint POST /api/auth/logout

**P2-11. Rate limit auth**
- [ ] Backend: rate limiter pada /api/auth/login + /api/auth/register

**P2-12. Dokumentasi OpenAPI**
- [ ] Backend: OpenAPI spec untuk endpoint loyalty + auth

---

## 4. YANG HARUS DISELESAIKAN — TIM GEASTEATS

| Item | Priority | Status | Apa yang dilakukan |
|---|---|---|---|
| G-1 CORS | P0 | [ ] PENDING | Set env CORS_ORIGIN=https://gami.ngolab.online |
| G-2 memberId di login/profil | P1 | [ ] PENDING | Tambahkan memberId respon login/register/profil |
| G-3 Sinkronisasi poin transaksi | P1 | [ ] PENDING | Kredit poin ke akun PointLab saat order lunas |
| G-4 Scope token tulis Pelanggan | P2 | [ ] PENDING | PUT /api/users/{id} 403 -> tetapkan scope/role menulis |

---

## 5. YANG PERLU DIPASTIKAN DI HOSTING

**H-1 (P0)** — Node app harus running
- GET https://panel.kroombox.com/api/health harus balik 200
- Status: HTTP 500 (backend crash)

**H-2 (P0)** — Env build
- [x] VITE_API_BASE_URL=https://panel.kroombox.com sudah ditambah ke .env
- [ ] Perlu deploy ulang frontend build

---

## 6. PROGRES FRONTEND SUDAH SELESAI (15 Okt 2026)

1. [x] .env — ditambah VITE_API_BASE_URL=https://panel.kroombox.com
2. [x] src/services/api.js — 4 endpoint loyalty kontrak baru:
   - getLoyaltyBalance(memberId), earnPoints(memberId, payload, key), getRedemptions(memberId), redeemReward(memberId, rewardId)
   - Fallback: redeemPromoLegacy() -> /api/rewards/redeem
   - Response parsing: 3 format balance + 2 format redeem
3. [x] src/context/UserContext.jsx:
   - memberId state + localStorage persist
   - refreshCoinData() — priority loyalty balance, fallback coin balance
   - redeemPromo() — priority /members/{id}/rewards/{id}/redeem, fallback /api/rewards/redeem
   - memberId export di context value
4. [x] Build verifikasi — vite build sukses (1911 modules, 0 error)

## 7. YANG MASIH PENDING (perlu backend)

Semua item dengan [ ] di tabel di atas. Frontend sudah siap — backend tinggal implementasi.

## 8. WORKFLOW LANJUTAN

Urutan: H-2 frontend (done) -> P0 backend -> P1 backend + integrasi -> P2.
Setelah backend P0-3 selesai, frontend otomatis pakai endpoint baru (dengan fallback ke legacy).
