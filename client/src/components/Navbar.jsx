import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContext } from '../context/ToastContext.jsx';
import { logout as logoutAPI } from '../services/authService.js';
import '../styles/navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutAPI();
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
      <div className="navbar-brand">NxtBuild</div>

      <div className="navbar-links">
        <Link
          to="/dashboard"
          className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
        >
          My Projects
        </Link>
      </div>

      <div className="navbar-user">
        <div className="navbar-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <span className="navbar-username">{user?.name}</span>
        <button onClick={handleLogout} className="navbar-logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
