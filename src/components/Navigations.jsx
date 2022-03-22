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

  return (<header class="header-area header-sticky background-header">
      <div class="container">
          <div class="row">
              <div class="col-12">
                  <nav class="main-nav">
                      <a href="/" class="logo">
                          KRAFTHUB
                      </a>
                      <ul class="nav">
                          {/* <li class="scroll-to-section active"><a href="#top" class="">Home</a></li>
                          <li><a href="meetings.html">Meetings</a></li>
                          <li class="scroll-to-section"><a href="#apply">Apply Now</a></li> */}
                          <li class="has-sub">
                              <a href="javascript:void(0)"><i className="fas fa-user"></i> Hi, {user.first_name}</a>
                              <ul class="sub-menu">
                                  <li><a href="/profile">My Profile</a></li>
                                  <li><a href="javascript:void(0);" onClick={() => {logout()}}>Logout</a></li>
                              </ul>
                          </li>
                      </ul>        
                      <a class="menu-trigger">
                          <span>Menu</span>
                      </a>
                  </nav>
              </div>
          </div>
      </div>
  </header>)

  return (
    <Navbar collapseOnSelect expand="lg"  variant="light">
      <Container>
        <Link to={"/home"} className="navbar-brand me-auto">KraftHub</Link>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav >
            {/* <Link to={"/home"} className="nav-link">List</Link>
            <Link to={"/home"} className="nav-link">Become A Maker</Link>
            <Link to={"/home"} className="nav-link">Profile</Link> */}
          </Nav>
        </Navbar.Collapse>
        {
          user !== null 
            ? <Nav>
                <NavDropdown title={<span><i className="fas fa-user"></i> Hi, {user.first_name} </span>}>
                  {user.access_level === 4 && <NavDropdown.Item href="/admin/settings">Admin Settings</NavDropdown.Item>}
                  <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
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
