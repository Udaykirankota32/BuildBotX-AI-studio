import { useNavigate } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard.jsx';
import '../styles/landing.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <span className="landing-logo">
          <svg className="landing-logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="8"/>
            <circle cx="73" cy="28" r="8" fill="white"/>
            <path d="M 30 65 L 52 35 L 60 50 L 70 35" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="65" y="42" width="7" height="25" fill="white" rx="2"/>
          </svg>
          BuildBot X
        </span>
        <button onClick={() => navigate('/login')} className="landing-nav-cta">
          Get Started
        </button>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <span className="landing-badge">BuildBot X ai studio</span>
          <h1 className="landing-hero-title">
            Build Beautiful Apps
            <span className="landing-hero-accent"> From a Single Prompt</span>
          </h1>
          <p className="landing-hero-subtitle">
            Describe your idea in plain English. Generate complete HTML, CSS, and JavaScript instantly, then refine through chat.
          </p>

          <div className="landing-prompt-box">
            <div className="landing-prompt-input">
              "Create a modern portfolio site with project cards, a contact form, and subtle motion"
            </div>
            <button onClick={() => navigate('/login')} className="landing-prompt-btn">
              Generate App
            </button>
          </div>

          <div className="landing-stats">
            <div className="landing-stat">
              <span className="landing-stat-number">1 Prompt</span>
              <span className="landing-stat-label">To First Version</span>
            </div>
            <div className="landing-stat-divider" />
            <div className="landing-stat">
              <span className="landing-stat-number">Live</span>
              <span className="landing-stat-label">Preview + Code</span>
            </div>
            <div className="landing-stat-divider" />
            <div className="landing-stat">
              <span className="landing-stat-number">100%</span>
              <span className="landing-stat-label">Code Ownership</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="landing-section-title">How It Works</h2>
        <p className="landing-section-subtitle">
          Turn idea to app in three focused steps.
        </p>
        <div className="landing-features-grid">
          <FeatureCard
            icon="✎"
            title="Describe Your App"
            description="Tell the AI what you want to build in plain English"
          />
          <FeatureCard
            icon="⚡"
            title="AI Generates Code"
            description="Get complete HTML, CSS, and JavaScript instantly"
          />
          <FeatureCard
            icon="👁️"
            title="See It Live"
            description="Preview your app and iterate until it's perfect"
          />
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-logo">BuildBot X ai studio</div>
          <p className="landing-footer-text">
            &copy; 2026 BuildBot X ai studio. Transform ideas into working code.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
