import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Navbar extends Component {
  static defaultProps = {
    title: "Github Finder",
    icon: ["fab", "github"]
  };

  render() {
    return(
      <nav className="navbar bg-primary">
        <h1>
          <FontAwesomeIcon icon={ this.props.icon } /> { this.props.title }
        </h1>
      </nav>
    );
  }
}

export default Navbar;

//<i class="fab fa-github"></i>