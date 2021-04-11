import React from 'react'
import { useTasksDispatch } from "../context/TasksContext.jsx";


const BarChart = () => {
    
    return (
        <Container>
          <MainContainer>
            {__DATA__.map(({ distance, colors }, i) => {
              return (
                <BarChartContainer key={i}>
                  <Number color={colors[1]}>{distance} km</Number>
                  <MakeBar height={distance * 2} colors={colors} />
                </BarChartContainer>
              );
            })}
          </MainContainer>
          <BlackLine />
        </Container>
      );
}

export default BarChart;