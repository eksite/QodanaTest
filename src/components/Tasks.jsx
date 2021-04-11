import React from "react";
import { useTasksDispatch } from "../context/TasksContext.jsx";
import ActiveTask from "./ActiveTask.jsx";
import CompletedTask from "./CompletedTask.jsx";

const Tasks = ({ text, id, active, createdAt }) => {
  const { removeTask } = useTasksDispatch();
  return (
    <>
      {active ? (
        <ActiveTask
          removeTask={removeTask}
          id={id}
          text={text}
          createdAt={createdAt}
        />
      ) : (
        <CompletedTask text={text} id={id} removeTask={removeTask} />
      )}
    </>
  );
};

export default Tasks;
