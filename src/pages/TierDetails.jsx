import { ArrowLeft, Wallet, Gamepad2, Clock, MessageCircle, Coffee, ShoppingBag, Gift, Zap, Car, Trophy, Percent, CupSoda, Utensils, ChefHat, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import tier1Card from '../assets/tier1-card.png';
import tier2Card from '../assets/tier2-card.png';
import tier3Card from '../assets/tier3-card.png';
import tier4Card from '../assets/tier4-card.png';

const tiersData = [
  {
    id: 'classmate',
    level: 'T1',
    name: 'Classmate',
    points: '0 - 5.000',
    color: '#94A3B8',
    glow: 'rgba(148, 163, 184, 0.4)',
    image: tier1Card,
    privilegesTitle: '4 benefits dasar',
    benefits: [
      { icon: <Wallet size={18} />, title: 'Poin Makanan', desc: 'Dapat 1x poin tiap transaksi' },
      { icon: <Percent size={18} />, title: 'Promo Reguler', desc: 'Akses promo kantin bulanan' },
      { icon: <CupSoda size={18} />, title: 'Voucher Welcome', desc: 'Gratis 1 minuman ringan' },
      { icon: <MessageCircle size={18} />, title: 'Ulasan Kantin', desc: 'Akses memberi ulasan menu' }
    ]
  },
  {
    id: 'study-buddy',
    level: 'T2',
    name: 'Study Buddy',
    points: '5.001 - 15.000',
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.4)',
    image: tier2Card,
    privilegesTitle: '5 benefits menengah',
    benefits: [
      { icon: <Wallet size={18} />, title: 'Poin Ekstra', desc: 'Dapat 1.2x poin tiap transaksi' },
      { icon: <CupSoda size={18} />, title: 'Gratis Upsize', desc: 'Upsize minuman 1x per minggu' },
      { icon: <Utensils size={18} />, title: 'Gratis Topping', desc: '1 topping tambahan gratis' },
      { icon: <Clock size={18} />, title: 'Promo Early Bird', desc: 'Akses promo 2 hari lebih awal' },
      { icon: <Percent size={18} />, title: 'Diskon Selasa', desc: 'Diskon 5% setiap Selasa' }
    ]
  },
  {
    id: 'campus-star',
    level: 'T3',
    name: 'Campus Star',
    points: '15.001 - 35.000',
    color: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.4)',
    image: tier3Card,
    privilegesTitle: '6 benefits premium',
    benefits: [
      { icon: <Wallet size={18} />, title: 'Poin Maksimal', desc: 'Dapat 1.5x poin tiap transaksi' },
      { icon: <ShoppingBag size={18} />, title: 'Diskon Tetap 5%', desc: 'Potongan di semua menu' },
      { icon: <Gift size={18} />, title: 'Birthday Treat', desc: 'Gratis Main Course + Cake' },
      { icon: <Zap size={18} />, title: 'Prioritas Pesanan', desc: 'Antrian dapur lebih cepat' },
      { icon: <ChefHat size={18} />, title: 'Secret Menu', desc: 'Akses pesan menu rahasia' },
      { icon: <Coffee size={18} />, title: 'Reservasi Meja', desc: 'Booking meja favorit' }
    ]
  },
  {
    id: 'hall-of-fame',
    level: 'T4',
    name: 'Hall of Fame',
    points: '35.001+',
    color: '#9333EA',
    glow: 'rgba(147, 51, 234, 0.4)',
    image: tier4Card,
    privilegesTitle: '8 benefits eksklusif',
    benefits: [
      { icon: <Wallet size={18} />, title: 'Poin Ultimate', desc: 'Dapat 2x poin tiap transaksi' },
      { icon: <ShoppingBag size={18} />, title: 'Diskon Tetap 15%', desc: 'Tanpa minimum pembelian' },
      { icon: <CupSoda size={18} />, title: 'Bebas Upsize', desc: 'Gratis kapan saja tanpa batas' },
      { icon: <Gift size={18} />, title: 'Birthday Feast', desc: 'Voucher traktiran Rp 150k' },
      { icon: <Crown size={18} />, title: 'VVIP Seating', desc: 'Meja selalu tersedia tanpa antri' },
      { icon: <ChefHat size={18} />, title: 'Menu Eksklusif', desc: 'Bebas request custom makanan' },
      { icon: <Coffee size={18} />, title: 'Kopi Harian', desc: 'Gratis kopi setiap pagi' },
      { icon: <MessageCircle size={18} />, title: 'Layanan Pribadi', desc: 'CS VIP 24/7' }
    ]
  }
];

const TierDetails = () => {
  const navigate = useNavigate();
  const [activeTier, setActiveTier] = useState(2); 
  const [animKey, setAnimKey] = useState(2);
  const currentTier = tiersData[activeTier];

  const handleTierChange = (index) => {
    if(index === activeTier) return;
    setActiveTier(index);
    setAnimKey(index);
  };

  return (
    <div style={{ background: '#12131C', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
      <style>
        {`
          @keyframes floatBadge {
            0% { transform: translateY(-10px); }
            50% { transform: translateY(-25px); }
            100% { transform: translateY(-10px); }
          }
          @keyframes glowPulse {
            0% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
            100% { opacity: 0.5; transform: scale(1); }
          }
        `}
      </style>

      {/* Header */}
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 9999 }}>
        <button 
          onClick={() => navigate('/dashboard')} 
          style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', border: 'none', padding: 0, pointerEvents: 'auto' }}
        >
          <ArrowLeft size={24} color="white" />
        </button>
        <h1 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Detail</h1>
        <div style={{ width: '40px' }} /> {/* Spacer */}
      </div>

      {/* Curve Slider */}
      <div style={{ position: 'relative', height: '80px', width: '100%', maxWidth: '400px', margin: '0 auto', marginTop: '1rem' }}>
        <svg width="100%" height="80" viewBox="0 0 100 80" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
          <path d="M 10 20 Q 50 80 90 20" fill="transparent" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        </svg>
        
        {[0, 1, 2, 3].map((i) => {
          // X: 10, 36.6, 63.3, 90
          const x = 10 + (80 / 3) * i;
          // Calculate Y on the quadratic bezier curve
          const t = i / 3;
          // Bezier formula: (1-t)^2*P0 + 2*(1-t)*t*P1 + t^2*P2
          const y = Math.pow(1 - t, 2) * 20 + 2 * (1 - t) * t * 80 + Math.pow(t, 2) * 20;
          
          const isActive = activeTier === i;
          
          return (
            <div key={i} onClick={() => handleTierChange(i)} style={{ 
              position: 'absolute', 
              left: `${x}%`, 
              top: `${y}px`, 
              transform: 'translate(-50%, -50%)', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', 
              cursor: 'pointer', zIndex: 2 
            }}>
              <div style={{ 
                width: isActive ? '16px' : '10px', 
                height: isActive ? '16px' : '10px', 
                borderRadius: '50%', 
                background: isActive ? 'white' : 'rgba(255,255,255,0.4)', 
                boxShadow: isActive ? '0 0 15px rgba(255,255,255,0.8)' : 'none', 
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
              }} />
              <span style={{ 
                position: 'absolute', 
                top: '20px', 
                color: isActive ? 'white' : 'rgba(255,255,255,0.4)', 
                fontSize: '0.8rem', 
                fontWeight: isActive ? 600 : 400, 
                transition: 'all 0.3s' 
              }}>
                {tiersData[i].level}
              </span>
            </div>
          );
        })}
      </div>

      {/* Animated Content Area */}
      <div key={animKey} className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Spotlight and Badge */}
        <div style={{ position: 'relative', width: '100%', height: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
          {/* Background Spotlight */}
          <div style={{ 
            position: 'absolute', top: 0, width: '150px', height: '180px', 
            background: `linear-gradient(180deg, ${currentTier.color} 0%, transparent 100%)`, 
            filter: 'blur(40px)', opacity: 0.3,
            animation: 'glowPulse 4s infinite ease-in-out'
          }} />
          
          {/* Pedestal Cylinder */}
          <div style={{ 
            position: 'absolute', bottom: '20px', width: '160px', height: '40px', 
            borderRadius: '50%', background: 'rgba(255,255,255,0.03)', 
            boxShadow: `0 0 30px ${currentTier.glow}, inset 0 0 20px rgba(255,255,255,0.05)`, 
            border: '1px solid rgba(255,255,255,0.1)' 
          }} />

          {/* Floating Badge */}
          <div style={{ zIndex: 2, animation: 'floatBadge 4s ease-in-out infinite' }}>
            <img 
              src={currentTier.image} 
              alt={`${currentTier.name} Badge`} 
              style={{ 
                width: '160px', 
                height: '160px', 
                objectFit: 'contain',
                filter: `drop-shadow(0px 20px 40px ${currentTier.glow})`
              }} 
            />
          </div>
        </div>

        {/* Privileges Bottom Sheet */}
        <div style={{ 
          background: '#1E1F2E', 
          borderRadius: '32px 32px 0 0', 
          padding: '2rem 1.5rem', 
          flex: 1, 
          boxShadow: '0 -15px 40px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>{currentTier.name}'s privileges</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: '0 0 2rem 0' }}>{currentTier.privilegesTitle}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem 1rem' }}>
            {currentTier.benefits.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <div style={{ 
                  width: '42px', height: '42px', borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.04)', 
                  display: 'flex', justifyContent: 'center', alignItems: 'center', 
                  color: '#CBD5E1', flexShrink: 0, 
                  border: '1px solid rgba(255,255,255,0.08)' 
                }}>
                  {b.icon}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.35rem 0', color: '#F8FAFC', fontSize: '0.8rem', fontWeight: 600, lineHeight: 1.2 }}>{b.title}</h4>
                  <p style={{ margin: 0, color: '#64748B', fontSize: '0.7rem', lineHeight: 1.3 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TierDetails;
