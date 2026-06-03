import { useState, useContext } from 'react';
import { ToastContext } from '../context/ToastContext.jsx';
import BrandLogo from './BrandLogo.jsx';
import '../styles/footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const { showToast } = useContext(ToastContext);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      showToast('Please enter your email', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email', 'error');
      return;
    }

    setSubscribing(true);
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast('Successfully subscribed to newsletter!', 'success');
      setEmail('');
    } catch (error) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setSubscribing(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <div className="footer-logo">
            <BrandLogo showStudio />
          </div>
          <p className="footer-tagline">Build smarter with AI. Design, generate, preview, and ship your site from one creative workspace.</p>
          <div className="footer-socials">
            <a href="#" className="footer-social-link" title="Twitter" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-0.25 7-5V8a4.534 4.534 0 001.3-9z"/>
              </svg>
            </a>
            <a href="#" className="footer-social-link" title="GitHub" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="footer-social-link" title="LinkedIn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.814 0-9.752h3.554v1.381c.43-.664 1.199-1.608 2.928-1.608 2.136 0 3.745 1.393 3.745 4.385v5.594zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.704 0-.951.77-1.704 1.963-1.704 1.192 0 1.914.753 1.939 1.704 0 .946-.747 1.704-1.987 1.704zm1.582 11.019H3.656V8.081h3.263v12.371zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </a>
            <a href="#" className="footer-social-link" title="Discord" aria-label="Discord">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.492c-1.53-.742-3.17-1.297-4.885-1.515a.074.074 0 00-.079.037c-.211.375-.444.864-.607 1.25-1.645-.246-3.29-.246-4.895 0-.163-.386-.395-.875-.607-1.25a.077.077 0 00-.079-.036c-1.715.218-3.354.773-4.885 1.515a.07.07 0 00-.041.027C1.393 8.766.8 12.88 1.185 16.94a.078.078 0 00.033.056c1.675.89 3.29 1.538 4.87 1.949a.076.076 0 00.084-.028c.462-.63.873-1.295 1.226-2.006a.074.074 0 00-.041-.104c-.635-.2-1.235-.437-1.826-.726a.077.077 0 01-.008-.128c.122-.092.245-.189.365-.276a.074.074 0 01.076-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.076.01c.12.087.242.184.365.276a.077.077 0 01-.006.127c-.59.29-1.19.526-1.823.728a.077.077 0 00-.039.103c.36.71.772 1.375 1.225 2.005a.076.076 0 00.084.028c1.583-.411 3.196-1.06 4.871-1.949a.077.077 0 00.033-.056c.441-4.297-.74-8.035-3.132-11.332a.05.05 0 00-.041-.027zM8.02 13.231c-1.048 0-1.911-.962-1.911-2.139 0-1.177.851-2.139 1.911-2.139 1.065 0 1.909.962 1.909 2.139 0 1.177-.851 2.139-1.909 2.139zm7.975 0c-1.049 0-1.910-.962-1.91-2.139 0-1.177.851-2.139 1.91-2.139 1.065 0 1.909.962 1.909 2.139 0 1.177-.844 2.139-1.909 2.139z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Product Links */}
        <div className="footer-section">
          <h4 className="footer-section-title">Product</h4>
          <ul className="footer-links">
            <li><a href="/">Features</a></li>
            <li><a href="/">Pricing</a></li>
            <li><a href="/">AI Generator</a></li>
            <li><a href="/">Code Editor</a></li>
            <li><a href="/">Live Preview</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="footer-section">
          <h4 className="footer-section-title">Company</h4>
          <ul className="footer-links">
            <li><a href="/">About Us</a></li>
            <li><a href="/">Blog</a></li>
            <li><a href="/">Careers</a></li>
            <li><a href="/">Press Kit</a></li>
            <li><a href="/">Contact</a></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div className="footer-section">
          <h4 className="footer-section-title">Resources</h4>
          <ul className="footer-links">
            <li><a href="/">Documentation</a></li>
            <li><a href="/">API Reference</a></li>
            <li><a href="/">Community</a></li>
            <li><a href="/">Support</a></li>
            <li><a href="/">Status</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section footer-newsletter">
          <h4 className="footer-section-title">Newsletter</h4>
          <p className="footer-newsletter-desc">Subscribe to get updates on new features and AI capabilities.</p>
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="footer-newsletter-input"
              disabled={subscribing}
            />
            <button
              type="submit"
              className="footer-newsletter-btn"
              disabled={subscribing}
            >
              {subscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom - Legal & Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <p>&copy; {currentYear} BuildBot-X. All rights reserved.</p>
        </div>
        <div className="footer-bottom-right">
          <a href="/">Privacy Policy</a>
          <span className="footer-separator">•</span>
          <a href="/">Terms of Service</a>
          <span className="footer-separator">•</span>
          <a href="/">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
