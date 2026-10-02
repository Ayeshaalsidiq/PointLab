import { useState } from 'react';
import { Gift, Ticket, Zap, CheckCircle2, ChevronRight, TicketPercent } from 'lucide-react';

const Redeem = () => {
  const [promoCode, setPromoCode] = useState('');

  const vouchers = [
    { id: 1, title: 'Voucher Kantin Rp 50.000', points: 5000, type: 'Makanan', icon: <Gift size={24} />, color: '#F59E0B' },
    { id: 2, title: 'Cashback Point 20%', points: 2500, type: 'Cashback', icon: <Zap size={24} />, color: '#10B981' },
    { id: 3, title: 'Tiket Seminar Gratis', points: 7500, type: 'Edukasi', icon: <Ticket size={24} />, color: '#3B82F6' },
    { id: 4, title: 'Voucher Print 100 Lembar', points: 3500, type: 'Fasilitas', icon: <Gift size={24} />, color: '#8B5CF6' },
    { id: 5, title: 'Parkir Gratis 1 Bulan', points: 10000, type: 'Fasilitas', icon: <CheckCircle2 size={24} />, color: '#EC4899' },
  ];

  return (
    <div style={{ background: '#FFFFFF', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      
      {/* Header Area */}
      <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem', flexShrink: 0 }}>
        <h1 style={{ color: '#1E293B', fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1.5rem 0' }}>
          Promo Spesial
        </h1>
        
        {/* Points Summary Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1A1B27 0%, #333A4A 100%)', 
          borderRadius: '20px', 
          padding: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          <div>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: '0 0 0.25rem 0' }}>Total Poin Anda</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ background: '#FF7A03', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: 'white', fontWeight: 'bold' }}>P</span>
              </div>
              <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>24.500</span>
            </div>
          </div>
          <button style={{ 
            background: 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)',
            color: 'white', border: 'none', padding: '0.6rem 1.2rem',
            borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600,
            boxShadow: '0 4px 12px rgba(255, 122, 3, 0.3)', cursor: 'pointer'
          }}>
            Riwayat
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        
        {/* Input Promo Code */}
        <div style={{ padding: '1rem 1.5rem 1.5rem 1.5rem', borderBottom: '1px solid #F1F5F9' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TicketPercent size={20} color="#3B82F6" />
            Punya Kode Promo?
          </h3>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ 
              flex: 1, background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', 
              display: 'flex', alignItems: 'center', padding: '0.75rem 1rem' 
            }}>
              <input 
                type="text" 
                placeholder="Masukkan kode..." 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                style={{ 
                  border: 'none', background: 'transparent', outline: 'none', width: '100%', 
                  fontSize: '0.9rem', fontWeight: 500, letterSpacing: promoCode ? '1px' : 'normal',
                  color: '#1E293B'
                }}
              />
            </div>
            <button style={{ 
              background: '#1A1B27', color: 'white', border: 'none', borderRadius: '12px', 
              padding: '0 1.25rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' 
            }}>
              Tukar
            </button>
          </div>
        </div>

        {/* Vouchers List */}
        <div style={{ padding: '1.5rem', paddingBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1E293B', fontWeight: 700 }}>Pilihan Penukaran</h3>
            <span style={{ fontSize: '0.8rem', color: '#3B82F6', fontWeight: 600, cursor: 'pointer' }}>Lihat Semua</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {vouchers.map((voucher) => (
              <div key={voucher.id} style={{ 
                display: 'flex', alignItems: 'center', gap: '1rem', 
                padding: '1rem', background: '#FFFFFF', 
                border: '1px solid #F1F5F9', borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                transition: 'transform 0.2s', cursor: 'pointer'
              }}>
                {/* Icon */}
                <div style={{ 
                  minWidth: '50px', height: '50px', 
                  background: `${voucher.color}15`, 
                  color: voucher.color,
                  borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                  {voucher.icon}
                </div>
                
                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {voucher.type}
                  </div>
                  <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '0.9rem', color: '#1E293B', fontWeight: 700 }}>
                    {voucher.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#FF7A03', fontSize: '0.85rem', fontWeight: 700 }}>
                    <div style={{ background: '#FF7A03', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <span style={{ fontSize: '8px', color: 'white', fontWeight: 'bold' }}>P</span>
                    </div>
                    {voucher.points.toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Action */}
                <div style={{ color: '#94A3B8', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ChevronRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Redeem;
