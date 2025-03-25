import { useState } from "react";
import styles from "./MovieCard.module.css";
import MovieDescription from "./MovieDescription";

const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={styles.movie} onClick={toggleModal}>
        <div className={styles.imageWrapper}>
          <img src={props.Poster} alt={props.Title} />
        </div>

        <div className={styles.overlay}>
          <h3>{props.Title}</h3>
          <div className={styles.details}>
            <span>{props.Type}</span>
            <p>{props.Year}</p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <MovieDescription click={toggleModal} apiUrl={props.apiUrl} movieID={props.imdbID} />
      )}
    </>
  );
};

export default MovieCard;
