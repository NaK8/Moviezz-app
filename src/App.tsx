import { lazy, Suspense, useEffect, useState } from "react";
import Main from "./components/Main";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import WatchMovieList from "./components/WatchMovieList";
import Summary from "./components/Summary";
import { useMovieFetch } from "./hooks/useMovieFetch";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import type { WatchedMovieDataType } from "./GlobalTypes";
import Header from "./components/Header";
const MovieDetails = lazy(() => import("./components/MovieDetails"));

const ls = localStorage.getItem("watched");

export default function App() {
  const [query, setQuery] = useState("Iron man");
  const [selectedId, setSelectedId] = useState<string | null>("");
  const [watched, setWatched] = useState<WatchedMovieDataType[]>(() =>
    ls ? JSON.parse(ls) : []
  );
  const { movies, loading, error } = useMovieFetch(query);

  function getQuery(q: string) {
    setQuery(q);
  }

  function closeMovieDetails() {
    setSelectedId(null);
  }

  function getNewWatchedMovie(movie: WatchedMovieDataType) {
    setWatched((watched) => [...watched, movie]);
    closeMovieDetails();
  }

  function onDelete(id: string) {
    setWatched((watched) => watched.filter((each) => each.imdbID !== id));
  }

  useEffect(
    function () {
      watched.length > 0
        ? localStorage.setItem("watched", JSON.stringify(watched))
        : localStorage.removeItem("watched");
    },
    [watched]
  );

  return (
    <>
      <Header query={query} getQuery={getQuery} moviesLenght={movies?.length} />
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <MoviesList getMovie={setSelectedId} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <Suspense fallback={<Loader />}>
              <MovieDetails
                selectedId={selectedId}
                onClose={closeMovieDetails}
                addWatchedMovie={getNewWatchedMovie}
                watched={watched}
              />
            </Suspense>
          ) : (
            <>
              <Summary watched={watched} />
              <WatchMovieList watched={watched} deleteWatchedList={onDelete} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
