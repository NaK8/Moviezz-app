import { createContext, use } from "react";
import { WatchedMovieDataType } from "../GlobalTypes";

interface ContextTypes {
  query: string;
  setQuery: (q: string) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  watched: WatchedMovieDataType[];
  setWatched: (watch: WatchedMovieDataType[]) => void;
  moviesCount: number;
  setMoviesCount: (id: number) => void;
}

export const MoviesContext = createContext<ContextTypes | undefined>(undefined);

export function getMoviesContext() {
  const context = use(MoviesContext);

  if (context === undefined) {
    throw new Error(
      "getMoveisContext must be used within a MoviesContextProvider"
    );
  }

  return context;
}
