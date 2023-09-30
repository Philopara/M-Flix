import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import AllMovies from "./AllMovies";
import SeenMovies from "./SeenMovies";
import tempMovieData from "./TempMovieData";
import tempWatchedData from "./TempWatchedData";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const apiKey = "d49f7eb7";
const queryKey = "True"

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  // useEffect(function () {
  // fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s="Movies"`)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     setMovies(data.Search);
  //   });
  //another method to handle promises

  useEffect(function () {
    async function fetchMovies() {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${queryKey}`
        );
        const data = await response.json();
        setMovies(data.Search);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMovies();
  }, []);

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
// .then method to handle fulfilled promises
// .catch method to handle rejected/failed promises
// .finally method to override
// lifecycle of a component: 3 stages -> Mounting, Rerender & Unmounting
// three make-ups of component: Data, logic, Apperance
// Never call a setter-function inside the render logic to avoid component re-rendering and SIDE EFFECT
// useEffect hook to handle side effects
// useEffect is a higher order function
// cant take in two args: useEffect(effect func, dependency array)
// use effect always returns Null or cleanup fuction
// asnyc fn returns promise implicitly
