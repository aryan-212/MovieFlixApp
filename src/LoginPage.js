import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "./firebase.js";
import ModalOverlay from "./ModalOverlay.js";

function LoginPage ( { onClose } )
{
  const [ username, setUsername ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ confirmPassword, setConfirmPassword ] = useState( "" );
  const [ isSignUp, setIsSignUp ] = useState( false );
  const [ signedUpUsername, setSignedUpUsername ] = useState( null );

  const handleSignup = async () =>
  {
    if ( password === confirmPassword )
    {
      try
      {
        await firebase.database().ref( `users/${ username }` ).set( {
          username,
          password,
        } );

        setSignedUpUsername( username );
        setIsSignUp( false );
        onClose();

        toast.success( "Account Created Successfully" );
      } catch ( error )
      {
        console.error( "Error creating account:", error.message );
        toast.error( "Account Creation Failed" );
      }
    } else
    {
      console.error( "Passwords do not match" );
      toast.error( "Passwords do not match" );
    }
  };

  const handleLogin = async () =>
  {
    try
    {
      const snapshot = await firebase
        .database()
        .ref( `users/${ username }` )
        .once( "value" );
      const userData = snapshot.val();

      if ( userData && userData.password === password )
      {
        onClose();
      } else
      {
        console.error( "Invalid username or password" );
        toast.error( "Login Failed" );
      }
    } catch ( error )
    {
      console.error( "Error signing in:", error.message );
      toast.error( "Login Failed" );
    }
  };

  const handleSignupSubmit = ( e ) =>
  {
    e.preventDefault();
    handleSignup();
  };

  const handleLoginSubmit = ( e ) =>
  {
    e.preventDefault();
    handleLogin();
  };

  const toggleMode = () =>
  {
    setIsSignUp( ( prevIsSignUp ) => !prevIsSignUp );
  };

  // Add event listener to close on outside click
  useEffect( () =>
  {
    const handleOutsideClick = ( e ) =>
    {
      if ( !document.getElementById( "login-modal" ).contains( e.target ) )
      {
        onClose();
      }
    };

    document.addEventListener( "mousedown", handleOutsideClick );

    return () =>
    {
      document.removeEventListener( "mousedown", handleOutsideClick );
    };
  }, [ onClose ] );

  return (
    <ModalOverlay onClose={onClose}>
      <div
        id="login-modal"
        className="bg-blue-900 p-6 rounded-lg shadow-lg text-white text-center"
      >
        {signedUpUsername && (
          <h4>
            Welcome {signedUpUsername}
            <br />
            <br />
            Confirm account creation?
          </h4>
        )}
        {!signedUpUsername && <h2>{isSignUp ? "Sign Up" : "Welcome back!"}</h2>}
        {isSignUp ? (
          <form onSubmit={handleSignupSubmit} className="mt-4">
            <input
              type="text"
              value={username}
              onChange={( e ) => setUsername( e.target.value )}
              placeholder="Username"
              className="w-full px-3 py-2 mb-2 rounded bg-blue-800 text-white"
            />
            <input
              type="password"
              value={password}
              onChange={( e ) => setPassword( e.target.value )}
              placeholder="Password"
              className="w-full px-3 py-2 mb-2 rounded bg-blue-800 text-white"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={( e ) => setConfirmPassword( e.target.value )}
              placeholder="Confirm Password"
              className="w-full px-3 py-2 mb-2 rounded bg-blue-800 text-white"
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="mt-4">
            <input
              type="text"
              value={username}
              onChange={( e ) => setUsername( e.target.value )}
              placeholder="Username"
              className="w-full px-3 py-2 mb-2 rounded bg-blue-800 text-white"
            />
            <input
              type="password"
              value={password}
              onChange={( e ) => setPassword( e.target.value )}
              placeholder="Password"
              className="w-full px-3 py-2 mb-2 rounded bg-blue-800 text-white"
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            >
              Submit
            </button>
          </form>
        )}
        <div className="mt-4 text-white">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={toggleMode}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            {isSignUp ? "Login now" : "Sign up now"}
          </span>
        </div>
      </div>
      <ToastContainer />
    </ModalOverlay>
  );
}

export default LoginPage;
