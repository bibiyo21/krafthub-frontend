import React from "react";
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
};

export default Navigations;
