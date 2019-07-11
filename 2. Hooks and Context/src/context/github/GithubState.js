import React, { useReducer } from "react";
import axios from "axios";

import GithubContext from "./githubContext";
import GithuhReducer from "./githubReducer";
import {
  SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS
} from "../types";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithuhReducer, initialState);

  //Methods

  const setLoading = () =>
    dispatch({ type: SET_LOADING });

  const searchUsersDefault = () => {
    setLoading();

    axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => {
        dispatch({
          type: SEARCH_USERS,
          payload: res.data
        });
      });
  };
  
  const searchUsers = text => {
    setLoading();

    axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => {
        dispatch({
          type: SEARCH_USERS,
          payload: res.data.items
        });
      });
  };

  const getUser = username => {
    setLoading();

    axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => {
        dispatch({
          type: GET_USER,
          payload: res.data
        });
      });
  };

  const clearUsers = () =>
    dispatch({ type: CLEAR_USERS });

  const getUserRepos = username => {
    setLoading();

    axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      .then(res => {
        dispatch({
          type: GET_REPOS,
          payload: res.data
        });
      });
  };

  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsersDefault,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}
  >
    { props.children }
  </GithubContext.Provider>;
};

export default GithubState;