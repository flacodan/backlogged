import React from 'react';
import { Card, Col, Row, Button } from "react-bootstrap";
import { PiArrowFatUp } from "react-icons/pi";
import { MdMenuBook, MdDesignServices, MdOutlinePriorityHigh } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { GrGamepad } from "react-icons/gr";
import { ImCheckmark2, ImCheckmark, ImCheckboxChecked } from "react-icons/im";

export default function ResultsList ({ resultData, onCardClick, onClickComplete }) {
  //add this to css for hover effect: .card:hover {  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }

  const categories = [
    { name: 'book', value: '2', icon: <MdMenuBook style={{ color: '#6c757d', fontSize: '2rem' }} /> },
    { name: 'project', value: '3', icon: <MdDesignServices style={{ color: '#6c757d', fontSize: '2rem' }} /> },
    { name: 'game', value: '4', icon: <GrGamepad style={{ color: '#6c757d', fontSize: '2rem' }} /> },
    { name: 'movie', value: '5', icon: <BiCameraMovie style={{ color: '#6c757d', fontSize: '2rem' }} /> },
  ];

  function categoryIcon(category){
    const index = categories.findIndex(x => x.name === category);
    return categories[index].icon;
  };

  // Find age of an entry in days
  const calculateAge = (dateString) => {
    const dateObject = new Date(dateString);
    const dateMilli = dateObject.getTime();
    return Math.round((Date.now() - dateMilli)/(1000*60*60*24));
  };

  const clickComplete = (event, goal_id) => {    
    event.stopPropagation();
    onClickComplete(event, goal_id);
  }
  
  const cards = resultData.map((result) => (
    <Card 
      key={result.goal_id} 
      id={result.goal_id}
      className="p-3 m-1"
      onClick={() => onCardClick(result.goal_id)}
    >
      <Row>
        <Col>
          <Row>
            <Col>{categoryIcon(result.category)}</Col>
          </Row>
          <Row>
            <Col >{<PiArrowFatUp style={{color:"#6c757d"}} />}{result.priority}</Col>
          </Row>
        </Col>
        <Col xs="8">
          <Row><h5>{result.title}</h5></Row>
          <Col>
            <Row>
              <Col>
                <div>
                  {result.description.substring(0,60)}...</div>
                  <div>
                  Est: {result.time_est} hr</div>
              </Col>
            </Row>
          </Col>
        </Col>
        <Col>
          <Row>{result.percent}%</Row>
          <Row>{calculateAge(result.createdAt)} days</Row>
        </Col>
        <Col className='d-none d-md-block'>
          <Button 
            className='border-0 bg-transparent' 
            onClick={(event) => { clickComplete(event, result.goal_id) }}
            disabled = { result.complete ? true : false }
          >
              { result.complete ? <ImCheckboxChecked style={{color:"#6c757d", fontSize: '3rem'}} /> : <ImCheckmark2 style={{color:"#6c757d", fontSize: '2rem'}} />}
          </Button>
        </Col>
      </Row>
    </Card>
  ));

  return (
    <div className="card-list p-3" style={{ height: '70vh', overflowY: 'auto' }}>
      {cards}
    </div>
  );
};

// !!!!!!!!!!!!!! using a grid and gap https://getbootstrap.com/docs/5.0/utilities/spacing/#gap !!!!!!!!!!
// <Card 
// key={result.goal_id} 
// id={result.goal_id}
// className="p-3 m-1"
// onClick={() => onCardClick(result.goal_id)}
// >
// <Card.Title style={{ pointerEvents: 'none' }}>{result.title}</Card.Title>
// <Card.Subtitle style={{ pointerEvents: 'none' }}>{result.goal_id}</Card.Subtitle>
// <Card.Text style={{ pointerEvents: 'none' }}>{result.description}</Card.Text>
// </Card> 