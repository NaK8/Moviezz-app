import { ComponentRef, useEffect, useRef } from "react";
import { getMoviesContext } from "../context/MoviesContext";

const Header = () => {
  const { query, setQuery, moviesCount } = getMoviesContext();
  const refer = useRef<ComponentRef<"input">>(null);

  useEffect(() => {
    function handleFocus(e: KeyboardEvent) {
      if (document.activeElement === refer.current) return;
      e.code === "Enter" && refer.current?.focus();
    }

    document.addEventListener("keydown", handleFocus);

    return () => document.removeEventListener("keydown", handleFocus);
  }, [setQuery, query]);

  return (
    <header>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🎬</span>
          <h1>Moviezz</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={refer}
        />
        <p className="num-results">
          Found <strong>{moviesCount}</strong> results
        </p>
      </nav>
    </header>
  );
};

export default Header;
