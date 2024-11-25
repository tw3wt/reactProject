import React, { useRef, useState, useEffect } from 'react';
import './movie-row.component.css';

interface MovieRowProps {
  title: string;
  fetchUrl: string;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [scrollAmount, setScrollAmount] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  const slide = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const newScrollAmount =
        direction === "left" ? Math.max(0, scrollAmount - sliderWidth) : scrollAmount + sliderWidth;
      setScrollAmount(newScrollAmount);
      sliderRef.current.style.transform = `translateX(-${newScrollAmount}px)`;
    }
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="slider-container">
        <button className="slider-button left" onClick={() => slide("left")}>
          &lt;
        </button>
        <div className="slider-window" ref={sliderRef}>
          <div className="movie-slider" style={{ transform: `translateX(-${scrollAmount}px)` }}>
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </div>
            ))}
          </div>
        </div>
        <button className="slider-button right" onClick={() => slide("right")}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
