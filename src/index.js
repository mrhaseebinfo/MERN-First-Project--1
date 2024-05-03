import React from "react";
import ReactDOM from "react-dom";

// Importing necessary components and styles
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthPage } from "./AuthPage";
import { DashboardPage } from "./DashboardPage";
import { App } from "./App";
import "./index.css";

// Rendering the application
ReactDOM.render(
  // Using BrowserRouter to enable routing
  <Router>
    {/* Wrapping the entire application with the App component */}
    <App>
      {/* Defining routes for the application */}
      <Routes>
        {/* Route for authentication page */}
        <Route path="/auth" element={<AuthPage />} />
        {/* Default route for the dashboard page */}
        <Route path="/*" element={<DashboardPage />} />
      </Routes>
    </App>
  </Router>,
  document.getElementById("root") // Rendering the application in the root element of the HTML document
);
