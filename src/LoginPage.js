import React, { useState } from "react";

function LoginPage({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [signedUpUsername, setSignedUpUsername] = useState(null);

  const handleSignup = () => {
    if (password === confirmPassword) {
      setSignedUpUsername(username);
      setIsSignUp(false);
      // onClose();
    } else {
      console.error("Passwords do not match");
    }
  };

  const handleLogin = () => {
    console.log("Login logic");
    console.log("Username:", username);
    console.log("Password:", password);

    onClose();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleSignup();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleLogin();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
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
          {isSignUp ? (
            <form onSubmit={handleSignupSubmit} action="/signup" method="POST">
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
              </label>
              <br />
              <label>
                Confirm Password:
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                />
              </label>
              <br />
              <button type="submit" style={styles.greenButton}>
                Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit} action="/login" method="POST">
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <span
              onClick={toggleMode}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {isSignUp ? "Login now" : "Sign up now"}
            </span>
          </div>
        </div>
      </div>
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
};

export default LoginPage;
