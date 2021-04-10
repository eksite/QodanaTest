import React, { useState } from "react";
import Card from "./Task.jsx";
import CardCreater from "./CardCreater.jsx";

const TrelloList = ({ cards }) => {
  const [showActiveTask, setShowActiveTask] = useState(true);

  const toggle = () => {
    setShowActiveTask(!showActiveTask);
  };

  return (
    <div style={styles.container}>
      <h4>Your best to do list</h4>
      <>
        <button onClick={toggle}>
          {showActiveTask ? "Completed Tasks" : "Active tasks"}
        </button>
      </>
      {!showActiveTask ? (
        cards.map((card) =>
          card.completed ? (
            <Card key={card.id} id={card.id} text={card.text} />
          ) : (
            ""
          )
        )
      ) : (
        <>
          <CardCreater />
          {cards.map((card) =>
            !card.completed ? (
              <Card key={card.id} id={card.id} text={card.text} active/>
            ) : (
              ""
            )
          )}
        </>
      )}
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
