import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutGrid, Tag, CircleUser, LogOut, Hexagon, ShoppingBag, Clock, MessageSquare, AlertTriangle } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const displayName = user?.nama || user?.name || 'Member PointLab';
  const displayInitial = displayName.charAt(0).toUpperCase();
  const tierName = user?.tier || 'Classmate';

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    window.location.href = '/auth';
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div style={{ background: 'var(--gradient-primary)', padding: '0.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
            <Hexagon color="white" size={24} strokeWidth={1.5} />
          </div>
          <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '0.5px' }}>
            Point<span className="text-gradient">Lab</span>
          </span>
        </div>

        <nav className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <LayoutGrid size={22} strokeWidth={1.5} />
            <span>Beranda</span>
          </NavLink>
          <NavLink to="/promo" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <Tag size={22} strokeWidth={1.5} />
            <span>Promo</span>
          </NavLink>
          <NavLink to="/redeem" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <ShoppingBag size={22} strokeWidth={1.5} />
            <span>Redeem</span>
          </NavLink>
          <NavLink to="/membership" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <CircleUser size={22} strokeWidth={1.5} />
            <span>Profile</span>
          </NavLink>
          <NavLink to="/history" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <Clock size={22} strokeWidth={1.5} />
            <span>Riwayat</span>
          </NavLink>
          <NavLink to="/feedback" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <MessageSquare size={22} strokeWidth={1.5} />
            <span>Feedback</span>
          </NavLink>
        </nav>

        <div className="user-profile-sm flex-col gap-1">
          <div className="flex-between">
            <div 
              className="flex-center gap-2"
              onClick={() => navigate('/membership')}
              style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              title="Buka Halaman Profile"
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 2px 10px rgba(59, 130, 246, 0.3)' }}>
                <span style={{ fontSize: '1rem', fontWeight: 700 }}>{displayInitial}</span>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>{displayName}</div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500, letterSpacing: '0.3px' }}>{tierName}</div>
              </div>
            </div>
            <button 
              onClick={() => setShowLogoutConfirm(true)} 
              title="Keluar Akun"
              style={{ background: 'rgba(239, 68, 68, 0.1)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', color: '#EF4444', cursor: 'pointer', transition: 'all 0.2s' }} 
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'} 
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
            >
              <LogOut size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div 
          onClick={() => setShowLogoutConfirm(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(5px)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '320px',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              animation: 'slideFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', background: '#FEF2F2',
              display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#EF4444',
              marginBottom: '1rem'
            }}>
              <AlertTriangle size={30} />
            </div>
            
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', fontSize: '1.25rem', fontWeight: 700, textAlign: 'center' }}>
              Keluar Akun?
            </h3>
            <p style={{ margin: '0 0 2rem 0', color: '#64748B', fontSize: '0.875rem', textAlign: 'center', lineHeight: 1.5 }}>
              Apakah Anda yakin ingin keluar dari aplikasi PointLab?
            </p>

            <div style={{ display: 'flex', width: '100%', gap: '0.75rem' }}>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                style={{ 
                  flex: 1, background: '#F1F5F9', color: '#475569', border: 'none', 
                  padding: '0.8rem', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' 
                }}
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmLogout}
                style={{ 
                  flex: 1, background: '#EF4444', color: 'white', border: 'none', 
                  padding: '0.8rem', borderRadius: '12px', fontWeight: 600, cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
                }}
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
