import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../layout/header/header.component';
import './home.component.css'

const HomeComponent: React.FC = () => {
  return (
    <div id="app">
      <div id = "container">
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

export default HomeComponent;