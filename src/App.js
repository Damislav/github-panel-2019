import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/Users/User";
import GithubState from "./context/github/GithubState";
import Home from "./components/pages/Home";
import AlertState from "./context/alert/AlertState";
import NotFound from "./components/pages/NotFound";
const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
