import React from "react";
import { useTasksDispatch } from "../context/TasksContext.jsx";
import ActiveTask from "./ActiveTask.jsx";
import CompletedTask from "./CompletedTask.jsx";

const Tasks = ({ text, id, active, createdAt }) => {
  const { removeCard } = useTasksDispatch();
  return (
    <>
      {active ? (
        <ActiveTask
          removeCard={removeCard}
          id={id}
          text={text}
          createdAt={createdAt}
        />
      ) : (
        <CompletedTask text={text} id={id} removeCard={removeCard}/>
      )}
    </>
  );
};

export default Tasks;
