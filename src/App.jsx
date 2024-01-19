import './App.css';
import GoalController from './components/GoalController.jsx';
import MainNav from './components/MainNav.jsx';

function App() {
  return (
    <>
      <MainNav/>
      <GoalController/>
      <div id="footerAdd">
        <button>ADD</button>
      </div>
    </>
  );
}

export default App;
