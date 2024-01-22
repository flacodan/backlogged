import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export default function MainNav({ leftLinks, rightLinks}) {
    return (
        <Navbar expand="lg" className="navbar-light">
            <Container fluid>
                <Nav className="me-auto">
                    leftLinks={[
                        { url: '#', text: 'User Details' },
                        { url: '#', text: 'Preferences' },
                        { url: '#', text: 'Logout' },
                    ]}
                    {leftLinks.map(({ url, text }, index) => (
                        <Nav.Link key={index} href={url}>
                            {text}
                        </Nav.Link>
                    ))}
                </Nav>
                <Navbar.Brand>\\\\\\\\\\\\\\\\\\\\\\\ BACKLOGGED_____</Navbar.Brand>
                <Nav>Right</Nav>
            </Container>
        </Navbar>
    );
};


{/* <div>
<button>Menu</button>
<p>\\\\\\\\\\\\\\\\\\\\\\\ BACKLOGGED_____</p>
<button>EN</button>
</div> */}