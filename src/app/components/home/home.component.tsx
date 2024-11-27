import React /**, { useEffect }**/ from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../layout/header/header.component';
/**import { useNavigate } from 'react-router-dom';
import AuthService from '../../util/auth/auth.service';**/
import './home.component.css'

const HomeComponent: React.FC = () => {

  /**const navigate = useNavigate();

  useEffect(() => {
    // 로그인 여부 확인
    if (!AuthService.isAuthenticated()) {
      navigate('/signin'); // 로그인 상태가 아니라면 로그인 화면으로 리다이렉트
    }
  }, [navigate]);**/

  return (
    <div id="app">
      <div id="container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default HomeComponent;