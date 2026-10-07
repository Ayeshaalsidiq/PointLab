import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { QrCode, Copy, Check, ArrowLeft } from 'lucide-react';

const PromoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { redeemedVouchers } = useUser();
  const [copied, setCopied] = useState(false);

  const voucher = redeemedVouchers.find(v => v.redeemId === id || v.code === id);

  if (!voucher) {
    return (
      <div style={{ background: '#1A1B27', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ color: '#FFFFFF', marginBottom: '1rem' }}>Voucher tidak ditemukan</h2>
        <button onClick={() => navigate('/promo')} style={{ padding: '0.75rem 1.5rem', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}>Kembali</button>
      </div>
    );
  }

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: '#1A1B27', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      {/* Header */}
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, position: 'relative' }}>
        <button 
          onClick={() => navigate('/promo')} 
          style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '12px' }}
        >
          <ArrowLeft size={20} color="#FFFFFF" />
        </button>
        <h1 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 700, margin: 0, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Detail Promo</h1>
        <div style={{ width: '40px' }} /> {/* Spacer */}
      </div>

      <div style={{ 
        background: '#F8FAFC', 
        padding: '2rem 1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        flex: 1, 
        paddingBottom: '3rem',
        borderRadius: '30px 30px 0 0',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.1)'
      }}>
        <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2.5rem 2rem', width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)' }}>
          
          <div style={{ width: '100%', textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.5rem 1rem', background: `${voucher.color || '#3B82F6'}15`, color: voucher.color || '#3B82F6', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
              {voucher.jenis || 'Promo'}
            </div>
            <h3 style={{ margin: '0', color: '#1E293B', fontSize: '1.4rem', fontWeight: 800, lineHeight: 1.3 }}>{voucher.title}</h3>
          </div>

          {/* Details Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1.5rem', padding: '1rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <span style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 600, marginBottom: '0.3rem' }}>DITUKAR PADA</span>
              <span style={{ fontSize: '0.8rem', color: '#1E293B', fontWeight: 700 }}>{new Date(voucher.redeemedAt).toLocaleDateString('id-ID')}</span>
            </div>
            <div style={{ width: '1px', background: '#E2E8F0' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <span style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 600, marginBottom: '0.3rem' }}>MASA BERLAKU</span>
              <span style={{ fontSize: '0.8rem', color: '#1E293B', fontWeight: 700 }}>{voucher.expired}</span>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '20px', marginBottom: '2rem', border: '1px solid #E2E8F0', width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
            {/* Corner Accents */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', width: '15px', height: '15px', borderTop: '3px solid #CBD5E1', borderLeft: '3px solid #CBD5E1' }}></div>
            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '15px', height: '15px', borderTop: '3px solid #CBD5E1', borderRight: '3px solid #CBD5E1' }}></div>
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '15px', height: '15px', borderBottom: '3px solid #CBD5E1', borderLeft: '3px solid #CBD5E1' }}></div>
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '15px', height: '15px', borderBottom: '3px solid #CBD5E1', borderRight: '3px solid #CBD5E1' }}></div>
            
            <QrCode size={180} color="#1E293B" strokeWidth={1} />
          </div>

          <div style={{ width: '100%', marginBottom: '1.5rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textAlign: 'center' }}>KODE PROMO ANDA</p>
            <div 
              onClick={() => handleCopy(voucher.code)}
              style={{ background: '#1E293B', padding: '1.25rem', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 25px rgba(30, 41, 59, 0.2)' }}
            >
              <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '4px' }}>{voucher.code}</span>
              {copied ? <Check size={22} color="#10B981" /> : <Copy size={22} color="#94A3B8" />}
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', textAlign: 'center', lineHeight: 1.6, marginBottom: '2rem' }}>
            Tunjukkan QR atau sebutkan kode ini ke kasir. Pastikan Anda tidak membagikan kode ini kepada siapapun.
          </p>

          {/* Syarat & Ketentuan */}
          <div style={{ width: '100%', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
              <h4 style={{ margin: 0, color: '#1E293B', fontSize: '0.9rem', fontWeight: 700 }}>Syarat & Ketentuan</h4>
            </div>
            <div style={{ padding: '1rem' }}>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#64748B', fontSize: '0.8rem', lineHeight: 1.6 }}>
                <li style={{ marginBottom: '0.5rem' }}>Voucher hanya berlaku untuk 1x pemakaian.</li>
                <li style={{ marginBottom: '0.5rem' }}>Voucher tidak dapat diuangkan atau digabungkan dengan promo lain.</li>
                <li style={{ marginBottom: '0.5rem' }}>Pihak PointLab berhak membatalkan promo jika ditemukan kecurangan.</li>
                <li>Berlaku hingga batas masa kadaluarsa ({voucher.expired}).</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PromoDetail;
