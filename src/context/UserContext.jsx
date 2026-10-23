import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import tier1Card from '../assets/tier1-card.png';
import tier2Card from '../assets/tier2-card.png';
import tier3Card from '../assets/tier3-card.png';
import tier4Card from '../assets/tier4-card.png';
import api, { getStoredToken } from '../services/api';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => getStoredToken());
  const [memberId, setMemberId] = useState(() => {
    const saved = localStorage.getItem('pointlab_member_id');
    return saved || null;
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pointlab_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('pointlab_points');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [redeemedVouchers, setRedeemedVouchers] = useState(() => {
    const saved = localStorage.getItem('pointlab_vouchers');
    return saved ? JSON.parse(saved) : [];
  });

  const [promos, setPromos] = useState([]);
  const [coinHistory, setCoinHistory] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sinkronisasi data user ke localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('pointlab_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pointlab_user');
    }
  }, [user]);

  // Sinkronisasi points ke localStorage
  useEffect(() => {
    localStorage.setItem('pointlab_points', points.toString());
  }, [points]);

  // Sinkronisasi redeemed vouchers ke localStorage
  useEffect(() => {
    localStorage.setItem('pointlab_vouchers', JSON.stringify(redeemedVouchers));
  }, [redeemedVouchers]);

  // Hitung Tier Info berdasarkan poin
  const tierInfo = useMemo(() => {
    const currentPts = typeof points === 'number' && !isNaN(points) ? points : 0;
    if (currentPts < 5001) {
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
        progress: Math.min(100, Math.max(0, (currentPts / 5001) * 100)),
        benefits: [
          'Dapat 1x poin tiap transaksi kantin atau game.',
          'Akses promo kantin bulanan WarmingUp.',
          'Gratis 1 minuman ringan selamat datang.'
        ]
      };
    } else if (currentPts < 15001) {
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
        progress: Math.min(100, Math.max(0, ((currentPts - 5001) / (15001 - 5001)) * 100)),
        benefits: [
          'Dapat 1.2x poin tiap transaksi & sesi belajar.',
          'Upsize minuman 1x per minggu gratis di WarmingUp.',
          'Akses promo 2 hari lebih awal.'
        ]
      };
    } else if (currentPts < 35001) {
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
        progress: Math.min(100, Math.max(0, ((currentPts - 15001) / (35001 - 15001)) * 100)),
        benefits: [
          'Dapat 1.5x poin tiap transaksi & game.',
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
        nextPoints: currentPts, 
        progress: 100,
        benefits: [
          'Dapat 2x lipat poin di setiap transaksi & aktivitas.',
          'Diskon khusus 30% setiap bulan.',
          'Bonus item acak (minuman/snack) mingguan gratis.'
        ]
      };
    }
  }, [points]);

  // Refresh Profil Pengguna
  const refreshProfile = useCallback(async () => {
    const activeToken = getStoredToken();
    if (!activeToken) return null;

    try {
      const res = await api.getProfile();
      if (res && res.user) {
        setUser(res.user);
        // Simpan memberId (dari kontrak NGOLAB-GAMI) atau fallback ke user.id
        const mid = res.user.memberId || res.user.id || res.user.userId;
        if (mid) {
          setMemberId(mid);
          localStorage.setItem('pointlab_member_id', mid);
        }
        const pts = res.user.coin_balance ?? res.user.currentPoints ?? 0;
        setPoints(pts);
        return res.user;
      }
    } catch (err) {
      console.warn('Gagal memperbarui profil pengguna dari backend:', err.message);
      if (err.status === 401) {
        api.logout();
        setToken(null);
        setMemberId(null);
        setUser(null);
        setPoints(0);
        localStorage.removeItem('pointlab_points');
        localStorage.removeItem('pointlab_vouchers');
        localStorage.removeItem('pointlab_user');
        localStorage.removeItem('pointlab_member_id');
      }
    }
    return null;
  }, []);

  // Refresh Saldo Koin & Riwayat
  const refreshCoinData = useCallback(async () => {
    const activeToken = getStoredToken();
    if (!activeToken) return;

    // Priority: loyalty balance endpoint (NGOLAB-GAMI kontrak baru)
    if (memberId) {
      try {
        const loyaltyRes = await api.getLoyaltyBalance(memberId);
        if (loyaltyRes && typeof loyaltyRes.currentPoints === 'number') {
          setPoints(loyaltyRes.currentPoints);
        } else if (loyaltyRes && typeof loyaltyRes.balance === 'number') {
          setPoints(loyaltyRes.balance);
        }
      } catch (err) {
        console.warn('Gagal mengambil loyalty balance, fallback ke coin balance:', err.message);
        // Fallback ke endpoint lama
        try {
          const balRes = await api.getCoinBalance();
          if (balRes && typeof balRes.coin_balance === 'number') {
            setPoints(balRes.coin_balance);
          } else if (balRes && typeof balRes.currentPoints === 'number') {
            setPoints(balRes.currentPoints);
          } else if (balRes && typeof balRes.points === 'number') {
            setPoints(balRes.points);
          }
        } catch (err2) {
          console.warn('Gagal mengambil saldo koin:', err2.message);
        }
      }
    } else {
      // Fallback: legacy coin balance endpoint
      try {
        const balRes = await api.getCoinBalance();
        if (balRes && typeof balRes.coin_balance === 'number') {
          setPoints(balRes.coin_balance);
        } else if (balRes && typeof balRes.currentPoints === 'number') {
          setPoints(balRes.currentPoints);
        } else if (balRes && typeof balRes.points === 'number') {
          setPoints(balRes.points);
        } else if (balRes && typeof balRes.balance === 'number') {
          setPoints(balRes.balance);
        }
      } catch (err) {
        console.warn('Gagal mengambil saldo koin:', err.message);
      }
    }

    try {
      const histRes = await api.getCoinHistory();
      if (histRes && Array.isArray(histRes.history)) {
        setCoinHistory(histRes.history);
      }
    } catch (err) {
      console.warn('Gagal mengambil riwayat koin:', err.message);
    }
  }, []);

  // Refresh Daftar Voucher Saya
  const refreshVouchers = useCallback(async () => {
    const activeToken = getStoredToken();
    if (!activeToken) return;

    try {
      const res = await api.getMyVouchers();
      if (res && Array.isArray(res.vouchers)) {
        setRedeemedVouchers(res.vouchers);
      }
    } catch (err) {
      console.warn('Gagal mengambil voucher saya dari backend:', err.message);
    }
  }, []);

  // Refresh Katalog Promo
  const refreshPromos = useCallback(async () => {
    try {
      const res = await api.getPromos();
      if (res && Array.isArray(res.promos)) {
        setPromos(res.promos);
      }
    } catch (err) {
      console.warn('Gagal mengambil katalog promo dari backend:', err.message);
    }
  }, []);

  // Refresh Riwayat Pesanan Saya
  const refreshOrders = useCallback(async () => {
    const activeToken = getStoredToken();
    if (!activeToken) return;

    try {
      const res = await api.getMyOrders();
      if (res && Array.isArray(res.orders)) {
        setMyOrders(res.orders);
      }
    } catch (err) {
      console.warn('Gagal mengambil pesanan saya dari backend:', err.message);
    }
  }, []);

  // Inisialisasi data saat aplikasi dibuka
  useEffect(() => {
    const activeToken = getStoredToken();
    if (activeToken) {
      setToken(activeToken);
      refreshProfile();
      refreshCoinData();
      refreshVouchers();
      refreshOrders();
    }
    refreshPromos();

    // Session timeout tracking
    const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes
    const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

    const updateActivity = () => {
      localStorage.setItem('pointlab_last_activity', Date.now().toString());
    };

    const checkSession = () => {
      const lastActivity = parseInt(localStorage.getItem('pointlab_last_activity') || '0', 10);
      const now = Date.now();
      if (now - lastActivity > SESSION_TIMEOUT && token) {
        logout();
        navigate('/auth');
      }
    };

    updateActivity();
    ACTIVITY_EVENTS.forEach(event => window.addEventListener(event, updateActivity));
    const intervalId = setInterval(checkSession, 30000); // Check every 30s

    return () => {
      ACTIVITY_EVENTS.forEach(event => window.removeEventListener(event, updateActivity));
      clearInterval(intervalId);
    };
  }, [refreshProfile, refreshCoinData, refreshVouchers, refreshPromos, refreshOrders, token, logout]);

  // Method Login
  const login = async (identifier, password) => {
    setLoading(true);
    try {
      const res = await api.login(identifier, password);
      if (res.token) {
        setToken(res.token);
      }
      if (res.user) {
        setUser(res.user);
        // Simpan memberId dari respons backend (kontrak NGOLAB-GAMI)
        const mid = res.user.memberId || res.user.id || res.user.userId;
        if (mid) {
          setMemberId(mid);
          localStorage.setItem('pointlab_member_id', mid);
        }
        const pts = res.user.coin_balance ?? res.user.currentPoints ?? 0;
        setPoints(pts);
      }
      // Ambil data terbaru
      await Promise.allSettled([
        refreshCoinData(),
        refreshVouchers(),
        refreshOrders(),
      ]);
      return res;
    } finally {
      setLoading(false);
    }
  };

  // Method Register
  const register = async (registerData) => {
    setLoading(true);
    try {
      const res = await api.register(registerData);
      if (res.token) {
        setToken(res.token);
      }
      if (res.user) {
        setUser(res.user);
        // Simpan memberId dari respons backend (kontrak NGOLAB-GAMI)
        const mid = res.user.memberId || res.user.id || res.user.userId;
        if (mid) {
          setMemberId(mid);
          localStorage.setItem('pointlab_member_id', mid);
        }
        const pts = res.user.coin_balance ?? res.user.currentPoints ?? 0;
        setPoints(pts);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // Method Logout
  const logout = () => {
    api.logout();
    setToken(null);
    setMemberId(null);
    setUser(null);
    setPoints(0);
    setRedeemedVouchers([]);
    setCoinHistory([]);
    setMyOrders([]);
    localStorage.removeItem('pointlab_points');
    localStorage.removeItem('pointlab_vouchers');
    localStorage.removeItem('pointlab_user');
    localStorage.removeItem('pointlab_member_id');
    localStorage.removeItem('pointlab_last_activity');
  };

  // Method Redeem Promo (NGOLAB-GAMI kontrak: POST /api/members/{memberId}/rewards/{rewardId}/redeem)
  const redeemPromo = async (promoId) => {
    let res;
    if (memberId) {
      // Kontrak baru: gunakan endpoint member-based yang atomic
      try {
        res = await api.redeemReward(memberId, promoId);
      } catch (err) {
        console.warn('redeemReward gagal, fallback ke redeemPromoLegacy:', err.message);
        res = await api.redeemPromoLegacy(promoId);
      }
    } else {
      // Fallback: legacy endpoint
      res = await api.redeemPromoLegacy(promoId);
    }

    // Support both response formats:
    // New: { redemptionId, rewardName, redemptionCode, remainingPoints }
    // Legacy: { message, voucher, remainingPoints, current_balance }
    if (res.redemptionCode) {
      setRedeemedVouchers(prev => [{
        code: res.redemptionCode,
        voucher_code: res.redemptionCode,
        title: res.rewardName || 'Voucher',
        isUsed: false,
        status: 'unused',
      }, ...prev]);
    } else if (res.voucher) {
      setRedeemedVouchers(prev => [res.voucher, ...prev]);
    }

    // Update poin — support both formats
    const newPoints = typeof res.remainingPoints === 'number'
      ? res.remainingPoints
      : (typeof res.current_balance === 'number' ? res.current_balance : null);
    if (newPoints !== null) {
      setPoints(newPoints);
    } else {
      refreshCoinData();
    }
    refreshVouchers();
    return res;
  };

  // Method Klaim Kode Promo
  const claimCode = async (code) => {
    const res = await api.claimPromoCode(code);
    if (res.voucher) {
      setRedeemedVouchers(prev => [res.voucher, ...prev]);
    }
    if (typeof res.current_balance === 'number') {
      setPoints(res.current_balance);
    } else {
      refreshCoinData();
    }
    refreshVouchers();
    return res;
  };

  // Method Update Profil
  const updateProfile = async (profileData) => {
    const res = await api.updateProfile(profileData);
    if (res.user) {
      setUser(prev => ({ ...prev, ...res.user }));
    } else {
      await refreshProfile();
    }
    return res;
  };

  // Method Update Password
  const updatePassword = async (currentPassword, newPassword) => {
    return await api.changePassword(currentPassword, newPassword);
  };

  // Method Upload Avatar
  const uploadAvatar = async (file) => {
    const res = await api.uploadAvatar(file);
    if (res.avatar_url) {
      setUser(prev => prev ? { ...prev, avatar_url: res.avatar_url } : prev);
    }
    await refreshProfile();
    return res;
  };

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        memberId,
        points,
        setPoints,
        tierInfo,
        redeemedVouchers,
        setRedeemedVouchers,
        promos,
        coinHistory,
        myOrders,
        loading,
        login,
        register,
        logout,
        refreshProfile,
        refreshCoinData,
        refreshVouchers,
        refreshPromos,
        refreshOrders,
        redeemPromo,
        claimCode,
        updateProfile,
        updatePassword,
        uploadAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
