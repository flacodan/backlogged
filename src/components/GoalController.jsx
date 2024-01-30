import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Button } from 'react-bootstrap';
import { Container, ButtonToolbar } from "react-bootstrap";
import { MdOutlineHome, MdMenuBook, MdDesignServices, MdOutlinePriorityHigh } from "react-icons/md";
import { BiCameraMovie, BiTimer, BiBell } from "react-icons/bi";
import { GrGamepad } from "react-icons/gr";
import { TbCalendarTime } from "react-icons/tb";
import { PiChartPieSliceFill, PiArrowFatUp } from "react-icons/pi";
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
    
    const [goalQuery, setGoalQuery] = useState({ 
        category: 'home', 
        sort: 'priority', 
        complete: false 
    });

    const [resultData, setResultData] = useState([]);
    const [categoryValue, setCategoryValue] = useState('1');
    const [sortValue, setSortValue] = useState('1');
    const [goalData, setGoalData] = useState(null);
    const [isGoalModalVisible, setGoalModalVisible] = useState(false);

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
        { name: 'home', value: '1', icon: <MdOutlineHome size={32}/> },
        { name: 'book', value: '2', icon: <MdMenuBook size={32}/> },
        { name: 'project', value: '3', icon: <MdDesignServices size={32}/> },
        { name: 'game', value: '4', icon: <GrGamepad size={32}/> },
        { name: 'movie', value: '5', icon: <BiCameraMovie size={32}/> },
    ];

    const sortType = [
        { name: 'priority', value: '1', icon: <PiArrowFatUp size={20}/> },
        { name: 'title', value: '2', icon: 'A' },
        { name: 'percent', value: '3', icon: <PiChartPieSliceFill size={20}/> },
        { name: 'time_est', value: '4', icon: <BiTimer size={20}/> },
        { name: 'created_at', value: '5', icon: <TbCalendarTime size={20}/> },
    ];

    const handleQueryChange = async (queryChange) => {
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
        let endPoint = (query.category === 'home') ? '/api/goals' : '/api/goalSelect';
        console.log("Endpoint is: " + endPoint);
        try {
            const response = await axios.get(endPoint, { params: query });
            setResultData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };      

    const handleCardClick = (clickedGoalId) => {
        console.log("registered card click...");
        const clickedGoalData = resultData.find((goal) => goal.goal_id === clickedGoalId);
        setGoalData(clickedGoalData);
        console.log("Clicked Goal Data:", JSON.stringify(clickedGoalData, null, 2));
        setGoalModalVisible(true);
    };

    const handleModalClose = () => {
        setGoalModalVisible(false);
    };

    const handleDeleteGoal = async () => {
        const prevGoalData = goalData;
        try {
            const response = await axios.delete(`/api/goal/${prevGoalData.goal_id}`);
            setGoalModalVisible(false);
            fetchDataFromAPI(goalQuery);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    const handleAddClick = async () => {
        setGoalData({});
        setGoalModalVisible(true);
    }

    const handleAddGoal = async (updatedData) => {
        try {
            const newData = {...updatedData, complete: false};
            const response = await axios.post(`/api/goal`, newData);
            setGoalModalVisible(false);
            fetchDataFromAPI(goalQuery);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleSaveChanges = async (updatedData) => {
        if(goalData.goal_id){
            const prevGoalData = goalData;
            const mergedData = { ...prevGoalData, ...updatedData };
            try {
                const response = await axios.put(`/api/goal/${prevGoalData.goal_id}`, mergedData);
                setGoalModalVisible(false);
                fetchDataFromAPI(goalQuery);
            } catch (error) {
                console.error('Error updating data:', error);
            }
        } else {handleAddGoal(updatedData);}
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
            <div className="px-3">
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
                            data-toggle="tooltip" 
                            title={`Sort by ${sort.name}`}
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
                    <span className="position-absolute top-30 start-90 translate-middle p-1 bg-danger border border-light rounded-circle">
                        <span className="visually-hidden">New alerts</span>
                    </span>
                    <BiBell size={24} style={{color:"#6c757d"}} className="mx-2"/>
                    <FaRegCalendarCheck size={24} style={{color:"#6c757d"}} className="mx-1"/>
                </div>
            </ButtonToolbar>
            </div>
            <div className="bg-light">
            <ResultsList 
                resultData={resultData}  
                onCardClick={handleCardClick}
            />
            </div>
            {isGoalModalVisible && (
                <GoalModal
                    goalData={goalData}
                    show={isGoalModalVisible}
                    onDelete={handleDeleteGoal}
                    onClose={handleModalClose}
                    onSaveChanges={handleSaveChanges}
                />
            )}
            <div>
              <Button variant="outline-primary" className='me-auto m-3' onClick={handleAddClick}>ADD</Button>
            </div>
        </>
    );
}
