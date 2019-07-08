import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Navbar extends Component {
  render() {
    return(
      <nav className="navbar bg-primary">
        <h1>
          <FontAwesomeIcon icon={["fab", "github"]} /> Navbar
        </h1>
      </nav>
    );
  }
}

export default Navbar;

//<i class="fab fa-github"></i>