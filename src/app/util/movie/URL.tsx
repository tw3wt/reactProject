import axios from "axios";
import { useCallback } from "react";

export const useMovieService = () => {
  const fetchFeaturedMovie = useCallback( async (apiKey: string) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR`
      );
      console.log(response.data.results[0]);
      return response.data.results[0];
    } catch (error) {
      console.error("Error fetching featured movie:", error);
      throw error;
    }
  },[]);

  const getURL4PopularMovies = useCallback( (apiKey: string, page: number = 1): string => {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${page}`;
  },[]);

  const getURL4ReleaseMovies = useCallback( (apiKey: string, page: number = 2): string => {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=${page}`;
  },[]);

  const getURL4GenreMovies = useCallback( (apiKey: string, genre: string, page: number = 1): string => {
    return `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&language=ko-KR&page=${page}`;
  },[]);

  return {
    fetchFeaturedMovie,
    getURL4PopularMovies,
    getURL4ReleaseMovies,
    getURL4GenreMovies,
  };
};

export default useMovieService;