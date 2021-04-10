import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useTasksState, useTasksDispatch } from "../context/TasksContext.jsx";
import List from "./List.jsx";

const App = () => {
  const { addFromJson } = useTasksDispatch();

  const state = useTasksState();
  useEffect(() => {
    addFromJson(JSON.parse(localStorage.getItem("cards")));
  }, []);

  return <List cards={state.cards}></List>;
};

export default App;