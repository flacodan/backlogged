import { Card, Container } from "react-bootstrap";

export default function ResultsList ({resultData}) {

  
  const handleCardClick = (event) => {
    // when a card is clicked, access the card key (the goalId) and open the goal edit modal
    const cardId = event.currentTarget.id;
    alert("You clicked cardId " + cardId);
  };

  const cards = resultData.map((result) => (
    <Card 
      key={result.goal_id} 
      id={result.goal_id}
      className="p-3 m-1"
      onClick={handleCardClick}
    >
      <Card.Title style={{ pointerEvents: 'none' }}>{result.title}</Card.Title>
      <Card.Subtitle>{result.goal_id}</Card.Subtitle>
      <Card.Text>{result.description}</Card.Text>
    </Card>
  ));

  // !!!!!!!!!!!!!! using a grid and gap https://getbootstrap.com/docs/5.0/utilities/spacing/#gap !!!!!!!!!!
  return (
    <div className="card-list p-3" style={{ height: '100vh', overflowY: 'auto' }}>
      {cards}
    </div>
  );
};