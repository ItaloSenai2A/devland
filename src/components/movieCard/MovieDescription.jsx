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

  return (
    <div className={styles.modalBackground} onClick={click}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={click}>X</button>
        <h2>{movieData.Title}</h2>
        <p>{movieData.Plot}</p>
        <p><strong>Year:</strong> {movieData.Year}</p>
        <p><strong>Genre:</strong> {movieData.Genre}</p>
        <p><strong>Director:</strong> {movieData.Director}</p>
      </div>
    </div>
  );
};

export default MovieDescription;
