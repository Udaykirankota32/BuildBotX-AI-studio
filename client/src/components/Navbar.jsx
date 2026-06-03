import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContext } from '../context/ToastContext.jsx';
import { logout as logoutAPI } from '../services/authService.js';
import ProfileDrawer from './ProfileDrawer.jsx';
import BrandLogo from './BrandLogo.jsx';
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

  const handleViewPlans = () => {
    setDrawerOpen(false);
    navigate('/pricing');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <BrandLogo showStudio />
      </Link>

      <div className="navbar-links">
        <Link
          to="/generate"
          className={`navbar-link ${isActive('/generate') ? 'active' : ''}`}
        >
          Code Generator
        </Link>
        <Link
          to="/projects"
          className={`navbar-link ${isActive('/projects') ? 'active' : ''}`}
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
        onViewPlans={handleViewPlans}
        onLogout={handleLogout}
      />
    </nav>
  );
}

export default Navbar;
