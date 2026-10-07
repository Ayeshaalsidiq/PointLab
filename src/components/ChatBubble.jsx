import { BotMessageSquare, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatBubble = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div 
      onClick={() => navigate('/chat', { state: { from: location.pathname } })}
      style={{
        position: 'fixed',
        bottom: '80px',
        right: '1.5rem',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(255, 122, 3, 0.1)',
        cursor: 'pointer',
        zIndex: 99,
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4), 0 0 0 4px rgba(255, 122, 3, 0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(255, 122, 3, 0.1)';
      }}
    >
      <div style={{ position: 'relative' }}>
        <BotMessageSquare size={26} color="#FF7A03" />
        <Sparkles size={12} color="#FFD700" style={{ position: 'absolute', top: '-6px', right: '-8px', animation: 'pulse 2s infinite' }} />
      </div>
      
      {/* Glowing Notification Dot */}
      <span style={{
        position: 'absolute',
        top: '4px',
        right: '4px',
        width: '14px',
        height: '14px',
        background: '#10B981',
        border: '3px solid #0F172A',
        borderRadius: '50%',
        boxShadow: '0 0 10px #10B981'
      }}></span>
    </div>
  );
};

export default ChatBubble;
