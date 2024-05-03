// Importing necessary modules and components
import React, { useState } from "react";
import { Logo } from "./Logo"; // Importing Logo component
import { Input } from "../shared/components"; // Importing Input component
import {
  // Importing validation functions and messages
  emailValidationMessage,
  passwordConfValidationMessage,
  passwordValidationMessage,
  usernameValidationMessage,
  validateEmail,
  validatePassword,
  validatePasswordConf,
  validateUsername,
} from "../shared/validators";
import { useRegister } from "../shared/hooks"; // Importing custom hook for registration functionality

// Register component responsible for user registration
export const Register = ({ switchAuthHandler }) => {
  // Using custom hook to get registration functionality and loading state
  const { isLoading, register } = useRegister();

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
    username: {
      value: "", // Initial value for username input
      isValid: false, // Initial validity state for username input
      showError: false, // Initial error display state for username input
    },
    passwordConf: {
      value: "", // Initial value for password confirmation input
      isValid: false, // Initial validity state for password confirmation input
      showError: false, // Initial error display state for password confirmation input
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
      case "username":
        isValid = validateUsername(value); // Validating username input
        break;
      case "passwordConf":
        // Validating password confirmation input
        isValid = validatePasswordConf(formState.password.value, value);
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

  // Function to handle registration submission
  const handleRegister = (event) => {
    event.preventDefault();

    // Calling register function with email, password, and username values
    register(
      formState.email.value,
      formState.password.value,
      formState.username.value
    );
  };

  // Determining if submit button should be disabled based on loading state and form validity
  const isSubmitButtonDisabled =
    !formState.password.isValid ||
    !formState.email.isValid ||
    !formState.username.isValid ||
    formState.password.value !== formState.passwordConf.value ||
    isLoading;

  // Rendering Register component with logo, form inputs, and submit button
  return (
    <div className="register-container">
      <Logo text={"Sign up to Clone"} /> {/* Rendering Logo component */}
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
        {/* Rendering username input */}
        <Input
          field="username"
          label="Username"
          value={formState.username.value}
          onChangeHandler={handleInputValueChange}
          type="text"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.username.showError}
          validationMessage={usernameValidationMessage}
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
        {/* Rendering password confirmation input */}
        <Input
          field="passwordConf"
          label="Password confirmation"
          value={formState.passwordConf.value}
          onChangeHandler={handleInputValueChange}
          type="password"
          onBlurHandler={handleInputValidationOnBlur}
          showErrorMessage={formState.passwordConf.showError}
          validationMessage={passwordConfValidationMessage}
        />
        {/* Rendering submit button */}
        <button onClick={handleRegister} disabled={isSubmitButtonDisabled}>
          Register
        </button>
      </form>
      {/* Switch to Login component */}
      <span onClick={switchAuthHandler} className="auth-form-switch-label">
        Already have an account ? Sign in
      </span>
    </div>
  );
};
