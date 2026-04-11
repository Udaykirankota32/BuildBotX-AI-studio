import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContext } from '../context/ToastContext.jsx';
import { register, emailLogin, validateEmail } from '../services/authService.js';
import { createProject } from '../services/projectService.js';
import AuthPage from '../components/AuthPage.jsx';
import '../styles/login.css';

function LoginPage({ initialSignUp = false }) {
  const { user, login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(initialSignUp);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    if (isSignUp && !formData.name.trim()) {
      showToast('Name is required', 'error');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const result = await register(
          formData.name,
          formData.email,
          formData.password
        );
        login(result.token, result.user);
        showToast('Account created successfully!', 'success');
      } else {
        const result = await emailLogin(formData.email, formData.password);
        login(result.token, result.user);
        showToast('Logged in successfully!', 'success');
      }

      const pendingPrompt = localStorage.getItem('bbx_pending_prompt');
      if (pendingPrompt) {
        const project = await createProject('Quick Start Project');
        localStorage.removeItem('bbx_pending_prompt');
        navigate(`/builder/${project._id}`, {
          state: { initialPrompt: pendingPrompt },
        });
      } else {
        navigate('/');
      }
    } catch (error) {
      showToast(
        error.response?.data?.message || 'Something went wrong',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <div className="login-container">
            <div className="login-logo">
              <svg className="login-logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"/>
                <circle cx="73" cy="28" r="8" fill="currentColor"/>
                <path d="M 30 65 L 52 35 L 60 50 L 70 35" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="65" y="42" width="7" height="25" fill="currentColor" rx="2"/>
              </svg>
            </div>
            <h1 className="login-title">BuildBot X</h1>

            <form className="login-form" onSubmit={handleSubmit}>
              <h2 className="login-form-title">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>

              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="login-input"
                  required
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="login-input"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="login-input"
                required
              />

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading
                  ? 'Loading...'
                  : isSignUp
                    ? 'Create Account'
                    : 'Sign In'}
              </button>
            </form>

            <p className="login-toggle">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                type="button"
                className="login-toggle-btn"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({ name: '', email: '', password: '' });
                }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
      </div>
    </AuthPage>
  );
}

export default LoginPage;
