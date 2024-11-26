import React, { useRef, useState, useEffect, useCallback } from 'react';
import axios from "axios";
import './movie-row.component.css';
import WishlistService from '../../util/movie/wishlist';

interface MovieRowProps {
  title: string;
  fetchUrl: string;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [scrollAmount, setScrollAmount] = useState<number>(0);
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [maxScroll, setMaxScroll] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderWindowRef = useRef<HTMLDivElement | null>(null);

  const calculateMaxScroll = useCallback(() => {
    if (sliderRef.current && sliderWindowRef.current) {
      setMaxScroll(
        Math.max(
          0,
          sliderRef.current.scrollWidth - sliderWindowRef.current.clientWidth
        )
      );
    }
  }, []);

  const fetchMovies = useCallback(async () => {
    try {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      setTimeout(calculateMaxScroll, 0);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [fetchUrl,calculateMaxScroll]);

  const slide = (direction: "left" | "right", amount: number | null = null) => {
    const slideAmount =
      amount || (sliderWindowRef.current?.clientWidth || 0) * 0.8;
    if (direction === "left") {
      setScrollAmount((prev) => Math.max(0, prev - slideAmount));
    } else {
      setScrollAmount((prev) => Math.min(maxScroll, prev + slideAmount));
    }
  };

  const handleMouseMove = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    const direction = event.deltaY > 0 ? "right" : "left";
    slide(direction);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touchStartX = event.touches[0].clientX;
    const touchEndX = event.touches[0].clientX;

    const minSwipeDistance = 50;
    const touchDiff = touchStartX - touchEndX;

    if (Math.abs(touchDiff) > minSwipeDistance) {
      const direction = touchDiff > 0 ? "right" : "left";
      slide(direction, Math.abs(touchDiff));
    }
  };

  const toggleWishlist = (movie: any) => {
    WishlistService.toggleWishlist(movie);
  };

  const isInWishlist = (movieId: number) => {
    return WishlistService.isInWishlist(movieId);
  };

  const getImageUrl = (path: string): string =>
    `https://image.tmdb.org/t/p/w300${path}`;

  useEffect(() => {
    fetchMovies();
    window.addEventListener("resize", calculateMaxScroll);
    return () => {
      window.removeEventListener("resize", calculateMaxScroll);
    };
  }, [fetchMovies, calculateMaxScroll]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div
        className="slider-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className="slider-button left"
          onClick={() => slide("left")}
          style={{ opacity: showButtons && scrollAmount > 0 ? 1 : 0 }}
          disabled={scrollAmount <= 0}
        >
          &lt;
        </button>
        <div className="slider-window" ref={sliderWindowRef}>
          <div
            className="movie-slider"
            ref={sliderRef}
            style={{
              transform: `translateX(${-scrollAmount}px)`,
            }}
          >
            {movies && movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => WishlistService.toggleWishlist(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                  />
                  {WishlistService.isInWishlist(movie.id) && (
                    <div className="wishlist-indicator">👍</div>
                  )}
                </div>
              ))
            ) : (
              <p>Loading movies...</p>
            )}
          </div>
        </div>
        <button
          className="slider-button right"
          onClick={() => slide("right")}
          style={{ opacity: showButtons && scrollAmount < maxScroll ? 1 : 0 }}
          disabled={scrollAmount >= maxScroll}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MovieRow;