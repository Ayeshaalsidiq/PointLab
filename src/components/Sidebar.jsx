import { NavLink } from 'react-router-dom';
import { LayoutGrid, TicketPercent, CircleUser, LogOut, Hexagon } from 'lucide-react';

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
        <NavLink to="/redeem" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <TicketPercent size={22} strokeWidth={1.5} />
          <span>Promo</span>
        </NavLink>
        <NavLink to="/membership" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          <CircleUser size={22} strokeWidth={1.5} />
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="user-profile-sm flex-col gap-1">
        <div className="flex-between">
          <div className="flex-center gap-2">
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-base)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
              <CircleUser size={20} strokeWidth={1.5} />
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>User Lab</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Gold Member</div>
            </div>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--danger)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <LogOut size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
