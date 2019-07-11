import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Navbar = ({ icon, title }) => (
  <nav className="navbar bg-primary">
    <h1>
      <FontAwesomeIcon icon={icon} /> {title}
    </h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </nav>
);

Navbar.defaultProps = {
  title: "Github Finder",
  icon: ["fab", "github"]
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.array.isRequired
};

export default Navbar;
