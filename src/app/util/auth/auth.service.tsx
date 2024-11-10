// src/util/auth/auth.service.ts

export default class AuthService {
    // 로그인 메서드: email과 password를 확인하고 성공 시 Promise로 사용자 정보 반환
    static tryLogin(email: string, password: string, saveToken = true): Promise<any> {
      return new Promise((resolve, reject) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((user: any) => user.id === email && user.password === password);
  
        if (user) {
          if (saveToken) {
            localStorage.setItem('TMDb-Key', user.password);
          }
          resolve(user);
        } else {
          reject('Login failed');
        }
      });
    }
  
    // 회원가입 메서드: 이메일이 중복되지 않으면 새 사용자 추가
    static tryRegister(email: string, password: string): Promise<void> {
      return new Promise((resolve, reject) => {
        try {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const userExists = users.some((existingUser: any) => existingUser.id === email);
  
          if (userExists) {
            throw new Error('User already exists');
          }
  
          const newUser = { id: email, password: password };
          users.push(newUser);
          localStorage.setItem('users', JSON.stringify(users));
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }
  }
  