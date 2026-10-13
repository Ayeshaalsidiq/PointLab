/**
 * CoinModel - PointLab MVC Model Layer
 * Mengelola kalkulasi poin, tier level (Classmate, Study Buddy, Campus Star, Hall of Fame),
 * dan riwayat transaksi poin F&B / aktivitas per pengguna.
 */

import { isDbConnected, query } from '../config/db.js';

const TIERS = [
  { id: 0, name: "Classmate", minPoints: 0, maxPoints: 5000, multiplier: 1.0, badgeColor: "#94A3B8" },
  { id: 1, name: "Study Buddy", minPoints: 5001, maxPoints: 15000, multiplier: 1.2, badgeColor: "#38BDF8" },
  { id: 2, name: "Campus Star", minPoints: 15001, maxPoints: 35000, multiplier: 1.5, badgeColor: "#F59E0B" },
  { id: 3, name: "Hall of Fame", minPoints: 35001, maxPoints: Infinity, multiplier: 2.0, badgeColor: "#EC4899" }
];

const initialHistory = [
  {
    id: "ct-101",
    userId: 1,
    title: "Pembelian Ayam Bakar + Es Teh",
    category: "Transaksi F&B",
    type: "earn",
    points: "+30",
    amount: 30,
    date: "2026-10-10 12:30",
    status: "Berhasil"
  },
  {
    id: "ct-102",
    userId: 1,
    title: "Tukar Voucher Nasi Goreng Gila",
    category: "Penukaran Poin",
    type: "redeem",
    points: "-150",
    amount: -150,
    date: "2026-10-09 14:15",
    status: "Berhasil"
  },
  {
    id: "ct-103",
    userId: 1,
    title: "Bonus Sesi Belajar (Study Session)",
    category: "Aktivitas Coworking",
    type: "earn",
    points: "+45",
    amount: 45,
    date: "2026-10-08 16:00",
    status: "Berhasil"
  },
  {
    id: "ct-104",
    userId: 1,
    title: "Bonus Selamat Datang PointLab",
    category: "Bonus Pendaftaran",
    type: "earn",
    points: "+100",
    amount: 100,
    date: "2026-10-01 09:00",
    status: "Berhasil"
  },
  {
    id: "ct-1780329913764",
    userId: "607012400054",
    title: "Bonus Pendaftaran",
    category: "Bonus Pendaftaran",
    type: "earn",
    points: "+100",
    amount: 100,
    date: "2026-06-01 16:05",
    status: "Berhasil"
  },
  {
    id: "ct-1780329955250",
    userId: "607012400054",
    title: "Hadiah koin dari aktivitas game/kiosk",
    category: "Game / Kiosk",
    type: "earn",
    points: "+500",
    amount: 500,
    date: "2026-06-01 16:05",
    status: "Berhasil"
  },
  {
    id: "ct-1781697553700",
    userId: "7049509454",
    title: "Bonus Pendaftaran",
    category: "Bonus Pendaftaran",
    type: "earn",
    points: "+100",
    amount: 100,
    date: "2026-06-17 11:59",
    status: "Berhasil"
  }
];

class CoinModel {
  constructor() {
    this.history = [...initialHistory];
  }

  getTiers() {
    return TIERS;
  }

  calculateTier(totalPoints) {
    const points = parseInt(totalPoints, 10) || 0;
    for (let i = TIERS.length - 1; i >= 0; i--) {
      if (points >= TIERS[i].minPoints) {
        return TIERS[i];
      }
    }
    return TIERS[0];
  }

  async getHistory(userId) {
    const strUserId = userId ? String(userId) : null;

    // 1. Coba dari MySQL jika aktif
    if (isDbConnected() && strUserId) {
      try {
        const rows = await query(
          'SELECT * FROM coin_transactions WHERE user_id = ? ORDER BY created_at DESC',
          [strUserId]
        );
        if (rows && rows.length > 0) {
          return rows.map(r => ({
            id: r.id,
            userId: r.user_id,
            title: r.description || (r.type === 'earn' ? 'Poin Masuk' : 'Penukaran Poin'),
            category: r.type === 'earn' ? 'Perolehan Poin' : 'Penukaran Poin',
            type: r.type,
            points: r.type === 'earn' ? `+${r.amount}` : `-${r.amount}`,
            amount: r.amount,
            date: new Date(r.created_at).toISOString().replace('T', ' ').substring(0, 16),
            status: "Berhasil"
          }));
        }
      } catch (err) {
        console.warn('MySQL getHistory error, using memory:', err.message);
      }
    }

    // 2. Fallback In-Memory per-user
    if (!strUserId) return this.history;

    const userHist = this.history.filter(h => String(h.userId) === strUserId);
    if (userHist.length > 0) {
      return userHist;
    }

    // Jika user baru belum ada riwayat, buat riwayat selamat datang
    return [
      {
        id: `ct-welcome-${strUserId}`,
        userId: strUserId,
        title: "Bonus Selamat Datang Pengguna Baru",
        category: "Bonus Pendaftaran",
        type: "earn",
        points: "+100",
        amount: 100,
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: "Berhasil"
      }
    ];
  }

  async addHistory(transaction) {
    const record = {
      id: transaction.id || `ct-${Date.now()}`,
      userId: transaction.userId || 1,
      title: transaction.title || "Transaksi Poin",
      category: transaction.category || "Umum",
      type: transaction.type || (transaction.points > 0 ? "earn" : "redeem"),
      points: transaction.points > 0 ? `+${transaction.points}` : `${transaction.points}`,
      amount: Math.abs(transaction.points || transaction.amount || 0),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "Berhasil"
    };

    if (isDbConnected() && transaction.userId) {
      try {
        await query(
          `INSERT INTO coin_transactions (id, user_id, user_name, type, amount, description)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            record.id,
            String(transaction.userId),
            transaction.userName || 'Member PointLab',
            record.type,
            record.amount,
            record.title
          ]
        );
      } catch (err) {
        console.warn('MySQL addHistory error, saving to memory only:', err.message);
      }
    }

    this.history.unshift(record);
    return record;
  }
}

export default new CoinModel();
