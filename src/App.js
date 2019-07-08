import React, { Component } from 'react';
import './App.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

library.add(faGithub);

class App extends Component {
  render(){
    return(
      <div className="App">
        <Navbar />
        <div className="container">
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
