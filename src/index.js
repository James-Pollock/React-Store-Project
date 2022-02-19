import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./contexts/StoreContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <StoreProvider>
        <App />
    </StoreProvider>
  </StrictMode>,
  rootElement
);
