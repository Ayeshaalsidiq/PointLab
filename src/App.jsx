import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { getStoredToken } from './services/api';
import { buildReturnUrl, isAllowedRedirect, readPromptParam, readRedirectParam } from './lib/ssoRedirect';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Redeem from './pages/Redeem';
import Promo from './pages/Promo';
import PromoDetail from './pages/PromoDetail';
import Membership from './pages/Membership';
import Auth from './pages/Auth';
import TierDetails from './pages/TierDetails';
import History from './pages/History';
import AIChat from './pages/AIChat';
import ChatBubble from './components/ChatBubble';
import ForgotPassword from './pages/ForgotPassword';
import Feedback from './pages/Feedback';

/**
 * Route Guard untuk halaman terproteksi.
 * Jika pengguna belum login (tidak memiliki token), otomatis diarahkan ke /auth.
 */
const ProtectedRoute = ({ children }) => {
  const { token } = useUser();
  const storedToken = getStoredToken();
  const location = useLocation();

  if (!token && !storedToken) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

/**
 * Sudah login di PointLab tapi datang lewat tautan redirect-auth dari aplikasi
 * mitra: langsung kembalikan token ke aplikasi asal, tidak ke /dashboard.
 */
const SsoReturn = ({ token }) => {
  const redirect = readRedirectParam();
  useEffect(() => {
    if (redirect && isAllowedRedirect(redirect)) {
      window.location.replace(buildReturnUrl(redirect, token));
    }
  }, [redirect, token]);
  return null;
};

/**
 * Aplikasi mitra meminta kredensial eksplisit (`prompt=login`): buang sesi
 * PointLab yang tersimpan SETELAH mount (useEffect, bukan saat render — setState
 * saat render komponen lain memicu warning React) lalu tampilkan form Auth.
 */
const PromptLogin = ({ children }) => {
  const { logout } = useUser();
  useEffect(() => {
    logout();
  }, [logout]);
  return <>{children}</>;
};

/**
 * Route Guard untuk halaman Auth (Login / Register).
 * Jika pengguna sudah login, diarahkan langsung ke /dashboard — kecuali datang
 * dari alur redirect-auth, maka token dikembalikan ke aplikasi asal, atau
 * (dengan prompt=login) form kredensial dipaksa tampil.
 */
const PublicOnlyRoute = ({ children }) => {
  const { token } = useUser();
  const storedToken = getStoredToken();

  if (token || storedToken) {
    // Aplikasi mitra meminta form login eksplisit (tombol Login ditekan):
    // buang sesi PointLab yang tersimpan supaya kredensial dimasukkan ulang.
    if (readPromptParam()) {
      return <PromptLogin>{children}</PromptLogin>;
    }
    const redirect = readRedirectParam();
    const activeToken = token || storedToken;
    if (redirect && isAllowedRedirect(redirect)) {
      return <SsoReturn token={activeToken} />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppContent = () => {
  const location = useLocation();
  const { token } = useUser();
  const isAuthenticated = Boolean(token || getStoredToken());
  const isAuthPage = location.pathname === '/auth';
  const isForgotPasswordPage = location.pathname === '/forgot-password';
  const isFeedbackPage = location.pathname === '/feedback';
  
  if (isAuthPage || isForgotPasswordPage) {
    return (
      <Routes location={location}>
        <Route path="/auth" element={
          <PublicOnlyRoute>
            <Auth />
          </PublicOnlyRoute>
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    );
  }

  // Jika mencoba menembus dashboard atau rute member lewat URL tanpa login, lempar langsung ke /auth
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <div className="app-container">
      {(!['/tier-details', '/history', '/chat', '/feedback'].includes(location.pathname) && !location.pathname.startsWith('/promo/')) && <Sidebar />}
      <div className="main-content" style={(['/tier-details', '/history', '/chat', '/feedback'].includes(location.pathname) || location.pathname.startsWith('/promo/')) ? { marginLeft: 0, paddingBottom: 0 } : {}}>
        <div className="content-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
          {(!['/promo', '/redeem', '/tier-details', '/history', '/chat', '/feedback'].includes(location.pathname) && !location.pathname.startsWith('/promo/')) && <Header />}
          <div key={location.pathname} className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, width: '100%' }}>
            <Routes location={location}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/promo" element={<ProtectedRoute><Promo /></ProtectedRoute>} />
              <Route path="/promo/:id" element={<ProtectedRoute><PromoDetail /></ProtectedRoute>} />
              <Route path="/redeem" element={<ProtectedRoute><Redeem /></ProtectedRoute>} />
              <Route path="/membership" element={<ProtectedRoute><Membership /></ProtectedRoute>} />
              <Route path="/tier-details" element={<ProtectedRoute><TierDetails /></ProtectedRoute>} />
              <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
              <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
      
      {/* Floating Chat Bubble for Dashboard, Redeem, Promo, and Membership */}
      {['/dashboard', '/redeem', '/promo', '/membership'].includes(location.pathname) && <ChatBubble />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
}

export default App;
