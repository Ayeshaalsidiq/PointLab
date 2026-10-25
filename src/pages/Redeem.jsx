import { useState, useMemo } from 'react';
import { Gift, Ticket, Zap, CheckCircle2, ChevronRight, TicketPercent, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const defaultVouchers = [
  { id: 'promo-1', title: 'Ayam Bakar Madu Spesial WarmingUp', points: 200, type: 'Makanan', jenis: 'Free Produk', color: '#F59E0B' },
  { id: 'promo-2', title: 'Beli Ayam Bakar Gratis Es Teh Jumbo', points: 400, type: 'Minuman', jenis: 'Combo Hemat', color: '#10B981' },
  { id: 'promo-3', title: 'Cashback 20 Poin Nasi Goreng Gila', points: 150, type: 'Cashback', jenis: 'Cashback Koin', color: '#3B82F6' },
  { id: 'promo-4', title: 'Diskon Rp 10.000 Menu All Item', points: 200, type: 'Voucher', jenis: 'Potongan Harga', color: '#8B5CF6' },
  { id: 'promo-5', title: 'Gratis 1 Jam Sewa Ruang Belajar Coworking', points: 350, type: 'Fasilitas', jenis: 'Free Akses', color: '#EC4899' },
];

const Redeem = () => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Voucher Anda telah aktif dan dapat dilihat pada halaman Promo.');
  const [claimError, setClaimError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { points, promos, redeemPromo, claimCode } = useUser();

  // Gabungkan promo dari backend dan fallback jika kosong
  const availableVouchers = useMemo(() => {
    if (promos && promos.length > 0) {
      return promos.map((p, idx) => ({
        id: p.id || p.promo_id || idx + 1,
        title: p.title || p.name || p.nama || `Promo Diskon ${p.discount_percent || 10}%`,
        points: p.coin_cost ?? p.pointsRequired ?? p.required_points ?? p.points ?? 200,
        type: p.category || p.type || 'Kantin',
        jenis: p.jenis || (p.discount_percent ? `Diskon ${p.discount_percent}%` : 'Potongan Harga'),
        color: ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'][idx % 5],
      }));
    }
    return defaultVouchers;
  }, [promos]);

  const handleRedeem = async () => {
    if (!selectedVoucher) return;

    if (points < selectedVoucher.points) {
      alert('Poin Anda tidak mencukupi untuk menukarkan voucher ini.');
      return;
    }

    setIsProcessing(true);
    try {
      await redeemPromo(selectedVoucher.id);
      setSelectedVoucher(null);
      setToastMessage('Redeem Berhasil! Voucher Anda telah aktif dan dapat dilihat pada halaman Promo.');
      setShowToast(true);
    } catch (err) {
      alert(err.message || 'Gagal menukarkan voucher. Silakan coba lagi.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClaimCode = async () => {
    if (!promoCode.trim()) return;

    setIsProcessing(true);
    setClaimError('');
    try {
      await claimCode(promoCode.trim().toUpperCase());
      setPromoCode('');
      setToastMessage('Selamat! Kode promo berhasil diklaim dan masuk ke Promo Saya.');
      setShowToast(true);
    } catch (err) {
      setClaimError(err.message || 'Kode promo tidak valid atau sudah kadaluarsa.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getVoucherIcon = (type, color) => {
    if (type?.toLowerCase().includes('cashback')) return <Zap size={24} color={color} />;
    if (type?.toLowerCase().includes('edukasi')) return <Ticket size={24} color={color} />;
    if (type?.toLowerCase().includes('fasilitas')) return <CheckCircle2 size={24} color={color} />;
    return <Gift size={24} color={color} />;
  };

  return (
    <div style={{ background: '#FFFFFF', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      
      {/* Header Area */}
      <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem', flexShrink: 0 }}>
        <h1 style={{ color: '#1E293B', fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1.5rem 0' }}>
          Tukar Poin & Promo
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
              <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>{points.toLocaleString('id-ID')}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate('/history')}
            style={{ 
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
                placeholder="Masukkan kode promo (misal: NGOLAB2026)..." 
                value={promoCode}
                onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setClaimError(''); }}
                style={{ 
                  border: 'none', background: 'transparent', outline: 'none', width: '100%', 
                  fontSize: '0.9rem', fontWeight: 500, letterSpacing: promoCode ? '1px' : 'normal',
                  color: '#1E293B'
                }}
              />
            </div>
            <button
              onClick={handleClaimCode}
              disabled={isProcessing || !promoCode.trim()}
              style={{ 
                background: '#1A1B27', color: 'white', border: 'none', borderRadius: '12px', 
                padding: '0 1.25rem', fontWeight: 600, cursor: isProcessing ? 'not-allowed' : 'pointer', fontSize: '0.85rem',
                opacity: (isProcessing || !promoCode.trim()) ? 0.6 : 1
              }}
            >
              {isProcessing ? '...' : 'Tukar'}
            </button>
          </div>

          {claimError && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#EF4444', fontSize: '0.75rem', marginTop: '0.5rem' }}>
              <AlertCircle size={14} />
              <span>{claimError}</span>
            </div>
          )}
        </div>

        {/* Vouchers List */}
        <div style={{ padding: '1.5rem', paddingBottom: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#1E293B', fontWeight: 700 }}>Pilihan Penukaran</h3>
            <span onClick={() => navigate('/promo')} style={{ fontSize: '0.8rem', color: '#3B82F6', fontWeight: 600, cursor: 'pointer' }}>Voucher Saya</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {availableVouchers.map((voucher) => (
              <div key={voucher.id} onClick={() => setSelectedVoucher(voucher)} style={{ 
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
                  borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                  {getVoucherIcon(voucher.type, voucher.color)}
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
                    {voucher.points.toLocaleString('id-ID')} Poin
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

      {/* Voucher Detail Modal */}
      {selectedVoucher && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '20px', 
                background: `${selectedVoucher.color}15`, 
                display: 'flex', justifyContent: 'center', alignItems: 'center' 
              }}>
                {getVoucherIcon(selectedVoucher.type, selectedVoucher.color)}
              </div>
            </div>
            
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', textAlign: 'center', fontSize: '1.25rem', fontWeight: 700 }}>{selectedVoucher.title}</h3>
            <p style={{ margin: '0 0 1.5rem 0', color: '#64748B', textAlign: 'center', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Tukarkan {selectedVoucher.points.toLocaleString('id-ID')} poin Anda untuk mendapatkan reward {selectedVoucher.type.toLowerCase()} ini di WarmingUp.
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
              <button disabled={isProcessing} onClick={handleRedeem} style={{ flex: 1, padding: '0.85rem', background: 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: isProcessing ? 'not-allowed' : 'pointer', boxShadow: '0 4px 10px rgba(255, 122, 3, 0.3)', opacity: isProcessing ? 0.7 : 1 }}>
                {isProcessing ? 'Menukar...' : 'Tukar'}
              </button>
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

            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', fontSize: '1.4rem', fontWeight: 800, textAlign: 'center', letterSpacing: '-0.5px' }}>Berhasil!</h3>
            <p style={{ margin: '0 0 2rem 0', color: '#64748B', fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.5 }}>{toastMessage}</p>
            
            <button onClick={() => setShowToast(false)} style={{ width: '100%', padding: '0.9rem', background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#334155', borderRadius: '14px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
              Lanjutkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Redeem;
