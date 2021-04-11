import React, { useReducer, useContext, createContext } from "react";
import {
  getCurrentMonth,
  getCurrentDate,
  getCurrentYear,
} from "../utils/DateUtils.jsx";
const TasksStateContext = createContext();
const TasksDispatchContext = createContext();

let taskId = 0;

const initialState = {
  tasks: [],
};

const createTask = (
  text,
  completed = false,
  createdDate = "",
  createdMonth = "",
  createdYear = "",
  completedDate = "",
  completedMonth = "",
  completedYear = ""
) => {
  return {
    id: ++taskId,
    text: text,
    completed: completed,
    createdAt: {
      year: createdYear,
      month: createdMonth,
      date: createdDate,
    },
    completedAt: {
      year: completedYear,
      month: completedMonth,
      date: completedDate,
    },
  };
};

const editField = (task, field, value) => {
  task[field] = value;
  return task;
};

const setToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask = createTask(
        action.payload.text,
        false,
        getCurrentDate(),
        getCurrentMonth(),
        getCurrentYear()
      );
      const newArrayOfTasks = [...state.tasks, newTask];
      setToLocalStorage(newArrayOfTasks);
      return { ...state, tasks: newArrayOfTasks };
    }

    case "REMOVE_TASK": {
      const newTasks = state.tasks.filter(
        (item) => item.id != action.payload.id
      );
      setToLocalStorage(newTasks);
      return { ...state, tasks: newTasks };
    }
    case "EDIT_TASK": {
      const newTasks = state.tasks.map((item) => {
        if (item.id === action.payload.id) {
          return editField(item, "text", action.payload.text);
        }
        return item;
      });
      setToLocalStorage(newTasks);
      return { ...state, tasks: newTasks };
    }
    case "ADD_FROM_JSON": {
      if (action.payload.data) {
        const newTasks = action.payload.data.map((item) => {
          return createTask(
            item.text,
            item.completed,
            item.createdAt.date,
            item.createdAt.month,
            item.createdAt.year,
            item.completedAt.date,
            item.completedAt.month,
            item.completedAt.year
          );
        });
        const newArrayOfTasks = [...state.tasks, ...newTasks];
        setToLocalStorage(newArrayOfTasks);
        return { ...state, tasks: newArrayOfTasks };
      }
      return state;
    }
    case "CLEAR_ALL_COMPLETED_TASK": {
      if (state.tasks) {
        const newTasks = state.tasks.filter((item) => item.completed === false);
        return { ...state, tasks: newTasks };
      }
      return state;
    }
    case "CLEAR_ALL_ACTIVE_TASK": {
      if (state.tasks) {
        const newTasks = state.tasks.filter((item) => item.completed === true);
        return { ...state, tasks: newTasks };
      }
      return state;
    }
    case "COMPLETE_TASK": {
      const newTasks = state.tasks.map((item) => {
        if (item.id == action.payload.id) {
          item.completedAt.month = getCurrentMonth();
          item.completedAt.date = getCurrentDate();
          item.completedAt.year = getCurrentYear();
          item.completed = true;
        }
        return item;
      });
      setToLocalStorage(newTasks);
      return { ...state, tasks: newTasks };
    }
    default:
      return state;
  }
};

const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const addTask = (text) => {
    dispatch({ type: "ADD_TASK", payload: { text } });
  };
  const removeTask = (id) => {
    dispatch({ type: "REMOVE_TASK", payload: { id } });
  };

  const editTask = (id, text) => {
    dispatch({ type: "EDIT_TASK", payload: { id, text } });
  };

  const addFromJson = (data) => {
    dispatch({ type: "ADD_FROM_JSON", payload: { data } });
  };

  const completeTask = (id) => {
    dispatch({ type: "COMPLETE_TASK", payload: { id } });
  };

  const clearAllCompletedTask = () => {
    dispatch({ type: "CLEAR_ALL_COMPLETED_TASK" });
  };

  const clearAllActiveTask = () => {
    dispatch({ type: "CLEAR_ALL_ACTIVE_TASK" });
  };

  return (
    <TasksStateContext.Provider value={state}>
      <TasksDispatchContext.Provider
        value={{
          dispatch,
          addTask,
          removeTask,
          editTask,
          addFromJson,
          completeTask,
          clearAllCompletedTask,
          clearAllActiveTask,
        }}
      >
        {children}
      </TasksDispatchContext.Provider>
    </TasksStateContext.Provider>
  );
};

const useTasksDispatch = () => {
  const context = useContext(TasksDispatchContext);
  if (context === undefined) {
    throw new Error("forget about provider");
  }
  return context;
};

const useTasksState = () => {
  const context = useContext(TasksStateContext);
  if (context === undefined) {
    throw new Error("forget about provider");
  }
  return context;
};

export { TasksProvider, useTasksState, useTasksDispatch };
