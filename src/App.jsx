import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import Logo from "./assets/capadosite.png";
import Lupa from "./assets/search.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import ImgInicial from "./assets/ImgInicial.png";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [theme, setTheme] = useState("light-mode");

  const apiKey = "e4d577fa";
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  useEffect(() => {
    const applySystemTheme = () => {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDarkMode ? "dark-mode" : "light-mode");
    };

    applySystemTheme(); // Configura o tema inicial

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", applySystemTheme); // Detecta alterações no tema

    return () => {
      mediaQuery.removeEventListener("change", applySystemTheme); // Limpeza
    };
  }, []);

  useEffect(() => {
    document.body.className = theme; // Aplica o tema dinamicamente
  }, [theme]);

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

  return (
    <div id="app">
      <img
        className="logo img-fluid mb-3"
        style={{ maxWidth: "500px" }}
        src={Logo}
        alt="Logo"
      />

      <div className="search mb-5">
        <img
          onClick={() => searchMovies(search)}
          src={Lupa}
          alt="Lupa"
          style={{ cursor: "pointer", marginRight: "10px" }}
        />
        <input
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Pesquise por título"
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
            width: "300px",
          }}
        />
      </div>

      <div
        className="imgInicial d-flex justify-content-center mt-5 mb-5"
        style={{ paddingTop: "120px" }}
      >
        <img
          src={ImgInicial}
          alt="Imagem inicial"
          className="img-fluid w-100"
          style={{
            maxWidth: "1600px",
            objectFit: "cover",
            height: "auto",
            maxHeight: "700px",
            minHeight: "300px",
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <>
          <h2 className="text-center text-light mb-4">Filmes encontrados:</h2>
          <div className="container d-flex justify-content-center flex-wrap gap-3 mb-4">
            {movies.map((movie, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "300px",
                  height: "400px",
                  backgroundColor: "#222",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  textAlign: "center",
                }}
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(50%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    padding: "20px",
                    background: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                      marginBottom: "15px",
                    }}
                  >
                    {movie.Title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      gap: "10px",
                    }}
                  >
                    <button
                      style={{
                        flex: 1,
                        background: "rgba(0, 0, 0, 0.6)",
                        border: "none",
                        color: "white",
                        padding: "8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        cursor: "pointer",
                        backdropFilter: "blur(5px)",
                        transition: "all 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.background = "rgba(0, 0, 0, 0.8)")}
                      onMouseOut={(e) => (e.target.style.background = "rgba(0, 0, 0, 0.6)")}
                    >
                      Assistir
                    </button>
                    <button
                      style={{
                        flex: 1,
                        background: "rgba(0, 0, 0, 0.6)",
                        border: "1px solid #fff",
                        color: "white",
                        padding: "8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "5px",
                        cursor: "pointer",
                        backdropFilter: "blur(5px)",
                        transition: "all 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.background = "rgba(0, 0, 0, 0.8)")}
                      onMouseOut={(e) => (e.target.style.background = "rgba(0, 0, 0, 0.6)")}
                    >
                      Adicionar à Lista
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-center text-warning mt-4">
          😢 Filme não encontrado 😢
        </h2>
      )}

      <Footer />
    </div>
  );
};

export default App;
