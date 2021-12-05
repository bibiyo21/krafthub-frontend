import React from "react";
import { Navbar, Container, Nav,NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthenticationAPI from "../api/services/Authentication/AuthenticationService";

const Navigations = () => {

  const user = JSON.parse(localStorage.getItem('user'))

  const logout = () => {
    AuthenticationAPI.logout().then(() => {
      window.location.replace("/");
    })
  }
  return (
    <Navbar collapseOnSelect expand="lg"  variant="light">
      <Container>
        <Link to={"/home"} className="navbar-brand me-auto">KraftHub</Link>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav >
            <Link to={"/my-job"} className="nav-link">My Job</Link>
            {/* <Link to={"/home"} className="nav-link">List</Link>
            <Link to={"/home"} className="nav-link">Become A Maker</Link>
            <Link to={"/home"} className="nav-link">Profile</Link> */}
          </Nav>
        </Navbar.Collapse>
        {
          user !== null 
            ? <Nav>
                <NavDropdown title={<span><i className="fas fa-user"></i> Hi, {user.first_name} </span>}>
                  <NavDropdown.Item onClick={() => {logout()}}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
          : <Nav>
            <Link to={"/login"} className="btn btn-primary"><i className="fas fa-lock"></i> Login</Link>
          </Nav>
        }
        
        
      </Container>
    </Navbar>
  );
};

export default Navigations;
