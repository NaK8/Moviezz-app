import Skeleton from "./sekeleton";

const MovieDetailsSkeleton = () => {
  return (
    <div className="details">
      <>
        <header>
          <Skeleton height="222px" width="222px" borderRadius="4px" />
          <div className="details-overview">
            <h2>
              <Skeleton height="26px" width="100%" borderRadius="2px" />
            </h2>
            <p>
              <Skeleton height="19px" width="100%" borderRadius="2px" />
            </p>
            <p>
              <Skeleton height="19px" width="100%" borderRadius="2px" />
            </p>
          </div>
        </header>
        <section>
          <Skeleton height="65px" width="100%" borderRadius="5px" />
        </section>
      </>
    </div>
  );
};

export default MovieDetailsSkeleton;
