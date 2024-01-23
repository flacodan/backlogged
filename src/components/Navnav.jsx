import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BiMenu } from 'react-icons/bi';
import { MdLanguage } from "react-icons/md";

const AppNavbar = () => {
  const handleMenuToggle = () => {
    // Implement your menu toggle logic here
  };

  const handleIcon1Click = () => {
    // Implement logic for icon 1 click
  };

  const handleLanguageClick = () => {
    // Implement logic for icon 2 click
  };
//fixed="top"
  return (
    <Navbar bg="light" expand="lg" className='sticky-top'>
      <Container>
        <Navbar.Brand href="#" className='me-auto'>\\\\\\\\\ Backlogged _____</Navbar.Brand>
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
          {/* Icons or buttons on the right */}
          <Button variant="link" onClick={handleLanguageClick}>
            <MdLanguage />
          </Button>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
