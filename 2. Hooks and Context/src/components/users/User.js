import React, { Fragment, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";

const User = ( { match, loading, user, repos, getUser, getUserRepos } ) => {
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const { name, company, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable } = user;
  
  if(loading){
    return <Spinner />;
  }else{
    return <Fragment>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable: { " " }
      { hireable ? (
        <FontAwesomeIcon icon={ ["fa", "check-circle"] } className="text-success" />
      ) : (
        <FontAwesomeIcon icon={ ["fa", "times-circle"] } className="text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img src={ avatar_url } className="round-img" alt="avatar" style={{ width: "150px" }} />
          <h1>{ name }</h1>
          { location && <p><strong>Location:</strong> { location }</p> }
        </div>
        <div>
          { bio && <Fragment>
            <h3>Bio</h3>
            <p>{ bio }</p>
          </Fragment> }
          <a href={ html_url } className="btn btn-dark my-1" >Visit Github Profile</a>
          <ul>
          <li>
              { login && <Fragment>
                <strong>Username: </strong> { login }
              </Fragment> }
            </li>
            <li>
              { company && <Fragment>
                <strong>Company: </strong> { company }
              </Fragment> }
            </li>
            <li>
              { blog && <Fragment>
                <strong>Website: </strong> { blog }
              </Fragment> }
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">
          Followers: { followers }
        </div>
        <div className="badge badge-success">
          Following: { following }
        </div>
        <div className="badge badge-light">
          Public Repos: { public_repos }
        </div>
        <div className="badge badge-dark">
          Public Gists: { public_gists }
        </div>
      </div>
      <Repos repos={ repos } />
    </Fragment>;
  }
};

User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired
}

export default User;