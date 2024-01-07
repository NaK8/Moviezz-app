import { useState, useEffect } from "react";
import { MovieDetailsType } from "../GlobalTypes";

export function useMovieDetailsFetch(selectedId: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
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

  const KEY = "176fddb";
  useEffect(
    function () {
      async function fetchMoviesDetails() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movie details");

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
