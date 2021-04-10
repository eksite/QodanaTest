import React, { useReducer, useContext, createContext } from "react";
import { getCurrentMonth, getCurrentDate } from "../utils/DateUtils.jsx";
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
  completedDate = "",
  completedMonth = ""
) => {
  return {
    id: ++cardId,
    text: text,
    completed: completed,
    completedAt: {
      month: completedMonth,
      date: completedDate,
    },
    createdAt: {
      month: createdMonth,
      date: createdDate,
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
        getCurrentMonth()
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
            item.completedAt.date,
            item.completedAt.month
          );
        });
        const newArrayOfCards = [...state.cards, ...newCards];
        setToLocalStorage(newArrayOfCards);
        return { ...state, cards: newArrayOfCards };
      }
      return state;
    }
    case "COMPLETE_TASK": {
      const newCards = state.cards.map((item) => {
        if (item.id == action.payload.id) {
          item.completedAt.month = getCurrentMonth();
          item.completedAt.date = getCurrentDate();
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
