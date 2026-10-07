import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
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

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  
  if (isAuthPage) {
    return (
      <Routes location={location}>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      {(!['/tier-details', '/history', '/chat'].includes(location.pathname) && !location.pathname.startsWith('/promo/')) && <Sidebar />}
      <div className="main-content" style={(['/tier-details', '/history', '/chat'].includes(location.pathname) || location.pathname.startsWith('/promo/')) ? { marginLeft: 0, paddingBottom: 0 } : {}}>
        <div className="content-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
          {(!['/promo', '/redeem', '/tier-details', '/history', '/chat'].includes(location.pathname) && !location.pathname.startsWith('/promo/')) && <Header />}
          <div key={location.pathname} className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, width: '100%' }}>
            <Routes location={location}>
              <Route path="/" element={<Navigate to="/auth" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/promo" element={<Promo />} />
              <Route path="/promo/:id" element={<PromoDetail />} />
              <Route path="/redeem" element={<Redeem />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/tier-details" element={<TierDetails />} />
              <Route path="/history" element={<History />} />
              <Route path="/chat" element={<AIChat />} />
            </Routes>
          </div>
        </div>
      </div>
      
      {/* Floating Chat Bubble for Dashboard and Redeem */}
      {(location.pathname === '/dashboard' || location.pathname === '/redeem') && <ChatBubble />}
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
