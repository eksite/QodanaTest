import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useState } from "react";
import Styled from "styled-components";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import { useTasksDispatch } from "../context/TasksContext.jsx";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/Done";

const EditInput = Styled(TextareaAutosize)` 
  flex: 1;
  resize: none;
`;

const TaskContainer = Styled(Card)`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const ContentContainer = Styled.div`
  display: flex;
  width: 95%;
  align-items: center;
  word-break: break-all;
`;

const CompleteTaskIcon = Styled(FiberManualRecordOutlinedIcon)`
  margin-right: 5px;
  font-size: 18px;
  cursor: pointer;
`;

const TypographyContent = Styled(Typography)`
  font-size: 19px;
`;

const RemoveIcon = Styled(DeleteForeverOutlinedIcon)`
  cursor: pointer;
`;

const EditIcon = Styled(EditOutlinedIcon)`
  cursor: pointer;
`;

const TaskContentContainer = Styled(CardContent)`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ButtonsContainer = Styled.div`
  display: flex;
  flex-direction: column;
  justify 
`;

const InputContainer = Styled.div`
  display: flex;
  flex-basis: 100%
`;

const ActiveTask = ({ removeTask, text, id, createdAt }) => {
  const [editedText, setEditedText] = useState(text);
  const [editToggle, setEditToggle] = useState(false);
  const { editTask, completeTask } = useTasksDispatch();

  const comfirmCompletedTask = () => {
    completeTask(id);
  };

  const editText = () => {
    if (!editedText) {
      removeTask(id);
      return;
    }
    editTask(id, editedText);
    toggle();
  };

  const removeItem = () => {
    removeTask(id);
  };

  const toggle = () => {
    setEditToggle(!editToggle);
    setEditedText(text);
  };

  const handleInput = (e) => {
    setEditedText(e.target.value);
  };

  return (
      <TaskContainer>
        <TaskContentContainer>
          {editToggle ? (
            <InputContainer>
              <EditInput value={editedText} onChange={handleInput} autoFocus />
            </InputContainer>
          ) : (
            <ContentContainer>
              <CompleteTaskIcon onClick={comfirmCompletedTask} />
              <TypographyContent>{text}</TypographyContent>
            </ContentContainer>
          )}
          <ButtonsContainer>
            {editToggle ? (
              <DoneIcon onClick={editText} />
            ) : (
              <>
                <EditIcon onClick={toggle} />
                <RemoveIcon onClick={removeItem} />
              </>
            )}
          </ButtonsContainer>
        </TaskContentContainer>
      </TaskContainer>
     
    
  );
};

export default ActiveTask;
