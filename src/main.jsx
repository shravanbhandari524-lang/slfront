import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Rcontext from "./context/Rcontext.jsx";
import { ToastProvider } from "./components/ui/Toast.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Rcontext>
        <ToastProvider>
          <App />
        </ToastProvider>
      </Rcontext>
    </StrictMode>
  </BrowserRouter>,
);
