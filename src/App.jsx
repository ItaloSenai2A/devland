import { useEffect, useState, useRef } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/movieCard/MovieCard";
import Logo from "./assets/capadosite.png";
import Lupa from "./assets/search.svg";
import ImgInicial from "./assets/ImgInicial.png";

const App = () => {
  const toggleTheme = () => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    document.documentElement.setAttribute("data-bs-theme", theme);
  };

  toggleTheme();

  // Automatically adds the theme change event
  window
    .matchMedia("(prefers-color-scheme: dark")
    .addEventListener("change", toggleTheme);

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  // References for movie rows
  const movieContainerRefPopular = useRef(null); // Reference for the first row of movies
  const movieContainerRefLiked = useRef(null); // Reference for the second row of movies
  const movieContainerRefMoviesForYou = useRef(null); // Reference for the third row of movies
  const movieContainerRefSeriesForYou = useRef(null); // Reference for the fourth row of movies

  const apiKey = "e4d577fa";
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  // Define a função antes do useEffect
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search || []);
  };

  useEffect(() => {
    searchMovies("Marvel");
  }, []); // Remova a dependência de `searchMovies` para evitar o erro

  const handleKeyPress = (e) => {
    e.key === "Enter" && searchMovies(search);
  };

  const scroll = (direction, containerRef) => {
    const scrollAmount = containerRef.current.offsetWidth; // Visible width of the container
    if (direction === "left") {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else {
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="app">
      <img
        className="logo img-fluid mb-3"
        style={{ maxWidth: "500px" }}
        src={Logo}
        alt="Logo"
      />

      <div className="search mb-5">
        <img onClick={() => searchMovies(search)} src={Lupa} alt="Lupa" />
        <input
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by title"
        />
      </div>

      <div className="initialImage d-flex justify-content-center mt-5 mb-5">
        <img
          src={ImgInicial}
          alt="Initial image"
          className="img-fluid w-100"
          style={{ maxWidth: "1600px", objectFit: "cover", height: "auto" }}
        />
      </div>

      {/* First row of movies */}
      <div className="movie-section">
        <h2 className="section-title">Most Popular</h2>
        <button
          className="scroll-button left"
          onClick={() => scroll("left", movieContainerRefPopular)}
        >
          &#10094;
        </button>
        <div className="movie-container" ref={movieContainerRefPopular}>
          {movies.map((movie, index) => (
            <MovieCard key={index} apiUrl={apiUrl} {...movie} />
          ))}
        </div>
        <button
          className="scroll-button right"
          onClick={() => scroll("right", movieContainerRefPopular)}
        >
          &#10095;
        </button>
      </div>

      {/* Second row of movies */}
      <div className="movie-section">
        <h2 className="section-title">You Might Like</h2>
        <div
          className="movie-container movie-container-limited"
          ref={movieContainerRefLiked}
        >
          {movies.slice(0, 3).map((movie, index) => (
            <div key={index} className="movie-card-custom">
              <img
                src={movie.Poster} // Replace with the correct poster path
                alt={movie.Title}
                className="movie-card-image"
              />
              <div className="movie-card-overlay">
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-genre">Action, Drama</p>
                <p className="movie-year-duration">{movie.Year} • 2h 35m</p>
                <div className="movie-card-buttons">
                  <button className="btn-watch-now">
                    <span>&#9654;</span> Watch Now
                  </button>
                  <button className="btn-watchlist">
                    <span>&#43;</span> Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Third row of movies */}
      <div className="movie-section">
        <h2 className="section-title">Movies for You</h2>
        <div className="movie-container" ref={movieContainerRefMoviesForYou}>
          {movies.slice(0, 3).map((movie, index) => (
            <div key={index} className="movie-card">
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Genre || "Action, Drama"}</p>
                <p>{movie.Year} • 2h 35m</p>
              </div>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie-image"
              />
              <div className="play-button">
                <button>&#9658;</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fourth row of movies */}
      <div className="movie-section">
        <h2 className="section-title">Series for You</h2>
        <div className="movie-container" ref={movieContainerRefSeriesForYou}>
          {movies.slice(0, 3).map((movie, index) => (
            <div key={index} className="movie-card">
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Genre || "Action, Drama"}</p>
                <p>{movie.Year} • 1 Season</p>
              </div>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie-image"
              />
              <div className="play-button">
                <button>&#9658;</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
