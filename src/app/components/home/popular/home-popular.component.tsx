import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import MovieGrid from "../../../view/views/movie-grid.component"; // MovieGrid 컴포넌트
import MovieInfiniteScroll from "../../../view/views/movie-infinite-scroll.component"; // MovieInfiniteScroll 컴포넌트
import useMovieService from "../../../util/movie/URL";
import './home-popular.component.css'

const HomePopular: React.FC = () => {
    const [currentView, setCurrentView] = useState<string>("grid");
    const apiKey = localStorage.getItem("TMDb-Key") || "";
    const { getURL4PopularMovies } = useMovieService();
  
    useEffect(() => {
      disableScroll();
      return () => enableScroll(); // 컴포넌트 언마운트 시 스크롤 활성화
    }, []);
  
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };
  
    const enableScroll = () => {
      document.body.style.overflow = "auto";
    };
  
    const setView = (view: string) => {
      setCurrentView(view);
      if (view === "grid") {
        disableScroll();
      } else {
        enableScroll();
      }
    };
  
    const fetFetchURL = (): string => {
      return getURL4PopularMovies(apiKey);
    };
  
    return (
      <div className="popular-container">
        <div className="view-toggle">
          <button
            onClick={() => setView("grid")}
            className={currentView === "grid" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faTh} />
          </button>
          <button
            onClick={() => setView("list")}
            className={currentView === "list" ? "active" : ""}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
  
        {currentView === "grid" && <MovieGrid fetchUrl={fetFetchURL()} />}
        {currentView === "list" && (
          <MovieInfiniteScroll
            apiKey={apiKey}
            genreCode="28"
            sortingOrder="all"
            voteAverage={-1}
          />
        )}
      </div>
    );
  };
  
  export default HomePopular;  