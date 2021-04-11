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

const CardContainer = Styled(Card)`
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

const CardCreater = () => {
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
    <Container>
      <CardContainer>
        <StyledInput
          placeholder="Enter your activity for today"
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </CardContainer>
      <ControlButtonsContainer>
        <StyledButton onMouseDown={handleAddCard} variant="contained">
          Add
        </StyledButton>
        <ClearIcon onClick={clearTextField} />
      </ControlButtonsContainer>
    </Container>
  );
};

export default CardCreater;
