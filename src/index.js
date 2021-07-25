import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BuddyProvider, StatsProvider, UserProvider } from "./context";

ReactDOM.render(
  <StatsProvider>
    <UserProvider>
      <BuddyProvider>
        <App />
      </BuddyProvider>
    </UserProvider>{" "}
  </StatsProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
