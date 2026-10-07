import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Redeem from './pages/Redeem';
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
      {(!['/tier-details', '/history', '/chat'].includes(location.pathname)) && <Sidebar />}
      <div className="main-content" style={(['/tier-details', '/history', '/chat'].includes(location.pathname)) ? { marginLeft: 0, paddingBottom: 0 } : {}}>
        {(!['/redeem', '/tier-details', '/history', '/chat'].includes(location.pathname)) && <Header />}
        <div key={location.pathname} className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, width: '100%' }}>
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/redeem" element={<Redeem />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/tier-details" element={<TierDetails />} />
            <Route path="/history" element={<History />} />
            <Route path="/chat" element={<AIChat />} />
          </Routes>
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
      <AppContent />
    </Router>
  );
}

export default App;
