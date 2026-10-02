import { useState } from 'react';
import { LogOut, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    navigate('/auth');
  };

  return (
    <>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.5rem', 
        background: 'var(--bg-base)',
        color: 'white',
        width: '100%'
      }}>
        <div style={{ width: '24px' }}></div> {/* Spacer for centering */}
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, fontFamily: 'Poppins' }}>Point<span style={{ color: '#FF7A03' }}>Lab.</span></h1>
        
        <button 
          onClick={() => setShowLogoutConfirm(true)}
          style={{ 
            background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#EF4444', 
            cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', 
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            transition: 'background 0.2s'
          }}
        >
          <LogOut size={20} />
        </button>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
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
          }}>
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
                onClick={handleLogout}
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

export default Header;
