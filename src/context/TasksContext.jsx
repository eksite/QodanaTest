import React, { useReducer, useContext, createContext } from "react";
import {
  getCurrentMonth,
  getCurrentDate,
  getCurrentYear,
} from "../utils/DateUtils.jsx";
const TasksStateContext = createContext();
const TasksDispatchContext = createContext();

let cardId = 0;

const initialState = {
  cards: [],
};

const createCard = (
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
    id: ++cardId,
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

const editField = (card, field, value) => {
  card[field] = value;
  return card;
};

const setToLocalStorage = (tasks) => {
  localStorage.setItem("cards", JSON.stringify(tasks));
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const newCard = createCard(
        action.payload.text,
        false,
        getCurrentDate(),
        getCurrentMonth(),
        getCurrentYear()
      );
      const newArrayOfCards = [...state.cards, newCard];
      setToLocalStorage(newArrayOfCards);
      return { ...state, cards: newArrayOfCards };
    }

    case "REMOVE_CARD": {
      const newCards = state.cards.filter(
        (item) => item.id != action.payload.id
      );
      setToLocalStorage(newCards);
      return { ...state, cards: newCards };
    }
    case "EDIT_CARD": {
      const newCards = state.cards.map((item) => {
        if (item.id === action.payload.id) {
          return editField(item, "text", action.payload.text);
        }
        return item;
      });
      setToLocalStorage(newCards);
      return { ...state, cards: newCards };
    }
    case "ADD_FROM_JSON": {
      if (action.payload.data) {
        const newCards = action.payload.data.map((item) => {
          return createCard(
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
        const newArrayOfCards = [...state.cards, ...newCards];
        setToLocalStorage(newArrayOfCards);
        return { ...state, cards: newArrayOfCards };
      }
      return state;
    }
    case "CLEAR_ALL_COMPLETED_TASK": {
      if (state.cards) {
        const newCards = state.cards.filter((item) => item.completed === false);
        return { ...state, cards: newCards };
      }
      return state;
    }
    case "CLEAR_ALL_ACTIVE_TASK": {
      if (state.cards) {
        const newCards = state.cards.filter((item) => item.completed === true);
        return { ...state, cards: newCards };
      }
      return state;
    }
    case "COMPLETE_TASK": {
      const newCards = state.cards.map((item) => {
        if (item.id == action.payload.id) {
          item.completedAt.month = getCurrentMonth();
          item.completedAt.date = getCurrentDate();
          item.completedAt.year = getCurrentYear();
          item.completed = true;
        }
        return item;
      });
      setToLocalStorage(newCards);
      return { ...state, cards: newCards };
    }
    default:
      return state;
  }
};

const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const addCard = (text) => {
    dispatch({ type: "ADD_CARD", payload: { text } });
  };
  const removeCard = (id) => {
    dispatch({ type: "REMOVE_CARD", payload: { id } });
  };

  const editCard = (id, text) => {
    dispatch({ type: "EDIT_CARD", payload: { id, text } });
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
          addCard,
          removeCard,
          editCard,
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
