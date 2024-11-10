// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from '../src/app/components/sign-in/sign-in.component';

function App() {
  return (
    <Router>
      <div id="app">
        <Routes>
          <Route path="/" element={<SignIn />} />
          {/* 다른 경로들을 추가하여 다양한 컴포넌트를 렌더링할 수 있습니다. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
