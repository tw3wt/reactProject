import React, { useState, useEffect, useRef, useCallback } from "react";
import WishlistService from "../../util/movie/wishlist";
import { Movie } from "../../../models/types";

const MovieWishlist: React.FC = () => {
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const [rowSize, setRowSize] = useState<number>(4);
  const [moviesPerPage, setMoviesPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [currentView, setCurrentView] = useState<string>("grid");
  const [wishlistMovies, setWishlistMovies] = useState<Movie[]>([]);
  const [visibleWishlistMovies, setVisibleWishlistMovies] = useState<Movie[][]>([]);

  const getImageUrl = (path: string) =>
    path ? `https://image.tmdb.org/t/p/w300${path}` : "/placeholder-image.jpg";

  const updateVisibleMovies = useCallback(() => {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const paginatedMovies = wishlistMovies.slice(startIndex, endIndex);

    const groupedMovies = paginatedMovies.reduce<Movie[][]>((resultArray, item, index) => {
      const groupIndex = Math.floor(index / rowSize);
      if (!resultArray[groupIndex]) {
        resultArray[groupIndex] = [];
      }
      resultArray[groupIndex].push(item);
      return resultArray;
    }, []);
    setVisibleWishlistMovies(groupedMovies);
  }, [wishlistMovies, currentPage, moviesPerPage, rowSize]);

  const calculateLayout = useCallback(() => {
    if (gridContainerRef.current) {
      const container = gridContainerRef.current;
      const containerWidth = container.offsetWidth;
      const containerHeight = window.innerHeight - container.offsetTop;
      const movieCardWidth = isMobile ? 90 : 220;
      const movieCardHeight = isMobile ? 150 : 330;
      const horizontalGap = isMobile ? 10 : 15;
      const verticalGap = -10;

      const newRowSize = Math.floor(containerWidth / (movieCardWidth + horizontalGap));
      const maxRows = Math.floor(containerHeight / (movieCardHeight + verticalGap));
      setRowSize(newRowSize);
      setMoviesPerPage(newRowSize * maxRows);
      updateVisibleMovies();
    }
  }, [isMobile, updateVisibleMovies]);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
    calculateLayout();
  }, [calculateLayout]);

  const toggleWishlist = (movie: Movie) => {
    WishlistService.toggleWishlist(movie);
    setWishlistMovies(WishlistService.getCurrentWishlist());
  };

  const totalPages = Math.ceil(wishlistMovies.length / moviesPerPage);

  useEffect(() => {
    setWishlistMovies(WishlistService.getCurrentWishlist());
    setCurrentView("grid"); // currentView를 'grid'로 설정
    calculateLayout();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateLayout, handleResize]);

  return (
    <div className="movie-grid" ref={gridContainerRef}>
      <div className={`grid-container ${currentView}`}>
        {visibleWishlistMovies.map((movieGroup, groupIndex) => (
          <div key={groupIndex} className={`movie-row`}>
            {movieGroup.map((movie) => (
              <div key={movie.id} className="movie-card" onClick={() => toggleWishlist(movie)}>
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                <div className="movie-title">{movie.title}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {wishlistMovies.length === 0 && <div className="empty-wishlist">위시리스트가 비어 있습니다.</div>}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            &lt; 이전
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            다음 &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieWishlist;
