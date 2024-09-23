import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { CryptoProvider } from "./context/CryptoContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <CryptoProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CryptoProvider>
);
