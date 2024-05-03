// Importing React and useState hooks from "react" library
import React, { useState } from "react";

// Importing Login and Register components from respective files
import { Login } from "./Login";
import { Register } from "./Register";

// Importing CSS styles for the AuthPage component
import "./authPage.css";

// AuthPage component responsible for rendering either Login or Register component based on state
export const AuthPage = () => {
  // State to track whether to display Login or Register component
  const [isLogin, setIsLogin] = useState(true);

  // Function to toggle between Login and Register components
  const handleAuthPageToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    // Container for the AuthPage component
    <div className="auth-container">
      {/* Conditional rendering: Display Login component if isLogin is true, otherwise display Register component */}
      {isLogin ? (
        <Login switchAuthHandler={handleAuthPageToggle} /> // Rendering Login component
      ) : (
        <Register switchAuthHandler={handleAuthPageToggle} /> // Rendering Register component
      )}
    </div>
  );
};
