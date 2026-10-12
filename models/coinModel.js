/**
 * CoinModel - PointLab MVC Model Layer
 * Mengelola kalkulasi poin, tier level (Classmate, Study Buddy, Campus Star, Hall of Fame),
 * dan riwayat transaksi poin F&B / aktivitas.
 */

const TIERS = [
  { id: 0, name: "Classmate", minPoints: 0, maxPoints: 5000, multiplier: 1.0, badgeColor: "#94A3B8" },
  { id: 1, name: "Study Buddy", minPoints: 5001, maxPoints: 15000, multiplier: 1.2, badgeColor: "#38BDF8" },
  { id: 2, name: "Campus Star", minPoints: 15001, maxPoints: 35000, multiplier: 1.5, badgeColor: "#F59E0B" },
  { id: 3, name: "Hall of Fame", minPoints: 35001, maxPoints: Infinity, multiplier: 2.0, badgeColor: "#EC4899" }
];

const defaultHistory = [
  {
    id: 101,
    title: "Pembelian Ayam Bakar + Es Teh",
    category: "Transaksi F&B",
    points: "+30",
    date: "2026-10-10 12:30",
    status: "Berhasil"
  },
  {
    id: 102,
    title: "Tukar Voucher Nasi Goreng Gila",
    category: "Penukaran Poin",
    points: "-150",
    date: "2026-10-09 14:15",
    status: "Berhasil"
  },
  {
    id: 103,
    title: "Bonus Sesi Belajar (Study Session)",
    category: "Aktivitas Coworking",
    points: "+45",
    date: "2026-10-08 16:00",
    status: "Berhasil"
  },
  {
    id: 104,
    title: "Bonus Selamat Datang PointLab",
    category: "Bonus Pendaftaran",
    points: "+100",
    date: "2026-10-01 09:00",
    status: "Berhasil"
  }
];

class CoinModel {
  constructor() {
    this.history = [...defaultHistory];
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

  getHistory(userId) {
    return this.history;
  }

  addHistory(transaction) {
    const record = {
      id: Date.now(),
      title: transaction.title || "Transaksi Poin",
      category: transaction.category || "Umum",
      points: transaction.points > 0 ? `+${transaction.points}` : `${transaction.points}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "Berhasil"
    };
    this.history.unshift(record);
    return record;
  }
}

export default new CoinModel();
