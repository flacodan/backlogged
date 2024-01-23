import React from 'react';
import { Card } from "react-bootstrap";

export default function ResultsList ({ resultData, onCardClick }) {
  
  // const handleCardClick = (event) => {
  //   // when a card is clicked, access the card key (the goalId) and open the goal edit modal
  //   const cardId = event.currentTarget.id;
  //   alert("You clicked cardId " + cardId);
  // };

  //<Card.Title style={{ pointerEvents: 'none' }}>{result.title}</Card.Title>
  console.log("Clicked Goal Data:", JSON.stringify(resultData, null, 2));
  
  const cards = resultData.map((result) => (
    <Card 
      key={result.goal_id} 
      id={result.goal_id}
      className="p-3 m-1"
      onClick={() => onCardClick(result.goal_id)}
    >
      <Card.Title style={{ pointerEvents: 'none' }}>{result.title}</Card.Title>
      <Card.Subtitle style={{ pointerEvents: 'none' }}>{result.goal_id}</Card.Subtitle>
      <Card.Text style={{ pointerEvents: 'none' }}>{result.description}</Card.Text>
    </Card>
  ));

  return (
    <div className="card-list p-3" style={{ height: '70vh', overflowY: 'auto' }}>
      {cards}
    </div>
  );
};
// !!!!!!!!!!!!!! using a grid and gap https://getbootstrap.com/docs/5.0/utilities/spacing/#gap !!!!!!!!!!