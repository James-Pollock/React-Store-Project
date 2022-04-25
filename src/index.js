import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "./contexts/StoreContext";
import App from "./App";
import JPWebTech from "./JPWebTech";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <StoreProvider>
        <App />
        <JPWebTech/>
      </StoreProvider>
    </Router>
  </StrictMode>,
  rootElement
);
