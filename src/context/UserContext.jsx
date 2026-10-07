import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import tier1Card from '../assets/tier1-card.png';
import tier2Card from '../assets/tier2-card.png';
import tier3Card from '../assets/tier3-card.png';
import tier4Card from '../assets/tier4-card.png';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('pointlab_points');
    return saved !== null ? parseInt(saved) : 999999999;
  });
  const [redeemedVouchers, setRedeemedVouchers] = useState(() => {
    const saved = localStorage.getItem('pointlab_vouchers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pointlab_points', points);
  }, [points]);

  useEffect(() => {
    localStorage.setItem('pointlab_vouchers', JSON.stringify(redeemedVouchers));
  }, [redeemedVouchers]);

  const tierInfo = useMemo(() => {
    if (points < 5001) {
      return {
        id: 0,
        name: 'Classmate',
        card: tier1Card,
        gradient: ['#94A3B8', '#475569'],
        gradientDashboard: ['#94A3B8', '#CBD5E1'],
        colors: { 
          primary: '#94A3B8', 
          secondary: '#F1F5F9', 
          secondaryGrad: '#E2E8F0', 
          text: '#334155', 
          textLight: '#64748B' 
        },
        nextTier: 'Study Buddy',
        nextPoints: 5001,
        progress: (points / 5001) * 100,
        benefits: [
          'Dapat 1x poin tiap transaksi.',
          'Akses promo kantin bulanan.',
          'Gratis 1 minuman ringan selamat datang.'
        ]
      };
    } else if (points < 15001) {
      return {
        id: 1,
        name: 'Study Buddy',
        card: tier2Card,
        gradient: ['#FBBF24', '#B45309'],
        gradientDashboard: ['#FBBF24', '#FDE68A'],
        colors: { 
          primary: '#F59E0B', 
          secondary: '#FEF3C7', 
          secondaryGrad: '#FDE68A', 
          text: '#92400E', 
          textLight: '#D97706' 
        },
        nextTier: 'Campus Star',
        nextPoints: 15001,
        progress: ((points - 5001) / (15001 - 5001)) * 100,
        benefits: [
          'Dapat 1.2x poin tiap transaksi.',
          'Upsize minuman 1x per minggu gratis.',
          'Akses promo 2 hari lebih awal.'
        ]
      };
    } else if (points < 35001) {
      return {
        id: 2,
        name: 'Campus Star',
        card: tier3Card,
        gradient: ['#60A5FA', '#2563EB'],
        gradientDashboard: ['#FF7A03', '#F59E0B'],
        colors: { 
          primary: '#3B82F6', 
          secondary: '#DBEAFE', 
          secondaryGrad: '#BFDBFE', 
          text: '#1E40AF', 
          textLight: '#2563EB' 
        },
        nextTier: 'Hall of Fame',
        nextPoints: 35001,
        progress: ((points - 15001) / (35001 - 15001)) * 100,
        benefits: [
          'Dapat 1.5x poin tiap transaksi.',
          'Potongan 5% di semua menu tanpa minimal pembelian.',
          'Gratis Main Course saat Ulang Tahun.'
        ]
      };
    } else {
      return {
        id: 3,
        name: 'Hall of Fame',
        card: tier4Card,
        gradient: ['#A855F7', '#7E22CE'],
        gradientDashboard: ['#9333EA', '#C084FC'],
        colors: { 
          primary: '#9333EA', 
          secondary: '#F3E8FF', 
          secondaryGrad: '#E9D5FF', 
          text: '#581C87', 
          textLight: '#7E22CE' 
        },
        nextTier: 'MAX',
        nextPoints: points, 
        progress: 100,
        benefits: [
          'Dapat 2x lipat poin di setiap transaksi.',
          'Diskon khusus 30% setiap bulan.',
          'Bonus item acak (minuman/snack) mingguan gratis.'
        ]
      };
    }
  }, [points]);

  return (
    <UserContext.Provider value={{ points, setPoints, tierInfo, redeemedVouchers, setRedeemedVouchers }}>
      {children}
    </UserContext.Provider>
  );
};
