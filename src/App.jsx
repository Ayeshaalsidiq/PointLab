import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Redeem from './pages/Redeem';
import Membership from './pages/Membership';
import Auth from './pages/Auth';

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
      <Sidebar />
      <div className="main-content">
        {location.pathname !== '/redeem' && <Header />}
        <div key={location.pathname} className="animate-fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, width: '100%' }}>
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/redeem" element={<Redeem />} />
            <Route path="/membership" element={<Membership />} />
          </Routes>
        </div>
      </div>
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
