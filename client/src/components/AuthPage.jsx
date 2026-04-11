import authIllustration from '../assets/auth-illustration.svg';

function AuthPage({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-split-layout">
        <section className="auth-form-side">{children}</section>

        <aside className="auth-visual-side">
          <img
            src={authIllustration}
            alt="AI assistant interface illustration"
            className="auth-visual-image"
          />
          <div className="auth-visual-overlay" />
          <div className="auth-visual-content">
            <h3>Build smarter with AI</h3>
            <p>
              Design, generate, preview, and ship your site from one creative workspace.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AuthPage;
