import React, { useState } from "react";

function LoginPage({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = () => {
    // Perform login or signup logic here (based on isSignUp state)
    if (isSignUp) {
      // Additional logic for signup
      console.log("Sign up logic");
      console.log("Username:", username);
      console.log("Password:", password);
      console.log("Confirm Password:", confirmPassword);
    } else {
      // Login logic
      console.log("Login logic");
      console.log("Username:", username);
      console.log("Password:", password);
    }

    // Close the login page after submitting
    onClose();
  };

  const handleOverlayClick = (e) => {
    // Close the login page if the overlay (outside the modal) is clicked
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleMode = () => {
    // Switch between login and signup modes
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <h2>{isSignUp ? "Sign Up" : "Welcome back!"}</h2>
          <h3></h3>
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
          {isSignUp && (
            <>
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
            </>
          )}
          <br />
          <div className="bg-green-500 border border-black rounded text-2l text-white text-center mt-2">
            <button onClick={handleSubmit}>
              {isSignUp ? "Sign Up" : "Submit"}
            </button>
          </div>
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
    background: "rgba(0, 0, 0, 0.7)", // Adjust the alpha value for transparency
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
    width: "300px", // Adjust the width as needed
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
