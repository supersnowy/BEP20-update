import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <MoralisProvider
      appId="RBaNRDb6SX02Ex2qd9hVIdNnSeJbEkxSur4nQTUB"
      serverUrl="https://lv5g1liuteon.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
  </StrictMode>,
  rootElement
);
