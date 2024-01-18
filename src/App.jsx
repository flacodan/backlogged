import { useState } from 'react';
import './App.css';
import MainNav from '../components/MainNav.jsx';
import GoalController from '../components/GoalController.jsx';
import AltNav from '../components/AltNav.jsx';

function App() {
  return (
    <>
      <AltNav></AltNav>
      <GoalController/>
      <div id="footerAdd">
        <button>ADD</button>
      </div>
    </>
  );
}

export default App;
