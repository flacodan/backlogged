import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import LoginModal from './components/LoginModal.jsx';
import GoalController from './components/GoalController.jsx';
import MainNavbar from './components/MainNavbar.jsx';
import HintModal from './components/HintStartModal.jsx';

function App() {
  
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isHintModalVisible, setHintModalVisible] = useState(false);


  const handleHintClose = () => {
    setHintModalVisible(false);
  };


  useEffect(() => {
    const checkForUserSession = async () => {
      try {
          console.log("App.useEffect running...");
          const response = await axios.get('/api/checkSession');
          setLoginVisible(response.data ? false : true);
      } catch (err) {
          console.error('Error loading data: ', err);
      }
  };
  checkForUserSession();
  }, []);

  const handleCreateUser = async (formData) => {
    // formData = { username: 'bob1@example.com', password: 'password' };
    // create user response format: [{"user_id":22,"password":"asdgasdgasf","username":"ewsy45esg@sgd.net"},true]
    try {
      const response = await axios.post(`/api/createUser`, formData); //if returns true, user did not exist, created it!!!!!!!!!!!!!!
      console.log("Tried to create " + JSON.stringify(formData));
      const [user, created] = response.data;
      console.log("User is now: " + JSON.stringify(user));
      console.log("created is: " + JSON.stringify(created));
      console.log("CreateUser " + JSON.stringify(response.data));
      if(created){ 
        setLoginVisible(false);
        setHintModalVisible(true);
      } else {
        // if false, notify user that the user already exists, change to login screen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log("User already exists, switch to Log In or choose a different email address.");
      }
    } catch (error) {
        console.error('Error creating user:', error);
    };
  };
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! after creating new user, add goal did not seem to work... or maybe needed to wait 12 sec? !!!!!!!!!!!!!!!!!

  
  // const showHint = async () => {
  //     try {
  //         const numGoals = await axios.get(`/api/countUserGoals`);
  //         if(count === 0) { 
  //             console.log("User has records: " + count);
  //             setHintModalVisible(true);
  //         }
  //     } catch (error) {
  //       console.error('Error counting users items:', error);
  //     }
  // };

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(`/api/auth`, formData);
      if(response.length === 0){
        console.log("App.handleLogin bad response" + JSON.stringify(response.data));
        // or window.alert("Wrong email or password")
        // if incorrect, warn user to try again: window.confirm("An account does not exist with this email address: " + email);
      } else {
        console.log("App.handleLogin Success!" + JSON.stringify(response.data));
        // load page using prefs!!!!!!!!!!!!!!!!!!!!!
        setLoginVisible(false);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    };
    window.location.reload(true);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout');
      // if status 200, then send success alert and reload page (hiding results and showing modal)
      // console.log("Yikes! How did you do this? Stop it.");
    } catch (error) {
      console.error('Error logging out:', error);
    }
    window.location.reload(true);
  }

  return (
    <>
      {isLoginVisible && (
          <LoginModal
              show={isLoginVisible}
              onCreateUser={handleCreateUser}
              onLogin={handleLogin}
          />
      )}
      <MainNavbar 
        onLogout={handleLogout}
      />
      {!isLoginVisible && (
        <GoalController />
      )}
      {isHintModalVisible && (
          <HintModal
              show={isHintModalVisible}
              onClose={handleHintClose}
          />
      )}
    </>
  );
}

export default App;
