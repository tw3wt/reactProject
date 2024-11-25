import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sign-in.component.css';
import AuthService  from '../../util/auth/auth.service';

const SignInComponent: React.FC = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  /**const isLoginFormValid = email && password;
  const isRegisterFormValid =
    registerEmail &&
    registerPassword &&
    confirmPassword &&
    registerPassword === confirmPassword &&
    acceptTerms;**/

  const navigate = useNavigate();

  const toggleCard = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.tryLogin(email, password);
      navigate('/home');
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.tryRegister(registerEmail, registerPassword);
      toggleCard();
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <div className="bg-image"></div>
      <div className="container">
        <div id="phone">
          <div id="content-wrapper">
            {/* 로그인 카드 */}
            <div className={`card ${!isLoginVisible ? 'hidden' : ''}`} id="login">
              <form onSubmit={handleLogin}>
                <h1>Sign in</h1>
                <div className={`input ${email ? 'active' : ''}`}>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                  />
                  <label htmlFor="email">Username or Email</label>
                </div>
                <div className={`input ${password ? 'active' : ''}`}>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <span className="checkbox remember">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember" className="read-text">Remember me</label>
                </span>
                <span className="checkbox forgot">
                  <a href="#/">Forgot Password?</a>
                </span>
                <button type="submit">Login</button>
              </form>
              <a href="#/" className="account-check" onClick={toggleCard}>
                Don't have an account? <b>Sign up</b>
              </a>
            </div>

            {/* 회원가입 카드 */}
            <div className={`card ${isLoginVisible ? 'hidden' : ''}`} id="register">
              <form onSubmit={handleRegister}>
                <h1>Sign up</h1>
                <div className={`input ${registerEmail ? 'active' : ''}`}>
                  <input
                    id="register-email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder=""
                  />
                  <label htmlFor="register-email">Email</label>
                </div>
                <div className={`input ${registerPassword ? 'active' : ''}`}>
                  <input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder=""
                  />
                  <label htmlFor="register-password">Password</label>
                </div>
                <div className={`input ${confirmPassword ? 'active' : ''}`}>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder=""
                  />
                  <label htmlFor="confirm-password">Confirm Password</label>
                </div>
                <span className="checkbox remember">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <label htmlFor="terms" className="read-text">
                    I have read <b>Terms and Conditions</b>
                  </label>
                </span>
                <button type="submit">Register</button>
              </form>
              <a href="#/" id="gotologin" className="account-check" onClick={toggleCard}>
                Already have an account? <b>Sign in</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;