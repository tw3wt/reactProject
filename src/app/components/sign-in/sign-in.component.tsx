// src/components/SignInComponent.tsx
import React, { useState } from 'react';
import AuthService from '../../util/auth/auth.service';
import { useNavigate } from 'react-router-dom';

const SignInComponent: React.FC = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isRegisterEmailFocused, setIsRegisterEmailFocused] = useState(false);
  const [isRegisterPasswordFocused, setIsRegisterPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const navigate = useNavigate();

  // 유효성 검사
  const isLoginFormValid = email && password;
  const isRegisterFormValid =
    registerEmail &&
    registerPassword &&
    confirmPassword &&
    registerPassword === confirmPassword &&
    acceptTerms;

  // 로그인 및 회원가입 폼 전환
  const toggleCard = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  // 포커스 관리
  const focusInput = (inputName: string) => {
    switch (inputName) {
      case 'email': setIsEmailFocused(true); break;
      case 'password': setIsPasswordFocused(true); break;
      case 'registerEmail': setIsRegisterEmailFocused(true); break;
      case 'registerPassword': setIsRegisterPasswordFocused(true); break;
      case 'confirmPassword': setIsConfirmPasswordFocused(true); break;
    }
  };

  const blurInput = (inputName: string) => {
    switch (inputName) {
      case 'email': setIsEmailFocused(false); break;
      case 'password': setIsPasswordFocused(false); break;
      case 'registerEmail': setIsRegisterEmailFocused(false); break;
      case 'registerPassword': setIsRegisterPasswordFocused(false); break;
      case 'confirmPassword': setIsConfirmPasswordFocused(false); break;
    }
  };

  // 로그인 처리
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await AuthService.tryLogin(email, password);
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  // 회원가입 처리
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
            {isLoginVisible && (
              <div className="card" id="login">
                <form onSubmit={handleLogin}>
                  <h1>Sign in</h1>
                  <div className="input">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=""
                      onFocus={() => focusInput('email')}
                      onBlur={() => blurInput('email')}
                    />
                    <label htmlFor="email">Username or Email</label>
                  </div>
                  <div className="input">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=""
                      onFocus={() => focusInput('password')}
                      onBlur={() => blurInput('password')}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <span className="checkbox remember">
                    <input
                      type="checkbox"
                      id="remember"
                      name="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember" className="read-text">Remember me</label>
                  </span>
                  <span className="checkbox forgot">
                    <a href="#">Forgot Password?</a>
                  </span>
                  <button type="submit" disabled={!isLoginFormValid}>Login</button>
                </form>
                <a href="#" className="account-check" onClick={toggleCard}>
                  Don't have an account? <b>Sign up</b>
                </a>
              </div>
            )}

            {/* 회원가입 카드 */}
            {!isLoginVisible && (
              <div className="card" id="register">
                <form onSubmit={handleRegister}>
                  <h1>Sign up</h1>
                  <div className="input">
                    <input
                      id="register-email"
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="Email"
                      onFocus={() => focusInput('registerEmail')}
                      onBlur={() => blurInput('registerEmail')}
                    />
                    <label htmlFor="register-email">Email</label>
                  </div>
                  <div className="input">
                    <input
                      id="register-password"
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Password"
                      onFocus={() => focusInput('registerPassword')}
                      onBlur={() => blurInput('registerPassword')}
                    />
                    <label htmlFor="register-password">Password</label>
                  </div>
                  <div className="input">
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                      onFocus={() => focusInput('confirmPassword')}
                      onBlur={() => blurInput('confirmPassword')}
                    />
                    <label htmlFor="confirm-password">Confirm Password</label>
                  </div>
                  <span className="checkbox remember">
                    <input
                      type="checkbox"
                      id="terms"
                      name="acceptTerms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <label htmlFor="terms" className="read-text">
                      I have read <b>Terms and Conditions</b>
                    </label>
                  </span>
                  <button type="submit" disabled={!isRegisterFormValid}>Register</button>
                </form>
                <a href="#" id="gotologin" className="account-check" onClick={toggleCard}>
                  Already have an account? <b>Sign in</b>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
