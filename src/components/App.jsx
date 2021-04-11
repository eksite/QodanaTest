import React, { useEffect } from "react";
import { useTasksState, useTasksDispatch } from "../context/TasksContext.jsx";
import List from "./List.jsx";
import data from "../data.json";

const App = () => {
  const { addFromJson } = useTasksDispatch();
  const state = useTasksState();
  useEffect(() => {
    addFromJson(JSON.parse(localStorage.getItem("tasks")));
    //uncomment if you want read from file
    // addFromJson(data);
  }, []);
  return <List tasks={state.tasks} />;
};

export default App;
