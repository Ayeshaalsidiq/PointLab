import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Send, Sparkles, User, Copy, Check, 
  Utensils, MapPin, Coins, Ticket, History, Plus, 
  Trash2, X, MessageSquare, Clock 
} from 'lucide-react';

// Knowledge Resolver Mandiri jika RAG/Gemini mengalami kendala/limit
const resolveLocalPointLabKnowledge = (query) => {
  const q = query.toLowerCase();

  // 1. Kerja Sama, Tempat Rapat, Event & Kemitraan (Cashback Cash) - Prioritas Utama
  if (q.includes('kerja sama') || q.includes('kerjasama') || q.includes('rapat') || q.includes('meeting') || q.includes('sewa') || q.includes('booking') || q.includes('event') || q.includes('acara') || q.includes('kemitraan') || q.includes('gathering') || q.includes('organisasi') || q.includes('komunitas') || q.includes('kolaborasi')) {
    return "**Ya, tentu bisa! WarmingUp sangat terbuka untuk kerja sama.** 🤝\n\nArea WarmingUp / Ngolab di Lantai 4 FIT siap diajak kerja sama untuk berbagai keperluan, seperti:\n- **Tempat Rapat & Diskusi Organisasi / Komunitas Kampus**\n- **Acara Gathering, Meetup, Workshop & Event Mahasiswa**\n- **Penyediaan Konsumsi & Paket F&B Kegiatan**\n\n💰 **Keuntungan Spesial Kerja Sama:**\nSetiap kerja sama (misalnya menjadikan WarmingUp sebagai tempat rapat atau kegiatan organisasi) akan mendapatkan keuntungan **Cashback langsung dalam bentuk uang tunai (Cash)**!\n\n📞 **Kontak Resmi untuk Kerja Sama & Reservasi:**\nSama dengan kontak resmi di Pusat Bantuan, silakan hubungi kami melalui:\n- **WhatsApp Support:** **+62 813-7488-1250**\n- **Instagram Resmi:** **@ngolabcafe**\n- **Langsung di Lokasi:** Meja Kasir WarmingUp Lantai 4 Gedung FIT Telkom University\n\nSilakan hubungi WhatsApp atau kunjungi kasir kami untuk koordinasi jadwal, paket konsumsi, dan pencairan cashback tunai ya! 😊";
  }

  // 2. Kontak Resmi & Pusat Bantuan
  if (q.includes('kontak') || q.includes('contact') || q.includes('hubungi') || q.includes('pusat bantuan') || q.includes('whatsapp') || q.includes('instagram') || q.includes('customer service') || /\bwa\b/i.test(q) || /\big\b/i.test(q) || /\bcs\b/i.test(q) || q.includes('telepon') || q.includes('nomor telp') || q.includes('no hp') || /\badmin\b/i.test(q)) {
    return "Berikut adalah **Kontak Resmi** WarmingUp / PointLab (sama dengan kontak di menu Pusat Bantuan):\n\n- **WhatsApp Support:** **+62 813-7488-1250**\n- **Instagram:** **@ngolabcafe**\n- **Lokasi Langsung:** Meja Kasir Lantai 4 Gedung Fakultas Ilmu Terapan (FIT), Telkom University\n\nSilakan hubungi WhatsApp atau Instagram di atas untuk info kerja sama, pemesanan tempat, atau bantuan lainnya! 😊";
  }

  // 3. Penukaran Poin & Voucher (Tukar Poin / Redeem / Hadiah / Promo)
  if (q.includes('tukar') || q.includes('redeem') || q.includes('voucher') || q.includes('hadiah') || q.includes('diskon') || q.includes('promo') || q.includes('kode promo')) {
    return "Poin **PointLab** Anda bisa ditukarkan dengan berbagai reward & voucher potongan harga menarik:\n\n- **Diskon 20% Ayam Bakar:** Tukar 200 poin (min. order Rp 10.000)\n- **Beli Ayam Bakar Gratis Es Teh:** Tukar 400 poin\n- **Cashback 20%:** Tukar 2.500 poin\n- **Voucher Kantin Rp 50.000:** Tukar 5.000 poin\n- **Kode Promo Tambahan:** Gunakan kode **NGOLABin88**\n\n💡 **Cara Penukaran:** Buka aplikasi PointLab, masuk ke tab **Rewards / Voucher**, pilih voucher yang diinginkan, lalu klik Tukar Poin sebelum melakukan transaksi di kasir!";
  }

  // 4. Cara Dapat Poin & Sistem Kumpul Poin
  if (q.includes('dapat poin') || q.includes('dapet poin') || q.includes('kumpulin poin') || q.includes('kumpul poin') || q.includes('banyak poin') || q.includes('tambah poin') || q.includes('cari poin') || q.includes('peroleh poin') || (q.includes('cara') && (q.includes('poin') || q.includes('point')))) {
    return "Cara mengumpulkan banyak poin di **PointLab**:\n- **Transaksi F&B di WarmingUp:** Setiap belanja makanan atau minuman di kasir Lantai 4 FIT, tunjukkan QR Member Anda di aplikasi (setiap Rp 1.000 = 1 poin loyalitas).\n- **Bonus Member Baru:** Otomatis mendapatkan bonus 100 poin gratis saat pertama kali mendaftar akun PointLab.\n- **Play & Earn (Game Harian):** Selesaikan mini-game seru di aplikasi setiap hari untuk mengumpulkan koin & poin tambahan.\n- **Study Session:** Catat sesi belajar atau nugas mandiri Anda di area coworking WarmingUp (misal 90 menit = 45 poin bonus).\n- **Naikkan Tier Loyalitas:** Semakin tinggi tier Anda (Classmate → Study Buddy → Campus Star → Hall of Fame), semakin besar multiplier pengali poin Anda (hingga 2x lipat per transaksi)!";
  }

  // 5. Tier / Tingkatan Membership
  if (q.includes('tier') || q.includes('tingkat') || q.includes('level') || q.includes('membership') || (q.includes('member') && !q.includes('bayar'))) {
    return "Tingkatan Membership PointLab:\n- **Tier 1 - Classmate (0 - 5.000 Poin):** Multiplier 1x, promo reguler, voucher selamat datang gratis minuman.\n- **Tier 2 - Study Buddy (5.001 - 15.000 Poin):** Multiplier 1.2x, gratis upsize 1x/minggu, gratis topping, diskon 5% hari Selasa.\n- **Tier 3 - Campus Star (15.001 - 35.000 Poin):** Multiplier 1.5x, diskon tetap 5%, traktiran ultah gratis, antrean prioritas, akses secret menu.\n- **Tier 4 - Hall of Fame (35.001+ Poin):** Multiplier 2x, diskon tetap 15%, bebas upsize tanpa batas, voucher traktiran ultah Rp 150rb, meja VVIP, gratis kopi pagi.";
  }

  // 6. Penjelasan Poin Umum (Jika hanya bertanya 'poin' secara umum)
  if (q.includes('poin') || q.includes('point')) {
    return "**Poin PointLab** adalah sistem loyalitas untuk setiap transaksi F&B di WarmingUp Lantai 4 FIT.\n\n- **Cara Kumpul Poin:** Belanja F&B (Rp 1.000 = 1 poin), bonus pendaftaran (100 poin), mini-game harian Play & Earn, dan sesi study coworking.\n- **Bisa Ditukar Menjadi:** Diskon 20% Ayam Bakar (200 poin), Beli Ayam Bakar Gratis Es Teh (400 poin), Cashback 20% (2.500 poin), dan Voucher Kantin Rp 50.000 (5.000 poin).\n\nTunjukkan QR Member PointLab Anda di kasir sebelum membayar untuk mulai mengumpulkan poin!";
  }

  // 7. Metode Pembayaran & QRIS / Tunai
  if (q.includes('qris') || (q.includes('bayar') && !q.includes('poin')) || q.includes('pembayaran') || q.includes('tunai') || /\bcash\b/i.test(q) || /\buang\b/i.test(q) || q.includes('gopay') || q.includes('ovo') || q.includes('dana') || q.includes('debit')) {
    return "**Ya, tentu ada!** Pembayaran di WarmingUp / Ngolab Lantai 4 FIT mendukung metode:\n- **QRIS:** Bisa scan langsung menggunakan GoPay, OVO, DANA, ShopeePay, LinkAja, BCA, Mandiri, dan semua aplikasi m-Banking.\n- **Tunai (Cash):** Pembayaran langsung menggunakan uang tunai di meja kasir.\n\n💡 **Tips:** Sebelum membayar, jangan lupa buka aplikasi PointLab dan tunjukkan **QR Member** Anda ke kasir agar transaksi Anda mendapatkan poin loyalitas (setiap belanja Rp 1.000 = 1 poin)!";
  }

  // 7. Lokasi & Cara Pesan (Pertanyaan Kombinasi)
  if ((q.includes('lokasi') || q.includes('dimana') || q.includes('di mana') || q.includes('alamat')) && (q.includes('pesan') || q.includes('order') || q.includes('beli'))) {
    return "Lokasi WarmingUp / Ngolab berada di **Lantai 4 Fakultas Ilmu Terapan (FIT), Telkom University**.\n\nUntuk memesan makanan dan minuman, Anda bisa memesan melalui:\n- **Kiosk Sensor Gestur (Gesture-Eats):** Pesan mandiri di mesin Kiosk depan outlet tanpa sentuh layar (cukup arahkan tangan).\n- **Langsung di Meja Kasir:** Datang ke kasir Lantai 4 FIT, pilih menu, dan bayar via Tunai atau QRIS. Tunjukkan QR member PointLab sebelum bayar agar mendapat poin reward!";
  }

  // 8. Lokasi saja
  if (q.includes('lokasi') || q.includes('dimana') || q.includes('di mana') || q.includes('posisi') || q.includes('gedung') || q.includes('lantai') || q.includes('alamat') || (q.includes('tempat') && !q.includes('rapat') && !q.includes('makan'))) {
    return "Lokasi **WarmingUp / Ngolab** berada di **Lantai 4 Gedung Fakultas Ilmu Terapan (FIT), Telkom University**. Tempat ini menyediakan kantin modern F&B sekaligus coworking lounge untuk mahasiswa.";
  }

  // 9. Cara Pesan / Order / Kiosk
  if (q.includes('cara pesan') || q.includes('cara memesan') || q.includes('cara order') || q.includes('pesan makan') || q.includes('order makan') || q.includes('kiosk') || q.includes('sensor') || q.includes('gestur') || q.includes('gesture')) {
    return "Cara memesan makanan & minuman di WarmingUp:\n- **Kiosk Sensor Gestur:** Gunakan mesin Kiosk di depan outlet, pilih menu dengan gestur tangan tanpa menyentuh layar.\n- **Meja Kasir Langsung:** Datang ke kasir Lantai 4 FIT, pilih menu, dan bayar dengan Tunai atau QRIS.\n- **Pre-Order (PO):** Pesan menu PO sebelum batas waktu pemesanan.\n\n💡 Tips: Tunjukkan QR Code PointLab ke kasir untuk mengumpulkan poin reward!";
  }

  // 10. Jam Buka / Jam Operasional
  if (q.includes('jam') || q.includes('buka') || q.includes('tutup') || q.includes('operasional') || q.includes('jadwal') || q.includes('hari apa')) {
    return "WarmingUp / Ngolab beroperasi setiap hari **Senin – Jumat pukul 08.00 – 17.00 WIB** di Lantai 4 Gedung FIT Telkom University. (Tutup pada hari Sabtu, Minggu, dan hari libur nasional).";
  }

  // 11. Fasilitas / WiFi / Coworking / Colokan / Nugas
  if (q.includes('wifi') || q.includes('colokan') || q.includes('listrik') || q.includes('nugas') || q.includes('coworking') || q.includes('fasilitas') || q.includes('meja') || q.includes('belajar')) {
    return "WarmingUp Lantai 4 FIT dilengkapi area **Coworking & Student Lounge** yang sangat nyaman untuk mahasiswa, dengan fasilitas:\n- Colokan listrik di area tempat duduk untuk laptop/HP.\n- Akses internet WiFi cepat.\n- Meja belajar yang nyaman untuk santai maupun diskusi kelompok.\n- Ruangan bersih, nyaman, dan dekat dengan area F&B.";
  }

  // 12. Menu Pre-Order (PO) - Menggunakan regex kata utuh agar tidak cocok dengan kata 'poin'
  if (/\bpo\b/i.test(q) || q.includes('pre order') || q.includes('pre-order') || q.includes('preorder') || q.includes('dok dok') || q.includes('padang')) {
    return "Menu Spesial Pre-Order (PO) di WarmingUp:\n- **Mie Dok Dok (PO)** — Rp 17.000 (mie kuah kental gurih dengan bumbu khas hangat)\n- **Nasi Padang (PO Jum'at Berkah)** — Rp 15.000 (paket lengkap lezat khas Minang)\n\nSilakan pesan menu PO di kasir sebelum batas waktu pemesanan harian!";
  }

  // 13. Menu Spesifik & Rekomendasi
  if (q.includes('menu') || q.includes('makan') || q.includes('minum') || q.includes('harga') || q.includes('ayam') || q.includes('nasi goreng') || q.includes('es teh') || /\bteh\b/i.test(q) || q.includes('pedas') || q.includes('murah') || q.includes('enak') || q.includes('rekomendasi') || q.includes('favorit') || q.includes('best seller')) {
    if (q.includes('rekomendasi') || q.includes('enak') || q.includes('favorit') || q.includes('best seller')) {
      return "Rekomendasi menu terfavorit di WarmingUp / Ngolab:\n1. **Ayam Bakar (Rp 23.000)** — Daging empuk dengan bumbu bakar meresap lezat.\n2. **Nasi Goreng Gila (Rp 14.000)** — Sangat pedas dan gurih, menu wajib pencinta cabai!\n3. **Es Teh Manis (Rp 7.000)** — Minuman manis dingin yang segar.\n\nUntuk menu Pre-Order mingguan ada **Mie Dok Dok (Rp 17.000)** dan **Nasi Padang (Rp 15.000)**.";
    }
    if (q.includes('pedas')) {
      return "Menu paling pedas di Ngolab adalah **Nasi Goreng Gila** seharga **Rp 14.000** dengan racikan cabai mantap dan topping melimpah!";
    }
    if (q.includes('murah')) {
      return "Menu paling hemat di kantong mahasiswa:\n- Minuman: **Es Teh Manis** seharga **Rp 7.000**\n- Makanan: **Nasi Goreng Gila** seharga **Rp 14.000**";
    }
    if (q.includes('ayam')) {
      return "Harga **Ayam Bakar** adalah **Rp 23.000** (Ready Meal bumbu bakar lezat). Tersedia juga promo diskon 20% dengan menukarkan 200 poin di PointLab!";
    }
    if (q.includes('nasi goreng') || q.includes('gila')) {
      return "Pilihan Nasi Goreng di WarmingUp:\n- **Nasi Goreng Gila** — Rp 14.000 (pedas nampol, favorit mahasiswa)\n- **Nasi Goreng Reguler** — Rp 15.000 (gurih nikmat porsi pas)";
    }
    if (q.includes('es teh') || /\bteh\b/i.test(q)) {
      return "Harga **Es Teh Manis** adalah **Rp 7.000** dengan rasa manis dingin yang segar dan pas.";
    }
    return "Berikut adalah daftar menu resmi di WarmingUp / Ngolab:\n\n**Makanan & Menu Utama:**\n- **Ayam Bakar** — Rp 23.000 (bumbu bakar khas lezat)\n- **Nasi Goreng Gila** — Rp 14.000 (sangat pedas, favorit mahasiswa)\n- **Nasi Goreng Reguler** — Rp 15.000 (gurih nikmat khas Ngolab)\n\n**Minuman:**\n- **Es Teh Manis** — Rp 7.000 (dingin segar manis pas)\n\n**Menu Spesial Pre-Order (PO):**\n- **Mie Dok Dok (PO)** — Rp 17.000\n- **Nasi Padang (PO Jum'at Berkah)** — Rp 15.000";
  }

  // 14. Tentang PointLab / Ngolab / WarmingUp
  if (q.includes('pointlab') || q.includes('ngolab') || q.includes('warmingup') || q.includes('aplikasi') || q.includes('tentang')) {
    return "**PointLab** adalah aplikasi membership & loyalti resmi kantin modern **WarmingUp / Ngolab** di Lantai 4 FIT Telkom University. Melalui PointLab, Anda dapat mengumpulkan poin setiap kali memesan makanan/minuman, menaikkan tingkatan tier loyalitas, dan menukarkan poin dengan berbagai voucher potongan harga!";
  }

  // Fallback Edukatif jika tidak ada kata kunci yang cocok
  return "Maaf, saya belum menemukan jawaban yang tepat untuk pertanyaan tersebut.\n\nNamun, sebagai asisten resmi **PointLab (WarmingUp Lantai 4 FIT)**, Anda bisa menanyakan:\n- **Poin & Membership:** Cara mengumpulkan poin, daftar tier, dan voucher diskon\n- **Menu & Harga:** Ayam Bakar (Rp 23k), Nasi Goreng Gila (Rp 14k), Es Teh (Rp 7k)\n- **Kerja Sama & Kontak:** Info tempat rapat, cashback tunai, dan WhatsApp / Instagram support\n- **Pembayaran:** Pembayaran via QRIS atau Tunai\n- **Cara Pesan:** Kiosk Sensor Gestur atau langsung di kasir\n- **Lokasi & Jam Buka:** Lantai 4 FIT, Senin – Jumat 08.00 – 17.00 WIB\n\nSilakan tanyakan salah satu topik di atas ya! 😊";
};

// Helper untuk membersihkan dan merapikan respon AI agar natural
const sanitizeAndFormatResponse = (text, userQuery = '') => {
  if (!text) return '';

  const queryLower = userQuery.trim().toLowerCase();
  const greetings = [
    'halo', 'hai', 'hi', 'hei', 'hello', 'selamat pagi', 'selamat siang', 
    'selamat sore', 'selamat malam', 'p', 'tes', 'test', 'assalamualaikum',
    'kamu siapa', 'siapa kamu', 'bisa apa saja'
  ];
  
  const isGreeting = greetings.includes(queryLower) || /^(halo|hai|hello|hi)\b/i.test(queryLower);

  // Jika pengguna menyapa santai
  if (isGreeting) {
    return "Halo! Saya Ngolab AI, asisten virtual resmi PointLab. Ada yang bisa saya bantu seputar lokasi WarmingUp di Lantai 4 FIT, menu F&B, sistem tier membership, atau cara mengumpulkan poin hari ini? 😊";
  }

  // Jika RAG mengembalikan template kaku "tidak ditemukan", gunakan resolver mandiri
  if (text.includes("tidak ditemukan dalam knowledge base") || text.includes("Informasi tersebut tidak ditemukan")) {
    return resolveLocalPointLabKnowledge(userQuery);
  }

  // 1. Hapus tanda sitasi angka dokumen seperti [1], [2], [1][2]
  let cleaned = text.replace(/\[\d+\]/g, '');

  // 2. Hapus catatan internal / developer notes dari dokumen RAG
  cleaned = cleaned.replace(/^skipped:.*$/gmi, '');
  cleaned = cleaned.replace(/^note:.*$/gmi, '');

  // 3. Bersihkan tanda pagar heading markdown (##, ###) di awal baris
  cleaned = cleaned.replace(/^#+\s*/gm, '');

  // 4. Rapikan spasi berlebih sebelum tanda baca akibat hilangnya [1]
  cleaned = cleaned.replace(/\s+([.,!?])/g, '$1');

  // 5. Ubah baris tabel markdown jika ada menjadi format baris rapi
  cleaned = cleaned.replace(/^\|[-:\s|]+\|$/gm, '');
  cleaned = cleaned.replace(/^\|\s*(.*?)\s*\|$/gm, '- $1');

  // 6. Hapus penyebutan ber-AC agar selalu akurat dengan kondisi riil
  cleaned = cleaned.replace(/,\s*ber-ac/gi, '');
  cleaned = cleaned.replace(/ber-ac,\s*/gi, '');
  cleaned = cleaned.replace(/\s*ber-ac\s*/gi, ' ');

  // 7. Hapus baris voucher print dan bebas parkir agar selalu selaras dengan aturan terkini
  cleaned = cleaned.replace(/^.*(print\s*100\s*lembar|bebas\s*parkir|parkir\s*1\s*bulan|parkir\s*gratis).*$\n?/gmi, '');

  // 8. Rapikan baris kosong yang berlebihan
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
};

// Komponen perender pesan agar bold dan list tampil rapi tanpa tanda bintang mentah
const renderMessageContent = (content) => {
  if (typeof content !== 'string') return content;

  const lines = content.split('\n');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} style={{ height: '0.35rem' }} />;
        }

        // Cek apakah item berupa list / bullet
        const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ');
        const textToParse = isBullet ? trimmed.replace(/^[-*•]\s+/, '') : trimmed;

        // Parse format **bold**
        const parts = textToParse.split(/(\*\*.*?\*\*)/g);
        const parsedElements = parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} style={{ fontWeight: 700, color: 'inherit' }}>
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', paddingLeft: '0.2rem' }}>
              <span style={{ color: '#FF7A03', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: '1.3' }}>•</span>
              <span style={{ flex: 1, lineHeight: '1.6', fontSize: '0.95rem' }}>{parsedElements}</span>
            </div>
          );
        }

        return (
          <div key={idx} style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
            {parsedElements}
          </div>
        );
      })}
    </div>
  );
};

const SESSIONS_STORAGE_KEY = 'pointlab_chat_sessions_v1';
const ACTIVE_SESSION_STORAGE_KEY = 'pointlab_active_session_id';

const createNewSessionObject = () => ({
  id: 'sess_' + Date.now(),
  title: 'Obrolan Baru',
  createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
  updatedAt: Date.now(),
  messages: []
});

const AIChat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Membaca semua sesi dari localStorage agar tidak hilang saat web di-close
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Gagal membaca chat sessions:", e);
    }
    return [createNewSessionObject()];
  });

  // ID sesi aktif
  const [activeSessionId, setActiveSessionId] = useState(() => {
    const savedActive = localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
    return savedActive || null;
  });

  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  // Pastikan activeSessionId selalu sinkron dengan sesi yang ada
  useEffect(() => {
    if (!activeSessionId && sessions.length > 0) {
      setActiveSessionId(sessions[0].id);
    } else if (activeSessionId && !sessions.some(s => s.id === activeSessionId)) {
      setActiveSessionId(sessions[0]?.id || null);
    }
  }, [activeSessionId, sessions]);

  // Simpan seluruh sesi ke localStorage setiap kali ada perubahan
  useEffect(() => {
    try {
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error("Gagal menyimpan sessions ke localStorage:", e);
    }
  }, [sessions]);

  // Simpan ID sesi aktif ke localStorage
  useEffect(() => {
    if (activeSessionId) {
      try {
        localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, activeSessionId);
      } catch (e) {
        console.error("Gagal menyimpan activeSessionId:", e);
      }
    }
  }, [activeSessionId]);

  // Sesi aktif saat ini & daftar pesan di dalamnya
  const currentSession = sessions.find(s => s.id === activeSessionId) || sessions[0] || null;
  const messages = currentSession?.messages || [];

  // ==========================================
  // KONFIGURASI API RAG (AIONES) & GEMINI
  // ==========================================
  const RAG_API_URL = import.meta.env.VITE_RAG_API_URL || '/api-rag/query';
  const RAG_API_KEY = import.meta.env.VITE_RAG_API_KEY;
  const RAG_KB_ID = import.meta.env.VITE_RAG_KB_ID || 'kb_chat';
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  const systemPrompt = `Anda adalah AI Assistant resmi PointLab (Ngolab / WarmingUp).
Informasi resmi:
1. Lokasi WarmingUp / Ngolab berada di Lantai 4 Fakultas Ilmu Terapan (FIT), Telkom University.
2. PointLab adalah aplikasi perolehan dan penukaran poin membership kantin WarmingUp / Ngolab.
3. Menu: Ayam Bakar Rp 23.000, Nasi Goreng Gila Rp 14.000 (sangat pedas), Nasi Goreng Reguler Rp 15.000, Es Teh Manis Rp 7.000, Pre-Order Mie Dok Dok Rp 17.000, Nasi Padang Rp 15.000.
4. Cara pesan: Kiosk Sensor Gestur tanpa sentuh atau langsung di kasir Lantai 4 FIT (bayar Cash/QRIS). Scan QR PointLab untuk kumpulkan poin.
5. Poin: Belanja F&B Rp 1.000 = 1 poin. Bonus daftar 100 poin. Game harian Play & Earn.
6. Tier: Classmate (0-5k), Study Buddy (5k-15k), Campus Star (15k-35k), Hall of Fame (35k+).
7. Redeem: Diskon 20% Ayam Bakar (200 poin), Beli Ayam Bakar Gratis Es Teh (400 poin), Cashback 20% (2.5k poin), Voucher Kantin 50rb (5k poin).
8. Kerja Sama, Tempat Rapat & Kontak Resmi: WarmingUp Lantai 4 FIT sangat terbuka untuk kerja sama (seperti tempat rapat organisasi/komunitas, gathering, atau event). Keuntungan kerja sama: bisa dapat cashback langsung dalam bentuk uang tunai (cash)! Kontak untuk kerja sama/bantuan (sama dengan di menu Pusat Bantuan): WhatsApp +62 813-7488-1250 dan Instagram @ngolabcafe, atau langsung ke kasir Lantai 4 FIT.
Jawab ramah, padat, dan jangan pakai nomor sitasi seperti [1].`;

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const callGeminiAPI = async (userText, recentMessages = []) => {
    if (!GEMINI_API_KEY) throw new Error("Kunci Gemini tidak dikonfigurasi.");
    
    // Sertakan konteks multi-turn dari obrolan terkini
    const conversationContext = recentMessages.slice(-4).map(m => 
      `${m.sender === 'user' ? 'Pengguna' : 'Ngolab AI'}: ${m.text}`
    ).join('\n');

    const promptWithContext = conversationContext
      ? `${systemPrompt}\n\nRiwayat obrolan sebelumnya:\n${conversationContext}\n\nPertanyaan user saat ini: ${userText}`
      : `${systemPrompt}\n\nPertanyaan pengguna: ${userText}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: promptWithContext }]
          }
        ]
      })
    });
    
    const data = await response.json();
    if (data.error) throw new Error(data.error.message || "Gemini API error.");
    return data.candidates[0].content.parts[0].text;
  };

  const callRagAPI = async (userText, recentMessages = []) => {
    const qLower = userText.toLowerCase();

    // Prioritaskan knowledge lokal langsung jika pertanyaan jelas tentang kerja sama / tempat rapat / kemitraan / kontak resmi
    if (
      qLower.includes('kerja sama') || qLower.includes('kerjasama') || 
      qLower.includes('rapat') || qLower.includes('meeting') || qLower.includes('gathering') ||
      qLower.includes('kontak') || qLower.includes('contact') || qLower.includes('whatsapp') || 
      qLower.includes('instagram') || qLower.includes('hubungi') || qLower.includes('pusat bantuan')
    ) {
      return resolveLocalPointLabKnowledge(userText);
    }

    try {
      if (RAG_API_KEY) {
        const response = await fetch(RAG_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RAG_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query: userText,
            knowledge_base_id: RAG_KB_ID
          })
        });

        const data = await response.json();
        if (data.success && data.data?.answer) {
          const ans = data.data.answer;
          const isNotFound = ans.includes("tidak ditemukan dalam knowledge base") || 
                             ans.includes("Informasi tersebut tidak ditemukan") ||
                             data.data.grounded === false;
          
          if (!isNotFound) {
            return ans;
          }
        }
      }
    } catch (error) {
      console.warn("RAG fetch notice:", error);
    }

    // Jika RAG belum menemukan atau threshold rendah, coba Gemini atau Knowledge Resolver
    try {
      return await callGeminiAPI(userText, recentMessages);
    } catch {
      // Jika Google Gemini sedang 'high demand' / rate limit, gunakan Knowledge Resolver
      return resolveLocalPointLabKnowledge(userText);
    }
  };

  const sendMessageWithText = async (textToSend) => {
    if (!textToSend.trim() || isTyping || !currentSession) return;

    const userMessage = textToSend.trim();
    const nowTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const userMsgObj = { id: Date.now(), sender: 'user', text: userMessage, time: nowTime };

    const isFirstInSession = currentSession.messages.length === 0;
    const sessionTitle = isFirstInSession 
      ? (userMessage.length > 26 ? userMessage.slice(0, 26) + '...' : userMessage)
      : currentSession.title;

    // Update sesi aktif dengan pesan pengguna
    setSessions(prev => prev.map(s => {
      if (s.id === currentSession.id) {
        return {
          ...s,
          title: s.title === 'Obrolan Baru' ? sessionTitle : s.title,
          updatedAt: Date.now(),
          messages: [...s.messages, userMsgObj]
        };
      }
      return s;
    }));

    setInputValue('');
    setIsTyping(true);

    const rawAiResponse = await callRagAPI(userMessage, currentSession.messages);
    const aiResponseText = sanitizeAndFormatResponse(rawAiResponse, userMessage);

    const aiMsgObj = { 
      id: Date.now() + 1, 
      sender: 'ai', 
      text: aiResponseText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) 
    };

    // Update sesi aktif dengan balasan AI
    setSessions(prev => prev.map(s => {
      if (s.id === currentSession.id) {
        return {
          ...s,
          updatedAt: Date.now(),
          messages: [...s.messages, aiMsgObj]
        };
      }
      return s;
    }));

    setIsTyping(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessageWithText(inputValue);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handler fitur Sesi Chat
  const handleNewChat = () => {
    if (currentSession && currentSession.messages.length === 0) {
      setShowHistoryDrawer(false);
      return;
    }
    const newSession = createNewSessionObject();
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setShowHistoryDrawer(false);
  };

  const handleSelectSession = (id) => {
    setActiveSessionId(id);
    setShowHistoryDrawer(false);
  };

  const handleDeleteSession = (e, idToDelete) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== idToDelete);
    if (updated.length === 0) {
      const brandNew = createNewSessionObject();
      setSessions([brandNew]);
      setActiveSessionId(brandNew.id);
    } else {
      setSessions(updated);
      if (activeSessionId === idToDelete) {
        setActiveSessionId(updated[0].id);
      }
    }
  };

  const handleClearAllHistory = () => {
    if (window.confirm("Hapus semua riwayat sesi obrolan?")) {
      const brandNew = createNewSessionObject();
      setSessions([brandNew]);
      setActiveSessionId(brandNew.id);
      setShowHistoryDrawer(false);
    }
  };

  // Kartu rekomendasi pertanyaan
  const starterPrompts = [
    {
      icon: <Utensils size={18} color="#FF7A03" />,
      title: 'Menu Makanan & Minuman',
      desc: 'Lihat daftar menu lengkap beserta harganya',
      prompt: 'Ada menu apa saja di Ngolab dan berapa harganya?'
    },
    {
      icon: <MapPin size={18} color="#3B82F6" />,
      title: 'Lokasi & Cara Pesan',
      desc: 'Lokasi WarmingUp FIT & cara pesan di Kiosk',
      prompt: 'Di mana lokasi WarmingUp dan bagaimana cara memesan makanannya?'
    },
    {
      icon: <Coins size={18} color="#F59E0B" />,
      title: 'Sistem Poin Member',
      desc: 'Cara kumpulin poin & keuntungan tiap tingkatan tier',
      prompt: 'Bagaimana cara mendapatkan poin dan apa keuntungan tier membership?'
    },
    {
      icon: <Ticket size={18} color="#10B981" />,
      title: 'Promo & Voucher',
      desc: 'Promo makanan aktif & voucher yang bisa di-redeem',
      prompt: 'Ada promo makanan atau voucher apa saja yang bisa ditukar?'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#F8FAFC', position: 'relative', overflow: 'hidden' }}>
      
      {/* Subtle ambient glow */}
      <div style={{ position: 'absolute', top: '-120px', left: '15%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255, 122, 3, 0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }}></div>

      {/* Header Bar Clean, Minimalis & Kontrol Sesi */}
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E2E8F0',
        padding: '0.75rem 1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 50, position: 'sticky', top: 0
      }}>
        {/* Sisi Kiri: Tombol Back + Avatar Bulat + Nama */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
          <button 
            onClick={() => {
              const previousPage = location.state?.from || '/dashboard';
              navigate(previousPage);
            }} 
            style={{ 
              width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
              background: '#F1F5F9', border: '1px solid #E2E8F0',
              display: 'flex', justifyContent: 'center', alignItems: 'center', 
              cursor: 'pointer', color: '#475569', transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = '#E2E8F0'}
            onMouseOut={e => e.currentTarget.style.background = '#F1F5F9'}
            title="Kembali"
          >
            <ArrowLeft size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
            <div style={{ 
              position: 'relative', width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', 
              display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FF7A03',
              boxShadow: '0 4px 12px rgba(255, 122, 3, 0.15)'
            }}>
              <Sparkles size={18} />
              <span style={{ 
                position: 'absolute', bottom: '0px', right: '0px', 
                width: '9px', height: '9px', background: '#10B981', 
                border: '2px solid white', borderRadius: '50%' 
              }}></span>
            </div>

            <div style={{ minWidth: 0 }}>
              <h1 style={{ margin: 0, fontSize: '1.05rem', color: '#1E293B', fontWeight: 800, letterSpacing: '-0.3px', lineHeight: 1.2 }}>
                Ngolab AI
              </h1>
              {currentSession && currentSession.title !== 'Obrolan Baru' && (
                <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748B', maxWidth: '140px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentSession.title}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Tombol Riwayat Sesi & Tombol Chat Baru */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
          {/* Tombol Riwayat Sesi */}
          <button
            onClick={() => setShowHistoryDrawer(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.45rem 0.75rem', borderRadius: '20px',
              background: '#F1F5F9', border: '1px solid #E2E8F0',
              color: '#475569', fontSize: '0.8rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = '#E2E8F0'}
            onMouseOut={e => e.currentTarget.style.background = '#F1F5F9'}
            title="Riwayat Sesi Chat"
          >
            <History size={16} color="#FF7A03" />
            <span className="hide-on-mobile">Riwayat</span>
            {sessions.length > 0 && (
              <span style={{ 
                background: '#FF7A03', color: 'white', borderRadius: '10px', 
                fontSize: '0.65rem', padding: '1px 6px', fontWeight: 700 
              }}>
                {sessions.length}
              </span>
            )}
          </button>

          {/* Tombol Chat Baru */}
          <button
            onClick={handleNewChat}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.45rem 0.85rem', borderRadius: '20px',
              background: 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)',
              border: 'none', color: 'white', fontSize: '0.8rem', fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 10px rgba(255, 122, 3, 0.25)',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
            title="Mulai Obrolan Baru"
          >
            <Plus size={16} />
            <span>Baru</span>
          </button>
        </div>
      </header>

      {/* Slide-Over Drawer Riwayat Sesi (Clean Light Modern Theme) */}
      {showHistoryDrawer && (
        <div 
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(15, 23, 42, 0.35)',
            backdropFilter: 'blur(6px)',
            display: 'flex', justifyContent: 'flex-end',
            animation: 'fade-in 0.2s ease-out'
          }}
          onClick={() => setShowHistoryDrawer(false)}
        >
          <div 
            style={{
              width: '100%', maxWidth: '380px', height: '100%',
              background: '#FFFFFF',
              borderLeft: '1px solid #E2E8F0',
              display: 'flex', flexDirection: 'column',
              boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.08)',
              animation: 'slide-left 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Brand Accent Stripe */}
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #FF7A03 0%, #FFA34D 100%)', width: '100%' }}></div>

            {/* Drawer Header Clean */}
            <div style={{
              padding: '1.25rem 1.25rem 1rem 1.25rem',
              borderBottom: '1px solid #F1F5F9',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ 
                  width: '38px', height: '38px', borderRadius: '12px', 
                  background: '#FFF7ED', border: '1px solid #FFEDD5',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  boxShadow: '0 2px 8px rgba(255, 122, 3, 0.08)'
                }}>
                  <History size={18} color="#FF7A03" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#1E293B', letterSpacing: '-0.3px', fontFamily: 'Poppins, sans-serif' }}>
                    Riwayat Obrolan
                  </h3>
                  <span style={{ 
                    fontSize: '0.68rem', background: '#FFF7ED', 
                    color: '#FF7A03', border: '1px solid #FFEDD5', 
                    borderRadius: '12px', padding: '2px 8px', fontWeight: 700 
                  }}>
                    {sessions.length} Sesi
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setShowHistoryDrawer(false)}
                style={{ 
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: '#F8FAFC', border: '1px solid #E2E8F0', 
                  color: '#64748B', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#1E293B'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#64748B'; }}
                title="Tutup"
              >
                <X size={16} />
              </button>
            </div>

            {/* CTA Button: Mulai Percakapan Baru */}
            <div style={{ padding: '1rem 1.25rem 0.5rem 1.25rem' }}>
              <button
                onClick={handleNewChat}
                style={{
                  width: '100%', padding: '0.8rem 1rem',
                  background: 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)',
                  border: 'none', borderRadius: '14px',
                  color: 'white', fontWeight: 700, fontSize: '0.875rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 122, 3, 0.25)',
                  transition: 'all 0.2s', letterSpacing: '0.2px'
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 122, 3, 0.35)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 122, 3, 0.25)'; }}
              >
                <Plus size={18} strokeWidth={2.5} />
                <span>Mulai Percakapan Baru</span>
              </button>
            </div>

            {/* Section Title */}
            <div style={{ padding: '0.5rem 1.25rem 0.35rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                Daftar Percakapan
              </span>
            </div>

            {/* List Riwayat Sesi (Light Clean Cards) */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {sessions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94A3B8' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 1rem' }}>
                    <MessageSquare size={24} color="#94A3B8" />
                  </div>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: 600, color: '#64748B' }}>Belum ada obrolan</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#94A3B8' }}>Mulai pertanyaan pertama Anda ke Ngolab AI</p>
                </div>
              ) : (
                sessions.map((sess) => {
                  const isActive = sess.id === activeSessionId;
                  const msgCount = sess.messages?.length || 0;
                  const lastMsg = sess.messages?.[sess.messages.length - 1]?.text || 'Belum ada pesan';

                  return (
                    <div
                      key={sess.id}
                      onClick={() => handleSelectSession(sess.id)}
                      style={{
                        padding: '0.9rem 1rem',
                        borderRadius: '14px',
                        border: isActive ? '1.5px solid #FF7A03' : '1px solid #E2E8F0',
                        background: isActive 
                          ? 'linear-gradient(135deg, #FFF9F2 0%, #FFFFFF 100%)' 
                          : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        boxShadow: isActive ? '0 4px 15px rgba(255, 122, 3, 0.08)' : '0 2px 6px rgba(0, 0, 0, 0.02)'
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = '#F8FAFC';
                          e.currentTarget.style.borderColor = '#CBD5E1';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = '#FFFFFF';
                          e.currentTarget.style.borderColor = '#E2E8F0';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.02)';
                        }
                      }}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div style={{
                          position: 'absolute', left: '0', top: '12px', bottom: '12px',
                          width: '4px', background: '#FF7A03', borderRadius: '0 4px 4px 0'
                        }}></div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.65rem' }}>
                        <div style={{ flex: 1, minWidth: 0, paddingLeft: isActive ? '4px' : '0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.3rem' }}>
                            <MessageSquare size={14} color={isActive ? '#FF7A03' : '#64748B'} style={{ flexShrink: 0 }} />
                            <h4 style={{ 
                              margin: 0, fontSize: '0.875rem', fontWeight: 700, 
                              color: isActive ? '#FF7A03' : '#1E293B',
                              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
                            }}>
                              {sess.title}
                            </h4>
                            {isActive && (
                              <span style={{ 
                                marginLeft: 'auto', background: '#FFF7ED', color: '#FF7A03', 
                                border: '1px solid #FFEDD5',
                                fontSize: '0.62rem', fontWeight: 700, padding: '2px 7px', 
                                borderRadius: '6px', letterSpacing: '0.2px' 
                              }}>
                                Aktif
                              </span>
                            )}
                          </div>
                          
                          <p style={{ 
                            margin: '0 0 0.5rem 0', fontSize: '0.76rem', color: '#64748B',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            lineHeight: 1.4
                          }}>
                            {lastMsg}
                          </p>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.7rem', color: '#94A3B8' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Clock size={11} color="#94A3B8" /> {sess.createdAt}
                            </span>
                            <span>•</span>
                            <span>{msgCount} pesan</span>
                          </div>
                        </div>

                        {/* Tombol Hapus Sesi Individual */}
                        <button
                          onClick={(e) => handleDeleteSession(e, sess.id)}
                          style={{
                            background: '#F8FAFC', border: '1px solid #E2E8F0', 
                            color: '#94A3B8', cursor: 'pointer', width: '28px', height: '28px', 
                            borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            transition: 'all 0.2s', flexShrink: 0
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.color = '#EF4444';
                            e.currentTarget.style.background = '#FEE2E2';
                            e.currentTarget.style.borderColor = '#FECACA';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.color = '#94A3B8';
                            e.currentTarget.style.background = '#F8FAFC';
                            e.currentTarget.style.borderColor = '#E2E8F0';
                          }}
                          title="Hapus sesi ini"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Drawer Footer Clean (Tanpa Tulisan 'Tersimpan di Browser') */}
            {sessions.length > 0 && (
              <div style={{ 
                padding: '0.85rem 1.25rem', 
                borderTop: '1px solid #F1F5F9', 
                background: '#F8FAFC',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <button
                  onClick={handleClearAllHistory}
                  style={{
                    width: '100%', padding: '0.65rem',
                    background: 'transparent', border: '1px solid #E2E8F0',
                    borderRadius: '10px', color: '#64748B',
                    fontSize: '0.78rem', fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { 
                    e.currentTarget.style.color = '#EF4444'; 
                    e.currentTarget.style.background = '#FEE2E2'; 
                    e.currentTarget.style.borderColor = '#FECACA';
                  }}
                  onMouseOut={(e) => { 
                    e.currentTarget.style.color = '#64748B'; 
                    e.currentTarget.style.background = 'transparent'; 
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  <Trash2 size={14} />
                  <span>Bersihkan Semua Riwayat</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Conversation Feed */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '1.5rem 1rem 6rem 1rem', 
        display: 'flex', flexDirection: 'column', 
        zIndex: 5 
      }}>
        <div style={{ maxWidth: '820px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Welcome Screen */}
          {messages.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '2.5rem', paddingBottom: '2rem' }}>
              
              {/* Hero Icon Lingkaran */}
              <div style={{ 
                width: '68px', height: '68px', borderRadius: '50%', 
                background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                color: '#FF7A03', boxShadow: '0 12px 28px rgba(0,0,0,0.1), 0 0 0 6px rgba(255, 122, 3, 0.1)', 
                marginBottom: '1.25rem' 
              }}>
                <Sparkles size={34} />
              </div>

              {/* Title & Description */}
              <h2 style={{ 
                margin: '0 0 0.5rem 0', 
                fontSize: '1.65rem', fontWeight: 800, 
                color: '#1E293B', textAlign: 'center', letterSpacing: '-0.5px' 
              }}>
                Halo! Ada yang bisa dibantu hari ini?
              </h2>
              <p style={{ 
                margin: '0 0 2rem 0', 
                fontSize: '0.92rem', color: '#64748B', 
                textAlign: 'center', maxWidth: '480px', lineHeight: 1.5 
              }}>
                Tanyakan seputar menu makanan & minuman, harga, lokasi WarmingUp di Lantai 4 FIT, atau sistem penukaran poin PointLab.
              </p>

              {/* Starter Suggestion Cards Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                gap: '0.85rem', width: '100%' 
              }}>
                {starterPrompts.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => sendMessageWithText(item.prompt)}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '16px',
                      padding: '1.1rem 1.15rem',
                      display: 'flex', flexDirection: 'column', gap: '0.4rem',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.borderColor = '#FF7A03';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 122, 3, 0.12)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ 
                        width: '32px', height: '32px', borderRadius: '50%', 
                        background: '#F8FAFC', border: '1px solid #E2E8F0', 
                        display: 'flex', justifyContent: 'center', alignItems: 'center' 
                      }}>
                        {item.icon}
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1E293B' }}>{item.title}</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4 }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message List */}
          {messages.map(msg => {
            const isAI = msg.sender === 'ai';

            if (isAI) {
              return (
                <div key={msg.id} className="animate-fade-in" style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', width: '100%' }}>
                  {/* AI Avatar Lingkaran */}
                  <div style={{ 
                    width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    color: '#FF7A03', boxShadow: '0 4px 12px rgba(255, 122, 3, 0.1)'
                  }}>
                    <Sparkles size={18} />
                  </div>

                  {/* AI Response Card */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>Ngolab AI</span>
                      <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{msg.time}</span>
                    </div>

                    <div style={{ 
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '16px',
                      padding: '1.15rem 1.35rem',
                      color: '#334155',
                      boxShadow: '0 4px 18px rgba(0,0,0,0.03)',
                      wordBreak: 'break-word'
                    }}>
                      {renderMessageContent(msg.text)}
                    </div>

                    {/* Bottom Action Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem', paddingLeft: '0.2rem' }}>
                      <button 
                        onClick={() => handleCopy(msg.text, msg.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: copiedId === msg.id ? '#10B981' : '#94A3B8',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.color = '#FF7A03'}
                        onMouseOut={e => e.currentTarget.style.color = copiedId === msg.id ? '#10B981' : '#94A3B8'}
                        title="Salin jawaban ini"
                      >
                        {copiedId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedId === msg.id ? 'Tersalin!' : 'Salin'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // User Message
            return (
              <div key={msg.id} className="animate-fade-in" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', justifyContent: 'flex-end', width: '100%' }}>
                <div style={{ maxWidth: '80%' }}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)',
                    color: '#FFFFFF',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '18px 18px 4px 18px',
                    boxShadow: '0 6px 18px rgba(255, 122, 3, 0.25)',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    fontWeight: 500,
                    wordBreak: 'break-word'
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '0.25rem', paddingRight: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{msg.time}</span>
                  </div>
                </div>

                {/* User Avatar Lingkaran */}
                <div style={{ 
                  width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                  background: '#FFF7ED', border: '1px solid #FFEDD5',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  color: '#FF7A03'
                }}>
                  <User size={18} />
                </div>
              </div>
            );
          })}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="animate-fade-in" style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                color: '#FF7A03', boxShadow: '0 4px 12px rgba(255, 122, 3, 0.1)'
              }}>
                <Sparkles size={18} />
              </div>
              <div style={{ 
                background: '#FFFFFF', 
                padding: '0.85rem 1.25rem', 
                borderRadius: '16px', 
                border: '1px solid #E2E8F0', 
                display: 'flex', gap: '0.45rem', alignItems: 'center', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)' 
              }}>
                <div style={{ width: '7px', height: '7px', background: '#FF7A03', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.32s' }}></div>
                <div style={{ width: '7px', height: '7px', background: '#FF7A03', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.16s' }}></div>
                <div style={{ width: '7px', height: '7px', background: '#FF7A03', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }}></div>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', marginLeft: '0.35rem', fontWeight: 500 }}>Sedang mengetik...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area Bersih Tanpa Footnote Disclaimer */}
      <div style={{ 
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(180deg, rgba(248, 250, 252, 0) 0%, rgba(248, 250, 252, 0.95) 30%, #F8FAFC 100%)',
        padding: '1rem 1rem 1.25rem 1rem', 
        zIndex: 40 
      }}>
        <div style={{ maxWidth: '820px', width: '100%', margin: '0 auto' }}>
          <form 
            onSubmit={handleSendMessage} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '0.5rem', 
              background: '#FFFFFF', 
              padding: '0.45rem 0.5rem 0.45rem 1.25rem', 
              borderRadius: '24px', 
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08), 0 0 0 1px #E2E8F0',
              transition: 'box-shadow 0.2s'
            }}
          >
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tanya menu, harga, lokasi, atau poin ke Ngolab AI..." 
              style={{ 
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: '0.95rem', color: '#1E293B', fontWeight: 500
              }} 
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              style={{ 
                width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                background: (inputValue.trim() && !isTyping) ? 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)' : '#E2E8F0', 
                color: (inputValue.trim() && !isTyping) ? '#FFFFFF' : '#94A3B8',
                border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center',
                cursor: (inputValue.trim() && !isTyping) ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                boxShadow: (inputValue.trim() && !isTyping) ? '0 4px 12px rgba(255, 122, 3, 0.35)' : 'none'
              }}
            >
              <Send size={18} style={{ marginLeft: '2px' }} />
            </button>
          </form>
        </div>
      </div>
      
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @media (max-width: 480px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AIChat;
