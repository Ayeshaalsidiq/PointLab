import { useState } from 'react';
import { LogOut, AlertTriangle, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Header = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    window.location.href = '/auth';
  };

  return (
    <>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.25rem 1.5rem', 
        background: 'var(--bg-base)',
        color: 'white',
        width: '100%',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        {/* Brand */}
        <div onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, fontFamily: 'Poppins' }}>Point<span style={{ color: '#FF7A03' }}>Lab.</span></h1>
        </div>
        
        {/* Center / Right Quick Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* QR Member Shortcut */}
          <button
            onClick={() => setShowQRModal(true)}
            title="Tampilkan QR Member"
            style={{
              background: 'rgba(255, 122, 3, 0.12)',
              border: '1px solid rgba(255, 122, 3, 0.25)',
              color: '#FF7A03',
              cursor: 'pointer',
              padding: '0.45rem 0.85rem',
              borderRadius: '99px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 122, 3, 0.22)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 122, 3, 0.12)'}
          >
            <QrCode size={16} />
            <span>QR Member</span>
          </button>

          {/* Logout Button */}
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            title="Keluar Akun"
            style={{ 
              background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#EF4444', 
              cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', 
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* QR Member Modal */}
      {showQRModal && (
        <div 
          onClick={() => setShowQRModal(false)}
          style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            background: 'rgba(0,0,0,0.65)', zIndex: 9999, 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            padding: '1.5rem', backdropFilter: 'blur(5px)' 
          }}
        >
          <div 
            className="animate-fade-in" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              background: 'white', borderRadius: '24px', padding: '2rem', 
              width: '100%', maxWidth: '320px', display: 'flex', 
              flexDirection: 'column', alignItems: 'center', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', fontSize: '1.25rem', fontWeight: 700 }}>QR Member</h3>
            <div style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1rem', fontWeight: 600 }}>
              {user?.rfid_tag_id ? `RFID: ${user.rfid_tag_id}` : (user?.memberCode ? `KODE: ${user.memberCode}` : `ID: ${user?.id || 'MEMBER'}`)}
            </div>
            <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <QrCode size={180} color="#1E293B" />
              <span style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'monospace', letterSpacing: '1px' }}>
                {user?.rfid_tag_id || user?.memberCode || user?.id || 'POINTLAB-001'}
              </span>
            </div>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.85rem', color: '#64748B', textAlign: 'center', lineHeight: 1.5 }}>
              Tunjukkan kode QR atau tap kartu RFID ini ke kasir WarmingUp untuk mengumpulkan poin dan mendapatkan diskon.
            </p>
            <button 
              onClick={() => setShowQRModal(false)} 
              style={{ width: '100%', padding: '0.85rem', background: '#1E293B', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            width: '90%',
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
