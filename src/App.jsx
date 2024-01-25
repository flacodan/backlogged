import React from 'react';
import './App.css';
import GoalController from './components/GoalController.jsx';
// import MainNav from './components/MainNav.jsx';
import Navnav from './components/Navnav.jsx';
// import MyNav from './components/MyNav.jsx';
import { Button } from 'react-bootstrap';


function App() {
  return (
    <>
      <Navnav />
      <GoalController />
      <div id="footerAdd">
        <Button variant="outline-primary" className='me-auto m-3'>ADD</Button>
      </div>
    </>
  );
}

export default App;
