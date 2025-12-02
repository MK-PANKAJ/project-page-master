import React from 'react';
import { createRoot } from "react-dom/client";
// Change BrowserRouter to HashRouter
import { HashRouter } from 'react-router-dom'; 
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* Use HashRouter instead of BrowserRouter. 
         We don't need the `basename` prop with HashRouter, it handles it automatically.
      */}
      <HashRouter>
        <App />
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);