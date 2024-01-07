import StarRating from "./StarRating";
import { useMovieDetailsFetch } from "../hooks/useMovieDetailsFetch";
import { useState, useEffect } from "react";
import { MovieDetailsType, WatchedMovieDataType } from "../GlobalTypes";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

interface MovieDetails {
  selectedId: string;
  onClose: () => void;
  addWatchedMovie: (e: WatchedMovieDataType) => void;
  watched: WatchedMovieDataType[];
}
const MovieDetails = ({
  selectedId,
  onClose,
  addWatchedMovie,
  watched,
}: MovieDetails) => {
  const [rating, setRating] = useState<number>(0);
  const {
    movieDetails,
    loading,
    error,
  }: { movieDetails: MovieDetailsType; loading: boolean; error: string } =
    useMovieDetailsFetch(selectedId);
  const ifWatched = watched.find((each) => each.imdbID === selectedId);

  useEffect(
    function () {
      if (!movieDetails.Title) return;
      document.title = `Movie | ${movieDetails.Title}`;

      return function () {
        document.title = "Moviezz";
      };
    },
    [movieDetails.Title]
  );

  useEffect(
    function () {
      function callBack(e: KeyboardEvent) {
        if (e.code === "Escape") {
          onClose();
        }
      }
      document.addEventListener("keydown", callBack);

      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [onClose]
  );

  function addNewWatchedMovie() {
    const newMovie: WatchedMovieDataType = {
      imdbID: movieDetails.imdbID,
      Title: movieDetails.Title,
      Year: movieDetails.Year,
      Poster: movieDetails.Poster,
      runtime: Number(movieDetails.Runtime.split(" ").at(0)),
      imdbRating: movieDetails.imdbRating,
      userRating: rating,
    };
    addWatchedMovie(newMovie);
  }

  return (
    <div className="details">
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          {" "}
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img
              src={movieDetails.Poster}
              alt={`Poster of ${movieDetails.Title}`}
            />
            <div className="details-overview">
              <h2>{movieDetails.Title}</h2>
              <p>
                {movieDetails.Released} &bull; {movieDetails.Runtime}
              </p>
              <p>
                <span>⭐</span>
                {movieDetails.imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!ifWatched ? (
                <>
                  <StarRating
                    maxLength={10}
                    size={20}
                    color={"#ffc600"}
                    getRating={setRating}
                  />
                  {rating > 0 && (
                    <button className="btn-add" onClick={addNewWatchedMovie}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rate this movie with {ifWatched.userRating}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{movieDetails.Plot}</em>
            </p>
            <p>Starring: {movieDetails.Actors}</p>
            <p>Directed By {movieDetails.Director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
