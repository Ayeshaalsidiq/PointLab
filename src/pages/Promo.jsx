import { useUser } from '../context/UserContext';
import { Tag, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Promo = () => {
  const { redeemedVouchers } = useUser();
  const navigate = useNavigate();

  return (
    <div style={{ background: '#1A1B27', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {/* Header Area */}
      <div style={{ padding: '2rem 1.5rem 2rem 1.5rem', flexShrink: 0 }}>
        <h1 style={{ color: '#FFFFFF', fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
          Promo Saya
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0 }}>
          Voucher yang telah Anda tukarkan.
        </p>
      </div>

      {/* Main Content Area */}
      <div style={{ 
        background: '#F8FAFC', 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        padding: '2rem 1.5rem', 
        paddingBottom: '3rem',
        borderRadius: '30px 30px 0 0',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
      }}>
        {redeemedVouchers.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#EFF6FF', color: '#3B82F6', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Tag size={40} />
            </div>
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', fontSize: '1.2rem', fontWeight: 700 }}>Belum Ada Promo</h2>
            <p style={{ margin: 0, color: '#64748B', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Tukarkan poin Anda di menu Redeem untuk mendapatkan berbagai promo menarik!
            </p>
          </div>
        ) : (
          redeemedVouchers.map((voucher, idx) => (
            <div key={idx} onClick={() => navigate(`/promo/${voucher.redeemId || voucher.code}`)} style={{ 
              display: 'flex', alignItems: 'center', gap: '1rem', 
              padding: '1rem', background: '#FFFFFF', 
              border: '1px solid #E2E8F0', borderRadius: '16px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              cursor: 'pointer', transition: 'transform 0.2s'
            }}>
              <div style={{ 
                minWidth: '50px', height: '50px', 
                background: `${voucher.color || '#3B82F6'}15`, 
                color: voucher.color || '#3B82F6',
                borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}>
                <Tag size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 600, marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {voucher.jenis || 'Promo'}
                </div>
                <h4 style={{ margin: '0 0 0.3rem 0', fontSize: '0.9rem', color: '#1E293B', fontWeight: 700 }}>
                  {voucher.title}
                </h4>
                <div style={{ display: 'inline-block', background: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '6px', color: '#475569', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px' }}>
                  Lihat Detail
                </div>
              </div>
              <div style={{ color: '#94A3B8', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#F8FAFC', width: '36px', height: '36px', borderRadius: '10px' }}>
                <QrCode size={20} color="#3B82F6" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Promo;
