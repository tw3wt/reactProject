import React from 'react';
import './banner.component.css';

interface BannerProps {
  movie: any
}

const BannerComponent: React.FC<BannerProps> = ({ movie }) => {
  const backdropUrl = movie
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : '';

  if (!movie) {
    return null; // movie가 없으면 아무 것도 렌더링하지 않음
  }

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      <div className="banner-content">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <button className="play-btn title-btn">재생</button>
        <button className="info-btn title-btn">상세 정보</button>
      </div>
    </div>
  );
};

export default BannerComponent;
