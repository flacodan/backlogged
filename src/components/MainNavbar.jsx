import React, {useState} from 'react';
import { Navbar, Offcanvas, Container, Nav, Button } from 'react-bootstrap';
import { BiMenu, BiBell } from 'react-icons/bi';
import { MdLanguage } from "react-icons/md";

const MainNavbar = ({ onLogout, onUserInfo }) => {

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
                    <Offcanvas.Title style={{color:"#6c757d"}}>\\\ Backlogged Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="mx-auto">
                        <Nav.Link eventKey="1">User Info</Nav.Link>
                        <Nav.Link eventKey="2">Preferences</Nav.Link>
                        <Nav.Link eventKey="3">Log out</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>       
            <Navbar.Brand className='mb-0 h1 fs-2' style={{color:"#6c757d", fontSize:'52'}}>\\\ Backlogged \\\</Navbar.Brand>
            <Nav className="ml-auto">
                <MdLanguage size={20} style={{color:"#6c757d"}} onClick={handleLanguageClick} />
            </Nav>
        </Navbar>
    );
};

export default MainNavbar;
