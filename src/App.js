import axios from "axios";
import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Users from "./components/Users/Users";
import Search from "./components/layout/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/Users/User";
class App extends React.Component {
  state = {
    user: {},
    users: [],
    loading: false,
    alert: null,
    repos: [],
  };
  static propTypes = {};
  // on load
  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({
      users: res.data,
      loading: false,
    });
  }

  // ¸get users repos
  getRepos = async (username) => {
    this.setState({
      loading: true,
    });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?client_id`
    );
  };

  // search github users
  searchUsers = async (text) => {
    // loading spinner while it is true
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({
      users: res.data.items,
      loading: false,
    });
  };
  // get single user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({
      user: res.data,
      loading: false,
    });
  };
  // ¸get users repo
  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:acs&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({
      repos: res.data,
      loading: false,
    });
  };
  // çlearusers from state
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false,
    });
  };

  // şet alert
  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg,
        type,
      },
    });
    // show alert for 5 seconds then close it
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { users, user, loading, repos } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/">
                <Search
                  setAlert={this.setAlert}
                  clearUsers={this.clearUsers}
                  searchUsers={this.searchUsers}
                  showClear={users.length > 0 ? true : false}
                />
                <Users loading={loading} users={users} />
              </Route>
              <Route
                path="/user/:login"
                render={(props) => (
                  <User
                    repos={repos}
                    getUserRepos={this.getUserRepos}
                    loading={loading}
                    user={user}
                    getUser={this.getUser}
                    {...props}
                  />
                )}
              />
              <Route exact path="/about" component={About} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
