import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <Link className="navbar-brand my-2" to="/board">
        React Board
      </Link>
      <NavLink className="nav-item nav-link text-dark" to="/login">
        Login
      </NavLink>
      <NavLink className="nav-item nav-link text-dark" to="/register">
        Register
      </NavLink>

      {/* <NavLink className="nav-item nav-link text-dark" to="/logout">
        Logout // when logged + register and login remove when signed in
      </NavLink> */}
    </nav>
  );
};

export default NavBar;
