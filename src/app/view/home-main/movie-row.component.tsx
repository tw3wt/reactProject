import React, { useRef, useState, useEffect, useCallback } from 'react';
import WishlistService from '../../util/movie/wishlist';
import './movie-row.component.css'

interface MovieRowProps {
  title: string;
  fetchUrl: string;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [scrollAmount, setScrollAmount] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderWindowRef = useRef<HTMLDivElement | null>(null);

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Fetch movies on mount
  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      setMovies(data.results || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  }, [fetchUrl]);

  useEffect(() => {
    // Fetch movies and calculate scroll size after movies are loaded
    fetchMovies().then(() => calculateMaxScroll());
  }, [fetchMovies]);

  const atLeftEdge = () => { return scrollAmount <= 0;}
  const atRightEdge = () => { return scrollAmount >= maxScroll;}

  // Recalculate max scroll on window resize
  useEffect(() => {
    const handleResize = () => {
      console.log("Window resized");
      calculateMaxScroll();
      setScrollAmount((prev) => Math.min(prev, maxScroll));
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [movies, maxScroll]);

  const getImageUrl = (path: string): string => {
    return `https://image.tmdb.org/t/p/w300${path}`;
  };

  const slide = (direction: 'left' | 'right', amount: number | null = null) => {    
    if (!sliderWindowRef.current) return;

    const slideAmount = amount || sliderWindowRef.current.clientWidth * 0.8;
    setScrollAmount((prev) =>
      direction === 'left'
        ? Math.max(0, prev - slideAmount)
        : Math.min(maxScroll, prev + slideAmount)
    );
  };

  const handleMouseMove = () => {
    console.log("Mouse moved");
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    console.log("Mouse left");
    setShowButtons(false);
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    if (isScrolling) return;

    setIsScrolling(true);
    const direction = event.deltaY > 0 ? 'right' : 'left';
    slide(direction);

    setTimeout(() => setIsScrolling(false), 500);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setTouchStartX(event.touches[0].clientX);
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const touchDiff = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(touchDiff) > minSwipeDistance) {
      const direction = touchDiff > 0 ? 'right' : 'left';
      slide(direction, Math.abs(touchDiff));
    }
  };

  const calculateMaxScroll = () => {
    if (sliderRef.current && sliderWindowRef.current) {
      const sliderScrollWidth = sliderRef.current.scrollWidth;
      const sliderWindowWidth = sliderWindowRef.current.clientWidth;
  
      console.log("Slider Scroll Width:", sliderScrollWidth);
      console.log("Slider Window Width:", sliderWindowWidth);
  
      const maxScrollValue = sliderScrollWidth - sliderWindowWidth;
      console.log("Calculated Max Scroll:", maxScrollValue);
  
      setMaxScroll(Math.max(0, maxScrollValue));
    }
  };

  const toggleWishlist = (movie: any) => {
    WishlistService.toggleWishlist(movie);
  };

  const isInWishlist = (movieId: number): boolean => {
    return WishlistService.isInWishlist(movieId);
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div
          className="slider-container"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}>
        <button className="slider-button left"
                onClick={() => slide('left')}
                style={{ opacity: showButtons && !atLeftEdge() ? 1 : 0 }}
                disabled={atLeftEdge()}>&lt;</button>
        <div className="slider-window" ref={sliderWindowRef}>
          {loading ? ( // 로딩 중일 때 메시지 표시
            <p>Loading...</p>
          ) : (
            <div
              className="movie-slider"
              ref={sliderRef}
              style={{ transform: `translateX(-${scrollAmount}px)` }}
            >
              {movies.map((movie) => (
                <div
                  className="movie-card"
                  onClick={() => toggleWishlist(movie)}
                >
                  <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                  {isInWishlist(movie.id) && (
                    <div className="wishlist-indicator">👍</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="slider-button right"
                onClick={() => slide('right')}
                style={{ opacity: showButtons && !atRightEdge() ? 1 : 0 }}
                disabled={atRightEdge()}>&lt;</button>
      </div>
    </div>
  );
};

export default MovieRow;