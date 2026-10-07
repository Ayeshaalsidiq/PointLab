import { Trophy, Zap, MessageCircle, ShoppingBag, Coffee, Gamepad2, QrCode, Ticket, Gift, History, Crown, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { points, tierInfo } = useUser();
  const [activeTab, setActiveTab] = useState('Promo');
  const [activeBanner, setActiveBanner] = useState(0);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (activeTab !== 'Promo') return;
    const interval = setInterval(() => {
      setActiveBanner(prev => (prev === 0 ? 1 : 0));
    }, 2500); 
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div style={{ background: '#1A1B27', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', flexShrink: 0 }}>
        {/* Tiering Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, #FFFDF0 0%, #FFFFFF 100%)', 
          borderRadius: '24px', 
          padding: '1.5rem', 
          position: 'relative', 
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          
          {/* Bagian Kiri (Teks & Progress Bar) */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1A1B27', margin: '0 0 0.5rem 0', fontFamily: 'Poppins' }}>
              Blair Nguyen
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.875rem' }}>
              <div style={{ background: tierInfo.colors.primary, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '10px', color: 'white' }}>P</span>
              </div>
              <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{points.toLocaleString('id-ID')}</span>
            </div>
            
            <div style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontSize: '0.75rem', color: tierInfo.colors.primary, fontWeight: 500, lineHeight: 1.4, paddingRight: '0.5rem' }}>
              {tierInfo.id === 3 ? 'Selamat! Anda telah mencapai tingkat tertinggi.' : `${(tierInfo.nextPoints - points).toLocaleString('id-ID')} poin lagi menuju tingkat selanjutnya!`}
            </div>
            
            {/* Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
              <span style={{ fontSize: '0.7rem', color: tierInfo.colors.textLight, fontWeight: 700, whiteSpace: 'nowrap' }}>{tierInfo.name}</span>
              <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '3px', flex: 1, position: 'relative', minWidth: '40px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${tierInfo.progress}%`, background: `linear-gradient(90deg, ${tierInfo.gradientDashboard[0]} 0%, ${tierInfo.gradientDashboard[1]} 100%)`, borderRadius: '3px' }}></div>
              </div>
              <span style={{ fontSize: '0.7rem', color: tierInfo.id === 3 ? tierInfo.gradientDashboard[1] : '#F59E0B', fontWeight: 700, whiteSpace: 'nowrap' }}>{tierInfo.nextTier}</span>
            </div>
          </div>

          {/* Bagian Kanan (Gambar 3D) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transform: 'translateY(-12px)' }}>
            <div style={{ width: '95px', height: '95px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src={tierInfo.card} 
                alt="Tier 1 Badge" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.2))'
                }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0.5rem 2.5rem 0.5rem', overflowX: 'auto', flexShrink: 0 }}>
        <div onClick={() => navigate('/redeem')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', minWidth: '70px', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#94A3B8', background: 'rgba(255,255,255,0.05)' }}>
            <Gift size={20} />
          </div>
          <span style={{ color: 'white', fontSize: '0.75rem', textAlign: 'center' }}>Tukar<br/>Poin</span>
        </div>
        <div onClick={() => navigate('/tier-details')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', minWidth: '70px', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#94A3B8', background: 'rgba(255,255,255,0.05)' }}>
            <Trophy size={20} />
          </div>
          <span style={{ color: 'white', fontSize: '0.75rem', textAlign: 'center' }}>Member<br/>Package</span>
        </div>
        <div onClick={() => setShowQRModal(true)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', minWidth: '70px', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#94A3B8', background: 'rgba(255,255,255,0.05)' }}>
            <QrCode size={20} />
          </div>
          <span style={{ color: 'white', fontSize: '0.75rem', textAlign: 'center' }}>QR</span>
        </div>
        <div onClick={() => navigate('/history')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', minWidth: '70px', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#94A3B8', background: 'rgba(255,255,255,0.05)' }}>
            <History size={20} />
          </div>
          <span style={{ color: 'white', fontSize: '0.75rem', textAlign: 'center' }}>Riwayat<br/>Poin</span>
        </div>
      </div>

      {/* Bottom White Area Wrapper */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        flex: 1
      }}>
        {/* White Area Content */}
        <div style={{ 
          background: 'white', 
          borderRadius: '30px 30px 0 0', 
          paddingTop: '1.5rem', 
          paddingBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
        }}>
          {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-around', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>
          {[
            { id: 'Promo', label: 'Promo & Game' },
            { id: 'Earn', label: 'Dapatkan Poin' },
            { id: 'Use', label: 'Tukar Poin' }
          ].map((tab) => (
            <div 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ 
                padding: '0.5rem 0.25rem', 
                color: activeTab === tab.id ? '#3B82F6' : '#94A3B8', 
                fontWeight: activeTab === tab.id ? 600 : 500, 
                borderBottom: activeTab === tab.id ? '2px solid #3B82F6' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '0.85rem',
                textAlign: 'center',
                flex: 1,
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ paddingBottom: '2rem' }}>
          {activeTab === 'Promo' && (
            <div className="tab-content">
              <div style={{ padding: '1.5rem' }}>
                
                {/* Carousel Container */}
                <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                  
                  {/* Sliding Track */}
                  <div style={{ 
                    display: 'flex', 
                    transition: 'transform 0.5s ease-in-out', 
                    transform: `translateX(-${activeBanner * 100}%)` 
                  }}>
                    
                    {/* Banner 1: Main Game */}
                    <div style={{ 
                      minWidth: '100%', 
                      background: 'linear-gradient(135deg, #4F46E5 0%, #9333EA 100%)', 
                      padding: '1.5rem', 
                      color: 'white',
                      position: 'relative',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      overflow: 'hidden'
                    }}>
                      {/* Decorative Elements */}
                      <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>
                      <Gamepad2 size={90} style={{ position: 'absolute', right: '-10px', bottom: '-20px', opacity: 0.1, transform: 'rotate(-15deg)' }} />
                      
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(8px)', padding: '0.25rem 0.6rem', borderRadius: '99px', fontSize: '0.65rem', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '0.5px' }}>
                          🎮 PLAY & EARN
                        </div>
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2 }}>Main Game, <br/>Kumpulkan Koin!</h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.85, marginBottom: '1.5rem', lineHeight: 1.4, maxWidth: '80%' }}>
                          Selesaikan tantangan harian dan tukarkan dengan poin membership.
                        </p>
                      </div>

                      <button style={{ 
                        background: 'linear-gradient(90deg, #FFFFFF 0%, #F8FAFC 100%)', 
                        color: '#6B21A8', 
                        border: 'none', 
                        padding: '0.7rem 1.25rem', 
                        borderRadius: '12px', 
                        fontWeight: 700, 
                        cursor: 'pointer', 
                        fontSize: '0.8rem', 
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                        width: 'fit-content',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        Main Sekarang
                      </button>
                    </div>

                    {/* Banner 2: Warming Up */}
                    <div style={{ 
                      minWidth: '100%', 
                      background: 'linear-gradient(135deg, #EA580C 0%, #EAB308 100%)', 
                      padding: '1.5rem', 
                      color: 'white',
                      position: 'relative',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      overflow: 'hidden'
                    }}>
                      {/* Decorative Elements */}
                      <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>
                      <Coffee size={100} style={{ position: 'absolute', right: '-15px', top: '10px', opacity: 0.15, transform: 'rotate(10deg)' }} />

                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(8px)', padding: '0.25rem 0.6rem', borderRadius: '99px', fontSize: '0.65rem', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '0.5px' }}>
                          🔥 PROMO TERBATAS
                        </div>
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.2 }}>Warming Up <br/>Kantin Pagi!</h3>
                        <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9, marginBottom: '1.5rem', lineHeight: 1.4, maxWidth: '85%' }}>
                          Kini buka dari pagi! Dapatkan diskon 20% untuk menu sarapan spesial.
                        </p>
                      </div>

                      <button style={{ 
                        background: '#1A1B27', 
                        color: 'white', 
                        border: 'none', 
                        padding: '0.7rem 1.25rem', 
                        borderRadius: '12px', 
                        fontWeight: 700, 
                        cursor: 'pointer', 
                        fontSize: '0.8rem', 
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        width: 'fit-content',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        Klaim Diskon
                      </button>
                    </div>

                  </div>

                  {/* Indicators */}
                  <div style={{ position: 'absolute', bottom: '15px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeBanner === 0 ? 'white' : 'rgba(255,255,255,0.4)', transition: 'background 0.3s' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeBanner === 1 ? 'white' : 'rgba(255,255,255,0.4)', transition: 'background 0.3s' }}></div>
                  </div>
                  
                </div>
              </div>
            </div>
          )}

        {activeTab === 'Earn' && (
          <div className="tab-content" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#1E293B' }}>Cara Mendapatkan Poin</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Game Card */}
              <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ minWidth: '60px', height: '60px', background: '#3B82F6', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                  <Zap size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1E293B', marginBottom: '0.25rem' }}>Main Game di Ngolab Gami</h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748B' }}>Dapatkan hingga 500 poin/hari.</p>
                </div>
                <button style={{ background: '#FF7A03', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Main
                </button>
              </div>

              {/* Survey Card */}
              <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ minWidth: '60px', height: '60px', background: '#10B981', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
                  <MessageCircle size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1E293B', marginBottom: '0.25rem' }}>Isi Survey Harian</h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748B' }}>Bantu kami berkembang & dapatkan 150 poin.</p>
                </div>
                <button style={{ background: '#1E293B', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Mulai
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Use' && (
          <div className="tab-content" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', color: '#1E293B' }}>Tukar Poin Jadi Voucher</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              {/* Voucher 1 - Available */}
              <div 
                onClick={() => setSelectedVoucher({title: 'Voucher McD Rp50rb', points: 5000, type: 'Makanan', icon: 'M', color: '#DC2626'})}
                style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#F8FAFC', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ background: '#DC2626', width: '40px', height: '40px', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 700, fontSize: '1.2rem' }}>M</div>
                  <span style={{ fontSize: '0.65rem', background: '#E2E8F0', padding: '0.2rem 0.5rem', borderRadius: '99px', fontWeight: 500, color: '#64748B' }}>Tersedia</span>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>Voucher McD Rp50rb</h4>
                  <p style={{ fontSize: '0.75rem', color: '#FF7A03', fontWeight: 600, marginTop: '0.25rem' }}>5,000 Pts</p>
                </div>
                <button style={{ width: '100%', padding: '0.5rem', background: '#1E293B', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, marginTop: '0.5rem', cursor: 'pointer' }}>
                  Tukar
                </button>
              </div>
              
              {/* Voucher 2 - Available */}
              <div 
                onClick={() => setSelectedVoucher({title: 'Voucher Starbucks', points: 7500, type: 'Minuman', icon: <Coffee size={20} />, color: '#059669'})}
                style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#F8FAFC', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ background: '#059669', width: '40px', height: '40px', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Coffee size={20} />
                  </div>
                  <span style={{ fontSize: '0.65rem', background: '#E2E8F0', padding: '0.2rem 0.5rem', borderRadius: '99px', fontWeight: 500, color: '#64748B' }}>Tersedia</span>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>Voucher Starbucks</h4>
                  <p style={{ fontSize: '0.75rem', color: '#FF7A03', fontWeight: 600, marginTop: '0.25rem' }}>7,500 Pts</p>
                </div>
                <button style={{ width: '100%', padding: '0.5rem', background: '#1E293B', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, marginTop: '0.5rem', cursor: 'pointer' }}>
                  Tukar
                </button>
              </div>

              {/* Voucher 3 - Locked (Requires more points) */}
              <div 
                onClick={() => setSelectedVoucher({title: 'Voucher Amazon', points: 10000, type: 'Belanja', icon: <ShoppingBag size={20} />, color: '#1E293B', disabled: true})}
                style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'white', opacity: 0.6, cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ background: '#1E293B', width: '40px', height: '40px', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ShoppingBag size={20} />
                  </div>
                  <span style={{ fontSize: '0.65rem', background: '#FEE2E2', color: '#EF4444', padding: '0.2rem 0.5rem', borderRadius: '99px', fontWeight: 500 }}>Kurang</span>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>Voucher Amazon</h4>
                  <p style={{ fontSize: '0.75rem', color: '#FF7A03', fontWeight: 600, marginTop: '0.25rem' }}>10,000 Pts</p>
                </div>
                <button style={{ width: '100%', padding: '0.5rem', background: '#E2E8F0', color: '#94A3B8', border: 'none', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, marginTop: '0.5rem' }} disabled>
                  Tukar
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
      </div>

      {/* QR Modal */}
      {showQRModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1E293B', fontSize: '1.25rem', fontWeight: 700 }}>QR Member</h3>
            <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #E2E8F0' }}>
              <QrCode size={180} color="#1E293B" />
            </div>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.85rem', color: '#64748B', textAlign: 'center', lineHeight: 1.5 }}>Tunjukkan kode QR ini ke kasir untuk mengumpulkan poin atau klaim diskon.</p>
            <button onClick={() => setShowQRModal(false)} style={{ width: '100%', padding: '0.85rem', background: '#1E293B', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>Tutup</button>
          </div>
        </div>
      )}

      {/* Voucher Detail Modal */}
      {selectedVoucher && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '20px', 
                background: `${selectedVoucher.color}15`, color: selectedVoucher.color, 
                display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 700, fontSize: '2rem'
              }}>
                {selectedVoucher.icon}
              </div>
            </div>
            
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', textAlign: 'center', fontSize: '1.25rem', fontWeight: 700 }}>{selectedVoucher.title}</h3>
            <p style={{ margin: '0 0 1.5rem 0', color: '#64748B', textAlign: 'center', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Tukarkan poin Anda untuk mendapatkan voucher {selectedVoucher.type.toLowerCase()} ini. Syarat dan ketentuan berlaku.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Harga Poin</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#FF7A03', fontSize: '1rem', fontWeight: 700 }}>
                <div style={{ background: '#FF7A03', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ fontSize: '9px', color: 'white', fontWeight: 'bold' }}>P</span>
                </div>
                {selectedVoucher.points.toLocaleString('id-ID')}
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setSelectedVoucher(null)} style={{ flex: 1, padding: '0.85rem', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>Batal</button>
              <button disabled={selectedVoucher.disabled} onClick={() => { setSelectedVoucher(null); setShowToast(true); setTimeout(() => setShowToast(false), 3000); }} style={{ flex: 1, padding: '0.85rem', background: selectedVoucher.disabled ? '#E2E8F0' : 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)', color: selectedVoucher.disabled ? '#94A3B8' : 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: selectedVoucher.disabled ? 'not-allowed' : 'pointer', boxShadow: selectedVoucher.disabled ? 'none' : '0 4px 10px rgba(255, 122, 3, 0.3)' }}>Tukar</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal Notification */}
      {showToast && (
        <div className="animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem' }}>
          <div style={{ background: 'white', borderRadius: '28px', padding: '2.5rem 2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            
            {/* Glowing Icon Container */}
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <div style={{ position: 'absolute', inset: '-10px', background: '#10B981', borderRadius: '50%', filter: 'blur(15px)', opacity: 0.3 }}></div>
              <div style={{ position: 'relative', width: '80px', height: '80px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)' }}>
                <CheckCircle2 size={40} color="white" strokeWidth={2.5} />
              </div>
            </div>

            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', fontSize: '1.4rem', fontWeight: 800, textAlign: 'center', letterSpacing: '-0.5px' }}>Redeem Berhasil!</h3>
            <p style={{ margin: '0 0 2rem 0', color: '#64748B', fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.5 }}>Voucher Anda telah aktif dan dapat dilihat pada halaman Riwayat.</p>
            
            <button onClick={() => setShowToast(false)} style={{ width: '100%', padding: '0.9rem', background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#334155', borderRadius: '14px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
              Lanjutkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
