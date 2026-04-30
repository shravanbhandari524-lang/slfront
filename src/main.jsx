import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Rcontext from "./context/Rcontext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Rcontext>
      <StrictMode>
        <App />
      </StrictMode>
    </Rcontext>
  </BrowserRouter>,
);
