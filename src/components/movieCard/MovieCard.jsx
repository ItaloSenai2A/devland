import { useState } from "react";
import styles from "./MovieCard.module.css";
import MovieDescription from "./MovieDescription";

const MovieCard = ({ Poster, Title, Type, Year, apiUrl, imdbID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={styles.movie} onClick={toggleModal}>
        <div className={styles.imageWrapper}>
          <img src={Poster} alt={Title} />
        </div>

        <div className={styles.overlay}>
          <h3>{Title}</h3>
          <div className={styles.details}>
            <span>{Type}</span>
            <p>{Year}</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <MovieDescription click={toggleModal} apiUrl={apiUrl} movieID={imdbID} />
      )}
    </>
  );
};

const MovieList = () => {
  const movies = [
    {
      Title: "Salar",
      Poster: "salar.jpg",
      Type: "Action, Drama",
      Year: "2018 - 2h 35m",
      apiUrl: "api/salar",
      imdbID: "tt1234567",
    },
    {
      Title: "Panther",
      Poster: "panther.jpg",
      Type: "Action, Drama",
      Year: "2018 - 2h 35m",
      apiUrl: "api/panther",
      imdbID: "tt2345678",
    },
    {
      Title: "Liger",
      Poster: "liger.jpg",
      Type: "Action, Drama",
      Year: "2018 - 2h 35m",
      apiUrl: "api/liger",
      imdbID: "tt3456789",
    },
    {
      Title: "LEO",
      Poster: "leo.jpg",
      Type: "Action, Drama",
      Year: "2018 - 2h 35m",
      apiUrl: "api/leo",
      imdbID: "tt4567890",
    },
    {
      Title: "Vikram",
      Poster: "vikram.jpg",
      Type: "Action, Thriller",
      Year: "2022 - 2h 54m",
      apiUrl: "api/vikram",
      imdbID: "tt5678901",
    },
    {
      Title: "RRR",
      Poster: "rrr.jpg",
      Type: "Action, Drama",
      Year: "2022 - 3h 7m",
      apiUrl: "api/rrr",
      imdbID: "tt6789012",
    }
  ];

  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} {...movie} />
      ))}
    </div>
  );
};

export default MovieList;
