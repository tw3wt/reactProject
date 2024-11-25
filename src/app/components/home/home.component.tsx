import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../layout/header/header.component';

const HomeComponent: React.FC = () => {
  return (
    <div id="app">
      <Header />
      <div id="container">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeComponent;