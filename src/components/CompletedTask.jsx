import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Styled from "styled-components";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

const TaskContainer = Styled(Card)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;
const TypographyContent = Styled(Typography)`
  font-size: 19px;
`;
const TaskContentContainer = Styled(CardContent)`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const RemoveIcon = Styled(DeleteForeverOutlinedIcon)`
  cursor: pointer;
`;

const ButtonContainer = Styled.div`
  display: flex;
  flex-direction: column;
  justify 
`;
const ContentContainer = Styled.div`
  display: flex;
  width: 95%;
  align-items: center;
  word-break: break-all;
`;

const CompletedTask = ({ text, id, removeTask }) => {
  const removeItem = () => {
    removeTask(id);
  };
  return (
    <TaskContainer>
      <TaskContentContainer>
        <ContentContainer>
          <TypographyContent>{text}</TypographyContent>
        </ContentContainer>
        <ButtonContainer>
          <RemoveIcon onClick={removeItem} />
        </ButtonContainer>
      </TaskContentContainer>
    </TaskContainer>
  );
};

export default CompletedTask;
