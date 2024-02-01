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
    console.log("Loading app.jsx in useeffect");
    const checkForUserSession = async () => {
      try {
          const response = await axios.get('/api/checkSession');
          console.log("useEffect after api call: userSession? " + response.data);
          setLoginVisible(response.data ? false : true);
      } catch (err) {
          console.error('Error loading data: ', err);
      }
  };
  checkForUserSession();
    // if(checkForUserSession()){
    //   console.log("useEffect: session user exists");
    //   //if already logged in, make sure user's data is shown, don't show loginmodal
    //   setLoginVisible(false);
    // } else {
    //   console.log("useEffect: no session user");
    //   //if not logged in, show loginModal
    //   setLoginVisible(true);
    // }
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
      console.log("in App handle login ", JSON.stringify(formData, null, 2));
      const response = await axios.post(`/api/auth`, formData);
      
      console.log("App.handleLogin formdata sent to api ", JSON.stringify(formData, null, 2));
      console.log(response);
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
    // Use a better way to handle a user that reloads page, state will reset!!!!!!!!! Use a session variable!!!!!!!!!!!!!
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout');
      // if status 200, then send success alert and reload page (hiding results and showing modal)
      // console.log("Yikes! How did you do this? Stop it.");
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
