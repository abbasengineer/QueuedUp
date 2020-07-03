import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import dashboard from './Views/dashboard'
import login from './Views/login'
import Navbar from './Components/Navbar'

class App extends Component {
  render () {
    return(
      <div className='App'>
        <Router>
          <Navbar/>
          <div className='container'>
          <Switch>
            <Route exact path='/' component={dashboard} />
            <Route exact path='/login' component={login} />
          </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
