import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import LoginModal from './components/LoginModal.jsx';
import GoalController from './components/GoalController.jsx';
import MainNav from './components/MainNav.jsx';
import AppNavbar from './components/AppNavbar.jsx';
import ExNavbar from './components/MyNav.jsx';

function App() {
  
const [isLoginVisible, setLoginVisible] = useState(false);

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
    try {
      const response = await axios.post(`/api/createUser`, formData);
      console.log("Tried to create " + formData + " response: " + response.data); //if returns true, user did not exist, created it!!!!!!!!!!!!!!
      // if session user is created, hide login and load page with users items
      //if false, notify user that the user already exists, change to login screen!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      setLoginVisible(false);
    } catch (error) {
        console.error('Error creating user:', error);
    };
  };

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
        console.log("App.handleLogin, just closed login modal");
      }
    } catch (error) {
      console.error('Error updating data:', error);
    };
    // there is a delay after this
    console.log("App.handleLogin exiting...");
    window.location.reload(true);
  };

  const handleLogout = async () => {
    try {
      console.log("App.handleLogout, about to call api");
      const response = await axios.post('/api/logout');
      console.log("Api called, result: " + response);
      // if status 200, then send success alert and reload page (hiding results and showing modal)
      // console.log("Yikes! How did you do this? Stop it.");
    } catch (error) {
      console.error('Error logging out:', error);
    }
    console.log("App.handleLogout exiting...");
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
      <ExNavbar 
        onLogout={handleLogout}
      />
      {!isLoginVisible && (
        <GoalController />
      )}
    </>
  );
}

export default App;
