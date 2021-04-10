import { Button, Card } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { useTasksDispatch } from "../context/TasksContext.jsx";

const CardCreater = ({ list, listId }) => {
  const [text, setText] = useState("");
  const { addCard } = useTasksDispatch();

  const handleAddCard = () => {
    if (text) {
      addCard(text);
      setText("");
    }
  };

  const clearTextField = () => {
    setText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Card
        style={{
          minHeight: 20,
          minWidth: 100,
          width: "70%",
          padding: "6px 8px 2px",
        }}
      >
        <input
          placeholder="Enter your activity for today"
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            resize: "none",
            width: "100%",
            border: "none",
            outline: "none",
          }}
        />
      </Card>
      <div style={{ display: "flex", alignItems: "center", marginLeft: "8px" }}>
        <Button
          onMouseDown={handleAddCard}
          variant="contained"
          style={{ color: "white", backgroundColor: "#5aac44" }}
        >
          Add
        </Button>
        <CloseIcon
          onClick={clearTextField}
          style={{ marginLeft: 8, cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default CardCreater;
