import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Button, Alert } from 'react-bootstrap';
import { Container, ButtonToolbar } from "react-bootstrap";
import { MdOutlineHome, MdMenuBook, MdDesignServices, MdOutlinePriorityHigh } from "react-icons/md";
import { BiCameraMovie, BiTimer, BiBell } from "react-icons/bi";
import { GrGamepad } from "react-icons/gr";
import { TbCalendarTime } from "react-icons/tb";
import { PiChartPieSliceFill, PiArrowFatUp } from "react-icons/pi";
import { FaRegCalendarCheck } from "react-icons/fa";
import ResultsList from './ResultsList';
import GoalModal from "./GoalModal";


export default function BacklogPage() {

    
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

    //getUserSortPrefs()  !!!!!!!!! to do !!!!!!!!!!!!!!!!!!
    
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
    const [showAlertBadge, setShowAlertBadge] = useState(false);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/goals', { params: goalQuery });
                if (response.status === 200) {
                    setResultData(response.data);
                } else {
                    console.error('Unexpected status code:', response.status);
                }
            } catch (err) {
                //console.error('Error loading data: ', err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const checkUpcomingGoals = async () => {
          try {
              const response = await axios.get('/api/upcomingGoalsExist');
              const { count } = response.data;
              console.log("Count gt 0? " + count + " " + (+count > 0));
              setShowAlertBadge(count > 0);
              console.log("showalert " + showAlertBadge);
          } catch (error) {
              console.error('Error checking upcoming goals:', error);
          }
        };
        checkUpcomingGoals();
    }, []);


    const categories = [
        { name: 'home', value: '1', icon: <MdOutlineHome size={30}/> },
        { name: 'book', value: '2', icon: <MdMenuBook size={30}/> },
        { name: 'project', value: '3', icon: <MdDesignServices size={30}/> },
        { name: 'game', value: '4', icon: <GrGamepad size={30}/> },
        { name: 'movie', value: '5', icon: <BiCameraMovie size={30}/> },
    ];

    const sortType = [
        { name: 'priority', value: '1', icon: <PiArrowFatUp size={18}/> },
        { name: 'title', value: '2', icon: 'A' },
        { name: 'percent', value: '3', icon: <PiChartPieSliceFill size={18}/> },
        { name: 'time_est', value: '4', icon: <BiTimer size={18}/> },
        { name: 'created_at', value: '5', icon: <TbCalendarTime size={18}/> },
    ];

    const handleQueryChange = async (queryChange) => {
        setGoalQuery((prevQuery) => {
            const updatedQuery = { ...prevQuery, ...queryChange };
            fetchDataFromAPI(updatedQuery);
            return updatedQuery;
        })
    };

    const fetchDataFromAPI = async (query) => {
        let endPoint = (query.category === 'home') ? '/api/goals' : '/api/goalSelect';
        try {
            const response = await axios.get(endPoint, { params: query });
            setResultData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };      

    const getUpcomingItems = async () => {
        console.log("getUpcomingItems showbadge: " + showAlertBadge);
        if (showAlertBadge) {
            try {
                const response = await axios.get('/api/upcomingGoalsExist');
                const { count, rows } = response.data;
                setResultData(rows);
            } catch (error) {
                console.error('Error getting upcoming goals:', error);
            }
        }
    };

    const handleCardClick = (clickedGoalId) => {
        const clickedGoalData = resultData.find((goal) => goal.goal_id === clickedGoalId);
        setGoalData(clickedGoalData);
        setGoalModalVisible(true);
    };

    const handleGoalModalClose = () => {
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

    const handleCompleteClick = async (event, clickedGoalId) => {
      const clickedGoalData = resultData.find((goal) => goal.goal_id === clickedGoalId);
      if(!clickedGoalData.complete){
        let newDate = null;
        if(!clickedGoalData.complete_date){
            newDate = {complete_date: Date.now()}
        }
        const newComplete = { complete: true };
        const mergedData = {...newComplete, ...newDate, percent: 100 };
        try {
                const response = await axios.put(`/api/goal/${clickedGoalId}`, mergedData);
                fetchDataFromAPI(goalQuery); 
            } catch (error) {
                console.error('Error updating data:', error);
            }
        // !!!!!!!!!!!!!!!!send alert to verify the action!!!!!!!!!!!!!!!!!!!!!!
      }
    };

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
        <span>
            <div className="mt-1 px-3 pt-1">
                <ButtonGroup size="lg" className="d-flex justify-content-between">
                    {categories.map((category, idx, icon) => (
                        <ToggleButton
                            className=""
                            key={idx}
                            id={`category-${idx}`}
                            type="radio"
                            size="lg"
                            variant="outline-secondary"
                            data-toggle="tooltip" 
                            title={`Filter by ${category.name}`}
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
                    <ToggleButton
                        className=""
                        variant="outline-secondary"
                        size="lg"
                        type="radio"
                        data-toggle="tooltip" 
                        title={`Show Alerts`}
                        checked={ false }
                        style={{ position: 'relative' }}
                        onClick={getUpcomingItems}
                    >
                        {showAlertBadge && (
                            <span className="position-absolute top-60 end-0 translate-middle p-1 bg-danger border border-light rounded-circle" style={{ zIndex: 1 }}>
                                <span className="visually-hidden">New alerts</span>
                            </span>
                        )}
                        <BiBell
                            size={24}
                            style={{ color: "#6c757d" }}
                        />
                    </ToggleButton>
                </ButtonGroup>
            </div>
            <div className="px-3 pb-1 pt-1">
                <ButtonGroup className="xs-6">
                    {sortType.map((sort, idx, icon) => (
                        <ToggleButton
                            className=" rounded-0"
                            key={idx}
                            id={`sort-${idx}`}
                            type="radio"
                            variant="outline-secondary"
                            size="xs"
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
                    <ToggleButton variant="secondary" disabled></ToggleButton>
                    <ToggleButton
                        className=" rounded-0"
                        variant="outline-secondary"
                        size="xs"
                        type="checkbox"
                        data-toggle="tooltip" 
                        title={`Show completed`}
                        checked={ goalQuery.complete }
                        onClick={() => {
                            handleQueryChange({ complete: !goalQuery.complete })
                        }}
                    >
                        <FaRegCalendarCheck size={18} className="mx-1"/>
                    </ToggleButton>
                </ButtonGroup>
                <div>
                </div>
            </div>
            <div className="bg-light border">
            <ResultsList 
                resultData={resultData}  
                onCardClick={handleCardClick}
                onClickComplete={handleCompleteClick}
            />
            </div>
        </span>
            {isGoalModalVisible && (
                <GoalModal
                    goalData={goalData}
                    show={isGoalModalVisible}
                    onDelete={handleDeleteGoal}
                    onClose={handleGoalModalClose}
                    onSaveChanges={handleSaveChanges}
                />
            )}
            <div className="d-grid gap-2 m-3">
              <Button variant="outline-secondary" onClick={handleAddClick}>ADD</Button>
            </div>
        </>
    );
}

// !!!!!!!!!!!!!! add variant="flush" to togglebuttons to remove borders and color !!!!!!!!!!!!!!!!!!!