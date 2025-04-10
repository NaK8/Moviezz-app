import { useState } from "react";
import { MoviesContext } from "./MoviesContext";
import { WatchedMovieDataType } from "../GlobalTypes";

const ls = localStorage.getItem("watched");

export const MoviesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [query, setQuery] = useState("Iron Man");
  const [selectedId, setSelectedId] = useState<string | null>("");
  const [moviesCount, setMoviesCount] = useState(0);
  const [watched, setWatched] = useState<WatchedMovieDataType[]>(() =>
    ls ? JSON.parse(ls) : []
  );

  const value = {
    query,
    setQuery,
    selectedId,
    setSelectedId,
    watched,
    setWatched,
    moviesCount,
    setMoviesCount,
  };

  return <MoviesContext value={value}>{children}</MoviesContext>;
};
