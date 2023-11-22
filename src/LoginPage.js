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
        await sendPasswordResetEmail( auth, email );
        toast.success( "Password reset email sent. Check your inbox." );
        setResetPasswordRequested( false );
        return;
      }

      if ( isSignUp )
      {
        if ( password.length < 6 )
        {
          setPasswordLengthError( "Password must be at least 6 characters long" );
          return;
        }

        if ( password === confirmPassword )
        {
          await createUserWithEmailAndPassword( auth, email, password );
          setSignedUpUsername( email );
          setIsSignUp( false );
          onClose();
          toast.success( "Account Created Successfully" );
        } else
        {
          toast.error( "Passwords do not match" );
        }
      } else
      {
        await signInWithEmailAndPassword( auth, email, password );
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
          {!signedUpUsername && <h2>{isSignUp ? "Sign Up" : "Welcome back!"}</h2>}
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
              {passwordLengthError && <div style={styles.errorText}>{passwordLengthError}</div>}
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
            <button type="submit" style={isSignUp ? { ...styles.button, ...styles.buttonHover } : styles.button}>
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
            {!isSignUp && (
              <div style={styles.linkText} onClick={handleResetPasswordClick}>
                Reset Password
              </div>
            )}
          </form>
          <div style={styles.infoText}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
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
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  modalContent: {
    width: "300px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    boxSizing: "border-box",
    backgroundColor: "#333",
    color: "white",
    border: "1px solid white",
    borderRadius: "4px",
  },
  button: {
    backgroundColor: "green",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "darkgreen",
  },
  infoText: {
    marginTop: "15px",
    color: "white",
    fontSize: "14px",
  },
  linkText: {
    cursor: "pointer",
    color: "green",
    textDecoration: "underline",
    marginLeft: "5px",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
  },
};

export default AuthenticationPage;
