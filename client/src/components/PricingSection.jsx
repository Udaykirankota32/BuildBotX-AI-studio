import { useState } from 'react';

const PLANS = [
  {
    name: 'Free',
    monthly: 0,
    yearly: 0,
    features: ['3 projects', 'Basic AI generation', 'Community support'],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    monthly: 19,
    yearly: 190,
    featured: true,
    features: ['Unlimited projects', 'Advanced AI generation', 'Version history', 'Priority support'],
    cta: 'Start Pro Trial',
  },
  {
    name: 'Premium',
    monthly: 49,
    yearly: 490,
    features: ['Everything in Pro', 'Team workspaces', 'Custom templates', 'Dedicated success manager'],
    cta: 'Choose Premium',
  },
];

function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="pricing-section">
      <div className="pricing-header">
        <h2 className="pricing-title">Simple Pricing for Every Builder</h2>
        <p className="pricing-subtitle">Start free and scale when your ideas grow.</p>

        <div className="pricing-toggle">
          <button
            className={`pricing-toggle-btn ${!yearly ? 'active' : ''}`}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
          <button
            className={`pricing-toggle-btn ${yearly ? 'active' : ''}`}
            onClick={() => setYearly(true)}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="pricing-grid">
        {PLANS.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly;
          return (
            <article
              key={plan.name}
              className={`pricing-card ${plan.featured ? 'featured' : ''}`}
            >
              {plan.featured && <span className="pricing-recommended">Recommended</span>}
              <h3 className="pricing-plan-name">{plan.name}</h3>
              <p className="pricing-price">
                {price === 0 ? 'Free' : `$${price}`}
                {price !== 0 && <span>/{yearly ? 'year' : 'month'}</span>}
              </p>
              <ul className="pricing-features">
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>
              <button className="pricing-cta">{plan.cta}</button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default PricingSection;
