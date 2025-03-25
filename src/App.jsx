import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/movieCard/MovieCard";
import Logo from "./assets/capadosite.png";
import Lupa from "./assets/search.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import ImgInicial from "./assets/ImgInicial.png";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

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
    if (e.key === "Enter") searchMovies(search);
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

      <div 
        className="imgInicial d-flex justify-content-center mt-5 mb-5"
        style={{ paddingTop: '120px' }}
      >
        <img 
          src={ImgInicial} 
          alt="Imagem inicial" 
          className="img-fluid w-100"
          style={{ 
            maxWidth: '1600px', 
            objectFit: 'cover', 
            height: 'auto',
            maxHeight: '700px',
            minHeight: '300px'
          }} 
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container d-flex justify-content-center flex-wrap gap-3 mb-4">
          {movies.map((movie, index) => (
            <MovieCard key={index} apiUrl={apiUrl} {...movie} />
          ))}
        </div>
      ) : (
        <h2 className="text-center text-warning mt-4">😢 Filme não encontrado 😢</h2>
      )}

      {/* Adicionando o Footer corretamente */}
      <Footer />
    </div>
  );
};

export default App;
