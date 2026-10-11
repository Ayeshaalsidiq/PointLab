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
7. Redeem: Voucher Kantin 50rb (5k poin), Cashback 20% (2.5k), Print 100 Lembar (3.5k), Parkir 1 Bulan (10k).
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

      {/* Slide-Over Drawer Riwayat Sesi (PointLab Glassmorphism Modern) */}
      {showHistoryDrawer && (
        <div 
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex', justifyContent: 'flex-end',
            animation: 'fade-in 0.2s ease-out'
          }}
          onClick={() => setShowHistoryDrawer(false)}
        >
          <div 
            style={{
              width: '100%', maxWidth: '380px', height: '100%',
              background: 'linear-gradient(180deg, #1A1B27 0%, #111420 100%)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex', flexDirection: 'column',
              boxShadow: '-15px 0 40px rgba(0, 0, 0, 0.5)',
              animation: 'slide-left 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative', overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Glowing Ambient Accents */}
            <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(255, 122, 3, 0.25) 0%, transparent 70%)', filter: 'blur(35px)', pointerEvents: 'none' }}></div>
            <div style={{ position: 'absolute', bottom: '15%', left: '-50px', width: '160px', height: '160px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)', filter: 'blur(35px)', pointerEvents: 'none' }}></div>

            {/* Top Brand Stripe */}
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #FF7A03 0%, #FFA34D 50%, #3B82F6 100%)', width: '100%', zIndex: 3 }}></div>

            {/* Drawer Header */}
            <div style={{
              padding: '1.25rem 1.25rem 1rem 1.25rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              position: 'relative', zIndex: 2
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ 
                  width: '38px', height: '38px', borderRadius: '12px', 
                  background: 'linear-gradient(135deg, rgba(255, 122, 3, 0.2) 0%, rgba(255, 122, 3, 0.05) 100%)', 
                  border: '1px solid rgba(255, 122, 3, 0.35)',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  boxShadow: '0 4px 12px rgba(255, 122, 3, 0.15)'
                }}>
                  <History size={18} color="#FF7A03" />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.3px', fontFamily: 'Poppins, sans-serif' }}>
                      Riwayat Obrolan
                    </h3>
                    <span style={{ 
                      fontSize: '0.65rem', background: 'rgba(255, 122, 3, 0.15)', 
                      color: '#FFA34D', border: '1px solid rgba(255, 122, 3, 0.3)', 
                      borderRadius: '10px', padding: '1px 6px', fontWeight: 600 
                    }}>
                      {sessions.length} Sesi
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '2px', display: 'block' }}>
                    Tersimpan otomatis di browser akun Anda
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setShowHistoryDrawer(false)}
                style={{ 
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.08)', 
                  color: '#94A3B8', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; e.currentTarget.style.color = '#FFFFFF'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'; e.currentTarget.style.color = '#94A3B8'; }}
                title="Tutup"
              >
                <X size={16} />
              </button>
            </div>

            {/* CTA Button: Mulai Percakapan Baru */}
            <div style={{ padding: '1rem 1.25rem 0.75rem 1.25rem', position: 'relative', zIndex: 2 }}>
              <button
                onClick={handleNewChat}
                style={{
                  width: '100%', padding: '0.8rem 1rem',
                  background: 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)',
                  border: 'none', borderRadius: '14px',
                  color: 'white', fontWeight: 700, fontSize: '0.875rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  cursor: 'pointer', boxShadow: '0 8px 20px rgba(255, 122, 3, 0.3)',
                  transition: 'all 0.2s', letterSpacing: '0.2px'
                }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 122, 3, 0.4)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 122, 3, 0.3)'; }}
              >
                <Plus size={18} strokeWidth={2.5} />
                <span>Mulai Percakapan Baru</span>
              </button>
            </div>

            {/* Section Title */}
            <div style={{ padding: '0.5rem 1.25rem 0.25rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                Daftar Percakapan
              </span>
              <span style={{ fontSize: '0.68rem', color: '#64748B' }}>
                Klik untuk membuka
              </span>
            </div>

            {/* List Riwayat Sesi */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', zIndex: 2 }}>
              {sessions.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748B' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 1rem' }}>
                    <MessageSquare size={24} color="#64748B" />
                  </div>
                  <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: 600, color: '#94A3B8' }}>Belum ada obrolan</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>Mulai pertanyaan pertama Anda ke Ngolab AI</p>
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
                        border: isActive ? '1px solid rgba(255, 122, 3, 0.45)' : '1px solid rgba(255, 255, 255, 0.06)',
                        background: isActive 
                          ? 'linear-gradient(135deg, rgba(255, 122, 3, 0.12) 0%, rgba(255, 122, 3, 0.04) 100%)' 
                          : 'rgba(30, 41, 59, 0.45)',
                        backdropFilter: 'blur(10px)',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        boxShadow: isActive ? '0 4px 15px rgba(255, 122, 3, 0.1)' : 'none'
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(30, 41, 59, 0.75)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(30, 41, 59, 0.45)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div style={{
                          position: 'absolute', left: '0', top: '12px', bottom: '12px',
                          width: '3.5px', background: '#FF7A03', borderRadius: '0 4px 4px 0'
                        }}></div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.65rem' }}>
                        <div style={{ flex: 1, minWidth: 0, paddingLeft: isActive ? '4px' : '0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.3rem' }}>
                            <MessageSquare size={14} color={isActive ? '#FF7A03' : '#94A3B8'} style={{ flexShrink: 0 }} />
                            <h4 style={{ 
                              margin: 0, fontSize: '0.875rem', fontWeight: 600, 
                              color: isActive ? '#FFA34D' : '#F1F5F9',
                              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
                            }}>
                              {sess.title}
                            </h4>
                            {isActive && (
                              <span style={{ 
                                marginLeft: 'auto', background: '#FF7A03', color: 'white', 
                                fontSize: '0.62rem', fontWeight: 700, padding: '1px 6px', 
                                borderRadius: '8px', letterSpacing: '0.2px' 
                              }}>
                                Aktif
                              </span>
                            )}
                          </div>
                          
                          <p style={{ 
                            margin: '0 0 0.5rem 0', fontSize: '0.76rem', color: '#94A3B8',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            lineHeight: 1.4
                          }}>
                            {lastMsg}
                          </p>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.7rem', color: '#64748B' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <Clock size={11} color="#64748B" /> {sess.createdAt}
                            </span>
                            <span>•</span>
                            <span>{msgCount} pesan</span>
                          </div>
                        </div>

                        {/* Tombol Hapus Sesi Individual */}
                        <button
                          onClick={(e) => handleDeleteSession(e, sess.id)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)', 
                            color: '#64748B', cursor: 'pointer', width: '28px', height: '28px', 
                            borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            transition: 'all 0.2s', flexShrink: 0
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.color = '#EF4444';
                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.color = '#64748B';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
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

            {/* Drawer Footer: Bersihkan Semua Riwayat */}
            {sessions.length > 0 && (
              <div style={{ 
                padding: '0.85rem 1.25rem', 
                borderTop: '1px solid rgba(255, 255, 255, 0.06)', 
                background: 'rgba(15, 23, 42, 0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                zIndex: 2
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: '#94A3B8' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }}></span>
                  <span>Tersimpan di Browser</span>
                </div>

                <button
                  onClick={handleClearAllHistory}
                  style={{
                    background: 'transparent', border: 'none',
                    color: '#94A3B8', fontSize: '0.75rem', fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    cursor: 'pointer', transition: 'all 0.2s', padding: '4px 8px', borderRadius: '6px'
                  }}
                  onMouseOver={(e) => { 
                    e.currentTarget.style.color = '#EF4444'; 
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; 
                  }}
                  onMouseOut={(e) => { 
                    e.currentTarget.style.color = '#94A3B8'; 
                    e.currentTarget.style.background = 'transparent'; 
                  }}
                >
                  <Trash2 size={13} />
                  <span>Bersihkan Semua</span>
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
