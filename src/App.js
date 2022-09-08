import { useEffect, useState } from "react";

import './app.css';
import SearchIcon from './Search.svg';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com?apikey=6c5a1771';

function App() {

  const [movies, setMvoies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);

    const data = await response.json();

    setMvoies(data.Search);
  }

  useEffect(() => {
    searchMovies("all");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value) }}
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {
                movies.map((movie) => (
                  <MovieCard movie={movie} />
                ))
              }
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }

    </div>
  );
}

export default App;
