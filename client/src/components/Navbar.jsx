import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContext } from '../context/ToastContext.jsx';
import { logout as logoutAPI } from '../services/authService.js';
import ProfileDrawer from './ProfileDrawer.jsx';
import '../styles/navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutAPI();
      setDrawerOpen(false);
      logout();
      showToast('Logged out successfully', 'success');
      navigate('/');
    } catch (error) {
      showToast('Logout failed', 'error');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <svg className="navbar-logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6"/>
          <circle cx="73" cy="28" r="6" fill="currentColor"/>
          <path d="M 30 65 L 52 35 L 60 50 L 70 35" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="65" y="42" width="5" height="25" fill="currentColor" rx="2"/>
        </svg>
        BuildBot X
      </div>

      <div className="navbar-links">
        <Link
          to="/dashboard"
          className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
        >
          My Projects
        </Link>
      </div>

      <div className="navbar-right">
        <button className="navbar-user-badge" onClick={() => setDrawerOpen(true)}>
          {user?.name?.charAt(0).toUpperCase()}
        </button>
        <span className="navbar-username">{user?.name}</span>
      </div>

      <ProfileDrawer
        isOpen={drawerOpen}
        user={user}
        onClose={() => setDrawerOpen(false)}
        onLogout={handleLogout}
      />
    </nav>
  );
}

export default Navbar;
