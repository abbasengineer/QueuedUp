import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import dashboard from "./views/dashboard";
import login from "./views/login";
import QueuedUpAppBar from "./components/navbar";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import signup from "./views/signup";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#a4c2f4",
    },
    secondary: {
      main: "#434343",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <QueuedUpAppBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={dashboard} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
