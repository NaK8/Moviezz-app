import { useState, useEffect } from "react";
import type { MovieDataTypes } from "../GlobalTypes";

type FetchTypes = { Search: MovieDataTypes[]; Response: string };

const KEY = import.meta.env.VITE_KEY;
export function useMovieFetch(query: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState<MovieDataTypes[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    async function FetchMovies() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const { Search, Response }: FetchTypes = await res.json();

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

    const setDebounce = setTimeout(() => {
      FetchMovies();
    }, 500);

    return function () {
      controller.abort();
      clearTimeout(setDebounce);
    };
  }, [query]);

  return { movies, loading, error };
}
