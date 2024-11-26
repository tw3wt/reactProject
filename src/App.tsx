// src/App.tsx

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignIn from '../src/app/components/sign-in/sign-in.component';
import './app/components/sign-in/sign-in.component.css'
import './app/components/sign-in/sign-in.component.tsx'
import HomeComponent from './app/components/home/home.component';
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
