import { MovieDataTypes } from "../GlobalTypes";

interface ResultsProps {
  movies: MovieDataTypes[];
}

const Results = ({ movies }: ResultsProps) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

export default Results;
