import React, { useEffect, useState } from 'react';
import BannerComponent from '../../../view/home-main/banner.component';
import MovieRowComponent from '../../../view/home-main/movie-row.component';
import { useMovieService } from '../../../util/movie/URL';
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

  // Load featured movie and initialize URLs once
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch featured movie
        const movie = await fetchFeaturedMovie(apiKey);
        setFeaturedMovie(movie);

        // Initialize URLs
        setPopularMoviesUrl(getURL4PopularMovies(apiKey));
        setNewReleasesUrl(getURL4ReleaseMovies(apiKey));
        setActionMoviesUrl(getURL4GenreMovies(apiKey, "28"));
      } catch (error) {
        console.error("Error initializing data:", error);
      }
    };

    initializeData();
  }, [apiKey, fetchFeaturedMovie, getURL4PopularMovies, getURL4ReleaseMovies, getURL4GenreMovies]);

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

