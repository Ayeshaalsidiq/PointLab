import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, Send, Sparkles, User, Copy, Check, 
  Utensils, MapPin, Coins, Ticket 
} from 'lucide-react';

// Knowledge Resolver Mandiri jika RAG/Gemini mengalami kendala/limit
const resolveLocalPointLabKnowledge = (query) => {
  const q = query.toLowerCase();

  // 1. Lokasi & Cara Pesan (Pertanyaan Kombinasi)
  if ((q.includes('lokasi') || q.includes('dimana') || q.includes('tempat')) && (q.includes('pesan') || q.includes('order'))) {
    return "Lokasi WarmingUp / Ngolab berada di **Lantai 4 Fakultas Ilmu Terapan (FIT), Telkom University**.\n\nUntuk memesan makanan dan minuman, Anda bisa memesan melalui:\n- **Kiosk Sensor Gestur (Gesture-Eats):** Pesan mandiri di mesin Kiosk depan outlet tanpa sentuh layar (cukup arahkan tangan).\n- **Langsung di Meja Kasir:** Bayar via Tunai atau QRIS di kasir Lantai 4 FIT. Tunjukkan QR member PointLab sebelum bayar agar mendapat poin (setiap Rp 1.000 = 1 poin)!";
  }

  // 2. Lokasi saja
  if (q.includes('lokasi') || q.includes('dimana') || q.includes('di mana') || q.includes('tempat')) {
    return "Lokasi **WarmingUp / Ngolab** berada di **Lantai 4 Gedung Fakultas Ilmu Terapan (FIT), Telkom University**. Tempat ini menyediakan kantin modern F&B sekaligus coworking space untuk mahasiswa.";
  }

  // 3. Cara Pesan / Order
  if (q.includes('cara pesan') || q.includes('cara memesan') || q.includes('cara order') || q.includes('pesan makan') || q.includes('kiosk')) {
    return "Cara memesan makanan & minuman di WarmingUp:\n- **Kiosk Sensor Gestur:** Gunakan mesin Kiosk di depan outlet, pilih menu dengan gestur tangan tanpa menyentuh layar.\n- **Meja Kasir Langsung:** Datang ke kasir Lantai 4 FIT, pilih menu, dan bayar dengan Tunai atau QRIS.\n- **Pre-Order (PO):** Pesan menu PO sebelum batas waktu pemesanan.\n\nTips: Tunjukkan QR Code PointLab ke kasir untuk mengumpulkan poin reward!";
  }

  // 4. Menu & Harga
  if (q.includes('menu') || q.includes('makan') || q.includes('minum') || q.includes('harga') || q.includes('ayam') || q.includes('nasi goreng') || q.includes('es teh') || q.includes('pedas') || q.includes('murah')) {
    if (q.includes('pedas')) {
      return "Menu paling pedas di Ngolab adalah **Nasi Goreng Gila** seharga **Rp 14.000** dengan racikan cabai mantap dan topping melimpah!";
    }
    if (q.includes('ayam')) {
      return "Harga **Ayam Bakar** adalah **Rp 23.000** (Ready Meal bumbu bakar lezat). Tersedia juga promo diskon 20% dengan menukarkan 200 poin di PointLab!";
    }
    if (q.includes('es teh')) {
      return "Harga **Es Teh Manis** adalah **Rp 7.000** dengan rasa manis dingin yang segar dan pas.";
    }
    return "Berikut adalah daftar menu resmi di WarmingUp / Ngolab:\n\n**Makanan & Menu Utama:**\n- **Ayam Bakar** — Rp 23.000 (bumbu bakar khas lezat)\n- **Nasi Goreng Gila** — Rp 14.000 (sangat pedas, favorit mahasiswa)\n- **Nasi Goreng Reguler** — Rp 15.000 (gurih nikmat khas Ngolab)\n\n**Minuman:**\n- **Es Teh Manis** — Rp 7.000 (dingin segar manis pas)\n\n**Menu Spesial Pre-Order (PO):**\n- **Mie Dok Dok (PO)** — Rp 17.000\n- **Nasi Padang (PO Jum'at Berkah)** — Rp 15.000";
  }

  // 5. Cara Dapat Poin
  if (q.includes('dapat poin') || q.includes('dapet poin') || q.includes('kumpulin poin') || q.includes('poin')) {
    return "Cara mendapatkan poin di PointLab:\n- **Transaksi F&B:** Tunjukkan QR Code member di kasir Lantai 4 FIT saat bertransaksi (setiap Rp 1.000 = 1 poin).\n- **Bonus Member Baru:** Otomatis mendapat 100 poin saat pendaftaran.\n- **Play & Earn:** Selesaikan tantangan game harian di aplikasi PointLab.\n- **Study Session:** Belajar mandiri di area coworking (misal 90 menit = 45 poin).";
  }

  // 6. Tier / Tingkatan
  if (q.includes('tier') || q.includes('tingkat') || q.includes('level') || q.includes('membership')) {
    return "Tingkatan Membership PointLab:\n- **Tier 1 - Classmate (0 - 5.000 Poin):** Multiplier 1x, promo reguler, voucher selamat datang gratis minuman.\n- **Tier 2 - Study Buddy (5.001 - 15.000 Poin):** Multiplier 1.2x, gratis upsize 1x/minggu, gratis topping, diskon 5% hari Selasa.\n- **Tier 3 - Campus Star (15.001 - 35.000 Poin):** Multiplier 1.5x, diskon tetap 5%, traktiran ultah gratis, antrean prioritas, akses secret menu.\n- **Tier 4 - Hall of Fame (35.001+ Poin):** Multiplier 2x, diskon tetap 15%, bebas upsize tanpa batas, voucher traktiran ultah Rp 150rb, meja VVIP, gratis kopi pagi.";
  }

  // 7. Promo & Redeem
  if (q.includes('promo') || q.includes('voucher') || q.includes('tukar') || q.includes('redeem') || q.includes('diskon')) {
    return "Promo & Penukaran Voucher di PointLab:\n- **Diskon 20% Ayam Bakar:** Tukar 200 poin (min. order Rp 10.000)\n- **Beli Ayam Bakar Gratis Es Teh:** Tukar 400 poin\n- **Voucher Kantin Rp 50.000:** Tukar 5.000 poin\n- **Cashback 20%:** Tukar 2.500 poin\n- **Voucher Print 100 Lembar:** Tukar 3.500 poin\n- **Parkir Gratis 1 Bulan:** Tukar 10.000 poin\n- **Kode Promo Diskon:** Gunakan kode **NGOLABin88**";
  }

  return "Halo! Ada yang bisa saya bantu seputar lokasi WarmingUp di Lantai 4 FIT, menu F&B Ngolab, cara pemesanan, atau sistem poin dan voucher PointLab? 😊";
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

  // 2. Bersihkan tanda pagar heading markdown (##, ###) di awal baris
  cleaned = cleaned.replace(/^#+\s*/gm, '');

  // 3. Rapikan spasi berlebih sebelum tanda baca akibat hilangnya [1]
  cleaned = cleaned.replace(/\s+([.,!?])/g, '$1');

  // 4. Ubah baris tabel markdown jika ada menjadi format baris rapi
  cleaned = cleaned.replace(/^\|[-:\s|]+\|$/gm, '');
  cleaned = cleaned.replace(/^\|\s*(.*?)\s*\|$/gm, '- $1');

  // 5. Rapikan baris kosong yang berlebihan
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

const AIChat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

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
7. Redeem: Voucher Kantin 50rb (5k poin), Cashback 20% (2.5k), Print 100 Lembar (3.5k), Parkir 1 Bulan (10k).
Jawab ramah, padat, dan jangan pakai nomor sitasi seperti [1].`;

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const callGeminiAPI = async (userText) => {
    if (!GEMINI_API_KEY) throw new Error("Kunci Gemini tidak dikonfigurasi.");
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nPertanyaan pengguna: ${userText}` }]
          }
        ]
      })
    });
    
    const data = await response.json();
    if (data.error) throw new Error(data.error.message || "Gemini API error.");
    return data.candidates[0].content.parts[0].text;
  };

  const callRagAPI = async (userText) => {
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
      return await callGeminiAPI(userText);
    } catch {
      // Jika Google Gemini sedang 'high demand' / rate limit, gunakan Knowledge Resolver
      return resolveLocalPointLabKnowledge(userText);
    }
  };

  const sendMessageWithText = async (textToSend) => {
    if (!textToSend.trim() || isTyping) return;

    const userMessage = textToSend.trim();
    const nowTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMessage, time: nowTime }]);
    setInputValue('');
    setIsTyping(true);

    const rawAiResponse = await callRagAPI(userMessage);
    const aiResponseText = sanitizeAndFormatResponse(rawAiResponse, userMessage);

    setMessages(prev => [...prev, { 
      id: Date.now() + 1, 
      sender: 'ai', 
      text: aiResponseText,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) 
    }]);
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

      {/* Header Bar Clean & Minimalis */}
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.9)', 
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E2E8F0',
        padding: '0.85rem 1.5rem',
        display: 'flex', alignItems: 'center',
        zIndex: 50, position: 'sticky', top: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Back button circular */}
          <button 
            onClick={() => {
              const previousPage = location.state?.from || '/dashboard';
              navigate(previousPage);
            }} 
            style={{ 
              width: '40px', height: '40px', borderRadius: '50%', 
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

          {/* Logo samping Ngolab AI dibuat LINGKARAN */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              position: 'relative', width: '40px', height: '40px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', 
              display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FF7A03',
              boxShadow: '0 4px 12px rgba(255, 122, 3, 0.15)'
            }}>
              <Sparkles size={18} />
              <span style={{ 
                position: 'absolute', bottom: '0px', right: '0px', 
                width: '10px', height: '10px', background: '#10B981', 
                border: '2px solid white', borderRadius: '50%' 
              }}></span>
            </div>

            {/* Nama Ngolab AI bersih tanpa teks subtitle */}
            <h1 style={{ margin: 0, fontSize: '1.15rem', color: '#1E293B', fontWeight: 800, letterSpacing: '-0.3px' }}>
              Ngolab AI
            </h1>
          </div>
        </div>
      </header>

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
      `}</style>
    </div>
  );
};

export default AIChat;
