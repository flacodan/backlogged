import { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Container, ButtonToolbar, Card } from "react-bootstrap";


export default function GoalController() {

    // const resultModifiers = { category: '', sort: 'description', complete: false };

    
    const [categoryValue, setCategoryValue] = useState('1');
    const [sortValue, setSortValue] = useState('1');

    const categories = [
        { name: 'home', value: '1' },
        { name: 'book', value: '2' },
        { name: 'project', value: '3' },
        { name: 'game', value: '4' },
        { name: 'movie', value: '5' },
    ];

    const sortType = [
        { name: 'pri', value: '1', icon: '|' },
        { name: 'pct', value: '2', icon: '%' },
        { name: 'sz', value: '3', icon: '-' },
        { name: 'age', value: '4', icon: '8' },
    ];

    const handleHome = async () => {
        const response = await axios.get(`/api/goal`);
        return response;
    };

    const handleBooks = async () => {
        const category = 'book';
        const params = { ...resultModifiers, category: category };
        const response = await axios.get(`/api/goalSelect`, { params },);
        return response;
    };

    const handleGames = async () => {
        const category = 'game';
        const params = { ...resultModifiers, category: category };
        const response = await axios.get(`/api/goalSelect`, { params },);
        return response;
    };


    const handleProjects = async () => {
        const category = 'project';
        const params = { ...resultModifiers, category: category };
        const response = await axios.get(`/api/goalSelect`, { params },);
        return response;
    };

    const handleMovies = async () => {
        const category = 'movie';
        const params = { ...resultModifiers, category: category };
        const response = await axios.get(`/api/goalSelect`, { params },);
        return response;
    };


    // const handleStuff = async () => {
    //     const category = "books";
    //     const response = await axios.get(`/api/${indexToSave}`);
    //     return response;
    // };

    // use map to loop through results and populate GoalCards to put in the list

    const ResultsList = ({ results }) => {
        const cards = results.map((result) => (
          <Card key={result.id}>
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

    return(
        <>
            <Container>
                <ButtonGroup size="lg">
                    {categories.map((category, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`category-${idx}`}
                            type="radio"
                            size="lg"
                            variant="outline-secondary"
                            name={`category-${category.name}`}
                            value={category.value}
                            checked={categoryValue === category.value}
                            onChange={(e) => setCategoryValue(e.currentTarget.value)}
                        >
                            {category.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </Container>
            <ButtonToolbar>
                <ButtonGroup>
                    {sortType.map((sort, idx, icon) => (
                        <ToggleButton
                            key={idx}
                            id={`sort-${idx}`}
                            type="radio"
                            variant="outline-secondary"
                            size="sm"
                            name={`sort-${sort.name}`}
                            value={sort.value}
                            checked={sortValue === sort.value}
                            onChange={(e) => setSortValue(e.currentTarget.value)}
                        >
                            {sort.icon}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
                <div>
                    <button>Alert</button>
                    <button>Compl</button>
                </div>
            </ButtonToolbar>
            <div>.. result table with State ..</div>
        </>
    );
}