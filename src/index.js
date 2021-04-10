import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { TasksProvider } from "./context/TasksContext.jsx";

ReactDOM.render(
  <TasksProvider>
    <App />
  </TasksProvider>,
  document.getElementById("root")
);
