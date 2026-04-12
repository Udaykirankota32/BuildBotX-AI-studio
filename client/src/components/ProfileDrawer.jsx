import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import '../styles/profileDrawer.css';

function ProfileDrawer({ isOpen, user, onClose, onViewPlans, onLogout }) {
  const currentPlan = user?.subscriptionPlan || user?.plan || 'Free';

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return createPortal(
    <>
      <div
        className={`profile-drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        role="presentation"
      />
      <aside className={`profile-drawer ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="profile-drawer-header">
          <h3>Account</h3>
          <button
            className="profile-drawer-close"
            onClick={onClose}
            aria-label="Close Account Panel"
            title="Close"
          >
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
          <span className="profile-drawer-badge">{currentPlan} Plan</span>
        </div>

        <div className="profile-drawer-actions">
          <button
            className="profile-drawer-view-plans"
            onClick={onViewPlans}
          >
            View Plans
          </button>
          <button className="profile-drawer-settings">Settings</button>
          <button className="profile-drawer-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>
    </>,
    document.body
  );
}

export default ProfileDrawer;
