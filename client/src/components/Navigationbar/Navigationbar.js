import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./Navigationbar.css";
export default function Navigationbar() {

  const onLogout = () => {
    localStorage.setItem('token', "");
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="" variant="dark">
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/history">History</Nav.Link>
            <Nav.Link href="/compose">Compose Mail</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/" onClick={onLogout}>Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
