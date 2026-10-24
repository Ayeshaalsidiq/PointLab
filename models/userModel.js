/**
 * UserModel - PointLab MVC Model Layer
 * Mengelola data pengguna, autentikasi, profil, validasi kredensial password,
 * dan sinkronisasi dengan database MySQL `gesture_eats` (dengan fallback in-memory yang lengkap).
 */

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { isDbConnected, query } from '../config/db.js';

// Dataset awal pengguna (diambil langsung dari gesture_eats.sql + akun resmi Ayesha Alsidiq)
const initialUsers = [
  {
    id: 1,
    nama: "Ayesha Alsidiq",
    nim: "6706210001",
    email: "ayesha@student.telkomuniversity.ac.id",
    phone: "081234567890",
    role: "Mahasiswa",
    tier: "Study Buddy",
    poin: 1250,
    coin_balance: 1250,
    totalPoin: 8450,
    avatar: null,
    avatar_url: null,
    password_plain: "123456",
    passwordHash: bcrypt.hashSync("123456", 10),
    createdAt: "2026-01-15T08:00:00Z"
  },
  {
    id: "607012400054",
    nama: "ahmad husen",
    nim: "607012400054",
    email: "607012400054@student.telkomuniversity.ac.id",
    phone: "081260701240",
    role: "Pelanggan",
    tier: "Classmate",
    poin: 400,
    coin_balance: 400,
    totalPoin: 600,
    avatar: "https://picsum.photos/seed/607012400054/100/100",
    avatar_url: "https://picsum.photos/seed/607012400054/100/100",
    password_plain: "123456",
    passwordHash: bcrypt.hashSync("123456", 10),
    createdAt: "2026-06-01T16:05:13Z"
  },
  {
    id: "7049509454",
    nama: "ahamd",
    nim: "7049509454",
    email: "ahmad@gmail.com",
    phone: "584837432",
    role: "Pelanggan",
    tier: "Classmate",
    poin: 130,
    coin_balance: 130,
    totalPoin: 130,
    avatar: "https://picsum.photos/seed/7049509454/100/100",
    avatar_url: "https://picsum.photos/seed/7049509454/100/100",
    password_plain: "12345678",
    passwordHash: "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f",
    createdAt: "2026-06-17T11:59:13Z"
  },
  {
    id: "u-1781625191785",
    nama: "Bagus Mahasiswa",
    nim: "081234567890",
    email: "bagus@student.telkomuniversity.ac.id",
    phone: "081234567890",
    role: "Pelanggan",
    tier: "Classmate",
    poin: 125,
    coin_balance: 125,
    totalPoin: 145,
    avatar: "https://picsum.photos/seed/u-1781625191785/100/100",
    avatar_url: "https://picsum.photos/seed/u-1781625191785/100/100",
    password_plain: "123456",
    passwordHash: bcrypt.hashSync("123456", 10),
    createdAt: "2026-06-16T15:53:11Z"
  },
  {
    id: "u-1791478820035",
    nama: "kiki",
    nim: "kiki",
    email: "kiki@gmail.com",
    phone: "kiki",
    role: "Pelanggan",
    tier: "Classmate",
    poin: 100,
    coin_balance: 100,
    totalPoin: 100,
    avatar: "https://picsum.photos/seed/u-1791478820035/100/100",
    avatar_url: "https://picsum.photos/seed/u-1791478820035/100/100",
    password_plain: "kiki",
    passwordHash: "$2b$12$wH/Hc6ThuBLTdBHvMADv9uqpFIHT.EmPY0w169c4X8Uch4Zmp42fq",
    createdAt: "2026-10-08T17:00:20Z"
  },
  {
    id: "u-1791726218402",
    nama: "Nothing To See Here",
    nim: "nothing5758",
    email: "nothing5758@gmail.com",
    phone: "nothing5758",
    role: "Pelanggan",
    tier: "Classmate",
    poin: 100,
    coin_balance: 100,
    totalPoin: 100,
    avatar: "https://picsum.photos/seed/u-1791726218402/100/100",
    avatar_url: "https://picsum.photos/seed/u-1791726218402/100/100",
    password_plain: "123",
    passwordHash: "$2b$12$oBK2OC3pS7gjsRvfbY6GEuzFM8300P3G.u7BOnG02ZaZ5H5Ju3rdC",
    createdAt: "2026-10-11T13:43:38Z"
  },
  {
    id: "u-1791740416465",
    nama: "Uji Integrasi Hermes",
    nim: "089900011122",
    email: "uji.integrasi.hermes@contoh.test",
    phone: "089900011122",
    role: "Pelanggan",
    tier: "Classmate",
    poin: 100,
    coin_balance: 100,
    totalPoin: 100,
    avatar: "https://picsum.photos/seed/u-1791740416465/100/100",
    avatar_url: "https://picsum.photos/seed/u-1791740416465/100/100",
    password_plain: "UjiIntegrasi#2026",
    passwordHash: "$2b$12$7f3iMB12O0hoC51v0TnmbufCjA2JiI/QFIhcQMbqjNBYIbd8MTODy",
    createdAt: "2026-10-11T17:40:16Z"
  },
  {
    id: "user-1780648444622",
    nama: "Ahmad Fauzi Fore Test",
    nim: "NIM-771",
    email: "fauzi@student.telkomuniversity.ac.id",
    phone: "087711223344",
    role: "Pelanggan",
    tier: "Classmate",
    poin: 1600,
    coin_balance: 1600,
    totalPoin: 3100,
    avatar: "https://picsum.photos/seed/user-1780648444622/100/100",
    avatar_url: "https://picsum.photos/seed/user-1780648444622/100/100",
    password_plain: "123456",
    passwordHash: bcrypt.hashSync("123456", 10),
    createdAt: "2026-06-05T08:34:04Z"
  }
];

class UserModel {
  constructor() {
    this.users = [...initialUsers];
  }

  // Normalisasi data row database atau in-memory agar format seragam
  _formatUser(raw) {
    if (!raw) return null;
    const pts = parseInt(raw.coin_balance ?? raw.poin ?? 0, 10);
    const totalPts = parseInt(raw.totalPoin ?? raw.total_points ?? pts, 10);

    // Hitung tier otomatis berdasarkan total poin akumulasi
    let tier = raw.tier;
    if (!tier || tier === 'Pelanggan') {
      if (totalPts >= 35001) tier = 'Hall of Fame';
      else if (totalPts >= 15001) tier = 'Campus Star';
      else if (totalPts >= 5001) tier = 'Study Buddy';
      else tier = 'Classmate';
    }

    return {
      id: raw.id,
      nama: raw.nama || raw.name || '',
      nim: raw.nim || '',
      email: raw.email || '',
      phone: raw.phone || raw.phone_number || '',
      role: raw.role || 'Mahasiswa',
      tier: tier,
      poin: pts,
      coin_balance: pts,
      totalPoin: totalPts,
      total_points: totalPts,
      avatar: raw.avatar || raw.avatar_url || null,
      avatar_url: raw.avatar_url || raw.avatar || null,
      passwordHash: raw.passwordHash || raw.password_hash || null,
      passwordPlain: raw.password_plain || raw.passwordPlain || null,
      createdAt: raw.createdAt || raw.created_at || new Date().toISOString()
    };
  }

  /**
   * Verifikasi password pengguna menggunakan berbagai metode hashing (bcrypt, sha256, plain)
   */
  verifyPassword(user, candidatePassword) {
    if (!user || !candidatePassword) return false;

    const plain = String(candidatePassword);

    // Hanya bcrypt yang diizinkan
    const hash = user.passwordHash || user.password_hash;
    if (!hash) {
      return false;
    }

    // Cek bcrypt ($2a$ / $2b$ / $2y$)
    if (typeof hash === 'string' && hash.startsWith('$2')) {
      try {
        if (bcrypt.compareSync(plain, hash)) return true;
      } catch (e) {
        // Abaikan error compare bcrypt
      }
    }

    return false;
  }

  /**
   * Cari pengguna berdasarkan NIM atau Email
   */
  async findByNimOrEmail(identifier) {
    if (!identifier) return null;
    const clean = String(identifier).trim().toLowerCase();

    // 1. Coba lewat MySQL jika terkoneksi
    if (isDbConnected()) {
      try {
        const rows = await query(
          'SELECT * FROM users WHERE LOWER(nim) = ? OR LOWER(email) = ? OR LOWER(phone) = ? LIMIT 1',
          [clean, clean, clean]
        );
        if (rows && rows.length > 0) {
          return this._formatUser(rows[0]);
        }
      } catch (err) {
        console.warn('MySQL findByNimOrEmail error, falling back to memory:', err.message);
      }
    }

    // 2. Fallback In-Memory
    const found = this.users.find(u => {
      const uNim = (u.nim || '').toLowerCase();
      const uEmail = (u.email || '').toLowerCase();
      const uPhone = (u.phone || '').toLowerCase();
      return uNim === clean || uEmail === clean || uPhone === clean;
    });

    return found ? this._formatUser(found) : null;
  }

  /**
   * Cari pengguna berdasarkan ID
   */
  async findById(id) {
    if (id === undefined || id === null) return null;
    const strId = String(id);
    const numId = parseInt(id, 10);

    // 1. Coba lewat MySQL
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [strId]);
        if (rows && rows.length > 0) {
          return this._formatUser(rows[0]);
        }
      } catch (err) {
        console.warn('MySQL findById error, falling back to memory:', err.message);
      }
    }

    // 2. Fallback In-Memory
    const found = this.users.find(u => String(u.id) === strId || (numId && u.id === numId));
    return found ? this._formatUser(found) : null;
  }

  /**
   * Registrasi Pengguna Baru
   */
  async create({ nama, nim, email, phone, password }) {
    const existing = await this.findByNimOrEmail(nim) || (email ? await this.findByNimOrEmail(email) : null);
    if (existing) {
      throw new Error('NIM atau Email sudah terdaftar.');
    }

    const hashedPassword = bcrypt.hashSync(password || '123456', 10);
    const generatedId = `u-${Date.now()}`;
    const userEmail = email || `${nim || 'user'}@student.telkomuniversity.ac.id`;
    const userPhone = phone || '';
    const userName = nama || 'Mahasiswa Telkom';
    const initialPoints = 100; // Welcome bonus

    // 1. Simpan ke MySQL jika terkoneksi
    if (isDbConnected()) {
      try {
        await query(
          `INSERT INTO users (id, nama, nim, email, phone, role, coin_balance, password_hash, password_plain)
           VALUES (?, ?, ?, ?, ?, 'Pelanggan', ?, ?, ?)`,
          [generatedId, userName, nim, userEmail, userPhone, initialPoints, hashedPassword, password]
        );
        return await this.findById(generatedId);
      } catch (err) {
        console.warn('MySQL create user error, saving to memory instead:', err.message);
      }
    }

    // 2. Simpan ke In-Memory Store
    const newUser = {
      id: generatedId,
      nama: userName,
      nim: nim || '',
      email: userEmail,
      phone: userPhone,
      role: 'Mahasiswa',
      tier: 'Classmate',
      poin: initialPoints,
      coin_balance: initialPoints,
      totalPoin: initialPoints,
      avatar: null,
      avatar_url: null,
      passwordHash: hashedPassword,
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);
    return this._formatUser(newUser);
  }

  /**
   * Update Profil Pengguna
   */
  async updateProfile(id, updateData) {
    const strId = String(id);

    // 1. MySQL
    if (isDbConnected()) {
      try {
        const fields = [];
        const values = [];
        if (updateData.nama) {
          fields.push('nama = ?');
          values.push(updateData.nama.trim());
        }
        if (updateData.phone) {
          fields.push('phone = ?');
          values.push(updateData.phone.trim());
        }
        if (updateData.email) {
          fields.push('email = ?');
          values.push(updateData.email.trim());
        }
        if (updateData.nim) {
          fields.push('nim = ?');
          values.push(updateData.nim.trim());
        }
        if (updateData.avatar || updateData.avatar_url) {
          fields.push('avatar_url = ?');
          values.push(updateData.avatar || updateData.avatar_url);
        }

        if (fields.length > 0) {
          values.push(strId);
          await query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
          return await this.findById(strId);
        }
      } catch (err) {
        console.warn('MySQL updateProfile error, fallback to memory:', err.message);
      }
    }

    // 2. In-Memory
    const user = this.users.find(u => String(u.id) === strId || (parseInt(id, 10) && u.id === parseInt(id, 10)));
    if (!user) return null;

    if (updateData.nama) user.nama = updateData.nama.trim();
    if (updateData.phone) user.phone = updateData.phone.trim();
    if (updateData.email) user.email = updateData.email.trim();
    if (updateData.nim) user.nim = updateData.nim.trim();
    if (updateData.avatar) {
      user.avatar = updateData.avatar;
      user.avatar_url = updateData.avatar;
    }
    if (updateData.tier) user.tier = updateData.tier;

    return this._formatUser(user);
  }

  /**
   * Update Password Pengguna
   */
  async updatePassword(id, newPassword) {
    const strId = String(id);
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // 1. MySQL
    if (isDbConnected()) {
      try {
        await query(
          'UPDATE users SET password_hash = ?, password_plain = ? WHERE id = ?',
          [hashedPassword, newPassword, strId]
        );
        return true;
      } catch (err) {
        console.warn('MySQL updatePassword error, fallback to memory:', err.message);
      }
    }

    // 2. In-Memory
    const user = this.users.find(u => String(u.id) === strId || (parseInt(id, 10) && u.id === parseInt(id, 10)));
    if (!user) return false;

    user.passwordHash = hashedPassword;
    user.password_plain = newPassword;
    return true;
  }

  /**
   * Update Saldo Poin / Koin Pengguna
   */
  async updatePoints(id, addedPoints) {
    const strId = String(id);
    const delta = parseInt(addedPoints, 10) || 0;

    // 1. MySQL
    if (isDbConnected()) {
      try {
        await query(
          'UPDATE users SET coin_balance = GREATEST(0, coin_balance + ?) WHERE id = ?',
          [delta, strId]
        );
        return await this.findById(strId);
      } catch (err) {
        console.warn('MySQL updatePoints error, fallback to memory:', err.message);
      }
    }

    // 2. In-Memory
    const user = this.users.find(u => String(u.id) === strId || (parseInt(id, 10) && u.id === parseInt(id, 10)));
    if (!user) return null;

    user.poin = Math.max(0, (user.poin || 0) + delta);
    user.coin_balance = user.poin;
    if (delta > 0) {
      user.totalPoin = (user.totalPoin || user.poin) + delta;
    }
    return this._formatUser(user);
  }

  /**
   * Mengambil semua daftar user
   */
  async getAllUsers() {
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM users');
        return rows.map(r => this._formatUser(r));
      } catch (err) {
        // fallback
      }
    }
    return this.users.map(u => this._formatUser(u));
  }
}

export default new UserModel();
