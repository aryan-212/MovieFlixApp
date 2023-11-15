import Result from "./Components/Result";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import LoginPage from "./LoginPage";

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

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

  const getAllMovies = () => {
    axios
      .get(APIURL)
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSearchedMovies = () => {
    axios
      .get(SEARCHAPI + search)
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setMovies([]);
    if (search === "") {
      getAllMovies();
    } else {
      getSearchedMovies();
    }
  }, [search]);

  return (
    <div
      style={{
        backgroundImage: 'url("your-background-image.jpg")',
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          color: "lightgreen",
          position: "relative",
        }}
      >
        <h1 align="center">Movie Corps</h1>
        {isLoggedIn ? (
          <div
            className="text-right p-2"
            style={{ position: "absolute", top: 5, right: 15 }}
          >
            Welcome {username}!
            <button onClick={handleLogoutClick} style={{ color: "lightgreen" }}>
              Logout
            </button>
          </div>
        ) : (
          <div
            className="border border-black rounded text-3xl text-white p-2 text-right"
            style={{ position: "absolute", top: 5, right: 15 }}
          >
            <button onClick={handleLoginClick} style={{ color: "lightgreen" }}>
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
          {movies.length === 0 ? (
            <div className="text-3xl text-center mt-2"> Loading... </div>
          ) : (
            <Result movies={movies} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
