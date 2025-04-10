import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import { useMovieDetailsFetch } from "../hooks/useMovieDetailsFetch";
import ErrorMessage from "./ErrorMessage";
import { BackIcon } from "./Icons";
import MovieDetailsSkeleton from "./ui-skeletons/MovieDetailsSkeleton";
import { getMoviesContext } from "../context/MoviesContext";

const MovieDetails = () => {
  const { selectedId, setWatched, watched, setSelectedId } = getMoviesContext();
  const [rating, setRating] = useState(0);
  const { movieDetails, loading, error } = useMovieDetailsFetch(selectedId!);

  const ifWatched = watched.find((each) => each.imdbID === selectedId);

  function onClose() {
    setSelectedId(null);
  }

  useEffect(() => {
    function callBack(e: KeyboardEvent) {
      e.code === "Escape" && onClose();
    }

    document.addEventListener("keydown", callBack);

    return () => document.removeEventListener("keydown", callBack);
  }, [onClose]);

  useEffect(
    function () {
      watched.length > 0
        ? localStorage.setItem("watched", JSON.stringify(watched))
        : localStorage.removeItem("watched");
    },
    [watched]
  );

  function addNewWatchedMovie() {
    const newWatched = {
      ...movieDetails,
      runtime: Number(movieDetails.Runtime.split(" ").at(0)),
      userRating: rating,
    };
    setWatched([...watched, newWatched]);
  }

  const {
    Actors,
    Director,
    Plot,
    Poster,
    Released,
    Runtime,
    Title,
    imdbRating,
  } = movieDetails;

  return (
    <div className="details">
      <title>{Title ? `Moviez | ${Title}` : "Moviez"}</title>
      {loading && <MovieDetailsSkeleton />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              <BackIcon />
            </button>
            {Poster && <img src={Poster} alt={`Poster of ${Title}`} />}
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
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
                  You already rate this movie with {ifWatched.userRating}{" "}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Starring: {Actors}</p>
            <p>Directed By {Director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
