import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BiMenu } from 'react-icons/bi';
import { MdLanguage } from "react-icons/md";

const AppNavbar = () => {
  const handleMenuToggle = () => {
    // Implement your menu toggle logic here
  };

  const handleLanguageClick = () => {
    // Implement logic for icon click
  };
  
  return (
    <Navbar expand="fluid" className='sticky-top mx-3'>
      {/* <Container> */}
        <Navbar.Brand href="#" className='mb-0 h1 fs-2' style={{color:"#6c757d", fontSize:'52'}}>\\\\\ Backlogged \\\\\</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleMenuToggle}>
          <BiMenu />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" className="collapse"> {/* Add 'collapse' class */}
          <Nav className="mx-auto">
            {/* Your navigation items go here */}
            <Nav.Link href="#item1">User Info</Nav.Link>
            <Nav.Link href="#item2">Preferences</Nav.Link>
            <Nav.Link href="#item3">Log out</Nav.Link>
          </Nav>
        <Nav className="ml-auto">
            <MdLanguage size={20} style={{color:"#6c757d"}} onClick={handleLanguageClick} />
        </Nav>
        </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
};

export default AppNavbar;
