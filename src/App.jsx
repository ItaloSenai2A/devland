import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/movieCard/MovieCard";
import Logo from "./assets/capadosite.png";
import Lupa from "./assets/search.svg";
import ImgInicial from "./assets/ImgInicial.png";

const App = () => {
  const mudaTema = () => {
    const tema = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    document.documentElement.setAttribute("data-bs-theme", tema);
  };

  mudaTema();

  // Adiciona o evento de mudança de tema automaticamente
  window.matchMedia("(prefers-color-scheme: dark")
  .addEventListener("change", mudaTema);

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  // Referências para as fileiras de filmes
  const movieContainerRefPopular = useRef(null); // Referência para a primeira fileira de filmes
  const movieContainerRefLiked = useRef(null); // Referência para a segunda fileira de filmes
  const movieContainerRefMoviesForYou = useRef(null); // Referência para a terceira fileira de filmes
  const movieContainerRefSeriesForYou = useRef(null); // Referência para a quarta fileira de filmes

  const apiKey = "e4d577fa";
  const apiUrl = https://omdbapi.com/?apikey=${apiKey};

  useEffect(() => {
    searchMovies("Marvel");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(${apiUrl}&s=${title});
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const handleKeyPress = (e) => {
    e.key === "Enter" && searchMovies(search);
  };

  const scroll = (direction, containerRef) => {
    const scrollAmount = containerRef.current.offsetWidth; // Largura visível do contêiner
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
          placeholder="Pesquise por título"
        />
      </div>

      <div className="imgInicial d-flex justify-content-center mt-5 mb-5">
        <img
          src={ImgInicial}
          alt="Imagem inicial"
          className="img-fluid w-100"
          style={{ maxWidth: "1600px", objectFit: "cover", height: "auto" }}
        />
      </div>

      {/* Primeira fileira de filmes */}
      <div className="movie-section">
        <h2 className="section-title">Os mais populares</h2>
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

      {/* Segunda fileira de filmes */}
      <div className="movie-section">
        <h2 className="section-title">Você pode gostar</h2>
        <div
          className="movie-container movie-container-limited"
          ref={movieContainerRefLiked}
        >
          {movies.slice(0, 3).map((movie, index) => (
            <div key={index} className="movie-card-custom">
              <img
                src={movie.Poster} // Substitua pelo caminho correto do poster
                alt={movie.Title}
                className="movie-card-image"
              />
              <div className="movie-card-overlay">
                <h3 className="movie-title">{movie.Title}</h3>
                <p className="movie-genre">Action, Drama</p>
                <p className="movie-year-duration">{movie.Year} • 2h 35m</p>
                <div className="movie-card-buttons">
                  <button className="btn-watch-now">
                    <span>&#9654;</span> Assista Agora
                  </button>
                  <button className="btn-watchlist">
                    <span>&#43;</span> Adicionar na lista
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terceira fileira de filmes */}
      <div className="movie-section">
        <h2 className="section-title">Filmes para você</h2>
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

      {/* Quarta fileira de filmes */}
      <div className="movie-section">
        <h2 className="section-title">Séries para você</h2>
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