import React from 'react';
import './App.css';
import GoalController from './components/GoalController.jsx';
// import MainNav from './components/MainNav.jsx';
import Navnav from './components/Navnav.jsx';
// import MyNav from './components/MyNav.jsx';

function App() {
  return (
    <>
      <Navnav />
      <GoalController />
      <div id="footerAdd">
        <button>ADD</button>
      </div>
    </>
  );
}

export default App;
