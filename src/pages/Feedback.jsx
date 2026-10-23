import { useState } from 'react';
import { ArrowLeft, Send, MessageSquare, Star, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { api } from '../services/api';

const Feedback = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [category, setCategory] = useState('Umum');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Umum', 'Membership', 'Loyalty Program', 'Pelayanan', 'Fitur Aplikasi', 'Lainnya'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!message.trim()) {
      setErrorMessage('Pesan feedback tidak boleh kosong.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitFeedback({
        category,
        message: message.trim(),
        rating: rating > 0 ? rating : null
      });
      setSuccessMessage(res.message || 'Feedback berhasil dikirim! Terima kasih.');
      setMessage('');
      setRating(0);
      setCategory('Umum');
    } catch (err) {
      setErrorMessage(err.message || 'Gagal mengirim feedback. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#12131C', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
        <button
          onClick={() => navigate(-1)}
          style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'transparent', border: 'none', padding: 0 }}
        >
          <ArrowLeft size={24} color="white" />
        </button>
        <h1 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Feedback</h1>
        <div style={{ width: '40px' }} />
      </div>

      <div style={{ padding: '0 1.5rem 1rem 1.5rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '16px', marginBottom: '1rem' }}>
          <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: '0 0 0.25rem 0' }}>Member</p>
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
            {user?.nama || user?.name || 'Member PointLab'}
          </h2>
        </div>
      </div>

      <div style={{ background: '#1E1F2E', borderRadius: '32px 32px 0 0', padding: '2rem 1.5rem', flex: 1, boxShadow: '0 -15px 40px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, margin: '0 0 1.5rem 0' }}>Berikan Feedback Anda</h3>

        {errorMessage && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#FCA5A5', fontSize: '0.85rem', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}>
            <AlertCircle size={18} color="#EF4444" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6EE7B7', fontSize: '0.85rem', marginBottom: '1rem', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
            <CheckCircle2 size={18} color="#10B981" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Category */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#CBD5E1', fontWeight: 600 }}>Kategori</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '99px',
                    border: '1px solid',
                    borderColor: category === cat ? '#FF7A03' : '#334155',
                    background: category === cat ? 'rgba(255, 122, 3, 0.15)' : 'transparent',
                    color: category === cat ? '#FF7A03' : '#94A3B8',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#CBD5E1', fontWeight: 600 }}>Rating (Opsional)</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(rating === star ? 0 : star)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', transition: 'transform 0.2s' }}
                  onMouseOver={(e) => { if (rating < star) e.currentTarget.style.transform = 'scale(1.2)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <Star size={28} color={star <= rating ? '#F59E0B' : '#475569'} fill={star <= rating ? '#F59E0B' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#CBD5E1', fontWeight: 600 }}>Pesan</label>
            <textarea
              value={message}
              onChange={(e) => { setMessage(e.target.value); setErrorMessage(''); }}
              placeholder="Tuliskan feedback Anda tentang membership, loyalty program, atau aplikasi PointLab..."
              rows={5}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid #334155',
                background: '#0F172A',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => e.target.style.borderColor = '#FF7A03'}
              onBlur={(e) => e.target.style.borderColor = '#334155'}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: 'linear-gradient(135deg, #FF7A03 0%, #FFA34D 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 15px rgba(255, 122, 3, 0.3)',
              opacity: isSubmitting ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '0.5rem'
            }}
          >
            <Send size={18} />
            {isSubmitting ? 'MENGIRIM...' : 'KIRIM FEEDBACK'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
