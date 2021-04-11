import React, { useState } from "react";
import Tasks from "./Tasks.jsx";
import TaskCreater from "./TaskCreater.jsx";
import Styled from "styled-components";
import Button from "@material-ui/core/Button";
import BarChart from "./BarChart.jsx";

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Title = Styled.h2`
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0 auto
`;

const TasksContainer = Styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 40%;
`;
const TaskContainer = Styled.div`
  margin-top: 5px;
`;
const ButtonContainer = Styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  align-items: center;
`;
const BarChartContainer = Styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0 auto;
`;

const List = ({ tasks }) => {
  const [showActiveTask, setShowActiveTask] = useState(true);
  const titleText = showActiveTask
    ? "Your future activities"
    : "Good job! Just look what you done!";

  const toggle = () => {
    setShowActiveTask(!showActiveTask);
  };

  return (
    <Container>
      <Title>{titleText}</Title>
      <ButtonContainer>
        <Button variant="contained" onClick={toggle} disabled={showActiveTask}>
          Active tasks
        </Button>
        <Button variant="contained" onClick={toggle} disabled={!showActiveTask}>
          Completed Tasks
        </Button>
      </ButtonContainer>
      <TasksContainer>
        {!showActiveTask ? (
          <>
            <BarChartContainer>
              <BarChart />
            </BarChartContainer>
            {tasks.map((task) => {
              if (task.completed) {
                return (
                  <TaskContainer>
                    <Tasks key={task.id} id={task.id} text={task.text} />
                  </TaskContainer>
                );
              }
            })}
          </>
        ) : (
          <>
            <TaskCreater />
            {tasks.map((task) => {
              if (!task.completed) {
                return (
                  <TaskContainer>
                    <Tasks
                      key={task.id}
                      id={task.id}
                      text={task.text}
                      createdAt={task.createdAt}
                      active
                    />
                  </TaskContainer>
                );
              }
            })}
          </>
        )}
      </TasksContainer>
    </Container>
  );
};

export default List;
