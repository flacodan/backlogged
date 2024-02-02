import React, {useState} from 'react';
import { Navbar, Offcanvas, Container, Nav, Button } from 'react-bootstrap';
import { BiMenu, BiBell } from 'react-icons/bi';
import { MdLanguage } from "react-icons/md";

const ExNavbar = ({ onLogout }) => {

    const handleLanguageClick = () => {
        // do stuff here
    };

    
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    

    const onLogoutSelect = () => {    
        // event.stopPropagation();
        console.log("Clicked logout in menu");
        onLogout();
    }

    const handleSelect = (eventKey) => {
        console.log("Nav.handleSelect" + +eventKey===3);
        if(+eventKey===3){
            onLogoutSelect();
        };
        handleClose();
        // alert(`selected ${eventKey}`)
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
                <Offcanvas.Title>\\\\ Backlogged Menu</Offcanvas.Title>
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
        <Navbar.Brand href="#" className='mb-0 h1 fs-2' style={{color:"#6c757d", fontSize:'52'}}>\\\\\ Backlogged \\\\\</Navbar.Brand>
        <span className="position-absolute top-30 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
        </span>
        <BiBell size={24} style={{color:"#6c757d"}} className="mx-2"/>
    </Navbar>
    );
};

export default ExNavbar;
