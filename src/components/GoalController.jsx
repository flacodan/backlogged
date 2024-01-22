import { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ResultsList from './ResultsList';
import { Container, ButtonToolbar } from "react-bootstrap";
import { MdOutlineHome, MdMenuBook, MdDesignServices, MdOutlinePercent, MdOutlinePriorityHigh } from "react-icons/md";
import { BiCameraMovie, BiTimer } from "react-icons/bi";
import { GrGamepad } from "react-icons/gr";
import { TbCalendarTime } from "react-icons/tb";


export default function GoalController() {

    let goalQuery = { category: 'home', sort: 'priority', complete: false }; // or Preferences!!!!!

    useEffect(() => {
        axios.get('/api/goals', { params: goalQuery })
        .then((response) => {
            setResultData(response.data)
        })
    }, []);

    const [resultData, setResultData] = useState([]);
    const [categoryValue, setCategoryValue] = useState('1');
    const [sortValue, setSortValue] = useState('1');

    const categories = [
        { name: 'home', value: '1', icon: <MdOutlineHome /> },
        { name: 'book', value: '2', icon: <MdMenuBook /> },
        { name: 'project', value: '3', icon: <MdDesignServices /> },
        { name: 'game', value: '4', icon: <GrGamepad /> },
        { name: 'movie', value: '5', icon: <BiCameraMovie /> },
    ];

    const sortType = [
        { name: 'priority', value: '1', icon: <MdOutlinePriorityHigh /> },
        { name: 'percent', value: '2', icon: <MdOutlinePercent /> },
        { name: 'timeEst', value: '3', icon: <BiTimer /> },
        { name: 'created_at', value: '4', icon: <TbCalendarTime /> },
    ];

    const handleQueryChange = async (queryChange) => {
        // merge query change from button selected into goalQuery and reload list
        // if (category === 'home') {const {category, ...remainingQuery } = goalQuery;}; remainingQuery is now all but category. but I would have to remove it from the api in the controller
        goalQuery = { ...goalQuery, ...queryChange };
        console.log("queryChange: " + JSON.stringify(queryChange));
        console.log("goalQuery: " + JSON.stringify(goalQuery));
        let endPoint = (goalQuery.category === 'home') ? '/api/goals' : '/api/goalSelect';
        const response = await axios.get(endPoint, { params: goalQuery });
        setResultData(response.data);
    };

    return(
        <>
            <div className="mt-5 bg-light p-3">
                <ButtonGroup size="lg" className="d-flex justify-content-between">
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
            </div>
            <ButtonToolbar className="d-flex justify-content-between">
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
