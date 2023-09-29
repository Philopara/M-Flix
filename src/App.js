import { useState } from "react";
import NavBar from "./NavBar";
import AllMovies from "./AllMovies";
import SeenMovies from "./SeenMovies";
import tempMovieData from "./TempMovieData";
import tempWatchedData from "./TempWatchedData";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const apiKey = "d49f7eb7";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s="Movies"`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setMovies(data.Search);
    });

  return (
    <>
      <NavBar query={query} SetQuery={setQuery} movies={movies} />
      <main className="main">
        <AllMovies isOpen1={isOpen1} setIsOpen1={setIsOpen1} movies={movies} />
        <SeenMovies
          isOpen2={isOpen2}
          setIsOpen2={setIsOpen2}
          watched={watched}
          avgImdbRating={avgImdbRating}
          avgRuntime={avgRuntime}
          avgUserRating={avgUserRating}
        />
      </main>
    </>
  );
}

//component composition, Redux fixes prop drilling
//component composition is a technique where you nesting a custom component inside another custom component
// and then accessing these nested components using 'children' props
// Promise is a container for asynchronously delivered value/ future value
// Promises are time-sensitive/can change over time. #Lifecycle of a promise
// At the return of a promise/in the beginning, it's called the 'Pending-state'
// After value is retrieved/fetched,the promise is 'settled'
// Two types of promise: fulfilled or rejected
