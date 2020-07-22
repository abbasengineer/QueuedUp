import React, { Component } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import QueuedUpAppBar from "./components/navbar";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import jwtDecode from "jwt-decode";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import AuthRoute from "./util/auth-route";
import store from "./redux/store";
import { logoutUser, getUserData } from "./redux/actions/user-actions";
import dashboard from "./views/dashboard";
import login from "./views/login";
import signup from "./views/signup";
import post from "./components/post";
import sammy from "./images/sammy.png";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#a4c2f4",
    },
    secondary: {
      main: "#434343",
    },
    background: {
      default: "#eaf1fd",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

// axios.defaults.baseURL =
//   "https://us-central1-queuedup-123.cloudfunctions.net/api/";

const token = localStorage.firebaseIDToken;

if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: "SET_AUTHENTICATED" });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <div className="App">
            <Router>
              <QueuedUpAppBar />
              <div>
                <Switch>
                  <Route exact path="/" component={dashboard} />
                  <AuthRoute exact path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signup} />
                  <Route exact path="/users/:username" component={post} />
                </Switch>
                <img width="100px" src={sammy} alt="sammy" />
              </div>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
