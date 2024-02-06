import React, {useState} from 'react';
import { Navbar, Offcanvas, Container, Nav, Button } from 'react-bootstrap';
import { BiMenu, BiBell } from 'react-icons/bi';
import { MdLanguage } from "react-icons/md";

const MainNavbar = ({ onLogout, onUserInfo }) => {
    const [showBadge, setShowBadge] = useState(false);

    const handleAlertClick = async () => {
        try {
            // Make API call to fetch goals with due dates within 7 days
            const goals = await ApiService.fetchGoalsWithin7Days();

            // Pass the fetched goals to ResultsList component
            // You might need to have a state in your parent component to pass this data
            // For simplicity, assuming there's a state called 'goals' and a setter function 'setGoals'
            setGoals(goals);
        } catch (error) {
            console.error('Error fetching goals:', error);
        }
    };

    const handleLanguageClick = () => {
        // do stuff here
    };

    
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const handleSelect = (eventKey) => {
        if(+eventKey===3){
            onLogout();
        } else if (+eventKey===2){
            // Open Preferences dialog
        } else if(+eventKey===1){
            // show user info dialog
            onUserInfo();
        }
        handleClose();
    };

    return (
        <Navbar 
            expand="fluid" 
            className='sticky-top mx-3 justify-content-between'
            onSelect={handleSelect}
        >
            <button 
                variant="outline-secondary" 
                className="navbar-toggler-icon" 
                onClick={handleShow}>
            </button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title style={{color:"#6c757d"}}>\\\\ Backlogged Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="mx-auto">
                        <Nav.Link eventKey="1">User Info</Nav.Link>
                        <Nav.Link eventKey="2">Preferences</Nav.Link>
                        <Nav.Link eventKey="3">Log out</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <MdLanguage size={20} style={{color:"#6c757d"}} onClick={handleLanguageClick} />
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>       
            <Navbar.Brand className='mb-0 h1 fs-2' style={{color:"#6c757d", fontSize:'52'}}>\\\\\ Backlogged \\\\\</Navbar.Brand>
            {showBadge && (
                <span className="position-absolute top-30 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                </span>
            )}
            <BiBell size={24} style={{color:"#6c757d"}} className="mx-2" onClick={handleAlertClick}/>
        </Navbar>
    );
};

export default MainNavbar;
