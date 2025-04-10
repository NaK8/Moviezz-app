import { getMoviesContext } from "../context/MoviesContext";
import { useMovieFetch } from "../hooks/useMovieFetch";
import Box from "./Box";
import ErrorMessage from "./ErrorMessage";
import MoviesList from "./MoviesList";
import MoviesListSkeleton from "./ui-skeletons/MoviesListSkeleton";

const Movies = () => {
  const { query, setMoviesCount } = getMoviesContext();
  const { movies, loading, error } = useMovieFetch(query);
  setMoviesCount(movies.length);

  return (
    <Box>
      {loading && <MoviesListSkeleton />}
      {query.length === 0 && <MoviesListSkeleton />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <MoviesList movies={movies} />}
    </Box>
  );
};

export default Movies;
