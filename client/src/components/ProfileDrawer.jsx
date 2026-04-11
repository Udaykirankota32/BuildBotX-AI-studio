import '../styles/profileDrawer.css';

function ProfileDrawer({ isOpen, user, onClose, onLogout }) {
  return (
    <>
      <div
        className={`profile-drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <aside className={`profile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="profile-drawer-header">
          <h3>Account</h3>
          <button className="profile-drawer-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="profile-drawer-user">
          <div className="profile-drawer-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="profile-drawer-name">{user?.name || 'User'}</p>
            <p className="profile-drawer-email">{user?.email || 'No email'}</p>
          </div>
        </div>

        <div className="profile-drawer-plan">
          <span className="profile-drawer-label">Subscription</span>
          <span className="profile-drawer-badge">Free Plan</span>
        </div>

        <div className="profile-drawer-actions">
          <button className="profile-drawer-settings">Settings</button>
          <button className="profile-drawer-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default ProfileDrawer;
