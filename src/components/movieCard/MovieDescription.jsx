import { useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";

const MovieDescription = ({ click, apiUrl, movieID }) => {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}&i=${movieID}`)
      .then((response) => response.json())
      .then((data) => setMovieData(data));
  }, [apiUrl, movieID]);

  if (!movieData) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Create the Google search URL
  const googleSearchURL = `https://www.google.com/search?q=${movieData.Title} movie`;

  return (
    <div className={styles.modalBackground} onClick={click}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={click}>
          X
        </button>
        <div className={styles.modalContent}>
          <img
            className={styles.movieImage}
            src={movieData.Poster}
            alt={movieData.Title}
          />
          <div className={styles.movieDetails}>
            <h2>{movieData.Title}</h2>
            <p>{movieData.Plot}</p>
            <p>
              <strong>Ano:</strong> {movieData.Year}
            </p>
            <p>
              <strong>Gênero:</strong> {movieData.Genre}
            </p>
            <p>
              <strong>Diretor:</strong> {movieData.Director}
            </p>
            <a
              href={googleSearchURL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.watchButton}
            >
              Assistir agora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
