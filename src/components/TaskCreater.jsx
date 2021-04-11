import { Button, Card } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { useTasksDispatch } from "../context/TasksContext.jsx";
import Styled from "styled-components";

const Container = Styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TaskContainer = Styled(Card)`
  width: 70%;
  padding: 6px 8px 2px;
`;

const StyledInput = Styled.input`
  resize: none;
  width: 100%;
  border: none;
  outline: none;
`;

const StyledButton = Styled(Button)`
  color: white;
`;

const ControlButtonsContainer = Styled.div`
  display: flex;
  align-items: center; 
  margin-left: 8px;
`;

const ClearIcon = Styled(CloseIcon)`
  margin-left: 8;
  cursor: pointer;
`;

const TaskCreater = () => {
  const [text, setText] = useState("");
  const { addTask } = useTasksDispatch();

  const clearTextField = () => {
    setText("");
  };

  const handleAddTask = () => {
    if (text) {
      addTask(text);
      clearTextField();
    }
  };

  return (
    <Container>
      <TaskContainer>
        <StyledInput
          placeholder="Enter your activity"
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </TaskContainer>
      <ControlButtonsContainer>
        <StyledButton onMouseDown={handleAddTask} variant="contained">
          Add
        </StyledButton>
        <ClearIcon onClick={clearTextField} />
      </ControlButtonsContainer>
    </Container>
  );
};

export default TaskCreater;
