import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simulated local storage auth
    const users = JSON.parse(localStorage.getItem('acdyon_users') || '{}');

    if (isLogin) {
      if (users[email] && users[email].password === password) {
        localStorage.setItem('acdyon_currentUser', email);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (users[email]) {
        setError('User already exists. Please log in.');
      } else {
        users[email] = { email, password };
        localStorage.setItem('acdyon_users', JSON.stringify(users));
        localStorage.setItem('acdyon_currentUser', email);
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="logo" style={{position: 'absolute', top: '24px', left: '24px', cursor: 'pointer'}} onClick={() => navigate('/')}>
        <div className="logo-dot"></div>
        Acdyon Flow
      </div>
      <div className="auth-card">
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p>{isLogin ? 'Sign in to access your dashboard' : 'Sign up to start orchestrating'}</p>
        
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="engineer@acdyon.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-accent" style={{width: '100%', justifyContent: 'center', marginTop: '16px'}}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-gradient-accent toggle-btn">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
}
