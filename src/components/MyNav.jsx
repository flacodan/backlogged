import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                    <Nav className="me-auto">
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                            User Info
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                            Preferences
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">
                            Log out
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                <Navbar.Brand href="#home">\\\\\\\\\\ Backlogged _____</Navbar.Brand>
            </Container>
            <Navbar.Text className="ml-auto">
                twsgd
            </Navbar.Text>
        </Navbar>
    );
}

export default BasicExample;