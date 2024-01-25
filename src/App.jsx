import React, { useState, useEffect } from 'react';
import './App.css';
import LoginModal from './components/LoginModal.jsx';
import GoalController from './components/GoalController.jsx';
// import MainNav from './components/MainNav.jsx';
import Navnav from './components/Navnav.jsx';
// import MyNav from './components/MyNav.jsx';

function App() {
  
const [isLoginVisible, setLoginVisible] = useState(false);

useEffect(() => {
  //if already logged in, do nothing
  //if not logged in, show loginModal
}, []);

  return (
    <>
      {isLoginVisible && (
          <LoginModal
              onClose={handleModalClose}
          />
      )}
      <Navnav />
      <GoalController />
    </>
  );
}

export default App;
