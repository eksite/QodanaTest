import React, { useEffect } from "react";
import { useTasksState, useTasksDispatch } from "../context/TasksContext.jsx";
import List from "./List.jsx";
import data from "../data.json";

const App = () => {
  const { addFromJson } = useTasksDispatch();
  const state = useTasksState();
  useEffect(() => {
    addFromJson(JSON.parse(localStorage.getItem("cards")));
    addFromJson(data);
  }, []);
  return <List cards={state.cards}></List>;
};

export default App;
