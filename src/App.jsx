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
    //if already logged in, make sure user's data is shown, don't show loginmodal
    //if not logged in, show loginModal
  }, []);

  const handleCreateUser = async (formData) => {
    formData = { username: 'bob1@example.com', password: 'password' };
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
      const response = await axios.get(`/api/auth`, formData);
      if(response.length === 0){
        // or window.alert("Wrong email or password")
        // if incorrect, warn user to try again: window.confirm("An account does not exist with this email address: " + email);
      } else {
        // if correct, set some session or state or something with userId and set LoginVisible to false
        // load page using prefs!!!!!!!!!!!!!!!!!!!!!
        setLoginVisible(false);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    };
    // Use a better way to handle a user that reloads page, state will reset!!!!!!!!! Use a session variable!!!!!!!!!!!!!
  };

  // !!!!!!!!!! Logout function needed somewhere... set logged in to false or whatever method I used !!!!!!!!!!!!!!!!

  return (
    <>
      {isLoginVisible && (
          <LoginModal
              show={isLoginVisible}
              onCreateUser={handleCreateUser}
              onLogin={handleLogin}
          />
      )}
      <ExNavbar />
      {!isLoginVisible && (
        <GoalController />
      )}
    </>
  );
}

export default App;
