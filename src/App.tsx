import Header from "./components/Header";
import Movies from "./components/Movies";
import WatchedList from "./components/WatchedList";

export default function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Movies />
        <WatchedList />
      </main>
    </>
  );
}
