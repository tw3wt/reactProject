import React, { useState } from 'react';
import AuthService from '../../util/auth/auth.service';

const SignInComponent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await AuthService.tryLogin(email, password);
      console.log('Login successful:', user);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async () => {
    try {
      await AuthService.tryRegister(email, password);
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // JSX를 반환해야 합니다.
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default SignInComponent;
