import { NavLink } from 'react-router-dom';
import { LayoutGrid, Tag, CircleUser, LogOut, Hexagon, ShoppingBag } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div style={{ background: 'var(--gradient-primary)', padding: '0.5rem', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
          <Hexagon color="white" size={24} strokeWidth={1.5} />
        </div>
        <span style={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '0.5px' }}>
          Point<span className="text-gradient">Lab</span>
        </span>
      </div>

      <nav className="nav-links">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutGrid size={22} strokeWidth={1.5} />
          <span>Beranda</span>
        </NavLink>
        <NavLink to="/promo" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <Tag size={22} strokeWidth={1.5} />
          <span>Promo</span>
        </NavLink>
        <NavLink to="/redeem" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <ShoppingBag size={22} strokeWidth={1.5} />
          <span>Redeem</span>
        </NavLink>
        <NavLink to="/membership" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <CircleUser size={22} strokeWidth={1.5} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="user-profile-sm flex-col gap-1">
        <div className="flex-between">
          <div className="flex-center gap-2">
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 2px 10px rgba(59, 130, 246, 0.3)' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700 }}>B</span>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'white' }}>Blair Nguyen</div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500, letterSpacing: '0.3px' }}>Campus Star</div>
            </div>
          </div>
          <button style={{ background: 'rgba(239, 68, 68, 0.1)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', color: '#EF4444', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}>
            <LogOut size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
