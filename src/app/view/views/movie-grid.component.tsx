import React, { useState, useEffect, useRef,useCallback } from "react";
import axios from "axios";
import { Movie } from "../../../models/types";
import WishlistService from "../../util/movie/wishlist";

interface MovieGridProps {
  fetchUrl: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ fetchUrl }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowSize, setRowSize] = useState<number>(4);
  const [moviesPerPage, setMoviesPerPage] = useState<number>(20);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const wishlistTimer = useRef<number | null>(null);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const calculateLayout = useCallback(() => {
    if (gridContainerRef.current) {
      const container = gridContainerRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = window.innerHeight - container.offsetTop;
      const movieCardWidth = isMobile ? 90 : 200;
      const movieCardHeight = isMobile ? 150 : 220;
      const horizontalGap = isMobile ? 10 : 15;
      const verticalGap = -10;

      const newRowSize = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
      const maxRows = Math.floor(containerHeight / (movieCardHeight + verticalGap));
      setRowSize(newRowSize);
      setMoviesPerPage(newRowSize * maxRows);
    }
  },[isMobile]);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
    calculateLayout();
  },[calculateLayout]);

  const fetchMovies = useCallback(async () => {
    try {
      const totalMoviesNeeded = 120;
      const numberOfPages = Math.ceil(totalMoviesNeeded / 20);
      let allMovies: Movie[] = [];

      for (let page = 1; page <= numberOfPages; page++) {
        const response = await axios.get(fetchUrl, {
          params: { page, per_page: 20 },
        });
        allMovies = [...allMovies, ...response.data.results];
      }

      setMovies(allMovies.slice(0, totalMoviesNeeded));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  },[]);

  const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/w300${path}`;

  const visibleMovieGroups = movies
    .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
    .reduce<Movie[][]>((resultArray, item, index) => {
      const groupIndex = Math.floor(index / rowSize);
      if (!resultArray[groupIndex]) {
        resultArray[groupIndex] = [];
      }
      resultArray[groupIndex].push(item);
      return resultArray;
    }, []);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const toggleWishlist = (movie: Movie) => {
    if (wishlistTimer.current) {
      clearTimeout(wishlistTimer.current);
    }
    wishlistTimer.current = setTimeout(() => {
      WishlistService.toggleWishlist(movie);
    }, 2000);
  };

  const isInWishlist = (movieId: number) => WishlistService.isInWishlist(movieId);

  useEffect(() => {
    fetchMovies();
    calculateLayout();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (wishlistTimer.current) {
        clearTimeout(wishlistTimer.current);
      }
    };
  }, [fetchMovies, calculateLayout, handleResize]);

  return (
    <div className="movie-grid" ref={gridContainerRef}>
      <div className="grid-container">
        {visibleMovieGroups.map((movieGroup, groupIndex) => (
          <div
            key={groupIndex}
            className={`movie-row ${movieGroup.length === rowSize ? "full" : ""}`}
          >
            {movieGroup.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onMouseUp={() => toggleWishlist(movie)}
              >
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                <div className="movie-title">{movie.title}</div>
                {isInWishlist(movie.id) && (
                  <div className="wishlist-indicator">👍</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          &lt; 이전
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          다음 &gt;
        </button>
      </div>
    </div>
  );
};

export default MovieGrid;
