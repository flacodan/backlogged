import { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ResultsList from './ResultsList';
import { Container, ButtonToolbar } from "react-bootstrap";


export default function GoalController() {

    let goalQuery = { category: 'home', sort: 'priority', complete: false };

    useEffect(() => {
        axios.get('/api/goals')
        .then((response) => {
            setResultData(response.data)
        })
    }, []);

    const [resultData, setResultData] = useState([]);
    const [categoryValue, setCategoryValue] = useState('1');
    const [sortValue, setSortValue] = useState('1');

    const categories = [
        { name: 'home', value: '1', icon: '|' },
        { name: 'book', value: '2', icon: '|' },
        { name: 'project', value: '3', icon: '|' },
        { name: 'game', value: '4', icon: '|' },
        { name: 'movie', value: '5', icon: '|' },
    ];

    const sortType = [
        { name: 'priority', value: '1', icon: '|' },
        { name: 'percent', value: '2', icon: '%' },
        { name: 'timeEst', value: '3', icon: '-' },
        { name: 'created_at', value: '4', icon: '8' },
    ];

    const handleQueryChange = async (queryChange) => {
        // merge query change from button selected into goalQuery and reload list
        goalQuery = { ...goalQuery, ...queryChange };
        console.log("queryChange: " + JSON.stringify(queryChange));
        console.log("goalQuery: " + JSON.stringify(goalQuery));
        let endPoint = (goalQuery.category === 'home') ? '/api/goals' : '/api/goalSelect';
        const response = await axios.get(endPoint, { params: goalQuery },);
        setResultData(response.data);
    };

    return(
        <>
            <Container>
                <ButtonGroup size="lg">
                    {categories.map((category, idx, icon) => (
                        <ToggleButton
                            key={idx}
                            id={`category-${idx}`}
                            type="radio"
                            size="lg"
                            variant="outline-secondary"
                            name={`category-${category.name}`}
                            value={category.value}
                            checked={categoryValue === category.value}
                            onChange={(e) => {
                                handleQueryChange({ category: category.name });
                                setCategoryValue(e.currentTarget.value);
                            }}
                        >
                            {category.icon}
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
                            onChange={(e) => {
                                handleQueryChange({ sort: sort.name })
                                setSortValue(e.currentTarget.value);
                            }}
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
            <ResultsList 
                resultData={resultData}
            />
        </>
    );
}
