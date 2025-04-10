import { getMoviesContext } from "../context/MoviesContext";
import type { MovieDataTypes } from "../GlobalTypes";

interface MoviesListProps {
  movies: MovieDataTypes[];
}

const MoviesList = ({ movies }: MoviesListProps) => {
  const { setSelectedId } = getMoviesContext();
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <li key={movie.imdbID} onClick={() => setSelectedId(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
