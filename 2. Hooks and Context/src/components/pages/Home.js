import React, { Fragment, useContext, useEffect } from "react";
import Search from "../users/Search";
import Users from "../users/Users";

import GithubContext from "../../context/github/githubContext";

const Home = () => {
  const githubContext = useContext(GithubContext);

  useEffect(() => {
    githubContext.searchUsersDefault();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Search />
      <Users />
    </Fragment>
  );
};

export default Home;
