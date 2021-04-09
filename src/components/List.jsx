import React from "react";
import Card from "./Card.jsx";
import ActionButton from "./ActionButton.jsx";

const TrelloList = ({ cards }) => {
  return (
    <div style={styles.container}>
      <h4>Your best to do list</h4>
      <ActionButton />
      {cards.map((card) =>
        card.completed ? "" : <Card key={card.id} id={card.id} text={card.text} />
      )}
      {/* <ActionButton listId = {listId}/> */}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#dfe3e6",
    borderRadius: 3,
    width: "20%",
    height: "100%",
    padding: 8,
    marginRight: 8,
  },
};
export default TrelloList;
