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
    topic: "fasilitas_coworking",
    keywords: ["fasilitas", "coworking", "wifi", "colokan", "listrik", "belajar", "nugas", "meja", "lounge"],
    answer: "Area WarmingUp Lantai 4 FIT dilengkapi meja belajar nyaman untuk nugas/diskusi kelompok, colokan listrik di area tempat duduk untuk laptop dan handphone, akses internet WiFi kampus yang cepat, serta sirkulasi ruangan terbuka yang sejuk dan nyaman."
  },
  {
    topic: "menu_makanan",
    keywords: ["menu", "makan", "makanan", "harga", "ayam", "nasi goreng", "es teh", "minum", "daftar menu"],
    answer: "Daftar Menu Resmi WarmingUp FIT:\n• Ayam Bakar: Rp 23.000 (Daging empuk rempah khas)\n• Nasi Goreng Gila: Rp 14.000 (Pedas favorit, sosis, bakso, telur)\n• Nasi Goreng Reguler: Rp 15.000 (Gurih mantap)\n• Es Teh Manis: Rp 7.000 (Melati dingin segar)\n• Mie Dok Dok (Pre-Order): Rp 17.000\n• Nasi Padang (PO Jum'at Berkah): Rp 15.000"
  },
  {
    topic: "menu_preorder",
    keywords: ["preorder", "pre-order", "po", "dok dok", "padang", "jumat", "jum'at"],
    answer: "Menu Spesial Pre-Order (PO) WarmingUp:\n1. Mie Dok Dok (PO): Rp 17.000 (Kuah kental gurih hangat)\n2. Nasi Padang (PO Jum'at Berkah): Rp 15.000 (Paket lengkap spesial Jumat)\nPemesanan menu Pre-Order dapat dikoordinasikan langsung sebelum batas waktu harian di kasir."
  },
  {
    topic: "pembayaran",
    keywords: ["bayar", "pembayaran", "qris", "tunai", "cash", "gopay", "ovo", "dana", "shopeepay"],
    answer: "Metode pembayaran di WarmingUp FIT mendukung QRIS (semua e-wallet dan m-Banking) serta Tunai (Cash di meja kasir). Jangan lupa tunjukkan QR Member PointLab Anda sebelum membayar agar transaksi otomatis mendapatkan poin!"
  },
  {
    topic: "poin_dan_cara_dapat",
    keywords: ["poin", "point", "dapat poin", "koin", "cara dapat", "bonus", "reward"],
    answer: "Cara Mendapatkan Poin PointLab:\n1. Transaksi F&B: Setiap Rp 1.000 belanja di WarmingUp FIT = 1 poin.\n2. Bonus Akun Baru: 100 poin gratis saat pertama kali mendaftar.\n3. Play & Earn: Mainkan mini-game harian di aplikasi Ngolab Gami.\n4. Study Session: Catat sesi belajar di coworking space (misal 90 menit = 45 poin bonus).\n5. Multiplier Tier: Tier lebih tinggi melipatgandakan perolehan poin hingga 2x lipat."
  },
  {
    topic: "tier_membership",
    keywords: ["tier", "level", "classmate", "study buddy", "campus star", "hall of fame", "tingkatan", "keuntungan"],
    answer: "Tingkatan Tier Membership PointLab:\n1. Classmate (0 - 5.000 poin): 1x poin, akses promo bulanan, gratis 1 minuman selamat datang, ulasan menu.\n2. Study Buddy (5.001 - 15.000 poin): 1.2x poin, upsize 1x/minggu, gratis topping, promo 2 hari lebih awal, diskon 5% tiap Selasa.\n3. Campus Star (15.001 - 35.000 poin): 1.5x poin, diskon tetap 5% all menu, Birthday Treat, antrian dapur prioritas, akses Secret Menu, reservasi meja.\n4. Hall of Fame (> 35.000 poin): 2x poin, diskon tetap 15%, bebas upsize tanpa batas, Birthday Feast Rp 150k, meja VVIP, gratis kopi pagi tiap hari operasional, CS VIP 24/7."
  },
  {
    topic: "rfid_member_card",
    keywords: ["rfid", "kartu", "tap", "kartu fisik", "sensor kartu"],
    answer: "Setiap member PointLab memiliki ID RFID digital dan dapat ditautkan dengan kartu fisik RFID. Cukup tempelkan (tap) kartu atau scan QR Member Anda pada mesin pembaca kasir/kiosk untuk login instan dan akumulasi poin."
  },
  {
    topic: "study_session",
    keywords: ["study session", "sesi belajar", "nugas", "timer", "belajar mandiri"],
    answer: "Fitur Study Session memungkinkan Anda mencatat waktu belajar mandiri atau kelompok di area coworking WarmingUp. Cukup mulai sesi di tab Study Tracker, dan setelah selesai kumpulkan poin loyalitas tambahan!"
  },
  {
    topic: "game_play_earn",
    keywords: ["game", "play", "earn", "ngolab catch", "burger", "boba", "koin game"],
    answer: "Anda dapat memainkan game interaktif (Ngolab Catch, Boba Tap, Fast Burger, dll) di aplikasi NGOLAB-GAMI. Kumpulkan skor tertinggi harian untuk mendapatkan koin reward yang langsung masuk ke akun PointLab Anda!"
  },
  {
    topic: "lupa_password",
    keywords: ["lupa password", "reset password", "ganti password", "ubah sandi", "kata sandi"],
    answer: "Untuk reset atau ganti password:\n1. Jika belum login: Klik 'Lupa Password?' di halaman Login, masukkan email atau username terdaftar untuk menerima petunjuk reset.\n2. Jika sudah login: Buka menu Akun / Profile -> Pengaturan Profil -> Ganti Password, masukkan kata sandi baru minimal 6 karakter, lalu simpan perubahan."
  },
  {
    topic: "kerja_sama_dan_cashback",
    keywords: ["kerja sama", "kerjasama", "rapat", "event", "gathering", "katering", "cashback cash", "organisasi", "komunitas"],
    answer: "WarmingUp FIT membuka kerja sama untuk organisasi & komunitas mahasiswa sebagai tempat rapat, gathering, atau pemesanan katering/konsumsi. Setiap kerja sama mendapatkan keuntungan spesial Cashback langsung dalam bentuk UANG TUNAI (Cash)! Hubungi meja kasir atau WhatsApp resmi untuk koordinasi."
  },
  {
    topic: "kiosk_sensor",
    keywords: ["kiosk", "sensor", "gestur", "gesture", "gesture-eats", "tanpa sentuh"],
    answer: "Pemesanan mandiri dapat dilakukan di mesin Kiosk depan outlet tanpa menyentuh layar, cukup menggunakan sensor gestur tangan (Gesture-Eats) yang higienis, cepat, dan modern."
  },
  {
    topic: "kontak_cs",
    keywords: ["kontak", "cs", "customer service", "wa", "whatsapp", "bantuan", "instagram", "admin"],
    answer: "Pusat Bantuan Resmi PointLab & WarmingUp FIT:\n• WhatsApp Support: +62 813-7488-1250 (https://wa.me/6281374881250)\n• Instagram: @ngolabcafe (https://instagram.com/ngolabcafe)\n• Layanan Langsung: Meja Kasir WarmingUp Lantai 4 Gedung FIT Telkom University."
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
