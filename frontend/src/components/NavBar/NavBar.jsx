import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "js-cookie";

import "./NavBar.css";

export default function NavBar() {
  // Description:
  // NavBar Component

  const navBarCategories = [
    "Our Solar System",
    "The Universe",
    "Cosmic Wonders",
  ];

  function logout() {
    Cookies.remove("UID");
    window.location = "/";
  }

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand className="nav-links">Astronomy Site</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="toggle-button"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-links" href="/">
              Home
            </Nav.Link>
            {navBarCategories.map((category, i) => {
              return (
                <Nav.Link className="nav-links" href={`/${category}/`} key={i}>
                  {category}
                </Nav.Link>
              );
            })}
            <Nav.Link className="nav-links" href="/Community/">
              Community
            </Nav.Link>
            {Cookies.get("UID") ? (
              <div>
                <Nav.Link className="nav-links" href="/Login/">
                  Dashboard
                </Nav.Link>
                <div className="input-div">
                  <input
                    type="button"
                    name="logout"
                    value="Logout"
                    onClick={logout}
                  />
                </div>
              </div>
            ) : (
              <Nav.Link className="nav-links" href="/login/">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
