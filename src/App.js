import React, { Component } from 'react';
import axios from "axios";
import './App.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

library.add(faGithub);

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading:true });
    const res = await axios.get("https://api.github.com/users");

    this.setState({users: res.data, loading: false });
  }

  render(){
    return(
      <div className="App">
        <Navbar />
        <div className="container">
          <Users loading={ this.state.loading } users={ this.state.users } />
        </div>
      </div>
    );
  }
}

export default App;
