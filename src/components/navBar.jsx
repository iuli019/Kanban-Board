import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap/";

function NavBar({ user }) {
  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-dark  mb-5">
      <Link className="navbar-brand text-light my-2" to="/">
        Kanban Board
      </Link>
      {!user && (
        <React.Fragment>
          <NavLink className="nav-item nav-link text-light" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link text-light" to="/register">
            Register
          </NavLink>
        </React.Fragment>
      )}

      {user && (
        <React.Fragment>
          <NavLink className="nav-item nav-link text-light" to="/profile">
            {user.name}
          </NavLink>
          <NavLink className="nav-item nav-link text-light" to="/logout">
            Logout
          </NavLink>
        </React.Fragment>
      )}
    </Navbar>
  );
}

export default NavBar;
