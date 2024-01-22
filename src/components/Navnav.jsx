import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BiMenu, BiCoffee, BiMusic } from 'react-icons/bi';

const AppNavbar = () => {
  const handleMenuToggle = () => {
    // Implement your menu toggle logic here
  };

  const handleIcon1Click = () => {
    // Implement logic for icon 1 click
  };

  const handleIcon2Click = () => {
    // Implement logic for icon 2 click
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">Your Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleMenuToggle}>
          <BiMenu />
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav" className="collapse"> {/* Add 'collapse' class */}
          <Nav className="me-auto">
            {/* Your navigation items go here */}
            <Nav.Link href="#item1">Item 1</Nav.Link>
            <Nav.Link href="#item2">Item 2</Nav.Link>
            <Nav.Link href="#item3">Item 3</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {/* Icons or buttons on the right */}
            <Button variant="link" onClick={handleIcon1Click}>
              <BiCoffee />
            </Button>
            <Button variant="link" onClick={handleIcon2Click}>
              <BiMusic />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
