import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import LoginModal from './components/LoginModal.jsx';
import GoalController from './components/GoalController.jsx';
import MainNavbar from './components/MainNavbar.jsx';
import HintModal from './components/HintStartModal.jsx';
import UserInfoModal from './components/UserInfoModal.jsx';

function App() {
  
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isHintModalVisible, setHintModalVisible] = useState(false);
  const [isUserModalVisible, setUserModalVisible] = useState(false);
  const [user, setUser] = useState("test");


  const handleHintClose = () => { setHintModalVisible(false); };
  const handleUserClose = () => { setUserModalVisible(false); };
  const handleUserOpen = () => { setUserModalVisible(true); };


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
      const [userdata, created] = response.data;
      const username = userdata.username;
      if(created){ 
        setLoginVisible(false);
        setHintModalVisible(true);
        setUser(username);
      } else {
        // if false, notify user that the user already exists, change to login screen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        alert("User already exists! Choose 'Log In' instead or choose a different email address.");
        console.log("User already exists, switch to Log In or choose a different email address.");
      }
    } catch (error) {
        console.log("create didn't work");
        console.error('Error creating user:', error);
    };
  };
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! after creating new user, add goal did not appear for 15sec, delete had same lag !!!!!!!!!!!!!!!!!


  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(`/api/auth`, formData);
      if(response.status != 200){
        console.log("App.handleLogin bad response" + JSON.stringify(response.data));
        // or window.alert("Wrong email or password")
        // if incorrect, warn user to try again: window.confirm("An account does not exist with this email address: " + email);
      } else {
        console.log("App.handleLogin Success!" + JSON.stringify(response.data));
        // load page using prefs!!!!!!!!!!!!!!!!!!!!!
        setLoginVisible(false);
        const {user_id, username} = response.data;
        setUser(prevUser => username);
        console.log("Logged in as " + username);
      }
    } catch (error) {
      console.log("Error logging in");
      console.error('Error updating data:', error);
    };
    window.location.reload(true);
    
    console.log("Logged in as (end) " + user);
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
        onUserInfo={handleUserOpen}
      />
      {!isLoginVisible && (
        <GoalController />
      )}
      {isHintModalVisible && (
          <HintModal
              show={isHintModalVisible}
              onHintClose={handleHintClose}
          />
      )}
      {isUserModalVisible && (
          <UserInfoModal
              show={isUserModalVisible}
              onHintClose={handleUserClose}
              userInfo={user}
          />
      )}
    </>
  );
}

export default App;
