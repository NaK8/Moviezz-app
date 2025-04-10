import Skeleton from "../sekeleton";

const MoviesListSkeleton = () => {
  return (
    <ul className="list list-movies">
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i}>
          <Skeleton height="60px" width="40px" borderRadius="2px" />
          <h3>
            <Skeleton height="19px" width="100%" borderRadius="2px" />
          </h3>
          <div>
            <p>
              <Skeleton height="14px" width="100%" borderRadius="2px" />
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MoviesListSkeleton;
