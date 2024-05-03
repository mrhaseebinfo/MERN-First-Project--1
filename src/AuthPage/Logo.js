// Importing React library
import React from "react";
// Importing logo image placeholder
import logoPlaceholder from "../resources/images/logoPlaceholder.svg";

// Logo component responsible for rendering a logo image and optional text
export const Logo = ({ text }) => {
  return (
    // Container for logo and text
    <div className="auth-form-logo-container">
      {/* Rendering logo image */}
      <img src={logoPlaceholder} alt="Logo" />
      {/* Rendering optional text */}
      <span>&nbsp;&nbsp;{text}</span>
    </div>
  );
};
