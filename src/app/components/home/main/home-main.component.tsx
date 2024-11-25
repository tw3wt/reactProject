import React, { useEffect, useState } from 'react';
import BannerComponent from '../../../view/home-main/banner.component';
import MovieRowComponent from '../../../view/home-main/movie-row.component';
import {useMovieService} from '../../../util/movie/URL'
import axios from 'axios';
import './home-main.component.css';

const HomeMain: React.FC = () => {
  const [apiKey] = useState<string>(localStorage.getItem("TMDb-Key") || "");
  const [featuredMovie, setFeaturedMovie] = useState<any>(null);
  const [popularMoviesUrl, setPopularMoviesUrl] = useState<string>("");
  const [newReleasesUrl, setNewReleasesUrl] = useState<string>("");
  const [actionMoviesUrl, setActionMoviesUrl] = useState<string>("");

  const {
    fetchFeaturedMovie,
    getURL4PopularMovies,
    getURL4ReleaseMovies,
    getURL4GenreMovies,
  } = useMovieService();

  // Scroll event listener reference
  const initializeScrollListener = () => {
    const handleScroll = () => {
      const header = document.querySelector(".app-header");
      if (window.scrollY > 50) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup
    };
  };

  // Load featured movie data
  const loadFeaturedMovie = async () => {
    try {
      const movie = await fetchFeaturedMovie(apiKey);
      setFeaturedMovie(movie);
    } catch (error) {
      console.error("Failed to load featured movie:", error);
    }
  };

  useEffect(() => {
    // Initialize URLs
    setPopularMoviesUrl(getURL4PopularMovies(apiKey));
    setNewReleasesUrl(getURL4ReleaseMovies(apiKey));
    setActionMoviesUrl(getURL4GenreMovies(apiKey, "28"));

    // Load featured movie
    loadFeaturedMovie();

    // Initialize scroll listener
    const cleanup = initializeScrollListener();
    return cleanup; // Cleanup scroll listener on component unmount
  }, [apiKey]);

  return (
    <div className="home">
      {/* 주요 영화 배너 */}
      <BannerComponent movie={featuredMovie} />

      {/* 영화 목록 */}
      <MovieRowComponent title="인기 영화" fetchUrl={popularMoviesUrl} />
      <MovieRowComponent title="최신 영화" fetchUrl={newReleasesUrl} />
      <MovieRowComponent title="액션 영화" fetchUrl={actionMoviesUrl} />
    </div>
  );
};

export default HomeMain;
