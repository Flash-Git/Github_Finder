import React, { Component } from 'react';
import axios from "axios";
import './App.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

library.add(faGithub);
library.add(faInfoCircle);

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  async componentDidMount() {
    this.setState({ loading:true });
    
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data, loading: false });
  }

  searchUsers = async text => {
    this.setState({ loading:true });

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
      this.setState({users: res.data.items, loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  }

  clearUsers = () => this.setState({ users: [], loading: false });

  render(){
    const { loading, users, alert } = this.state;

    return(
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={ alert } />
          <Search showClear={ users.length > 0 ? true : false } searchUsers={ this.searchUsers } clearUsers={ this.clearUsers } setAlert={ this.setAlert } />
          <Users loading={ loading } users={ users } />
        </div>
      </div>
    );
  };
}

export default App;