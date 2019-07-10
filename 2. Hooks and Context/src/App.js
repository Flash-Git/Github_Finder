import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
import AlertState from "./context/alert/AlertState";

import './App.css';

library.add(faGithub, faInfoCircle, faCheckCircle, faTimesCircle);

const App = () => {
  // useEffect(() => {
  //   setLoading(true);

  //   axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
  //     &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //     .then(res => {
  //       setUsers(res.data);
  //       setLoading(false);
  //     });

  //   //eslint-disable-next-line
  // }, []);

  return <GithubState> <AlertState>
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert />
          <Switch>
            <Route exact path="/" render={
              props => (
                <Fragment>
                  <Search />
                  <Users />
                </Fragment>
              )
            } />
            <Route exact path="/about" component={ About } />
            <Route exact path="/user/:login" component={ User } />
          </Switch>
        </div>
      </div>
    </Router>
  </AlertState> </GithubState>;
};

export default App;