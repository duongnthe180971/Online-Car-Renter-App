import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@fortawesome/fontawesome-free/css/all.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="<219996935850-hf9n6n4s9ur8lkt6u2ndt6j70tpofuhn.apps.googleusercontent.com>">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
