import { ElementRef, useEffect, useRef } from "react";

interface HeaderProps {
  query: string;
  getQuery: (e: string) => void;
  moviesLenght: number;
}

const Header = ({ query, getQuery, moviesLenght }: HeaderProps) => {
  const refer = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    function handleFocus(e: KeyboardEvent) {
      if (document.activeElement === refer.current) return;
      e.code === "Enter" && refer.current?.focus();
    }

    document.addEventListener("keydown", handleFocus);

    return () => document.removeEventListener("keydown", handleFocus);
  }, [getQuery, query]);

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
          onChange={(e) => getQuery(e.target.value)}
          ref={refer}
        />
        <p className="num-results">
          Found <strong>{moviesLenght}</strong> results
        </p>
      </nav>
    </header>
  );
};

export default Header;
