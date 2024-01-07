export interface MovieDataTypes {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface WatchedMovieDataType extends MovieDataTypes {
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export interface MovieDetailsType extends MovieDataTypes {
  Runtime: string;
  Released: string;
  imdbRating: number;
  Plot: string;
  Actors: string;
  Director: string;
  userRating: number;
}

export interface useFetchMovieType {
  movies: MovieDataTypes[];
  error: string;
  loading: boolean;
}
