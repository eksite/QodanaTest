import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Styled from "styled-components";

const CardContainer = Styled(Card)`
  width: 100%;
`;
const TypographyContent = Styled(Typography)`
    font-size: 19px;
`;
const CardContentContainer = Styled(CardContent)`
  display: flex;
  flex-basis: 100%;
`

const CompletedTask = ({text}) => {
  return (
    <CardContainer>
      <CardContentContainer>
        <TypographyContent>{text}</TypographyContent>
      </CardContentContainer>
    </CardContainer>
  );
};

export default CompletedTask;
