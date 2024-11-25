import React, { useState } from 'react';
import './sign-in.component.css';

const SignInComponent: React.FC = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // 유효성 검사
  const isLoginFormValid = email.trim() !== '' && password.trim() !== '';
  const isRegisterFormValid =
    registerEmail.trim() !== '' &&
    registerPassword.trim() !== '' &&
    confirmPassword.trim() !== '' &&
    registerPassword === confirmPassword &&
    acceptTerms;

  // 로그인 및 회원가입 카드 전환
  const toggleCard = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  // 회원가입 처리 (가짜 핸들러)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterFormValid) {
      alert('Registration Successful!');
    } else {
      alert('Please fill all required fields correctly.');
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
                <form>
                  <h1>Sign in</h1>
                  <div className="input">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Username or Email"
                    />
                    <label htmlFor="email"></label>
                  </div>
                  <div className="input">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <label htmlFor="password"></label>
                  </div>
                  <span className="checkbox remember">
                    <label>
                      <input type="checkbox" />
                      Remember me
                    </label>
                  </span>
                  <span className="checkbox forgot">
                    <a href="#forgot-password">Forgot Password?</a>
                  </span>
                  <button type="submit" disabled={!isLoginFormValid}>
                    Login
                  </button>
                </form>
                <div className="signup-section">
                  <div className="account-check" onClick={toggleCard}>
                    Don’t have an account? <b>Sign up</b>
                  </div>
                </div>
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
                    />
                    <label htmlFor="confirm-password">Confirm Password</label>
                  </div>
                  <span className="checkbox remember">
                    <label>
                      <input
                        type="checkbox"
                        id="terms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                      />
                      I have read <b>Terms and Conditions</b>
                    </label>
                  </span>
                  <button type="submit" disabled={!isRegisterFormValid}>
                    Register
                  </button>
                </form>
                <button id="gotologin" className="account-check" onClick={toggleCard}>
                  Already have an account? <b>Sign in</b>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;

