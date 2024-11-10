// src/App.tsx

import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignIn from '../src/app/components/sign-in/sign-in.component';

function App() {
  return (
    <div id="app">
      <Routes>
        {/* 기본 경로에서 /SignIn으로 리디렉션 */}
        <Route path="/" element={<Navigate to="/SignIn" replace />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
