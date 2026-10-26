import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, IdCard, CheckSquare, Square, Eye, EyeOff, AlertCircle } from 'lucide-react';
import logoNgolab from '../assets/logo-ngolab.png';
import { useUser } from '../context/UserContext';
import { buildReturnUrl, isAllowedRedirect, readModeParam, readRedirectParam } from '../lib/ssoRedirect';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(() => readModeParam() !== 'register');
  const [isAnimating, setIsAnimating] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form States
  const [identifier, setIdentifier] = useState('');
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login, register } = useUser();

  // Kembali ke aplikasi asal (mis. Ngolab-Gami) dengan token setelah berhasil,
  // bila halaman ini dibuka lewat alur redirect-auth dengan URL tujuan yang diizinkan.
  const returnToPartnerApp = (token) => {
    const redirect = readRedirectParam();
    if (redirect && isAllowedRedirect(redirect)) {
      window.location.replace(buildReturnUrl(redirect, token));
      return true;
    }
    return false;
  };

  const toggleAuth = () => {
    setIsAnimating(true);
    setErrorMessage('');
    setHasAttemptedSubmit(false);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setHasAttemptedSubmit(true);

    if (isLogin) {
      if (!identifier.trim() || !password) {
        setErrorMessage('Mohon isi Email/NIM dan password.');
        return;
      }
      setIsSubmitting(true);
      try {
        const res = await login(identifier.trim(), password);
        if (returnToPartnerApp(res && res.token)) return;
        navigate('/dashboard');
      } catch (err) {
        setErrorMessage(err.message || 'Login gagal. Periksa data kredensial Anda.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Register validation
      if (!nama.trim() || !nim.trim() || !phone.trim() || !password) {
        setErrorMessage('Mohon lengkapi seluruh field wajib pendaftaran.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password minimal 6 karakter.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Konfirmasi password tidak cocok.');
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await register({
          nama: nama.trim(),
          nim: nim.trim(),
          email: email.trim() || undefined,
          phone: phone.trim(),
          password,
        });
        if (returnToPartnerApp(res && res.token)) return;
        navigate('/dashboard');
      } catch (err) {
        setErrorMessage(err.message || 'Pendaftaran gagal. Periksa kembali data Anda.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: '#1A1B27',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Animated Background Elements */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      {/* Auth Card */}
      <div style={{
        background: 'rgba(30, 41, 59, 0.65)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px',
        padding: '2.5rem 1.5rem',
        width: '100%',
        maxWidth: '400px',
        zIndex: 1,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isAnimating ? 'scale(0.95) translateY(10px)' : 'scale(1) translateY(0)',
        opacity: isAnimating ? 0 : 1
      }}>
        
        {/* Header inside Card */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          {/* Logo & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={logoNgolab} alt="Ngolab Logo" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, fontFamily: 'Poppins', color: 'white', letterSpacing: '-0.5px' }}>Point<span style={{ color: '#FF7A03' }}>Lab</span></h1>
          </div>
        </div>

        {/* Title Text */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.25rem 0', letterSpacing: '-0.5px' }}>
            {isLogin ? 'Welcome to ' : 'Buat Akun '}<span style={{ color: '#FF7A03' }}>PointLab</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.75rem', margin: 0, lineHeight: 1.5 }}>
            {isLogin 
              ? 'Masuk dengan akun PointLab Anda. Terintegrasi penuh dengan Kantin & Ngolab Gami.' 
              : 'Daftarkan diri Anda untuk mulai mengumpulkan poin dan menukarkan voucher eksklusif.'}
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div
            id="auth-form-error"
            role="alert"
            aria-live="assertive"
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              padding: '0.75rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#FCA5A5',
              fontSize: '0.8rem',
              lineHeight: 1.4
            }}
          >
            <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {!isLogin && (
            <>
              {/* Nama Lengkap */}
              <div>
                <label htmlFor="auth-nama" style={{ display: 'block', color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  NAMA LENGKAP *
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}>
                    <User size={16} />
                  </div>
                  <input
                    id="auth-nama"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan Nama Lengkap"
                    required
                    aria-invalid={hasAttemptedSubmit && !nama.trim() ? 'true' : undefined}
                    aria-describedby={errorMessage ? 'auth-form-error' : undefined}
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s' }}
                    onFocus={(e) => e.target.style.borderColor = '#FF7A03'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
                  />
                </div>
              </div>

              {/* NIM */}
              <div>
                <label htmlFor="auth-nim" style={{ display: 'block', color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  NIM / NOMOR INDUK *
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}>
                    <IdCard size={16} />
                  </div>
                  <input
                    id="auth-nim"
                    type="text"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    placeholder="Contoh: 21102001"
                    required
                    aria-invalid={hasAttemptedSubmit && !nim.trim() ? 'true' : undefined}
                    aria-describedby={errorMessage ? 'auth-form-error' : undefined}
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s' }}
                    onFocus={(e) => e.target.style.borderColor = '#FF7A03'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
                  />
                </div>
              </div>

              {/* Email (Opsional) */}
              <div>
                <label htmlFor="auth-email" style={{ display: 'block', color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  EMAIL (OPSIONAL)
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}>
                    <Mail size={16} />
                  </div>
                  <input
                    id="auth-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Contoh: mahasiswa@student.telkomuniversity.ac.id"
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s' }}
                    onFocus={(e) => e.target.style.borderColor = '#FF7A03'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
                  />
                </div>
              </div>

              {/* No WhatsApp / Phone */}
              <div>
                <label htmlFor="auth-phone" style={{ display: 'block', color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  NOMOR WHATSAPP / TELEPON *
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}>
                    <Phone size={16} />
                  </div>
                  <input
                    id="auth-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 08123456789"
                    required
                    aria-invalid={hasAttemptedSubmit && !phone.trim() ? 'true' : undefined}
                    aria-describedby={errorMessage ? 'auth-form-error' : undefined}
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s' }}
                    onFocus={(e) => e.target.style.borderColor = '#FF7A03'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
                  />
                </div>
              </div>
            </>
          )}

          {/* Email / NIM (Login Mode) */}
          {isLogin && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label htmlFor="auth-identifier" style={{ color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  EMAIL / NIM / NOMOR TELEPON *
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }}>
                  <User size={16} />
                </div>
                <input
                  id="auth-identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Masukkan Email, NIM, atau No HP"
                  required
                  aria-invalid={hasAttemptedSubmit && (!identifier.trim() || Boolean(errorMessage)) ? 'true' : undefined}
                  aria-describedby={errorMessage ? 'auth-form-error' : undefined}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = '#FF7A03'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label htmlFor="auth-password" style={{ color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                PASSWORD *
              </label>
              {isLogin && (
                <Link
                  to="/forgot-password"
                  style={{
                    color: '#FF7A03',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Lupa Password?
                </Link>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }}>
                <Lock size={16} />
              </div>
              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                aria-invalid={hasAttemptedSubmit && (!password || (!isLogin && password.length < 6)) ? 'true' : undefined}
                aria-describedby={errorMessage ? 'auth-form-error' : undefined}
                style={{ width: '100%', padding: '0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s', letterSpacing: showPassword ? 'normal' : '2px' }}
                onFocus={(e) => e.target.style.borderColor = '#FF7A03'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
              />
              <div 
                style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </div>
          </div>

          {!isLogin && (
            /* Confirm Password */
            <div>
              <label htmlFor="auth-confirm-password" style={{ display: 'block', color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                KONFIRMASI PASSWORD *
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }}>
                  <Lock size={16} />
                </div>
                <input
                  id="auth-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  aria-invalid={hasAttemptedSubmit && password !== confirmPassword ? 'true' : undefined}
                  aria-describedby={errorMessage ? 'auth-form-error' : undefined}
                  style={{ width: '100%', padding: '0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s', letterSpacing: showConfirmPassword ? 'normal' : '2px' }}
                  onFocus={(e) => e.target.style.borderColor = '#FF7A03'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
                />
                <div 
                  style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569', cursor: 'pointer' }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              </div>
            </div>
          )}

          {isLogin && (
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginTop: '0.15rem' }}
              onClick={() => setKeepLoggedIn(!keepLoggedIn)}
            >
              {keepLoggedIn ? <CheckSquare size={16} color="#10B981" /> : <Square size={16} color="#475569" />}
              <span style={{ color: '#CBD5E1', fontSize: '0.75rem' }}>Ingat Saya</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ 
              background: 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)', 
              color: 'white', border: 'none', padding: '0.75rem', borderRadius: '10px', 
              fontWeight: 700, fontSize: '0.9rem', cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginTop: '1.5rem', boxShadow: '0 8px 20px rgba(255, 122, 3, 0.25)',
              transition: 'transform 0.2s, opacity 0.2s', letterSpacing: '0.5px',
              opacity: isSubmitting ? 0.7 : 1
            }}
            onMouseDown={(e) => !isSubmitting && (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => !isSubmitting && (e.currentTarget.style.transform = 'scale(1)')}
            onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.transform = 'scale(1)')}
          >
            {isSubmitting ? 'MEMPROSES...' : (isLogin ? 'LOGIN' : 'DAFTAR SEKARANG')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.75rem', color: '#94A3B8' }}>
          {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
          <span 
            onClick={toggleAuth}
            style={{ color: '#FF7A03', fontWeight: 600, cursor: 'pointer', transition: 'color 0.2s' }}
          >
            {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
          </span>
        </div>

        {isLogin && (
          <div style={{ textAlign: 'center', marginTop: '0.75rem' }}>
            <span
              onClick={() => navigate('/forgot-password')}
              style={{ color: '#94A3B8', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s', fontSize: '0.75rem' }}
              onMouseOver={(e) => e.target.style.color = '#FF7A03'}
              onMouseOut={(e) => e.target.style.color = '#94A3B8'}
            >
              Lupa Password?
            </span>
          </div>
        )}

      </div>
      
      {/* Footer text outside card */}
      <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#64748B', fontSize: '0.65rem', zIndex: 1 }}>
        © 2026 PointLab by NgoLab. All Rights Reserved.
      </div>
    </div>
  );
};

export default Auth;
