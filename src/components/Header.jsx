import { MoreHorizontal } from 'lucide-react';

const Header = () => {
  return (
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
      <h1 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0, fontFamily: 'Poppins' }}>Point<span style={{ color: '#FF7A03' }}>Lab.</span></h1>
      <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
        <MoreHorizontal size={24} />
      </button>
    </header>
  );
};

export default Header;
