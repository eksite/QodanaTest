import React, { useEffect } from "react";
import { useTasksState, useTasksDispatch } from "../context/TasksContext.jsx";
import List from "./List.jsx";

const App = () => {
  const { addFromJson, } = useTasksDispatch();
  const state = useTasksState();
  
  useEffect(() => {
    addFromJson(JSON.parse(localStorage.getItem("cards")));
  }, []);
  return <List cards={state.cards}></List>;
};

export default App;

// [{"id":1,"text":"ewqewq","completed":true,"createdAt":{"year":"","month":3,"date":10},"completedAt":{"year":2021,"month":3,"date":11}},{"id":2,"text":"павпва","completed":true,"createdAt":{"year":2021,"month":3,"date":11},"completedAt":{"year":2021,"month":3,"date":11}},{"id":1,"text":"ewqewq","completed":true,"createdAt":{"year":"","month":3,"date":10},"completedAt":{"year":2021,"month":3,"date":11}}]