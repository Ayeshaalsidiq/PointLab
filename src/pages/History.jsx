import { ArrowLeft, Clock, Coffee, Utensils, Gift, Zap, Gamepad2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useUser } from '../context/UserContext';

const defaultHistory = [
  {
    id: 'def-1',
    title: 'Pesanan WarmingUp Kantin',
    date: 'Hari ini, 12:30',
    type: 'purchase',
    points: '+120',
  },
  {
    id: 'def-2',
    title: 'Sesi Belajar & Ngolab Gami',
    date: 'Hari ini, 10:15',
    type: 'game',
    points: '+50',
  },
  {
    id: 'def-3',
    title: 'Redeem Voucher Diskon 10%',
    date: 'Kemarin, 14:20',
    type: 'redeem',
    points: '-250',
  },
  {
    id: 'def-4',
    title: 'Bonus Pendaftaran Member Baru',
    date: 'Selamat Datang',
    type: 'bonus',
    points: '+100',
  }
];

const History = () => {
  const navigate = useNavigate();
  const { points, coinHistory, myOrders } = useUser();

  const formattedHistory = useMemo(() => {
    const list = [];

    // 1. Masukkan coinHistory jika ada
    if (Array.isArray(coinHistory) && coinHistory.length > 0) {
      coinHistory.forEach((item, idx) => {
        const isDeduction = (item.amount || item.points || 0) < 0 || item.type === 'REDEEM' || item.type === 'EXPENSE';
        const rawAmount = Math.abs(item.amount || item.points || 0);
        const ptsStr = isDeduction ? `-${rawAmount}` : `+${rawAmount}`;
        
        let type = 'bonus';
        if (isDeduction) type = 'redeem';
        else if (item.source === 'GAME' || item.reference_type === 'GAME_PLAY' || item.type === 'GAME') type = 'game';
        else if (item.source === 'ORDER' || item.reference_type === 'ORDER') type = 'purchase';

        list.push({
          id: item.id || `hist-${idx}`,
          title: item.description || item.title || (isDeduction ? 'Penukaran Reward' : 'Perolehan Poin'),
          date: item.created_at ? new Date(item.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : 'Baru saja',
          type,
          points: ptsStr,
        });
      });
    }

    // 2. Masukkan riwayat pesanan myOrders jika ada
    if (Array.isArray(myOrders) && myOrders.length > 0) {
      myOrders.forEach((ord, idx) => {
        const ptsEarned = Math.floor((ord.total_amount || 0) / 1000);
        list.push({
          id: `order-${ord.id || idx}`,
          title: `Pesanan #${ord.order_number || ord.id} (${ord.status || 'Selesai'})`,
          date: ord.created_at ? new Date(ord.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : 'Hari ini',
          type: 'purchase',
          points: ptsEarned > 0 ? `+${ptsEarned}` : 'Selesai',
        });
      });
    }

    // Jika kosong, gunakan default
    return list.length > 0 ? list : defaultHistory;
  }, [coinHistory, myOrders]);

  const getItemIcon = (type) => {
    if (type === 'redeem') return <Zap size={20} />;
    if (type === 'game') return <Gamepad2 size={20} />;
    if (type === 'bonus') return <Gift size={20} />;
    return <Utensils size={20} />;
  };

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
        <h1 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Riwayat Poin & Aktivitas</h1>
        <div style={{ width: '40px' }} />
      </div>

      <div style={{ padding: '0 1.5rem 1rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '16px' }}>
          <div>
            <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: '0 0 0.25rem 0' }}>Total Poin Aktif</p>
            <h2 style={{ color: 'white', margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>
              {points.toLocaleString('id-ID')}
            </h2>
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
        
        {formattedHistory.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                width: '44px', height: '44px', borderRadius: '12px', 
                background: item.type === 'redeem' ? 'rgba(239, 68, 68, 0.1)' : (item.type === 'game' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)'), 
                color: item.type === 'redeem' ? '#EF4444' : (item.type === 'game' ? '#3B82F6' : '#10B981'),
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}>
                {getItemIcon(item.type)}
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
      </div>
    </div>
  );
};

export default History;
