// Importing necessary modules and components
import React, { useState } from "react";
import { Logo } from "./Logo"; // Importing Logo component
import {
  emailValidationMessage,
  passwordValidationMessage,
  validateEmail,
  validatePassword,
} from "../shared/validators"; // Importing validation functions and messages
import { useLogin } from "../shared/hooks"; // Importing custom hook for login functionality
import { Input } from "../shared/components"; // Importing Input component

// Login component responsible for user authentication
export const Login = ({ switchAuthHandler }) => {
  // Using custom hook to get login functionality and loading state
  const { login, isLoading } = useLogin();

  // State to manage form inputs and their validity
  const [formState, setFormState] = useState({
    email: {
      value: "", // Initial value for email input
      isValid: false, // Initial validity state for email input
      showError: false, // Initial error display state for email input
    },
    password: {
      value: "", // Initial value for password input
      isValid: false, // Initial validity state for password input
      showError: false, // Initial error display state for password input
    },
  });

  // Function to handle input value change
  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  // Function to handle input validation onBlur event
  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;

    // Validating input based on field type
    switch (field) {
      case "email":
        isValid = validateEmail(value); // Validating email input
        break;
      case "password":
        isValid = validatePassword(value); // Validating password input
        break;
      default:
        break;
    }

    // Updating formState with validation results
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        isValid,
        showError: !isValid,
      },
    }));
  };

  // Function to handle login submission
  const handleLogin = (event) => {
    event.preventDefault();

    // Calling login function with email and password values
    login(formState.email.value, formState.password.value);
  };

  // Determining if submit button should be disabled based on loading state and form validity
  const isSubmitButtonDisabled =
    isLoading || !formState.password.isValid || !formState.email.isValid;

  // Rendering Login component with logo, form inputs, and submit button
  return (
    <div className="login-container">
      <Logo text={"Log in to Clone"} /> {/* Rendering Logo component */}
      <form className="auth-form">
        {/* Rendering email input */}
        <Input
          field="email"
          label="Email"
          value={formState.email.value}
          onChangeHandler={handleInputValueChange}
          type="text"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.email.showError}
          validationMessage={emailValidationMessage}
        />
        {/* Rendering password input */}
        <Input
          field="password"
          label="Password"
          value={formState.password.value}
          onChangeHandler={handleInputValueChange}
          type="password"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.password.showError}
          validationMessage={passwordValidationMessage}
        />
        {/* Rendering submit button */}
        <button onClick={handleLogin} disabled={isSubmitButtonDisabled}>
          Log in
        </button>
      </form>
      {/* Switch to Register component */}
      <span onClick={switchAuthHandler} className="auth-form-switch-label">
        Don't have an account ? Sign up
      </span>
    </div>
  );
};
