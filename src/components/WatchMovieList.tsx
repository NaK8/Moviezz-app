import { getMoviesContext } from "../context/MoviesContext";

const WatchMovieList = () => {
  const { watched, setWatched } = getMoviesContext();

  function deleteWatchedList(id: string) {
    setWatched(watched.filter((each) => each.imdbID !== id));
  }

  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => deleteWatchedList(movie.imdbID)}
            >
              ❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WatchMovieList;
