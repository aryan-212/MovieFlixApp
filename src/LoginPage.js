import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebase.js";  // Adjust the import accordingly

function AuthenticationPage ( { onClose } )
{
  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ confirmPassword, setConfirmPassword ] = useState( "" );
  const [ isSignUp, setIsSignUp ] = useState( false );
  const [ signedUpUsername, setSignedUpUsername ] = useState( null );

  const handleAuthentication = async ( e ) =>
  {
    e.preventDefault();

    try
    {
      if ( isSignUp )
      {
        // Sign Up
        if ( password === confirmPassword )
        {
          await createUserWithEmailAndPassword( auth, email, password );
          setSignedUpUsername( email );
          setIsSignUp( false );
          onClose();
          toast.success( "Account Created Successfully" );
        } else
        {
          console.error( "Passwords do not match" );
          toast.error( "Passwords do not match" );
        }
      } else
      {
        // Sign In
        await signInWithEmailAndPassword( auth, email, password );
        onClose();
      }
    } catch ( error )
    {
      console.error( "Authentication error:", error.message );
      toast.error( "Authentication Failed" );
    }
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
          {!signedUpUsername && (
            <h2>{isSignUp ? "Sign Up" : "Welcome back!"}</h2>
          )}
          <form onSubmit={handleAuthentication}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={( e ) => setEmail( e.target.value )}
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
            {isSignUp && (
              <>
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
              </>
            )}
            <br />
            <button type="submit" style={styles.button}>
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>
          <div style={styles.infoText}>
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span onClick={toggleMode} style={styles.linkText}>
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
  button: {
    backgroundColor: "green",
    color: "white",
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  infoText: {
    marginTop: "10px",
    color: "white",
  },
  linkText: {
    cursor: "pointer",
    color: "blue",
  },
};

export default AuthenticationPage;
