import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


const Navigations = () => {
  return (
    <Navbar collapseOnSelect expand="lg"  variant="light">
      <Container>
        <Link to={"/home"} className="navbar-brand">KraftHub</Link>
        {/* <Navbar.Collapse id="responsive-navbar-nav">
          <Nav >
            <Link to={"/home"} className="nav-link">About Us</Link>
            <Link to={"/home"} className="nav-link">List</Link>
            <Link to={"/home"} className="nav-link">Become A Maker</Link>
            <Link to={"/home"} className="nav-link">Profile</Link>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default Navigations;
