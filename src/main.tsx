import React from 'react';
import { createRoot } from "react-dom/client";
import { HashRouter } from 'react-router-dom'; 
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* HashRouter works on both Vercel and GitHub Pages without extra config */}
      <HashRouter>
        <App />
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);
