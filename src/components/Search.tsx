import { ElementRef, useEffect, useRef } from "react";
interface SearchProps {
  query: string;
  getQuery: (e: string) => void;
}

const Search = ({ query, getQuery }: SearchProps) => {
  const refer = useRef<ElementRef<"input">>(null);

  useEffect(() => {
    function callBack(e: KeyboardEvent) {
      if (document.activeElement === refer.current) return;
      if (e.code === "Enter" && refer.current) {
        refer.current.focus();
        getQuery("");
      }
    }
    document.addEventListener("keydown", callBack);
    return () => document.removeEventListener("keydown", callBack);
  }, [getQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => getQuery(e.target.value)}
      ref={refer}
    />
  );
};

export default Search;
