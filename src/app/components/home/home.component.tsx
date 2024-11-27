import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../layout/header/header.component';
import './home.component.css'

const HomeComponent: React.FC = () => {
  return (
    <>
      <div id = "container">
        <Header />
      </div>
      <Outlet />
    </>
  );
};

export default HomeComponent;