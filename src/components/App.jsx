import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useListsState } from "../context/index.jsx";
import List from "./List.jsx";

const App = () => {
  const state = useListsState();
  console.log(state);
  return <List cards={state.cards}></List>;
};

export default App;
