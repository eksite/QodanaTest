import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { ListsProvider } from "./context/index.jsx";

ReactDOM.render(
  <ListsProvider>
    <App />
  </ListsProvider>,
  document.getElementById("root")
);
