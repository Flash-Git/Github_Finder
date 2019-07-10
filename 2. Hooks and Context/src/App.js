import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from "./context/github/GithubState";

import './App.css';

library.add(faGithub, faInfoCircle, faCheckCircle, faTimesCircle);

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      });

    //eslint-disable-next-line
  }, []);

  const searchUsers = text => {
    setLoading(true);

    axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => {
        setUsers(res.data.items);
        setLoading(false);
      });
  };

  const getUser = username => {
    setLoading(true);

    axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      });
  };

  const getUserRepos = username => {
    setLoading(true);

    axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => {
        setRepos(res.data);
        setLoading(false);
      });
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({msg, type});
    setTimeout(() => setAlert(null), 5000);
  };

  return <GithubState>
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={ alert } />
          <Switch>
            <Route exact path="/" render={
              props => (
                <Fragment>
                  <Search showClear={ users.length > 0 ? true : false }
                    searchUsers={ searchUsers }
                    clearUsers={ clearUsers }
                    setAlert={ showAlert }
                  />
                  <Users loading={ loading }
                    users={ users }
                  />
                </Fragment>
              )
            } />
            <Route exact path="/about" component={ About } />
            <Route exact path="/user/:login" render={
              props => (
                <User { ...props } getUser={ getUser } getUserRepos={ getUserRepos } user={ user } repos= { repos } loading={ loading } />
              )
            } />
          </Switch>
        </div>
      </div>
    </Router>
  </GithubState>;
};

export default App;