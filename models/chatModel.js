/**
 * ChatModel - PointLab MVC Model Layer
 * Mengelola basis pengetahuan RAG resmi WarmingUp / Ngolab & resolver asisten AI.
 */

const KNOWLEDGE_ITEMS = [
  {
    topic: "lokasi",
    keywords: ["lokasi", "tempat", "lantai", "dimana", "alamat"],
    answer: "Kantin modern WarmingUp (Ngolab) berlokasi di Lantai 4 Gedung Fakultas Ilmu Terapan (FIT), Telkom University, Bandung, Jawa Barat."
  },
  {
    topic: "jam_operasional",
    keywords: ["jam", "buka", "tutup", "operasional", "jadwal", "hari"],
    answer: "WarmingUp buka Senin sampai Jumat pukul 08.00 – 17.00 WIB (Tutup pada hari Sabtu, Minggu, dan hari libur nasional)."
  },
  {
    topic: "menu_makanan",
    keywords: ["menu", "makan", "makanan", "harga", "ayam", "nasi goreng", "es teh", "minum"],
    answer: "Menu resmi WarmingUp FIT:\n• Ayam Bakar: Rp 23.000\n• Nasi Goreng Gila: Rp 14.000\n• Nasi Goreng Reguler: Rp 15.000\n• Es Teh Manis: Rp 7.000\n• Mie Dok Dok (Pre-Order): Rp 17.000\n• Nasi Padang (Pre-Order Jum'at Berkah): Rp 15.000"
  },
  {
    topic: "pembayaran",
    keywords: ["bayar", "pembayaran", "qris", "tunai", "cash", "gopay", "ovo", "dana"],
    answer: "Metode pembayaran di WarmingUp FIT mendukung QRIS (semua e-wallet dan m-Banking) serta Tunai (Cash di meja kasir). Jangan lupa tunjukkan QR Member PointLab Anda sebelum membayar agar mendapatkan poin!"
  },
  {
    topic: "poin_dan_tier",
    keywords: ["poin", "point", "tier", "level", "koin", "tukar", "redeem"],
    answer: "Setiap transaksi Rp 1.000 mendapatkan 1 poin. Tier keanggotaan terdiri dari: Classmate (0 - 5.000 poin), Study Buddy (5.001 - 15.000 poin), Campus Star (15.001 - 35.000 poin), dan Hall of Fame (> 35.000 poin) dengan bonus multiplier hingga 2x lipat."
  },
  {
    topic: "kiosk_sensor",
    keywords: ["kiosk", "sensor", "gestur", "gesture", "pesan"],
    answer: "Pemesanan mandiri dapat dilakukan di mesin Kiosk depan outlet tanpa menyentuh layar, cukup menggunakan sensor gestur tangan yang higienis."
  }
];

class ChatModel {
  constructor() {
    this.knowledge = [...KNOWLEDGE_ITEMS];
  }

  findKnowledge(query) {
    if (!query) return null;
    const lower = query.toLowerCase();

    for (const item of this.knowledge) {
      const match = item.keywords.some(kw => lower.includes(kw));
      if (match) {
        return item.answer;
      }
    }

    return null;
  }

  getKnowledgeBase() {
    return this.knowledge;
  }
}

export default new ChatModel();
