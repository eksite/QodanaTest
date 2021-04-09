import React, { useReducer, useContext, createContext } from "react";

const ListsStateContext = createContext();
const ListsDispatchContext = createContext();

let cardId = 2;
const initialState = {
  cards: [
    { text: "smth", id: 0, completed: false },
    { text: "smthinteresting", id: 1, completed: false },
  ],
};

const listsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const newCard = {
        id: cardId,
        text: action.payload.text,
      };
      cardId += 1;
      return { ...state, cards: [...state.cards, newCard] };
    }
    case "REMOVE_CARD": {
      const newCards = state.cards.filter(
        (item) => item.id != action.payload.id
      );
      return { ...state, cards: newCards };
    }
    case "EDIT_CARD": {
      const newCards = state.cards.map((item) => {
        if (item.id === action.payload.id) {
          item.text = action.payload.text;
        }
        return item;
      });
      return { ...state, cards: newCards };
    }
    case "ADD_FROM_JSON": {
      const newCards = action.payload.data.map((item) => {
        const card = {
          text: item.text,
          completed: item.completed,
          id: cardId,
        };
        cardId += 1;
        return card;
      });
      return { ...state, cards: [...state.cards, newCards] };
    }
    case "COMPLETE_TASK": {
      const newCards = state.cards.map((item) => {
        if (item.id == action.payload.id) {
          console.log("here");
          item.completed = true;
        }
        return item;
      });
      return { ...state, cards: newCards };
    }
    default:
      return state;
  }
};

const ListsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listsReducer, initialState);
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
    <ListsStateContext.Provider value={state}>
      <ListsDispatchContext.Provider
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
      </ListsDispatchContext.Provider>
    </ListsStateContext.Provider>
  );
};

const useListsDispatch = () => {
  const context = useContext(ListsDispatchContext);
  if (context === undefined) {
    throw new Error("forget about provider");
  }
  return context;
};

const useListsState = () => {
  const context = useContext(ListsStateContext);
  if (context === undefined) {
    throw new Error("forget about provider");
  }
  return context;
};

export { ListsProvider, useListsState, useListsDispatch };
