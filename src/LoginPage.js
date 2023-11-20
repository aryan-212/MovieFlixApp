import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "./firebase.js"; // Adjust the path accordingly

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
        await firebase.auth().createUserWithEmailAndPassword( username, password );
        setSignedUpUsername( username );
        setIsSignUp( false );
        onClose();

        // Show success notification
        toast.success( "Account Created Successfully" );
      } catch ( error )
      {
        console.error( "Error creating account:", error.message );
        // Show error notification
        toast.error( "Account Creation Failed" );
      }
    } else
    {
      console.error( "Passwords do not match" );
      // Show error notification
      toast.error( "Passwords do not match" );
    }
  };

  const handleLogin = async () =>
  {
    try
    {
      await firebase.auth().signInWithEmailAndPassword( username, password );
      onClose();
    } catch ( error )
    {
      console.error( "Error signing in:", error.message );
      // Show error notification
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

  const handleOverlayClick = ( e ) =>
  {
    if ( e.target === e.currentTarget )
    {
      onClose();
    }
  };

  const toggleMode = () =>
  {
    setIsSignUp( ( prevIsSignUp ) => !prevIsSignUp );
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        <div style={styles.modalContent}>
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
            <form onSubmit={handleSignupSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={( e ) => setUsername( e.target.value )}
                  style={styles.input}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={( e ) => setPassword( e.target.value )}
                  style={styles.input}
                />
              </label>
              <br />
              <label>
                Confirm Password:
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={( e ) => setConfirmPassword( e.target.value )}
                  style={styles.input}
                />
              </label>
              <br />
              <button type="submit" style={styles.greenButton}>
                Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={( e ) => setUsername( e.target.value )}
                  style={styles.input}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={( e ) => setPassword( e.target.value )}
                  style={styles.input}
                />
              </label>
              <br />
              <button type="submit" style={styles.greenButton}>
                Submit
              </button>
            </form>
          )}
          <div style={{ marginTop: "10px", color: "white" }}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span onClick={toggleMode} style={{ cursor: "pointer", color: "blue" }}>
              {isSignUp ? "Login now" : "Sign up now"}
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  modal: {
    backgroundColor: "black",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  modalContent: {
    width: "300px",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    boxSizing: "border-box",
    backgroundColor: "black",
    color: "white",
    border: "1px solid white",
    borderRadius: "4px",
  },
  greenButton: {
    backgroundColor: "green",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default LoginPage;
