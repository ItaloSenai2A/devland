import { useEffect, useState, useRef } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/movieCard/MovieCard";
import Logo from "./assets/capadosite.png";
import Lupa from "./assets/search.svg";
import ImgInicial from "./assets/ImgInicial.png";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const apiKey = "e4d577fa";
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovies(search);
    }
  };

  const scrollRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % movies.length);
  };

  const renderMovies = () => {
    const displayMovies = [...movies, ...movies]; // Duplicar a lista para rolagem infinita
    return displayMovies.slice(currentIndex, currentIndex + 7).map((movie, index) => (
      <MovieCard key={index} apiUrl={apiUrl} {...movie} />
    ));
  };

  return (
    <div id="app">
      <img className="logo" src={Logo} alt="Logo" />

      <div className="search">
        <img onClick={() => searchMovies(search)} src={Lupa} alt="Lupa" />
        <input
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Pesquise por título"
        />
      </div>

      <div className="imgInicial">
        <img src={ImgInicial} alt="Imagem Inicial" />
      </div>

      <h2 className="popular-title">Os mais populares</h2>

      {movies?.length > 0 ? (
        <div className="movies-wrapper">
          <div
            className="container"
            ref={containerRef}
            style={{
              transform: `translateX(-${currentIndex * (100 / 7)}%)`, // Ajusta a posição com base no índice
            }}
          >
            {renderMovies()}
          </div>
          <button className="scroll-button" onClick={scrollRight}>
            &#9654;
          </button>
        </div>
      ) : (
        <h2 className="empty">😢 Filme não encontrado 😢</h2>
      )}

      <Footer
        devName={"Ítalo Francesco"}
        devLink={"https://github.com/ItaloSenai2A"}
      />
    </div>
  );
};

export default App;