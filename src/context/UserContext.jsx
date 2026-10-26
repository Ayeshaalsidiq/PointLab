import { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import tier1Card from '../assets/tier1-card.png';
import tier2Card from '../assets/tier2-card.png';
import tier3Card from '../assets/tier3-card.png';
import tier4Card from '../assets/tier4-card.png';
import api, { getStoredToken, setStoredToken } from '../services/api';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

/**
 * Ekstrak token SSO dari URL hash (#token=...) atau query (?token=...) saat lintas aplikasi
 * (mis. dari NGOLAB-GAMI "Buka Voucher Teman" ke PointLab), lalu bersihkan URL di browser.
 */
function consumeSsoTokenFromLocation() {
  if (typeof window === 'undefined' || !window.location) return null;
  try {
    const hashRaw = window.location.hash ? window.location.hash.replace(/^#/, '') : '';
    const hashParams = new URLSearchParams(hashRaw);
    const hashToken = hashParams.get('token');
    if (hashToken && hashToken.trim()) {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, '', cleanUrl);
      const trimmed = hashToken.trim();
      setStoredToken(trimmed);
      localStorage.setItem('pointlab_last_activity', Date.now().toString());
      return trimmed;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const queryToken = searchParams.get('token');
    if (queryToken && queryToken.trim()) {
      searchParams.delete('token');
      const remainingSearch = searchParams.toString();
      const cleanUrl = `${window.location.pathname}${remainingSearch ? `?${remainingSearch}` : ''}${window.location.hash || ''}`;
      window.history.replaceState(null, '', cleanUrl);
      const trimmed = queryToken.trim();
      setStoredToken(trimmed);
      localStorage.setItem('pointlab_last_activity', Date.now().toString());
      return trimmed;
    }
  } catch {
    // Abaikan kegagalan parsing URL
  }
  return null;
}

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => consumeSsoTokenFromLocation() || getStoredToken());
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
          'Dapat 1x poin tiap transaksi',
          'Akses promo kantin bulanan',
          'Gratis 1 minuman ringan selamat datang',
          'Akses memberi ulasan menu'
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
          'Dapat 1.2x poin tiap transaksi',
          'Upsize minuman 1x per minggu gratis',
          '1 topping tambahan gratis',
          'Akses promo 2 hari lebih awal',
          'Diskon 5% setiap Selasa'
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
          'Dapat 1.5x poin tiap transaksi',
          'Potongan 5% di semua menu',
          'Gratis Main Course + Cake saat Ulang Tahun',
          'Prioritas antrian dapur lebih cepat',
          'Akses pesan menu rahasia (Secret Menu)',
          'Reservasi meja favorit'
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
          'Dapat 2x poin tiap transaksi & aktivitas',
          'Diskon tetap 15% tanpa minimum pembelian',
          'Bebas upsize minuman kapan saja tanpa batas',
          'Voucher traktiran ulang tahun Rp 150.000',
          'VVIP seating / meja selalu tersedia tanpa antri',
          'Bebas custom menu makanan eksklusif',
          'Gratis kopi setiap pagi',
          'Layanan customer service VIP 24/7'
        ]
      };
    }
  }, [points]);

  // Refresh Profil Pengguna (mendukung format { user } maupun objek profil langsung dari backend_ngolab)
  const refreshProfile = useCallback(async () => {
    const activeToken = getStoredToken();
    if (!activeToken) return null;

    try {
      const res = await api.getProfile();
      const profileUser = res?.user || (res?.id ? res : null);
      if (profileUser) {
        setUser(profileUser);
        const mid = profileUser.memberId || profileUser.id || profileUser.userId;
        if (mid) {
          setMemberId(mid);
          localStorage.setItem('pointlab_member_id', mid);
        }
        const pts = profileUser.currentPoints ?? profileUser.coin_balance ?? profileUser.poin ?? 0;
        setPoints(pts);
        return profileUser;
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

  // Refresh Saldo Koin & Riwayat (mendukung array langsung dari backend_ngolab maupun objek { history })
  const refreshCoinData = useCallback(async () => {
    const activeToken = getStoredToken();
    if (!activeToken) return;

    const storedMid = memberId || localStorage.getItem('pointlab_member_id');
    if (storedMid) {
      try {
        const loyaltyRes = await api.getLoyaltyBalance(storedMid);
        if (loyaltyRes && typeof loyaltyRes.currentPoints === 'number') {
          setPoints(loyaltyRes.currentPoints);
        } else if (loyaltyRes && typeof loyaltyRes.balance === 'number') {
          setPoints(loyaltyRes.balance);
        }
      } catch (err) {
        try {
          const balRes = await api.getCoinBalance();
          if (balRes && typeof balRes.current_points === 'number') {
            setPoints(balRes.current_points);
          } else if (balRes && typeof balRes.coin_balance === 'number') {
            setPoints(balRes.coin_balance);
          } else if (balRes && typeof balRes.points === 'number') {
            setPoints(balRes.points);
          }
        } catch (err2) {
          console.warn('Gagal mengambil saldo koin:', err2.message);
        }
      }
    } else {
      try {
        const balRes = await api.getCoinBalance();
        if (balRes && typeof balRes.current_points === 'number') {
          setPoints(balRes.current_points);
        } else if (balRes && typeof balRes.coin_balance === 'number') {
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
      if (Array.isArray(histRes)) {
        setCoinHistory(histRes);
      } else if (histRes && Array.isArray(histRes.history)) {
        setCoinHistory(histRes.history);
      }
    } catch (err) {
      console.warn('Gagal mengambil riwayat koin:', err.message);
    }
  }, [memberId]);

  // Refresh Daftar Voucher Saya (mendukung array langsung maupun { vouchers })
  const refreshVouchers = useCallback(async () => {
    const activeToken = getStoredToken();
    if (!activeToken) return;

    try {
      const res = await api.getMyVouchers();
      if (Array.isArray(res)) {
        setRedeemedVouchers(res);
      } else if (res && Array.isArray(res.vouchers)) {
        setRedeemedVouchers(res.vouchers);
      }
    } catch (err) {
      console.warn('Gagal mengambil voucher saya dari backend:', err.message);
    }
  }, []);

  // Refresh Katalog Promo (mendukung array langsung maupun { promos })
  const refreshPromos = useCallback(async () => {
    try {
      const res = await api.getPromos();
      if (Array.isArray(res)) {
        setPromos(res);
      } else if (res && Array.isArray(res.promos)) {
        setPromos(res.promos);
      }
    } catch (err) {
      console.warn('Gagal mengambil katalog promo dari backend:', err.message);
    }
  }, []);

  // Refresh Riwayat Pesanan Saya (mendukung array langsung maupun { orders })
  const refreshOrders = useCallback(async () => {
    const activeToken = getStoredToken();
    if (!activeToken) return;

    try {
      const res = await api.getMyOrders();
      if (Array.isArray(res)) {
        setMyOrders(res);
      } else if (res && Array.isArray(res.orders)) {
        setMyOrders(res.orders);
      }
    } catch (err) {
      console.warn('Gagal mengambil pesanan saya dari backend:', err.message);
    }
  }, []);

  // Method Logout
  const logout = useCallback(() => {
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
  }, []);

  // Inisialisasi data & pemantauan sesi saat aplikasi dibuka
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

    // Session timeout tracking (10 menit tanpa aktivitas pengguna)
    const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes
    const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];

    const updateActivity = () => {
      localStorage.setItem('pointlab_last_activity', Date.now().toString());
    };

    const checkSession = () => {
      const activeTok = getStoredToken();
      if (!activeTok) return;

      const lastActivityStr = localStorage.getItem('pointlab_last_activity');
      if (!lastActivityStr) {
        updateActivity();
        return;
      }

      const lastActivity = parseInt(lastActivityStr, 10);
      const now = Date.now();
      if (now - lastActivity > SESSION_TIMEOUT) {
        logout();
        window.location.href = '/auth';
      }
    };

    updateActivity();
    ACTIVITY_EVENTS.forEach(event => window.addEventListener(event, updateActivity, { passive: true }));
    const intervalId = setInterval(checkSession, 15000); // Check every 15s

    return () => {
      ACTIVITY_EVENTS.forEach(event => window.removeEventListener(event, updateActivity));
      clearInterval(intervalId);
    };
  }, [refreshProfile, refreshCoinData, refreshVouchers, refreshPromos, refreshOrders, logout]);

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
        const mid = res.user.memberId || res.user.id || res.user.userId;
        if (mid) {
          setMemberId(mid);
          localStorage.setItem('pointlab_member_id', mid);
        }
        const pts = res.user.currentPoints ?? res.user.coin_balance ?? 0;
        setPoints(pts);
      }
      localStorage.setItem('pointlab_last_activity', Date.now().toString());
      await Promise.allSettled([
        refreshProfile(),
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
        const mid = res.user.memberId || res.user.id || res.user.userId;
        if (mid) {
          setMemberId(mid);
          localStorage.setItem('pointlab_member_id', mid);
        }
        const pts = res.user.currentPoints ?? res.user.coin_balance ?? 0;
        setPoints(pts);
      }
      localStorage.setItem('pointlab_last_activity', Date.now().toString());
      await Promise.allSettled([
        refreshProfile(),
        refreshCoinData(),
        refreshVouchers(),
      ]);
      return res;
    } finally {
      setLoading(false);
    }
  };

  // Method Redeem Promo (mendukung baik coin_promos /api/promos/redeem maupun rewards /api/members/:memberId/rewards/:rewardId/redeem)
  const redeemPromo = async (promoId) => {
    let res;
    const isCoinPromo = String(promoId || '').startsWith('cp-');
    if (isCoinPromo) {
      res = await api.redeemPromo(promoId);
    } else if (memberId) {
      try {
        res = await api.redeemReward(memberId, promoId);
      } catch (err) {
        console.warn('redeemReward gagal, fallback ke redeemPromo:', err.message);
        res = await api.redeemPromo(promoId);
      }
    } else {
      res = await api.redeemPromo(promoId);
    }

    if (res.voucher) {
      setRedeemedVouchers(prev => [res.voucher, ...prev]);
    } else if (res.redemptionCode || res.voucher_code) {
      const code = res.redemptionCode || res.voucher_code;
      setRedeemedVouchers(prev => [{
        code,
        voucher_code: code,
        title: res.rewardName || 'Voucher',
        isUsed: false,
        status: 'unused',
      }, ...prev]);
    }

    const newPoints =
      typeof res.remainingPoints === 'number'
        ? res.remainingPoints
        : typeof res.remaining_coins === 'number'
          ? res.remaining_coins
          : typeof res.current_balance === 'number'
            ? res.current_balance
            : null;

    if (newPoints !== null) {
      setPoints(newPoints);
    } else {
      refreshCoinData();
    }
    refreshVouchers();
    refreshCoinData();
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
