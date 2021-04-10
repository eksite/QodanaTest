import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { useTasksDispatch } from "../context/TasksContext.jsx";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const ToDoCard = ({ text, id, active }) => {
  const { removeCard, editCard, completeTask } = useTasksDispatch();
  const [editedText, setEditedText] = useState(text);
  const [editToggle, setEditToggle] = useState(false);

  const toggle = () => {
    setEditToggle(!editToggle);
    setEditedText(text);
  };

  const editText = () => {
    if (!editedText) {
      removeCard(id);
      return;
    }

    editCard(id, editedText);
    toggle();
  };

  const endTask = () => {
    completeTask(id);
  };

  return (
    <div
      style={{ ...styles.cardContainer, display: "flex", flexDirection: "row" }}
    >
      {" "}
      {active ? (
        <>
          <Card style={{ width: "100%" }}>
            <CardContent>
              {editToggle ? (
                <div>
                  <input
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    style={{ width: "100%" }}
                    autoFocus
                  />
                  <button onClick={editText}>apply</button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleOutlineIcon
                    style={{ marginRight: "5px", fontSize: "18px" }}
                    onClick={endTask}
                  />
                  <Typography style={{ fontSize: "19px" }}>{text}</Typography>
                </div>
              )}
            </CardContent>
          </Card>
          <div>
            <button onClick={() => removeCard(id)}>remove</button>
            <button onClick={toggle}>edit</button>
          </div>
        </>
      ) : (
        <Card style={{ width: "100%" }}>
          <CardContent>
            <Typography style={{ fontSize: "19px" }}>{text}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const styles = {
  cardContainer: {
    resize: "visible",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
  },
};

export default ToDoCard;
