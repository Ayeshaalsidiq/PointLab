import { ArrowLeft, Clock, Coffee, Utensils, Gift, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const historyData = [
  {
    id: 1,
    title: 'Nasi Goreng Spesial',
    date: 'Hari ini, 12:30',
    type: 'purchase',
    points: '+120',
    icon: <Utensils size={20} />
  },
  {
    id: 2,
    title: 'Es Kopi Susu Gula Aren',
    date: 'Hari ini, 12:45',
    type: 'purchase',
    points: '+45',
    icon: <Coffee size={20} />
  },
  {
    id: 3,
    title: 'Redeem Voucher Diskon 10%',
    date: 'Kemarin, 14:20',
    type: 'redeem',
    points: '-250',
    icon: <Zap size={20} />
  },
  {
    id: 4,
    title: 'Bonus Ulang Tahun',
    date: '3 Okt 2026, 08:00',
    type: 'bonus',
    points: '+500',
    icon: <Gift size={20} />
  }
];

const History = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#12131C', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 9999 }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', border: 'none', padding: 0, pointerEvents: 'auto' }}
        >
          <ArrowLeft size={24} color="white" />
        </button>
        <h1 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Riwayat</h1>
        <div style={{ width: '40px' }} />
      </div>

      <div style={{ padding: '0 1.5rem 1rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px' }}>
          <div>
            <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: '0 0 0.25rem 0' }}>Total Poin Terkumpul</p>
            <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>24.500</h2>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 8px 16px rgba(255,122,3,0.3)' }}>
            <Clock size={24} color="white" />
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#1E1F2E', 
        borderRadius: '32px 32px 0 0', 
        padding: '2rem 1.5rem', 
        flex: 1, 
        boxShadow: '0 -15px 40px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>Aktivitas Terbaru</h3>
        
        {historyData.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                width: '44px', height: '44px', borderRadius: '12px', 
                background: item.type === 'redeem' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
                color: item.type === 'redeem' ? '#EF4444' : '#10B981',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}>
                {item.icon}
              </div>
              <div>
                <h4 style={{ color: 'white', margin: '0 0 0.25rem 0', fontSize: '0.9rem', fontWeight: 600 }}>{item.title}</h4>
                <p style={{ color: '#64748B', margin: 0, fontSize: '0.75rem' }}>{item.date}</p>
              </div>
            </div>
            <span style={{ 
              fontWeight: 700, fontSize: '1rem',
              color: item.type === 'redeem' ? '#EF4444' : '#10B981'
            }}>
              {item.points}
            </span>
          </div>
        ))}

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', padding: '0.75rem 1.5rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>
            Muat Lebih Banyak
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
