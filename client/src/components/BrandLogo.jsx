import '../styles/brandLogo.css';

function BrandLogo({ className = '', showStudio = false }) {
  return (
    <div className={`brand-logo ${className}`.trim()}>
      <svg className="brand-logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="brandSilver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d8deea" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="50" rx="45" ry="39" fill="none" stroke="url(#brandSilver)" strokeWidth="8" />
        <circle cx="73" cy="22" r="6" fill="url(#brandSilver)" />
        <path d="M 20 68 L 48 38 L 48 68 L 60 68 L 60 33 L 72 33 L 72 68" fill="url(#brandSilver)" />
      </svg>

      <span className="brand-logo-divider" aria-hidden="true" />

      <span className="brand-logo-wordmark">
        <span className="brand-logo-main">
          BuildBot-<span className="brand-logo-x">X</span>
        </span>
        {showStudio ? <span className="brand-logo-sub">AI STUDIO</span> : null}
      </span>
    </div>
  );
}

export default BrandLogo;