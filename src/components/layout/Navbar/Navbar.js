import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar bg-danger">
      <h1>
        <Link style={{ textDecoration: "none" }} to="/">
          <i className={icon}>{title}</i>
        </Link>
      </h1>
      <ul style={{ display: "flex", listStyle: "none" }}>
        <li>
          <Link className="p-2" to="/">
            Home
          </Link>
        </li>{" "}
        <li>
          <Link className="p-2  " to="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
export default Navbar;
