import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Send, BotMessageSquare, User, Sparkles } from 'lucide-react';

const AIChat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]); // Start empty to show welcome screen
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // ==========================================
  // KONFIGURASI API GEMINI
  // ==========================================
  // Ganti string di bawah ini dengan API Key Gemini Anda yang sebenarnya.
  // Untuk mendapatkan API Key, kunjungi: https://aistudio.google.com/app/apikey
  // KEY dipindahkan ke file .env agar aman saat di-push ke GitHub
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  const systemPrompt = "Anda adalah AI Assistant PointLab (Ngolab). Berikut adalah informasi yang Anda ketahui:\n1. Lokasi WarmingUp berada di Lantai 4 Fakultas Ilmu Terapan.\n2. PointLab adalah platform untuk perolehan dan penukaran poin dari Ngolab/WarmingUp.\n\nAturan penting:\n- Jawablah dengan nada yang ramah, hangat, namun sangat ringkas dan padat (langsung ke intinya).\n- Jawab HANYA jika pertanyaan berkaitan dengan F&B Ngolab, lokasi, perolehan poin PointLab, atau warmingup.\n- Jika pengguna menanyakan hal di luar topik tersebut, tolak dengan sopan dan katakan persis: 'Mohon maaf, silakan tanyakan seputar Ngolab/warmingup saja ya!'. Jangan beri penjelasan lain.";

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const callGeminiAPI = async (userText, isRetry = false) => {
    // Gunakan model utama, atau model cadangan (Lite) jika ini adalah percobaan ulang
    const modelToUse = isRetry ? 'gemini-2.5-flash-lite' : 'gemini-flash-latest';
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nPertanyaan user: ${userText}` }]
            }
          ]
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Terjadi kesalahan API.");
      }

      const aiReply = data.candidates[0].content.parts[0].text;
      return aiReply;
      
    } catch (error) {
      console.error(`Gemini API Error (${modelToUse}):`, error);
      
      // Jika error karena server penuh/high demand, otomatis coba lagi pakai model Lite
      if (!isRetry && error.message.toLowerCase().includes("high demand")) {
        console.log("Server penuh, mencoba menggunakan model cadangan (Lite)...");
        return await callGeminiAPI(userText, true);
      }
      
      return `Gagal menghubungi AI: ${error.message}`;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMessage }]);
    setInputValue('');
    setIsTyping(true);

    // Panggil fungsi API Gemini
    const aiResponseText = await callGeminiAPI(userMessage);

    setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiResponseText }]);
    setIsTyping(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#F8FAFC', position: 'relative' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'rgba(255, 122, 3, 0.15)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 }}></div>
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '300px', height: '300px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 1 }}></div>

      {/* Header (Glassmorphism) */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(12px)',
        padding: '1.25rem 1.5rem', 
        display: 'flex', alignItems: 'center', gap: '1rem', 
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        zIndex: 50,
        position: 'sticky',
        top: 0
      }}>
        <div 
          onClick={() => {
            const previousPage = location.state?.from || '/dashboard';
            navigate(previousPage);
          }} 
          style={{ 
            width: '36px', height: '36px', borderRadius: '50%', background: '#F1F5F9', 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            cursor: 'pointer', color: '#64748B', transition: 'background 0.2s' 
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#E2E8F0'}
          onMouseOut={(e) => e.currentTarget.style.background = '#F1F5F9'}
        >
          <ArrowLeft size={20} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative', width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FF7A03', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <BotMessageSquare size={22} />
            <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '12px', height: '12px', background: '#10B981', border: '2px solid white', borderRadius: '50%' }}></span>
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.15rem', color: '#1E293B', fontWeight: 800, letterSpacing: '-0.5px' }}>Ngolab AI</h2>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>Asisten Virtual Resmi</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', zIndex: 5 }}>
        
        {/* Welcome Screen (Tampil jika belum ada pesan) */}
        {messages.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748B', animation: 'fade-in 0.5s ease-out' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FF7A03', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
              <Sparkles size={36} />
            </div>
            <h3 style={{ color: '#1E293B', fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Halo! Ada yang bisa dibantu?</h3>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', maxWidth: '80%', lineHeight: 1.5 }}>
              Tanyakan seputar produk F&B Ngolab, cara mendapatkan poin, atau program WarmingUp.
            </p>
          </div>
        )}

        {messages.map(msg => {
          const isAI = msg.sender === 'ai';
          return (
            <div key={msg.id} className="animate-fade-in" style={{ display: 'flex', gap: '0.75rem', flexDirection: isAI ? 'row' : 'row-reverse', alignItems: 'flex-end' }}>
              {isAI && (
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', 
                  display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FF7A03',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                  <BotMessageSquare size={18} />
                </div>
              )}
              
              <div style={{ 
                maxWidth: '80%', 
                background: isAI ? 'white' : 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)', 
                color: isAI ? '#334155' : 'white',
                padding: '1rem 1.25rem', 
                borderRadius: isAI ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                border: isAI ? '1px solid rgba(226, 232, 240, 0.8)' : 'none',
                boxShadow: isAI ? '0 4px 15px rgba(0,0,0,0.02)' : '0 8px 20px rgba(255, 122, 3, 0.25)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                fontWeight: 500
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="animate-fade-in" style={{ display: 'flex', gap: '0.75rem', flexDirection: 'row', alignItems: 'flex-end' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0, background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FF7A03', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              <Sparkles size={16} />
            </div>
            <div style={{ background: 'white', padding: '1.25rem 1rem', borderRadius: '16px 16px 16px 4px', border: '1px solid rgba(226, 232, 240, 0.8)', display: 'flex', gap: '0.4rem', alignItems: 'center', height: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '6px', height: '6px', background: '#FF7A03', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.32s' }}></div>
              <div style={{ width: '6px', height: '6px', background: '#FF7A03', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '-0.16s' }}></div>
              <div style={{ width: '6px', height: '6px', background: '#FF7A03', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ background: 'transparent', padding: '1rem 1.5rem 1.5rem', zIndex: 10 }}>
        <form onSubmit={handleSendMessage} style={{ 
          display: 'flex', gap: '0.75rem', 
          background: 'white', padding: '0.5rem', 
          borderRadius: '99px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          border: '1px solid rgba(226, 232, 240, 0.8)'
        }}>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tanya seputar Ngolab..." 
            style={{ 
              flex: 1, padding: '0.75rem 1.25rem', borderRadius: '99px', 
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: '0.95rem', color: '#1E293B', fontWeight: 500
            }} 
          />
          <button 
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            style={{ 
              width: '46px', height: '46px', borderRadius: '50%', flexShrink: 0,
              background: (inputValue.trim() && !isTyping) ? 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)' : '#E2E8F0', 
              color: (inputValue.trim() && !isTyping) ? 'white' : '#94A3B8',
              border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center',
              cursor: (inputValue.trim() && !isTyping) ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
              boxShadow: (inputValue.trim() && !isTyping) ? '0 4px 10px rgba(255, 122, 3, 0.3)' : 'none'
            }}
          >
            <Send size={18} style={{ marginLeft: '2px' }} />
          </button>
        </form>
      </div>
      
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AIChat;
