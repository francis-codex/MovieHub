import {useState, useEffect} from "react";

import MovieCard from "./MovieCard";

import './App.css';
import searchIcon from './search.svg';

const  API_URL = 'http://www.omdbapi.com?apikey=9588502c';

const App = () =>{
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
   
  const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`)
      const data = await response.json();


      setMovies(data.Search);
  }

    useEffect(() => {
      const getRandomSearchTerm = () => {
        const searchTerms = ['action', 'comedy', 'drama', 'thriller', 'adventure'];
        const randomIndex = Math.floor(Math.random() * searchTerms.length);
        return searchTerms[randomIndex];
      };
  
      const fetchRandomMovies = async () => {
        const randomTerm = getRandomSearchTerm();
        const response = await fetch(`${API_URL}&s=${randomTerm}`);
        const data = await response.json();
        setMovies(data.Search);
        setSearchTerm(randomTerm);
      };
  
      fetchRandomMovies();
    }, []);

   return (
      <div className="app">
          <h1>MovieHub</h1>

          <div className="search">
            <input
              placeholder="Search for your favorite movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
            src={searchIcon}  
            alt="search"
            onClick={() => searchMovies(searchTerm)}
            />
          </div>

          {
            movies?.length > 0
            ? (
               <div className="container">
                   {movies.map((movie) => (
                      <MovieCard key={movie.imdbID} movie={movie} />
                   ))}
               </div>
            ) : (
               <div className="empty">
                  <h2>Movie Not Found</h2>
               </div>
            ) 
             
          }          
      </div>
   ); 
}

export default App;