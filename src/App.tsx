import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Results from "./components/Results";
import Main from "./components/Main";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import { WatchedMovieDataType, useFetchMovieType } from "./GlobalTypes";
import WatchMovieList from "./components/WatchMovieList";
import Summary from "./components/Summary";
import { useMovieFetch } from "./hooks/useMovieFetch";
// import { useLocalStorageState } from "./hooks/useLocalStorageState";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];
const ls = localStorage.getItem("watched");

export default function App() {
  const [query, setQuery] = useState("Iron man");
  const [selectedId, setSelectedId] = useState<string | null>("");
  const [watched, setWatched] = useState<WatchedMovieDataType[]>(() =>
    ls ? JSON.parse(ls) : []
  );
  const { movies, loading, error }: useFetchMovieType = useMovieFetch(query);

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
        : null;
    },
    [watched]
  );

  return (
    <>
      <Navbar>
        <Search query={query} getQuery={getQuery} />
        <Results movies={movies} />
      </Navbar>

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
            <MovieDetails
              selectedId={selectedId}
              onClose={closeMovieDetails}
              addWatchedMovie={getNewWatchedMovie}
              watched={watched}
            />
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
