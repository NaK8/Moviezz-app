import { useState, useEffect } from "react";
import { MovieDataTypes } from "../GlobalTypes";

export function useMovieFetch(query: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [movies, setMovies] = useState<MovieDataTypes[]>([]);
  const KEY = "176fddb";

  useEffect(() => {
    const controller = new AbortController();
    async function FetchMovies() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const {
          Search,
          Response,
        }: { Search: MovieDataTypes[]; Response: string } = await res.json();
        if (Response === "False") throw new Error("Movie not found");

        setMovies(Search);
        setError("");
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    // onCloseMovieDetails();
    FetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, loading, error };
}
