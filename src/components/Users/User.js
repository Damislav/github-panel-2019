import React, { Fragment, useContext, useEffect } from "react";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";
const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const { getUser, getUserRepos, repos } = githubContext;

  const {
    avatar_url,
    login,
    location,
    bio,
    blog,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    name,
    company,
    hireable,
  } = githubContext.user;

  if (githubContext.loading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <Link className="btn btn-light" to="/">
        Back to search
      </Link>
      Hireable:{""}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card  grid-2  " style={{ display: "grid" }}>
        <div className="all-center">
          <img
            alt="profile images"
            src={avatar_url}
            className="round-img"
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a className="btn btn-dark my-1" href={html_url}>
            Visit github profile
          </a>
          <ul style={{ paddingLeft: 0, paddingTop: "1rem" }}>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: {name}</strong>
                </Fragment>
              )}
            </li>{" "}
            <li>
              {company && (
                <Fragment>
                  <strong>Company: {company}</strong>
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>
                    Website: <a href={blog}> {blog}</a>
                  </strong>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public repos: {public_repos}</div>
        <div className="badge badge-dark">Public gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

export default User;
