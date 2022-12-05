import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./NavBar.css";

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Astronomy Site</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Our Solar System" id="basic-nav-dropdown">
              <NavDropdown.Item href=""></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="The Universe" id="basic-nav-dropdown">
              <NavDropdown.Item href=""></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Cosmic Wonders" id="basic-nav-dropdown">
              <NavDropdown.Item href=""></NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="">Login</Nav.Link>

            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                margin: "15px",
                padding: 0,
              }}
            >
              <input
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input type="submit" name="submit" value="Search" />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
