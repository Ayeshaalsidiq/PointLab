/**
 * PromoModel - PointLab MVC Model Layer
 * Mengelola katalog promo diskon/voucher, penukaran poin, dan validasi kode promo
 * dengan sinkronisasi ke tabel `coin_promos` & `user_vouchers` di MySQL.
 */

import { isDbConnected, query } from '../config/db.js';

const initialPromos = [
  {
    id: "cp-1780646073298",
    title: "Diskon 20% Ayam Bakar",
    desc: "Ayam bakar diskon besar-besaran untuk makan siang hemat di WarmingUp FIT.",
    pointsRequired: 200,
    coin_cost: 200,
    validUntil: "30 Hari setelah klaim",
    category: "Makanan",
    code: "AYAM20",
    banner: "discount",
    image_url: "/uploads/promos/promo-1780646072923.jpeg"
  },
  {
    id: "cp-1781605494257",
    title: "Beli Ayam Bakar Gratis Esteh manis",
    desc: "Dapatkan 1 cup Es Teh Manis dingin gratis pada pembelian paket Ayam Bakar.",
    pointsRequired: 400,
    coin_cost: 400,
    validUntil: "14 Hari setelah klaim",
    category: "Minuman",
    code: "AYAMTEH",
    banner: "drink",
    image_url: "/uploads/promos/promo-1781605494248.jpeg"
  },
  {
    id: "cp-1780649192893",
    title: "Voucher Diskon Spesial NGOLABin88",
    desc: "Diskon ekstra 20% all menu menggunakan kode promo khusus mahasiswa.",
    pointsRequired: 200,
    coin_cost: 200,
    validUntil: "21 Hari setelah klaim",
    category: "Makanan",
    code: "NGOLABin88",
    banner: "food",
    image_url: "/uploads/default_voucher.png"
  },
  {
    id: "cp-1781704530917",
    title: "Cashback 20% Nasi Goreng Gila",
    desc: "Cashback koin 20% khusus pembelian Nasi Goreng Gila terfavorit.",
    pointsRequired: 150,
    coin_cost: 150,
    validUntil: "30 Hari setelah klaim",
    category: "Makanan",
    code: "GILACASH20",
    banner: "food",
    image_url: "/uploads/default_voucher.png"
  },
  {
    id: "cp-1789530889514",
    title: "Voucher Diskon 20%",
    desc: "Diskon 20% khusus pembelian menu kantin (Minimal belanja Rp 5.000).",
    pointsRequired: 500,
    coin_cost: 500,
    validUntil: "30 Hari setelah klaim",
    category: "Semua",
    code: "NGOLABID",
    banner: "discount",
    image_url: "/uploads/default_voucher.png"
  },
  {
    id: "cp-kantin-50k",
    title: "Voucher Makan Kantin Rp 50.000",
    desc: "Potongan langsung Rp 50.000 untuk seluruh menu kantin WarmingUp / Ngolab.",
    pointsRequired: 5000,
    coin_cost: 5000,
    validUntil: "30 Hari setelah klaim",
    category: "Makanan",
    code: "KANTIN50K",
    banner: "facility",
    image_url: "/uploads/default_voucher.png"
  }
];

class PromoModel {
  constructor() {
    this.promos = [...initialPromos];
    this.userVouchers = [];
  }

  async getAllPromos() {
    if (isDbConnected()) {
      try {
        const rows = await query('SELECT * FROM coin_promos WHERE is_active = 1');
        if (rows && rows.length > 0) {
          return rows.map(r => ({
            id: r.id,
            title: r.title,
            desc: r.description || r.title,
            pointsRequired: r.coin_cost,
            coin_cost: r.coin_cost,
            validUntil: r.valid_until ? new Date(r.valid_until).toISOString().split('T')[0] : "30 Hari",
            category: r.category || "Makanan",
            code: r.promo_code || `PROMO-${r.id}`,
            banner: r.discount_type || "discount",
            image_url: r.image_url || "/uploads/default_voucher.png"
          }));
        }
      } catch (err) {
        console.warn('MySQL getAllPromos error, using memory:', err.message);
      }
    }
    return this.promos;
  }

  async getPromoById(id) {
    if (!id) return null;
    const all = await this.getAllPromos();
    const strId = String(id);
    return all.find(p => String(p.id) === strId || (parseInt(id, 10) && p.id === parseInt(id, 10))) || null;
  }

  async redeemPromo(promoId, userId) {
    const promo = await this.getPromoById(promoId);
    if (!promo) {
      throw new Error('Promo tidak ditemukan.');
    }

    const uniqueCode = `${promo.code || 'VCR'}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    const voucherId = `vcr-${Date.now()}`;
    const strUserId = String(userId || 1);

    const voucher = {
      id: voucherId,
      userId: strUserId,
      promoId: promo.id,
      title: promo.title,
      desc: promo.desc,
      code: uniqueCode,
      voucher_code: uniqueCode,
      pointsSpent: promo.pointsRequired,
      claimedAt: new Date().toISOString(),
      expiresAt: expiryDate.toISOString().split('T')[0],
      isUsed: false,
      status: 'unused'
    };

    if (isDbConnected()) {
      try {
        await query(
          `INSERT INTO user_vouchers (id, user_id, promo_id, voucher_code, status)
           VALUES (?, ?, ?, ?, 'unused')`,
          [voucherId, strUserId, String(promo.id), uniqueCode]
        );
      } catch (err) {
        console.warn('MySQL redeemPromo error, saving to memory only:', err.message);
      }
    }

    this.userVouchers.push(voucher);
    return voucher;
  }

  async claimPromoCode(inputCode, userId) {
    if (!inputCode) throw new Error('Kode promo wajib diisi.');
    const clean = inputCode.trim().toUpperCase();
    const all = await this.getAllPromos();
    const promo = all.find(p => (p.code || '').toUpperCase() === clean);
    if (!promo) {
      throw new Error('Kode promo tidak valid atau sudah kedaluwarsa.');
    }
    return await this.redeemPromo(promo.id, userId || 1);
  }

  async getUserVouchers(userId) {
    const strUserId = String(userId || 1);

    if (isDbConnected()) {
      try {
        const rows = await query(
          `SELECT uv.*, cp.title, cp.description, cp.coin_cost
           FROM user_vouchers uv
           LEFT JOIN coin_promos cp ON uv.promo_id = cp.id
           WHERE uv.user_id = ?
           ORDER BY uv.created_at DESC`,
          [strUserId]
        );
        if (rows && rows.length > 0) {
          return rows.map(r => ({
            id: r.id,
            userId: r.user_id,
            promoId: r.promo_id,
            title: r.title || 'Voucher WarmingUp',
            desc: r.description || '',
            code: r.voucher_code,
            voucher_code: r.voucher_code,
            pointsSpent: r.coin_cost || 0,
            status: r.status,
            isUsed: r.status === 'used',
            claimedAt: new Date(r.created_at).toISOString(),
            expiresAt: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
          }));
        }
      } catch (err) {
        console.warn('MySQL getUserVouchers error, using memory:', err.message);
      }
    }

    return this.userVouchers.filter(v => String(v.userId) === strUserId);
  }
}

export default new PromoModel();
