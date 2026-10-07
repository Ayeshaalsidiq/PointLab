import { Crown, CheckCircle2, ShieldCheck, Settings, LogOut, ChevronRight, Wallet, Clock, HelpCircle, QrCode, Star, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Membership = () => {
  const navigate = useNavigate();
  const [showQRModal, setShowQRModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showBenefitModal, setShowBenefitModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [profileName, setProfileName] = useState('Blair Nguyen');
  const [profilePhone, setProfilePhone] = useState('+62 812-3456-7890');

  return (
    <div style={{ background: '#1A1B27', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      
      {/* Header Profile Area */}
      <div style={{ padding: '2rem 1.5rem 1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{profileName.charAt(0)}</span>
          </div>
          <div>
            <h1 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>{profileName}</h1>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0 }}>{profilePhone}</p>
          </div>
        </div>
        <div onClick={() => setShowEditProfileModal(true)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
          <Settings size={20} color="white" />
        </div>
      </div>

      {/* Floating Membership Card */}
      <div style={{ padding: '1rem 1.5rem', flexShrink: 0, position: 'relative', zIndex: 10 }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)', 
          borderRadius: '24px', 
          padding: '1.5rem',
          boxShadow: '0 15px 30px rgba(37, 99, 235, 0.25)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '160px',
          justifyContent: 'space-between'
        }}>
          {/* Card Decorations */}
          <div style={{ position: 'absolute', right: '-10%', top: '-20%', opacity: 0.15 }}>
            <Crown size={180} color="white" />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
            <div>
              <span style={{ background: 'rgba(255,255,255,0.25)', padding: '0.3rem 0.75rem', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 700, color: 'white', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Campus Star
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Total Poin</p>
              <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>24.500</h2>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, marginTop: '2rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Progress ke Hall of Fame</p>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: '70%', height: '100%', background: 'white', borderRadius: '99px' }}></div>
            </div>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.7rem', color: 'rgba(255,255,255,0.9)' }}>10.500 poin lagi menuju tier berikutnya!</p>
          </div>
        </div>
      </div>

      {/* Bottom White Area Wrapper */}
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', flex: 1, marginTop: '-50px' }}>
        <div style={{ 
          background: 'white', 
          borderRadius: '30px 30px 0 0', 
          paddingTop: '70px', 
          paddingBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 -10px 40px rgba(0,0,0,0.05)'
        }}>
          
          {/* Quick Actions */}
          <div style={{ padding: '0 1.5rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem' }}>
             <div onClick={() => setShowQRModal(true)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
               <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#F8FAFC', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#3B82F6', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                 <QrCode size={26} />
               </div>
               <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>QR</span>
             </div>
             <div onClick={() => navigate('/history')} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
               <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#F8FAFC', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#8B5CF6', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                 <Clock size={26} />
               </div>
               <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>Riwayat</span>
             </div>
             <div onClick={() => setShowBenefitModal(true)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
               <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#F8FAFC', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#F59E0B', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                 <ShieldCheck size={26} />
               </div>
               <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>Keuntungan</span>
             </div>
          </div>

          {/* Settings Menu List */}
          <div style={{ padding: '0 1.5rem' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.1rem', color: '#1E293B', fontWeight: 700 }}>Akun & Keamanan</h3>
            
            <div style={{ background: '#FFFFFF', border: '1px solid #F1F5F9', borderRadius: '20px', padding: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              {[
                { icon: <Settings size={20} />, label: 'Pengaturan Profil', color: '#3B82F6' },
                { icon: <HelpCircle size={20} />, label: 'Pusat Bantuan', color: '#10B981' },
                { icon: <LogOut size={20} />, label: 'Keluar Akun', color: '#EF4444' },
              ].map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', alignItems: 'center', gap: '1rem', 
                  padding: '1rem', cursor: 'pointer',
                  borderBottom: index !== 2 ? '1px solid #F1F5F9' : 'none',
                  transition: 'background 0.2s',
                  borderRadius: '12px'
                }} 
                onClick={() => {
                  if (item.label === 'Keluar Akun') {
                    navigate('/auth');
                  } else if (item.label === 'Pengaturan Profil') {
                    setShowEditProfileModal(true);
                  } else if (item.label === 'Pusat Bantuan') {
                    setShowHelpModal(true);
                  } else {
                    alert(`Membuka ${item.label}...`);
                  }
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '12px', 
                    background: `${item.color}15`, color: item.color,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ flex: 1, fontSize: '0.95rem', fontWeight: 600, color: item.color === '#EF4444' ? '#EF4444' : '#1E293B' }}>
                    {item.label}
                  </span>
                  <ChevronRight size={18} color="#94A3B8" />
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      {/* QR Modal */}
      {showQRModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1E293B', fontSize: '1.25rem', fontWeight: 700 }}>QR Member</h3>
            <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem', border: '1px solid #E2E8F0' }}>
              <QrCode size={180} color="#1E293B" />
            </div>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.85rem', color: '#64748B', textAlign: 'center', lineHeight: 1.5 }}>Tunjukkan kode QR ini ke kasir untuk mengumpulkan poin atau klaim diskon.</p>
            <button onClick={() => setShowQRModal(false)} style={{ width: '100%', padding: '0.85rem', background: '#1E293B', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>Tutup</button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#1E293B', textAlign: 'center', fontSize: '1.25rem', fontWeight: 700 }}>Edit Profil</h3>
            
            {/* Edit Profile Picture */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '0.75rem' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '2rem', fontWeight: 700, boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)' }}>
                  {profileName.charAt(0)}
                </div>
                <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', cursor: 'pointer', border: '3px solid white', color: '#3B82F6', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <Camera size={16} strokeWidth={2.5} />
                </div>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#3B82F6', fontWeight: 600, cursor: 'pointer' }}>Ganti Foto</span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>Nama Lengkap</label>
              <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', boxSizing: 'border-box', fontSize: '0.95rem', color: '#1E293B' }} />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>Nomor Telepon</label>
              <input type="tel" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', boxSizing: 'border-box', fontSize: '0.95rem', color: '#1E293B' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setShowEditProfileModal(false)} style={{ flex: 1, padding: '0.85rem', background: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>Batal</button>
              <button onClick={() => setShowEditProfileModal(false)} style={{ flex: 1, padding: '0.85rem', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)' }}>Simpan</button>
            </div>
          </div>
        </div>
      )}

      {/* Benefit Modal */}
      {showBenefitModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#1E293B', textAlign: 'center', fontSize: '1.25rem', fontWeight: 700 }}>Keuntungan Membership</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)', padding: '1rem', borderRadius: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: '#3B82F6', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)' }}><Star size={28}/></div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#1E40AF', fontSize: '1.1rem', fontWeight: 800 }}>Campus Star</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#2563EB', fontWeight: 600 }}>Tier Anda Saat Ini</p>
              </div>
            </div>
            
            <h5 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#1E293B', fontWeight: 700 }}>Keuntungan Tier Ini:</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ color: '#3B82F6', marginTop: '2px' }}><Star size={16} /></div>
                <span style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.4 }}>Akses pengumpulan poin dasar di setiap transaksi.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ color: '#3B82F6', marginTop: '2px' }}><Star size={16} /></div>
                <span style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.4 }}>Promo diskon bulanan reguler di seluruh kantin.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ color: '#3B82F6', marginTop: '2px' }}><Star size={16} /></div>
                <span style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.4 }}>Akses ke mini game untuk mengumpulkan koin.</span>
              </div>
            </div>

            <button onClick={() => setShowBenefitModal(false)} style={{ width: '100%', padding: '0.85rem', background: '#1E293B', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>Tutup</button>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E0F2FE', color: '#0284C7', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <HelpCircle size={32} />
              </div>
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', textAlign: 'center', fontSize: '1.25rem', fontWeight: 700 }}>Pusat Bantuan</h3>
            <p style={{ margin: '0 0 1.5rem 0', color: '#64748B', textAlign: 'center', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Punya pertanyaan atau kendala? Hubungi tim support kami.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {/* WhatsApp Contact */}
              <a href="https://wa.me/6281374881250" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#F0FDF4', padding: '1rem', borderRadius: '16px', border: '1px solid #DCFCE7' }}>
                  <div style={{ background: '#22C55E', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.177-.298-.018-.46.13-.61.132-.132.297-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#166534', fontSize: '0.9rem', fontWeight: 700 }}>WhatsApp Support</h4>
                    <p style={{ margin: 0, color: '#15803D', fontSize: '0.75rem', fontWeight: 600 }}>+62 813-7488-1250</p>
                  </div>
                </div>
              </a>

              {/* Instagram Contact */}
              <a href="https://instagram.com/ngolabcafe" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#FFF1F2', padding: '1rem', borderRadius: '16px', border: '1px solid #FFE4E6' }}>
                  <div style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#BE123C', fontSize: '0.9rem', fontWeight: 700 }}>Instagram</h4>
                    <p style={{ margin: 0, color: '#E11D48', fontSize: '0.75rem', fontWeight: 600 }}>@ngolabcafe</p>
                  </div>
                </div>
              </a>
            </div>

            <button onClick={() => setShowHelpModal(false)} style={{ width: '100%', padding: '0.85rem', background: '#F1F5F9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>Kembali</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;
