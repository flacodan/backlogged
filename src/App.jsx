import { useState } from 'react'
import './App.css'
import NavBarTop from '../components/NavBarTop.jsx'
import GoalController from '../components/GoalController.jsx'

function App() {
  return (
    <>
      <NavBarTop/>
      <GoalController/>
      <div id="footerAdd">
        <button>ADD</button>
      </div>
    </>
  )
}

export default App
