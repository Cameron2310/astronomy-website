import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "js-cookie";

import "./NavBar.css";

export default function NavBar() {
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
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Astronomy Site</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {navBarCategories.map((category, i) => {
              return (
                <Nav.Link href={`/${category}/`} key={i}>
                  {category}
                </Nav.Link>
              );
            })}
            <Nav.Link href="/Community/">Community</Nav.Link>
            {Cookies.get("UID") ? (
              <div>
                <Nav.Link href="/Login/">Dashboard</Nav.Link>
                <div
                  style={{
                    position: "absolute",
                    right: 50,
                    top: 0,
                    margin: "15px",
                    padding: 0,
                  }}
                >
                  <input
                    type="button"
                    name="logout"
                    value="Logout"
                    onClick={logout}
                  />
                </div>
              </div>
            ) : (
              <Nav.Link href="/login/">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
