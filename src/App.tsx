// src/App.tsx

import { Route, Routes } from 'react-router-dom';
import SignIn from '../src/app/components/sign-in/sign-in.component';
import './app/components/sign-in/sign-in.component.css'
import './app/components/sign-in/sign-in.component.tsx'
import HomeMain from './app/components/home/main/home-main.component';

function App() {
  return (
    <div id="app">
      <Routes>
        {/* 기본 경로에서 /sign-in으로 리디렉션 */}
        <Route path="/sign-in" element={<SignIn />} />

        <Route path='/' element={<HomeMain/>} />
      </Routes>
    </div>
  );
}

export default App;
