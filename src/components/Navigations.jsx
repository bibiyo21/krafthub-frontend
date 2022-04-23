import React from "react";
import AuthenticationAPI from "../api/services/Authentication/AuthenticationService";

const Navigations = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    AuthenticationAPI.logout().then(() => {
      window.location.replace("/");
    });
  };

  return (
    <header className="header-area header-sticky background-header">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="/" className="logo">
                KRAFTHUB
              </a>
              <ul className="nav">
                <li className="has-sub">
                  <a href="javascript:void(0)">
                    <i className="fas fa-user"></i> Hi, {user.first_name}
                  </a>
                  <ul className="sub-menu">
                    {user.access_level === 4 && (
                      <li>
                        <a href="/admin/user-management">Admin</a>
                      </li>
                    )}

                    <li>
                      <a
                        href="javascript:void(0);"
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigations;
