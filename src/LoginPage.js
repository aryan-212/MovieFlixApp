import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "./firebase.js";

function AuthenticationPage ( { onClose } )
{
  const [ email, setEmail ] = useState( "" );
  const [ password, setPassword ] = useState( "" );
  const [ confirmPassword, setConfirmPassword ] = useState( "" );
  const [ isSignUp, setIsSignUp ] = useState( false );
  const [ signedUpUsername, setSignedUpUsername ] = useState( null );
  const [ passwordLengthError, setPasswordLengthError ] = useState( "" );
  const [ resetPasswordRequested, setResetPasswordRequested ] = useState( false );

  const handleAuthentication = async ( e ) =>
  {
    e.preventDefault();

    try
    {
      if ( resetPasswordRequested )
      {
        // Reset Password
        await sendPasswordResetEmail( auth, email );
        toast.success( "Password reset email sent. Check your inbox." );
        setResetPasswordRequested( false );
        return;
      }

      if ( isSignUp )
      {
        // Sign Up
        console.log( "Signing up..." );

        if ( password.length < 6 )
        {
          setPasswordLengthError( "Password must be at least 6 characters long" );
          return;
        }

        if ( password === confirmPassword )
        {
          await createUserWithEmailAndPassword( auth, email, password );
          console.log( "Sign up successful!" );
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
        console.log( "Signing in..." );
        await signInWithEmailAndPassword( auth, email, password );
        console.log( "Sign in successful!" );
        onClose();
      }
    } catch ( error )
    {
      console.error( "Authentication error:", error );
      toast.error( "Authentication Failed" );
    }
  };

  const handlePasswordChange = ( e ) =>
  {
    setPassword( e.target.value );
    if ( isSignUp && e.target.value.length < 6 )
    {
      setPasswordLengthError( "Password must be at least 6 characters long" );
    } else
    {
      setPasswordLengthError( "" );
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

  const handleResetPasswordClick = () =>
  {
    setResetPasswordRequested( true );
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
                onChange={handlePasswordChange}
                style={styles.input}
              />
              {passwordLengthError && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {passwordLengthError}
                </div>
              )}
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
            {!isSignUp && (
              <div style={styles.linkText} onClick={handleResetPasswordClick}>
                Reset Password
              </div>
            )}
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
    color: "green",
  },
};

export default AuthenticationPage;
