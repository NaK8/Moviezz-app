import { MovieDataTypes } from "../GlobalTypes";

interface MovieProps {
  movie: MovieDataTypes;
  getMovie: (e: string) => void;
}

const Movie = ({ movie, getMovie }: MovieProps) => {
  return (
    <li key={movie.imdbID} onClick={() => getMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
