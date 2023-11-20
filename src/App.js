import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import LoginPage from "./LoginPage.js";
import { MOVIES } from "flixhq-core"; // Import your flixhq package here
import "./App.css";
// sdsd
const APIURL = "http://localhost:4000/api/movies";
const SEARCHAPI = "http://localhost:5000/search";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLoginClick = () => {
    setShowLoginPage(true);
  };

  const handleCloseLoginPage = (username) => {
    setShowLoginPage(false);
    if (username) {
      setIsLoggedIn(true);
      setUsername(username);
    }
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  const changeTheSearch = (event) => {
    setSearch(event.target.value);
  };

  const flixhq = new MOVIES.FlixHQ(); // Initialize the flixhq package

  useEffect(() => {
    if (search === "") {
      // If search is empty, load all movies from your local API
      axios
        .get(APIURL)
        .then((response) => {
          setMovies(response.data.slider);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    } else {
      // If there's a search term, fetch movies from your backend search API
      axios
        .get(`${SEARCHAPI}?query=${search}`)
        .then((response) => {
          setMovies(response.data.results); // Update state with the fetched movie data
        })
        .catch((error) => {
          console.error("Error searching movies:", error);
        });
    }
  }, [search]);

  const playMovie = (url) => {
    // Redirect to the provided movie URL to start playing
    window.open(url, "_blank");
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "lightgreen",
        position: "relative",
      }}
    >
      <h1 align="center">MovieFlix</h1>
      {isLoggedIn ? (
        <div
          className="text-right p-2"
          style={{ position: "absolute", top: 5, right: 15 }}
        ></div>
      ) : (
        <div
          className="border border-black rounded text-3xl text-white p-2 text-right"
          style={{ position: "absolute", top: 5, right: 15 }}
        >
          <button
            onClick={handleLoginClick}
            style={{
              color: "lightgreen",
              backgroundColor: "darkgreen",
              padding: "6px 12px", // Adjust padding to increase size
              borderRadius: "8px", // Make it rounded
              fontSize: "25px", // Adjust font size
              fontWeight: "bold", // Optional: Adjust font weight
            }}
          >
            Login
          </button>
        </div>
      )}
      <div className="max-w-[1240px] shadow-xl min-h-[200px] mx-auto p-3">
        {showLoginPage && <LoginPage onClose={handleCloseLoginPage} />}
        <input
          type="search"
          value={search}
          onChange={changeTheSearch}
          className="w-full border border-black rounded text-slate-700 p-4"
        />
        <br />
        <br />
        <div className="movie-container">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="movie-item"
              onClick={() => playMovie(movie.url)}
            >
              <img src={movie.image} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
