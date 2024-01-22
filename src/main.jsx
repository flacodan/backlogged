import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

//import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom';

//const router = createBrowserRouter(
  //create routes 
// );

//ReactDom.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router = {router}/>
//     </React.StrictMode>
// )