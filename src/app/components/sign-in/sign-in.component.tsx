// src/components/SignInComponent.tsx
import React, { useState } from 'react';
import AuthService from '../../util/auth/auth.service';

const SignInComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 이메일 형식이 유효한지 검사하는 함수
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 로그인 처리 함수
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!isValidEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }
    
    if (!password) {
      setErrorMessage('Password cannot be empty');
      return;
    }

    setLoading(true);
    try {
      const user = await AuthService.tryLogin(email, password);
      console.log('Login successful:', user);
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-image"></div>
      <div className="container">
        <div id="phone">
          <div id="content-wrapper">
            {/* 로그인 카드 */}
            <div className="card" id="login">
              <form onSubmit={handleLogin}>
                <h1>Sign in</h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div className="input">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <label htmlFor="email">Username or Email</label>
                </div>
                <div className="input">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <span className="checkbox remember">
                  <input type="checkbox" id="remember" name="rememberMe" />
                  <label htmlFor="remember" className="read-text">Remember me</label>
                </span>
                <span className="checkbox forgot">
                  <a href="#">Forgot Password?</a>
                </span>
                <button type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
