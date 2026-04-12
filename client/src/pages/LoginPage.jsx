import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContext } from '../context/ToastContext.jsx';
import { register, emailLogin } from '../services/authService.js';
import { validateField, validateForm, hasFormErrors } from '../services/validationService.js';
import FormInput from '../components/FormInput.jsx';
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
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFieldBlur = (fieldName) => {
    const error = validateField(fieldName, formData[fieldName] || '');
    setFieldErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const fieldsToValidate = isSignUp ? ['name', 'email', 'password'] : ['email', 'password'];
    const errors = validateForm(formData, fieldsToValidate);
    
    setFieldErrors(errors);

    if (hasFormErrors(errors)) {
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
        localStorage.removeItem('bbx_pending_prompt');
        navigate('/generate', {
          state: { initialPrompt: pendingPrompt },
        });
      } else {
        navigate('/');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong';
      showToast(errorMessage, 'error');
      
      // Set field-specific errors if available
      if (error.response?.data?.field) {
        setFieldErrors((prev) => ({
          ...prev,
          [error.response.data.field]: errorMessage,
        }));
      }
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

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <h2 className="login-form-title">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>

              {isSignUp && (
                <FormInput
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleFieldBlur('name')}
                  error={fieldErrors.name}
                  required
                />
              )}

              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleFieldBlur('email')}
                error={fieldErrors.email}
                required
              />

              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleFieldBlur('password')}
                error={fieldErrors.password}
                helpText={!isSignUp ? '' : 'Minimum 6 characters'}
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
