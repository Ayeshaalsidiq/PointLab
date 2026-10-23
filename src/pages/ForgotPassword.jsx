import { useState } from 'react';
import { Mail, Lock, ArrowLeft, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import logoNgolab from '../assets/logo-ngolab.png';
import { api } from '../services/api';

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Mohon masukkan Email atau NIM Anda.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.forgotPassword(identifier.trim());
      setSuccessMessage('Instruksi reset password telah dikirim ke email Anda. Silakan periksa inbox Anda.');
      setIdentifier('');
    } catch (err) {
      setErrorMessage(err.message || 'Gagal memproses permintaan. Pastikan data yang dimasukkan benar.');
    } finally {
      setIsSubmitting(false);
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
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <div style={{
        background: 'rgba(30, 41, 59, 0.65)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px',
        padding: '2.5rem 1.5rem',
        width: '100%',
        maxWidth: '400px',
        zIndex: 1,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <img src={logoNgolab} alt="Ngolab Logo" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0, fontFamily: 'Poppins', color: 'white', letterSpacing: '-0.5px' }}>
            Point<span style={{ color: '#FF7A03' }}>Lab</span>
          </h1>
        </div>

        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>
            Lupa Password? <span style={{ color: '#FF7A03' }}>Reset</span>
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>
            Masukkan Email atau NIM Anda. Kami akan mengirimkan instruksi untuk mereset password.
          </p>
        </div>

        {errorMessage && (
          <div style={{
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
          }}>
            <AlertCircle size={18} color="#EF4444" style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '10px',
            padding: '0.75rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#6EE7B7',
            fontSize: '0.8rem',
            lineHeight: 1.4
          }}>
            <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0 }} />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              EMAIL / NIM
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }}>
                <Mail size={16} />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => { setIdentifier(e.target.value); setErrorMessage(''); }}
                placeholder="Masukkan Email atau NIM"
                required
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', background: '#0F172A', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: 'white', fontSize: '0.85rem', outline: 'none', transition: 'border 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = '#FF7A03'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.05)'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)',
              color: 'white', border: 'none', padding: '0.75rem', borderRadius: '10px',
              fontWeight: 700, fontSize: '0.9rem', cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginTop: '1rem', boxShadow: '0 8px 20px rgba(255, 122, 3, 0.25)',
              opacity: isSubmitting ? 0.7 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
            }}
          >
            <Send size={16} />
            {isSubmitting ? 'MENGIRIM...' : 'KIRIM PERMINTAAN RESET'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
          <span
            onClick={() => window.history.back()}
            style={{ color: '#FF7A03', fontWeight: 600, cursor: 'pointer', transition: 'color 0.2s', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <ArrowLeft size={16} />
            Kembali ke Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
