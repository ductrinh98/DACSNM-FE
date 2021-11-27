import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav } from "./components/nav";
import Home from "./pages/home";
import Saved from "./pages/saved"
import Login from "./pages/login"
import Signup from "./pages/signup"

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
          <Route exact path="/" render={() => <Home /> }/>
          <Route exact path="/saved" render={() => <Saved/> }/>
          <Route exact path="/signin" render={() => <Login /> }/>
          <Route exact path="/signup" render={() => <Signup /> }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;