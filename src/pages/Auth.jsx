import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, IdCard, CheckSquare, Square, Eye, EyeOff, Gamepad2, Sun } from 'lucide-react';
import logoNgolab from '../assets/logo-ngolab.png';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const toggleAuth = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate('/dashboard');
    }, 600);
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
        padding: '2.5rem 1.5rem', /* Increased padding-top/bottom to make form longer */
        width: '100%',
        maxWidth: '380px', /* Smaller form width like the reference */
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
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.25rem 0', letterSpacing: '-0.5px' }}>
            {isLogin ? 'Welcome to ' : 'Buat Akun '}<span style={{ color: '#FF7A03' }}>PointLab</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.75rem', margin: 0, lineHeight: 1.5 }}>
            {isLogin 
              ? 'Masuk dengan akun PointLab Anda. Sistem akan mendeteksi peran akses Anda secara otomatis.' 
              : 'Daftarkan diri Anda untuk mulai menikmati keuntungan dan voucher eksklusif.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {!isLogin && (
            <>
              <div>
                <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                  NAMA LENGKAP
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}>
                    <User size={16} />
                  </div>
                  <input type="text" placeholder="Masukkan Nama Lengkap" required style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#FF7A03'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'} />
                </div>
              </div>
            </>
          )}

          {/* Email / NIM */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label style={{ color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                EMAIL / NIM
              </label>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }}>
                <User size={16} />
              </div>
              <input type="text" placeholder="Masukkan Email atau NIM" required style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#FF7A03'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'} />
            </div>
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <label style={{ color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                PASSWORD
              </label>
              {isLogin && <span style={{ color: '#94A3B8', fontSize: '0.65rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Lock size={10}/> Forgot Password?</span>}
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }}>
                <Lock size={16} />
              </div>
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" required style={{ width: '100%', padding: '0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s', letterSpacing: showPassword ? 'normal' : '2px' }} onFocus={(e) => e.target.style.borderColor = '#FF7A03'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'} />
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
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                KONFIRMASI PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#475569' }}>
                  <Lock size={16} />
                </div>
                <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" required style={{ width: '100%', padding: '0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s', letterSpacing: showConfirmPassword ? 'normal' : '2px' }} onFocus={(e) => e.target.style.borderColor = '#FF7A03'} onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'} />
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
              <span style={{ color: '#CBD5E1', fontSize: '0.75rem' }}>Keep me logged in</span>
            </div>
          )}

          <button type="submit" style={{ 
            background: 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)', 
            color: 'white', border: 'none', padding: '0.75rem', borderRadius: '10px', 
            fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
            marginTop: '2rem', boxShadow: '0 8px 20px rgba(255, 122, 3, 0.25)',
            transition: 'transform 0.2s', letterSpacing: '0.5px'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isLogin ? 'LOGIN' : 'DAFTAR SEKARANG'}
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

      </div>
      
      {/* Footer text outside card */}
      <div style={{ marginTop: '1.5rem', textAlign: 'center', color: '#64748B', fontSize: '0.65rem', zIndex: 1 }}>
        © 2026 PointLab by NgoLab. All Right Reserved.
      </div>
    </div>
  );
};

export default Auth;
