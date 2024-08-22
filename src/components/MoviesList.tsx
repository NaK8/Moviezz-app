import type { MovieDataTypes } from "../GlobalTypes";
import Movie from "./Movie";

interface MoviesListProps {
  movies: MovieDataTypes[];
  getMovie: (e: string) => void;
}

const MoviesList = ({ movies, getMovie }: MoviesListProps) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} getMovie={getMovie} />
      ))}
    </ul>
  );
};

export default MoviesList;
