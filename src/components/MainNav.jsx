import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';


export default function MainNav() {
  return (
    <>
        <Navbar expand="false" fixed="top" className="bg-body-tertiary mb-3" style={{ zIndex: 1000 }}>
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" />
                <Navbar.Offcanvas
                    aria-labelledby="offcanvasNavbarLabel-expand-false"
                    placement="start"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body h-auto="true" v-auto="true">
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="#action1">User Details</Nav.Link>
                            <Nav.Link href="#action2">Preferences</Nav.Link>
                            <Nav.Link href="#action3">Logout</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                <Navbar.Brand href="#">\\\\\\\\ Backlogged _______</Navbar.Brand>
            </Container>
        </Navbar>
    </>
  );
}
