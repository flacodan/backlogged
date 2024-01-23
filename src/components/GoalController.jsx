import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Container, ButtonToolbar } from "react-bootstrap";
import { MdOutlineHome, MdMenuBook, MdDesignServices, MdOutlinePercent, MdOutlinePriorityHigh } from "react-icons/md";
import { BiCameraMovie, BiTimer, BiBell } from "react-icons/bi";
import { GrGamepad } from "react-icons/gr";
import { TbCalendarTime } from "react-icons/tb";
import { FaRegCalendarCheck } from "react-icons/fa";
import ResultsList from './ResultsList';
import GoalModal from "./GoalModal";


export default function GoalController() {

    let goalQuery = { category: 'home', sort: 'priority', complete: false }; // or Preferences!!!!!

    const [resultData, setResultData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/goals', { params: goalQuery });
                setResultData(response.data);
            } catch (err) {
                console.error('Error loading data: ', err);
            }
        };
        fetchData();
    }, []);


    const [categoryValue, setCategoryValue] = useState('1');
    const [sortValue, setSortValue] = useState('1');

    const [isModalVisible, setModalVisible] = useState(false);
    const [goalData, setGoalData] = useState(null);

    const categories = [
        { name: 'home', value: '1', icon: <MdOutlineHome size={24}/> },
        { name: 'book', value: '2', icon: <MdMenuBook size={24}/> },
        { name: 'project', value: '3', icon: <MdDesignServices size={24}/> },
        { name: 'game', value: '4', icon: <GrGamepad size={24}/> },
        { name: 'movie', value: '5', icon: <BiCameraMovie size={24}/> },
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
        // const response = await axios.get(endPoint, { params: goalQuery });
        try {
            const response = await axios.get(endPoint, { params: goalQuery });
            setResultData(response.data);
            resultDataRef.current = response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleCardClick = (clickedGoalData) => {
        console.log("GoalController - a card was clicked");
        setGoalData(clickedGoalData);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleSaveChanges = (updatedData) => {
        // Perform logic to save updatedData to the database
        setModalVisible(false);
    };

    return(
        <>
            <div className="mt-1 bg-light px-3 py-1">
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
            <div className="bg-light px-3">
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
                    <BiBell size={24}/>
                    <FaRegCalendarCheck size={24}/>
                </div>
            </ButtonToolbar>
            </div>
            <ResultsList 
                resultData={resultData}  
                onCardClick={handleCardClick}
            />
                {isModalVisible && (
                    <GoalModal
                        goalData={goalData}
                        onClose={handleModalClose}
                        onSaveChanges={handleSaveChanges}
                    />
                )}
        </>
    );
}
