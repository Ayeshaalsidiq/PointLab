import { Crown, CheckCircle2, ShieldCheck, Settings, LogOut, ChevronRight, Wallet, Clock, HelpCircle } from 'lucide-react';

const Membership = () => {
  return (
    <div style={{ background: '#1A1B27', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      
      {/* Header Profile Area */}
      <div style={{ padding: '2rem 1.5rem 1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>B</span>
          </div>
          <div>
            <h1 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Blair Nguyen</h1>
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0 }}>+62 812-3456-7890</p>
          </div>
        </div>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <Settings size={20} color="white" />
        </div>
      </div>

      {/* Floating Membership Card */}
      <div style={{ padding: '1rem 1.5rem', flexShrink: 0, position: 'relative', zIndex: 10 }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #FFB347 0%, #FF7B00 100%)', 
          borderRadius: '24px', 
          padding: '1.5rem',
          boxShadow: '0 15px 30px rgba(255, 123, 0, 0.25)',
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
                Sobat Jajan
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Total Poin</p>
              <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800, color: 'white' }}>24.500</h2>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 1, marginTop: '2rem' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>Progress ke Duta Kantin</p>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ width: '90%', height: '100%', background: 'white', borderRadius: '99px' }}></div>
            </div>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.7rem', color: 'rgba(255,255,255,0.9)' }}>500 poin lagi menuju tier berikutnya!</p>
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
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
               <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#F8FAFC', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#3B82F6', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                 <Wallet size={26} />
               </div>
               <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>Qris</span>
             </div>
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
               <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#F8FAFC', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#8B5CF6', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                 <Clock size={26} />
               </div>
               <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>Riwayat</span>
             </div>
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
               <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: '#F8FAFC', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#F59E0B', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                 <ShieldCheck size={26} />
               </div>
               <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>Benefit</span>
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
                }} onMouseOver={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
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
    </div>
  );
};

export default Membership;
