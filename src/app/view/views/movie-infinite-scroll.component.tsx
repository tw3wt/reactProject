import React, { useEffect, useRef, useState, useCallback } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieInfiniteScrollProps {
  apiKey: string;
  genreCode: string;
  sortingOrder: string;
  voteAverage: number;
}

const MovieInfiniteScroll: React.FC<MovieInfiniteScrollProps> = ({
  apiKey,
  genreCode,
  sortingOrder,
  voteAverage,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showTopButton, setShowTopButton] = useState<boolean>(false);
  const wishlist = useRef<Set<number>>(new Set());
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null);

  const fetchMovies = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreCode}&sort_by=${sortingOrder}&vote_average.gte=${voteAverage}&page=${page}`
      );
      const data = await response.json();
      setMovies((prev) => [...prev, ...data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  },[]);

  const toggleWishlist = (movie: Movie) => {
    wishlist.current = new Set(wishlist.current);
    if (wishlist.current.has(movie.id)) {
      wishlist.current.delete(movie.id);
    } else {
      wishlist.current.add(movie.id);
    }
  };

  const isInWishlist = (id: number) => wishlist.current.has(id);

  const getImageUrl = (path: string) => `https://image.tmdb.org/t/p/w500${path}`;

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    setShowTopButton(scrollTop > 300);
  };

  const scrollToTopAndReset = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMovies([]);
    setCurrentPage(1);
    fetchMovies(1);
  };

  useEffect(() => {
    fetchMovies(currentPage);

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    const currentRef = loadingTriggerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, isLoading]);

  return (
    <div className="movie-grid">
      <div className="grid-container">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card" onMouseUp={() => toggleWishlist(movie)}>
            <img src={getImageUrl(movie.poster_path)} alt={movie.title} loading="lazy" />
            <div className="movie-title">{movie.title}</div>
            {isInWishlist(movie.id) && <div className="wishlist-indicator">👍</div>}
          </div>
        ))}
      </div>

      <div ref={loadingTriggerRef} className="loading-trigger">
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        )}
      </div>

      {showTopButton && (
        <button onClick={scrollToTopAndReset} className="top-button" aria-label="맨 위로 이동">
          Top
        </button>
      )}
    </div>
  );
};

export default MovieInfiniteScroll;
