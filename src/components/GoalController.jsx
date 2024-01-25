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

    
    // const getUserSortPrefs = async () => {
    //     let sortPrefs = null;
    //     try {
    //         // const response = await axios.get('/api/pref/1');  // Update to select by user
    //         // sortPrefs = response.data;
    //     } catch (error) {
    //         console.error('Error fetching data: ', error);
    //     };
    //     return sortPrefs;
    // };

    //getUserSortPrefs()
    // let goalQuery = { category: 'home', sort: 'priority', complete: false };
    const [goalQuery, setGoalQuery] = useState({ 
        category: 'home', 
        sort: 'priority', 
        complete: false 
    });

    const [resultData, setResultData] = useState([]);
    const [categoryValue, setCategoryValue] = useState('1');
    const [sortValue, setSortValue] = useState('1');
    const [goalData, setGoalData] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

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


    const categories = [
        { name: 'home', value: '1', icon: <MdOutlineHome size={24}/> },
        { name: 'book', value: '2', icon: <MdMenuBook size={24}/> },
        { name: 'project', value: '3', icon: <MdDesignServices size={24}/> },
        { name: 'game', value: '4', icon: <GrGamepad size={24}/> },
        { name: 'movie', value: '5', icon: <BiCameraMovie size={24}/> },
    ];

    const sortType = [
        { name: 'priority', value: '1', icon: <MdOutlinePriorityHigh /> },
        { name: 'title', value: '2', icon: 'A' },
        { name: 'percent', value: '3', icon: <MdOutlinePercent /> },
        { name: 'time_est', value: '4', icon: <BiTimer /> },
        { name: 'created_at', value: '5', icon: <TbCalendarTime /> },
    ];

    const handleQueryChange = async (queryChange) => {
        // if (category === 'home') {const {category, ...remainingQuery } = goalQuery;}; remainingQuery is now all but category. but I would have to remove it from the api in the controller
        console.log("goalQuery BEFORE: " + JSON.stringify(goalQuery));
        console.log("queryChange: " + JSON.stringify(queryChange));
        setGoalQuery((prevQuery) => {
            const updatedQuery = { ...prevQuery, ...queryChange };
            fetchDataFromAPI(updatedQuery);
            console.log("goalQuery AFTER merge: " + JSON.stringify(updatedQuery));
            return updatedQuery;
        })
    };

    const fetchDataFromAPI = async (query) => {
        let endPoint = (query.category === 'home') ? '/api/goals' : '/api/goalSelect';  //!!!!!!!!Modify /api/goals so sort/filter works
        console.log("Endpoint is: " + endPoint);
        try {
            const response = await axios.get(endPoint, { params: query });
            setResultData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };      

    const handleCardClick = (clickedGoalId) => {
        const clickedGoalData = resultData.find((goal) => goal.goal_id === clickedGoalId);
        setGoalData(clickedGoalData);
        console.log("Clicked Goal Data:", JSON.stringify(clickedGoalData, null, 2));
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleDeleteGoal = async () => {
        const prevGoalData = goalData;
        try {
            const response = await axios.delete(`/api/goal/${prevGoalData.goal_id}`);
            setModalVisible(false);
            fetchDataFromAPI(goalQuery);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    const handleSaveChanges = async (updatedData) => {
        const prevGoalData = goalData;
        const mergedData = { ...prevGoalData, ...updatedData };
        try {
            const response = await axios.put(`/api/goal/${prevGoalData.goal_id}`, mergedData);
            setModalVisible(false);
            fetchDataFromAPI(goalQuery);
        } catch (error) {
            console.error('Error updating data:', error);
        }
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
                            size="m"
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
                <div className="bg-light">
                    <BiBell size={24} style={{color:"#6c757d"}} className="mx-2"/>
                    <FaRegCalendarCheck size={24} style={{color:"#6c757d"}} className="mx-1"/>
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
                    show={isModalVisible}
                    onDelete={handleDeleteGoal}
                    onClose={handleModalClose}
                    onSaveChanges={handleSaveChanges}
                />
            )}
        </>
    );
}
