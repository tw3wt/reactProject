// src/App.tsx

import { Route, Router, Routes } from 'react-router-dom';
import SignIn from '../src/app/components/sign-in/sign-in.component';
import './app/components/sign-in/sign-in.component.css'
import './app/components/sign-in/sign-in.component.tsx'
import HomeComponent from './app/components/home/home.component';
import HomeMain from './app/components/home/main/home-main.component';
import HomePopular from './app/components/home/popular/home-popular.component';
import HomeWishlist from './app/components/home/wishlist/home-wishlist.component';
import HomeSearch from './app/components/search/home-search.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeComponent/>}>
        <Route index element={<HomeMain />} />
        <Route path="popular" element={<HomePopular />} />
        <Route path="wishlist" element={<HomeWishlist />} />
        <Route path="search" element={<HomeSearch />} />
        <Route path='sign-in' element={<SignIn/>} />
      </Route>
    </Routes>
  );
}

export default App;
