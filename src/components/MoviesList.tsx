import type { MovieDataTypes } from "../GlobalTypes";

interface MoviesListProps {
  movies: MovieDataTypes[];
  getMovie: (e: string) => void;
}

const MoviesList = ({ movies, getMovie }: MoviesListProps) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
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
      ))}
    </ul>
  );
};

export default MoviesList;
