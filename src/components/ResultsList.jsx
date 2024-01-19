import { Card } from "react-bootstrap";

export default function ResultsList ({resultData}) {

    const cards = resultData.map((result) => (
      <Card key={result.goal_id}>
        <Card.Title>{result.title}</Card.Title>
        <Card.Subtitle>Hey! A subtitle!</Card.Subtitle>
        <Card.Text>{result.description}</Card.Text>
      </Card>
    ));
  
    return (
      <div className="card-list">
        {cards}
      </div>
    );
};