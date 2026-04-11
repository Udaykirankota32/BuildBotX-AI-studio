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
        <button onClick={() => navigate('/login')} className="landing-nav-btn">
          Get Started
        </button>
      </nav>

      <section className="landing-hero">
        <h1 className="landing-title">Build Amazing Web Apps Instantly</h1>
        <p className="landing-subtitle">
          Describe what you want. AI builds it. You own the code.
        </p>
        <button onClick={() => navigate('/login')} className="landing-cta-btn">
          Start Building Now
        </button>

        <div className="landing-prompt-box">
          <div className="landing-prompt-label">Try it:</div>
          <p className="landing-prompt-text">
            "Create a modern portfolio site with my projects, dark theme, and
            smooth animations"
          </p>
        </div>
      </section>

      <section className="landing-features">
        <h2 className="landing-features-title">How It Works</h2>
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
        <p>&copy; 2026 BuildBot X ai studio. Transform your ideas into code.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
