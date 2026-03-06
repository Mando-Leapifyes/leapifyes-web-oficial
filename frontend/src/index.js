import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

const rootElement = document.getElementById("root");

// Use hydrate for pre-rendered content (react-snap), createRoot for fresh render
if (rootElement.hasChildNodes()) {
  // Pre-rendered by react-snap - hydrate
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Fresh render (dev mode or /app/* routes)
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
