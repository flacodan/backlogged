import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import LoginModal from './components/LoginModal.jsx';
import BacklogPage from './components/BacklogPage.jsx';
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
  console.log("App.useEffect Finished.");
  }, []);

  const handleCreateUser = async (formData) => {
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
        <BacklogPage />
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
