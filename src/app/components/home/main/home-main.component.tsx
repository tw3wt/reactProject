import React, { useState, useEffect, useCallback, useMemo } from "react";
import BannerComponent from "../../../view/home-main/banner.component";
import MovieRowComponent from "../../../view/home-main/movie-row.component";
import { useMovieService } from "../../../util/movie/URL";
import "./home-main.component.css";

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

  // Featured movie fetch
  const loadFeaturedMovie = useCallback(async () => {
    try {
      const movie = await fetchFeaturedMovie(apiKey);
      setFeaturedMovie(movie); // 저장된 featuredMovie는 한 번만 설정됨
    } catch (error) {
      console.error("Error fetching featured movie:", error);
    }
  }, [fetchFeaturedMovie, apiKey]);

  // Initialize URLs for movie rows
  const initializeURLs = useCallback(() => {
    setPopularMoviesUrl(getURL4PopularMovies(apiKey));
    setNewReleasesUrl(getURL4ReleaseMovies(apiKey));
    setActionMoviesUrl(getURL4GenreMovies(apiKey, "28"));
  }, [getURL4PopularMovies, getURL4ReleaseMovies, getURL4GenreMovies, apiKey]);

  // Execute initial data load once
  useEffect(() => {
    initializeURLs();
    loadFeaturedMovie();
  }, [initializeURLs, loadFeaturedMovie]);

  // Memoize `featuredMovie` to prevent unnecessary re-renders
  const memoizedFeaturedMovie = useMemo(() => featuredMovie, [featuredMovie]);

  return (
    <>
      <BannerComponent movie={memoizedFeaturedMovie} />

      <MovieRowComponent title="인기 영화" fetchUrl={popularMoviesUrl} />
      <MovieRowComponent title="최신 영화" fetchUrl={newReleasesUrl} />
      <MovieRowComponent title="액션 영화" fetchUrl={actionMoviesUrl} />
    </>
  );
};

export default HomeMain;


