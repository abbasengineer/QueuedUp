import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import dashboard from "./views/dashboard";
import login from "./views/login";
//import Navbar from "./components/navbar";
import QueuedUpAppBar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <QueuedUpAppBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={dashboard} />
              <Route exact path="/login" component={login} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
