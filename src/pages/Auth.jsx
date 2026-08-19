import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

function PasswordStrength({ password }) {
  const checks = [
    { label: 'At least 8 characters', pass: password.length >= 8 },
    { label: 'Contains a number', pass: /\d/.test(password) },
    { label: 'Contains uppercase', pass: /[A-Z]/.test(password) },
    { label: 'Contains special character', pass: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const levels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

  if (!password) return null;

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="strength-bar"
            style={{ background: i <= score ? colors[score] : 'rgba(255,255,255,0.08)' }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color: colors[score] }}>
        {levels[score]}
      </span>
      <div className="strength-checks">
        {checks.map((c, i) => (
          <div key={i} className={`strength-check ${c.pass ? 'pass' : ''}`}>
            {c.pass ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Pre-fill email if remembered
  useEffect(() => {
    const remembered = localStorage.getItem('acdyon_remembered_email');
    if (remembered) {
      setEmail(remembered);
      setRememberMe(true);
    }
  }, []);

  // Reset form on tab switch
  const switchMode = () => {
    setIsLogin(v => !v);
    setError('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!isLogin && password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 900));

    const users = JSON.parse(localStorage.getItem('acdyon_users') || '{}');

    if (isLogin) {
      if (users[email] && users[email].password === password) {
        localStorage.setItem('acdyon_currentUser', email);
        if (rememberMe) {
          localStorage.setItem('acdyon_remembered_email', email);
        } else {
          localStorage.removeItem('acdyon_remembered_email');
        }
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } else {
      if (users[email]) {
        setError('An account with this email already exists.');
      } else {
        users[email] = { email, password, name };
        localStorage.setItem('acdyon_users', JSON.stringify(users));
        localStorage.setItem('acdyon_currentUser', email);
        navigate('/dashboard');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      {/* Left decorative panel */}
      <div className="auth-left-panel">
        <div className="auth-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="logo-dot" />
          Acdyon Flow
        </div>
        <div className="auth-left-content">
          <div className="auth-quote">
            <h2>Ship faster.<br />Break nothing.</h2>
            <p>The deployment platform built for modern engineering teams that move at speed.</p>
          </div>
          <div className="auth-features-list">
            {['Zero-downtime deploys', 'Instant rollbacks', 'Real-time pipeline logs', 'Team collaboration'].map((f, i) => (
              <div key={i} className="auth-feature-item">
                <CheckCircle2 size={16} />
                {f}
              </div>
            ))}
          </div>
        </div>
        <div className="auth-left-glow" />
      </div>

      {/* Right form panel */}
      <div className="auth-right-panel">
        <div className="auth-card-v2">
          {/* Header */}
          <div className="auth-card-header">
            <h2>{isLogin ? 'Welcome back' : 'Create your account'}</h2>
            <p>{isLogin ? 'Sign in to continue to your dashboard.' : 'Start orchestrating pipelines in minutes.'}</p>
          </div>

          {/* Error */}
          {error && (
            <div className="auth-error">
              <XCircle size={16} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form-v2">
            {/* Name field (signup only) */}
            {!isLogin && (
              <div className="auth-input-group">
                <label>Full Name</label>
                <div className="auth-input-wrapper">
                  <User size={16} className="auth-input-icon" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    required={!isLogin}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="auth-input-group">
              <label>Email Address</label>
              <div className="auth-input-wrapper">
                <Mail size={16} className="auth-input-icon" />
                <input
                  type="email"
                  placeholder="engineer@acdyon.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-input-group">
              <div className="auth-label-row">
                <label>Password</label>
                {isLogin && (
                  <button type="button" className="forgot-link">Forgot password?</button>
                )}
              </div>
              <div className="auth-input-wrapper">
                <Lock size={16} className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {!isLogin && <PasswordStrength password={password} />}
            </div>

            {/* Confirm Password (signup only) */}
            {!isLogin && (
              <div className="auth-input-group">
                <label>Confirm Password</label>
                <div className={`auth-input-wrapper ${confirmPassword && confirmPassword !== password ? 'input-error' : confirmPassword && confirmPassword === password ? 'input-success' : ''}`}>
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    required={!isLogin}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirm(v => !v)}
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {confirmPassword && confirmPassword !== password && (
                  <span className="field-hint error">Passwords do not match</span>
                )}
                {confirmPassword && confirmPassword === password && (
                  <span className="field-hint success">Passwords match ✓</span>
                )}
              </div>
            )}

            {/* Remember Me (login only) */}
            {isLogin && (
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <span className="remember-checkbox" />
                Remember me
              </label>
            )}

            {/* Submit */}
            <button
              type="submit"
              className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="auth-spinner" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider"><span>or</span></div>

          {/* Switch mode */}
          <p className="auth-switch">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button type="button" onClick={switchMode} className="auth-switch-btn">
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
