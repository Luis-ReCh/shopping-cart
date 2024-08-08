import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { FilterProvider } from "./context/filter.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <FilterProvider>
    <App />
  </FilterProvider>
);
