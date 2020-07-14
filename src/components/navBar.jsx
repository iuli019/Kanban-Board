import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <Link className="navbar-brand my-2" to="/board">
        React Board
      </Link>
      {!user && (
        <React.Fragment>
          <NavLink className="nav-item nav-link text-dark" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link text-dark" to="/register">
            Register
          </NavLink>
        </React.Fragment>
      )}

      {user && (
        <React.Fragment>
          <NavLink className="nav-item nav-link text-dark" to="/profile">
            {user.name}
          </NavLink>
          <NavLink className="nav-item nav-link text-dark" to="/logout">
            Logout
          </NavLink>
        </React.Fragment>
      )}
    </nav>
  );
};

export default NavBar;
