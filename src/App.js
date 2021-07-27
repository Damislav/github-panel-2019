import axios from "axios";
import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Users from "./components/Users/Users";
import Search from "./components/layout/Search/Search";
import Alert from "./components/layout/Alert/Alert";
import About from "./components/pages/About";
class App extends React.Component {
  state = {
    users: [],
    loading: false,
    alert: null,
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
    const { users, loading } = this.state;
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
              <Route exact path="/about" component={About} />
              <Route />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
