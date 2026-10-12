/**
 * PromoModel - PointLab MVC Model Layer
 * Mengelola katalog promo diskon/voucher, penukaran poin, dan validasi kode promo.
 */

const defaultPromos = [
  {
    id: 1,
    title: "Potongan Rp 10.000 All Menu",
    desc: "Diskon Rp 10.000 untuk semua pilihan menu utama di WarmingUp FIT.",
    pointsRequired: 200,
    validUntil: "30 Hari setelah klaim",
    category: "Makanan",
    code: "WARMING10K",
    banner: "discount"
  },
  {
    id: 2,
    title: "Gratis Es Teh Manis Jumbo",
    desc: "Dapatkan 1 cup Es Teh Manis dingin segar gratis pada transaksi apa pun.",
    pointsRequired: 70,
    validUntil: "14 Hari setelah klaim",
    category: "Minuman",
    code: "FREETEA",
    banner: "drink"
  },
  {
    id: 3,
    title: "Cashback 20% Nasi Goreng Gila",
    desc: "Cashback koin 20% khusus pembelian Nasi Goreng Gila terfavorit.",
    pointsRequired: 150,
    validUntil: "21 Hari setelah klaim",
    category: "Makanan",
    code: "GILACASH20",
    banner: "food"
  },
  {
    id: 4,
    title: "Diskon 50% Sewa Meja Diskusi",
    desc: "Spesial mahasiswa yang membutuhkan reservasi meja rapat / nugas kelompok.",
    pointsRequired: 300,
    validUntil: "45 Hari setelah klaim",
    category: "Fasilitas",
    code: "COWORK50",
    banner: "facility"
  }
];

class PromoModel {
  constructor() {
    this.promos = [...defaultPromos];
    this.userVouchers = [];
  }

  getAllPromos() {
    return this.promos;
  }

  getPromoById(id) {
    const numId = parseInt(id, 10);
    return this.promos.find(p => p.id === numId) || null;
  }

  redeemPromo(promoId, userId) {
    const promo = this.getPromoById(promoId);
    if (!promo) {
      throw new Error('Promo tidak ditemukan.');
    }

    const uniqueCode = `${promo.code}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);

    const voucher = {
      id: Date.now(),
      promoId: promo.id,
      title: promo.title,
      desc: promo.desc,
      code: uniqueCode,
      pointsSpent: promo.pointsRequired,
      claimedAt: new Date().toISOString(),
      expiresAt: expiryDate.toISOString().split('T')[0],
      isUsed: false
    };

    this.userVouchers.push(voucher);
    return voucher;
  }

  claimPromoCode(inputCode) {
    if (!inputCode) throw new Error('Kode promo wajib diisi.');
    const clean = inputCode.trim().toUpperCase();
    const promo = this.promos.find(p => p.code.toUpperCase() === clean);
    if (!promo) {
      throw new Error('Kode promo tidak valid atau sudah kedaluwarsa.');
    }
    return this.redeemPromo(promo.id, 1);
  }

  getUserVouchers(userId) {
    return this.userVouchers;
  }
}

export default new PromoModel();
