import { useState, useEffect } from "react";
import type { MovieDetailsType } from "../GlobalTypes";

export function useMovieDetailsFetch(selectedId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType>({
    imdbID: "",
    Title: "",
    Year: "",
    Poster: "",
    Runtime: "",
    Released: "",
    imdbRating: 0,
    Plot: "",
    Actors: "",
    Director: "",
    userRating: 0,
  });

  const KEY = import.meta.env.VITE_KEY;
  useEffect(
    function () {
      async function fetchMoviesDetails() {
        try {
          setLoading(true);
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok)
            throw new Error(
              "Something went wrong with fetching movies details"
            );

          const data = await res.json();
          if (data.Responce === "False") throw new Error("Movie not found");

          setMovieDetails(data);
          setLoading(false);
          setError("");
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      }
      fetchMoviesDetails();
    },
    [selectedId]
  );

  return { movieDetails, loading, error };
}
