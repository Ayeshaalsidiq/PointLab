import { Crown, CheckCircle2, ShieldCheck, Settings, LogOut, ChevronRight, Clock, HelpCircle, QrCode, Star, Camera, Lock, Eye, EyeOff, AlertTriangle, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const Membership = () => {
  const navigate = useNavigate();
  const { user, points, tierInfo, updateProfile, updatePassword, uploadAvatar, logout } = useUser();
  const [showQRModal, setShowQRModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showBenefitModal, setShowBenefitModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileNim, setProfileNim] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Profil berhasil diperbarui!');
  const [isSaving, setIsSaving] = useState(false);
  const [passwordChangeAlert, setPasswordChangeAlert] = useState(false);
  const [showPasswordConfirmModal, setShowPasswordConfirmModal] = useState(false);

  // State untuk Edit Password
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Sinkronkan state lokal saat modal buka atau user berubah
  useEffect(() => {
    if (user) {
      setProfileName(user.nama || user.name || '');
      setProfilePhone(user.phone || user.telp || '');
      setProfileEmail(user.email || '');
      setProfileNim(user.nim || '');
      setProfileImage(user.avatar_url || null);
    }
  }, [user]);

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);

      try {
        await uploadAvatar(file);
        setToastMessage('Foto profil berhasil diunggah!');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (err) {
        console.error('Gagal mengunggah foto profil:', err);
      }
    }
  };

  const handleSaveProfile = async () => {
    // Validasi Password jika diisi
    if (password.trim() || confirmPassword.trim()) {
      if (password.length < 6) {
        setPasswordError('Password baru minimal 6 karakter.');
        return;
      }
      if (password !== confirmPassword) {
        setPasswordError('Konfirmasi password tidak cocok.');
        return;
      }
      // Tampilkan modal peringatan konfirmasi ganti password
      setShowPasswordConfirmModal(true);
      return;
    }

    // Jika tidak ada perubahan password, langsung simpan
    await executeSaveProfile();
  };

  const executeSaveProfile = async () => {
    setIsSaving(true);
    setShowPasswordConfirmModal(false);
    try {
      // 1. Simpan update profil (nama, phone, email, nim)
      await updateProfile({
        nama: profileName.trim(),
        phone: profilePhone.trim(),
        email: profileEmail.trim(),
        nim: profileNim.trim(),
      });

      // 2. Jika password diisi, update password
      if (password.trim()) {
        await updatePassword(null, password.trim());
      }

      // Reset input password & error
      setPassword('');
      setConfirmPassword('');
      setPasswordError('');
      setShowEditProfileModal(false);
      setToastMessage('Profil & password berhasil disimpan ke server!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setPasswordError(err.message || 'Gagal menyimpan profil.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseEditProfile = () => {
    setPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setShowEditProfileModal(false);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    window.location.href = '/auth';
  };

  const displayName = profileName || user?.nama || user?.name || 'Member PointLab';
  const displayPhone = profilePhone || user?.phone || user?.telp || '-';

  return (
    <div style={{ background: '#1A1B27', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      
      {/* Header Profile Area */}
      <div style={{ padding: '2rem 1.5rem 1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{displayName.charAt(0)}</span>
            )}
          </div>
          <div>
            <h1 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>{displayName}</h1>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0 }}>{displayPhone}</p>
            {user?.nim && (
              <span style={{ color: '#64748B', fontSize: '0.75rem', fontWeight: 500 }}>NIM: {user.nim}</span>
            )}
          </div>
        </div>
        <div onClick={() => setShowEditProfileModal(true)} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
          <Settings size={20} color="white" />
        </div>
      </div>

      {/* Floating Membership Card */}
      <div style={{ padding: '1rem 1.5rem', flexShrink: 0, position: 'relative', zIndex: 10 }}>
        <div style={{ 
          background: `linear-gradient(135deg, ${tierInfo.gradient[0]} 0%, ${tierInfo.gradient[1]} 100%)`, 
          borderRadius: '24px', 
          padding: '1.5rem',
          boxShadow: `0 15px 30px ${tierInfo.colors.primary}40`,
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
                {tierInfo.name}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Total Poin</p>
              <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>{points.toLocaleString('id-ID')}</h2>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, marginTop: '2rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
              {tierInfo.id === 3 ? 'Tingkat Keanggotaan Tertinggi!' : `Progress ke ${tierInfo.nextTier}`}
            </p>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: `${tierInfo.progress}%`, height: '100%', background: 'white', borderRadius: '99px' }}></div>
            </div>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.7rem', color: 'rgba(255,255,255,0.9)' }}>
              {tierInfo.id === 3 ? 'Terima kasih telah menjadi pelanggan setia.' : `${(tierInfo.nextPoints - points).toLocaleString('id-ID')} poin lagi menuju tier berikutnya!`}
            </p>
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
               <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>Member Benefit</span>
             </div>
          </div>

          {/* Settings Menu List */}
          <div style={{ padding: '0 1.5rem' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.1rem', color: '#1E293B', fontWeight: 700 }}>Akun & Keamanan</h3>
            
            <div style={{ background: '#FFFFFF', border: '1px solid #F1F5F9', borderRadius: '20px', padding: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              {[
                { icon: <Settings size={20} />, label: 'Pengaturan Profil', color: '#3B82F6' },
                { icon: <HelpCircle size={20} />, label: 'Pusat Bantuan', color: '#10B981' },
                { icon: <MessageSquare size={20} />, label: 'Feedback', color: '#8B5CF6' },
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
                    setShowLogoutConfirm(true);
                  } else if (item.label === 'Pengaturan Profil') {
                    setShowEditProfileModal(true);
                  } else if (item.label === 'Pusat Bantuan') {
                    setShowHelpModal(true);
                  } else if (item.label === 'Feedback') {
                    navigate('/feedback');
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
        <div onClick={() => setShowQRModal(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
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
            <button onClick={() => setShowQRModal(false)} style={{ width: '100%', padding: '0.85rem', background: '#1E293B', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>Tutup</button>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(5px)' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '1.75rem', width: '100%', maxWidth: '340px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <h3 style={{ margin: '0 0 1.25rem 0', color: '#1E293B', textAlign: 'center', fontSize: '1.25rem', fontWeight: 700 }}>Edit Profil</h3>
            
            {/* Edit Profile Picture */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ position: 'relative', width: '76px', height: '76px', marginBottom: '0.5rem' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '1.85rem', fontWeight: 700, boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)', overflow: 'hidden' }}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    displayName.charAt(0)
                  )}
                </div>
                <label htmlFor="profile-upload" style={{ position: 'absolute', bottom: '-2px', right: '-2px', background: 'white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', cursor: 'pointer', border: '3px solid white', color: '#3B82F6', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <Camera size={15} strokeWidth={2.5} />
                </label>
                <input id="profile-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Ubah Foto Profil</span>
            </div>

            {/* Nama Lengkap */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Nama Lengkap</label>
              <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', boxSizing: 'border-box', fontSize: '0.9rem', color: '#1E293B' }} />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Email</label>
              <input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', boxSizing: 'border-box', fontSize: '0.9rem', color: '#1E293B' }} />
            </div>

            {/* NIM */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>NIM / NIP / No. Identitas</label>
              <input type="text" value={profileNim} onChange={(e) => setProfileNim(e.target.value)} style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', boxSizing: 'border-box', fontSize: '0.9rem', color: '#1E293B' }} />
            </div>

            {/* Nomor Telepon */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Nomor Telepon</label>
              <input type="tel" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} style={{ width: '100%', padding: '0.75rem 0.85rem', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', boxSizing: 'border-box', fontSize: '0.9rem', color: '#1E293B' }} />
            </div>

            {/* Kolom Edit Password */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem', marginBottom: '1.5rem' }}>
              {password.trim() && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', padding: '0.75rem', background: '#FEF3C7', borderRadius: '12px', border: '1px solid #FDE68A' }}>
                  <AlertTriangle size={18} color="#F59E0B" />
                  <span style={{ fontSize: '0.8rem', color: '#92400E', fontWeight: 600 }}>Peringatan: Anda akan mengganti password akun PointLab.</span>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
                <Lock size={15} color="#3B82F6" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B' }}>Ganti Password</span>
              </div>
              <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.72rem', color: '#94A3B8', lineHeight: 1.4 }}>
                Kosongkan jika tidak ingin mengubah password akun Anda.
              </p>

              {/* Password Baru */}
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>Password Baru</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    placeholder="Masukkan password baru"
                    value={password} 
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }} 
                    style={{ width: '100%', padding: '0.75rem 2.4rem 0.75rem 0.85rem', borderRadius: '12px', border: passwordError ? '1px solid #EF4444' : '1px solid #E2E8F0', outline: 'none', boxSizing: 'border-box', fontSize: '0.88rem', color: '#1E293B' }} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Konfirmasi Password Baru */}
              <div style={{ marginBottom: '0.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>Konfirmasi Password Baru</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Ulangi password baru"
                    value={confirmPassword} 
                    onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(''); }} 
                    style={{ width: '100%', padding: '0.75rem 2.4rem 0.75rem 0.85rem', borderRadius: '12px', border: passwordError ? '1px solid #EF4444' : '1px solid #E2E8F0', outline: 'none', boxSizing: 'border-box', fontSize: '0.88rem', color: '#1E293B' }} 
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <p style={{ margin: '0.4rem 0 0 0', color: '#EF4444', fontSize: '0.75rem', fontWeight: 600 }}>
                  {passwordError}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={handleCloseEditProfile} style={{ flex: 1, padding: '0.8rem', background: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>Batal</button>
              <button disabled={isSaving} onClick={handleSaveProfile} style={{ flex: 1, padding: '0.8rem', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', cursor: isSaving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)', opacity: isSaving ? 0.7 : 1 }}>
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Benefit Modal */}
      {showBenefitModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: '#1E293B', textAlign: 'center', fontSize: '1.25rem', fontWeight: 700 }}>Member Benefit</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', background: `linear-gradient(135deg, ${tierInfo.colors.secondary} 0%, ${tierInfo.colors.secondaryGrad} 100%)`, padding: '1rem', borderRadius: '16px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: tierInfo.colors.primary, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 4px 10px ${tierInfo.colors.primary}40` }}><Star size={28}/></div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: tierInfo.colors.text, fontSize: '1.1rem', fontWeight: 800 }}>{tierInfo.name}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: tierInfo.colors.textLight, fontWeight: 600 }}>{tierInfo.id === 3 ? 'Tier Tertinggi' : 'Tier Anda Saat Ini'}</p>
              </div>
            </div>
            
            <h5 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#1E293B', fontWeight: 700 }}>{tierInfo.id === 3 ? 'Member Benefit Eksklusif Tier Ini:' : 'Member Benefit Tier Ini:'}</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
              {tierInfo.benefits.map((benefit, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ color: tierInfo.colors.primary, marginTop: '2px' }}><Star size={16} /></div>
                  <span style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.4 }}>{benefit}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setShowBenefitModal(false)} style={{ width: '100%', padding: '0.85rem', background: '#1E293B', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>Tutup</button>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelpModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', textAlign: 'center', fontSize: '1.25rem', fontWeight: 700 }}>Pusat Bantuan</h3>
            <p style={{ margin: '0 0 1.5rem 0', color: '#64748B', textAlign: 'center', fontSize: '0.85rem', lineHeight: 1.5 }}>Butuh bantuan terkait poin, reward, pesanan kantin, atau akun?</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {/* WhatsApp Contact */}
              <a href="https://wa.me/6281374881250" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#F0FDF4', padding: '1rem', borderRadius: '16px', border: '1px solid #DCFCE7' }}>
                  <div style={{ background: '#22C55E', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.586 1.861.882 2.791.883h.004c3.179 0 5.767-2.587 5.768-5.766.002-3.181-2.584-5.769-5.772-5.769zm9.969 5.768c0 5.485-4.463 9.949-9.962 9.951-1.748 0-3.415-.457-4.887-1.282l-5.651 1.481 1.51-5.508c-.908-1.523-1.408-3.285-1.409-5.142.001-5.486 4.464-9.95 9.965-9.95 5.501 0 9.965 4.464 9.965 9.95z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: '#166534', fontSize: '0.9rem', fontWeight: 700 }}>WhatsApp Admin</h4>
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

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(5px)' }} onClick={() => setShowLogoutConfirm(false)}>
          <div className="animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', width: '100%', maxWidth: '320px', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#FEF2F2', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#EF4444', marginBottom: '1rem' }}>
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
                style={{ flex: 1, background: '#F1F5F9', color: '#475569', border: 'none', padding: '0.8rem', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}
              >
                Batal
              </button>
              <button 
                onClick={confirmLogout}
                style={{ flex: 1, background: '#EF4444', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)' }}
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Confirmation Modal */}
      {showPasswordConfirmModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.65)', zIndex: 110, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem', backdropFilter: 'blur(4px)' }}>
          <div className="animate-fade-in" style={{ background: 'white', borderRadius: '24px', padding: '2rem', width: '100%', maxWidth: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FEF3C7', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#F59E0B', marginBottom: '1rem' }}>
              <AlertTriangle size={28} />
            </div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', fontSize: '1.2rem', fontWeight: 700 }}>Konfirmasi Ganti Password</h3>
            <p style={{ margin: '0 0 1.5rem 0', color: '#64748B', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Anda akan memperbarui kata sandi akun Anda. Setelah disimpan, Anda harus menggunakan kata sandi baru saat login kembali. Lanjutkan?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
              <button 
                onClick={() => setShowPasswordConfirmModal(false)} 
                style={{ flex: 1, padding: '0.8rem', background: '#F1F5F9', color: '#64748B', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}
              >
                Batal
              </button>
              <button 
                disabled={isSaving} 
                onClick={executeSaveProfile} 
                style={{ flex: 1, padding: '0.8rem', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', cursor: isSaving ? 'not-allowed' : 'pointer', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)' }}
              >
                {isSaving ? 'Menyimpan...' : 'Ya, Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal Notification */}
      {showToast && (
        <div className="animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1.5rem' }}>
          <div style={{ background: 'white', borderRadius: '28px', padding: '2.5rem 2rem', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <div style={{ position: 'absolute', inset: '-10px', background: '#10B981', borderRadius: '50%', filter: 'blur(15px)', opacity: 0.3 }}></div>
              <div style={{ position: 'relative', width: '80px', height: '80px', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)' }}>
                <CheckCircle2 size={40} color="white" strokeWidth={2.5} />
              </div>
            </div>

            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', fontSize: '1.4rem', fontWeight: 800, textAlign: 'center', letterSpacing: '-0.5px' }}>Berhasil!</h3>
            <p style={{ margin: '0 0 2rem 0', color: '#64748B', fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.5 }}>{toastMessage}</p>
            
            <button onClick={() => setShowToast(false)} style={{ width: '100%', padding: '0.9rem', background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#334155', borderRadius: '14px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Membership;
