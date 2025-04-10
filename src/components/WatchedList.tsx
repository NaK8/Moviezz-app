import { lazy } from "react";
import Box from "./Box";
import Summary from "./Summary";
import WatchMovieList from "./WatchMovieList";
import { getMoviesContext } from "../context/MoviesContext";
const MovieDetails = lazy(() => import("./MovieDetails"));

const WatchedList = () => {
  const { selectedId } = getMoviesContext();
  return (
    <Box>
      {selectedId ? (
        <MovieDetails />
      ) : (
        <>
          <Summary />
          <WatchMovieList />
        </>
      )}
    </Box>
  );
};

export default WatchedList;
