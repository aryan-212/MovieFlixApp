import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import AuthenticationPage from "./LoginPage.js";
import { MOVIES } from "flixhq-core";
import "animate.css";
import "./App.css";

const APIURL = "http://localhost:4000/api/movies";
const SEARCHAPI = "http://localhost:5000/search";

function App ()
{
  const [ movies, setMovies ] = useState( [] );
  const [ search, setSearch ] = useState( "" );
  const [ showLoginPage, setShowLoginPage ] = useState( false );
  const [ isLoggedIn, setIsLoggedIn ] = useState( false );
  const [ username, setUsername ] = useState( "" );

  const handleLoginClick = () =>
  {
    setShowLoginPage( true );
  };

  const handleCloseLoginPage = ( username ) =>
  {
    setShowLoginPage( false );
    if ( username )
    {
      setIsLoggedIn( true );
      setUsername( username );
    }
  };

  const handleLogoutClick = () =>
  {
    setIsLoggedIn( false );
    setUsername( "" );
  };

  const changeTheSearch = ( event ) =>
  {
    setSearch( event.target.value );
  };

  const flixhq = new MOVIES.FlixHQ();

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try
      {
        let response;
        if ( search === "" )
        {
          response = await axios.get( APIURL );
          setMovies( response.data.slider );
        } else
        {
          response = await axios.get( `${ SEARCHAPI }?query=${ search }` );
          setMovies( response.data.results );
        }
      } catch ( error )
      {
        console.error( "Error fetching movies:", error );
      }
    };

    fetchData();
  }, [ search ] );

  const playMovie = ( url ) =>
  {
    window.open( url, "_blank" );
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <h1 className="text-6xl text-center mt-8 mb-10"><b>MovieFlix</b></h1>
      {isLoggedIn ? (
        <div className="text-right p-2 absolute top-10 right-0">
          {/* Add user information here */}
        </div>
      ) : (
        <div className=" text-3xl text-white p-2 text-right absolute top-10 right-0">
          <button
            onClick={handleLoginClick}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold text-lg"
          >
            Login
          </button>
        </div>
      )}
      <div className="max-w-[1240px] shadow-xl mx-auto p-3 rounded-lg bg-blue-600">
        {showLoginPage && (
          <AuthenticationPage
            onClose={handleCloseLoginPage}
            animation="animate__fadeIn"
          />
        )}
        <input
          type="search"
          value={search}
          onChange={changeTheSearch}
          className="w-full border border-blue-700 rounded p-4 text-black"
        />
        <br />
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map( ( movie, index ) => (
            <div
              key={index}
              className="cursor-pointer transform transition-transform hover:scale-105 rounded-lg overflow-hidden"
              onClick={() => playMovie( movie.url )}
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <p className="text-white mt-2 text-center">{movie.title}</p>
            </div>
          ) )}
        </div>
      </div>
    </div>
  );
}

export default App;
